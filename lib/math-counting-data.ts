export type CountingFormula = {
  id: string;
  title: string;
  subtitle: string;
  formula: string;
  when: string;
  idea: string;
  example: string;
  solution: string;
  tags: string[];
};

export const countingFormulas: CountingFormula[] = [
  {
    id: "sum-product",
    title: "합의 법칙과 곱의 법칙",
    subtitle: "경우의 수의 가장 기본 뼈대",
    formula: "합: A 또는 B → m+n, 곱: A 후 B → m×n",
    when: "선택지가 서로 겹치지 않는 경우에는 합, 여러 단계를 연속으로 수행하면 곱을 사용합니다.",
    idea: "문제에서 '또는'인지 '그리고/다음에'인지 먼저 구분합니다.",
    example: "상의 3벌, 하의 4벌 중 하나씩 골라 입는 방법은?",
    solution: "상의 선택 3가지 뒤에 하의 선택 4가지가 이어지므로 3×4=12가지입니다.",
    tags: ["기본", "곱의 법칙"]
  },
  {
    id: "permutation",
    title: "순열",
    subtitle: "서로 다른 것 중 일부를 순서 있게 뽑기",
    formula: "nPr = n!/(n-r)!",
    when: "뽑는 순서가 결과를 바꾸면 순열입니다.",
    idea: "첫 자리 n가지, 둘째 자리 n-1가지처럼 줄어드는 곱입니다.",
    example: "서로 다른 7명 중 회장, 부회장, 총무를 뽑는 방법은?",
    solution: "직책이 다르므로 순서가 중요합니다. 7P3=7×6×5=210가지입니다.",
    tags: ["순서", "직책"]
  },
  {
    id: "combination",
    title: "조합",
    subtitle: "서로 다른 것 중 일부를 순서 없이 뽑기",
    formula: "nCr = n!/(r!(n-r)!)",
    when: "누가 뽑혔는지만 중요하고 순서가 의미 없으면 조합입니다.",
    idea: "순열로 세고, 뽑힌 r개끼리의 순서 r!만큼을 나눕니다.",
    example: "10명 중 대표 3명을 뽑는 방법은?",
    solution: "순서가 없으므로 10C3=120가지입니다.",
    tags: ["선택", "대표"]
  },
  {
    id: "repetition-product",
    title: "중복순열",
    subtitle: "반복을 허용하고 순서 있게 배열",
    formula: "n^r",
    when: "각 자리마다 같은 선택지를 다시 고를 수 있을 때 사용합니다.",
    idea: "매 자리마다 n가지 선택이 독립적으로 반복됩니다.",
    example: "0~9 숫자로 네 자리 비밀번호를 만들 때 가능한 경우의 수는?",
    solution: "각 자리에 10가지가 가능하므로 10^4=10000가지입니다.",
    tags: ["반복", "비밀번호"]
  },
  {
    id: "repetition-combination",
    title: "중복조합",
    subtitle: "같은 것을 여러 번 골라도 되는 선택",
    formula: "nHr = n+r-1Cr",
    when: "종류 n개 중 r개를 고르되 같은 종류를 여러 번 골라도 될 때 사용합니다.",
    idea: "별과 막대기 구조로 바꿉니다. r개의 별과 n-1개의 막대를 배열합니다.",
    example: "사탕 4종류 중 6개를 고르는 방법은?",
    solution: "4H6=4+6-1C6=9C6=84가지입니다.",
    tags: ["별과 막대기", "중복"]
  },
  {
    id: "stars-bars",
    title: "별과 막대기",
    subtitle: "x1+x2+...+xn=r의 음이 아닌 정수해",
    formula: "x1+...+xn=r → n+r-1C n-1",
    when: "합이 정해져 있고 각 항이 0 이상 정수일 때 사용합니다.",
    idea: "r개의 별 사이에 n-1개의 막대를 끼워 n칸으로 나눕니다.",
    example: "x+y+z=8을 만족하는 음이 아닌 정수해의 개수는?",
    solution: "변수가 3개, 합이 8이므로 3+8-1C2=10C2=45개입니다.",
    tags: ["정수해", "분배"]
  },
  {
    id: "positive-stars-bars",
    title: "양의 정수해",
    subtitle: "각 항이 최소 1 이상일 때",
    formula: "x1+...+xn=r, xi≥1 → r-1C n-1",
    when: "모든 변수에 최소 1개씩 배분해야 할 때 사용합니다.",
    idea: "먼저 각 변수에 1씩 주고 남은 것을 별과 막대기로 분배합니다.",
    example: "x+y+z=10을 만족하는 양의 정수해의 개수는?",
    solution: "각 변수에 1씩 주면 남은 합은 7. 또는 공식으로 10-1C2=9C2=36개입니다.",
    tags: ["정수해", "최소 1"]
  },
  {
    id: "not-adjacent-line",
    title: "이웃하지 않게 고르기",
    subtitle: "일렬로 놓인 n자리에서 r개 선택",
    formula: "n-r+1Cr",
    when: "선택한 것들이 서로 붙어 있으면 안 되는 경우에 사용합니다.",
    idea: "r개 사이에 최소 한 칸씩 빈칸을 끼워 넣고 압축해서 생각합니다.",
    example: "8개의 의자 중 서로 이웃하지 않게 3개를 고르는 방법은?",
    solution: "공식 n-r+1Cr을 쓰면 8-3+1C3=6C3=20가지입니다.",
    tags: ["이웃하지 않게", "좌석"]
  },
  {
    id: "circle-permutation",
    title: "원순열",
    subtitle: "원을 돌려 같아지는 배열은 하나로 보기",
    formula: "서로 다른 n개 원형 배열: (n-1)!",
    when: "원탁, 목걸이처럼 회전이 같은 배열로 취급될 때 사용합니다.",
    idea: "한 명 또는 한 물건을 고정하고 나머지를 일렬로 배열합니다.",
    example: "서로 다른 6명이 원탁에 앉는 방법은?",
    solution: "한 명을 고정하고 나머지 5명을 배열하므로 5!=120가지입니다.",
    tags: ["원탁", "회전"]
  },
  {
    id: "necklace",
    title: "목걸이 배열",
    subtitle: "회전뿐 아니라 뒤집기도 같게 보는 경우",
    formula: "서로 다른 n개 목걸이: (n-1)!/2, n≥3",
    when: "목걸이처럼 뒤집었을 때도 같은 배열이면 사용합니다.",
    idea: "원순열에서 시계방향과 반시계방향이 같은 경우를 다시 2로 나눕니다.",
    example: "서로 다른 5개의 구슬로 목걸이를 만드는 방법은?",
    solution: "(5-1)!/2=24/2=12가지입니다.",
    tags: ["목걸이", "대칭"]
  },
  {
    id: "same-objects",
    title: "같은 것이 있는 순열",
    subtitle: "중복된 물건의 자리 바꿈은 같은 배열",
    formula: "n!/(a!b!c!...) ",
    when: "A,A,B,B,C처럼 같은 것이 여러 개 섞여 있을 때 사용합니다.",
    idea: "모두 다르다고 보고 배열한 뒤, 같은 것끼리 바뀐 경우를 나눕니다.",
    example: "BANANA의 여섯 글자를 배열하는 방법은?",
    solution: "A 3개, N 2개가 같으므로 6!/(3!2!)=60가지입니다.",
    tags: ["중복 문자", "배열"]
  },
  {
    id: "inclusion-exclusion",
    title: "포함배제 원리",
    subtitle: "겹쳐 세어진 부분을 빼고 다시 더하기",
    formula: "|A∪B|=|A|+|B|-|A∩B|",
    when: "조건 A 또는 조건 B를 만족하는 경우를 셀 때 겹침이 있으면 사용합니다.",
    idea: "A와 B를 더하면 교집합이 두 번 세어지므로 한 번 빼 줍니다.",
    example: "1부터 100까지 중 2 또는 3의 배수는 몇 개인가?",
    solution: "2의 배수 50개, 3의 배수 33개, 6의 배수 16개이므로 50+33-16=67개입니다.",
    tags: ["또는", "겹침"]
  },
  {
    id: "complement",
    title: "여사건으로 세기",
    subtitle: "직접 세기 어려우면 전체에서 반대를 빼기",
    formula: "원하는 경우 = 전체 경우 - 원하지 않는 경우",
    when: "적어도 하나, 모두는 아님 같은 표현이 나오면 자주 사용합니다.",
    idea: "조건을 만족하지 않는 경우가 더 간단하면 여사건을 셉니다.",
    example: "동전 5개를 던져 적어도 한 번 앞면이 나오는 경우는?",
    solution: "전체 2^5=32가지. 앞면이 한 번도 안 나오는 경우 1가지를 빼서 31가지입니다.",
    tags: ["적어도", "여사건"]
  },
  {
    id: "pigeonhole",
    title: "비둘기집 원리",
    subtitle: "많은 물건을 적은 상자에 넣으면 겹침이 생김",
    formula: "n개 물건을 k개 상자에 넣으면 어떤 상자에는 최소 ceil(n/k)개",
    when: "반드시 같은 성질을 가진 것이 존재함을 보일 때 사용합니다.",
    idea: "가능한 한 고르게 넣어도 넘치는지를 봅니다.",
    example: "13명 중 생일 달이 같은 사람이 반드시 있는가?",
    solution: "월은 12개뿐입니다. 13명을 12개월에 넣으면 어떤 달에는 최소 2명이 있습니다.",
    tags: ["존재성", "반드시"]
  },
  {
    id: "pascal",
    title: "파스칼 항등식",
    subtitle: "조합을 한 원소 포함/미포함으로 나누기",
    formula: "nCr = n-1Cr + n-1C r-1",
    when: "특정 원소를 포함하는 경우와 포함하지 않는 경우로 나눌 때 사용합니다.",
    idea: "한 원소 A를 기준으로 A를 안 뽑는 경우와 뽑는 경우를 더합니다.",
    example: "7C3을 파스칼 항등식으로 나누면?",
    solution: "특정 원소를 기준으로 안 뽑으면 6C3, 뽑으면 나머지 2명을 6명 중 고르므로 6C2. 따라서 7C3=6C3+6C2입니다.",
    tags: ["조합 항등식", "분류"]
  },
  {
    id: "hockey-stick",
    title: "하키스틱 정리",
    subtitle: "파스칼 삼각형의 대각선 합",
    formula: "rCr + r+1Cr + ... + nCr = n+1C r+1",
    when: "가장 큰 원소가 무엇인지에 따라 경우를 나눌 때 자주 나옵니다.",
    idea: "선택된 r+1개 중 가장 큰 수를 고정해서 세면 대각선 합이 됩니다.",
    example: "1C1+2C1+3C1+4C1+5C1의 값은?",
    solution: "하키스틱 정리로 6C2=15입니다.",
    tags: ["파스칼", "대각선 합"]
  },
  {
    id: "catalan",
    title: "카탈란 수",
    subtitle: "겹치지 않는 괄호, 경로, 스택 구조",
    formula: "C_n = 1/(n+1) × 2nCn",
    when: "올바른 괄호 배열, 대각선을 넘지 않는 경로, 산 모양 경로에서 등장합니다.",
    idea: "전체 경로 중 조건을 어기는 경로를 반사시켜 빼는 구조입니다.",
    example: "괄호 3쌍으로 올바른 괄호 문자열을 만드는 방법은?",
    solution: "C_3=1/4×6C3=5가지입니다.",
    tags: ["괄호", "심화"]
  },
  {
    id: "stirling2",
    title: "제2종 스털링 수",
    subtitle: "서로 다른 n개를 비어 있지 않은 k개 그룹으로 나누기",
    formula: "S(n,k), 예: S(n,2)=2^(n-1)-1",
    when: "사람 n명을 순서 없는 k개의 비어 있지 않은 조로 나눌 때 사용합니다.",
    idea: "그룹의 이름이 없다는 점이 중요합니다. 조1, 조2가 구별되면 k!를 곱합니다.",
    example: "서로 다른 5명을 두 개의 비어 있지 않은 조로 나누는 방법은?",
    solution: "S(5,2)=2^(5-1)-1=15가지입니다.",
    tags: ["분할", "심화"]
  }
];
