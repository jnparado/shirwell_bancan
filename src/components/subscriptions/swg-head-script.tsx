import Script from "next/script";
import { headers } from "next/headers";
import {
  SWG_BASIC_SCRIPT_URL,
  buildSwgBasicInitScript,
  isSwgEnabled,
} from "@/config/swg";

/**
 * Reader Revenue Manager / Subscribe with Google — site-wide in `<head>`.
 * Skipped on localhost — Publisher Center must approve the domain or SwG XHR fails (CORS).
 * @see https://support.google.com/news/publisher-center/answer/13062093
 */
export async function SwgHeadScript() {
  const headerStore = await headers();
  if (!isSwgEnabled(headerStore.get("host"))) return null;

  return (
    <>
      <Script
        id="swg-basic-js"
        src={SWG_BASIC_SCRIPT_URL}
        strategy="beforeInteractive"
      />
      <Script id="swg-basic-init" strategy="beforeInteractive">
        {buildSwgBasicInitScript({ theme: "light", lang: "en" })}
      </Script>
    </>
  );
}
