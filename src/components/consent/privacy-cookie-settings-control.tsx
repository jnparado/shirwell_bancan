"use client";

import Link from "next/link";
import { showGoogleConsentRevocation } from "@/lib/google-consent-revocation";

type PrivacyCookieSettingsControlProps = {
  className?: string;
  /** Footer-style text link vs button */
  variant?: "link" | "button";
};

/** IAB / AdMob requirement — label must be “Privacy and cookie settings”. */
export function PrivacyCookieSettingsControl({
  className = "",
  variant = "link",
}: PrivacyCookieSettingsControlProps) {
  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={() => showGoogleConsentRevocation()}
        className={`rounded-lg border border-[#FFC107]/35 bg-[#FFC107]/10 px-4 py-2.5 text-sm font-semibold text-[#FFC107] transition hover:bg-[#FFC107]/20 ${className}`}
      >
        Privacy and cookie settings
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => showGoogleConsentRevocation()}
      className={`cursor-pointer text-inherit underline-offset-2 hover:underline ${className}`}
    >
      Privacy and cookie settings
    </button>
  );
}

/** Same control as a page link (works without JS — opens revocation page). */
export function PrivacyCookieSettingsLink({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/privacy/cookie-settings"
      className={`underline-offset-2 hover:underline ${className}`}
    >
      Privacy and cookie settings
    </Link>
  );
}
