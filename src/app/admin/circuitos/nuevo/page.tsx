"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function NuevoCircuitoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descripcion_corta: "",
    descripcion_larga: "",
    duracion: "",
    precio_desde_mxn: "",
    precio_desde_usd: "",
    incluye: "",
    itinerario: "",
    activo: true,
    destacado: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titulo = e.target.value;
    const slug = titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setForm((prev) => ({ ...prev, titulo, slug }));
  };

  const toArray = (text: string) =>
    text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    const supabase = createClient();
    const { error } = await supabase.from("circuitos").insert({
      titulo: form.titulo,
      slug: form.slug,
      descripcion_corta: form.descripcion_corta,
      descripcion_larga: form.descripcion_larga,
      duracion: form.duracion,
      precio_desde_mxn: form.precio_desde_mxn ? Number(form.precio_desde_mxn) : null,
      precio_desde_usd: form.precio_desde_usd ? Number(form.precio_desde_usd) : null,
      incluye: toArray(form.incluye),
      itinerario: toArray(form.itinerario),
      activo: form.activo,
      destacado: form.destacado,
    });

    setLoading(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Circuito creado correctamente");
    setTimeout(() => {
      router.push("/admin/circuitos");
      router.refresh();
    }, 800);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/circuitos" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Volver a circuitos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nuevo Circuito</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleTituloChange}
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción corta</label>
            <textarea
              name="descripcion_corta"
              value={form.descripcion_corta}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción larga</label>
            <textarea
              name="descripcion_larga"
              value={form.descripcion_larga}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duración</label>
              <input
                type="text"
                name="duracion"
                value={form.duracion}
                onChange={handleChange}
                placeholder="Ej: 8 días 7 noches"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Incluye <span className="text-gray-400">(uno por línea)</span>
            </label>
            <textarea
              name="incluye"
              value={form.incluye}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-mono text-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Itinerario <span className="text-gray-400">(uno por línea)</span>
            </label>
            <textarea
              name="itinerario"
              value={form.itinerario}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-mono text-sm outline-none resize-none"
            />
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Activo</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Destacado</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Crear Circuito"}
          </button>
          <Link
            href="/admin/circuitos"
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition"
          >
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