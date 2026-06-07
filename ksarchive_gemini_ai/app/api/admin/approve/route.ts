import { NextResponse } from "next/server";
import { updateUserStatus } from "@/lib/auth-store";
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
  if (!userId) return NextResponse.json({ error: "사용자 ID가 없습니다." }, { status: 400 });
  const user = await updateUserStatus({ userId, status: "approved", approvedBy: "admin" });
  return NextResponse.json({ ok: true, user });
}
