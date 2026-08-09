import { GOOGLE_CONSENT_READY_EVENT } from "@/config/google-consent";

/** Consent Mode v2 bootstrap — run before AdSense / gtag (inline script body). */
export function getGoogleConsentBootstrapScript(): string {
  return `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
  window.__shirwellMarkConsentReady = function(){
    if (window.__shirwellGoogleConsentReady) return;
    window.__shirwellGoogleConsentReady = true;
    window.dispatchEvent(new Event(${JSON.stringify(GOOGLE_CONSENT_READY_EVENT)}));
  };
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
  window.googlefc.callbackQueue.push({
    'CONSENT_DATA_READY': function(){ window.__shirwellMarkConsentReady(); }
  });
  window.setTimeout(function(){ window.__shirwellMarkConsentReady(); }, 4000);
})();
`.trim();
}
