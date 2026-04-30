import { NextResponse } from "next/server";

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

  return null;
}

export async function GET() {
  const pub = getPublisherId();
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Missing seller id. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-... or ADMOB_APP_ID=ca-app-pub-...~...\n";

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

