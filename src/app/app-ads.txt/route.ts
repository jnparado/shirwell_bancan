import { ADSENSE_CLIENT_ID } from "@/config/ads";

/** Same line as ads.txt — AdMob crawls /app-ads.txt on the developer site. */
const GOOGLE_ADS_TXT_CERT_AUTHORITY = "f08c47fec0942fa0";

function appAdsTxtBody(): string {
  const publisherId = ADSENSE_CLIENT_ID.replace(/^ca-/i, "");
  return `google.com, ${publisherId}, DIRECT, ${GOOGLE_ADS_TXT_CERT_AUTHORITY}\n`;
}

export function GET() {
  return new Response(appAdsTxtBody(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
