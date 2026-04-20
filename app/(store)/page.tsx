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
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <main className="bg-[#FCF9F4] min-h-screen selection:bg-[#D4AF77]/30">
  {/*hero section*/}
      <section
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col lg:flex-row items-center pt-32 lg:pt-0 overflow-hidden"
      >

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="relative z-20 w-full lg:w-3/5 px-6 md:px-16 lg:pl-24 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
        >
          <motion.span variants={itemVars} className="text-[#D4AF77] font-sans text-[9px] md:text-[10px] tracking-[0.5em] uppercase block font-bold mb-6 lg:mb-8">
            Esturro — The Modern
          </motion.span>

          <motion.h1 variants={itemVars} className="text-[#1C1C19] text-5xl md:text-8xl lg:text-[110px] xl:text-[130px] font-serif leading-[0.9] tracking-[-0.04em] mb-8 lg:mb-12">
            The Shirt <br />
            <span className="italic font-light text-[#D4AF77]">Authority.</span>
          </motion.h1>

          <motion.p variants={itemVars} className="text-[#1C1C19]/70 font-sans text-sm md:text-base lg:text-lg max-w-sm leading-[1.7] lg:leading-[1.8] mb-10 lg:mb-14">
            Defined by intentional silence and architectural precision.
            Crafted for the modern man who demands excellence in every stitch.
          </motion.p>

          {/* mobilebuttons */}
          <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/store" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full bg-[#1C1C19] text-white px-12 py-5 lg:py-6 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl hover:bg-[#D4AF77]"
              >
                More Collection
              </motion.button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full border border-[#1C1C19]/20 text-[#1C1C19] px-12 py-5 lg:py-6 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[#1C1C19] hover:text-white"
              >
                About us
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* herosection image*/}
        <div className="relative w-full lg:w-2/5 h-[65vh] lg:h-screen flex items-center justify-center px-6 lg:px-12 mt-16 lg:mt-0">

          <div className="absolute right-0 bottom-0 lg:top-0 w-full lg:w-[85%] h-[90%] lg:h-full bg-[#F6F3EE] z-0 rounded-t-[50px] lg:rounded-none" />

          <div className="relative z-10 w-full h-full flex items-center justify-center">

            <motion.div
              style={{ y: y1 }}
              className="relative w-[75%] lg:w-full h-[75%] lg:h-3/4 bg-white p-3 lg:p-4 shadow-[0_40px_80px_rgba(28,28,25,0.08)] group overflow-hidden"
            >
              <img
                src="/17-1.png"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Main Look"
              />
              <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-4 py-2 text-[8px] tracking-[0.3em] uppercase font-bold">
                SS/26
              </div>
            </motion.div>


            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ delay: 0.6 }}
              className="absolute left-0 lg:-left-16 bottom-12 lg:bottom-32 w-2/5 lg:w-1/2 aspect-[3/4] bg-white p-2 shadow-2xl z-20 border border-[#D4AF77]/10 group"
            >
              <img
                src="/black-shirt.png"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                alt="Detail View"
              />
              <div className="absolute -bottom-4 -left-2 bg-white px-3 py-1.5 shadow-sm italic font-serif text-[9px] text-[#D4AF77] whitespace-nowrap">
                Texture Study
              </div>
            </motion.div>
          </div>
        </div>


        <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none hidden xl:block">
          <span className="text-[25vw] font-serif font-black text-[#1C1C19]">EST</span>
        </div>
      </section>

      {/* latest Arrivals  */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#FCF9F4] overflow-hidden">
        {/* --- 1. SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-[#D4AF77] text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
              The Archive — Vol. 01
            </span>
            <h2 className="text-[#1C1C19] text-5xl md:text-7xl font-serif leading-[0.85] tracking-tight">
              Latest <span className="italic font-light text-[#D4AF77]">Arrivals</span>
            </h2>
            <p className="mt-8 text-[#1C1C19]/60 font-sans text-base md:text-lg leading-relaxed max-w-md">
              An curated archive where architectural precision meets premium Giza cotton.
              Each silhouette is limited in production.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="/store" className="group flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase font-bold text-[#1C1C19] border-b border-[#1C1C19]/10 pb-4 transition-all hover:border-[#D4AF77]">
              Explore Archive
              <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </motion.div>
        </div>

        {/* --- 2. THE ARCHITECTURAL GRID (4 Columns x 3 Rows) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-8 md:gap-y-24">
          {products.slice(0, 12).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: (index % 4) * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative flex flex-col"
            >
              {/* Image Module: Tonal Stacking */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-[0_10px_30px_rgba(28,28,25,0.02)] group-hover:shadow-[0_40px_80px_rgba(28,28,25,0.06)] transition-all duration-700">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.2, 0, 0.2, 1] }}
                  className="w-full h-full object-cover"
                  src={product.image_url?.toLowerCase().endsWith(".pdf")
                    ? product.image_url.replace(".pdf", ".jpg")
                    : product.image_url
                  }
                  alt={product.name}
                />

                {/* Luxury Badge: Solid Authority Black */}
                <div className="absolute top-0 left-0 bg-[#1C1C19] text-white px-4 py-2 text-[7px] tracking-[0.3em] uppercase font-bold">
                  {product.design_style}
                </div>

                {/* Interaction Overlay: Minimal Glassmorphism */}
                <div className="absolute inset-0 bg-[#FCF9F4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-[2px]">
                  <Link href={`/product/${product.id}`}>
                    <button className="bg-[#1C1C19] text-white px-8 py-4 text-[9px] tracking-[0.4em] uppercase shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 active:scale-95">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>

              {/* Product Identity: Editorial Spacing */}
              <div className="mt-6 space-y-3 px-1">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#1C1C19] text-lg font-serif tracking-tight leading-tight line-clamp-1 group-hover:text-[#D4AF77] transition-colors duration-500">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-[#D4AF77]/30" />
                    <p className="text-[#1C1C19]/30 text-[8px] uppercase tracking-[0.3em] font-bold">
                      {product.category_name}
                    </p>
                  </div>
                </div>

                <p className="text-[#76592A] font-sans font-bold text-sm tracking-tighter">
                  ₨{Number(product.price).toLocaleString()}
                </p>
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
          
          <a 
  href="https://wa.me/923010544620" 
  target="_blank" 
  rel="noopener noreferrer"
  className="block w-fit mx-auto"
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
            </a>
          </motion.div>
        </div>

        {/* Decorative Borderless Section Transition */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
      </section>

      {/* <Link href="../admin">Shop</Link> */}
    </main>
  );
}
