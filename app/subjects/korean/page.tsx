import Link from "next/link";
import { ArrowLeft, BookOpenText, GraduationCap } from "lucide-react";
import { koreanWorks } from "@/lib/korean-textbook";

function WorkSection({ workKey }: { workKey: "poem" | "bombom" }) {
  const selected = koreanWorks[workKey];
  const fullText = selected.blocks.flatMap((block) => block.quote).join("\n");
  return (
    <section className="mt-8 rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Korean Textbook</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{selected.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{selected.meta.genre} · {selected.meta.tone}{"topic" in selected.meta ? ` · ${selected.meta.topic}` : ""}</p>
          {"features" in selected.meta ? <p className="text-sm leading-7 text-slate-500">특징: {selected.meta.features}</p> : null}
        </div>
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">전문 + 흐름형 분석</div>
      </div>

      <div className="mt-6 rounded-[24px] border border-blue-100 bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">작품 본문</p>
        <pre className="mt-4 whitespace-pre-wrap break-keep text-[15px] leading-8 text-slate-900 font-sans">{fullText}</pre>
      </div>

      <div className="mt-8 space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">대목별 분석</p>
        {selected.blocks.map((block, idx) => (
          <div key={idx} className="rounded-[24px] border border-blue-100 bg-white p-5">
            <div className="rounded-[20px] bg-slate-50 p-4">
              {block.quote.map((line) => <p key={line} className="text-[15px] leading-8 text-slate-900">{line}</p>)}
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {block.notes.map((note, noteIdx) => (
                <div key={noteIdx} className={`rounded-[18px] p-4 text-sm leading-7 ${note.type === "teacher" ? "bg-amber-50 text-amber-900" : "bg-sky-50 text-sky-900"}`}>
                  <p className="font-bold">{note.type === "teacher" ? "핵심 해설" : "보충 해설"}</p>
                  <p className="mt-1">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {selected.summaries.map((summary) => (
          <div key={summary.heading} className="rounded-[24px] border border-blue-100 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-slate-950">{summary.heading}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              {summary.items.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function KoreanPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
        <section className="mt-6 overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-glow">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Korean Archive</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">국어 교과서 분석</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">작품을 먼저 한 덩어리로 읽고, 아래에서 대목별로 해설을 따라가는 흐름으로 재정리했습니다. 시험 직전에는 하단 총정리만 다시 훑어도 되게 구성했습니다.</p>
            </div>
            <div className="border-l border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white md:p-10">
              <div className="space-y-3 text-sm leading-7 text-white/90">
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">배를 매며: 시어 상징 + 사랑의 본질</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">봄봄: 갈등 흐름 + 해학 + 인물 성격</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">총정리: 서술형/객관식 포인트</div>
              </div>
            </div>
          </div>
        </section>

        <WorkSection workKey="poem" />
        <WorkSection workKey="bombom" />
      </div>
    </main>
  );
}
