"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function CartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/products/cart"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition hover:border-[#FFC107]/30 hover:text-[#FFC107]"
      aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
      title="Cart"
    >
      <ShoppingCart className="h-4 w-4" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFC107] px-1 text-[10px] font-bold text-stone-950">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
