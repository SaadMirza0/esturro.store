import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Manrope, Newsreader } from 'next/font/google';
import "./globals.css";
import TopSticky from "../(store)/components/TopSticky";
import Navbar from "../(store)/components/Navbar";
import Footer from "../(store)/components/Footer";
import WhatsAppButton from "../(store)/components/WhatsappButton"

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://estorro.store'), 
  title: {
    default: "Estorro | Premium Modern Atelier & Menswear Pakistan",
    template: "%s | Eustorro Atelier"
  },
  description: "Estorro is a modern clothing atelier crafting premium cotton shirts and architectural silhouettes for the modern man. Experience luxury craftsmanship in Pakistan.",
  keywords: ["Premium Shirts Pakistan", "Mens Fashion Islamabad", "Modern Atelier", "Cotton T-Shirts for Men", "Luxury Menswear Pakistan", "Eustorro Shirts"],
  authors: [{ name: "Estorro Team" }],
  creator: "Estorro",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://eustorro.store",
    title: "Eustorro | Premium Modern & Menswear",
    description: "Architectural precision in every stitch. Discover the SS26 collection of premium men's shirts.",
    siteName: "Eustorro",
    images: [{
      url: "/og-image.jpg", 
      width: 1200,
      height: 630,
      alt: "Estorro Collection",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estorro | Modern Menswear",
    description: "Premium cotton shirts crafted with architectural precision.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FCF9F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#FCF9F4] text-[#1C1C19] antialiased flex flex-col font-manrope">
        <Analytics />
       
        <header>
          <TopSticky />
          <Navbar />
        </header>
  
        <main className="flex-grow">
          {children}
        </main>

        <WhatsAppButton/>
        <Footer />
      </body>
    </html>
  );
}

