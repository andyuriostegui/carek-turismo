"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Car, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Traslado } from "@/lib/traslados";
import { uniqueZonas } from "@/lib/traslados";
import TrasladoCard from "@/components/traslados/TrasladoCard";
import TrasladoModal from "@/components/traslados/TrasladoModal";

type TrasladosListingProps = {
  traslados: Traslado[];
  /** @deprecated Prefer server-side `region` filter + sub-navbar */
  initialZona?: string;
  title?: string;
  description?: string;
  /** Si false, no muestra chips de zona (la sub-navbar de la page ya filtra). */
  showFilters?: boolean;
  emptyRegionLabel?: string;
  allHref?: string;
};

export default function TrasladosListing({
  traslados,
  initialZona = "todas",
  title = "Elige tu zona de traslado",
  description = "Cancún, Riviera Maya, Holbox, Mérida, Chetumal y más. Filtra por destino y cotiza en minutos.",
  showFilters = true,
  emptyRegionLabel,
  allHref = "/traslados",
}: TrasladosListingProps) {
  const zonas = useMemo(() => uniqueZonas(traslados), [traslados]);
  const [zona, setZona] = useState(initialZona);
  const [selected, setSelected] = useState<Traslado | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback((traslado: Traslado) => {
    setSelected(traslado);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const filtered = useMemo(() => {
    if (!showFilters || !zona || zona === "todas") return traslados;
    return traslados.filter(
      (t) => t.zona?.trim().toLowerCase() === zona.toLowerCase(),
    );
  }, [traslados, zona, showFilters]);

  const filters = ["todas", ...zonas];

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-900 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 mb-3 border border-primary-100">
              <Car size={14} className="text-primary-700" />
              {filtered.length}{" "}
              {filtered.length === 1 ? "ruta" : "rutas"} · Servicio privado
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>
          <p className="text-sm text-slate-500 inline-flex items-center gap-1.5 shrink-0">
            <Filter size={14} className="text-primary-700" />
            {filtered.length}{" "}
            {filtered.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        {showFilters && (
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filtrar por zona"
          >
            {filters.map((z) => {
              const active = zona === z;
              const label = z === "todas" ? "Todas" : z;
              return (
                <button
                  key={z}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setZona(z)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all border",
                    active
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/15"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-800",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filtered.map((item, i) => (
            <TrasladoCard
              key={item.id}
              traslado={item}
              index={i}
              onOpen={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-16 text-center">
          <p className="text-slate-600 font-medium mb-1">
            {emptyRegionLabel
              ? `No hay traslados en ${emptyRegionLabel}`
              : "No hay traslados en esta zona"}
          </p>
          <p className="text-sm text-slate-500 mb-5">
            Prueba otra categoría o cotiza un trayecto a medida por WhatsApp.
          </p>
          {showFilters ? (
            <button
              type="button"
              onClick={() => setZona("todas")}
              className="text-sm font-semibold text-primary-700 hover:text-primary-600"
            >
              Ver todos los traslados
            </button>
          ) : (
            <Link
              href={allHref}
              className="text-sm font-semibold text-primary-700 hover:text-primary-600"
            >
              Ver todos los traslados
            </Link>
          )}
        </div>
      )}

      <TrasladoModal
        traslado={selected}
        open={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
