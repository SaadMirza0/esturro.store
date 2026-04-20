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

      {/* --- ATELIER FILTER UTILITY (NON-STICKY) --- */}
      <section className="max-w-[1400px] mx-auto mb-16 px-4">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-12 py-12 border-b border-[#1C1C19]/5">

          {/* Archive Context & Counter */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#D4AF77] mb-1">Archive Archive</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif text-[#1C1C19]">{products.length}</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#1C1C19]/30 font-bold italic">Curated Pieces</span>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-[#1C1C19]/10 hidden md:block" />
          </div>

          {/* Integrated Selection Controls */}
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Visual Style Selection */}
            <div className="flex items-center gap-6">
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/20">Visual Style</span>
              <div className="flex bg-[#F6F3EE] p-1">
                {['Casual', 'Printed'].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateFilter('style', style)}
                    className={`relative px-8 py-3 text-[9px] tracking-[0.3em] uppercase font-bold transition-all duration-500 overflow-hidden ${activeStyle === style ? 'text-white' : 'text-[#1C1C19]/60 hover:text-[#1C1C19]'
                      }`}
                  >
                    <span className="relative z-10">{style}</span>
                    {activeStyle === style && (
                      <motion.div
                        layoutId="styleActive"
                        className="absolute inset-0 bg-[#1C1C19] shadow-xl"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Architecture */}
            <div className="flex items-center gap-6">
              <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/20">Sizing</span>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateFilter('size', size)}
                    className={`w-11 h-11 text-[10px] font-bold transition-all duration-500 flex items-center justify-center 0px border ${activeSize === size
                      ? 'bg-[#D4AF77] text-white border-[#D4AF77] shadow-lg'
                      : 'bg-white text-[#1C1C19] border-[#1C1C19]/10 hover:border-[#D4AF77]'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- 3. PRODUCT GRID (STAGGERED ENTRANCE) --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-60 gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border border-[#D4AF77] border-t-transparent"
          />
          <span className="text-[9px] tracking-[0.5em] uppercase text-[#1C1C19]/30">Curating...</span>
        </div>
      ) : (
        <motion.section
          layout
          className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-20 px-4 pb-32"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                className="group relative"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Image Container: Clean architectural frame */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      src={product.image_url?.toLowerCase().endsWith(".pdf") ? product.image_url.replace(".pdf", ".jpg") : product.image_url}
                    />

                    {/* Ghost Border */}
                    <div className="absolute inset-0 border border-[#1C1C19]/[0.05] pointer-events-none" />

                    {/* Minimal Design Tag */}
                    <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-3 py-1.5 text-[7px] md:text-[8px] tracking-[0.2em] uppercase font-bold">
                      {product.design_style}
                    </div>
                  </div>

                  {/* Product Info: High Visibility Typography */}
                  <div className="space-y-2 px-1 text-center md:text-left">
                    <div className="space-y-0.5">
                      <p className="text-[8px] tracking-[0.2em] uppercase text-[#1C1C19]/40 font-bold">
                        {product.category_name}
                      </p>
                      <h3 className="font-serif text-base md:text-lg text-[#1C1C19] group-hover:text-[#D4AF77] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-1">
                      <p className="font-sans font-bold text-sm text-[#76592A] tracking-tight">
                        ₨{Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    {/* Subtle Progress Underline */}
                    <div className="h-[1px] w-full bg-[#1C1C19]/5 overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-[#D4AF77]/40"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
