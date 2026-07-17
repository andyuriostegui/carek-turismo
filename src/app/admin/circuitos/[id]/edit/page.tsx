import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function eliminarTraslado(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const id = formData.get("id") as string;

  if (!supabase) return;

  await supabase.from("traslados").delete().eq("id", id);
  revalidatePath("/admin/traslados");
}

export default async function AdminTrasladosPage() {
  const supabase = await createClient();

  if (!supabase) {
    return <div className="p-6 text-red-600">Error al conectar con la base de datos</div>;
  }

  const { data: traslados, error } = await supabase
    .from("traslados")
    .select("*")
    .order("orden", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lista de Traslados</h1>
          <p className="text-sm text-gray-500 mt-1">
            {traslados?.length || 0} traslados registrados
          </p>
        </div>

        <Link
          href="/admin/traslados/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
        >
          + Nuevo traslado
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 font-medium text-gray-500">Zona</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Título</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Precio desde</th>
              <th className="text-left px-6 py-4 font-medium text-gray-500">Estado</th>
              <th className="text-right px-6 py-4 font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {traslados?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  No hay traslados registrados todavía.
                </td>
              </tr>
            ) : (
              traslados?.map((item: any) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.zona}</td>
                  <td className="px-6 py-4 text-gray-600">{item.titulo}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.precio_desde_usd ? `USD ${item.precio_desde_usd}` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.activo ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/traslados/${item.id}/edit`}
                        className="px-3.5 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition"
                      >
                        Editar
                      </Link>
                      <form action={eliminarTraslado}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition"
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}