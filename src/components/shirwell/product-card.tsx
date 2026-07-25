import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/products";
import {
  formatProductPrice,
  getProductDiscountPercent,
  getProductPagePath,
  isPortraitProduct,
} from "@/lib/products";
import { ProductCardActions } from "@/components/shirwell/product-card-actions";
import { ProductRating } from "@/components/shirwell/product-rating";

type ProductCardProps = {
  product: StoreProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = getProductPagePath(product.slug);
  const discount = getProductDiscountPercent(product);
  const outOfStock = product.availability === "OutOfStock";
  const portrait = isPortraitProduct(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white/[0.04] transition hover:bg-white/[0.06] hover:shadow-[0_4px_24px_rgba(255,193,7,0.08)]">
      <div className="relative">
        <Link href={href} className="block">
          <div
            className={`relative w-full overflow-hidden bg-black/30 ${
              portrait ? "aspect-[682/1024]" : "aspect-square"
            }`}
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              className={`transition duration-300 group-hover:scale-[1.02] ${
                portrait ? "object-contain" : "object-cover group-hover:scale-[1.03]"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            {discount ? (
              <span className="absolute left-1.5 top-1.5 rounded bg-[#FFC107] px-1.5 py-0.5 text-[10px] font-bold text-stone-950">
                -{discount}%
              </span>
            ) : null}
            {outOfStock ? (
              <span className="absolute right-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                Sold out
              </span>
            ) : null}
          </div>
        </Link>

        {/* Hover overlay — Buy / Add to cart (desktop) */}
        {!outOfStock ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-8 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 md:block">
            <ProductCardActions product={product} variant="overlay" />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:p-3">
        <Link href={href} className="block">
          <h2 className="line-clamp-2 min-h-[2.5rem] text-xs leading-snug text-zinc-200 transition group-hover:text-[#FFC107] sm:text-[13px]">
            {product.shortName}
          </h2>
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-sm font-bold text-[#FFC107] sm:text-base">
            {formatProductPrice(product)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price ? (
            <>
              <span className="text-[11px] text-zinc-500 line-through">
                {new Intl.NumberFormat("en-AU", {
                  style: "currency",
                  currency: product.currency,
                }).format(product.compareAtPrice)}
              </span>
              {discount ? (
                <span className="text-[11px] font-medium text-emerald-400/90">
                  -{discount}%
                </span>
              ) : null}
            </>
          ) : null}
        </div>

        {product.rating != null && product.reviewCount != null ? (
          <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        ) : null}

        {/* Touch-friendly actions on mobile / tablet */}
        <div className="mt-auto pt-1 md:hidden">
          {!outOfStock ? (
            <ProductCardActions product={product} variant="compact" />
          ) : null}
        </div>
      </div>
    </article>
  );
}
