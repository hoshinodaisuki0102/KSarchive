import { NextResponse } from "next/server";
import { createCredentialRequest, isAgreementValid, publicUser } from "@/lib/auth-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const realName = String(body.realName ?? "").trim();
    const studentId = String(body.studentId ?? "").trim();
    const agreement = body.agreement ?? {};

    if (!username || username.length < 4) {
      return NextResponse.json({ error: "아이디는 4자 이상으로 입력해 주세요." }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "비밀번호는 8자 이상으로 입력해 주세요." }, { status: 400 });
    }
    if (!realName) {
      return NextResponse.json({ error: "이름을 입력해 주세요." }, { status: 400 });
    }
    if (!studentId) {
      return NextResponse.json({ error: "학번을 입력해 주세요." }, { status: 400 });
    }
    if (!isAgreementValid(agreement)) {
      return NextResponse.json({ error: "필수 확인 항목에 모두 동의해야 합니다." }, { status: 400 });
    }

    const user = await createCredentialRequest({ username, password, realName, studentId, agreement });
    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "회원가입 요청을 처리하지 못했습니다." }, { status: 400 });
  }
}
