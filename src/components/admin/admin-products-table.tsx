import Link from "next/link";
import type { StoreProduct } from "@/lib/products";

type AdminProductsTableProps = {
  products: StoreProduct[];
};

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {products.map((product) => (
              <tr key={product.slug} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="font-medium text-zinc-100">{product.shortName}</div>
                  <div className="text-xs text-zinc-500">{product.slug}</div>
                </td>
                <td className="px-4 py-3 text-zinc-400">{product.sku}</td>
                <td className="px-4 py-3 text-zinc-400">{product.category}</td>
                <td className="px-4 py-3 text-zinc-100">
                  ${product.price} {product.currency}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      product.availability === "InStock"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : product.availability === "PreOrder"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-red-500/10 text-red-300"
                    }`}
                  >
                    {product.availability}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs text-[var(--shirwell-gold)] underline-offset-2 hover:underline"
                  >
                    View on site
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-white/[0.06] px-4 py-3 text-xs text-zinc-500">
        Static catalog in <code className="text-zinc-400">src/lib/products.ts</code> · migrate to
        database for full inventory.
      </p>
    </div>
  );
}
