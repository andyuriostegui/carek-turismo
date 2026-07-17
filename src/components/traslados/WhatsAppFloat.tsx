"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/18090000000?text=" +
  encodeURIComponent(
    "Hola CAREK, quiero cotizar un traslado privado. ¿Me ayudan?",
  );

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp para cotizar un traslado"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white pl-4 pr-5 py-3.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
}
