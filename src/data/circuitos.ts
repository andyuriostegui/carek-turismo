export type Circuito = {
  id: string;
  name: string;
  duration: string;
  /** Resumen corto para la tarjeta */
  summary: string;
  /** Descripción completa en la expansión */
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
};

export type CircuitoCategory = {
  id: string;
  title: string;
  description: string;
  circuitos: Circuito[];
};

export const circuitoCategories: CircuitoCategory[] = [
  {
    id: "chiapas",
    title: "Circuitos por Chiapas",
    description:
      "Selva, cascadas, pueblos mágicos y zona maya en itinerarios de varios días por el estado más enigmático de México.",
    circuitos: [
      {
        id: "viajes-chiapas",
        name: "Viajes a Chiapas",
        duration: "4–7 días",
        summary:
          "Recorridos clásicos por San Cristóbal, Cañón del Sumidero, cascadas y la zona arqueológica de Palenque.",
        description:
          "Nuestros viajes a Chiapas combinan naturaleza, cultura viva y sitios arqueológicos en un solo itinerario. Desde los Altos chiapanecos hasta la Selva Lacandona, diseñamos paquetes flexibles para que conozcas lo esencial del estado con logística resuelta, guías locales y hospedaje seleccionado.",
        includes: [
          "Hospedaje en hoteles seleccionados",
          "Desayunos según itinerario",
          "Transportación terrestre en vehículo turístico",
          "Guía de turismo certificado",
          "Entradas a zonas arqueológicas y atractivos programados",
          "Asistencia durante todo el recorrido",
        ],
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Paisaje de montañas y selva en Chiapas",
      },
      {
        id: "paquetes-chiapas-economicos",
        name: "Paquetes a Chiapas Económicos",
        duration: "3–5 días",
        summary:
          "Opciones accesibles para descubrir lo mejor de Chiapas sin renunciar a lo esencial del viaje.",
        description:
          "Paquetes pensados para viajeros que buscan una experiencia completa a un precio más accesible. Incluyen los atractivos imprescindibles de Chiapas con hospedaje cómodo, traslados grupales y un itinerario optimizado para aprovechar al máximo cada día.",
        includes: [
          "Hospedaje en categoría turística",
          "Desayunos",
          "Traslados en grupo",
          "Visitas a atractivos principales del itinerario",
          "Guía de turismo",
          "Coordinación y asistencia CAREK",
        ],
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Naturaleza y vegetación tropical en Chiapas",
      },
      {
        id: "chiapas-villahermosa-tuxtla",
        name: "Viajes a Chiapas iniciando en Villahermosa y terminando en Tuxtla Gutiérrez",
        duration: "5–6 días",
        summary:
          "Itinerario lineal ideal si llegas por Tabasco y sales por Tuxtla: Palenque, selva, Altos y Cañón del Sumidero.",
        description:
          "Circuito diseñado para quien llega a Villahermosa (Tabasco) y finaliza en Tuxtla Gutiérrez. El recorrido avanza de este a oeste: zona de Palenque y cascadas, Selva Lacandona o Bonampak según versión, San Cristóbal de las Casas y cierre con el imponente Cañón del Sumidero en Tuxtla. Menos tramos de regreso y más tiempo disfrutando.",
        includes: [
          "Recogida en Villahermosa (aeropuerto o hotel)",
          "Hospedaje en las noches del itinerario",
          "Desayunos",
          "Transportación terrestre durante el circuito",
          "Guía de turismo",
          "Entradas programadas (Palenque, Sumidero y más según plan)",
          "Entrega en Tuxtla Gutiérrez al finalizar",
        ],
        image:
          "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Zona arqueológica maya en la selva",
      },
      {
        id: "chiapas-tuxtla-tuxtla",
        name: "Viajes a Chiapas iniciando y terminando en Tuxtla Gutiérrez",
        duration: "4–6 días",
        summary:
          "Circuito redondo desde la capital de Chiapas: Sumidero, San Cristóbal, cascadas y opción a Palenque.",
        description:
          "Perfecto si vuelas o llegas a Tuxtla Gutiérrez. Inicias y terminas en la misma ciudad para simplificar vuelos y traslados. Combina el Cañón del Sumidero, Chiapa de Corzo, San Cristóbal de las Casas, pueblos indígenas y, en versiones extendidas, Agua Azul, Misol-Ha y Palenque.",
        includes: [
          "Inicio y fin en Tuxtla Gutiérrez",
          "Hospedaje según número de noches",
          "Desayunos",
          "Transportación terrestre",
          "Guía de turismo certificado",
          "Entradas a atractivos del itinerario",
          "Asistencia CAREK durante el viaje",
        ],
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Paisaje natural con montañas y cielo abierto",
      },
    ],
  },
  {
    id: "campeche",
    title: "Circuitos por Campeche",
    description:
      "Ciudad amurallada, calakmul y el legado maya del Golfo en paquetes de varios días.",
    circuitos: [
      {
        id: "viajes-campeche",
        name: "Viajes a Campeche",
        duration: "3–5 días",
        summary:
          "Campeche colonial, Edzná o Calakmul, y la mezcla de historia, mar y selva del sureste.",
        description:
          "Descubre la ciudad amurallada Patrimonio de la Humanidad, sus baluartes y el malecón al atardecer. Los circuitos por Campeche pueden incluir Edzná, la Reserva de la Biósfera de Calakmul, cenotes y pueblos con sabor peninsular. Ideal como destino único o como puente entre Chiapas y la Riviera Maya.",
        includes: [
          "Hospedaje en Campeche o zona según itinerario",
          "Desayunos",
          "Traslados y transportación del circuito",
          "Visita guiada a la ciudad amurallada",
          "Entradas a sitios programados",
          "Guía de turismo",
        ],
        image:
          "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Ciudad amurallada de Campeche al atardecer",
      },
    ],
  },
  {
    id: "largos-combinados",
    title: "Circuitos Largos / Combinados",
    description:
      "Itinerarios multi-destino para quien quiere cruzar fronteras culturales: selva maya, Guatemala y península.",
    circuitos: [
      {
        id: "palenque-flores-tikal",
        name: "Palenque, Flores, Tikal, Yaxchilán y Bonampak",
        duration: "3 días",
        summary:
          "Selva Lacandona, ruinas en la frontera y la majestuosidad de Tikal en un circuito intenso de 3 días.",
        description:
          "Un viaje inolvidable por el corazón del mundo maya. Combina Palenque con Yaxchilán y Bonampak en la Selva Lacandona, cruce hacia Guatemala para conocer Flores (isla en el lago Petén Itzá) y la imponente zona arqueológica de Tikal. Ideal para viajeros que buscan historia, selva y una experiencia binacional en poco tiempo.",
        includes: [
          "2 noches de hospedaje (según plan)",
          "Desayunos",
          "Transportación terrestre y fluvial según itinerario",
          "Cruce fronterizo asistido (documentación a cargo del pasajero)",
          "Visitas a Palenque, Yaxchilán, Bonampak y Tikal",
          "Guía de turismo",
          "Entradas a zonas arqueológicas programadas",
        ],
        image:
          "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Templo maya entre la selva",
      },
      {
        id: "chiapas-campeche-merida-cancun",
        name: "Viajes por Chiapas, Campeche, Mérida y Cancún",
        duration: "8 días 7 noches",
        summary:
          "De la selva chiapaneca al Caribe: un gran recorrido por el sureste mexicano en una semana.",
        description:
          "El circuito completo del sureste: Chiapas (cultura y naturaleza), Campeche amurallado, Mérida y la zona de cenotes o Chichén Itzá, y cierre en Cancún o la Riviera Maya. Siete noches de hospedaje, traslados entre destinos y un ritmo pensado para disfrutar sin prisas extremas. Perfecto para quien visita México por primera vez y quiere verlo todo.",
        includes: [
          "7 noches de hospedaje en hoteles seleccionados",
          "Desayunos diarios",
          "Transportación terrestre entre destinos",
          "Visitas y tours programados en cada ciudad",
          "Guía de turismo en trayectos y visitas clave",
          "Entradas a atractivos del itinerario base",
          "Asistencia CAREK de principio a fin",
        ],
        image:
          "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Costa del Caribe mexicano",
      },
    ],
  },
  {
    id: "playa-caribe",
    title: "Circuitos de Playa y Caribe",
    description:
      "Arena blanca, lagunas de siete colores y el Caribe más auténtico en paquetes de playa.",
    circuitos: [
      {
        id: "pdc-holbox-bacalar-mahahual",
        name: "Paquete Playa del Carmen + Holbox + Bacalar + Mahahual",
        duration: "8 días 7 noches",
        summary:
          "Riviera Maya, isla de Holbox, Laguna de los Siete Colores y Costa Maya en un solo paquete.",
        description:
          "Ocho días para vivir el Caribe en todas sus versiones: vida y playa en Playa del Carmen, la calma de Holbox, los tonos de Bacalar y el ambiente relajado de Mahahual. Ideal para parejas y grupos que quieren combinar descanso, snorkel, pueblo mágico y playa sin armar la logística por su cuenta.",
        includes: [
          "7 noches de hospedaje (distribuidas en los destinos del itinerario)",
          "Desayunos",
          "Traslados entre Playa del Carmen, Holbox, Bacalar y Mahahual",
          "Ferry o traslados marítimos a Holbox según plan",
          "Actividades base en cada destino (consulta al cotizar)",
          "Coordinación y asistencia CAREK",
        ],
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Playa tropical de arena blanca y mar turquesa",
      },
      {
        id: "bacalar-mahahual",
        name: "Bacalar y Mahahual",
        duration: "3–4 días",
        summary:
          "Laguna de Bacalar y las playas de la Costa Maya: descanso, kayak y atardeceres caribeños.",
        description:
          "Escápate al sur de Quintana Roo. Bacalar te ofrece la Laguna de los Siete Colores, cenotes y ambiente de pueblo mágico; Mahahual suma playa abierta, arrecife y un malecón ideal para caminar al atardecer. Un circuito corto y relajado, perfecto como extensión de Cancún o como mini-luna de miel.",
        includes: [
          "Hospedaje en Bacalar y/o Mahahual según noches",
          "Desayunos",
          "Traslado entre Bacalar y Mahahual",
          "Paseo o actividad en la laguna (según paquete)",
          "Tiempo libre en playa de Mahahual",
          "Asistencia CAREK",
        ],
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Aguas turquesas de Bacalar y la Costa Maya",
      },
    ],
  },
];
