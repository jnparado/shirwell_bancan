"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { StoreProduct } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";
import { ProductPaymentModal } from "@/components/shirwell/product-payment-modal";
import { useProductBuy } from "@/hooks/use-product-buy";
import { loginUrl } from "@/config/auth-routes";

type ProductBuyButtonProps = {
  product: StoreProduct;
};

export function ProductBuyButton({ product }: ProductBuyButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { busy, error, modalOpen, clientSecret, publishableKey, handleBuy, closeModal } =
    useProductBuy({ product });

  const productPath = `/products/${product.slug}`;
  const outOfStock = product.availability === "OutOfStock";
  const signInHref = loginUrl({ redirect: productPath });
  const signUpHref = loginUrl({ redirect: productPath, mode: "signup" });

  function handleAddToCart() {
    if (outOfStock) return;
    addItem(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="space-y-3 border-t border-white/[0.06] pt-5">
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
          <Link href={signInHref} className="text-[#FFC107] hover:underline">
            Log in
          </Link>{" "}
          or{" "}
          <Link href={signUpHref} className="text-[#FFC107] hover:underline">
            sign up
          </Link>{" "}
          before checkout.
        </p>
      </div>

      <ProductPaymentModal
        open={modalOpen}
        product={product}
        clientSecret={clientSecret}
        publishableKey={publishableKey}
        busy={busy}
        error={error}
        onClose={closeModal}
      />
    </>
  );
}
