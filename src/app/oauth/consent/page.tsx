import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsentClient } from "./consent-client";

export const metadata: Metadata = {
  title: "Authorize application",
  robots: { index: false, follow: false },
};

export default function OAuthConsentPage() {
  return (
    <div className="page-shell--compact">
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
            <p className="text-sm font-semibold text-[#FFC107]">Loading…</p>
          </div>
        }
      >
        <ConsentClient />
      </Suspense>
    </div>
  );
}
