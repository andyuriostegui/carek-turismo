"use client";

import { useCallback, useState } from "react";
import type { Circuito } from "@/data/circuitos";
import ExpandableCircuitoCard from "./ExpandableCircuitoCard";

type ExpandableCircuitoGridProps = {
  circuitos: Circuito[];
};

export default function ExpandableCircuitoGrid({
  circuitos,
}: ExpandableCircuitoGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-start">
      {circuitos.map((circuito) => (
        <ExpandableCircuitoCard
          key={circuito.id}
          circuito={circuito}
          isExpanded={expandedId === circuito.id}
          onToggle={() => handleToggle(circuito.id)}
        />
      ))}
    </div>
  );
}
