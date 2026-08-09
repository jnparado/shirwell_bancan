"use client";

import { useState } from "react";
import { Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { StoreProduct } from "@/lib/products";
import { ProductPaymentModal } from "@/components/shirwell/product-payment-modal";
import { useProductBuy } from "@/hooks/use-product-buy";
import { isStoreComingSoon } from "@/config/store";

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
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { busy, error, modalOpen, clientSecret, publishableKey, handleBuy, closeModal } =
    useProductBuy({ product, returnPath });

  const outOfStock = product.availability === "OutOfStock";
  const comingSoon = isStoreComingSoon();
  const purchaseBlocked = outOfStock || comingSoon;

  function handleAddToCart(e?: React.MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    if (purchaseBlocked) return;
    addItem(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const modal = (
    <ProductPaymentModal
      open={modalOpen}
      product={product}
      clientSecret={clientSecret}
      publishableKey={publishableKey}
      busy={busy}
      error={error}
      onClose={closeModal}
    />
  );

  if (comingSoon) {
    return (
      <p className="text-center text-[11px] font-medium text-zinc-400">Coming soon</p>
    );
  }

  if (variant === "overlay") {
    return (
      <>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => void handleBuy(e)}
            disabled={busy || purchaseBlocked}
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
            disabled={purchaseBlocked}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-white/25 bg-black/40 px-2 py-1.5 text-[11px] font-semibold text-white transition hover:border-[#FFC107]/50 hover:text-[#FFC107] disabled:opacity-50"
          >
            <ShoppingCart className="h-3 w-3" />
            {added ? "Added!" : "Cart"}
          </button>
        </div>
        {modal}
      </>
    );
  }

  if (variant === "compact") {
    return (
      <>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => void handleBuy(e)}
            disabled={busy || purchaseBlocked}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-[#FFC107] px-2 py-1.5 text-[11px] font-semibold text-stone-950 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Buy"}
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={purchaseBlocked}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-white/15 px-2 py-1.5 text-[11px] font-semibold text-zinc-200"
          >
            {added ? "Added!" : "Cart"}
          </button>
        </div>
        {modal}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 pt-2">
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
      {modal}
    </>
  );
}
