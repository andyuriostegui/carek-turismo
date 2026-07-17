import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Tour } from "@/data/tours";

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-md shadow-slate-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      {/* Imagen */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/50 via-transparent to-transparent" />

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#0f172a] text-xs font-semibold px-3 py-1.5 shadow-sm">
          <Clock size={13} className="text-teal-700" />
          {tour.duration}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight mb-2">
          {tour.name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
          {tour.description}
        </p>

        <div className="mt-auto pt-1">
          <Link
            href={tour.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] hover:bg-teal-800 text-white px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            Más información
            <ArrowRight size={16} className="shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
