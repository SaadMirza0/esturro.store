"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignatureFooter() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const policyLinks = [
    { name: "Returns", href: "/returns" },
    { name: "Terms", href: "/terms" },
    { name: "Payments", href: "/payments" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/923010544620",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.38 8.38 0 0 1 3.8.9L22 2Z"/>
          <path d="M17 10c-1.5-1.5-3-1.5-4.5 0s-1.5 3 0 4.5" opacity="0.5"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      href: "#",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
    {
      name: "Email",
      href: "mailto:saadmirzapak@gmail.com",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-[#1C1C19] pt-32 pb-12 px-6 md:px-16 lg:px-24 text-[#FCF9F4] overflow-hidden relative border-t border-white/[0.03]">
      <div className="max-w-[1800px] mx-auto">
        
       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-start">
 
          <div className="lg:col-span-8 space-y-12">
            <Link href="/" className="inline-block group">
              <h2 className="text-6xl md:text-9xl font-serif tracking-tighter text-[#D4AF77]  transition-all duration-700">
                Esturro
              </h2>
            </Link>
           
         
            <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, color: "#D4AF77" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/20 transition-colors duration-500 flex flex-col items-center gap-3 group"
                  aria-label={social.name}
                >
                  <div className="p-4 rounded-full border border-white/5 group-hover:border-[#D4AF77]/30 group-hover:bg-white/[0.02] transition-all">
                    {social.icon}
                  </div>
                  <span className="text-[8px] tracking-[0.4em] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

  
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="text-[10px] tracking-[0.6em] uppercase font-bold text-[#D4AF77]">Explore</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-sans text-white/40 hover:text-white transition-all duration-500 uppercase tracking-widest">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] tracking-[0.6em] uppercase font-bold text-[#D4AF77]">Atelier</h4>
              <ul className="space-y-4">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-sans text-white/40 hover:text-white transition-all duration-500 uppercase tracking-widest">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-white/20">
              <p className="text-[9px] tracking-[0.4em] uppercase font-bold">© 2026 Esturro</p>
              <div className="h-3 w-[1px] bg-white/10 hidden md:block" />
              <p className="text-[9px] tracking-[0.4em] uppercase">Hand-Crafted in Pakistan</p>
            </div>
            <p className="text-[8px] tracking-[0.2em] text-white/10 uppercase">
              Global Logistics — Carbon Neutral Packaging
            </p>
          </div>

     
          <div className="flex flex-col items-end gap-3 text-[9px] tracking-[0.4em] uppercase text-white/20">
            <span className="opacity-40 italic font-serif lowercase tracking-normal">Digital Flagship curated by</span>
            <a 
              href="https://saadmirza.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D4AF77] font-black text-xs relative group py-1"
            >
              Saad Mirza
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF77] scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
            </a>
          </div>
        </div>
      </div>

   
    </footer>
  );
}
