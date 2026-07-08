import { SITE_NAME } from "@/lib/seo";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const SUPPORT_CHAT_WELCOME = `Hi — I'm the ${SITE_NAME} support assistant. I can help with music playback, CDs & vinyl, flowers, products, your account, and general site questions. What do you need help with?`;

export const SUPPORT_QUICK_PROMPTS = [
  "Music won't play",
  "CDs & vinyl",
  "Flowers & roses",
  "Account / sign in",
  "Talk to a person",
] as const;

export const SUPPORT_SYSTEM_PROMPT = `You are the friendly AI support assistant for ${SITE_NAME} (Shirwell), the official website and music player for singer-songwriter Shirwell Bancan.

Help visitors with:
- Streaming music on /music and featured songs on /home
- CDs, vinyl, and the Black Horse album on /cds and /products
- Flowers and Nati Roses on /flowers
- Newsletter on /newsletter
- Account sign-in via the header Log In button and /auth/login
- Privacy policy on /privacy
- General questions about Shirwell Bancan and the site

Guidelines:
- Be warm, concise, and practical (2–4 short paragraphs max).
- Prefer linking to site pages using relative paths like /music, /support.
- For bugs, billing, or account issues you cannot fix, suggest emailing hello@shirwell.example with device type and what happened.
- Do not invent song titles, prices, or features that are not on the site.
- If unsure, say so and point to /support or email.`;

const FAQ: { match: RegExp; reply: string }[] = [
  {
    match: /won'?t play|not playing|audio|sound|music player|stream/i,
    reply:
      "Try these steps for music playback:\n\n1. Open the full player at /music or press play on a featured song on /home.\n2. Refresh the page and tap play again.\n3. Check Wi‑Fi or mobile data.\n4. On iPhone/Android, make sure silent mode is off and volume is up.\n\nIf it still fails, email hello@shirwell.example with your device and browser.",
  },
  {
    match: /cd|vinyl|black horse|record/i,
    reply:
      "CDs and vinyl — including the Black Horse limited edition — are on /cds. Product details and upcoming releases are also on /products.",
  },
  {
    match: /flower|rose|nati/i,
    reply:
      "Flowers and roses are on /flowers, including Nati Roses for weddings, funerals, and special occasions. Shirwell has worked with Nati Roses for over 40 years.",
  },
  {
    match: /sign in|log in|login|account|password|profile/i,
    reply:
      "Use Log In in the site header or go to /auth/login. Your profile is at /profile after you sign in. If sign-in fails, try again in a private window or email hello@shirwell.example.",
  },
  {
    match: /newsletter|updates|email list/i,
    reply: "Newsletter issues and updates from Shirwell are at /newsletter.",
  },
  {
    match: /privacy|ads|adsense|data/i,
    reply:
      "Our privacy policy — including how we use cookies and Google AdSense where enabled — is at /privacy.",
  },
  {
    match: /human|person|email|contact|talk|speak|real/i,
    reply:
      "For direct help from the team, email hello@shirwell.example. Include your device (iPhone/Android/computer), what you were doing, and any error messages. You can also visit /support.",
  },
  {
    match: /premium|subscribe|subscription/i,
    reply:
      "Premium is coming soon. Check back on the site header and /products for updates.",
  },
  {
    match: /hello|hi|hey|help|support/i,
    reply: SUPPORT_CHAT_WELCOME,
  },
];

export function getFallbackReply(userMessage: string): string {
  const text = userMessage.trim();
  if (!text) {
    return "Send a message or pick a quick topic below — I'm here to help.";
  }

  for (const { match, reply } of FAQ) {
    if (match.test(text)) return reply;
  }

  return `Thanks for your question. I may not have a perfect answer for that yet.\n\nBrowse /support for common fixes, or email hello@shirwell.example and we'll get back to you. You can also try asking about music playback, CDs, flowers, or signing in.`;
}

export function isSupportChatAiEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
