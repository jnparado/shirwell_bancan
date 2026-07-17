import { redirect } from "next/navigation";
import { HOME_PATH } from "@/lib/seo";

/** Root URL permanently sends visitors to the canonical home page. */
export default function RootPage() {
  redirect(HOME_PATH);
}
