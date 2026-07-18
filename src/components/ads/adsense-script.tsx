import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Google AdSense Auto ads — exact snippet in `<head>` on every page:
 * client=ca-pub-2495432679632375
 */
export function AdSenseScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
