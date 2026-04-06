export type TextbookNote = {
  type: "teacher" | "archive";
  text: string;
};

export type TextbookBlock = {
  lines: string[];
  notes: TextbookNote[];
};

export type TextbookSection = {
  slug: string;
  title: string;
  summary: string;
  keyPoints: string[];
  blocks: TextbookBlock[];
};

export const englishTextbookSections: TextbookSection[] = [
  {
    slug: "morning-pages",
    title: "Lesson 1 · The Magic of Morning Pages",
    summary: "모닝 페이지 쓰기의 개념, 두 가지 규칙, 실제 사례를 통해 글쓰기 습관의 효과를 설명하는 본문이다.",
    keyPoints: [
      "morning pages = 아침 자유 글쓰기",
      "judge하지 말기",
      "completely private하게 쓰기",
      "David / Yuna / Regan 사례 비교",
      "mental health / creativity 향상"
    ],
    blocks: [
      {
        lines: [
          "Welcome to my channel, Good Habits! This is Regan, your podcast host.",
          "Today, I’m going to talk about a way of starting the day that many people, including me, find enormously useful.",
          "It’s a kind of journaling called morning pages."
        ],
        notes: [
          { type: "teacher", text: "way of starting the day = 하루를 시작하는 방식. enormously useful은 ‘매우 유용한’이라는 강한 평가 표현." },
          { type: "archive", text: "3문장은 It is ~ called ... 구조로 ‘morning pages’의 정체를 정의한다. 제목 제시 + 개념 소개 역할." }
        ]
      },
      {
        lines: [
          "The morning pages are three pages of “free writing,” ideally the first thing in the morning.",
          "The concept is simple. Get up every morning, pick up a pen and a notebook, and write whatever crosses your mind until you have filled three pages.",
          "The technique was originally developed to help writers and artists overcome a loss of creativity, but anybody can use it to create a better life."
        ],
        notes: [
          { type: "teacher", text: "whatever crosses your mind = 머릿속에 떠오르는 것은 무엇이든. until you have filled three pages는 ‘세 페이지를 다 채울 때까지’라는 시간 조건." },
          { type: "archive", text: "to help writers and artists overcome ... 는 목적을 나타내는 to부정사. originally developed는 수동태." }
        ]
      },
      {
        lines: [
          "There is no right or wrong way to write your morning pages, but there are two rules.",
          "First, don’t judge your writing as good or bad.",
          "These pages are meant to be “brain cleansing,” so don’t worry about writing correctly.",
          "Second, keep your writing completely private.",
          "It is important for you to write freely and honestly."
        ],
        notes: [
          { type: "teacher", text: "첫 번째 규칙: 좋고 나쁨으로 판단하지 말 것. 두 번째 규칙: 글은 완전히 사적으로 둘 것." },
          { type: "teacher", text: "write correctly는 ‘문법적으로 정확하게 쓰다’의 뜻. brain cleansing은 머릿속 정리의 비유." },
          { type: "archive", text: "be meant to V = ~하도록 의도되다. It is important for you to V = 네가 ~하는 것이 중요하다." }
        ]
      },
      {
        lines: [
          "Now, let me share the experiences of some people I interviewed.",
          "David, a chef and kitchen manager, who has been writing morning pages for two years, says:",
          "“My job tends to be very stressful. When I started writing morning pages, I just wrote a lot of complaints about my hard life.",
          "Later, I began to ask questions, like ‘What would make my life easier today?’ or ‘How can I improve my recipes?’",
          "Nowadays, I feel less stressed, enjoy my job more, and am more productive.”"
        ],
        notes: [
          { type: "teacher", text: "David 사례: 불평 중심의 글쓰기에서 질문 중심의 글쓰기로 변화. feel less stressed / more productive가 결과." },
          { type: "archive", text: "who has been writing ... 는 계속적 용법의 관계절. 현재완료진행이 기간(two years)과 연결된다." }
        ]
      },
      {
        lines: [
          "Now, let’s listen to Yuna, a high school junior:",
          "“When I started this exercise last year, I simply wrote random thoughts like this: I’m sleepy. A slight headache’s starting. I need to finish the math assignment today ... I don’t know what more to write now.”",
          "“But soon I found I had deeper and deeper thoughts.",
          "Now, I normally start by writing about today’s tasks or worries.",
          "After that, I write about my dreams and how to move toward them.",
          "I often come up with great plans and a clear sense of purpose to start the day.",
          "Most importantly, I’m much happier than before.”"
        ],
        notes: [
          { type: "teacher", text: "Yuna 사례: random thoughts → deeper thoughts. today’s tasks, dreams, clear sense of purpose로 내용이 발전함." },
          { type: "archive", text: "how to move toward them은 의문사+to부정사. come up with = 떠올리다, 마련해 내다." }
        ]
      },
      {
        lines: [
          "I can totally relate to these two people because their experiences are similar to mine.",
          "At that time, I felt lost, stressed, and unsure about the future, and it wasn’t easy for me to concentrate.",
          "When I first tried writing three daily pages, I didn’t expect much of it, but it did, in fact, change my life!",
          "Releasing my feelings onto paper every morning helped relieve my emotional tension.",
          "I gained more inner peace, which improved my schoolwork performance.",
          "Like David, I asked many questions, for instance, ‘Why was I so angry yesterday?’ ‘Why are things less fun these days?’",
          "Then, I started raising more challenging ones: ‘What could make me happier right now?’ ‘What is my ideal future? Can I reach it? How?’”"
        ],
        notes: [
          { type: "teacher", text: "Regan 사례: 감정 해소 → 내적 평화 → 학업 성과 향상. 질문의 수준이 점점 깊어지는 흐름이 중요." },
          { type: "archive", text: "which improved my schoolwork performance는 앞 문장 전체를 선행사로 받는 계속적 관계절." }
        ]
      },
      {
        lines: [
          "Answering these questions showed me what kind of person I was and what my needs, values, passions, and talents were.",
          "More importantly, I came to know what I truly wanted!",
          "I remembered my childhood dreams of being a writer, songwriter, and radio host.",
          "Gradually, vague ideas became clear plans.",
          "Years later, here I am, a successful podcaster and vlogger!",
          "I’ve also published a book and a music album.",
          "My morning pages, which I still write every day, have given me the drive and ideas to achieve these aims."
        ],
        notes: [
          { type: "teacher", text: "what kind of person I was / what I truly wanted = 간접의문문. vague ideas became clear plans는 추상적 꿈이 구체적 계획으로 바뀌는 표현." },
          { type: "archive", text: "here I am은 ‘바로 내가 여기 있다’는 강조 표현. which I still write every day는 pages를 꾸며 주는 계속적 관계절." }
        ]
      },
      {
        lines: [
          "Dear subscribers, will you try writing your morning pages, too?",
          "You never know what creative energy or ideas you have until you start exploring.",
          "Don’t be a perfectionist, though.",
          "If you miss a few days, simply open your notebook and start again!",
          "The ultimate aim is to improve your mental health and help you lead a happier, more creative life."
        ],
        notes: [
          { type: "teacher", text: "결론: morning pages의 궁극적 목표는 정신 건강 개선과 더 행복하고 창의적인 삶." },
          { type: "archive", text: "You never know ... until ... = ~하기 전까지는 결코 알 수 없다. help you lead ... 에서 lead는 ‘살게 하다’." }
        ]
      }
    ]
  },
  {
    slug: "octopus",
    title: "Lesson 2 · The Mind of an Octopus",
    summary: "문어에 대한 편견에서 출발해 위장 능력, 도구 사용, 감정 가능성까지 설명하며 문어의 지능을 강조하는 본문이다.",
    keyPoints: [
      "서양 문화권의 문어 이미지 = alien / evil",
      "camouflage 능력은 지능의 증거",
      "stones / coconut shells / toys / puzzles",
      "skin color changes and feelings",
      "ultimate message = octopuses are intelligent"
    ],
    blocks: [
      {
        lines: [
          "Here is an animal with poison like a snake, a hard and pointed mouth like a bird, and ink like a pen.",
          "It can weigh as much as an adult human and stretch as long as a car.",
          "Yet it can put its boneless body through a hole the size of an orange.",
          "It can change color and shape, and it can taste with its skin.",
          "This animal is called an octopus."
        ],
        notes: [
          { type: "teacher", text: "도입부는 문어의 낯설고 신기한 특징을 열거해 독자의 시선을 끈다." },
          { type: "archive", text: "as much as / as long as는 동등 비교. boneless body through a hole은 문어의 유연성을 강조한다." }
        ]
      },
      {
        lines: [
          "The octopus looks so alien to the people of the West that it has caused dislike or even horror in them.",
          "The dislike or horror helped create the image of an octopus as an evil creature living in the deep sea.",
          "For example, the Kraken, a sea monster in old Icelandic tales, looks just like an enormous octopus.",
          "Another example is Ursula, the sea witch featured in the famous tale, The Little Mermaid.",
          "To this day, it is difficult for us to imagine that octopuses and humans share any meaningful similarities."
        ],
        notes: [
          { type: "teacher", text: "서양 문화권에서 문어는 alien / evil 이미지로 소비되어 왔다." },
          { type: "archive", text: "so ... that ... = 너무 ~해서 ...하다. meaningful similarities는 ‘의미 있는 공통점’." }
        ]
      },
      {
        lines: [
          "During the past few decades, however, scientists have begun to find more and more similarities between octopuses and humans.",
          "One of the most interesting ones is intelligence.",
          "Octopuses are smart.",
          "The best evidence is their ability to camouflage themselves.",
          "An octopus can change its color, pattern, and texture, and the changes are carried out almost instantly.",
          "In terms of speed and the diversity of change, no other animal can rival octopuses.",
          "Even chameleons can utilize only a handful of fixed patterns."
        ],
        notes: [
          { type: "teacher", text: "문어 지능의 첫 번째 증거 = camouflage. color / pattern / texture를 거의 즉시 바꿀 수 있음." },
          { type: "archive", text: "no other animal can rival octopuses = 어떤 동물도 문어와 경쟁할 수 없다. can rival은 ‘필적하다’." }
        ]
      },
      {
        lines: [
          "The main purpose of these changes is to avoid detection by their hunters or their prey.",
          "When an octopus encounters its hunter or prey, it must decide very quickly which color, pattern, and texture to choose.",
          "Such a decision implies that it has gained sufficient knowledge of the surrounding animals and applies it to survive.",
          "To acquire knowledge and apply it for a particular purpose is a sure sign of intelligence."
        ],
        notes: [
          { type: "teacher", text: "색과 무늬를 바꾸는 목적은 포식자나 먹잇감에게 들키지 않기 위해서다." },
          { type: "archive", text: "which color, pattern, and texture to choose는 의문사+to부정사. intelligence의 논리적 근거를 제시한다." }
        ]
      },
      {
        lines: [
          "Another sign of the intelligence of the octopus is its use of tools.",
          "In the lab, octopuses use tools to get food rewards.",
          "In the wild, they use stones to create walls to protect the entrances to their homes.",
          "They use not only stones but anything they can find to protect themselves.",
          "The most impressive example of octopuses using tools came in 2009 in Indonesia.",
          "A few octopuses were found to collect coconut shells.",
          "They cleaned the shells with bursts of water, carried them to a new location, and piled them as a shelter.",
          "Traveling with the shells under their bodies forced them to walk slowly along the sea floor.",
          "This made the octopuses more exposed to predators.",
          "But it seems that they were willing to take that risk for greater future protection."
        ],
        notes: [
          { type: "teacher", text: "도구 사용 사례: 돌, 코코넛 껍데기. 미래의 보호를 위해 현재 위험을 감수하는 모습이 핵심." },
          { type: "archive", text: "force + 목적어 + to부정사 = ~하게 만들다. were willing to take that risk = 그 위험을 감수할 의향이 있었다." }
        ]
      },
      {
        lines: [
          "Octopuses’ use of tools can be found in their love of toys and puzzles, too.",
          "They are curious about new objects, and do not like getting bored.",
          "That is why aquariums try to come up with ideas to keep their octopuses busy.",
          "Some aquariums hide food inside a big doll and let the octopus break up the toy to get the food.",
          "Others offer plastic building blocks for their octopuses to play with."
        ],
        notes: [
          { type: "teacher", text: "수족관 사례는 문어가 호기심이 많고 지루함을 싫어한다는 점을 보여 준다." },
          { type: "archive", text: "That is why ... = 그래서 ~이다. let the octopus break up ... 에서 let은 사역동사." }
        ]
      },
      {
        lines: [
          "Our knowledge about the octopus is still very limited.",
          "Thanks to the efforts of scientists, however, it is expanding year by year.",
          "One of the most impressive new findings about the octopus is that it seems to have feelings.",
          "Of course, it is impossible for us to know exactly what they feel, but a few of their changes in skin color seem to be linked to their feelings.",
          "For example, a giant Pacific octopus that turns red seems to be excited, while it is white when it is relaxed.",
          "An octopus presented with a difficult puzzle often undergoes several rapid changes in color.",
          "The octopus seems to be worried that it may not solve the problem."
        ],
        notes: [
          { type: "teacher", text: "문어의 감정 가능성: 피부색 변화가 흥분, 이완, 걱정 같은 상태와 연결되는 듯함." },
          { type: "archive", text: "be linked to = ~와 연결되다. it seems to have feelings / seems to be worried는 추정 표현." }
        ]
      },
      {
        lines: [
          "Few scientists today deny that octopuses are intelligent animals.",
          "Perhaps it is time that we stopped thinking of them as alien creatures and acknowledged them as intelligent animals like us.",
          "There is still so much we do not know about the octopus.",
          "Aren’t you curious about what is inside their mind?"
        ],
        notes: [
          { type: "teacher", text: "결론: 문어를 괴물처럼 보는 관점을 버리고 지적인 동물로 인정해야 한다." },
          { type: "archive", text: "It is time that 주어 + 과거동사 = 이제는 ~할 때다. acknowledged them as ... = 그들을 ~로 인정하다." }
        ]
      }
    ]
  }
];
