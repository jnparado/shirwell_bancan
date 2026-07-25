"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { StoreProduct } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";

type ProductBuyButtonProps = {
  product: StoreProduct;
};

export function ProductBuyButton({ product }: ProductBuyButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
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

  function handleAddToCart() {
    if (outOfStock) return;
    addItem(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-3 border-t border-white/[0.06] pt-5">
      {error ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void handleBuy()}
          disabled={busy || outOfStock}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingBag className="h-4 w-4" />
          )}
          {outOfStock ? "Out of stock" : `Buy — ${formatProductPrice(product)}`}
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-[#FFC107]/30 hover:text-[#FFC107] disabled:opacity-50 sm:flex-none"
        >
          <ShoppingCart className="h-4 w-4" />
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        <Link href="/products/cart" className="text-[#FFC107] hover:underline">
          View cart
        </Link>
        {" · "}
        <Link href={loginUrl} className="text-[#FFC107] hover:underline">
          Log in
        </Link>{" "}
        or{" "}
        <Link href={signUpUrl} className="text-[#FFC107] hover:underline">
          sign up
        </Link>{" "}
        before checkout.
      </p>
    </div>
  );
}
