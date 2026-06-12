import { NextResponse } from "next/server";
import { publicUser, readStore } from "@/lib/auth-store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const runtime = "nodejs";

function getCookie(req: Request, name: string) {
  return req.headers.get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.split("=")[1];
}

export async function GET(req: Request) {
  const session = await verifySessionToken(getCookie(req, SESSION_COOKIE));
  if (!session) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const store = await readStore();
  const members = store.users
    .filter((user) => user.status === "approved")
    .map(publicUser)
    .sort((a, b) => (a.realName ?? "").localeCompare(b.realName ?? "", "ko"));

  return NextResponse.json({ members, viewerRole: session.role });
}
