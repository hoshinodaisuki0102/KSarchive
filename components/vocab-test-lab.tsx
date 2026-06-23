"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  Layers3,
  PencilLine,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  XCircle
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { vocabDays, vocabItems, vocabTotalCount, type VocabItem } from "@/lib/vocab-data";

type QuizMode = "choice" | "input" | "flash";
type Direction = "en-ko" | "ko-en" | "mixed";
type ActualDirection = Exclude<Direction, "mixed">;

type Question = {
  item: VocabItem;
  direction: ActualDirection;
  prompt: string;
  answer: string;
};

const modes: { key: QuizMode; label: string; desc: string }[] = [
  { key: "choice", label: "4지선다", desc: "뜻·단어 빠르게 고르기" },
  { key: "input", label: "직접 입력", desc: "스펠링과 뜻을 직접 쓰기" },
  { key: "flash", label: "플래시카드", desc: "정답을 넘기며 암기" }
];

const directions: { key: Direction; label: string }[] = [
  { key: "en-ko", label: "영어 → 뜻" },
  { key: "ko-en", label: "뜻 → 영어" },
  { key: "mixed", label: "랜덤" }
];

function seededShuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let value = seed || 19;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    value = (value * 1664525 + 1013904223) % 4294967296;
    const target = Math.floor((value / 4294967296) * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function normalizeText(value: string) {
  return value.trim().toLowerCase().replace(/[.,!?;:'"()[\]{}\s\-·/]/g, "");
}

function hasKorean(value: string) {
  return /[가-힣]/.test(value);
}

function isInputCorrect(input: string, answer: string) {
  const typed = input.trim();
  if (!typed) return false;
  if (!hasKorean(answer)) return normalizeText(typed) === normalizeText(answer);

  const compactTyped = typed.replace(/\s+/g, "");
  const candidates = answer
    .split(/[;,/·]|\(|\)|~/)
    .map((part) => part.trim().replace(/\s+/g, ""))
    .filter((part) => part.length >= 2);

  return candidates.some((part) => part.includes(compactTyped) || compactTyped.includes(part)) || answer.includes(typed);
}

function getAnswerValue(item: VocabItem, direction: ActualDirection) {
  return direction === "en-ko" ? item.meaning : item.word;
}

function buildQuestion(item: VocabItem, direction: Direction, index: number): Question {
  const actualDirection: ActualDirection = direction === "mixed" ? (item.id + index) % 2 === 0 ? "en-ko" : "ko-en" : direction;
  return {
    item,
    direction: actualDirection,
    prompt: actualDirection === "en-ko" ? item.word : item.meaning,
    answer: actualDirection === "en-ko" ? item.meaning : item.word
  };
}

export function VocabTestLab() {
  const [selectedDays, setSelectedDays] = useState<number[]>(vocabDays);
  const [mode, setMode] = useState<QuizMode>("choice");
  const [direction, setDirection] = useState<Direction>("en-ko");
  const [seed, setSeed] = useState(11);
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [showFlashAnswer, setShowFlashAnswer] = useState(false);
  const [query, setQuery] = useState("");
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [stat, setStat] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ks-vocab-wrong-ids");
      if (!saved) return;
      const parsed = JSON.parse(saved) as unknown;
      if (Array.isArray(parsed)) setWrongIds(parsed.filter((id): id is number => typeof id === "number"));
    } catch {
      setWrongIds([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ks-vocab-wrong-ids", JSON.stringify(wrongIds));
  }, [wrongIds]);

  const pool = useMemo(() => vocabItems.filter((item) => selectedDays.includes(item.day)), [selectedDays]);
  const orderedPool = useMemo(() => seededShuffle(pool, seed), [pool, seed]);
  const safeIndex = orderedPool.length ? index % orderedPool.length : 0;
  const question = orderedPool.length ? buildQuestion(orderedPool[safeIndex], direction, safeIndex) : null;

  const options = useMemo(() => {
    if (!question) return [];
    const wrongOptions = seededShuffle(
      pool
        .filter((item) => item.id !== question.item.id)
        .map((item) => getAnswerValue(item, question.direction))
        .filter((value, optionIndex, array) => value !== question.answer && array.indexOf(value) === optionIndex),
      question.item.id + seed + safeIndex
    ).slice(0, 3);

    return seededShuffle([question.answer, ...wrongOptions], question.item.id * 3 + seed + safeIndex);
  }, [pool, question, safeIndex, seed]);

  const filteredList = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return vocabItems.filter((item) => {
      if (!selectedDays.includes(item.day)) return false;
      if (!keyword) return true;
      return item.word.toLowerCase().includes(keyword) || item.meaning.includes(keyword) || String(item.no) === keyword;
    });
  }, [query, selectedDays]);

  const wrongItems = useMemo(() => {
    const wrongSet = new Set(wrongIds);
    return vocabItems.filter((item) => wrongSet.has(item.id));
  }, [wrongIds]);

  const isCorrect = question
    ? mode === "choice"
      ? selectedAnswer === question.answer
      : isInputCorrect(inputAnswer, question.answer)
    : false;

  function resetQuestionState() {
    setSelectedAnswer("");
    setInputAnswer("");
    setChecked(false);
    setShowFlashAnswer(false);
  }

  function toggleDay(day: number) {
    setSelectedDays((prev) => {
      const next = prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day].sort((a, b) => a - b);
      return next.length ? next : prev;
    });
    setIndex(0);
    resetQuestionState();
  }

  function reshuffle() {
    setSeed((prev) => prev + 1);
    setIndex(0);
    setStat({ correct: 0, wrong: 0 });
    resetQuestionState();
  }

  function checkAnswer() {
    if (!question || mode === "flash" || checked) return;
    const correct = isCorrect;
    setChecked(true);
    setStat((prev) => ({ correct: prev.correct + (correct ? 1 : 0), wrong: prev.wrong + (correct ? 0 : 1) }));
    setWrongIds((prev) => correct ? prev.filter((id) => id !== question.item.id) : Array.from(new Set([...prev, question.item.id])));
  }

  function moveToItem(item: VocabItem) {
    const foundIndex = orderedPool.findIndex((target) => target.id === item.id);
    if (foundIndex >= 0) {
      setIndex(foundIndex);
      resetQuestionState();
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light px-5 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
              <ArrowLeft className="h-4 w-4" /> 홈으로
            </Link>
            <Link href="/subjects/english" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-brand-700 shadow-card backdrop-blur transition hover:bg-sky-50">
              <BookOpenText className="h-4 w-4" /> 영어 지문랩
            </Link>
          </div>
          <div className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-black text-brand-700">DAY 16~25 · {vocabTotalCount} words</div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[46px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[45px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100"><Sparkles className="h-4 w-4" /> KSarchive Vocab Trainer</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">Word<br /><span className="text-gradient-sky">Test Lab</span></h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">DAY 16~25 단어 {vocabTotalCount}개를 4지선다, 직접 입력, 플래시카드, 오답노트로 반복 학습합니다.</p>
          </div>
        </section>

        <section className="mt-6 rounded-[34px] border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur-2xl">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedDays(vocabDays); setIndex(0); resetQuestionState(); }} className={`rounded-full px-4 py-2 text-sm font-black transition ${selectedDays.length === vocabDays.length ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>전체</button>
            {vocabDays.map((day) => (
              <button key={day} onClick={() => toggleDay(day)} className={`rounded-full px-4 py-2 text-sm font-black transition ${selectedDays.includes(day) ? "bg-brand-600 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>DAY {day}</button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
            <div className="grid gap-2 sm:grid-cols-3">
              {modes.map((item) => (
                <button key={item.key} onClick={() => { setMode(item.key); resetQuestionState(); }} className={`rounded-[22px] px-4 py-3 text-left transition ${mode === item.key ? "bg-slate-950 text-white shadow-deep" : "bg-white text-slate-600 hover:bg-sky-50"}`}>
                  <p className="text-sm font-black">{item.label}</p>
                  <p className="mt-1 text-xs font-bold opacity-70">{item.desc}</p>
                </button>
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {directions.map((item) => (
                <button key={item.key} onClick={() => { setDirection(item.key); resetQuestionState(); }} className={`rounded-[22px] px-4 py-3 text-sm font-black transition ${direction === item.key ? "bg-brand-600 text-white shadow-deep" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.label}</button>
              ))}
            </div>
            <button onClick={reshuffle} className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-card transition hover:-translate-y-0.5 hover:bg-sky-50"><Shuffle className="h-4 w-4" /> 섞기</button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.78fr]">
          <section className="rounded-[38px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-2xl lg:p-8">
            {question ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-brand-700">DAY {question.item.day} · {question.item.no}번 · {question.direction === "en-ko" ? "영어 → 뜻" : "뜻 → 영어"}</p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{question.prompt}</h2>
                  </div>
                  <div className="rounded-[22px] bg-slate-950 px-4 py-3 text-right text-white shadow-card"><p className="text-xs font-bold text-slate-300">이번 세트</p><p className="mt-1 text-xl font-black">{safeIndex + 1} / {orderedPool.length}</p></div>
                </div>

                {mode === "choice" && (
                  <div className="mt-8 grid gap-3">
                    {options.map((option) => {
                      const picked = selectedAnswer === option;
                      const correctOption = checked && option === question.answer;
                      const wrongPicked = checked && picked && option !== question.answer;
                      return (
                        <button key={option} onClick={() => { if (!checked) setSelectedAnswer(option); }} className={`rounded-[26px] border px-5 py-4 text-left text-base font-extrabold leading-7 transition ${correctOption ? "border-emerald-200 bg-emerald-50 text-emerald-700" : wrongPicked ? "border-red-200 bg-red-50 text-red-700" : picked ? "border-slate-900 bg-slate-950 text-white" : "border-sky-100 bg-white text-slate-700 hover:bg-sky-50"}`}>{option}</button>
                      );
                    })}
                  </div>
                )}

                {mode === "input" && (
                  <div className="mt-8">
                    <label className="text-sm font-black text-slate-500">정답 입력</label>
                    <input value={inputAnswer} onChange={(event) => { setInputAnswer(event.target.value); setChecked(false); }} onKeyDown={(event) => { if (event.key === "Enter") checkAnswer(); }} placeholder="정답을 입력하세요" className="mt-3 w-full rounded-[26px] border border-sky-100 bg-white px-5 py-4 text-lg font-black outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-sky-100" />
                    <p className="mt-3 text-xs font-bold leading-6 text-slate-500">뜻 입력은 핵심어가 포함되면 맞은 것으로 처리하고, 영어 입력은 철자를 정확히 확인합니다.</p>
                  </div>
                )}

                {mode === "flash" && (
                  <div className="mt-8 rounded-[32px] border border-sky-100 bg-sky-50/80 p-6">
                    <p className="text-sm font-black text-brand-700">카드를 눌러 정답 확인</p>
                    <button onClick={() => setShowFlashAnswer((prev) => !prev)} className="mt-4 min-h-40 w-full rounded-[30px] bg-white px-6 py-8 text-center text-2xl font-black leading-10 text-slate-950 shadow-card transition hover:-translate-y-0.5">{showFlashAnswer ? question.answer : "정답 보기"}</button>
                  </div>
                )}

                {checked && mode !== "flash" && (
                  <div className={`mt-6 flex items-start gap-3 rounded-[26px] p-5 ${isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                    {isCorrect ? <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" /> : <XCircle className="mt-1 h-5 w-5 shrink-0" />}
                    <div><p className="font-black">{isCorrect ? "정답" : "오답"}</p><p className="mt-1 text-sm font-bold leading-6">정답: {question.answer}</p></div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-sm font-black">
                    <span className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-700">맞음 {stat.correct}</span>
                    <span className="rounded-full bg-red-50 px-4 py-2 text-red-700">틀림 {stat.wrong}</span>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-600">오답노트 {wrongIds.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mode !== "flash" && <button onClick={checkAnswer} disabled={checked || (mode === "choice" ? !selectedAnswer : !inputAnswer.trim())} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"><CheckCircle2 className="h-4 w-4" /> 채점</button>}
                    <button onClick={() => { setIndex((prev) => prev + 1); resetQuestionState(); }} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5">다음 문제</button>
                  </div>
                </div>
              </>
            ) : <div className="rounded-[28px] bg-white p-8 text-center font-black text-slate-500">선택된 DAY가 없습니다.</div>}
          </section>

          <aside className="grid gap-5">
            <section className="rounded-[34px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-2xl">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white"><Search className="h-5 w-5" /></span><div><h2 className="font-black text-slate-950">단어 목록 검색</h2><p className="text-xs font-bold text-slate-500">선택 DAY 기준 {filteredList.length}개</p></div></div>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="단어, 뜻, 번호 검색" className="mt-4 w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-400 focus:ring-4 focus:ring-sky-100" />
              <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto pr-1">
                {filteredList.slice(0, 120).map((item) => (
                  <button key={item.id} onClick={() => moveToItem(item)} className="w-full rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition hover:bg-sky-50">
                    <p className="text-xs font-black text-brand-700">DAY {item.day} · {item.no}</p><p className="mt-1 font-black text-slate-950">{item.word}</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{item.meaning}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[34px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-red-600"><PencilLine className="h-5 w-5" /></span><div><h2 className="font-black text-slate-950">오답노트</h2><p className="text-xs font-bold text-slate-500">브라우저에 자동 저장</p></div></div>
                <button onClick={() => setWrongIds([])} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 hover:bg-red-50 hover:text-red-600"><RotateCcw className="h-4 w-4" /></button>
              </div>
              <div className="mt-4 space-y-2">
                {wrongItems.length ? wrongItems.slice(0, 12).map((item) => (
                  <div key={item.id} className="rounded-2xl bg-red-50 px-4 py-3"><p className="text-xs font-black text-red-600">DAY {item.day} · {item.no}</p><p className="mt-1 font-black text-slate-950">{item.word}</p><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{item.meaning}</p></div>
                )) : <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-500">아직 저장된 오답이 없습니다.</p>}
              </div>
            </section>

            <section className="rounded-[34px] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-2xl">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-sky-50 p-4"><Layers3 className="mx-auto h-5 w-5 text-brand-700" /><p className="mt-2 text-xl font-black text-slate-950">{selectedDays.length}</p><p className="text-xs font-bold text-slate-500">선택 DAY</p></div>
                <div className="rounded-2xl bg-sky-50 p-4"><BookOpenText className="mx-auto h-5 w-5 text-brand-700" /><p className="mt-2 text-xl font-black text-slate-950">{pool.length}</p><p className="text-xs font-bold text-slate-500">학습 단어</p></div>
                <div className="rounded-2xl bg-sky-50 p-4"><Sparkles className="mx-auto h-5 w-5 text-brand-700" /><p className="mt-2 text-xl font-black text-slate-950">3</p><p className="text-xs font-bold text-slate-500">모드</p></div>
              </div>
            </section>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
