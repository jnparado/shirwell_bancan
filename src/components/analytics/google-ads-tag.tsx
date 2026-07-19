import {
  GOOGLE_ADS_CONVERSION_ID,
  isGoogleAdsConfigured,
} from "@/config/google-ads";

/** Google Ads conversion tag — exact gtag snippet in `<head>` (AW-17677751901). */
export function GoogleAdsTag() {
  if (!isGoogleAdsConfigured()) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
          `.trim(),
        }}
      />
    </>
  );
}
