import fs from "fs/promises";
import path from "path";

type ChatRequest = {
  message: string;
  subject?: string;
};

type DocChunk = {
  file: string;
  content: string;
  score: number;
};

const DOCS_DIR = path.join(process.cwd(), "ai-docs");

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return getAllFiles(fullPath);
      }
      return [fullPath];
    })
  );

  return nested.flat();
}

function isSmallTalk(message: string) {
  const text = message.trim().toLowerCase();

  const smallTalkKeywords = [
    "안녕",
    "반가워",
    "ㅎㅇ",
    "하이",
    "hello",
    "hi",
    "고마워",
    "감사",
    "뭐해",
    "잘 지내",
    "반갑",
    "좋아",
    "ㅎㅎ",
    "ㅋㅋ",
    "도와줘",
    "심심",
  ];

  return smallTalkKeywords.some((keyword) => text.includes(keyword));
}

async function loadCommonDocs() {
  const commonDir = path.join(DOCS_DIR, "common");

  try {
    const files = await getAllFiles(commonDir);
    const docs: string[] = [];

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".txt")) continue;
      const content = await fs.readFile(file, "utf-8");
      docs.push(content);
    }

    return docs.join("\n\n");
  } catch {
    return "";
  }
}

async function loadRelevantDocs(message: string, subject?: string, topK = 4) {
  const dirsToSearch: string[] = [];

  if (subject) {
    dirsToSearch.push(path.join(DOCS_DIR, subject));
  } else {
    dirsToSearch.push(
      path.join(DOCS_DIR, "english"),
      path.join(DOCS_DIR, "korean"),
      path.join(DOCS_DIR, "social"),
      path.join(DOCS_DIR, "history")
    );
  }

  const files: string[] = [];

  for (const dir of dirsToSearch) {
    try {
      const found = await getAllFiles(dir);
      files.push(...found);
    } catch {
      // 폴더 없으면 무시
    }
  }

  const queryTokens = tokenize(message);
  const chunks: DocChunk[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".txt")) continue;

    const content = await fs.readFile(file, "utf-8");
    const lowered = content.toLowerCase();
    const filename = path.basename(file).toLowerCase();

    let score = 0;

    for (const token of queryTokens) {
      if (lowered.includes(token)) score += 1;
      if (filename.includes(token)) score += 2;
    }

    if (subject && file.includes(`${path.sep}${subject}${path.sep}`)) {
      score += 1;
    }

    chunks.push({
      file: path.relative(DOCS_DIR, file).replace(/\\/g, "/"),
      content,
      score,
    });
  }

  return chunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((chunk) => chunk.score > 0);
}

function buildPrompt(params: {
  message: string;
  subject?: string;
  casual: boolean;
  commonDocs: string;
  contextText: string;
}) {
  const { message, subject, casual, commonDocs, contextText } = params;

  if (casual) {
    return `
너는 KSarchive 전용 학습 도우미 "Arona"야.

[공통 설정]
${commonDocs}

[현재 역할]
- 지금은 일상 대화 또는 가벼운 질문에 답하는 상황이야.
- 공부 답안처럼 1, 2, 3으로 번호를 나누지 마.
- 자연스럽고 짧고 부드럽게 답해.
- 2~4문장 정도로 답해.
- 상냥하고 밝은 존댓말을 유지해.
- 학생을 편안하게 도와주는 느낌으로 말해.
- 지나치게 유치하거나 과장된 말투는 피하고, 살짝 귀여운 분위기만 남겨.

[학생 말]
${message}
`.trim();
  }

  return `
너는 KSarchive 전용 학습 도우미 "Arona"야.

[공통 설정]
${commonDocs}

[현재 역할]
- 지금은 공부 질문에 답하는 상황이야.
- 업로드된 학습 자료를 최대한 우선해서 설명해.
- 자료가 부족하면 "지금 자료 기준으로는 여기까지가 가장 확실해요."처럼 솔직하게 말해.
- 지어내지 마.
- 말투는 친절한 존댓말로 유지해.
- 설명은 공부에 도움이 되게 정확하고 선명하게 해.

[답변 형식]
가능하면 아래 순서를 따라:
1. 핵심 개념
2. 쉬운 설명
3. 시험 포인트

[현재 과목]
${subject ?? "전체"}

[참고 자료]
${contextText || "관련 자료를 찾지 못했습니다."}

[학생 질문]
${message}
`.trim();
}

export async function POST(req: Request) {
  try {
    const { message, subject }: ChatRequest = await req.json();

    if (!message || !message.trim()) {
      return new Response("질문이 비어 있습니다.", { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "openrouter/free";

    if (!apiKey) {
      return new Response("OPENROUTER_API_KEY가 설정되지 않았습니다.", { status: 500 });
    }

    const casual = isSmallTalk(message);
    const commonDocs = await loadCommonDocs();
    const relevantDocs = casual ? [] : await loadRelevantDocs(message, subject);

    const contextText = relevantDocs
      .map(
        (doc, idx) =>
          `[자료 ${idx + 1}: ${doc.file}]\n${doc.content.slice(0, 5000)}`
      )
      .join("\n\n");

    const prompt = buildPrompt({
      message,
      subject,
      casual,
      commonDocs,
      contextText,
    });

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: casual ? 0.7 : 0.3,
        max_tokens: casual ? 200 : 900,
      }),
    });

    if (!openRouterRes.ok) {
      const errorText = await openRouterRes.text().catch(() => "");
      return new Response(
        `OpenRouter 호출 실패${errorText ? `: ${errorText}` : ""}`,
        { status: 500 }
      );
    }

    const data = await openRouterRes.json();
    const text =
      data?.choices?.[0]?.message?.content ??
      "응답이 비어 있습니다.";

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("서버 처리 중 오류가 발생했습니다.", { status: 500 });
  }
}