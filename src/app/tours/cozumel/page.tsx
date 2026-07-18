import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Cozumel | CAREK Turismo",
  description:
    "Arrecifes, snorkel y playas de arena blanca en la isla de Cozumel. Tours con CAREK.",
};

export default async function CozumelPage() {
  const { destino, tours, fetchError } = await getDestinationTours("cozumel");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="cozumel"
      fallbackTitle="Tours en Cozumel"
      fallbackDescription="La isla de las golondrinas. Arrecifes, snorkel y aguas turquesas."
      fetchError={fetchError}
    />
  );
}
