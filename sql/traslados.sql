-- =============================================================================
-- CAREK Turismo — Tabla `traslados` + datos de ejemplo
-- Ejecutar en Supabase SQL Editor
-- =============================================================================

-- 1) Crear tabla (si aún no existe)
create table if not exists public.traslados (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  zona text not null,
  titulo text not null,
  descripcion text,
  descripcion_larga text,
  imagen_url text,
  precio_desde_usd numeric(10, 2),
  precio_desde_mxn numeric(12, 2),
  incluye text[] default '{}',
  valores jsonb default '[]'::jsonb,
  vehiculos jsonb default '[]'::jsonb,
  bodas_grupos text,
  precios jsonb default '[]'::jsonb,
  activo boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Si la tabla ya existía con columnas mínimas, añade las nuevas
alter table public.traslados add column if not exists slug text;
alter table public.traslados add column if not exists descripcion_larga text;
alter table public.traslados add column if not exists imagen_url text;
alter table public.traslados add column if not exists incluye text[] default '{}';
alter table public.traslados add column if not exists valores jsonb default '[]'::jsonb;
alter table public.traslados add column if not exists vehiculos jsonb default '[]'::jsonb;
alter table public.traslados add column if not exists bodas_grupos text;
alter table public.traslados add column if not exists precios jsonb default '[]'::jsonb;
alter table public.traslados add column if not exists orden integer default 0;
alter table public.traslados add column if not exists activo boolean default true;

-- Índice útil para listados
create index if not exists traslados_activo_orden_idx
  on public.traslados (activo, orden);

create index if not exists traslados_zona_idx
  on public.traslados (zona);

-- 3) RLS de lectura pública (ajusta policies de escritura en admin)
alter table public.traslados enable row level security;

drop policy if exists "traslados_public_read" on public.traslados;
create policy "traslados_public_read"
  on public.traslados
  for select
  using (activo = true);

-- =============================================================================
-- 4) INSERT de ejemplo — 5 traslados
--    Usa ON CONFLICT para poder re-ejecutar el script de forma segura
-- =============================================================================

insert into public.traslados (
  slug,
  zona,
  titulo,
  descripcion,
  descripcion_larga,
  imagen_url,
  precio_desde_usd,
  precio_desde_mxn,
  incluye,
  valores,
  vehiculos,
  bodas_grupos,
  precios,
  activo,
  orden
) values
(
  'cancun-aeropuerto-hotel',
  'Cancún',
  'Aeropuerto Cancún → Hotel / Zona Hotelera',
  'Traslado privado desde el Aeropuerto Internacional de Cancún (CUN) hasta tu hotel en zona hotelera o centro.',
  E'Bienvenido a Cancún. Nuestro servicio es privado y directo: solo tú y tu grupo viajan en el vehículo (de 1 a 10 pasajeros, incluidos bebés).\n\nAl salir de migración y aduana, nuestro representante te espera con un cartel nominativo en el área de andenes. Te recomendamos ignorar vendedores de tiempo compartido y seguir las instrucciones de tu confirmación.\n\nIdeal para llegadas de madrugada o con familia: sin filas de taxi y con monitores de vuelo para ajustarnos a retrasos.',
  'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1400&q=80',
  45,
  850,
  array[
    'Seguro de viaje',
    'Rastreo por GPS',
    'Monitoreo de vuelo',
    'Operadores calificados',
    'Recepción con cartel nominativo',
    'Asientos para bebé sin costo adicional',
    'Agua a bordo'
  ],
  '[
    {"titulo":"Puntualidad","descripcion":"Estamos a tiempo, con monitoreo de vuelo para retrasos."},
    {"titulo":"Seguridad","descripcion":"Viajas asegurado en unidades de modelo reciente."},
    {"titulo":"Privacidad","descripcion":"Solo tu grupo en el vehículo: sin paradas de terceros."},
    {"titulo":"Respeto","descripcion":"Trato amable desde el aeropuerto hasta el lobby del hotel."}
  ]'::jsonb,
  '[
    {"nombre":"Van","descripcion":"Privado estándar para familias y grupos.","capacidad":"Hasta 10 pax","imagen":"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=900&q=80"},
    {"nombre":"Suburban","descripcion":"Privado VIP con más espacio y confort.","capacidad":"Hasta 5 pax VIP","imagen":"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"},
    {"nombre":"Limusina","descripcion":"Llegadas especiales y celebraciones.","capacidad":"Según unidad","imagen":"https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80"},
    {"nombre":"Bus","descripcion":"Grupos grandes e incentivos.","capacidad":"Grupos","imagen":"https://images.unsplash.com/photo-1544620341-11cb2cd7c626?auto=format&fit=crop&w=900&q=80"}
  ]'::jsonb,
  'Para bodas y grupos en Cancún ofrecemos flota Van, Suburban, Limusina y Bus. Servicio Privado Estándar (sin filas, directo al hotel) o Privado VIP en Suburban. Opcional: bienvenida personalizada VIP con champagne (costo adicional). Cotiza por WhatsApp con fecha, hotel y número de invitados.',
  '[
    {"concepto":"Privado Estándar (Van)","detalle":"Aeropuerto CUN – zona hotelera / centro","desde_usd":45,"desde_mxn":850},
    {"concepto":"Privado VIP (Suburban)","detalle":"Mayor espacio y confort, hasta 5 pax","desde_usd":75,"desde_mxn":1400},
    {"concepto":"Bienvenida VIP + champagne","detalle":"Recepción personalizada de alto nivel","desde_usd":null,"desde_mxn":null}
  ]'::jsonb,
  true,
  1
),
(
  'riviera-maya-aeropuerto',
  'Riviera Maya',
  'Aeropuerto Cancún → Riviera Maya',
  'Playa del Carmen, Puerto Morelos, Tulum y hoteles de la Riviera Maya con traslado privado puerta a puerta.',
  E'Traslado privado desde el Aeropuerto Internacional de Cancún hacia hoteles y residencias en Puerto Morelos, Playa del Carmen, Akumal, Tulum y puntos de la Riviera Maya.\n\nServicio directo sin escalas de terceros. Perfecto para viajeros que prefieren no esperar shuttles compartidos tras un vuelo largo. Unidades Van o Suburban según el tamaño del grupo y el equipaje.',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
  65,
  1200,
  array[
    'Seguro de viaje',
    'Rastreo por GPS',
    'Monitoreo de vuelo',
    'Operadores calificados',
    'Recepción en aeropuerto',
    'Parada técnica si el trayecto lo requiere'
  ],
  '[]'::jsonb,
  '[]'::jsonb,
  'Grupos de boda o despedidas con varios hoteles en la Riviera: coordinamos flota y horarios. Escríbenos con la lista de huéspedes y hoteles.',
  '[
    {"concepto":"CUN → Puerto Morelos / Playa del Carmen","detalle":"Privado Van","desde_usd":65,"desde_mxn":1200},
    {"concepto":"CUN → Tulum / Akumal","detalle":"Privado Van","desde_usd":95,"desde_mxn":1800},
    {"concepto":"Suburban VIP","detalle":"Cotización según destino","desde_usd":null,"desde_mxn":null}
  ]'::jsonb,
  true,
  2
),
(
  'holbox-chiquila',
  'Holbox',
  'Traslado a Holbox (vía Chiquilá)',
  'Traslado terrestre a Chiquilá y coordinación de ferry hacia Isla Holbox, con opciones puerta a puerta.',
  E'Traslado terrestre privado hacia el muelle de Chiquilá y apoyo para la conexión en ferry hacia Holbox.\n\nDiseñado para viajeros que llegan a Cancún o salen de la zona hotelera con destino a la isla. Podemos ajustar horarios al ferry y al check-in de tu hotel en Holbox. Indica si viajas con mucho equipaje o silla de bebé.',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80',
  110,
  2100,
  array[
    'Transporte terrestre privado a Chiquilá',
    'Operador calificado',
    'Seguro de viaje',
    'Coordinación de horarios de ferry',
    'Asientos para bebé bajo solicitud'
  ],
  '[]'::jsonb,
  '[]'::jsonb,
  'Grupos grandes hacia Holbox: cotizamos Van o Mini Bus + logística de ferry. Ideal para retiros y viajes de amigos.',
  '[
    {"concepto":"Cancún / zona hotelera → Chiquilá","detalle":"Privado Van (ferry no incluido salvo paquete)","desde_usd":110,"desde_mxn":2100},
    {"concepto":"Paquete con ferry","detalle":"Sujeto a tarifas del operador marítimo","desde_usd":null,"desde_mxn":null}
  ]'::jsonb,
  true,
  3
),
(
  'merida-aeropuerto-hotel',
  'Mérida',
  'Aeropuerto Mérida → Hoteles y Centro',
  'Traslados al aeropuerto de Mérida (MID), centro histórico, hoteles boutique y conexiones a cenotes o sitios cercanos.',
  E'Servicio privado en Mérida: aeropuerto MID, centro histórico, Paseo de Montejo y hoteles boutique.\n\nTambién coordinamos trayectos hacia cenotes, haciendas o conexiones con tours. Ideal para viajeros de cultura y gastronomía que valoran un conductor puntual y local.',
  'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1400&q=80',
  35,
  650,
  array[
    'Recepción en aeropuerto MID',
    'Operadores locales de confianza',
    'Seguro de viaje',
    'Unidades climatizadas',
    'Asientos para bebé bajo solicitud'
  ],
  '[]'::jsonb,
  '[]'::jsonb,
  'Grupos de boda o convenciones en Mérida: flota adaptable y horarios escalonados entre hoteles y venues.',
  '[
    {"concepto":"MID → Centro / hoteles céntricos","detalle":"Privado","desde_usd":35,"desde_mxn":650},
    {"concepto":"Traslados a cenotes / haciendas","detalle":"Cotización por ruta","desde_usd":null,"desde_mxn":null}
  ]'::jsonb,
  true,
  4
),
(
  'chetumal-bacalar',
  'Chetumal',
  'Chetumal, Bacalar y Costa Maya',
  'Servicio privado en Chetumal: aeropuerto, terminal, hoteles y enlaces hacia Bacalar o la frontera.',
  E'Traslados privados en el sur de Quintana Roo: aeropuerto de Chetumal, hoteles de la capital, Bacalar (Laguna de los Siete Colores) y conexiones hacia Costa Maya / Mahahual.\n\nPerfecto para cruceros, viajeros de frontera o quienes combinan Bacalar con la costa. Cotizamos trayectos largos con paradas si lo necesitas.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  55,
  1000,
  array[
    'Operadores calificados',
    'Seguro de viaje',
    'Unidades para trayectos largos',
    'Flexibilidad de horarios',
    'Cotización clara por ruta'
  ],
  '[]'::jsonb,
  '[]'::jsonb,
  'Grupos hacia Bacalar o Mahahual: Van o Mini Bus según pasajeros. Ideal para bodas en laguna o retiros.',
  '[
    {"concepto":"Aeropuerto / ciudad Chetumal → hotel local","detalle":"Privado","desde_usd":55,"desde_mxn":1000},
    {"concepto":"Chetumal → Bacalar","detalle":"Privado Van","desde_usd":80,"desde_mxn":1500},
    {"concepto":"Chetumal → Mahahual / Costa Maya","detalle":"Cotización según horario","desde_usd":null,"desde_mxn":null}
  ]'::jsonb,
  true,
  5
)
on conflict (slug) do update set
  zona = excluded.zona,
  titulo = excluded.titulo,
  descripcion = excluded.descripcion,
  descripcion_larga = excluded.descripcion_larga,
  imagen_url = excluded.imagen_url,
  precio_desde_usd = excluded.precio_desde_usd,
  precio_desde_mxn = excluded.precio_desde_mxn,
  incluye = excluded.incluye,
  valores = excluded.valores,
  vehiculos = excluded.vehiculos,
  bodas_grupos = excluded.bodas_grupos,
  precios = excluded.precios,
  activo = excluded.activo,
  orden = excluded.orden,
  updated_at = now();
