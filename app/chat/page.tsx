"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = [
  "봄봄의 갈등 구조를 서술형 답안처럼 정리해줘",
  "영어 모의고사 18번 핵심만 설명해줘",
  "사회 1단원 핵심 개념을 5줄로 요약해줘",
  "한국사 근대 이전 신분제를 표처럼 정리해줘",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "안녕하세요, 선생님. KSarchive 학습 도우미 아로나예요. 궁금한 과목이나 단원을 말해 주시면 같이 정리해볼게요.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!res.body) {
        throw new Error("응답 스트림이 없습니다.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        setMessages((prev) => {
          const copied = [...prev];
          copied[copied.length - 1] = {
            role: "assistant",
            text: fullText,
          };
          return copied;
        });
      }
    } catch {
      setMessages((prev) => {
        const copied = [...prev];
        copied[copied.length - 1] = {
          role: "assistant",
          text: "앗, 지금은 답변을 가져오지 못했어요. Ollama가 실행 중인지 확인해 주세요.",
        };
        return copied;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_35%,#ffffff_100%)] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-blue-100 bg-white/90 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            KSarchive AI
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Arona</h1>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            과목 내용 정리, 시험 포인트 확인, 서술형 답안 정리까지 도와드릴 수 있어요.
            지금은 로컬 AI와 연결되어 있어서, 사이트 자료를 점점 더 많이 참고하도록 확장할 수 있어요.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[32px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold">대화</h2>
          </div>

          <div className="space-y-5 px-6 py-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "max-w-[80%] rounded-3xl rounded-br-md bg-blue-600 px-5 py-4 text-white shadow-sm"
                      : "max-w-[80%] rounded-3xl rounded-bl-md border border-blue-100 bg-slate-50 px-5 py-4 text-slate-800 shadow-sm"
                  }
                >
                  <p className="whitespace-pre-wrap leading-8">{msg.text || (loading && idx === messages.length - 1 ? "생각 중이에요..." : "")}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 px-6 py-5">
            <textarea
              className="w-full rounded-2xl border border-slate-200 p-4 text-base outline-none transition focus:border-blue-400"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 조선 후기 신분제가 왜 흔들렸는지 시험 답안처럼 정리해줘"
            />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                아로나가 사이트 자료를 바탕으로 답하게 하려면 ai-docs 폴더를 계속 채워 주세요.
              </p>
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "답변 중..." : "질문하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}