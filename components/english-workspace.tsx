"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlignLeft,
  ArrowLeft,
  BadgeCheck,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  Ear,
  Eye,
  FileText,
  HelpCircle,
  Highlighter,
  Languages,
  Lightbulb,
  Loader2,
  ListChecks,
  ListRestart,
  Newspaper,
  ScanText,
  Shuffle,
  Sparkles,
  Target,
  TextCursorInput,
  Wand2,
  type LucideIcon
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { listeningScripts, readingPassages, type ReadingPassage } from "@/lib/english-data";

type Mode = "reading" | "listening" | "order" | "blank" | "variant";
type VariantType = "title" | "main" | "blank" | "grammar" | "order";

type BlankToken = {
  id: number;
  answer: string;
};

type VariantProblem = {
  heading: string;
  body: string;
  options: string[];
  answer: string;
  explanation: string;
  skill: string;
};

const modeTabs: Array<{ key: Mode; label: string; icon: LucideIcon; desc: string }> = [
  { key: "reading", label: "독해 분석", icon: Languages, desc: "본문·어휘·문장분석" },
  { key: "listening", label: "듣기 스크립트", icon: Ear, desc: "1–17번 대본" },
  { key: "order", label: "문장 순서", icon: Shuffle, desc: "순서 배열" },
  { key: "blank", label: "랜덤 빈칸", icon: TextCursorInput, desc: "힌트 지원" },
  { key: "variant", label: "변형문제", icon: Newspaper, desc: "실전 시험지" }
];

const variantTypes: Array<{ key: VariantType; label: string; desc: string }> = [
  { key: "title", label: "제목형", desc: "제목·주제 변환" },
  { key: "main", label: "요지형", desc: "중심 내용 확인" },
  { key: "blank", label: "빈칸형", desc: "핵심어 추론" },
  { key: "grammar", label: "어법형", desc: "밑줄 설명 판단" },
  { key: "order", label: "순서형", desc: "A/B/C 배열" }
];

const optionMarks = ["①", "②", "③", "④", "⑤"];

const stopWords = new Set([
  "the", "and", "that", "this", "there", "their", "with", "from", "when", "what", "where", "which", "would", "could", "should", "about", "because", "people", "more", "were", "they", "have", "will", "into", "your", "them", "then", "than", "very", "some", "only", "also", "such", "most", "many", "much", "being", "been", "does", "doesn", "don", "did", "didn", "can", "not", "are", "was", "is", "to", "of", "in", "on", "for", "as", "by", "it", "we", "you", "he", "she", "his", "her", "or", "if", "our", "all", "one", "two", "has", "had", "who", "its", "but", "may", "own", "any", "a", "an"
]);

const glossary: Record<string, string> = {
  coordinator: "조정자, 담당자",
  community: "지역사회",
  friendly: "친화적인",
  designed: "설계된",
  provide: "제공하다",
  enjoyable: "즐거운",
  experience: "경험",
  separate: "분리된, 별도의",
  ensure: "보장하다",
  safety: "안전",
  expectation: "기대",
  backpacking: "배낭여행",
  approach: "다가가다",
  passport: "여권",
  ruined: "망친",
  heartbroken: "상심한",
  delay: "연기하다",
  astonish: "놀라게 하다",
  influenced: "영향을 받은",
  convenience: "편리성",
  formation: "형성",
  remarkable: "놀랄 만한",
  procrastinating: "미루는 것",
  distant: "멀리 떨어진",
  internal: "내적인",
  external: "외적인",
  behavior: "행동",
  attracted: "끌린",
  socialize: "어울리다",
  predict: "예측하다",
  reflects: "반영하다",
  beliefs: "신념",
  observe: "관찰하다",
  psychology: "심리학",
  silence: "침묵",
  challenge: "도전하다",
  absolutely: "절대적으로",
  behavioral: "행동의",
  conversation: "대화",
  mentally: "정신적으로",
  rehearsing: "연습하는",
  utterance: "발언",
  eliminate: "제거하다",
  opening: "기회, 시작점",
  limited: "제한된",
  attend: "주의를 기울이다",
  attuned: "맞춰진",
  accumulating: "축적하는",
  observations: "관찰들",
  understanding: "이해",
  exercise: "운동하다",
  routine: "루틴",
  humanity: "인류",
  logical: "논리적인",
  objective: "객관적인",
  rational: "합리적인",
  accurate: "정확한",
  analysis: "분석",
  interpretation: "해석",
  reality: "현실",
  referees: "심판들",
  biased: "편향된",
  selected: "선정된",
  retail: "소매",
  recorded: "기록했다",
  increase: "증가",
  whereas: "반면에",
  countries: "국가들",
  partially: "부분적으로",
  blinded: "실명한",
  accident: "사고",
  reduced: "줄어든",
  concentrated: "집중했다",
  creatures: "생물",
  evolutionary: "진화의",
  transferred: "옮겼다",
  recognize: "인정하다",
  awarded: "수상한",
  purchase: "구매",
  discount: "할인",
  unique: "독특한",
  recycled: "재활용된",
  annual: "연례의",
  featured: "주요한",
  beginners: "초급자들",
  parade: "퍼레이드",
  insight: "통찰",
  flexible: "유연한",
  experts: "전문가들",
  domain: "분야",
  interconnected: "상호 연결된",
  exceptionally: "유난히",
  generalists: "다방면의 사람들",
  expertise: "전문성",
  organized: "조직화된",
  coherent: "일관된",
  frameworks: "틀, 체계",
  facilitates: "촉진하다",
  misconceptions: "오해들",
  ecological: "생태학의",
  fallacy: "오류",
  causal: "인과의",
  relationship: "관계",
  immigrants: "이민자들",
  numerous: "수많은",
  revealed: "드러냈다",
  committed: "저질렀다",
  misinterpret: "잘못 해석하다",
  faulty: "잘못된",
  environments: "환경들",
  expectations: "기대",
  illustrated: "설명된, 보여준",
  wandering: "돌아다니는",
  natives: "원주민들",
  subtle: "미묘한",
  predator: "포식자",
  shelters: "피난처, 거처",
  entrepreneurs: "기업가들",
  tremendous: "엄청난",
  launching: "출시",
  overpricing: "과도한 가격 책정",
  ownership: "소유감",
  distorts: "왜곡하다",
  perception: "인식",
  attractive: "매력적인",
  motivation: "동기",
  volunteers: "자원봉사자들",
  participants: "참가자들",
  assumption: "가정",
  truth: "진실",
  automatic: "자동적인",
  default: "기본값",
  cognitive: "인지적인",
  mental: "정신적인",
  sufficient: "충분한",
  adoption: "채택, 수용",
  profits: "수익",
  offspring: "자손",
  reproduce: "번식하다",
  hypothesis: "가설",
  publish: "발표하다",
  refute: "반박하다",
  conclusion: "결론",
  schema: "도식, 인지 틀",
  archaeologists: "고고학자들",
  civilization: "문명",
  collapse: "붕괴하다",
  mindset: "사고방식",
  effort: "노력",
  reflex: "반사",
  triggered: "유발된",
  airway: "기도",
  vital: "필수적인",
  organs: "장기"
};

const blankTargets: Record<number, string> = {
  18: "dog park",
  19: "passport",
  20: "convenience",
  21: "reverse direction",
  22: "the less you say, the more you hear",
  23: "act on that understanding",
  24: "interpretation of reality",
  25: "online share of retail trade",
  26: "study of ants",
  27: "50% discount on coffee",
  28: "Face painting by cartoonists",
  29: "coherent frameworks",
  30: "ecological fallacy",
  31: "previous experience",
  32: "sacrifice your initial prices and profits",
  33: "investing more energy to reproduce more slowly",
  34: "depends on the work of other scientists",
  35: "mental schemata",
  36: "oversimplification",
  37: "growth mindset",
  38: "making eye contact",
  39: "diving reflex",
  40: "truth bias"
};


const mockVariantMeta: Record<number, { title: string; main: string; grammarFocus: string; wrongTitles: string[]; wrongMains: string[] }> = {
  18: {
    title: "A New Dog Park for Dogs and Owners",
    main: "새로 개장한 반려견 공원의 시설과 장점을 안내하고 이용을 기대하게 하려는 글이다.",
    grammarFocus: "be designed to V, where 관계부사절, to ensure safety의 목적 용법",
    wrongTitles: ["Rules for Reporting Lost Dogs", "How to Train Dogs at Home", "A Volunteer Program for Abandoned Pets", "Changes in Pet Hospital Hours"],
    wrongMains: ["반려견 훈련 프로그램 신청을 권유한다.", "유기견 보호소 봉사자를 모집한다.", "동물 병원 이용 시간을 안내한다.", "반려견 공원의 이용 금지 사항을 강조한다."]
  },
  19: {
    title: "A Dream Trip Stopped by a Forgotten Passport",
    main: "Maya가 유럽 여행을 기대하다가 여권을 두고 온 사실을 알고 좌절하는 심경 변화가 드러난다.",
    grammarFocus: "had been looking forward to의 과거완료진행, as 부사절, knowing 분사구문",
    wrongTitles: ["A Successful Arrival in Paris", "A Museum Visit in Madrid", "A Relaxing Flight to Europe", "A Passport Found at the Counter"],
    wrongMains: ["여행을 마친 뒤 만족감을 느낀다.", "공항 직원의 친절함에 감동한다.", "비행기 지연으로 안도감을 느낀다.", "박물관 관람 계획을 바꾸며 기대한다."]
  },
  20: {
    title: "Make Habits Convenient, and They Stick",
    main: "습관으로 만들고 싶은 행동은 노력과 시간을 줄여 편리하게 만들어야 지속 가능하다.",
    grammarFocus: "the degree to which, be likely to V, if절, For this reason의 결론 기능",
    wrongTitles: ["Why Rest Is More Important Than Habits", "The Danger of Digital Tools", "How to Avoid All Daily Chores", "The Cost of Making Quick Decisions"],
    wrongMains: ["습관 형성에는 편리성보다 의지가 가장 중요하다.", "디지털 도구 사용은 가족 관계를 방해한다.", "모든 반복 업무는 즉시 없애야 한다.", "결정을 많이 할수록 좋은 습관이 만들어진다."]
  },
  21: {
    title: "Behavior Can Shape Belief, Not Just Reflect It",
    main: "신념이 행동을 이끌 뿐 아니라 행동도 신념을 형성할 수 있다는 점을 설명한다.",
    grammarFocus: "not only A but also B, think oneself into/act oneself into, as likely to V",
    wrongTitles: ["Why Beliefs Never Change", "The Power of Hidden Emotions", "A Complete Separation of Action and Thought", "How Brands Control Every Purchase"],
    wrongMains: ["행동은 신념과 완전히 분리되어 있다.", "감정만이 모든 의견을 결정한다.", "주변 환경은 행동에 영향을 주지 않는다.", "사람은 생각만으로 행동을 바꿀 수 없다."]
  },
  22: {
    title: "Say Less, Listen Better",
    main: "말을 줄이면 다음 말을 준비하느라 놓치던 상대의 말을 더 잘 들을 수 있다.",
    grammarFocus: "what if 가정 표현, the less ~ the more 구문, 관계대명사 what",
    wrongTitles: ["Speak Faster to Lead a Conversation", "Why Silence Always Blocks Communication", "The Best Way to Win a Debate", "How to Memorize Fifty Words"],
    wrongMains: ["침묵은 항상 대화의 효율을 떨어뜨린다.", "말을 많이 할수록 상대를 더 잘 이해한다.", "첫 만남에서는 대화량을 늘려야 한다.", "몸짓 언어만이 효과적인 대화 수단이다."]
  },
  23: {
    title: "Science Helps Only When Knowledge Becomes Action",
    main: "과학적 이해는 그 자체로 문제를 해결하지 못하며 사람들이 그것을 행동으로 옮길 때 의미가 있다.",
    grammarFocus: "unless 부사절, when절, caused by 수동 표현, In this sense의 정리 기능",
    wrongTitles: ["Why Exercise Articles Are Always Wrong", "The Limits of Physical Observation", "How Science Eliminates Every Problem", "The History of Heart Disease Research"],
    wrongMains: ["과학 지식은 행동 없이도 문제를 해결한다.", "운동 기사를 읽는 것은 건강에 해롭다.", "인류의 문제는 항상 지식 부족 때문에 생긴다.", "과학은 물리적 세계를 관찰하지 않는다."]
  },
  24: {
    title: "Everyone Interprets Reality Differently",
    main: "사람마다 경험과 욕망, 지식이 달라 현실을 동일하게 보지 않고 각자의 해석으로 받아들인다.",
    grammarFocus: "that절 목적어, if 조건절, which 계속적 용법 가능성, every/everyone 반복",
    wrongTitles: ["One Reality Everyone Can Agree On", "How Sports Fans Stay Objective", "The Key to Perfect Accuracy", "Why Referees Are Always Biased"],
    wrongMains: ["모든 사람은 논리적이면 같은 판단에 도달한다.", "스포츠 팬은 심판 판정을 객관적으로 본다.", "현실은 누구에게나 하나의 같은 모습으로 보인다.", "지식만 충분하면 해석 차이는 사라진다."]
  },
  25: {
    title: "Online Retail Shares in Five European Countries",
    main: "2018년과 2019년 유럽 5개국의 온라인 소매 거래 비율을 비교하여 수치 일치 여부를 판단하는 글이다.",
    grammarFocus: "whereas 대조, comparative 표현, percentage points, 배수 표현",
    wrongTitles: ["The Fall of All European Online Markets", "Why Italy Led Online Retail", "A Survey of American Retail Stores", "The End of Offline Shopping"],
    wrongMains: ["이탈리아가 두 해 모두 가장 높은 비율을 기록했다.", "모든 국가의 온라인 비율이 감소했다.", "미국의 온라인 소매 거래를 비교한다.", "스페인이 2018년에 독일보다 네 배 높았다."]
  },
  26: {
    title: "Edward O. Wilson: From an Accident to the Study of Ants",
    main: "Edward O. Wilson의 생애, 사고, 개미 연구, 학문적 성취를 시간순으로 소개한다.",
    grammarFocus: "At age seven 삽입 정보, led A to B, where 관계부사절, known as 후치수식",
    wrongTitles: ["The Nobel Prize That Wilson Received", "A Chef Who Studied Nature", "The History of Harvard Buildings", "How Fishing Ended Wilson's Career"],
    wrongMains: ["Wilson은 진화 생물학 분야로 노벨상을 받았다.", "Wilson은 낚시 사고 이후 자연 연구를 포기했다.", "Wilson은 Harvard에서 공부하지 않았다.", "Wilson은 주로 큰 동물을 멀리서 관찰했다."]
  },
  27: {
    title: "Houseplant Heaven Pop-up Shop Information",
    main: "실내 식물 팝업 숍의 날짜, 장소, 할인, 체험 활동, 유의 사항을 안내한다.",
    grammarFocus: "imperative 문장, available for purchase, made from의 재료 표현",
    wrongTitles: ["A Free Coffee Event for All Visitors", "A Festival Only for Outdoor Food", "A Guide to Growing Trees in Parks", "A Plant Shop Closed in October"],
    wrongMains: ["식물을 2개 사면 커피를 무료로 받는다.", "외부 음식과 음료가 허용된다.", "행사는 하루 동안만 열린다.", "실내 식물은 구매할 수 없다."]
  },
  28: {
    title: "2025 Summer Cartoon Festival Guide",
    main: "여름 만화 축제의 일정, 장소, 주요 행사와 방문객 제공 사항을 안내한다.",
    grammarFocus: "Why not V?, for beginners only, by 행위자 표현",
    wrongTitles: ["The First Cartoon Festival Ever", "A Festival Ending at 7 p.m.", "Advanced Classes for Experts", "A Private Event for Cartoonists"],
    wrongMains: ["올해 처음 개최되는 축제이다.", "오후 7시까지 진행된다.", "상급자를 위한 그리기 수업이 있다.", "일부 방문객만 스티커를 받는다."]
  },
  29: {
    title: "Experts Build Deep and Organized Understanding",
    main: "전문가는 단순히 똑똑한 사람이 아니라 특정 분야의 지식을 체계적으로 연결해 이해하는 사람이다.",
    grammarFocus: "what it means to V, Rather의 대조, knowledge is organized 수동태, allows/facilitates 병렬",
    wrongTitles: ["Why Experts Avoid Specific Domains", "The Problems of Flexible Learning", "A List of Random Facts", "Generalists as the Only Experts"],
    wrongMains: ["전문가는 여러 분야를 얕게 아는 사람이다.", "전문성은 사실을 많이 외우는 것만 의미한다.", "지식의 조직화는 학습의 유연성을 방해한다.", "전문가는 맥락을 바꾸어 적용하지 못한다."]
  },
  30: {
    title: "Co-occurrence Is Not Always Causation",
    main: "두 현상이 함께 나타난다는 이유만으로 인과관계를 주장하면 생태학적 오류에 빠질 수 있다.",
    grammarFocus: "where 관계부사절, because of, causal relationship, Unless 조건절",
    wrongTitles: ["Immigrants as the Main Cause of Crime", "Why Misconceptions Always Help Reasoning", "How Expensive Housing Increases Safety", "The Benefits of Faulty Beliefs"],
    wrongMains: ["이민자들이 대부분의 범죄를 저질렀다.", "함께 발생한 사건은 반드시 인과관계이다.", "잘못된 믿음은 주장을 더 정확하게 만든다.", "분석 없이 관계를 판단해도 충분하다."]
  },
  31: {
    title: "Previous Experience Guides What We Notice",
    main: "사람은 자신이 살아온 환경과 이전 경험에 따라 주의를 기울일 대상을 예측하고 판단한다.",
    grammarFocus: "what we should pay attention to, 비교 대조, Were he to be tested 가정법 도치",
    wrongTitles: ["Technology Determines All Attention", "Why Native People Are Stupid", "The Same Skills in Every Environment", "Modern Schools in New Guinea"],
    wrongMains: ["어떤 환경에서도 같은 능력만 필요하다.", "현대 기술이 주의 대상을 전부 결정한다.", "원주민들은 미묘한 변화를 감지하지 못한다.", "이전 경험은 주의와 관련이 없다."]
  },
  32: {
    title: "Ownership Can Distort Product Pricing",
    main: "창업자는 자신이 만든 제품에 대한 소유감 때문에 가치를 과대평가하고 가격을 높게 매길 수 있다.",
    grammarFocus: "which 관계대명사, While 양보절, cause 목적격보어 구조 가능성",
    wrongTitles: ["Why All High Prices Guarantee Success", "The Ease of Dropping Initial Prices", "How Consumers Create New Products", "The End of Product Ownership"],
    wrongMains: ["창업자는 처음부터 낮은 가격을 항상 선호한다.", "소유감은 가치 판단에 영향을 주지 않는다.", "초기 가격이 높아도 판매에는 문제가 없다.", "제품 출시는 노력과 관련이 없다."]
  },
  33: {
    title: "Fewer Offspring, Greater Investment",
    main: "생물은 자손을 많이 낳는 전략과 적게 낳고 많이 투자하는 전략 사이에서 생존 방식을 달리한다.",
    grammarFocus: "comparative contrast, invest energy to V, offspring 단복수 주의",
    wrongTitles: ["Why Every Species Raises Many Young", "A Strategy Without Energy Investment", "The End of Reproduction", "Only Large Animals Survive"],
    wrongMains: ["모든 생물은 자손을 최대한 많이 낳는 전략만 선택한다.", "자손에게 에너지를 투자하는 것은 번식과 무관하다.", "느린 번식 전략은 존재하지 않는다.", "생존 전략은 환경과 관련이 없다."]
  },
  34: {
    title: "Science Advances Through Shared Work",
    main: "과학 연구는 공개와 검증을 통해 다른 과학자들의 연구에 의존하며 발전한다.",
    grammarFocus: "depend on, publish, refute, conclusion의 명사절 연결",
    wrongTitles: ["Science as a Private Secret", "Why Experiments Need No Review", "The End of Scientific Publication", "One Scientist Solves Everything Alone"],
    wrongMains: ["과학은 연구 결과를 공개하지 않을 때 발전한다.", "다른 과학자의 검증은 불필요하다.", "결론은 반박될 수 없다.", "한 명의 과학자가 모든 지식을 완성한다."]
  },
  35: {
    title: "Memory Reconstructs the Past",
    main: "기억은 과거를 그대로 저장하는 것이 아니라 기존 경험과 도식에 의해 재구성된다.",
    grammarFocus: "not A but B, based on, schema/schemata 개념어, 무관문장 판별",
    wrongTitles: ["Memory as a Perfect Recording Device", "Why Experience Never Affects Recall", "The Benefits of Forgetting Everything", "A Machine That Stores Exact Past"],
    wrongMains: ["기억은 과거를 완벽하게 복사한다.", "기존 경험은 회상에 영향을 주지 않는다.", "도식은 기억 재구성과 관련이 없다.", "사람은 모든 경험을 정확히 저장한다."]
  },
  36: {
    title: "History Repeats, But Not So Simply",
    main: "역사가 반복된다는 말은 도움이 될 수 있지만 사건의 차이와 복잡성을 무시하면 지나친 단순화가 된다.",
    grammarFocus: "oversimplification, while/although 대조, 순서 문제의 지시어 연결",
    wrongTitles: ["History Repeats in Exactly the Same Way", "Why Details Never Matter", "A Simple Rule Explaining All Events", "The End of Historical Study"],
    wrongMains: ["모든 역사 사건은 완전히 같은 방식으로 반복된다.", "역사 이해에는 세부 차이가 필요 없다.", "단순한 문장 하나로 모든 역사 해석이 충분하다.", "역사 연구는 원인과 맥락을 보지 않는다."]
  },
  37: {
    title: "A Growth Mindset Turns Effort into Learning",
    main: "성장 사고방식은 능력을 고정된 것으로 보지 않고 노력과 학습을 통해 발전할 수 있다고 본다.",
    grammarFocus: "fixed/growth contrast, view A as B, effort as path to mastery",
    wrongTitles: ["Talent Can Never Change", "Why Effort Proves Weakness", "Avoiding Challenges to Stay Smart", "The Fixed Mindset Advantage"],
    wrongMains: ["능력은 태어날 때 완전히 고정된다.", "노력은 능력이 없다는 증거이다.", "도전을 피해야 성장할 수 있다.", "실패는 배움과 관련이 없다."]
  },
  38: {
    title: "Why People Prefer the Subway Door Area",
    main: "사람들이 지하철 문 근처를 선호하는 이유는 빠른 하차와 심리적 편안함 같은 요인과 관련된다.",
    grammarFocus: "inserted sentence cohesion, reason why, proximity 표현",
    wrongTitles: ["The Best Way to Design Airplanes", "Why People Avoid Subway Doors", "A History of Underground Trains", "How to Repair Subway Doors"],
    wrongMains: ["사람들은 지하철 문 근처를 항상 피한다.", "하차 편의성은 자리 선택과 관련이 없다.", "이 글은 비행기 좌석 배치를 설명한다.", "지하철 문 수리 방법이 핵심이다."]
  },
  39: {
    title: "The Diving Reflex Protects the Body",
    main: "얼굴이 물에 잠기면 잠수 반사가 유발되어 산소 사용을 조절하고 중요한 장기를 보호한다.",
    grammarFocus: "when 부사절, triggered by 수동, vital organs, 삽입 위치 판단",
    wrongTitles: ["Why Breathing Underwater Is Easy", "A Reflex Caused by Loud Sounds", "How to Swim Faster in Races", "The Digestive System in Water"],
    wrongMains: ["잠수 반사는 소리에 의해 유발된다.", "얼굴이 물에 잠기는 것과 생리 반응은 관련이 없다.", "중요 장기 보호와 무관한 반응이다.", "이 글은 수영 경기 기록 향상법을 설명한다."]
  },
  40: {
    title: "Truth Bias Saves Mental Effort",
    main: "사람은 대체로 타인의 말을 사실로 받아들이는 진실 편향을 통해 매번 의심하는 데 드는 정신적 노력을 줄인다.",
    grammarFocus: "assume A to be B, unless, cognitive effort, summary completion",
    wrongTitles: ["Why People Should Doubt Everything", "The Cost of Never Trusting Others", "A World Without Communication", "How Lies Always Go Undetected"],
    wrongMains: ["사람은 모든 말을 처음부터 거짓으로 가정한다.", "신뢰는 정신적 노력과 관련이 없다.", "타인의 말을 믿는 경향은 의사소통을 불가능하게 한다.", "진실 편향은 항상 부정적인 결과만 낳는다."]
  }
};


function normalizeForCheck(value: string) {
  return value.trim().toLowerCase().replace(/[.,!?;:'"()\[\]{}]/g, "");
}

function cleanText(text: string) {
  return text
    .replace(/\u00ad/g, "")
    .replace(/‐/g, "-")
    .replace(/—/g, " - ")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .replace(/([①②③④⑤])(?=\S)/g, "$1 ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .replace(/([“\"])\s+/g, "$1")
    .replace(/\s+([”\"])/g, "$1")
    .trim();
}

function splitSentences(text: string) {
  const compact = cleanText(text).replace(/\(\s*[①②③④⑤]\s*\)/g, "");
  const matches = compact.match(/[^.!?]+[.!?]+(?:["”']|\))?/g);
  const base = matches && matches.length >= 2 ? matches : compact.split(/(?=\([A-C]\))/g);
  return base.map((s) => s.trim()).filter((s) => s.length > 18).slice(0, 16);
}

function splitKoreanSentences(text: string) {
  const compact = cleanText(text);
  return compact.split(/(?<=[.다요죠까]|[!?])\s+/).map((s) => s.trim()).filter(Boolean).slice(0, 16);
}

function seededShuffle<T>(arr: T[], seed: number) {
  const copy = [...arr];
  let value = seed || 7;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const j = Math.floor((value / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function optionize(options: string[], correct: string, seed: number) {
  const unique = Array.from(new Set([correct, ...options].filter(Boolean))).slice(0, 5);
  while (unique.length < 5) unique.push(`관련성이 낮은 선택지 ${unique.length}`);
  const shuffled = seededShuffle(unique.slice(0, 5), seed);
  const answerIndex = shuffled.findIndex((item) => item === correct);
  return {
    options: shuffled.map((item, index) => `${optionMarks[index]} ${item}`),
    answer: optionMarks[answerIndex < 0 ? 0 : answerIndex]
  };
}

function makeBlankQuestion(passage: ReadingPassage, count: number, seed: number) {
  const source = cleanText(passage.passage);
  const words = Array.from(source.matchAll(/\b[A-Za-z][A-Za-z'-]{4,}\b/g))
    .map((match) => ({ word: match[0], index: match.index ?? 0 }))
    .filter(({ word }) => !stopWords.has(word.toLowerCase()));
  const picked = seededShuffle(words, passage.number * 97 + seed).slice(0, count).sort((a, b) => a.index - b.index);
  let cursor = 0;
  let id = 0;
  const blanks: BlankToken[] = [];
  const parts: Array<string | BlankToken> = [];

  for (const item of picked) {
    const idx = source.indexOf(item.word, cursor);
    if (idx < 0) continue;
    parts.push(source.slice(cursor, idx));
    const token = { id, answer: item.word };
    blanks.push(token);
    parts.push(token);
    cursor = idx + item.word.length;
    id += 1;
  }
  parts.push(source.slice(cursor));
  return { parts, blanks };
}

function getEnrichedVocab(passage: ReadingPassage) {
  const fromCurrent = passage.vocab.map((item) => ({ ...item, source: "기존" }));
  const discovered = Array.from(new Set(cleanText(passage.passage).match(/\b[A-Za-z][A-Za-z'-]{4,}\b/g) ?? []))
    .filter((word) => !stopWords.has(word.toLowerCase()))
    .map((word) => ({ word, meaning: glossary[word.toLowerCase()] }))
    .filter((item): item is { word: string; meaning: string } => Boolean(item.meaning));

  const merged = new Map<string, { word: string; meaning: string; source?: string }>();
  [...fromCurrent, ...discovered].forEach((item) => merged.set(item.word.toLowerCase(), item));
  return Array.from(merged.values()).slice(0, 42);
}

function findVerb(sentence: string) {
  return sentence.match(/\b(is|are|was|were|has|have|had|can|could|will|would|should|may|might|must|do|does|did|be|been|become|became|make|makes|made|take|takes|took|use|uses|used|think|thinks|thought|find|found|show|shows|showed|provide|provides|provided|mean|means|meant|allow|allows|allowed|lead|led|reveal|revealed|represent|represents|create|creates|created|occur|occurred|claim|claims|commit|committed|influence|influences|influenced|solve|solves|solved|listen|listens|heard|understand|understands|lower|lowers|recorded|receive|received|recognize|recognized|award|awarded|evolve|evolved|mature|grow|devote|ask|asked|recall|conclude|publish|spread|collapse|repeat|praise|praised|trigger|triggered|assume|assumed|believe|believes)\b/i)?.[0];
}

function inferSentencePattern(sentence: string) {
  if (/\bThere\s+(is|are|was|were)\b/i.test(sentence)) return "There + be + 주어: 존재 구문";
  if (/\b(is|are|was|were|be|been)\s+\w+ed\b/i.test(sentence)) return "수동태/과거분사 구조";
  if (/\bmake\s+\w+\s+\w+/i.test(sentence)) return "make + 목적어 + 목적격보어 가능성";
  if (/\bconsider\s+\w+\s+\w+/i.test(sentence)) return "consider + 목적어 + 보어 가능성";
  if (/\b(give|offer|provide|send|tell|ask)\b/i.test(sentence)) return "수여/전달 동사: 목적어 구조 확인";
  if (/\b(that|whether|if)\b/i.test(sentence)) return "종속절 포함 복문";
  return "S + V 중심 기본문형";
}

function detectGrammar(sentence: string, index: number) {
  const s = sentence;
  const notes: string[] = [];
  const has = (regex: RegExp) => regex.test(s);

  if (has(/\bthat\b/i)) notes.push("that 확인: 명사절 접속사, 관계대명사, 동격절 중 어느 역할인지 앞 명사와 동사 구조로 판별");
  if (has(/\bwhich\b|\bwho\b|\bwhere\b|\bwhen\b/i)) notes.push("관계사 구문: 선행사, 수식 범위, 빠진 성분을 함께 표시");
  if (has(/,\s*(which|where|who)\b/i)) notes.push("계속적 용법 가능성: 앞 절 전체 또는 선행사를 보충 설명");
  if (has(/\bif\b/i)) notes.push("if절: 조건인지 명사절 '~인지'인지 문장 성분으로 구분");
  if (has(/\bbecause\b|\bsince\b|\bas\b/i)) notes.push("이유·원인 부사절: 빈칸/순서 문제에서 앞뒤 논리 연결 단서");
  if (has(/\bhowever\b|\bbut\b|\brather\b|\bwhereas\b|\bin contrast\b/i)) notes.push("역접·대조 신호: 앞 문장과 주장이 바뀌는 지점이라 선지 판단 핵심");
  if (has(/\bto\s+[a-z]+/i)) notes.push("to부정사: 목적, 형용사적 수식, 명사적 용법 중 문장 내 자리로 판단");
  if (has(/\b[A-Za-z]+ing\b/)) notes.push("-ing 형태: 동명사, 현재분사 후치수식, 분사구문 가능성 비교");
  if (has(/\b(designed|known|provided|caused|forced|awarded|limited|organized|stored|remembered|shunted|triggered|located)\b/i)) notes.push("과거분사: 수동태인지, 앞 명사를 꾸미는 후치수식인지 구분");
  if (has(/not only|but also/i)) notes.push("not only A but also B: A와 B의 품사·구조 병렬 확인");
  if (has(/the less|the more|the harder|the better/i)) notes.push("the 비교급, the 비교급: '~할수록 더 ~하다' 구문");
  if (has(/for example|for instance|such as/i)) notes.push("예시 신호: 앞 문장의 추상 개념을 구체화하므로 순서·삽입 단서");
  if (has(/\bnot all\b|\bnot every\b/i)) notes.push("부분부정: '모두가 ~한 것은 아니다'로 해석");
  if (has(/\bmake\s+it\s+to\b/i)) notes.push("make it to: '~에 이르다/성공하다' 숙어");
  if (has(/\bbe\s+likely\s+to\b/i)) notes.push("be likely to V: '~할 가능성이 있다' 핵심 표현");
  if (notes.length === 0) notes.push(index === 0 ? "도입문: 소재와 관점을 여는 문장" : "핵심 진술: 주어-동사와 앞뒤 연결어 중심으로 해석");
  return notes.slice(0, 5);
}

function getRole(sentence: string, index: number, total: number) {
  if (index === 0) return "도입·소재 제시";
  if (/for example|for instance|such as/i.test(sentence)) return "예시·근거";
  if (/however|but|rather|whereas|in contrast/i.test(sentence)) return "반전·대조";
  if (/in fact|therefore|for this reason|in this sense|lastly|so/i.test(sentence)) return "강조·결론";
  if (index === total - 1) return "마무리·주제 확정";
  return "전개·보충 설명";
}

function makeSentenceAnalyses(passage: ReadingPassage) {
  const sentences = splitSentences(passage.passage);
  const translations = splitKoreanSentences(passage.translation);
  return sentences.map((sentence, index) => {
    const words = sentence.match(/\b[A-Z]?[a-z]+(?:'[a-z]+)?\b/g) ?? [];
    const subjectGuess = words.slice(0, Math.min(5, words.length)).join(" ");
    const verb = findVerb(sentence) ?? "동사 직접 확인";
    return {
      sentence,
      translation: translations[index] ?? "전문 해석과 함께 대조하면서 확인하세요.",
      role: getRole(sentence, index, sentences.length),
      structure: `주어 후보: ${subjectGuess || "문장 앞부분"} / 동사 단서: ${verb}`,
      pattern: inferSentencePattern(sentence),
      notes: detectGrammar(sentence, index)
    };
  });
}

function getPassageGrammar(passage: ReadingPassage) {
  const derived = Array.from(new Set(makeSentenceAnalyses(passage).flatMap((item) => item.notes))).slice(0, 10);
  return Array.from(new Set([...passage.grammar, ...derived])).slice(0, 16);
}

function mainIdeaFor(passage: ReadingPassage) {
  const title = passage.title.replace(/^\d+\.\s*/, "");
  const last = splitSentences(passage.passage).at(-1) ?? title;
  return `${passage.number}번의 중심 내용: ${title}. 마지막 흐름은 "${last}"로 정리됩니다.`;
}

function makeQuickMemo(passage: ReadingPassage) {
  const sentences = splitSentences(passage.passage);
  const connector = sentences.find((sentence) => /however|but|rather|whereas|in fact|therefore|for this reason|in this sense/i.test(sentence));
  const key = blankTargets[passage.number] ?? getEnrichedVocab(passage)[0]?.word ?? passage.title;
  return [
    `핵심어: ${key}`,
    `글의 방향: ${passage.title}`,
    connector ? `논리 전환/강조 문장: ${connector}` : `마지막 문장까지 같은 방향으로 주제가 강화됩니다.`,
    `변형 예상: ${passage.type} → 제목·요지·빈칸·어법 설명형으로 바뀌기 쉬움`
  ];
}

function getReadingDistractors(passage: ReadingPassage) {
  return readingPassages
    .filter((item) => item.number !== passage.number)
    .map((item) => item.title)
    .slice(0, 20);
}

function replaceTargetWithBlank(text: string, target: string) {
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");
  if (regex.test(text)) return text.replace(regex, "__________");
  const words = target.split(/\s+/).filter(Boolean);
  const fallback = words.sort((a, b) => b.length - a.length)[0];
  return fallback ? text.replace(new RegExp(`\\b${fallback.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), "__________") : text;
}

function makeGrammarMarkedBody(passage: ReadingPassage) {
  const sentences = splitSentences(passage.passage);
  const source = sentences.slice(0, 7).join(" ");
  const candidates = [
    { pattern: /\bto\s+[a-z]+\b/i, label: "to부정사" },
    { pattern: /\b(that|which|who|where|when)\b/i, label: "관계사/접속사" },
    { pattern: /\b[A-Za-z]+ing\b/i, label: "-ing" },
    { pattern: /\b(had|has|have)\s+been\b/i, label: "완료" },
    { pattern: /\b(designed|known|provided|caused|forced|awarded|limited|organized|stored|remembered|triggered)\b/i, label: "p.p." }
  ];
  let body = source;
  const explanations: string[] = [];
  let mark = 0;
  for (const candidate of candidates) {
    const found = body.match(candidate.pattern)?.[0];
    if (!found || body.includes(`${optionMarks[mark]} `)) continue;
    body = body.replace(found, `${optionMarks[mark]} ${found}`);
    explanations.push(`${optionMarks[mark]} ${found}: ${candidate.label} 확인`);
    mark += 1;
    if (mark >= 5) break;
  }
  while (explanations.length < 5) {
    explanations.push(`${optionMarks[explanations.length]} 문장 전체: 주어-동사 수일치와 병렬 구조 확인`);
  }
  return { body, explanations };
}

function makeVariantProblem(passage: ReadingPassage, type: VariantType): VariantProblem {
  const cleanPassage = cleanText(passage.passage);
  const meta = mockVariantMeta[passage.number];
  const target = blankTargets[passage.number] ?? getEnrichedVocab(passage)[0]?.word ?? "main idea";

  if (type === "title") {
    const correct = meta?.title ?? passage.title;
    const { options, answer } = optionize(meta?.wrongTitles ?? getReadingDistractors(passage), correct, passage.number * 3);
    return {
      heading: "다음 글의 제목으로 가장 적절한 것은?",
      body: cleanPassage,
      options,
      answer,
      skill: "제목형은 소재 하나가 아니라 글 전체를 덮는 표현을 골라야 합니다.",
      explanation: `정답은 ${correct}입니다. 제목형 변형에서는 지문에 등장한 단어가 있어도 범위가 너무 좁거나 반대 내용을 담은 선지는 제외해야 합니다.`
    };
  }

  if (type === "main") {
    const correct = meta?.main ?? mainIdeaFor(passage);
    const { options, answer } = optionize(meta?.wrongMains ?? seededShuffle(readingPassages.filter((item) => item.number !== passage.number).map((item) => `${item.number}번의 중심 내용: ${item.title}`), passage.number * 7).slice(0, 4), correct, passage.number * 11);
    return {
      heading: "다음 글의 요지로 가장 적절한 것은?",
      body: cleanPassage,
      options,
      answer,
      skill: "요지형은 예시보다 주장·결론·반복 핵심어를 우선합니다.",
      explanation: "정답은 글 전체의 방향을 한 문장으로 압축한 선택지입니다. 세부 사례만 말하거나 반대 내용을 섞은 선지는 실제 내신 변형에서 오답으로 자주 나옵니다."
    };
  }

  if (type === "blank") {
    const body = replaceTargetWithBlank(cleanPassage, target);
    const wrongPool = seededShuffle(getEnrichedVocab(passage).map((item) => item.word).filter((word) => word.toLowerCase() !== target.toLowerCase()), passage.number * 17).slice(0, 4);
    const { options, answer } = optionize(wrongPool, target, passage.number * 19);
    return {
      heading: "다음 빈칸에 들어갈 말로 가장 적절한 것은?",
      body,
      options,
      answer,
      skill: "빈칸형은 빈칸 앞뒤 연결어와 반복되는 핵심어를 동시에 봅니다.",
      explanation: `빈칸은 ${target}입니다. 단어 뜻만 보고 고르기보다 빈칸 앞뒤 문장이 같은 방향인지, 대조인지, 예시인지 확인해야 합니다.`
    };
  }

  if (type === "grammar") {
    const marked = makeGrammarMarkedBody(passage);
    const wrong = "③ 이 표현은 항상 양보절로만 해석되므로 앞뒤 논리와 관계없이 '비록 ~이지만'으로 해석한다.";
    const options = [
      "① 밑줄 친 표현은 문장 안에서 명사·형용사·부사 역할 중 하나를 하므로 자리로 용법을 판단한다.",
      "② 관계사/접속사는 앞 명사와 빠진 성분을 함께 확인해야 한다.",
      wrong,
      "④ -ing는 동명사, 현재분사, 분사구문 가능성을 모두 열어 두고 해석한다.",
      "⑤ p.p.는 수동태 동사인지 앞 명사를 꾸미는 후치수식인지 구분한다."
    ];
    return {
      heading: "다음 글의 밑줄 친 부분에 대한 설명으로 적절하지 않은 것은?",
      body: `${marked.body}\n\n[표시된 부분] ${marked.explanations.join(" / ")}`,
      options,
      answer: "③",
      skill: meta?.grammarFocus ? `집중 포인트: ${meta.grammarFocus}` : "어법형은 원문을 바꾸지 않고도 '용법 설명' 문제로 변형될 수 있습니다.",
      explanation: `③처럼 특정 접속사나 구문을 무조건 한 가지 뜻으로 고정하면 오답입니다. 이 지문은 ${meta?.grammarFocus ?? "문장 안의 자리, 선행사, 주절과의 관계"}를 근거로 판단하는 문제가 나오기 쉽습니다.`
    };
  }

  const sentences = splitSentences(passage.passage);
  const base = sentences[0] ?? cleanPassage;
  const pieces = sentences.slice(1, 4);
  const labeled = pieces.map((sentence, index) => `(${String.fromCharCode(65 + index)}) ${sentence}`);
  const correctOrder = pieces.map((_, index) => String.fromCharCode(65 + index)).join(" - ");
  const permutations = ["A - B - C", "A - C - B", "B - A - C", "B - C - A", "C - A - B"];
  const { options, answer } = optionize(permutations.filter((item) => item !== correctOrder), correctOrder, passage.number * 23);
  return {
    heading: "주어진 글 다음에 이어질 글의 순서로 가장 적절한 것은?",
    body: `[주어진 글] ${base}\n\n${labeled.join("\n\n")}`,
    options,
    answer,
    skill: "순서형은 대명사, 지시어, 역접어, 예시어를 따라가면 빨라집니다.",
    explanation: `원래 전개는 ${correctOrder}입니다. 첫 문장 뒤에 새 정보가 도입되고, 뒤 문장에서 그 정보가 반복·구체화되는지 확인하세요.`
  };
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-300">{detail}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-black text-brand-700">{children}</span>;
}

function PanelTitle({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">{icon}</span>
      <div>
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
        <p className="text-xs font-bold text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

export function EnglishWorkspace() {
  const [mode, setMode] = useState<Mode>("reading");
  const [selectedNumber, setSelectedNumber] = useState(18);
  const [listenNumber, setListenNumber] = useState(1);
  const [showTranslation, setShowTranslation] = useState(true);
  const [variantType, setVariantType] = useState<VariantType>("title");
  const [showVariantAnswer, setShowVariantAnswer] = useState(false);
  const [orderSeed, setOrderSeed] = useState(11);
  const [blankSeed, setBlankSeed] = useState(5);
  const [blankCount, setBlankCount] = useState(6);
  const [blankInputs, setBlankInputs] = useState<Record<number, string>>({});
  const [blankChecked, setBlankChecked] = useState(false);
  const [showBlankHints, setShowBlankHints] = useState(false);
  const [orderChecked, setOrderChecked] = useState(false);
  const [order, setOrder] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState<null | "reading" | "blank" | "variant">(null);
  const [aiReadingNote, setAiReadingNote] = useState("");
  const [aiBlankNote, setAiBlankNote] = useState("");
  const [aiVariantNote, setAiVariantNote] = useState("");
  const [pointMessage, setPointMessage] = useState("");

  const current = readingPassages.find((item) => item.number === selectedNumber) ?? readingPassages[0];
  const currentListening = listeningScripts.find((item) => item.number === listenNumber) ?? listeningScripts[0];

  const originalSentences = useMemo(() => splitSentences(current.passage), [current]);
  const sentenceAnalyses = useMemo(() => makeSentenceAnalyses(current), [current]);
  const enrichedVocab = useMemo(() => getEnrichedVocab(current), [current]);
  const grammarPoints = useMemo(() => getPassageGrammar(current), [current]);
  const quickMemo = useMemo(() => makeQuickMemo(current), [current]);
  const shuffled = useMemo(() => seededShuffle(originalSentences, selectedNumber * 31 + orderSeed), [originalSentences, selectedNumber, orderSeed]);
  const displayOrder = order.length === originalSentences.length ? order : shuffled;
  const blankQuestion = useMemo(() => makeBlankQuestion(current, blankCount, blankSeed), [current, blankCount, blankSeed]);
  const variantProblem = useMemo(() => makeVariantProblem(current, variantType), [current, variantType]);

  function selectReading(number: number) {
    setSelectedNumber(number);
    setOrder([]);
    setOrderChecked(false);
    setBlankInputs({});
    setBlankChecked(false);
    setShowBlankHints(false);
    setShowVariantAnswer(false);
    setAiReadingNote("");
    setAiBlankNote("");
    setAiVariantNote("");
    setPointMessage("");
  }

  function resetOrder() {
    setOrder(seededShuffle(originalSentences, selectedNumber * 31 + orderSeed + 1));
    setOrderSeed((prev) => prev + 1);
    setOrderChecked(false);
  }

  function moveSentence(index: number, direction: -1 | 1) {
    const base = displayOrder;
    const next = [...base];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setOrderChecked(false);
  }

  const orderCorrect = displayOrder.every((sentence, index) => sentence === originalSentences[index]);
  const blankScore = blankQuestion.blanks.filter((blank) => normalizeForCheck(blankInputs[blank.id] ?? "") === normalizeForCheck(blank.answer)).length;

  async function awardPoints(activityId: string, points: number) {
    try {
      const res = await fetch("/api/points/award", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId, points })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "포인트 저장 실패");
      if (data.awarded > 0) {
        setPointMessage(`+${data.awarded}P 적립! 프로필과 리더보드에 반영됩니다.`);
      } else if (data.alreadySolved) {
        setPointMessage("이미 포인트를 받은 문제입니다. 복습은 계속 가능해요.");
      }
    } catch (error) {
      setPointMessage(error instanceof Error ? error.message : "포인트 저장에 실패했습니다.");
    }
  }

  function checkOrder() {
    setOrderChecked(true);
    const isCorrect = displayOrder.every((sentence, index) => sentence === originalSentences[index]);
    if (isCorrect) {
      awardPoints(`english-${current.number}-order`, 10);
    } else {
      setPointMessage("");
    }
  }

  function checkBlank() {
    setBlankChecked(true);
    const score = blankQuestion.blanks.filter((blank) => normalizeForCheck(blankInputs[blank.id] ?? "") === normalizeForCheck(blank.answer)).length;
    if (score === blankQuestion.blanks.length && blankQuestion.blanks.length > 0) {
      awardPoints(`english-${current.number}-blank`, 10);
    } else {
      setPointMessage("");
    }
  }

  async function askAi(kind: "reading" | "blank" | "variant") {
    if (aiLoading) return;
    setAiLoading(kind);

    const promptMap = {
      reading: `${current.number}번 지문을 내신 준비용으로 다시 분석해줘. 원문: ${cleanText(current.passage)} / 해석: ${cleanText(current.translation)}. 반드시 1) 전체 요지 2) 문장별 주어-동사 3) 관계사/분사/to부정사/수동태/접속사 4) 내신 변형 포인트 5) 암기해야 할 어휘 순서로 정리해줘.`,
      blank: `${current.number}번 지문으로 빈칸 훈련 후보를 만들어줘. 원문은 바꾸지 말고, 시험에 나올 만한 핵심어 8개를 고른 뒤 각 단어의 힌트, 왜 빈칸으로 적절한지, 오답으로 헷갈릴 단어를 정리해줘. 원문: ${cleanText(current.passage)}`,
      variant: `${current.number}번 지문의 본문 내용은 바꾸지 않고, 실제 고1 모의고사 스타일의 변형문제 3개를 만들어줘. 유형은 1) 제목/요지 2) 빈칸추론 3) 어법/문장삽입/순서 중 하나로 해줘. 각 문제는 5지선다, 정답, 해설을 포함해. 원문: ${cleanText(current.passage)}`
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptMap[kind], subject: "english" })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      if (kind === "reading") setAiReadingNote(text);
      if (kind === "blank") setAiBlankNote(text);
      if (kind === "variant") setAiVariantNote(text);
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI 응답을 가져오지 못했습니다.";
      if (kind === "reading") setAiReadingNote(message);
      if (kind === "blank") setAiBlankNote(message);
      if (kind === "variant") setAiVariantNote(message);
    } finally {
      setAiLoading(null);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light px-5 py-8 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
            <ArrowLeft className="h-4 w-4" /> 홈으로
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-xs font-black text-slate-500 shadow-card backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> English module online
          </div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[46px] bg-mesh-dark p-[1px] shadow-deep">
          <div className="noise-mask relative rounded-[45px] border border-white/10 bg-white/[0.06] p-7 text-white backdrop-blur-2xl lg:p-10">
            <div className="absolute -right-14 -top-14 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                  <Sparkles className="h-4 w-4" /> 2025 6월 고1 영어 내신 범위
                </p>
                <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  English<br />
                  <span className="text-gradient-sky">Exam Lab</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                  독해 18~40번은 본문 바로 아래 어휘, 전문 해석, 문장별 구문 분석, 실전 변형문제를 한 화면에서 빠르게 돌릴 수 있게 정리했습니다. 표시가 과한 마킹 분석은 제거하고, 내신에 필요한 문법·어휘·문장 기능과 AI 보강 분석만 남겼습니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                <MetricCard label="Listening" value="17" detail="scripts" />
                <MetricCard label="Reading" value="23" detail="passages" />
                <MetricCard label="Vocab" value="40+" detail="quick scan" />
                <MetricCard label="AI" value="Gemini" detail="Arona OS" />
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-[76px] z-30 mt-6 rounded-[32px] border border-white/70 bg-white/75 p-3 shadow-card backdrop-blur-2xl">
          <div className="grid gap-2 md:grid-cols-5">
            {modeTabs.map((tab) => {
              const TabIcon = tab.icon;
              const active = mode === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key)}
                  className={`group rounded-[24px] px-4 py-4 text-left transition ${active ? "bg-slate-950 text-white shadow-deep" : "bg-white/80 text-slate-600 hover:bg-sky-50"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-2xl ${active ? "bg-white/10 text-sky-200" : "bg-sky-50 text-brand-700"}`}>
                      <TabIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-black">{tab.label}</span>
                      <span className={`mt-0.5 block text-xs font-bold ${active ? "text-slate-300" : "text-slate-400"}`}>{tab.desc}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {mode !== "listening" && (
          <section className="mt-6 rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-slate-950">독해 문항 선택</p>
                <p className="mt-1 text-xs font-bold text-slate-500">18번부터 40번까지 시험 범위</p>
              </div>
              <Pill>{selectedNumber}번 선택됨</Pill>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">
              {readingPassages.map((item) => (
                <button
                  key={item.number}
                  onClick={() => selectReading(item.number)}
                  className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-black transition ${item.number === selectedNumber ? "bg-slate-950 text-white shadow-card" : "bg-white text-slate-600 hover:bg-sky-50"}`}
                >
                  {item.number}
                </button>
              ))}
            </div>
          </section>
        )}

        {mode === "reading" && (
          <section className="mt-6 space-y-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
              <div className="space-y-6">
                <article className="relative overflow-hidden rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep">
                  <div className="absolute inset-0 bg-grid-fade bg-[length:30px_30px] opacity-45" />
                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-sky-200">{current.number}번 · {current.type} · 정답 {current.answer}</p>
                      <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{current.title}</h2>
                    </div>
                    <button onClick={() => setShowTranslation((prev) => !prev)} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-sky-100 backdrop-blur">
                      해석 {showTranslation ? "숨기기" : "보기"}
                    </button>
                  </div>
                  <div className="relative mt-6 rounded-[28px] border border-white/10 bg-black/20 p-6 text-[15px] leading-9 text-slate-100 backdrop-blur">
                    <p className="whitespace-pre-wrap">{cleanText(current.passage)}</p>
                  </div>
                </article>

                <article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur-2xl">
                  <PanelTitle icon={<BadgeCheck className="h-5 w-5" />} title="주요 어휘 확장" sub="본문 바로 밑에서 빠르게 확인" />
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {enrichedVocab.map((item) => (
                      <div key={`${item.word}-${item.meaning}`} className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                        <p className="font-black text-slate-950">{item.word}</p>
                        <p className="mt-1 text-sm font-bold text-slate-500">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-44 xl:self-start">
                <article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur-2xl">
                  <PanelTitle icon={<Target className="h-5 w-5" />} title="시험 직전 요약" sub="거추장스럽지 않게 핵심만" />
                  <div className="mt-4 grid gap-3">
                    {quickMemo.map((memo) => (
                      <div key={memo} className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-bold leading-7 text-slate-700">{memo}</div>
                    ))}
                  </div>
                  <button
                    onClick={() => askAi("reading")}
                    disabled={aiLoading !== null}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-card transition hover:bg-brand-700 disabled:opacity-60"
                  >
                    {aiLoading === "reading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} AI로 이 지문 보강 분석
                  </button>
                  {aiReadingNote && (
                    <div className="mt-4 max-h-[420px] overflow-y-auto rounded-[24px] border border-sky-100 bg-white p-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">
                      <p className="whitespace-pre-wrap">{aiReadingNote}</p>
                    </div>
                  )}
                </article>

                {showTranslation && (
                  <article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur-2xl">
                    <PanelTitle icon={<FileText className="h-5 w-5" />} title="전문 해석" sub="본문과 대조하며 확인" />
                    <p className="mt-5 text-sm leading-8 text-slate-700">{cleanText(current.translation)}</p>
                  </article>
                )}
              </aside>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
              <article className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-card backdrop-blur-2xl xl:sticky xl:top-44 xl:self-start">
                <PanelTitle icon={<ScanText className="h-5 w-5" />} title="주요 문법·구문" sub="내신 어법 포인트" />
                <div className="mt-4 grid gap-3">
                  {grammarPoints.map((item) => (
                    <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm font-semibold leading-7 text-slate-700">{item}</div>
                  ))}
                </div>
              </article>

              <article className="rounded-[38px] border border-white/70 bg-white/90 p-7 shadow-card backdrop-blur-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-700">Sentence breakdown</p>
                    <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">문장별 내신 분석</h3>
                    <p className="mt-2 text-sm font-bold text-slate-500">분사구문·관계사·동사·형식·문장 기능을 문장 단위로 확인합니다.</p>
                  </div>
                  <Pill>{sentenceAnalyses.length} sentences</Pill>
                </div>
                <div className="mt-6 grid gap-4">
                  {sentenceAnalyses.map((item, index) => (
                    <div key={`${item.sentence}-${index}`} className="rounded-[26px] border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                        <div className="min-w-0">
                          <p className="text-[15px] font-semibold leading-8 text-slate-900 break-words">{item.sentence}</p>
                          <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">{item.translation}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand-700">{item.role}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">{item.structure}</span>
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{item.pattern}</span>
                          </div>
                          <div className="mt-3 grid gap-2">
                            {item.notes.map((note) => (
                              <p key={note} className="flex gap-2 rounded-2xl border border-sky-100 bg-sky-50/60 px-3 py-2 text-sm font-semibold leading-6 text-slate-700"><Braces className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" /> {note}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        )}

        {mode === "listening" && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-[34px] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur-2xl lg:sticky lg:top-44 lg:self-start">
              <p className="text-sm font-black text-slate-950">듣기 번호</p>
              <p className="mt-1 text-xs font-bold text-slate-500">1~17번 스크립트 보기</p>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:grid-cols-3">
                {listeningScripts.map((item) => (
                  <button key={item.number} onClick={() => setListenNumber(item.number)} className={`rounded-2xl px-3 py-2 text-sm font-black transition ${item.number === listenNumber ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>{item.number}</button>
                ))}
              </div>
            </aside>
            <article className="relative overflow-hidden rounded-[38px] bg-mesh-dark p-7 text-white shadow-deep">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-black text-sky-200">{currentListening.number}번 · {currentListening.type} · 정답 {currentListening.answer}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">{currentListening.title}</h2>
                <div className="mt-6 rounded-[28px] border border-white/10 bg-white/10 p-6 text-sm leading-8 text-slate-100 backdrop-blur">
                  <p className="whitespace-pre-wrap">{cleanText(currentListening.script)}</p>
                </div>
              </div>
            </article>
          </section>
        )}

        {mode === "order" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/80 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-brand-700">{current.number}번 · 문장 순서 트레이닝</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">섞인 문장을 원래 순서로 복구</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">위/아래 버튼으로 문장을 옮긴 뒤 채점하세요. 글의 전개 흐름을 외우는 데 맞춘 기능입니다.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={resetOrder} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><ListRestart className="h-4 w-4" /> 다시 섞기</button>
                <button onClick={checkOrder} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {displayOrder.map((sentence, index) => (
                <div key={`${sentence}-${index}`} className={`rounded-[26px] border p-4 shadow-sm transition ${orderChecked ? sentence === originalSentences[index] ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50" : "border-slate-100 bg-white"}`}>
                  <div className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">{index + 1}</span>
                    <p className="flex-1 text-sm leading-8 text-slate-700">{sentence}</p>
                    <div className="flex shrink-0 flex-col gap-2">
                      <button onClick={() => moveSentence(index, -1)} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↑</button>
                      <button onClick={() => moveSentence(index, 1)} className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">↓</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {orderChecked && <div className={`mt-5 rounded-[24px] p-4 text-sm font-black ${orderCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{orderCorrect ? "정답입니다. 문장 전개 흐름을 잘 잡았어요." : "아직 순서가 맞지 않습니다. 접속사, 지시어, 예시 흐름을 다시 확인하세요."}</div>}
            {pointMessage && <div className="mt-3 rounded-[22px] border border-amber-100 bg-amber-50 p-4 text-sm font-black text-amber-700">{pointMessage}</div>}
          </section>
        )}

        {mode === "blank" && (
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/80 p-7 shadow-card backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-brand-700">{current.number}번 · 랜덤 빈칸 트레이닝</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">핵심 단어 빈칸 채우기</h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">힌트 보기를 누르면 첫 글자와 철자 수가 표시됩니다. 외우기 직전에는 힌트를 끄고 채점하세요.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={blankCount} onChange={(e) => setBlankCount(Number(e.target.value))} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-black outline-none">
                  <option value={4}>4개</option>
                  <option value={6}>6개</option>
                  <option value={8}>8개</option>
                  <option value={10}>10개</option>
                </select>
                <button onClick={() => setShowBlankHints((prev) => !prev)} className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700"><HelpCircle className="h-4 w-4" /> 힌트 {showBlankHints ? "숨기기" : "보기"}</button>
                <button onClick={() => { setBlankSeed((prev) => prev + 1); setBlankInputs({}); setBlankChecked(false); setShowBlankHints(false); }} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-brand-700"><Wand2 className="h-4 w-4" /> 새 빈칸</button>
                <button onClick={checkBlank} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">채점</button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => askAi("blank")}
                disabled={aiLoading !== null}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-card transition hover:bg-brand-700 disabled:opacity-60"
              >
                {aiLoading === "blank" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} AI 빈칸 후보 추천
              </button>
            </div>
            {aiBlankNote && (
              <div className="mt-4 max-h-[360px] overflow-y-auto rounded-[26px] border border-sky-100 bg-white p-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">
                <p className="whitespace-pre-wrap">{aiBlankNote}</p>
              </div>
            )}
            <div className="mt-6 rounded-[30px] bg-mesh-dark p-6 text-sm leading-9 text-slate-100 shadow-deep">
              {blankQuestion.parts.map((part, idx) =>
                typeof part === "string" ? <span key={idx}>{part}</span> : (
                  <span key={part.id} className="inline-flex flex-col items-center align-middle">
                    <input value={blankInputs[part.id] ?? ""} onChange={(e) => { setBlankInputs((prev) => ({ ...prev, [part.id]: e.target.value })); setBlankChecked(false); }} className={`mx-1 inline-block w-32 rounded-2xl border px-3 py-1.5 text-center text-sm font-black text-slate-900 outline-none ${blankChecked ? normalizeForCheck(blankInputs[part.id] ?? "") === normalizeForCheck(part.answer) ? "border-emerald-400 bg-emerald-50" : "border-rose-400 bg-rose-50" : "border-sky-200 bg-white"}`} placeholder={showBlankHints ? `${part.answer[0]}...(${part.answer.length})` : "빈칸"} />
                    {showBlankHints && <span className="text-[10px] font-black leading-4 text-sky-200">{part.answer[0]} / {part.answer.length} letters</span>}
                  </span>
                )
              )}
            </div>
            {showBlankHints && (
              <div className="mt-4 rounded-[26px] border border-amber-100 bg-amber-50 p-4 text-sm font-bold text-amber-800">
                <div className="flex items-center gap-2"><Lightbulb className="h-5 w-5" /> 힌트 목록</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {blankQuestion.blanks.map((blank) => <span key={blank.id} className="rounded-2xl bg-white px-3 py-2 shadow-sm">{blank.id + 1}. {blank.answer[0]}___ / {blank.answer.length}글자</span>)}
                </div>
              </div>
            )}
            {blankChecked && (
              <div className="mt-5 rounded-[26px] border border-sky-100 bg-sky-50/80 p-4 text-sm font-black text-brand-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> 점수: {blankScore} / {blankQuestion.blanks.length}</div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {blankQuestion.blanks.map((blank) => <span key={blank.id} className="rounded-2xl bg-white px-3 py-2 text-slate-700 shadow-sm">{blank.id + 1}. {blank.answer}</span>)}
                </div>
              </div>
            )}
            {pointMessage && <div className="mt-3 rounded-[22px] border border-amber-100 bg-amber-50 p-4 text-sm font-black text-amber-700">{pointMessage}</div>}
          </section>
        )}

        {mode === "variant" && (
          <section className="mt-6 grid gap-6 xl:grid-cols-[330px_1fr]">
            <aside className="rounded-[34px] border border-white/70 bg-white/80 p-5 shadow-card backdrop-blur-2xl xl:sticky xl:top-44 xl:self-start">
              <p className="text-sm font-black text-slate-950">변형 유형</p>
              <p className="mt-1 text-xs font-bold text-slate-500">본문은 유지하고 문제 유형만 바꾸는 연습</p>
              <div className="mt-4 grid gap-2">
                {variantTypes.map((item) => (
                  <button key={item.key} onClick={() => { setVariantType(item.key); setShowVariantAnswer(false); }} className={`rounded-[22px] px-4 py-3 text-left transition ${variantType === item.key ? "bg-slate-950 text-white" : "bg-white text-slate-600 hover:bg-sky-50"}`}>
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className={`mt-0.5 block text-xs font-bold ${variantType === item.key ? "text-slate-300" : "text-slate-400"}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-3xl bg-sky-50 p-4 text-xs font-bold leading-6 text-slate-600">
                직접 딥러닝보다, 지문 DB + 기출 유형 템플릿 + AI API가 현실적입니다. 지금 버전은 API 전 단계라 유형 템플릿을 최대한 모의고사식으로 맞춰 두었습니다.
              </div>
            </aside>

            <article className="rounded-[16px] border border-slate-300 bg-white p-8 shadow-deep md:p-10">
              <div className="border-b-2 border-slate-900 pb-4">
                <p className="text-sm font-bold text-slate-500">KSarchive 변형 모의고사 · 영어 영역</p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">{current.number}번 변형문제</h2>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <p className="font-black text-slate-900">{variantProblem.heading}</p>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-black text-slate-500">{variantProblem.skill}</span>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-9 text-slate-800">
                <p className="whitespace-pre-wrap">{variantProblem.body}</p>
              </div>
              <div className="mt-6 grid gap-3">
                {variantProblem.options.map((option) => <button key={option} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-bold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50">{option}</button>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button onClick={() => setShowVariantAnswer((prev) => !prev)} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white"><ListChecks className="h-4 w-4" /> 정답·해설 {showVariantAnswer ? "숨기기" : "보기"}</button>
                <button onClick={() => askAi("variant")} disabled={aiLoading !== null} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-black text-brand-700 transition hover:bg-sky-100 disabled:opacity-60">
                  {aiLoading === "variant" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} AI 변형문제 생성
                </button>
              </div>
              {aiVariantNote && (
                <div className="mt-5 max-h-[520px] overflow-y-auto rounded-[26px] border border-sky-100 bg-sky-50 p-5 text-sm font-semibold leading-7 text-slate-700">
                  <p className="whitespace-pre-wrap">{aiVariantNote}</p>
                </div>
              )}
              {showVariantAnswer && (
                <div className="mt-5 rounded-[26px] border border-sky-100 bg-sky-50 p-5">
                  <p className="text-sm font-black text-brand-700">정답: {variantProblem.answer}</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{variantProblem.explanation}</p>
                </div>
              )}
            </article>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
