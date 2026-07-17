"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default function EditarTourPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [destinos, setDestinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    slug: "",
    destino_id: "",
    descripcion_corta: "",
    descripcion_larga: "",
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

  // ✅ Cliente de Supabase creado correctamente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: destinosData } = await supabase
        .from("destinos")
        .select("id, nombre")
        .order("orden");

      if (destinosData) setDestinos(destinosData);

      const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !tour) {
        setMensaje("No se encontró el tour");
        setLoading(false);
        return;
      }

      setForm({
        titulo: tour.titulo || "",
        slug: tour.slug || "",
        destino_id: tour.destino_id || "",
        descripcion_corta: tour.descripcion_corta || "",
        descripcion_larga: tour.descripcion_larga || "",
        precio_adulto_mxn: tour.precio_adulto_mxn?.toString() || "",
        precio_adulto_usd: tour.precio_adulto_usd?.toString() || "",
        precio_menor_mxn: tour.precio_menor_mxn?.toString() || "",
        precio_menor_usd: tour.precio_menor_usd?.toString() || "",
        duracion: tour.duracion || "",
        itinerario: Array.isArray(tour.itinerario) ? tour.itinerario.join("\n") : "",
        incluye: Array.isArray(tour.incluye) ? tour.incluye.join("\n") : "",
        no_incluye: Array.isArray(tour.no_incluye) ? tour.no_incluye.join("\n") : "",
        recomendaciones: Array.isArray(tour.recomendaciones) ? tour.recomendaciones.join("\n") : "",
        importante: Array.isArray(tour.importante) ? tour.importante.join("\n") : "",
        activo: tour.activo ?? true,
        destacado: tour.destacado ?? false,
      });

      setLoading(false);
    };

    cargarDatos();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toArray = (text: string) =>
    text.split("\n").map((item) => item.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMensaje("");

    const { error } = await supabase.from("tours").update({
      titulo: form.titulo,
      slug: form.slug,
      destino_id: form.destino_id || null,
      descripcion_corta: form.descripcion_corta,
      descripcion_larga: form.descripcion_larga,
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
      updated_at: new Date().toISOString(),
    }).eq("id", id);

    setSaving(false);

    if (error) {
      setMensaje("Error: " + error.message);
      return;
    }

    setMensaje("Tour actualizado correctamente");
    setTimeout(() => {
      router.push("/admin/tours");
      router.refresh();
    }, 800);
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Cargando tour...</div>;
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