import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Inter,
  JetBrains_Mono,
  Syne
} from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const uiFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-ui",
  display: "swap"
});

const brandFont = Syne({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["700", "800"],
  display: "swap"
});

const serifFont = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap"
});

const monoFont = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pereuloq.ru"),
  title: {
    default: "Pereuloq",
    template: "%s | Pereuloq"
  },
  description: "Редакционная платформа о технологиях, культуре и интерфейсах.",
  openGraph: {
    title: "Pereuloq",
    description: "Редакционная платформа о технологиях, культуре и интерфейсах.",
    url: "https://pereuloq.ru",
    siteName: "Pereuloq",
    locale: "ru_RU",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${uiFont.variable} ${brandFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
