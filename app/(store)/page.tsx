"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Home() {
  const products = [
    {
      id: 1,
      name: "Midnight Oxford",
      price: "PKR 4,500",
      tag: "Signature Solid",
      fabric: "100% Pima Cotton",
      img: "https://unsplash.com",
      offset: false
    },
    {
      id: 2,
      name: "Abstract Geo Print",
      price: "PKR 5,200",
      tag: "Editorial Print",
      fabric: "Signature Esturro Art",
      img: "https://unsplash.com",
      offset: true // This creates the asymmetrical editorial feel
    },
    {
      id: 3,
      name: "Ivory Structure",
      price: "PKR 4,800",
      tag: "Bespoke Cut",
      fabric: "Textured Cotton Blend",
      img: "https://unsplash.com",
      offset: false
    }
  ];

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
      transition: { duration: 0.8, ease: [0.2, 0, 0.2, 1] }
    },
  };



  return (
    <main>
      <body className="text-on-surface">

        {/* hero */}
        <section className="relative min-h-screen w-full bg-[#FCF9F4] overflow-hidden flex flex-col lg:flex-row items-center pt-20 lg:pt-0">

          {/* 1. CONTENT AREA */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="relative z-20 w-full lg:w-3/5 px-6 md:px-12 lg:pl-24 py-12 lg:py-0 flex flex-col justify-center"
          >
            <motion.span variants={itemVars} className="text-[#D4AF77] font-sans text-[10px] tracking-[0.5em] uppercase block font-bold mb-6">
              Esturro — The Modern Atelier
            </motion.span>

            <motion.h1 variants={itemVars} className="text-[#1C1C19] text-5xl md:text-7xl lg:text-[110px] font-serif leading-[0.9] tracking-[-0.04em] mb-8">
              The Shirt <br />
              <span className="italic font-light text-[#D4AF77]">Authority.</span>
            </motion.h1>

            <motion.p variants={itemVars} className="text-[#1C1C19]/70 font-sans text-sm md:text-base lg:text-lg max-w-sm leading-[1.8] mb-10">
              Defined by intentional silence and architectural precision.
              Crafted for the modern man who demands excellence in every fiber.
            </motion.p>

            <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4">
              <Link href="/store">
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#76592A] text-white px-10 py-5 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:bg-[#1C1C19] shadow-sm"
                >
                  The Collection
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ backgroundColor: "#1C1C19", color: "#FFFFFF" }}
                className="border border-[#1C1C19]/15 text-[#1C1C19] px-10 py-5 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500"
              >
                Our Story
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 2. RESPONSIVE PRODUCT GALLERY */}
          <div className="relative w-full lg:w-2/5 h-[60vh] lg:h-screen flex items-center justify-center p-6 md:p-12 lg:p-0">
            {/* Editorial Background Block */}
            <div className="absolute right-0 top-0 w-full lg:w-[85%] h-full bg-[#F6F3EE] z-0" />

            <div className="relative z-10 w-full max-w-lg h-full flex items-center justify-center">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                className="relative w-4/5 h-4/5 bg-white p-3 md:p-5 shadow-[0_40px_80px_rgba(28,28,25,0.06)]"
              >
                <img
                  src="https://unsplash.com"
                  alt="Main Product"
                  className="w-full h-full object-cover"
                />
                {/* Architectural Badge */}
                <div className="absolute -left-6 top-12 bg-white px-4 py-2 shadow-sm -rotate-90 origin-right hidden md:block">
                  <p className="text-[8px] tracking-[0.3em] uppercase text-[#1C1C19]">Art. No 001</p>
                </div>
              </motion.div>

              {/* Floating Detail Card (Animated) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 left-0 lg:-left-16 w-1/2 h-1/3 bg-white p-2 shadow-2xl z-30"
              >
                <div className="absolute inset-0 border border-[#1C1C19]/5 z-10" />
                <img
                  src="https://unsplash.com"
                  alt="Fabric Detail"
                  className="w-full h-full object-cover grayscale"
                />
              </motion.div>
            </div>
          </div>

          {/* Decorative Brand Initial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.07 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-8 -translate-y-1/2 hidden xl:block select-none pointer-events-none"
          >
            <span className="text-[200px] font-serif text-[#1C1C19]">E</span>
          </motion.div>

          {/* Bottom Navigation Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-6 md:left-24 flex items-center gap-4"
          >
            <div className="h-[1px] w-8 bg-[#D4AF77]" />
            <p className="text-[8px] tracking-[0.4em] uppercase text-[#1C1C19]/50">Scroll to Explore</p>
          </motion.div>
        </section>
        {/* latest Arrivals  */}
        <section className="py-32 px-6 md:px-24 bg-[#FCF9F4] overflow-hidden">
          {/* 1. SECTION HEADER */}
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
                Where premium cotton meets architectural design. Each piece is limited in production to maintain the exclusivity of the modern atelier.
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

          {/* 2. ASYMMETRICAL PRODUCT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`group relative flex flex-col ${product.offset ? 'lg:mt-20' : ''}`}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-[0_20px_40px_rgba(28,28,25,0.03)]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.2, 0, 0.2, 1] }}
                    className="w-full h-full object-cover"
                    src={product.img}
                    alt={product.name}
                  />

                  {/* Luxury Badge */}
                  <div className="absolute top-0 right-0 bg-[#1C1C19] text-white px-4 py-2 text-[8px] tracking-[0.2em] uppercase">
                    {product.tag}
                  </div>

                  {/* Glassmorphism Quick Add Overlay */}
                  <div className="absolute inset-0 bg-[#FCF9F4]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <button className="bg-[#1C1C19] text-white px-8 py-4 text-[9px] tracking-[0.2em] uppercase 0px shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[#1C1C19] text-2xl font-serif">{product.name}</h3>
                    <span className="text-[#76592A] font-sans text-sm font-semibold tracking-tight">{product.price}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-[1px] w-8 bg-[#D4AF77]/30" />
                    <p className="text-[#1C1C19]/40 text-[9px] uppercase tracking-[0.2em] font-sans">
                      {product.fabric}
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
                    ease: [0.2, 0, 0.2, 1]
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
      </body>
      {/* <Link href="../admin">Shop</Link> */}
    </main>
  );
}
