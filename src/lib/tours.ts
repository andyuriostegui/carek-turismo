/**
 * Tipos y helpers de la sección Tours.
 * Mapean a la tabla `tours` de Supabase.
 */

import { CAREK_WHATSAPP } from "@/lib/contact";
import { getPrimaryImage, normalizeImagenes } from "@/lib/images";

export { CAREK_WHATSAPP };

/** Fila de la tabla `tours` (+ relación opcional con destinos). */
export type Tour = {
  id: string;
  slug: string;
  titulo: string;
  destino_id?: string | null;
  descripcion_corta?: string | null;
  descripcion_larga?: string | null;
  /** Legacy: primera imagen (espejo de imagenes[0]). */
  imagen_url?: string | null;
  /** Galería de URLs públicas (orden = principal primero). */
  imagenes?: string[] | null;
  precio_adulto_mxn?: number | null;
  precio_adulto_usd?: number | null;
  precio_menor_mxn?: number | null;
  precio_menor_usd?: number | null;
  duracion?: string | null;
  itinerario?: string[] | null;
  incluye?: string[] | null;
  no_incluye?: string[] | null;
  recomendaciones?: string[] | null;
  importante?: string[] | null;
  activo?: boolean;
  destacado?: boolean;
  orden?: number | null;
  created_at?: string;
  updated_at?: string;
  destinos?: {
    id?: string;
    nombre?: string | null;
    slug?: string | null;
    descripcion?: string | null;
  } | null;
};

/** Destino de la tabla `destinos`. */
export type Destino = {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string | null;
  imagen_url?: string | null;
  activo?: boolean;
  orden?: number | null;
};

/** Fallback de imagen por slug de destino. */
const DESTINO_IMAGES: Record<string, string> = {
  "costa-maya": "/cenotes.jpg",
  cancun:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "chichen-itza": "/cultura.jpg",
  cozumel: "/islas.jpg",
  merida: "/merida.jpg",
  campeche: "/campeche.jpg",
  chiapas: "/chiapas.jpg",
  holbox:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  tabasco:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
};

const DEFAULT_TOUR_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80";

export function getDestinoImage(
  slug?: string | null,
  imagenUrl?: string | null,
): string {
  if (imagenUrl) return imagenUrl;
  if (slug && DESTINO_IMAGES[slug]) return DESTINO_IMAGES[slug];
  return DEFAULT_TOUR_IMAGE;
}

/** Galería completa del tour (con fallback de destino si no hay fotos). */
export function getTourImages(
  tour: Pick<Tour, "imagenes" | "imagen_url" | "slug" | "destinos">,
  destinoSlug?: string | null,
): string[] {
  const gallery = normalizeImagenes(tour.imagenes, tour.imagen_url);
  if (gallery.length > 0) return gallery;
  const slug = destinoSlug || tour.destinos?.slug || null;
  return [getDestinoImage(slug)];
}

/** Imagen principal del tour (primera de la galería o fallback). */
export function getTourImage(
  tour: Pick<Tour, "imagenes" | "imagen_url" | "slug" | "destinos">,
  destinoSlug?: string | null,
): string {
  const primary = getPrimaryImage(tour.imagenes, tour.imagen_url);
  if (primary) return primary;
  const slug = destinoSlug || tour.destinos?.slug || null;
  return getDestinoImage(slug);
}

export function getArrayField(value: string[] | null | undefined): string[] {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

export function formatPriceFrom(tour: Tour): string | null {
  if (tour.precio_adulto_usd != null) {
    const mxn =
      tour.precio_adulto_mxn != null
        ? ` / $${tour.precio_adulto_mxn} MXN`
        : "";
    return `Desde $${tour.precio_adulto_usd} USD${mxn}`;
  }
  if (tour.precio_adulto_mxn != null) {
    return `Desde $${tour.precio_adulto_mxn} MXN`;
  }
  return null;
}

export function getPriceLines(tour: Tour): string[] {
  const lines: string[] = [];
  if (tour.precio_adulto_usd != null || tour.precio_adulto_mxn != null) {
    const parts: string[] = [];
    if (tour.precio_adulto_usd != null) {
      parts.push(`$${tour.precio_adulto_usd} USD`);
    }
    if (tour.precio_adulto_mxn != null) {
      parts.push(`$${tour.precio_adulto_mxn} MXN`);
    }
    lines.push(`Adulto: ${parts.join(" · ")}`);
  }
  if (tour.precio_menor_usd != null || tour.precio_menor_mxn != null) {
    const parts: string[] = [];
    if (tour.precio_menor_usd != null) {
      parts.push(`$${tour.precio_menor_usd} USD`);
    }
    if (tour.precio_menor_mxn != null) {
      parts.push(`$${tour.precio_menor_mxn} MXN`);
    }
    lines.push(`Menor: ${parts.join(" · ")}`);
  }
  return lines;
}

export function whatsappTourUrl(titulo?: string, destino?: string): string {
  const text =
    titulo || destino
      ? `Hola CAREK, me interesa el tour${titulo ? `: ${titulo}` : ""}${destino ? ` (${destino})` : ""}. ¿Me pueden dar más información y una cotización?`
      : "Hola CAREK, quiero información sobre sus tours.";
  return `https://wa.me/${CAREK_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
