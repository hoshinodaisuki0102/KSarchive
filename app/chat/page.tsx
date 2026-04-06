
"use client";

import Link from "next/link";
import { ArrowLeft, Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const sampleMessages = [
  { role: "assistant", text: "아로나예요. 시험 범위 안에서 개념 설명, 지문 요약, 서술형 정리, 오답 분석을 도와줄게요." },
  { role: "user", text: "영어 20번 지문의 주장 한 줄로 정리해줘." },
  { role: "assistant", text: "핵심은 ‘몸짓은 말의 의미를 돕는 선에서 균형 있게 사용해야 한다’예요." }
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <section className="mt-6 overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-glow">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                <Bot className="h-4 w-4" />
                Arona
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">시험 범위 전용 AI 챗봇</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                지금은 프런트 UI만 넣어 둔 상태입니다. 나중에 API 키를 연결하면 KSarchive 자료를 바탕으로 답하도록 확장할 수 있습니다.
              </p>
            </div>
            <div className="border-l border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white md:p-10">
              <div className="space-y-3 text-sm leading-7 text-white/90">
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">이름: Arona</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">역할: 시험 범위 요약 / 개념 설명 / 오답 분석</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">다음 단계: API 키 연결 + 자료 기반 프롬프트 설계</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
            <div className="space-y-4">
              {sampleMessages.map((m, i) => (
                <div key={i} className={`rounded-[22px] p-4 text-sm leading-7 ${m.role === "assistant" ? "bg-sky-50 text-slate-700" : "bg-slate-900 text-white"}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-full border border-blue-200 bg-white px-4 py-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="질문을 입력해 보세요" className="w-full bg-transparent outline-none text-sm" />
              <button className="rounded-full bg-slate-900 p-2 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
            <div className="inline-flex rounded-2xl bg-blue-100 p-3 text-brand-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">연결 준비 메모</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              <li>• Next.js 서버에서만 API 키를 사용</li>
              <li>• 클라이언트에서 직접 API 호출 금지</li>
              <li>• KSarchive 자료를 시스템 프롬프트로 정리</li>
              <li>• 과목 / 단원 / 문제 번호를 함께 보내기</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
