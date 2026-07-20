type SocialLink = {
  label: string;
  href: string;
};

function labelFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("instagram")) return "Instagram";
    if (host === "x.com" || host.includes("twitter")) return "X";
    if (host.includes("youtube")) return "YouTube";
    if (host.includes("spotify")) return "Spotify";
    if (host.includes("tiktok")) return "TikTok";
    return host;
  } catch {
    return "Profile";
  }
}

/** Verified social profiles from NEXT_PUBLIC_SAME_AS (comma-separated URLs). */
export function getPublicSocialLinks(): SocialLink[] {
  const raw = process.env.NEXT_PUBLIC_SAME_AS?.trim();
  if (!raw) return [];

  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"))
    .map((href) => ({ label: labelFromUrl(href), href }));
}
