"use client";

import { usePathname } from "next/navigation";
import { BrandLegalMarks } from "@/components/legal/brand-legal-marks";

import { isMusicAppRoute } from "@/lib/music-app";

/** Fixed TM / © stack — bottom-right on pages (hidden on music app). */
export function SiteMarks() {
  const pathname = usePathname();
  if (isMusicAppRoute(pathname)) return null;

  return (
    <div
      className="pointer-events-none fixed right-2 z-[15] hidden opacity-75 sm:block md:right-3"
      style={{ bottom: "calc(var(--page-bottom-safe) + 0.25rem)" }}
      aria-hidden
    >
      <BrandLegalMarks variant="inline" size="md" />
    </div>
  );
}
