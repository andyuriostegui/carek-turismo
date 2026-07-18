import type { Metadata } from "next";
import Image from "next/image";
import { circuitoCategories } from "@/data/circuitos";
import CircuitosExplorer from "@/components/circuitos/CircuitosExplorer";

export const metadata: Metadata = {
  title: "Circuitos y Paquetes | CAREK Turismo",
  description:
    "Itinerarios de varios días por Chiapas, Campeche, el Caribe y circuitos combinados. Descubre paquetes con CAREK.",
};

export default function CircuitosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative flex h-[55vh] min-h-[400px] items-center justify-center overflow-hidden sm:h-[60vh] sm:min-h-[420px]">
        <Image
          src="/vacas.jpg"
          alt="Paisaje de viaje"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[2px] text-white/70">
              Inicio / Circuitos
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Circuitos y Paquetes
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/85 md:text-xl">
            Itinerarios de varios días diseñados para que vivas lo mejor de cada
            destino. Explora las opciones en el menú y abre el detalle de cada
            circuito.
          </p>
        </div>
      </section>

      <CircuitosExplorer categories={circuitoCategories} />
    </main>
  );
}
