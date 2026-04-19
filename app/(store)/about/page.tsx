"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
    const reveal = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <main className="bg-[#FCF9F4] min-h-screen">
            {/* --- 1. THE ARCHIVE HEADER --- */}
            <section className="bg-[#F6F3EE] pt-48 pb-32 px-6 md:px-24 overflow-hidden relative">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-2xl">
                        <span className="text-[#D4AF77] uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block">
                            Our Architectural Heritage
                        </span>
                        <h1 className="text-7xl md:text-[140px] font-serif leading-[0.8] tracking-tighter text-[#1C1C19] mb-12">
                            About <br />
                            <span className="italic font-light text-[#D4AF77]">Esturro</span>
                        </h1>
                        <p className="font-serif italic text-2xl text-[#1C1C19]/60 max-w-md border-l border-[#D4AF77] pl-8">
                            Crafted with pride in the Pakistan Atelier since 2026.
                        </p>
                    </motion.div>

                    {/* Large Background Watermark (Architectural Precision) */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.03]">
                        <span className="text-[400px] leading-none font-serif font-black select-none pointer-events-none">EST.</span>
                    </div>
                </div>
            </section>

            {/* --- 2. THE PHILOSOPHY SECTION (Split Canvas) --- */}
            <section className="py-32 px-6 md:px-24">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
                        className="lg:col-span-7 space-y-16"
                    >
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-serif text-[#1C1C19] leading-tight">
                                The Esturro <br /> <span className="italic">Standard.</span>
                            </h2>
                            <div className="h-[1px] w-24 bg-[#D4AF77]" />
                        </div>

                        <div className="space-y-10 max-w-xl">
                            <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-[#1C1C19]/80">
                                "We craft every silhouette with the perfect fit in mind – premium breathable fabrics, bespoke prints, and uncompromising quality for the modern man."
                            </p>
                            <p className="text-[#1C1C19]/60 font-sans leading-loose text-base md:text-lg">
                                At Esturro, we believe that garments are not just fabric; they are a reflection of an individual’s journey. Our atelier focuses on **slow-fashion principles**, ensuring that every stitch serves a purpose. By sourcing the finest indigenous cotton and blending it with modern silhouettes, we’ve created a standard that transcends seasons.
                            </p>
                        </div>

                        {/* Quality Pillars (Removing standard icons for serif typography) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-[#1C1C19]/5">
                            <div className="space-y-4">
                                <span className="text-[#D4AF77] font-serif italic text-2xl">01.</span>
                                <h3 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#1C1C19]">Giza Cotton</h3>
                                <p className="text-xs font-sans text-[#1C1C19]/50 leading-relaxed uppercase">Hand-selected fibers for unparalleled breathability.</p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[#D4AF77] font-serif italic text-2xl">02.</span>
                                <h3 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#1C1C19]">Signature Prints</h3>
                                <p className="text-xs font-sans text-[#1C1C19]/50 leading-relaxed uppercase">Artisan-designed patterns exclusive to our house.</p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[#D4AF77] font-serif italic text-2xl">03.</span>
                                <h3 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#1C1C19]">Precision Fit</h3>
                                <p className="text-xs font-sans text-[#1C1C19]/50 leading-relaxed uppercase">Engineered comfort without sacrificing sharp geometry.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Imagery with Ghost Border and Tonal Shadow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative z-10 bg-white p-4 shadow-[0_40px_80px_rgba(28,28,25,0.06)]">
                            <img
                                className="w-full h-[700px] object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] cursor-crosshair"
                                src="https://unsplash.com"
                                alt="Esturro Craftsmanship"
                            />
                            <div className="absolute inset-0 border border-[#1C1C19]/[0.03] pointer-events-none" />
                        </div>
                        {/* Floating Accent Line */}
                        <div className="absolute -bottom-8 -right-8 w-full h-full border border-[#D4AF77]/20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* --- 3. FINAL CONVERSION (Tonal Shift) --- */}
            <section className="bg-[#F6F3EE] py-40 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <motion.h2
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-serif text-[#1C1C19] leading-tight tracking-tighter"
                    >
                        Ready to experience the <br />
                        <span className="italic text-[#D4AF77]">Esturro Difference?</span>
                    </motion.h2>
                    <div className="flex justify-center">
                        <Link href="/store">
                            <button className="bg-[#1C1C19] text-[#FCF9F4] px-16 py-8 text-[11px] tracking-[0.5em] uppercase font-bold transition-all duration-700 hover:bg-[#D4AF77] hover:shadow-2xl active:scale-95 shadow-xl">
                                Explore the Archive
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
