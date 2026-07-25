import type { StoreProduct } from "@/lib/products";

export function stripeProductLineItem(product: StoreProduct) {
  return {
    quantity: 1,
    price_data: {
      currency: product.currency.toLowerCase(),
      unit_amount: Math.round(product.price * 100),
      product_data: {
        name: product.name,
        description: product.description,
        images: product.image.startsWith("http") ? [product.image] : undefined,
        metadata: {
          sku: product.sku,
          slug: product.slug,
        },
      },
    },
  };
}
