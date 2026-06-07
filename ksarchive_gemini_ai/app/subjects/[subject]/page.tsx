import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck, ClipboardList, FileText, Layers3, MessageCircleQuestion, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import {
  englishBuildPlan,
  getContentCount,
  getSubjectById,
  subjectContents,
  subjects,
  type SubjectId
} from "@/lib/site-data";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subject: subject.id }));
}

type PageProps = {
  params: Promise<{ subject: string }>;
};

const emptySections = [
  { key: "examRanges", title: "시험 범위", icon: Layers3, description: "아직 시험 범위가 입력되지 않았습니다." },
  { key: "notes", title: "필기/개념 정리", icon: FileText, description: "아직 필기 자료가 입력되지 않았습니다." },
  { key: "keyConcepts", title: "핵심 개념", icon: BookOpenCheck, description: "아직 핵심 개념이 입력되지 않았습니다." },
  { key: "quizzes", title: "퀴즈", icon: ClipboardList, description: "아직 퀴즈가 입력되지 않았습니다." }
] as const;

const subjectStatusText = {
  empty: "자료를 넣기 전입니다.",
  rebuilding: "이 과목부터 다시 채우는 중입니다.",
  ready: "자료가 입력되어 있습니다."
} as const;

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const subjectInfo = getSubjectById(subject);

  if (!subjectInfo) {
    notFound();
  }

  const content = subjectContents[subjectInfo.id as SubjectId];
  const count = getContentCount(content);
  const Icon = subjectInfo.icon;

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[44px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="noise-mask relative rounded-[43px] border border-white/10 bg-white/[0.06] p-8 text-white backdrop-blur-2xl lg:p-10">
            <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${subjectInfo.accent} opacity-30 blur-3xl`} />
            <div className="relative">
              <div className={`inline-grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br ${subjectInfo.accent} text-white shadow-lg`}>
                <Icon className="h-8 w-8" />
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-sky-200">{subjectInfo.label}</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight md:text-7xl">{subjectInfo.name}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{subjectInfo.description}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                  {subjectStatusText[subjectInfo.status]}
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-slate-200 backdrop-blur">
                  현재 자료 {count}개
                </span>
              </div>
            </div>
          </div>
        </section>

        {subjectInfo.id === "english" && (
          <section className="mt-8 rounded-[38px] border border-white/70 bg-white/75 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">English first</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">영어부터 다시 시작</h2>
              </div>
              <Link href="/subjects/english" className="hidden rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white md:inline-flex">
                영어 워크스페이스
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {englishBuildPlan.map((item) => (
                <div key={item.title} className="rounded-[26px] border border-sky-100 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {emptySections.map((section) => {
            const SectionIcon = section.icon;
            const items = content[section.key];

            return (
              <div key={section.key} className="rounded-[34px] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                      <SectionIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
                      <p className="text-sm font-bold text-slate-400">{items.length}개</p>
                    </div>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="mt-5 rounded-[26px] border border-dashed border-sky-200 bg-sky-50/70 p-5 text-sm font-semibold leading-7 text-slate-600">
                    {section.description}
                    <br />
                    자료를 보내주면 이 영역에 맞춰 데이터 구조로 정리할 수 있습니다.
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="rounded-2xl border border-slate-100 bg-white p-4">
                        <p className="font-black text-slate-900">{"title" in item ? item.title : "문항"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <section className="mt-8 rounded-[34px] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">AI 자료 연결 위치 <Sparkles className="h-5 w-5 text-brand-700" /></h2>
              <p className="text-sm leading-6 text-slate-500">
                나중에 API 키를 넣고 ai-docs/{subjectInfo.id} 폴더에 자료를 넣으면 이 과목 기준으로 답변하게 확장할 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
