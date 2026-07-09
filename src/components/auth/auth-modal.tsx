"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";
import { AccountMenu, userToAccountMenuUser } from "@/components/auth/account-menu";
import { upsertPublicProfile } from "@/lib/auth/upsert-public-profile";
import { SocialAuthButtons, SocialAuthPrivacyNote } from "@/components/auth/social-auth-buttons";
import {
  AuthFieldShell,
  authCardClass,
  authInputClass,
  authOverlayClass,
  authPrimaryButtonClass,
} from "@/components/auth/auth-ui";
import { createBrowserSupabaseClientAsync } from "@/lib/supabase/client";
import { SUPABASE_AUTH_SETUP_MESSAGE } from "@/lib/supabase/env";

type AuthMode = "login" | "signup";

function useEscape(onEscape: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onEscape();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onEscape]);
}

export function AuthModalLauncher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userChip, setUserChip] = useState<ReturnType<typeof userToAccountMenuUser>>(null);

  const [supabase, setSupabase] = useState<Awaited<
    ReturnType<typeof createBrowserSupabaseClientAsync>
  > | null>(null);

  useEffect(() => {
    let mounted = true;
    createBrowserSupabaseClientAsync()
      .then((client) => {
        if (mounted) setSupabase(client);
      })
      .catch(() => {
        if (mounted) setSupabase(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const heading = useMemo(
    () => (mode === "signup" ? "Create Your Account" : "Welcome Back"),
    [mode],
  );

  function openAuthModal(nextMode: AuthMode) {
    setMode(nextMode);
    setOpen(true);
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function switchAuthMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current?.scrollTo({ top: 0 });
  }, [open, mode]);

  useEscape(() => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserChip(userToAccountMenuUser(data.user));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserChip(userToAccountMenuUser(session?.user ?? null));
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        {userChip ? (
          <AccountMenu user={userChip} supabase={supabase} />
        ) : (
          <>
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="rounded-full border border-[#FFC107]/30 bg-[rgba(255,255,255,0.05)] px-2.5 py-1.5 text-xs font-medium text-[#FFC107] backdrop-blur-md transition hover:border-[#FFC107]/50 hover:bg-[rgba(255,255,255,0.08)] sm:px-4 sm:py-2 sm:text-sm"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="rounded-full border border-[#FFC107]/40 bg-[#FFC107] px-2.5 py-1.5 text-xs font-semibold text-stone-950 shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-[#e6ae06] sm:px-4 sm:py-2 sm:text-sm"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {open ? (
        <div
          className={`fixed inset-0 z-[100] flex min-h-[100dvh] overflow-y-auto overscroll-contain px-3 py-4 sm:px-4 sm:py-6 ${authOverlayClass}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={panelRef}
            className={`relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-[480px] overflow-y-auto ${authCardClass}`}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex min-h-0 items-start justify-center px-6 py-10 sm:px-10">
              <div key={mode} className="mx-auto w-full max-w-sm">
                <div className="text-center">
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
                  <h2
                    id={titleId}
                    className="mt-4 text-2xl font-normal leading-tight text-[#202124] sm:text-[1.75rem]"
                  >
                    {heading}
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#5f6368]">
                    {mode === "signup"
                      ? "Join Shirwell Bancan and experience original songs, updates, and releases."
                      : "Log in to continue listening and manage your account."}
                  </p>
                </div>

                <form
                  key={`${mode}-form`}
                  className="mt-6 space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();

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
                          options: {
                            data: name ? { full_name: name } : undefined,
                          },
                        });
                        if (signUpError) {
                          setError(signUpError.message);
                          return;
                        }

                        // Save profile row (optional but recommended for app completeness).
                        if (signUpData.user && supabase) {
                          const { error: profileErr } = await upsertPublicProfile(supabase, {
                            userId: signUpData.user.id,
                            email: signUpData.user.email,
                            fullName: name,
                          });
                          if (profileErr) {
                            setError(
                              `${profileErr} If the table uses extra columns, add defaults or relax RLS for insert.`,
                            );
                            return;
                          }
                        }

                        setOpen(false);
                        form.reset();
                        router.refresh();
                        return;
                      }

                      const { data: signInData, error: signInError } =
                        await supabase.auth.signInWithPassword({
                          email,
                          password,
                        });
                      if (signInError) {
                        setError(signInError.message);
                        return;
                      }

                      // Ensure a profile row exists for this user (best-effort).
                      if (signInData.user && supabase) {
                        const { error: profileErr } = await upsertPublicProfile(supabase, {
                          userId: signInData.user.id,
                          email: signInData.user.email,
                        });
                        if (profileErr) {
                          /* Login still succeeds; profile may be created by DB trigger. */
                        }
                      }

                      setOpen(false);
                      form.reset();
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
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
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
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
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
                    className={`mt-1 ${authPrimaryButtonClass}`}
                    disabled={busy}
                  >
                    {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Log in"}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-3 text-xs text-[#5f6368]">
                  <span className="h-px flex-1 bg-[#dadce0]" />
                  <span className="shrink-0 text-center">Or</span>
                  <span className="h-px flex-1 bg-[#dadce0]" />
                </div>

                <SocialAuthButtons
                  supabase={supabase}
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
      ) : null}
    </>
  );
}

