import Link from "next/link";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

const summary = {
  rating: 4.9,
  total: 248,
  distribution: [
    { stars: 5, percent: 88 },
    { stars: 4, percent: 9 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};

const reviews = [
  {
    name: "María G.",
    initial: "M",
    color: "bg-rose-500",
    rating: 5,
    time: "hace 2 semanas",
    tour: "Tour Bacalar y Cenote",
    text: "Excelente organización de principio a fin. El guía super atento y los tiempos perfectos en la Laguna de Bacalar. Vale cada peso. Ya estamos pensando el próximo tour con CAREK.",
  },
  {
    name: "Carlos R.",
    initial: "C",
    color: "bg-primary-700",
    rating: 5,
    time: "hace 1 mes",
    tour: "Viajes a Chiapas",
    text: "El circuito por Chiapas fue increíble: Palenque, cascadas y San Cristóbal. Hotel cómodo, transporte puntual y sin sorpresas en el precio. Se nota que saben lo que hacen.",
  },
  {
    name: "Laura M.",
    initial: "L",
    color: "bg-accent-600",
    rating: 5,
    time: "hace 3 semanas",
    tour: "Traslado Cancún y Riviera Maya",
    text: "Llegamos de madrugada al aeropuerto de Cancún y el conductor ya estaba esperándonos. Aire acondicionado, agua y muy amable. Para traslados no dudo en volver a llamarles.",
  },
  {
    name: "Andrés P.",
    initial: "A",
    color: "bg-violet-600",
    rating: 5,
    time: "hace 5 días",
    tour: "Tour Chichén Itzá Todo Incluido",
    text: "Viajamos en familia con niños a Chichén Itzá y todo salió redondo. El cenote y Valladolid fueron un plus. Flexibles con los horarios y muy claros en la cotización. Recomendadísimos.",
  },
  {
    name: "Sofía L.",
    initial: "S",
    color: "bg-gold-500",
    rating: 4,
    time: "hace 2 meses",
    tour: "Tour Catamarán y Snorkel Cozumel",
    text: "Muy buena experiencia en Cozumel. El snorkel en el arrecife estuvo genial. Solo un pequeño retraso en la salida, pero lo compensaron con buena atención. Volvería a reservar.",
  },
  {
    name: "Diego H.",
    initial: "D",
    color: "bg-primary-600",
    rating: 5,
    time: "hace 1 semana",
    tour: "Tour Xcaret Plus",
    text: "Organizaron un day trip a Xcaret para 18 personas del trabajo. Coordinación impecable y precios competitivos. Profesionales de verdad.",
  },
];

function Stars({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < value
              ? "fill-gold-400 text-gold-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="relative bg-slate-50 text-slate-900 py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white text-slate-700 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 mb-4 border border-slate-200 shadow-sm">
            <BadgeCheck size={14} className="text-primary-700" />
            Opiniones de viajeros
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            La confianza se gana{" "}
            <span className="text-primary-700">viaje a viaje</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Reseñas reales de clientes que ya viajaron con nosotros. Mismo
            formato que conoces: estrellas, detalle y sin filtros de marketing.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Resumen tipo Google */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 p-6 sm:p-7">
              <p className="text-sm font-medium text-slate-500 mb-3">
                Valoración general
              </p>

              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-bold tracking-tight text-slate-900">
                  {summary.rating}
                </span>
                <div className="pb-1.5">
                  <Stars value={5} size={18} />
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Basado en{" "}
                <span className="font-semibold text-slate-700">
                  {summary.total} reseñas
                </span>
              </p>

              <div className="space-y-2.5 mb-7">
                {summary.distribution.map((row) => (
                  <div
                    key={row.stars}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-8 text-slate-600 tabular-nums">
                      {row.stars}★
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-400 tabular-nums text-xs">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-slate-900 text-white p-5">
                <p className="font-semibold mb-1">¿Ya viajaste con CAREK?</p>
                <p className="text-sm text-white/70 mb-4">
                  Tu opinión ayuda a otros viajeros a decidir con confianza.
                </p>
                <Link
                  href="/#contacto"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-900 font-semibold px-4 py-3 text-sm hover:bg-primary-50 transition-colors"
                >
                  Contar mi experiencia
                  <ArrowRight size={16} />
                </Link>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                Estilo de reseñas tipo Google para familiaridad. Cuando tengas
                perfil de Google Business, se puede enlazar o sincronizar las
                opiniones reales.
              </p>
            </div>
          </aside>

          {/* Grid de reseñas */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {reviews.map((review) => (
              <article
                key={`${review.name}-${review.time}`}
                className="flex flex-col rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${review.color}`}
                    aria-hidden
                  >
                    {review.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {review.name}
                      </h3>
                      <BadgeCheck
                        size={15}
                        className="text-primary-600 shrink-0"
                        aria-label="Cliente verificado"
                      />
                    </div>
                    <p className="text-xs text-slate-400">{review.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Stars value={review.rating} size={14} />
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5 truncate">
                    {review.tour}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
