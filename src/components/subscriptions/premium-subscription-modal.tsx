"use client";

import { Loader2, X } from "lucide-react";
import type { PremiumPlanPublic } from "@/lib/premium/plans";
import { PremiumStripeEmbeddedCheckout } from "@/components/subscriptions/premium-stripe-embedded";

type PremiumSubscriptionModalProps = {
  open: boolean;
  plan: PremiumPlanPublic | null;
  clientSecret: string | null;
  publishableKey: string;
  busy: boolean;
  error: string | null;
  onClose: () => void;
};

export function PremiumSubscriptionModal({
  open,
  plan,
  clientSecret,
  publishableKey,
  busy,
  error,
  onClose,
}: PremiumSubscriptionModalProps) {
  if (!open) return null;

  const amountLabel = plan
    ? `${plan.displayAmount} ${plan.billingNote}`
    : "—";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-subscription-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close subscription checkout"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#141218] shadow-2xl">
        <div className="flex items-start justify-between gap-3 p-5 pb-4">
          <h2
            id="premium-subscription-title"
            className="font-serif text-xl font-semibold text-[#a855f7] sm:text-2xl"
          >
            Complete Your Subscription
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-5 pb-5">
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <div className="rounded-xl border border-white/[0.08] bg-[#1c1a22] p-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Selected Plan</p>
                <p className="mt-1 font-medium text-zinc-100">
                  {plan?.label ?? "—"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-zinc-500">Amount</p>
                <p className="mt-1 font-semibold text-[#FFC107]">{amountLabel}</p>
              </div>
            </div>
          </div>

          {busy && !clientSecret ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8 text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#a855f7]" />
              <p className="text-sm">Preparing secure checkout…</p>
            </div>
          ) : clientSecret && publishableKey.startsWith("pk_") ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-300">Card details</p>
                <PremiumStripeEmbeddedCheckout
                  publishableKey={publishableKey}
                  clientSecret={clientSecret}
                />
              </div>
              <p className="text-center text-[11px] text-zinc-500">
                Secure payment processed by Stripe. Click pay in the form above to
                complete your subscription.
              </p>
            </div>
          ) : !busy && !error && !clientSecret ? (
            <p className="rounded-lg border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm text-zinc-400">
              Waiting for secure checkout…
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
