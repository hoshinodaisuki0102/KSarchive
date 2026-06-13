import fs from "fs/promises";
import path from "path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

export type UserStatus = "pending" | "approved" | "rejected";
export type AuthProvider = "credentials";
export type Agreement = { noRedistribution: boolean; studentOnly: boolean; realNameCheck: boolean; copyrightNotice: boolean; };
export type UserRecord = {
  id: string; username: string; realName: string; studentId?: string; nickname?: string; email?: string;
  provider: AuthProvider; passwordHash?: string; salt?: string; status: UserStatus; agreement: Agreement; createdAt: string;
  approvedAt?: string; approvedBy?: string; rejectedAt?: string; rejectedReason?: string; lastLoginAt?: string;
};

type Store = { users: UserRecord[] };

const DATA_DIR = process.env.VERCEL ? path.join("/tmp", "ksarchive-data") : path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const EMPTY_STORE: Store = { users: [] };
const SUPABASE_TABLE = process.env.KS_SUPABASE_TABLE || "ksarchive_kv";
const SUPABASE_KEY = "users";

function hasSupabaseStore() { return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY); }
function supabaseHeaders(extra?: Record<string, string>) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(extra ?? {}) };
}
async function readSupabaseStore(): Promise<Store | null> {
  if (!hasSupabaseStore()) return null;
  try {
    const base = String(process.env.SUPABASE_URL).replace(/\/$/, "");
    const res = await fetch(`${base}/rest/v1/${SUPABASE_TABLE}?key=eq.${SUPABASE_KEY}&select=value&limit=1`, { headers: supabaseHeaders(), cache: "no-store" });
    if (!res.ok) return null;
    const rows = (await res.json()) as Array<{ value?: Store }>;
    const value = rows[0]?.value;
    if (!value || !Array.isArray(value.users)) return EMPTY_STORE;
    return value;
  } catch (error) { console.error("KSarchive Supabase store read failed:", error); return null; }
}
async function writeSupabaseStore(store: Store) {
  if (!hasSupabaseStore()) return false;
  try {
    const base = String(process.env.SUPABASE_URL).replace(/\/$/, "");
    const res = await fetch(`${base}/rest/v1/${SUPABASE_TABLE}?on_conflict=key`, {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({ key: SUPABASE_KEY, value: store, updated_at: new Date().toISOString() })
    });
    if (!res.ok) console.error("KSarchive Supabase store write failed with status", res.status);
    return res.ok;
  } catch (error) { console.error("KSarchive Supabase store write failed:", error); return false; }
}
async function ensureStore() { await fs.mkdir(DATA_DIR, { recursive: true }); try { await fs.access(USERS_FILE); } catch { await fs.writeFile(USERS_FILE, JSON.stringify(EMPTY_STORE, null, 2), "utf-8"); } }
async function readFileStore(): Promise<Store> { try { await ensureStore(); const raw = await fs.readFile(USERS_FILE, "utf-8"); const parsed = JSON.parse(raw) as Store; return Array.isArray(parsed.users) ? parsed : EMPTY_STORE; } catch (error) { console.error("KSarchive user store read failed:", error); return EMPTY_STORE; } }
async function writeFileStore(store: Store) { await ensureStore(); await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf-8"); }
export async function readStore(): Promise<Store> { return (await readSupabaseStore()) ?? (await readFileStore()); }
async function writeStore(store: Store) { const remoteOk = await writeSupabaseStore(store); if (!remoteOk) await writeFileStore(store); }

export function publicUser(user: UserRecord) { const { passwordHash, salt, ...safe } = user; return safe; }
export function hashPassword(password: string) { const salt = randomBytes(16).toString("hex"); const hash = scryptSync(password, salt, 64).toString("hex"); return { salt, hash }; }
export function verifyPassword(password: string, salt?: string, passwordHash?: string) { if (!salt || !passwordHash) return false; const hash = scryptSync(password, salt, 64); const stored = Buffer.from(passwordHash, "hex"); if (hash.length !== stored.length) return false; return timingSafeEqual(hash, stored); }
export async function findUserByUsername(username: string) { const store = await readStore(); const normalized = username.trim().toLowerCase(); return store.users.find((user) => user.username.toLowerCase() === normalized) ?? null; }
export async function findUserById(userId: string) { const store = await readStore(); return store.users.find((user) => user.id === userId) ?? null; }
export async function findUserByEmail(email: string) { const store = await readStore(); const normalized = email.trim().toLowerCase(); return store.users.find((user) => user.email?.toLowerCase() === normalized) ?? null; }
export async function createCredentialRequest(input: { username: string; password: string; realName: string; studentId?: string; agreement: Agreement; }) {
  const store = await readStore(); const username = input.username.trim().toLowerCase();
  if (store.users.some((user) => user.username.toLowerCase() === username)) throw new Error("이미 사용 중인 아이디입니다.");
  const { salt, hash } = hashPassword(input.password);
  const user: UserRecord = { id: randomUUID(), username, realName: input.realName.trim(), studentId: input.studentId?.trim() || undefined, provider: "credentials", salt, passwordHash: hash, status: "pending", nickname: undefined, agreement: input.agreement, createdAt: new Date().toISOString() };
  store.users.unshift(user); await writeStore(store); return user;
}
export async function markLogin(userId: string) { const store = await readStore(); const user = store.users.find((item) => item.id === userId); if (!user) return null; user.lastLoginAt = new Date().toISOString(); await writeStore(store); return user; }
export async function updateUserStatus(input: { userId: string; status: UserStatus; approvedBy?: string; rejectedReason?: string; }) {
  const store = await readStore(); const user = store.users.find((item) => item.id === input.userId); if (!user) throw new Error("가입 요청을 찾지 못했습니다.");
  user.status = input.status;
  if (input.status === "approved") { user.approvedAt = new Date().toISOString(); user.approvedBy = input.approvedBy || "admin"; user.rejectedAt = undefined; user.rejectedReason = undefined; }
  if (input.status === "rejected") { user.rejectedAt = new Date().toISOString(); user.rejectedReason = input.rejectedReason || "경신고 학생 확인 불가"; }
  await writeStore(store); return user;
}
export function isAgreementValid(agreement: Partial<Agreement>) { return Boolean(agreement.noRedistribution && agreement.studentOnly && agreement.realNameCheck && agreement.copyrightNotice); }
export async function updateUserProfile(input: { userId: string; nickname?: string; }) { const store = await readStore(); const user = store.users.find((item) => item.id === input.userId); if (!user) throw new Error("사용자를 찾지 못했습니다."); const nickname = input.nickname?.trim(); if (nickname && nickname.length > 12) throw new Error("닉네임은 12자 이하로 설정해 주세요."); user.nickname = nickname || undefined; await writeStore(store); return user; }
export async function awardUserPoints(input: { userId: string; activityId: string; points: number; }) { const user = await findUserById(input.userId); if (!user) throw new Error("사용자를 찾지 못했습니다."); return { user, awarded: 0, alreadySolved: true }; }
export async function getLeaderboard() { return []; }
