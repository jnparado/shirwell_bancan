import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  isGoogleAnalyticsConfigured,
} from "@/config/analytics";
import { isGtmConfigured } from "@/config/gtm";

/** Loads gtag.js once site-wide — use inside `<head>`. */
export function GoogleAnalyticsScripts() {
  // If GTM is installed, GA should be configured inside GTM to avoid double hits.
  if (isGtmConfigured()) return null;
  if (!isGoogleAnalyticsConfigured()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
        `.trim()}
      </Script>
    </>
  );
}
