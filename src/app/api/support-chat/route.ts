import { NextResponse } from "next/server";
import {
  SUPPORT_SYSTEM_PROMPT,
  getFallbackReply,
  isSupportChatAiEnabled,
  type ChatMessage,
} from "@/lib/support-chat";

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

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
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = sanitizeMessages(body.messages);
    const lastUser = [...messages].reverse().find((m) => m.role === "user");

    if (!lastUser) {
      return NextResponse.json(
        { error: "A user message is required." },
        { status: 400 },
      );
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
    return NextResponse.json(
      { error: "Could not process your message. Please try again." },
      { status: 500 },
    );
  }
}
