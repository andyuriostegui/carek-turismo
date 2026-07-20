"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type DetailHeroGalleryProps = {
  images: string[];
  alt: string;
  /** Contenedor del hero (altura, flex, etc.). */
  className?: string;
  children: React.ReactNode;
};

/**
 * Hero full-bleed con carrusel de fotos (para páginas de detalle).
 * La primera imagen es la principal; se puede navegar con flechas y dots.
 */
export default function DetailHeroGallery({
  images,
  alt,
  className,
  children,
}: DetailHeroGalleryProps) {
  const photos = useMemo(() => images.filter(Boolean), [images]);
  const photosKey = photos.join("|");
  const [active, setActive] = useState(0);

  // Reinicia el índice cuando cambia el set de fotos (navegación entre páginas)
  const [prevKey, setPrevKey] = useState(photosKey);
  if (prevKey !== photosKey) {
    setPrevKey(photosKey);
    setActive(0);
  }

  const safeIndex =
    photos.length === 0 ? 0 : Math.min(active, photos.length - 1);
  const current = photos[safeIndex] || "";

  const goPrev = useCallback(() => {
    setActive((i) => {
      if (photos.length <= 1) return i;
      return i <= 0 ? photos.length - 1 : i - 1;
    });
  }, [photos.length]);

  const goNext = useCallback(() => {
    setActive((i) => {
      if (photos.length <= 1) return i;
      return i >= photos.length - 1 ? 0 : i + 1;
    });
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <section className={cn("relative flex items-end overflow-hidden", className)}>
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={current}
          src={current}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-800" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white sm:left-5"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white sm:right-5"
            aria-label="Foto siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="relative z-10 w-full">{children}</div>

      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-6">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a foto ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === safeIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
