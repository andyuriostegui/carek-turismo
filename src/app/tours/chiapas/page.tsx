import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Chiapas | CAREK Turismo",
  description:
    "Selva, cascadas, pueblos mágicos y Palenque. Descubre Chiapas con CAREK Turismo.",
};

export default async function ChiapasPage() {
  const { destino, tours, fetchError } = await getDestinationTours("chiapas");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="chiapas"
      fallbackTitle="Tours en Chiapas"
      fallbackDescription="El estado más enigmático de México: selva, cascadas, pueblos mágicos y cultura viva."
      fetchError={fetchError}
    />
  );
}
