import type { Metadata } from "next";
import { FlowershopContent } from "@/components/shirwell/flowershop-content";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Flowers",
  description:
    "Shirwell Bancan recommends Nati Roses — weddings, funerals, and special occasions. Roses and florals from Middle Dural NSW, near Sydney.",
  alternates: { canonical: "/flowers" },
  openGraph: {
    title: `Flowers | ${SITE_NAME}`,
    description:
      "Order roses and florals through Nati Roses — trusted by Shirwell Bancan for over 40 years.",
    url: "/flowers",
  },
};

export default function FlowersPage() {
  return <FlowershopContent />;
}
