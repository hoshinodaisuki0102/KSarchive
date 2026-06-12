export type CurriculumLevel = "교육과정" | "교육과정 확장" | "심화(교육과정 외)";

export type CountingProblem = {
  sourceType: "기출형 자체 제작" | "개념 확인" | "심화형 자체 제작";
  difficulty: "하" | "중" | "상";
  problem: string;
  given: string[];
  strategy: string;
  solutionSteps: string[];
  answer: string;
};

export type CountingFormula = {
  id: string;
  title: string;
  subtitle: string;
  curriculumLevel: CurriculumLevel;
  formula: string;
  formulaNote: string;
  when: string;
  signalWords: string[];
  idea: string;
  warning: string;
  problem: CountingProblem;
  tags: string[];
};
