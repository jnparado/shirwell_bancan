"use client";

import { useEffect, useLayoutEffect, useId } from "react";
import { usePathname } from "next/navigation";
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_RECTANGLE_HEIGHT,
  ADSENSE_RECTANGLE_WIDTH,
  ADSENSE_SLOT_DISPLAY,
  ADSENSE_SLOT_HORIZONTAL,
  ADSENSE_SLOT_RECTANGLE,
  isAdSenseAllowedPath,
  isAdsenseConfigured,
  isAdsenseTestMode,
} from "@/config/ads";
import {
  fillUnfilledAdSlots,
  scheduleAdFillRetries,
  whenAdSenseReady,
} from "@/lib/adsense-runtime";

type DisplayFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface DisplayAdProps {
  slot: string;
  className?: string;
  format?: DisplayFormat;
  minHeight?: number;
  instanceId?: string;
  fixedSize?: { width: number; height: number };
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

/** Full-width responsive display ad (AdSense → Display ads → Responsive). */
export function AdSenseDisplayResponsive(
  props: Omit<DisplayAdProps, "slot" | "format" | "fixedSize">,
) {
  return (
    <AdSenseDisplayInner
      slot={ADSENSE_SLOT_DISPLAY}
      format="auto"
      minHeight={props.minHeight ?? 90}
      {...props}
    />
  );
}

/** Horizontal display banner — leaderboard-style strip. */
export function AdSenseDisplayHorizontal(
  props: Omit<DisplayAdProps, "slot" | "format" | "fixedSize">,
) {
  return (
    <AdSenseDisplayInner
      slot={ADSENSE_SLOT_HORIZONTAL}
      format="horizontal"
      minHeight={props.minHeight ?? 90}
      {...props}
    />
  );
}

/** Fixed 300×250 medium rectangle display ad. */
export function AdSenseDisplayRectangle(
  props: Omit<DisplayAdProps, "slot" | "format" | "fixedSize">,
) {
  return (
    <AdSenseDisplayInner
      slot={ADSENSE_SLOT_RECTANGLE}
      format="rectangle"
      fixedSize={{
        width: ADSENSE_RECTANGLE_WIDTH,
        height: ADSENSE_RECTANGLE_HEIGHT,
      }}
      minHeight={ADSENSE_RECTANGLE_HEIGHT}
      {...props}
    />
  );
}

/** @deprecated Use AdSenseDisplayResponsive */
export function AdSenseUnit({
  slot,
  format = "auto",
  ...props
}: {
  slot?: string;
  format?: DisplayFormat;
  className?: string;
  minHeight?: number;
  instanceId?: string;
}) {
  return (
    <AdSenseDisplayInner
      slot={slot ?? ADSENSE_SLOT_DISPLAY}
      format={format}
      minHeight={props.minHeight ?? 90}
      {...props}
    />
  );
}

/** @deprecated Use AdSenseDisplayHorizontal */
export const AdSenseEnterprisesUnit = AdSenseDisplayHorizontal;

/** @deprecated Use AdSenseDisplayRectangle */
export const AdSenseBoxUnit = AdSenseDisplayRectangle;

function AdSenseDisplayInner({
  slot,
  className = "",
  format = "auto",
  minHeight = 90,
  fixedSize,
  instanceId,
}: DisplayAdProps) {
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

  const isFixed = Boolean(fixedSize);
  const wrapperClass = isFixed
    ? `mx-auto flex justify-center overflow-hidden ${className}`
    : `mx-auto w-full max-w-4xl overflow-hidden ${className}`;

  return (
    <div key={unitKey} className={wrapperClass} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={
          isFixed
            ? {
                display: "inline-block",
                width: fixedSize!.width,
                height: fixedSize!.height,
              }
            : { display: "block", minHeight }
        }
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        {...(isAdsenseTestMode() ? { "data-adtest": "on" } : {})}
        {...(isFixed
          ? {}
          : {
              "data-ad-format": format === "rectangle" ? "auto" : format,
              "data-full-width-responsive": "true",
            })}
      />
    </div>
  );
}
