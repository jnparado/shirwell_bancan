import { NextResponse } from "next/server";
import {
  SUPPORT_SYSTEM_PROMPT,
  getFallbackReply,
  isSupportChatAiEnabled,
  type ChatMessage,
} from "@/lib/support-chat";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { jsonError, methodNotAllowed } from "@/lib/security/api";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;
const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is ChatMessage =>
        Boolean(m) &&
        typeof m === "object" &&
        (m as ChatMessage).role !== undefined &&
        typeof (m as ChatMessage).content === "string" &&
        ((m as ChatMessage).role === "user" ||
          (m as ChatMessage).role === "assistant"),
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }))
    .filter((m) => m.content.length > 0);
}

async function replyWithOpenAi(messages: ChatMessage[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const model = process.env.OPENAI_SUPPORT_MODEL?.trim() || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 500,
      messages: [{ role: "system", content: SUPPORT_SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  return content || null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(
    `support-chat:${ip}`,
    RATE_LIMIT,
    RATE_WINDOW_MS,
  );

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSec) },
      },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonError("Content-Type must be application/json.", 415);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return jsonError("Request body is too large.", 413);
  }

  try {
    const body = JSON.parse(rawBody) as { messages?: unknown };
    const messages = sanitizeMessages(body.messages);
    const lastUser = [...messages].reverse().find((m) => m.role === "user");

    if (!lastUser) {
      return jsonError("A user message is required.", 400);
    }

    let reply: string | null = null;
    let mode: "ai" | "guide" = "guide";

    if (isSupportChatAiEnabled()) {
      reply = await replyWithOpenAi(messages);
      if (reply) mode = "ai";
    }

    if (!reply) {
      reply = getFallbackReply(lastUser.content);
    }

    return NextResponse.json({ reply, mode });
  } catch {
    return jsonError("Could not process your message. Please try again.", 500);
  }
}

export function GET() {
  return methodNotAllowed();
}
