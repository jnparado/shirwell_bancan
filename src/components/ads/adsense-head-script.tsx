import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/** Google-recommended async script in `<head>` — available on first paint (no client gate). */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
