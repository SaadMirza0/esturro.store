"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductActions from "./ProductActions";

export default function ProductClientPage({ product, relatedProducts }: any) {
    // Array of all product images from your database columns
    const images = [
        product.image_url,
        product.image_url_2 || product.image_url,
        product.image_url_3 || product.image_url,
        product.image_url_4 || product.image_url,
    ].map((img: string) => img?.toLowerCase().endsWith(".pdf") ? img.replace(".pdf", ".jpg") : img);

    const containerVars = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
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
                {/* --- 1. THE GALLERY (Left - 7 Columns) --- */}
                <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
                    {images.map((img: string, idx: number) => (
                        <motion.div
                            key={idx}
                            variants={itemVars}
                            className="relative bg-white shadow-[0_15px_40px_rgba(28,28,25,0.03)] group"
                        >
                            <img
                                src={img}
                                alt={`${product.name} View ${idx + 1}`}
                                className="w-full object-cover aspect-[4/5] transition-transform duration-1000 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 border border-[#1C1C19]/[0.04] pointer-events-none" />
                        </motion.div>
                    ))}
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
                            <h1 className="text-6xl md:text-7xl font-serif text-[#1C1C19] leading-[0.9] mb-6">
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
                            <div className="col-span-2 pt-4">
                                <h5 className="text-[9px] tracking-widest uppercase font-bold text-[#1C1C19] mb-2">Origin</h5>
                                <p className="text-[11px] text-[#1C1C19]/50 uppercase tracking-tight">Hand-Crafted in Pakistan Atelier</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <section className="mt-64 pt-32 border-t border-[#1C1C19]/5">
                <div className="flex justify-between items-end mb-20">
                    <h2 className="text-5xl font-serif text-[#1C1C19]">You May Also <span className="italic">Like</span></h2>
                    <Link href="/store" className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-[#D4AF77] pb-2 text-[#1C1C19]">Explore Archive</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {relatedProducts.map((rel: any, idx: number) => (
                        <Link key={rel.id} href={`/product/${rel.id}`} className="group block">
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                transition={{ delay: idx * 0.1, duration: 0.8 }}
                                className="bg-white mb-8 shadow-[0_20px_50px_rgba(28,28,25,0.03)] overflow-hidden"
                            >
                                <img
                                    src={rel.image_url?.replace(".pdf", ".jpg")}
                                    className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    alt={rel.name}
                                />
                            </motion.div>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-[11px] tracking-widest uppercase font-bold text-[#1C1C19]">{rel.name}</h3>
                                <p className="text-xs font-sans font-bold text-[#76592A]">₨{Number(rel.price).toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
