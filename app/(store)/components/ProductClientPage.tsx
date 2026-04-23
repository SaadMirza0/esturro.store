"use client";
import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProductActions from "./ProductActions";

export default function ProductClientPage({ product, relatedProducts }: any) {
   const allImages = (() => {
    if (!product.image_url) return [];

    // 1. Split the string in case it's multiple JPGs/PNGs
    const urlArray = product.image_url.split(',');

    // 2. If the first item is a PDF, use the page-extraction logic
    if (urlArray[0].toLowerCase().endsWith(".pdf")) {
      return [1, 2, 3, 4, 5].map((page) => {
        return urlArray[0]
          .replace("/upload/", `/upload/f_auto,q_auto,pg_${page}/`)
          .replace(".pdf", ".jpg");
      });
    }

  
return urlArray.map((img: string) => { // Added : string here
  const url = img.trim();
  return url.toLowerCase().endsWith(".pdf") ? url.replace(".pdf", ".jpg") : url;
});

  })().filter(Boolean) as string[];

  const [activeImage, setActiveImage] = useState<string>(allImages[0]);

  useEffect(() => {
    if (allImages.length > 0) {
      setActiveImage(allImages[0]);
    }
  }, [product.id, product.image_url]); // Added image_url to dependency to update after upload



    const containerVars = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    return (
        <main className="bg-[#FCF9F4] min-h-screen pt-40 pb-32 px-6 lg:px-12 xl:px-24">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVars}
                className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start"
            >
                {/* --- 1. THE DYNAMIC GALLERY (Left - 7 Columns) --- */}
              <div className="lg:col-span-7 space-y-6">
    {/* Main Stage Image */}
    <motion.div
        variants={itemVars}
        className="relative bg-white shadow-[0_30px_60px_rgba(28,28,25,0.03)] overflow-hidden aspect-[4/5]"
    >
        <AnimatePresence mode="wait">
            <motion.img
                key={activeImage}
                src={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full object-cover"
                alt={product.name}
            />
        </AnimatePresence>

        {/* Signature Ghost Border */}
        <div className="absolute inset-0 border border-[#1C1C19]/[0.04] pointer-events-none" />

        <div className="absolute bottom-6 left-6 bg-[#1C1C19] text-white px-4 py-2 text-[8px] tracking-[0.4em] uppercase font-bold">
            Studio Silhouette
        </div>
    </motion.div>

    {/* Dynamic Thumbnails Grid (Only shows if more than 1 page/image exists) */}
    {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {allImages.map((img, idx) => (
                <motion.button
                    key={idx}
                    variants={itemVars}
                    onClick={() => setActiveImage(img)}
                    whileHover={{ y: -4 }}
                    className={`relative aspect-[3/4] bg-white overflow-hidden transition-all duration-500 border ${
                        activeImage === img
                        ? "border-[#D4AF77] opacity-100 shadow-lg"
                        : "border-[#1C1C19]/5 opacity-40 hover:opacity-100 hover:border-[#D4AF77]/30"
                    }`}
                >
                    <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        alt={`Detail View ${idx + 1}`} 
                        // Auto-hide thumbnail if the PDF page doesn't exist in Cloudinary
                        onError={(e: any) => {
                            e.target.parentElement.style.display = 'none';
                        }}
                    />
                </motion.button>
            ))}
        </div>
    )}
</div>

                {/* --- 2. PRODUCT SPECIFICATIONS (Right - 5 Columns Sticky) --- */}
                <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit space-y-16">
                    <motion.div variants={itemVars}>
                        <div className="flex gap-4 mb-10">
                            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#D4AF77] border border-[#D4AF77]/20 px-5 py-2">
                                {product.design_style}
                            </span>
                            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30 bg-[#1C1C19]/5 px-5 py-2">
                                {product.season || 'EST. Vol 01'}
                            </span>
                        </div>

                        <div className="mb-12">
                            <h1 className="text-5xl md:text-7xl font-serif text-[#1C1C19] leading-[0.9] mb-6">
                                {product.name.split(' ')[0]} <br />
                                <span className="italic font-light text-[#D4AF77]">
                                    {product.name.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>
                            <div className="flex items-center gap-6">
                                <p className="text-4xl font-sans font-bold text-[#76592A]">
                                    ₨{Number(product.price).toLocaleString()}
                                </p>
                                <div className="h-[1px] flex-grow bg-[#1C1C19]/10" />
                            </div>
                        </div>

                        <div className="space-y-6 mb-12">
                            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30">The Silhouette</h4>
                            <p className="font-sans text-base md:text-lg leading-[1.8] text-[#1C1C19]/70 max-w-md">
                                {product.description || "A masterclass in modern tailoring. This silhouette emphasizes architectural precision, crafted from premium fibers sourced for the modern man."}
                            </p>
                        </div>

                        <div className="pt-4">
                            <ProductActions product={product} />
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-16 border-t border-[#1C1C19]/5 mt-16">
                            <div>
                                <h5 className="text-[9px] tracking-widest uppercase font-bold text-[#1C1C19] mb-2">Fabric Detail</h5>
                                <p className="text-[11px] text-[#1C1C19]/50 uppercase tracking-tight">100% Sourced Cotton</p>
                            </div>
                            <div>
                                <h5 className="text-[9px] tracking-widest uppercase font-bold text-[#1C1C19] mb-2">Artisan Care</h5>
                                <p className="text-[11px] text-[#1C1C19]/50 uppercase tracking-tight">Cold Wash Only</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* RELATED SECTION REMAINS SAME */}
            <section className="mt-64 pt-32 border-t border-[#1C1C19]/5">
                <div className="flex justify-between items-end mb-20">
                    <h2 className="text-5xl font-serif text-[#1C1C19]">You May Also <span className="italic">Like</span></h2>
                    <Link href="/store" className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-[#D4AF77] pb-2 text-[#1C1C19]">Explore Archive</Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                    {relatedProducts.map((rel: any, idx: number) => (
                        <Link key={rel.id} href={`/product/${rel.id}`} className="group block">
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="bg-white mb-8 shadow-sm overflow-hidden aspect-[3/4]"
                            >
                         <img
  src={(() => {
    // 1. Split the string into an array
    const images = rel.image_url?.split(',') || [];
    // 2. Get the first image from the array
    const firstImage = images[0] || ""; 
    
    // 3. Now you can safely use string methods
    return firstImage.toLowerCase().endsWith(".pdf") 
      ? firstImage.replace(".pdf", ".jpg") 
      : firstImage;
  })()}
  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
  alt={rel.name}
/>


                            </motion.div>
                            <h3 className="text-[10px] tracking-widest uppercase font-bold text-[#1C1C19] mb-1">{rel.name}</h3>
                            <p className="text-sm font-sans font-bold text-[#76592A]">₨{Number(rel.price).toLocaleString()}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
