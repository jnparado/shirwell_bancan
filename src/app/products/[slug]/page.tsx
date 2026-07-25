import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/shirwell/marketing-header";
import { BottomNav } from "@/components/shirwell/bottom-nav";
import { ProductBuyButton } from "@/components/shirwell/product-buy-button";
import { ContentPageAds } from "@/components/ads/content-page-ads";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  STORE_PRODUCTS,
  formatProductPrice,
  getProductJsonLd,
  getStoreProduct,
  isPortraitProduct,
} from "@/lib/products";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ purchase?: string }>;
};

export function generateStaticParams() {
  return STORE_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getStoreProduct(slug);
  if (!product) return { title: "Product not found" };

  const path = `/products/${product.slug}`;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description,
      url: path,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const { purchase } = await searchParams;
  const product = getStoreProduct(slug);
  if (!product) notFound();

  const portrait = isPortraitProduct(product);

  return (
    <div className="page-shell relative">
      <JsonLdScript data={getProductJsonLd(product)} />
      <MarketingHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/products"
          className="text-sm text-[#FFC107] underline-offset-2 hover:underline"
        >
          ← All products
        </Link>

        <article className={`${glassCard} mt-6 overflow-hidden`}>
          <div
            className={`relative w-full bg-black/40 ${
              portrait
                ? "mx-auto aspect-[682/1024] max-w-md"
                : "aspect-square max-h-[480px] sm:aspect-[4/3]"
            }`}
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              className={portrait ? "object-contain" : "object-cover"}
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {product.category}
            </p>
            <h1 className="font-serif text-2xl font-semibold text-[#FFC107] sm:text-3xl">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-zinc-100">
              {formatProductPrice(product)}
            </p>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              {product.longDescription}
            </p>
            <dl className="grid gap-3 border-t border-white/[0.06] pt-4 text-sm text-zinc-400 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-zinc-500">SKU</dt>
                <dd className="text-zinc-300">{product.sku}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Availability</dt>
                <dd className="text-zinc-300">
                  {product.availability === "InStock"
                    ? "In stock"
                    : product.availability === "PreOrder"
                      ? "Pre-order"
                      : "Out of stock"}
                </dd>
              </div>
            </dl>

            {purchase === "success" ? (
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Thank you — your order is confirmed. We&apos;ll email you when it ships.
              </p>
            ) : null}
            {purchase === "cancel" ? (
              <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
                Checkout cancelled. You can buy anytime using the button below.
              </p>
            ) : null}

            <ProductBuyButton product={product} />

            <p className="text-xs text-zinc-500">
              Questions?{" "}
              <Link href="/contact" className="text-[#FFC107] hover:underline">
                Contact us
              </Link>{" "}
              or browse{" "}
              <Link href="/cds" className="text-[#FFC107] hover:underline">
                CDs &amp; vinyl
              </Link>
              .
            </p>
            <p className="break-all font-mono text-[11px] text-zinc-600">
              {absoluteUrl(`/products/${product.slug}`)}
            </p>
          </div>
        </article>
        <ContentPageAds />
      </main>
      <BottomNav />
    </div>
  );
}
