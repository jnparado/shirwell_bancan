import type { SupabaseClient } from "@supabase/supabase-js";

export type UpsertPublicProfileInput = {
  userId: string;
  email: string | null | undefined;
  fullName?: string | null;
  avatarUrl?: string | null;
};

/** Upsert `public.profiles` row keyed by `auth.users.id`. */
export async function upsertPublicProfile(
  supabase: SupabaseClient,
  input: UpsertPublicProfileInput,
): Promise<{ error: string | null }> {
  const { userId, email, fullName, avatarUrl } = input;

  const row: Record<string, unknown> = {
    id: userId,
    email: email ?? null,
    full_name: fullName?.trim() ? fullName.trim() : null,
  };
  if (avatarUrl?.trim()) row.avatar_url = avatarUrl.trim();

  const { error } = await supabase.from("profiles").upsert(row, { onConflict: "id" });
  return { error: error?.message ?? null };
}
