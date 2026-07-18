import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TourDetallePage({
  params,
}: {
  params: Promise<{ destino: string; slug: string }>;
}) {
  const { destino, slug } = await params;
  const supabase = await createClient();

  if (!supabase) {
    notFound();
  }

  const { data: tour, error } = await supabase
    .from("tours")
    .select(`
      *,
      destinos (
        nombre,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error || !tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/tours/${destino}`}
            className="text-sm text-slate-300 hover:text-white mb-4 inline-block"
          >
            ← Volver a {tour.destinos?.nombre || destino}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{tour.titulo}</h1>
          {tour.duracion && (
            <p className="text-slate-300">{tour.duracion}</p>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        {/* Precio */}
        <div className="flex flex-wrap items-end gap-6 mb-8 p-5 bg-teal-50 rounded-2xl">
          {tour.precio_adulto_usd && (
            <div>
              <p className="text-sm text-gray-500">Adulto</p>
              <p className="text-2xl font-bold text-teal-700">
                ${tour.precio_adulto_usd} USD
              </p>
              {tour.precio_adulto_mxn && (
                <p className="text-sm text-gray-500">${tour.precio_adulto_mxn} MXN</p>
              )}
            </div>
          )}
          {tour.precio_menor_usd && (
            <div>
              <p className="text-sm text-gray-500">Menor</p>
              <p className="text-xl font-bold text-teal-700">
                ${tour.precio_menor_usd} USD
              </p>
            </div>
          )}
        </div>

        {/* Descripción */}
        {tour.descripcion_larga && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tour.descripcion_larga}
            </p>
          </div>
        )}

        {/* Itinerario */}
        {tour.itinerario?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Itinerario</h2>
            <ul className="space-y-2">
              {tour.itinerario.map((item: string, i: number) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-teal-600 font-bold">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Incluye / No incluye */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tour.incluye?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-green-700">Incluye</h2>
              <ul className="space-y-1.5">
                {tour.incluye.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="text-green-600">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tour.no_incluye?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-red-600">No incluye</h2>
              <ul className="space-y-1.5">
                {tour.no_incluye.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="text-red-500">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recomendaciones */}
        {tour.recomendaciones?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Recomendaciones</h2>
            <ul className="space-y-1.5">
              {tour.recomendaciones.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span>•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Importante */}
        {tour.importante?.length > 0 && (
          <div className="mb-10 p-5 bg-amber-50 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3 text-amber-800">Importante</h2>
            <ul className="space-y-1.5">
              {tour.importante.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-amber-900">
                  <span>⚠</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/5219990000000?text=Hola,%20me%20interesa%20el%20tour%20"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-center font-medium px-8 py-3.5 rounded-xl transition"
          >
            Cotizar por WhatsApp
          </a>
          <Link
            href={`/tours/${destino}`}
            className="border border-gray-300 hover:bg-gray-50 text-center font-medium px-8 py-3.5 rounded-xl transition"
          >
            Ver más tours
          </Link>
        </div>
      </section>
    </div>
  );
}