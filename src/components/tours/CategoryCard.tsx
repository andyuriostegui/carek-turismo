import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TourCategory } from "@/data/tours";

type CategoryCardProps = {
  category: TourCategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15">
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/45 to-[#0f172a]/10" />
      <div className="absolute inset-0 bg-[#0f172a]/0 transition-colors duration-300 group-hover:bg-[#0f172a]/15" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <p className="text-primary-300/90 text-xs font-semibold uppercase tracking-wider mb-1.5">
          Destino
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 leading-snug">
          {category.name}
        </h2>
        <Link
          href={`/tours/${category.slug}`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white text-[#0f172a] px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:bg-primary-50 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
        >
          Ver tours
          <ArrowRight size={16} className="shrink-0" />
        </Link>
      </div>
    </article>
  );
}
