"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, CreditCard, Crown, Loader2, X } from "lucide-react";
import type { StripePremiumPlan } from "@/config/stripe";
import type { PremiumPlanPublic } from "@/lib/premium/plans";
import { PremiumStripeEmbeddedCheckout } from "@/components/subscriptions/premium-stripe-embedded";

type PremiumStatus = {
  premium: boolean;
  signedIn: boolean;
  source?: string | null;
  expiresAt?: string | null;
};

type PlansApiResponse = {
  plans: PremiumPlanPublic[];
  stripeConfigured: boolean;
};

type PremiumCheckoutPanelProps = {
  checkoutStatus?: "success" | "cancel" | null;
  publishableKey: string;
  initialPlans: PremiumPlanPublic[];
  stripeReady: boolean;
};

export function PremiumCheckoutPanel({
  checkoutStatus,
  publishableKey,
  initialPlans,
  stripeReady,
}: PremiumCheckoutPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan");

  const [plans, setPlans] = useState(initialPlans);
  const [stripeConfigured, setStripeConfigured] = useState(stripeReady);
  const [status, setStatus] = useState<PremiumStatus | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<"monthly" | "yearly">(
    planFromUrl === "yearly" ? "yearly" : "monthly",
  );
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0] ?? null,
    [plans, selectedPlanId],
  );

  const loadStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/premium/status");
      if (!res.ok) return;
      setStatus((await res.json()) as PremiumStatus);
    } catch {
      /* ignore */
    }
  }, []);

  const loadPlans = useCallback(async () => {
    try {
      const res = await fetch("/api/stripe/plans");
      if (!res.ok) return;
      const data = (await res.json()) as PlansApiResponse;
      if (data.plans?.length) setPlans(data.plans);
      setStripeConfigured(data.stripeConfigured);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void loadStatus();
    void loadPlans();
  }, [loadStatus, loadPlans, checkoutStatus]);

  function closeCheckout() {
    setClientSecret(null);
    setError(null);
  }

  async function startCheckout(plan: StripePremiumPlan) {
    if (!stripeConfigured) {
      setError("Card payments are not configured yet. Contact support or try again later.");
      return;
    }

    setBusyPlan(plan.id);
    setError(null);
    setClientSecret(null);

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
        setError(data?.error ?? "Could not start payment.");
        return;
      }

      setClientSecret(data.clientSecret);
      document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
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

  const hasStripeSub = status?.premium && status?.source === "stripe";
  const features = plans[0]?.features ?? [];

  return (
    <div id="subscribe" className="scroll-mt-24 space-y-6">
      {checkoutStatus === "success" ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Payment received — Premium activates within a minute once our server confirms
          your subscription with Stripe.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {hasStripeSub ? (
        <div className="rounded-xl border border-[#FFC107]/25 bg-[rgba(255,193,7,0.08)] p-5">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-[#FFC107]" />
            <div>
              <p className="font-medium text-[#FFC107]">You&apos;re on Shirwell Premium</p>
              <p className="mt-1 text-sm text-zinc-300">
                {status?.expiresAt
                  ? `Renews ${new Date(status.expiresAt).toLocaleDateString("en-AU")}.`
                  : "Active subscription"}
              </p>
            </div>
          </div>
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
            Manage billing
          </button>
        </div>
      ) : (
        <>
          {/* Plan details */}
          <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Plan details</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Choose monthly or yearly. All plans include the same Premium benefits.
            </p>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC107]" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Plan picker */}
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => {
              const selected = plan.id === selectedPlanId;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    closeCheckout();
                  }}
                  className={`relative flex flex-col rounded-xl border p-5 text-left transition ${
                    selected
                      ? "border-[#FFC107]/50 bg-[rgba(255,193,7,0.08)] ring-1 ring-[#FFC107]/30"
                      : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
                  }`}
                >
                  {plan.popular ? (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-[#FFC107] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-950">
                      Best value
                    </span>
                  ) : null}
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {plan.label}
                  </p>
                  <p className="mt-2 font-serif text-3xl text-[#FFC107]">{plan.displayAmount}</p>
                  <p className="mt-1 text-xs text-zinc-500">{plan.billingNote}</p>
                  <p className="mt-3 text-sm text-zinc-400">{plan.description}</p>
                </button>
              );
            })}
          </div>

          {/* Payment — direct to backend API */}
          <section
            id="payment"
            className="scroll-mt-24 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6"
          >
            <h2 className="font-serif text-lg font-semibold text-[#FFC107]">Payment method</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Pay with card — processed securely by Stripe through our server (
              <code className="text-zinc-500">/api/stripe/checkout</code>).
            </p>

            {!stripeConfigured ? (
              <p className="mt-4 rounded-lg border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm text-zinc-400">
                Card checkout is being enabled on this site. Plan details are shown above;
                payment will appear here once Stripe is connected on the server.
              </p>
            ) : clientSecret && selectedPlan && publishableKey ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-zinc-300">
                    {selectedPlan.label} · {selectedPlan.displayAmount}
                  </p>
                  <button
                    type="button"
                    onClick={closeCheckout}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" /> Change plan
                  </button>
                </div>
                <PremiumStripeEmbeddedCheckout
                  publishableKey={publishableKey}
                  clientSecret={clientSecret}
                />
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded-md border border-white/10 px-2 py-1">Visa</span>
                  <span className="rounded-md border border-white/10 px-2 py-1">Mastercard</span>
                  <span className="rounded-md border border-white/10 px-2 py-1">Amex</span>
                </div>
                <button
                  type="button"
                  disabled={!selectedPlan || Boolean(busyPlan)}
                  onClick={() => selectedPlan && void startCheckout(selectedPlan)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-60 sm:w-auto"
                >
                  {busyPlan ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                  Continue to payment
                  {selectedPlan ? ` — ${selectedPlan.displayAmount}` : ""}
                </button>
                {!status?.signedIn ? (
                  <p className="text-xs text-zinc-500">
                    <Link href="/auth/login?next=/premium" className="text-[#FFC107] hover:underline">
                      Sign in
                    </Link>{" "}
                    first — your subscription links to your Shirwell account.
                  </p>
                ) : null}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
