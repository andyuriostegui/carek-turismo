"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Destacados", href: "/#destacados" },
  { name: "Tours", href: "/tours" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Traslados", href: "/traslados" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center shrink-0"
          aria-label="Carek CRT — Inicio"
        >
          <Image
            src="/logo.png"
            alt="Carek CRT Operador Turístico"
            width={280}
            height={224}
            className="h-16 w-auto object-contain sm:h-20 md:h-24 drop-shadow-md"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/#contacto"
            className="bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition"
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md absolute top-full left-0 w-full py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="bg-white text-slate-900 text-center py-3 rounded-full font-semibold mt-2"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}