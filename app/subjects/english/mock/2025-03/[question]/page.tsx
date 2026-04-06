import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { englishMock202503 } from "@/lib/english-mock";
import { englishMockInlineDetails } from "@/lib/english-mock-detail";

type Props = { params: Promise<{ question: string }> };

function splitSentences(text: string) {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function QuestionDetail({ params }: Props) {
  const { question } = await params;
  const item = englishMock202503.find((q) => q.id === Number(question));
  const detail = englishMockInlineDetails.find((q) => q.id === Number(question));

  if (!item) {
    return <main className="min-h-screen bg-white"><div className="mx-auto max-w-4xl px-5 py-12"><Link href="/subjects/english/mock/2025-03">목록으로</Link><p className="mt-6">해당 문항이 없습니다.</p></div></main>;
  }

  const sentences = detail?.lines ?? splitSentences(item.passage).map((text) => ({ text, note: "핵심 문장을 먼저 해석하고, 수식어와 문장 구조를 분리해서 보세요.", grammar: "주어·동사·수식어 순서로 끊어 읽기" }));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <Link href="/subjects/english/mock/2025-03" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"><ArrowLeft className="h-4 w-4" />문항 목록으로</Link>
        <section className="mt-6 rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">{item.type}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{item.id}번</h1>
          {detail ? <div className="mt-5 flex flex-wrap gap-3">{detail.overview.map((line) => <div key={line} className="rounded-full border border-blue-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{line}</div>)}</div> : null}

          <div className="mt-6 rounded-[24px] border border-blue-100 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">지문 전체</p>
            <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-900">
              {item.passage.split(/\n\n+/).map((chunk, idx) => <p key={idx}>{chunk.replace(/\n/g, " ")}</p>)}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[22px] border border-blue-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-brand-700">핵심 해석</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.translation}</p>
            </div>
            <div className="rounded-[22px] border border-blue-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-brand-700">선택지</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">{item.choices.map((choice, idx) => <li key={choice} className={idx + 1 === item.answer ? "font-bold text-emerald-700" : ""}>{idx + 1}. {choice}</li>)}</ul>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">문장별 분석</p>
            {sentences.map((line, idx) => (
              <div key={idx} className="rounded-[24px] border border-blue-100 bg-white p-5">
                <p className="text-base leading-8 text-slate-900">{line.text}</p>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-[18px] bg-sky-50 p-4 text-sm leading-7 text-sky-900">
                    <p className="font-bold">내용 · 해석 포인트</p>
                    <p className="mt-1">{line.note}</p>
                  </div>
                  <div className="rounded-[18px] bg-amber-50 p-4 text-sm leading-7 text-amber-900">
                    <p className="font-bold">문법 · 구조 포인트</p>
                    <p className="mt-1">{line.grammar ?? "주어/동사/수식어를 먼저 분리해서 해석"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[22px] border border-blue-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-brand-700">주요 단어</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">{(detail?.vocab ?? []).map((v) => <li key={v.term}><span className="font-bold">{v.term}</span> · {v.meaning}</li>)}</ul>
            </div>
            <div className="rounded-[22px] border border-blue-100 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-brand-700">정답 근거 · 출제 포인트</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">{(detail?.points ?? item.analysis).map((v) => <li key={v}>• {v}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
