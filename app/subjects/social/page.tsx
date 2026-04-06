"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, Landmark, Sparkles, Images } from "lucide-react";
import { socialUnitOneQuiz, socialUnitOneSections } from "@/lib/social-textbook";

type Tab = "concept" | "quiz" | "gallery";

type UnitInfo = {
  id: string;
  title: string;
  overview: string;
  points: string[];
  images: { src: string; label: string }[];
};

const extraUnits: UnitInfo[] = [
  {
    id: "unit-02",
    title: "2단원 · 인간, 사회, 환경과 행복",
    overview: "행복의 기준과 의미, 행복한 삶을 실현하기 위한 다양한 조건, 정치 환경·경제 안정·민주주의·도덕적 실천과 행복의 관계를 정리하는 단원이다.",
    points: [
      "행복의 기준은 시대·지역·가치관에 따라 달라짐",
      "고대·중세·근대·현대의 행복 기준 비교",
      "좋은 정치 환경, 경제 안정, 민주주의, 도덕적 실천이 행복에 미치는 영향",
      "객관적 지표와 주관적 지표를 함께 봐야 함"
    ],
    images: [
      { src: "/social-workbook/unit2-cover.png", label: "2단원 표지" },
      { src: "/social-workbook/unit2-1.png", label: "행복의 기준과 의미" },
      { src: "/social-workbook/unit2-2.png", label: "동서양 사상가의 행복" },
      { src: "/social-workbook/unit2-3.png", label: "철학자들의 행복관" },
      { src: "/social-workbook/unit2-4.png", label: "행복한 삶의 조건" },
    ],
  },
  {
    id: "unit-03",
    title: "3단원 · 자연환경과 인간",
    overview: "기후와 인간 생활, 지형과 주민 생활, 자연재해와 환경권, 안전하고 쾌적한 환경에서 살 권리를 다루는 단원이다.",
    points: [
      "열대·건조·온대·냉대·한대 기후 지역 비교",
      "산지·평야·해안·화산 지형과 생활 모습 연결",
      "우리나라 자연재해의 특징과 대응",
      "안전하고 쾌적한 환경에서 살 시민의 권리"
    ],
    images: [
      { src: "/social-workbook/unit3-cover.png", label: "3단원 표지" },
      { src: "/social-workbook/unit3-1.png", label: "자연환경과 인간 생활" },
      { src: "/social-workbook/unit3-2.png", label: "세계의 여러 기후 지역" },
      { src: "/social-workbook/unit3-3.png", label: "온대·냉대·한대 기후" },
      { src: "/social-workbook/unit3-4.png", label: "지형과 자연재해" },
    ],
  },
];

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function UnitCard({ title, overview, points }: { title: string; overview: string; points: string[] }) {
  return (
    <article className="rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-card">
      <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white w-fit"><Landmark className="h-4 w-4" />{title}</div>
      <p className="mt-5 text-base leading-8 text-slate-700">{overview}</p>
      <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-700">
        {points.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </article>
  );
}

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>("concept");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [results, setResults] = useState<Array<{ id: number; ok: boolean; answer: string }>>([]);

  const quizPool = useMemo(() => shuffle(socialUnitOneQuiz).slice(0, 100), [quizStarted]);
  const current = quizPool[quizIndex];

  const checkAnswer = () => {
    if (!current) return;
    const normalized = input.trim().replace(/\s+/g, "");
    const ok = normalized === current.answer.replace(/\s+/g, "");
    setFeedback(ok ? "정답" : `오답 · 정답: ${current.answer}`);
    setResults((prev) => [...prev, { id: current.id, ok, answer: current.answer }]);
    if (ok) setScore((prev) => prev + 1);
    setTimeout(() => {
      setInput("");
      setFeedback(null);
      if (quizIndex < quizPool.length - 1) setQuizIndex((prev) => prev + 1);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
        <section className="mt-6 overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-glow">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Social Archive</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">사회 1~3단원</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">워크북 사진을 바탕으로 1단원부터 3단원까지 단원별 개념 정리, 자료 확인, 시험 포인트, 그리고 빈칸 테스트를 이어서 볼 수 있게 바꿨습니다.</p>
            </div>
            <div className="border-l border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white md:p-10">
              <div className="space-y-3 text-sm leading-7 text-white/90">
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">1단원: 통합적 관점</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">2단원: 행복의 기준과 행복한 삶의 조건</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">3단원: 자연환경과 인간 생활, 자연재해, 환경권</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => setTab("concept")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "concept" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}>개념 정리</button>
          <button onClick={() => setTab("gallery")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "gallery" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}><Images className="mr-2 inline h-4 w-4" />워크북 보기</button>
          <button onClick={() => setTab("quiz")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "quiz" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}>빈칸 테스트</button>
        </section>

        {tab === "concept" ? (
          <div className="mt-8 space-y-6">
            <UnitCard title="1단원 · 통합적 관점" overview="시간적·공간적·사회적·윤리적 관점을 비교하고, 여러 관점을 함께 적용하는 통합적 관점의 필요성을 이해하는 단원이다." points={["시간적·공간적·사회적·윤리적 관점 구분", "교복·인구·학교·채식·AI 사례 연결", "탐구 문제 선정 → 계획 수립 → 자료 분석 → 해결 방안 모색"]} />
            {socialUnitOneSections.slice(0,3).map((section) => <UnitCard key={section.id} title={section.title} overview={section.summary} points={[...section.bullets.slice(0,2), ...section.examples.slice(0,2)]} />)}
            {extraUnits.map((unit) => <UnitCard key={unit.id} title={unit.title} overview={unit.overview} points={unit.points} />)}
          </div>
        ) : tab === "gallery" ? (
          <div className="mt-8 space-y-8">
            {[{title:"1단원 워크북", images:[
              { src: "/social-workbook/unit1-cover.png", label: "1단원 표지" },
              { src: "/social-workbook/unit1-1.png", label: "시간적 관점" },
              { src: "/social-workbook/unit1-2.png", label: "공간적 관점" },
              { src: "/social-workbook/unit1-3.png", label: "사회적·윤리적 관점" },
              { src: "/social-workbook/unit1-4.png", label: "통합적 관점" },
              { src: "/social-workbook/unit1-5.png", label: "감염병 차별 사례" },
            ]}, ...extraUnits].map((group) => (
              <section key={group.title} className="rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-card">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">{group.title}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {group.images.map((img) => (
                    <div key={img.src} className="rounded-[24px] border border-blue-100 bg-white p-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-slate-50">
                        <Image src={img.src} alt={img.label} fill className="object-contain" />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-slate-700">{img.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="mt-8 rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">사회 1단원 빈칸 100문제</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">1단원 기준 핵심 개념을 빈칸으로 돌려보는 시험형 퀴즈다. 2·3단원은 워크북 열람 중심으로 먼저 반영했다.</p>
              </div>
              <button onClick={() => { setQuizStarted(true); setQuizIndex(0); setScore(0); setInput(""); setFeedback(null); setResults([]); }} className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">테스트 새로 시작</button>
            </div>
            {!quizStarted ? <div className="mt-6 rounded-[24px] bg-slate-50 p-6"><button onClick={() => setQuizStarted(true)} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">시작하기</button></div> : current ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
                <div className="rounded-[24px] bg-slate-50 p-6">
                  <div className="flex items-center justify-between"><span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Q{quizIndex + 1} / {quizPool.length}</span><span className="text-sm font-semibold text-slate-500">정답 수 {score}</span></div>
                  <p className="mt-5 text-xl leading-9 text-slate-800">{current.prompt}</p>
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="정답 입력" className="mt-6 w-full rounded-[18px] border border-blue-200 bg-white px-4 py-3 text-sm outline-none" onKeyDown={(e) => { if (e.key === "Enter") checkAnswer(); }} />
                  <button onClick={checkAnswer} className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">정답 확인</button>
                  {feedback ? <div className={`mt-4 rounded-[18px] px-4 py-3 text-sm font-semibold ${feedback.startsWith("정답") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{feedback}</div> : null}
                </div>
                <div className="rounded-[24px] border border-blue-100 bg-white p-6">
                  <div className="flex items-center gap-2 text-brand-700"><Sparkles className="h-4 w-4" /><p className="text-sm font-semibold uppercase tracking-[0.24em]">최근 결과</p></div>
                  <div className="mt-4 space-y-3 max-h-[520px] overflow-auto">
                    {results.map((item) => <div key={`${item.id}-${item.answer}`} className={`rounded-[18px] px-4 py-3 text-sm ${item.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>#{item.id} · {item.ok ? "정답" : `오답 / ${item.answer}`}</div>)}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        )}
      </div>
    </main>
  );
}
