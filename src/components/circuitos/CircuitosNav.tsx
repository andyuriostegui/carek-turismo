"use client";

import { useEffect, useRef } from "react";
import { Compass } from "lucide-react";
import type { Circuito, CircuitoCategory } from "@/data/circuitos";
import { cn } from "@/lib/utils";

type CircuitosNavProps = {
  categories: CircuitoCategory[];
  activeCategoryId: string | "todos";
  onSelectCategory: (id: string | "todos") => void;
  onSelectCircuito: (circuito: Circuito) => void;
  selectedCircuitoId?: string | null;
};

export default function CircuitosNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  onSelectCircuito,
  selectedCircuitoId,
}: CircuitosNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  const circuitos =
    activeCategoryId === "todos"
      ? categories.flatMap((c) => c.circuitos)
      : (categories.find((c) => c.id === activeCategoryId)?.circuitos ?? []);

  useEffect(() => {
    activeBtnRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedCircuitoId, activeCategoryId]);

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:inline-flex">
            <Compass size={14} className="text-primary-600" />
            Filtro
          </span>
          <button
            type="button"
            onClick={() => onSelectCategory("todos")}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
              activeCategoryId === "todos"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
                activeCategoryId === cat.id
                  ? "bg-primary-600 text-white shadow-sm shadow-primary-600/25"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
            >
              {cat.title.replace(/^Circuitos (por |de )?/i, "")}
            </button>
          ))}
        </div>

        {/* Opciones de circuitos → abren modal */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-3 pt-0.5 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="navigation"
          aria-label="Circuitos disponibles"
        >
          {circuitos.map((circuito) => {
            const isActive = selectedCircuitoId === circuito.id;
            return (
              <button
                key={circuito.id}
                ref={isActive ? activeBtnRef : undefined}
                type="button"
                onClick={() => onSelectCircuito(circuito)}
                className={cn(
                  "group flex max-w-[280px] shrink-0 items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition-all",
                  isActive
                    ? "border-primary-300 bg-primary-50 shadow-sm ring-1 ring-primary-200"
                    : "border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-50/50 hover:shadow-sm",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    isActive ? "bg-primary-600" : "bg-slate-300 group-hover:bg-primary-500",
                  )}
                />
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-xs font-semibold leading-snug sm:text-sm",
                      isActive ? "text-primary-900" : "text-slate-800",
                    )}
                  >
                    {circuito.name}
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    {circuito.duration}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
