"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const sizes = product.available_sizes?.split(",").map((s: string) => s.trim()) || [];

  // Logic for the Customization WhatsApp message
  const customizationMessage = encodeURIComponent(
    `Hello, I want to customize this shirt: ${product.name}.`
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-body text-[11px] tracking-widest uppercase font-bold text-[#1C1C19]/40">Available Sizes</span>
         
        </div>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size: string) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 font-bold text-xs ${
                selectedSize === size
                ? 'bg-[#1C1C19] text-white border-[#1C1C19] shadow-xl'
                : 'border-[#1C1C19]/10 text-[#1C1C19] hover:border-[#1C1C19]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {/* 1. PRIMARY ACTION: Direct Purchase */}
        <Link
          href={`/Checkout?id=${product.id}&size=${selectedSize}&price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image_url)}`}
          className={`w-full py-6 text-center text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 0px ${!selectedSize
            ? 'bg-[#1C1C19]/5 text-[#000000] cursor-not-allowed'
            : 'bg-[#1C1C19] text-[#FCF9F4] hover:bg-[#2C2C29] shadow-2xl active:scale-[0.98]'
            }`}
        >
          {selectedSize ? "Proceed to Purchase" : "First Select Size for Checkout"}
        </Link>

        {/* 2. BESPOKE ACTION: WhatsApp Customization (Replaces Buy on WhatsApp) */}
        <a
          href={`https://wa.me/923010544620?text=${customizationMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-[#76592A] to-[#D4AF77] text-white py-6 px-8 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:shadow-[0_10px_30px_rgba(118,89,42,0.2)] active:scale-[0.98]"
        >
          <span>Click to Customize this Shirt</span>
          <div className="w-[1px] h-4 bg-white/20" />
          <svg 
  xmlns="http://w3.org" 
  width="14" 
  height="14" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  strokeWidth="2" 
  strokeLinecap="round" 
  strokeLinejoin="round" 
  className="text-sm"
>
  <path d="M12 20h9" />
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
</svg>

        </a>

        {/* 3. INQUIRY ACTION: WhatsApp Information */}
        <a
          href={`https://wa.me/923010544620?text=${encodeURIComponent(`Hello, I would like more information about the ${product.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border border-[#1C1C19]/10 text-[#1C1C19]/60 py-6 px-8 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:bg-[#1C1C19] hover:text-white group"
        >
          <span>General Inquiry</span>
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
      </div>
    </div>
  );
}

