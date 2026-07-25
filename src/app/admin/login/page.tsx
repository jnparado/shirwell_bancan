import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSessionIfAny } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSessionIfAny();
  if (session) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
