import type { CountingFormula } from "./types";

export const advancedCountingTools: CountingFormula[] = [
  {
    id: "hockey-stick",
    title: "하키스틱 정리",
    subtitle: "파스칼 삼각형의 대각선 합",
    curriculumLevel: "심화(교육과정 외)",
    formula: "C(r,r)+C(r+1,r)+⋯+C(n,r)=C(n+1,r+1)",
    formulaNote: "조합의 대각선 합을 하나의 조합으로 정리한다.",
    when: "가장 큰 원소가 무엇인지에 따라 조합의 합이 이어질 때 사용한다.",
    signalWords: ["가장 큰 수", "대각선 합", "파스칼"],
    idea: "r+1개를 고르는 경우를 가장 큰 원소 기준으로 나누어 센다.",
    warning: "공식 자체는 교육과정 밖 성격이 강하므로 심화 도구로 분류한다.",
    problem: {
      sourceType: "심화형 자체 제작",
      difficulty: "상",
      problem: "1부터 10까지의 자연수 중 서로 다른 4개를 고른다. 가장 큰 수가 4,5,…,10인 경우로 나누어 전체 경우의 수를 구하여라.",
      given: ["1~10 중 4개 선택", "가장 큰 수 기준 분류"],
      strategy: "가장 큰 수가 k이면 나머지 3개는 1부터 k-1까지 중에서 고른다.",
      solutionSteps: ["가장 큰 수가 k일 때 경우의 수는 C(k-1,3)이다.", "전체는 C(3,3)+C(4,3)+⋯+C(9,3)이다.", "하키스틱 정리로 C(10,4)=210이다."],
      answer: "210가지"
    },
    tags: ["파스칼", "대각선 합", "심화"]
  },
  {
    id: "catalan",
    title: "카탈란 수",
    subtitle: "겹치지 않는 괄호, 경로, 스택 구조",
    curriculumLevel: "심화(교육과정 외)",
    formula: "Cₙ = 1/(n+1) × C(2n,n)",
    formulaNote: "올바른 괄호 배열, 대각선을 넘지 않는 경로에서 등장한다.",
    when: "열고 닫는 구조가 중간에 무너지면 안 되는 문제에서 사용한다.",
    signalWords: ["올바른 괄호", "대각선을 넘지 않음", "스택"],
    idea: "전체 배열에서 조건을 어기는 배열을 제외하는 구조이다.",
    warning: "카탈란 수 공식은 교육과정 외이므로 심화 분류로 둔다.",
    problem: {
      sourceType: "심화형 자체 제작",
      difficulty: "상",
      problem: "괄호 4쌍을 사용하여 올바른 괄호 문자열을 만드는 방법의 수를 구하여라.",
      given: ["괄호 4쌍", "어느 지점에서도 닫는 괄호가 더 많으면 안 됨"],
      strategy: "올바른 괄호 문자열의 수는 카탈란 수 Cₙ으로 구한다.",
      solutionSteps: ["괄호 쌍의 수는 n=4이다.", "C₄=1/(4+1)×C(8,4)이다.", "C(8,4)=70이므로 C₄=14이다."],
      answer: "14가지"
    },
    tags: ["괄호", "경로", "심화"]
  },
  {
    id: "stirling2",
    title: "제2종 스털링 수",
    subtitle: "서로 다른 n개를 비어 있지 않은 k개 그룹으로 나누기",
    curriculumLevel: "심화(교육과정 외)",
    formula: "S(n,k), 특히 S(n,2)=2ⁿ⁻¹-1",
    formulaNote: "이름 없는 비어 있지 않은 그룹으로 나누는 수이다.",
    when: "서로 다른 사람이나 물건을 이름 없는 여러 그룹으로 나눌 때 사용한다.",
    signalWords: ["그룹으로 나누기", "조 이름 없음", "비어 있지 않게"],
    idea: "그룹의 이름이 없으면 A조/B조를 바꾼 경우는 같은 분할이다.",
    warning: "조 이름이 있으면 결과가 달라진다. 이름 있는 조와 이름 없는 조를 구분한다.",
    problem: {
      sourceType: "심화형 자체 제작",
      difficulty: "상",
      problem: "서로 다른 6명의 학생을 두 개의 비어 있지 않은 이름 없는 조로 나누는 방법의 수를 구하여라.",
      given: ["학생 6명", "두 조", "조 이름 없음", "각 조는 비어 있지 않음"],
      strategy: "먼저 이름 있는 두 조로 나누고, 두 조의 이름을 바꾼 중복을 나눈다.",
      solutionSteps: ["이름 있는 두 조로 나누면 2⁶가지이다.", "한 조가 비는 2가지를 빼면 62가지이다.", "조 이름이 없으므로 2로 나누어 31가지이다."],
      answer: "31가지"
    },
    tags: ["분할", "그룹", "심화"]
  }
];
