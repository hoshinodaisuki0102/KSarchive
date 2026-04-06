export type MockInlineDetail = {
  id: number;
  overview: string[];
  vocab: { term: string; meaning: string }[];
  lines: { text: string; note: string; grammar?: string }[];
  points: string[];
};

export const englishMockInlineDetails: MockInlineDetail[] = [
  {
    id: 18,
    overview: ["이메일 형식 안내문", "핵심 목적: 전시 배치 위치 안내"],
    vocab: [
      { term: "participate in", meaning: "~에 참여하다" },
      { term: "look forward to", meaning: "~을 기대하다" },
      { term: "assigned", meaning: "지정된" },
      { term: "in advance", meaning: "미리" }
    ],
    lines: [
      { text: "Thank you for participating in our Crafts Art Fair.", note: "참여에 대한 감사로 시작하는 전형적 이메일 도입부다.", grammar: "participate in + 명사" },
      { text: "Since we’ve chosen you as one of the ‘Artists of This Year’, we are looking forward to introducing your unique handmade baskets to our community.", note: "선정 사실을 알리며 호의적 분위기를 만든다. 본론으로 들어가기 전 수신자의 가치를 높여 준다.", grammar: "look forward to + 명사/동명사" },
      { text: "As part of organizing the exhibition plan, we are happy to inform you that your artworks will be exhibited at the assigned table, number seven.", note: "문제의 핵심 문장이다. 작품이 7번 테이블에 전시된다는 사실을 직접 전달한다.", grammar: "inform A that S+V / will be exhibited 수동태" },
      { text: "Visitors can easily find your artworks located near the entrance.", note: "입구 근처라는 부가 정보로 위치 안내를 보완한다.", grammar: "located near the entrance = artworks를 수식하는 분사구" },
      { text: "If you have any special requirements or need further assistance, feel free to contact us in advance.", note: "마무리 문장. 추가 문의 가능성을 열어 두지만 글의 주목적은 여전히 위치 안내이다.", grammar: "feel free to V / in advance" }
    ],
    points: ["assigned table, number seven이 정답 근거", "작가 소개나 모집이 아니라 이미 참가한 사람에게 보내는 안내 메일"]
  },
  {
    id: 19,
    overview: ["서술자의 심경 변화", "두려움 → 안도"],
    vocab: [
      { term: "damp", meaning: "축축한" },
      { term: "make out", meaning: "가려진 것을 겨우 알아보다" },
      { term: "beam", meaning: "빛줄기" },
      { term: "at ease", meaning: "편안한" }
    ],
    lines: [
      { text: "The shed is cold and damp, the air thick with the smell of old wood and earth.", note: "차갑고 눅눅한 배경 묘사로 불안한 분위기를 조성한다." },
      { text: "It’s dark, and I can’t make out what’s moving in the shadows.", note: "무엇인지 알아볼 수 없다는 점이 공포를 키운다.", grammar: "make out = 알아보다" },
      { text: "‘Who’s there?’ I ask, my voice shaking with fear.", note: "직접적으로 fear가 제시되어 초반 감정이 분명해진다.", grammar: "분사구문: my voice shaking with fear" },
      { text: "The shadow moves closer, and my heart is beating fast …", note: "공포가 최고조로 올라가는 지점이다." },
      { text: "A rabbit. A laugh escapes my lips …", note: "정체가 토끼로 밝혀지며 긴장이 즉시 풀린다." },
      { text: "I start to feel at ease.", note: "마지막 문장이 안도감을 확정한다.", grammar: "at ease = 편안한" }
    ],
    points: ["fear, shaking, beating fast → frightened", "laugh, feel much better, at ease → relieved"]
  },
  {
    id: 20,
    overview: ["필자의 주장 문제", "몸짓은 말을 보완해야 하며 과하면 안 됨"],
    vocab: [
      { term: "complement", meaning: "보완하다" },
      { term: "open-handed", meaning: "손바닥을 보이는" },
      { term: "over-gesturing", meaning: "과도한 몸짓" },
      { term: "overshadow", meaning: "가리다" }
    ],
    lines: [
      { text: "Improving your gestural communication involves more than just knowing when to nod or shake hands.", note: "몸짓 활용은 단순한 동작 시점 파악을 넘는다고 주장한다.", grammar: "동명사 주어 Improving ... / involve" },
      { text: "It’s about using gestures to complement your spoken messages, adding layers of meaning to your words.", note: "몸짓의 본래 기능을 ‘말의 보완’으로 정의한다.", grammar: "adding ... = 분사구문" },
      { text: "Open-handed gestures … can indicate honesty, creating an atmosphere of trust.", note: "적절한 몸짓의 긍정적 예시를 든다.", grammar: "creating ... = 결과를 덧붙이는 분사구문" },
      { text: "But be careful of the trap of over-gesturing.", note: "역접으로 주장을 전환하며 핵심 경고를 제시한다." },
      { text: "Too many hand movements can distract from your message …", note: "과한 몸짓의 부작용을 직접 설명한다." },
      { text: "Balance is key. Your gestures should highlight your words, not overshadow them.", note: "마지막 결론. 정답의 핵심 문장이다." }
    ],
    points: ["보디랭귀지 자체를 부정하지 않는다", "핵심은 balance와 complement"]
  },
  {
    id: 21,
    overview: ["함축 의미 문제", "치료 목적 유전자 편집이 인간 향상으로 미끄러질 수 있다는 경고"],
    vocab: [
      { term: "mutation", meaning: "돌연변이" },
      { term: "embryo", meaning: "배아" },
      { term: "slippery slope", meaning: "한 번 시작하면 걷잡을 수 없는 위험한 경사" },
      { term: "pursuit", meaning: "추구" }
    ],
    lines: [
      { text: "Assuming gene editing in humans proves to be safe and effective …", note: "논의의 출발점은 ‘안전하고 효과적이라면’이라는 가정이다." },
      { text: "… it might seem logical … to correct disease-causing mutations …", note: "질병 예방 목적 유전자 편집은 겉보기엔 합리적으로 보인다고 인정한다." },
      { text: "Yet once it becomes possible … there will certainly be temptations to upgrade normal genes …", note: "하지만 곧바로 치료 목적에서 능력 향상 목적로 넘어갈 유혹을 경고한다." },
      { text: "What about giving unborn children beneficial features … or changing physical characteristics …?", note: "문제의 핵심은 인간 향상(human enhancement)까지 확대될 수 있다는 점이다." },
      { text: "… if we start down this slippery slope, we may not like where we end up.", note: "필자의 결론. 처음에는 작아 보이는 허용이 나중엔 통제 불가능한 결과로 이어질 수 있다." }
    ],
    points: ["정답은 ‘유전자 편집의 위험을 더 고려해야 한다’에 가깝다", "slippery slope 표현을 반드시 기억"]
  },
  {
    id: 22,
    overview: ["요지 문제", "과학은 불확실성을 줄여 가는 과정"],
    vocab: [
      { term: "certainty", meaning: "확실성" },
      { term: "inference", meaning: "추론" },
      { term: "uncertainty", meaning: "불확실성" },
      { term: "work in progress", meaning: "여전히 진행 중인 일" }
    ],
    lines: [
      { text: "The science we learn in grade school is a collection of certainties …", note: "학교 과학은 확정된 사실의 모음처럼 보인다고 말한다." },
      { text: "Only when you start to learn the practice of science do you realize …", note: "실제 과학을 배우기 시작할 때 그 사실들이 어렵게 얻어진 결과임을 깨닫는다.", grammar: "Only when ... 도치" },
      { text: "The process of science is less about collecting pieces of knowledge than it is about reducing the uncertainties …", note: "정답 근거 문장. 요지 그 자체다.", grammar: "less about A than B" },
      { text: "… our understanding of the turbulent fluid flow remains a work in progress …", note: "과학은 여전히 미완의 영역을 포함한다는 예시다." }
    ],
    points: ["지식 축적보다 uncertainty reduction", "사과 낙하 vs 난류 유동의 대비"]
  },
  {
    id: 23,
    overview: ["주제 문제", "동기 부여에서 관계성의 중요성"],
    vocab: [
      { term: "relatedness", meaning: "관계성" },
      { term: "autonomy", meaning: "자율성" },
      { term: "internalization", meaning: "내면화" },
      { term: "persistence", meaning: "지속성" }
    ],
    lines: [
      { text: "… when parents, teachers, supervisors, and coaches are perceived as involved and caring, people feel happier and more motivated.", note: "관심과 배려를 받는 환경이 동기를 높인다는 첫 주장이다." },
      { text: "… we need to feel valued and respected by peers and coworkers.", note: "권력을 가진 사람뿐 아니라 또래·동료와의 관계도 중요하다고 확장한다." },
      { text: "Thus, when the need for relatedness is met, motivation and internalization are fueled …", note: "관계성이 동기의 핵심 조건임을 정리한다." },
      { text: "… a caring relationship is a crucial basis from which to begin.", note: "타인을 동기 부여할 때 출발점은 배려하는 관계라고 못 박는다." },
      { text: "So exercise with a friend, call someone … and be there as a support …", note: "마지막 실천 예시들이 모두 ‘connectedness’로 귀결된다." }
    ],
    points: ["relatedness, connectedness 반복", "정답은 관계 기반 동기 부여"]
  },
  {
    id: 24,
    overview: ["제목 문제", "소리 내어 읽기의 뇌 활성화 + 말하기 능력 향상"],
    vocab: [
      { term: "aloud", meaning: "소리 내어" },
      { term: "pronunciation", meaning: "발음" },
      { term: "connective structures", meaning: "결합 구조" },
      { term: "stimulation", meaning: "자극" }
    ],
    lines: [
      { text: "… reading aloud lights up many areas of the brain.", note: "첫 문장부터 뇌 활성화가 핵심 소재로 제시된다." },
      { text: "There is intense activity in areas associated with pronunciation and hearing …", note: "발음과 청각 관련 영역의 활성화가 brainpower 향상으로 이어진다." },
      { text: "This leads to an overall improvement in concentration.", note: "집중력 향상 효과를 한 번 더 덧붙인다." },
      { text: "Reading aloud is also a good way to develop your public speaking skills …", note: "두 번째 축은 speaking skills 향상이다." },
      { text: "Children, in particular, should be encouraged to read aloud …", note: "어린이에게 특히 유익하다는 결론으로 마무리한다." }
    ],
    points: ["정답 제목은 brainpower와 speaking skills를 모두 포함해야 함"]
  },
  {
    id: 26,
    overview: ["내용 일치 문제", "Robert E. Lucas, Jr. 소개문"],
    vocab: [
      { term: "doctoral degree", meaning: "박사 학위" },
      { term: "influential", meaning: "영향력 있는" },
      { term: "be known as", meaning: "~로 알려져 있다" }
    ],
    lines: [
      { text: "During World War II, his family moved to Seattle …", note: "전쟁 중 시애틀 이주 사실은 일치한다." },
      { text: "After taking economic history courses … he developed an interest in economics.", note: "경제사 수강 후 경제학에 관심을 갖게 된 것도 일치한다." },
      { text: "He earned a doctoral degree in economics from the University of Chicago in 1964.", note: "시카고대 경제학 박사도 일치한다." },
      { text: "He taught at Carnegie Mellon University from 1963 to 1974 before returning to the University of Chicago …", note: "불일치 포인트. 1963~1974 재직지는 시카고대가 아니라 Carnegie Mellon이다." }
    ],
    points: ["시기 + 장소를 함께 확인", "Chicago 복귀는 1974년 이후"]
  },
  {
    id: 29,
    overview: ["어법 문제", "what → that/which로 고쳐야 함"],
    vocab: [
      { term: "enable A to V", meaning: "A가 ~하게 하다" },
      { term: "fine-tune", meaning: "미세 조정하다" },
      { term: "component", meaning: "구성 요소" }
    ],
    lines: [
      { text: "Routines enable athletes to evaluate competition conditions.", note: "루틴의 기능을 일반적으로 제시하는 문장이다.", grammar: "enable + 목적어 + to부정사" },
      { text: "… bouncing a ball … supplies the server with information …", note: "예시를 통해 루틴이 평가 자료를 제공함을 설명한다.", grammar: "supply A with B" },
      { text: "Routines also enable athletes to adjust and fine-tune …", note: "평가 뒤 조정 기능까지 연결한다." },
      { text: "… internal influences what can affect performance.", note: "선행사 influences를 꾸며야 하므로 what은 부적절하다.", grammar: "정답: influences that/which can affect performance" }
    ],
    points: ["what은 선행사를 포함하므로 여기서는 사용 불가", "주격 관계대명사가 와야 자연스럽다"]
  },
  {
    id: 30,
    overview: ["어휘 문제", "uninterested가 아니라 interested/potential에 가까운 표현이 와야 함"],
    vocab: [
      { term: "deal with", meaning: "~을 다루다" },
      { term: "fool A into -ing", meaning: "A를 속여 ~하게 하다" },
      { term: "appreciate", meaning: "가치를 인정하다" },
      { term: "potential consumer", meaning: "잠재적 소비자" }
    ],
    lines: [
      { text: "Promotion deals with consumer psychology.", note: "프로모션은 소비자 심리를 다루는 일이라고 정의한다." },
      { text: "Gone are the days when promotions were done in order to fool the consumer …", note: "과거의 기만적 마케팅 방식을 비판한다." },
      { text: "Instead, marketers now know that their goal is to identify the consumers who are most likely to appreciate a good or service …", note: "현대 마케팅의 목표는 ‘가치를 알아볼 소비자’를 찾는 것이라고 밝힌다." },
      { text: "Therefore, marketers must know where the potential uninterested consumers are …", note: "문맥상 알아봐야 할 대상은 관심 없는 사람이 아니라 잠재적 관심 소비자이므로 uninterested가 부적절하다." }
    ],
    points: ["현대 마케팅은 정직한 정보 제공", "타깃은 uninterested가 아니라 likely to appreciate the product"]
  }
];
