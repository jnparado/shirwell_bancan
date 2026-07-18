import type { Metadata } from "next";
import { Suspense } from "react";
import { MissingIdError } from "@/components/errors/missing-id-error";
import { ConsentClient } from "./consent-client";

export const metadata: Metadata = {
  title: "Authorize application",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ authorization_id?: string }>;
};

export default async function OAuthConsentPage({ searchParams }: Props) {
  const { authorization_id } = await searchParams;

  if (!authorization_id?.trim()) {
    return (
      <div className="page-shell--compact">
        <MissingIdError
          param="authorization_id"
          description='Missing authorization_id. This screen is shown when another application starts "Sign in with Shirwell."'
        />
      </div>
    );
  }

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
