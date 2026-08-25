import { ADSENSE_CLIENT_ID } from "@/config/ads";

/** Google's certification authority ID for AdSense ads.txt lines. */
const GOOGLE_ADS_TXT_CERT_AUTHORITY = "f08c47fec0942fa0";

function adsTxtBody(): string {
  const publisherId = ADSENSE_CLIENT_ID.replace(/^ca-/i, "");
  return `google.com, ${publisherId}, DIRECT, ${GOOGLE_ADS_TXT_CERT_AUTHORITY}\n`;
}

/**
 * Serve /ads.txt via App Router so AdSense always gets HTTP 200 + text/plain
 * (avoids intermittent static-asset / soft-404 issues on Vercel).
 */
export function GET() {
  return new Response(adsTxtBody(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
