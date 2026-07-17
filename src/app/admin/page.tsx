import Link from "next/link";
import {
  Map,
  Compass,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { getDashboardStats, getAdminTours } from "@/lib/admin/data";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminDashboardPage() {
  const [stats, tours] = await Promise.all([
    getDashboardStats(),
    getAdminTours(),
  ]);

  const recentTours = tours.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-600">Resumen general</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Bienvenido al panel
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Gestiona tours, circuitos, traslados y destinos de Turismo Carek.
            Los datos actuales son de demostración hasta conectar Supabase.
          </p>
        </div>
        <Link
          href="/admin/tours/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          Nuevo tour
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total de tours"
          value={stats.totalTours}
          description="Registrados en el sistema"
          icon={Map}
          accent="teal"
        />
        <StatCard
          title="Total de circuitos"
          value={stats.totalCircuitos}
          description="Paquetes de varios días"
          icon={Compass}
          accent="blue"
        />
        <StatCard
          title="Total de destinos"
          value={stats.totalDestinos}
          description="Categorías / regiones"
          icon={MapPin}
          accent="violet"
        />
        <StatCard
          title="Tours activos"
          value={stats.toursActivos}
          description="Publicados en el sitio"
          icon={CheckCircle2}
          accent="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="font-semibold text-slate-900">Tours recientes</h3>
              <p className="text-xs text-slate-500">Últimos registros (mock)</p>
            </div>
            <Link
              href="/admin/tours"
              className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Tour</th>
                  <th className="px-5 py-3 font-medium">Destino</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-3.5 font-medium text-slate-800">
                      {tour.nombre}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{tour.destino}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={tour.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-900">Accesos rápidos</h3>
          <p className="mt-1 text-xs text-slate-500">
            Atajos a las secciones principales
          </p>
          <ul className="mt-4 space-y-2">
            {[
              { href: "/admin/tours", label: "Lista de tours" },
              { href: "/admin/tours/nuevo", label: "Crear tour" },
              { href: "/admin/circuitos", label: "Circuitos" },
              { href: "/admin/traslados", label: "Traslados" },
              { href: "/admin/destinos", label: "Destinos" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5 text-sm text-slate-700 transition hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-800"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
