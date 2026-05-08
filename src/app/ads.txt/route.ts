import { NextResponse } from "next/server";

const DEFAULT_PUBLISHER_ID = "pub-2495432679632375";
const GOOGLE_CERT_AUTHORITY_ID = "f08c47fec0942fa0";

/**
 * AdSense requires `ads.txt` at the site root authorizing the seller.
 * Uses `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (format `ca-pub-XXXXXXXX`).
 */
function getPublisherId(): string | null {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  if (adsense?.startsWith("ca-pub-")) {
    return adsense.replace(/^ca-/, ""); // pub-...
  }
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
