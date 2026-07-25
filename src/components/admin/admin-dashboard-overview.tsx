import Link from "next/link";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import type { AdminDashboardStats } from "@/lib/admin/stats";

type AdminDashboardOverviewProps = {
  stats: AdminDashboardStats;
};

export function AdminDashboardOverview({ stats }: AdminDashboardOverviewProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 font-serif text-xl text-zinc-100">At a glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Songs" value={stats.songCount} hint="Music catalog" />
          <AdminStatCard label="Products" value={stats.productCount} hint="Store listings" />
          <AdminStatCard
            label="Members"
            value={stats.profileCount ?? "—"}
            hint="Registered profiles"
          />
          <AdminStatCard
            label="Premium"
            value={stats.premiumEntitlementCount ?? "—"}
            hint="Active entitlements"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl text-zinc-100">Commerce (coming soon)</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Orders today" value={stats.ordersToday} hint="Awaiting checkout integration" />
          <AdminStatCard label="Pending orders" value={stats.pendingOrders} hint="No order pipeline yet" />
          <AdminStatCard label="Low stock" value={stats.lowStockCount} hint="Out-of-stock products" />
          <AdminStatCard label="CD tracks" value={stats.cdTrackCount} hint="Black Horse album" />
        </div>
      </section>

      <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
        <h2 className="font-serif text-xl text-zinc-100">Quick links</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Jump to sections that are wired up today. Other pages show placeholders until order and
          inventory tables are added.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { href: "/admin/music/songs", label: "Music · Songs" },
            { href: "/admin/products/all-products", label: "Products" },
            { href: "/admin/users-roles/admin-users", label: "Users & roles" },
            { href: "/admin/settings/store-settings", label: "Store settings" },
            { href: "/admin/cds-albums/all-cds", label: "CDs / Albums" },
            { href: "/admin/premium-members/all-members", label: "Premium members" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-200 transition hover:border-[rgba(255,193,7,0.35)] hover:text-[var(--shirwell-gold)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
