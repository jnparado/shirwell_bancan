import type { AdminProfileRow } from "@/lib/admin/stats";

type AdminUsersTableProps = {
  profiles: AdminProfileRow[];
};

export function AdminUsersTable({ profiles }: AdminUsersTableProps) {
  if (profiles.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-sm text-zinc-400">
        No profiles loaded. Set <code className="text-zinc-300">SUPABASE_SERVICE_ROLE_KEY</code> on
        the server to list users, or promote your account in Supabase (
        <code className="text-zinc-300">profiles.role = &apos;admin&apos;</code>).
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-zinc-100">{profile.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-zinc-400">{profile.email ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                      profile.role === "admin" || profile.role === "superadmin"
                        ? "bg-[rgba(255,193,7,0.12)] text-[var(--shirwell-gold)]"
                        : "bg-white/[0.06] text-zinc-300"
                    }`}
                  >
                    {profile.role ?? "user"}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {profile.updated_at
                    ? new Date(profile.updated_at).toLocaleDateString("en-AU")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
