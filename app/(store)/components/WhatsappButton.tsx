"use client"
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  // This is your final working URL with the number and message pre-encoded
  const finalUrl = "https://wa.me";

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      
      {/* 1. PREMIUM PROMPT BANNER */}
      <motion.a
        href={`https://wa.me/923710981701?text=${encodeURIComponent(`I am interested in buying the Product `)}`}

        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{ scale: 1.05, x: -5 }}
        className="group relative flex items-center gap-4 bg-[#1C1C19] border border-[#D4AF77]/30 p-1 pr-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
      >
        {/* Animated Gold Pulse Background */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 bg-[#D4AF77]"
        />

        {/* Action Icon in Mini Box */}
        <div className="relative z-10 bg-[#D4AF77] p-3 text-black">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18"/>
          </svg>
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF77]">Custom Atelier</span>
          <span className="text-sm font-serif italic text-white tracking-wide">
            Shirt Customizations <span className="not-italic font-sans text-[10px] ml-2 opacity-50 group-hover:opacity-100 group-hover:text-[#D4AF77] transition-all underline underline-offset-4">Click Here</span>
          </span>
        </div>
      </motion.a>

      {/* 2. MAIN WHATSAPP BUTTON (Larger & Glowing) */}
      <motion.a
        href={`https://wa.me/923710981701?text=${encodeURIComponent(`Hi! from Esturro I need help !!! `)}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group bg-[#25D366] p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center overflow-hidden"
      >
        {/* Outer Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />

        <svg 
          viewBox="0 0 448 512" 
          className="w-9 h-9 fill-white relative z-10" 
          xmlns="http://w3.org"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </div>
  )
}

