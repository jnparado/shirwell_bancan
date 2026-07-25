import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  AdminPageContent,
  pageDescription,
  pageTitle,
} from "@/components/admin/admin-page-content";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth/admin";
import { matchAdminPath } from "@/lib/admin/navigation";

type AdminCatchAllPageProps = {
  params: Promise<{ segments?: string[] }>;
};

function pathnameFromSegments(segments: string[] | undefined): string {
  if (!segments?.length) return "/admin";
  return `/admin/${segments.join("/")}`;
}

export async function generateMetadata({ params }: AdminCatchAllPageProps): Promise<Metadata> {
  const { segments } = await params;
  const pathname = pathnameFromSegments(segments);
  const match = matchAdminPath(pathname);
  return {
    title: match ? `${pageTitle(match)} · Admin` : "Admin",
    robots: { index: false, follow: false },
  };
}

export default async function AdminCatchAllPage({ params }: AdminCatchAllPageProps) {
  const { segments } = await params;
  const pathname = pathnameFromSegments(segments);
  const match = matchAdminPath(pathname);

  if (!match) {
    notFound();
  }

  const { user, role, isStaticAdmin } = await requireAdmin(pathname);

  return (
    <AdminShell>
      <AdminHeader
        user={user}
        role={role}
        isStaticAdmin={isStaticAdmin}
        title={pageTitle(match)}
        description={pageDescription(match)}
      />
      <AdminPageContent pathname={pathname} />
    </AdminShell>
  );
}
