export type { CountingFormula, CountingProblem, CurriculumLevel } from "./math-counting/types";

import { advancedCountingTools } from "./math-counting/advanced";
import { coreCountingTools } from "./math-counting/core";
import { extraCoreCountingTools } from "./math-counting/core-extra";
import { extendedCountingTools } from "./math-counting/extended";
import { extraExtendedCountingTools } from "./math-counting/extended-extra";
import type { CountingFormula, CurriculumLevel } from "./math-counting/types";

export const countingFormulas: CountingFormula[] = [
  ...coreCountingTools,
  ...extraCoreCountingTools,
  ...extendedCountingTools,
  ...extraExtendedCountingTools,
  ...advancedCountingTools
];

export const curriculumSummary: { level: CurriculumLevel; description: string }[] = [
  {
    level: "교육과정",
    description: "내신 기본 문제에서 바로 쓰는 순열, 조합, 중복순열, 중복조합, 여사건 중심 도구입니다."
  },
  {
    level: "교육과정 확장",
    description: "기본 공식을 좌석, 정수해, 경로, 포함배제 구조에 맞게 변형해 쓰는 유형입니다."
  },
  {
    level: "심화(교육과정 외)",
    description: "경시·심화 사고를 위해 분리한 카탈란 수, 하키스틱 정리, 스털링 수 유형입니다."
  }
];
