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
        const res = await fetch("/api/Products", { cache: "no-store" });
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
  {/*const containerRef = useRef(null);*/}

 {/* const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });*/}

  {/* const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);*/}

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
  };

  return (
    <main className="bg-[#FCF9F4] min-h-screen selection:bg-[#D4AF77]/30">
  {/*hero section*/}
 


      {/* latest Arrivals  */}
   <section className="py-10 lg:py-32 px-4 md:px-12 lg:px-24 bg-[#FCF9F4] overflow-hidden">
  {/* --- 1. SECTION HEADER --- */}
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8 lg:gap-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl"
    >
      <span className="text-[#D4AF77] text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
        The Archive — Vol. 01
      </span>
      <h2 className="text-[#1C1C19] text-4xl md:text-7xl font-serif leading-[0.85] tracking-tight">
        Latest <span className="italic font-light text-[#D4AF77]">Arrivals</span>
      </h2>
    </motion.div>

    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Link href="/store" className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-bold text-[#1C1C19] border-b border-[#1C1C19]/10 pb-2 transition-all hover:border-[#D4AF77]">
        Explore Archive
        <span className="text-lg transition-transform group-hover:translate-x-2">→</span>
      </Link>
    </motion.div>
  </div>

  {/* --- 2. THE ARCHITECTURAL GRID (Symmetrical for Mobile & PC) --- */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-24">
    {products.slice(0, 12).map((product, index) => (
      <Link key={product.id} href={`/product/${product.id}`} className="group block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            delay: (index % 4) * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative flex flex-col"
        >
          {/* Image Module: Full Area tap target */}
          <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-sm transition-all duration-700 group-hover:shadow-2xl">
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

            {/* Luxury Badge */}
            <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[8px] tracking-[0.2em] uppercase font-bold">
              {product.design_style}
            </div>

            {/* Interaction Overlay (Hidden on Mobile for cleaner UX, visible on Desktop hover) */}
            <div className="absolute inset-0 bg-[#FCF9F4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden lg:flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-[#1C1C19] text-white px-6 py-3 text-[9px] tracking-[0.4em] uppercase shadow-2xl">
                  View Detail
                </span>
            </div>
          </div>

          {/* Product Identity */}
          <div className="mt-4 md:mt-6 space-y-2 md:space-y-3 px-1 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-[#1C1C19]/30 font-bold">
                {product.category_name}
              </p>
              <h3 className="text-[#1C1C19] text-sm md:text-xl font-serif tracking-tight leading-tight line-clamp-1 group-hover:text-[#D4AF77] transition-colors duration-500">
                {product.name}
              </h3>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              <p className="text-[#76592A] font-sans font-bold text-xs md:text-base tracking-tight">
                ₨{Number(product.price).toLocaleString()}
              </p>
              <div className="hidden md:block h-[1px] w-4 bg-[#D4AF77]/30" />
              <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-[#1C1C19]/20 font-bold italic">
                In Stock
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
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
