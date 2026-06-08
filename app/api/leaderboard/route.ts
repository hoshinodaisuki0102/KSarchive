import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/auth-store";

export const runtime = "nodejs";

export async function GET() {
  const leaderboard = await getLeaderboard(10);
  return NextResponse.json({ leaderboard });
}
