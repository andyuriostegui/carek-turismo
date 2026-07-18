/**
 * Tipos y helpers de la sección Traslados.
 * Mapean a la tabla `traslados` de Supabase.
 */

import { CAREK_WHATSAPP } from "@/lib/contact";

export { CAREK_WHATSAPP };

export type TrasladoVehiculo = {
  nombre: string;
  descripcion: string;
  capacidad?: string;
  imagen?: string;
};

export type TrasladoValor = {
  titulo: string;
  descripcion: string;
};

export type TrasladoPrecio = {
  concepto: string;
  detalle?: string;
  desde_usd?: number | null;
  desde_mxn?: number | null;
};

/** Fila de la tabla `traslados` (campos base + enriquecidos). */
export type Traslado = {
  id: string;
  slug: string;
  zona: string;
  titulo: string;
  descripcion: string | null;
  descripcion_larga?: string | null;
  imagen_url?: string | null;
  precio_desde_usd?: number | null;
  precio_desde_mxn?: number | null;
  incluye?: string[] | null;
  valores?: TrasladoValor[] | null;
  vehiculos?: TrasladoVehiculo[] | null;
  bodas_grupos?: string | null;
  precios?: TrasladoPrecio[] | null;
  activo?: boolean;
  orden?: number | null;
  created_at?: string;
  updated_at?: string;
};

/** Categorías de filtro en la lista. */
export const TRASLADO_ZONAS = [
  "Cancún",
  "Riviera Maya",
  "Holbox",
  "Mérida",
  "Chetumal",
] as const;

export type TrasladoZonaFiltro = (typeof TRASLADO_ZONAS)[number];

export const DEFAULT_INCLUYE: string[] = [
  "Seguro de viaje",
  "Rastreo por GPS",
  "Monitoreo de vuelo",
  "Operadores calificados",
  "Recepción en el aeropuerto con cartel nominativo",
  "Asientos para bebé sin costo adicional",
  "Vehículos de modelo reciente en excelentes condiciones",
];

export const DEFAULT_VALORES: TrasladoValor[] = [
  {
    titulo: "Puntualidad",
    descripcion:
      "Estaremos siempre a tiempo para cumplir tus necesidades de transportación.",
  },
  {
    titulo: "Seguridad",
    descripcion:
      "Cada cliente viaja asegurado en unidades monitoreadas y con operadores de confianza.",
  },
  {
    titulo: "Responsabilidad",
    descripcion:
      "Puedes confiar tu traslado y los detalles del viaje: atención personalizada de punta a punta.",
  },
  {
    titulo: "Integridad",
    descripcion:
      "Nos esmeramos en complacer a nuestros clientes y transportarlos de forma honesta y transparente.",
  },
  {
    titulo: "Respeto",
    descripcion:
      "Trato amable y profesional en cada recojo, trayecto y entrega en hotel o aeropuerto.",
  },
];

export const DEFAULT_VEHICULOS: TrasladoVehiculo[] = [
  {
    nombre: "Van",
    descripcion:
      "Servicio privado estándar para familias y grupos. Ideal de 1 a 10 pasajeros con equipaje.",
    capacidad: "Hasta 10 pax",
    imagen:
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=900&q=80",
  },
  {
    nombre: "Suburban",
    descripcion:
      "Privado VIP con más espacio y confort. Cupo máximo recomendado de 5 pasajeros.",
    capacidad: "Hasta 5 pax VIP",
    imagen:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    nombre: "Limusina",
    descripcion:
      "Para ocasiones especiales: llegadas VIP, bodas o celebraciones con estilo.",
    capacidad: "Según unidad",
    imagen:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80",
  },
  {
    nombre: "Bus / Mini Bus",
    descripcion:
      "Grupos grandes, bodas e incentivos. Cotización a medida según pasajeros y ruta.",
    capacidad: "Grupos",
    imagen:
      "https://images.unsplash.com/photo-1544620341-11cb2cd7c626?auto=format&fit=crop&w=900&q=80",
  },
];

export const DEFAULT_BODAS_GRUPOS =
  "Ofrecemos traslados para bodas y grupos con una amplia flota (Van, Suburban, Limusina y Bus). Ideal para destinos de boda en Cancún y Riviera Maya, o para grupos que quieren recorrer Quintana Roo con comodidad y seguridad. Opciones Privado Estándar, Privado VIP y bienvenida personalizada con champagne (costo adicional). Contáctanos por WhatsApp para cotizar según fecha, hotel y número de invitados.";

const FALLBACK_IMAGES: Record<string, string> = {
  cancun:
    "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1400&q=80",
  "riviera-maya":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  holbox:
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80",
  merida:
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1400&q=80",
  chetumal:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
  default:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
};

export function getTrasladoImage(traslado: Pick<Traslado, "slug" | "zona" | "imagen_url">): string {
  if (traslado.imagen_url) return traslado.imagen_url;

  const slug = (traslado.slug || "").toLowerCase();
  const zona = (traslado.zona || "").toLowerCase();

  if (slug.includes("cancun") || zona.includes("cancún") || zona.includes("cancun")) {
    return FALLBACK_IMAGES.cancun;
  }
  if (slug.includes("riviera") || zona.includes("riviera")) {
    return FALLBACK_IMAGES["riviera-maya"];
  }
  if (slug.includes("holbox") || zona.includes("holbox")) {
    return FALLBACK_IMAGES.holbox;
  }
  if (slug.includes("merida") || slug.includes("mérida") || zona.includes("mérida") || zona.includes("merida")) {
    return FALLBACK_IMAGES.merida;
  }
  if (slug.includes("chetumal") || zona.includes("chetumal")) {
    return FALLBACK_IMAGES.chetumal;
  }

  return FALLBACK_IMAGES.default;
}

export function getIncluye(traslado: Traslado): string[] {
  if (Array.isArray(traslado.incluye) && traslado.incluye.length > 0) {
    return traslado.incluye;
  }
  return DEFAULT_INCLUYE;
}

export function getValores(traslado: Traslado): TrasladoValor[] {
  if (Array.isArray(traslado.valores) && traslado.valores.length > 0) {
    return traslado.valores;
  }
  return DEFAULT_VALORES;
}

export function getVehiculos(traslado: Traslado): TrasladoVehiculo[] {
  if (Array.isArray(traslado.vehiculos) && traslado.vehiculos.length > 0) {
    return traslado.vehiculos;
  }
  return DEFAULT_VEHICULOS;
}

export function getBodasGrupos(traslado: Traslado): string {
  return traslado.bodas_grupos?.trim() || DEFAULT_BODAS_GRUPOS;
}

export function getPrecios(traslado: Traslado): TrasladoPrecio[] {
  if (Array.isArray(traslado.precios) && traslado.precios.length > 0) {
    return traslado.precios;
  }

  const items: TrasladoPrecio[] = [];
  if (traslado.precio_desde_usd != null || traslado.precio_desde_mxn != null) {
    items.push({
      concepto: "Traslado privado (desde)",
      detalle: "Precio orientativo por vehículo; cotización final según pasajeros, horario y ruta.",
      desde_usd: traslado.precio_desde_usd,
      desde_mxn: traslado.precio_desde_mxn,
    });
  }
  items.push({
    concepto: "Privado VIP / Suburban",
    detalle: "Mayor espacio y confort. Cotización personalizada.",
  });
  items.push({
    concepto: "Bodas y grupos",
    detalle: "Flota Van, Limusina o Bus según número de invitados.",
  });
  return items;
}

export function whatsappTrasladoUrl(titulo?: string, zona?: string): string {
  const base =
    titulo || zona
      ? `Hola CAREK, me interesa cotizar el traslado${titulo ? `: ${titulo}` : ""}${zona ? ` (${zona})` : ""}.`
      : "Hola CAREK, quiero cotizar un traslado privado.";
  return `https://wa.me/${CAREK_WHATSAPP}?text=${encodeURIComponent(base)}`;
}

export function uniqueZonas(traslados: Traslado[]): string[] {
  const set = new Set<string>();
  for (const t of traslados) {
    if (t.zona?.trim()) set.add(t.zona.trim());
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}
