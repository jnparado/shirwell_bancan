"use client";

import { useEffect, useLayoutEffect, useId } from "react";
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
  isAdsenseTestMode,
} from "@/config/ads";
import {
  fillUnfilledAdSlots,
  scheduleAdFillRetries,
  whenAdSenseReady,
} from "@/lib/adsense-runtime";

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdSenseUnitProps {
  /** Defaults to `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` */
  slot?: string;
  className?: string;
  format?: AdFormat;
  minHeight?: number;
  /** Distinguish multiple units with the same slot on one page */
  instanceId?: string;
}

type FixedSize = { width: number; height: number };

interface AdSenseUnitInnerProps extends Omit<AdSenseUnitProps, "slot"> {
  slot: string;
  fixedSize?: FixedSize;
}

export function AdSenseLabel({ className = "" }: { className?: string }) {
  return (
    <p
      className={`mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-500 ${className}`}
    >
      Advertisement
    </p>
  );
}

/**
 * Responsive display unit. Set `NEXT_PUBLIC_ADSENSE_SLOT_BANNER` or pass `slot`.
 */
export function AdSenseUnit({
  slot: slotProp,
  className = "",
  format = "auto",
  minHeight = 100,
  instanceId,
}: AdSenseUnitProps) {
  return (
    <AdSenseUnitInner
      slot={slotProp ?? ADSENSE_SLOT_BANNER}
      className={className}
      format={format}
      minHeight={minHeight}
      instanceId={instanceId}
    />
  );
}

/** Enterprises display unit — slot 1200415498, auto, full-width responsive. */
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
  instanceId,
}: AdSenseUnitInnerProps) {
  const pathname = usePathname();
  const reactId = useId();
  const unitKey = `${pathname}-${slot}-${instanceId ?? reactId}`;
  const adsAllowed = isAdSenseAllowedPath(pathname);

  useLayoutEffect(() => {
    if (!adsAllowed || !slot || !isAdsenseConfigured()) return;

    const fill = () => fillUnfilledAdSlots(document);

    const stopReady = whenAdSenseReady(fill);
    const stopRetries = scheduleAdFillRetries(fill);

    return () => {
      stopReady();
      stopRetries();
    };
  }, [adsAllowed, slot, unitKey]);

  useEffect(() => {
    if (!adsAllowed || !slot || !isAdsenseConfigured()) return;
    return scheduleAdFillRetries(() => fillUnfilledAdSlots(document));
  }, [adsAllowed, slot, unitKey]);

  if (!adsAllowed || !isAdsenseConfigured() || !slot) return null;

  const wrapperClass = fixedSize
    ? `mx-auto flex justify-center overflow-hidden ${className}`
    : `mx-auto w-full max-w-4xl overflow-hidden ${className}`;

  return (
    <div key={unitKey} className={wrapperClass} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={
          fixedSize
            ? {
                display: "inline-block",
                width: fixedSize.width,
                height: fixedSize.height,
              }
            : { display: "block", minHeight }
        }
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        {...(isAdsenseTestMode() ? { "data-adtest": "on" } : {})}
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
