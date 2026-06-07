import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Flag, Landmark, Layers3, Swords, ListTree } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { modernHistoryStudyTips, modernHistoryTimeline } from "@/lib/history-data";

const categoryStyle = {
  "개항 전": "border-slate-200 bg-slate-50 text-slate-700",
  "개항": "border-sky-200 bg-sky-50 text-sky-700",
  "개화와 반발": "border-amber-200 bg-amber-50 text-amber-700",
  "개혁": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "국권 침탈": "border-red-200 bg-red-50 text-red-700"
} as const;

export default function HistoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl sm:p-9 lg:p-11">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl" />
            <div className="relative max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                <Landmark className="h-4 w-4" /> Korean History · Modern Era
              </p>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                한국사 근대사<br />
                <span className="text-gradient-sky">년도별 타임라인</span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                근대사는 사건 이름을 따로 외우면 금방 헷갈립니다. 여기서는 흥선대원군의 통상 수교 거부부터 개항, 개화 정책과 반발, 갑오개혁, 국권 침탈까지를 시간순으로 연결했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ListTree, title: "흐름", value: "1863–1910", text: "개항 전부터 국권 피탈까지" },
            { icon: Layers3, title: "핵심 축", value: "5 stages", text: "개항 전·개항·개화·개혁·침탈" },
            { icon: Swords, title: "분기점", value: "1894", text: "동학농민운동·청일전쟁·갑오개혁" },
            { icon: Flag, title: "마무리", value: "1910", text: "국권 피탈과 독립운동의 전환" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white"><Icon className="h-6 w-6" /></span>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-brand-700">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{item.text}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[36px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><BookOpenCheck className="h-5 w-5" /></span>
            <div>
              <h2 className="text-2xl font-black text-slate-950">시험 직전 암기법</h2>
              <p className="text-sm font-bold text-slate-500">사건 순서와 인과관계를 먼저 잡기</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {modernHistoryStudyTips.map((tip) => (
              <div key={tip} className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-bold leading-7 text-slate-700">{tip}</div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Timeline</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">근대사 주요 사건</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">모바일에서도 카드형으로 읽히도록 구성</p>
          </div>

          <div className="relative">
            <div className="absolute left-[30px] top-0 hidden h-full w-px bg-gradient-to-b from-sky-200 via-indigo-200 to-red-200 sm:block" />
            <div className="space-y-4">
              {modernHistoryTimeline.map((entry) => (
                <article key={`${entry.year}-${entry.title}`} className="relative rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:ml-16 sm:p-6">
                  <div className="absolute -left-[49px] top-7 hidden h-9 w-9 place-items-center rounded-full border-4 border-white bg-slate-950 text-xs font-black text-white shadow-card sm:grid">
                    {entry.year.slice(-2)}
                  </div>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-2xl bg-slate-950 px-3 py-1.5 font-mono text-sm font-black text-white">{entry.year}</span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-black ${categoryStyle[entry.category]}`}>{entry.category}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{entry.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{entry.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:max-w-[280px] lg:justify-end">
                      {entry.keywords.map((keyword) => (
                        <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">#{keyword}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">원인</p>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{entry.cause}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">결과</p>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{entry.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
