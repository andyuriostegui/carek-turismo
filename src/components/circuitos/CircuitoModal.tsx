"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Circuito } from "@/data/circuitos";
import { whatsappUrl as buildWhatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type CircuitoModalProps = {
  circuito: Circuito | null;
  open: boolean;
  onClose: () => void;
};

export default function CircuitoModal({
  circuito,
  open,
  onClose,
}: CircuitoModalProps) {
  return (
    <AnimatePresence>
      {open && circuito && (
        <CircuitoModalPanel
          key={circuito.id}
          circuito={circuito}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

type PanelProps = {
  circuito: Circuito;
  onClose: () => void;
};

function CircuitoModalPanel({ circuito, onClose }: PanelProps) {
  const titleId = useId();
  const [activePhoto, setActivePhoto] = useState(0);

  const photos =
    circuito.gallery?.length > 0 ? circuito.gallery : [circuito.image];

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

  const whatsappUrl = buildWhatsappUrl(
    `Hola CAREK, me interesa el circuito "${circuito.name}". ¿Me pueden dar más información y una cotización?`,
  );

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
          <div className="relative aspect-[16/10] w-full shrink-0 bg-slate-900 sm:aspect-[21/10]">
            <Image
              key={photos[activePhoto]}
              src={photos[activePhoto]}
              alt={circuito.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

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
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
                <Clock size={13} className="text-primary-700" />
                {circuito.duration}
              </span>
              <h2
                id={titleId}
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                {circuito.name}
              </h2>
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
                      ? "ring-2 ring-primary-600"
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
                  />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-8">
            <p className="text-base leading-relaxed text-slate-600 sm:text-[17px]">
              {circuito.description}
            </p>

            <section className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50/80 to-slate-50 p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-900">
                Qué incluye
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {circuito.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                      <Check size={12} strokeWidth={3} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
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
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
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
