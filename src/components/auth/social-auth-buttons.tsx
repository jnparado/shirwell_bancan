"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";

type Props = {
  supabase: SupabaseClient | null;
  /** If set, appended as `?next=` on `/auth/callback` (must already be a safe path). */
  nextAfterAuth?: string;
  busy: boolean;
  setBusy: (v: boolean) => void;
  setError: (msg: string | null) => void;
  onMissingSupabase: () => void;
  mode: "login" | "signup";
};

export function SocialAuthPrivacyNote() {
  return (
    <p className="text-center text-[11px] leading-relaxed text-zinc-500">
      <span className="font-medium text-zinc-400">Privacy-friendly sign-in:</span> Email &
      password uses only what you enter here.{" "}
      <span className="text-zinc-400">Google sign-in</span> follows Google&apos;s account
      controls. We do not use these sign-in methods to profile you for ads; see our{" "}
      <Link href="/privacy" className="text-[#FFC107] underline underline-offset-2 hover:text-[#FFD54F]">
        Privacy Policy
      </Link>{" "}
      for details.
    </p>
  );
}

export function SocialAuthButtons({
  supabase,
  nextAfterAuth,
  busy,
  setBusy,
  setError,
  onMissingSupabase,
  mode,
}: Props) {
  function callbackUrl(): string {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (nextAfterAuth && nextAfterAuth !== "/") {
      return `${origin}/auth/callback?next=${encodeURIComponent(nextAfterAuth)}`;
    }
    return `${origin}/auth/callback`;
  }

  async function signInWithGoogle() {
    if (!supabase) {
      onMissingSupabase();
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl(),
      },
    });
    setBusy(false);
    if (error) setError(error.message);
  }

  const googleLabel = mode === "signup" ? "Sign up with Google" : "Sign in with Google";

  return (
    <div className="space-y-3">
      <SocialAuthPrivacyNote />

      <button
        type="button"
        disabled={busy}
        onClick={() => void signInWithGoogle()}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-black/35 py-3 text-sm font-semibold text-zinc-100 transition hover:border-[#FFC107]/25 hover:bg-black/45 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <span className="text-sm font-black text-black">G</span>
        </span>
        {googleLabel}
      </button>
    </div>
  );
}
