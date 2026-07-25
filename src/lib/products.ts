import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import {
  BLACK_HORSE_ALBUM_SUBTITLE,
  BLACK_HORSE_ALBUM_TITLE,
  BLACK_HORSE_VINYL_PROMO,
} from "@/lib/black-horse-album";

export type StoreProduct = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  price: number;
  /** Original price before discount — shown with strike-through when set */
  compareAtPrice?: number;
  currency: "AUD";
  image: string;
  imageAlt: string;
  category: string;
  availability: "InStock" | "PreOrder" | "OutOfStock";
  sku: string;
  rating?: number;
  reviewCount?: number;
  /** Portrait promo art (e.g. vinyl poster) — uses contain instead of square crop */
  imageLayout?: "square" | "portrait";
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "black-horse-vinyl",
    name: `${BLACK_HORSE_ALBUM_TITLE} — Limited Edition Vinyl`,
    shortName: `${BLACK_HORSE_ALBUM_TITLE} Vinyl`,
    description:
      "The greatest songs Shirwell wrote across 45 years — limited edition vinyl with full Black Horse artwork.",
    longDescription:
      `${BLACK_HORSE_ALBUM_SUBTITLE}. Pressed to vinyl in a limited run with the full Black Horse artwork — Shirwell on horseback, gold stage curtains, and the signature Shirwell Bancan sound fans have followed for decades. 45 years of original songs. One timeless album.`,
    price: 100,
    currency: "AUD",
    image: BLACK_HORSE_VINYL_PROMO,
    imageAlt: "Black Horse limited edition vinyl album by Shirwell Bancan — promotional artwork",
    category: "Music & Vinyl",
    availability: "InStock",
    sku: "SHIR-BH-VINYL-01",
    rating: 5,
    reviewCount: 56,
    imageLayout: "portrait",
  },
  {
    slug: "honey",
    name: "Shirwell Wildflower Honey",
    shortName: "Wildflower Honey",
    description:
      "Small-batch wildflower honey from Shirwell's travels — rich, golden, and naturally sweet.",
    longDescription:
      "Shirwell Wildflower Honey is collected in small batches from floral regions Shirwell Bancan visited on tour. Each jar is raw, unfiltered, and packed with the warm character fans know from jungle coffee and home-kitchen stories on the road. Perfect on toast, in tea, or as a gift from the Shirwell store.",
    price: 24,
    compareAtPrice: 32,
    currency: "AUD",
    image: "/products/shirwell-honey.png",
    imageAlt: "Jar of Shirwell Wildflower Honey",
    category: "Food & Beverage",
    availability: "InStock",
    sku: "SHIR-HONEY-250",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    slug: "sunglasses",
    name: "Shirwell Gold Frame Sunglasses",
    shortName: "Gold Frame Sunglasses",
    description:
      "Classic gold-frame sunglasses with UV protection — stage-ready style from Shirwell Bancan.",
    longDescription:
      "Shirwell Gold Frame Sunglasses pair a timeless aviator silhouette with gold metal accents that match the Shirwell Bancan brand. Polarized-style dark lenses, durable hinges, and a soft carry pouch make them ready for festivals, travel, and sunny afternoons. A sample lifestyle product from the official Shirwell store.",
    price: 15,
    compareAtPrice: 120,
    currency: "AUD",
    image: "/products/shirwell-sunglasses.png",
    imageAlt: "Shirwell gold frame sunglasses",
    category: "Accessories",
    availability: "InStock",
    sku: "SHIR-SUNGLASS-01",
    rating: 4.6,
    reviewCount: 84,
  },
  {
    slug: "chocolate",
    name: "Shirwell Dark Chocolate Bar",
    shortName: "Dark Chocolate Bar",
    description:
      "70% dark artisan chocolate bar — smooth, bold, and wrapped in Shirwell gold packaging.",
    longDescription:
      "Shirwell Dark Chocolate Bar is a 70% cocoa artisan bar with a smooth finish and deep, slightly fruity notes. Wrapped in Shirwell gold-and-black packaging, it is a sample treat from the official product line alongside honey, coffee, and music releases. Ideal for gifting or pairing with jungle coffee.",
    price: 12,
    compareAtPrice: 18,
    currency: "AUD",
    image: "/products/shirwell-chocolate.png",
    imageAlt: "Shirwell dark chocolate bar in gold wrapper",
    category: "Food & Beverage",
    availability: "InStock",
    sku: "SHIR-CHOC-70",
    rating: 4.9,
    reviewCount: 203,
  },
];

export function getStoreProduct(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export function formatProductPrice(product: StoreProduct): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);
}

export function getProductDiscountPercent(product: StoreProduct): number | null {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return null;
  }
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

export function isPortraitProduct(product: StoreProduct): boolean {
  return product.imageLayout === "portrait";
}

export function getProductPagePath(slug: string): string {
  return `/products/${slug}`;
}

export function getProductJsonLd(product: StoreProduct): Record<string, unknown> {
  const url = absoluteUrl(getProductPagePath(product.slug));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [absoluteUrl(product.image)],
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      availability: `https://schema.org/${product.availability}`,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

export function getProductsIndexJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Products`,
    description: "Sample products from the Shirwell Bancan official store.",
    url: absoluteUrl("/products"),
    numberOfItems: STORE_PRODUCTS.length,
    itemListElement: STORE_PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(getProductPagePath(product.slug)),
      name: product.name,
    })),
  };
}
