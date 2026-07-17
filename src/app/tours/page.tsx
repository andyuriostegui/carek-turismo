import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import CategoryCard from "@/components/tours/CategoryCard";
import { tourCategories } from "@/data/tours";

export const metadata: Metadata = {
  title: "Nuestros Tours | CAREK Turismo",
  description:
    "Explora tours en Costa Maya, Chichén Itzá, Cancún, Cozumel, Mérida, Campeche, Chiapas, Tabasco y Holbox. Experiencias inolvidables con CAREK.",
};

export default function ToursPage() {
  return (
    <main className="bg-white">
      {/* ========== HERO CON IMAGEN ========== */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo (Playa estilo Cancún) */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Playa de Cancún"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[2px] uppercase text-white/70">
              Inicio / Tours
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Nuestros Tours
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10">
            Elige un destino y descubre experiencias diseñadas para que vivas el 
            Caribe y la cultura maya sin preocupaciones.
          </p>
        </div>
      </section>

      {/* ========== CONTENIDO ========== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 mb-4 border border-teal-100">
                <Compass size={14} className="text-teal-700" />
                9 destinos · Experiencias únicas
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                Explora por destino
              </h2>
              <p className="mt-2 text-slate-600 text-base leading-relaxed">
                Desde playas vírgenes hasta maravillas arqueológicas. Selecciona
                una categoría para ver los tours disponibles.
              </p>
            </div>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {tourCategories.map((category) => (
              <div
                key={category.slug}
                className="group active:scale-[0.985] transition-all duration-200"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-lg">
              <p className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                ¿Buscas algo a medida?
              </p>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                Armamos tours personalizados para familias, grupos y empresas.
                Cuéntanos qué imaginas y lo hacemos realidad.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 text-sm transition-colors shrink-0 shadow-lg shadow-teal-600/25"
            >
              Pedir cotización
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}