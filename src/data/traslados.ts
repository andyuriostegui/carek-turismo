export type TrasladoZone = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
};

export const trasladoZones: TrasladoZone[] = [
  {
    id: "cancun-riviera",
    name: "Cancún y Riviera Maya",
    description:
      "Aeropuerto de Cancún (CUN), zona hotelera, Playa del Carmen, Tulum, Puerto Morelos y puntos de la Riviera Maya.",
    highlights: ["Aeropuerto CUN", "Zona hotelera", "Riviera Maya"],
    image:
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Costa de Cancún y Riviera Maya",
  },
  {
    id: "merida",
    name: "Mérida",
    description:
      "Traslados al aeropuerto de Mérida (MID), centro histórico, hoteles boutique y conexiones a cenotes o sitios cercanos.",
    highlights: ["Aeropuerto MID", "Centro histórico", "Hoteles"],
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Arquitectura y calles de Mérida",
  },
  {
    id: "chetumal",
    name: "Chetumal",
    description:
      "Servicio privado en Chetumal: aeropuerto, terminal de autobuses, hoteles y enlaces hacia Bacalar o la frontera.",
    highlights: ["Aeropuerto", "Bacalar", "Frontera"],
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Aguas turquesas cerca de Chetumal y Costa Maya",
  },
  {
    id: "tuxtla",
    name: "Tuxtla Gutiérrez",
    description:
      "Recogidas en el aeropuerto de Tuxtla (TGZ), hoteles de la capital y traslados hacia Chiapa de Corzo o San Cristóbal.",
    highlights: ["Aeropuerto TGZ", "Hoteles", "Altos de Chiapas"],
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Paisaje de montañas cerca de Tuxtla Gutiérrez",
  },
  {
    id: "holbox",
    name: "Holbox",
    description:
      "Traslados terrestres a Chiquilá y coordinación de ferry hacia Holbox, con opciones de puerta a puerta según tu itinerario.",
    highlights: ["Chiquilá", "Ferry", "Isla Holbox"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Playa tropical en Holbox",
  },
];
