import type { CountingFormula } from "./types";

export const extraExtendedCountingTools: CountingFormula[] = [
  {
    id: "circle-permutation",
    title: "원순열",
    subtitle: "원을 돌려 같아지는 배열은 하나로 보기",
    curriculumLevel: "교육과정 확장",
    formula: "서로 다른 n개 원형 배열: (n-1)!",
    formulaNote: "회전해서 같은 배열은 하나로 본다.",
    when: "원탁에 앉기처럼 회전한 배치를 같은 것으로 볼 때 사용한다.",
    signalWords: ["원탁", "둥글게", "회전하면 같음"],
    idea: "한 사람을 기준점으로 고정하고 나머지를 일렬로 배열한다.",
    warning: "목걸이처럼 뒤집어도 같으면 원순열에서 다시 2로 나눈다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "상",
      problem: "남학생 4명과 여학생 4명이 원탁에 둘러앉는다. 남학생과 여학생이 번갈아 앉는 방법의 수를 구하여라.",
      given: ["남학생 4명", "여학생 4명", "원탁", "남녀 번갈아 앉음"],
      strategy: "한 집단을 먼저 원형으로 배치한 뒤 사이사이에 다른 집단을 배치한다.",
      solutionSteps: ["남학생 4명을 원탁에 앉히는 방법은 3!이다.", "남학생 사이 4자리에 여학생 4명을 배열하는 방법은 4!이다.", "따라서 3!×4!=144이다."],
      answer: "144가지"
    },
    tags: ["원탁", "회전", "번갈아"]
  },
  {
    id: "inclusion-exclusion",
    title: "포함배제 원리",
    subtitle: "겹쳐 세어진 부분을 빼고 다시 더하기",
    curriculumLevel: "교육과정 확장",
    formula: "|A∪B|=|A|+|B|-|A∩B|",
    formulaNote: "두 조건을 더하면 겹친 부분이 두 번 세어진다.",
    when: "A 또는 B를 만족하는 경우를 셀 때 두 조건이 겹칠 수 있으면 사용한다.",
    signalWords: ["또는", "둘 중 하나 이상", "배수"],
    idea: "각 조건을 더하고 동시에 만족하는 경우를 빼 준다.",
    warning: "조건이 3개 이상이면 세 조건의 교집합을 다시 더하는 단계까지 필요하다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "1부터 200까지의 자연수 중 3의 배수 또는 5의 배수의 개수를 구하여라.",
      given: ["1부터 200", "3의 배수 또는 5의 배수"],
      strategy: "3의 배수와 5의 배수를 더하면 15의 배수가 두 번 세어진다.",
      solutionSteps: ["3의 배수는 66개이다.", "5의 배수는 40개이다.", "15의 배수는 13개이다.", "66+40-13=93이다."],
      answer: "93개"
    },
    tags: ["또는", "겹침", "배수"]
  },
  {
    id: "shortest-path",
    title: "최단거리 경우의 수",
    subtitle: "격자 경로를 오른쪽·위쪽 이동으로 세기",
    curriculumLevel: "교육과정 확장",
    formula: "오른쪽 a번, 위쪽 b번 → C(a+b,a)",
    formulaNote: "최단거리에서는 필요한 이동 횟수가 고정된다.",
    when: "격자에서 최단거리로 이동하는 경로 수를 셀 때 사용한다.",
    signalWords: ["격자", "최단거리", "반드시 지나"],
    idea: "전체 이동 순서 중 한 방향의 위치를 고르면 경로가 정해진다.",
    warning: "반드시 지나는 점이 있으면 구간별 경우의 수를 구해 곱한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "상",
      problem: "A에서 오른쪽 5칸, 위쪽 4칸 떨어진 B까지 최단거리로 간다. A에서 오른쪽 2칸, 위쪽 1칸 떨어진 P를 반드시 지날 때 경로 수를 구하여라.",
      given: ["A→B: 오른쪽 5번, 위쪽 4번", "P를 반드시 지남", "A→P: 오른쪽 2번, 위쪽 1번"],
      strategy: "A에서 P까지와 P에서 B까지를 나누어 각각 구해 곱한다.",
      solutionSteps: ["A→P는 오른쪽 2번, 위쪽 1번이므로 C(3,1)=3이다.", "P→B는 오른쪽 3번, 위쪽 3번이므로 C(6,3)=20이다.", "전체는 3×20=60이다."],
      answer: "60가지"
    },
    tags: ["격자", "최단거리", "경로"]
  }
];
