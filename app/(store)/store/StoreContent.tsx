"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const activeStyle = searchParams.get("style");
  const activeSize = searchParams.get("size");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) { params.delete(key); }
    else { params.set(key, value); }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/Products?${searchParams.toString()}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) { console.error("Error fetching products:", error); }
      finally { setLoading(false); }
    };
    fetchFilteredProducts();
  }, [searchParams]);

  return (
    <main className="bg-[#FCF9F4] min-h-screen pt-48 pb-32 px-6 md:px-12 lg:px-24">

      {/* --- 1. THE EDITORIAL ENTRANCE (WELCOMING SECTION) --- */}
      <section className="max-w-[1400px] mx-auto mb-20 pt-10 px-4">
        {/* --- MINIMALIST BREADCRUMB --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#1C1C19]/30 font-bold">  Archive</span>
          <div className="h-[1px] w-8 bg-[#D4AF77]/40" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF77] font-bold">Vol. 01 — SS26</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* --- LEFT: COMPACT IDENTITY (7 Columns) --- */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#1C1C19] mb-8"
            >
              Shop All <br />
              <span className="italic font-light text-[#D4AF77]">Shirts for Mens.</span>
            </motion.h1>

            <div className="flex items-center gap-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#1C1C19]/40 font-sans text-sm md:text-base max-w-xs leading-relaxed"
              >
                Architectural precision in every stitch. Sourced from the finest global mills.
              </motion.p>

              {/* Integrated Counter */}
              <div className="h-16 w-[1px] bg-[#1C1C19]/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-[#1C1C19]">{products.length}</span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#1C1C19]/30 font-bold">Pieces</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: ARCHIVE TEASER (5 Columns) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[16/7] bg-white overflow-hidden shadow-[0_30px_60px_rgba(28,28,25,0.04)]">
              {/* This image acts as a "preview" of the craftsmanship */}
              <img
                src="https://unsplash.com"
                alt="Fabric Preview"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />

              {/* Ghost Border */}
              <div className="absolute inset-0 border border-[#1C1C19]/5 pointer-events-none" />

              <div className="absolute bottom-6 left-8">
                <p className="text-[9px] tracking-[0.5em] uppercase text-[#1C1C19]/60 font-bold">Technical Spec: 100% Pima</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* --- 2. ARCHITECTURAL FILTER BAR (REFINED) --- */}
      <section className="max-w-[1400px] mx-auto mb-20 sticky top-24 z-40">

        <div className="bg-white/80 backdrop-blur-md shadow-[0_30px_60px_rgba(28,28,25,0.03)] px-10 py-8 flex flex-col xl:flex-row justify-between items-center gap-12">
          {/* Style Filter */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30">Visual Style</span>
            <div className="flex gap-4">
              {['Casual', 'Printed'].map((style) => (
                <button
                  key={style}
                  onClick={() => updateFilter('style', style)}
                  className={`relative px-10 py-4 text-[10px] tracking-widest uppercase transition-all duration-500 overflow-hidden ${activeStyle === style ? 'text-white' : 'text-[#1C1C19] hover:bg-[#F6F3EE]'}`}
                >
                  <span className="relative z-10">{style}</span>
                  {activeStyle === style && (
                    <motion.div layoutId="styleActive" className="absolute inset-0 bg-[#1C1C19]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30">Sizing</span>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => updateFilter('size', size)}
                  className={`w-14 h-14 text-[10px] font-bold transition-all duration-500 flex items-center justify-center 0px ${activeSize === size ? 'bg-[#D4AF77] text-white shadow-lg' : 'bg-white text-[#1C1C19] border border-[#1C1C19]/5 hover:border-[#D4AF77]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PRODUCT GRID (STAGGERED ENTRANCE) --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-60 gap-8">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-[0.5px] border-[#D4AF77]/30 border-t-[#1C1C19]"
            />
            <span className="absolute inset-0 flex items-center justify-center text-[8px] tracking-[0.2em] uppercase text-[#D4AF77]">E</span>
          </div>
          <span className="text-[9px] tracking-[0.6em] uppercase text-[#1C1C19]/30 animate-pulse">Curating Archive</span>
        </div>
      ) : (
        <motion.section
          layout
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32 lg:gap-y-48"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product, index) => {
              // Editorial Logic: Every 2nd item is offset for visual rhythm
              const isOffset = index % 3 === 1;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 1.2,
                    delay: (index % 3) * 0.15,
                    ease: [0.215, 0.61, 0.355, 1] as const
                  }}
                  className={`group relative flex flex-col ${isOffset ? 'lg:translate-y-20' : ''}`}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    {/* Image Module: Tonal Stacking (White on Cream) */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-white mb-10 transition-all duration-1000 shadow-[0_10px_30px_rgba(28,28,25,0.02)] group-hover:shadow-[0_40px_80px_rgba(28,28,25,0.04)] will-change-transform">

                      <img
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.2,0,0.2,1) group-hover:scale-105"
                        src={product.image_url?.toLowerCase().endsWith(".pdf") ? product.image_url.replace(".pdf", ".jpg") : product.image_url}
                      />

                      {/* Architectural "Ghost Border" Layer */}
                      <div className="absolute inset-0 border border-[#1C1C19]/[0.04] pointer-events-none" />

                      {/* Status Tag: Authority Black */}
                      <div className="absolute top-0 left-0 bg-[#1C1C19] text-[#FCF9F4] px-5 py-3 text-[8px] tracking-[0.3em] uppercase font-bold">
                        {product.design_style}
                      </div>

                      {/* Interaction Overlay: Glassmorphism */}
                      <div className="absolute inset-0 bg-[#FCF9F4]/10 opacity-0 group-hover:opacity-100 backdrop-blur-[4px] transition-all duration-700 flex items-center justify-center">
                        <div className="overflow-hidden">
                          <motion.span
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                            className="inline-block bg-[#1C1C19] text-white px-10 py-5 text-[9px] tracking-[0.5em] uppercase"
                          >
                            Examine Detail
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* Data Module: Editorial Typography */}
                    <div className="space-y-5 px-1">
                      <div className="flex justify-between items-start">
                        <div className="max-w-[70%]">
                          <p className="text-[9px] font-sans uppercase tracking-[0.4em] text-[#1C1C19]/30 mb-2 font-bold">
                            {product.category_name}
                          </p>
                          <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C19] leading-none tracking-tight group-hover:text-[#D4AF77] transition-colors duration-500">
                            {product.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="font-sans font-bold text-sm text-[#76592A] tracking-tighter mb-1">
                            ₨{Number(product.price).toLocaleString()}
                          </p>
                          <span className="text-[8px] text-[#1C1C19]/20 uppercase tracking-widest italic font-serif">In Stock</span>
                        </div>
                      </div>

                      {/* Signature Underline: Grows on Hover */}
                      <div className="relative h-[1px] w-full bg-[#1C1C19]/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className="absolute inset-0 bg-[#D4AF77]/40 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.section>
      )}

      {/* --- 4. PAGINATION (ARCHITECTURAL) --- */}
      {!loading && products.length > 0 && (
        <div className="mt-48 flex flex-col items-center gap-8">
          <div className="h-32 w-[1px] bg-[#1C1C19]/10" />
          <div className="flex items-center gap-16">
            <button className="text-[#1C1C19]/30 hover:text-[#1C1C19] transition-colors group">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold group-hover:mr-2 transition-all">Prev</span>
            </button>
            <span className="font-serif italic text-xl text-[#D4AF77]">01 / 04</span>
            <button className="text-[#1C1C19]/30 hover:text-[#1C1C19] transition-colors group">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold group-hover:ml-2 transition-all">Next</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
