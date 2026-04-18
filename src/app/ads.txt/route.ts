import { NextResponse } from "next/server";

/**
 * AdSense requires `ads.txt` at the site root authorizing the seller.
 * Uses `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-XXXXXXXX`).
 */
export async function GET() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (!raw?.startsWith("ca-pub-")) {
    return new NextResponse(
      "# Add NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-... to .env — see src/config/ads.ts\n",
      {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
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
