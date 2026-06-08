"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { orderQuizItems, personQuizItems, timelineBlankQuiz } from "@/lib/history-data";

function normalize(value: string) {
  return value.replace(/\s+/g, "").trim().toLowerCase();
}

export function HistoryQuizPanel() {
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [blankChecked, setBlankChecked] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [personAnswers, setPersonAnswers] = useState<Record<string, string>>({});
  const [personChecked, setPersonChecked] = useState(false);

  const blankScore = timelineBlankQuiz.filter((quiz) =>
    quiz.answers.some((answer) => normalize(answer) === normalize(blankAnswers[quiz.id] ?? ""))
  ).length;

  const orderScore = useMemo(() => {
    return selectedOrder.filter((id, index) => {
      const item = orderQuizItems.find((quiz) => quiz.id === id);
      return item?.order === index + 1;
    }).length;
  }, [selectedOrder]);

  const personScore = personQuizItems.filter((quiz) => personAnswers[quiz.id] === quiz.answer).length;

  function toggleOrder(id: string) {
    setSelectedOrder((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id];
    });
  }

  function resetAll() {
    setBlankAnswers({});
    setBlankChecked(false);
    setSelectedOrder([]);
    setPersonAnswers({});
    setPersonChecked(false);
  }

  return (
    <section className="mt-8 rounded-[36px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Quiz Lab</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">근대사 흐름 퀴즈</h2>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-500">연표 빈칸, 사건 순서, 인물 연결을 짧게 반복해서 흐름을 고정합니다.</p>
        </div>
        <button onClick={resetAll} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5">
          <RotateCcw className="h-4 w-4" /> 다시 풀기
        </button>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-950">01. 연표 빈칸 채우기</h3>
              <p className="mt-1 text-sm font-bold text-slate-500">사건 이름과 주요 인물을 직접 써보세요.</p>
            </div>
            <button onClick={() => setBlankChecked(true)} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-black text-white shadow-card">채점하기</button>
          </div>

          <div className="mt-4 space-y-3">
            {timelineBlankQuiz.map((quiz) => {
              const value = blankAnswers[quiz.id] ?? "";
              const correct = quiz.answers.some((answer) => normalize(answer) === normalize(value));
              return (
                <div key={quiz.id} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-sm font-black text-brand-700">{quiz.year}</p>
                    <p className="text-xs font-black text-slate-400">힌트 {quiz.hint}</p>
                  </div>
                  <p className="mt-2 text-sm font-black leading-7 text-slate-800">{quiz.question}</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={value}
                      onChange={(event) => setBlankAnswers((prev) => ({ ...prev, [quiz.id]: event.target.value }))}
                      placeholder="정답 입력"
                      className="min-h-11 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                    />
                    {blankChecked && (
                      <span className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-black ${correct ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {correct ? "정답" : `정답: ${quiz.answers[0]}`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {blankChecked && <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">연표 빈칸 점수: {blankScore} / {timelineBlankQuiz.length}</p>}
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
            <h3 className="text-xl font-black text-slate-950">02. 사건 순서 배열</h3>
            <p className="mt-1 text-sm font-bold leading-6 text-slate-500">빠른 것부터 차례대로 눌러 보세요. 다시 누르면 선택이 취소됩니다.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {orderQuizItems.map((item) => {
                const index = selectedOrder.indexOf(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleOrder(item.id)}
                    className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${index >= 0 ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
                  >
                    {index >= 0 ? `${index + 1}. ` : ""}{item.label}
                  </button>
                );
              })}
            </div>
            {selectedOrder.length === orderQuizItems.length && (
              <div className="mt-4 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-sky-700">
                순서 점수: {orderScore} / {orderQuizItems.length}
                <div className="mt-2 text-xs leading-6 text-sky-800">정답 순서: {orderQuizItems.sort((a, b) => a.order - b.order).map((item) => `${item.year} ${item.label}`).join(" → ")}</div>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-slate-950">03. 인물 연결</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">사건과 인물을 연결합니다.</p>
              </div>
              <button onClick={() => setPersonChecked(true)} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button>
            </div>
            <div className="mt-4 space-y-3">
              {personQuizItems.map((quiz) => (
                <div key={quiz.id} className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm font-black leading-6 text-slate-800">{quiz.question}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quiz.choices.map((choice) => (
                      <button
                        key={choice}
                        onClick={() => setPersonAnswers((prev) => ({ ...prev, [quiz.id]: choice }))}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-black transition ${personAnswers[quiz.id] === choice ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600"}`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  {personChecked && (
                    <p className={`mt-2 text-xs font-black leading-5 ${personAnswers[quiz.id] === quiz.answer ? "text-emerald-700" : "text-rose-700"}`}>
                      {personAnswers[quiz.id] === quiz.answer ? "정답! " : `오답. 정답은 ${quiz.answer}. `}{quiz.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {personChecked && <p className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-black text-amber-700"><Sparkles className="h-4 w-4" /> 인물 점수: {personScore} / {personQuizItems.length}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
