import { createClient } from "@/lib/supabase/server";
import { whatsappUrl } from "@/lib/contact";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MessageCircle } from "lucide-react";
import { normalizeImagenes } from "@/lib/images";
import DetailHeroGallery from "@/components/DetailHeroGallery";

export default async function CircuitoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: circuito, error } = await supabase
    .from("circuitos")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error || !circuito) notFound();

  const photos = normalizeImagenes(circuito.imagenes, circuito.imagen_url);
  const wa = whatsappUrl(
    `Hola CAREK, me interesa el circuito "${circuito.titulo}". ¿Me pueden cotizar?`,
  );

  return (
    <div className="min-h-screen bg-white">
      <DetailHeroGallery
        images={
          photos.length > 0
            ? photos
            : [
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
              ]
        }
        alt={circuito.titulo}
        className="h-[55vh] min-h-[360px] max-h-[600px]"
      >
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-28 text-center text-white">
          <Link
            href="/circuitos"
            className="mb-5 inline-block text-sm font-medium text-white/70 transition hover:text-white"
          >
            ← Volver a circuitos
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {circuito.titulo}
          </h1>
          {circuito.duracion && (
            <p className="mt-3 inline-flex items-center gap-2 text-lg text-white/85">
              <Clock size={18} />
              {circuito.duracion}
            </p>
          )}
        </div>
      </DetailHeroGallery>

      {photos.length > 1 && (
        <div className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-6 py-3">
            {photos.map((src: string, i: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`${circuito.titulo} — foto ${i + 1}`}
                className="h-16 w-24 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {(circuito.descripcion_larga || circuito.descripcion_corta) && (
          <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600">
            {circuito.descripcion_larga || circuito.descripcion_corta}
          </p>
        )}

        {(circuito.precio_desde_usd != null || circuito.precio_desde_mxn != null) && (
          <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-slate-50 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-gold-600">
              Precio desde
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {circuito.precio_desde_usd != null && (
                <>
                  ${circuito.precio_desde_usd}{" "}
                  <span className="text-base font-semibold text-gold-600">USD</span>
                </>
              )}
              {circuito.precio_desde_mxn != null && (
                <span className="ml-2 text-base font-medium text-slate-500">
                  {circuito.precio_desde_usd != null ? "· " : ""}
                  ${circuito.precio_desde_mxn} MXN
                </span>
              )}
            </p>
          </div>
        )}

        {Array.isArray(circuito.incluye) && circuito.incluye.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-slate-900">Incluye</h2>
            <ul className="space-y-2">
              {circuito.incluye.map((item: string) => (
                <li key={item} className="text-slate-700 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(circuito.itinerario) && circuito.itinerario.length > 0 && (
          <div>
            <h2 className="mb-3 text-xl font-bold text-slate-900">Itinerario</h2>
            <ol className="space-y-3">
              {circuito.itinerario.map((item: string, i: number) => (
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
          >
            <MessageCircle size={18} />
            Cotizar por WhatsApp
          </a>
          <Link
            href="/circuitos"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Ver más circuitos
          </Link>
        </div>
      </div>
    </div>
  );
}
