import {
  BookOpenText,
  BrainCircuit,
  ClipboardList,
  Files,
  FlaskConical,
  Languages,
  Landmark,
  NotebookPen,
  ScrollText,
  Sigma,
  Sparkles,
  type LucideIcon
} from "lucide-react";

export type SubjectId = "korean" | "english" | "math" | "science" | "social" | "history";

export type SubjectItem = {
  id: SubjectId;
  name: string;
  label: string;
  description: string;
  accent: string;
  icon: LucideIcon;
  status: "empty" | "rebuilding" | "ready";
  priority: number;
};

export type NoteItem = {
  title: string;
  summary: string;
  tags: string[];
};

export type ExamRangeItem = {
  title: string;
  detail: string;
};

export type KeyConceptItem = {
  title: string;
  description: string;
};

export type QuizItem = {
  question: string;
  answer: string;
};

export type ResourceItem = {
  title: string;
  type: "text" | "image" | "pdf" | "link";
  description: string;
};

export type SubjectContent = {
  notes: NoteItem[];
  examRanges: ExamRangeItem[];
  keyConcepts: KeyConceptItem[];
  quizzes: QuizItem[];
  resources: ResourceItem[];
};

export const subjects: SubjectItem[] = [
  {
    id: "korean",
    name: "국어",
    label: "Korean",
    description: "작품 분석, 문법, 독서 지문, 서술형 답안 정리 공간",
    accent: "from-sky-400 to-blue-500",
    icon: BookOpenText,
    status: "empty",
    priority: 2
  },
  {
    id: "english",
    name: "영어",
    label: "English",
    description: "2025년 6월 고1 영어: 듣기 1~17, 독해 18~40을 지문별 분석과 트레이닝으로 학습",
    accent: "from-cyan-400 to-sky-500",
    icon: Languages,
    status: "ready",
    priority: 1
  },
  {
    id: "math",
    name: "수학",
    label: "Math",
    description: "개념, 유형, 오답 포인트, 풀이 루틴 정리 공간",
    accent: "from-blue-500 to-indigo-500",
    icon: Sigma,
    status: "empty",
    priority: 6
  },
  {
    id: "science",
    name: "과학",
    label: "Science",
    description: "핵심 개념, 실험 원리, 계산형 문제 정리 공간",
    accent: "from-sky-500 to-cyan-500",
    icon: FlaskConical,
    status: "empty",
    priority: 5
  },
  {
    id: "social",
    name: "사회",
    label: "Social Studies",
    description: "개념 비교, 자료 해석, 단답형 대비 정리 공간",
    accent: "from-blue-400 to-cyan-500",
    icon: Landmark,
    status: "empty",
    priority: 3
  },
  {
    id: "history",
    name: "한국사",
    label: "Korean History",
    description: "근대사 흐름을 년도별 타임라인과 사건 관계로 정리한 한국사 공간",
    accent: "from-indigo-400 to-sky-500",
    icon: ScrollText,
    status: "ready",
    priority: 4
  }
];

export const emptySubjectContent: SubjectContent = {
  notes: [],
  examRanges: [],
  keyConcepts: [],
  quizzes: [],
  resources: []
};

export const subjectContents: Record<SubjectId, SubjectContent> = {
  korean: { ...emptySubjectContent },
  english: {
    notes: [
      {
        title: "2025 6월 고1 영어 독해 분석",
        summary: "18번부터 40번까지 원문, 전문 해석, 주요 문법, 어휘를 문항별로 정리했습니다.",
        tags: ["독해", "해석", "문법", "어휘"]
      }
    ],
    examRanges: [
      {
        title: "영어 시험 범위",
        detail: "듣기 1~17번, 독해 18~40번"
      }
    ],
    keyConcepts: [
      {
        title: "지문 암기 트레이닝",
        description: "문장 순서 배열과 랜덤 빈칸 채우기로 지문 흐름과 핵심어를 반복 학습합니다."
      }
    ],
    quizzes: [
      {
        question: "독해 지문을 외우는 기본 훈련 모드는?",
        answer: "문장 순서 배열, 랜덤 빈칸 채우기"
      }
    ],
    resources: [
      {
        title: "English Training Deck",
        type: "text",
        description: "영어 전용 워크스페이스에 연결된 내신 대비 데이터"
      }
    ]
  },
  math: { ...emptySubjectContent },
  science: { ...emptySubjectContent },
  social: { ...emptySubjectContent },
  history: {
    notes: [
      {
        title: "근대사 핵심 타임라인",
        summary: "흥선대원군 집권부터 국권 피탈까지 사건의 순서, 원인, 결과를 년도별로 정리했습니다.",
        tags: ["근대사", "타임라인", "개항", "국권침탈"]
      }
    ],
    examRanges: [
      { title: "한국사 시험 범위", detail: "근대사 파트: 개항기부터 국권 피탈 전후까지" }
    ],
    keyConcepts: [
      { title: "흐름 중심 암기", description: "사건명만 외우지 말고 강화도 조약 → 임오군란 → 갑신정변 → 동학농민운동 → 갑오개혁 → 을사늑약 → 국권피탈의 인과를 연결합니다." }
    ],
    quizzes: [],
    resources: [
      { title: "Modern History Timeline", type: "text", description: "한국사 근대사 전용 타임라인 페이지" }
    ]
  }
};

export const englishBuildPlan = [
  {
    title: "시험 범위 확정",
    description: "교과서 단원, 모의고사 번호, 외부 지문, 어휘 범위를 먼저 고정합니다."
  },
  {
    title: "단어장",
    description: "영어 단어 → 한국어 뜻, 한국어 뜻 → 영어 단어 퀴즈가 가능하도록 정리합니다."
  },
  {
    title: "본문·지문 분석",
    description: "문장별 직독직해, 핵심 구문, 어법 포인트, 시험 변형 포인트를 붙입니다."
  },
  {
    title: "유형별 대비",
    description: "주제, 제목, 빈칸, 순서, 삽입, 어법, 서술형을 따로 모읍니다."
  }
];

export const buildOrder = ["영어", "한국사", "국어", "사회", "과학", "수학"];

export const homeStats = [
  { title: "과목", value: "6", icon: Files },
  { title: "현재 자료", value: "0", icon: NotebookPen },
  { title: "퀴즈", value: "0", icon: ClipboardList },
  { title: "AI 연결", value: "대기", icon: BrainCircuit }
];

export const resetChecklist = [
  "6개 과목 탭 유지",
  "이전 과목별 내용 제거",
  "영어부터 재구축",
  "AI API는 나중에 연결"
];

export const featureCards = [
  {
    title: "과목별 아카이브",
    description: "시험 범위, 필기, 핵심 개념, 자료, 문제를 과목별로 분리해 쌓습니다.",
    icon: Files
  },
  {
    title: "퀴즈 확장 예정",
    description: "단어, 빈칸, 단답형, 서술형 문제를 나중에 데이터 기반으로 연결합니다.",
    icon: ClipboardList
  },
  {
    title: "AI 질문 허브",
    description: "API 키를 넣으면 ai-docs 자료를 참고하는 학습 OS로 확장할 수 있습니다.",
    icon: Sparkles
  }
];

export function getSubjectById(id: string) {
  return subjects.find((subject) => subject.id === id);
}

export function getContentCount(content: SubjectContent) {
  return (
    content.notes.length +
    content.examRanges.length +
    content.keyConcepts.length +
    content.quizzes.length +
    content.resources.length
  );
}
