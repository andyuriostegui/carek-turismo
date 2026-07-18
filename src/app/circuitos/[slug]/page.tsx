import { createClient } from "@/lib/supabase/server";
import { whatsappUrl } from "@/lib/contact";
import { notFound } from "next/navigation";

export default async function CircuitoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: circuito, error } = await supabase
    .from("circuitos")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error || !circuito) notFound();

  const wa = whatsappUrl(
    `Hola CAREK, me interesa el circuito "${circuito.titulo}". ¿Me pueden cotizar?`,
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] bg-slate-900 text-white flex items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{circuito.titulo}</h1>
          <p className="text-xl text-white/80">{circuito.duracion}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose max-w-none">
          <p className="text-lg">{circuito.descripcion_larga}</p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-center"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}