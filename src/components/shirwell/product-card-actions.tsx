"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { StoreProduct } from "@/lib/products";

type ProductCardActionsProps = {
  product: StoreProduct;
  /** Where to return after login */
  returnPath?: string;
  variant?: "default" | "compact" | "overlay";
};

export function ProductCardActions({
  product,
  returnPath,
  variant = "default",
}: ProductCardActionsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productPath = returnPath ?? `/products/${product.slug}`;
  const loginUrl = `/auth/login?redirect=${encodeURIComponent(productPath)}`;
  const outOfStock = product.availability === "OutOfStock";

  async function handleBuy(e?: React.MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
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
        setError(data?.error ?? "Checkout unavailable.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function handleAddToCart(e?: React.MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    if (outOfStock) return;
    addItem(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (variant === "overlay") {
    return (
      <div className="space-y-1">
        {error ? <p className="text-[10px] text-red-300">{error}</p> : null}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => void handleBuy(e)}
            disabled={busy}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-[#FFC107] px-2 py-1.5 text-[11px] font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ShoppingBag className="h-3 w-3" />
            )}
            Buy
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-white/25 bg-black/40 px-2 py-1.5 text-[11px] font-semibold text-white transition hover:border-[#FFC107]/50 hover:text-[#FFC107]"
          >
            <ShoppingCart className="h-3 w-3" />
            {added ? "Added!" : "Cart"}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="space-y-1">
        {error ? <p className="text-[10px] text-red-300">{error}</p> : null}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => void handleBuy(e)}
            disabled={busy}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-[#FFC107] px-2 py-1.5 text-[11px] font-semibold text-stone-950 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Buy"}
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-white/15 px-2 py-1.5 text-[11px] font-semibold text-zinc-200"
          >
            {added ? "Added!" : "Cart"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 pt-2">
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(e) => void handleBuy(e)}
          disabled={busy || outOfStock}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-3 py-2 text-xs font-semibold text-stone-950 transition hover:bg-[#e6ae06] disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ShoppingBag className="h-3.5 w-3.5" />
          )}
          {outOfStock ? "Sold out" : "Buy"}
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-[#FFC107]/30 hover:text-[#FFC107] disabled:opacity-50 sm:flex-none sm:px-4 sm:text-sm"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
