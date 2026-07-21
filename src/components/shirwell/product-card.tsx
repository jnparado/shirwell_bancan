import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/products";
import { formatProductPrice, getProductPagePath } from "@/lib/products";

const glassCard =
  "rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.05)] backdrop-blur-md";

type ProductCardProps = {
  product: StoreProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = getProductPagePath(product.slug);

  return (
    <Link
      href={href}
      className={`${glassCard} group block overflow-hidden transition hover:border-[#FFC107]/25 hover:bg-[rgba(255,255,255,0.07)]`}
    >
      <div className="relative aspect-square w-full bg-black/40">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>
        <h2 className="font-serif text-lg font-semibold text-[#FFC107] sm:text-xl">
          {product.shortName}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-300">
          {product.description}
        </p>
        <p className="pt-1 text-base font-semibold text-zinc-100">
          {formatProductPrice(product)}
        </p>
      </div>
    </Link>
  );
}
