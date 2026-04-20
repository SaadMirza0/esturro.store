"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const sizes = product.available_sizes?.split(",").map((s: string) => s.trim()) || [];

  return (
    <div className="flex flex-col gap-8">
      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-body text-[11px] tracking-widest uppercase font-bold">Select Size</span>
          <button className="font-body text-[11px] tracking-widest uppercase text-primary underline underline-offset-4 italic">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 ${selectedSize === size
                ? 'bg-black text-white border-black'
                : 'border-outline-variant/30 hover:border-black'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {/* 1. PRIMARY ACTION: Direct Digital Purchase */}
        <Link
          href={`/Checkout?id=${product.id}&size=${selectedSize}&price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image_url)}`}
          className={`w-full py-6 text-center text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 0px ${!selectedSize
            ? 'bg-[#1C1C19]/5 text-[#1C1C19]/20 cursor-not-allowed'
            : 'bg-[#1C1C19] text-[#FCF9F4] hover:bg-[#2C2C29] shadow-2xl active:scale-[0.98]'
            }`}
        >
          {selectedSize ? "Proceed to Purchase" : "Awaiting Size Selection"}
        </Link>

        {/* 2. SECONDARY ACTION: WhatsApp Direct Buy (Brushed Gold Gradient) */}
        <a
          href={`https://wa.me/923010544620?text=${encodeURIComponent(`I am interested in buying the ${product.name} (Size: ${selectedSize || 'Not Selected'}). Product ID: ${product.id}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-[#76592A] to-[#D4AF77] text-white py-6 px-8 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:shadow-[0_10px_30px_rgba(118,89,42,0.2)] active:scale-[0.98]"
        >
          <span>Buy on WhatsApp</span>
          <div className="w-[1px] h-4 bg-white/20" />
          <span>🇵🇰</span>
        </a>

        {/* 3. TERTIARY ACTION: WhatsApp Inquiry (Ghost Border Style) */}
        <a
          href={`https://wa.me/923010544620?text=${encodeURIComponent(`Hello, would like more information about the ${product.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border border-[#1C1C19]/10 text-[#1C1C19]/60 py-6 px-8 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-[#1C1C19] hover:text-white group"
        >
          <span>Contact about the Product</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            →
          </motion.span>
        </a>

        {/* Security / Assurance Detail */}
        <p className="text-center text-[8px] tracking-[0.4em] uppercase text-[#1C1C19]/30 mt-2 font-bold">
          Secure Atelier Protocol
        </p>
      </div >

    </div >
  );
}
