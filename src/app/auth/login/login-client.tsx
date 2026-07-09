"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SocialAuthButtons, SocialAuthPrivacyNote } from "@/components/auth/social-auth-buttons";
import {
  AuthFieldShell,
  authCardClass,
  authInputClass,
  authPageBgClass,
  authPrimaryButtonClass,
} from "@/components/auth/auth-ui";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { SUPABASE_AUTH_SETUP_MESSAGE } from "@/lib/supabase/env";
import { safeNextPath } from "@/lib/auth/safe-next-path";

type AuthMode = "login" | "signup";

export function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const titleId = useId();

  const redirectRaw = params.get("redirect");
  const modeParam = params.get("mode");
  const oauthError = params.get("error");
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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setSupabase(createBrowserSupabaseClient());
    } catch {
      setSupabase(null);
    }
  }, []);

  useEffect(() => {
    if (modeParam === "signup") setMode("signup");
  }, [modeParam]);

  useEffect(() => {
    if (oauthError?.trim()) {
      setError(oauthError.trim());
    }
  }, [oauthError]);

  function switchAuthMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
    setInfo(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const heading = mode === "signup" ? "Create your account" : "Sign in";

  return (
    <div className={`relative min-h-[100dvh] px-4 py-12 ${authPageBgClass}`}>
      <div className="relative mx-auto w-full max-w-md">
        <Link
          href="/"
          className={`mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#dadce0] bg-white px-3 py-2 shadow-sm hover:bg-[#f8f9fa]`}
          aria-label="Shirwell Bancan — home"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#f1f3f4] ring-1 ring-[#dadce0]">
            <Image
              src="/shirwell-logo-emblem.png"
              alt=""
              fill
              className="object-cover object-[center_32%] scale-[1.08]"
              sizes="36px"
            />
          </span>
          <span className="text-base font-medium text-[#202124]">Shirwell Bancan</span>
        </Link>

        <div ref={cardRef} className={`${authCardClass} px-6 py-8 sm:px-8 sm:py-10`}>
          <div key={mode}>
            <div className="flex items-center justify-center gap-2.5">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f1f3f4] ring-1 ring-[#dadce0]">
                <Image
                  src="/shirwell-logo-emblem.png"
                  alt=""
                  fill
                  className="object-cover object-[center_32%] scale-[1.08]"
                  sizes="40px"
                  priority
                />
              </span>
              <p className="text-sm font-medium text-[#5f6368]">Shirwell</p>
            </div>
            <h1
              id={titleId}
              className="mt-4 text-center text-2xl font-normal text-[#202124] sm:text-[1.75rem]"
            >
              {heading}
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-[#5f6368]">
              {mode === "signup"
                ? "Create an account to continue to the next step."
                : "Log in to continue. You will be sent back automatically after signing in."}
            </p>

            <form
              key={`${mode}-form`}
              className="mt-6 space-y-3"
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
                className="rounded-lg border border-[#f28b82] bg-[#fce8e6] px-4 py-3 text-sm text-[#c5221f]"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {mode === "signup" ? (
              <AuthFieldShell icon={<User className="h-5 w-5" />}>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  className={authInputClass}
                />
              </AuthFieldShell>
            ) : null}

            <AuthFieldShell icon={<Mail className="h-5 w-5" />}>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className={authInputClass}
              />
            </AuthFieldShell>

            <AuthFieldShell icon={<Lock className="h-5 w-5" />}>
              <div className="flex w-full items-center gap-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="Password"
                  className={authInputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </AuthFieldShell>

            {mode === "signup" ? (
              <AuthFieldShell icon={<Lock className="h-5 w-5" />}>
                <div className="flex w-full items-center gap-2">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    className={authInputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
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
              </AuthFieldShell>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className={`mt-1 ${authPrimaryButtonClass}`}
            >
              {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
            </button>

            {info ? (
              <p className="rounded-lg border border-[#dadce0] bg-[#f8f9fa] px-4 py-3 text-sm text-[#3c4043]">
                {info}
              </p>
            ) : null}
          </form>

            <div className="my-6 flex items-center gap-3 text-xs text-[#5f6368]">
              <span className="h-px flex-1 bg-[#dadce0]" />
              <span className="shrink-0 text-center">Or</span>
              <span className="h-px flex-1 bg-[#dadce0]" />
            </div>

            <SocialAuthButtons
              supabase={supabase}
              nextAfterAuth={redirectTarget}
              busy={busy}
              setBusy={setBusy}
              setError={setError}
              onMissingSupabase={() => setError(SUPABASE_AUTH_SETUP_MESSAGE)}
              mode={mode}
              onSwitchMode={() =>
                switchAuthMode(mode === "signup" ? "login" : "signup")
              }
            />

            <div className="mt-4">
              <SocialAuthPrivacyNote />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
