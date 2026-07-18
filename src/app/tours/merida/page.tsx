import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Mérida | CAREK Turismo",
  description:
    "Cenotes, haciendas, arquitectura colonial y gastronomía yucateca en Mérida con CAREK.",
};

export default async function MeridaPage() {
  const { destino, tours, fetchError } = await getDestinationTours("merida");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="merida"
      fallbackTitle="Tours en Mérida"
      fallbackDescription="La ciudad blanca. Cultura, haciendas, cenotes y gastronomía yucateca."
      fetchError={fetchError}
    />
  );
}
