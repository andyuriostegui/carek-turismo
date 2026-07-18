import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Shield, Clock, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Traslado } from "@/lib/traslados";
import { whatsappTrasladoUrl } from "@/lib/traslados";
import { cn } from "@/lib/utils";
import TrasladosListing from "@/components/traslados/TrasladosListing";
import WhatsAppFloat from "@/components/traslados/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Traslados Privados | CAREK Turismo",
  description:
    "Traslados privados en Cancún, Riviera Maya, Holbox, Mérida y Chetumal. Aeropuerto–hotel, bodas y grupos con flota Van, Suburban, Limusina y Bus.",
};

/** Tabs de sub-navegación (como en turismocarek.mx). */
const REGION_TABS = [
  {
    id: "todos",
    label: "Todos los Traslados",
    href: "/traslados",
  },
  {
    id: "cancun",
    label: "Cancún y Riviera Maya",
    href: "/traslados?region=cancun",
  },
  {
    id: "holbox",
    label: "Holbox",
    href: "/traslados?region=holbox",
  },
  {
    id: "merida",
    label: "Mérida",
    href: "/traslados?region=merida",
  },
  {
    id: "chetumal",
    label: "Chetumal",
    href: "/traslados?region=chetumal",
  },
] as const;

type RegionId = (typeof REGION_TABS)[number]["id"];

const REGION_TITLES: Record<RegionId, string> = {
  todos: "Elige tu zona de traslado",
  cancun: "Cancún y Riviera Maya",
  holbox: "Traslados a Holbox",
  merida: "Traslados en Mérida",
  chetumal: "Traslados en Chetumal",
};

const REGION_DESCRIPTIONS: Record<RegionId, string> = {
  todos:
    "Cancún, Riviera Maya, Holbox, Mérida, Chetumal y más. Filtra por destino y cotiza en minutos.",
  cancun:
    "Aeropuerto de Cancún (CUN), zona hotelera, Playa del Carmen, Tulum y toda la Riviera Maya.",
  holbox:
    "Traslados terrestres a Chiquilá y coordinación de ferry hacia Isla Holbox.",
  merida:
    "Aeropuerto de Mérida (MID), centro histórico, hoteles y conexiones a cenotes cercanos.",
  chetumal:
    "Aeropuerto, hoteles, Bacalar y enlaces hacia la frontera y Costa Maya.",
};

const highlights = [
  {
    icon: Clock,
    title: "Puntualidad",
    text: "Monitoreo de vuelo y recojo a tiempo",
  },
  {
    icon: Shield,
    title: "Seguridad",
    text: "Unidades aseguradas y operadores de confianza",
  },
  {
    icon: Users,
    title: "Privado",
    text: "Solo tú y tu grupo en el vehículo",
  },
];

function normalizeRegion(raw?: string): RegionId {
  const value = (raw || "todos").toLowerCase().trim();
  const valid = REGION_TABS.some((t) => t.id === value);
  return (valid ? value : "todos") as RegionId;
}

/**
 * Aplica el filtro de región sobre el query de Supabase.
 * La columna `zona` es texto libre en admin; usamos ILIKE para coincidencias flexibles.
 *
 * Ejemplos de URLs:
 *   /traslados                  → todos
 *   /traslados?region=cancun    → Cancún / Riviera Maya
 *   /traslados?region=holbox    → Holbox
 *   /traslados?region=merida    → Mérida
 *   /traslados?region=chetumal  → Chetumal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyRegionFilter(query: any, region: RegionId) {
  switch (region) {
    case "cancun":
      // Cancún + Riviera Maya (incluye variantes sin acento)
      return query.or(
        [
          "zona.ilike.%cancún%",
          "zona.ilike.%cancun%",
          "zona.ilike.%riviera%",
          "zona.ilike.%playa del carmen%",
          "zona.ilike.%tulum%",
          "zona.ilike.%puerto morelos%",
        ].join(","),
      );
    case "holbox":
      return query.ilike("zona", "%holbox%");
    case "merida":
      return query.or("zona.ilike.%mérida%,zona.ilike.%merida%");
    case "chetumal":
      return query.or(
        "zona.ilike.%chetumal%,zona.ilike.%bacalar%,zona.ilike.%costa maya%",
      );
    case "todos":
    default:
      return query;
  }
}

export default async function TrasladosPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; zona?: string }>;
}) {
  const params = await searchParams;
  // Preferimos `region` (nuevo); `zona` se mantiene por compatibilidad.
  const region = normalizeRegion(params.region || params.zona);

  let traslados: Traslado[] = [];
  let fetchError: string | null = null;

  try {
    const supabase = await createClient();

    let query = supabase
      .from("traslados")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true });

    // Filtro por región en Supabase (ver applyRegionFilter arriba)
    query = applyRegionFilter(query, region);

    const { data, error } = await query;

    if (error) {
      fetchError = error.message;
    } else {
      traslados = (data as Traslado[]) || [];
    }
  } catch {
    fetchError = "No se pudo conectar con la base de datos.";
  }

  const wa = whatsappTrasladoUrl();
  const activeTab = REGION_TABS.find((t) => t.id === region) ?? REGION_TABS[0];

  return (
    <main className="bg-white min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[720px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/viaje.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        {/* Fallback visual si el video no carga bien en algunos dispositivos */}
        <img
          src="/viaje.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover -z-10"
          aria-hidden
        />

        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
          <p className="text-xs sm:text-sm font-medium tracking-[2px] uppercase text-white/70 mb-4">
            Inicio / Traslados
            {region !== "todos" && (
              <span className="text-white/50"> / {activeTab.label}</span>
            )}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-5">
            Traslados Privados
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            Aeropuerto–hotel, zona hotelera, Riviera Maya y el sureste. Cómodo,
            seguro y puntual — solo tú y tu grupo en el vehículo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#rutas"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 text-sm shadow-lg shadow-teal-900/30 transition-colors"
            >
              Ver rutas
              <ArrowRight size={16} />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 text-sm backdrop-blur-sm transition-colors"
            >
              <MessageCircle size={16} />
              Cotizar WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========== SUB-NAVBAR DE REGIONES ========== */}
      <nav
        aria-label="Filtrar traslados por región"
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm shadow-slate-900/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-3 scrollbar-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="tablist"
          >
            {REGION_TABS.map((tab) => {
              const active = tab.id === region;
              return (
                <Link
                  key={tab.id}
                  href={tab.id === "todos" ? "/traslados#rutas" : `${tab.href}#rutas`}
                  role="tab"
                  aria-selected={active}
                  scroll={false}
                  className={cn(
                    "shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all border whitespace-nowrap",
                    active
                      ? "bg-[#0f172a] text-white border-[#0f172a] shadow-md shadow-slate-900/15"
                      : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-800 hover:bg-teal-50/50",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Trust strip */}
      <section className="border-b border-slate-100 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GRID ========== */}
      <section id="rutas" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          {fetchError ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
              <p className="text-amber-900 font-medium mb-1">
                No pudimos cargar los traslados
              </p>
              <p className="text-sm text-amber-800/80 mb-5">{fetchError}</p>
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
            <TrasladosListing
              traslados={traslados}
              title={REGION_TITLES[region]}
              description={REGION_DESCRIPTIONS[region]}
              showFilters={false}
              emptyRegionLabel={
                region !== "todos" ? activeTab.label : undefined
              }
              allHref="/traslados#rutas"
            />
          )}
        </div>
      </section>

      {/* CTA inferior */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-lg">
              <p className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                ¿Ruta a medida o boda en el Caribe?
              </p>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                Bodas, grupos e incentivos con Van, Suburban, Limusina o Bus.
                Cuéntanos fecha, hotel y pasajeros.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold px-7 py-3.5 text-sm transition-colors shadow-lg shadow-emerald-900/20"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3.5 text-sm transition-colors"
              >
                Formulario
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloat />
    </main>
  );
}
