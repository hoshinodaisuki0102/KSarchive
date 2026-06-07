import Link from "next/link";
import { ArrowLeft, ClipboardList, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

export default function QuizPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>
        <section className="relative mt-8 overflow-hidden rounded-[44px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="noise-mask relative rounded-[43px] border border-white/10 bg-white/[0.06] p-8 text-white backdrop-blur-2xl">
            <ClipboardList className="h-11 w-11 text-sky-200" />
            <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-sky-200">Quiz system</p>
            <h1 className="mt-2 text-5xl font-black tracking-tight">퀴즈 시스템</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              현재 공통 퀴즈 데이터는 비어 있습니다. 영어 페이지 안에는 이미 문장 순서 배열과 랜덤 빈칸 트레이닝이 들어가 있으니, 전체 퀴즈 페이지는 나중에 과목별 데이터를 모아 확장하면 됩니다.
            </p>
            <Link href="/subjects/english" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">
              영어 트레이닝 열기 <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
