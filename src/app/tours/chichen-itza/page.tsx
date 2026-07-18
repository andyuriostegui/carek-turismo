import type { Metadata } from "next";
import DestinationToursView from "@/components/tours/DestinationToursView";
import { getDestinationTours } from "@/lib/tours-server";

export const metadata: Metadata = {
  title: "Tours a Chichén Itzá | CAREK Turismo",
  description:
    "Visita Chichén Itzá, cenotes y Valladolid con guías CAREK. Una de las maravillas del Mundo Maya.",
};

export default async function ChichenItzaPage() {
  const { destino, tours, fetchError } =
    await getDestinationTours("chichen-itza");

  return (
    <DestinationToursView
      destino={destino}
      tours={tours}
      slug="chichen-itza"
      fallbackTitle="Tours a Chichén Itzá"
      fallbackDescription="Una de las maravillas del Mundo Maya, complementada con cenote y pueblo mágico de Valladolid."
      fetchError={fetchError}
    />
  );
}
