"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { safeNextPath } from "@/lib/auth/safe-next-path";
import { STATIC_ADMIN_EMAIL } from "@/config/static-admin";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const titleId = useId();
  const nextPath = useMemo(() => safeNextPath(params.get("next") || "/admin"), [params]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="admin-shell flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-white/[0.08] bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-md sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--shirwell-gold)]">
          Shirwell Admin
        </p>
        <h1 id={titleId} className="mt-2 font-serif text-2xl text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Temporary static credentials for development. Use{" "}
          <span className="text-zinc-300">{STATIC_ADMIN_EMAIL}</span>.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setBusy(true);
            setError(null);

            const form = event.currentTarget;
            const fd = new FormData(form);
            const email = String(fd.get("email") ?? "").trim();
            const password = String(fd.get("password") ?? "");

            try {
              const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              });

              if (!res.ok) {
                const data = (await res.json().catch(() => null)) as { error?: string } | null;
                setError(data?.error ?? "Sign in failed.");
                return;
              }

              router.replace(nextPath);
              router.refresh();
            } catch {
              setError("Network error. Try again.");
            } finally {
              setBusy(false);
            }
          }}
        >
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm text-zinc-300">
              <Mail className="h-4 w-4" /> Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              defaultValue={STATIC_ADMIN_EMAIL}
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none ring-[var(--shirwell-gold)]/40 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm text-zinc-300">
              <Lock className="h-4 w-4" /> Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none ring-[var(--shirwell-gold)]/40 focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-full rounded-lg bg-[var(--shirwell-gold)] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in to admin"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-[var(--shirwell-gold)]">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
