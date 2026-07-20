/**
 * Helpers de galería de imágenes.
 * Compatibilidad: usa `imagenes` (jsonb array) y cae a `imagen_url` legacy.
 */

/** Extrae un array limpio de URLs desde imagenes y/o imagen_url. */
export function normalizeImagenes(
  imagenes?: string[] | null,
  imagenUrl?: string | null,
): string[] {
  if (Array.isArray(imagenes) && imagenes.length > 0) {
    return imagenes
      .map((u) => (typeof u === "string" ? u.trim() : ""))
      .filter(Boolean);
  }
  if (imagenUrl && typeof imagenUrl === "string" && imagenUrl.trim()) {
    return [imagenUrl.trim()];
  }
  return [];
}

/** Primera imagen de la galería, o null. */
export function getPrimaryImage(
  imagenes?: string[] | null,
  imagenUrl?: string | null,
): string | null {
  const list = normalizeImagenes(imagenes, imagenUrl);
  return list[0] ?? null;
}

/** Payload listo para insert/update: galería + imagen_url espejo. */
export function toImagePayload(urls: string[]): {
  imagenes: string[];
  imagen_url: string | null;
} {
  const imagenes = urls
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
  return {
    imagenes,
    imagen_url: imagenes[0] ?? null,
  };
}
