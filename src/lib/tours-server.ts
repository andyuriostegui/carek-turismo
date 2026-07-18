/**
 * Carga de tours/destinos desde Supabase (solo server).
 */

import { createClient } from "@/lib/supabase/server";
import type { Destino, Tour } from "@/lib/tours";

export type DestinationToursResult = {
  destino: Destino | null;
  tours: Tour[];
  fetchError: string | null;
};

export async function getDestinationTours(
  slug: string,
): Promise<DestinationToursResult> {
  let destino: Destino | null = null;
  let tours: Tour[] = [];
  let fetchError: string | null = null;

  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        destino: null,
        tours: [],
        fetchError: "No se pudo conectar con la base de datos.",
      };
    }

    const { data: destinoData, error: destinoError } = await supabase
      .from("destinos")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (destinoError) {
      fetchError = destinoError.message;
      return { destino: null, tours: [], fetchError };
    }

    destino = (destinoData as Destino) || null;

    if (!destino?.id) {
      return {
        destino: null,
        tours: [],
        fetchError: null,
      };
    }

    const { data: toursData, error: toursError } = await supabase
      .from("tours")
      .select(
        `
        *,
        destinos (
          id,
          nombre,
          slug,
          descripcion
        )
      `,
      )
      .eq("destino_id", destino.id)
      .eq("activo", true)
      .order("orden", { ascending: true });

    if (toursError) {
      fetchError = toursError.message;
    } else {
      tours = (toursData as Tour[]) || [];
    }
  } catch {
    fetchError = "No se pudo conectar con la base de datos.";
  }

  return { destino, tours, fetchError };
}

export async function getActiveDestinos(): Promise<{
  destinos: Destino[];
  fetchError: string | null;
}> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return {
        destinos: [],
        fetchError: "No se pudo conectar con la base de datos.",
      };
    }

    const { data, error } = await supabase
      .from("destinos")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true });

    if (error) {
      return { destinos: [], fetchError: error.message };
    }

    return { destinos: (data as Destino[]) || [], fetchError: null };
  } catch {
    return {
      destinos: [],
      fetchError: "No se pudo conectar con la base de datos.",
    };
  }
}
