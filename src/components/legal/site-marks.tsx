"use client";

import { usePathname } from "next/navigation";
import { BrandLegalMarks } from "@/components/legal/brand-legal-marks";

/** Fixed TM / © stack — bottom-right on pages (hidden on full-screen music player). */
export function SiteMarks() {
  const pathname = usePathname();
  if (pathname === "/music") return null;

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
