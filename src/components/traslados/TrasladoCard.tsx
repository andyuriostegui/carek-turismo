"use client";

import { motion } from "framer-motion";
import { Eye, Car, MapPin } from "lucide-react";
import { getTrasladoImage, type Traslado } from "@/lib/traslados";

type TrasladoCardProps = {
  traslado: Traslado;
  index?: number;
  onOpen?: (traslado: Traslado) => void;
};

export default function TrasladoCard({
  traslado,
  index = 0,
  onOpen,
}: TrasladoCardProps) {
  const image = getTrasladoImage(traslado);

  const handleOpen = () => {
    onOpen?.(traslado);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 18,
        delay: index * 0.06,
      }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-100/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/80 sm:rounded-3xl">
        <button
          type="button"
          onClick={handleOpen}
          className="relative block h-48 w-full overflow-hidden bg-slate-100 text-left sm:h-52"
        >
          <img
            src={image}
            alt={traslado.titulo}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
            <Car size={13} className="text-teal-700" />
            Traslado privado
          </span>

          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
            <Eye size={12} />
            Ver
          </span>

          {traslado.zona && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <MapPin size={12} className="text-teal-300" />
              {traslado.zona}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="mb-2 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-teal-800 sm:text-xl">
            {traslado.titulo}
          </h2>

          {traslado.descripcion && (
            <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
              {traslado.descripcion}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-1">
            {traslado.precio_desde_usd != null ? (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Desde
                </p>
                <p className="text-2xl font-bold tabular-nums text-teal-700">
                  ${traslado.precio_desde_usd}
                  <span className="ml-1 text-sm font-semibold text-teal-600/80">
                    USD
                  </span>
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-500">Cotización a medida</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleOpen}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Ver detalles
            <Eye size={16} className="shrink-0 opacity-80" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
