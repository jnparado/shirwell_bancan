"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, CreditCard, Crown, Loader2 } from "lucide-react";
import type { PremiumPlanId, StripePremiumPlan } from "@/config/stripe";
import type { PremiumPlanPublic } from "@/lib/premium/plans";
import { PremiumSubscriptionModal } from "@/components/subscriptions/premium-subscription-modal";

type PremiumStatus = {
  premium: boolean;
  signedIn: boolean;
  source?: string | null;
  expiresAt?: string | null;
};

type PlansApiResponse = {
  plans: PremiumPlanPublic[];
  stripeConfigured: boolean;
  paymentsEnabled?: boolean;
};

type PremiumCheckoutPanelProps = {
  checkoutStatus?: "success" | "cancel" | null;
  publishableKey: string;
  initialPlans: PremiumPlanPublic[];
  stripeReady: boolean;
};

function parsePlanId(value: string | null): PremiumPlanId {
  if (value === "weekly" || value === "yearly") return value;
  return "monthly";
}

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
  const [paymentsEnabled, setPaymentsEnabled] = useState(stripeReady);
  const [stripeConfigured, setStripeConfigured] = useState(stripeReady);
  const [status, setStatus] = useState<PremiumStatus | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<PremiumPlanId>(parsePlanId(planFromUrl));
  const [busyPlan, setBusyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [runtimePublishableKey, setRuntimePublishableKey] = useState(publishableKey);

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
      setPaymentsEnabled(data.paymentsEnabled ?? data.stripeConfigured);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void loadStatus();
    void loadPlans();
    void fetch("/api/stripe/config")
      .then((res) => res.json())
      .then((data: { publishableKey?: string | null; paymentsEnabled?: boolean }) => {
        if (data.publishableKey?.startsWith("pk_")) {
          setRuntimePublishableKey(data.publishableKey);
        }
        if (data.paymentsEnabled) {
          setPaymentsEnabled(true);
        }
      })
      .catch(() => {
        /* ignore */
      });
  }, [loadStatus, loadPlans, checkoutStatus]);

  function closeCheckout() {
    setModalOpen(false);
    setClientSecret(null);
    setError(null);
  }

  async function startCheckout(plan: StripePremiumPlan) {
    setSelectedPlanId(plan.id);
    setModalOpen(true);
    setBusyPlan(plan.id);
    setError(null);
    setClientSecret(null);

    try {
      const configRes = await fetch("/api/stripe/config");
      const config = (await configRes.json().catch(() => null)) as {
        publishableKey?: string | null;
        paymentsEnabled?: boolean;
      } | null;

      const pk = config?.publishableKey?.trim() ?? "";
      const canPay = config?.paymentsEnabled ?? paymentsEnabled;

      if (pk.startsWith("pk_")) {
        setRuntimePublishableKey(pk);
      }

      if (!canPay) {
        setError(
          "Card payments are not configured on the server yet. Add STRIPE_SECRET_KEY in your hosting settings, then redeploy.",
        );
        return;
      }

      const useEmbedded = pk.startsWith("pk_");

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          uiMode: useEmbedded ? "embedded" : "hosted",
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        clientSecret?: string;
        url?: string;
        error?: string;
        signInUrl?: string;
        manage?: boolean;
      } | null;

      if (res.status === 401 && data?.signInUrl) {
        closeCheckout();
        router.push(data.signInUrl);
        return;
      }

      if (res.status === 409 && data?.manage) {
        closeCheckout();
        await openPortal();
        return;
      }

      if (data?.url) {
        closeCheckout();
        window.location.href = data.url;
        return;
      }

      if (!res.ok || !data?.clientSecret) {
        setError(data?.error ?? "Could not start payment.");
        return;
      }

      setClientSecret(data.clientSecret);
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
          <header className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Choose Your Plan</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[#8e8e93] sm:text-base">
              Select the perfect subscription plan that fits your listening needs.
            </p>
          </header>

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => {
              const isBusy = busyPlan === plan.id;

              const cardBorder =
                plan.id === "monthly"
                  ? "border-2 border-[#b148ff]"
                  : plan.id === "weekly"
                    ? "border border-[#b148ff]"
                    : "border border-white/[0.08]";

              const badgeClass =
                plan.id === "yearly"
                  ? "bg-[#d64bb0] text-white"
                  : "bg-[#b148ff] text-white";

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col overflow-visible rounded-2xl bg-[#1a1b1e] ${cardBorder}`}
                >
                  {plan.badge ? (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClass}`}
                    >
                      {plan.badge}
                    </span>
                  ) : null}

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-8">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white">{plan.label}</h3>
                      <p className="mt-4 text-5xl font-bold leading-none text-[#FFC107]">
                        {plan.displayAmount}
                      </p>
                      <p className="mt-2 text-sm text-[#8e8e93]">{plan.billingNote}</p>
                      {plan.savingsNote ? (
                        <p className="mt-2 text-sm font-semibold text-emerald-400">
                          {plan.savingsNote}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-transparent select-none" aria-hidden>
                          &nbsp;
                        </p>
                      )}
                    </div>

                    <ul className="mt-8 flex-1 space-y-3.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-white">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#b148ff]"
                            aria-hidden
                          >
                            <Check className="h-3 w-3 text-[#b148ff]" strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      disabled={Boolean(busyPlan)}
                      onClick={() => void startCheckout(plan)}
                      className={`mt-8 w-full rounded-xl px-4 py-3.5 text-sm font-bold transition disabled:opacity-60 ${
                        plan.highlighted
                          ? "bg-[#b148ff] text-white hover:bg-[#9d3de6]"
                          : "border border-white/10 bg-[#25262a] text-white hover:border-[#b148ff]/40 hover:bg-[#2e2f34]"
                      }`}
                    >
                      {isBusy ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Starting…
                        </span>
                      ) : (
                        plan.subscribeLabel
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {!status?.signedIn ? (
            <p className="text-center text-xs text-zinc-500">
              <Link href="/auth/login?redirect=/premium" className="text-[#FFC107] hover:underline">
                Sign in
              </Link>{" "}
              before checkout — your subscription links to your Shirwell account.
            </p>
          ) : null}

          <PremiumSubscriptionModal
            open={modalOpen}
            plan={selectedPlan}
            clientSecret={clientSecret}
            publishableKey={runtimePublishableKey}
            busy={Boolean(busyPlan) && !clientSecret}
            error={modalOpen ? error : null}
            onClose={closeCheckout}
          />
        </>
      )}
    </div>
  );
}
