"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { STORE_PRODUCTS, formatProductPrice, getStoreProduct } from "@/lib/products";
import { loginUrl } from "@/config/auth-routes";
import { isStoreComingSoon } from "@/config/store";
import { StoreComingSoonNotice } from "@/components/shirwell/store-coming-soon-notice";

function CartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, removeItem, setQuantity, clearCart, count } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchase = searchParams.get("purchase");

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getStoreProduct(item.slug);
          if (!product) return null;
          return { item, product, lineTotal: product.price * item.quantity };
        })
        .filter(Boolean) as {
        item: { slug: string; quantity: number };
        product: (typeof STORE_PRODUCTS)[number];
        lineTotal: number;
      }[],
    [items],
  );

  const total = cartLines.reduce((sum, line) => sum + line.lineTotal, 0);

  useEffect(() => {
    if (purchase === "success") {
      clearCart();
    }
  }, [purchase, clearCart]);

  async function checkout() {
    if (isStoreComingSoon()) {
      setError("The shop is coming soon — checkout is not available yet.");
      return;
    }
    if (cartLines.length === 0) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });

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
        setError(data?.error ?? "Could not start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <StoreComingSoonNotice variant="compact" />

      {purchase === "success" ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Order confirmed — thank you! Your cart has been cleared.
        </p>
      ) : null}

      {count === 0 ? (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
          <p className="text-zinc-300">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-flex rounded-full border border-[#FFC107]/35 px-5 py-2 text-sm font-semibold text-[#FFC107] hover:bg-[rgba(255,193,7,0.08)]"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-white/[0.03]">
            {cartLines.map(({ item, product, lineTotal }) => (
              <li key={product.slug} className="flex gap-4 p-4 sm:p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/40">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-serif text-lg text-[#FFC107] hover:underline"
                  >
                    {product.shortName}
                  </Link>
                  <p className="text-sm text-zinc-400">{formatProductPrice(product)} each</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-zinc-400">
                      Qty
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          setQuantity(product.slug, Number(e.target.value))
                        }
                        className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-zinc-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeItem(product.slug)}
                      className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-semibold text-zinc-100">
                  {new Intl.NumberFormat("en-AU", {
                    style: "currency",
                    currency: product.currency,
                  }).format(lineTotal)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total</p>
              <p className="text-2xl font-semibold text-zinc-100">
                {new Intl.NumberFormat("en-AU", {
                  style: "currency",
                  currency: "AUD",
                }).format(total)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void checkout()}
              disabled={busy || isStoreComingSoon()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FFC107]/35 bg-[#FFC107] px-6 py-3 text-sm font-semibold text-stone-950 hover:bg-[#e6ae06] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
              {isStoreComingSoon() ? "Coming soon" : "Checkout"}
            </button>
          </div>

          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <p className="text-xs text-zinc-500">
            <Link href={loginUrl({ redirect: "/products/cart" })} className="text-[#FFC107] hover:underline">
              Log in
            </Link>{" "}
            or sign up before checkout. Card payment via Stripe.
          </p>
        </>
      )}
    </div>
  );
}

export function CartPageClient() {
  return (
    <Suspense fallback={<p className="text-zinc-400">Loading cart…</p>}>
      <CartPageContent />
    </Suspense>
  );
}
