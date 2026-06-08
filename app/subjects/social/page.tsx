import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Globe2, Layers3, Map, Sparkles } from "lucide-react";
import { CultureWorldMap } from "@/components/culture-world-map";
import { SiteFooter } from "@/components/site-footer";
import { cultureReviewQuestions, cultureZones } from "@/lib/social-culture-data";

export default function SocialPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-[42px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[41px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl sm:p-9 lg:p-11">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow-300/25 blur-3xl" />
            <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-sky-300/15 blur-3xl" />
            <div className="relative max-w-4xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                <Globe2 className="h-4 w-4" /> Social Studies · 문화와 다양성
              </p>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                다양한 문화권의 특징<br />
                <span className="text-gradient-sky">세계지도 탐색</span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                문화권은 자연환경과 인문환경의 영향을 받아 형성됩니다. 지도에서 문화권을 누르고 대표 국가를 확인하면서, 각 문화권의 형성 요인과 생활 방식을 연결해 봅니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Map, title: "단원", value: "IV-1", text: "다양한 문화권의 특징" },
            { icon: Layers3, title: "문화권", value: `${cultureZones.length} zones`, text: "세계 문화권을 색으로 구분" },
            { icon: BookOpenCheck, title: "핵심", value: "환경+생활", text: "자연환경과 인문환경의 영향" },
            { icon: Sparkles, title: "탐색", value: "Country pins", text: "대표 국가 터치 설명" }
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
              <h2 className="text-2xl font-black text-slate-950">이번 범위 핵심 정리</h2>
              <p className="text-sm font-bold text-slate-500">문화권은 자연환경과 인문환경이 함께 만들어낸 생활 양식입니다.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "자연환경은 기후, 지형, 식생, 농업과 음식 문화에 영향을 줍니다.",
              "인문환경은 종교, 언어, 역사, 산업, 식민 지배 경험 등과 관련됩니다.",
              "문화권은 정확한 선으로 나뉘기보다 서로 영향을 주고받으며 경계가 겹칠 수 있습니다."
            ].map((tip) => (
              <div key={tip} className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-bold leading-7 text-slate-700">{tip}</div>
            ))}
          </div>
        </section>

        <CultureWorldMap />

        <section className="mt-8 rounded-[36px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:p-7">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Review</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">빠른 확인 문제</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">문화권 이름을 떠올리며 확인</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {cultureReviewQuestions.map((item, index) => (
              <details key={item.question} className="group rounded-[24px] border border-slate-100 bg-slate-50/80 p-4">
                <summary className="cursor-pointer list-none text-sm font-black leading-7 text-slate-800">{index + 1}. {item.question}</summary>
                <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-brand-700 shadow-sm">정답: {item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
