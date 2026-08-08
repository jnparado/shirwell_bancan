import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginClient } from "@/app/auth/login/login-client";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
          <p className="text-sm font-medium text-zinc-400">Loading…</p>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
