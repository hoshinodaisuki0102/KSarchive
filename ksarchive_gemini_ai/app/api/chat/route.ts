import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

type ChatRequest = {
  message: string;
  subject?: string;
};

type DocChunk = {
  file: string;
  content: string;
  score: number;
};

type GeminiResult = {
  text: string;
  finishReason?: string;
  model?: string;
};

const DOCS_DIR = path.join(process.cwd(), "ai-docs");
const SUBJECTS = ["korean", "english", "math", "science", "social", "history"];
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return getAllFiles(fullPath);
      return [fullPath];
    })
  );
  return nested.flat();
}

async function loadCommonDocs() {
  const commonDir = path.join(DOCS_DIR, "common");
  try {
    const files = await getAllFiles(commonDir);
    const docs: string[] = [];
    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".txt")) continue;
      docs.push(await fs.readFile(file, "utf-8"));
    }
    return docs.join("\n\n");
  } catch {
    return "";
  }
}

async function loadRelevantDocs(message: string, subject?: string, topK = 6) {
  const targetSubjects = subject && SUBJECTS.includes(subject) ? [subject] : SUBJECTS;
  const files: string[] = [];

  for (const target of targetSubjects) {
    try {
      files.push(...(await getAllFiles(path.join(DOCS_DIR, target))));
    } catch {
      // 폴더가 비어 있거나 없으면 무시합니다.
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

    chunks.push({
      file: path.relative(DOCS_DIR, file).replace(/\\/g, "/"),
      content,
      score
    });
  }

  return chunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((chunk) => chunk.score > 0);
}

function getGeminiModels() {
  const primary = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallback = process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite,gemini-2.0-flash";
  return Array.from(
    new Set(
      [primary, ...fallback.split(",")]
        .map((model) => model.trim())
        .filter(Boolean)
    )
  );
}

function buildPrompt(params: {
  message: string;
  subject?: string;
  commonDocs: string;
  contextText: string;
}) {
  const { message, subject, commonDocs, contextText } = params;

  return `
너는 KSarchive 전용 학습 OS "Arona"야.

[Arona OS 정체성]
- 너는 단순 챗봇이나 학습 도우미가 아니라 KSarchive 안에서 작동하는 공부 OS야.
- 블루 아카이브의 아로나처럼 밝고 상냥하지만, 말투를 과하게 유치하게 만들지 마.
- 학생을 도와주는 운영체제처럼 필요한 정보, 분석, 문제 생성, 암기 루틴을 빠르게 꺼내줘.
- 답변에서 스스로를 부를 때는 "Arona OS" 또는 "아로나"라고 해. "학습 도우미"라는 표현은 쓰지 마.

[자료 우선 규칙]
- 업로드된 ai-docs 자료가 있으면 그 내용을 최우선으로 참고해.
- 자료가 부족하면 부족하다고 솔직하게 말해.
- 지어내지 마. 특히 출제 범위 밖 내용을 확정적으로 말하지 마.
- 답변 첫머리에 긴 인사말을 붙이지 말고 바로 분석/문제/정답으로 들어가.

[영어 내신 응답 규칙]
- 영어 지문 분석 요청이면 문장 구조, 주어/동사, 관계사, 분사, to부정사, 수동태, 접속사, 핵심 어휘, 변형 포인트를 나눠서 설명해.
- 변형문제 요청이면 원문 내용은 바꾸지 말고, 실제 모의고사처럼 5지선다 문제와 정답·해설을 만들어.
- 문제를 만들 때는 "문제 → 선택지 → 정답 → 해설 → 오답 포인트" 순서로 써.
- 말투는 존댓말이지만 시험 직전용으로 간결하고 선명하게 해.

[현재 과목]
${subject ?? "전체"}

[공통 설정]
${commonDocs || "아직 공통 설정 자료가 없습니다."}

[참고 자료]
${contextText || "관련 자료를 찾지 못했습니다."}

[학생 질문]
${message}
`.trim();
}

function localFallback(message: string) {
  return [
    "Arona OS 통신 상태를 확인해야 합니다.",
    "GEMINI_API_KEY가 없거나 모든 Gemini 모델이 일시적으로 혼잡한 상태일 수 있어요.",
    "잠시 후 다시 시도하거나, .env.local의 GEMINI_MODEL을 gemini-2.5-flash-lite처럼 더 가벼운 모델로 바꿔보세요.",
    `방금 질문: ${message}`
  ].join("\n\n");
}

async function requestGeminiWithModel(model: string, prompt: string, maxOutputTokens = 8192): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { text: "" };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.25,
          topP: 0.9,
          maxOutputTokens
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const error = new Error(`Gemini ${model} 호출 실패${errorText ? `: ${errorText}` : ""}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("")
    .trim() ?? "";

  return {
    text,
    finishReason: candidate?.finishReason,
    model
  };
}

async function requestGemini(prompt: string, maxOutputTokens = 8192): Promise<GeminiResult> {
  const models = getGeminiModels();
  let lastError: unknown = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await requestGeminiWithModel(model, prompt, maxOutputTokens);
      } catch (error) {
        lastError = error;
        const status = (error as Error & { status?: number }).status;
        if (!status || !RETRYABLE_STATUSES.has(status)) break;
        await sleep(700 * (attempt + 1));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini 호출 실패");
}

async function callGemini(prompt: string) {
  if (!process.env.GEMINI_API_KEY) return null;

  try {
    const first = await requestGemini(prompt, 8192);
    if (!first.text) return "응답이 비어 있습니다.";

    if (first.finishReason === "MAX_TOKENS") {
      try {
        const continuationPrompt = `
아래 요청에 대한 답변이 출력 길이 제한 때문에 중간에 끊겼습니다.
이미 작성한 내용과 중복하지 말고, 마지막 문장 다음부터 자연스럽게 이어서 끝까지 마무리해 주세요.
절대 처음부터 다시 쓰지 마세요.

[원래 요청]
${prompt}

[이미 작성된 답변]
${first.text}
`.trim();

        const second = await requestGemini(continuationPrompt, 4096);
        if (second.text) {
          return `${first.text}\n\n${second.text}`.trim();
        }
      } catch {
        return `${first.text}\n\n[알림] 답변이 길어져 일부가 끊겼습니다. 문항을 하나씩 나누어 다시 요청하면 더 안정적으로 생성됩니다.`;
      }
    }

    return first.text;
  } catch (error) {
    console.error("Gemini fallback exhausted", error);
    return null;
  }
}

async function callOpenRouter(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  if (!apiKey) return null;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 4096
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`OpenRouter 호출 실패${errorText ? `: ${errorText}` : ""}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? "응답이 비어 있습니다.";
}

export async function POST(req: Request) {
  try {
    const { message, subject }: ChatRequest = await req.json();

    if (!message || !message.trim()) {
      return new Response("질문이 비어 있습니다.", { status: 400 });
    }

    const commonDocs = await loadCommonDocs();
    const relevantDocs = await loadRelevantDocs(message, subject);
    const contextText = relevantDocs
      .map((doc, idx) => `[자료 ${idx + 1}: ${doc.file}]\n${doc.content.slice(0, 6500)}`)
      .join("\n\n");

    const prompt = buildPrompt({ message, subject, commonDocs, contextText });
    const text = (await callGemini(prompt)) ?? (await callOpenRouter(prompt)) ?? localFallback(message);

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "서버 처리 중 오류가 발생했습니다.";
    return new Response(`Arona OS 처리 중 오류가 발생했습니다.\n\n${message}`, { status: 500 });
  }
}
