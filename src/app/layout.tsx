import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://carek-turismo.vercel.app";

const siteTitle = "Carek CRT | Operador Turístico — Tours, Circuitos y Traslados";
const siteDescription =
  "Operador turístico en la Península de Yucatán y el Caribe mexicano. Tours, circuitos y traslados privados con atención cercana. Cotiza tu próxima aventura con Carek CRT.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Carek",
    "Carek CRT",
    "operador turístico",
    "tours Cancún",
    "tours Yucatán",
    "circuitos México",
    "traslados privados",
    "Chichén Itzá",
    "Cozumel",
    "Mérida",
  ],
  authors: [{ name: "Carek CRT" }],
  creator: "Carek CRT",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Carek CRT — Operador Turístico",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 2500,
        height: 2000,
        alt: "Carek CRT Operador Turístico — logo oficial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
