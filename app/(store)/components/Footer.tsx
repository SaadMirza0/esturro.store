"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignatureFooter() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Store", href: "/store" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const policyLinks = [
        { name: "Return Policy", href: "/returns" },
        { name: "Shipping Policy", href: "/shipping" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Payment Methods", href: "/payments" },
    ];

    const socials = [
        { name: "Instagram", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "TikTok", href: "#" },
        { name: "WhatsApp", href: "https://wa.me" },
        { name: "Email", href: "mailto:hello@esturro.com" },
    ];

    return (
        <footer className="w-full bg-[#1C1C19] pt-24 pb-12 px-6 md:px-24 text-[#FCF9F4]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">

                    {/* 1. BRAND COLUMN */}
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-serif tracking-tighter text-[#D4AF77] mb-6">Esturro</h2>
                        <p className="text-[#FCF9F4]/40 font-sans text-xs leading-relaxed max-w-[200px] uppercase tracking-widest">
                            The Modern Atelier. <br /> Architectural precision in every stitch.
                        </p>
                    </div>

                    {/* 2. NAVIGATION COLUMN */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#D4AF77]">Explore</h4>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-xs uppercase tracking-widest text-[#FCF9F4]/60 hover:text-white transition-colors duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. POLICIES COLUMN */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#D4AF77]">Legal & Care</h4>
                        <ul className="space-y-4">
                            {policyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-xs uppercase tracking-widest text-[#FCF9F4]/60 hover:text-white transition-colors duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. SOCIAL & CONTACT COLUMN */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-8 text-[#D4AF77]">Connect</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-4 md:flex-col">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-xs uppercase tracking-[0.2em] italic font-serif text-[#FCF9F4]/60 hover:text-[#D4AF77] transition-colors"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR: NO-LINE RULE APPLIED VIA PADDING AND TONAL SHIFT */}
                <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#FCF9F4]/30">
                        © 2026 Esturro. Designed for the Man.
                    </p>

                    <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-[#FCF9F4]/30">
                        <span>Created by</span>
                        <a
                            href="https://saadmirza.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D4AF77] hover:underline decoration-white/10 underline-offset-4 font-bold"
                        >
                            Saad Mirza
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
