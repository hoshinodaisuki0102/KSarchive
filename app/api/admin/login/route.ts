import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

function isAdminCredential(username: string, password: string) {
  const adminUsername = process.env.KS_ADMIN_USERNAME?.trim().toLowerCase();
  const adminPassword = process.env.KS_ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;
  return username === adminUsername && password === adminPassword;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!isAdminCredential(username, password)) {
    return NextResponse.json({ error: "관리자 아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = await createSessionToken({ userId: "admin", username, realName: "관리자", role: "admin" }, 60 * 60 * 24 * 14);
  const res = NextResponse.json({ ok: true });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  };

  res.cookies.set(ADMIN_COOKIE, token, cookieOptions);
  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
  return res;
}
