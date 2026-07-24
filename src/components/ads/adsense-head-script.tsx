import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Google-recommended async script in `<head>`.
 * `data-ad-client` enables Auto ads (anchor, vignette, side rail) when turned on in AdSense.
 */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_CLIENT_ID}
    />
  );
}
