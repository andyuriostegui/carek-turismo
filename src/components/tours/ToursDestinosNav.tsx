import Link from "next/link";
import { cn } from "@/lib/utils";

export type DestinoTab = {
  slug: string;
  label: string;
};

type ToursDestinosNavProps = {
  destinos: DestinoTab[];
  /** Slug del destino activo; omitir o "todos" en la página principal. */
  activeSlug?: string;
};

/**
 * Sub-navbar sticky de destinos (mismo patrón que traslados / circuitos).
 * Enlace a /tours o a /tours/[slug].
 */
export default function ToursDestinosNav({
  destinos,
  activeSlug,
}: ToursDestinosNavProps) {
  const isTodos = !activeSlug || activeSlug === "todos";

  return (
    <nav
      aria-label="Filtrar tours por destino"
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/5 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none sm:gap-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="tablist"
        >
          <Link
            href="/tours#destinos"
            role="tab"
            aria-selected={isTodos}
            scroll={false}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:px-5 sm:py-2.5 sm:text-sm",
              isTodos
                ? "border-[#0f172a] bg-[#0f172a] text-white shadow-md shadow-slate-900/15"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-800",
            )}
          >
            Todos los destinos
          </Link>

          {destinos.map((destino) => {
            const active = destino.slug === activeSlug;
            return (
              <Link
                key={destino.slug}
                href={`/tours/${destino.slug}#tours`}
                role="tab"
                aria-selected={active}
                scroll={false}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:px-5 sm:py-2.5 sm:text-sm",
                  active
                    ? "border-[#0f172a] bg-[#0f172a] text-white shadow-md shadow-slate-900/15"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-800",
                )}
              >
                {destino.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
