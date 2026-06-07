export type ListeningScript = { number: number; type: string; title: string; answer: string; script: string; };
export type VocabItem = { word: string; meaning: string; };
export type ReadingPassage = { number: number; type: string; title: string; answer: string; passage: string; translation: string; grammar: string[]; vocab: VocabItem[]; };

export const listeningScripts: ListeningScript[] = [
  {
    "number": 1,
    "type": "담화의 목적",
    "title": "1. 다음을 듣고, 여자가 하는 말의 목적으로 가장 적절한 것을 고르시오.",
    "answer": "③",
    "script": "W: Good morning, everyone. I'm your student council president, Kelly\nGreen. Many students have complained that there are no printers\navailable for them to use. To solve this problem, next week we will\nset up several new printers in the student council room. Students\nwill be able to use the printers for homework, projects, or any other\nschool tasks. We hope this will help you do your work more\nefficiently and make your school life easier. Thank you."
  },
  {
    "number": 2,
    "type": "의견",
    "title": "2. 대화를 듣고, 남자의 의견으로 가장 적절한 것을 고르시오.",
    "answer": "①",
    "script": "M: Anna, I see you're studying Spanish.\nW: Hi, Mr. Brown. Yeah, I've been really into it these days.\nM: I've noticed. Do you feel like you're improving a lot?\nW: Hmm... Well, remembering words is really hard. I forget them\nquickly.\nM: I see. How about saying the words out loud? It can be an effective\nway to remember them.\nW: Does it really help? I feel more comfortable just memorizing quietly.\nM: When you speak out loud, you use different parts of your brain, and\nthat helps you remember words better.\nW: But I always thought saying words out loud would make it harder to\nfocus.\nM: Not at all. Studies show that it can help you stay more focused on\nthe task.\nW: Really? Then, maybe I should give it a try."
  },
  {
    "number": 3,
    "type": "요지",
    "title": "3. 다음을 듣고, 남자가 하는 말의 요지로 가장 적절한 것을 고르시오.",
    "answer": "①",
    "script": "M: Hello, listeners! This is Thomas White's Living Well. What do you\ndo to stay healthy? Maybe you exercise regularly and eat healthy\nfood. Those are both great habits. But I have one more simple tip\nfor you. Go outside and get some sunlight! Sunlight is important for\nyour body and mind. Getting sunlight can prevent you from getting\nsick and can reduce anxiety. It's an easy way to help you stay\nhealthy both physically and mentally. I'll be right back with more\nafter the break."
  },
  {
    "number": 4,
    "type": "그림 내용 불일치",
    "title": "4. 대화를 듣고, 그림에서 대화의 내용과 일치하지 않는 것을 고르시오.",
    "answer": "⑤",
    "script": "M: Jenny, how was the pajama party yesterday?\nW: It was great, Dad. Here, take a look at this photo.\nM: Let's see. Oh, I like the pajama party banner next to the clock.\nW: Yeah, it's really eye-catching, isn't it?\nM: It is. And here you are standing in your striped pajamas.\nW: I absolutely love these pajamas. They look so cute.\nM: And the girl making a V-sign with her fingers is your friend Mia,\nright?\nW: That's right. Do you see the pillows on the bed? We had a pillow\nfight!\nM: It must've been so much fun. By the way, what are those three\nstars on the wall?\nW: Oh, those are stickers. They glow in the dark.\nM: I see. Sounds like you had an amazing time at the pajama party.\nW: Definitely! I'll never forget it."
  },
  {
    "number": 5,
    "type": "할 일",
    "title": "5. 대화를 듣고, 남자가 할 일로 가장 적절한 것을 고르시오.",
    "answer": "②",
    "script": "W: Brian, I think we're almost ready for our candy shop's opening\nevent.\nM: That's right. What do we have left to do?\nW: Well, let's see. Is the background music playlist ready?\nM: Yes, I chose some cheerful songs and made a playlist.\nW: Great! What about the bluetooth speakers?\nM: I tested them and they're working fine. Did you choose the sample\ncandies for customers to try?\nW: Yeah. Look! I put them in these pretty little baskets.\nM: Thanks! They look nice.\nW: And all the other candies are nicely placed around the shop.\nM: Wait, how about the price tags?\nW: Oh, we almost forgot. Could you put them on the candy boxes?\nM: Of course. I'll do it right away."
  },
  {
    "number": 6,
    "type": "숫자 정보",
    "title": "6. 대화를 듣고, 여자가 지불할 금액을 고르시오. [3점]",
    "answer": "④",
    "script": "M: Welcome to Lake Boat Tours. How can I help you?\nW: Hello. I'd like to buy some tickets for today.\nM: We have daytime tickets and sunset tickets. Which would you like?\nW: We'd like sunset tickets, please. How much are they?\nM: It's $30 for adults and $20 for children. How many tickets do you\nwant?\nW: Two adult tickets and one child ticket, please.\nM: Okay. And, we offer snacks for $10 per person. Would you like\nthem?\nW: Yes. Snacks for all three of us, please.\nM: Alright. Do you need anything else?\nW: No, that's it.\nM: So, that's two adults and one child for the sunset tour, all with\nsnacks.\nW: Perfect. Here's my credit card."
  },
  {
    "number": 7,
    "type": "이유",
    "title": "7. 대화를 듣고, 여자가 버스킹 공연에 참여할 수 없는 이유를 고르시오.",
    "answer": "②",
    "script": "M: Hey, Alicia. I saw a video of you playing the guitar on your social\nmedia. It was great.\nW: Thanks, Oliver. Your singing videos are fantastic, too.\nM: I have an idea. There's a busking event this Sunday. How about\nperforming together?\nW: This Sunday? I'd really love to, but I can't.\nM: Why not? Do you feel nervous about performing in public?\nW: Not really, but I already have another plan on Sunday.\nM: Oh, do you still take tennis lessons every Sunday?\nW: Not anymore. Do you remember I had an interview for a part-time\njob?\nM: Of course. Did you get it?\nW: Yes, so I have to start working the part-time job this Sunday.\nM: I see. Maybe we can try for another time."
  },
  {
    "number": 8,
    "type": "언급 유무",
    "title": "8. 대화를 듣고, Fireworks Festival 자원봉사에 관해 언급되지 않은 것을",
    "answer": "③",
    "script": "고르시오.\nW: Jay, did you hear about the Fireworks Festival?\nM: Yeah, I heard it's going to be amazing.\nW: I'm thinking of volunteering there. Take a look at this poster about\nit.\nM: The volunteer period is for two days, June 14th and 15th.\nW: That's right. Would you like to join?\nM: I'd love to. But can just anyone apply to be a volunteer?\nW: Only people over 18 can apply. So, we're both good.\nM: I see. What exactly will we do during the festival?\nW: It says we'll check tickets, run activity booths, or take photos for\nthe festival website.\nM: Sounds interesting. And look! We have to sign up by this Friday.\nW: Really? We don't have much time. Let's do it right now."
  },
  {
    "number": 9,
    "type": "내용 불일치",
    "title": "9. 2025 Talent Show에 관한 다음 내용을 듣고, 일치하지 않는 것을 고르시오.",
    "answer": "④",
    "script": "W: Hello, everyone! This is Ms. Westwood, your vice principal. I'm\nexcited to announce the 2025 Talent Show! It'll take place in our\nschool auditorium on June 20th at 6 p.m. All students are welcome\nto participate and showcase their unique talent, whether it's singing,\ndancing, or acting. Three wonderful teachers will be the judges, and\nthere will be prizes for the top performances. Every participant will\nreceive a free T-shirt with our school symbol on it. At the end of\nthe show, we'll have a short dance party. For more details, please\ncheck out our school website. Thank you."
  },
  {
    "number": 10,
    "type": "도표",
    "title": "10. 다음 표를 보면서 대화를 듣고, 두 사람이 구매할 책가방을 고르시오.",
    "answer": "④",
    "script": "W: Honey, we need to buy Robert a backpack for school.\nM: Right, let's search for one online.\nW: [Clicking Sound] Wow, there are so many options. What should we\nconsider first?\nM: Well, let's start with budget.\nW: We already spent a lot on his other school supplies. I'd like to keep\nit under $70.\nM: All right. What shape should we get him, a square one?\nW: Yeah, it's better for carrying school supplies. Then, what about the\ncolor?\nM: White ones get dirty easily, so we should go with a black one.\nW: Sounds good. And does it need to be waterproof?\nM: Definitely. It'll be useful on rainy days.\nW: Then, this is the one. Let's buy it."
  },
  {
    "number": 11,
    "type": "짧은 응답",
    "title": "11. 대화를 듣고, 남자의 마지막 말에 대한 여자의 응답으로 가장 적절한 것을",
    "answer": "①",
    "script": "고르시오. [3점]\nM: Ms. Adams, I'm not feeling well. I have a bad headache.\nW: Oh, sorry to hear that, Jack. Have you taken some medicine?\nM: Yes, I took some an hour ago, but I don't think I can stay in class.\nW:"
  },
  {
    "number": 12,
    "type": "짧은 응답",
    "title": "12. 대화를 듣고, 여자의 마지막 말에 대한 남자의 응답으로 가장 적절한 것을",
    "answer": "⑤",
    "script": "고르시오.\nW: Welcome to Emily's Cake Shop. How can I help you today?\nM: I'd like to order a cake. It's to celebrate my first wedding\nanniversary.\nW: Congratulations on your anniversary! Do you have a specific design\nin mind?\nM:"
  },
  {
    "number": 13,
    "type": "긴 대화 응답",
    "title": "13. 대화를 듣고, 여자의 마지막 말에 대한 남자의 응답으로 가장 적절한 것을",
    "answer": "②",
    "script": "고르시오.\nW: Dad, look at the cat over there!\nM: Oh, it's so cute.\nW: I've wanted a cat for a long time. Can we get one?\nM: You know, raising a cat isn't easy, Rebecca.\nW: I understand. But I promise I'd love it with all my heart.\nM: It's not just about love. It's about effort and responsibility.\nW: Trust me, Dad. I know I can handle it.\nM: Hmm... Then, how about practicing first? Uncle Tony is looking for\nsomeone to take care of his cat during his business trip.\nW: That sounds great! If I do a good job with his cat, will you let me\nget my own cat?\nM: I'll definitely think about it if you take good care of his cat.\nW: Thanks, Dad. Please tell Uncle Tony that I want to do it.\nM:"
  },
  {
    "number": 14,
    "type": "긴 대화 응답",
    "title": "14. 대화를 듣고, 남자의 마지막 말에 대한 여자의 응답으로 가장 적절한 것을",
    "answer": "③",
    "script": "고르시오. [3점]\nM: Grandma, look what I found in the garage. It's an old cookbook.\nW: Oh, I haven't seen that for years.\nM: It says here, \"Recipes for Fine Dishes.\"\nW: That's the cookbook I wrote when I was a chef before you were\nborn.\nM: Really? You were a professional chef?\nW: Yeah, I used to work in a restaurant. Look! These were my special\ndishes.\nM: Wow, they look fantastic! Did you create all the recipes in the\nbook?\nW: Yes. I really loved cooking and was good at it back then.\nM: You're still good at cooking!\nW: Do you really think so?\nM: Of course! I've always thought your food tastes amazing.\nW:"
  },
  {
    "number": 15,
    "type": "상황 응답",
    "title": "15. 다음 상황 설명을 듣고, Chloe가 호텔 직원에게 할 말로 가장 적절한 것을",
    "answer": "②",
    "script": "고르시오.\nW: Chloe is on an overseas trip and staying at a hotel in Cairo, Egypt.\nAfter some sightseeing, she goes back to her hotel room. It's hot\noutside, so she decides to turn on the air conditioner, but it doesn't\nwork. She calls the hotel clerk to get it fixed. He explains that it\ncan be fixed tomorrow. It's too hot to sleep without the air\nconditioning, and Chloe wants to know if she can stay in another\nroom. In this situation, what would Chloe most likely say to the\nhotel clerk?"
  },
  {
    "number": 16,
    "type": "긴 담화 주제",
    "title": "[16~17] 국가별 국화와 상징",
    "answer": "⑤",
    "script": "M: Hello, class! Last time, we learned about the national flags of\nvarious countries. Today, we'll talk about different countries'\nnational flowers and what they symbolize. First, the Philippines'\nnational flower is jasmine. Because it means good luck, people often\ngive big necklaces made of this flower to welcome special guests.\nNext, Denmark's flower is the daisy and it represents happiness.\nChildren express happiness by making daisy chains during their\ntraditional games. In France, the national flower is the iris.\nThroughout history, French people have thought of this flower as a\nsymbol of perfection. Lastly, the United States uses the rose as its\nnational flower. Americans consider it a symbol of love. So you can\nfind many roses in American weddings. Now, let's watch a short\nvideo to look at these flowers up close."
  },
  {
    "number": 17,
    "type": "긴 담화 언급 유무",
    "title": "[16~17] 국가별 국화와 상징",
    "answer": "③",
    "script": "M: Hello, class! Last time, we learned about the national flags of\nvarious countries. Today, we'll talk about different countries'\nnational flowers and what they symbolize. First, the Philippines'\nnational flower is jasmine. Because it means good luck, people often\ngive big necklaces made of this flower to welcome special guests.\nNext, Denmark's flower is the daisy and it represents happiness.\nChildren express happiness by making daisy chains during their\ntraditional games. In France, the national flower is the iris.\nThroughout history, French people have thought of this flower as a\nsymbol of perfection. Lastly, the United States uses the rose as its\nnational flower. Americans consider it a symbol of love. So you can\nfind many roses in American weddings. Now, let's watch a short\nvideo to look at these flowers up close."
  }
];

export const readingPassages: ReadingPassage[] = [
  {
    "number": 18,
    "type": "목적",
    "title": "새로 개장한 반려견 공원 안내",
    "answer": "①",
    "passage": "Dear Dog Owners,\nMy name is Lily Paxton, and I'm the town's Pet\nProgram Coordinator. As part of our goal to make the\ncommunity more dog-friendly, we recently opened a new\ndog park. The park was designed to provide an enjoyable\nexperience for both dogs and owners. There are big\ngrassy areas where your dogs can run, jump, and play.\nWe have separate spaces for small dogs and big dogs, to\nensure safety. You'll also find lots of benches and areas\nfor resting and staying cool. We hope you will have a\nwonderful time with your dogs in this newly opened park.\nRegards,\nLily Paxton, Pet Program Coordinator",
    "translation": "친애하는 반려견 주인 여러분,\n  제 이름은 Lily Paxton이며, 저는 이 마을의 반려\n동물 프로그램 코디네이터입니다. 이 지역 사회를 더\n욱 반려견 친화적으로 만들기 위한 목표의 일환으로,\n저희는 최근에 새로운 반려견 공원을 개장했습니다.\n이 공원은 반려견과 주인 모두에게 즐거운 경험을 제\n공하도록 설계되었습니다. 반려견들이 달리고, 점프하\n고, 놀 수 있는 넓은 잔디밭들이 있습니다. 안전을 보\n장하기 위해, 저희는 소형견과 대형견을 위한 별도의\n공간을 마련했습니다. 여러분들은 휴식을 취하고 시\n원하게 머물 수 있는 벤치들과 공간들도 많이 찾을\n수 있을 것입니다. 저희는 새롭게 개장한 이 공원에\n서 여러분이 반려견과 함께 멋진 시간을 보내시길 바\n랍니다.\nLily Paxton, 반려동물 프로그램 코디네이터 드림",
    "grammar": [
      "as part of + 명사: ~의 일환으로",
      "be designed to V: ~하도록 설계되다",
      "where 관계부사절: dogs can run...을 수식",
      "to ensure safety: 목적을 나타내는 to부정사"
    ],
    "vocab": [
      {
        "word": "coordinator",
        "meaning": "조정자"
      },
      {
        "word": "dog-friendly",
        "meaning": "반려견 친화적인"
      },
      {
        "word": "separate",
        "meaning": "별도의"
      },
      {
        "word": "ensure",
        "meaning": "보장하다"
      },
      {
        "word": "newly opened",
        "meaning": "새로 개장한"
      }
    ]
  },
  {
    "number": 19,
    "type": "심경 변화",
    "title": "여권을 두고 온 Maya의 여행 계획 좌절",
    "answer": "①",
    "passage": "Maya waited in line to check in for her flight. Her\nexpectations about her European backpacking trip were really\nhigh. She had been looking forward to the trip for a year.\nShe couldn't wait to visit museums in Madrid and see the\nEiffel Tower at night in Paris. As she stood in line, she\ncould feel those experiences were finally so close. When she\napproached the counter, the airline employee asked to see\nher passport. Maya reached into her pocket but felt nothing.\nShe realized she had left her passport at home. Her plans\nwere ruined. She was heartbroken, knowing she could not\nboard the flight and had to delay her dream trip.",
    "translation": "Maya는 비행기 탑승 수속을 위해 줄을 서서 기다리\n고 있었다. 유럽 배낭여행에 대한 그녀의 기대는 아주\n높았다. 그녀는 일 년 동안 이 여행을 손꼽아 기다려\n왔다. 그녀는 빨리 Madrid의 박물관들을 방문하고\nParis에서 밤에 Eiffel Tower를 보고 싶었다. 줄을 서\n있는 동안, 그녀는 그 경험들이 마침내 정말 가까워졌\n다고 느꼈다. 그녀가 카운터에 다가갔을 때, 항공사 직\n원이 그녀의 여권을 보자고 요청했다. Maya는 주머니\n에 손을 넣었지만 아무것도 만져지지 않았다. 그녀는\n여권을 집에 두고 온 것을 깨달았다. 그녀의 계획은 망\n쳐졌다. 그녀는 비행기에 탑승할 수 없고 꿈꿔왔던 여\n행을 연기해야 한다는 것을 깨달으며, 상심했다.",
    "grammar": [
      "과거완료 had been looking forward to: 과거 어느 시점 전부터 기대해 옴",
      "couldn't wait to V: 몹시 ~하고 싶다",
      "As she stood...: ~하는 동안",
      "knowing she could not...: 분사구문으로 이유/부대상황"
    ],
    "vocab": [
      {
        "word": "check in",
        "meaning": "탑승 수속을 하다"
      },
      {
        "word": "expectation",
        "meaning": "기대"
      },
      {
        "word": "backpacking trip",
        "meaning": "배낭여행"
      },
      {
        "word": "approach",
        "meaning": "다가가다"
      },
      {
        "word": "heartbroken",
        "meaning": "상심한"
      }
    ]
  },
  {
    "number": 20,
    "type": "주장",
    "title": "습관 형성에서 편리성의 영향",
    "answer": "⑤",
    "passage": "People often ask me, \"What surprises you most about\nhabits?\" One thing that continually astonishes me is the\ndegree to which we're influenced by sheer convenience. The\namount of effort, time, or decision making required by an\naction has a huge influence on habit formation. To a truly\nremarkable extent, we're more likely to do something if it's\nconvenient, and less likely if it's not. For this reason, we\nshould pay close attention to the convenience of any activity\nwe want to make into a habit. Putting a wastebasket next to\nour front door made mail sorting slightly more convenient,\nand I stopped procrastinating with this chore. Many people\nreport that they do a much better job of staying close to\ndistant family members now that tools like group chats make\nit easy to stay in touch.",
    "translation": "사람들은 종종 나에게, \"습관에 관한 무엇이 당신을\n가장 놀라게 하나요?\"라고 묻는다. 나를 계속해서 놀라\n게 하는 한 가지는 우리가 순전한 편리성에 의해 영향\n을 받는 정도이다. 행동에 의해 요구되는 노력, 시간,\n또는 의사결정의 양이 습관 형성에 큰 영향을 미친다.\n정말 놀라울 정도로, 우리는 어떤 일이 편리하다면 그\n것을 더 자주 할 것이고, 그렇지 않다면 덜 하게 될 것\n이다. 이런 이유로, 우리는 습관으로 만들고 싶은 행동\n의 편리성에 세심한 주의를 기울여야 한다. 현관문 옆\n에 쓰레기통을 두는 것이 우편물을 분류하는 일을 약간\n더 편리하게 했고, 나는 이 일을 미루는 것을 멈추었다.\n많은 사람들은 그룹 채팅 같은 도구들이 연락을 유지하\n는 것을 쉽게 만들어 주기 때문에 멀리 사는 가족들과\n더 가까이 지내는 일을 훨씬 더 잘한다고 말한다.",
    "grammar": [
      "the degree to which S+V: ~하는 정도",
      "be likely to V: ~할 가능성이 있다",
      "make A into B: A를 B로 만들다",
      "now that S+V: 이제 ~이므로"
    ],
    "vocab": [
      {
        "word": "habit formation",
        "meaning": "습관 형성"
      },
      {
        "word": "convenience",
        "meaning": "편리성"
      },
      {
        "word": "remarkable",
        "meaning": "놀라운"
      },
      {
        "word": "wastebasket",
        "meaning": "쓰레기통"
      },
      {
        "word": "procrastinate",
        "meaning": "미루다"
      }
    ]
  },
  {
    "number": 21,
    "type": "함축 의미",
    "title": "행동이 신념을 형성할 수 있음",
    "answer": "②",
    "passage": "It is common sense that people's inner beliefs may drive\ntheir external behavior. If you're attracted to a certain\nperson, you should be more likely to socialize with that\nperson. If you favor a brand of toothpaste, you're more\nlikely to buy it. Of course, our internal thoughts don't always\npredict our public behavior, but, overall, what we do\nobviously reflects what we think. But beliefs and behaviors\nare also related in a more remarkable way. It turns out that\nthe arrow is as likely to point in the reverse direction. As\nsocial\npsychologist\nDavid\nMyers\nobserves,\n\"If\nsocial\npsychology has taught us anything during the last 25 years,\nit is that we are likely not only to think ourselves into a\nway of acting but also to act ourselves into a way of\nthinking.\"",
    "translation": "사람들의 내적 신념이 그들의 외적인 행동을 이끌 수\n있다는 것은 상식이다. 만약 당신이 어떤 사람에게 끌\n린다면, 당신은 그 사람과 더 어울리려고 할 것이다. 만\n약 당신이 한 브랜드의 치약을 선호한다면, 당신이 그\n것을 구매할 가능성은 더 높다. 물론, 우리의 내적 사고\n가 항상 공개적인 행동을 예측하지는 않지만, 전반적으\n로, 우리가 하는 것은 분명히 우리가 생각하는 바를 반\n영한다. 그러나 신념과 행동은 이보다 더 놀라운 방식\n으로도 관련이 있다. 화살이 반대 방향을 가리킬 가능\n성이 그만큼 높다는 것이 드러난다. 사회 심리학자\nDavid Myers가 말한 바에 따르면, \"지난 25년간 사회 심리학이 우리에게 가르쳐준 것이 있다면, 그것은 우리\n가 생각하여 행동 방식에 이를 뿐만 아니라 우리가 행\n동하여 사고 방식에 이를 가능성도 있다는 것이다.\"",
    "grammar": [
      "It is common sense that S+V: ~라는 것은 상식이다",
      "be likely to V: ~할 가능성이 있다",
      "not only A but also B: A뿐만 아니라 B도",
      "think oneself into / act oneself into: 생각/행동을 통해 어떤 상태가 되다"
    ],
    "vocab": [
      {
        "word": "inner belief",
        "meaning": "내적 신념"
      },
      {
        "word": "external behavior",
        "meaning": "외적 행동"
      },
      {
        "word": "socialize",
        "meaning": "어울리다"
      },
      {
        "word": "reflect",
        "meaning": "반영하다"
      },
      {
        "word": "remarkable",
        "meaning": "주목할 만한"
      }
    ]
  },
  {
    "number": 22,
    "type": "요지",
    "title": "말을 줄일수록 더 잘 듣게 됨",
    "answer": "①",
    "passage": "Imagine following the spirit of a silence vow into daily\nlife. Challenge yourself to spend an entire day saying only\nwhat you absolutely must say. It's been widely observed by\nbehavioral psychology experts - and anyone who's ever been\non\na\nfirst\ndate - that\nwe\ntoo\noften\ntend\nto\ntreat\n\"conversation\" as a game of waiting for our own turn to\nspeak. We miss what's being said because we're mentally\nrehearsing our next utterance. What if you could eliminate\nthe idea that the next available mini-silence is your next\nopening to express whatever is in your head? What if you\nwere limited to, say, fifty spoken words tomorrow? I think\nyou'd listen quite differently. You'd attend quite carefully to\nevery word you heard. You'd be attuned to what you must\nrespond to. You might discover that the less you say, the\nmore you hear.",
    "translation": "일상생활에서 침묵 서약의 정신을 따르는 것을 상상\n해 보라. 반드시 말해야 할 것만 말하는 데 하루 온종\n일을 보내는 것에 스스로 도전해 보라. 우리가 너무나\n자주 \"대화\"를 자신이 말할 차례를 기다리는 게임처럼\n여기는 경향이 있다는 것이 행동 심리학 전문가들- 그\n리고 첫 데이트를 해 본 적이 있는 누구든지- 에 의해\n널리 관찰되어 왔다. 우리는 다음 발언을 머릿속으로\n연습하느라 말해지고 있는 것을 놓친다. 만약 당신이\n그 다음에 오는 작은 침묵이 당신의 머릿속에 있는 무\n엇이든지를 표현할 그 다음 시작이라는 생각을 없앨 수\n있다면 어떨까? 내일 당신이 말을, 이를테면, 50단어로\n제한받는다면 어떨까? 나는 당신이 매우 다르게 듣게\n될 것이라고 생각한다. 당신은 당신이 듣는 모든 단어\n에 매우 신중히 귀를 기울이게 될 것이다. 당신이 반드\n시 응답해야 할 것에 맞춰질 것이다. 당신은 말을 줄일\n수록, 더 많이 듣게 된다는 것을 발견할지도 모른다.",
    "grammar": [
      "Challenge yourself to V: 스스로 ~하도록 도전하다",
      "It has been observed that S+V: ~라고 관찰되어 왔다",
      "tend to V: ~하는 경향이 있다",
      "the 비교급, the 비교급: ~할수록 더 ~하다"
    ],
    "vocab": [
      {
        "word": "silence vow",
        "meaning": "침묵 서약"
      },
      {
        "word": "utterance",
        "meaning": "발언"
      },
      {
        "word": "rehearse",
        "meaning": "연습하다"
      },
      {
        "word": "eliminate",
        "meaning": "제거하다"
      },
      {
        "word": "attuned to",
        "meaning": "~에 맞춰진"
      }
    ]
  },
  {
    "number": 23,
    "type": "주제",
    "title": "과학 지식은 행동으로 옮겨야 문제를 해결함",
    "answer": "⑤",
    "passage": "Science is concerned with accumulating and understanding\nobservations of the physical world. That understanding alone\nsolves no problems. Individual people have to act on that\nunderstanding for it to help solve problems. For instance,\nscience has found that regular exercise can lower your risk\nof heart disease. Knowing this fact is interesting, but it will\ndo nothing for your personal health unless you act on it and\nactually exercise. And that's the hard part. Reading an\narticle about exercise is easy. Getting into an actual routine\nof regular exercise is harder. In this sense, science really\nsolves no problems at all. Problems are only solved when\npeople take the knowledge provided by science and use it.\nIn fact, many of humanity's biggest problems are caused by\nlack of action, and not lack of knowledge.",
    "translation": "과학은 물리적 세계에 대한 관찰을 축적하고 이해하\n는 것과 관련이 있다. 그 이해 단독으로는 어떠한 문제\n도 해결하지 않는다. 개개인은 그것이 문제를 해결하는\n것을 돕기 위해 그 이해를 행동으로 옮겨야 한다. 예를\n들어, 과학은 규칙적인 운동이 심장병의 위험을 낮출\n수 있다는 것을 발견했다. 이러한 사실을 아는 것은 흥\n미롭지만, 당신이 이를 행동으로 옮겨 실제로 운동하지\n않는다면 그것은 당신의 개인 건강에 아무런 도움이 되\n지 않는다. 그리고 바로 이 점이 어려운 부분이다. 운동\n에 대한 기사를 읽는 것은 쉽다. 규칙적인 운동의 실제\n적인 루틴을 형성하는 것은 더 어렵다. 이러한 점에서,\n과학은 사실 어떤 문제도 해결하지 않는다. 문제는 사\n람들이 과학에 의해 제공된 지식을 취하고 그것을 사용\n할 때만 해결된다. 실제로, 인류의 가장 큰 문제들 중\n다수는 지식의 부족이 아니라, 행동의 부족에 의해 야\n기된다.",
    "grammar": [
      "be concerned with: ~와 관련되다",
      "unless S+V: ~하지 않는다면",
      "getting into an actual routine: 동명사구 주어",
      "when people take...and use it: 시간/조건의 when"
    ],
    "vocab": [
      {
        "word": "accumulate",
        "meaning": "축적하다"
      },
      {
        "word": "observation",
        "meaning": "관찰"
      },
      {
        "word": "routine",
        "meaning": "규칙적 습관"
      },
      {
        "word": "provided by science",
        "meaning": "과학이 제공한"
      },
      {
        "word": "lack of action",
        "meaning": "행동의 부족"
      }
    ]
  },
  {
    "number": 24,
    "type": "제목",
    "title": "현실은 각자의 해석에 따라 다르게 보임",
    "answer": "①",
    "passage": "We think we're being logical, objective, and rational - and\ntherefore accurate in our analysis, judgment, and decisions.\nSo we think that if other people are logical, objective, and\nrational, they will agree with us and see what we see. But\nthe opposite is the case. Every human brain is different.\nEveryone's life experience is different. Everyone's desires\nand knowledge are different. You might think you're being\nrealistic - that is, that your ideas match reality, but that's\nimpossible. It's only your interpretation of reality, which will\nalways be different from someone else's. When two nations\nplay each other in the World Cup, the fans of each country\ncriticize the referees for missing all the infractions that the\nother team commits. Without fail, each fan base believes\nthat the referees are biased against their team.",
    "translation": "우리는 우리가 논리적이고 객관적이며 합리적이고-\n그러므로 분석, 판단, 그리고 결정에 있어서 정확하다고\n생각한다. 따라서 우리는 다른 사람들이 논리적이고 객\n관적이며 합리적이라면, 그들이 우리에게 동의하고 우\n리가 보는 것을 볼 것이라고 생각한다. 하지만 그 반대\n가 사실이다. 모든 사람의 뇌는 다르다. 모두의 인생 경\n험은 다르다. 모두의 욕망과 지식은 다르다. 당신은 당\n신이 현실적이라고- 즉, 당신의 생각이 현실과 일치한\n다고 생각할 수 있지만, 그것은 불가능하다. 그것은 현\n실에 대한 당신의 해석일 뿐이며, 다른 사람의 것과 항\n상 다를 것이다. World Cup에서 두 나라가 서로 경기\n를 할 때, 각 나라의 팬들은 상대 팀이 저지르는 모든\n반칙을 놓친 것에 대해 심판들을 비난한다. 어김없이,\n각 팬층은 심판이 자기 팀에 불리하게 편파적이라고 믿\n는다.",
    "grammar": [
      "We think (that)...: 목적어절 반복 구조",
      "that is: 즉, 다시 말해",
      "what we see: 선행사를 포함하는 관계대명사 what",
      "Without fail: 반드시, 어김없이"
    ],
    "vocab": [
      {
        "word": "logical",
        "meaning": "논리적인"
      },
      {
        "word": "objective",
        "meaning": "객관적인"
      },
      {
        "word": "rational",
        "meaning": "합리적인"
      },
      {
        "word": "interpretation",
        "meaning": "해석"
      },
      {
        "word": "biased",
        "meaning": "편향된"
      }
    ]
  },
  {
    "number": 25,
    "type": "도표 불일치",
    "title": "유럽 국가별 온라인 소매 거래 비율",
    "answer": "④",
    "passage": "The graph above shows the online share of retail trade in selected European countries in 2018 and 2019. In 2019, the United Kingdom recorded the highest online share of retail trade, reaching 19.2 percent. The Netherlands showed the largest increase in its online share of retail trade among the countries from 2018 to 2019, with a jump of over 6 percentage points. In 2018, Germany had a higher online share of retail trade than the Netherlands, whereas, in 2019, Germany fell behind the Netherlands. In 2018, Germany's online share of retail trade was over four times higher than that of Spain. Among the five countries, Italy recorded the lowest online share of retail trade in both 2018 and 2019.",
    "translation": "위 그래프는 선정된 유럽 국가들에서 2018년과 2019\n년에 소매 거래에서의 온라인 점유율을 보여준다. 2019\n년에, 영국은 19.2퍼센트에 달하며, 소매 거래에서 가장\n높은 온라인 점유율을 기록하였다. 네덜란드는 2018년\n부터 2019년까지 소매 거래에서의 온라인 점유율이 6\n퍼센트포인트 넘게 증가하여, 국가들 중 가장 큰 증가\n를 보였다. 2018년에는, 독일은 네덜란드보다 소매 거\n래에서 더 높은 온라인 점유율을 가졌으나, 2019년에\n는, 독일은 네덜란드에 뒤처졌다. 2018년에, 독일의 소\n매 거래에서의 온라인 점유율은 스페인의 그것보다 네\n배 넘게 높았다. 다섯 국가들 중, 이탈리아는 2018년과\n2019년 모두 소매 거래에서 가장 낮은 온라인 점유율\n을 기록하였다.",
    "grammar": [
      "the online share of retail trade: 전치사 of로 명사 연결",
      "whereas: 반면에",
      "over four times higher than: ~보다 네 배 넘게 높은",
      "among the five countries: 범위 한정 표현"
    ],
    "vocab": [
      {
        "word": "retail trade",
        "meaning": "소매 거래"
      },
      {
        "word": "selected",
        "meaning": "선정된"
      },
      {
        "word": "record",
        "meaning": "기록하다"
      },
      {
        "word": "increase",
        "meaning": "증가"
      },
      {
        "word": "percentage point",
        "meaning": "퍼센트포인트"
      }
    ]
  },
  {
    "number": 26,
    "type": "내용 불일치",
    "title": "Edward O. Wilson의 생애와 연구",
    "answer": "④",
    "passage": "Edward O. Wilson was born in Birmingham, Alabama, in\n1929. In his early childhood, he became interested in nature\nand spent much time in the outdoors. At age seven, he was\npartially blinded in a fishing accident; his reduced sight led\nWilson to the study of ants. He could not observe larger\nanimals from a distance. Instead, he concentrated on smaller\ncreatures\nhe\ncould\nstudy\nup\nclose.\nAfter\nstudying\nevolutionary biology at the University of Alabama, Wilson\ntransferred to Harvard University, where he became a\nprofessor in 1956. He never received a Nobel Prize - the\nprize didn't recognize research in the field of evolutionary\nbiology. However, he was awarded the Crafoord Prize in\n1990. Wilson, known to some as the \"modern-day Darwin\",\ndied at the age of 92 in Massachusetts.",
    "translation": "Edward O. Wilson은 1929년 Alabama주 Birmingham\n에서 태어났다. 어린 시절에, 그는 자연에 관심을 갖게\n되었고 야외에서 많은 시간을 보냈다. 7살 때, 그는 낚\n시 사고로 부분적으로 실명했고; 그의 좁아진 시야는\nWilson을 개미 연구로 이끌었다. 그는 멀리서 더 큰 동\n물을 관찰할 수 없었다. 대신, 그는 가까이에서 연구할\n수 있는 더 작은 생물에 집중했다. Alabama 대학에서\n진화 생물학을 공부한 후, Wilson은 Harvard 대학으로\n옮겼고, 그곳에서 1956년에 교수가 되었다. 그는 Nobel\nPrize를 받지 못했다- 그 상은 진화생물학 분야의 연구\n를 인정하지 않았다. 그러나, 그는 1990년에 Crafoord\nPrize를 수상하였다. 몇몇에게 \"현대의 Darwin\"으로 알\n려진 Wilson은 Massachusetts에서 92세에 사망했다.",
    "grammar": [
      "At age seven: 나이를 나타내는 전치사구",
      "led A to B: A를 B로 이끌다",
      "where he became...: 계속적 용법의 관계부사",
      "known to some as...: 분사구문/후치수식"
    ],
    "vocab": [
      {
        "word": "partially",
        "meaning": "부분적으로"
      },
      {
        "word": "blinded",
        "meaning": "실명한"
      },
      {
        "word": "evolutionary biology",
        "meaning": "진화 생물학"
      },
      {
        "word": "professor",
        "meaning": "교수"
      },
      {
        "word": "modern-day",
        "meaning": "현대의"
      }
    ]
  },
  {
    "number": 27,
    "type": "실용문 불일치",
    "title": "Houseplant Heaven 팝업 숍 안내",
    "answer": "③",
    "passage": "Houseplant Heaven Pop-up Shop\n Enjoy a special plant shopping experience! Explore\nbeautiful houseplants, and bring some green into your home.\nWhen: October 11 ‒ 13, 10 a.m. ‒ 8 p.m.\nWhere: Tasty Cup Cafe\nDetails\n-Indoor plants are available for purchase.\n-If you buy 2 plants, you will get a 50% discount on coffee.\nActivities\n-Take pictures in a photo zone filled with unique plants.\n-Decorate eco-friendly pots made from recycled glass.\n※ Outside food and drinks are not allowed.",
    "translation": "실내 식물 천국 팝업 숍\n특별한 식물 쇼핑 경험을 즐겨보세요! 아름다운 실내\n식물들을 구경하고, 당신의 집으로 초록을 가져가세요.\n언제: 10월 11 ‒ 13일, 오전 10시‒ 오후 8시\n어디서: Tasty Cup Cafe\n세부 사항\n∙실내 식물이 구매 가능합니다.\n∙식물을 2개 사면, 커피를 50% 할인 받을 것입니다.\n활동\n∙독특한 식물로 가득 찬 포토존에서 사진을 찍으세요.\n∙재활용 유리로 만든 친환경 화분들을 장식하세요.\n※ 외부 음식과 음료는 허용되지 않습니다.",
    "grammar": [
      "are available for purchase: 구매 가능하다",
      "If you buy..., you will get...: 조건문",
      "made from recycled glass: 과거분사 후치수식",
      "Outside food and drinks are not allowed: 수동태"
    ],
    "vocab": [
      {
        "word": "houseplant",
        "meaning": "실내 식물"
      },
      {
        "word": "purchase",
        "meaning": "구매"
      },
      {
        "word": "discount",
        "meaning": "할인"
      },
      {
        "word": "eco-friendly",
        "meaning": "친환경적인"
      },
      {
        "word": "recycled glass",
        "meaning": "재활용 유리"
      }
    ]
  },
  {
    "number": 28,
    "type": "실용문 일치",
    "title": "Summer Cartoon Festival 안내",
    "answer": "④",
    "passage": "2025 Summer Cartoon Festival\n It's the 8th annual Summer Cartoon Festival! The\nfestival drew a lot of visitors last year. Why not be one\nof them this year?\nDates: July 5 ‒ 6\nTime: 9 a.m. ‒ 6 p.m.\nPlace: Merryville Park\nFeatured Events\n-Cartoon drawing classes for beginners only\n-Face painting by cartoonists\n-Parade of costumed characters\nNotes\n-All visitors will receive character stickers.\n-For a more detailed timetable and other information,\ncheck out www.SummerCartoonFest.com.",
    "translation": "2025 여름 만화 축제\n제8회 연례 여름 만화 축제입니다! 이 축제는 작년\n에 많은 방문객을 끌었습니다. 여러분도 올해 그 중 한\n명이 되어보는 것은 어떨까요?\n날짜: 7월 5일‒ 6일\n시간: 오전 9시‒ 오후 6시\n장소: Merryville Park\n주요 이벤트\n∙초급자만을 위한 만화 그리기 수업\n∙만화가에 의한 페이스 페인팅\n∙의상을 갖춰 입은 캐릭터의 퍼레이드\n참고 사항\n∙모든 방문객들은 캐릭터 스티커를 받을 것입니다.\n∙더\n자세한\n시간표와\n기타\n정보를\n위해서,\nwww.SummerCartoonFest.com을 확인하세요.",
    "grammar": [
      "the 8th annual: 제8회 연례",
      "Why not V?: ~하는 게 어때?",
      "for beginners only: 초급자만을 위한",
      "All visitors will receive...: 미래 시제 안내문"
    ],
    "vocab": [
      {
        "word": "annual",
        "meaning": "연례의"
      },
      {
        "word": "draw visitors",
        "meaning": "방문객을 끌다"
      },
      {
        "word": "featured event",
        "meaning": "주요 행사"
      },
      {
        "word": "costumed",
        "meaning": "의상을 갖춘"
      },
      {
        "word": "detailed timetable",
        "meaning": "자세한 시간표"
      }
    ]
  },
  {
    "number": 29,
    "type": "어법",
    "title": "전문가의 깊고 조직화된 이해",
    "answer": "③",
    "passage": "Studies of experts provide insight into ①what it means to\nhave deep and flexible understanding. Experts in a particular\ndomain are people who have deep, richly interconnected ideas\nabout the world. They are not just good thinkers or people\nwho are ②exceptionally smart. Rather, experts ③having\nknowledge in a specific domain - such as chess, chemistry,\nor tennis - and are not generalists. However, experts do not\njust know \"a bunch of facts.\" In fact, having expertise in a\ntopic means ④that knowledge is organized into coherent\nframeworks, and the expert understands the inter-relationship\nbetween facts and can distinguish which ideas are most\ncentral. This kind of deep but organized understanding allows\nfor greater flexibility in learning and ⑤facilitates application\nacross multiple contexts.",
    "translation": "전문가에 대한 연구는 깊고 유연한 이해를 가지는 것\n이 무엇을 의미하는지에 대한 통찰을 제공한다. 특정\n분야의 전문가는 세상에 대해 깊고 풍부하게 상호 연결\n된 생각을 가진 사람들이다. 그들은 단순히 생각을 잘\n하는 사람이거나 유난히 똑똑한 사람이 아니다. 오히려,\n전문가는 특정 분야- 체스, 화학, 또는 테니스와 같은\n- 에서 지식을 가지고 있고, 다방면의 지식을 가진 사\n람이 아니다. 그러나, 전문가는 \"많은 사실\"을 알기만\n하는 것은 아니다. 사실, 한 주제에 대한 전문성이 있다\n는 것은 지식이 일관된 틀로 조직화되어 있고, 전문가\n가 사실 간의 상호 관계를 이해하고 어떤 아이디어가\n가장 핵심적인지 구분할 수 있다는 것을 의미한다. 이\n러한 깊이 있으면서도 조직화된 이해는 학습에서의 더\n큰 유연성을 가능하게 하고 다양한 맥락에 걸쳐 적용을\n촉진한다.",
    "grammar": [
      "provide insight into what it means: 전치사 into 뒤 명사절",
      "experts have knowledge and are not generalists가 되어야 하므로 having은 have로 수정",
      "means that S+V: ~라는 것을 의미하다",
      "allows for + 명사: ~을 가능하게 하다"
    ],
    "vocab": [
      {
        "word": "expert",
        "meaning": "전문가"
      },
      {
        "word": "domain",
        "meaning": "분야"
      },
      {
        "word": "interconnected",
        "meaning": "상호 연결된"
      },
      {
        "word": "expertise",
        "meaning": "전문성"
      },
      {
        "word": "coherent framework",
        "meaning": "일관된 틀"
      }
    ]
  },
  {
    "number": 30,
    "type": "문맥 어휘",
    "title": "생태학적 오류와 잘못된 인과 추론",
    "answer": "④",
    "passage": "It is natural for people to observe happenings and then\nseek explanations for why those happenings occurred. But\nsometimes the reasoning is ①wrong because of one or more\nmisconceptions. One of these is the ecological fallacy, where\nan argument claims that there is a causal relationship\nbetween two things merely because they occur ②together.\nFor example, in the 1950s it was found that crime rates were\nthe highest in neighborhoods where immigrants were most\nnumerous. Some people used this \"co-occurrence\" to argue\nthat immigrants were a ③cause of crime. But a careful\nanalysis of this situation revealed that immigrants were\nforced to live in neighborhoods where crime rates were\nalready ④low; they could not afford more expensive housing\nin safer neighborhoods. Immigrants themselves committed\nvery few of the crimes. Unless you analyze the claim\ncarefully, you would ⑤misinterpret the relationship and\nthereby construct a faulty belief.",
    "translation": "사람들이 사건들을 관찰하고 나서 왜 그런 사건들이\n일어났는지에 대한 설명을 찾는 것은 당연하다. 그러나\n때로는 하나 또는 그 이상의 오해로 인해 추론이 잘못\n된다. 그 중 하나는 생태학적 오류로, 여기서 논지는 두\n가지가 함께 발생한다는 이유만으로 두 가지 사이에 인\n과 관계가 있다는 것이다. 예를 들어, 1950년대에 범죄\n율이 이민자가 가장 많은 지역에서 가장 높다는 것이\n밝혀졌다. 일부 사람들은 이민자들이 범죄의 원인이라\n고 주장하기 위해서 이러한 \"동시 발생\"을 이용했다. 그\n러나 이 상황에 대한 면밀한 분석은 이민자들이 이미\n범죄율이 낮은(→높은) 지역에 거주할 수밖에 없었다는\n것을 밝혀냈다; 그들은 보다 안전한 지역의 더 비싼 주\n택을 살 여력이 없었다. 이민자 자신들은 범죄를 거의\n저지르지 않았다. 그 주장을 주의 깊게 분석하지 않으\n면, 당신은 그 관계를 잘못 해석하여 잘못된 믿음을 형\n성할 수 있다.",
    "grammar": [
      "where an argument claims...: 관계부사 where",
      "because they occur together: 이유 부사절",
      "revealed that S+V: that절 목적어",
      "Unless you analyze...: 조건 부사절"
    ],
    "vocab": [
      {
        "word": "misconception",
        "meaning": "오해"
      },
      {
        "word": "ecological fallacy",
        "meaning": "생태학적 오류"
      },
      {
        "word": "causal relationship",
        "meaning": "인과 관계"
      },
      {
        "word": "immigrant",
        "meaning": "이민자"
      },
      {
        "word": "faulty belief",
        "meaning": "잘못된 믿음"
      }
    ]
  },
  {
    "number": 31,
    "type": "빈칸",
    "title": "주의를 예측하는 이전 경험",
    "answer": "②",
    "passage": "In everyday life, we use ______ to predict\nwhere we should pay attention. Different environments\ncreate different expectations. This was profoundly illustrated\nby the scientist Jared Diamond in his book Guns, Germs, and\nSteel. He describes an adventure wandering through the\nNew Guinea jungle with native New Guineans. He relates\nthat these natives tend to perform poorly at tasks\nWesterners have been trained to do since childhood. But\nthey are hardly stupid. They can detect the most subtle\nchanges in the jungle, good for following the tracks of a\npredator or for finding the way back home. They know\nwhich insects to leave alone, know where food exists, can\nbuild and tear down shelters with ease. Diamond, who had\nnever spent time in such places, has no ability to pay\nattention to these things. Were he to be tested on such\ntasks, he also would perform poorly.",
    "translation": "일상생활에서, 우리는 어디에 집중해야 할지를 예측\n하기 위해 이전 경험을 사용한다. 다른 환경은 다른 기\n대를 만든다. 이것은 과학자 Jared Diamond에 의해 그\n의 저서인 Guns, Germs, and Steel에서 깊이 있게 설\n명되었다. 그는 New Guinea 정글을 New Guinea 원주\n민들과 함께 돌아다닌 모험을 묘사한다. 그는 서구인들\n이 어린 시절부터 훈련받아 온 과업을 이 원주민들이\n잘 수행하지 못하는 경향이 있다고 말한다. 하지만 그\n들이 멍청한 것은 아니다. 그들은 정글에서 가장 미묘\n한 변화를 감지할 수 있는데, 이는 포식자의 흔적을 추\n적하거나 집으로 돌아오는 길을 찾는 데 유용하다. 그\n들은 어느 곤충을 내버려 두어야 할지 알며, 어디에 음\n식이 있는지 알고, 피난처를 쉽게 만들고 철거할 수 있다.\n그러한 장소에서 시간을 보내본 적이 없는 Diamond는\n이러한 것들에 주의를 기울일 수 있는 능력이 없다. 그\n가 그런 과업들에 대해 시험을 본다면, 그 역시 잘하지\n못할 것이다.",
    "grammar": [
      "use A to V: ~하기 위해 A를 사용하다",
      "tasks Westerners have been trained to do: 목적격 관계대명사 생략",
      "Were he to be tested...: If he were to be tested의 도치",
      "hardly stupid: 결코 멍청하지 않다"
    ],
    "vocab": [
      {
        "word": "previous experience",
        "meaning": "이전 경험"
      },
      {
        "word": "profoundly",
        "meaning": "깊이 있게"
      },
      {
        "word": "subtle",
        "meaning": "미묘한"
      },
      {
        "word": "predator",
        "meaning": "포식자"
      },
      {
        "word": "shelter",
        "meaning": "피난처"
      }
    ]
  },
  {
    "number": 32,
    "type": "빈칸",
    "title": "신제품 출시와 초기 가격 희생",
    "answer": "①",
    "passage": "Most entrepreneurs put in tremendous amounts of time\nand effort in creating and launching new products and\nservices and then make the mistake of overpricing them.\nThey have created something they care deeply about, it's\ntheirs, and this powerful sense of ownership distorts their\nperception of value which causes them to overprice their\nproducts. While many of them are quick to realize that their\ninitial prices are too high, not all these people are happy or\nwilling to drop their prices to make their products more\nattractive. And this can be a very costly mistake that\nmay lead to the failure of their new business. When you\nlaunch a new product or service, your priority should be\nto get sufficient market adoption as soon as possible and\nyou should be ready to ______ to achieve this aim. Once you have strong sales volumes,\nyou can increase your prices to maximize your profits.",
    "translation": "대부분의 기업가들은 새로운 제품과 서비스를 만들고\n출시하는 데 엄청난 시간과 노력을 들이며, 그런 다음\n그것들의 가격을 너무 비싸게 책정하는 실수를 저지른\n다. 그들은 자신이 매우 소중히 여기는 무언가를 만들\n었고, 그것은 그들의 것이며, 이 강한 소유감은 가치에\n대한 그들의 인식을 왜곡시켜 그들의 제품 가격을 너무\n높게 책정하게 만든다. 그들 중에 많은 이들은 그들의\n초기 가격이 너무 높다는 것을 빠르게 깨닫기는 하지\n만, 이 모든 사람들이 그들의 제품을 더 매력적으로 만\n들기 위해 가격을 낮추는 것을 좋아하거나 내켜하지는\n않는다. 그리고 이것은 그들의 새로운 사업의 실패를\n초래할 수 있는 손해가 매우 큰 실수가 될 수 있다. 새\n로운 제품이나 서비스를 출시할 때, 당신의 우선순위는\n가능한 빨리 충분한 시장 점유를 확보하는 것이어야 하\n며, 당신이 이 목표를 달성하기 위해서는 당신의 초기\n가격과 수익을 희생할 준비가 되어 있어야 한다. 일단\n당신이 높은 판매량을 확보하게 되면, 당신은 수익을\n극대화하기 위해 가격을 인상할 수 있다.",
    "grammar": [
      "make the mistake of -ing: ~하는 실수를 하다",
      "which causes them to...: 앞 절 전체를 받는 관계절",
      "not all: 부분 부정",
      "be ready to V: ~할 준비가 되어 있다"
    ],
    "vocab": [
      {
        "word": "entrepreneur",
        "meaning": "기업가"
      },
      {
        "word": "overprice",
        "meaning": "가격을 너무 높게 매기다"
      },
      {
        "word": "distort",
        "meaning": "왜곡하다"
      },
      {
        "word": "market adoption",
        "meaning": "시장 채택/점유"
      },
      {
        "word": "sales volume",
        "meaning": "판매량"
      }
    ]
  },
  {
    "number": 33,
    "type": "빈칸",
    "title": "적게 낳고 많이 투자하는 번식 전략",
    "answer": "②",
    "passage": "In most respects, humans are one of a relatively small\nnumber of species that evolved a very different strategy of ______. Like apes\nand elephants, we mature at a leisurely pace, grow large\nbodies, and have few babies but devote much time and\nenergy to raising them well. This unusual strategy succeeds\nbecause while apes and elephants produce fewer babies than\nmice, a larger percentage of their offspring survive to then\nreproduce. A house mouse can become a mother when she is\njust five weeks old, has four to ten pups per litter, and can\nhave a new litter every two months over the course of her\napproximately twelve-month life. However, the vast majority\nof her pups die young. In contrast, a chimp or elephant\nmother does not reproduce until she is at least twelve years\nold, and she gives birth to only one infant every five or six\nyears over the next thirty or so years. About half of these\noffspring make it to becoming parents.",
    "translation": "대부분의 측면에서, 인간은 더 많은 에너지를 투자하\n여 더 천천히 번식하는 매우 다른 전략을 진화시킨 비\n교적 소수의 종들 중 하나이다. 유인원과 코끼리와 마\n찬가지로, 우리는 천천히 성숙하고, 몸집을 크게 키우\n며, 새끼들을 적게 낳지만 그들을 잘 키우는 데 많은\n시간과 에너지를 투자한다. 유인원과 코끼리는 생쥐보\n다 더 적은 수의 새끼를 낳지만, 그들의 새끼 중 더 높\n은 비율이 살아남아서 번식하기 때문에 이 특이한 전략\n은 성공한다. 생쥐는 생후 5주 만에 어미가 될 수 있으\n며, 한 배에서 4마리에서 10마리의 새끼를 낳고, 약 12\n개월의 생애 동안 2개월마다 새로운 새끼들을 낳을 수\n있다. 그러나, 그의 새끼 대부분은 어릴 때 죽는다. 반\n면, 침팬지나 코끼리 어미는 최소 12살이 될 때까지 번\n식을 하지 않으며, 이후 30년 정도에 걸쳐 5년 또는 6\n년마다 단 한 마리의 새끼만 낳는다. 이러한 새끼 중\n절반 정도가 부모가 되는 데 성공한다.",
    "grammar": [
      "one of a relatively small number of species: ~중 하나",
      "devote A to -ing: A를 ~하는 데 바치다",
      "while: 대조를 나타내는 접속사",
      "make it to -ing: ~에 이르다"
    ],
    "vocab": [
      {
        "word": "species",
        "meaning": "종"
      },
      {
        "word": "reproduction",
        "meaning": "번식"
      },
      {
        "word": "mature",
        "meaning": "성숙하다"
      },
      {
        "word": "offspring",
        "meaning": "자손"
      },
      {
        "word": "approximately",
        "meaning": "대략"
      }
    ]
  },
  {
    "number": 34,
    "type": "빈칸",
    "title": "과학 연구의 공개와 상호 의존",
    "answer": "⑤",
    "passage": "When scientists make an important new discovery or\nexperimentally prove some hypothesis, they do not, in\ngeneral, keep that information to themselves so that they\nalone can consider its meaning and derive additional theories\nfrom it. Instead, they publish their results and make their\ndata available for inspection. This makes it possible for\nother scientists to reconsider their data and possibly refute\ntheir conclusions. More important, though, it makes it\npossible for other scientists to use that data to construct\nnew hypotheses and perform new experiments. The assumption\nis that society as a whole will end up knowing more if\ninformation is spread as widely as possible, rather than\nbeing limited to a few people. In a strict sense, every scientist ______.",
    "translation": "과학자들은 중요한 새로운 발견을 하거나 실험적으로\n어떤 가설을 증명할 때, 일반적으로, 그들은 그것의 의\n미를 혼자서 고려하고 그것으로부터 추가적인 이론을\n도출할 수 있도록 그 정보를 자기만 가지고 있지 않는\n다. 대신에, 그들은 자신의 결과를 발표하고 그들의 데\n이터가 점검 가능하도록 한다. 이것은 다른 과학자들이\n그들의 데이터를 재고하게 하고 어쩌면 그들의 결론을\n반박하는 것을 가능하게 한다. 하지만, 더 중요한 것은\n이것이 다른 과학자들이 새로운 가설들을 세우고 새로\n운 실험들을 수행하기 위하여 그 데이터를 사용하는 것\n을 가능하도록 한다는 것이다. 가정은 만약 정보가 소\n수의 사람들에게 제한되기보다 가능한 한 널리 확산되면\n결국 사회 전체가 더 많은 것을 알게 될 것이라는 것이\n다. 엄밀한 의미에서, 모든 과학자는 다른 과학자들의\n연구에 의존한다.",
    "grammar": [
      "make O available for inspection: O를 점검 가능하게 하다",
      "This makes it possible for A to V: A가 ~하는 것을 가능하게 하다",
      "rather than -ing: ~하기보다는",
      "In a strict sense: 엄밀한 의미에서"
    ],
    "vocab": [
      {
        "word": "hypothesis",
        "meaning": "가설"
      },
      {
        "word": "derive",
        "meaning": "도출하다"
      },
      {
        "word": "publish",
        "meaning": "발표하다"
      },
      {
        "word": "refute",
        "meaning": "반박하다"
      },
      {
        "word": "assumption",
        "meaning": "가정"
      }
    ]
  },
  {
    "number": 35,
    "type": "무관한 문장",
    "title": "기억은 과거 경험을 바탕으로 재구성됨",
    "answer": "③",
    "passage": "In the 1930s, the British psychologist Sir Frederic Bartlett\nasked people to listen to folktales from other countries and\nthen recall these stories at a later date. As you might\nguess, unfamiliar stories were not remembered as well as\nfamiliar stories. ①Surprisingly, however, errors in memory\nwere not random. ②Rather, subjects often rewrote similar\nparts of the stories in their own minds - particularly the\nparts that made the least sense to them. ③To attract a\nwide audience, stories should focus on topics that interest\nmany people. ④Bartlett concluded that when facing problems,\nhumans draw upon mental schemata, or shelves of stored\nknowledge in our brains, to fill in any minor gaps in our\nmemories. ⑤Therefore, remembering is an imaginative\nprocess that involves building upon past experiences.",
    "translation": "1930년대에, 영국의 심리학자 Frederic Bartlett 경은\n사람들에게 다른 나라의 민간 설화를 듣고 난 다음 나\n중에 이 이야기들을 기억해 내도록 요청했다. 당신이\n아마 추측할 수 있듯이, 낯선 이야기는 익숙한 이야기\n만큼 잘 기억되지 않았다. 그러나 놀랍게도 기억의 오\n류들은 무작위적인 것이 아니었다. 오히려 피험자들은\n자신의 마음 속에서 이야기의 비슷한 부분- 특히 그들\n에게 가장 이해가 되지 않는 부분을 종종 다시 썼다.\n(많은 청중을 끌어들이기 위해서, 이야기들은 많은 사\n람들의 흥미를 유발하는 주제에 초점을 맞춰야 한다.)\nBartlett은 문제에 직면할 때, 인간은 우리 기억의 사소\n한 틈을 메우기 위해 정신적 스키마타, 즉 뇌에 저장된\n지식의 선반을 활용한다는 결론을 내렸다. 따라서, 기억\n하는 것은 과거의 경험을 기반으로 하는 것을 포함하는\n상상의 과정이다.",
    "grammar": [
      "ask A to V: A에게 ~하라고 요청하다",
      "as well as: ~만큼 잘",
      "the parts that made the least sense: 관계절 후치수식",
      "draw upon: ~을 활용하다"
    ],
    "vocab": [
      {
        "word": "folktale",
        "meaning": "민간 설화"
      },
      {
        "word": "recall",
        "meaning": "기억해 내다"
      },
      {
        "word": "random",
        "meaning": "무작위의"
      },
      {
        "word": "schemata",
        "meaning": "스키마타"
      },
      {
        "word": "imaginative",
        "meaning": "상상적인"
      }
    ]
  },
  {
    "number": 36,
    "type": "순서",
    "title": "역사는 반복된다는 말의 지나친 단순화",
    "answer": "②",
    "passage": "History, people often say, repeats itself. And looking\nat the historical records of the ancient civilizations, some\nthings do seem to happen again and again.\n(A) If so, archaeology would be pretty boring; one thing would\nhappen again and again. But that's not what archaeologists\nsee. Some civilizations end suddenly, like the Aztec and\nInca, conquered by invaders in the 1520s AD.\n(B) Civilizations expand, get overextended, and then collapse as\nin the cases of Rome, which went under in 476 AD, and\nthe British Empire, which fell apart more than a thousand\nyears later in the post-World War II era. But is this\nalways the case?\n(C) Those empires never had the chance to collapse as a\nresult of overexpansion. So in the case of civilizations,\n\"history repeats itself\" seems to be an oversimplification.",
    "translation": "역사는, 사람들이 종종 말하길, 그 자체를 반복한다.\n그리고 고대 문명의 역사적 기록들을 보면, 몇 가지 일\n들이 정말로 반복해서 일어나는 것처럼 보인다. (B) 문\n명은 서기 476년에 멸망한 로마의 경우와, 천 년 이상\n지난 후 제2차 세계 대전 이후에 해체된 대영제국의 사\n례에서처럼 확장하고, 과도하게 확장되다가, 결국 붕괴\n한다. 하지만 이것이 항상 그런가? (A) 만약 그렇다면,\n고고학은 꽤 지루할 것이다; 한 가지 일이 반복해서 일\n어날 테니 말이다. 하지만 그것은 고고학자들이 보는\n것이 아니다. 어떤 문명들은, 서기 1520년대에 침략자\n들에 의해 정복된 Aztec과 Inca처럼 갑작스럽게 끝난다.\n(C) 그러한 제국들은 과도한 확장의 결과로 붕괴할 기\n회조차 없었다. 그래서 문명의 경우에, \"역사는 그 자체\n를 반복한다\"라는 말은 지나친 단순화로 보인다.",
    "grammar": [
      "do seem to V: 강조의 do",
      "as in the cases of...: ~의 사례에서처럼",
      "had the chance to V: ~할 기회가 있었다",
      "as a result of: ~의 결과로"
    ],
    "vocab": [
      {
        "word": "civilization",
        "meaning": "문명"
      },
      {
        "word": "archaeology",
        "meaning": "고고학"
      },
      {
        "word": "collapse",
        "meaning": "붕괴하다"
      },
      {
        "word": "conquer",
        "meaning": "정복하다"
      },
      {
        "word": "oversimplification",
        "meaning": "지나친 단순화"
      }
    ]
  },
  {
    "number": 37,
    "type": "순서",
    "title": "고정 사고방식과 성장 사고방식",
    "answer": "⑤",
    "passage": "Stanford psychology professor Dr. Carol Dweck is the\ninternationally recognized pioneer of the concept of\n\"growth mindset\" as a way to continually grow, learn,\nand persevere in our efforts.\n(A) These kids end up taking on tougher things, and feel\nbetter about themselves. \"Emphasizing effort gives a\nchild a variable that they can control,\" Dweck has\nexplained.\n(B) In contrast, Dweck found, kids who are praised not for\ntheir smarts but for their effort develop what Dweck\ncalls a \"growth mindset.\" They learn that their effort is\nwhat led to their success, and if they continue to try,\nover time they'll improve and achieve more things.\n(C) Dweck found that kids who are told they're \"smart\"\nactually underperform in future tasks, by choosing\neasier tasks to avoid evidence that they are not smart,\nwhich Dweck calls having a \"fixed mindset.\"",
    "translation": "Stanford 심리학 교수인 Carol Dweck 박사는 우리의\n노력에서 지속적으로 성장하고, 배우며, 인내할 수 있는\n방법인 \"성장 사고방식\" 개념으로 국제적으로 인정받는\n선구자이다. (C) Dweck은 \"똑똑하다\"라는 말을 듣는\n아이들은 그들이 똑똑하지 않다는 증거를 피하기 위해\n더 쉬운 과제를 선택함으로써 실제로 미래 과제에서 기\n대에 못 미치는 성과를 낸다는 것을 발견했는데,\nDweck은 이를 \"고정 사고방식\"을 가진 것으로 부른다.\n(B) 반대로, Dweck은 똑똑함이 아닌 노력에 대해 칭찬\n받는 아이들은 Dweck이 \"성장 사고방식\"이라 부르는\n것을 발달시킨다는 것을 발견했다. 그들은 그들의 노력\n이 성공으로 이르게 한 것임을 배우고, 그들이 계속해\n서 노력한다면, 시간이 지나면서 발전하고 더 많은 것\n을 성취하게 될 것이다. (A) 이 아이들은 결국 더 힘든\n일을 받아들이고, 스스로에 대해 더 좋은 느낌을 갖게\n된다. \"노력을 강조하는 것은 아이에게 그들이 통제할\n수 있는 변수를 제공한다.\"라고 Dweck은 설명했다.",
    "grammar": [
      "who are told...: 관계절 수식",
      "not for A but for B: A가 아니라 B에 대해",
      "what led to their success: 성공으로 이끈 것",
      "end up -ing: 결국 ~하게 되다"
    ],
    "vocab": [
      {
        "word": "growth mindset",
        "meaning": "성장 사고방식"
      },
      {
        "word": "fixed mindset",
        "meaning": "고정 사고방식"
      },
      {
        "word": "underperform",
        "meaning": "기대 이하의 성과를 내다"
      },
      {
        "word": "emphasize",
        "meaning": "강조하다"
      },
      {
        "word": "variable",
        "meaning": "변수"
      }
    ]
  },
  {
    "number": 38,
    "type": "문장 삽입",
    "title": "지하철 문 근처를 선호하는 이유",
    "answer": "④",
    "passage": "Partly this was the obvious convenience of being able to\nexit more quickly.\nTo monitor our surroundings is to focus on what's outside\nof ourselves: what we see, hear, smell, feel, and perhaps\neven taste. But sometimes what really marks a place is\nsomething less specific - a feeling within us. ( ①) An\ninteresting example emerged from a study of subway\npassenger behavior. ( ②) Researchers trying to understand\nwhy people sit where they sit or stand where they stand in\nsubway and metro trains examined the factors that shape\nthe way riders used and navigated that space in different\nsituations. ( ③) One of their findings involved the reasons\nmany riders like to plant themselves close to the train's\ndoors. ( ④) But it was shaped partly by a more abstract\nsensation - the desire to avoid the sometimes uncomfortable\nfeeling of accidentally making eye contact with seated\npassengers. ( ⑤) We can't see feelings - but they're very\nreal, and they influence our experience of the world.",
    "translation": "우리 주변을 살피는 것은 우리 자신 바깥에 있는 것\n에 집중하는 것이다: 우리가 보고, 듣고, 냄새 맡고, 느\n끼고, 어쩌면 맛보기도 하는 것. 그러나 때로는 어떤 장\n소를 진정으로 특징짓는 것은 덜 구체적인 것- 우리\n안에 있는 감정이다. 흥미로운 예가 지하철 승객 행동\n에 관한 연구에서 나왔다. 지하철이나 전철에서 왜 사\n람들이 그들이 앉는 곳에 앉거나 그들이 서는 곳에 서\n는지를 이해하려고 노력하는 연구자들은 다양한 상황에\n서 승객들이 그 공간을 사용하고 탐색하는 방식을 형성\n하는 요인들을 조사했다. 연구 결과 중 하나는 많은 승\n객들이 기차의 문 근처에 자리 잡기를 좋아하는 이유들\n과 관련이 있었다. 부분적으로 이것은 더 빨리 내릴 수\n있다는 명확한 편리함 때문이었다. 그러나 이는 부분적\n으로 더 추상적인 느낌- 앉아 있는 승객들과 우연히\n눈이 마주치는 때때로 불편한 느낌을 피하려는 욕구에\n의해 형성되었다. 우리는 감정들을 볼 수 없다- 그러나\n그것들은 매우 실재하고, 그것들은 세상에 대한 우리의\n경험에 영향을 미친다.",
    "grammar": [
      "To monitor...is to focus...: to부정사 주어/보어",
      "what we see/hear...: 관계대명사 what",
      "why people sit where they sit: 의문사절",
      "being able to exit: 동명사구"
    ],
    "vocab": [
      {
        "word": "monitor",
        "meaning": "살피다"
      },
      {
        "word": "surroundings",
        "meaning": "주변 환경"
      },
      {
        "word": "emerge",
        "meaning": "나타나다"
      },
      {
        "word": "navigate",
        "meaning": "이동하다/탐색하다"
      },
      {
        "word": "abstract sensation",
        "meaning": "추상적 느낌"
      }
    ]
  },
  {
    "number": 39,
    "type": "문장 삽입",
    "title": "얼굴이 물에 잠길 때 유발되는 잠수 반사",
    "answer": "③",
    "passage": "But if we sink just our face in a bowl of water, while\nthe whole of the rest of our body is in the dry air, the\ndiving reflex is triggered.\nWe have a 'diving reflex', like other marine mammals. ( ①)\nThis means that special nerve endings on our faces, around\nthe mouth and nose, trigger this reflex only when the facial\nregion goes under water. ( ②) If we are in the water, with\nour head out in the air, there is no diving reflex. ( ③) It\nautomatically closes down the airway, reducing the risk of\nswallowing water, and it narrows the small air-passages in the\nlungs. ( ④) At the same time the heart rate is slowed down\nto half speed and blood is shunted to the vital organs,\nprotecting them from the effects of the brief stop in\nbreathing. ( ⑤) By contrast, if a chimpanzee or a gorilla\nfound itself in water with its face below the surface, it would\npanic, its heart would race and it would quickly drown.",
    "translation": "우리는 다른 해양 포유류처럼 '잠수 반사'를 가지고\n있다. 이것은 입과 코 주변의 얼굴에 있는 특수 신경\n말단이 얼굴 부위가 물 아래에 들어갈 때만 이 반사를\n유발한다는 것을 의미한다. 만약 우리가, 머리는 공기\n중에 있는 상태로, 물속에 있으면 잠수 반사는 없다. 하\n지만 만약 우리가 그릇의 물속에 얼굴만 가라앉히고,\n나머지 몸 전체는 물기가 없는 공기 중에 있으면, 잠수\n반사가 유발된다. 이것은 기도를 자동으로 닫아, 물을\n삼킬 위험을 줄이고, 폐 속의 작은 공기 통로를 좁힌다.\n동시에 심박수가 절반 속도로 느려지고 혈액이 중요한\n장기들로 보내져, 짧은 호흡 정지로 인한 영향으로부터\n그것들을 보호한다. 반면, 침팬지나 고릴라가 표면 아래 에 얼굴이 있는 상태로 물속에 있는 자신을 발견하면,\n그것은 당황하여, 그것의 심장이 빨리 뛰고 금방 익사\n할 것이다.",
    "grammar": [
      "like other marine mammals: 전치사구 비교",
      "This means that S+V: that절 목적어",
      "when the facial region goes under water: 시간 부사절",
      "if a chimpanzee...found itself: 조건문"
    ],
    "vocab": [
      {
        "word": "diving reflex",
        "meaning": "잠수 반사"
      },
      {
        "word": "trigger",
        "meaning": "유발하다"
      },
      {
        "word": "airway",
        "meaning": "기도"
      },
      {
        "word": "heart rate",
        "meaning": "심박수"
      },
      {
        "word": "vital organs",
        "meaning": "중요 장기"
      }
    ]
  },
  {
    "number": 40,
    "type": "요약문 완성",
    "title": "진실 편향과 정신적 노력 절약",
    "answer": "①",
    "passage": "There is a natural assumption of truth, or a truth bias\nwhen humans communicate with one another. In other\nwords, when we're listening to others or reading their\nwords, our automatic assumption is that the other person\nis telling the truth. This usually works out fine. If you\nask someone where the restroom is located or if it's\nraining outside, you can safely assume that most people\nwill not lie in their responses. Imagine how difficult it\nwould be to converse with someone if you assumed that\neverything they were telling you was false! Indeed,\nquestioning the truth of a statement and then choosing\nnot to believe it requires additional mental steps. For the\nmost part, humans are \"cognitive misers,\" which means\nwe typically don't expend more mental effort than seems\nnecessary in a given situation. It makes sense then, that\nwhen we see something online, even if it is fake, our\ndefault is to believe it, at least at first.",
    "translation": "인간이 서로 소통할 때 진실에 대한 자연스러운 가\n정, 즉 진실 편향이 있다. 다시 말해, 우리가 다른 사람\n의 말을 듣거나 그들의 글을 읽을 때, 우리의 자동적인\n가정은 상대방이 진실을 말하고 있다는 것이다. 이는\n보통 잘 작동한다. 만약 당신이 누군가에게 화장실이\n어디 있는지나 밖에 비가 오고 있는지를 물어 본다면,\n당신은 대부분의 사람들이 그들의 응답에서 거짓말을\n하지 않을 것이라고 확신하며 가정할 수 있다. 만약 당\n신이 그들이 당신에게 말하는 모든 것이 거짓이라고 가\n정한다면 누군가와 대화하는 것이 얼마나 어려울지 상\n상해 보라! 정말로, 어떤 진술의 진실성에 의문을 제기\n하고 그것을 믿지 않는 것을 선택하는 것은 추가적인\n정신적인 단계를 요구한다. 대부분의 경우, 인간은 \"인\n지적 구두쇠\"이고, 이는 우리가 주어진 상황에서 필요한\n것처럼 보이는 것보다 더 많은 정신적인 노력을 전형적\n으로 기울이지 않는다는 것을 의미한다. 그렇다면 우리\n가 온라인에서 무언가를 볼 때, 비록 그것이 가짜라고\n해도, 우리의 기본값은, 적어도 처음에는, 그것을 믿는\n것임이 일리가 있다.\n\n우리 인간은 우리가 받는 정보의 진실성을 의심하지 않\n으려 하는데, 이는 정신적 노력을 아끼려는 우리의 경\n향 때문이다.",
    "grammar": [
      "There is a natural assumption: 존재 구문",
      "when humans communicate...: 시간 부사절",
      "how difficult it would be to V: 간접의문문/가정",
      "which means S+V: 앞 말을 설명하는 관계절"
    ],
    "vocab": [
      {
        "word": "truth bias",
        "meaning": "진실 편향"
      },
      {
        "word": "automatic assumption",
        "meaning": "자동적 가정"
      },
      {
        "word": "converse",
        "meaning": "대화하다"
      },
      {
        "word": "cognitive miser",
        "meaning": "인지적 구두쇠"
      },
      {
        "word": "default",
        "meaning": "기본값"
      }
    ]
  }
];
