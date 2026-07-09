"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { IconGoogle } from "@/components/auth/auth-ui";

type Props = {
  supabase: SupabaseClient | null;
  /** If set, appended as `?next=` on `/auth/callback` (must already be a safe path). */
  nextAfterAuth?: string;
  busy: boolean;
  setBusy: (v: boolean) => void;
  setError: (msg: string | null) => void;
  onMissingSupabase: () => void;
  mode: "login" | "signup";
  showPrivacyNote?: boolean;
  onSwitchMode?: () => void;
};

function IconApple({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.96.95-2.1 1.72-3.4 1.72-1.24 0-2.04-.74-3.2-.74-1.28 0-2.1.76-3.22.78-1.29.02-2.4-.74-3.36-1.69C2.79 18.25 1.5 14.94 2.92 11.7c.7-1.57 1.97-2.57 3.35-2.57 1.25 0 2.04.74 3.2.74 1.16 0 1.87-.74 3.2-.74 1.2 0 2.47.65 3.18 1.78-2.8 1.54-2.34 5.54.9 6.68-.58 1.5-1.34 2.98-2.5 4.19ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}

const socialButtonClass =
  "flex w-full items-center justify-center gap-3 rounded-lg border py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70";

export function SocialAuthPrivacyNote() {
  return (
    <p className="text-center text-[11px] leading-relaxed text-[#5f6368]">
      <span className="font-medium text-[#3c4043]">Privacy-friendly sign-in:</span> Email &
      password uses only what you enter here.{" "}
      <span className="text-[#5f6368]">Google and Apple sign-in</span> follow each
      provider&apos;s account controls. We do not use these sign-in methods to profile you
      for ads; see our{" "}
      <Link
        href="/privacy"
        className="text-[#1a73e8] underline underline-offset-2 hover:text-[#1765cc]"
      >
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
  showPrivacyNote = false,
  onSwitchMode,
}: Props) {
  function callbackUrl(): string {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (nextAfterAuth && nextAfterAuth !== "/") {
      return `${origin}/auth/callback?next=${encodeURIComponent(nextAfterAuth)}`;
    }
    return `${origin}/auth/callback`;
  }

  async function signInWithProvider(provider: "google" | "apple") {
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

  const googleLabel = mode === "signup" ? "Sign up with Google" : "Sign in with Google";
  const appleLabel = mode === "signup" ? "Sign up with Apple" : "Sign in with Apple";

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={busy}
        onClick={() => void signInWithProvider("apple")}
        className={`${socialButtonClass} border-black bg-black text-white hover:bg-[#1a1a1a]`}
      >
        <span className="inline-flex h-5 w-5 items-center justify-center">
          <IconApple className="h-4 w-4" />
        </span>
        {appleLabel}
      </button>

      <div className="space-y-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void signInWithProvider("google")}
          className={`${socialButtonClass} border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa] hover:shadow-sm`}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <IconGoogle className="h-5 w-5" />
          </span>
          {googleLabel}
        </button>

        {onSwitchMode ? (
          <p className="text-center text-sm text-[#5f6368]">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="font-medium text-[#1a73e8] hover:underline"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="font-medium text-[#1a73e8] hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        ) : null}
      </div>

      {showPrivacyNote ? <SocialAuthPrivacyNote /> : null}
    </div>
  );
}
