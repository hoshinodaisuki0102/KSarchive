import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { countingFormulas } from "@/lib/math-counting-data";

export default function MathPage() {
  return (
    <main className="min-h-screen bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
        <h1 className="mt-8 text-4xl font-black">경우의 수 공식과 적용 문제</h1>
        <p className="mt-3 text-sm font-bold leading-7 text-slate-600">공식, 개념, 교육과정 분류, 실제 문제와 풀이를 함께 확인합니다.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {countingFormulas.map((item) => {
            const lv = item.tags.includes("심화") || item.id === "hockey-stick" || item.id === "pigeonhole" ? "심화(교육과정 외)" : "교육과정/확장";
            return (
              <article key={item.id} className="rounded-[30px] bg-white p-6 shadow-card">
                <h2 className="text-2xl font-black">{item.title}</h2>
                <span className="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">{lv}</span>
                <p className="mt-2 rounded-xl bg-slate-950 px-3 py-2 font-mono text-sm font-black text-white">{item.formula}</p>
                <p className="mt-4 text-sm font-bold leading-7">{item.when}</p>
                <p className="mt-3 text-sm font-black leading-7">문제: {item.example}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-slate-600">풀이: {item.solution}</p>
              </article>
            );
          })}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
