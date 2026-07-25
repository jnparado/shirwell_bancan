import Link from "next/link";
import type { AdminNavItem } from "@/lib/admin/navigation";

type AdminBreadcrumbsProps = {
  items: AdminNavItem[];
};

export function AdminBreadcrumbs({ items }: AdminBreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = item.href ?? "/admin";

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <span className="text-zinc-600">/</span> : null}
              {isLast ? (
                <span className="text-zinc-200">{item.label}</span>
              ) : (
                <Link href={href} className="transition hover:text-[var(--shirwell-gold)]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
