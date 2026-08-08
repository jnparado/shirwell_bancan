import { redirect } from "next/navigation";

type LegacyLoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Keeps old `/auth/login` bookmarks working; canonical URL is `/login`. */
export default async function LegacyAuthLoginRedirect({
  searchParams,
}: LegacyLoginPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") query.set(key, value);
    else if (Array.isArray(value)) {
      value.forEach((entry) => query.append(key, entry));
    }
  }

  const qs = query.toString();
  redirect(qs ? `/login?${qs}` : "/login");
}
