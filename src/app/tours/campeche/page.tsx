import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Campeche | CAREK Turismo",
  description:
    "Ciudad amurallada, Edzná, Calakmul y cultura del Golfo. Tours en Campeche con CAREK.",
};

export default async function CampechePage() {
  const { destino, tours, fetchError } = await getDestinationTours("campeche");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="campeche"
      fallbackTitle="Tours en Campeche"
      fallbackDescription="Ciudad amurallada frente al Golfo, ruinas mayas y una mezcla única de historia y naturaleza."
      fetchError={fetchError}
    />
  );
}
