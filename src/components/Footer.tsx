import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import {
  CAREK_EMAIL_LIST,
  CAREK_PHONE_DISPLAY,
  CAREK_PHONE_TEL,
  whatsappUrl,
} from "@/lib/contact";

const explore = [
  { name: "Inicio", href: "/" },
  { name: "Destacados", href: "/#destacados" },
  { name: "Testimonios", href: "/#testimonios" },
  { name: "Contacto", href: "/#contacto" },
];

const services = [
  { name: "Tours", href: "/tours" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Traslados", href: "/traslados" },
  { name: "Grupos y empresas", href: "/#contacto" },
];

const legal = [
  { name: "Aviso legal", href: "/aviso-legal" },
  { name: "Privacidad", href: "/privacidad" },
  { name: "Términos", href: "/terminos" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

const social: { name: string; href: string; icon: ReactNode }[] = [
  { name: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
  { name: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  {
    name: "WhatsApp",
    href: whatsappUrl("Hola CAREK, quiero información"),
    icon: <MessageCircle size={18} />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1421] text-slate-300">
      {/* CTA superior */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-1">
              ¿Listo para tu próxima salida?
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Cotización gratis en minutos. Sin compromiso.
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
            >
              Pedir cotización
            </Link>
            <a
              href={whatsappUrl("Hola CAREK, quiero cotizar")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 text-sm transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Columnas */}
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block text-2xl font-bold text-white tracking-wide mb-4">
              CAREK
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Tours, circuitos y traslados para que viajes sin complicaciones. Experiencias locales con atención cercana.
            </p>
            <div className="flex items-center gap-2">
              {social.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Explorar</h3>
            <ul className="space-y-2.5">
              {explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Servicios</h3>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">Contacto</h3>
            <ul className="space-y-3.5">
              <li>
                <a href={CAREK_PHONE_TEL} className="inline-flex items-start gap-2.5 text-sm text-slate-400 hover:text-white transition-colors">
                  <Phone size={16} className="mt-0.5 shrink-0 text-teal-400" /> {CAREK_PHONE_DISPLAY}
                </a>
              </li>
              {CAREK_EMAIL_LIST.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="inline-flex items-start gap-2.5 text-sm text-slate-400 hover:text-white transition-colors break-all">
                    <Mail size={16} className="mt-0.5 shrink-0 text-teal-400" /> {email}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal-400" />
                <span>
                  Cancún, Quintana Roo<br />
                  <span className="text-slate-500">Lun–Sáb · 8:00–20:00</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-500">© {year} CAREK Turismo. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}