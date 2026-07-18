import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Clock, MessageCircle } from "lucide-react";
import type { Circuito } from "@/data/circuitos";
import { whatsappUrl as buildWhatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ExpandableCircuitoCardProps = {
  circuito: Circuito;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function ExpandableCircuitoCard({
  circuito,
  isExpanded,
  onToggle,
}: ExpandableCircuitoCardProps) {
  const whatsappUrl = buildWhatsappUrl(
    `Hola CAREK, me interesa el circuito "${circuito.name}". ¿Me pueden dar más información y una cotización?`,
  );

  return (
    <article
      id={`circuito-${circuito.id}`}
      className={cn(
        "flex h-fit flex-col rounded-2xl overflow-hidden bg-white border shadow-md shadow-slate-100/80 transition-all duration-300",
        isExpanded
          ? "col-span-full border-teal-200 shadow-xl shadow-teal-100/60"
          : "border-slate-200/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80",
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          isExpanded &&
            "md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-slate-100",
            isExpanded
              ? "h-48 sm:h-56 md:h-full md:min-h-[240px]"
              : "h-48 sm:h-52",
          )}
        >
          <Image
            src={circuito.image}
            alt={circuito.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1.5 shadow-sm">
            <Clock size={13} className="text-teal-700" />
            {circuito.duration}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            {circuito.name}
          </h3>
          <p
            className={cn(
              "text-sm text-slate-600 leading-relaxed mb-5",
              !isExpanded && "line-clamp-2",
            )}
          >
            {circuito.summary}
          </p>

          <div className={cn("mt-auto", isExpanded && "md:max-w-xs")}>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              aria-controls={`circuito-details-${circuito.id}`}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
                isExpanded
                  ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  : "bg-slate-900 hover:bg-teal-900 text-white",
              )}
            >
              {isExpanded ? "Ocultar detalles" : "Ver detalles"}
              <ChevronDown
                size={16}
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expansión in-place */}
      <div
        id={`circuito-details-${circuito.id}`}
        role="region"
        aria-label={`Detalles de ${circuito.name}`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-5 sm:px-6 py-6 sm:py-7">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {circuito.description}
            </p>

            <section className="rounded-xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
              <h4 className="text-sm font-bold uppercase tracking-wide text-teal-900 mb-3">
                Incluye
              </h4>
              <ul className="space-y-2.5">
                {circuito.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm text-slate-600 leading-relaxed"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-700"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-3 text-sm font-semibold shadow-md shadow-emerald-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <MessageCircle size={18} className="shrink-0" />
                WhatsApp
              </a>
              <Link
                href="/#contacto"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-900 bg-white hover:bg-slate-900 hover:text-white text-slate-900 px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
