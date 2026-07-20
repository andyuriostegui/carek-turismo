import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  getArrayField,
  getPriceLines,
  getTourImages,
  whatsappTourUrl,
  type Tour,
} from "@/lib/tours";
import DetailHeroGallery from "@/components/DetailHeroGallery";

type PageProps = {
  params: Promise<{ destino: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("tours")
      .select("titulo, descripcion_corta")
      .eq("slug", slug)
      .eq("activo", true)
      .maybeSingle();

    if (data) {
      return {
        title: `${data.titulo} | CAREK Turismo`,
        description: data.descripcion_corta || undefined,
      };
    }
  } catch {
    // fallback
  }
  return { title: "Tour | CAREK Turismo" };
}

export default async function TourDetallePage({ params }: PageProps) {
  const { destino, slug } = await params;

  let tour: Tour | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tours")
      .select(
        `
        *,
        destinos (
          nombre,
          slug
        )
      `,
      )
      .eq("slug", slug)
      .eq("activo", true)
      .maybeSingle();

    if (error || !data) notFound();
    tour = data as Tour;
  } catch {
    notFound();
  }

  if (!tour) notFound();

  const photos = getTourImages(tour, destino);
  const incluye = getArrayField(tour.incluye);
  const noIncluye = getArrayField(tour.no_incluye);
  const itinerario = getArrayField(tour.itinerario);
  const recomendaciones = getArrayField(tour.recomendaciones);
  const importante = getArrayField(tour.importante);
  const priceLines = getPriceLines(tour);
  const destinoNombre = tour.destinos?.nombre || destino;
  const wa = whatsappTourUrl(tour.titulo, destinoNombre);
  const descripcion =
    tour.descripcion_larga?.trim() ||
    tour.descripcion_corta?.trim() ||
    null;

  return (
    <main className="min-h-screen bg-white">
      <DetailHeroGallery
        images={photos}
        alt={tour.titulo}
        className="h-[50vh] min-h-[360px] sm:h-[55vh]"
      >
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-28 sm:px-10 sm:pb-14">
          <Link
            href={`/tours/${destino}`}
            className="mb-4 inline-block text-sm font-medium text-white/70 transition hover:text-white"
          >
            ← Volver a {destinoNombre}
          </Link>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900">
              <MapPin size={13} className="text-primary-700" />
              {destinoNombre}
            </span>
            {tour.duracion && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white">
                <Clock size={13} />
                {tour.duracion}
              </span>
            )}
            {photos.length > 1 && (
              <span className="inline-flex items-center rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                {photos.length} fotos
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {tour.titulo}
          </h1>
          {tour.precio_adulto_usd != null && (
            <p className="mt-3 text-lg font-semibold text-gold-400">
              Desde ${tour.precio_adulto_usd} USD
              {tour.precio_adulto_mxn != null && (
                <span className="ml-2 text-sm font-medium text-white/60">
                  ≈ ${tour.precio_adulto_mxn} MXN
                </span>
              )}
            </p>
          )}
        </div>
      </DetailHeroGallery>

      <section className="mx-auto max-w-4xl space-y-8 px-6 py-10 sm:py-14">
        {descripcion && (
          <p className="whitespace-pre-line text-base leading-relaxed text-slate-600 sm:text-lg">
            {descripcion}
          </p>
        )}

        {priceLines.length > 0 && (
          <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-slate-50 p-5 sm:p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gold-600">
              Precios
            </h2>
            <ul className="space-y-2">
              {priceLines.map((line) => (
                <li key={line} className="font-semibold text-slate-800">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {itinerario.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">Itinerario</h2>
            <ol className="space-y-3">
              {itinerario.map((item, i) => (
                <li key={`${item}-${i}`} className="flex gap-3 text-slate-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {(incluye.length > 0 || noIncluye.length > 0) && (
          <div className="grid gap-6 md:grid-cols-2">
            {incluye.length > 0 && (
              <div className="rounded-2xl border border-primary-100 bg-primary-50/50 p-5">
                <h2 className="mb-3 text-lg font-bold text-primary-900">Incluye</h2>
                <ul className="space-y-2">
                  {incluye.map((item) => (
                    <li key={item} className="flex gap-2 text-slate-700">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent-600"
                      />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {noIncluye.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-3 text-lg font-bold text-slate-800">
                  No incluye
                </h2>
                <ul className="space-y-2">
                  {noIncluye.map((item) => (
                    <li key={item} className="flex gap-2 text-slate-600">
                      <XCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {recomendaciones.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-slate-900">
              Recomendaciones
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {recomendaciones.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {importante.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-700" />
              <h2 className="text-lg font-bold text-amber-900">Importante</h2>
            </div>
            <ul className="space-y-2">
              {importante.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-amber-950/80"
                >
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1ebe57]"
          >
            <MessageCircle size={18} />
            Cotizar por WhatsApp
          </a>
          <Link
            href={`/tours/${destino}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Ver más tours
          </Link>
        </div>
      </section>
    </main>
  );
}
