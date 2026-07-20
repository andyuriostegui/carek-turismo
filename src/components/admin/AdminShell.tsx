"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/client";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/tours": "Tours",
  "/admin/tours/nuevo": "Nuevo tour",
  "/admin/circuitos": "Circuitos",
  "/admin/traslados": "Traslados",
  "/admin/destinos": "Destinos",
  "/admin/destinos/nuevo": "Nuevo destino",
  "/admin/login": "Iniciar sesión",
};

function getPageTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/admin/tours")) return "Tours";
  if (pathname.startsWith("/admin/circuitos")) return "Circuitos";
  if (pathname.startsWith("/admin/traslados")) return "Traslados";
  if (pathname.startsWith("/admin/destinos")) return "Destinos";
  return "Administración";
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session && !isLogin) {
          router.replace("/admin/login");
          return;
        }

        if (session && isLogin) {
          router.replace("/admin");
          return;
        }

        if (session?.user?.email) {
          setUserEmail(session.user.email);
        }

        setLoading(false);
      } catch {
        if (!isLogin) {
          router.replace("/admin/login");
          return;
        }
        setLoading(false);
      }
    };

    checkUser();
  }, [pathname, isLogin, router]);

  // Mientras verifica la sesión
  if (loading && !isLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Verificando sesión...</p>
      </div>
    );
  }

  // Página de login (sin sidebar)
  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
            <div>
              <h1 className="truncate text-lg font-semibold text-slate-900">
                {getPageTitle(pathname)}
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Gestión de contenido · Turismo Carek
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-800">Admin</p>
                <p className="text-xs text-slate-500">
                  {userEmail || "admin@carekturismo.com"}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
