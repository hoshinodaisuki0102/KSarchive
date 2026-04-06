import {
  BookOpenText,
  Languages,
  Sigma,
  FlaskConical,
  Landmark,
  ScrollText,
  Sparkles,
  BrainCircuit,
  Files,
  MessageSquareText,
  NotebookPen,
  CheckCircle2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SubjectItem = {
  id: string;
  name: string;
  description: string;
  accent: string;
  icon: LucideIcon;
  stats: string;
};

export type UpdateItem = {
  subject: string;
  title: string;
  note: string;
  date: string;
};

export type ExamItem = {
  subject: string;
  range: string;
  importance: string;
};

export type QuickTool = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const subjects: SubjectItem[] = [
  {
    id: "korean",
    name: "국어",
    description: "작품 정리, 문법 포인트, 서술형 대비",
    accent: "from-sky-400 to-blue-500",
    icon: BookOpenText,
    stats: "필기 0개 · 퀴즈 0세트"
  },
  {
    id: "english",
    name: "영어",
    description: "본문 분석, 어법, 빈칸·순서·서술형 대비",
    accent: "from-cyan-400 to-sky-500",
    icon: Languages,
    stats: "필기 0개 · 퀴즈 0세트"
  },
  {
    id: "math",
    name: "수학",
    description: "개념 구조화, 유형 정리, 오답 포인트",
    accent: "from-blue-500 to-indigo-500",
    icon: Sigma,
    stats: "필기 0개 · 퀴즈 0세트"
  },
  {
    id: "science",
    name: "과학",
    description: "핵심 개념, 실험 원리, 계산형 문제 대비",
    accent: "from-sky-500 to-cyan-500",
    icon: FlaskConical,
    stats: "필기 0개 · 퀴즈 0세트"
  },
  {
    id: "social",
    name: "사회",
    description: "개념 비교, 자료 해석, 단답형 대비",
    accent: "from-blue-400 to-cyan-500",
    icon: Landmark,
    stats: "필기 0개 · 퀴즈 0세트"
  },
  {
    id: "history",
    name: "한국사",
    description: "시대 흐름, 사건 비교, 사료형 문제 대비",
    accent: "from-sky-400 to-indigo-500",
    icon: ScrollText,
    stats: "필기 0개 · 퀴즈 0세트"
  }
];

export const updates: UpdateItem[] = [
  {
    subject: "공지",
    title: "첫 자료 업로드 전 메인 구조 완료",
    note: "이 영역에는 과목별 최신 필기나 시험 범위 업데이트가 표시됩니다.",
    date: "Ready"
  },
  {
    subject: "AI",
    title: "전체 AI 질문 허브 준비",
    note: "시험 범위 데이터 학습 후, 전체 질문과 과목별 질문을 연결할 수 있습니다.",
    date: "Ready"
  },
  {
    subject: "Quiz",
    title: "퀴즈 시스템 연결 예정",
    note: "객관식·단답형·오답 복습 중심으로 확장하기 좋은 구조입니다.",
    date: "Ready"
  }
];

export const exams: ExamItem[] = [
  {
    subject: "국어",
    range: "시험 범위 입력 예정",
    importance: "서술형"
  },
  {
    subject: "영어",
    range: "시험 범위 입력 예정",
    importance: "어법"
  },
  {
    subject: "수학",
    range: "시험 범위 입력 예정",
    importance: "유형"
  }
];

export const quickTools: QuickTool[] = [
  {
    title: "전체 AI 질문",
    description: "시험범위 전체를 기준으로 질문하는 메인 허브",
    icon: BrainCircuit
  },
  {
    title: "시험 범위 정리",
    description: "과목별 범위와 단원 핵심을 빠르게 확인",
    icon: Files
  },
  {
    title: "오늘의 퀴즈",
    description: "짧게 복습하는 데일리 문제 세트",
    icon: Sparkles
  },
  {
    title: "오답·메모",
    description: "틀린 문제와 필기 포인트를 쌓아두는 공간",
    icon: NotebookPen
  }
];

export const chatbotPrompts = [
  "이 단원 핵심만 5줄로 요약해줘",
  "서술형 답안처럼 정리해줘",
  "시험 직전 암기 포인트만 뽑아줘",
  "이 개념을 쉽게 설명해줘"
];

export const featureCards = [
  {
    title: "과목별 AI 연결",
    description: "국·영·수·과·사·한국사 안에서 바로 질문할 수 있게 설계",
    icon: MessageSquareText
  },
  {
    title: "정리된 아카이브 구조",
    description: "필기, 범위, 퀴즈, 업데이트가 한 흐름으로 이어지는 구조",
    icon: CheckCircle2
  }
];