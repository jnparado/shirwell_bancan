import {
  SWG_BASIC_SCRIPT_URL,
  buildSwgBasicInitScript,
  isSwgConfigured,
  type SwgBasicInitOptions,
} from "@/config/swg";

type Props = SwgBasicInitOptions;

/**
 * Google Subscribe with Google (Basic) — marks published content for CMS sync.
 * Place on pages that publish NewsArticle content (e.g. /newsletter).
 */
export function SwgBasicScript(options: Props = {}) {
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
          __html: buildSwgBasicInitScript(options),
        }}
      />
    </>
  );
}
