import { NextResponse } from "next/server";

/**
 * AdSense requires `ads.txt` at the site root authorizing the seller.
 * Uses `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-XXXXXXXX`).
 */
function getPublisherId(): string | null {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (adsense?.startsWith("ca-pub-")) {
    return adsense.replace(/^ca-/, ""); // pub-...
  }
  return null;
}

export async function GET() {
  const pub = getPublisherId();
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Missing seller id. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...\n";

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
