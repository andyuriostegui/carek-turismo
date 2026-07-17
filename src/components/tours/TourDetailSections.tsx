import type { DetailedTour } from "@/data/tours";

type Section = {
  title: string;
  items: string[];
};

function buildSections(tour: DetailedTour): Section[] {
  return [
    { title: "Precios", items: tour.prices },
    { title: "Itinerario", items: tour.itinerary },
    { title: "Incluye", items: tour.includes },
    { title: "No incluye", items: tour.excludes },
    { title: "Recomendaciones", items: tour.recommendations },
    { title: "Importante", items: tour.important },
  ];
}

type TourDetailSectionsProps = {
  tour: DetailedTour;
};

export default function TourDetailSections({ tour }: TourDetailSectionsProps) {
  const sections = buildSections(tour);

  return (
    <div className="space-y-6">
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        {tour.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl bg-slate-50 border border-slate-100 p-4 sm:p-5"
          >
            <h4 className="text-sm font-bold uppercase tracking-wide text-teal-900 mb-3">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm text-slate-600 leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
