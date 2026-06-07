import fs from "fs/promises";
import path from "path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";

export const runtime = "nodejs";

export type UserStatus = "pending" | "approved" | "rejected";
export type AuthProvider = "credentials";

export type Agreement = {
  noRedistribution: boolean;
  studentOnly: boolean;
  realNameCheck: boolean;
  copyrightNotice: boolean;
};

export type UserRecord = {
  id: string;
  username: string;
  realName: string;
  studentId?: string;
  nickname?: string;
  points?: number;
  solvedActivities?: string[];
  email?: string;
  provider: AuthProvider;
  passwordHash?: string;
  salt?: string;
  status: UserStatus;
  agreement: Agreement;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  lastLoginAt?: string;
};

type Store = {
  users: UserRecord[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

export async function readStore(): Promise<Store> {
  await ensureStore();
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Store;
    if (!Array.isArray(parsed.users)) return { users: [] };
    return parsed;
  } catch {
    return { users: [] };
  }
}

async function writeStore(store: Store) {
  await ensureStore();
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function publicUser(user: UserRecord) {
  const { passwordHash, salt, ...safe } = user;
  return safe;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password: string, salt?: string, passwordHash?: string) {
  if (!salt || !passwordHash) return false;
  const hash = scryptSync(password, salt, 64);
  const stored = Buffer.from(passwordHash, "hex");
  if (hash.length !== stored.length) return false;
  return timingSafeEqual(hash, stored);
}

export async function findUserByUsername(username: string) {
  const store = await readStore();
  const normalized = username.trim().toLowerCase();
  return store.users.find((user) => user.username.toLowerCase() === normalized) ?? null;
}

export async function findUserById(userId: string) {
  const store = await readStore();
  return store.users.find((user) => user.id === userId) ?? null;
}

export async function findUserByEmail(email: string) {
  const store = await readStore();
  const normalized = email.trim().toLowerCase();
  return store.users.find((user) => user.email?.toLowerCase() === normalized) ?? null;
}

export async function createCredentialRequest(input: {
  username: string;
  password: string;
  realName: string;
  studentId?: string;
  agreement: Agreement;
}) {
  const store = await readStore();
  const username = input.username.trim().toLowerCase();
  if (store.users.some((user) => user.username.toLowerCase() === username)) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }

  const { salt, hash } = hashPassword(input.password);
  const user: UserRecord = {
    id: randomUUID(),
    username,
    realName: input.realName.trim(),
    studentId: input.studentId?.trim() || undefined,
    provider: "credentials",
    salt,
    passwordHash: hash,
    status: "pending",
    nickname: undefined,
    points: 0,
    solvedActivities: [],
    agreement: input.agreement,
    createdAt: new Date().toISOString()
  };

  store.users.unshift(user);
  await writeStore(store);
  return user;
}

export async function markLogin(userId: string) {
  const store = await readStore();
  const user = store.users.find((item) => item.id === userId);
  if (!user) return null;
  user.lastLoginAt = new Date().toISOString();
  await writeStore(store);
  return user;
}

export async function updateUserStatus(input: {
  userId: string;
  status: UserStatus;
  approvedBy?: string;
  rejectedReason?: string;
}) {
  const store = await readStore();
  const user = store.users.find((item) => item.id === input.userId);
  if (!user) throw new Error("가입 요청을 찾지 못했습니다.");

  user.status = input.status;
  if (input.status === "approved") {
    user.approvedAt = new Date().toISOString();
    user.approvedBy = input.approvedBy || "admin";
    user.rejectedAt = undefined;
    user.rejectedReason = undefined;
  }
  if (input.status === "rejected") {
    user.rejectedAt = new Date().toISOString();
    user.rejectedReason = input.rejectedReason || "경신고 학생 확인 불가";
  }

  await writeStore(store);
  return user;
}

export function isAgreementValid(agreement: Partial<Agreement>) {
  return Boolean(
    agreement.noRedistribution &&
      agreement.studentOnly &&
      agreement.realNameCheck &&
      agreement.copyrightNotice
  );
}


export async function updateUserProfile(input: {
  userId: string;
  nickname?: string;
}) {
  const store = await readStore();
  const user = store.users.find((item) => item.id === input.userId);
  if (!user) throw new Error("사용자를 찾지 못했습니다.");

  const nickname = input.nickname?.trim();
  if (nickname && nickname.length > 12) {
    throw new Error("닉네임은 12자 이하로 설정해 주세요.");
  }

  user.nickname = nickname || undefined;
  await writeStore(store);
  return user;
}

export async function awardUserPoints(input: {
  userId: string;
  activityId: string;
  points: number;
}) {
  const activityId = input.activityId.trim();
  const safePoints = Math.max(0, Math.min(100, Math.floor(input.points)));
  if (!activityId || safePoints <= 0) throw new Error("포인트 지급 정보가 올바르지 않습니다.");

  const store = await readStore();
  const user = store.users.find((item) => item.id === input.userId);
  if (!user) throw new Error("사용자를 찾지 못했습니다.");
  if (user.status !== "approved") throw new Error("승인된 사용자만 포인트를 받을 수 있습니다.");

  const solved = new Set(user.solvedActivities ?? []);
  if (solved.has(activityId)) {
    return { user, awarded: 0, alreadySolved: true };
  }

  solved.add(activityId);
  user.solvedActivities = Array.from(solved);
  user.points = (user.points ?? 0) + safePoints;
  await writeStore(store);

  return { user, awarded: safePoints, alreadySolved: false };
}

export async function getLeaderboard(limit = 8) {
  const store = await readStore();
  return store.users
    .filter((user) => user.status === "approved")
    .map((user) => ({
      id: user.id,
      username: user.username,
      realName: user.realName,
      nickname: user.nickname,
      points: user.points ?? 0
    }))
    .sort((a, b) => b.points - a.points || a.realName.localeCompare(b.realName, "ko"))
    .slice(0, limit);
}
