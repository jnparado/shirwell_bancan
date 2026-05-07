import type { Metadata } from "next";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products",
  description: "Products from Shirwell Bancan.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products | ${SITE_NAME}`,
    description: "Products from Shirwell Bancan.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col pb-36">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#FFC107]">
          Products
        </h1>
        <p className="mt-4 text-base text-[#FFC107]/80">Coming soon</p>
      </main>
      <BottomNav />
    </div>
  );
}

