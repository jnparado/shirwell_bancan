import type { Metadata } from "next";
import { Suspense } from "react";
import { SignupFormClient } from "@/app/signup/signup-form-client";

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
          <p className="text-sm font-medium text-zinc-400">Loading…</p>
        </div>
      }
    >
      <SignupFormClient />
    </Suspense>
  );
}
