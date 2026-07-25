"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CreditCard, Loader2, X } from "lucide-react";
import type { StripePremiumPlan } from "@/config/stripe";
import { PremiumStripeEmbeddedCheckout } from "@/components/subscriptions/premium-stripe-embedded";

type PremiumStatus = {
  premium: boolean;
  signedIn: boolean;
  source?: string | null;
  expiresAt?: string | null;
};

type PremiumStripePlansProps = {
  checkoutStatus?: "success" | "cancel" | null;
  stripeReady: boolean;
  publishableKey: string;
  plans: StripePremiumPlan[];
};

export function PremiumStripePlans({
  checkoutStatus,
  stripeReady,
  publishableKey,
  plans,
}: PremiumStripePlansProps) {
  const router = useRouter();
  const [status, setStatus] = useState<PremiumStatus | null>(null);
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<StripePremiumPlan | null>(null);

  const loadStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/premium/status");
      if (!res.ok) return;
      setStatus((await res.json()) as PremiumStatus);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus, checkoutStatus]);

  function closeCheckout() {
    setClientSecret(null);
    setActivePlan(null);
    setError(null);
  }

  async function startEmbeddedCheckout(plan: StripePremiumPlan) {
    setBusyPlan(plan.id);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, uiMode: "embedded" }),
      });

      const data = (await res.json().catch(() => null)) as {
        clientSecret?: string;
        error?: string;
        signInUrl?: string;
        manage?: boolean;
      } | null;

      if (res.status === 401 && data?.signInUrl) {
        router.push(data.signInUrl);
        return;
      }

      if (res.status === 409 && data?.manage) {
        await openPortal();
        return;
      }

      if (!res.ok || !data?.clientSecret) {
        setError(data?.error ?? "Could not load card checkout.");
        return;
      }

      setActivePlan(plan);
      setClientSecret(data.clientSecret);
      document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusyPlan(null);
    }
  }

  async function openPortal() {
    setBusyPlan("portal");
    setError(null);

    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
        signInUrl?: string;
      } | null;

      if (res.status === 401 && data?.signInUrl) {
        router.push(data.signInUrl);
        return;
      }

      if (!res.ok || !data?.url) {
        setError(data?.error ?? "Could not open billing portal.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusyPlan(null);
    }
  }

  if (!stripeReady) {
    return (
      <div
        id="subscribe"
        className="scroll-mt-24 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-sm text-zinc-400"
      >
        <p className="font-medium text-zinc-300">Card checkout (Stripe)</p>
        <p className="mt-2">
          Add these to <code className="text-zinc-300">.env</code> or Vercel, then restart:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 font-mono text-xs text-zinc-500">
          <li>STRIPE_SECRET_KEY=sk_test_...</li>
          <li>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</li>
          <li>STRIPE_WEBHOOK_SECRET=whsec_...</li>
        </ul>
      </div>
    );
  }

  const hasStripeSub = status?.premium && status?.source === "stripe";

  return (
    <div id="subscribe" className="scroll-mt-24 space-y-4">
      {checkoutStatus === "success" ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Payment received — Premium activates within a minute once Stripe confirms your
          subscription.
        </p>
      ) : null}
      {checkoutStatus === "cancel" ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
          Checkout cancelled. Choose a plan below when you&apos;re ready.
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {hasStripeSub ? (
        <div className="rounded-xl border border-[#FFC107]/25 bg-[rgba(255,193,7,0.08)] p-5">
          <p className="font-medium text-[#FFC107]">You&apos;re on Shirwell Premium</p>
          <p className="mt-1 text-sm text-zinc-300">
            Manage your card, invoices, or cancellation in Stripe.
            {status?.expiresAt
              ? ` Renews ${new Date(status.expiresAt).toLocaleDateString("en-AU")}.`
              : null}
          </p>
          <button
            type="button"
            onClick={() => void openPortal()}
            disabled={busyPlan === "portal"}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-60"
          >
            {busyPlan === "portal" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            Manage subscription
          </button>
        </div>
      ) : clientSecret && activePlan ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-300">
              Pay with card —{" "}
              <span className="font-medium text-[#FFC107]">{activePlan.label}</span>{" "}
              ({activePlan.displayAmount})
            </p>
            <button
              type="button"
              onClick={closeCheckout}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" /> Close
            </button>
          </div>
          <PremiumStripeEmbeddedCheckout
            publishableKey={publishableKey}
            clientSecret={clientSecret}
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {plan.label}
              </p>
              <p className="mt-2 font-serif text-3xl text-[#FFC107]">{plan.displayAmount}</p>
              <p className="mt-2 flex-1 text-sm text-zinc-400">{plan.description}</p>
              <button
                type="button"
                onClick={() => void startEmbeddedCheckout(plan)}
                disabled={Boolean(busyPlan)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-60"
              >
                {busyPlan === plan.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                Pay with card
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-500">
        Secure card payments by{" "}
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 underline-offset-2 hover:text-[#FFC107] hover:underline"
        >
          Stripe
        </a>
        . Sign in first — Premium syncs to your Shirwell account.{" "}
        <Link href="/auth/login?next=/premium" className="text-[#FFC107] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
