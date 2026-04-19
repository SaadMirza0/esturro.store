"use client";
import { useState } from "react";
import Link from "next/link";

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
        <a
          href={`https://wa.me, I am interested in ${product.name} (Size: ${selectedSize || 'Not Selected'}). Product ID: ${product.id}`}
          className="w-full bg-[#D4AF77] text-black py-5 px-8 font-body font-extrabold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:brightness-105"
        >
          Buy on WhatsApp
        </a>

        <Link
          href={`/Checkout?id=${product.id}&size=${selectedSize}&price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image_url)}`}
          className={`w-full py-5 text-center block uppercase tracking-widest text-xs font-bold transition-all duration-500 ${!selectedSize
            ? 'bg-gray-200 text-gray-400 pointer-events-none'
            : 'bg-black text-white hover:bg-zinc-800 shadow-lg'
            }`}
        >
          {selectedSize ? "Proceed to Checkout" : "Select a Size to Buy"}
        </Link>
      </div>
    </div>
  );
}
