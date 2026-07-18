import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Destino, Tour } from "@/lib/tours";
import { getDestinoImage, whatsappTourUrl } from "@/lib/tours";
import { tourCategories } from "@/data/tours";
import { getActiveDestinos } from "@/lib/tours-server";
import ToursListing from "@/components/tours/ToursListing";
import ToursDestinosNav from "@/components/tours/ToursDestinosNav";

type DestinationToursViewProps = {
  destino: Destino | null;
  tours: Tour[];
  /** Slug de la URL (fallback si destino no se encuentra). */
  slug: string;
  /** Título de fallback del hero. */
  fallbackTitle: string;
  /** Descripción de fallback del hero. */
  fallbackDescription?: string;
  fetchError?: string | null;
};

export default async function DestinationToursView({
  destino,
  tours,
  slug,
  fallbackTitle,
  fallbackDescription,
  fetchError,
}: DestinationToursViewProps) {
  const nombre = destino?.nombre || fallbackTitle;
  const descripcion =
    destino?.descripcion ||
    fallbackDescription ||
    "Experiencias diseñadas para que vivas el destino sin preocupaciones.";
  const heroImage = getDestinoImage(slug, destino?.imagen_url);
  const wa = whatsappTourUrl(undefined, nombre);

  const { destinos } = await getActiveDestinos();
  const destinoTabs =
    destinos.length > 0
      ? destinos.map((d) => ({ slug: d.slug, label: d.nombre }))
      : tourCategories.map((c) => ({ slug: c.slug, label: c.shortName }));

  return (
    <main className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative flex h-[55vh] min-h-[400px] items-center justify-center overflow-hidden sm:h-[60vh] sm:min-h-[420px]">
        <Image
          src={heroImage}
          alt={nombre}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized={heroImage.startsWith("http")}
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[2px] text-white/70 sm:text-sm">
            Inicio / Tours / {nombre}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {fallbackTitle}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {descripcion}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#tours"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition-colors hover:bg-teal-500"
            >
              Ver tours
              <ArrowRight size={16} />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <MessageCircle size={16} />
              Cotizar WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========== SUB-NAVBAR DE DESTINOS ========== */}
      <ToursDestinosNav destinos={destinoTabs} activeSlug={slug} />

      {/* ========== GRID ========== */}
      <section id="tours" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {fetchError ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
              <p className="mb-1 font-medium text-amber-900">
                No pudimos cargar los tours
              </p>
              <p className="mb-5 text-sm text-amber-800/80">{fetchError}</p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-700"
              >
                <MessageCircle size={16} />
                Cotiza por WhatsApp mientras tanto
              </a>
            </div>
          ) : (
            <ToursListing
              tours={tours}
              title={`Elige tu experiencia en ${nombre}`}
              description="Abre el detalle de cada tour para ver itinerario, precios, qué incluye y recomendaciones."
              destinoSlug={slug}
              destinoNombre={nombre}
              emptyLabel={nombre}
              allHref="/tours"
            />
          )}
        </div>
      </section>

      {/* CTA inferior */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 rounded-2xl bg-[#0f172a] px-6 py-10 text-white sm:rounded-3xl sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <p className="mb-2 text-xl font-bold tracking-tight sm:text-2xl">
                ¿Buscas un tour a medida en {nombre}?
              </p>
              <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                Armamos experiencias personalizadas para familias, grupos y
                empresas. Cuéntanos qué imaginas.
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500"
              >
                Formulario
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
