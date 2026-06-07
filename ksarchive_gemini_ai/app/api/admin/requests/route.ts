import { NextResponse } from "next/server";
import { publicUser, readStore } from "@/lib/auth-store";
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

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: "관리자 인증이 필요합니다." }, { status: 401 });
  const store = await readStore();
  return NextResponse.json({ users: store.users.map(publicUser) });
}
