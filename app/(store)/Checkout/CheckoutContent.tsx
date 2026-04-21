"use client";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'; 

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  // 1. ADD STATE FOR PAYMENT METHOD
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Get data from URL
  const productName = searchParams.get("name") || "Product";
  const productPrice = parseFloat(searchParams.get("price") || "0");
  const selectedSize = searchParams.get("size") || "N/A";
  const productImage = searchParams.get("image") || "";

  // 2. DISCOUNT LOGIC
  const isAdvance = paymentMethod === "Advance Payment on Whatsapp";
  const discountAmount = isAdvance ? productPrice * 0.20 : 0;
  const shippingFee: number = 0;
  const total = productPrice - discountAmount + shippingFee;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const orderData = {
      full_name: formData.get("full_name"),
      email: formData.get("email") || "N/A",
      phone: formData.get("phone"),
      city: formData.get("city"),
      province: formData.get("province"),
      address: formData.get("address"),
      payment_method: paymentMethod, // Uses the state
      total_amount: total,           // Sends the discounted total to DB
      product_name: productName,
      size: selectedSize
    };

    try {
      const res = await fetch("/api/Orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const result = await res.json();
        const orderId = result.orderId;

        if (isAdvance) {
          const message = encodeURIComponent(
            `*NEW ORDER: ADVANCE PAYMENT (20% OFF)*\n\n` +
            `I want to do advance payment for this order.\n\n` +
            `*Order ID:* #EST-${orderId}\n` +
            `*Product:* ${productName}\n` +
            `*Size:* ${selectedSize}\n` +
            `*Price:* ₨ ${productPrice.toLocaleString()}\n` +
            `*Discount (20%):* -₨ ${discountAmount.toLocaleString()}\n` +
            `*Final Total:* ₨ ${total.toLocaleString()}\n\n` +
            `*Customer:* ${orderData.full_name}`
          );
          window.open(`https://wa.me/923010544620?text=${message}`, "_blank");
        }
        router.push(`/OrderSuccess`);
      }
    } catch (error) {
      alert("Order failed. Please contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const slideReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  // ... Rest of your component (JSX will follow in your next step)

  return (
    <main className="bg-[#1C1C19] min-h-screen text-[#FCF9F4]">
      <div className="flex flex-col lg:flex-row">

        {/* --- 1. THE DATA ATELIER (Left - 60vw) --- */}
        <div className="w-full lg:w-[60vw] px-8 md:px-16 lg:px-24 py-32 lg:py-48">
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl"
          >
            <header className="mb-24">
              <motion.span variants={slideReveal} className="text-[#FFFFFF] text-[10px] tracking-[0.6em] uppercase font-bold mb-6 block">
                Order Protocol
              </motion.span>
              <motion.h1 variants={slideReveal} className="text-5xl md:text-[100px] font-serif leading-[0.8] tracking-tighter text-white">
                <span className="italic font-light text-[#D4AF77]">Checkout.</span>
              </motion.h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-24">
              {/* Personal Information */}
              <motion.section variants={slideReveal} className="space-y-12">
                <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/30 border-b border-white/5 pb-4">
                  01. Client Identity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <input name="full_name" required className="peer w-full bg-transparent border-0 border-b border-white/10 py-3 text-white focus:ring-0 focus:border-[#D4AF77] transition-all duration-500 placeholder-transparent" id="full_name" placeholder="Name" type="text" />
                    <label className="absolute left-0 -top-6 text-[9px] tracking-widest uppercase font-bold text-[#D4AF77] peer-placeholder-shown:text-white/20 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-6 peer-focus:text-[9px] peer-focus:text-[#D4AF77] transition-all" htmlFor="full_name">Full Name *</label>
                  </div>
                  <div className="relative">
                    <input name="phone" required className="peer w-full bg-transparent border-0 border-b border-white/10 py-3 text-white focus:ring-0 focus:border-[#D4AF77] transition-all duration-500 placeholder-transparent" id="contact" placeholder="Phone" type="tel" />
                    <label className="absolute left-0 -top-6 text-[9px] tracking-widest uppercase font-bold text-[#D4AF77] peer-placeholder-shown:text-white/20 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-6 peer-focus:text-[9px] peer-focus:text-[#D4AF77] transition-all" htmlFor="contact">WhatsApp Number *</label>
                  </div>
                </div>
              </motion.section>

              {/* Delivery Logistics */}
              <motion.section variants={slideReveal} className="space-y-12">
                <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/30 border-b border-white/5 pb-4">
                  02. Logistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative">
                    <select name="province" className="w-full bg-transparent border-0 border-b border-white/10 py-3 text-white focus:ring-0 focus:border-[#D4AF77] appearance-none cursor-pointer">
                      <option className="bg-[#1C1C19]" value="Punjab">Punjab</option>
                      <option className="bg-[#1C1C19]" value="Sindh">Sindh</option>
                      <option className="bg-[#1C1C19]" value="KPK">KPK</option>
                      <option className="bg-[#1C1C19]" value="Balochistan">Balochistan</option>
                    </select>
                    <label className="absolute left-0 -top-6 text-[9px] tracking-widest uppercase font-bold text-[#D4AF77]">Province</label>
                  </div>
                  <div className="relative">
                    <input name="city" required className="peer w-full bg-transparent border-0 border-b border-white/10 py-3 text-white focus:ring-0 focus:border-[#D4AF77] transition-all duration-500 placeholder-transparent" id="city" placeholder="City" type="text" />
                    <label className="absolute left-0 -top-6 text-[9px] tracking-widest uppercase font-bold text-[#D4AF77] peer-placeholder-shown:text-white/20 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-6 peer-focus:text-[9px] peer-focus:text-[#D4AF77] transition-all" htmlFor="city">City *</label>
                  </div>
                  <div className="relative md:col-span-2">
                    <input name="address" required className="peer w-full bg-transparent border-0 border-b border-white/10 py-3 text-white focus:ring-0 focus:border-[#D4AF77] transition-all duration-500 placeholder-transparent" id="address" placeholder="Address" type="text" />
                    <label className="absolute left-0 -top-6 text-[9px] tracking-widest uppercase font-bold text-[#D4AF77] peer-placeholder-shown:text-white/20 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-6 peer-focus:text-[9px] peer-focus:text-[#D4AF77] transition-all" htmlFor="address">Full Delivery Address *</label>
                  </div>
                </div>
              </motion.section>

              {/* Settlement Strategy */}
            <motion.section variants={slideReveal} className="space-y-8">
  <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold text-white/30 border-b border-white/5 pb-4">
    03. Settlement
  </h2>
  <div className="flex flex-col gap-4">
    {["Advance Payment on Whatsapp", "COD"].map((method) => (
      <label 
        key={method} 
        className={`group relative flex items-center p-8 border transition-all duration-500 cursor-pointer 
          ${paymentMethod === method ? "border-[#D4AF77] bg-[#D4AF77]/5" : "border-white/5 bg-white/[0.02] hover:border-white/20"}`}
      >
        <input 
          name="payment" 
          value={method} 
          type="radio" 
          checked={paymentMethod === method}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-4 h-4 text-[#D4AF77] bg-transparent border-white/20 focus:ring-0" 
        />
        <div className="ml-6 flex-grow">
          <div className="flex justify-between items-center">
            <span className="block text-[11px] tracking-[0.3em] uppercase font-bold text-white">
              {method === "COD" ? "Cash on Delivery" : "Advance Payment"}
            </span>
            {method !== "COD" && (
              <span className="text-[9px] bg-[#D4AF77] text-black px-2 py-0.5 font-bold tracking-tighter rounded-sm">SAVE 20%</span>
            )}
          </div>
          <span className="text-[9px] tracking-widest uppercase text-white/40 mt-1 block">
            {method === "COD" ? "Pay upon Arrival" : "Contact on WhatsApp to Pay"}
          </span>
        </div>
      </label>
    ))}
  </div>
</motion.section>


              <div className="pt-12">
              <button 
  disabled={loading} 
  className="w-full bg-gradient-to-r from-[#76592A] to-[#D4AF77] text-white py-6 text-xs tracking-[0.3em] font-bold uppercase transition-all shadow-2xl"
>
  {loading ? "Establishing Order..." : "Authorize & Finalize Purchase"}
</button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* --- 2. THE FINANCIAL STATEMENT (Right - 40vw) --- */}
     <div className="w-full lg:w-[40vw] bg-white text-[#1C1C19] px-8 md:px-16 lg:px-24 py-32 lg:py-48 lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-center">
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
    className="space-y-16"
  >
    {/* --- ARCHITECTURAL HEADER --- */}
    <div className="space-y-4">
      <h2 className="text-[10px] tracking-[0.6em] uppercase font-bold text-[#1C1C19]/20 flex items-center gap-4">
        Selection Summary <div className="h-[1px] flex-grow bg-[#1C1C19]/5" />
      </h2>
    </div>

    {/* --- PRODUCT IDENTITY --- */}
    <div className="flex gap-10 items-start">
      <div className="w-36 h-48 bg-[#FCF9F4] overflow-hidden flex-shrink-0 shadow-[0_30px_60px_rgba(28,28,25,0.08)] border border-[#1C1C19]/5">
        <img 
          src={productImage?.toLowerCase().endsWith(".pdf") ? productImage.replace(".pdf", ".png") : productImage} 
          alt={productName} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#D4AF77]">Esturro Atelier</p>
          <h3 className="text-4xl font-serif leading-[0.9] text-[#1C1C19] tracking-tighter">{productName}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#1C1C19]/40">Size:</span>
            <span className="text-[11px] font-bold uppercase tracking-widest">{selectedSize || 'Standard'}</span>
          </div>
          <p className="text-2xl font-sans font-bold text-[#1C1C19]">₨{Number(productPrice).toLocaleString()}</p>
        </div>
      </div>
    </div>

    {/* --- THE LEDGER --- */}
    <div className="space-y-8 pt-12 border-t border-[#1C1C19]/10">
      <div className="flex justify-between items-center group">
        <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30 group-hover:text-[#1C1C19] transition-colors">Subtotal</span>
        <span className="text-sm font-sans font-bold text-[#1C1C19]">₨{Number(productPrice).toLocaleString()}</span>
      </div>

      {/* --- DYNAMIC DISCOUNT LINE --- */}
      {isAdvance && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center group">
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#D4AF77]">Advance Pay Reward (20%)</span>
          <span className="text-sm font-sans font-bold text-[#D4AF77]">-₨{Number(discountAmount).toLocaleString()}</span>
        </motion.div>
      )}

      <div className="flex justify-between items-center group">
        <div className="flex flex-col">
          <span className="text-[11px] tracking-[0.4em] uppercase font-bold text-[#1C1C19]/30 group-hover:text-[#1C1C19] transition-colors">Shipping Logistics</span>
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#D4AF77] font-bold mt-1">Standard Nationwide</span>
        </div>
        <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#D4AF77] italic">Complimentary</span>
      </div>
    </div>

    {/* --- FINAL SETTLEMENT --- */}
    <div className="pt-12 relative">
      <div className="absolute -inset-6 bg-[#FCF9F4] -z-10 opacity-50" />
      <div className="flex justify-between items-end mb-6">
        <div className="space-y-1">
          <span className="text-[12px] tracking-[0.6em] uppercase font-bold text-[#1C1C19]">Amount Due</span>
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#1C1C19]/30 font-serif italic">Total Atelier Valuation</p>
        </div>
        <span className="text-7xl font-sans font-bold tracking-tighter text-[#76592A] leading-none">
          ₨{Number(total).toLocaleString()}
        </span>
      </div>

      {/* Verification footer */}
      <div className="flex items-center gap-4 pt-8 border-t border-white/10">
        <div className="w-10 h-10 border border-white/20 bg-white/[0.03] flex items-center justify-center font-serif italic text-base text-[#D4AF77]">E</div>
        <p className="text-[8px] tracking-[0.5em] uppercase text-black/30 leading-loose">
          Hand-Crafted in <span className="text-black/60">Pakistan Atelier</span> <br />
          <span className="text-[#D4AF77]/60">Certified Signature Quality</span>
        </p>
      </div>
    </div>
  </motion.div>
</div>


      </div>
    </main>
  );
}
