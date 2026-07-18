export type TourCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Tour simple (listados genéricos / tarjetas compactas) */
export type Tour = {
  id: string;
  name: string;
  duration: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

/** Tour con detalle expandible (Costa Maya y futuros destinos) */
export type DetailedTour = {
  id: string;
  name: string;
  duration: string;
  /** Precio “desde”, p. ej. "$85 USD" */
  priceFrom: string;
  /** Resumen corto para la tarjeta */
  summary: string;
  /** Descripción completa en la expansión */
  description: string;
  image: string;
  imageAlt: string;
  prices: string[];
  itinerary: string[];
  includes: string[];
  excludes: string[];
  recommendations: string[];
  important: string[];
};

export const tourCategories: TourCategory[] = [
  {
    slug: "costa-maya",
    name: "Tours en la Costa Maya",
    shortName: "Costa Maya",
    description:
      "Playas vírgenes, cenotes y cultura maya en el Caribe más auténtico.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Playa de arena blanca y aguas turquesas en la Costa Maya",
  },
  {
    slug: "chichen-itza",
    name: "Tours a Chichén Itzá",
    shortName: "Chichén Itzá",
    description:
      "Chichén Itzá es conocida como una de las maravillas del Mundo Maya. Nuestros guías te llevarán por cada rincón de este bello sitio arqueológico y te transportarán a través de siglos de historia. Todos los tours a Chichén Itzá están complementados con la visita a uno de los cenotes más grandes de la Zona Maya y el pueblo mágico de Valladolid.",
    image:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pirámide de Kukulkán en Chichén Itzá",
  },
  {
    slug: "cancun",
    name: "Tours en Cancún",
    shortName: "Cancún",
    description:
      "Cancún es uno de los polos turísticos más importantes de México y el Caribe. Prepárate para redescubrir la ancestral historia de los Mayas que habitaron estas tierras. Podrás hacer un viaje al pasado y encontrarte con sus grandes edificaciones, entre ellas la zona arqueológica de “El Rey”. Los lugares turísticos de Cancún son bastantes, desde disfrutar las playas de arena blanca, tomar un tour en bote a las hermosas islas de Quintana Roo (Isla Mujeres, Cozumel, Contoy o Holbox), hasta actividades de cultura Maya y ecoturismo. Lo que necesite para vivir una experiencia placentera y feliz lo encontrará aquí con nosotros.",
    image:
      "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Vista aérea de la costa de Cancún",
  },
  {
    slug: "cozumel",
    name: "Tours en Cozumel",
    shortName: "Cozumel",
    description:
      "Según la leyenda Maya, Cozumel era el hogar de la diosa Ixchel, deidad del amor y de la fertilidad. La isla de Cozumel es la tercera más grande de México, vecina del segundo arrecife más grande del mundo, con playas de arena blanca y mar turquesa.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Aguas cristalinas ideales para snorkel en Cozumel",
  },
  {
    slug: "merida",
    name: "Tours en Mérida",
    shortName: "Mérida",
    description:
      "«La muy noble y muy leal ciudad de Mérida» combina modernidad y un rico pasado cultural: cenotes, zonas arqueológicas, arquitectura colonial y haciendas henequeneras.",
    image:
      "/merida.jpg",
    imageAlt: "Arquitectura colonial y calles de Mérida",
  },
  {
    slug: "campeche",
    name: "Tours en Campeche",
    shortName: "Campeche",
    description:
      "Ciudad amurallada frente al Golfo, ruinas mayas como Edzná y Calakmul, y una mezcla única de historia pirata, cultura y naturaleza.",
    image:
      "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ciudad amurallada de Campeche al atardecer",
  },
  {
    slug: "chiapas",
    name: "Tours en Chiapas",
    shortName: "Chiapas",
    description:
      "El estado más enigmático de México: selva, cascadas, pueblos mágicos, cultura viva y sitios arqueológicos como Palenque.",
    image:
      "/chiapas.jpg",
    imageAlt: "Paisaje natural de montañas y selva en Chiapas",
  },
  {
    slug: "tabasco",
    name: "Lugares Turísticos de Tabasco",
    shortName: "Tabasco",
    description:
      "“El Edén de México”: Circuito Agua y Chocolate, cultura olmeca, cacao, Pantanos de Centla y Pueblos Mágicos.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Naturaleza y ríos de Tabasco, el Edén de México",
  },
  {
    slug: "holbox",
    name: "Tours y Excursiones en Holbox",
    shortName: "Holbox",
    description:
      "Holbox es una pequeña isla en la costa norte de Yucatán, famosa por sus aguas turquesas poco profundas y la visita del tiburón ballena en verano.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Playa tropical paradisíaca en Holbox",
  },
];

export const costaMayaTours: DetailedTour[] = [
  {
    id: "bacalar-cenote",
    name: "Tour Bacalar y Cenote",
    duration: "7–9 horas",
    priceFrom: "$1,500 MXN / $78 USD",
    summary:
      "Cenote Azul, paseo por la Laguna de Bacalar, Canal de los Piratas y Fuerte de San Felipe.",
    description:
      "Durante este tour en Bacalar, podrá disfrutar los principales atractivos del mágico lugar, conocerá el cenote Azul (el cenote abierto más grande registrado), realizará un paseo por la Laguna de Bacalar y el Canal de los Piratas, y visitará el Fuerte de Bacalar.",
    image: "/placeholder-tour.svg",
    imageAlt: "Laguna de Bacalar y Cenote Azul",
    prices: [
      "Saliendo de Bacalar: Adulto y Menor $1,500 MXN / $78 USD",
      "Saliendo de Chetumal: Adulto y Menor $1,500 MXN / $78 USD",
      "Menores de 4 años: GRATIS",
    ],
    itinerary: [
      "Pick-up en su hotel",
      "Visita al Cenote Azul + tiempo para nadar",
      "Paseo en lancha por la laguna",
      "Paseo por 3 cenotes",
      "Visita a Isla Pájaros",
      "Visita al Canal de los Piratas",
      "Tiempo para almorzar frente a la laguna",
      "Visita guiada al Museo del Fuerte de San Felipe",
      "Visita al parque para fotografías",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo con A/A",
      "Guía",
      "Paseo en lancha",
      "Visita a 3 cenotes",
      "Canal de los Piratas",
      "Tiempo para almorzar",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Entradas a cenotes y museo",
      "Propinas",
    ],
    recommendations: [
      "Ropa cómoda + traje de baño",
      "Calzado cómodo",
      "Muda de ropa",
      "Toalla",
    ],
    important: [
      "Salidas martes, viernes y domingo",
      "Duración desde Chetumal ≈ 9 hrs (pick-up 9:00)",
      "Duración desde Bacalar ≈ 7 hrs (pick-up 9:40)",
      "Reservar con 48 hrs de anticipación",
    ],
  },
  {
    id: "mahahual-snorkel",
    name: "Tour Mahahual Snorkel y Relajación",
    duration: "9–10 horas",
    priceFrom: "$1,300 MXN / $70 USD",
    summary:
      "Playas vírgenes de Mahahual, club de playa y tiempo libre frente al Mar Caribe turquesa.",
    description:
      "Descubra las hermosas playas vírgenes de Mahahual, un pueblo ecoturístico de pescadores donde puede nadar, descansar y relajarse frente al Mar Caribe de color turquesa.",
    image: "/placeholder-tour.svg",
    imageAlt: "Playa de Mahahual y Mar Caribe",
    prices: [
      "Saliendo de Bacalar: Adultos $1,300 MXN / $70 USD",
      "Saliendo de Chetumal: Adultos $1,300 MXN / $70 USD",
      "Menores de 4 años: GRATIS",
    ],
    itinerary: [
      "Pick-up en su hotel",
      "Registro en club de playa",
      "Tiempo libre + comida en club de playa",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo con A/A",
      "Entrada al club de playa",
      "Camastros",
      "Baños",
      "Regaderas",
      "Tiempo para comer frente al mar",
    ],
    excludes: ["Almuerzo y bebidas", "Propinas"],
    recommendations: [
      "Ropa cómoda + traje de baño",
      "Calzado cómodo",
      "Muda de ropa",
    ],
    important: [
      "Salidas martes, jueves y sábado",
      "Duración desde Bacalar ≈ 9 hrs",
      "Duración desde Chetumal ≈ 10 hrs",
      "Reservar con 48 hrs de anticipación",
    ],
  },
  {
    id: "kayak-bacalar",
    name: "Tour Aventura con Kayak en Bacalar",
    duration: "2 horas",
    priceFrom: "$650 MXN / $35 USD",
    summary:
      "Kayak por la Laguna de Bacalar, 3 cenotes, Isla Pájaros y Canal de los Piratas.",
    description:
      "Disfruta un día de aventura con kayak en la Laguna de Bacalar. Navega por aguas de distintos tonos de azul y descubre parajes ocultos que fueron utilizados por piratas hace siglos.",
    image: "/placeholder-tour.svg",
    imageAlt: "Kayak en la Laguna de Bacalar",
    prices: [
      "Saliendo de Bacalar (Punto de Encuentro): Adulto y Menor $650 MXN / $35 USD",
      "No apto para menores de 6 años",
    ],
    itinerary: [
      "Kayak en la Laguna de Bacalar",
      "Tiempo para bañarse",
      "Salidas a las 9:00 AM y 3:00 PM",
    ],
    includes: [
      "Chaleco salvavidas",
      "Paseo en kayak",
      "Visita a 3 cenotes",
      "Isla Pájaros",
      "Canal de los Piratas",
    ],
    excludes: ["Almuerzo y bebidas", "Propinas"],
    recommendations: [
      "Ropa cómoda + traje de baño",
      "Calzado de playa",
      "Muda de ropa",
      "Toalla",
    ],
    important: [
      "Salidas lunes, martes, jueves, sábado y domingo",
      "Duración aproximada: 2 horas",
      "No apto para menores de 6 años",
      "Reservar con 48 hrs de anticipación",
    ],
  },
];

export const chichenItzaTours: DetailedTour[] = [
  {
    id: "chichen-itza-todo-incluido",
    name: "Tour Chichén Itzá Todo Incluido desde Cancún",
    duration: "13–14 horas",
    priceFrom: "$3,060 MXN / $160 USD",
    summary:
      "Zona arqueológica de Chichén Itzá, cenote y pueblo mágico de Valladolid. Salidas diarias desde Cancún.",
    description:
      "Este es uno de nuestros recorridos regulares a Chichén Itzá, saliendo todos los días desde Cancún. Visita la Zona Arqueológica, uno de los cenotes más bellos de la zona maya y termina con un recorrido por el pueblo mágico de Valladolid.",
    image: "/placeholder-tour.svg",
    imageAlt: "Pirámide de Kukulkán en Chichén Itzá",
    prices: [
      "Adulto: $3,060 MXN / $160 USD",
      "Menor (5-11 años): $2,295 MXN / $120 USD",
      "Infantes 0-4 años: GRATIS",
      "*Sujeto a cambio. Promoción para Nacionales: presentar INE y CURP del menor.",
    ],
    itinerary: [
      "Salida de Cancún a las 7:00 a.m.",
      "Visita al cenote (comida y nado)",
      "Visita a la zona arqueológica de Chichén Itzá",
      "Visita al pueblo mágico de Valladolid",
      "Regreso al hotel entre 8:00 y 9:00 p.m.",
    ],
    includes: [
      "Transportación en autobús de lujo desde Cancún, Playa del Carmen y Riviera Maya",
      "Bebidas nacionales al terminar el recorrido",
      "Desayuno Gourmet a bordo del autobús",
      "Guía profesional bilingüe (Español – Inglés)",
      "Entrada a la zona arqueológica de Chichén Itzá",
      "Entrada al cenote",
    ],
    excludes: [
      "Renta de chalecos ($3 USD)",
      "Lockers ($1 USD)",
      "Pago por uso de videocámara ($4 USD)",
      "Toallas",
    ],
    recommendations: [
      "Ropa fresca y zapatos cómodos para caminar",
      "Traje de baño y toalla",
      "Sombrero, gorra y lentes de sol",
      "Tomar agua",
      "Desayunar antes de salir",
    ],
    important: [
      "Infantes 0-4 años GRATIS",
      "Niños de 5 a 11 años deben presentar CURP",
      "No se aceptan animales",
      "No se puede subir a las pirámides",
      "No se permite videocámara profesional o trípode",
    ],
  },
];

export const cancunTours: DetailedTour[] = [
  {
    id: "barco-pirata-cancun",
    name: "Tour Barco Pirata Cancún",
    duration: "4–5 horas",
    priceFrom: "Desde $1,800 MXN",
    summary:
      "Divertido tour cargado de acción y aventura a bordo de un Barco Pirata, con cena, espectáculo y fiesta para toda la familia.",
    description:
      "Vive una noche de aventura a bordo de un barco pirata en la costa de Cancún. Disfruta de cena, show en vivo, música y ambiente familiar en un recorrido por el Caribe. Ideal para niños y adultos que buscan una experiencia diferente al atardecer o en horario nocturno.",
    image: "/placeholder-tour.svg",
    imageAlt: "Barco pirata en Cancún",
    prices: [
      "Adulto: desde $1,800 MXN / $95 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Traslado o encuentro en punto de embarque en Cancún",
      "Embarque y bienvenida a bordo",
      "Navegación por la costa con música y animación",
      "Cena y espectáculo de piratas",
      "Tiempo de baile y fiesta a bordo",
      "Regreso a puerto y fin del tour",
    ],
    includes: [
      "Embarque en barco pirata",
      "Cena a bordo (menú del tour)",
      "Espectáculo y animación",
      "Bebidas según paquete (consulta al cotizar)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Propinas",
      "Fotos y videos profesionales",
      "Traslado hotel–puerto (según paquete)",
      "Consumos extras no incluidos en el menú",
    ],
    recommendations: [
      "Ropa cómoda y calzado antideslizante",
      "Llevar identificación",
      "Ideal con familia y grupos",
      "Confirma horario de embarque con anticipación",
    ],
    important: [
      "Horarios sujetos a disponibilidad y condiciones del mar",
      "Reservar con anticipación, especialmente en temporada alta",
      "Detalles de menú y bebidas se confirman al cotizar",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "catamaran-snorkel-isla-mujeres",
    name: "Tour Catamarán y Snorkel Isla Mujeres",
    duration: "7–8 horas",
    priceFrom: "Desde $1,500 MXN",
    summary:
      "Navega por la costa de Cancún e Isla Mujeres en catamarán, surcando el mar color turquesa.",
    description:
      "Navega en catamarán desde Cancún hacia Isla Mujeres por aguas turquesas del Caribe. Combina snorkel en arrecife, tiempo libre en la isla y regreso con ambiente a bordo. Una de las experiencias más populares de la zona hotelera.",
    image: "/placeholder-tour.svg",
    imageAlt: "Catamarán hacia Isla Mujeres",
    prices: [
      "Adulto: desde $1,500 MXN / $80 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquetes con open bar o comida: consulta opciones",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up o encuentro en muelle de Cancún",
      "Navegación en catamarán hacia zona de snorkel",
      "Snorkel en arrecife (tiempo en agua según condiciones)",
      "Llegada a Isla Mujeres y tiempo libre",
      "Regreso a Cancún a bordo del catamarán",
    ],
    includes: [
      "Traslado en catamarán",
      "Equipo de snorkel (según operador)",
      "Chaleco salvavidas",
      "Guía / tripulación",
      "Tiempo libre en Isla Mujeres",
    ],
    excludes: [
      "Alimentos y bebidas extras en la isla",
      "Propinas",
      "Lockers y extras de playa",
      "Impuestos o cuotas portuarias no listadas",
    ],
    recommendations: [
      "Traje de baño, toalla y bloqueador biodegradable",
      "Saber nadar es recomendable para snorkel",
      "Llevar efectivo para compras en la isla",
      "Gorra y lentes de sol",
    ],
    important: [
      "El snorkel depende del oleaje y la visibilidad",
      "Salidas diarias sujetas a clima",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "tulum-xenses-todo-incluido",
    name: "Tour Tulum & Xenses Todo Incluido",
    duration: "10–12 horas",
    priceFrom: "Desde $2,800 MXN",
    summary:
      "Combina la zona arqueológica de Tulum con el parque Xenses, donde nada es lo que parece.",
    description:
      "Un día completo que une historia maya y diversión sensorial: visita la zona arqueológica de Tulum frente al mar Caribe y continúa en Xenses, el parque donde la percepción se pone a prueba con actividades interactivas para toda la familia.",
    image: "/placeholder-tour.svg",
    imageAlt: "Tulum y parque Xenses",
    prices: [
      "Adulto: desde $2,800 MXN / $150 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye entradas según paquete todo incluido",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Cancún / Riviera Maya",
      "Visita a la zona arqueológica de Tulum",
      "Traslado a Xenses",
      "Actividades y atracciones del parque",
      "Tiempo para comida (según paquete)",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo",
      "Entrada a Tulum (según paquete)",
      "Entrada a Xenses",
      "Guía o asistencia en español",
      "Actividades del parque según tarifa",
    ],
    excludes: [
      "Alimentos y bebidas no incluidos en el paquete",
      "Propinas",
      "Fotos profesionales",
      "Souvenirs y extras opcionales",
    ],
    recommendations: [
      "Ropa cómoda, zapatos para caminar y traje de baño",
      "Bloqueador y repelente biodegradables",
      "Llevar efectivo y cambio de ropa",
      "Llegar con tiempo al punto de encuentro",
    ],
    important: [
      "Día completo: se recomienda buen estado físico",
      "Horarios de Tulum y Xenses sujetos a operación del día",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "travesia-romantica-cancun",
    name: "Travesía Romántica en Cancún",
    duration: "2–3 horas",
    priceFrom: "Desde $1,200 MXN",
    summary:
      "El tour más romántico del Caribe Mexicano. Recorrido por la Laguna Nichupté al atardecer.",
    description:
      "Recorrido en lancha o embarcación por la Laguna Nichupté al atardecer, con ambiente íntimo, música suave y vistas del skyline de Cancún. Perfecto para parejas, aniversarios y propuestas.",
    image: "/placeholder-tour.svg",
    imageAlt: "Atardecer en Laguna Nichupté, Cancún",
    prices: [
      "Por pareja: desde $1,200 MXN / $65 USD (ejemplo)",
      "Paquetes con brindis o cena: consulta opciones",
      "Salidas privadas: precio personalizado",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en muelle o punto acordado",
      "Embarque y salida por Laguna Nichupté",
      "Recorrido al atardecer con paradas fotográficas",
      "Brindis o momento especial (según paquete)",
      "Regreso al muelle",
    ],
    includes: [
      "Recorrido en embarcación",
      "Capitán / guía",
      "Ambiente romántico a bordo",
      "Chalecos salvavidas",
      "Asistencia CAREK",
    ],
    excludes: [
      "Cena completa (salvo paquete que la incluya)",
      "Flores, fotos o extras de propuesta (opcionales)",
      "Propinas",
      "Traslado hotel–muelle (según paquete)",
    ],
    recommendations: [
      "Ropa elegante casual",
      "Llegar 15 minutos antes del embarque",
      "Reservar con anticipación para horarios de atardecer",
      "Indica si es aniversario o propuesta al cotizar",
    ],
    important: [
      "Sujeto a condiciones climáticas",
      "Cupo limitado por embarcación",
      "Mejor experiencia en temporada de atardeceres despejados",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xcaret-plus-transportacion",
    name: "Tour Xcaret Plus con Transportación",
    duration: "12–14 horas",
    priceFrom: "Desde $3,200 MXN",
    summary:
      "La experiencia más completa en Xcaret con Área Plus, ríos subterráneos y comida buffet.",
    description:
      "Disfruta Xcaret con acceso Área Plus: ríos subterráneos, show nocturno, buffet y beneficios adicionales del paquete Plus. Incluye transportación desde Cancún y zona hotelera para un día sin preocupaciones.",
    image: "/placeholder-tour.svg",
    imageAlt: "Parque Xcaret en la Riviera Maya",
    prices: [
      "Adulto: desde $3,200 MXN / $170 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquete Plus con transportación incluido",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel de Cancún / Riviera Maya",
      "Llegada a Xcaret y acceso Área Plus",
      "Ríos subterráneos, playa y atracciones del parque",
      "Comida buffet (según paquete)",
      "Show nocturno de México Espectacular",
      "Regreso al hotel",
    ],
    includes: [
      "Transportación redonda",
      "Entrada Xcaret Plus (según tarifa del día)",
      "Acceso a atracciones incluidas en Plus",
      "Comida buffet (según paquete)",
      "Show nocturno",
    ],
    excludes: [
      "Actividades opcionales con costo extra",
      "Propinas",
      "Fotos y recuerdos",
      "Bebidas alcohólicas no incluidas en el paquete",
    ],
    recommendations: [
      "Traje de baño, toalla y ropa cómoda",
      "Zapatos acuáticos o sandalias seguras",
      "Bloqueador biodegradable obligatorio",
      "Llegar con tiempo; el día es largo",
    ],
    important: [
      "Operación sujeta a horarios del parque",
      "Reservar con anticipación en temporada alta",
      "Lleva identificación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "chichen-itza-desde-cancun",
    name: "Tour Chichén Itzá Todo Incluido desde Cancún",
    duration: "13–14 horas",
    priceFrom: "Desde $3,060 MXN",
    summary:
      "Visita Chichén Itzá, un cenote y el pueblo mágico de Valladolid. Sale todos los días.",
    description:
      "Recorrido regular a Chichén Itzá saliendo todos los días desde Cancún. Incluye zona arqueológica, visita a un cenote de la zona maya y paseo por el pueblo mágico de Valladolid. Guía bilingüe y transporte en autobús de lujo.",
    image: "/placeholder-tour.svg",
    imageAlt: "Chichén Itzá desde Cancún",
    prices: [
      "Adulto: $3,060 MXN / $160 USD (referencia)",
      "Menor (5-11 años): $2,295 MXN / $120 USD (referencia)",
      "Infantes 0-4 años: GRATIS",
      "*Confirma precios y promoción para nacionales al cotizar.",
    ],
    itinerary: [
      "Salida de Cancún a las 7:00 a.m.",
      "Visita al cenote (comida y nado)",
      "Visita a la zona arqueológica de Chichén Itzá",
      "Visita al pueblo mágico de Valladolid",
      "Regreso al hotel entre 8:00 y 9:00 p.m.",
    ],
    includes: [
      "Transportación en autobús de lujo",
      "Desayuno gourmet a bordo (según operador)",
      "Guía profesional bilingüe",
      "Entrada a Chichén Itzá",
      "Entrada al cenote",
    ],
    excludes: [
      "Renta de chalecos y lockers en cenote",
      "Almuerzo completo (según paquete)",
      "Propinas",
      "Toallas",
    ],
    recommendations: [
      "Ropa fresca y zapatos cómodos",
      "Traje de baño y toalla",
      "Sombrero, gorra y lentes de sol",
      "Desayunar antes de salir o a bordo",
    ],
    important: [
      "Salidas diarias desde Cancún",
      "No se puede subir a las pirámides",
      "Niños 5–11 años: llevar CURP si aplica promoción",
      "Ver también la página de Tours a Chichén Itzá",
    ],
  },
  {
    id: "tulum-cenote-cancun",
    name: "Excursión Tulum y Cenote desde Cancún",
    duration: "9–11 horas",
    priceFrom: "Desde $1,900 MXN",
    summary:
      "Recorrido por la zona arqueológica de Tulum y visita a un cenote sagrado.",
    description:
      "Combina la magia de las ruinas de Tulum frente al Caribe con el nado en un cenote sagrado de la zona. Experiencia equilibrada entre cultura, naturaleza y tiempo para fotos, ideal para familias y viajeros de primer viaje.",
    image: "/placeholder-tour.svg",
    imageAlt: "Ruinas de Tulum y cenote",
    prices: [
      "Adulto: desde $1,900 MXN / $100 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas desde Cancún y zona hotelera",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel de Cancún",
      "Visita a la zona arqueológica de Tulum",
      "Tiempo libre para fotos y recorrido",
      "Traslado y nado en cenote",
      "Tiempo para almorzar (no siempre incluido)",
      "Regreso a Cancún",
    ],
    includes: [
      "Transporte redondo",
      "Guía o conductor-guía",
      "Entrada a Tulum (según paquete)",
      "Entrada al cenote (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Lockers en cenote",
      "Acceso a playa con costo extra en Tulum (si aplica)",
    ],
    recommendations: [
      "Traje de baño, toalla y ropa cómoda",
      "Zapatos para caminar en ruinas",
      "Bloqueador biodegradable",
      "Efectivo para compras locales",
    ],
    important: [
      "Mucho sol en Tulum: hidrátate",
      "No se sube a las estructuras arqueológicas",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "tulum-xel-ha-todo-incluido",
    name: "Tour Tulum y Xel-Há Todo Incluido",
    duration: "11–13 horas",
    priceFrom: "Desde $2,900 MXN",
    summary:
      "Combina Tulum con uno de los parques más emblemáticos de la Riviera Maya.",
    description:
      "Por la mañana explora la zona arqueológica de Tulum y por la tarde sumérgete en Xel-Há, el enorme cenote abierto y parque natural con snorkel, ríos y actividades acuáticas todo incluido según paquete.",
    image: "/placeholder-tour.svg",
    imageAlt: "Tulum y parque Xel-Há",
    prices: [
      "Adulto: desde $2,900 MXN / $155 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquete todo incluido con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Cancún",
      "Visita a Tulum",
      "Traslado a Xel-Há",
      "Snorkel, nado y atracciones del parque",
      "Comida buffet (según paquete)",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo",
      "Entrada a Tulum (según paquete)",
      "Entrada a Xel-Há todo incluido",
      "Comida y bebidas según tarifa del parque",
      "Guía / asistencia",
    ],
    excludes: [
      "Actividades opcionales con costo extra",
      "Propinas",
      "Fotos profesionales",
      "Lockers premium u otros extras",
    ],
    recommendations: [
      "Traje de baño, toalla y ropa de cambio",
      "Zapatos acuáticos",
      "Bloqueador biodegradable",
      "No uses joyería valiosa en el agua",
    ],
    important: [
      "Día largo: planifica descanso al regreso",
      "Operación sujeta a horarios de Tulum y Xel-Há",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xel-ha-todo-incluido",
    name: "Tour Xel-Há Todo Incluido",
    duration: "10–12 horas",
    priceFrom: "Desde $2,400 MXN",
    summary:
      "Paraíso natural y acuario espectacular en la Riviera Maya.",
    description:
      "Día completo en Xel-Há: snorkel en el caletón, flotación por ríos, playas y actividades acuáticas en un entorno natural. Paquete todo incluido con transportación desde Cancún para disfrutar sin preocuparte por extras básicos.",
    image: "/placeholder-tour.svg",
    imageAlt: "Parque Xel-Há",
    prices: [
      "Adulto: desde $2,400 MXN / $130 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Todo incluido con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel",
      "Llegada a Xel-Há y briefing",
      "Snorkel, ríos y actividades del parque",
      "Comida buffet y tiempo libre",
      "Regreso a Cancún",
    ],
    includes: [
      "Transporte redondo",
      "Entrada todo incluido a Xel-Há",
      "Comida y bebidas según paquete",
      "Equipo de snorkel básico (según parque)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Spa, nado con delfines u opcionales",
      "Propinas",
      "Fotos",
      "Lockers premium",
    ],
    recommendations: [
      "Traje de baño y toalla",
      "Bloqueador biodegradable",
      "Zapatos acuáticos",
      "Repelente si eres sensible a insectos",
    ],
    important: [
      "Horarios del parque sujetos a temporada",
      "Ideal para familias y todos los niveles de natación (con chaleco)",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xplor-todo-incluido",
    name: "Tour Xplor Todo Incluido",
    duration: "9–11 horas",
    priceFrom: "Desde $2,600 MXN",
    summary:
      "Aventura con tirolesas, vehículos anfibios y formaciones rocosas milenarias.",
    description:
      "Xplor es aventura en la selva de la Riviera Maya: tirolesas, rafts en ríos subterráneos, vehículos anfibios y cavernas. Paquete todo incluido con transportación para un día lleno de adrenalina controlada y naturaleza.",
    image: "/placeholder-tour.svg",
    imageAlt: "Aventura en Xplor",
    prices: [
      "Adulto: desde $2,600 MXN / $140 USD (ejemplo)",
      "Menor: tarifa especial y restricciones de altura/edad",
      "Todo incluido con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel",
      "Llegada a Xplor e inducción de seguridad",
      "Tirolesas, circuitos y actividades del parque",
      "Comida buffet (según paquete)",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo",
      "Entrada a Xplor todo incluido",
      "Equipo de las actividades incluidas",
      "Comida y bebidas según tarifa",
      "Asistencia CAREK",
    ],
    excludes: [
      "Fotos y videos del parque",
      "Propinas",
      "Actividades no incluidas en la tarifa",
      "Lockers premium",
    ],
    recommendations: [
      "Ropa que se pueda mojar y zapatos cerrados con buen agarre",
      "Atar el cabello largo",
      "No llevar objetos de valor en los circuitos",
      "Buen estado de salud general",
    ],
    important: [
      "Restricciones de peso, altura y edad en algunas atracciones",
      "No recomendado en embarazo o con lesiones recientes",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xplor-fuego",
    name: "Tour Xplor Fuego",
    duration: "6–8 horas",
    priceFrom: "Desde $2,500 MXN",
    summary:
      "La versión nocturna de Xplor. Aventura cuando la selva cobra vida al caer el sol.",
    description:
      "Vive Xplor de noche: tirolesas, circuitos y atmósfera de fuego y selva al atardecer. Una experiencia diferente para quienes ya conocen el parque de día o buscan adrenalina con un toque espectacular.",
    image: "/placeholder-tour.svg",
    imageAlt: "Xplor Fuego nocturno",
    prices: [
      "Adulto: desde $2,500 MXN / $135 USD (ejemplo)",
      "Menor: tarifa especial y restricciones de atracciones",
      "Incluye transportación según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up por la tarde desde Cancún",
      "Llegada a Xplor Fuego",
      "Actividades nocturnas del parque",
      "Cena buffet (según paquete)",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Entrada a Xplor Fuego",
      "Equipo de actividades incluidas",
      "Cena según tarifa",
      "Asistencia CAREK",
    ],
    excludes: [
      "Fotos profesionales",
      "Propinas",
      "Extras y souvenirs",
      "Bebidas no incluidas en el paquete",
    ],
    recommendations: [
      "Ropa cómoda que se pueda mojar",
      "Zapatos cerrados con buen agarre",
      "Llegar descansado: el circuito es activo",
      "Revisa restricciones de salud y edad",
    ],
    important: [
      "Horario vespertino/nocturno",
      "Restricciones de peso y altura en atracciones",
      "Cupos limitados en temporada alta",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xenotes-cancun",
    name: "Tour Xenotes desde Cancún",
    duration: "8–10 horas",
    priceFrom: "Desde $2,200 MXN",
    summary:
      "Visita a varios cenotes con actividades de aventura en medio de la selva.",
    description:
      "Circuito por distintos tipos de cenotes (abiertos, semiabiertos y de caverna) con actividades como rappel, tirolesa, kayak o nado, según el recorrido del día. Naturaleza pura cerca de Cancún, ideal para aventureros.",
    image: "/placeholder-tour.svg",
    imageAlt: "Cenotes y aventura en la selva",
    prices: [
      "Adulto: desde $2,200 MXN / $120 USD (ejemplo)",
      "Menor: tarifa especial y edad mínima según actividad",
      "Incluye equipo de aventura y transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel de Cancún",
      "Llegada a la zona de cenotes",
      "Circuito por varios cenotes con actividades",
      "Comida ligera o picnic (según paquete)",
      "Regreso a Cancún",
    ],
    includes: [
      "Transporte redondo",
      "Entrada a los cenotes del circuito",
      "Equipo de las actividades incluidas",
      "Guía de aventura",
      "Comida según paquete",
    ],
    excludes: [
      "Propinas",
      "Fotos",
      "Bebidas alcohólicas",
      "Extras no listados",
    ],
    recommendations: [
      "Traje de baño, toalla y muda de ropa",
      "Zapatos que se puedan mojar",
      "Bloqueador y repelente biodegradables",
      "Buen estado físico moderado",
    ],
    important: [
      "Edad y peso mínimos en rappel/tirolesa",
      "Sujeto a condiciones climáticas",
      "No apto para embarazadas en varias actividades",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "xoximilco-cancun",
    name: "Tour Xoximilco Cancún",
    duration: "4–5 horas",
    priceFrom: "Desde $1,700 MXN",
    summary:
      "Experiencia al estilo de la época de oro de México, ideal para grupos y celebraciones.",
    description:
      "Noche al estilo trajineras con música, comida mexicana, bebidas y ambiente de fiesta en Xoximilco Cancún. Perfecto para grupos, despedidas y quienes quieren vivir la tradición de Xochimilco con un toque caribeño.",
    image: "/placeholder-tour.svg",
    imageAlt: "Xoximilco Cancún de noche",
    prices: [
      "Adulto: desde $1,700 MXN / $90 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquetes para grupos: consulta cotización",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Traslado o encuentro en Xoximilco",
      "Embarque en trajinera / experiencia del parque",
      "Cena, música en vivo y brindis",
      "Ambiente de fiesta y entretenimiento",
      "Fin del recorrido y regreso",
    ],
    includes: [
      "Entrada a la experiencia Xoximilco",
      "Cena mexicana (según paquete)",
      "Bebidas según tarifa",
      "Música y animación",
      "Asistencia CAREK",
    ],
    excludes: [
      "Propinas",
      "Consumos premium extras",
      "Fotos profesionales",
      "Traslado (si no va en el paquete)",
    ],
    recommendations: [
      "Ropa cómoda o casual de noche",
      "Ideal para grupos y celebraciones",
      "Llegar con tiempo al punto de encuentro",
      "Indica si es celebración especial al cotizar",
    ],
    important: [
      "Horario vespertino/nocturno",
      "Consumo responsable de alcohol",
      "Reservar con anticipación para grupos grandes",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "isla-mujeres-delfines",
    name: "Tour Isla Mujeres Todo Incluido con Delfines",
    duration: "7–9 horas",
    priceFrom: "Desde $3,500 MXN",
    summary:
      "Nado con delfines + club de playa en Isla Mujeres.",
    description:
      "Día en Isla Mujeres con nado con delfines y acceso a club de playa todo incluido. Combina una experiencia marina inolvidable con tiempo para relajarte, nadar y disfrutar de la isla.",
    image: "/placeholder-tour.svg",
    imageAlt: "Nado con delfines en Isla Mujeres",
    prices: [
      "Adulto: desde $3,500 MXN / $185 USD (ejemplo)",
      "Menor: tarifa especial; edad mínima para nado con delfines",
      "Incluye ferry o traslado según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Traslado o ferry hacia Isla Mujeres",
      "Registro en programa de delfines",
      "Nado con delfines (sesión programada)",
      "Tiempo en club de playa / libre en la isla",
      "Regreso a Cancún",
    ],
    includes: [
      "Programa de nado con delfines",
      "Acceso a club de playa (según paquete)",
      "Traslado marítimo según operador",
      "Equipo y briefing de seguridad",
      "Asistencia CAREK",
    ],
    excludes: [
      "Fotos y videos del nado (suelen ser extras)",
      "Propinas",
      "Consumos no incluidos en el club",
      "Souvenirs",
    ],
    recommendations: [
      "Traje de baño y toalla",
      "No usar joyería ni cremas antes del nado",
      "Seguir indicaciones de los entrenadores",
      "Llevar efectivo para extras y propinas",
    ],
    important: [
      "Edad y estatura mínimas para el programa de delfines",
      "Restricciones médicas: consulta antes de reservar",
      "Cupos limitados por sesión",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "royal-garrafon-isla-mujeres",
    name: "Tour Royal Garrafón Isla Mujeres Todo Incluido",
    duration: "7–9 horas",
    priceFrom: "Desde $2,000 MXN",
    summary:
      "Equilibrio entre relajación y aventura: hamacas, snorkel, kayaks y más.",
    description:
      "Día todo incluido en Royal Garrafón, Isla Mujeres: snorkel, kayaks, hamacas, albercas y vistas al Caribe. Ideal si buscas combinar playa, naturaleza y actividades sin un ritmo agotador.",
    image: "/placeholder-tour.svg",
    imageAlt: "Parque Royal Garrafón en Isla Mujeres",
    prices: [
      "Adulto: desde $2,000 MXN / $110 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Todo incluido con ferry o traslado según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Cancún hacia Isla Mujeres",
      "Llegada a Royal Garrafón",
      "Snorkel, kayak y tiempo libre en el parque",
      "Comida y bebidas según paquete",
      "Regreso a Cancún",
    ],
    includes: [
      "Entrada a Royal Garrafón",
      "Actividades incluidas en el parque",
      "Comida y bebidas según tarifa",
      "Traslado marítimo (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Spa y actividades premium opcionales",
      "Propinas",
      "Fotos",
      "Lockers premium",
    ],
    recommendations: [
      "Traje de baño, toalla y bloqueador biodegradable",
      "Zapatos acuáticos",
      "Gorra y lentes de sol",
      "Efectivo para compras en la isla",
    ],
    important: [
      "Horarios de ferry sujetos a operación del día",
      "Reservar con anticipación en temporada alta",
      "Ideal para familias",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "isla-mujeres-catamaran-todo-incluido",
    name: "Tour Isla Mujeres en Catamarán Todo Incluido",
    duration: "7–8 horas",
    priceFrom: "Desde $1,600 MXN",
    summary:
      "Aventura todo incluido desde Cancún a Isla Mujeres a bordo de un catamarán.",
    description:
      "Salida en catamarán desde Cancún hacia Isla Mujeres con open bar o bebidas según paquete, snorkel, tiempo libre en la isla y regreso con fiesta a bordo. El clásico tour caribeño todo incluido.",
    image: "/placeholder-tour.svg",
    imageAlt: "Catamarán todo incluido a Isla Mujeres",
    prices: [
      "Adulto: desde $1,600 MXN / $85 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquetes con open bar y comida a bordo: consulta",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Embarque en catamarán en Cancún",
      "Navegación y snorkel en arrecife",
      "Llegada a Isla Mujeres y tiempo libre",
      "Regreso con música y ambiente a bordo",
      "Desembarque en Cancún",
    ],
    includes: [
      "Catamarán redondo",
      "Snorkel y chaleco",
      "Bebidas según paquete (open bar o similar)",
      "Tripulación y guía",
      "Tiempo libre en Isla Mujeres",
    ],
    excludes: [
      "Almuerzo en restaurantes de la isla (salvo que el paquete lo incluya)",
      "Propinas",
      "Lockers y extras en playa",
      "Souvenirs",
    ],
    recommendations: [
      "Traje de baño, toalla y cambio de ropa",
      "Bloqueador biodegradable",
      "No olvides efectivo para la isla",
      "Protector solar y gorra",
    ],
    important: [
      "Consumo responsable de alcohol a bordo",
      "Snorkel sujeto a condiciones del mar",
      "Salidas diarias con cupo limitado",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const cozumelTours: DetailedTour[] = [
  {
    id: "catamaran-cozumel",
    name: "Tour en Catamarán en Cozumel",
    duration: "4–6 horas",
    priceFrom: "Desde $1,400 MXN",
    summary:
      "Ir en un catamarán en Cozumel es una de las cosas más singulares que hacer en la Riviera Maya y una de las mejores maneras de ver y experimentar las impresionantes aguas turquesas del Mar Caribe.",
    description:
      "Navega las aguas turquesas de Cozumel a bordo de un catamarán y descubre por qué esta isla es famosa en el mundo del mar Caribe. Disfruta de vistas al arrecife, tiempo para snorkel o baño según el paquete, y un ambiente relajado ideal para parejas, familias y viajeros que quieren vivir la isla desde el agua. Una de las formas más singulares de experimentar Cozumel y la Riviera Maya.",
    image: "/placeholder-tour.svg",
    imageAlt: "Catamarán en las aguas turquesas de Cozumel",
    prices: [
      "Adulto: desde $1,400 MXN / $75 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "Paquetes con open bar o snorkel: consulta opciones",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en muelle o punto de embarque en Cozumel",
      "Embarque y bienvenida a bordo del catamarán",
      "Navegación por la costa y aguas turquesas del Caribe",
      "Parada para snorkel o baño (según condiciones y paquete)",
      "Tiempo libre a bordo con música y ambiente relajado",
      "Regreso al muelle y fin del tour",
    ],
    includes: [
      "Paseo en catamarán",
      "Tripulación y asistencia a bordo",
      "Chaleco salvavidas",
      "Equipo de snorkel (según paquete)",
      "Bebidas según tarifa del tour (consulta al cotizar)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Propinas",
      "Fotos y videos profesionales",
      "Alimentos no incluidos en el paquete",
      "Traslado hotel–muelle (según paquete)",
      "Extras en playa o muelle",
    ],
    recommendations: [
      "Traje de baño, toalla y muda de ropa",
      "Bloqueador biodegradable (obligatorio en zona de arrecife)",
      "Gorra, lentes de sol y calzado antideslizante",
      "Saber nadar es recomendable para snorkel",
      "Llevar efectivo para propinas y compras",
    ],
    important: [
      "Salidas sujetas a condiciones del mar y clima",
      "El snorkel depende de oleaje y visibilidad del día",
      "Respeta el arrecife: no tocar coral ni vida marina",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const meridaTours: DetailedTour[] = [
  {
    id: "uxmal-museo-chocolate",
    name: "Tour Uxmal y Museo del Chocolate desde Mérida",
    duration: "7–9 horas",
    priceFrom: "Desde $1,800 MXN",
    summary:
      "Las edificaciones monumentales de la ciudad maya de Uxmal guardan secretos ancestrales. Destacan la Pirámide del Adivino, el Cuadrángulo de las Monjas y la Casa de las Palomas.",
    description:
      "Descubre Uxmal, una de las ciudades mayas más impresionantes de Yucatán, con su arquitectura del estilo Puuc. Recorre la Pirámide del Adivino, el Cuadrángulo de las Monjas y la Casa de las Palomas, y complementa la experiencia con una visita al Museo del Chocolate, donde conocerás la historia y el sabor del cacao en la cultura maya.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zona arqueológica de Uxmal",
    prices: [
      "Adulto: desde $1,800 MXN / $95 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel o punto de encuentro en Mérida",
      "Traslado hacia la zona Puuc",
      "Visita guiada a Uxmal (Pirámide del Adivino y principales estructuras)",
      "Tiempo libre para fotos y recorrido",
      "Visita al Museo del Chocolate",
      "Regreso a Mérida",
    ],
    includes: [
      "Transporte redondo desde Mérida",
      "Guía o asistencia en español",
      "Entrada a Uxmal (según paquete)",
      "Entrada al Museo del Chocolate (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs y consumo en el museo",
      "Extras no listados",
    ],
    recommendations: [
      "Ropa cómoda y zapatos para caminar",
      "Sombrero, gorra, lentes de sol y bloqueador",
      "Llevar agua y efectivo",
      "Llegar con tiempo al punto de encuentro",
    ],
    important: [
      "No se puede subir a las pirámides",
      "Mucho sol en la zona arqueológica: hidrátate",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "chichen-itza-pueblos-magicos",
    name: "Tour Chichén Itzá + Pueblos Mágicos",
    duration: "12–14 horas",
    priceFrom: "Desde $2,400 MXN",
    summary:
      "La perfecta combinación: zona arqueológica de Chichén Itzá, la ciudad amarilla de Izamal, Valladolid y un baño en el cenote Ik Kil.",
    description:
      "Un día completo que une maravilla arqueológica y encanto colonial: Chichén Itzá, nado en el cenote Ik Kil, paseo por Valladolid y la mágica Izamal, la ciudad amarilla. Ideal si quieres ver lo mejor del oriente de Yucatán saliendo desde Mérida.",
    image: "/placeholder-tour.svg",
    imageAlt: "Chichén Itzá, Izamal y cenote Ik Kil",
    prices: [
      "Adulto: desde $2,400 MXN / $125 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida temprana desde Mérida",
      "Visita a la zona arqueológica de Chichén Itzá",
      "Nado en el cenote Ik Kil",
      "Paseo por el pueblo mágico de Valladolid",
      "Visita a Izamal, la ciudad amarilla",
      "Regreso a Mérida",
    ],
    includes: [
      "Transporte redondo desde Mérida",
      "Guía profesional (según paquete)",
      "Entrada a Chichén Itzá (según paquete)",
      "Entrada al cenote Ik Kil (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Lockers y renta de chalecos en el cenote",
      "Toallas",
    ],
    recommendations: [
      "Ropa fresca, zapatos cómodos y traje de baño",
      "Toalla, muda de ropa y bloqueador",
      "Sombrero y lentes de sol",
      "Desayunar antes de salir: el día es largo",
    ],
    important: [
      "Día completo: se recomienda buen estado físico",
      "No se puede subir a las pirámides de Chichén Itzá",
      "Horarios sujetos a operación de cada sitio",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "rio-lagartos-coloradas",
    name: "Tour Río Lagartos y Las Coloradas desde Mérida",
    duration: "10–12 horas",
    priceFrom: "Desde $2,200 MXN",
    summary:
      "Contacto con la naturaleza: paseo en lancha por la reserva de Río Lagartos (cocodrilos y aves) + los impresionantes colores de Las Coloradas.",
    description:
      "Sal hacia el norte de Yucatán y vive un día de naturaleza: paseo en lancha por la Reserva de la Biosfera Ría Lagartos, avistamiento de aves y cocodrilos, y las icónicas aguas rosadas de Las Coloradas. Una de las experiencias más fotogénicas del estado.",
    image: "/placeholder-tour.svg",
    imageAlt: "Las Coloradas y Reserva de Río Lagartos",
    prices: [
      "Adulto: desde $2,200 MXN / $115 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas desde Mérida con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Mérida",
      "Traslado a Río Lagartos / Ría Lagartos",
      "Paseo en lancha por la reserva (aves y fauna)",
      "Visita a Las Coloradas y tiempo para fotos",
      "Tiempo para comida local (no siempre incluida)",
      "Regreso a Mérida",
    ],
    includes: [
      "Transporte redondo desde Mérida",
      "Paseo en lancha por la reserva (según paquete)",
      "Guía o capitán local",
      "Visita a Las Coloradas",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Entradas o cuotas locales no listadas",
      "Extras fotográficos",
    ],
    recommendations: [
      "Ropa cómoda, gorra y bloqueador",
      "Repelente de insectos",
      "Llevar agua y efectivo",
      "Binoculares o cámara con buen zoom (opcional)",
    ],
    important: [
      "Avistamiento de fauna sujeto a temporada y condiciones",
      "Respetar la reserva: no molestar a la fauna",
      "Día largo con trayectos por carretera",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "cenotes-merida-homun",
    name: "Tour Cenotes Mérida y Homún",
    duration: "6–8 horas",
    priceFrom: "Desde $1,200 MXN",
    summary:
      "Visita a los hermosos cenotes de Homún (Cascabel, Chaksikín y Pool Cocom) en un recorrido en truck por rieles.",
    description:
      "Explora los cenotes de Homún en un recorrido típico en truck sobre rieles. Visita varios cenotes —entre ellos Cascabel, Chaksikín y Pool Cocom— para nadar en aguas cristalinas en un entorno natural y familiar, ideal para un día de frescura cerca de Mérida.",
    image: "/placeholder-tour.svg",
    imageAlt: "Cenotes de Homún cerca de Mérida",
    prices: [
      "Adulto: desde $1,200 MXN / $65 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye recorrido en truck y accesos según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel o punto de encuentro en Mérida",
      "Traslado a Homún",
      "Recorrido en truck por rieles entre cenotes",
      "Nado en cenotes Cascabel, Chaksikín y Pool Cocom (u otros del circuito)",
      "Tiempo libre y regreso a Mérida",
    ],
    includes: [
      "Transporte redondo desde Mérida (según paquete)",
      "Recorrido en truck por rieles",
      "Acceso a los cenotes del circuito",
      "Chaleco salvavidas donde aplique",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Lockers y renta de equipo extra",
      "Toallas",
    ],
    recommendations: [
      "Traje de baño, toalla y muda de ropa",
      "Calzado que se pueda mojar",
      "Bloqueador y repelente biodegradables",
      "No llevar objetos de valor al agua",
    ],
    important: [
      "Saber nadar es recomendable; usa chaleco si lo necesitas",
      "Algunos cenotes son de caverna: no aptos para claustrofobia severa",
      "Reservar con anticipación los fines de semana",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "celestun-desde-merida",
    name: "Tour a Celestún desde Mérida",
    duration: "8–10 horas",
    priceFrom: "Desde $1,600 MXN",
    summary:
      "Visita al puerto de pescadores y al estero, hogar de una gran cantidad de aves, especialmente el flamenco rosa.",
    description:
      "Viaja al puerto de Celestún y navega por el estero de la Reserva de la Biosfera, hogar de miles de aves y del icónico flamenco rosa. Combina naturaleza, paisaje costero y el ambiente tranquilo de un pueblo de pescadores en la costa de Yucatán.",
    image: "/placeholder-tour.svg",
    imageAlt: "Flamencos en el estero de Celestún",
    prices: [
      "Adulto: desde $1,600 MXN / $85 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas desde Mérida con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Mérida",
      "Traslado a Celestún",
      "Paseo en lancha por el estero (flamencos y aves)",
      "Parada en el “ojo de agua” o manglar (según ruta del día)",
      "Tiempo libre en el puerto / playa",
      "Regreso a Mérida",
    ],
    includes: [
      "Transporte redondo desde Mérida",
      "Paseo en lancha por el estero (según paquete)",
      "Guía o capitán local",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Entradas o cuotas locales no listadas",
      "Actividades extras en playa",
    ],
    recommendations: [
      "Ropa cómoda, gorra y bloqueador",
      "Binoculares o cámara (opcional)",
      "Repelente si visitas manglar",
      "Efectivo para comida local de mariscos",
    ],
    important: [
      "Avistamiento de flamencos sujeto a temporada y marea",
      "Respetar la fauna: no alimentar ni acosar a las aves",
      "Condiciones climáticas pueden modificar la ruta en lancha",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const campecheTours: DetailedTour[] = [
  {
    id: "ruinas-edzna-campeche",
    name: "Tour Ruinas de Edzná en Campeche",
    duration: "5–7 horas",
    priceFrom: "Desde $1,200 MXN",
    summary:
      "Edzná significa “La casa de los Itzáes”. Fue un importante asentamiento Maya con una mezcla de estilos arquitectónicos.",
    description:
      "Visita Edzná, “La casa de los Itzáes”, uno de los asentamientos mayas más importantes de Campeche. Admira su mezcla de estilos arquitectónicos, la imponente Acrópolis y el sistema hidráulico que hace de este sitio una visita esencial cerca de la capital del estado.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zona arqueológica de Edzná, Campeche",
    prices: [
      "Adulto: desde $1,200 MXN / $65 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel o punto de encuentro en Campeche",
      "Traslado a la zona arqueológica de Edzná",
      "Visita guiada a las principales estructuras",
      "Tiempo libre para fotos y recorrido",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo desde Campeche",
      "Guía o asistencia en español",
      "Entrada a Edzná (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
      "Extras no listados",
    ],
    recommendations: [
      "Ropa cómoda y zapatos para caminar",
      "Sombrero, bloqueador y agua",
      "Llevar efectivo para compras locales",
      "Llegar con tiempo al punto de encuentro",
    ],
    important: [
      "No se puede subir a todas las estructuras",
      "Mucho sol en el sitio: hidrátate",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "city-tour-campeche",
    name: "City Tour por la Ciudad de Campeche",
    duration: "3–4 horas",
    priceFrom: "Desde $800 MXN",
    summary:
      "Recorrido por la ciudad amurallada, con su historia de piratas y su arquitectura colonial.",
    description:
      "Recorre San Francisco de Campeche, ciudad Patrimonio de la Humanidad: murallas, baluartes, calles coloniales e historia de piratas. Un city tour ideal para conocer el centro histórico, la gastronomía local y la brisa del Golfo de México.",
    image: "/placeholder-tour.svg",
    imageAlt: "Centro histórico amurallado de Campeche",
    prices: [
      "Adulto: desde $800 MXN / $45 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Opciones a pie, en van o tranvía según disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en punto céntrico o hotel",
      "Recorrido por el centro histórico amurallado",
      "Visita a baluartes y miradores principales",
      "Paradas fotográficas en plazas y calles coloniales",
      "Fin del tour en zona céntrica",
    ],
    includes: [
      "Guía local",
      "Recorrido por sitios emblemáticos",
      "Transporte interno según modalidad del tour",
      "Asistencia CAREK",
    ],
    excludes: [
      "Entradas a museos no listados",
      "Alimentos y bebidas",
      "Propinas",
      "Compras personales",
    ],
    recommendations: [
      "Calzado cómodo para caminar",
      "Gorra y bloqueador",
      "Cámara o celular con buena batería",
      "Efectivo para antojitos locales",
    ],
    important: [
      "Duración y ruta pueden variar por tráfico o eventos",
      "Ideal como primera actividad en Campeche",
      "Reservar con anticipación en temporada alta",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "city-tour-nocturno-campeche",
    name: "City Tour Nocturno en Campeche",
    duration: "2–3 horas",
    priceFrom: "Desde $750 MXN",
    summary:
      "Tour panorámico nocturno admirando la arquitectura de la ciudad y la puesta de sol desde el malecón.",
    description:
      "Descubre Campeche al caer la tarde: arquitectura iluminada, ambiente del centro histórico y puesta de sol desde el malecón. Un recorrido panorámico nocturno romántico y fotogénico, perfecto para parejas y viajeros que ya recorrieron la ciudad de día.",
    image: "/placeholder-tour.svg",
    imageAlt: "Malecón de Campeche al atardecer",
    prices: [
      "Adulto: desde $750 MXN / $40 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas al atardecer / noche",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en punto acordado",
      "Recorrido panorámico por la ciudad iluminada",
      "Parada en el malecón para la puesta de sol",
      "Vista de murallas y monumentos de noche",
      "Regreso al punto de encuentro",
    ],
    includes: [
      "Transporte panorámico (según paquete)",
      "Guía o conductor-guía",
      "Paradas fotográficas programadas",
      "Asistencia CAREK",
    ],
    excludes: [
      "Cena y bebidas",
      "Propinas",
      "Entradas a espectáculos o museos",
      "Extras personales",
    ],
    recommendations: [
      "Ropa ligera para la brisa del malecón",
      "Llegar 10 minutos antes del horario",
      "Ideal con cámara para fotos nocturnas",
      "Confirma el horario de salida según la temporada",
    ],
    important: [
      "Horario sujeto a la hora de puesta de sol",
      "Cupos limitados por vehículo",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "calakmul-balamku-campeche",
    name: "Tour a Calakmul y Balamkú desde Campeche",
    duration: "12–14 horas",
    priceFrom: "Desde $2,800 MXN",
    summary:
      "Visita a Calakmul (uno de los centros políticos más importantes del periodo Clásico Maya) y Balamkú.",
    description:
      "Día completo hacia la selva campechana para visitar Calakmul, uno de los grandes centros políticos del Clásico Maya, y Balamkú, famoso por su friso policromo. Experiencia de naturaleza, arqueología y selva en la Reserva de la Biosfera de Calakmul.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zona arqueológica de Calakmul",
    prices: [
      "Adulto: desde $2,800 MXN / $150 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye transportación de día completo",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida muy temprana desde Campeche",
      "Visita a Balamkú",
      "Ingreso a la zona de Calakmul y recorrido por la selva",
      "Subida a estructuras principales (según normativa)",
      "Tiempo para comida (no siempre incluida)",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo desde Campeche",
      "Guía o asistencia",
      "Entradas a Calakmul y Balamkú (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Permisos o cuotas extras no listadas",
      "Hospedaje",
    ],
    recommendations: [
      "Salida muy temprana: descansa la noche anterior",
      "Ropa cómoda, repelente y zapatos cerrados",
      "Agua, snacks y bloqueador",
      "Buen estado físico para caminar en selva",
    ],
    important: [
      "Día muy largo con bastantes horas de traslado",
      "Clima y fauna silvestre: sigue las indicaciones del guía",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "laguna-terminos-isla-aguada",
    name: "Tour Laguna de Términos e Isla Aguada",
    duration: "8–10 horas",
    priceFrom: "Desde $1,900 MXN",
    summary:
      "Recorrido en embarcación por la Laguna de Términos, santuario natural con delfines y aves.",
    description:
      "Navega por la Laguna de Términos, uno de los sistemas lagunares más importantes de México, con posibilidad de avistar delfines y aves. Combina naturaleza, embarcación e Isla Aguada en un día de contacto con el ecosistema costero de Campeche.",
    image: "/placeholder-tour.svg",
    imageAlt: "Laguna de Términos e Isla Aguada",
    prices: [
      "Adulto: desde $1,900 MXN / $100 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye paseo en embarcación según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Campeche o punto acordado",
      "Traslado hacia Isla Aguada / Laguna de Términos",
      "Recorrido en embarcación por la laguna",
      "Avistamiento de delfines y aves (sujeto a temporada)",
      "Tiempo libre / comida local",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Paseo en embarcación",
      "Chaleco salvavidas",
      "Guía o capitán local",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Fotos profesionales",
      "Actividades extras no listadas",
    ],
    recommendations: [
      "Traje de baño, toalla y ropa cómoda",
      "Bloqueador y gorra",
      "Repelente si hay manglar",
      "Cámara con protección para salpicaduras",
    ],
    important: [
      "Avistamiento de fauna sujeto a condiciones del día",
      "Salidas sujetas a clima y estado de la laguna",
      "Respetar la vida marina: no alimentar delfines",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "camino-real-artesanal",
    name: "Tour Camino Real Artesanal desde Campeche",
    duration: "7–9 horas",
    priceFrom: "Desde $1,500 MXN",
    summary:
      "Tour artesanal y gastronómico por el Camino Real: tejido de sombreros, bordados y gastronomía local.",
    description:
      "Recorre el histórico Camino Real entre Campeche y comunidades artesanales. Conoce el tejido de sombreros de jipijapa, bordados tradicionales y la gastronomía local en un tour cultural ideal para quienes buscan experiencias auténticas lejos del turismo masivo.",
    image: "/placeholder-tour.svg",
    imageAlt: "Artesanías del Camino Real de Campeche",
    prices: [
      "Adulto: desde $1,500 MXN / $80 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquetes con degustación: consulta opciones",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Campeche",
      "Visita a talleres artesanales (sombreros, bordados)",
      "Demostraciones y tiempo para compras responsables",
      "Parada gastronómica con sabores locales",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo",
      "Guía cultural",
      "Visitas a talleres programados",
      "Degustación básica (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Compras de artesanías",
      "Comidas completas no incluidas en el paquete",
      "Propinas",
      "Extras personales",
    ],
    recommendations: [
      "Interés por cultura y artesanía local",
      "Efectivo para apoyar a artesanos",
      "Ropa cómoda y calzado cerrado",
      "Respeto a las comunidades visitadas",
    ],
    important: [
      "Ruta y talleres pueden variar según disponibilidad",
      "Apoya el comercio justo local",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "tour-chenes-campeche",
    name: "Tour de los Chenes Campeche",
    duration: "9–11 horas",
    priceFrom: "Desde $2,000 MXN",
    summary:
      "Visita a Hochob, Dzibilnocac y Santa Rosa, conocidos por su estilo arquitectónico Chenes.",
    description:
      "Explora la región de los Chenes, famosa por sus fachadas zoomorfas y el estilo arquitectónico maya característico. Visita sitios como Hochob, Dzibilnocac y Santa Rosa Xtampak (según ruta del día) en un recorrido arqueológico menos masificado y muy fotogénico.",
    image: "/placeholder-tour.svg",
    imageAlt: "Arquitectura estilo Chenes en Campeche",
    prices: [
      "Adulto: desde $2,000 MXN / $105 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo con transportación",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Campeche",
      "Visita a Hochob",
      "Visita a Dzibilnocac",
      "Visita a Santa Rosa (según tiempo y ruta)",
      "Tiempo para comida y regreso a Campeche",
    ],
    includes: [
      "Transporte redondo",
      "Guía o asistencia",
      "Entradas a zonas arqueológicas (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
      "Extras no listados",
    ],
    recommendations: [
      "Zapatos cerrados para terreno irregular",
      "Repelente, bloqueador y mucha agua",
      "Sombrero y ropa ligera de manga larga",
      "Buen estado físico para caminatas cortas",
    ],
    important: [
      "Sitios con menos infraestructura turística",
      "Orden de visitas sujeto a logística del día",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "kabah-uxmal-campeche",
    name: "Tour Kabah y Uxmal desde Campeche",
    duration: "10–12 horas",
    priceFrom: "Desde $2,200 MXN",
    summary:
      "Recorrido por Edzná, Kabah y Uxmal en un solo día.",
    description:
      "Un recorrido arqueológico intensivo que combina Edzná, Kabah y Uxmal en un solo día desde Campeche. Ideal para amantes de la historia maya que quieren maximizar sitios Puuc y de la región en una salida completa.",
    image: "/placeholder-tour.svg",
    imageAlt: "Uxmal y Kabah desde Campeche",
    prices: [
      "Adulto: desde $2,200 MXN / $115 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo con varias zonas arqueológicas",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida temprana desde Campeche",
      "Visita a Edzná",
      "Visita a Kabah",
      "Visita a Uxmal",
      "Tiempo para comida y regreso a Campeche",
    ],
    includes: [
      "Transporte redondo desde Campeche",
      "Guía o asistencia",
      "Entradas a los sitios (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Guía especializado adicional no listado",
      "Extras personales",
    ],
    recommendations: [
      "Día largo: desayuna bien y lleva snacks",
      "Ropa cómoda, bloqueador y agua",
      "Zapatos para caminar en ruinas",
      "Prioriza fotos en cada sitio por el tiempo limitado",
    ],
    important: [
      "Ritmo activo; no es un tour relajado",
      "No se sube a todas las estructuras",
      "Horarios sujetos a operación de cada zona",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "uxmal-dejada-merida",
    name: "Tour a Uxmal con dejada en Mérida desde Campeche",
    duration: "8–10 horas",
    priceFrom: "Desde $1,800 MXN",
    summary:
      "Visita a Uxmal (sitio Premium de la región Puuc) con opción de quedarse en Mérida.",
    description:
      "Sal desde Campeche hacia Uxmal, uno de los sitios premium de la región Puuc, y al finalizar el recorrido continúa hacia Mérida para quedarte allí. Ideal si tu itinerario conecta Campeche con la capital yucateca.",
    image: "/placeholder-tour.svg",
    imageAlt: "Pirámide del Adivino en Uxmal",
    prices: [
      "Adulto: desde $1,800 MXN / $95 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye dejada en Mérida (sin regreso a Campeche)",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Campeche",
      "Traslado y visita a Uxmal",
      "Tiempo libre / comida según paquete",
      "Continuación del viaje hacia Mérida",
      "Dejada en hotel o punto acordado en Mérida",
    ],
    includes: [
      "Transporte Campeche – Uxmal – Mérida",
      "Entrada a Uxmal (según paquete)",
      "Guía o asistencia",
      "Asistencia CAREK",
    ],
    excludes: [
      "Hospedaje en Mérida",
      "Alimentos y bebidas",
      "Propinas",
      "Regreso a Campeche",
    ],
    recommendations: [
      "Ten listo tu equipaje si no regresas a Campeche",
      "Confirma dirección exacta de dejada en Mérida",
      "Ropa cómoda y bloqueador para Uxmal",
      "Agua y snacks para el trayecto",
    ],
    important: [
      "Este tour termina en Mérida (one-way)",
      "Coordina check-in de hotel en Mérida con anticipación",
      "Reservar con 48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "peten-rio-bec-2-dias",
    name: "Tour Estilo Petén y Río Bec (2 días)",
    duration: "2 días",
    priceFrom: "Desde $4,500 MXN",
    summary:
      "Tour de 2 días a Chicanná, Becán, Xpujil, Calakmul y Balamkú.",
    description:
      "Circuito de 2 días por la región Río Bec y Petén campechano: Chicanná, Becán, Xpujil, Calakmul y Balamkú. Perfecto para viajeros que quieren profundizar en la arqueología del sur de Campeche sin prisas de un solo día.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zonas arqueológicas Río Bec y Calakmul",
    prices: [
      "Adulto: desde $4,500 MXN / $240 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquete 2 días / 1 noche (hospedaje según categoría)",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Día 1: salida desde Campeche, visitas a Chicanná, Becán y Xpujil, pernocta en la zona",
      "Día 2: Calakmul y Balamkú, regreso a Campeche",
      "Comidas y horarios exactos se confirman al cotizar",
    ],
    includes: [
      "Transporte durante el circuito",
      "1 noche de hospedaje (según paquete)",
      "Entradas a zonas arqueológicas (según paquete)",
      "Guía o asistencia",
      "Asistencia CAREK",
    ],
    excludes: [
      "Algunas comidas no listadas en el paquete",
      "Propinas",
      "Gastos personales",
      "Actividades opcionales",
    ],
    recommendations: [
      "Equipaje ligero para 2 días",
      "Repelente, bloqueador y ropa de selva",
      "Buen estado físico y espíritu aventurero",
      "Documentos de identificación",
    ],
    important: [
      "Itinerario sujeto a clima y logística local",
      "Hospedaje en zona con servicios limitados",
      "Reservar con varios días de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "edzna-santa-rosa-xtampak",
    name: "Tour Edzná y Santa Rosa Xtampak",
    duration: "8–10 horas",
    priceFrom: "Desde $1,700 MXN",
    summary:
      "Visita a dos grandes capitales regionales: Edzná y Santa Rosa Xtampak.",
    description:
      "Combina dos grandes capitales regionales mayas: Edzná y Santa Rosa Xtampak. Un día de arqueología campechana con menos multitudes, ideal para viajeros que buscan sitios con gran valor histórico y arquitectónico.",
    image: "/placeholder-tour.svg",
    imageAlt: "Edzná y Santa Rosa Xtampak",
    prices: [
      "Adulto: desde $1,700 MXN / $90 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo desde Campeche",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Campeche",
      "Visita a Edzná",
      "Traslado a Santa Rosa Xtampak",
      "Recorrido por el sitio",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo",
      "Guía o asistencia",
      "Entradas a ambos sitios (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
      "Extras no listados",
    ],
    recommendations: [
      "Ropa cómoda, gorra y bloqueador",
      "Agua abundante y snacks",
      "Zapatos cerrados para terreno irregular",
      "Repelente recomendado",
    ],
    important: [
      "Santa Rosa Xtampak puede tener acceso más rústico",
      "Orden de visitas sujeto a logística",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "palenque-desde-campeche",
    name: "Tour a Palenque desde Campeche",
    duration: "12–14 horas",
    priceFrom: "Desde $2,600 MXN",
    summary:
      "Recorrido por la antigua ciudad de Palenque, una de las grandes capitales del periodo Clásico Maya.",
    description:
      "Viaje de día completo desde Campeche hacia Palenque, Chiapas: una de las grandes capitales del Clásico Maya, envuelta en selva y famosa por el Templo de las Inscripciones y el Palacio. Experiencia intensa de traslado y arqueología de primer nivel.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zona arqueológica de Palenque",
    prices: [
      "Adulto: desde $2,600 MXN / $140 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo con transportación larga",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida muy temprana desde Campeche",
      "Traslado hacia Palenque, Chiapas",
      "Visita a la zona arqueológica de Palenque",
      "Tiempo libre / comida",
      "Regreso a Campeche",
    ],
    includes: [
      "Transporte redondo Campeche – Palenque",
      "Guía o asistencia",
      "Entrada a Palenque (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Museo de sitio u opcionales no listados",
      "Hospedaje",
    ],
    recommendations: [
      "Día muy largo: descansa bien la noche anterior",
      "Ropa ligera, repelente y zapatos para selva",
      "Agua, snacks y bloqueador",
      "Documentos por cruce de estados",
    ],
    important: [
      "Muchas horas de camino de ida y vuelta",
      "Clima húmedo y caluroso en Palenque",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const chiapasTours: DetailedTour[] = [
  {
    id: "canon-del-sumidero",
    name: "Tour Cañón del Sumidero",
    duration: "4–6 horas",
    priceFrom: "Desde $900 MXN",
    summary:
      "Paseo en lancha por el imponente Cañón del Sumidero, con paredes de hasta 1,000 m y fauna del río Grijalva.",
    description:
      "Navega el río Grijalva entre las paredes del Cañón del Sumidero, uno de los paisajes más icónicos de Chiapas. Observa cascadas, cuevas y fauna silvestre mientras las formaciones rocosas se elevan cientos de metros. Ideal como primera experiencia al llegar a Tuxtla Gutiérrez o Chiapa de Corzo.",
    image: "/placeholder-tour.svg",
    imageAlt: "Cañón del Sumidero en Chiapas",
    prices: [
      "Adulto: desde $900 MXN / $50 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel o punto de encuentro (Tuxtla / Chiapa de Corzo)",
      "Embarque en el muelle de Chiapa de Corzo",
      "Paseo en lancha por el Cañón del Sumidero",
      "Paradas fotográficas y avistamiento de fauna",
      "Regreso al muelle y traslado de regreso",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Paseo en lancha por el cañón",
      "Chaleco salvavidas",
      "Guía o asistencia",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Entradas a miradores no listados",
      "Fotos profesionales",
    ],
    recommendations: [
      "Ropa cómoda y calzado cerrado",
      "Bloqueador, gorra y lentes de sol",
      "Llevar agua y efectivo",
      "Cámara con buena batería",
    ],
    important: [
      "Salidas sujetas a nivel del río y clima",
      "El paseo en lancha puede mojar: protege electrónicos",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "agua-azul-misol-ha",
    name: "Tour Cascadas de Agua Azul y Misol-Ha",
    duration: "10–12 horas",
    priceFrom: "Desde $1,600 MXN",
    summary:
      "Cascadas turquesas de Agua Azul y la imponente caída de Misol-Ha en un día de naturaleza chiapaneca.",
    description:
      "Descubre dos de las cascadas más famosas de Chiapas: Agua Azul, con sus pozas de color turquesa, y Misol-Ha, una caída de agua que forma una cortina perfecta para fotos. Un día completo de naturaleza, nado (cuando las condiciones lo permiten) y paisaje de selva.",
    image: "/placeholder-tour.svg",
    imageAlt: "Cascadas de Agua Azul en Chiapas",
    prices: [
      "Adulto: desde $1,600 MXN / $85 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas desde Palenque o puntos acordados",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida matutina desde hotel o punto de encuentro",
      "Visita a las cascadas de Agua Azul",
      "Tiempo para caminar, fotos y nado (si es seguro)",
      "Visita a Misol-Ha",
      "Tiempo libre / comida y regreso",
    ],
    includes: [
      "Transporte redondo",
      "Guía o conductor-guía",
      "Entradas a cascadas (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Lockers y extras en los parques",
      "Toallas",
    ],
    recommendations: [
      "Traje de baño, toalla y muda de ropa",
      "Zapatos antideslizantes para rocas mojadas",
      "Bloqueador y repelente biodegradables",
      "Efectivo para comida local",
    ],
    important: [
      "El color y caudal de Agua Azul varían con la temporada de lluvias",
      "Nado sujeto a seguridad y normativa del día",
      "Camina con precaución en zonas resbalosas",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "palenque-chiapas",
    name: "Tour Zona Arqueológica de Palenque",
    duration: "4–6 horas",
    priceFrom: "Desde $1,100 MXN",
    summary:
      "Recorre la antigua ciudad maya de Palenque, una de las grandes capitales del periodo Clásico, envuelta en selva.",
    description:
      "Explora Palenque, una de las joyas del Clásico Maya: el Templo de las Inscripciones, el Palacio y las estructuras envueltas en vegetación. Combina historia, arquitectura y selva en una experiencia imprescindible del norte de Chiapas.",
    image: "/placeholder-tour.svg",
    imageAlt: "Zona arqueológica de Palenque",
    prices: [
      "Adulto: desde $1,100 MXN / $60 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Opciones con guía especializado bajo cotización",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel de Palenque o punto de encuentro",
      "Ingreso a la zona arqueológica",
      "Recorrido por templos y plazas principales",
      "Tiempo libre para fotos",
      "Opcional: museo de sitio (según paquete)",
      "Regreso al hotel",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Entrada a la zona arqueológica (según paquete)",
      "Guía o asistencia",
      "Asistencia CAREK",
    ],
    excludes: [
      "Entrada al museo de sitio (si no va en el paquete)",
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
    ],
    recommendations: [
      "Ropa ligera, repelente y zapatos cerrados",
      "Bloqueador, gorra y mucha agua",
      "Buen estado físico para subidas y escalones",
      "Llevar efectivo",
    ],
    important: [
      "Clima cálido y húmedo: hidrátate",
      "No se puede subir a todas las estructuras",
      "Horarios sujetos a operación del INAH",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "san-cristobal-chamula",
    name: "Tour San Cristóbal de las Casas + Chamula",
    duration: "6–8 horas",
    priceFrom: "Desde $1,200 MXN",
    summary:
      "Pueblos mágicos y cultura viva: San Cristóbal de las Casas y la comunidad indígena de San Juan Chamula.",
    description:
      "Conoce San Cristóbal de las Casas, pueblo mágico de calles empedradas y ambiente colonial en los Altos de Chiapas, y visita San Juan Chamula, donde la cosmovisión maya se vive en rituales y tradiciones únicas. Cultura, artesanía y montaña en un solo recorrido.",
    image: "/placeholder-tour.svg",
    imageAlt: "San Cristóbal de las Casas y Chamula",
    prices: [
      "Adulto: desde $1,200 MXN / $65 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Salidas desde San Cristóbal o puntos acordados",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en San Cristóbal de las Casas",
      "Recorrido por el centro histórico",
      "Visita a San Juan Chamula",
      "Tiempo para artesanías y fotos permitidas",
      "Regreso a San Cristóbal",
    ],
    includes: [
      "Transporte a comunidades (según paquete)",
      "Guía cultural",
      "Visitas programadas",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Compras de artesanías",
      "Entradas no listadas",
    ],
    recommendations: [
      "Ropa cómoda y chamarra ligera (clima de montaña)",
      "Respeto absoluto en iglesias y ceremonias",
      "Pregunta antes de fotografiar personas o templos",
      "Efectivo para mercado y artesanos",
    ],
    important: [
      "En Chamula suele estar prohibido fotografiar el interior del templo",
      "Sigue siempre las indicaciones del guía local",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "selva-lacandona",
    name: "Tour Selva Lacandona",
    duration: "10–12 horas",
    priceFrom: "Desde $2,400 MXN",
    summary:
      "Inmersión en la Selva Lacandona: biodiversidad, cultura lacandona y uno de los pulmones verdes más importantes de México.",
    description:
      "Adéntrate en la Selva Lacandona, hogar de una enorme biodiversidad y de comunidades lacandonas. Caminatas, ríos, cascadas o sitios cercanos según el paquete del día. Una experiencia de naturaleza profunda para viajeros que buscan el Chiapas más salvaje y auténtico.",
    image: "/placeholder-tour.svg",
    imageAlt: "Selva Lacandona en Chiapas",
    prices: [
      "Adulto: desde $2,400 MXN / $125 USD (ejemplo)",
      "Menor: tarifa especial y edad mínima según actividad",
      "Opciones de día completo o multi-día bajo cotización",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida temprana desde punto acordado",
      "Traslado hacia la zona lacandona",
      "Caminata o actividades en selva (según paquete)",
      "Encuentro cultural / tiempo en comunidad (si aplica)",
      "Visita a cascada o río cercano",
      "Regreso",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Guía local de selva",
      "Actividades programadas del tour",
      "Asistencia CAREK",
    ],
    excludes: [
      "Algunas comidas no listadas",
      "Propinas",
      "Hospedaje (salvo paquete multi-día)",
      "Equipo personal de camping o hiking",
    ],
    recommendations: [
      "Ropa de manga larga, zapatos de trekking y repelente",
      "Bloqueador, agua y snacks",
      "Mochila ligera y bolsa impermeable",
      "Buen estado físico moderado",
    ],
    important: [
      "Rutas sujetas a clima y permisos locales",
      "Respetar la flora, fauna y comunidades",
      "No apto para movilidad reducida severa sin aviso previo",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const holboxTours: DetailedTour[] = [
  {
    id: "clasico-tres-islas-holbox",
    name: "Tour Clásico a Tres Islas Holbox",
    duration: "4–6 horas",
    priceFrom: "Desde $1,200 MXN",
    summary:
      "Visita a la Isla Pájaros (más de 140 especies de aves), Isla Pasión (marco romántico perfecto) y el ojo de agua Yalahau.",
    description:
      "El clásico de Holbox: recorre en lancha la Isla Pájaros, santuario con más de 140 especies de aves; Isla Pasión, un rincón ideal para fotos y romance; y el ojo de agua Yalahau, manantial de agua dulce en medio de la naturaleza. Una forma perfecta de conocer los alrededores de la isla en un solo día.",
    image: "/placeholder-tour.svg",
    imageAlt: "Tour a las tres islas de Holbox",
    prices: [
      "Adulto: desde $1,200 MXN / $65 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Encuentro en muelle o punto de embarque en Holbox",
      "Embarque y salida en lancha",
      "Visita a Isla Pájaros (avistamiento de aves)",
      "Parada en Isla Pasión",
      "Visita al ojo de agua Yalahau",
      "Tiempo para baño / fotos y regreso a Holbox",
    ],
    includes: [
      "Paseo en lancha",
      "Capitán / guía local",
      "Chaleco salvavidas",
      "Visitas a Isla Pájaros, Isla Pasión y Yalahau",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Fotos profesionales",
      "Traslado hotel–muelle (según paquete)",
    ],
    recommendations: [
      "Traje de baño, toalla y muda de ropa",
      "Bloqueador biodegradable, gorra y lentes de sol",
      "Repelente si eres sensible a insectos",
      "Efectivo para propinas y consumos",
    ],
    important: [
      "Salidas sujetas a clima y estado del mar",
      "Respetar la fauna: no molestar aves ni hábitats",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "tiburon-ballena-holbox",
    name: "Tour Tiburón Ballena Holbox",
    duration: "5–7 horas",
    priceFrom: "Desde $2,200 MXN",
    summary:
      "Temporada: 17 de mayo al 17 de septiembre. Experiencia llena de emoción en busca de estos gentiles gigantes marinos en las cálidas aguas turquesa de Holbox.",
    description:
      "Vive una de las experiencias más emocionantes del Caribe mexicano: la búsqueda del tiburón ballena en las cálidas aguas turquesas de Holbox. Temporada del 17 de mayo al 17 de septiembre. Nado responsable junto a estos gentiles gigantes marinos, con briefing de seguridad y respeto a la normativa ambiental.",
    image: "/placeholder-tour.svg",
    imageAlt: "Nado con tiburón ballena en Holbox",
    prices: [
      "Adulto: desde $2,200 MXN / $115 USD (ejemplo)",
      "Menor: tarifa especial; edad y estatura mínimas según normativa",
      "Temporada: 17 de mayo al 17 de septiembre",
      "*Precios de ejemplo. Confirma tarifa y disponibilidad al cotizar.",
    ],
    itinerary: [
      "Encuentro matutino en Holbox o punto acordado",
      "Traslado en embarcación hacia zona de avistamiento",
      "Briefing de seguridad y reglas de nado responsable",
      "Búsqueda y nado con tiburón ballena (según avistamiento del día)",
      "Tiempo a bordo y regreso a Holbox",
    ],
    includes: [
      "Embarcación y tripulación",
      "Chaleco salvavidas y equipo básico según operador",
      "Guía / briefing de snorkel y seguridad",
      "Permisos según paquete",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas no listados",
      "Propinas",
      "Fotos y videos profesionales",
      "Equipo de snorkel premium (si no va incluido)",
    ],
    recommendations: [
      "Saber nadar es indispensable",
      "Traje de baño, toalla y bloqueador biodegradable",
      "No usar cremas grasosas antes del nado",
      "Llevar efectivo y documento de identificación",
    ],
    important: [
      "Solo en temporada: 17 de mayo al 17 de septiembre",
      "Avistamiento no garantizado al 100% (naturaleza viva)",
      "Se debe respetar distancia y reglas de nado con la especie",
      "Cupos limitados; reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export const tabascoTours: DetailedTour[] = [
  {
    id: "ruta-eden-villahermosa",
    name: "La Ruta El Edén – Villahermosa",
    duration: "4–6 horas",
    priceFrom: "Desde $900 MXN",
    summary:
      "Recorrido por las riquezas de Tabasco. Incluye visita al Parque Museo La Venta (cultura Olmeca) y el zoológico con especies de la región como el jaguar y el cocodrilo.",
    description:
      "Descubre por qué Tabasco es “El Edén de México” con un recorrido por Villahermosa centrado en el Parque Museo La Venta, museo al aire libre con los principales vestigios de la cultura olmeca, y el zoológico con especies de la región como el jaguar y el cocodrilo. Ideal para una primera aproximación a la capital tabasqueña.",
    image: "/placeholder-tour.svg",
    imageAlt: "Parque Museo La Venta en Villahermosa",
    prices: [
      "Adulto: desde $900 MXN / $50 USD (ejemplo)",
      "Menor (5-11 años): tarifa especial bajo cotización",
      "Infantes 0-4 años: consulta disponibilidad",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en hotel o punto de encuentro en Villahermosa",
      "Visita al Parque Museo La Venta (cultura olmeca)",
      "Recorrido por las cabezas colosales y estelas",
      "Visita al zoológico / área de fauna regional",
      "Tiempo libre y regreso al hotel",
    ],
    includes: [
      "Transporte redondo en Villahermosa (según paquete)",
      "Guía o asistencia",
      "Entradas a La Venta y zoológico (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
      "Extras no listados",
    ],
    recommendations: [
      "Ropa cómoda y zapatos para caminar",
      "Bloqueador, gorra y agua (clima cálido y húmedo)",
      "Repelente ligero",
      "Efectivo para consumos",
    ],
    important: [
      "Horarios sujetos a operación de museos y parques",
      "Mucho sol y humedad: hidrátate",
      "Reservar con 24–48 hrs de anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "ruta-cacao-villahermosa",
    name: "La Ruta del Cacao en Villahermosa",
    duration: "6–8 horas",
    priceFrom: "Desde $1,400 MXN",
    summary:
      "Visita a Mazateupa (artesanías), iglesia de Cupilco (Virgen de la Asunción) y experiencia relacionada con el cacao.",
    description:
      "Parte del Circuito Agua y Chocolate: visita Mazateupa para conocer artesanías locales, la icónica iglesia de Cupilco dedicada a la Virgen de la Asunción, y una experiencia en torno al cacao, producto emblema de Tabasco. Cultura, fe y chocolate en un mismo recorrido.",
    image: "/placeholder-tour.svg",
    imageAlt: "Ruta del cacao e iglesia de Cupilco en Tabasco",
    prices: [
      "Adulto: desde $1,400 MXN / $75 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Paquetes con degustación de cacao bajo cotización",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Villahermosa",
      "Visita a Mazateupa (artesanías)",
      "Parada en la iglesia de Cupilco",
      "Experiencia / visita relacionada con el cacao",
      "Tiempo para degustación o compras y regreso",
    ],
    includes: [
      "Transporte redondo",
      "Guía o asistencia",
      "Visitas programadas de la ruta",
      "Degustación básica de cacao (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Comidas completas no listadas",
      "Propinas",
      "Compras de artesanías y chocolate",
      "Extras personales",
    ],
    recommendations: [
      "Ropa cómoda y calzado cerrado",
      "Interés por gastronomía y cultura local",
      "Efectivo para apoyar artesanos",
      "Bloqueador y agua",
    ],
    important: [
      "Orden de paradas sujeto a logística del día",
      "Algunas experiencias de cacao requieren reserva previa",
      "Reservar con anticipación",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "pantanos-de-centla",
    name: "Tour Pantanos de Centla",
    duration: "7–9 horas",
    priceFrom: "Desde $1,600 MXN",
    summary:
      "Paseo por el humedal más importante del Continente Americano: la Reserva de la Biósfera Pantanos de Centla, ideal para avistamiento de aves.",
    description:
      "Navega por la Reserva de la Biósfera Pantanos de Centla, uno de los humedales más importantes del continente americano. Ideal para amantes de la naturaleza y el avistamiento de aves, con paisajes de ríos, manglares y biodiversidad tabasqueña en estado puro.",
    image: "/placeholder-tour.svg",
    imageAlt: "Pantanos de Centla en Tabasco",
    prices: [
      "Adulto: desde $1,600 MXN / $85 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Incluye paseo en embarcación según paquete",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Pick-up en Villahermosa o punto acordado",
      "Traslado hacia la zona de los Pantanos de Centla",
      "Embarque y recorrido por el humedal",
      "Avistamiento de aves y fauna (sujeto a temporada)",
      "Tiempo para comida local y regreso",
    ],
    includes: [
      "Transporte redondo (según paquete)",
      "Paseo en embarcación",
      "Chaleco salvavidas",
      "Guía o capitán local",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Binoculares de renta (si aplica)",
      "Extras no listados",
    ],
    recommendations: [
      "Ropa cómoda de colores neutros para avistamiento",
      "Repelente, bloqueador y gorra",
      "Binoculares o cámara con zoom (opcional)",
      "Calzado que se pueda mojar",
    ],
    important: [
      "Avistamiento de fauna no garantizado al 100%",
      "Salidas sujetas a clima y nivel del agua",
      "Respetar la reserva: no molestar a la fauna",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "palenque-misolha-agua-azul-tabasco",
    name: "Tour Ruinas de Palenque + Cascadas Misol-Ha y Agua Azul",
    duration: "12–14 horas",
    priceFrom: "Desde $2,400 MXN",
    summary:
      "Visita a la zona arqueológica de Palenque, Cascada de Misol-Ha y Cascadas de Agua Azul (desde Villahermosa).",
    description:
      "Día completo desde Villahermosa hacia Chiapas: zona arqueológica de Palenque, la imponente Cascada de Misol-Ha y las pozas turquesas de Agua Azul. Cultura maya y naturaleza en un solo recorrido, ideal para viajeros con ganas de un día intenso y memorable.",
    image: "/placeholder-tour.svg",
    imageAlt: "Palenque, Misol-Ha y Agua Azul desde Tabasco",
    prices: [
      "Adulto: desde $2,400 MXN / $125 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo con salidas desde Villahermosa",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida muy temprana desde Villahermosa",
      "Visita a la zona arqueológica de Palenque",
      "Parada en Cascada de Misol-Ha",
      "Visita a Cascadas de Agua Azul",
      "Tiempo para comida / nado (si es seguro) y regreso",
    ],
    includes: [
      "Transporte redondo desde Villahermosa",
      "Guía o conductor-guía",
      "Entradas a sitios (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Almuerzo y bebidas",
      "Propinas",
      "Lockers y extras en cascadas",
      "Toallas",
    ],
    recommendations: [
      "Día muy largo: descansa la noche anterior",
      "Traje de baño, toalla y muda de ropa",
      "Repelente, bloqueador y zapatos antideslizantes",
      "Agua y snacks para el trayecto",
    ],
    important: [
      "Muchas horas de camino de ida y vuelta",
      "Color y caudal de Agua Azul varían con la temporada",
      "Nado sujeto a seguridad y normativa del día",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
  {
    id: "grutas-pueblo-magico-tabasco",
    name: "Tour Grutas y Pueblo Mágico",
    duration: "8–10 horas",
    priceFrom: "Desde $1,700 MXN",
    summary:
      "Grutas de Coconá, Cascadas de Villa Luz y el Pueblo Mágico de Tapijulapa (calles adoquinadas y gastronomía).",
    description:
      "Combina naturaleza y pueblo mágico: explora las Grutas de Coconá, visita las Cascadas de Villa Luz y pasea por Tapijulapa, con sus calles adoquinadas, ambiente serrano y gastronomía local. Una de las rutas más completas del sur de Tabasco.",
    image: "/placeholder-tour.svg",
    imageAlt: "Tapijulapa y Grutas de Coconá en Tabasco",
    prices: [
      "Adulto: desde $1,700 MXN / $90 USD (ejemplo)",
      "Menor: tarifa especial bajo cotización",
      "Día completo desde Villahermosa o puntos acordados",
      "*Precios de ejemplo. Confirma tarifa actual al cotizar.",
    ],
    itinerary: [
      "Salida desde Villahermosa",
      "Visita a las Grutas de Coconá",
      "Cascadas de Villa Luz",
      "Paseo por el Pueblo Mágico de Tapijulapa",
      "Tiempo para gastronomía local y regreso",
    ],
    includes: [
      "Transporte redondo",
      "Guía o asistencia",
      "Entradas a grutas y sitios (según paquete)",
      "Asistencia CAREK",
    ],
    excludes: [
      "Alimentos y bebidas",
      "Propinas",
      "Souvenirs",
      "Actividades extras no listadas",
    ],
    recommendations: [
      "Ropa cómoda y zapatos con buen agarre (grutas y cascadas)",
      "Linterna pequeña opcional para grutas",
      "Bloqueador, repelente y agua",
      "Efectivo para antojitos en Tapijulapa",
    ],
    important: [
      "Terreno irregular en grutas y cascadas: precaución",
      "Orden de visitas sujeto a logística",
      "Reservar con anticipación los fines de semana",
      "Información de ejemplo; se actualizará con datos oficiales",
    ],
  },
];

export function getCategoryBySlug(slug: string): TourCategory | undefined {
  return tourCategories.find((c) => c.slug === slug);
}
