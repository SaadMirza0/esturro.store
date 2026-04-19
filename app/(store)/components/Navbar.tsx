"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SignatureNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Store', href: '/store' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-[100] px-6 md:px-16 py-5 bg-[#1C1C19]/90 backdrop-blur-xl border-b border-white/[0.03]"
    >
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">

        {/* --- LEFT: LOGO (High Visibility) --- */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="relative h-12 w-32 transition-transform duration-500 hover:scale-105 active:scale-95">
            <img
              src="https://unsplash.com" // Use your logo from the PDF here
              alt="Esturro Atelier"
              className="w-full h-full object-contain object-left brightness-0 invert"
            />
          </Link>
        </div>

        {/* --- CENTER: NAVIGATION (The Modern Atelier Voice) --- */}
        <div className="hidden lg:flex items-center gap-14">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#FCF9F4]/70 hover:text-[#D4AF77] transition-all relative group"
            >
              {link.name}
              {/* Architectural Underline */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D4AF77] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* --- RIGHT: UTILITY (Search) --- */}
        <div className="flex-1 flex justify-end items-center gap-8">
          <button className="group flex items-center gap-3 text-[#FCF9F4]/70 hover:text-[#D4AF77] transition-all">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold hidden md:block">Search</span>
            <span className="material-symbols-outlined text-[20px] font-light">search</span>
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-[#FCF9F4]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1px] bg-current"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[1px] bg-current"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1px] bg-current"
              />
            </div>
          </button>
        </div>
      </div>

      {/* --- MOBILE FULLSCREEN OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1C1C19] z-[-1] flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#FCF9F4] text-5xl font-serif italic hover:text-[#D4AF77] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default SignatureNav;
