"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { normalizeImagenes, toImagePayload } from "@/lib/images";

export default function EditarCircuitoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    descripcion_corta: "",
    descripcion_larga: "",
    imagenes: [] as string[],
    duracion: "",
    precio_desde_mxn: "",
    precio_desde_usd: "",
    incluye: "",
    itinerario: "",
    activo: true,
    destacado: false,
  });

  useEffect(() => {
    const cargar = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("circuitos")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setMensaje("No se encontró el circuito");
        setLoading(false);
        return;
      }

      setForm({
        titulo: data.titulo || "",
        slug: data.slug || "",
        descripcion_corta: data.descripcion_corta || "",
        descripcion_larga: data.descripcion_larga || "",
        imagenes: normalizeImagenes(data.imagenes, data.imagen_url),
        duracion: data.duracion || "",
        precio_desde_mxn: data.precio_desde_mxn?.toString() || "",
        precio_desde_usd: data.precio_desde_usd?.toString() || "",
        incluye: Array.isArray(data.incluye) ? data.incluye.join("\n") : "",
        itinerario: Array.isArray(data.itinerario) ? data.itinerario.join("\n") : "",
        activo: data.activo ?? true,
        destacado: data.destacado ?? false,
      });
      setLoading(false);
    };

    cargar();
  }, [id]);

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

  const toArray = (text: string) =>
    text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMensaje("");

    const supabase = createClient();
    const imagePayload = toImagePayload(form.imagenes);
    const { error } = await supabase
      .from("circuitos")
      .update({
        titulo: form.titulo,
        slug: form.slug,
        descripcion_corta: form.descripcion_corta,
        descripcion_larga: form.descripcion_larga,
        ...imagePayload,
        duracion: form.duracion,
        precio_desde_mxn: form.precio_desde_mxn ? Number(form.precio_desde_mxn) : null,
        precio_desde_usd: form.precio_desde_usd ? Number(form.precio_desde_usd) : null,
        incluye: toArray(form.incluye),
        itinerario: toArray(form.itinerario),
        activo: form.activo,
        destacado: form.destacado,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Circuito actualizado correctamente");
    setTimeout(() => {
      router.push("/admin/circuitos");
      router.refresh();
    }, 800);
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Cargando circuito...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/circuitos"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver a circuitos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar Circuito</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
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

          <ImageUpload
            folder="circuitos"
            value={form.imagenes}
            onChange={(urls) => setForm((prev) => ({ ...prev, imagenes: urls }))}
            label="Fotos del circuito"
            disabled={saving}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Descripción corta
            </label>
            <textarea
              name="descripcion_corta"
              value={form.descripcion_corta}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Descripción larga
            </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio desde MXN
              </label>
              <input
                type="number"
                name="precio_desde_mxn"
                value={form.precio_desde_mxn}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio desde USD
              </label>
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
              <input
                type="checkbox"
                name="activo"
                checked={form.activo}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium">Activo</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="destacado"
                checked={form.destacado}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium">Destacado</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <Link
            href="/admin/circuitos"
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition"
          >
            Cancelar
          </Link>
        </div>

        {mensaje && (
          <p
            className={`text-sm font-medium ${
              mensaje.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}
