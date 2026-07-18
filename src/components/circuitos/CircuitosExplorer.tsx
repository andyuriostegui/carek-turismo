"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Compass, Eye } from "lucide-react";
import type { Circuito, CircuitoCategory } from "@/data/circuitos";
import CircuitosNav from "./CircuitosNav";
import CircuitoModal from "./CircuitoModal";
import { cn } from "@/lib/utils";

type CircuitosExplorerProps = {
  categories: CircuitoCategory[];
};

export default function CircuitosExplorer({
  categories,
}: CircuitosExplorerProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | "todos">(
    "todos",
  );
  const [selected, setSelected] = useState<Circuito | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const visibleCategories = useMemo(() => {
    if (activeCategoryId === "todos") return categories;
    return categories.filter((c) => c.id === activeCategoryId);
  }, [categories, activeCategoryId]);

  const totalCount = useMemo(
    () => categories.reduce((n, c) => n + c.circuitos.length, 0),
    [categories],
  );

  const openModal = useCallback((circuito: Circuito) => {
    setSelected(circuito);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleSelectCategory = useCallback((id: string | "todos") => {
    setActiveCategoryId(id);
  }, []);

  return (
    <>
      <CircuitosNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={handleSelectCategory}
        onSelectCircuito={openModal}
        selectedCircuitoId={modalOpen ? selected?.id : null}
      />

      <section className="bg-gradient-to-b from-slate-50/80 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-900">
              <Compass size={14} className="text-teal-700" />
              {totalCount} circuitos · Paquetes de varios días
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
              Elige tu itinerario
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              Usa el menú de arriba para saltar a cualquier circuito. Al
              seleccionarlo se abre el detalle con descripción y fotos.
            </p>
          </div>

          <div className="space-y-14 sm:space-y-16">
            {visibleCategories.map((category) => (
              <div key={category.id} id={`categoria-${category.id}`}>
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                  {category.circuitos.map((circuito) => (
                    <article
                      key={circuito.id}
                      id={`circuito-${circuito.id}`}
                      className={cn(
                        "group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-100/80 transition-all duration-300",
                        "hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/40",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => openModal(circuito)}
                        className="relative block h-48 w-full overflow-hidden bg-slate-100 text-left sm:h-52"
                      >
                        <Image
                          src={circuito.image}
                          alt={circuito.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
                          <Clock size={13} className="text-teal-700" />
                          {circuito.duration}
                        </span>
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                          <Eye size={12} />
                          Ver
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h4 className="mb-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                          {circuito.name}
                        </h4>
                        <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
                          {circuito.summary}
                        </p>
                        <button
                          type="button"
                          onClick={() => openModal(circuito)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                        >
                          Ver detalles
                          <Eye size={16} className="shrink-0 opacity-80" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0f172a] px-6 py-10 text-white sm:rounded-3xl sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <p className="mb-2 text-xl font-bold tracking-tight sm:text-2xl">
                ¿Prefieres un circuito a medida?
              </p>
              <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                Armamos itinerarios personalizados combinando destinos, noches y
                ritmo de viaje. Cuéntanos qué imaginas.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-500"
            >
              Pedir cotización
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CircuitoModal
        circuito={selected}
        open={modalOpen}
        onClose={closeModal}
      />
    </>
  );
}
