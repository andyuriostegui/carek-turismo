import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Tabasco | CAREK Turismo",
  description:
    "Agua y chocolate, cultura olmeca, cacao y Pantanos de Centla. Tours en Tabasco con CAREK.",
};

export default async function TabascoPage() {
  const { destino, tours, fetchError } = await getDestinationTours("tabasco");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="tabasco"
      fallbackTitle="Lugares Turísticos de Tabasco"
      fallbackDescription="“El Edén de México”: circuito Agua y Chocolate, cultura olmeca, cacao y Pueblos Mágicos."
      fetchError={fetchError}
    />
  );
}
