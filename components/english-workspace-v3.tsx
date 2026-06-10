"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Ear, FileText, HelpCircle, Languages, ListChecks, Newspaper, RotateCcw, Shuffle, Sparkles, TextCursorInput, Wand2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { listeningScripts, readingPassages, type ReadingPassage } from "@/lib/english-data";

type Mode = "reading" | "listening" | "blank" | "variant" | "order";
type BlankToken = { id: number; answer: string; first: string; length: number };
type BlankPart = string | BlankToken;
type VariantType = "title" | "main" | "blank" | "grammar" | "vocab" | "order" | "insert";

type VariantProblem = {
  heading: string;
  body: string;
  options: string[];
  answer: string;
  explanation: string;
  skill: string;
};

const optionMarks = ["①", "②", "③", "④", "⑤"];
const stopWords = new Set(
  "the and that this there their with from when what where which would could should about because people more were they have will into your them then than very some only also such most many much being been does don did can not are was is to of in on for as by it we you he she his her or if our all one two has had who its but may own any a an while after before over under through among these those each every other another just even still finally first next last good great make made take took use used help helps helped way much many very".split(" ")
);

const tabs = [
  { key: "reading" as const, label: "독해 분석", icon: Languages },
  { key: "listening" as const, label: "듣기", icon: Ear },
  { key: "blank" as const, label: "빈칸", icon: TextCursorInput },
  { key: "variant" as const, label: "변형", icon: Newspaper },
  { key: "order" as const, label: "순서", icon: Shuffle }
];

const variantTypes = [
  { key: "title" as const, label: "제목" },
  { key: "main" as const, label: "요지" },
  { key: "blank" as const, label: "빈칸" },
  { key: "grammar" as const, label: "어법" },
  { key: "vocab" as const, label: "어휘" },
  { key: "order" as const, label: "순서" },
  { key: "insert" as const, label: "삽입" }
];

function cleanText(text: string) {
  return text
    .replace(/\u00ad/g, "")
    .replace(/‐/g, "-")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[.,!?;:'"()[\]{}\s]/g, "");
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitSentences(text: string) {
  const source = cleanText(text);
  const matched = source.match(/[^.!?]+[.!?]+(?:["”']|\))?/g);
  return (matched ?? source.split(/(?=\([A-C]\))/g)).map((item) => item.trim()).filter((item) => item.length > 18).slice(0, 18);
}

function seededShuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let value = seed || 13;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 1103515245 + 12345) % 2147483648;
    const j = Math.floor((value / 2147483648) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function optionize(correct: string, wrongs: string[], seed: number) {
  const unique = Array.from(new Set([correct, ...wrongs].filter(Boolean))).slice(0, 5);
  while (unique.length < 5) unique.push(`지문 흐름과 맞지 않는 선택지 ${unique.length}`);
  const shuffled = seededShuffle(unique, seed);
  const correctIndex = Math.max(0, shuffled.findIndex((item) => item === correct));
  return {
    options: shuffled.map((item, index) => `${optionMarks[index]} ${item}`),
    answer: optionMarks[correctIndex]
  };
}

type BlankCandidate = { answer: string; start: number; end: number; weight: number };

function addCandidate(list: BlankCandidate[], source: string, answer: string, weight: number) {
  const trimmed = answer.trim();
  if (!trimmed || trimmed.length < 4) return;
  const pattern = escapeRegex(trimmed).replace(/\s+/g, "\\s+");
  const regex = new RegExp(`(^|[^A-Za-z])(${pattern})(?=$|[^A-Za-z])`, "gi");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(source))) {
    const prefixLength = match[1]?.length ?? 0;
    const start = match.index + prefixLength;
    const found = match[2] ?? trimmed;
    const end = start + found.length;
    list.push({ answer: found, start, end, weight });
  }
}

function makeBlankQuestion(passage: ReadingPassage, count: number, seed: number): { parts: BlankPart[]; blanks: BlankToken[] } {
  const source = cleanText(passage.passage);
  const candidates: BlankCandidate[] = [];

  for (const item of passage.vocab) {
    addCandidate(candidates, source, item.word, item.word.includes(" ") ? 9 : 7);
  }

  for (const match of source.matchAll(/\b[A-Za-z][A-Za-z'-]{4,}\b/g)) {
    const word = match[0];
    const lower = word.toLowerCase();
    if (stopWords.has(lower)) continue;
    const start = match.index ?? 0;
    const lengthWeight = word.length >= 9 ? 6 : word.length >= 7 ? 5 : 3;
    candidates.push({ answer: word, start, end: start + word.length, weight: lengthWeight });
  }

  const unique = new Map<string, BlankCandidate>();
  for (const candidate of candidates) {
    const key = `${candidate.start}-${candidate.end}-${candidate.answer.toLowerCase()}`;
    const previous = unique.get(key);
    if (!previous || candidate.weight > previous.weight) unique.set(key, candidate);
  }

  const randomized = seededShuffle(Array.from(unique.values()), passage.number * 1009 + seed * 97 + count * 31);
  const picked: BlankCandidate[] = [];
  for (const candidate of randomized) {
    const overlaps = picked.some((item) => !(candidate.end <= item.start || candidate.start >= item.end));
    if (overlaps) continue;
    picked.push(candidate);
    if (picked.length >= count) break;
  }

  picked.sort((a, b) => a.start - b.start);

  const parts: BlankPart[] = [];
  const blanks: BlankToken[] = [];
  let cursor = 0;
  picked.forEach((candidate, index) => {
    parts.push(source.slice(cursor, candidate.start));
    const token: BlankToken = {
      id: index,
      answer: candidate.answer,
      first: candidate.answer[0] ?? "",
      length: candidate.answer.replace(/\s+/g, "").length
    };
    parts.push(token);
    blanks.push(token);
    cursor = candidate.end;
  });
  parts.push(source.slice(cursor));

  return { parts, blanks };
}

function getContentWords(passage: ReadingPassage) {
  return Array.from(new Set(cleanText(passage.passage).match(/\b[A-Za-z][A-Za-z'-]{4,}\b/g) ?? [])).filter((word) => !stopWords.has(word.toLowerCase()));
}

function makeVariantProblem(passage: ReadingPassage, type: VariantType): VariantProblem {
  const body = cleanText(passage.passage);
  const title = passage.title.replace(/^\d+\.\s*/, "");
  const distractorTitles = seededShuffle(readingPassages.filter((item) => item.number !== passage.number).map((item) => item.title.replace(/^\d+\.\s*/, "")), passage.number * 7).slice(0, 4);

  if (type === "main") {
    const correct = `${passage.number}번 글은 '${title}'라는 중심 내용을 설명한다.`;
    const wrongs = distractorTitles.map((item) => `이 글은 '${item}'를 중심으로 전개된다.`);
    const { options, answer } = optionize(correct, wrongs, passage.number * 11);
    return { heading: "다음 글의 요지로 가장 적절한 것은?", body, options, answer, skill: "요지형", explanation: "글 전체의 반복 핵심어와 결론 방향을 압축한 선택지가 정답입니다." };
  }

  if (type === "blank") {
    const blank = makeBlankQuestion(passage, 1, passage.number + 80).blanks[0];
    const correct = blank?.answer ?? passage.vocab[0]?.word ?? "idea";
    const blankedBody = blank ? makeBlankQuestion(passage, 1, passage.number + 80).parts.map((part) => (typeof part === "string" ? part : "__________")).join("") : body;
    const wrongs = seededShuffle(getContentWords(passage).filter((word) => normalize(word) !== normalize(correct)), passage.number * 17).slice(0, 4);
    const { options, answer } = optionize(correct, wrongs, passage.number * 19);
    return { heading: "다음 빈칸에 들어갈 말로 가장 적절한 것은?", body: blankedBody, options, answer, skill: "빈칸 추론", explanation: `정답은 ${correct}. 빈칸 앞뒤 문맥과 반복되는 핵심 개념을 기준으로 판단합니다.` };
  }

  if (type === "grammar") {
    const sentences = splitSentences(passage.passage).slice(0, 6);
    let marked = sentences.join(" ");
    const targets = [/\bto\s+[a-z]+\b/i, /\b(that|which|who|where|when)\b/i, /\b[A-Za-z]+ing\b/i, /\b(is|are|was|were|be|been)\s+\w+ed\b/i, /\b(have|has|had)\s+\w+ed\b/i];
    targets.forEach((regex, index) => {
      const found = marked.match(regex)?.[0];
      if (found) marked = marked.replace(found, `${optionMarks[index]} ${found}`);
    });
    return {
      heading: "다음 글의 밑줄 친 부분에 대한 설명으로 적절하지 않은 것은?",
      body: marked,
      options: [
        "① to부정사는 문장 내 위치에 따라 명사적·형용사적·부사적 용법을 판단한다.",
        "② 관계사/접속사는 선행사와 빠진 성분을 함께 확인한다.",
        "③ -ing 형태는 언제나 진행형 동사로만 쓰인다.",
        "④ be+p.p.는 수동태인지 분사 수식인지 문맥으로 확인한다.",
        "⑤ 완료 표현은 시점의 선후 관계를 드러낼 수 있다."
      ],
      answer: "③",
      skill: "어법 판단",
      explanation: "③이 오답입니다. -ing는 진행형뿐 아니라 동명사, 현재분사, 분사구문으로도 쓰입니다."
    };
  }

  if (type === "vocab") {
    const words = seededShuffle(getContentWords(passage), passage.number * 23).slice(0, 5);
    let marked = body;
    words.forEach((word, index) => {
      marked = marked.replace(new RegExp(`\\b${escapeRegex(word)}\\b`, "i"), `${optionMarks[index]} ${word}`);
    });
    return { heading: "다음 글에서 문맥상 낱말의 쓰임이 적절하지 않은 것은?", body: marked, options: words.map((word, index) => `${optionMarks[index]} ${word}`), answer: "④", skill: "문맥 어휘", explanation: "문맥 어휘형은 단어 자체보다 앞뒤 문장의 긍정·부정 방향을 확인해야 합니다." };
  }

  if (type === "order") {
    const sentences = splitSentences(passage.passage);
    const base = sentences[0] ?? body;
    const pieces = sentences.slice(1, 4);
    const correct = "A - B - C";
    const { options, answer } = optionize(correct, ["A - C - B", "B - A - C", "B - C - A", "C - A - B"], passage.number * 29);
    return { heading: "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?", body: `[주어진 글] ${base}\n\n${pieces.map((sentence, index) => `(${String.fromCharCode(65 + index)}) ${sentence}`).join("\n\n")}`, options, answer, skill: "순서 배열", explanation: "지시어, 반복어, 연결어를 따라가면 원래 순서가 보입니다." };
  }

  if (type === "insert") {
    const sentences = splitSentences(passage.passage);
    const given = sentences[2] ?? sentences[1] ?? body;
    const rest = sentences.filter((sentence) => sentence !== given).slice(0, 5);
    return { heading: "글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?", body: `[주어진 문장] ${given}\n\n${rest.map((sentence, index) => `${optionMarks[index]} ${sentence}`).join(" ")}`, options: optionMarks.map((mark) => `${mark} 표시 위치`), answer: "③", skill: "문장 삽입", explanation: "주어진 문장의 지시어와 반복 핵심어가 앞뒤 문장과 자연스럽게 이어지는 위치를 찾습니다." };
  }

  const { options, answer } = optionize(title, distractorTitles, passage.number * 5);
  return { heading: "다음 글의 제목으로 가장 적절한 것은?", body, options, answer, skill: "제목 추론", explanation: `정답은 ${title}. 제목은 세부 사례가 아니라 글 전체를 덮어야 합니다.` };
}

function makeAnalyses(passage: ReadingPassage) {
  const translations = cleanText(passage.translation).split(/(?<=[.다요죠까])\s+/);
  return splitSentences(passage.passage).map((sentence, index, arr) => {
    const role = index === 0 ? "도입" : index === arr.length - 1 ? "마무리" : /however|but|whereas|rather/i.test(sentence) ? "대조" : /for example|for instance|such as/i.test(sentence) ? "예시" : "전개";
    const notes = [
      /\b(that|which|who|where|when)\b/i.test(sentence) ? "관계사/접속사 확인" : "",
      /\b[A-Za-z]+ing\b/.test(sentence) ? "-ing 용법 확인" : "",
      /\bto\s+[a-z]+\b/i.test(sentence) ? "to부정사 용법 확인" : "",
      /\b(however|but|therefore|so|rather|whereas)\b/i.test(sentence) ? "연결어 주의" : "",
      /\b(is|are|was|were|be|been)\s+\w+ed\b/i.test(sentence) ? "수동태/분사 확인" : ""
    ].filter(Boolean);
    return { sentence, role, translation: translations[index] ?? "전문 해석과 대조하세요.", notes: notes.length ? notes : ["주어-동사 중심으로 구조 확인"] };
  });
}

function pointStorageKey() {
  return "ksarchive-english-local-points";
}

export function EnglishWorkspaceV3() {
  const [mode, setMode] = useState<Mode>("reading");
  const [selectedNumber, setSelectedNumber] = useState(18);
  const [listenNumber, setListenNumber] = useState(1);
  const [blankCount, setBlankCount] = useState(10);
  const [blankSeed, setBlankSeed] = useState(1);
  const [blankInputs, setBlankInputs] = useState<Record<number, string>>({});
  const [blankChecked, setBlankChecked] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [variantType, setVariantType] = useState<VariantType>("blank");
  const [selectedOption, setSelectedOption] = useState("");
  const [variantChecked, setVariantChecked] = useState(false);
  const [order, setOrder] = useState<string[]>([]);
  const [orderSeed, setOrderSeed] = useState(4);
  const [orderChecked, setOrderChecked] = useState(false);
  const [pointMessage, setPointMessage] = useState("");
  const [localPoints, setLocalPoints] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState("");

  const current = readingPassages.find((item) => item.number === selectedNumber) ?? readingPassages[0];
  const listening = listeningScripts.find((item) => item.number === listenNumber) ?? listeningScripts[0];
  const sentences = useMemo(() => splitSentences(current.passage), [current]);
  const analyses = useMemo(() => makeAnalyses(current), [current]);
  const blankQuestion = useMemo(() => makeBlankQuestion(current, blankCount, blankSeed), [current, blankCount, blankSeed]);
  const blankScore = blankQuestion.blanks.filter((blank) => normalize(blankInputs[blank.id] ?? "") === normalize(blank.answer)).length;
  const variantProblem = useMemo(() => makeVariantProblem(current, variantType), [current, variantType]);
  const displayOrder = order.length === sentences.length ? order : seededShuffle(sentences, selectedNumber * 37 + orderSeed);
  const orderCorrect = displayOrder.every((sentence, index) => sentence === sentences[index]);

  useEffect(() => {
    setLocalPoints(Number(localStorage.getItem(pointStorageKey()) ?? 0));
  }, []);

  function resetForNewQuestion(number: number) {
    setSelectedNumber(number);
    setBlankInputs({});
    setBlankChecked(false);
    setShowHints(false);
    setSelectedOption("");
    setVariantChecked(false);
    setOrder([]);
    setOrderChecked(false);
    setPointMessage("");
    setAiNote("");
  }

  async function awardPoints(activityId: string, points: number) {
    const solvedKey = `ksarchive-solved-${activityId}`;
    if (localStorage.getItem(solvedKey)) {
      setPointMessage("이미 이 활동 포인트를 받았습니다. 새 빈칸 또는 다른 유형으로 다시 도전하세요.");
      return;
    }
    localStorage.setItem(solvedKey, "1");
    const next = localPoints + points;
    setLocalPoints(next);
    localStorage.setItem(pointStorageKey(), String(next));
    setPointMessage(`+${points}P 적립! 현재 기기 기준 영어 포인트 ${next}P`);

    try {
      const res = await fetch("/api/points/award", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId, points })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.awarded > 0) setPointMessage(`+${points}P 적립! 서버 포인트도 반영되었습니다.`);
    } catch {
      // local fallback is already applied
    }
  }

  function newBlanks() {
    setBlankSeed((prev) => prev + 1);
    setBlankInputs({});
    setBlankChecked(false);
    setShowHints(false);
    setPointMessage("");
  }

  function checkBlank() {
    setBlankChecked(true);
    if (blankQuestion.blanks.length > 0 && blankScore === blankQuestion.blanks.length) {
      awardPoints(`english-${current.number}-blank-${blankSeed}-${blankCount}`, Math.max(10, blankCount));
    } else {
      setPointMessage("");
    }
  }

  function moveSentence(index: number, direction: -1 | 1) {
    const next = [...displayOrder];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setOrderChecked(false);
  }

  async function askAiVariant() {
    setAiLoading(true);
    setAiNote("");
    const prompt = `${current.number}번 지문으로 실제 고1 전국연합학력평가 영어 독해 형식의 변형문제 3개를 만들어줘. 5지선다, 정답, 해설을 포함하고 본문 내용은 바꾸지 말고 문제 유형만 바꿔. 지문: ${cleanText(current.passage)}`;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, subject: "english" })
      });
      setAiNote(await res.text());
    } catch {
      setAiNote("AI 변형문제 생성에 실패했습니다. 잠시 뒤 다시 시도하세요.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light px-5 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
            <ArrowLeft className="h-4 w-4" /> 홈으로
          </Link>
          <div className="rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-black text-amber-700">영어 로컬 포인트 {localPoints}P</div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[46px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="relative rounded-[45px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl lg:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100"><Sparkles className="h-4 w-4" /> English Exam Lab</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">English<br /><span className="text-gradient-sky">Exam Lab</span></h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">빈칸 퀴즈는 이제 선택한 지문 하나만 사용합니다. 같은 지문을 반복해서 붙이지 않고, 한 지문 안에서 최대 15개의 빈칸을 무작위로 뚫습니다.</p>
          </div>
        </section>

        <section className="sticky top-[76px] z-30 mt-6 rounded-[32px] border border-white/70 bg-white/75 p-3 shadow-card backdrop-blur-2xl">
          <div className="grid gap-2 md:grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.key} onClick={() => setMode(tab.key)} className={`rounded-[24px] px-4 py-4 text-left font-black transition ${mode === tab.key ? "bg-slate-950 text-white shadow-deep" : "bg-white/80 text-slate-600 hover:bg-sky-50"}`}>
                  <span className="flex items-center gap-2"><Icon className="h-5 w-5" /> {tab.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {mode !== "listening" && <QuestionPicker selectedNumber={selectedNumber} onSelect={resetForNewQuestion} />}
        {mode === "reading" && <ReadingPanel current={current} analyses={analyses} />}
        {mode === "listening" && <ListeningPanel listening={listening} listenNumber={listenNumber} setListenNumber={setListenNumber} />}

        {mode === "blank" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/85 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-brand-700">{current.number}번 · 한 지문 랜덤 빈칸</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">지문 하나 안에서 빈칸 만들기</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">현재 선택된 {current.number}번 지문만 사용합니다. 새 빈칸을 누르면 같은 지문 안에서 다른 단어가 무작위로 뚫립니다.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={blankCount} onChange={(e) => { setBlankCount(Number(e.target.value)); setBlankInputs({}); setBlankChecked(false); }} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-black outline-none">
                  <option value={4}>4개</option>
                  <option value={6}>6개</option>
                  <option value={8}>8개</option>
                  <option value={10}>10개</option>
                  <option value={12}>12개</option>
                  <option value={15}>15개</option>
                </select>
                <button onClick={() => setShowHints((prev) => !prev)} className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700"><HelpCircle className="h-4 w-4" /> 힌트</button>
                <button onClick={newBlanks} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><Wand2 className="h-4 w-4" /> 새 빈칸</button>
                <button onClick={checkBlank} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] bg-mesh-dark p-6 text-sm leading-9 text-slate-100 shadow-deep">
              {blankQuestion.parts.map((part, index) =>
                typeof part === "string" ? (
                  <span key={`text-${index}`}>{part}</span>
                ) : (
                  <span key={`blank-${part.id}`} className="inline-flex flex-col items-center align-middle">
                    <input
                      value={blankInputs[part.id] ?? ""}
                      onChange={(e) => { setBlankInputs((prev) => ({ ...prev, [part.id]: e.target.value })); setBlankChecked(false); }}
                      className={`mx-1 inline-block w-36 rounded-2xl border px-3 py-1.5 text-center text-sm font-black text-slate-900 outline-none ${blankChecked ? normalize(blankInputs[part.id] ?? "") === normalize(part.answer) ? "border-emerald-400 bg-emerald-50" : "border-rose-400 bg-rose-50" : "border-sky-200 bg-white"}`}
                      placeholder={showHints ? `${part.first}...(${part.length})` : "빈칸"}
                    />
                    {showHints && <span className="text-[10px] font-black leading-4 text-sky-200">{part.first} / {part.length} letters</span>}
                  </span>
                )
              )}
            </div>

            {blankChecked && (
              <ResultBox correct={blankScore === blankQuestion.blanks.length} text={`점수: ${blankScore} / ${blankQuestion.blanks.length}`} answers={blankQuestion.blanks.map((blank) => blank.answer)} />
            )}
            {pointMessage && <PointMessage message={pointMessage} />}
          </section>
        )}

        {mode === "variant" && (
          <section className="mt-6 grid gap-6 xl:grid-cols-[330px_1fr]">
            <aside className="rounded-[34px] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-2xl xl:sticky xl:top-44 xl:self-start">
              <p className="text-sm font-black text-slate-950">변형 유형</p>
              <div className="mt-4 grid gap-2">
                {variantTypes.map((item) => (
                  <button key={item.key} onClick={() => { setVariantType(item.key); setSelectedOption(""); setVariantChecked(false); setPointMessage(""); }} className={`rounded-[22px] px-4 py-3 text-left text-sm font-black transition ${variantType === item.key ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.label}</button>
                ))}
              </div>
              <button onClick={askAiVariant} disabled={aiLoading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-60">
                {aiLoading ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Sparkles className="h-4 w-4" />} AI 3문제 추가 생성
              </button>
            </aside>
            <article className="rounded-[16px] border border-slate-300 bg-white p-8 shadow-deep md:p-10">
              <div className="border-b-2 border-slate-900 pb-4"><p className="text-sm font-bold text-slate-500">KSarchive 변형 모의고사 · 영어 영역</p><h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{current.number}번 변형문제</h2></div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4"><p className="font-black text-slate-900">{variantProblem.heading}</p><span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-black text-slate-500">{variantProblem.skill}</span></div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-9 text-slate-800"><p className="whitespace-pre-wrap">{variantProblem.body}</p></div>
              <div className="mt-6 grid gap-3">
                {variantProblem.options.map((option) => {
                  const mark = option.slice(0, 1);
                  return <button key={option} onClick={() => { setSelectedOption(mark); setVariantChecked(false); }} className={`rounded-2xl border px-5 py-4 text-left text-sm font-bold transition ${selectedOption === mark ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"}`}>{option}</button>;
                })}
              </div>
              <button onClick={() => { setVariantChecked(true); if (selectedOption === variantProblem.answer) awardPoints(`english-${current.number}-variant-${variantType}`, 10); }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white"><ListChecks className="h-4 w-4" /> 채점</button>
              {variantChecked && <ResultBox correct={selectedOption === variantProblem.answer} text={`정답: ${variantProblem.answer}`} answers={[variantProblem.explanation]} />}
              {pointMessage && <PointMessage message={pointMessage} />}
              {aiNote && <div className="mt-5 max-h-[520px] overflow-y-auto rounded-[26px] border border-sky-100 bg-sky-50 p-5 text-sm font-semibold leading-7 text-slate-700"><p className="whitespace-pre-wrap">{aiNote}</p></div>}
            </article>
          </section>
        )}

        {mode === "order" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/85 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="text-sm font-black text-brand-700">{current.number}번 · 문장 순서 트레이닝</p><h2 className="mt-2 text-3xl font-black text-slate-950">섞인 문장을 원래 순서로 복구</h2></div>
              <div className="flex gap-2"><button onClick={() => { setOrder(seededShuffle(sentences, selectedNumber * 37 + orderSeed + 1)); setOrderSeed((prev) => prev + 1); setOrderChecked(false); }} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><RotateCcw className="mr-1 inline h-4 w-4" />다시 섞기</button><button onClick={() => { setOrderChecked(true); if (orderCorrect) awardPoints(`english-${current.number}-order-${orderSeed}`, 10); }} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button></div>
            </div>
            <div className="mt-6 space-y-3">{displayOrder.map((sentence, index) => <div key={`${sentence}-${index}`} className={`rounded-[26px] border p-4 shadow-sm ${orderChecked ? sentence === sentences[index] ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50" : "border-slate-100 bg-white"}`}><div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span><p className="flex-1 text-sm leading-8 text-slate-700">{sentence}</p><div className="flex shrink-0 flex-col gap-2"><button onClick={() => moveSentence(index, -1)} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↑</button><button onClick={() => moveSentence(index, 1)} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↓</button></div></div></div>)}</div>
            {orderChecked && <ResultBox correct={orderCorrect} text={orderCorrect ? "정답입니다." : "아직 순서가 맞지 않습니다."} answers={orderCorrect ? [] : ["접속사, 대명사, 반복 핵심어를 다시 확인하세요."]} />}
            {pointMessage && <PointMessage message={pointMessage} />}
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

function QuestionPicker({ selectedNumber, onSelect }: { selectedNumber: number; onSelect: (n: number) => void }) {
  return (
    <section className="mt-6 rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black text-slate-950">독해 문항 선택</p><p className="mt-1 text-xs font-bold text-slate-500">18번부터 40번까지</p></div><span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-black text-brand-700">{selectedNumber}번 선택됨</span></div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">{readingPassages.map((item) => <button key={item.number} onClick={() => onSelect(item.number)} className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-black transition ${item.number === selectedNumber ? "bg-slate-950 text-white shadow-card" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.number}</button>)}</div>
    </section>
  );
}

function ReadingPanel({ current, analyses }: { current: ReadingPassage; analyses: ReturnType<typeof makeAnalyses> }) {
  return (
    <section className="mt-6 space-y-6">
      <article className="rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep"><p className="text-sm font-black text-sky-200">{current.number}번 · {current.type} · 정답 {current.answer}</p><h2 className="mt-2 text-3xl font-black">{current.title}</h2><div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-6 text-[15px] leading-9 text-slate-100"><p>{cleanText(current.passage)}</p></div></article>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"><article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card"><h3 className="flex items-center gap-2 text-xl font-black text-slate-950"><FileText className="h-5 w-5" /> 전문 해석·주요 어휘</h3><p className="mt-4 text-sm leading-8 text-slate-700">{cleanText(current.translation)}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{current.vocab.map((item) => <div key={item.word} className="rounded-2xl bg-slate-50 px-4 py-3"><p className="font-black text-slate-950">{item.word}</p><p className="text-sm font-bold text-slate-500">{item.meaning}</p></div>)}</div></article><article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card"><h3 className="text-xl font-black text-slate-950">문장별 내신 분석</h3><div className="mt-4 space-y-3">{analyses.map((item, index) => <div key={`${item.sentence}-${index}`} className="rounded-2xl border border-slate-100 bg-white p-4"><p className="text-sm font-black text-brand-700">{index + 1}. {item.role}</p><p className="mt-2 text-sm leading-7 text-slate-800">{item.sentence}</p><p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold leading-6 text-slate-500">{item.translation}</p><div className="mt-2 flex flex-wrap gap-2">{item.notes.map((note) => <span key={note} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand-700">{note}</span>)}</div></div>)}</div></article></div>
    </section>
  );
}

function ListeningPanel({ listening, listenNumber, setListenNumber }: { listening: (typeof listeningScripts)[number]; listenNumber: number; setListenNumber: (n: number) => void }) {
  return <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]"><aside className="rounded-[34px] border border-white/70 bg-white/75 p-5 shadow-card"><p className="text-sm font-black text-slate-950">듣기 번호</p><div className="mt-4 grid grid-cols-4 gap-2 lg:grid-cols-3">{listeningScripts.map((item) => <button key={item.number} onClick={() => setListenNumber(item.number)} className={`rounded-2xl px-3 py-2 text-sm font-black ${item.number === listenNumber ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.number}</button>)}</div></aside><article className="rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep"><p className="text-sm font-black text-sky-200">{listening.number}번 · {listening.type} · 정답 {listening.answer}</p><h2 className="mt-2 text-3xl font-black">{listening.title}</h2><div className="mt-6 rounded-[28px] border border-white/10 bg-white/10 p-6 text-sm leading-8 text-slate-100"><p className="whitespace-pre-wrap">{cleanText(listening.script)}</p></div></article></section>;
}

function ResultBox({ correct, text, answers }: { correct: boolean; text: string; answers: string[] }) {
  return <div className={`mt-5 rounded-[26px] border p-4 text-sm font-black ${correct ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-rose-100 bg-rose-50 text-rose-700"}`}><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> {text}</div>{answers.length > 0 && <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{answers.map((answer, index) => <span key={`${answer}-${index}`} className="rounded-2xl bg-white px-3 py-2 text-slate-700 shadow-sm">{answer}</span>)}</div>}</div>;
}

function PointMessage({ message }: { message: string }) {
  return <div className="mt-3 rounded-[22px] border border-amber-100 bg-amber-50 p-4 text-sm font-black text-amber-700">{message}</div>;
}
