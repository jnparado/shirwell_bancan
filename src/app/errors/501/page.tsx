import type { Metadata } from "next";
import { MissingIdError } from "@/components/errors/missing-id-error";

export const metadata: Metadata = {
  title: "501 — Missing ID",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ param?: string }>;
};

export default async function Error501Page({ searchParams }: Props) {
  const { param } = await searchParams;
  const idParam = param?.trim() || "id";

  return (
    <div className="page-shell--compact">
      <MissingIdError param={idParam} />
    </div>
  );
}
