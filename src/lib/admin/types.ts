/**
 * Tipos del panel de administración.
 * Preparados para mapear a tablas de Supabase.
 */

export type AdminTourStatus = "activo" | "inactivo" | "borrador";

export type AdminTour = {
  id: string;
  nombre: string;
  destino: string;
  duracion: string;
  precio_desde: number | null;
  status: AdminTourStatus;
  destacado: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminCircuito = {
  id: string;
  nombre: string;
  duracion: string;
  status: AdminTourStatus;
  created_at: string;
};

export type AdminDestino = {
  id: string;
  nombre: string;
  slug: string;
  activo: boolean;
  orden: number;
};

export type AdminTraslado = {
  id: string;
  zona: string;
  status: AdminTourStatus;
};

export type DashboardStats = {
  totalTours: number;
  totalCircuitos: number;
  totalDestinos: number;
  toursActivos: number;
};
