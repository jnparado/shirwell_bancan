"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createBrowserSupabaseClientAsync } from "@/lib/supabase/client";

type ConsentDetails = {
  authorization_id: string;
  redirect_uri: string;
  client: { id: string; name: string; uri: string; logo_uri: string };
  user: { id: string; email: string };
  scope: string;
};

function isRedirectPayload(d: unknown): d is { redirect_url: string } {
  return (
    typeof d === "object" &&
    d !== null &&
    "redirect_url" in d &&
    typeof (d as { redirect_url: unknown }).redirect_url === "string"
  );
}

function isDetailsPayload(d: unknown): d is ConsentDetails {
  return (
    typeof d === "object" &&
    d !== null &&
    "client" in d &&
    typeof (d as { client: unknown }).client === "object" &&
    (d as { client: unknown }).client !== null
  );
}

const card =
  "rounded-2xl border border-[#FFC107]/20 bg-[rgba(0,0,0,0.45)] p-6 shadow-[0_0_48px_rgba(255,193,7,0.08)] backdrop-blur-xl";

export function ConsentClient() {
  const router = useRouter();
  const params = useSearchParams();
  const authorizationId = params.get("authorization_id");

  const returnPath = useMemo(
    () =>
      authorizationId
        ? `/oauth/consent?authorization_id=${encodeURIComponent(authorizationId)}`
        : "/oauth/consent",
    [authorizationId],
  );

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<ConsentDetails | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authorizationId) return;

    const authId = authorizationId;

    let cancelled = false;

    async function run() {
      try {
        const supabase = await createBrowserSupabaseClientAsync();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (cancelled) return;

        if (!session) {
          router.replace(
            `/auth/login?redirect=${encodeURIComponent(returnPath)}`,
          );
          return;
        }

        const { data, error: detailsError } =
          await supabase.auth.oauth.getAuthorizationDetails(authId);
        if (cancelled) return;

        if (detailsError) {
          setStatus("error");
          setError(detailsError.message);
          return;
        }
        if (!data) {
          setStatus("error");
          setError("Invalid authorization request.");
          return;
        }
        if (isRedirectPayload(data)) {
          window.location.assign(data.redirect_url);
          return;
        }
        if (isDetailsPayload(data)) {
          setDetails(data);
          setStatus("ready");
          return;
        }
        setStatus("error");
        setError("Unexpected response from the authorization server.");
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setError(e instanceof Error ? e.message : "Something went wrong.");
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [authorizationId, returnPath, router]);

  async function onApprove() {
    if (!authorizationId) return;
    setBusy(true);
    setError(null);
    try {
      const supabase = await createBrowserSupabaseClientAsync();
      const { error: approveError } =
        await supabase.auth.oauth.approveAuthorization(authorizationId);
      if (approveError) setError(approveError.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approval failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onDeny() {
    if (!authorizationId) return;
    setBusy(true);
    setError(null);
    try {
      const supabase = await createBrowserSupabaseClientAsync();
      const { error: denyError } =
        await supabase.auth.oauth.denyAuthorization(authorizationId);
      if (denyError) setError(denyError.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not deny request.");
    } finally {
      setBusy(false);
    }
  }

  if (!authorizationId) {
    return null;
  }

  if (status === "error") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-16">
        <div className={card}>
          <h1 className="font-serif text-2xl font-semibold text-[#FFC107]">
            Authorize app
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            {error ?? "Something went wrong loading this authorization request."}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex text-sm font-semibold text-[#FFC107] underline-offset-4 hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (status === "loading" || !details) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-sm font-semibold text-[#FFC107]">Loading request…</p>
        <p className="mt-2 text-xs text-zinc-500">
          If you are not signed in, you will be redirected to log in first.
        </p>
      </div>
    );
  }

  const scopes = details.scope
    ? details.scope.split(/\s+/).filter(Boolean)
    : [];

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <div className={card}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC107]/70">
          Shirwell account
        </p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
          Allow access?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          <span className="font-semibold text-zinc-100">{details.client.name}</span>{" "}
          wants to use your Shirwell sign-in.
        </p>

        <div className="mt-6 flex items-start gap-4 rounded-xl border border-white/[0.08] bg-black/30 p-4">
          {details.client.logo_uri ? (
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-[#FFC107]/25">
              <Image
                src={details.client.logo_uri}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </span>
          ) : null}
          <div className="min-w-0 text-sm text-zinc-300">
            <p>
              <span className="text-zinc-500">Signed in as </span>
              <span className="font-medium text-zinc-100">{details.user.email}</span>
            </p>
            {details.client.uri ? (
              <p className="mt-1 truncate text-xs text-zinc-500">
                <span className="text-zinc-600">App site: </span>
                <a
                  href={details.client.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFC107] underline-offset-2 hover:underline"
                >
                  {details.client.uri}
                </a>
              </p>
            ) : null}
            <p className="mt-2 break-all text-xs text-zinc-500">
              Redirect: {details.redirect_uri}
            </p>
          </div>
        </div>

        {scopes.length > 0 ? (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Requested permissions
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-zinc-300">
              {scopes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {error ? (
          <p className="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={busy}
            onClick={() => void onDeny()}
            className="rounded-xl border border-white/[0.12] bg-black/40 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-red-400/40 hover:text-red-200 disabled:opacity-60"
          >
            Deny
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void onApprove()}
            className="rounded-xl bg-gradient-to-b from-[#FFC107] to-[#d99b03] px-5 py-3 text-sm font-semibold text-stone-950 shadow-[0_0_32px_rgba(255,193,7,0.2)] transition hover:from-[#ffd042] hover:to-[#e6ae06] disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Allow"}
          </button>
        </div>
      </div>
    </div>
  );
}
