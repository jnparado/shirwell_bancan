import {
  SWG_BASIC_SCRIPT_URL,
  buildSwgBasicInitScript,
  isSwgConfigured,
} from "@/config/swg";

/**
 * Reader Revenue Manager / Subscribe with Google — site-wide in `<head>`.
 * Required on every page so RRM prompts (newsletter, registration, etc.) can load.
 * @see https://support.google.com/news/publisher-center/answer/13062093
 */
export function SwgHeadScript() {
  if (!isSwgConfigured()) return null;

  return (
    <>
      <script
        async
        type="application/javascript"
        src={SWG_BASIC_SCRIPT_URL}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: buildSwgBasicInitScript({ theme: "light", lang: "en" }),
        }}
      />
    </>
  );
}
