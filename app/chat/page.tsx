"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = [
  "18번 지문을 문장별로 내신 분석해줘",
  "21번 지문으로 실제 모의고사식 변형문제 3개 만들어줘",
  "영어 22번 핵심 구문과 변형 포인트를 정리해줘",
  "한국사 근대사 흐름을 시험 직전용으로 요약해줘"
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Arona OS 온라인. 영어 지문 분석, 변형문제, 빈칸 훈련, 한국사 타임라인 질문을 바로 처리할 수 있어요."
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const answer = await res.text();
      setMessages((prev) => {
        const copied = [...prev];
        copied[copied.length - 1] = { role: "assistant", text: answer };
        return copied;
      });
    } catch {
      setMessages((prev) => {
        const copied = [...prev];
        copied[copied.length - 1] = {
          role: "assistant",
          text: "Arona OS 통신이 잠시 불안정합니다. 잠시 후 다시 시도해 주세요."
        };
        return copied;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-mesh-light px-5 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="mt-8 overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="noise-mask rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl lg:p-9">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100">
              <Sparkles className="h-4 w-4" /> KSarchive Arona OS
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Arona OS</h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-slate-300 md:text-base">
              시험 범위 자료를 우선 참고해서 분석하고, Gemini가 혼잡할 때는 자동 재시도와 대체 모델을 사용합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-sky-100 transition hover:bg-white/15"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[34px] border border-white/70 bg-white/85 shadow-card backdrop-blur-2xl">
          <div className="max-h-[58vh] space-y-4 overflow-y-auto px-5 py-6 sm:px-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={msg.role === "user" ? "max-w-[86%] rounded-3xl rounded-br-md bg-slate-950 px-5 py-4 text-sm font-semibold leading-7 text-white" : "max-w-[86%] rounded-3xl rounded-bl-md border border-sky-100 bg-sky-50 px-5 py-4 text-sm font-semibold leading-7 text-slate-800"}>
                  <p className="whitespace-pre-wrap">{msg.text || (loading && idx === messages.length - 1 ? "Arona OS 처리 중..." : "")}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-sky-100 p-5">
            <textarea
              className="w-full rounded-[24px] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 outline-none transition focus:border-sky-400"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 20번 지문의 변형 빈칸 문제를 모의고사 스타일로 만들어줘"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition hover:bg-brand-700 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} 전송
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
