import type { CountingFormula } from "./types";

export const coreCountingTools: CountingFormula[] = [
  {
    id: "sum-product",
    title: "합의 법칙과 곱의 법칙",
    subtitle: "경우의 수의 기본 뼈대",
    curriculumLevel: "교육과정",
    formula: "합: m+n / 곱: m×n",
    formulaNote: "겹치지 않는 선택지는 더하고, 이어지는 단계는 곱한다.",
    when: "선택지가 여러 갈래로 나뉘거나 여러 선택을 차례로 해야 할 때 사용한다.",
    signalWords: ["또는", "각각", "차례로"],
    idea: "서로 배타적인 갈래인지, 연속된 단계인지 먼저 해석한다.",
    warning: "두 갈래가 겹치면 단순히 더하지 말고 포함배제를 확인한다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "하",
      problem: "과학 부스 3개와 예술 부스 2개 중 하나를 체험한 뒤, 기념품 4종류 중 하나를 받는다. 가능한 선택 방법의 수를 구하여라.",
      given: ["부스는 3+2개", "기념품은 4종류"],
      strategy: "부스 선택은 합의 법칙, 기념품 선택은 곱의 법칙이다.",
      solutionSteps: ["선택 가능한 부스는 3+2=5개이다.", "각 부스마다 기념품은 4가지이다.", "따라서 5×4=20이다."],
      answer: "20가지"
    },
    tags: ["기본", "합의 법칙", "곱의 법칙"]
  },
  {
    id: "permutation",
    title: "순열",
    subtitle: "서로 다른 것 중 일부를 순서 있게 뽑기",
    curriculumLevel: "교육과정",
    formula: "ₙPᵣ = n!/(n-r)!",
    formulaNote: "n개 중 r개를 뽑아 순서 있게 배열한다.",
    when: "뽑힌 대상이 같아도 순서나 역할이 달라지면 다른 경우로 센다.",
    signalWords: ["회장과 부회장", "1등 2등", "순서대로"],
    idea: "첫 자리 n가지, 다음 자리 n-1가지처럼 선택지가 줄어든다.",
    warning: "역할이 없으면 순열이 아니라 조합이다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "하",
      problem: "서로 다른 8명 중 발표 순서 1번, 2번, 3번을 정하는 방법의 수를 구하여라.",
      given: ["학생 8명", "발표 순서 3자리"],
      strategy: "같은 3명이라도 순서가 바뀌면 다른 경우이다.",
      solutionSteps: ["1번 발표자는 8가지이다.", "2번은 7가지, 3번은 6가지이다.", "₈P₃=8×7×6=336이다."],
      answer: "336가지"
    },
    tags: ["순서", "직책", "배열"]
  },
  {
    id: "combination",
    title: "조합",
    subtitle: "서로 다른 것 중 일부를 순서 없이 뽑기",
    curriculumLevel: "교육과정",
    formula: "ₙCᵣ = n!/(r!(n-r)!)",
    formulaNote: "n개 중 r개를 순서 없이 선택한다.",
    when: "누가 선택되었는지만 중요하고 순서가 의미 없을 때 사용한다.",
    signalWords: ["대표", "위원", "뽑는다"],
    idea: "순열로 센 뒤 r!만큼 중복된 순서를 나눈다.",
    warning: "뽑은 뒤 자리를 배정하면 추가 계산이 필요하다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "하",
      problem: "12명의 학생 중 청소 당번 4명을 뽑는 방법의 수를 구하여라.",
      given: ["학생 12명", "당번 4명", "역할 구분 없음"],
      strategy: "당번 사이에 순서나 역할이 없으므로 조합이다.",
      solutionSteps: ["12명 중 4명을 순서 없이 고른다.", "₁₂C₄=12×11×10×9/(4×3×2×1)이다.", "계산하면 495이다."],
      answer: "495가지"
    },
    tags: ["선택", "대표", "순서 없음"]
  },
  {
    id: "repetition-product",
    title: "중복순열",
    subtitle: "반복을 허용하고 순서 있게 배열",
    curriculumLevel: "교육과정",
    formula: "nʳ",
    formulaNote: "n가지 선택을 r번 독립적으로 반복한다.",
    when: "각 자리마다 같은 선택지를 다시 사용할 수 있고 자리 순서가 의미 있을 때 사용한다.",
    signalWords: ["중복 가능", "코드", "각 자리"],
    idea: "각 자리마다 선택지가 줄어들지 않는다.",
    warning: "첫 자리에 0이 올 수 없는 자연수 문제는 첫 자리만 따로 센다.",
    problem: {
      sourceType: "기출형 자체 제작",
      difficulty: "중",
      problem: "0부터 9까지의 숫자로 5자리 출입 코드를 만든다. 같은 숫자를 여러 번 사용할 수 있을 때 가능한 코드 수를 구하여라.",
      given: ["숫자 10개", "5자리", "중복 사용 가능"],
      strategy: "각 자리에 10가지가 반복된다.",
      solutionSteps: ["각 자리는 10가지이다.", "자리는 5개이고 선택지는 줄어들지 않는다.", "10⁵=100000이다."],
      answer: "100000가지"
    },
    tags: ["반복", "자리", "코드"]
  }
];
