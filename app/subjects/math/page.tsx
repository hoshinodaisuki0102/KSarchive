import Link from "next/link";
import { ArrowLeft, Sigma } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { countingFormulas, curriculumSummary } from "@/lib/math-counting-data";

export default function MathPage() {
  return (
    <main className="min-h-screen bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
        <section className="mt-8 rounded-[40px] bg-mesh-dark p-8 text-white shadow-deep">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black"><Sigma className="h-4 w-4" /> Math · 경우의 수</p>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">공식 암기에서<br />문제 적용까지</h1>
          <p className="mt-4 max-w-3xl text-sm font-bold leading-8 text-slate-300">공식, 사용 신호, 주의점, 실제형 문제, 조건 정리, 전략, 단계 풀이를 한 카드에 정리했습니다.</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {curriculumSummary.map((item) => (
            <div key={item.level} className="rounded-[28px] bg-white/90 p-5 shadow-card">
              <p className="text-xs font-black text-brand-700">{item.level}</p>
              <p className="mt-3 text-3xl font-black">{countingFormulas.filter((tool) => tool.curriculumLevel === item.level).length}개</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          {countingFormulas.map((item) => (
            <article key={item.id} className="rounded-[30px] bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-brand-700">{item.subtitle}</p>
                  <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
                  <span className="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">{item.curriculumLevel}</span>
                </div>
                <p className="rounded-xl bg-slate-950 px-3 py-2 font-mono text-sm font-black text-white">{item.formula}</p>
              </div>
              <p className="mt-4 text-sm font-bold leading-7"><b>언제 쓰나:</b> {item.when}</p>
              <p className="mt-2 text-sm font-bold leading-7"><b>핵심:</b> {item.idea}</p>
              <p className="mt-2 text-sm font-bold leading-7 text-amber-700"><b>주의:</b> {item.warning}</p>
              <div className="mt-3 flex flex-wrap gap-2">{item.signalWords.map((word) => <span key={word} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">{word}</span>)}</div>
              <div className="mt-4 rounded-2xl bg-indigo-50 p-4">
                <div className="flex flex-wrap justify-between gap-2"><p className="text-xs font-black text-indigo-600">적용 문제</p><p className="text-xs font-black text-indigo-700">{item.problem.sourceType} · {item.problem.difficulty}</p></div>
                <p className="mt-2 text-sm font-black leading-7">{item.problem.problem}</p>
                <p className="mt-3 text-xs font-black text-slate-500">조건 정리</p>
                <ul className="mt-1 text-sm font-bold leading-6 text-slate-600">{item.problem.given.map((given) => <li key={given}>• {given}</li>)}</ul>
                <p className="mt-3 text-sm font-bold leading-7"><b>전략:</b> {item.problem.strategy}</p>
                <ol className="mt-2 rounded-xl bg-white p-3 text-sm font-bold leading-7 text-slate-600">{item.problem.solutionSteps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol>
                <p className="mt-3 rounded-xl bg-slate-950 p-3 text-sm font-black text-white">답: {item.problem.answer}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
