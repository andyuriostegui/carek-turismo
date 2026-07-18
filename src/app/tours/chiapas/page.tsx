import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ChiapasPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error de conexión</p>
      </div>
    );
  }

  const { data: destino } = await supabase
    .from("destinos")
    .select("*")
    .eq("slug", "chiapas")
    .single();

  const { data: tours } = await supabase
    .from("tours")
    .select("*")
    .eq("destino_id", destino?.id)
    .eq("activo", true)
    .order("orden", { ascending: true });

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tours en Chiapas</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            {destino?.descripcion || "Selva Lacandona, cascadas, cultura viva y naturaleza impresionante."}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        {tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div key={tour.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-br from-emerald-500 to-green-800" />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{tour.titulo}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.descripcion_corta}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {tour.precio_adulto_usd && (
                        <p className="text-lg font-bold text-teal-700">Desde ${tour.precio_adulto_usd} USD</p>
                      )}
                      {tour.duracion && <p className="text-xs text-gray-500">{tour.duracion}</p>}
                    </div>
                    <Link
                      href={`/tours/chiapas/${tour.slug}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No hay tours disponibles en este momento.
          </div>
        )}
      </section>
    </div>
  );
}