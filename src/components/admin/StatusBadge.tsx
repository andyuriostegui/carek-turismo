import type { AdminTourStatus } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const styles: Record<AdminTourStatus, string> = {
  activo: "bg-accent-50 text-accent-600 ring-accent-600/20",
  inactivo: "bg-slate-100 text-slate-600 ring-slate-500/20",
  borrador: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const labels: Record<AdminTourStatus, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  borrador: "Borrador",
};

export default function StatusBadge({ status }: { status: AdminTourStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
