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

function AppleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.58-1.31 3.15-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      />
    </svg>
  );
}

export function SocialAuthPrivacyNote() {
  return (
    <p className="text-center text-[11px] leading-relaxed text-zinc-500">
      <span className="font-medium text-zinc-400">Privacy-friendly sign-in:</span> Email &
      password uses only what you enter here.{" "}
      <span className="text-zinc-400">Sign in with Apple</span> can hide your personal email
      (Apple private relay). We do not use these sign-in methods to profile you for ads; see
      our{" "}
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

  async function signInWith(provider: "apple" | "google") {
    if (!supabase) {
      onMissingSupabase();
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl(),
      },
    });
    setBusy(false);
    if (error) setError(error.message);
  }

  const appleLabel = mode === "signup" ? "Sign up with Apple" : "Sign in with Apple";
  const googleLabel = mode === "signup" ? "Sign up with Google" : "Sign in with Google";

  return (
    <div className="space-y-3">
      <SocialAuthPrivacyNote />

      <button
        type="button"
        disabled={busy}
        onClick={() => void signInWith("apple")}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <AppleMark className="h-[17px] w-[14px] shrink-0" />
        {appleLabel}
      </button>

      <button
        type="button"
        disabled={busy}
        onClick={() => void signInWith("google")}
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
