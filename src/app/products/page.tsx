import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ContentPageAdTop, ContentPageAds } from "@/components/ads/content-page-ads";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ProductCard } from "@/components/shirwell/product-card";
import { getProductsIndexJsonLd, STORE_PRODUCTS } from "@/lib/products";
import { SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shirwell Bancan products — wildflower honey, gold frame sunglasses, dark chocolate, vinyl, and more from the official store.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products | ${SITE_NAME}`,
    description:
      "Shop sample Shirwell products — honey, sunglasses, chocolate, and limited edition releases.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="page-shell relative">
      <JsonLdScript data={getProductsIndexJsonLd()} />
      <MarketingHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#FFC107] sm:text-3xl">
              Products
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Shop Shirwell Bancan — honey, sunglasses, chocolate, and more from the
              official store.
            </p>
          </div>
          <Link
            href="/products/cart"
            className="rounded-full border border-[#FFC107]/30 bg-[#FFC107]/10 px-4 py-2 text-sm font-medium text-[#FFC107] transition hover:bg-[#FFC107]/20"
          >
            View cart →
          </Link>
        </div>

        <ContentPageAdTop className="mt-6 px-0 py-4" />

        <section className="mt-8">
          <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">
            Just for you
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {STORE_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className={`${glassCard} mt-8 p-6 sm:p-8`}>
          <h2 className="font-serif text-xl font-semibold text-[#FFC107]">
            Also from Shirwell
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <li>
              <span className="font-semibold text-zinc-200">Jungle coffee</span> — unique
              roasts sourced from Shirwell&apos;s travels.
            </li>
            <li>
              <span className="font-semibold text-zinc-200">Roses &amp; flowers</span> —{" "}
              <Link
                href="/flowers"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                order through Nati Roses
              </Link>{" "}
              for weddings, funerals, and special occasions.
            </li>
            <li>
              <span className="font-semibold text-zinc-200">Premium releases</span> —
              exclusive tracks for subscribers on{" "}
              <Link
                href="/premium"
                className="text-[#FFC107] underline-offset-2 hover:underline"
              >
                Premium
              </Link>
              .
            </li>
          </ul>
        </section>
        <ContentPageAds className="px-0 py-6" placement="both" />
      </main>
      <BottomNav />
    </div>
  );
}
