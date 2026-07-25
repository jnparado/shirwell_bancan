"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import type { StoreProduct } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";

type ProductBuyButtonProps = {
  product: StoreProduct;
};

export function ProductBuyButton({ product }: ProductBuyButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productPath = `/products/${product.slug}`;
  const outOfStock = product.availability === "OutOfStock";
  const loginUrl = `/auth/login?redirect=${encodeURIComponent(productPath)}`;
  const signUpUrl = `/auth/login?mode=signup&redirect=${encodeURIComponent(productPath)}`;

  async function handleBuy() {
    if (outOfStock) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug }),
      });

      const data = (await res.json().catch(() => null)) as {
        url?: string;
        error?: string;
        signInUrl?: string;
        signUpUrl?: string;
      } | null;

      if (res.status === 401) {
        router.push(data?.signInUrl ?? loginUrl);
        return;
      }

      if (!res.ok || !data?.url) {
        setError(data?.error ?? "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3 border-t border-white/[0.06] pt-5">
      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => void handleBuy()}
        disabled={busy || outOfStock}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingBag className="h-4 w-4" />
        )}
        {outOfStock ? "Out of stock" : `Buy — ${formatProductPrice(product)}`}
      </button>

      <p className="text-xs text-zinc-500">
        You must{" "}
        <Link href={loginUrl} className="text-[#FFC107] hover:underline">
          log in
        </Link>{" "}
        or{" "}
        <Link href={signUpUrl} className="text-[#FFC107] hover:underline">
          sign up
        </Link>{" "}
        before checkout. Secure card payment via Stripe.
      </p>
    </div>
  );
}
