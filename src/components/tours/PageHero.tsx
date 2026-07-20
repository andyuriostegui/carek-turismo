import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Breadcrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  align?: "center" | "left";
  size?: "default" | "compact";
};

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  className,
  align = "center",
  size = "default",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-[#0f172a] text-white overflow-hidden",
        size === "default" ? "pt-28 pb-16 sm:pt-32 sm:pb-20" : "pt-28 pb-12 sm:pt-32 sm:pb-14",
        className,
      )}
    >
      {/* Acentos decorativos sutiles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary-700/10 blur-3xl" />
      </div>

      <div
        className={cn(
          "relative z-10 max-w-7xl mx-auto px-6",
          align === "center" && "text-center",
        )}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Miga de pan"
            className={cn(
              "mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60",
              align === "center" && "justify-center",
            )}
          >
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight size={14} className="text-white/30 shrink-0" />
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-white/90" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        <h1
          className={cn(
            "font-bold tracking-tight text-white",
            size === "default"
              ? "text-4xl sm:text-5xl md:text-6xl"
              : "text-3xl sm:text-4xl md:text-5xl",
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              "mt-4 sm:mt-5 text-white/70 text-base sm:text-lg leading-relaxed",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
