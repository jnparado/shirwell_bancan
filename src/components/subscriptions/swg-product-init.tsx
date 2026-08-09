import { headers } from "next/headers";
import { isSwgEnabled } from "@/config/swg";
import { SwgProductInitClient } from "@/components/subscriptions/swg-product-init-client";

type SwgProductInitProps = {
  productId: string;
  theme?: "light" | "dark";
  lang?: string;
};

export async function SwgProductInit({
  productId,
  theme = "light",
  lang = "en",
}: SwgProductInitProps) {
  const headerStore = await headers();
  if (!isSwgEnabled(headerStore.get("host")) || !productId.trim()) return null;

  return (
    <SwgProductInitClient productId={productId} theme={theme} lang={lang} />
  );
}
