"use client";

import { useEffect, useLayoutEffect } from "react";
import {
  GA_MEASUREMENT_ID,
  isGoogleAnalyticsConfigured,
} from "@/config/analytics";
import {
  GOOGLE_ADS_CONVERSION_ID,
  GOOGLE_ADS_PAGE_VIEW_CURRENCY,
  GOOGLE_ADS_PAGE_VIEW_SEND_TO,
  GOOGLE_ADS_PAGE_VIEW_VALUE,
  isGoogleAdsConfigured,
  isGoogleAdsPageViewConversionConfigured,
} from "@/config/google-ads";
import { isGoogleUmpWebEnabled } from "@/config/google-consent";
import { GTM_ID, isGtmConfigured } from "@/config/gtm";
import {
  SWG_BASIC_SCRIPT_URL,
  buildSwgBasicInitScript,
  isSwgEnabled,
} from "@/config/swg";
import { getGoogleConsentBootstrapScript } from "@/lib/google-consent-bootstrap";

function injectInlineScript(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = code;
  document.head.appendChild(script);
}

function injectExternalScript(
  id: string,
  src: string,
  options?: {
    crossOrigin?: string;
    onLoad?: () => void;
    onError?: () => void;
  },
) {
  if (document.getElementById(id)) {
    options?.onLoad?.();
    return;
  }
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  if (options?.crossOrigin) script.crossOrigin = options.crossOrigin;
  if (options?.onLoad) script.addEventListener("load", options.onLoad, { once: true });
  if (options?.onError) script.addEventListener("error", options.onError, { once: true });
  document.head.appendChild(script);
}

/** Consent Mode bootstrap only — Funding Choices tag lives in `<head>` (`AdBlockingRecoveryHead`). */
function useGoogleConsentScripts() {
  useLayoutEffect(() => {
    if (!isGoogleUmpWebEnabled()) return;
    injectInlineScript("google-consent-bootstrap", getGoogleConsentBootstrapScript());
  }, []);
}

/** GTM, GA, Ads conversion, SwG — non-blocking. */
function useSecondaryAnalyticsScripts() {
  useEffect(() => {
    if (isGtmConfigured()) {
      injectInlineScript(
        "gtm-init",
        `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
        `.trim(),
      );
    } else if (isGoogleAnalyticsConfigured()) {
      injectExternalScript(
        "google-analytics-gtag-js",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`,
      );
      injectInlineScript(
        "google-analytics-gtag",
        `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
        `.trim(),
      );
    }

    if (isGoogleAdsConfigured()) {
      const conversionSnippet = isGoogleAdsPageViewConversionConfigured()
        ? `
gtag('event', 'conversion', {
  'send_to': '${GOOGLE_ADS_PAGE_VIEW_SEND_TO}',
  'value': ${GOOGLE_ADS_PAGE_VIEW_VALUE},
  'currency': '${GOOGLE_ADS_PAGE_VIEW_CURRENCY}'
});`
        : "";

      injectExternalScript(
        "google-ads-gtag-js",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_CONVERSION_ID)}`,
      );
      injectInlineScript(
        "google-ads-gtag",
        `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');${conversionSnippet}
        `.trim(),
      );
    }

    const host = window.location.hostname;
    if (isSwgEnabled(host)) {
      injectExternalScript("swg-basic-js", SWG_BASIC_SCRIPT_URL, {
        onLoad: () => {
          injectInlineScript(
            "swg-basic-init",
            buildSwgBasicInitScript({ theme: "light", lang: "en" }),
          );
        },
      });
    }
  }, []);
}

export function ThirdPartyScripts() {
  useGoogleConsentScripts();
  useSecondaryAnalyticsScripts();
  return null;
}
