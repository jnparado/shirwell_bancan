import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginClient } from "@/app/auth/login/login-client";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (params.mode === "signup") {
    const query = new URLSearchParams();
    if (typeof params.redirect === "string") query.set("redirect", params.redirect);
    const qs = query.toString();
    redirect(qs ? `/signup?${qs}` : "/signup");
  }

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
