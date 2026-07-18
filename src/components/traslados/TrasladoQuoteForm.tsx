"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Luggage,
  MessageCircle,
  Send,
  Shield,
  Users,
} from "lucide-react";
import { trasladoZones } from "@/data/traslados";
import { whatsappUrl as buildWhatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const ORIGEN_OPTIONS = ["Aeropuerto", "Hotel", "Otro"] as const;

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  origenTipo: "Aeropuerto" as (typeof ORIGEN_OPTIONS)[number],
  origenDetalle: "",
  destino: "",
  fecha: "",
  hora: "",
  personas: "2",
  maletas: "",
  message: "",
};

const trustPoints = [
  {
    icon: Clock,
    text: "Respuesta en menos de 30 minutos en horario de oficina",
  },
  {
    icon: Shield,
    text: "Conductores de confianza y unidades en buen estado",
  },
  {
    icon: Users,
    text: "Cotización sin compromiso, adaptada a tu grupo",
  },
];

export default function TrasladoQuoteForm() {
  const searchParams = useSearchParams();
  const zonaId = searchParams.get("zona");

  const zonaNombre = useMemo(() => {
    if (!zonaId) return null;
    return trasladoZones.find((z) => z.id === zonaId)?.name ?? null;
  }, [zonaId]);

  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    if (!zonaNombre) return;
    setForm((prev) => ({
      ...prev,
      destino: prev.destino || zonaNombre,
      message:
        prev.message ||
        `Me interesa un traslado privado en la zona de ${zonaNombre}.`,
    }));
  }, [zonaNombre]);

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // UI de conversión: conectar backend/API cuando esté disponible
    setStatus("sent");
  }

  const whatsappUrl = buildWhatsappUrl(
    zonaNombre
      ? `Hola CAREK, quiero cotizar un traslado en ${zonaNombre}.`
      : "Hola CAREK, quiero cotizar un traslado privado.",
  );

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition";

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
      {/* Columna de confianza */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Cotiza tu traslado en minutos
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Indica origen, destino y fecha. Te enviamos opciones claras con
            precio y tipo de vehículo según pasajeros y equipaje.
          </p>
        </div>

        <ul className="space-y-4">
          {trustPoints.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 items-start">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                <Icon size={18} />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {text}
              </p>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-xl shadow-slate-900/10">
          <p className="text-sm text-white/70 mb-4">
            ¿Necesitas confirmar ya el horario de vuelo? Escríbenos por WhatsApp
            y te atendemos al momento.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-5 py-3.5 transition-colors"
          >
            <MessageCircle size={20} />
            WhatsApp — traslado ahora
          </a>
          <p className="mt-4 text-xs text-white/50 text-center">
            Lun–Sáb · 8:00–20:00 · Prioridad en horario de oficina
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="lg:col-span-3">
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          {status === "sent" ? (
            <div className="flex flex-col items-center text-center py-10 px-2 sm:py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                ¡Solicitud enviada!
              </h3>
              <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
                Gracias, {form.name || "viajero"}. Revisaremos tu traslado
                {zonaNombre ? ` en ${zonaNombre}` : ""} y te contactaremos a la
                brevedad. Si tu vuelo es pronto, escríbenos por WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-6 py-3 transition-colors"
                >
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm(emptyForm);
                  }}
                  className="rounded-full border border-slate-200 text-slate-700 font-medium px-6 py-3 hover:bg-slate-50 transition-colors"
                >
                  Nueva cotización
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Formulario de cotización
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Completa los datos del traslado. Los campos marcados son
                  obligatorios.
                  {zonaNombre && (
                    <span className="block mt-2 text-teal-800 font-medium">
                      Zona seleccionada: {zonaNombre}
                    </span>
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Nombre completo
                  </span>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Como aparece en tu identificación"
                    autoComplete="name"
                    className={inputClass}
                  />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      WhatsApp / Teléfono
                    </span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="99 82 33 56 69"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Correo electrónico
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      autoComplete="email"
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Origen
                    </span>
                    <select
                      required
                      name="origenTipo"
                      value={form.origenTipo}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {ORIGEN_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Detalle del origen
                    </span>
                    <input
                      required
                      name="origenDetalle"
                      value={form.origenDetalle}
                      onChange={handleChange}
                      placeholder={
                        form.origenTipo === "Aeropuerto"
                          ? "Ej. Aeropuerto de Cancún (CUN)"
                          : form.origenTipo === "Hotel"
                            ? "Ej. Hotel Xcaret México"
                            : "Dirección o punto de encuentro"
                      }
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Destino
                  </span>
                  <input
                    required
                    name="destino"
                    value={form.destino}
                    onChange={handleChange}
                    placeholder="Hotel, aeropuerto o dirección de destino"
                    className={inputClass}
                  />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Fecha del traslado
                    </span>
                    <input
                      required
                      name="fecha"
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Hora aproximada
                    </span>
                    <input
                      required
                      name="hora"
                      type="time"
                      value={form.hora}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Cantidad de personas
                    </span>
                    <div className="relative">
                      <Users
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        required
                        name="personas"
                        type="number"
                        min={1}
                        max={50}
                        value={form.personas}
                        onChange={handleChange}
                        className={cn(inputClass, "pl-10")}
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Cantidad de maletas{" "}
                      <span className="text-slate-400 font-normal">
                        (opcional)
                      </span>
                    </span>
                    <div className="relative">
                      <Luggage
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="maletas"
                        type="number"
                        min={0}
                        max={50}
                        value={form.maletas}
                        onChange={handleChange}
                        placeholder="Ej. 3"
                        className={cn(inputClass, "pl-10")}
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Mensaje adicional
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Número de vuelo, silla para bebé, paradas extra, necesidades especiales..."
                    className={cn(inputClass, "resize-y min-h-[110px]")}
                  />
                </label>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-4 text-base transition-colors shadow-lg shadow-teal-700/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <Send size={18} />
                  Solicitar Cotización
                </button>

                <p className="text-center text-sm text-slate-500 leading-relaxed pt-1">
                  Respuesta en menos de 30 minutos en horario de oficina.
                  <span className="block text-xs text-slate-400 mt-1">
                    Al enviar aceptas que te contactemos sobre tu solicitud. No
                    spam.
                  </span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
