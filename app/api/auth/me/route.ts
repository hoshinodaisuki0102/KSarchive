import { NextResponse } from "next/server";
import { findUserById, publicUser } from "@/lib/auth-store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];

  const session = await verifySessionToken(token);
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  if (session.role === "admin") {
    return NextResponse.json({ user: { id: "admin", username: session.username, realName: "관리자", nickname: "ADMIN", status: "approved", provider: "credentials", role: "admin" } });
  }

  const user = await findUserById(session.userId);
  if (!user || user.status !== "approved") return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: publicUser(user) });
}
