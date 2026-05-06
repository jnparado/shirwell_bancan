"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

const glassCard =
  "rounded-2xl border border-white/[0.06] bg-[rgba(0,0,0,0.38)] backdrop-blur-xl";

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

export function AuthModalLauncher() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const supabase = useMemo(() => {
    try {
      return createBrowserSupabaseClient();
    } catch {
      return null;
    }
  }, []);

  const titleId = useId();

  const heading = useMemo(
    () => (mode === "signup" ? "Create Your Account" : "Welcome Back"),
    [mode],
  );

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
      setUserEmail(data.user?.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  async function upsertProfile(args: {
    userId: string;
    email: string | null | undefined;
    fullName?: string | null;
  }) {
    if (!supabase) return;
    const { userId, email, fullName } = args;
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: userId,
        email: email ?? null,
        full_name: fullName?.trim() ? fullName.trim() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (profileError) {
      throw new Error(
        profileError.message ||
          "Could not save your profile. Create the `profiles` table in Supabase and enable RLS policies.",
      );
    }
  }

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        {userEmail ? (
          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-full border border-white/[0.08] bg-black/30 px-3 py-2 text-xs font-semibold text-zinc-200">
              {userEmail}
            </span>
            <button
              type="button"
              onClick={async () => {
                if (!supabase) return;
                setBusy(true);
                setError(null);
                const { error: signOutError } = await supabase.auth.signOut();
                setBusy(false);
                if (signOutError) setError(signOutError.message);
              }}
              className="rounded-full border border-white/[0.10] bg-black/35 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-[#FFC107]/20 hover:text-[#FFC107]"
              disabled={busy}
            >
              Log out
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setOpen(true);
            setError(null);
          }}
          className="rounded-full border border-[#FFC107]/30 bg-[rgba(255,255,255,0.05)] px-3 py-2 text-sm font-medium text-[#FFC107] backdrop-blur-md transition hover:border-[#FFC107]/50 hover:bg-[rgba(255,255,255,0.08)] sm:px-4"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setOpen(true);
            setError(null);
          }}
          className="rounded-full border border-[#FFC107]/40 bg-[#FFC107] px-3 py-2 text-sm font-semibold text-stone-950 shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-[#e6ae06] sm:px-4"
        >
          Sign Up
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex min-h-[100dvh] overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className={`relative my-auto max-h-[calc(100dvh-3rem)] w-full max-w-[540px] overflow-y-auto ${glassCard} shadow-[0_0_90px_rgba(0,0,0,0.7)]`}
          >
            <div className="absolute inset-0">
              <Image
                src="/auth/auth-signup-bg.png"
                alt=""
                fill
                className="object-cover opacity-70"
                sizes="540px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/85" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,193,7,0.18),transparent_55%)]" />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-black/40 text-zinc-200 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex min-h-[520px] items-center justify-center px-5 py-8 sm:min-h-[640px] sm:px-8 sm:py-10">
              <div className="mx-auto w-full max-w-md">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC107]/70">
                    Shirwell
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#FFC107] sm:text-4xl"
                  >
                    {heading}
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-200/90">
                    {mode === "signup"
                      ? "Join Shirwell Bancan and experience original songs, updates, and releases."
                      : "Log in to continue listening and manage your account."}
                  </p>
                </div>

                <form
                  className="mt-7 space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (!supabase) {
                      setError(
                        "Auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
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
                        if (signUpData.user) {
                          await upsertProfile({
                            userId: signUpData.user.id,
                            email: signUpData.user.email,
                            fullName: name,
                          });
                        }

                        setOpen(false);
                        form.reset();
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
                      if (signInData.user) {
                        try {
                          await upsertProfile({
                            userId: signInData.user.id,
                            email: signInData.user.email,
                          });
                        } catch {
                          // Ignore: login should still succeed even if profile table isn't configured.
                        }
                      }

                      setOpen(false);
                      form.reset();
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {mode === "signup" ? (
                    <FieldShell icon={<User className="h-5 w-5" />}>
                      <input
                        name="name"
                        autoComplete="name"
                        placeholder="Full Name"
                        className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                      />
                    </FieldShell>
                  ) : null}

                  <FieldShell icon={<Mail className="h-5 w-5" />}>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email Address"
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
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-black/30 text-zinc-200 transition hover:border-[#FFC107]/25 hover:text-[#FFC107]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4.5 w-4.5" />
                        ) : (
                          <Eye className="h-4.5 w-4.5" />
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
                          placeholder="Confirm Password"
                          className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-black/30 text-zinc-200 transition hover:border-[#FFC107]/25 hover:text-[#FFC107]"
                          aria-label={
                            showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4.5 w-4.5" />
                          ) : (
                            <Eye className="h-4.5 w-4.5" />
                          )}
                        </button>
                      </div>
                    </FieldShell>
                  ) : null}

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gradient-to-b from-[#FFC107] to-[#d99b03] py-3 text-sm font-semibold text-stone-950 shadow-[0_0_40px_rgba(255,193,7,0.22)] transition hover:from-[#ffd042] hover:to-[#e6ae06] disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={busy}
                  >
                    {busy ? "Please wait…" : mode === "signup" ? "Sign Up" : "Log In"}
                  </button>

                  {error ? (
                    <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </p>
                  ) : null}

                  <div className="my-3 flex items-center gap-3 text-xs text-zinc-400">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    OR
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-black/35 py-3 text-sm font-semibold text-zinc-100 transition hover:border-[#FFC107]/25 hover:bg-black/45 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={busy}
                    onClick={async () => {
                      if (!supabase) {
                        setError(
                          "Auth is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
                        );
                        return;
                      }
                      setBusy(true);
                      setError(null);
                      const { error: oauthError } = await supabase.auth.signInWithOAuth({
                        provider: "google",
                        options: {
                          redirectTo: `${window.location.origin}/`,
                        },
                      });
                      setBusy(false);
                      if (oauthError) setError(oauthError.message);
                    }}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                      <span className="text-sm font-black text-black">G</span>
                    </span>
                    {mode === "signup" ? "Sign up with Google" : "Log in with Google"}
                  </button>

                  <p className="pt-2 text-center text-sm text-zinc-300/90">
                    {mode === "signup" ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="font-semibold text-[#FFC107] hover:underline"
                        >
                          Log In
                        </button>
                      </>
                    ) : (
                      <>
                        New here?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("signup")}
                          className="font-semibold text-[#FFC107] hover:underline"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

