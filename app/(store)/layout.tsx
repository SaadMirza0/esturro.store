import type { Metadata } from "next";
import { Manrope, Newsreader } from 'next/font/google';
import "./globals.css";
import TopSticky from "../(store)/components/TopSticky";
import Navbar from "../(store)/components/Navbar";
import Footer from "../(store)/components/Footer";
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
});
export const metadata: Metadata = {
  title: "Eustorro",
  description: "Eustorro Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${newsreader.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">

        <TopSticky />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
