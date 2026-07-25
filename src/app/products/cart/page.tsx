import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { CartPageClient } from "@/components/shirwell/cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Shirwell store cart.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="page-shell">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/products"
          className="text-sm text-[#FFC107] underline-offset-2 hover:underline"
        >
          ← Continue shopping
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-[#FFC107]">Your cart</h1>
        <div className="mt-8">
          <CartPageClient />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
