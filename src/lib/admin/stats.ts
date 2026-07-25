import { createServerSupabaseClient, createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { getSongs } from "@/lib/songs";
import { STORE_PRODUCTS } from "@/lib/products";
import { BLACK_HORSE_TRACKS } from "@/lib/black-horse-album";

export type AdminDashboardStats = {
  songCount: number;
  productCount: number;
  cdTrackCount: number;
  profileCount: number | null;
  premiumEntitlementCount: number | null;
  ordersToday: number;
  lowStockCount: number;
  pendingOrders: number;
};

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const songs = await getSongs();
  const songCount = songs.length;

  const supabase = await createServerSupabaseClient();
  let profileCount: number | null = null;
  let premiumEntitlementCount: number | null = null;

  const adminClient = createServiceRoleSupabaseClient();
  const statsClient = adminClient ?? supabase;

  if (statsClient) {
    const { count: profiles } = await statsClient
      .from("profiles")
      .select("*", { count: "exact", head: true });
    profileCount = profiles ?? null;

    const { count: entitlements } = await statsClient
      .from("user_entitlements")
      .select("*", { count: "exact", head: true })
      .eq("premium", true);
    premiumEntitlementCount = entitlements ?? null;
  }

  const outOfStock = STORE_PRODUCTS.filter((p) => p.availability === "OutOfStock").length;

  return {
    songCount,
    productCount: STORE_PRODUCTS.length,
    cdTrackCount: BLACK_HORSE_TRACKS.length,
    profileCount,
    premiumEntitlementCount,
    ordersToday: 0,
    lowStockCount: outOfStock,
    pendingOrders: 0,
  };
}

export type AdminProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  updated_at: string | null;
};

export async function getAdminProfiles(): Promise<AdminProfileRow[]> {
  const adminClient = createServiceRoleSupabaseClient();
  if (!adminClient) return [];

  const { data } = await adminClient
    .from("profiles")
    .select("id,email,full_name,role,updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  return (data ?? []) as AdminProfileRow[];
}
