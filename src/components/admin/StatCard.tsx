import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  accent?: "teal" | "blue" | "amber" | "violet";
};

const accents = {
  teal: {
    iconBg: "bg-teal-50 text-teal-600",
    ring: "ring-teal-100",
  },
  blue: {
    iconBg: "bg-blue-50 text-blue-600",
    ring: "ring-blue-100",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600",
    ring: "ring-amber-100",
  },
  violet: {
    iconBg: "bg-violet-50 text-violet-600",
    ring: "ring-violet-100",
  },
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "teal",
}: StatCardProps) {
  const colors = accents[accent];

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-md",
        colors.ring
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          {description ? (
            <p className="mt-1 text-xs text-slate-400">{description}</p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            colors.iconBg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
