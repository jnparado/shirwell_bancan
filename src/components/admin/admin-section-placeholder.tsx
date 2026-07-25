import Link from "next/link";
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { adminSectionCount, type AdminNavMatch } from "@/lib/admin/navigation";

type AdminSectionPlaceholderProps = {
  match: AdminNavMatch;
};

export function AdminSectionPlaceholder({ match }: AdminSectionPlaceholderProps) {
  const siblings =
    match.section.children?.filter((item) => item.href && item.href !== match.page.href) ?? [];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={match.breadcrumbs} />

      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--shirwell-gold)]">
          Section scaffold
        </p>
        <h2 className="mt-2 font-serif text-2xl text-zinc-100">{match.page.label}</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          {match.page.description ??
            "This admin page is ready in navigation. Connect orders, inventory, and payments data to activate workflows here."}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Status</p>
            <p className="mt-1 text-sm text-zinc-200">UI shell · data pending</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Admin sections</p>
            <p className="mt-1 text-sm text-zinc-200">{adminSectionCount()} routes mapped</p>
          </div>
        </div>

        {siblings.length > 0 ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-zinc-300">Related in {match.section.label}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {siblings.slice(0, 8).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-300 transition hover:border-[rgba(255,193,7,0.3)] hover:text-[var(--shirwell-gold)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
