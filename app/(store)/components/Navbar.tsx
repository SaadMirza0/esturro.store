"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Lucide React Icons for high-performance and visibility
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

const SignatureNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    <header className="fixed top-0 w-full z-[100] px-4 md:px-10 py-4 md:py-6 pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center pointer-events-auto">

        {/* --- 1. THE LOGO (Responsive Scaling) --- */}
        <Link href="/" className="group relative z-[110] flex items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="Esturro"
              className="h-12 md:h-24 lg:h-32 w-auto object-contain transition-transform duration-700 group-hover:scale-105 will-change-transform"
            />
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF77] transition-all duration-500 group-hover:w-full"
            />
          </motion.div>
        </Link>

        {/* --- 2. DESKTOP NAVIGATION --- */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`hidden lg:flex items-center gap-1 bg-[#1C1C19]/95 backdrop-blur-3xl px-2 py-2 shadow-2xl border border-white/10 transition-all duration-500 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}
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
            <Search size={18} strokeWidth={1.5} />
          </button>
        </motion.nav>

        {/* --- 3. MOBILE/TABLET HUB (Lucide Icons) --- */}
        <div className="flex items-center gap-2 md:gap-4 lg:hidden">
          {/* Shopping Bag Button */}
          <button className="w-10 h-10 md:w-12 md:h-12 bg-[#1C1C19] text-white flex items-center justify-center shadow-xl border border-white/5 active:scale-95 transition-transform">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF77] text-[#1C1C19] flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* --- 4. FULL-SCREEN MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#1C1C19] z-[105] flex flex-col p-8 md:p-16 justify-between pointer-events-auto"
          >
            <div className="mt-20 md:mt-32 space-y-6 md:space-y-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl md:text-7xl font-serif italic text-white hover:text-[#D4AF77] transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 flex justify-between items-end">
              <div className="space-y-1 md:space-y-2">
                <p className="text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-[#D4AF77] font-bold">Esturro Archive</p>
                <p className="text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-white/20">Pakistan's Modern Atelier</p>
              </div>
              <span className="text-6xl md:text-9xl font-serif text-white/5 select-none">E</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SignatureNav;
