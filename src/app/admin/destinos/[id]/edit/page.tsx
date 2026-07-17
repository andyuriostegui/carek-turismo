"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default function EditarDestinoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    slug: "",
    descripcion: "",
    orden: "0",
    activo: true,
  });

  // Creamos el cliente de Supabase aquí (más seguro)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from("destinos")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setMensaje("No se encontró el destino");
        setLoading(false);
        return;
      }

      setForm({
        nombre: data.nombre || "",
        slug: data.slug || "",
        descripcion: data.descripcion || "",
        orden: data.orden?.toString() || "0",
        activo: data.activo ?? true,
      });
      setLoading(false);
    };
    cargar();
  }, [id]);

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
    setSaving(true);
    setMensaje("");

    const { error } = await supabase
      .from("destinos")
      .update({
        nombre: form.nombre,
        slug: form.slug,
        descripcion: form.descripcion,
        orden: Number(form.orden) || 0,
        activo: form.activo,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Destino actualizado correctamente");
    setTimeout(() => {
      router.push("/admin/destinos");
      router.refresh();
    }, 800);
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Cargando destino...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/destinos" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Volver a destinos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar Destino</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-gray-50 outline-none"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Orden</label>
            <input
              type="number"
              name="orden"
              value={form.orden}
              onChange={handleChange}
              className="w-32 border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} className="w-4 h-4 rounded" />
            <span className="text-sm font-medium">Activo</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <Link href="/admin/destinos" className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition">
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