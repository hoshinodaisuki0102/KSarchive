export type MockQuestion = { id:number; type:string; passage:string; choices:string[]; answer:number; translation:string; analysis:string[]; };

export const englishMock202503: MockQuestion[] = [
  {
    "id": 18,
    "type": "글의 목적",
    "passage": "Dear Miranda,\n\nThank you for participating in our Crafts Art Fair. Since we\u2019ve chosen you as one of the \u2018Artists of This Year\u2019, we are looking forward to introducing your unique handmade baskets to our community. As part of organizing the exhibition plan, we are happy to inform you that your artworks will be exhibited at the assigned table, number seven. Visitors can easily find your artworks located near the entrance. If you have any special requirements or need further assistance, feel free to contact us in advance.\n\nSincerely,\nHelen Dwyer",
    "choices": [
      "공예품 구매 희망자를 소개",
      "대피 동선을 안내",
      "전시 지정 테이블을 알림",
      "투표 방식을 공지",
      "새로운 공예가를 모집"
    ],
    "answer": 3,
    "translation": "공예 박람회에 참여한 Miranda에게 작품이 입구 근처 7번 테이블에 전시된다고 알린다.",
    "analysis": [
      "핵심 정보는 assigned table, number seven.",
      "이메일의 목적은 전시 위치 안내다."
    ]
  },
  {
    "id": 19,
    "type": "심경 변화",
    "passage": "The shed is cold and damp, the air thick with the smell of old wood and earth. It\u2019s dark, and I can\u2019t make out what\u2019s moving in the shadows. \u201cWho\u2019s there?\u201d I ask, my voice shaking with fear. The shadow moves closer, and my heart is beating fast \u2014 until the figure steps into a faint beam of light breaking through a crack in the wall. A rabbit. A laugh escapes my lips as it stares at me with wide, curious eyes. \u201cYou scared me,\u201d I say, feeling much better. The rabbit pauses for a moment, then hops away, disappearing back into the shadows. I\u2019m left smiling. I start to feel at ease.",
    "choices": [
      "부러움→희망",
      "불안→분노",
      "두려움→안도",
      "호기심→후회",
      "흥분→실망"
    ],
    "answer": 3,
    "translation": "어둠 속 그림자를 보고 겁먹었다가 토끼임을 알고 안심한다.",
    "analysis": [
      "fear, shaking, beating fast → frightened",
      "feel much better, at ease → relieved"
    ]
  },
  {
    "id": 20,
    "type": "주장",
    "passage": "Improving your gestural communication involves more than just knowing when to nod or shake hands. It\u2019s about using gestures to complement your spoken messages, adding layers of meaning to your words. Open-handed gestures, for example, can indicate honesty, creating an atmosphere of trust. You invite openness and collaboration when you speak with your palms facing up. This simple yet powerful gesture can make others feel more comfortable and willing to engage in conversation. But be careful of the trap of over-gesturing. Too many hand movements can distract from your message, drawing attention away from your words. Imagine a speaker whose hands move quickly like birds, their message lost in the chaos of their gestures. Balance is key. Your gestures should highlight your words, not overshadow them.",
    "choices": [
      "열린 마음을 지녀야 한다",
      "몸짓을 적절히 사용해야 한다",
      "청중의 몸짓을 읽어야 한다",
      "직접적으로 표현해야 한다",
      "반복 강조해야 한다"
    ],
    "answer": 2,
    "translation": "몸짓은 말을 돕는 역할이어야 하며 과하면 오히려 방해가 된다.",
    "analysis": [
      "핵심어: complement, balance, not overshadow",
      "과한 몸짓을 경계하는 글이다."
    ]
  },
  {
    "id": 21,
    "type": "어구 의미",
    "passage": "Assuming gene editing in humans proves to be safe and effective, it might seem logical, even preferable, to correct disease-causing mutations at the earliest possible stage of life, before harmful genes begin causing serious problems. Yet once it becomes possible to transform an embryo\u2019s mutated genes into \u201cnormal\u201d ones, there will certainly be temptations to upgrade normal genes to superior versions. Should we begin editing genes in unborn children to lower their lifetime risk of heart disease or cancer? What about giving unborn children beneficial features, like greater strength and increased mental abilities, or changing physical characteristics, like eye and hair color? The pursuit for perfection seems almost natural to human nature, but if we start down this slippery slope, we may not like where we end up.",
    "choices": [
      "인간 향상용 유전자 변형 허용",
      "전통적 믿음 고수",
      "유전자 변경의 유혹 거부",
      "질병 위험 감소 실패",
      "도덕적 문제 더 고려"
    ],
    "answer": 5,
    "translation": "배아의 유전자 교정이 능력 향상까지 확장되는 위험을 경고한다.",
    "analysis": [
      "slippery slope = 처음 허용이 더 큰 문제로 이어지는 위험한 경사",
      "경계와 신중함의 의미다."
    ]
  },
  {
    "id": 22,
    "type": "요지",
    "passage": "The science we learn in grade school is a collection of certainties about the natural world \u2014 the earth goes around the sun, DNA carries the information of an organism, and so on. Only when you start to learn the practice of science do you realize that each of these \u201cfacts\u201d was hard won through a succession of logical inferences based upon many observations or experiments. The process of science is less about collecting pieces of knowledge than it is about reducing the uncertainties in what we know. Our uncertainties can be greater or lesser for any given piece of knowledge depending upon where we are in that process \u2014 today we are quite certain of how an apple will fall from a tree, but our understanding of the turbulent fluid flow remains a work in progress after more than a century of effort.",
    "choices": [
      "불확실성 감소 과정",
      "우연한 발견 많음",
      "연구 방법 교육 중요",
      "실험 설계 핵심",
      "지식 수집 학문"
    ],
    "answer": 1,
    "translation": "과학은 확정된 사실 모음이 아니라 불확실성을 줄여 가는 과정이다.",
    "analysis": [
      "less about A than B 구문이 핵심",
      "불확실성 감소가 중심 논지다."
    ]
  },
  {
    "id": 23,
    "type": "주제",
    "passage": "There is a wealth of evidence that when parents, teachers, supervisors, and coaches are perceived as involved and caring, people feel happier and more motivated. And it is not just those people with power \u2014 we need to feel valued and respected by peers and coworkers. Thus, when the need for relatedness is met, motivation and internalization are fueled, provided that support for autonomy and competence are also there. If we are trying to motivate others, a caring relationship is a crucial basis from which to begin. And when we are trying to motivate ourselves, doing things to enhance a sense of connectedness to others can be crucial to long-term persistence. So exercise with a friend, call someone when you have a difficult decision to make, and be there as a support for others as they take on challenges.",
    "choices": [
      "의존적 관계 탈출",
      "독립적 결정 필요",
      "경쟁 분위기 핵심",
      "가족 유대의 어려움",
      "동기 부여에서 연결 관계의 중요성"
    ],
    "answer": 5,
    "translation": "돌봄과 존중, 연결감은 동기와 지속성을 높인다.",
    "analysis": [
      "relatedness, connectedness 반복",
      "exercise with a friend, be a support for others"
    ]
  },
  {
    "id": 24,
    "type": "제목",
    "passage": "Modern brain-scanning techniques such as fMRI (functional Magnetic Resonance Imaging) have revealed that reading aloud lights up many areas of the brain. There is intense activity in areas associated with pronunciation and hearing the sound of the spoken response, which strengthens the connective structures of your brain cells for more brainpower. This leads to an overall improvement in concentration. Reading aloud is also a good way to develop your public speaking skills because it forces you to read each and every word \u2014 something people don\u2019t often do when reading quickly, or reading in silence. Children, in particular, should be encouraged to read aloud because the brain is wired for learning through connections that are created by positive stimulation, such as singing, touching, and reading aloud.",
    "choices": [
      "Reading Aloud: Improving Brainpower and Speaking Skills",
      "Academic shortcuts",
      "Writing skills through reading aloud",
      "Silent reading changes brain",
      "Faster reading techniques"
    ],
    "answer": 1,
    "translation": "소리 내어 읽기는 뇌 활성화와 말하기 능력 향상에 도움이 된다.",
    "analysis": [
      "brainpower + speaking skills 두 축이 제목에 모두 들어가야 한다."
    ]
  },
  {
    "id": 25,
    "type": "도표",
    "passage": "미국인의 2023년 패스트푸드 섭취 빈도 그래프",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 5,
    "translation": "도표에서 각 빈도 비율을 비교해 불일치 선지를 고르는 문제다.",
    "analysis": [
      "일주일 이상 섭취 비율, daily와 couple of months 비교를 확인"
    ]
  },
  {
    "id": 26,
    "type": "내용 일치",
    "passage": "Robert E. Lucas, Jr. 소개문",
    "choices": [
      "전쟁 중 Seattle 이주",
      "경제사 수강 후 경제학 관심",
      "시카고대 경제학 박사",
      "1963~1974 시카고대 재직",
      "1995년 노벨상"
    ],
    "answer": 4,
    "translation": "1963~1974에는 Carnegie Mellon University에서 가르쳤다.",
    "analysis": [
      "시카고대로 돌아온 것은 1974년 이후다."
    ]
  },
  {
    "id": 27,
    "type": "안내문",
    "passage": "Blackwood Zoo 안내문",
    "choices": [
      "10km 보행로",
      "오후 3:30까지 운영",
      "3~12세 20달러",
      "추워서 일부 동물은 실내만",
      "셔틀 30분마다"
    ],
    "answer": 2,
    "translation": "마지막 입장만 3:30이고 운영은 4:30까지다.",
    "analysis": [
      "Hours of Operation과 Last admission을 구분"
    ]
  },
  {
    "id": 28,
    "type": "안내문",
    "passage": "Sock DIY Workshop 안내문",
    "choices": [
      "1~4시",
      "community hall",
      "2시부터 장난감",
      "새 양말",
      "재료비 별도"
    ],
    "answer": 2,
    "translation": "장소는 Clanton Center의 community hall이다.",
    "analysis": [
      "used but clean socks / including the cost for materials"
    ]
  },
  {
    "id": 29,
    "type": "어법",
    "passage": "Routines enable athletes to evaluate competition conditions. For example, bouncing a ball in a volleyball service routine supplies the server with information about the ball, the floor, and the state of her muscles. This information can then be used to properly prepare for her serve. Routines also enable athletes to adjust and fine-tune their preparations based on those evaluations or in pursuit of a particular competitive goal. This adaptation can involve adjustment to the conditions, rivals, competitive situation, or internal influences what can affect performance. Just like adjusting a race-car engine to the conditions of the track, air temperature, and weather, routines adjust all competitive components to achieve proper performance.",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 4,
    "translation": "what 대신 관계대명사 that/which 성격이 와야 자연스럽다.",
    "analysis": [
      "influences that can affect performance가 맞는 구조"
    ]
  },
  {
    "id": 30,
    "type": "어휘",
    "passage": "Promotion deals with consumer psychology. We can\u2019t force people to think one way or another, and the clever marketer knows that promotion is used to provide information in the most clear, honest, and simple fashion possible. By doing so, the possibility of increasing sales goes up. Gone are the days when promotions were done in order to fool the consumer into purchasing something. The long-term effect of getting a consumer to buy something they did not really want or need wasn\u2019t good. In fact, consumers fooled once can do damage to sales as they relate their experience to others. Instead, marketers now know that their goal is to identify the consumers who are most likely to appreciate a good or service, and to promote that good or service in a way that makes the value clear to the consumer. Therefore, marketers must know where the uninterested consumers are, and how to reach them.",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 5,
    "translation": "문맥상 찾아야 하는 것은 관심이 있는 잠재 고객이므로 uninterested가 부적절하다.",
    "analysis": [
      "타깃 고객 찾기가 핵심 논지"
    ]
  },
  {
    "id": 31,
    "type": "빈칸",
    "passage": "Plato argued that when you see something that strikes you as beautiful, you are really just seeing a partial reflection of true beauty, just as a painting or even a photograph only captures part of the real thing. True beauty, or what Plato calls the Form of Beauty, has no particular color, shape, or size. Rather, it is a(n) ______ idea, like the number five. You can make drawings of the number five in blue or red ink, big or small, but the number five itself is none of those things. It has no physical form. Think of the idea of a triangle, for example. Although it has no particular color or size, it somehow lies within each and every triangle you see. Plato thought the same was true of beauty. The Form of Beauty somehow lies within each and every beautiful thing you see.",
    "choices": [
      "abstract",
      "practical",
      "imperfect",
      "visualized",
      "changeable"
    ],
    "answer": 1,
    "translation": "플라톤의 아름다움은 색·크기 없는 추상적 이데아다.",
    "analysis": [
      "number five, triangle analogy → abstract"
    ]
  },
  {
    "id": 32,
    "type": "빈칸",
    "passage": "As you listen to your child in an emotional moment, be aware that ______ usually works better than asking questions to get a conversation rolling. You may ask your child \u201cWhy do you feel sad?\u201d and she may not have a clue. As a child, she may not have an answer on the tip of her tongue. Maybe she\u2019s feeling sad about her parents\u2019 arguments, or because she feels overtired, or she\u2019s worried about a piano recital. But she may or may not be able to explain any of this. And even when she does come up with an answer, she might be worried that the answer is not good enough to justify the feeling. Under these circumstances, a series of questions can just make a child silent. It\u2019s better to simply reflect what you notice. You can say, \u201cYou seem a little tired today,\u201d or, \u201cI noticed that you frowned when I mentioned the recital,\u201d and wait for her response.",
    "choices": [
      "quick advice",
      "pushing for answers",
      "sharing simple observations",
      "telling your life stories",
      "leaving her alone"
    ],
    "answer": 3,
    "translation": "감정적인 아이에게는 질문 공세보다 보이는 사실을 말해 주는 것이 낫다.",
    "analysis": [
      "simply reflect what you notice가 정답 근거"
    ]
  },
  {
    "id": 33,
    "type": "빈칸",
    "passage": "Our skin conducts electricity more or less efficiently, depending on our emotions. We know that when we\u2019re emotionally stimulated \u2014 stressed, sad, any intense emotion, really \u2014 our bodies sweat a tiny bit, so little we might not even notice. And when those tiny drops of sweat appear, our skin gets more electrically conductive. This change in sweat gland activity happens completely without your conscious mind having much say in the matter. If you feel emotionally intense, you\u2019re going to notice an increase in sweat gland activity. This is particularly useful from a scientific viewpoint, because it allows us to put an objective value on a subjective state of mind. We can actually ______ by tracking how your body subconsciously sweats, by running a bit of electricity through your skin. We can then turn the subjective, subconscious experience of emotional intensity into an objective number by figuring out how good your skin gets at transferring an electrical current.",
    "choices": [
      "limit hormones",
      "control current",
      "improve skin",
      "measure emotional state",
      "diversify experiences"
    ],
    "answer": 4,
    "translation": "피부 전도 변화를 통해 감정 상태를 측정할 수 있다.",
    "analysis": [
      "objective value on a subjective state of mind"
    ]
  },
  {
    "id": 34,
    "type": "빈칸",
    "passage": "Plants can communicate, although not in the same way we do. Some express their discontent through scents. You know that smell that hangs in the air after you\u2019ve mowed the lawn? Yeah, that\u2019s actually an SOS. Some plants use sound. Yes, sound, though at a frequency that we can\u2019t hear. Researchers experimented with plants and microphones to see if they could record any trouble calls. They found that plants produce a high-frequency clicking noise when stressed and can make different sounds for different stressors. The sound a plant makes when it\u2019s not getting watered differs from the one it\u2019ll make when a leaf is cut. However, it\u2019s worth noting that experts don\u2019t think plants are crying out in pain. It\u2019s more likely that these reactions are knee-jerk survival actions. Plants are living organisms, and their main objective is to survive. Scents and sounds are their tools for ______.",
    "choices": [
      "defending against harm",
      "supporting neighboring plants",
      "hiding pain",
      "sharing nutrients",
      "changing genes"
    ],
    "answer": 1,
    "translation": "식물은 냄새와 소리로 위험에 반응하며 살아남는다.",
    "analysis": [
      "main objective is to survive"
    ]
  },
  {
    "id": 35,
    "type": "흐름과 무관한 문장",
    "passage": "What does it mean for a character to be a hero as opposed to a villain? In artistic and entertainment descriptions, it\u2019s essential for the author to establish a positive relationship between a protagonist and the audience. \u2460 In order for tragedy or misfortune to draw out an emotional response in viewers, the character must be adjusted so as to be recognizable as either friend or enemy. \u2461 Likewise, the line between friends and enemies is not clear in reality. \u2462 Whether the portrayal is fictional or documentary, we must feel that the protagonist is someone whose actions benefit us; the protagonist is, or would be, a worthy companion or valued ally. \u2463 Violent action films are often filled with dozens of incidental deaths of minor characters that draw out little response in the audience. \u2464 In order to feel strong emotions, the audience must be emotionally invested in a character as either ally or enemy.",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 2,
    "translation": "②는 현실 일반론으로 주인공-관객 관계 설명에서 벗어난다.",
    "analysis": [
      "나머지는 모두 관객의 감정 투자에 연결"
    ]
  },
  {
    "id": 36,
    "type": "순서 배열",
    "passage": "Let\u2019s assume that at least some animals are capable of thinking despite lacking a language.\n\n(A) This doesn\u2019t imply that squirrels lack concepts, simply that they don\u2019t need them for this concrete form of thinking. For us to be able to say that an animal has concepts, we have to show not just that she\u2019s capable of thinking, but also that she has certain specific abilities.\n\n(B) To do this, in principle she doesn\u2019t need a concept of branch nor a concept of tree. It might be enough for her to have, for example, the ability to think in images; to make a mental map of the tree where she can imagine and try out different routes.\n\n(C) This doesn\u2019t necessarily mean that they possess concepts, for some forms of thought may be nonconceptual. We can imagine, for instance, a squirrel who is planning how to get from the branch she\u2019s currently standing on to a branch from the tree in front.",
    "choices": [
      "(A)-(C)-(B)",
      "(B)-(A)-(C)",
      "(B)-(C)-(A)",
      "(C)-(A)-(B)",
      "(C)-(B)-(A)"
    ],
    "answer": 5,
    "translation": "주어진 글 뒤에는 C로 nonconceptual thought를 제시하고, B로 다람쥐 사례를 들며, A에서 결론을 정리한다.",
    "analysis": [
      "C → B → A"
    ]
  },
  {
    "id": 37,
    "type": "순서 배열",
    "passage": "Cartilage is extremely important for the healthy functioning of a joint, especially if that joint bears weight, like your knee.\n\n(A) This squeezing of joint fluid into and out of the cartilage helps it respond to the off-and-on pressure of walking without breaking under the pressure.\n\n(B) The cartilage in your left knee then \u201cdrinks in\u201d synovial fluid, in much the same way that a sponge soaks up liquid when put in water. When you take another step and transfer the weight back onto your left leg, much of the fluid squeezes out of the cartilage.\n\n(C) Imagine for a moment that you\u2019re looking into the inner workings of your left knee as you walk down the street. When you shift your weight from your left leg to your right, the pressure on your left knee is released.",
    "choices": [
      "(A)-(C)-(B)",
      "(B)-(A)-(C)",
      "(B)-(C)-(A)",
      "(C)-(A)-(B)",
      "(C)-(B)-(A)"
    ],
    "answer": 5,
    "translation": "먼저 압력이 풀리는 상황, 다음에 액 흡수, 마지막에 그 효과를 설명한다.",
    "analysis": [
      "C → B → A"
    ]
  },
  {
    "id": 38,
    "type": "문장 삽입",
    "passage": "Piaget argued that children\u2019s understanding of morality is like their understanding of those water glasses: we can\u2019t say that it is innate or kids learn it directly from adults.\n\nPiaget put the same amount of water into two different glasses: a tall narrow glass and a wide glass, then asked kids to compare two glasses. ( \u2460 ) Kids younger than six or seven usually say that the tall narrow glass now holds more water, because the level is higher. ( \u2461 ) And when they are ready, they figure out the conservation of volume for themselves just by playing with cups of water. ( \u2462 ) Rather, it is self-constructed as kids play with other kids. ( \u2463 ) Taking turns in a game is like pouring water back and forth between glasses. ( \u2464 ) Once kids have reached the age of five or six, then playing games and working things out together will help them learn about fairness far more effectively than any teaching from adults.",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 3,
    "translation": "도덕성은 타고나거나 직접 주입되는 것이 아니라 또래와의 상호작용 속에서 구성된다.",
    "analysis": [
      "self-constructed라는 내용 앞뒤를 연결하는 문장"
    ]
  },
  {
    "id": 39,
    "type": "문장 삽입",
    "passage": "But all this wisdom about how to deal with heat, accumulated over centuries of practical experience, is all too often ignored.\n\nThe rise of air-conditioning accelerated the construction of sealed boxes, where the building\u2019s only airflow is through the filtered ducts of the air-conditioning unit. It doesn\u2019t have to be this way. Look at any old building in a hot climate, whether it\u2019s in Sicily or Marrakesh or Tehran. ( \u2460 ) Architects understood the importance of shade, airflow, light colors. ( \u2461 ) They oriented buildings to capture cool breezes and block the worst heat of the afternoon. ( \u2462 ) They built with thick walls and white roofs and transoms over doors to encourage airflow. ( \u2463 ) Anyone who has ever spent a few minutes in a mudbrick house in Tucson, or walked on the narrow streets of old Seville, knows how well these construction methods work. ( \u2464 ) In this sense, air-conditioning is not just a technology of personal comfort; it is also a technology of forgetting.",
    "choices": [
      "①",
      "②",
      "③",
      "④",
      "⑤"
    ],
    "answer": 1,
    "translation": "전통의 지혜가 에어컨 시대에 무시되고 있다는 문장은 현대 sealed boxes 설명 앞에 들어간다.",
    "analysis": [
      "general claim → modern contrast"
    ]
  },
  {
    "id": 40,
    "type": "요약문",
    "passage": "In the course of trying to solve a problem with an invention, you may encounter a brick wall of resistance when you try to think your way logically through the problem. Such logical thinking is a linear type of process, which uses our reasoning skills. This works fine when we\u2019re operating in the area of what we know or have experienced. However, when we need to deal with new information, ideas, and viewpoints, linear thinking will often come up short. On the other hand, creativity by definition involves the application of new information to old problems and the conception of new viewpoints and ideas. For this you will be most effective if you learn to operate in a nonlinear manner; that is, use your creative brain. Stated differently, if you think in a linear manner, you\u2019ll tend to be conservative and keep coming up with techniques which are already known. This, of course, is just what you don\u2019t want.",
    "choices": [
      "Logical / innovative",
      "Flexible / instant",
      "Logical / proven",
      "Flexible / superior",
      "Logical / collaborative"
    ],
    "answer": 1,
    "translation": "익숙한 문제에는 논리적 사고가 유효하지만, 새로운 해결책에는 창의적 사고가 필요하다.",
    "analysis": [
      "familiar vs new / innovative"
    ]
  },
  {
    "id": 41,
    "type": "제목",
    "passage": "Some researchers view spoken languages as incomplete devices for capturing precise differences. They think numbers represent the most neutral language of description. However, when our language of description is changed to numbers, we do not move toward greater accuracy. Numbers are no more appropriate \u2018pictures of the world\u2019 than words, music, or painting. While useful for specific purposes (e.g. census taking, income distribution), they exclude information of enormous value. For example, the future lives of young students are tied to their scores on national tests. In effect, whether they can continue with their education, where, and at what cost depends importantly on a handful of numbers. These numbers do not account for the quality of schools they have attended, whether they have been tutored, have supportive parents, have test anxiety, and so on. Finally, putting aside the many ways in which statistical results can be manipulated, there are ways in which turning people\u2019s lives into numbers is morally insulating. Statistics on crime, homelessness, or the spread of a disease say nothing of people\u2019s suffering. We read the statistics as reports on events at a distance, thus allowing us to escape without being disturbed. Statistics are human beings with the tears wiped off. Quantify with caution.",
    "choices": [
      "Numbers Don’t Tell Us Everything",
      "Human Stories Uncovered by the Numbers",
      "Data: A Framework for Understanding Humans",
      "The Limitations of Language in Conveying Truth",
      "The Advantages of Quantifying Human Experiences"
    ],
    "answer": 1,
    "translation": "숫자는 모든 것을 말해 주지 않는다.",
    "analysis": [
      "마지막 문장: Statistics are human beings with the tears wiped off."
    ]
  },
  {
    "id": 42,
    "type": "어휘",
    "passage": "41번 글의 어휘 추론",
    "choices": [
      "(a)",
      "(b)",
      "(c)",
      "(d)",
      "(e)"
    ],
    "answer": 4,
    "translation": "숫자화는 사람들의 고통을 멀리 있는 사건처럼 읽게 하여 도덕적 거리두기를 가능하게 만든다.",
    "analysis": [
      "부적절한 어휘를 고르는 문제"
    ]
  },
  {
    "id": 43,
    "type": "순서 배열",
    "passage": "(A) Jack, an Arkansas farmer, was unhappy because he couldn\u2019t make enough money from his farm. He worked hard for many years, but things didn\u2019t improve. He sold his farm to his neighbor, Victor, who was by no means wealthy. Hoping for a fresh start, he left for the big city to find better opportunities. Years passed, but Jack still couldn\u2019t find the fortune he was looking for. Tired and broke, he returned to the area where his old farm was.\n\n(B) \u201cHow did you do all this?\u201d he asked. \u201cWhen you bought the farm, you barely had any money. How did you get so rich?\u201d Victor smiled and said, \u201cI owe it all to you. There were diamonds on this land \u2014 acres and acres of diamonds! I got rich because I discovered those diamonds.\u201d \u201cDiamonds?\u201d Jack said in disbelief. \u201cI knew every part of that land, and there were no diamonds!\u201d\n\n(C) Victor reached into his pocket and carefully pulled out something small and shiny. Holding it between his fingers, he let it catch the light. He said, \u201cThis is a diamond.\u201d Jack was amazed and said, \u201cI saw so many rocks like that and thought they were useless. They made farming so hard!\u201d Victor laughed and said, \u201cYou didn\u2019t know what diamonds look like. Sometimes, treasures are hidden right in front of us.\u201d\n\n(D) One day, he drove past his old land and was shocked by what he saw. Victor, the man who had bought the farm with very little money, now seemed to be living a life of great success. He had torn down the farmhouse and built a massive house in its place. New buildings, trees, and flowers adorned the well-kept property. Jack could hardly believe that he had ever worked on this same land. Curious, he stopped to talk to Victor.",
    "choices": [
      "(B)-(D)-(C)",
      "(C)-(B)-(D)",
      "(C)-(D)-(B)",
      "(D)-(B)-(C)",
      "(D)-(C)-(B)"
    ],
    "answer": 2,
    "translation": "돌아온 Jack이 성공한 Victor를 보고, Victor가 다이아몬드를 보여 주고, 마지막에 성공 비밀을 설명한다.",
    "analysis": [
      "D → C → B"
    ]
  },
  {
    "id": 44,
    "type": "지칭 추론",
    "passage": "43번 장문 속 (a)~(e) 지칭",
    "choices": [
      "(a)",
      "(b)",
      "(c)",
      "(d)",
      "(e)"
    ],
    "answer": 2,
    "translation": "다른 하나를 가리키는 지칭을 찾는 문제다.",
    "analysis": [
      "인물 전환 시점에 주의"
    ]
  },
  {
    "id": 45,
    "type": "내용 일치",
    "passage": "43~45 장문 세부 내용",
    "choices": [
      "Jack은 농장에서 충분히 벌지 못했다",
      "Jack은 Victor에게서 농장을 샀다",
      "Victor는 다이아몬드를 발견해 부자가 되었다",
      "Victor는 작은 반짝이는 것을 꺼냈다",
      "Victor는 농가 자리에 큰 집을 지었다"
    ],
    "answer": 2,
    "translation": "농장을 판 사람은 Jack이고, 산 사람은 Victor다.",
    "analysis": [
      "인물 관계와 사건 순서 확인"
    ]
  }
];
