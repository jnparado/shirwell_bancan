import Script from "next/script";
import { GTM_ID, isGtmConfigured } from "@/config/gtm";

export function GoogleTagManagerHead() {
  if (!isGtmConfigured()) return null;

  return (
    <Script id="gtm-init" strategy="beforeInteractive">
      {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
      `.trim()}
    </Script>
  );
}

export function GoogleTagManagerNoScript() {
  if (!isGtmConfigured()) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

