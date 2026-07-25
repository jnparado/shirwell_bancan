import Script from "next/script";
import {
  GOOGLE_ADS_CONVERSION_ID,
  GOOGLE_ADS_PAGE_VIEW_CURRENCY,
  GOOGLE_ADS_PAGE_VIEW_SEND_TO,
  GOOGLE_ADS_PAGE_VIEW_VALUE,
  isGoogleAdsConfigured,
  isGoogleAdsPageViewConversionConfigured,
} from "@/config/google-ads";

/** Google Ads conversion tag + page view event — load in `<body>` via next/script. */
export function GoogleAdsTag() {
  if (!isGoogleAdsConfigured()) return null;

  const conversionSnippet = isGoogleAdsPageViewConversionConfigured()
    ? `
gtag('event', 'conversion', {
  'send_to': '${GOOGLE_ADS_PAGE_VIEW_SEND_TO}',
  'value': ${GOOGLE_ADS_PAGE_VIEW_VALUE},
  'currency': '${GOOGLE_ADS_PAGE_VIEW_CURRENCY}'
});`
    : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');${conversionSnippet}
        `.trim()}
      </Script>
    </>
  );
}
