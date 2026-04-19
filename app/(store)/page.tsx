"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/Products?limit=6", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Assuming API returns the result object or directly the rows array
          // In api/Products/route.ts, it returns 'result' from neon, which is an array of rows
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const pillars = [
    {
      id: "01",
      title: "Premium Fabrics",
      desc: "Sourced from the finest global mills to ensure a long-lasting, tactile luxury feel.",
    },
    {
      id: "02",
      title: "Swift Dispatch",
      desc: "Nationwide shipping within 3-5 business days across the Pakistan region.",
    },
    {
      id: "03",
      title: "The Perfect Fit",
      desc: "Enjoy our bespoke 7-day exchange policy for a seamless tailoring experience.",
    },
  ];
  // Animation Variants for staggered entry
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0.2, 1] as const }
    },
  };
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for deep editorial feel
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);


  return (
    <main>


      {/* hero */}
      <section ref={containerRef} className="relative min-h-screen w-full bg-[#FCF9F4] overflow-hidden flex flex-col lg:flex-row items-center pt-20 lg:pt-0">

        {/* 1. CONTENT AREA (Remains consistent with    brand) */}
        <motion.div className="relative z-20 w-full lg:w-3/5 px-6 md:px-12 lg:pl-24 py-12 lg:py-0 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#D4AF77] font-sans text-[10px] tracking-[0.6em] uppercase block font-bold mb-8"
          >
            Esturro — The Modern
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0, 0.2, 1] as const }}
            className="text-[#1C1C19] text-6xl md:text-8xl lg:text-[120px] font-serif leading-[0.85] tracking-[-0.04em] mb-10"
          >
            The Shirt <br />
            <span className="italic font-light text-[#D4AF77]">Authority.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#1C1C19]/70 font-sans text-base lg:text-lg max-w-sm leading-[1.8] mb-12"
          >
            Defined by intentional silence and architectural precision.
            Crafted for the modern man who demands excellence in every fiber.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-6">
            <Link href="/store">
              <motion.button
                whileHover={{ y: -5, backgroundColor: "#1C1C19" }}
                className="bg-[#76592A] text-white px-14 py-6 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 shadow-xl 0px"
              >
                Click for Collection
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ backgroundColor: "#1C1C19", color: "#FFFFFF" }}
              className="border border-[#1C1C19]/15 text-[#1C1C19] px-14 py-6 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 0px"
            >
              About Us
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 2. REIMAGINED DYNAMIC GALLERY (THE IMPROVEMENT) */}
        <div className="relative w-full lg:w-2/5 h-screen flex items-center justify-center">
          {/* Subtle Background Shift */}
          <div className="absolute right-0 top-0 w-full lg:w-[90%] h-full bg-[#F6F3EE] z-0" />

          <div className="relative z-10 w-full max-w-xl h-[80%] flex items-center justify-center px-10">

            {/* A. Main Editorial Frame */}
            <motion.div
              style={{ y: y1 }}
              className="relative w-full h-3/4 bg-white p-4 shadow-[0_60px_100px_rgba(28,28,25,0.08)] group overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src="https://unsplash.com"
                className="w-full h-full object-cover transition-all duration-1000"
              />
              {/* High-End Labeling */}
              <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-6 py-3 text-[9px] tracking-[0.4em] uppercase font-bold">
                A/W 26
              </div>
            </motion.div>

            {/* B. The "Floating" Fragment (Parallax Detail) */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="absolute -left-10 bottom-20 w-1/2 h-1/3 bg-white p-2 shadow-2xl z-20 hidden md:block group"
            >
              <div className="absolute inset-0 border border-[#D4AF77]/20 z-10 group-hover:border-[#D4AF77] transition-colors" />
              <img
                src="https://unsplash.com"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute -bottom-6 -left-6 bg-white px-4 py-2 shadow-sm italic font-serif text-[10px] text-[#D4AF77]">
                Texture Study
              </div>
            </motion.div>

            {/* C. Architectural Accent Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute right-0 top-0 w-[1px] bg-[#D4AF77]/30 hidden lg:block"
            />
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.04] select-none pointer-events-none hidden xl:block">
          <span className="text-[300px] font-serif font-black text-[#1C1C19]">EST</span>
        </div>

        {/* Interactive Bottom Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-6 md:left-24 flex items-center gap-6"
        >
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#1C1C19]/40 font-bold">Explore</p>
          <div className="h-[1px] w-12 bg-[#D4AF77]/50" />
        </motion.div>
      </section>
      {/* latest Arrivals  */}
      <section className="py-32 px-6 md:px-24 bg-[#FCF9F4] overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-baseline mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[#D4AF77] text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block">New Drops</span>
            <h2 className="text-[#1C1C19] text-5xl md:text-7xl font-serif leading-tight">
              Latest <span className="italic font-light">Arrivals</span>
            </h2>
            <p className="mt-8 text-[#1C1C19]/60 font-sans text-base md:text-lg leading-relaxed max-w-lg">
              Where premium cotton meets architectural design. Each piece is limited in production to maintain the exclusivity of the modern   .
            </p>
          </motion.div>

          <motion.a
            whileHover={{ x: 10 }}
            className="group flex items-center gap-6 text-[10px] tracking-[0.3em] uppercase font-bold text-[#1C1C19] border-b border-[#1C1C19]/10 pb-4 italic"
            href="/store"
          >
            Explore All Essentials
            <span className="text-xl">→</span>
          </motion.a>
        </div>

        {/* product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.2, 0, 0.2, 1] as const }}
              className={`group relative flex flex-col ${index % 3 === 1 ? 'lg:mt-20' : ''}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-[0_20px_40px_rgba(28,28,25,0.03)]">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.2, 0, 0.2, 1] as const }}
                  className="w-full h-full object-cover"
                  src={product.image_url?.toLowerCase().endsWith(".pdf")
                    ? product.image_url.replace(".pdf", ".jpg")
                    : product.image_url
                  }
                  alt={product.name}
                />

                {/* Luxury Badge */}
                <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-4 py-2 text-[8px] tracking-[0.2em] uppercase">
                  {product.design_style}
                </div>

                {/* Glassmorphism Quick Add Overlay */}
                <div className="absolute inset-0 bg-[#FCF9F4]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <Link href={`/product/${product.id}`}>
                    <button className="bg-[#1C1C19] text-white px-8 py-4 text-[9px] tracking-[0.2em] uppercase 0px shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Quick View
                    </button>
                  </Link>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[#1C1C19] text-2xl font-serif">{product.name}</h3>
                  <span className="text-[#76592A] font-sans text-sm font-semibold tracking-tight">PKR {Number(product.price).toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="h-[1px] w-8 bg-[#D4AF77]/30" />
                  <p className="text-[#1C1C19]/40 text-[9px] uppercase tracking-[0.2em] font-sans">
                    {product.category_name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* testimonials */}
      <section className="py-24 bg-[#F6F3EE] px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.2, 0, 0.2, 1] as const
                }}
                className="group flex flex-col items-start"
              >
                {/* 1. Numerical Marker instead of generic icons */}
                <span className="text-[#D4AF77] font-serif italic text-3xl mb-6 block transition-transform duration-500 group-hover:-translate-y-2">
                  {pillar.id}
                </span>

                {/* 2. Headline: Newsreader/Editorial Voice */}
                <h4 className="text-[#1C1C19] text-xl font-serif tracking-tight mb-4 uppercase">
                  {pillar.title}
                </h4>

                {/* 3. Horizontal Ghost Divider (15% Opacity as per strategy) */}
                <div className="w-12 h-[1px] bg-[#1C1C19] opacity-[0.15] mb-6 group-hover:w-full group-hover:bg-[#D4AF77] group-hover:opacity-100 transition-all duration-700" />

                {/* 4. Body: Manrope/Functional Voice */}
                <p className="text-[#1C1C19]/60 font-sans text-sm leading-[1.8] max-w-[280px]">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1C1C19] py-32 lg:py-48 px-6 overflow-hidden relative">
        {/* 1. EDITORIAL TEXTURE OVERLAY */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full object-cover grayscale mix-blend-luminosity"
            src="https://unsplash.com"
            alt="Macro Fabric Texture"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Sub-label with wide tracking */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#D4AF77] font-sans text-[10px] tracking-[0.6em] uppercase mb-12 block font-bold"
          >
            The Esturro Standard
          </motion.span>

          {/* Headline: Newsreader Bold */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white text-4xl md:text-7xl font-serif mb-12 leading-[1.1] tracking-tight"
          >
            Authenticity in every thread. <br />
            <span className="italic font-light text-[#D4AF77]">Modernity in every silhouette.</span>
          </motion.h2>

          {/* Body: Manrope Airy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white/50 font-sans text-base md:text-xl max-w-2xl mx-auto mb-16 leading-[1.8]"
          >
            Esturro is built on the belief that a shirt is more than a garment—it is a statement of intent.
            We merge traditional craftsmanship with contemporary architectural aesthetics.
          </motion.p>

          {/* Primary CTA: Brushed Gold Gradient per design system */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <button className="group relative bg-gradient-to-r from-[#76592A] to-[#D4AF77] text-white px-12 py-7 text-[10px] tracking-[0.3em] uppercase font-bold 0px transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,119,0.3)] flex items-center gap-6 mx-auto overflow-hidden">
              <span className="relative z-10 flex items-center gap-4">
                Contact on WhatsApp
                <span className="h-[1px] w-8 bg-white/30 group-hover:w-12 transition-all duration-500" />
                <span className="text-lg">🇵🇰</span>
              </span>

              {/* Glass effect on hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Decorative Borderless Section Transition */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
      </section>

      {/* <Link href="../admin">Shop</Link> */}
    </main>
  );
}
