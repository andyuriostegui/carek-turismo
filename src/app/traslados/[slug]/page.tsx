import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Car,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  getTrasladoImages,
  whatsappTrasladoUrl,
  type Traslado,
} from "@/lib/traslados";
import TrasladoDetailSections from "@/components/traslados/TrasladoDetailSections";
import WhatsAppFloat from "@/components/traslados/WhatsAppFloat";
import DetailHeroGallery from "@/components/DetailHeroGallery";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getTraslado(slug: string): Promise<Traslado | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("traslados")
      .select("*")
      .eq("slug", slug)
      .eq("activo", true)
      .single();

    if (error || !data) return null;
    return data as Traslado;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const traslado = await getTraslado(slug);

  if (!traslado) {
    return { title: "Traslado no encontrado | CAREK Turismo" };
  }

  return {
    title: `${traslado.titulo} | Traslados CAREK`,
    description:
      traslado.descripcion ||
      `Traslado privado en ${traslado.zona}. Cotiza con CAREK Turismo.`,
  };
}

export default async function TrasladoDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const traslado = await getTraslado(slug);

  if (!traslado) {
    notFound();
  }

  const photos = getTrasladoImages(traslado);
  const wa = whatsappTrasladoUrl(traslado.titulo, traslado.zona);

  return (
    <main className="bg-white min-h-screen">
      {/* ========== HERO ========== */}
      <DetailHeroGallery
        images={photos}
        alt={traslado.titulo}
        className="h-[58vh] min-h-[400px] max-h-[640px]"
      >
        <div className="w-full max-w-7xl mx-auto px-6 pb-10 sm:pb-14 pt-28">
          <Link
            href="/traslados"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-5"
          >
            <ArrowLeft size={16} />
            Volver a traslados
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {traslado.zona && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5">
                <MapPin size={12} className="text-primary-300" />
                {traslado.zona}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-600/90 text-white text-xs font-semibold px-3 py-1.5">
              <Car size={12} />
              Traslado privado
            </span>
            {photos.length > 1 && (
              <span className="inline-flex items-center rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                {photos.length} fotos
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl mb-4">
            {traslado.titulo}
          </h1>

          {traslado.descripcion && (
            <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
              {traslado.descripcion}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {traslado.precio_desde_usd != null && (
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3.5">
                <p className="text-[11px] uppercase tracking-wide text-white/55 font-medium">
                  Desde
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  ${traslado.precio_desde_usd}{" "}
                  <span className="text-base font-semibold text-gold-400">
                    USD
                  </span>
                </p>
                {traslado.precio_desde_mxn != null && (
                  <p className="text-xs text-white/50">
                    ≈ ${traslado.precio_desde_mxn} MXN
                  </p>
                )}
              </div>
            )}

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-7 py-3.5 text-sm shadow-lg shadow-black/25 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </DetailHeroGallery>

      {/* ========== CONTENIDO ========== */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <TrasladoDetailSections traslado={traslado} />
        </div>
      </section>

      {/* Volver */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/traslados"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-800 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Ver todos los traslados
          </Link>
        </div>
      </section>

      <WhatsAppFloat />
    </main>
  );
}
