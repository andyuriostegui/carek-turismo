"use client";

import { motion } from "framer-motion";
import {
  Bus,
  Car,
  CheckCircle2,
  Crown,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getBodasGrupos,
  getIncluye,
  getPrecios,
  getValores,
  getVehiculos,
  whatsappTrasladoUrl,
  type Traslado,
} from "@/lib/traslados";

const valorIcons = [Shield, Sparkles, Heart, CheckCircle2, Users];

const vehiculoIcons: Record<string, typeof Car> = {
  van: Car,
  suburban: Crown,
  limusina: Crown,
  limousine: Crown,
  bus: Bus,
  "mini bus": Bus,
  "bus / mini bus": Bus,
};

type Props = {
  traslado: Traslado;
};

export default function TrasladoDetailSections({ traslado }: Props) {
  const incluye = getIncluye(traslado);
  const valores = getValores(traslado);
  const vehiculos = getVehiculos(traslado);
  const precios = getPrecios(traslado);
  const bodas = getBodasGrupos(traslado);
  const wa = whatsappTrasladoUrl(traslado.titulo, traslado.zona);

  const descripcionLarga =
    traslado.descripcion_larga?.trim() ||
    traslado.descripcion?.trim() ||
    "Servicio de traslado privado, directo y puntual. Solo tú y tu grupo viajan en la unidad, con recepción personalizada y monitores de vuelo cuando aplica.";

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Descripción */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionLabel>El servicio</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
          Descripción completa
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line max-w-3xl">
          {descripcionLarga}
        </p>
      </motion.section>

      {/* ¿Por qué elegirnos? */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionLabel>La diferencia Carek</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">
          Más de 20 años de experiencia en transportación turística de lujo en
          el Caribe mexicano y el sureste.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {valores.map((v, i) => {
            const Icon = valorIcons[i % valorIcons.length];
            return (
              <motion.div
                key={v.titulo}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 border border-primary-100">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">
                  {v.titulo}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {v.descripcion}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Incluye */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl bg-[#0f172a] text-white px-6 py-10 sm:px-10 sm:py-12"
      >
        <SectionLabel light>Todo incluido</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Incluye
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {incluye.map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <CheckCircle2
                size={18}
                className="text-accent-500 shrink-0 mt-0.5"
              />
              <span className="text-white/85 text-sm sm:text-base leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Tipos de vehículos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionLabel>Flota</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Tipos de vehículos
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">
          Van, Suburban, Limusina y Bus: unidades actuales, en excelentes
          condiciones, para viajes privados o grupos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {vehiculos.map((v) => {
            const key = v.nombre.toLowerCase();
            const Icon = vehiculoIcons[key] || Car;
            return (
              <div
                key={v.nombre}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                {v.imagen && (
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={v.imagen}
                      alt={v.nombre}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow">
                      {v.nombre}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  {!v.imagen && (
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} className="text-primary-700" />
                      <h3 className="font-bold text-slate-900">{v.nombre}</h3>
                    </div>
                  )}
                  {v.capacidad && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 mb-2">
                      {v.capacidad}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {v.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Bodas & Grupos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50/80 via-white to-slate-50 px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart size={18} className="text-primary-700" />
          <SectionLabel className="mb-0">Eventos especiales</SectionLabel>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
          Bodas &amp; Grupos
        </h2>
        <p className="text-slate-600 leading-relaxed max-w-3xl whitespace-pre-line">
          {bodas}
        </p>
      </motion.section>

      {/* Precios */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionLabel>Tarifas</SectionLabel>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Precios
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl text-sm sm:text-base leading-relaxed">
          Tarifas orientativas. El precio final depende de la ruta, el tipo de
          vehículo, el horario y el número de pasajeros.
        </p>
        <div className="grid gap-4">
          {precios.map((p) => (
            <div
              key={p.concepto}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:px-6 sm:py-5"
            >
              <div>
                <h3 className="font-semibold text-slate-900">{p.concepto}</h3>
                {p.detalle && (
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                    {p.detalle}
                  </p>
                )}
              </div>
              <div className="shrink-0 text-left sm:text-right">
                {p.desde_usd != null ? (
                  <>
                    <p className="text-xl font-bold text-gold-600 tabular-nums">
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
      </motion.section>

      {/* CTA WhatsApp */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl bg-slate-900 text-white px-6 py-10 sm:px-12 sm:py-14 text-center relative overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary-600/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-xs font-semibold tracking-[2px] uppercase text-primary-300/90 mb-3">
            Reserva sin complicaciones
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            ¿Listo para tu traslado?
          </h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8">
            Indícanos fecha, vuelo, hotel y número de pasajeros. Te respondemos
            con opciones claras de vehículo y precio.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-8 py-4 text-base shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle size={22} />
            Cotizar por WhatsApp
          </a>
          <p className="mt-4 text-xs text-white/40">
            Respuesta prioritaria en horario de oficina · Lun–Sáb
          </p>
        </div>
      </motion.section>
    </div>
  );
}

function SectionLabel({
  children,
  light,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-xs font-semibold tracking-[2.5px] uppercase mb-3 ${
        light ? "text-primary-300/90" : "text-primary-700"
      } ${className}`}
    >
      {children}
    </span>
  );
}
