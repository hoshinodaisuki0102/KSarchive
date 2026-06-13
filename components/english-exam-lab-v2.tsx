"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Ear, HelpCircle, Languages, ListChecks, Newspaper, RotateCcw, Shuffle, Sparkles, TextCursorInput, Wand2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { listeningScripts, readingPassages, type ReadingPassage } from "@/lib/english-data";
import { buildMockDatabase, cleanExamText, splitExamSentences, type MockType } from "@/lib/english-mock-db";

type Mode = "reading" | "listening" | "blank" | "variant" | "order";
type BlankToken = { id: number; answer: string; first: string; length: number };
type BlankPart = string | BlankToken;
type BlankCandidate = { answer: string; start: number; end: number; weight: number };

const tabs = [
  { key: "reading" as const, label: "독해 분석", icon: Languages },
  { key: "listening" as const, label: "듣기", icon: Ear },
  { key: "blank" as const, label: "빈칸", icon: TextCursorInput },
  { key: "variant" as const, label: "변형", icon: Newspaper },
  { key: "order" as const, label: "문장순서", icon: Shuffle }
];

const mockTypes: { key: MockType; label: string; desc: string }[] = [
  { key: "title", label: "제목", desc: "24번식" },
  { key: "main", label: "요지", desc: "20·22·23번식" },
  { key: "blank", label: "빈칸", desc: "31~34번식" },
  { key: "grammar", label: "어법", desc: "29번식" },
  { key: "vocab", label: "어휘", desc: "30번식" },
  { key: "order", label: "순서", desc: "변형문제는 A/B/C 문단형" },
  { key: "insert", label: "삽입", desc: "38~39번식" }
];

const stopWords = new Set("the and that this there their with from when what where which would could should about because people more were they have will into your them then than very some only also such most many much being been does did can not are was is to of in on for as by it we you he she his her or if our all one two has had who its but may own any a an while after before over under through among these those each every other another just even still finally first next last make made take took use used help helps helped way".split(" "));

function normalize(value: string) { return value.trim().toLowerCase().replace(/[.,!?;:'"()[\]{}\s-]/g, ""); }
function escapeRegex(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function seededShuffle<T>(items: T[], seed: number) { const copy = [...items]; let value = seed || 13; for (let i = copy.length - 1; i > 0; i -= 1) { value = (value * 1664525 + 1013904223) % 4294967296; const j = Math.floor((value / 4294967296) * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function addCandidate(list: BlankCandidate[], source: string, answer: string, weight: number) { const trimmed = answer.trim(); if (!trimmed || trimmed.length < 4) return; const pattern = escapeRegex(trimmed).replace(/\s+/g, "\\s+"); const regex = new RegExp(`(^|[^A-Za-z])(${pattern})(?=$|[^A-Za-z])`, "gi"); let match: RegExpExecArray | null; while ((match = regex.exec(source))) { const prefixLength = match[1]?.length ?? 0; const start = match.index + prefixLength; const found = match[2] ?? trimmed; list.push({ answer: found, start, end: start + found.length, weight }); } }

function makeBlankQuestion(passage: ReadingPassage, count: number, seed: number): { parts: BlankPart[]; blanks: BlankToken[] } {
  const source = cleanExamText(passage.passage);
  const candidates: BlankCandidate[] = [];
  for (const item of passage.vocab) addCandidate(candidates, source, item.word, item.word.includes(" ") ? 10 : 7);
  for (const match of source.matchAll(/\b[A-Za-z][A-Za-z'-]{4,}\b/g)) {
    const word = match[0];
    if (stopWords.has(word.toLowerCase())) continue;
    const start = match.index ?? 0;
    candidates.push({ answer: word, start, end: start + word.length, weight: word.length >= 8 ? 6 : 4 });
  }
  const unique = new Map<string, BlankCandidate>();
  for (const c of candidates) { const key = `${c.start}-${c.end}-${c.answer.toLowerCase()}`; if (!unique.has(key) || unique.get(key)!.weight < c.weight) unique.set(key, c); }
  const picked: BlankCandidate[] = [];
  for (const c of seededShuffle(Array.from(unique.values()), passage.number * 1009 + seed * 97 + count * 31)) { if (picked.some((p) => !(c.end <= p.start || c.start >= p.end))) continue; picked.push(c); if (picked.length >= count) break; }
  picked.sort((a, b) => a.start - b.start);
  const parts: BlankPart[] = [];
  const blanks: BlankToken[] = [];
  let cursor = 0;
  picked.forEach((c, index) => { parts.push(source.slice(cursor, c.start)); const token = { id: index, answer: c.answer, first: c.answer[0] ?? "", length: c.answer.replace(/\s+/g, "").length }; parts.push(token); blanks.push(token); cursor = c.end; });
  parts.push(source.slice(cursor));
  return { parts, blanks };
}

function makeAnalyses(passage: ReadingPassage) {
  const translations = cleanExamText(passage.translation).split(/(?<=[.다요죠까])\s+/);
  return splitExamSentences(passage.passage).map((sentence, index, arr) => {
    const role = index === 0 ? "도입" : index === arr.length - 1 ? "마무리" : /however|but|whereas|rather/i.test(sentence) ? "대조" : /for example|for instance|such as/i.test(sentence) ? "예시" : /therefore|so|in this sense/i.test(sentence) ? "정리" : "전개";
    const notes = [
      /\b(that|which|who|where|when)\b/i.test(sentence) && "관계사/접속사 확인",
      /\b[A-Za-z]+ing\b/.test(sentence) && "-ing 용법 확인",
      /\bto\s+[a-z]+\b/i.test(sentence) && "to부정사 확인",
      /\b(however|but|therefore|so|rather|whereas)\b/i.test(sentence) && "연결어 주의",
      /\b(is|are|was|were|be|been)\s+\w+ed\b/i.test(sentence) && "수동태/분사 확인"
    ].filter(Boolean) as string[];
    return { sentence, role, translation: translations[index] ?? "전문 해석과 대조하세요.", notes: notes.length ? notes : ["주어-동사 중심으로 구조 확인"] };
  });
}

export function EnglishExamLabV2() {
  const [mode, setMode] = useState<Mode>("reading");
  const [selectedNumber, setSelectedNumber] = useState(18);
  const [listenNumber, setListenNumber] = useState(1);
  const [blankCount, setBlankCount] = useState(10);
  const [blankSeed, setBlankSeed] = useState(1);
  const [blankInputs, setBlankInputs] = useState<Record<number, string>>({});
  const [blankChecked, setBlankChecked] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [mockType, setMockType] = useState<MockType>("blank");
  const [selectedOption, setSelectedOption] = useState("");
  const [variantChecked, setVariantChecked] = useState(false);
  const [orderSeed, setOrderSeed] = useState(3);
  const [order, setOrder] = useState<string[]>([]);
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(null);
  const [orderChecked, setOrderChecked] = useState(false);

  const current = readingPassages.find((item) => item.number === selectedNumber) ?? readingPassages[0];
  const listening = listeningScripts.find((item) => item.number === listenNumber) ?? listeningScripts[0];
  const db = useMemo(() => buildMockDatabase(readingPassages), []);
  const mockProblem = db[selectedNumber]?.problems.find((item) => item.type === mockType) ?? db[selectedNumber]?.problems[0];
  const blankQuestion = useMemo(() => makeBlankQuestion(current, blankCount, blankSeed), [current, blankCount, blankSeed]);
  const blankScore = blankQuestion.blanks.filter((blank) => normalize(blankInputs[blank.id] ?? "") === normalize(blank.answer)).length;
  const analyses = useMemo(() => makeAnalyses(current), [current]);
  const originalSentences = useMemo(() => splitExamSentences(current.passage), [current]);
  const shuffledSentences = useMemo(() => seededShuffle(originalSentences, selectedNumber * 53 + orderSeed), [originalSentences, selectedNumber, orderSeed]);
  const shownOrder = order.length === originalSentences.length ? order : shuffledSentences;
  const orderCorrect = shownOrder.every((sentence, index) => sentence === originalSentences[index]);

  function resetQuestion(number: number) { setSelectedNumber(number); setBlankInputs({}); setBlankChecked(false); setSelectedOption(""); setVariantChecked(false); setOrder([]); setSelectedSentenceIndex(null); setOrderChecked(false); }
  function swapSentences(from: number, to: number) { const next = [...shownOrder]; [next[from], next[to]] = [next[to], next[from]]; setOrder(next); setSelectedSentenceIndex(null); setOrderChecked(false); }
  function handleSentenceClick(index: number) { if (selectedSentenceIndex === null) { setSelectedSentenceIndex(index); return; } if (selectedSentenceIndex === index) { setSelectedSentenceIndex(null); return; } swapSentences(selectedSentenceIndex, index); }

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light px-5 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50"><ArrowLeft className="h-4 w-4" /> 홈으로</Link>
          <div className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-black text-brand-700">영어 내신 트레이닝</div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[46px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[45px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100"><Sparkles className="h-4 w-4" /> English Mock DB</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">English<br /><span className="text-gradient-sky">Exam Lab</span></h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">변형문제 순서형은 A/B/C 문단형으로 유지하고, 순서 트레이닝은 지문을 문장별로 쪼개 클릭·화살표로 직접 재배열하도록 분리했습니다.</p>
          </div>
        </section>

        <section className="sticky top-[76px] z-30 mt-6 rounded-[32px] border border-white/70 bg-white/75 p-3 shadow-card backdrop-blur-2xl"><div className="grid gap-2 md:grid-cols-5">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.key} onClick={() => setMode(tab.key)} className={`rounded-[24px] px-4 py-4 text-left font-black transition ${mode === tab.key ? "bg-slate-950 text-white shadow-deep" : "bg-white/80 text-slate-600 hover:bg-sky-50"}`}><span className="flex items-center gap-2"><Icon className="h-5 w-5" /> {tab.label}</span></button>; })}</div></section>

        {mode !== "listening" && <QuestionPicker selectedNumber={selectedNumber} onSelect={resetQuestion} />}
        {mode === "reading" && <ReadingPanel current={current} analyses={analyses} />}
        {mode === "listening" && <ListeningPanel listening={listening} listenNumber={listenNumber} setListenNumber={setListenNumber} />}

        {mode === "blank" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/85 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-black text-brand-700">{current.number}번 · 한 지문 랜덤 빈칸</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">지문 하나 안에서 빈칸 만들기</h2><p className="mt-3 text-sm leading-7 text-slate-500">선택된 {current.number}번 본문 안에서만 최대 15개의 빈칸을 랜덤으로 뚫습니다.</p></div><div className="flex flex-wrap gap-2"><select value={blankCount} onChange={(e) => { setBlankCount(Number(e.target.value)); setBlankInputs({}); setBlankChecked(false); }} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-black outline-none"><option value={4}>4개</option><option value={6}>6개</option><option value={8}>8개</option><option value={10}>10개</option><option value={12}>12개</option><option value={15}>15개</option></select><button onClick={() => setShowHints((prev) => !prev)} className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700"><HelpCircle className="h-4 w-4" />힌트</button><button onClick={() => { setBlankSeed((prev) => prev + 1); setBlankInputs({}); setBlankChecked(false); }} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><Wand2 className="h-4 w-4" />새 빈칸</button><button onClick={() => setBlankChecked(true)} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button></div></div>
            <div className="mt-6 rounded-[30px] bg-mesh-dark p-6 text-sm leading-9 text-slate-100 shadow-deep">{blankQuestion.parts.map((part, index) => typeof part === "string" ? <span key={index}>{part}</span> : <span key={part.id} className="inline-flex flex-col items-center align-middle"><input value={blankInputs[part.id] ?? ""} onChange={(e) => { setBlankInputs((prev) => ({ ...prev, [part.id]: e.target.value })); setBlankChecked(false); }} placeholder={showHints ? `${part.first}...(${part.length})` : "빈칸"} className={`mx-1 inline-block w-36 rounded-2xl border px-3 py-1.5 text-center text-sm font-black text-slate-900 outline-none ${blankChecked ? normalize(blankInputs[part.id] ?? "") === normalize(part.answer) ? "border-emerald-400 bg-emerald-50" : "border-rose-400 bg-rose-50" : "border-sky-200 bg-white"}`} />{showHints && <span className="text-[10px] font-black leading-4 text-sky-200">{part.first} / {part.length}</span>}</span>)}</div>
            {blankChecked && <ResultBox correct={blankScore === blankQuestion.blanks.length} text={`점수: ${blankScore} / ${blankQuestion.blanks.length}`} answers={blankQuestion.blanks.map((b) => b.answer)} />}
          </section>
        )}

        {mode === "variant" && mockProblem && (
          <section className="mt-6 grid gap-6 xl:grid-cols-[320px_1fr]"><aside className="rounded-[34px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl xl:sticky xl:top-44 xl:self-start"><p className="text-sm font-black text-slate-950">변형문제 DB</p><p className="mt-1 text-xs font-bold text-slate-500">순서형은 A/B/C 문단형</p><div className="mt-4 grid gap-2">{mockTypes.map((item) => <button key={item.key} onClick={() => { setMockType(item.key); setSelectedOption(""); setVariantChecked(false); }} className={`rounded-[22px] px-4 py-3 text-left transition ${mockType === item.key ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}><span className="block text-sm font-black">{item.label}</span><span className="mt-0.5 block text-xs font-bold opacity-70">{item.desc}</span></button>)}</div></aside><article className="rounded-[16px] border border-slate-300 bg-white p-8 shadow-deep md:p-10"><div className="border-b-2 border-slate-900 pb-4"><p className="text-sm font-bold text-slate-500">KSarchive 변형 모의고사 · 영어 영역</p><h2 className="mt-1 text-3xl font-black text-slate-950">{current.number}번 {mockProblem.label}형</h2></div><div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4"><p className="font-black text-slate-900">{mockProblem.heading}</p><span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-black text-slate-500">{mockProblem.skill}</span></div><div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-9 text-slate-800"><p className="whitespace-pre-wrap">{mockProblem.body}</p></div><div className="mt-6 grid gap-3">{mockProblem.options.map((option) => { const mark = option.slice(0, 1); return <button key={option} onClick={() => { setSelectedOption(mark); setVariantChecked(false); }} className={`rounded-2xl border px-5 py-4 text-left text-sm font-bold transition ${selectedOption === mark ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"}`}>{option}</button>; })}</div><button onClick={() => setVariantChecked(true)} className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white"><ListChecks className="mr-1 inline h-4 w-4" />채점</button>{variantChecked && <ResultBox correct={selectedOption === mockProblem.answer} text={`정답: ${mockProblem.answer}`} answers={[mockProblem.explanation]} />}</article></section>
        )}

        {mode === "order" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/85 p-7 shadow-card backdrop-blur-2xl"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-black text-brand-700">{current.number}번 · 문장 순서 훈련</p><h2 className="mt-2 text-3xl font-black text-slate-950">문장별 배열로 글 흐름 트레이닝</h2><p className="mt-2 text-sm leading-7 text-slate-500">이 화면은 변형문제와 다르게 지문을 문장별로 쪼개 배열합니다. 문장 박스를 하나 누른 뒤 옮길 위치를 누르면 두 문장이 서로 바뀝니다.</p></div><div className="flex gap-2"><button onClick={() => { setOrderSeed((prev) => prev + 1); setOrder([]); setSelectedSentenceIndex(null); setOrderChecked(false); }} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><RotateCcw className="mr-1 inline h-4 w-4" />다시 섞기</button><button onClick={() => setOrderChecked(true)} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button></div></div><div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs font-black leading-6 text-brand-700">사용법: 문장 클릭 → 이동할 자리 클릭 = 두 문장 교환 / ↑↓ 버튼으로 한 칸 이동</div><div className="mt-5 space-y-3">{shownOrder.map((sentence, index) => <button key={`${sentence}-${index}`} onClick={() => handleSentenceClick(index)} className={`block w-full rounded-[26px] border p-4 text-left shadow-sm transition ${selectedSentenceIndex === index ? "border-slate-950 bg-slate-950 text-white" : orderChecked ? sentence === originalSentences[index] ? "border-emerald-200 bg-emerald-50 text-slate-800" : "border-rose-200 bg-rose-50 text-slate-800" : "border-slate-100 bg-white text-slate-800 hover:border-sky-200 hover:bg-sky-50"}`}><div className="flex gap-4"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${selectedSentenceIndex === index ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}>{index + 1}</span><p className="flex-1 text-sm leading-8">{sentence}</p><span className="flex shrink-0 flex-col gap-2"><span onClick={(e) => { e.stopPropagation(); if (index > 0) swapSentences(index, index - 1); }} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↑</span><span onClick={(e) => { e.stopPropagation(); if (index < shownOrder.length - 1) swapSentences(index, index + 1); }} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↓</span></span></div></button>)}</div>{orderChecked && <ResultBox correct={orderCorrect} text={orderCorrect ? "정답입니다." : "아직 순서가 맞지 않습니다."} answers={orderCorrect ? [] : ["지시어, 반복 핵심어, 연결어를 기준으로 다시 배열하세요."]} />}</section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

function QuestionPicker({ selectedNumber, onSelect }: { selectedNumber: number; onSelect: (n: number) => void }) { return <section className="mt-6 rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur-2xl"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black text-slate-950">독해 문항 선택</p><p className="mt-1 text-xs font-bold text-slate-500">18번부터 40번까지</p></div><span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-black text-brand-700">{selectedNumber}번 선택됨</span></div><div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">{readingPassages.map((item) => <button key={item.number} onClick={() => onSelect(item.number)} className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-black transition ${item.number === selectedNumber ? "bg-slate-950 text-white shadow-card" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.number}</button>)}</div></section>; }
function ReadingPanel({ current, analyses }: { current: ReadingPassage; analyses: ReturnType<typeof makeAnalyses> }) { return <section className="mt-6 space-y-6"><article className="rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep"><p className="text-sm font-black text-sky-200">{current.number}번 · {current.type} · 정답 {current.answer}</p><h2 className="mt-2 text-3xl font-black">{current.title}</h2><div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-6 text-[15px] leading-9 text-slate-100"><p>{cleanExamText(current.passage)}</p></div></article><div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"><article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card"><h3 className="text-xl font-black text-slate-950">전문 해석·주요 어휘</h3><p className="mt-4 text-sm leading-8 text-slate-700">{cleanExamText(current.translation)}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{current.vocab.map((item) => <div key={item.word} className="rounded-2xl bg-slate-50 px-4 py-3"><p className="font-black text-slate-950">{item.word}</p><p className="text-sm font-bold text-slate-500">{item.meaning}</p></div>)}</div></article><article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card"><h3 className="text-xl font-black text-slate-950">문장별 내신 분석</h3><div className="mt-4 space-y-3">{analyses.map((item, index) => <div key={item.sentence} className="rounded-2xl border border-slate-100 bg-white p-4"><p className="text-sm font-black text-brand-700">{index + 1}. {item.role}</p><p className="mt-2 text-sm leading-7 text-slate-800">{item.sentence}</p><p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold leading-6 text-slate-500">{item.translation}</p><div className="mt-2 flex flex-wrap gap-2">{item.notes.map((note) => <span key={note} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand-700">{note}</span>)}</div></div>)}</div></article></div></section>; }
function ListeningPanel({ listening, listenNumber, setListenNumber }: { listening: (typeof listeningScripts)[number]; listenNumber: number; setListenNumber: (n: number) => void }) { return <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]"><aside className="rounded-[34px] border border-white/70 bg-white/75 p-5 shadow-card"><p className="text-sm font-black text-slate-950">듣기 번호</p><div className="mt-4 grid grid-cols-4 gap-2 lg:grid-cols-3">{listeningScripts.map((item) => <button key={item.number} onClick={() => setListenNumber(item.number)} className={`rounded-2xl px-3 py-2 text-sm font-black ${item.number === listenNumber ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.number}</button>)}</div></aside><article className="rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep"><p className="text-sm font-black text-sky-200">{listening.number}번 · {listening.type} · 정답 {listening.answer}</p><h2 className="mt-2 text-3xl font-black">{listening.title}</h2><div className="mt-6 rounded-[28px] border border-white/10 bg-white/10 p-6 text-sm leading-8 text-slate-100"><p className="whitespace-pre-wrap">{cleanExamText(listening.script)}</p></div></article></section>; }
function ResultBox({ correct, text, answers }: { correct: boolean; text: string; answers: string[] }) { return <div className={`mt-5 rounded-[26px] border p-4 text-sm font-black ${correct ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-rose-100 bg-rose-50 text-rose-700"}`}><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> {text}</div>{answers.length > 0 && <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{answers.map((answer) => <span key={answer} className="rounded-2xl bg-white px-3 py-2 text-slate-700 shadow-sm">{answer}</span>)}</div>}</div>; }
