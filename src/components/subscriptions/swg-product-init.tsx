import {
  buildSwgBasicInitScript,
  isSwgConfigured,
} from "@/config/swg";

type SwgProductInitProps = {
  productId: string;
  theme?: "light" | "dark";
  lang?: string;
};

/**
 * Page-level SwG CMS sync for a specific product (e.g. premium paywall).
 * Assumes `swg-basic.js` is already loaded site-wide via `SwgHeadScript`.
 */
export function SwgProductInit({
  productId,
  theme = "light",
  lang = "en",
}: SwgProductInitProps) {
  if (!isSwgConfigured() || !productId.trim()) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: buildSwgBasicInitScript({ productId, theme, lang }),
      }}
    />
  );
}
