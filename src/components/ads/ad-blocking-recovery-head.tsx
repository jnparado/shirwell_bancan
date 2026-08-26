import {
  getFundingChoicesScriptUrl,
  isGoogleUmpWebEnabled,
} from "@/config/google-consent";
import { ADSENSE_ERROR_PROTECTION_SCRIPT } from "@/lib/adsense-error-protection-script";

/**
 * AdSense ad blocking recovery + optional error protection — in `<head>` on every page.
 * @see https://support.google.com/adsense/answer/11538226
 */
export function AdBlockingRecoveryHead() {
  if (!isGoogleUmpWebEnabled()) return null;

  const signalScript = `(function(){function signalGooglefcPresent(){if(!window.frames['googlefcPresent']){if(document.body){const iframe=document.createElement('iframe');iframe.style='width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';iframe.style.display='none';iframe.name='googlefcPresent';document.body.appendChild(iframe);}else{setTimeout(signalGooglefcPresent,0);}}}signalGooglefcPresent();})();`;

  return (
    <>
      <script async src={getFundingChoicesScriptUrl()} />
      <script
        id="googlefc-present-signal"
        dangerouslySetInnerHTML={{ __html: signalScript }}
      />
      <script
        id="adsense-error-protection"
        dangerouslySetInnerHTML={{ __html: ADSENSE_ERROR_PROTECTION_SCRIPT }}
      />
    </>
  );
}
