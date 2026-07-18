"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bus,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  Heart,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import {
  getBodasGrupos,
  getIncluye,
  getPrecios,
  getTrasladoImage,
  getVehiculos,
  whatsappTrasladoUrl,
  type Traslado,
} from "@/lib/traslados";
import { cn } from "@/lib/utils";

type TrasladoModalProps = {
  traslado: Traslado | null;
  open: boolean;
  onClose: () => void;
};

export default function TrasladoModal({
  traslado,
  open,
  onClose,
}: TrasladoModalProps) {
  return (
    <AnimatePresence>
      {open && traslado && (
        <TrasladoModalPanel
          key={traslado.id}
          traslado={traslado}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

type PanelProps = {
  traslado: Traslado;
  onClose: () => void;
};

function buildGallery(traslado: Traslado): string[] {
  const main = getTrasladoImage(traslado);
  const fromVehicles = getVehiculos(traslado)
    .map((v) => v.imagen)
    .filter((src): src is string => Boolean(src));
  const seen = new Set<string>([main]);
  const photos = [main];
  for (const src of fromVehicles) {
    if (!seen.has(src)) {
      seen.add(src);
      photos.push(src);
    }
  }
  return photos;
}

function TrasladoModalPanel({ traslado, onClose }: PanelProps) {
  const titleId = useId();
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = buildGallery(traslado);
  const incluye = getIncluye(traslado);
  const precios = getPrecios(traslado);
  const vehiculos = getVehiculos(traslado);
  const bodas = getBodasGrupos(traslado);
  const wa = whatsappTrasladoUrl(traslado.titulo, traslado.zona);

  const descripcion =
    traslado.descripcion_larga?.trim() ||
    traslado.descripcion?.trim() ||
    "Servicio de traslado privado, directo y puntual. Solo tú y tu grupo viajan en la unidad.";

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
          {/* Hero / galería */}
          <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-900 sm:aspect-[21/10]">
            <Image
              key={photos[activePhoto]}
              src={photos[activePhoto]}
              alt={traslado.titulo}
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
                {traslado.zona && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
                    <MapPin size={13} className="text-teal-700" />
                    {traslado.zona}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                  <Car size={13} />
                  Traslado privado
                </span>
              </div>
              <h2
                id={titleId}
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                {traslado.titulo}
              </h2>
              {traslado.precio_desde_usd != null && (
                <p className="mt-2 text-base font-semibold text-teal-200 sm:text-lg">
                  Desde ${traslado.precio_desde_usd} USD
                  {traslado.precio_desde_mxn != null && (
                    <span className="ml-2 text-sm font-medium text-white/60">
                      ≈ ${traslado.precio_desde_mxn} MXN
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6">
              {photos.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActivePhoto(i)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-offset-2 transition sm:h-16 sm:w-24",
                    activePhoto === i
                      ? "ring-2 ring-teal-600"
                      : "opacity-70 hover:opacity-100",
                  )}
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={activePhoto === i}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                    unoptimized={src.startsWith("http")}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-8">
            <p className="whitespace-pre-line text-base leading-relaxed text-slate-600 sm:text-[17px]">
              {descripcion}
            </p>

            {/* Incluye */}
            <section className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-slate-50 p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-teal-900">
                Qué incluye
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
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

            {/* Vehículos */}
            {vehiculos.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Tipos de vehículos
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {vehiculos.map((v) => {
                    const key = v.nombre.toLowerCase();
                    const Icon =
                      key.includes("bus")
                        ? Bus
                        : key.includes("suburban") || key.includes("limus")
                          ? Crown
                          : Car;
                    return (
                      <div
                        key={v.nombre}
                        className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3.5"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {v.nombre}
                          </p>
                          {v.capacidad && (
                            <p className="text-xs font-medium text-teal-700">
                              {v.capacidad}
                            </p>
                          )}
                          <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                            {v.descripcion}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Precios */}
            {precios.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
                  Tarifas orientativas
                </h3>
                <div className="space-y-2.5">
                  {precios.map((p) => (
                    <div
                      key={p.concepto}
                      className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          {p.concepto}
                        </p>
                        {p.detalle && (
                          <p className="text-sm text-slate-500">{p.detalle}</p>
                        )}
                      </div>
                      <div className="shrink-0 sm:text-right">
                        {p.desde_usd != null ? (
                          <>
                            <p className="text-base font-bold tabular-nums text-teal-700">
                              desde ${p.desde_usd} USD
                            </p>
                            {p.desde_mxn != null && (
                              <p className="text-xs text-slate-400">
                                ≈ ${p.desde_mxn} MXN
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-slate-500">
                            Cotizar
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bodas & grupos (resumen) */}
            {bodas && (
              <section className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Heart size={16} className="text-teal-700" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-teal-900">
                    Bodas &amp; grupos
                  </h3>
                </div>
                <p className="line-clamp-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                  {bodas}
                </p>
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
