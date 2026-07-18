import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en la Costa Maya | CAREK Turismo",
  description:
    "Playas vírgenes, cenotes y cultura maya en el Caribe más auténtico. Tours en Costa Maya con CAREK.",
};

export default async function CostaMayaPage() {
  const { destino, tours, fetchError } =
    await getDestinationTours("costa-maya");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="costa-maya"
      fallbackTitle="Tours en la Costa Maya"
      fallbackDescription="Playas vírgenes, cenotes y cultura maya en el Caribe más auténtico."
      fetchError={fetchError}
    />
  );
}
