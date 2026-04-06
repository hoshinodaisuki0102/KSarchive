import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { englishMock202503 } from "@/lib/english-mock";
import { englishMockInlineDetails } from "@/lib/english-mock-detail";

export default function MockIndexPage() {
  const detailedSet = new Set(englishMockInlineDetails.map((item) => item.id));
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/subjects/english" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"><ArrowLeft className="h-4 w-4" />영어로</Link>
        <section className="mt-6 rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">2025 March Mock</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">문항별 지문 · 해석 · 풀이</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">18~30번은 문장별 상세 분석, 31~45번은 지문·정답·핵심 근거 중심 정리로 이어집니다.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {englishMock202503.map((q) => (
              <Link key={q.id} href={`/subjects/english/mock/2025-03/${q.id}`} className="rounded-[20px] border border-blue-100 bg-white p-4 hover:bg-blue-50">
                <div className="flex items-center justify-between"><span className="text-base font-bold text-slate-950">{q.id}번</span><ChevronRight className="h-4 w-4 text-slate-400" /></div>
                <p className="mt-2 text-xs leading-6 text-slate-500">{q.type}</p>
                <p className={`mt-2 text-[11px] font-semibold ${detailedSet.has(q.id) ? "text-brand-700" : "text-slate-400"}`}>{detailedSet.has(q.id) ? "상세 분석" : "기본 풀이"}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
