import { NextResponse } from "next/server";
import { findUserByUsername, markLogin, publicUser, verifyPassword } from "@/lib/auth-store";
import { ADMIN_COOKIE, createSessionToken, SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

function isAdminCredential(username: string, password: string) {
  const adminUsername = process.env.KS_ADMIN_USERNAME?.trim().toLowerCase();
  const adminPassword = process.env.KS_ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;
  return username === adminUsername && password === adminPassword;
}

function setSessionCookies(res: NextResponse, token: string, maxAge = 60 * 60 * 24 * 14) {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  };

  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (isAdminCredential(username, password)) {
      const token = await createSessionToken(
        { userId: "admin", username, realName: "관리자", role: "admin" },
        60 * 60 * 24 * 14
      );
      const res = NextResponse.json({
        ok: true,
        user: {
          id: "admin",
          username,
          realName: "관리자",
          provider: "credentials",
          status: "approved",
          role: "admin"
        }
      });
      setSessionCookies(res, token);
      res.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 14
      });
      return res;
    }

    const user = await findUserByUsername(username);

    if (!user || user.provider !== "credentials" || !verifyPassword(password, user.salt, user.passwordHash)) {
      return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    if (user.status === "pending") {
      return NextResponse.json({ error: "가입 요청이 아직 승인 대기 중입니다. 가입 요청 승인 후 학습 공간에 입장 가능합니다." }, { status: 403 });
    }
    if (user.status === "rejected") {
      return NextResponse.json({ error: "가입 요청이 승인되지 않았습니다. 관리자에게 다시 확인해 주세요." }, { status: 403 });
    }

    await markLogin(user.id);
    const token = await createSessionToken({ userId: user.id, username: user.username, realName: user.realName, role: "student" });
    const res = NextResponse.json({ ok: true, user: publicUser(user) });
    setSessionCookies(res, token);
    return res;
  } catch {
    return NextResponse.json({ error: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
