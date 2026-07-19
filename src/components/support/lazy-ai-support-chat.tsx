"use client";

import dynamic from "next/dynamic";

const AiSupportChat = dynamic(
  () =>
    import("@/components/support/ai-support-chat").then((m) => ({
      default: m.AiSupportChat,
    })),
  { ssr: false },
);

export function LazyAiSupportChat() {
  return <AiSupportChat />;
}
