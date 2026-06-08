import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/session";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")[1];
  const session = await verifySessionToken(token);
  if (!session || session.role !== "admin") return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true });
}
