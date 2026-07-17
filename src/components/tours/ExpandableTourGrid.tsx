"use client";

import { useCallback, useState } from "react";
import type { DetailedTour } from "@/data/tours";
import ExpandableTourCard from "./ExpandableTourCard";

type ExpandableTourGridProps = {
  tours: DetailedTour[];
};

export default function ExpandableTourGrid({ tours }: ExpandableTourGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-start">
      {tours.map((tour) => (
        <ExpandableTourCard
          key={tour.id}
          tour={tour}
          isExpanded={expandedId === tour.id}
          onToggle={() => handleToggle(tour.id)}
        />
      ))}
    </div>
  );
}
