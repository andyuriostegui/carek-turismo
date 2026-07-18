"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import type { Tour } from "@/lib/tours";
import DbTourCard from "@/components/tours/DbTourCard";
import TourModal from "@/components/tours/TourModal";

type ToursListingProps = {
  tours: Tour[];
  title?: string;
  description?: string;
  destinoSlug?: string | null;
  destinoNombre?: string | null;
  emptyLabel?: string;
  allHref?: string;
};

export default function ToursListing({
  tours,
  title = "Tours disponibles",
  description = "Selecciona un tour para ver el itinerario, precios e incluye.",
  destinoSlug,
  destinoNombre,
  emptyLabel,
  allHref = "/tours",
}: ToursListingProps) {
  const [selected, setSelected] = useState<Tour | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback((tour: Tour) => {
    setSelected(tour);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div>
      <div className="mb-8 sm:mb-10">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-900">
              <Compass size={14} className="text-teal-700" />
              {tours.length}{" "}
              {tours.length === 1 ? "tour" : "tours"} · Experiencias
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>

      {tours.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {tours.map((tour, i) => (
            <DbTourCard
              key={tour.id}
              tour={tour}
              index={i}
              destinoSlug={destinoSlug}
              destinoNombre={destinoNombre}
              onOpen={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-16 text-center">
          <p className="mb-1 font-medium text-slate-600">
            {emptyLabel
              ? `No hay tours en ${emptyLabel}`
              : "No hay tours disponibles en este momento"}
          </p>
          <p className="mb-5 text-sm text-slate-500">
            Explora otros destinos o cotiza una experiencia a medida.
          </p>
          <Link
            href={allHref}
            className="text-sm font-semibold text-teal-700 hover:text-teal-600"
          >
            Ver todos los destinos
          </Link>
        </div>
      )}

      <TourModal
        tour={selected}
        open={modalOpen}
        onClose={closeModal}
        destinoSlug={destinoSlug}
      />
    </div>
  );
}
