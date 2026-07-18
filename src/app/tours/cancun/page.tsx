import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Cancún | CAREK Turismo",
  description:
    "Playas, islas, cultura maya y ecoturismo en Cancún. Experiencias con CAREK Turismo.",
};

export default async function CancunPage() {
  const { destino, tours, fetchError } = await getDestinationTours("cancun");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="cancun"
      fallbackTitle="Tours en Cancún"
      fallbackDescription="El destino turístico más importante del Caribe Mexicano."
      fetchError={fetchError}
    />
  );
}
