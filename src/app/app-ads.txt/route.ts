import { NextResponse } from "next/server";

/**
 * AdMob / app-ads.txt lives at the site root:
 *   https://your-domain.com/app-ads.txt
 *
 * We reuse the same publisher id as AdSense (NEXT_PUBLIC_ADSENSE_CLIENT_ID),
 * since AdMob and AdSense share the same `pub-...` seller identity.
 */
export async function GET() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (!raw?.startsWith("ca-pub-")) {
    return new NextResponse(
      "# Add NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-... to .env\n",
      {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  const pub = raw.replace(/^ca-/, "");
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

