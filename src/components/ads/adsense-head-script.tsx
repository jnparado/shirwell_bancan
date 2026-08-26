import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Exact AdSense ownership snippet in `<head>` on every page.
 * Google’s “Verify site ownership” crawler looks for this in the initial HTML.
 *
 * @see https://support.google.com/adsense/answer/12169212
 */
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
