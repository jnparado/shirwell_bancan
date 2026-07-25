import Script from "next/script";
import { headers } from "next/headers";
import {
  buildSwgBasicInitScript,
  isSwgEnabled,
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
export async function SwgProductInit({
  productId,
  theme = "light",
  lang = "en",
}: SwgProductInitProps) {
  const headerStore = await headers();
  if (!isSwgEnabled(headerStore.get("host")) || !productId.trim()) return null;

  const safeId = productId.replace(/[^a-zA-Z0-9_-]/g, "-");

  return (
    <Script id={`swg-product-${safeId}`} strategy="afterInteractive">
      {buildSwgBasicInitScript({ productId, theme, lang })}
    </Script>
  );
}
