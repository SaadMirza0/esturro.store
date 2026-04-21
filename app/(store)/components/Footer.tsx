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
      href: "https://www.instagram.com/esturro.store?igsh=MTQxZjh1c3N6NDk4eA%3D%3D&utm_source=qr",
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
         <svg 
    viewBox="0 0 448 512" 
    className="w-7 h-7 fill-current" 
    xmlns="http://w3.org"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
      )
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@esturro.shop?_r=1&_t=ZS-95h0OIXVe2W",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
   {
  name: "Facebook",
  href: "https://www.facebook.com/share/18H81gmrgR/?mibextid=wwXIfr",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
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
