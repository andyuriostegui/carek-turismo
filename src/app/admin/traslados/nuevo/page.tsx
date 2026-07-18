"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default function NuevoTrasladoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    zona: "",
    titulo: "",
    descripcion: "",
    precio_desde_mxn: "",
    precio_desde_usd: "",
    activo: true,
  });

  // ✅ Cliente de Supabase creado correctamente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    const { error } = await supabase.from("traslados").insert({
      zona: form.zona,
      titulo: form.titulo,
      descripcion: form.descripcion,
      precio_desde_mxn: form.precio_desde_mxn ? Number(form.precio_desde_mxn) : null,
      precio_desde_usd: form.precio_desde_usd ? Number(form.precio_desde_usd) : null,
      activo: form.activo,
    });

    setLoading(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Traslado creado correctamente");
    setTimeout(() => {
      router.push("/admin/traslados");
      router.refresh();
    }, 800);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/traslados" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Volver a traslados
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nuevo Traslado</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Zona *</label>
            <input
              type="text"
              name="zona"
              value={form.zona}
              onChange={handleChange}
              required
              placeholder="Ej: Cancún y Riviera Maya"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio desde MXN</label>
              <input
                type="number"
                name="precio_desde_mxn"
                value={form.precio_desde_mxn}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio desde USD</label>
              <input
                type="number"
                name="precio_desde_usd"
                value={form.precio_desde_usd}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} className="w-4 h-4 rounded" />
            <span className="text-sm font-medium">Activo</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Crear Traslado"}
          </button>
          <Link href="/admin/traslados" className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition">
            Cancelar
          </Link>
        </div>

        {mensaje && (
          <p className={`text-sm font-medium ${mensaje.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}