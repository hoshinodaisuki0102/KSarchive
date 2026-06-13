import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Flag, Landmark, Layers3, Swords, ListTree, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { HistoryQuickView } from "@/components/history-quick-view";
import { HistoryQuizPanel } from "@/components/history-quiz-panel";
import { historyCategoryMeta, modernHistoryStudyTips, modernHistoryTimeline } from "@/lib/history-data";

const legendOrder = ["동아시아 질서", "조선-서양", "조선-일본", "개화 정책", "반개화·위정척사", "청·열강 간섭", "개혁·정변"] as const;

const textbookPeople = new Set([
  "페리",
  "흥선대원군",
  "고종",
  "양헌수",
  "어재연",
  "박규수",
  "김기수",
  "김홍집",
  "황준헌",
  "이항로",
  "기정진",
  "최익현",
  "유인석",
  "김윤식",
  "박정양",
  "명성황후",
  "위안스카이",
  "김옥균",
  "박영효",
  "홍영식",
  "서재필",
  "이홍장",
  "이토 히로부미"
]);

function textbookPersonOnly(people: string[]) {
  return people.filter((person) => textbookPeople.has(person));
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl sm:p-9 lg:p-11">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />
            <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-emerald-300/15 blur-3xl" />
            <div className="relative max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                <Landmark className="h-4 w-4" /> Korean History · 개항과 근대 국가 수립의 노력
              </p>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                근대 국가 수립의 노력<br />
                <span className="text-gradient-sky">흐름형 타임라인</span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                이번 범위는 사건 이름만 외우면 바로 헷갈립니다. 국제 질서 변화에서 출발해 통상 수교 거부, 강화도 조약, 개화 정책, 임오군란, 갑신정변, 열강의 각축까지를 원인과 결과로 연결했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ListTree, title: "범위", value: "1840–1885", text: "국제 질서 변화부터 거문도 사건까지" },
            { icon: Layers3, title: "구분", value: "7 colors", text: "청·일본·서양·개화·반발을 색으로 분리" },
            { icon: Swords, title: "분기점", value: "1882", text: "임오군란 이후 청·일 간섭 확대" },
            { icon: Flag, title: "핵심", value: "1884", text: "갑신정변과 청일 대립 심화" }
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

        <HistoryQuickView />

        <section className="mt-8 rounded-[36px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><BookOpenCheck className="h-5 w-5" /></span>
            <div>
              <h2 className="text-2xl font-black text-slate-950">시험 직전 암기법</h2>
              <p className="text-sm font-bold text-slate-500">상대국·실제 인물·결과를 함께 묶기</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {modernHistoryStudyTips.map((tip) => (
              <div key={tip} className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-bold leading-7 text-slate-700">{tip}</div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[36px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl sm:p-7">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Color Legend</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">관계별 색상 구분</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">연표 점 색깔로 사건의 성격을 바로 구분</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {legendOrder.map((category) => {
              const meta = historyCategoryMeta[category];
              return (
                <div key={category} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-3">
                    <span className={`h-4 w-4 rounded-full ${meta.dot}`} />
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${meta.chip}`}>{meta.label}</span>
                  </div>
                  <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{meta.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Timeline</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">개항기 주요 사건 흐름</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">인물 칸에는 교과서 핵심 인물만 표시</p>
          </div>

          <div className="relative">
            <div className="absolute left-[30px] top-0 hidden h-full w-px bg-gradient-to-b from-slate-200 via-sky-200 to-violet-200 sm:block" />
            <div className="space-y-4">
              {modernHistoryTimeline.map((entry) => {
                const meta = historyCategoryMeta[entry.category];
                const people = textbookPersonOnly(entry.people);
                return (
                  <article key={entry.id} className="relative rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:ml-16 sm:p-6">
                    <div className={`absolute -left-[49px] top-7 hidden h-9 w-9 place-items-center rounded-full border-4 border-white text-xs font-black text-white shadow-card sm:grid ${meta.dot}`}>{entry.year.slice(0, 4).slice(-2)}</div>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2"><span className="rounded-2xl bg-slate-950 px-3 py-1.5 font-mono text-sm font-black text-white">{entry.year}</span><span className={`rounded-full border px-3 py-1 text-xs font-black ${meta.chip}`}>{entry.category}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">{entry.relation}</span></div>
                        <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{entry.title}</h3>
                        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{entry.summary}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 lg:max-w-[300px] lg:justify-end">{entry.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">#{keyword}</span>)}</div>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      <Info title="배경" text={entry.background} />
                      <Info title="원인" text={entry.cause} />
                      <Info title="전개" text={entry.development} />
                      <Info title="결과" text={entry.result} />
                    </div>

                    <div className="mt-4 grid gap-3 lg:grid-cols-[0.75fr_1.25fr]">
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
                        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-500"><UsersRound className="h-4 w-4" /> 교과서 핵심 인물</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {people.length > 0 ? people.map((person) => <span key={person} className="rounded-full bg-white px-3 py-1 text-xs font-black text-indigo-700 ring-1 ring-indigo-100">{person}</span>) : <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-400 ring-1 ring-slate-100">별도 핵심 인물 없음</span>}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">시험 포인트</p>
                        <ul className="mt-2 space-y-1 text-sm font-bold leading-7 text-slate-700">{entry.exam.map((point) => <li key={point}>• {point}</li>)}</ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <HistoryQuizPanel />
      </div>
      <SiteFooter />
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{title}</p><p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{text}</p></div>;
}
