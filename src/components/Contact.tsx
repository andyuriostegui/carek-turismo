"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  CAREK_EMAIL_LIST,
  CAREK_PHONE_DISPLAY,
  CAREK_PHONE_TEL,
  whatsappUrl,
} from "@/lib/contact";

const benefits = [
  {
    icon: Sparkles,
    title: "Cotización a medida",
    text: "Armamos tu viaje según presupuesto, fechas y estilo.",
  },
  {
    icon: Clock,
    title: "Respuesta en menos de 2 h",
    text: "En horario laboral te respondemos rápido por WhatsApp o email.",
  },
  {
    icon: Shield,
    title: "Sin compromiso",
    text: "Pide información gratis. Tú decides si reservas.",
  },
];

const interests = [
  "Tour individual",
  "Circuito / paquete",
  "Traslado aeropuerto",
  "Grupo / empresa",
  "Otro",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Tour individual",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

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
    // UI de conversión: cuando haya backend/API, conectar aquí
    setStatus("sent");
  }

  const waUrl = whatsappUrl(
    "Hola CAREK, quiero cotizar un viaje. ¿Me ayudan?",
  );

  return (
    <section
      id="contacto"
      className="relative bg-slate-50 text-slate-900 py-20 sm:py-28 overflow-hidden"
    >
      {/* Decoración sutil */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Encabezado comercial */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 text-teal-900 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 mb-4">
            <Sparkles size={14} />
            Empieza tu viaje hoy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            ¿Listo para viajar?{" "}
            <span className="text-teal-700">Te armamos la cotización</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Cuéntanos qué buscas y te enviamos opciones claras con precios,
            horarios y recomendaciones. Sin vueltas y sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Columna venta + canales */}
          <div className="lg:col-span-2 space-y-8">
            <ul className="space-y-5">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-teal-700">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-xl shadow-slate-900/10">
              <p className="text-sm text-white/70 mb-4">
                ¿Prefieres hablar ya? Escríbenos y te atendemos al momento.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3.5 transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp — cotizar ahora
                </a>
                <a
                  href={CAREK_PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium px-5 py-3 transition-colors"
                >
                  <Phone size={18} />
                  {CAREK_PHONE_DISPLAY}
                </a>
                {CAREK_EMAIL_LIST.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium px-5 py-3 transition-colors text-sm break-all"
                  >
                    <Mail size={18} className="shrink-0" />
                    {email}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/50 text-center">
                Lun–Sáb · 8:00–20:00 · Respuesta prioritaria por WhatsApp
              </p>
            </div>
          </div>

          {/* Formulario lead */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
              {status === "sent" ? (
                <div className="flex flex-col items-center text-center py-12 px-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-slate-600 max-w-md mb-6">
                    Gracias, {form.name || "viajero"}. En breve te escribimos
                    con opciones para tu viaje. Si tienes prisa, contáctanos por
                    WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 transition-colors"
                    >
                      <MessageCircle size={18} />
                      Abrir WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          interest: "Tour individual",
                          message: "",
                        });
                      }}
                      className="rounded-full border border-slate-200 text-slate-700 font-medium px-6 py-3 hover:bg-slate-50 transition-colors"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      Solicita tu cotización gratis
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Completa el formulario y te respondemos con opciones
                      personalizadas.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                          Nombre
                        </span>
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                          Teléfono / WhatsApp
                        </span>
                        <input
                          required
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="99 82 33 56 69"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                        Email
                      </span>
                      <input
                        required
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                        ¿Qué te interesa?
                      </span>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                      >
                        {interests.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                        Cuéntanos tu idea de viaje
                      </span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Destino, fechas, número de personas, presupuesto aproximado..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-y min-h-[120px]"
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-4 transition-colors shadow-lg shadow-teal-700/25"
                    >
                      <Send size={18} />
                      Quiero mi cotización gratis
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Al enviar aceptas que te contactemos sobre tu solicitud.
                      No spam.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
