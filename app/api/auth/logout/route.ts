import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const options = {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production"
  };
  res.cookies.set(SESSION_COOKIE, "", options);
  res.cookies.set(ADMIN_COOKIE, "", options);
  return res;
}
