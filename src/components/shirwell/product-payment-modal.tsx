"use client";

import Image from "next/image";
import { CreditCard, Loader2, X } from "lucide-react";
import type { StoreProduct } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";
import { PremiumStripeEmbeddedCheckout } from "@/components/subscriptions/premium-stripe-embedded";

type ProductPaymentModalProps = {
  open: boolean;
  product: StoreProduct;
  clientSecret: string | null;
  publishableKey: string;
  busy: boolean;
  error: string | null;
  onClose: () => void;
};

export function ProductPaymentModal({
  open,
  product,
  clientSecret,
  publishableKey,
  busy,
  error,
  onClose,
}: ProductPaymentModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-payment-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close payment"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#121110] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black/40">
              <Image
                src={product.image}
                alt=""
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0">
              <h2
                id="product-payment-title"
                className="font-serif text-lg font-semibold text-[#FFC107]"
              >
                Payment method
              </h2>
              <p className="truncate text-sm text-zinc-400">{product.shortName}</p>
              <p className="text-sm font-semibold text-zinc-100">
                {formatProductPrice(product)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          {busy && !clientSecret ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#FFC107]" />
              <p className="text-sm">Preparing secure checkout…</p>
            </div>
          ) : clientSecret && publishableKey.startsWith("pk_") ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <CreditCard className="h-4 w-4 text-[#FFC107]" />
                <span>Pay with card — processed securely by Stripe</span>
              </div>
              <PremiumStripeEmbeddedCheckout
                publishableKey={publishableKey}
                clientSecret={clientSecret}
              />
            </div>
          ) : !busy && !error ? (
            <p className="rounded-lg border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm text-zinc-400">
              Card payments are not configured on this site yet. Add Stripe keys in
              your environment to enable checkout.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
