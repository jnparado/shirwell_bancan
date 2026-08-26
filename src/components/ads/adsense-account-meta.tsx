import { ADSENSE_CLIENT_ID, isAdsenseConfigured } from "@/config/ads";

/**
 * Site-wide AdSense ownership signals for every page.
 * `/ads.txt` itself stays at the domain root — crawlers follow the link + meta.
 * @see https://support.google.com/adsense/answer/12169212
 */
export function AdSenseAccountMeta() {
  if (!isAdsenseConfigured()) return null;

  return (
    <>
      <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
      <link rel="alternate" type="text/plain" href="/ads.txt" title="ads.txt" />
    </>
  );
}
