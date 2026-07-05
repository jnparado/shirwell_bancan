"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { SUPABASE_AUTH_SETUP_MESSAGE } from "@/lib/supabase/env";
import { safeNextPath } from "@/lib/auth/safe-next-path";

type AuthMode = "login" | "signup";

const glassCard =
  "rounded-2xl border border-[#FFC107]/20 bg-[rgba(0,0,0,0.38)] backdrop-blur-xl";

function FieldShell({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#FFC107]/20 bg-black/30 px-4 py-3 shadow-[0_0_30px_rgba(255,193,7,0.06)]">
      <span className="text-[#FFC107]/80">{icon}</span>
      {children}
    </div>
  );
}

export function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const titleId = useId();

  const redirectRaw = params.get("redirect");
  const redirectTarget = useMemo(
    () => safeNextPath(redirectRaw),
    [redirectRaw],
  );

  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    try {
      setSupabase(createBrowserSupabaseClient());
    } catch {
      setSupabase(null);
    }
  }, []);

  const heading = mode === "signup" ? "Create your account" : "Sign in";

  return (
    <div className="relative min-h-[100dvh] bg-[#080706] px-4 py-12">
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,193,7,0.12), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center underline-offset-4 hover:opacity-90"
          aria-label="Shirwell Bancan — home"
        >
          <Image
            src="/shirwell-wordmark.png"
            alt="Shirwell"
            width={140}
            height={38}
            className="h-9 w-auto object-contain"
          />
        </Link>

        <div className={`${glassCard} px-6 py-8 sm:px-8 sm:py-10`}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC107]/70">
            Shirwell
          </p>
          <h1
            id={titleId}
            className="mt-3 text-center font-serif text-3xl font-semibold text-[#FFC107] sm:text-4xl"
          >
            {heading}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-zinc-200/90">
            {mode === "signup"
              ? "Create an account to continue to the next step."
              : "Log in to continue. You will be sent back automatically after signing in."}
          </p>

          <div className="mt-6">
            <SocialAuthButtons
              supabase={supabase}
              nextAfterAuth={redirectTarget}
              busy={busy}
              setBusy={setBusy}
              setError={setError}
              onMissingSupabase={() => setError(SUPABASE_AUTH_SETUP_MESSAGE)}
              mode={mode}
            />
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="shrink-0 text-center">Or continue with email</span>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form
            className="mt-2 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setInfo(null);
              if (!supabase) {
                setError(
                  SUPABASE_AUTH_SETUP_MESSAGE,
                );
                return;
              }

              const form = e.currentTarget;
              const fd = new FormData(form);
              const email = String(fd.get("email") ?? "").trim();
              const password = String(fd.get("password") ?? "");
              const name = String(fd.get("name") ?? "").trim();
              const confirmPassword = String(fd.get("confirmPassword") ?? "");

              setBusy(true);
              setError(null);

              try {
                if (!email || !password) {
                  setError("Please enter your email and password.");
                  return;
                }

                if (mode === "signup") {
                  if (password.length < 6) {
                    setError("Password must be at least 6 characters.");
                    return;
                  }
                  if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    return;
                  }

                  const { data: signUpData, error: signUpError } =
                    await supabase.auth.signUp({
                      email,
                      password,
                      options: { data: name ? { full_name: name } : undefined },
                    });
                  if (signUpError) {
                    setError(signUpError.message);
                    return;
                  }

                  if (signUpData.session) {
                    router.replace(redirectTarget);
                    router.refresh();
                    return;
                  }

                  setInfo(
                    "Check your email to confirm your account if required, then sign in here to continue.",
                  );
                  return;
                }

                const { data: signInData, error: signInError } =
                  await supabase.auth.signInWithPassword({ email, password });
                if (signInError) {
                  setError(signInError.message);
                  return;
                }

                router.replace(redirectTarget);
                router.refresh();
              } finally {
                setBusy(false);
              }
            }}
          >
            {error ? (
              <p
                className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {mode === "signup" ? (
              <FieldShell icon={<User className="h-5 w-5" />}>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
              </FieldShell>
            ) : null}

            <FieldShell icon={<Mail className="h-5 w-5" />}>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
            </FieldShell>

            <FieldShell icon={<Lock className="h-5 w-5" />}>
              <div className="flex w-full items-center gap-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black/30 text-zinc-200 transition hover:border-[#FFC107]/25 hover:text-[#FFC107]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FieldShell>

            {mode === "signup" ? (
              <FieldShell icon={<Lock className="h-5 w-5" />}>
                <div className="flex w-full items-center gap-2">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black/30 text-zinc-200 transition hover:border-[#FFC107]/25 hover:text-[#FFC107]"
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FieldShell>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 w-full rounded-xl bg-gradient-to-b from-[#FFC107] to-[#d99b03] py-3 text-sm font-semibold text-stone-950 shadow-[0_0_40px_rgba(255,193,7,0.22)] transition hover:from-[#ffd042] hover:to-[#e6ae06] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
            </button>

            {info ? (
              <p className="rounded-xl border border-[#FFC107]/25 bg-[#FFC107]/10 px-4 py-3 text-sm text-[#fff8e1]">
                {info}
              </p>
            ) : null}

            <p className="pt-4 text-center text-sm text-zinc-300/90">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setInfo(null);
                    }}
                    className="font-semibold text-[#FFC107] hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError(null);
                      setInfo(null);
                    }}
                    className="font-semibold text-[#FFC107] hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
