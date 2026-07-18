"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  X,
  XCircle,
} from "lucide-react";
import {
  getArrayField,
  getPriceLines,
  getTourImage,
  whatsappTourUrl,
  type Tour,
} from "@/lib/tours";
import { cn } from "@/lib/utils";

type TourModalProps = {
  tour: Tour | null;
  open: boolean;
  onClose: () => void;
  /** Slug del destino (para fallback de imagen y enlace). */
  destinoSlug?: string | null;
};

export default function TourModal({
  tour,
  open,
  onClose,
  destinoSlug,
}: TourModalProps) {
  return (
    <AnimatePresence>
      {open && tour && (
        <TourModalPanel
          key={tour.id}
          tour={tour}
          onClose={onClose}
          destinoSlug={destinoSlug}
        />
      )}
    </AnimatePresence>
  );
}

type PanelProps = {
  tour: Tour;
  onClose: () => void;
  destinoSlug?: string | null;
};

function TourModalPanel({ tour, onClose, destinoSlug }: PanelProps) {
  const titleId = useId();
  const [activePhoto, setActivePhoto] = useState(0);

  const mainImage = getTourImage(tour, destinoSlug);
  const photos = [mainImage];

  const incluye = getArrayField(tour.incluye);
  const noIncluye = getArrayField(tour.no_incluye);
  const itinerario = getArrayField(tour.itinerario);
  const recomendaciones = getArrayField(tour.recomendaciones);
  const importante = getArrayField(tour.importante);
  const priceLines = getPriceLines(tour);

  const destinoNombre =
    tour.destinos?.nombre || destinoSlug?.replace(/-/g, " ") || null;
  const wa = whatsappTourUrl(tour.titulo, destinoNombre || undefined);

  const descripcion =
    tour.descripcion_larga?.trim() ||
    tour.descripcion_corta?.trim() ||
    "Experiencia diseñada para que vivas el destino sin preocupaciones.";

  const goPrev = useCallback(() => {
    setActivePhoto((i) => (i <= 0 ? photos.length - 1 : i - 1));
  }, [photos.length]);

  const goNext = useCallback(() => {
    setActivePhoto((i) => (i >= photos.length - 1 ? 0 : i + 1));
  }, [photos.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.button
        type="button"
        aria-label="Cerrar modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className={cn(
          "relative z-10 flex w-full max-w-4xl flex-col overflow-hidden",
          "max-h-[92vh] sm:max-h-[90vh]",
          "rounded-t-3xl bg-white shadow-2xl shadow-slate-900/40 sm:rounded-3xl",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          {/* Hero */}
          <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-900 sm:aspect-[21/10]">
            <Image
              key={photos[activePhoto]}
              src={photos[activePhoto]}
              alt={tour.titulo}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              unoptimized={photos[activePhoto].startsWith("http")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {destinoNombre && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
                    <MapPin size={13} className="text-teal-700" />
                    {destinoNombre}
                  </span>
                )}
                {tour.duracion && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    <Clock size={13} />
                    {tour.duracion}
                  </span>
                )}
              </div>
              <h2
                id={titleId}
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                {tour.titulo}
              </h2>
              {tour.precio_adulto_usd != null && (
                <p className="mt-2 text-base font-semibold text-teal-200 sm:text-lg">
                  Desde ${tour.precio_adulto_usd} USD
                  {tour.precio_adulto_mxn != null && (
                    <span className="ml-2 text-sm font-medium text-white/60">
                      ≈ ${tour.precio_adulto_mxn} MXN
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-8">
            <p className="whitespace-pre-line text-base leading-relaxed text-slate-600 sm:text-[17px]">
              {descripcion}
            </p>

            {/* Precios */}
            {priceLines.length > 0 && (
              <section className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-slate-50 p-5 sm:p-6">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-900">
                  Precios
                </h3>
                <ul className="space-y-2">
                  {priceLines.map((line) => (
                    <li
                      key={line}
                      className="text-sm font-semibold text-slate-800 sm:text-base"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerario */}
            {itinerario.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Itinerario
                </h3>
                <ol className="space-y-2.5">
                  {itinerario.map((item, i) => (
                    <li
                      key={`${item}-${i}`}
                      className="flex gap-3 text-sm leading-relaxed text-slate-700"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Incluye / No incluye */}
            {(incluye.length > 0 || noIncluye.length > 0) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {incluye.length > 0 && (
                  <section className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-slate-50 p-5">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-900">
                      Qué incluye
                    </h3>
                    <ul className="space-y-2.5">
                      {incluye.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-slate-700"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700">
                            <Check size={12} strokeWidth={3} aria-hidden />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {noIncluye.length > 0 && (
                  <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800">
                      No incluye
                    </h3>
                    <ul className="space-y-2.5">
                      {noIncluye.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-500">
                            <XCircle size={12} aria-hidden />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* Recomendaciones */}
            {recomendaciones.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Recomendaciones
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {recomendaciones.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Importante */}
            {importante.length > 0 && (
              <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-amber-900">
                    Importante
                  </h3>
                </div>
                <ul className="space-y-2">
                  {importante.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-amber-950/80"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <MessageCircle size={18} className="shrink-0" />
                Consultar por WhatsApp
              </a>
              <Link
                href="/#contacto"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
