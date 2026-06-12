import { type ReadingPassage } from "@/lib/english-data";

export type MockType = "title" | "main" | "blank" | "grammar" | "vocab" | "order" | "insert";

export type MockProblem = {
  id: string;
  number: number;
  type: MockType;
  label: string;
  heading: string;
  body: string;
  options: string[];
  answer: string;
  explanation: string;
  skill: string;
};

export type MockBundle = {
  number: number;
  title: string;
  problems: MockProblem[];
};

const marks = ["①", "②", "③", "④", "⑤"];
const stopWords = new Set(
  "the and that this there their with from when what where which would could should about because people more were they have will into your them then than very some only also such most many much being been does did can not are was is to of in on for as by it we you he she his her or if our all one two has had who its but may own any a an while after before over under through among these those each every other another just even still finally first next last make made take took use used help helps helped way".split(" ")
);

export function cleanExamText(text: string) {
  return text.replace(/\u00ad/g, "").replace(/[‐‑–—]/g, "-").replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").replace(/\s+([.,;:!?])/g, "$1").trim();
}

export function splitExamSentences(text: string) {
  const source = cleanExamText(text);
  const matched = source.match(/[^.!?]+[.!?]+(?:["”']|\))?/g);
  return (matched ?? [source]).map((item) => item.trim()).filter((item) => item.length > 14);
}

function titleOf(passage: ReadingPassage) {
  return passage.title.replace(/^\d+\.\s*/, "").replace(/[?？]/g, "").trim();
}

function hasKorean(text: string) {
  return /[가-힣]/.test(text);
}

function contentWords(passage: ReadingPassage) {
  const words = cleanExamText(passage.passage).match(/\b[A-Za-z][A-Za-z'-]{4,}\b/g) ?? [];
  const vocab = passage.vocab.map((item) => item.word).filter((word) => /^[A-Za-z][A-Za-z' -]+$/.test(word));
  return Array.from(new Set([...vocab, ...words].map((word) => word.trim()).filter((word) => !stopWords.has(word.toLowerCase())))).slice(0, 18);
}

function koreanTerms(passage: ReadingPassage) {
  const terms = passage.vocab.map((item) => item.meaning).filter(Boolean);
  return Array.from(new Set(terms)).slice(0, 8);
}

function seededShuffle<T>(items: T[], seed: number) {
  const copy = [...items];
  let value = seed || 19;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((value / 4294967296) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function optionize(correct: string, wrongs: string[], seed: number) {
  const unique = Array.from(new Set([correct, ...wrongs].map((item) => item.trim()).filter(Boolean))).slice(0, 5);
  while (unique.length < 5) unique.push(`지문 일부만 반영한 부적절한 선택지 ${unique.length}`);
  const shuffled = seededShuffle(unique, seed);
  const answer = marks[Math.max(0, shuffled.findIndex((item) => item === correct))];
  return { options: shuffled.map((item, index) => `${marks[index]} ${item}`), answer };
}

function chunksAfterFirst(passage: ReadingPassage) {
  const sentences = splitExamSentences(passage.passage);
  const given = sentences[0] ?? cleanExamText(passage.passage);
  const rest = sentences.slice(1);
  const cut1 = Math.max(1, Math.ceil(rest.length / 3));
  const cut2 = Math.max(cut1 + 1, Math.ceil((rest.length * 2) / 3));
  const chunks = [rest.slice(0, cut1), rest.slice(cut1, cut2), rest.slice(cut2)].map((group) => group.join(" ").trim()).filter(Boolean);
  while (chunks.length < 3) chunks.push("This part continues the previous idea and supports the writer's point.");
  return { given, chunks: chunks.slice(0, 3) };
}

function blankSentence(passage: ReadingPassage) {
  const sentences = splitExamSentences(passage.passage);
  const index = Math.min(Math.max(1, Math.floor(sentences.length * 0.58)), Math.max(1, sentences.length - 2));
  const target = sentences[index] ?? sentences.at(-1) ?? cleanExamText(passage.passage);
  const body = sentences.map((sentence, idx) => (idx === index ? "__________" : sentence)).join(" ");
  return { body, target };
}

function buildTitleWrongs(passage: ReadingPassage, title: string) {
  const words = contentWords(passage);
  const terms = koreanTerms(passage);
  const a = hasKorean(title) ? terms[0] ?? "세부 사례" : words[0] ?? "a minor detail";
  const b = hasKorean(title) ? terms[1] ?? "배경 정보" : words[1] ?? "background information";
  if (hasKorean(title)) {
    return [
      `${a}만을 중심으로 한 세부 사례의 나열`,
      `${b}의 배경을 설명하는 정보 중심 글`,
      `글의 결론과 반대되는 관점의 필요성`,
      `문제의 원인을 하나의 사례로만 설명하기`
    ];
  }
  return [
    `A Narrow Example of ${a}`,
    `Background Information About ${b}`,
    `The Opposite View of the Writer's Conclusion`,
    `One Detail Mistaken for the Whole Point`
  ];
}

function buildMainCorrect(passage: ReadingPassage, title: string) {
  const type = passage.type;
  if (type.includes("주장")) return `필자는 ${title}는 점을 주장한다.`;
  if (type.includes("요지")) return `글은 ${title}는 점을 중심 내용으로 제시한다.`;
  if (type.includes("주제")) return `글의 중심 주제는 ${title}이다.`;
  return `글 전체의 핵심은 ${title}라는 점이다.`;
}

function buildMainWrongs(passage: ReadingPassage, title: string) {
  const terms = koreanTerms(passage);
  const words = contentWords(passage);
  const a = terms[0] ?? words[0] ?? "세부 소재";
  const b = terms[1] ?? words[1] ?? "예시";
  return [
    `${a}에 관한 세부 예시만을 글 전체의 주장으로 제시한다.`,
    `${title}와 반대되는 결론을 중심 내용으로 제시한다.`,
    `${b}의 원인과 결과를 서로 바꾸어 설명한다.`,
    `글의 결론보다 배경 정보의 나열을 더 중요하게 본다.`
  ];
}

function samePassageWrongOptions(passage: ReadingPassage) {
  const title = titleOf(passage);
  return {
    title: buildTitleWrongs(passage, title),
    main: buildMainWrongs(passage, title),
    blank: [
      "This means that the previous idea has no connection to the writer's conclusion.",
      "For this reason, the writer argues that the opposite choice should always be made.",
      "In contrast, the example proves that the main problem cannot be understood at all.",
      "Therefore, the detail should be ignored because it does not affect the topic."
    ]
  };
}

export function buildMockBundle(passage: ReadingPassage): MockBundle {
  const body = cleanExamText(passage.passage);
  const title = titleOf(passage);
  const wrong = samePassageWrongOptions(passage);
  const words = contentWords(passage);
  const problems: MockProblem[] = [];

  const titleOptions = optionize(title, wrong.title, passage.number * 11);
  problems.push({
    id: `${passage.number}-title`, number: passage.number, type: "title", label: "제목",
    heading: "다음 글의 제목으로 가장 적절한 것은?", body, options: titleOptions.options, answer: titleOptions.answer,
    skill: "24번식 제목 추론",
    explanation: "제목형은 글 전체의 소재와 결론을 함께 담아야 합니다. 오답은 소재는 비슷해도 세부 예시만 잡거나, 결론과 반대 방향으로 틀어 놓은 선택지입니다."
  });

  const mainCorrect = buildMainCorrect(passage, title);
  const mainOptions = optionize(mainCorrect, wrong.main, passage.number * 13);
  problems.push({
    id: `${passage.number}-main`, number: passage.number, type: "main", label: "요지",
    heading: passage.type.includes("주장") ? "다음 글에서 필자가 주장하는 바로 가장 적절한 것은?" : "다음 글의 요지로 가장 적절한 것은?",
    body, options: mainOptions.options, answer: mainOptions.answer,
    skill: "20·22·23번식 주장/요지/주제",
    explanation: "요지형은 반복되는 핵심어, 전환 표현 뒤의 결론, 마지막 문장의 압축 내용을 확인해야 합니다. 세부 예시·배경 설명·반대 결론은 오답입니다."
  });

  const blank = blankSentence(passage);
  const blankOptions = optionize(blank.target, wrong.blank, passage.number * 17);
  problems.push({
    id: `${passage.number}-blank`, number: passage.number, type: "blank", label: "빈칸",
    heading: "다음 빈칸에 들어갈 말로 가장 적절한 것은?", body: blank.body, options: blankOptions.options, answer: blankOptions.answer,
    skill: "31~34번식 구/문장 빈칸",
    explanation: "빈칸은 앞뒤 논리 연결이 가장 자연스러운 선택지를 고릅니다. 지시어, 연결어, 결론 방향을 함께 확인합니다."
  });

  const order = chunksAfterFirst(passage);
  const orderBody = `[주어진 글] ${order.given}\n\n(A) ${order.chunks[0]}\n\n(B) ${order.chunks[1]}\n\n(C) ${order.chunks[2]}`;
  const orderOptions = optionize("A - B - C", ["A - C - B", "B - A - C", "B - C - A", "C - A - B"], passage.number * 19);
  problems.push({
    id: `${passage.number}-order`, number: passage.number, type: "order", label: "순서",
    heading: "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?", body: orderBody, options: orderOptions.options, answer: orderOptions.answer,
    skill: "36~37번식 문단 배열",
    explanation: "첫 문장을 주어진 글로 두고 나머지를 A/B/C 문단으로 나눴습니다. 지시어, 반복어, 연결어를 기준으로 흐름을 확인합니다."
  });

  const sentences = splitExamSentences(passage.passage);
  const insertIndex = Math.min(3, Math.max(1, sentences.length - 2));
  const insertGiven = sentences[insertIndex] ?? sentences[1] ?? body;
  const insertRest = sentences.filter((_, index) => index !== insertIndex).slice(0, 5);
  problems.push({
    id: `${passage.number}-insert`, number: passage.number, type: "insert", label: "삽입",
    heading: "글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?",
    body: `[주어진 문장] ${insertGiven}\n\n${insertRest.map((sentence, index) => `${marks[index]} ${sentence}`).join(" ")}`,
    options: marks.map((mark) => `${mark} 표시 위치`), answer: "③", skill: "38~39번식 문장 삽입",
    explanation: "삽입형은 주어진 문장의 지시어, 반복 핵심어, 앞뒤 연결 관계를 보고 위치를 판단합니다."
  });

  const grammarText = splitExamSentences(passage.passage).slice(0, 6).join(" ");
  problems.push({
    id: `${passage.number}-grammar`, number: passage.number, type: "grammar", label: "어법",
    heading: "다음 글의 밑줄 친 부분에 대한 설명으로 적절하지 않은 것은?", body: grammarText,
    options: [
      "① to부정사는 문장 내 자리와 의미에 따라 명사적·형용사적·부사적 용법을 판단한다.",
      "② 관계사/접속사는 선행사와 빠진 성분을 함께 확인해야 한다.",
      "③ -ing 형태는 언제나 진행형 동사로만 쓰인다.",
      "④ be+p.p.는 수동태인지 분사 수식인지 문장 구조로 판단한다.",
      "⑤ 완료 표현은 기준 시점보다 앞선 경험·완료·계속을 나타낼 수 있다."
    ],
    answer: "③", skill: "29번식 어법 판단",
    explanation: "③이 오답입니다. -ing는 진행형뿐 아니라 동명사, 현재분사, 분사구문으로도 쓰일 수 있습니다."
  });

  const vocabChoices = seededShuffle(words.filter((word) => !word.includes(" ")), passage.number * 23).slice(0, 5);
  problems.push({
    id: `${passage.number}-vocab`, number: passage.number, type: "vocab", label: "어휘",
    heading: "다음 글에서 문맥상 낱말의 쓰임이 적절하지 않은 것은?", body,
    options: vocabChoices.map((word, index) => `${marks[index]} ${word}`), answer: "④", skill: "30번식 문맥 어휘",
    explanation: "문맥 어휘형은 단어 뜻만 보는 것이 아니라 앞뒤 문장의 긍정·부정 방향과 글의 논리에 맞는지 확인하는 유형입니다."
  });

  return { number: passage.number, title, problems };
}

export function buildMockDatabase(passages: ReadingPassage[]) {
  return Object.fromEntries(passages.map((passage) => [passage.number, buildMockBundle(passage)])) as Record<number, MockBundle>;
}

export function getMockProblem(passages: ReadingPassage[], number: number, type: MockType) {
  const bundle = buildMockDatabase(passages)[number] ?? buildMockBundle(passages[0]);
  return bundle.problems.find((problem) => problem.type === type) ?? bundle.problems[0];
}
