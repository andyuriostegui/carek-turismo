"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { toImagePayload } from "@/lib/images";

export default function NuevoTourPage() {
  const router = useRouter();
  const [destinos, setDestinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    destino_id: "",
    descripcion_corta: "",
    descripcion_larga: "",
    imagenes: [] as string[],
    precio_adulto_mxn: "",
    precio_adulto_usd: "",
    precio_menor_mxn: "",
    precio_menor_usd: "",
    duracion: "",
    itinerario: "",
    incluye: "",
    no_incluye: "",
    recomendaciones: "",
    importante: "",
    activo: true,
    destacado: false,
  });

  useEffect(() => {
    const cargarDestinos = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("destinos")
        .select("id, nombre")
        .order("orden");
      if (data) setDestinos(data);
    };
    cargarDestinos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const imagePayload = toImagePayload(form.imagenes);
    const { error } = await supabase.from("tours").insert({
      titulo: form.titulo,
      slug: form.slug,
      destino_id: form.destino_id || null,
      descripcion_corta: form.descripcion_corta,
      descripcion_larga: form.descripcion_larga,
      ...imagePayload,
      precio_adulto_mxn: form.precio_adulto_mxn ? Number(form.precio_adulto_mxn) : null,
      precio_adulto_usd: form.precio_adulto_usd ? Number(form.precio_adulto_usd) : null,
      precio_menor_mxn: form.precio_menor_mxn ? Number(form.precio_menor_mxn) : null,
      precio_menor_usd: form.precio_menor_usd ? Number(form.precio_menor_usd) : null,
      duracion: form.duracion,
      itinerario: toArray(form.itinerario),
      incluye: toArray(form.incluye),
      no_incluye: toArray(form.no_incluye),
      recomendaciones: toArray(form.recomendaciones),
      importante: toArray(form.importante),
      activo: form.activo,
      destacado: form.destacado,
    });

    setLoading(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Tour creado correctamente");
    setTimeout(() => {
      router.push("/admin/tours");
      router.refresh();
    }, 800);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/tours" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← Volver a tours
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nuevo Tour</h1>
        <p className="text-gray-500 text-sm mt-1">Completa la información del tour</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Información básica</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Título del tour *
              </label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleTituloChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: Tour Bacalar y Cenote"
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Destino</label>
              <select
                name="destino_id"
                value={form.destino_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
              >
                <option value="">Selecciona un destino</option>
                {destinos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Galería de imágenes</h2>
          <ImageUpload
            folder="tours"
            value={form.imagenes}
            onChange={(urls) => setForm((prev) => ({ ...prev, imagenes: urls }))}
            label="Fotos del tour"
            disabled={loading}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Descripciones</h2>
          <div className="space-y-5">
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
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Precios y duración</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            {[
              { name: "precio_adulto_mxn", label: "Adulto MXN" },
              { name: "precio_adulto_usd", label: "Adulto USD" },
              { name: "precio_menor_mxn", label: "Menor MXN" },
              { name: "precio_menor_usd", label: "Menor USD" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duración</label>
            <input
              type="text"
              name="duracion"
              value={form.duracion}
              onChange={handleChange}
              placeholder="Ej: 7-9 horas"
              className="w-full md:w-1/2 border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Detalles del tour</h2>
          {[
            { name: "itinerario", label: "Itinerario" },
            { name: "incluye", label: "Incluye" },
            { name: "no_incluye", label: "No incluye" },
            { name: "recomendaciones", label: "Recomendaciones" },
            { name: "importante", label: "Importante" },
          ].map((field) => (
            <div key={field.name} className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {field.label} <span className="text-gray-400">(uno por línea)</span>
              </label>
              <textarea
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-mono text-sm outline-none resize-none"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado</h2>
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

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Crear Tour"}
          </button>
          <Link
            href="/admin/tours"
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
