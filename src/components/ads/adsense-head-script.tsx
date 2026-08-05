import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/** Exact AdSense console snippet — paste in `<head>` on every page. */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;

  return (
    // eslint-disable-next-line @next/next/no-sync-scripts -- Google AdSense requires this tag in head
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
