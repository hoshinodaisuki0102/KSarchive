import { NextResponse } from "next/server";
import { publicUser, updateUserProfile } from "@/lib/auth-store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

function getToken(req: Request) {
  return req.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];
}

export async function PUT(req: Request) {
  try {
    const session = await verifySessionToken(getToken(req));
    if (!session) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    if (session.role === "admin") {
      return NextResponse.json({ error: "관리자 계정은 닉네임을 변경하지 않습니다." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const user = await updateUserProfile({
      userId: session.userId,
      nickname: String(body.nickname ?? "")
    });

    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "프로필 저장 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
