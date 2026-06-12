import type { CountingFormula } from "./types";

export const extraCoreCountingTools: CountingFormula[] = [
  {
    id: "repetition-combination",
    title: "중복조합",
    subtitle: "같은 것을 여러 번 골라도 되는 선택",
    curriculumLevel: "교육과정",
    formula: "ₙHᵣ = C(n+r-1, r)",
    formulaNote: "n가지 종류 중 r개를 중복 허용하여 순서 없이 고른다.",
    when: "종류별 개수만 중요하고 같은 종류를 여러 번 골라도 될 때 사용한다.",
    signalWords: ["종류", "같은 것 여러 개", "몇 개씩"],
    idea: "종류별 개수를 변수로 두면 음이 아닌 정수해 문제가 된다.",
    warning: "고르는 순서가 결과를 바꾸면 중복순열이다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "빵 4종류 중에서 7개를 고른다. 같은 종류를 여러 개 골라도 될 때 방법의 수를 구하여라.",
      given: ["빵 4종류", "총 7개", "중복 선택 가능"],
      strategy: "각 종류를 몇 개씩 고르는지만 정하면 된다.",
      solutionSteps: ["각 빵의 개수를 x₁,x₂,x₃,x₄라고 둔다.", "x₁+x₂+x₃+x₄=7의 음이 아닌 정수해를 센다.", "₄H₇=C(10,7)=120이다."],
      answer: "120가지"
    },
    tags: ["중복", "별과 막대기", "분배"]
  },
  {
    id: "same-objects",
    title: "같은 것이 있는 순열",
    subtitle: "중복된 물건의 자리 바꿈은 같은 배열",
    curriculumLevel: "교육과정",
    formula: "n!/(a!b!c!⋯)",
    formulaNote: "같은 것끼리 바뀐 중복 배열을 나누어 제거한다.",
    when: "같은 문자나 같은 물건이 여러 개 섞여 있을 때 사용한다.",
    signalWords: ["같은 글자", "중복된 문자", "서로 같은 물건"],
    idea: "모두 다르다고 배열한 뒤 같은 것끼리의 자리 바꿈을 나눈다.",
    warning: "각 문자가 몇 번 반복되는지 정확히 세어야 한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "A, A, A, B, B, C의 6개 문자를 일렬로 배열하는 방법의 수를 구하여라.",
      given: ["A 3개", "B 2개", "C 1개"],
      strategy: "같은 문자가 있으므로 같은 것이 있는 순열을 사용한다.",
      solutionSteps: ["모두 다르면 6!가지이다.", "A 3개와 B 2개의 내부 순서는 같은 배열이다.", "6!/(3!2!)=60이다."],
      answer: "60가지"
    },
    tags: ["중복 문자", "배열", "나누기"]
  },
  {
    id: "complement",
    title: "여사건으로 세기",
    subtitle: "직접 세기 어려우면 전체에서 반대를 빼기",
    curriculumLevel: "교육과정",
    formula: "원하는 경우 = 전체 경우 - 원하지 않는 경우",
    formulaNote: "반대 조건이 더 간단할 때 전체에서 뺀다.",
    when: "적어도 하나, 한 번 이상, 모두는 아님 같은 조건에서 자주 사용한다.",
    signalWords: ["적어도", "한 번 이상", "모두는 아님"],
    idea: "원래 조건의 정확한 반대를 잡고 전체 경우에서 뺀다.",
    warning: "여사건은 논리적으로 정확한 반대여야 한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "서로 다른 5개의 문제에 각각 O 또는 X로 답한다. 적어도 한 문제에는 O로 답하는 경우의 수를 구하여라.",
      given: ["문제 5개", "각 문제 O/X", "적어도 한 문제 O"],
      strategy: "반대는 모든 문제에 X로 답하는 경우이다.",
      solutionSteps: ["전체 답안은 2⁵=32가지이다.", "O가 하나도 없는 경우는 1가지이다.", "32-1=31이다."],
      answer: "31가지"
    },
    tags: ["적어도", "반대", "전체에서 빼기"]
  }
];
