import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car } from "lucide-react";
import type { TrasladoZone } from "@/data/traslados";

type TrasladoZoneCardProps = {
  zone: TrasladoZone;
};

export default function TrasladoZoneCard({ zone }: TrasladoZoneCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-md shadow-slate-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80">
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
        <Image
          src={zone.image}
          alt={zone.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1.5 shadow-sm">
          <Car size={13} className="text-teal-700" />
          Traslado privado
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
          {zone.name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {zone.description}
        </p>

        <ul className="flex flex-wrap gap-2 mb-5">
          {zone.highlights.map((item) => (
            <li
              key={item}
              className="rounded-full bg-teal-50 text-teal-900 text-xs font-medium px-2.5 py-1 border border-teal-100"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Link
            href={`/traslados?region=${zone.id === "cancun-riviera" ? "cancun" : zone.id}#rutas`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-teal-900 text-white px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Solicitar este traslado
            <ArrowRight size={16} className="shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
