"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const productImage = searchParams.get("image");

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/Orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (err) {
                console.error("Error fetching order:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading && orderId) {
        return (
            <div className="min-h-screen bg-[#FCF9F4] flex flex-col items-center justify-center gap-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border border-[#D4AF77] border-t-transparent"
                />
                <p className="text-[9px] tracking-[0.4em] uppercase text-[#1C1C19]/40 font-bold">Synchronizing Archives...</p>
            </div>
        );
    }

    // Default or Fallback static data if no orderId found
    const displayId = orderId ? `EST-${orderId.substring(0, 8).toUpperCase()}` : "EST-8823";
    const name = order?.full_name || "Valued Client";
    const phone = order?.phone || "N/A";
    const address = order?.address || "N/A";
    const city = order?.city || "N/A";
    const province = order?.province || "";
    const productName = order?.product_name || "Signature Garment";
    const size = order?.size || "Standard";
    const total = order?.total_amount || "0.00";

    return (
        <section className="bg-[#FCF9F4] min-h-screen py-20 px-6 md:px-12 lg:px-24 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* SUCCESS HEADER */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-16 h-16 bg-[#D4AF77] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4AF77]/20"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-[#1C1C19] mb-4"
                    >
                        Order Confirmed
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#1C1C19]/60"
                    >
                        Thank you for your purchase. Your order <span className="text-[#1C1C19] font-bold">#{displayId}</span> is being processed.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT: CUSTOMER & PRODUCT DETAILS */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-8 shadow-sm border border-[#1C1C19]/5"
                        >
                            <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF77] mb-6">Shipping Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                <div>
                                    <p className="text-[#1C1C19]/40 mb-1 text-[10px] uppercase tracking-widest font-bold">Name</p>
                                    <p className="font-medium text-[#1C1C19]">{name}</p>
                                </div>
                                <div>
                                    <p className="text-[#1C1C19]/40 mb-1 text-[10px] uppercase tracking-widest font-bold">Phone</p>
                                    <p className="font-medium text-[#1C1C19]">{phone}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[#1C1C19]/40 mb-1 text-[10px] uppercase tracking-widest font-bold">Address</p>
                                    <p className="font-medium text-[#1C1C19] leading-relaxed">
                                        {address}<br />
                                        {city}{province ? `, ${province}` : ""}, Pakistan
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Product Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white p-8 shadow-sm border border-[#1C1C19]/5"
                        >
                            <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF77] mb-6">Your Items</h3>
                            <div className="flex items-center gap-6 border-b border-[#F6F3EE] pb-6">
                                <div className="w-20 h-24 bg-[#F6F3EE] overflow-hidden flex-shrink-0">
                                    <img
                                        src={productImage || "/17-1.png"}
                                        className="w-full h-full object-cover"
                                        alt="Product"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/17-1.png";
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-serif text-xl text-[#1C1C19]">{productName}</p>
                                    <p className="text-[10px] text-[#1C1C19]/40 tracking-[0.2em] uppercase mt-1">
                                        Size: <span className="font-bold text-[#1C1C19]">{size}</span> | Qty: 1
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-sans font-black text-[#1C1C19]">₨{Number(total).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-between items-center">
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#1C1C19]/30">Total Valuation</span>
                                <span className="text-xl font-sans font-black text-[#76592A]">₨{Number(total).toLocaleString()}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: SUPPORT & SOCIALS */}
                    <div className="space-y-6">
                        {/* WhatsApp Support Block */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-[#1C1C19] text-white p-8 text-center shadow-xl"
                        >
                            <h4 className="font-serif text-xl mb-4 italic">Need Assistance?</h4>
                            <p className="text-white/40 text-[11px] leading-relaxed mb-8 uppercase tracking-widest">
                                Our concierge is available for any queries regarding your order.
                            </p>

                            <a
                                href={`https://wa.me/923000000000?text=Order%20Confirmation%20${displayId}`}
                                target="_blank"
                                className="block w-full bg-[#25D366] text-white py-4 text-[10px] tracking-[0.3em] uppercase font-black hover:bg-[#1ebd5b] transition-all transform hover:-translate-y-1"
                            >
                                Chat on WhatsApp
                            </a>
                        </motion.div>

                        {/* Return to Archive */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-center"
                        >
                            <a href="/store" className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF77] font-bold border-b border-[#D4AF77]/20 pb-1 hover:border-[#D4AF77] transition-all">
                                Return to Archive
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-between items-center px-4 py-8 border-t border-[#1C1C19]/5"
                        >
                            <a href="#" className="text-[9px] tracking-[0.2em] uppercase text-[#1C1C19]/30 hover:text-[#D4AF77] transition-colors font-black">Insta</a>
                            <a href="#" className="text-[9px] tracking-[0.2em] uppercase text-[#1C1C19]/30 hover:text-[#D4AF77] transition-colors font-black">Fb</a>
                            <a href="#" className="text-[9px] tracking-[0.2em] uppercase text-[#1C1C19]/30 hover:text-[#D4AF77] transition-colors font-black">Tiktok</a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}