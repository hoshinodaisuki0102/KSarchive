import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Boxes, Calculator, Route, Sigma, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { countingFormulas } from "@/lib/math-counting-data";

export default function MathPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl sm:p-9 lg:p-11">
            <div className="relative max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                <Sigma className="h-4 w-4" /> Math · 경우의 수 공식 아카이브
              </p>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                교과서 밖까지 보는<br />
                <span className="text-gradient-sky">순열·조합 공식 정리</span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                합의 법칙, 순열·조합, 별과 막대기, 이웃하지 않게 배치, 원순열, 포함배제, 카탈란 수, 스털링 수까지 시험과 심화 문제에서 바로 꺼내 쓸 수 있게 정리했습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Calculator, title: "기본", value: "P / C", text: "순서가 있으면 순열, 없으면 조합" },
            { icon: Boxes, title: "분배", value: "H / Stars", text: "중복조합과 정수해 문제" },
            { icon: Route, title: "배치", value: "No Adjacent", text: "이웃하지 않게, 원순열, 목걸이" },
            { icon: Sparkles, title: "심화", value: "Catalan", text: "카탈란 수와 스털링 수" }
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
              <h2 className="text-2xl font-black text-slate-950">판단 루틴</h2>
              <p className="text-sm font-bold text-slate-500">문제를 보자마자 공식보다 먼저 구조를 고릅니다.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "순서가 결과를 바꾸는가? 바꾸면 순열, 안 바꾸면 조합입니다.",
              "같은 것을 다시 고를 수 있는가? 가능하면 중복순열 또는 중복조합입니다.",
              "직접 세기 복잡한가? 전체-여사건, 포함배제, 기준 원소 고정으로 바꿉니다."
            ].map((tip) => <div key={tip} className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-bold leading-7 text-slate-700">{tip}</div>)}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          {countingFormulas.map((item) => (
            <article key={item.id} className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur-2xl">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-700">{item.subtitle}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{item.title}</h2>
                </div>
                <div className="rounded-2xl bg-slate-950 px-4 py-2 font-mono text-sm font-black text-white">{item.formula}</div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <Info title="언제 쓰나" text={item.when} />
                <Info title="핵심 아이디어" text={item.idea} />
              </div>
              <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">예시 문제</p>
                <p className="mt-2 text-sm font-black leading-7 text-slate-800">{item.example}</p>
                <p className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-bold leading-7 text-slate-600 shadow-sm">풀이: {item.solution}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">#{tag}</span>)}
              </div>
            </article>
          ))}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{title}</p><p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{text}</p></div>;
}
