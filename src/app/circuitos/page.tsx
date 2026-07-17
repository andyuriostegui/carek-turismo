import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function CircuitosPage() {
  const { data: circuitos } = await supabase
    .from("circuitos")
    .select("*")
    .eq("activo", true)
    .order("orden", { ascending: true });

  return (
    <div className="min-h-screen bg-white">
      {/* ========== HERO CON IMAGEN ========== */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo (viaje / paisaje) */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Paisaje de viaje"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Circuitos y Paquetes
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
            Itinerarios de varios días diseñados para que vivas lo mejor de cada destino.
          </p>
        </div>
      </section>

      {/* ========== CONTENIDO ========== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {circuitos && circuitos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {circuitos.map((item) => (
              <Link
                key={item.id}
                href={`/circuitos/${item.slug}`}
                className="group block rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen de la tarjeta */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={getCircuitoImage(item.slug)}
                    alt={item.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                      {item.titulo}
                    </h2>
                    {item.duracion && (
                      <span className="text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        {item.duracion}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-3 mb-6">
                    {item.descripcion_corta}
                  </p>

                  <div className="flex items-center justify-between">
                    {item.precio_desde_usd && (
                      <div>
                        <p className="text-xs text-gray-500">Desde</p>
                        <p className="text-2xl font-bold text-teal-700">
                          ${item.precio_desde_usd} USD
                        </p>
                      </div>
                    )}

                    <span className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-teal-700">
                      Ver detalles →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No hay circuitos disponibles por el momento.
          </div>
        )}
      </section>
    </div>
  );
}

// Función auxiliar para imágenes
function getCircuitoImage(slug: string) {
  const images: Record<string, string> = {
    // Puedes agregar más slugs aquí
  };
  return images[slug] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
}