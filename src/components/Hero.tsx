"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "tours", label: "Tours" },
  { id: "circuitos", label: "Circuitos" },
  { id: "traslados", label: "Traslados" },
];

const popularDestinations = [
  "Costa Maya",
  "Cancún",
  "Chichén Itzá",
  "Holbox",
];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("tours");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.push(`/${category}${qs ? `?${qs}` : ""}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ========== VIDEO DE FONDO ========== */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* ========== OVERLAY OSCURO ========== */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* ========== CONTENIDO ========== */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        
        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-white/80 text-sm font-medium tracking-wide mb-5"
        >
          <MapPin size={16} className="text-teal-300" />
          Explora destinos únicos con CAREK
        </motion.p>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5"
        >
          Descubre tu próxima
          <span className="block text-teal-300">aventura inolvidable</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10"
        >
          Tours, circuitos y traslados pensados para que viajes sin
          preocupaciones. Encuentra tu experiencia ideal.
        </motion.p>

        {/* Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-5"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-900/30"
                  : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Barra de búsqueda */}
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          onSubmit={handleSearch}
          className="mx-auto max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full shadow-2xl shadow-black/20 p-2 sm:p-1.5 flex flex-col sm:flex-row gap-2 sm:gap-0"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-2">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿A dónde quieres ir? Cancún, Bacalar, Holbox..."
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 outline-none text-sm sm:text-base"
              aria-label="Buscar destino"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 text-white font-semibold px-8 py-3.5 sm:py-3 rounded-xl sm:rounded-full transition-colors shrink-0"
          >
            Buscar
          </button>
        </motion.form>

        {/* Sugerencias */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/70"
        >
          <span className="text-white/50">Popular:</span>
          {popularDestinations.map((place) => (
            <button
              key={place}
              type="button"
              onClick={() => {
                setQuery(place);
                router.push(`/tours?q=${encodeURIComponent(place)}`);
              }}
              className="hover:text-teal-300 underline-offset-4 hover:underline transition-colors"
            >
              {place}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}