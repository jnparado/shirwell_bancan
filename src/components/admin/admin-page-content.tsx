import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { AdminDashboardOverview } from "@/components/admin/admin-dashboard-overview";
import { AdminProductsTable } from "@/components/admin/admin-products-table";
import { AdminSectionPlaceholder } from "@/components/admin/admin-section-placeholder";
import { AdminSongsTable } from "@/components/admin/admin-songs-table";
import { AdminStoreSettingsPanel } from "@/components/admin/admin-store-settings-panel";
import { AdminUsersTable } from "@/components/admin/admin-users-table";
import { matchAdminPath, type AdminNavMatch } from "@/lib/admin/navigation";
import { getAdminDashboardStats, getAdminProfiles } from "@/lib/admin/stats";
import { STORE_PRODUCTS } from "@/lib/products";
import { getSongs } from "@/lib/songs";
import {
  BLACK_HORSE_ALBUM_TITLE,
  BLACK_HORSE_TRACKS,
} from "@/lib/black-horse-album";

type AdminPageContentProps = {
  pathname: string;
};

function pageTitle(match: AdminNavMatch): string {
  if (match.page.href === "/admin") return "Dashboard";
  return match.page.label;
}

function pageDescription(match: AdminNavMatch): string | undefined {
  if (match.page.href === "/admin") {
    return "Sales, inventory, orders, and content — Shirwell store control center.";
  }
  return match.page.description;
}

export async function AdminPageContent({ pathname }: AdminPageContentProps) {
  const match = matchAdminPath(pathname);
  if (!match) {
    return (
      <AdminSectionPlaceholder
        match={{
          section: { label: "Admin" },
          page: {
            label: "Not found",
            description: "This admin route is not in the navigation map.",
          },
          breadcrumbs: [{ label: "Admin", href: "/admin" }, { label: "Not found" }],
        }}
      />
    );
  }

  const href = match.page.href ?? pathname;

  if (href === "/admin") {
    const stats = await getAdminDashboardStats();
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <AdminDashboardOverview stats={stats} />
      </>
    );
  }

  if (href === "/admin/music/songs") {
    const songs = await getSongs();
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <AdminSongsTable songs={songs} />
      </>
    );
  }

  if (href === "/admin/products/all-products") {
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <AdminProductsTable products={STORE_PRODUCTS} />
      </>
    );
  }

  if (href === "/admin/users-roles/admin-users") {
    const profiles = await getAdminProfiles();
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <AdminUsersTable profiles={profiles} />
      </>
    );
  }

  if (href === "/admin/settings/store-settings") {
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <AdminStoreSettingsPanel />
      </>
    );
  }

  if (href === "/admin/cds-albums/all-cds") {
    return (
      <>
        <AdminBreadcrumbs items={match.breadcrumbs} />
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <div className="border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <h2 className="font-serif text-lg text-zinc-100">{BLACK_HORSE_ALBUM_TITLE}</h2>
            <p className="text-sm text-zinc-400">{BLACK_HORSE_TRACKS.length} tracks with generated artwork</p>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {BLACK_HORSE_TRACKS.map((track, index) => (
              <li key={track.slug} className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-zinc-300">
                  {index + 1}. {track.title}
                </span>
                <span className="text-xs text-zinc-500">{track.slug}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return <AdminSectionPlaceholder match={match} />;
}

export { pageTitle, pageDescription };
