"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  ADSENSE_BOX_HEIGHT,
  ADSENSE_BOX_WIDTH,
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOT_BANNER,
  ADSENSE_SLOT_BOX,
  ADSENSE_SLOT_ENTERPRISES,
  isAdSenseAllowedPath,
  isAdsenseConfigured,
} from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdSenseUnitProps {
  /** Defaults to `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` */
  slot?: string;
  className?: string;
  format?: AdFormat;
  minHeight?: number;
}

type FixedSize = { width: number; height: number };

interface AdSenseUnitInnerProps extends Omit<AdSenseUnitProps, "slot"> {
  slot: string;
  fixedSize?: FixedSize;
}

/**
 * Responsive display unit. Set `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` or pass `slot`.
 */
export function AdSenseUnit({
  slot: slotProp,
  className = "",
  format = "auto",
  minHeight = 100,
}: AdSenseUnitProps) {
  return (
    <AdSenseUnitInner
      slot={slotProp ?? ADSENSE_SLOT_BANNER}
      className={className}
      format={format}
      minHeight={minHeight}
    />
  );
}

/** Enterprices display unit — slot 1200415498, auto, full-width responsive. */
export function AdSenseEnterprisesUnit(
  props: Omit<AdSenseUnitProps, "slot">,
) {
  return <AdSenseUnitInner slot={ADSENSE_SLOT_ENTERPRISES} {...props} />;
}

/** Fixed 360×300 display unit — slot 1844130903. */
export function AdSenseBoxUnit(props: Omit<AdSenseUnitProps, "slot">) {
  return (
    <AdSenseUnitInner
      slot={ADSENSE_SLOT_BOX}
      fixedSize={{ width: ADSENSE_BOX_WIDTH, height: ADSENSE_BOX_HEIGHT }}
      minHeight={ADSENSE_BOX_HEIGHT}
      {...props}
    />
  );
}

function AdSenseUnitInner({
  slot,
  className = "",
  format = "auto",
  minHeight = 100,
  fixedSize,
}: AdSenseUnitInnerProps) {
  const pathname = usePathname();
  const pushed = useRef(false);
  const adsAllowed = isAdSenseAllowedPath(pathname);

  useEffect(() => {
    if (!adsAllowed || !slot || !isAdsenseConfigured()) return;
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [adsAllowed, slot]);

  if (!adsAllowed || !isAdsenseConfigured() || !slot) return null;

  const wrapperClass = fixedSize
    ? `mx-auto flex justify-center overflow-hidden ${className}`
    : `mx-auto w-full max-w-4xl overflow-hidden ${className}`;

  return (
    <div className={wrapperClass} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={
          fixedSize
            ? {
                display: "inline-block",
                width: fixedSize.width,
                height: fixedSize.height,
              }
            : { display: "block" }
        }
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        {...(fixedSize
          ? {}
          : {
              "data-ad-format": format,
              "data-full-width-responsive": "true",
            })}
      />
    </div>
  );
}
