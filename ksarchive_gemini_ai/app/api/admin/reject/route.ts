import { NextResponse } from "next/server";
import { publicUser, updateUserStatus } from "@/lib/auth-store";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

async function requireAdmin(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")[1];
  const session = await verifySessionToken(token);
  return session?.role === "admin";
}

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  const body = await req.json();
  const userId = String(body.userId ?? "");
  const reason = String(body.reason ?? "경신고 학생 확인 불가");
  const user = await updateUserStatus({ userId, status: "rejected", rejectedReason: reason });
  return NextResponse.json({ ok: true, user: publicUser(user) });
}
