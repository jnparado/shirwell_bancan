import Link from "next/link";
import type { Song } from "@/types/song";

type AdminSongsTableProps = {
  songs: Song[];
};

export function AdminSongsTable({ songs }: AdminSongsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.03] text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Artist</th>
              <th className="px-4 py-3 font-medium">Premium</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {songs.map((song) => (
              <tr key={song.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-zinc-100">{song.title ?? "Untitled"}</td>
                <td className="px-4 py-3 text-zinc-400">{song.artist ?? "—"}</td>
                <td className="px-4 py-3">
                  {song.is_premium ? (
                    <span className="rounded-full bg-[rgba(255,193,7,0.12)] px-2 py-0.5 text-xs text-[var(--shirwell-gold)]">
                      Premium
                    </span>
                  ) : (
                    <span className="text-zinc-500">Free</span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-400">{song.desc ?? "—"}</td>
                <td className="px-4 py-3">
                  <Link
                    href="/music"
                    className="text-xs text-[var(--shirwell-gold)] underline-offset-2 hover:underline"
                  >
                    View on site
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-white/[0.06] px-4 py-3 text-xs text-zinc-500">
        {songs.length} songs · Edit in Supabase or extend this table with admin CRUD.
      </p>
    </div>
  );
}
