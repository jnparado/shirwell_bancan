import type { SupabaseClient } from "@supabase/supabase-js";

export type ProfileRecord = {
  id: string;
  email: string | null;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  phone: string | null;
  location: string | null;
};

export type UpdateProfileInput = {
  userId: string;
  email?: string | null;
  fullName?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string | null;
};

export function profileInitials(fullName: string | null | undefined, email: string | null): string {
  const name = fullName?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email?.includes("@")) {
    return email.slice(0, 2).toUpperCase();
  }
  return "??";
}

export async function uploadProfileAvatar(
  supabase: SupabaseClient,
  userId: string,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${userId}/avatar.${safeExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, contentType: file.type || undefined });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const url = data.publicUrl ? `${data.publicUrl}?v=${Date.now()}` : null;
  return { url, error: null };
}

export async function updateProfile(
  supabase: SupabaseClient,
  input: UpdateProfileInput,
): Promise<{ error: string | null }> {
  const { userId, email, fullName, phone, location, avatarUrl } = input;

  const row: Record<string, unknown> = {
    id: userId,
    updated_at: new Date().toISOString(),
  };
  if (email !== undefined) row.email = email;
  if (fullName !== undefined) row.full_name = fullName.trim() || null;
  if (phone !== undefined) row.phone = phone.trim() || null;
  if (location !== undefined) row.location = location.trim() || null;
  if (avatarUrl !== undefined) row.avatar_url = avatarUrl;

  const { error: profileError } = await supabase.from("profiles").upsert(row, { onConflict: "id" });
  if (profileError) return { error: profileError.message };

  const meta: Record<string, string> = {};
  if (fullName !== undefined && fullName.trim()) meta.full_name = fullName.trim();
  if (avatarUrl) meta.avatar_url = avatarUrl;
  if (phone !== undefined && phone.trim()) meta.phone = phone.trim();
  if (location !== undefined && location.trim()) meta.location = location.trim();

  if (Object.keys(meta).length > 0) {
    const { error: authError } = await supabase.auth.updateUser({ data: meta });
    if (authError) return { error: authError.message };
  }

  return { error: null };
}
