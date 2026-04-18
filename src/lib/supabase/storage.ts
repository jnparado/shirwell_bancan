/** Public bucket from your Supabase project (see Storage → music_video) */
export const MUSIC_VIDEO_BUCKET = "music_video";

/**
 * Build a public storage URL for an object in `bucket`, or pass through full URLs.
 * DB may store: a full https URL, or an object key like `Kissing 240227_04 .mp3`.
 */
export function resolvePublicStorageUrl(
  supabaseProjectUrl: string,
  bucket: string,
  pathOrUrl: string | null | undefined
): string | null {
  if (pathOrUrl == null) return null;
  const trimmed = pathOrUrl.trim();
  if (trimmed === "") return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  let key = trimmed.replace(/^\/+/, "");
  const bucketPrefix = `${bucket}/`;
  if (key.startsWith(bucketPrefix)) {
    key = key.slice(bucketPrefix.length);
  }

  const base = supabaseProjectUrl.replace(/\/+$/, "");
  const encoded = key.split("/").map((seg) => encodeURIComponent(seg)).join("/");
  return `${base}/storage/v1/object/public/${bucket}/${encoded}`;
}
