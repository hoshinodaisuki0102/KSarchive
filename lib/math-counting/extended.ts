import type { CountingFormula } from "./types";

export const extendedCountingTools: CountingFormula[] = [
  {
    id: "stars-bars",
    title: "별과 막대기",
    subtitle: "x₁+x₂+⋯+xₙ=r의 음이 아닌 정수해",
    curriculumLevel: "교육과정 확장",
    formula: "x₁+⋯+xₙ=r → C(n+r-1, n-1)",
    formulaNote: "r개의 같은 물건을 n개의 구분되는 칸에 0개 이상 나누어 넣는다.",
    when: "합이 정해져 있고 각 항이 0 이상의 정수일 때 사용한다.",
    signalWords: ["음이 아닌 정수", "분배", "합이 일정"],
    idea: "별 r개와 막대 n-1개를 배열하는 문제로 바꾼다.",
    warning: "각 항에 최소 조건이 있으면 먼저 최소값을 빼고 남은 양을 센다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "x+y+z=11을 만족하는 음이 아닌 정수해의 개수를 구하여라.",
      given: ["x+y+z=11", "x,y,z는 0 이상 정수"],
      strategy: "합 11을 세 변수에 0개 이상 나누는 별과 막대기 문제이다.",
      solutionSteps: ["별 11개를 세 칸으로 나눈다.", "막대 2개가 필요하다.", "총 13자리 중 막대 2자리 선택이므로 C(13,2)=78이다."],
      answer: "78개"
    },
    tags: ["정수해", "분배", "음이 아닌 정수"]
  },
  {
    id: "positive-stars-bars",
    title: "양의 정수해",
    subtitle: "각 항이 최소 1 이상일 때",
    curriculumLevel: "교육과정 확장",
    formula: "x₁+⋯+xₙ=r, xᵢ≥1 → C(r-1, n-1)",
    formulaNote: "각 변수에 1씩 먼저 배정한 뒤 남은 양을 나눈다.",
    when: "모든 변수에 최소 1개씩 배분해야 할 때 사용한다.",
    signalWords: ["양의 정수", "적어도", "빠짐없이"],
    idea: "xᵢ'=xᵢ-1로 치환해 음이 아닌 정수해 문제로 바꾼다.",
    warning: "최소가 2 이상이면 그 최소값만큼 먼저 빼야 한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "서로 다른 세 상자에 같은 공 12개를 나누어 넣는다. 각 상자에 적어도 2개씩 넣는 방법의 수를 구하여라.",
      given: ["공 12개", "상자 3개", "각 상자 최소 2개"],
      strategy: "각 상자에 먼저 2개씩 넣고 남은 공을 자유롭게 분배한다.",
      solutionSteps: ["먼저 2개씩 넣으면 6개가 사용된다.", "남은 공은 6개이다.", "6개를 세 상자에 나누는 방법은 C(8,2)=28이다."],
      answer: "28가지"
    },
    tags: ["양의 정수", "최소 조건", "분배"]
  },
  {
    id: "not-adjacent-line",
    title: "이웃하지 않게 고르기",
    subtitle: "일렬로 놓인 n자리에서 r개 선택",
    curriculumLevel: "교육과정 확장",
    formula: "일렬: C(n-r+1, r)",
    formulaNote: "n자리 중 r개를 고르되 서로 붙지 않게 고른다.",
    when: "선택한 대상끼리 서로 붙어 있으면 안 되는 경우에 사용한다.",
    signalWords: ["이웃하지 않게", "연속하지 않게", "붙지 않게"],
    idea: "선택된 r개 사이에 최소 한 칸씩 빈칸을 넣어 압축한다.",
    warning: "원형 배치에서는 맨 앞과 맨 뒤도 이웃하므로 따로 처리한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "일렬로 놓인 10개의 좌석 중 서로 이웃하지 않게 4개의 좌석을 고르는 방법의 수를 구하여라.",
      given: ["좌석 10개", "선택 좌석 4개", "서로 이웃하지 않음"],
      strategy: "일렬 n자리에서 인접하지 않게 r개를 고르는 공식 C(n-r+1,r)을 사용한다.",
      solutionSteps: ["n=10, r=4이다.", "C(10-4+1,4)=C(7,4)이다.", "C(7,4)=35이다."],
      answer: "35가지"
    },
    tags: ["이웃하지 않게", "좌석", "간격"]
  }
];
