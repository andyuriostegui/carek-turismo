/**
 * Datos de contacto CAREK (fuente única).
 * Teléfono México (Cancún / Riviera Maya): 99 82 33 56 69
 */

/** Solo dígitos, con código de país 52 (sin +). */
export const CAREK_PHONE_E164 = "529982335669";

/** WhatsApp: 52 + 1 (móvil MX) + 10 dígitos. */
export const CAREK_WHATSAPP = "5219982335669";

/** Teléfono legible para UI. */
export const CAREK_PHONE_DISPLAY = "99 82 33 56 69";

export const CAREK_PHONE_TEL = `tel:+${CAREK_PHONE_E164}`;

export const CAREK_EMAILS = {
  ventas: "ventas1@carekcrt.com",
  reservaciones1: "reservaciones1@carekcrt.com",
  reservaciones2: "reservaciones2@carekcrt.com",
} as const;

/** Lista para mostrar en footer / contacto. */
export const CAREK_EMAIL_LIST = [
  CAREK_EMAILS.ventas,
  CAREK_EMAILS.reservaciones1,
  CAREK_EMAILS.reservaciones2,
] as const;

/** Correo principal (ventas / mailto por defecto). */
export const CAREK_EMAIL_PRIMARY = CAREK_EMAILS.ventas;

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${CAREK_WHATSAPP}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
