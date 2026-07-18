import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

// El admin depende de sesión y Supabase; no se debe prerenderizar en el build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | CAREK Turismo",
  description: "Panel de administración de Turismo Carek",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
