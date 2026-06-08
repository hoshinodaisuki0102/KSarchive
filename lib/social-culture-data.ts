export type CultureZoneId =
  | "east-asia"
  | "southeast-asia"
  | "south-asia"
  | "dry"
  | "africa"
  | "europe"
  | "anglo-america"
  | "latin-america"
  | "polar"
  | "oceania";

export type CultureZone = {
  id: CultureZoneId;
  name: string;
  label: string;
  color: string;
  soft: string;
  border: string;
  text: string;
  position: { x: number; y: number; w: number; h: number };
  region: string;
  formation: string[];
  features: string[];
  keywords: string[];
  countries: CultureCountry[];
};

export type CultureCountry = {
  name: string;
  x: number;
  y: number;
  note: string;
  detail: string;
  exam: string;
};

export const cultureZones: CultureZone[] = [
  {
    id: "east-asia",
    name: "동아시아 문화권",
    label: "동아시아",
    color: "bg-sky-500",
    soft: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    position: { x: 72, y: 39, w: 12, h: 16 },
    region: "한국, 중국, 일본, 몽골 일대",
    formation: ["계절풍 기후", "벼농사 발달", "유교와 불교, 한자 문화의 영향"],
    features: ["쌀 중심 식생활", "젓가락 사용", "유교 윤리와 가족 중심 문화", "한자 문화의 흔적"],
    keywords: ["계절풍", "쌀", "유교", "한자"],
    countries: [
      { name: "대한민국", x: 78, y: 44, note: "동아시아 문화권의 대표 사례", detail: "벼농사와 쌀 중심 식문화, 유교적 생활 규범, 한자 문화의 흔적이 함께 나타납니다.", exam: "동아시아 문화권은 계절풍 기후와 벼농사, 유교 문화가 핵심입니다." },
      { name: "중국", x: 73, y: 45, note: "유교·한자 문화의 중심", detail: "넓은 영토 안에서 다양한 지역 문화가 나타나지만 동아시아 문화권의 중심적 역할을 해 왔습니다.", exam: "유교와 한자 문화가 주변 지역에 영향을 주었습니다." },
      { name: "일본", x: 81, y: 43, note: "섬나라의 동아시아 문화", detail: "벼농사, 젓가락 문화, 불교와 신토 문화 등이 함께 나타납니다.", exam: "우리나라·중국과 함께 동아시아 문화권으로 분류됩니다." }
    ]
  },
  {
    id: "southeast-asia",
    name: "동남아시아 문화권",
    label: "동남아시아",
    color: "bg-emerald-500",
    soft: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    position: { x: 70, y: 56, w: 14, h: 13 },
    region: "인도차이나반도와 동남아시아 섬 지역",
    formation: ["열대·계절풍 기후", "벼농사와 해상 교역", "불교·이슬람교·크리스트교의 복합 영향"],
    features: ["쌀 중심 식생활", "향신료 사용", "고상 가옥", "다양한 종교와 언어"],
    keywords: ["열대", "몬순", "쌀", "향신료"],
    countries: [
      { name: "태국", x: 73, y: 60, note: "불교 문화가 강한 지역", detail: "열대 기후와 벼농사가 발달했고 불교 사원이 생활 경관에 많이 나타납니다.", exam: "동남아시아는 열대·계절풍 기후와 쌀 문화가 중요합니다." },
      { name: "베트남", x: 76, y: 59, note: "벼농사와 계절풍 영향", detail: "쌀 중심 식생활과 계절풍 기후의 영향이 뚜렷합니다.", exam: "동남아시아 문화권의 대표 국가로 볼 수 있습니다." },
      { name: "인도네시아", x: 78, y: 68, note: "이슬람 인구가 많은 섬나라", detail: "동남아시아 섬 지역에 위치하며 이슬람교의 영향이 강하게 나타납니다.", exam: "동남아시아는 종교가 하나로만 통일되지 않고 다양합니다." }
    ]
  },
  {
    id: "south-asia",
    name: "남부 아시아 문화권",
    label: "남부 아시아",
    color: "bg-fuchsia-500",
    soft: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    text: "text-fuchsia-700",
    position: { x: 62, y: 52, w: 9, h: 12 },
    region: "인도 반도와 주변 지역",
    formation: ["몬순 기후", "힌두교와 불교의 발생", "오랜 농업 문명"],
    features: ["힌두교 문화", "향신료 사용", "다양한 언어와 민족", "손으로 먹는 식문화도 나타남"],
    keywords: ["인도", "힌두교", "몬순", "향신료"],
    countries: [
      { name: "인도", x: 66, y: 58, note: "남부 아시아 문화권의 중심", detail: "힌두교의 영향이 크고, 몬순 기후와 향신료 사용, 다양한 언어와 민족이 특징입니다.", exam: "남부 아시아는 힌두교와 몬순 기후를 함께 기억합니다." }
    ]
  },
  {
    id: "dry",
    name: "건조 문화권",
    label: "건조",
    color: "bg-amber-500",
    soft: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    position: { x: 49, y: 47, w: 16, h: 12 },
    region: "북부 아프리카, 서남아시아, 중앙아시아 일부",
    formation: ["사막과 초원 기후", "물 부족", "이슬람교 확산"],
    features: ["유목과 오아시스 농업", "이슬람교 영향", "긴 옷차림", "대추야자·밀·양고기 등"],
    keywords: ["사막", "이슬람", "유목", "오아시스"],
    countries: [
      { name: "사우디아라비아", x: 55, y: 53, note: "이슬람 문화의 중심 지역", detail: "건조한 자연환경과 이슬람 문화가 생활 방식에 큰 영향을 줍니다.", exam: "건조 문화권은 사막·초원, 물 부족, 이슬람교를 연결합니다." },
      { name: "이집트", x: 50, y: 50, note: "나일강과 사막 환경", detail: "사막 환경 속에서 나일강 주변에 농업과 도시가 발달했습니다.", exam: "건조 지역에서도 강 주변에는 농경과 도시가 발달할 수 있습니다." }
    ]
  },
  {
    id: "africa",
    name: "아프리카 문화권",
    label: "아프리카",
    color: "bg-lime-600",
    soft: "bg-lime-50",
    border: "border-lime-200",
    text: "text-lime-700",
    position: { x: 46, y: 58, w: 14, h: 22 },
    region: "사하라 사막 이남의 아프리카 지역",
    formation: ["열대·사바나 환경", "민족과 언어의 다양성", "식민 지배 경험"],
    features: ["공동체적 생활", "다양한 전통 음악과 춤", "이동 목축과 농업", "자원 개발과 도시화"],
    keywords: ["사바나", "다양성", "공동체", "식민 지배"],
    countries: [
      { name: "케냐", x: 54, y: 67, note: "동아프리카의 사바나 환경", detail: "사바나 환경과 목축, 관광 산업의 영향이 함께 나타납니다.", exam: "아프리카 문화권은 민족·언어·생활 방식의 다양성이 핵심입니다." },
      { name: "나이지리아", x: 48, y: 64, note: "다민족 국가", detail: "다양한 민족과 언어가 공존하고 자원 개발과 도시화가 빠르게 진행됩니다.", exam: "아프리카 문화권은 하나의 모습으로만 일반화하지 않는 것이 중요합니다." }
    ]
  },
  {
    id: "europe",
    name: "유럽 문화권",
    label: "유럽",
    color: "bg-indigo-500",
    soft: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    position: { x: 44, y: 33, w: 15, h: 13 },
    region: "서부·남부·북부·동부 유럽",
    formation: ["온대 기후", "크리스트교 전통", "산업 혁명과 시민 혁명"],
    features: ["빵과 유제품 중심 식문화", "크리스트교 문화", "도시와 산업 발달", "복지와 민주주의 전통"],
    keywords: ["크리스트교", "산업 혁명", "빵", "도시"],
    countries: [
      { name: "영국", x: 47, y: 38, note: "산업 혁명의 출발지", detail: "온대 기후와 해양 진출, 산업 혁명을 바탕으로 근대 산업 사회가 발달했습니다.", exam: "유럽 문화권은 크리스트교와 산업화, 도시 발달을 연결합니다." },
      { name: "프랑스", x: 49, y: 41, note: "서유럽 문화의 대표 국가", detail: "크리스트교 전통, 시민 혁명, 예술 문화가 발달한 지역입니다.", exam: "프랑스는 유럽 문화권의 대표 국가로 자주 제시됩니다." },
      { name: "이탈리아", x: 52, y: 44, note: "지중해와 가톨릭 문화", detail: "지중해성 기후와 가톨릭 문화, 고대 로마와 르네상스의 전통이 나타납니다.", exam: "남부 유럽은 지중해성 기후와 포도·올리브 재배가 연결됩니다." }
    ]
  },
  {
    id: "anglo-america",
    name: "앵글로아메리카 문화권",
    label: "앵글로아메리카",
    color: "bg-blue-600",
    soft: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    position: { x: 16, y: 32, w: 18, h: 18 },
    region: "미국과 캐나다 중심의 북아메리카",
    formation: ["유럽계 이주민의 정착", "영어 사용", "산업·상업 발달"],
    features: ["영어 중심 문화", "이민자 사회", "대규모 농업", "세계적 대중문화와 첨단 산업"],
    keywords: ["영어", "이민", "미국", "캐나다"],
    countries: [
      { name: "미국", x: 23, y: 45, note: "앵글로아메리카의 중심", detail: "이민자 사회, 영어 사용, 대중문화와 첨단 산업의 영향력이 큽니다.", exam: "앵글로아메리카는 영어와 유럽계 이주민의 영향이 핵심입니다." },
      { name: "캐나다", x: 22, y: 35, note: "다문화 정책과 넓은 국토", detail: "영어와 프랑스어가 함께 쓰이며, 넓은 국토와 풍부한 자원을 바탕으로 생활이 발달했습니다.", exam: "미국·캐나다를 앵글로아메리카 문화권으로 묶습니다." }
    ]
  },
  {
    id: "latin-america",
    name: "라틴 아메리카 문화권",
    label: "라틴 아메리카",
    color: "bg-rose-500",
    soft: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    position: { x: 25, y: 56, w: 16, h: 25 },
    region: "멕시코, 중앙아메리카, 남아메리카",
    formation: ["에스파냐·포르투갈의 식민 지배", "원주민 문화와 유럽 문화의 융합", "가톨릭 전파"],
    features: ["에스파냐어·포르투갈어 사용", "가톨릭 문화", "혼혈 문화", "축제와 음악 발달"],
    keywords: ["가톨릭", "혼혈", "에스파냐어", "포르투갈어"],
    countries: [
      { name: "브라질", x: 34, y: 70, note: "포르투갈어권 라틴 아메리카", detail: "포르투갈 식민 지배의 영향으로 포르투갈어를 사용하고 카니발 등 축제 문화가 유명합니다.", exam: "브라질은 라틴 아메리카지만 에스파냐어가 아니라 포르투갈어 사용이 핵심입니다." },
      { name: "멕시코", x: 27, y: 53, note: "원주민 문화와 에스파냐 문화의 융합", detail: "에스파냐 식민 지배와 원주민 문화가 섞인 문화가 나타납니다.", exam: "라틴 아메리카는 가톨릭과 혼혈 문화가 중요합니다." },
      { name: "페루", x: 31, y: 68, note: "안데스 문명과 원주민 문화", detail: "안데스 산지의 원주민 문화와 에스파냐 문화가 함께 나타납니다.", exam: "라틴 아메리카에서는 원주민 문화의 영향도 함께 봅니다." }
    ]
  },
  {
    id: "polar",
    name: "북극 문화권",
    label: "북극",
    color: "bg-cyan-400",
    soft: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    position: { x: 18, y: 18, w: 18, h: 10 },
    region: "그린란드, 알래스카 북부, 북극해 주변",
    formation: ["한대 기후", "긴 겨울과 추위", "수렵·어로 중심 생활"],
    features: ["순록·물개·어업 관련 생활", "두꺼운 옷차림", "최근 자원 개발과 관광 증가"],
    keywords: ["한대", "수렵", "어로", "이누이트"],
    countries: [
      { name: "그린란드", x: 34, y: 24, note: "한대 기후와 어로 생활", detail: "추운 자연환경 속에서 어업과 수렵이 생활과 문화 형성에 영향을 주었습니다.", exam: "북극 문화권은 한대 기후와 수렵·어로 생활을 연결합니다." }
    ]
  },
  {
    id: "oceania",
    name: "오세아니아 문화권",
    label: "오세아니아",
    color: "bg-teal-500",
    soft: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    position: { x: 78, y: 76, w: 15, h: 10 },
    region: "오스트레일리아, 뉴질랜드와 태평양 섬 지역",
    formation: ["해양 환경", "유럽계 이주민 정착", "원주민 문화와 이주 문화 공존"],
    features: ["영어 사용", "목축업 발달", "자연 관광 자원", "원주민 문화 보존 노력"],
    keywords: ["해양", "목축", "영어", "원주민"],
    countries: [
      { name: "오스트레일리아", x: 82, y: 80, note: "목축업과 자연 관광", detail: "건조한 내륙과 해안 도시, 목축업과 관광 산업이 함께 발달했습니다.", exam: "오세아니아 문화권은 해양 환경과 유럽 이주민 문화, 원주민 문화를 함께 봅니다." },
      { name: "뉴질랜드", x: 90, y: 84, note: "마오리 문화와 자연 관광", detail: "영국계 이주 문화와 마오리 원주민 문화가 공존합니다.", exam: "오세아니아는 영어권 문화와 원주민 문화가 함께 나타납니다." }
    ]
  }
];

export const cultureReviewQuestions = [
  { question: "쌀 중심 식생활, 유교, 한자 문화와 가장 관련 깊은 문화권은?", answer: "동아시아 문화권" },
  { question: "사막과 초원, 오아시스, 이슬람교와 관련 깊은 문화권은?", answer: "건조 문화권" },
  { question: "에스파냐어·포르투갈어, 가톨릭, 혼혈 문화가 특징인 문화권은?", answer: "라틴 아메리카 문화권" },
  { question: "영어 사용, 미국과 캐나다, 이민자 사회와 관련 깊은 문화권은?", answer: "앵글로아메리카 문화권" }
];
