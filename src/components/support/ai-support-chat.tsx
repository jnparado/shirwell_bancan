"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import {
  SUPPORT_CHAT_WELCOME,
  SUPPORT_QUICK_PROMPTS,
  type ChatMessage,
} from "@/lib/support-chat";

const glassPanel =
  "border border-white/[0.08] bg-[rgba(12,12,14,0.92)] shadow-[0_12px_48px_rgba(0,0,0,0.55)] backdrop-blur-2xl";

export function AiSupportChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: SUPPORT_CHAT_WELCOME },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isMusic = pathname === "/music";
  const dockClass = isMusic
    ? "bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
    : "bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:bottom-6";

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/support-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Sorry — I couldn't reply right now. Try /support or email hello@shirwell.example.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue — please try again or visit /support for help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className={`fixed right-4 z-[60] ${dockClass}`}>
      {open ? (
        <div
          className={`mb-3 flex h-[min(70vh,520px)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl ${glassPanel}`}
          role="dialog"
          aria-label="AI support chat"
        >
          <div className="flex items-center justify-between border-b border-[#FFC107]/15 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC107]/15 ring-1 ring-[#FFC107]/30">
                <Sparkles className="h-4 w-4 text-[#FFC107]" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Support assistant</p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                  AI help · Shirwell
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [scrollbar-width:thin]"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-[#FFC107] text-stone-950"
                      : "border border-white/[0.06] bg-white/[0.04] text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-zinc-500">Thinking…</p>
            ) : null}
          </div>

          <div className="border-t border-white/[0.06] px-3 py-2">
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SUPPORT_QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendMessage(prompt)}
                  className="shrink-0 rounded-full border border-[#FFC107]/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-[#FFC107] transition hover:border-[#FFC107]/40 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage(input);
                  }
                }}
                placeholder="Ask about music, orders, account…"
                className="max-h-24 min-h-[40px] flex-1 resize-none rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#FFC107]/35 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC107] text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] text-zinc-500">
              Need a person?{" "}
              <Link href="/support" className="text-[#FFC107] underline-offset-2 hover:underline">
                Support page
              </Link>
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC107] text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.35)] transition hover:bg-[#e6ae06]"
        aria-label={open ? "Close support chat" : "Open AI support chat"}
        aria-expanded={open}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.25} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
