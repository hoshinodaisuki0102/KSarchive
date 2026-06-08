import { NextResponse } from "next/server";
import { awardUserPoints, publicUser } from "@/lib/auth-store";
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

export async function POST(req: Request) {
  try {
    const session = await verifySessionToken(getToken(req));
    if (!session) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    if (session.role === "admin") {
      return NextResponse.json({ ok: true, awarded: 0, alreadySolved: true, message: "관리자 계정은 포인트 집계에서 제외됩니다." });
    }

    const body = await req.json().catch(() => ({}));
    const result = await awardUserPoints({
      userId: session.userId,
      activityId: String(body.activityId ?? ""),
      points: Number(body.points ?? 0)
    });

    return NextResponse.json({
      ok: true,
      awarded: result.awarded,
      alreadySolved: result.alreadySolved,
      user: publicUser(result.user)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "포인트 저장 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
