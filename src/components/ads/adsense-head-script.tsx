import { isAdsenseConfigured } from "@/config/ads";

/** AdSense library loads via `ThirdPartyScripts` (client-only). */
export function AdSenseHeadScript() {
  if (!isAdsenseConfigured()) return null;
  return null;
}
