import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpenText, BrainCircuit, Clock3, History, Sigma, Sparkles } from "lucide-react";
import { FloatingAIButton } from "@/components/floating-ai-button";
import { DdayTimer } from "@/components/dday-timer";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SubjectCard } from "@/components/subject-card";
import { SiteFooter } from "@/components/site-footer";
import { getContentCount, subjectContents, subjects } from "@/lib/site-data";
import { findUserById } from "@/lib/auth-store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

const focusCards = [
  { title: "영어 6월 모의고사", desc: "듣기 1~17번, 독해 18~40번을 원문·해석·어휘·구문·트레이닝으로 정리했습니다.", href: "/subjects/english", icon: BookOpenText },
  { title: "수학 경우의 수", desc: "순열, 조합, 중복조합, 원순열, 심화 개념을 공식·적용 문제·단계별 풀이로 정리했습니다.", href: "/subjects/math", icon: Sigma },
  { title: "한국사 근대사", desc: "흥선대원군 집권부터 국권 피탈까지 사건 흐름을 연도별 타임라인으로 연결했습니다.", href: "/subjects/history", icon: History },
  { title: "Arona OS", desc: "자료 기반 질문, 지문 분석 보강, 변형문제 초안 생성에 활용할 수 있는 학습 AI 공간입니다.", href: "/chat", icon: BrainCircuit }
];

export default async function Home() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/auth?next=/");
  if (session.role !== "admin") {
    const user = await findUserById(session.userId);
    if (!user || user.status !== "approved") redirect("/auth?next=/");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <SiteHeader />

      <section className="relative mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="pointer-events-none absolute left-8 top-12 h-40 w-40 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="pointer-events-none absolute right-8 top-28 h-56 w-56 rounded-full bg-red-300/20 blur-3xl" />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.86fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
            <div className="noise-mask relative h-full overflow-hidden rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl sm:p-9 lg:p-11">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                <Sparkles className="h-4 w-4" /> KSarchive · Final Study System
              </div>
              <h1 className="mt-6 font-black leading-[1.08] tracking-tight text-[clamp(1.7rem,7.2vw,4rem)] md:text-6xl">
                <span className="block whitespace-nowrap">필요한 정보를 빠르게,</span>
                <span className="block whitespace-nowrap">경신고 내신 아카이브</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base md:text-lg">
                과목별 시험 범위 자료를 한곳에 모아 원문·해석·핵심 개념·변형문제·타임라인을 빠르게 확인할 수 있습니다. 필요한 자료만 찾아 바로 복습할 수 있도록 학습 흐름을 카드형으로 정리했습니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/subjects/english" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-card transition hover:-translate-y-0.5 hover:bg-sky-100">영어 바로 공부하기 <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/subjects/math" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">수학 경우의 수</Link>
                <Link href="/subjects/history" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">한국사 타임라인</Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <DdayTimer />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {focusCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} href={item.href} className="group rounded-[30px] border border-white/70 bg-white/78 p-5 shadow-card backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-neon">
                    <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105"><Icon className="h-5 w-5" /></span><div><h2 className="font-black text-slate-950">{item.title}</h2><p className="mt-1 inline-flex items-center gap-1 text-xs font-black text-brand-700">열기 <ArrowRight className="h-3.5 w-3.5" /></p></div></div>
                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <SectionHeading eyebrow="Subjects" title="6과목 구조" description="영어 6월 모의고사, 수학 경우의 수, 한국사 근대사를 우선 정리했습니다. 나머지 과목은 자료가 들어오는 순서대로 같은 구조로 확장합니다." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{subjects.map((subject) => <SubjectCard key={subject.id} subject={subject} count={getContentCount(subjectContents[subject.id])} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-[34px] border border-white/70 bg-white/78 p-6 shadow-card backdrop-blur-2xl lg:p-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-black text-red-600"><Clock3 className="h-4 w-4" /> 시험 직전 사용법</p><h2 className="mt-4 text-2xl font-black text-slate-950">원문 → 어휘 → 구문 → 트레이닝 순서로 회독</h2><p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">긴 설명을 여기저기 흩뿌리지 않고, 문항별 페이지에서 필요한 학습 요소만 바로 확인하도록 정리했습니다. 모바일에서도 카드가 세로로 자연스럽게 쌓이도록 구성했습니다.</p></div><Link href="/chat" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-700">AI로 보강하기 <BrainCircuit className="h-4 w-4" /></Link></div></div>
      </section>

      <SiteFooter />
      <FloatingAIButton />
    </main>
  );
}
