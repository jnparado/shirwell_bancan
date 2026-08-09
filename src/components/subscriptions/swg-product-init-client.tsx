"use client";

import { useEffect } from "react";
import { buildSwgBasicInitScript } from "@/config/swg";

type SwgProductInitClientProps = {
  productId: string;
  theme?: "light" | "dark";
  lang?: string;
};

/** Page-level SwG CMS sync — assumes swg-basic.js is loaded site-wide. */
export function SwgProductInitClient({
  productId,
  theme = "light",
  lang = "en",
}: SwgProductInitClientProps) {
  useEffect(() => {
    const safeId = productId.replace(/[^a-zA-Z0-9_-]/g, "-");
    const scriptId = `swg-product-${safeId}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.text = buildSwgBasicInitScript({ productId, theme, lang });
    document.body.appendChild(script);
  }, [productId, theme, lang]);

  return null;
}
