import { NextResponse } from "next/server";

const DEFAULT_PUBLISHER_ID = "ca-pub-2495432679632375";
const GOOGLE_CERT_AUTHORITY_ID = "f08c47fec0942fa0";

/**
 * AdMob / app-ads.txt lives at the site root:
 *   https://your-domain.com/app-ads.txt
 *
 * We reuse the same publisher id as AdSense (NEXT_PUBLIC_ADSENSE_CLIENT_ID),
 * since AdMob and AdSense share the same `pub-...` seller identity.
 */
function getPublisherId(): string | null {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (adsense?.startsWith("ca-pub-")) {
    return adsense.replace(/^ca-/, ""); // pub-...
  }

  // Fallback: extract publisher from AdMob app id: ca-app-pub-XXXXXXXX~NNNNN
  const admobAppId = process.env.ADMOB_APP_ID?.trim();
  const match = admobAppId?.match(/^ca-app-(pub-\d+)(?:~\d+)?$/);
  if (match?.[1]) return match[1];

  return DEFAULT_PUBLISHER_ID;
}

export async function GET() {
  const pub = getPublisherId();
  const body = `google.com, ${pub}, DIRECT, ${GOOGLE_CERT_AUTHORITY_ID}\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

