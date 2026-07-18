import Script from "next/script";
import {
  GOOGLE_ADS_CONVERSION_ID,
  isGoogleAdsConfigured,
} from "@/config/google-ads";

/** Google Ads conversion tag — exact gtag snippet in `<head>`. */
export function GoogleAdsTag() {
  if (!isGoogleAdsConfigured()) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
        `.trim()}
      </Script>
    </>
  );
}
