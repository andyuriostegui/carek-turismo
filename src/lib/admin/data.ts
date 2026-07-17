/**
 * Capa de datos del admin.
 * Hoy usa datos mock; las funciones están listas para conectar a Supabase.
 *
 * Tablas esperadas en Supabase (referencia):
 * - tours (id, nombre, destino, duracion, precio_desde, status, destacado, created_at, updated_at)
 * - circuitos (id, nombre, duracion, status, created_at)
 * - destinos (id, nombre, slug, activo, orden)
 * - traslados (id, zona, status)
 */

import type {
  AdminDestino,
  AdminTour,
  DashboardStats,
} from "@/lib/admin/types";

// ---------------------------------------------------------------------------
// Mock data (reemplazar por queries a Supabase)
// ---------------------------------------------------------------------------

const MOCK_TOURS: AdminTour[] = [
  {
    id: "1",
    nombre: "Chichén Itzá Clásico",
    destino: "Chichén Itzá",
    duracion: "1 día",
    precio_desde: 85,
    status: "activo",
    destacado: true,
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-03-01T12:00:00Z",
  },
  {
    id: "2",
    nombre: "Cenotes de Homún",
    destino: "Mérida",
    duracion: "6 horas",
    precio_desde: 65,
    status: "activo",
    destacado: false,
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-02-15T09:00:00Z",
  },
  {
    id: "3",
    nombre: "Isla Mujeres Catamarán",
    destino: "Cancún",
    duracion: "8 horas",
    precio_desde: 95,
    status: "activo",
    destacado: true,
    created_at: "2026-01-20T10:00:00Z",
    updated_at: "2026-03-10T14:00:00Z",
  },
  {
    id: "4",
    nombre: "Tulum + Cenote",
    destino: "Costa Maya",
    duracion: "1 día",
    precio_desde: 110,
    status: "inactivo",
    destacado: false,
    created_at: "2025-11-05T10:00:00Z",
    updated_at: "2026-01-02T11:00:00Z",
  },
  {
    id: "5",
    nombre: "Bacalar Laguna de los Siete Colores",
    destino: "Costa Maya",
    duracion: "1 día",
    precio_desde: 120,
    status: "borrador",
    destacado: false,
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "6",
    nombre: "Cozumel Snorkel",
    destino: "Cozumel",
    duracion: "5 horas",
    precio_desde: 75,
    status: "activo",
    destacado: false,
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-02-20T16:00:00Z",
  },
];

const MOCK_DESTINOS: AdminDestino[] = [
  { id: "1", nombre: "Costa Maya", slug: "costa-maya", activo: true, orden: 1 },
  { id: "2", nombre: "Chichén Itzá", slug: "chichen-itza", activo: true, orden: 2 },
  { id: "3", nombre: "Cancún", slug: "cancun", activo: true, orden: 3 },
  { id: "4", nombre: "Cozumel", slug: "cozumel", activo: true, orden: 4 },
  { id: "5", nombre: "Mérida", slug: "merida", activo: true, orden: 5 },
  { id: "6", nombre: "Campeche", slug: "campeche", activo: true, orden: 6 },
  { id: "7", nombre: "Chiapas", slug: "chiapas", activo: true, orden: 7 },
  { id: "8", nombre: "Holbox", slug: "holbox", activo: true, orden: 8 },
  { id: "9", nombre: "Tabasco", slug: "tabasco", activo: false, orden: 9 },
];

// ---------------------------------------------------------------------------
// API pública (async para simular fetch / Supabase)
// ---------------------------------------------------------------------------

/**
 * Obtiene estadísticas del dashboard.
 *
 * Supabase (ejemplo futuro):
 * ```ts
 * const { count: totalTours } = await supabase
 *   .from('tours').select('*', { count: 'exact', head: true })
 * const { count: toursActivos } = await supabase
 *   .from('tours').select('*', { count: 'exact', head: true })
 *   .eq('status', 'activo')
 * ```
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: reemplazar con Supabase
  const totalTours = MOCK_TOURS.length;
  const toursActivos = MOCK_TOURS.filter((t) => t.status === "activo").length;
  const totalDestinos = MOCK_DESTINOS.length;
  const totalCircuitos = 4; // mock hasta conectar tabla circuitos

  return {
    totalTours,
    totalCircuitos,
    totalDestinos,
    toursActivos,
  };
}

/**
 * Lista de tours para la tabla del admin.
 *
 * Supabase (ejemplo futuro):
 * ```ts
 * const { data, error } = await supabase
 *   .from('tours')
 *   .select('*')
 *   .order('updated_at', { ascending: false })
 * ```
 */
export async function getAdminTours(): Promise<AdminTour[]> {
  // TODO: reemplazar con Supabase
  return MOCK_TOURS;
}

/**
 * Lista de destinos.
 *
 * Supabase (ejemplo futuro):
 * ```ts
 * const { data, error } = await supabase
 *   .from('destinos')
 *   .select('*')
 *   .order('orden', { ascending: true })
 * ```
 */
export async function getAdminDestinos(): Promise<AdminDestino[]> {
  // TODO: reemplazar con Supabase
  return MOCK_DESTINOS;
}
