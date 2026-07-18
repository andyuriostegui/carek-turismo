"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const categories = [
  { 
    name: "Playa", 
    href: "/tours/cancun", 
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" 
  },
  { 
    name: "Cenotes", 
    href: "/tours/costa-maya", 
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" 
  },
  { 
    name: "Cultura Maya", 
    href: "/tours/chichen-itza", 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80" 
  },
  { 
    name: "Aventura", 
    href: "/tours/chiapas", 
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" 
  },
  { 
    name: "Islas", 
    href: "/tours/holbox", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: i * 0.08,
    },
  }),
};

export default function Featured() {
  const [destinos, setDestinos] = useState<any[]>([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchDestinos = async () => {
      const { data, error } = await supabase
        .from("destinos")
        .select("*")
        .eq("activo", true)
        .order("orden", { ascending: true })
        .limit(6);

      if (!error && data) setDestinos(data);
    };
    fetchDestinos();
  }, []);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* ========== CATEGORÍAS CON FOTOS ========== */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            ¿Qué tipo de experiencia buscas?
          </h2>
          <p className="text-slate-500 mb-10">
            Elige según lo que más te inspire
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link href={cat.href} className="group flex flex-col items-center gap-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-md ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========== DESTINOS POPULARES CON FOTOS ========== */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Destinos populares
            </h2>
            <p className="text-slate-500">
              Los lugares más solicitados por nuestros viajeros
            </p>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-600"
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino, index) => (
            <motion.div
              key={destino.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={`/tours/${destino.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 block"
              >
                {/* Imagen de fondo */}
                <img 
                  src={getDestinationImage(destino.slug)} 
                  alt={destino.nombre}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold mb-1 drop-shadow">{destino.nombre}</h3>
                  <p className="text-sm text-white/90 line-clamp-2 drop-shadow">
                    {destino.descripcion}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Función auxiliar para asignar imagen según el destino
function getDestinationImage(slug: string) {
  const images: Record<string, string> = {
    "costa-maya":   "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",   // Cenote
    "cancun":       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",   // Playa
    "chichen-itza": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",   // Pirámide
    "cozumel":      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",      // Isla
    "merida":       "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",   // Ciudad
    "campeche":     "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80",   // Ciudad colonial (mejorada)
  };
  
  return images[slug] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";
}