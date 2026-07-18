import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";
import CategoryCard from "@/components/tours/CategoryCard";
import ToursDestinosNav from "@/components/tours/ToursDestinosNav";
import { tourCategories } from "@/data/tours";
import { getActiveDestinos } from "@/lib/tours-server";
import { getDestinoImage, type Destino } from "@/lib/tours";
import type { TourCategory } from "@/data/tours";
import { whatsappTourUrl } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Nuestros Tours | CAREK Turismo",
  description:
    "Explora tours en Costa Maya, Chichén Itzá, Cancún, Cozumel, Mérida, Campeche, Chiapas, Tabasco y Holbox. Experiencias inolvidables con CAREK.",
};

function destinoToCategory(destino: Destino): TourCategory {
  const staticMatch = tourCategories.find((c) => c.slug === destino.slug);
  return {
    slug: destino.slug,
    name: staticMatch?.name || `Tours en ${destino.nombre}`,
    shortName: destino.nombre,
    description:
      destino.descripcion ||
      staticMatch?.description ||
      `Descubre experiencias en ${destino.nombre} con CAREK.`,
    image: getDestinoImage(destino.slug, destino.imagen_url),
    imageAlt: staticMatch?.imageAlt || destino.nombre,
  };
}

export default async function ToursPage() {
  const { destinos, fetchError } = await getActiveDestinos();

  const categories: TourCategory[] =
    destinos.length > 0
      ? destinos.map(destinoToCategory)
      : tourCategories;

  const destinoTabs = categories.map((c) => ({
    slug: c.slug,
    label: c.shortName,
  }));

  const wa = whatsappTourUrl();

  return (
    <main className="bg-white">
      {/* ========== HERO ========== */}
      <section className="relative flex h-[70vh] min-h-[520px] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Playa de Cancún"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[2px] text-white/70">
              Inicio / Tours
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Nuestros Tours
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85 md:text-xl">
            Elige un destino y descubre experiencias diseñadas para que vivas el
            Caribe y la cultura maya sin preocupaciones.
          </p>
        </div>
      </section>

      {/* ========== SUB-NAVBAR DE DESTINOS ========== */}
      <ToursDestinosNav destinos={destinoTabs} />

      {/* ========== CONTENIDO ========== */}
      <section id="destinos" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-900">
                <Compass size={14} className="text-teal-700" />
                {categories.length} destinos · Experiencias únicas
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
                Explora por destino
              </h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                Desde playas vírgenes hasta maravillas arqueológicas. Selecciona
                una categoría para ver los tours disponibles.
              </p>
            </div>
          </div>

          {fetchError && destinos.length === 0 ? (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-6 text-center text-sm text-amber-900">
              No se pudo conectar con la base de datos. Mostrando destinos de
              referencia.
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {categories.map((category) => (
              <div
                key={category.slug}
                className="group transition-all duration-200 active:scale-[0.985]"
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0f172a] px-6 py-10 text-white sm:rounded-3xl sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <p className="mb-2 text-xl font-bold tracking-tight sm:text-2xl">
                ¿Buscas algo a medida?
              </p>
              <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                Armamos tours personalizados para familias, grupos y empresas.
                Cuéntanos qué imaginas y lo hacemos realidad.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-500"
              >
                Pedir cotización
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
