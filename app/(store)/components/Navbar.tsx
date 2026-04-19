"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SignatureNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu on route change & handle scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Store', href: '/store' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] px-4 md:px-10 py-6 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center pointer-events-auto">

        {/* --- 1. THE LOGO PLATE (Ultra Visibility) --- */}
        <Link href="/" className="group relative z-[110]">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#1C1C19] p-4 md:p-6 shadow-2xl transition-transform duration-700 group-hover:scale-105"
          >
            <img
              src="https://unsplash.com" // INSERT YOUR LOGO FROM FILE HERE
              alt="Esturro Monogram"
              className="h-8 md:h-12 w-auto invert brightness-200" // Forces high visibility on dark
            />
          </motion.div>
        </Link>

        {/* --- 2. FLOATING NAV MODULE (Desktop) --- */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`hidden lg:flex items-center gap-1 bg-[#1C1C19]/90 backdrop-blur-2xl px-2 py-2 shadow-2xl border border-white/10 transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-8 py-3 text-[10px] tracking-[0.4em] uppercase font-bold transition-all duration-500 hover:text-[#D4AF77] ${pathname === link.href ? 'text-[#D4AF77] bg-white/5' : 'text-white/60'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-white/10 mx-4" />
          <button className="px-6 text-white/40 hover:text-[#D4AF77] transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        </motion.nav>

        {/* --- 3. MOBILE ACTION HUB --- */}
        <div className="flex items-center gap-4 lg:hidden">
          <button className="w-12 h-12 bg-[#1C1C19] text-white flex items-center justify-center shadow-xl">
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-12 h-12 bg-[#D4AF77] text-[#1C1C19] flex items-center justify-center shadow-xl active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined font-bold">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* --- 4. FULL-SCREEN MOBILE ATELIER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 bg-[#1C1C19] z-[105] flex flex-col p-10 justify-between pointer-events-auto"
          >
            <div className="mt-32 space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-6xl font-serif italic text-white hover:text-[#D4AF77] transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-10 flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF77] font-bold">Esturro Archive</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Pakistan's Modern Atelier</p>
              </div>
              <span className="text-8xl font-serif text-white/5 select-none">E</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SignatureNav;
