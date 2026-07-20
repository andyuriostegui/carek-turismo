-- =============================================================================
-- CAREK Turismo — Galería de imágenes (tours, circuitos, traslados)
-- Ejecutar en Supabase SQL Editor
--
-- Añade columna `imagenes` (jsonb array de URLs) y migra datos de `imagen_url`.
-- Mantiene `imagen_url` como espejo de la primera imagen (compatibilidad).
-- =============================================================================

-- 1) Columna imagenes en las tres tablas
alter table public.tours
  add column if not exists imagenes jsonb not null default '[]'::jsonb;

alter table public.circuitos
  add column if not exists imagenes jsonb not null default '[]'::jsonb;

alter table public.traslados
  add column if not exists imagenes jsonb not null default '[]'::jsonb;

-- 2) Migrar imagen_url existente → imagenes (solo si la galería está vacía)
update public.tours
set imagenes = jsonb_build_array(imagen_url)
where imagen_url is not null
  and imagen_url <> ''
  and (imagenes is null or imagenes = '[]'::jsonb);

update public.circuitos
set imagenes = jsonb_build_array(imagen_url)
where imagen_url is not null
  and imagen_url <> ''
  and (imagenes is null or imagenes = '[]'::jsonb);

update public.traslados
set imagenes = jsonb_build_array(imagen_url)
where imagen_url is not null
  and imagen_url <> ''
  and (imagenes is null or imagenes = '[]'::jsonb);

-- 3) Trigger: al guardar imagenes, sincronizar imagen_url = primera foto
create or replace function public.sync_imagen_url_from_imagenes()
returns trigger
language plpgsql
as $$
begin
  if new.imagenes is not null
     and jsonb_typeof(new.imagenes) = 'array'
     and jsonb_array_length(new.imagenes) > 0 then
    new.imagen_url := new.imagenes ->> 0;
  elsif new.imagenes is not null
        and jsonb_typeof(new.imagenes) = 'array'
        and jsonb_array_length(new.imagenes) = 0 then
    -- Si vacían la galería, no forzamos null si el cliente aún manda imagen_url
    if new.imagen_url is null or new.imagen_url = '' then
      new.imagen_url := null;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists tours_sync_imagen_url on public.tours;
create trigger tours_sync_imagen_url
  before insert or update of imagenes
  on public.tours
  for each row
  execute function public.sync_imagen_url_from_imagenes();

drop trigger if exists circuitos_sync_imagen_url on public.circuitos;
create trigger circuitos_sync_imagen_url
  before insert or update of imagenes
  on public.circuitos
  for each row
  execute function public.sync_imagen_url_from_imagenes();

drop trigger if exists traslados_sync_imagen_url on public.traslados;
create trigger traslados_sync_imagen_url
  before insert or update of imagenes
  on public.traslados
  for each row
  execute function public.sync_imagen_url_from_imagenes();
