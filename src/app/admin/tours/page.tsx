import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function eliminarTour(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;

  await supabase.from("tours").delete().eq("id", id);
  revalidatePath("/admin/tours");
}

export default async function AdminToursPage() {
  const { data: tours, error } = await supabase
    .from("tours")
    .select(`
      id,
      titulo,
      slug,
      duracion,
      precio_adulto_usd,
      activo,
      destacado,
      updated_at,
      destinos ( nombre )
    `)
    .order("orden", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lista de tours</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tours?.length || 0} tours registrados
          </p>
        </div>

        <Link
          href="/admin/tours/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          + Nuevo tour
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-medium text-gray-500">Nombre</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Destino</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Duración</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Precio</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Estado</th>
              <th className="text-right px-6 py-4 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tours?.map((tour: any) => (
              <tr
                key={tour.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{tour.titulo}</div>
                  {tour.destacado && (
                    <span className="text-xs text-emerald-600 font-medium">Destacado</span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {tour.destinos?.nombre || "—"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {tour.duracion || "—"}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {tour.precio_adulto_usd ? `USD ${tour.precio_adulto_usd}` : "—"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      tour.activo
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tour.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/tours/${tour.id}/edit`}
                      className="px-3.5 py-1.5 text-sm font-medium text-blue-700 
                                 bg-blue-50 hover:bg-blue-100 
                                 border border-blue-100 
                                 rounded-lg transition"
                    >
                      Editar
                    </Link>

                    <form action={eliminarTour}>
                      <input type="hidden" name="id" value={tour.id} />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 text-sm font-medium text-red-700 
                                   bg-red-50 hover:bg-red-100 
                                   border border-red-100 
                                   rounded-lg transition"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}