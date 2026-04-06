import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CalendarRange,
  ChevronRight,
  Sparkles,
  Wand2
} from "lucide-react";
import { FloatingAIButton } from "@/components/floating-ai-button";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { SubjectCard } from "@/components/subject-card";
import {
  chatbotPrompts,
  exams,
  featureCards,
  quickTools,
  subjects,
  updates
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid bg-[size:42px_42px] opacity-60" />
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute right-[-8%] top-8 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-card">
              <Sparkles className="h-4 w-4" />
              경신고 내신 대비용 아카이브 플랫폼
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
              공부 자료를
              <span className="block bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                더 깔끔하게, 더 빠르게.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              KSarchive는 경신고 내신 대비를 위해 과목별 필기, 시험 범위, 퀴즈, AI 질문을
              하나의 흐름으로 묶은 학습 아카이브입니다.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#subjects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                과목 바로가기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#ai"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-brand-700 shadow-card transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
              >
                전체 AI 질문 허브
                <BrainCircuit className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["6개 과목", "과목별 정리"],
                ["AI Hub", "전체 + 과목별 질문"],
                ["Quiz Ready", "문제 시스템 연결"]
              ].map(([title, subtitle]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-card backdrop-blur-sm"
                >
                  <div className="text-2xl font-black text-slate-950">{title}</div>
                  <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
                    Today Snapshot
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    메인 대시보드
                  </h2>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 text-brand-700">
                  <CalendarRange className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {quickTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.title}
                      className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-white to-sky-50 p-4"
                    >
                      <div className="rounded-2xl bg-slate-900 p-3 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{tool.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6 text-white shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                    AI Hub
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">전체 AI 질문 탭</h3>
                </div>
                <div className="rounded-2xl bg-white/15 p-3">
                  <Wand2 className="h-6 w-6" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-white/90">
                과목 밖에서도 따로 존재하는 메인 AI 허브입니다. 나중에 시험 범위 데이터를 학습시켜
                전체 범위 질문을 처리할 수 있습니다.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {chatbotPrompts.map((prompt) => (
                  <span
                    key={prompt}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/90"
                  >
                    {prompt}
                  </span>
                ))}
              </div>

              <Link
                href="/chat"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:-translate-y-0.5"
              >
                AI 허브 열기
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Subjects"
            title="과목별 공간을 바로 들어갈 수 있게"
            description="각 과목은 완전히 같은 틀로 정리하되, 분위기는 딱딱하지 않게 설계했습니다. 필기, 범위, 퀴즈, AI 질문을 한 흐름으로 이어가면 관리가 쉬워집니다."
          />
          <div className="rounded-[28px] border border-blue-100 bg-white/80 p-5 shadow-card">
            <p className="text-sm text-slate-500">이후 각 과목 자료를 보내주면</p>
            <p className="mt-1 text-lg font-bold text-slate-900">한 과목씩 바로 연결 가능</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-4 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div id="exam" className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Exam</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">시험 범위 요약</h2>
            </div>
            <Link href="/exam" className="text-sm font-semibold text-brand-700">
              자세히 보기
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {exams.map((item) => (
              <div
                key={item.subject}
                className="flex items-start justify-between rounded-[24px] border border-blue-100 bg-gradient-to-r from-slate-50 to-sky-50 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.subject}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.range}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                  {item.importance}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/70 bg-white/85 p-7 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Updates</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">최근 업데이트</h2>
            </div>
            <Link href="/updates" className="text-sm font-semibold text-brand-700">
              전체 보기
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {updates.map((update) => (
              <div
                key={update.title}
                className="rounded-[24px] border border-blue-100 bg-white p-4 transition hover:border-blue-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {update.subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{update.date}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{update.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{update.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-white via-sky-50 to-blue-100 p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Quiz System</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              단원별 퀴즈와 오답 복습까지
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              객관식, 단답형, OX, 랜덤 퀴즈를 연결할 수 있는 메인 섹션입니다. 이후 과목 데이터가
              쌓이면 시험 직전 모드나 오답노트까지 확장하기 좋습니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["객관식", "단답형", "OX", "랜덤 퀴즈", "오답 복습"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700"
                >
                  {chip}
                </span>
              ))}
            </div>

            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              퀴즈 페이지 이동
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[28px] border border-white/70 bg-white p-6 shadow-card"
                >
                  <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                </div>
              );
            })}

            <div className="rounded-[28px] border border-white/70 bg-slate-950 p-6 text-white shadow-card md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-300">Next Step</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">
                다음엔 과목 데이터를 한 과목씩 붙이면 됩니다.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                지금은 메인 구조와 분위기를 먼저 잡은 상태입니다. 이후 네가 국어든 영어든 한 과목씩
                보내주면 같은 톤으로 상세 페이지와 데이터 구조까지 이어서 맞춰줄 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-blue-100 bg-white/85 shadow-glow">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">AI Layer</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                전체 AI 허브 + 과목별 AI 진입
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                네가 말한 구조대로, 과목 안에서 질문하는 AI와 별도로 사이트 전체에 독립된 AI 질문 탭을
                둘 수 있게 메인 홈에 두 축을 모두 반영했습니다.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  전체 AI 탭 열기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/subjects/korean"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-blue-50"
                >
                  과목별 AI 예시
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-l border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white md:p-10">
              <div className="max-w-md">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                  Prompt Ideas
                </p>
                <div className="mt-6 space-y-3">
                  {chatbotPrompts.map((prompt) => (
                    <div
                      key={prompt}
                      className="rounded-[22px] border border-white/20 bg-white/10 p-4 text-sm font-medium leading-6 text-white/95"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 KSarchive. 경신고등학교 내신 대비용 학습 아카이브.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            <Link href="/quiz" className="hover:text-brand-700">
              Quiz
            </Link>
            <Link href="/chat" className="hover:text-brand-700">
              AI Chat
            </Link>
          </div>
        </div>
      </footer>

      <FloatingAIButton />
    </main>
  );
}