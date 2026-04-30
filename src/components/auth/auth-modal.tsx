"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";

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

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setOpen(true);
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
          }}
          className="rounded-full border border-[#FFC107]/40 bg-[#FFC107] px-3 py-2 text-sm font-semibold text-stone-950 shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-[#e6ae06] sm:px-4"
        >
          Sign Up
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className={`relative w-full max-w-[920px] overflow-hidden ${glassCard} shadow-[0_0_90px_rgba(0,0,0,0.7)]`}
          >
            <div className="absolute inset-0">
              <Image
                src="/auth/auth-signup-bg.png"
                alt=""
                fill
                className="object-cover opacity-70"
                sizes="920px"
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

            <div className="relative grid gap-0 md:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC107]/70">
                  Shirwell
                </p>
                <h2
                  id={titleId}
                  className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#FFC107] sm:text-4xl"
                >
                  {heading}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-200/90">
                  {mode === "signup"
                    ? "Join Shirwell Bancan and experience original songs, updates, and releases."
                    : "Log in to continue listening and manage your account."}
                </p>

                <form
                  className="mt-7 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
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
                    className="mt-2 w-full rounded-xl bg-gradient-to-b from-[#FFC107] to-[#d99b03] py-3 text-sm font-semibold text-stone-950 shadow-[0_0_40px_rgba(255,193,7,0.22)] transition hover:from-[#ffd042] hover:to-[#e6ae06]"
                  >
                    {mode === "signup" ? "Sign Up" : "Log In"}
                  </button>

                  <div className="my-3 flex items-center gap-3 text-xs text-zinc-400">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    OR
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-black/35 py-3 text-sm font-semibold text-zinc-100 transition hover:border-[#FFC107]/25 hover:bg-black/45"
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

              <aside className="relative hidden border-l border-white/[0.06] md:block">
                <Image
                  src="/auth/auth-promo.png"
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="460px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC107]/75">
                    Experience
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold text-[#FFC107]">
                    45 years of original songs
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-200/90">
                    Celebrating a legacy of passion, storytelling, and timeless melodies.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

