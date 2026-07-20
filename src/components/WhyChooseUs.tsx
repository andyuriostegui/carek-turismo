"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Heart, Users, Sparkles, MapPin, BadgeDollarSign, ShieldCheck, 
  ArrowRight 
} from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Atención humana, de verdad",
    description: "Hablas con personas que conocen el destino. Te acompañamos antes, durante y después del viaje.",
  },
  {
    icon: Users,
    title: "Guías locales que enamoran",
    description: "Historias reales, rutas especiales y secretos que solo quien vive aquí conoce.",
  },
  {
    icon: Sparkles,
    title: "Experiencias auténticas",
    description: "Grupos pequeños, ritmo relajado y momentos memorables lejos de las multitudes.",
  },
  {
    icon: MapPin,
    title: "Tours a tu medida",
    description: "Adaptamos horarios, intensidad y paradas según tu estilo de viaje y tu grupo.",
  },
  {
    icon: BadgeDollarSign,
    title: "Precios justos y transparentes",
    description: "Trabajamos directo con los proveedores. Sin comisiones ocultas ni sorpresas.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y puntualidad",
    description: "Operación profesional, tiempos cumplidos y soporte cuando lo necesitas.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f8fafc] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[3px] uppercase text-primary-600 mb-3 block">
            La diferencia Carek
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            ¿Por qué viajar con <span className="text-primary-700">Carek</span>?
          </h2>
          <p className="text-lg text-slate-600">
            Más que tours: experiencias auténticas en el sureste mexicano, 
            diseñadas con calidez humana y el cuidado de quien viaja contigo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                <reason.icon size={24} strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                {reason.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
            <div className="px-6 py-3 text-left">
              <p className="font-semibold text-slate-900">¿Listo para tu próxima aventura?</p>
              <p className="text-sm text-slate-500">Cuéntanos qué imaginas y lo armamos juntos.</p>
            </div>
            <Link 
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all active:scale-[0.985]"
            >
              Cotiza tu experiencia
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}