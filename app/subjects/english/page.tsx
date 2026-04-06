"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, BookText, GraduationCap, Search } from "lucide-react";
import { englishVocabDays } from "@/lib/english-vocab";
import { englishTextbookSections } from "@/lib/english-textbook";
import { englishMock202503 } from "@/lib/english-mock";
import { getMeanings } from "@/lib/english-meaning-map";

type TabKey = "textbook" | "vocab" | "mock";
type QuizMode = "meaning_to_word" | "word_to_meaning" | "blank";
type WordItem = { term: string; kind: string };

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function parseSentences(lines: string[]) {
  return lines
    .flatMap((line) => line.split(/(?<=[.!?"])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

function meaningText(term: string) {
  return getMeanings(term).join(", ");
}

function makeBlankPrompt(term: string) {
  return `다음 의미에 맞는 단어를 쓰세요: ${meaningText(term)}`;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-card">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

function TextbookSectionView() {
  return (
    <div className="mt-8 space-y-8">
      {englishTextbookSections.map((section) => {
        const allSentences = section.blocks.flatMap((b) => parseSentences(b.lines));
        return (
          <SectionCard key={section.slug} title={section.title}>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.summary}</p>
            <div className="mt-6 rounded-[24px] border border-blue-100 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">본문 전체</p>
              <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-900">
                {section.blocks.map((block, idx) => (
                  <p key={idx}>{block.lines.join(" ")}</p>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {section.keyPoints.map((point) => (
                <div key={point} className="rounded-[20px] border border-blue-100 bg-white p-4 text-sm leading-7 text-slate-700">{point}</div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">문장별 해석 · 구조 · 문법</p>
              {allSentences.map((sentence, idx) => {
                const sourceBlock = section.blocks.find((b) => b.lines.join(" ").includes(sentence.slice(0, 12)));
                const notes = sourceBlock?.notes.map((n) => n.text) ?? [];
                return (
                  <div key={`${section.slug}-${idx}`} className="rounded-[24px] border border-blue-100 bg-white p-5">
                    <p className="text-base leading-8 text-slate-900">{sentence}</p>
                    <div className="mt-3 grid gap-3 lg:grid-cols-3">
                      <div className="rounded-[18px] bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        <p className="font-bold text-slate-900">직독직해 포인트</p>
                        <p className="mt-1">핵심 표현을 끊어 읽으며 구조를 파악하세요. 수식어가 길면 주어·동사부터 잡고 뒤를 붙이는 방식이 안전합니다.</p>
                      </div>
                      <div className="rounded-[18px] bg-sky-50 p-4 text-sm leading-7 text-sky-800">
                        <p className="font-bold">문장 구조</p>
                        <p className="mt-1">주어 / 동사 / 목적어 또는 보어를 먼저 찾고, 분사·관계절·부사구는 뒤에서 덧붙이세요.</p>
                      </div>
                      <div className="rounded-[18px] bg-amber-50 p-4 text-sm leading-7 text-amber-800">
                        <p className="font-bold">문법 메모</p>
                        <ul className="mt-1 list-disc pl-5">
                          <li>to부정사, 동명사, 분사구문 여부 확인</li>
                          <li>관계대명사·생략 구조 확인</li>
                          <li>현재완료·수동태·도치 여부 체크</li>
                        </ul>
                      </div>
                    </div>
                    {notes.length ? (
                      <div className="mt-3 rounded-[18px] border border-blue-100 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        <p className="font-bold text-slate-900">해설 메모</p>
                        <ul className="mt-1 list-disc pl-5">
                          {notes.map((note) => <li key={note}>{note}</li>)}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        );
      })}
    </div>
  );
}

function VocabSection() {
  const [currentDay, setCurrentDay] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);
  const [testDays, setTestDays] = useState<number[]>([1]);
  const [quizMode, setQuizMode] = useState<QuizMode>("meaning_to_word");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<Array<{ term: string; ok: boolean }>>([]);

  const dayData = englishVocabDays.find((item) => item.day === currentDay)!;
  const filteredWords = useMemo(() => {
    if (!search.trim()) return dayData.words;
    return dayData.words.filter((item) => item.term.toLowerCase().includes(search.toLowerCase()));
  }, [dayData.words, search]);

  const bank = useMemo(() => englishVocabDays.filter((item) => testDays.includes(item.day)).flatMap((item) => item.words), [testDays]);
  const quizPool = useMemo(() => shuffle(bank).slice(0, 15), [bank, quizStarted]);
  const currentQuiz = quizPool[quizIndex];

  const prompt = currentQuiz
    ? quizMode === "meaning_to_word"
      ? meaningText(currentQuiz.term)
      : quizMode === "word_to_meaning"
        ? currentQuiz.term
        : makeBlankPrompt(currentQuiz.term)
    : "";

  const choices = useMemo(() => {
    if (!currentQuiz) return [] as string[];
    if (quizMode === "word_to_meaning") {
      const correct = meaningText(currentQuiz.term);
      const distractors = shuffle(bank.filter((item) => item.term !== currentQuiz.term).map((item) => meaningText(item.term)))
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .slice(0, 3);
      return shuffle([correct, ...distractors]);
    }
    const distractors = shuffle(bank.filter((item) => item.term !== currentQuiz.term).map((item) => item.term)).slice(0, 3);
    return shuffle([currentQuiz.term, ...distractors]);
  }, [currentQuiz, bank, quizMode]);

  const answer = currentQuiz ? (quizMode === "word_to_meaning" ? meaningText(currentQuiz.term) : currentQuiz.term) : "";

  const handleAnswer = (choice: string) => {
    const ok = choice === answer;
    if (ok) setScore((prev) => prev + 1);
    if (currentQuiz) setResults((prev) => [...prev, { term: currentQuiz.term, ok }]);
    if (quizIndex < quizPool.length - 1) setQuizIndex((prev) => prev + 1);
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Day별 단어 열람">
          <div className="mt-6 flex flex-wrap gap-2">
            {englishVocabDays.map((item) => (
              <button key={item.day} onClick={() => { setCurrentDay(item.day); setSelectedWord(null); setSearch(""); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${currentDay === item.day ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}>
                Day {String(item.day).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-[24px] border border-blue-100 bg-slate-50 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="현재 Day에서 단어 검색" className="w-full bg-transparent text-sm outline-none" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredWords.map((word) => (
              <button key={word.term} onClick={() => setSelectedWord(word)} className={`rounded-[22px] border p-4 text-left ${selectedWord?.term === word.term ? "border-blue-400 bg-blue-50 shadow-card" : "border-blue-100 bg-white"}`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-slate-950">{word.term}</h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase text-slate-500">{word.kind}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">{meaningText(word.term)}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="단어 학습 카드">
          {selectedWord ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[26px] bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6 text-white">
                <h3 className="text-3xl font-black">{selectedWord.term}</h3>
                <p className="mt-3 text-sm leading-7 text-white/90">{meaningText(selectedWord.term)}</p>
              </div>
              <div className="rounded-[24px] border border-blue-100 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-brand-700">시험용 확인 포인트</p>
                <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-slate-700">
                  <li>품사와 대표 뜻을 함께 외우기</li>
                  <li>뜻 보고 단어 쓰기 / 단어 보고 뜻 쓰기 둘 다 연습</li>
                  <li>파생어가 같이 나오면 어근 중심으로 묶기</li>
                </ul>
              </div>
            </div>
          ) : <div className="mt-6 rounded-[26px] border border-dashed border-blue-200 bg-slate-50 p-8 text-center text-sm leading-7 text-slate-500">왼쪽에서 단어를 선택하면 뜻과 암기 포인트가 보입니다.</div>}
        </SectionCard>
      </div>

      <SectionCard title="뜻 ↔ 단어 테스트">
        <div className="mt-5 flex flex-wrap gap-2">
          {(["meaning_to_word", "word_to_meaning", "blank"] as QuizMode[]).map((mode) => (
            <button key={mode} onClick={() => { setQuizMode(mode); setQuizStarted(false); setQuizIndex(0); setScore(0); setResults([]); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${quizMode === mode ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}>
              {mode === "meaning_to_word" ? "뜻 → 단어" : mode === "word_to_meaning" ? "단어 → 뜻" : "뜻 빈칸"}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {englishVocabDays.map((day) => (
            <button key={day.day} onClick={() => setTestDays((prev) => prev.includes(day.day) ? prev.filter((v) => v !== day.day) : [...prev, day.day].sort((a,b)=>a-b))} className={`rounded-full px-3 py-2 text-xs font-semibold ${testDays.includes(day.day) ? "bg-blue-600 text-white" : "border border-blue-200 bg-white text-slate-700"}`}>Day {day.day}</button>
          ))}
        </div>
        {!quizStarted ? (
          <div className="mt-6 rounded-[24px] bg-slate-50 p-6"><button onClick={() => setQuizStarted(true)} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">테스트 시작</button></div>
        ) : currentQuiz ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
            <div className="rounded-[24px] bg-slate-50 p-6">
              <div className="flex items-center justify-between"><span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Q{quizIndex + 1} / {quizPool.length}</span><span className="text-sm font-semibold text-slate-500">정답 수 {score}</span></div>
              <p className="mt-5 text-xl leading-9 text-slate-800">{prompt}</p>
              <div className="mt-6 grid gap-3">
                {choices.map((choice) => <button key={choice} onClick={() => handleAnswer(choice)} className="rounded-[18px] border border-blue-100 bg-white px-4 py-3 text-left text-sm leading-7 text-slate-700 hover:bg-blue-50">{choice}</button>)}
              </div>
            </div>
            <div className="rounded-[24px] border border-blue-100 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">최근 결과</p>
              <div className="mt-4 space-y-3 max-h-[520px] overflow-auto">
                {results.map((item, idx) => <div key={`${item.term}-${idx}`} className={`rounded-[18px] px-4 py-3 text-sm ${item.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{item.term} · {item.ok ? "정답" : `오답 / ${meaningText(item.term)}`}</div>)}
              </div>
            </div>
          </div>
        ) : null}
      </SectionCard>
    </div>
  );
}

function MockSection() {
  const focusQuestions = englishMock202503.filter((q) => q.id >= 18 && q.id <= 45);
  return (
    <div className="mt-8 space-y-8">
      <SectionCard title="2025년 3월 학평">
        <p className="mt-3 text-sm leading-7 text-slate-600">문항별 상세 페이지에서 지문 전체, 문장별 분석, 문법 포인트, 정답 근거를 볼 수 있게 구성했습니다.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {focusQuestions.map((question) => (
            <Link key={question.id} href={`/subjects/english/mock/2025-03/${question.id}`} className="rounded-[22px] border border-blue-100 bg-white p-5 hover:bg-blue-50">
              <p className="text-sm font-semibold text-brand-700">{question.type}</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">{question.id}번</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{question.translation}</p>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default function EnglishPage() {
  const [tab, setTab] = useState<TabKey>("textbook");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
        <section className="mt-6 overflow-hidden rounded-[36px] border border-white/70 bg-white/85 shadow-glow">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">English Archive</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">영어 내신 대비</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">단어, 본문, 2025년 3월 학평을 한 흐름으로 정리했습니다. 지문은 먼저 한 덩어리로 읽고, 아래에서 문장 구조와 문법 포인트를 다시 분석하도록 바꿨습니다.</p>
            </div>
            <div className="border-l border-blue-100 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white md:p-10">
              <div className="space-y-3 text-sm leading-7 text-white/90">
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">단어: 뜻 ↔ 단어 퀴즈</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">본문: 전체 지문 + 문장 구조/문법</div>
                <div className="rounded-[22px] border border-white/20 bg-white/10 p-4">모의고사: 문항별 세부 분석</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => setTab("textbook")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "textbook" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}><BookOpen className="mr-2 inline h-4 w-4" />본문</button>
          <button onClick={() => setTab("vocab")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "vocab" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}><GraduationCap className="mr-2 inline h-4 w-4" />단어</button>
          <button onClick={() => setTab("mock")} className={`rounded-full px-5 py-3 text-sm font-semibold ${tab === "mock" ? "bg-slate-900 text-white" : "border border-blue-200 bg-white text-slate-700"}`}><BookText className="mr-2 inline h-4 w-4" />모의고사</button>
        </section>

        {tab === "textbook" ? <TextbookSectionView /> : tab === "vocab" ? <VocabSection /> : <MockSection />}
      </div>
    </main>
  );
}
