import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours en Holbox | CAREK Turismo",
  description:
    "Aguas turquesas, tiburón ballena y playas paradisíacas en Holbox. Tours con CAREK.",
};

export default async function HolboxPage() {
  const { destino, tours, fetchError } = await getDestinationTours("holbox");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="holbox"
      fallbackTitle="Tours y Excursiones en Holbox"
      fallbackDescription="Pequeña isla en la costa norte de Yucatán, famosa por sus aguas turquesas y el tiburón ballena."
      fetchError={fetchError}
    />
  );
}
