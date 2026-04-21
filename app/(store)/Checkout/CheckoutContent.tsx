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
      window.alert("Order Confirmed!! for any help contact on Whatsapp")
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
     <div className="w-full lg:w-[60vw] px-5 md:px-16 lg:px-24 py-10 lg:py-32">
  <motion.div
    initial="hidden" animate="visible"
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    className="max-w-2xl mx-auto lg:mx-0"
  >
    <header className="mb-10 lg:mb-20">
      <motion.span variants={slideReveal} className="text-[#D4AF77] text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black mb-2 block">
        Order Protocol
      </motion.span>
      <motion.h1 variants={slideReveal} className="text-4xl md:text-7xl lg:text-[90px] font-serif leading-tight tracking-tighter text-white">
        <span className="italic font-light text-[#D4AF77]">Checkout</span>
      </motion.h1>
    </header>

   <form onSubmit={handleSubmit} className="space-y-12 lg:space-y-20">
  {/* 01. Client Identity */}
  <motion.section variants={slideReveal} className="space-y-8 lg:space-y-10">
    <h2 className="text-[11px] tracking-[0.3em] uppercase font-black text-white border-b-2 border-[#D4AF77] pb-3">
      01. Client Identity
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
      {[
        { id: "full_name", label: "Full Name *", type: "text", name: "full_name", required: true },
        { id: "contact", label: "WhatsApp Number *", type: "tel", name: "phone", required: true },
        { id: "email", label: "Email Address (Optional)", type: "email", name: "email", wide: true, required: false }
      ].map((field) => (
        <div key={field.id} className={`relative ${field.wide ? 'md:col-span-2' : ''}`}>
          <input 
            name={field.name}
            required={field.required} 
            className="peer w-full bg-white/[0.05] border-b-2 border-white py-3 px-1 text-white focus:ring-0 focus:border-[#D4AF77] transition-all duration-300 placeholder-transparent text-base font-bold" 
            id={field.id} 
            placeholder=" " 
            type={field.type} 
          />
          <label className="absolute left-0 -top-6 text-[10px] tracking-widest uppercase font-black text-[#D4AF77] peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 peer-focus:text-[#D4AF77] transition-all" htmlFor={field.id}>
            {field.label}
          </label>
        </div>
      ))}
    </div>
  </motion.section>

  {/* 02. Logistics */}
  <motion.section variants={slideReveal} className="space-y-8 lg:space-y-10">
    <h2 className="text-[11px] tracking-[0.3em] uppercase font-black text-white border-b-2 border-[#D4AF77] pb-3">
      02. Logistics
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
      <div className="relative">
        <select name="province" className="w-full bg-transparent border-b-2 border-white py-3 text-white focus:ring-0 focus:border-[#D4AF77] appearance-none cursor-pointer font-bold text-base">
          <option className="bg-[#1C1C19]" value="Punjab">Punjab</option>
          <option className="bg-[#1C1C19]" value="Sindh">Sindh</option>
          <option className="bg-[#1C1C19]" value="KPK">KPK</option>
          <option className="bg-[#1C1C19]" value="Balochistan">Balochistan</option>
        </select>
        <label className="absolute left-0 -top-6 text-[10px] tracking-widest uppercase font-black text-[#D4AF77]">Province</label>
      </div>
      <div className="relative">
        <input name="city" required className="peer w-full bg-white/[0.05] border-b-2 border-white py-3 px-1 text-white focus:ring-0 focus:border-[#D4AF77] transition-all text-base font-bold placeholder-transparent" id="city" placeholder=" " type="text" />
        <label className="absolute left-0 -top-6 text-[10px] tracking-widest uppercase font-black text-[#D4AF77] peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 transition-all" htmlFor="city">City *</label>
      </div>
      <div className="relative md:col-span-2">
        <input name="address" required className="peer w-full bg-white/[0.05] border-b-2 border-white py-3 px-1 text-white focus:ring-0 focus:border-[#D4AF77] transition-all text-base font-bold placeholder-transparent" id="address" placeholder=" " type="text" />
        <label className="absolute left-0 -top-6 text-[10px] tracking-widest uppercase font-black text-[#D4AF77] peer-placeholder-shown:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-6 transition-all" htmlFor="address">Full Delivery Address *</label>
      </div>
    </div>
  </motion.section>

  {/* 03. Settlement */}
  <motion.section variants={slideReveal} className="space-y-6">
    <h2 className="text-[11px] tracking-[0.3em] uppercase font-black text-white border-b-2 border-[#D4AF77] pb-3">
      03. Settlement
    </h2>
    <div className="flex flex-col gap-4">
      {["Advance Payment on Whatsapp", "COD"].map((method) => (
        <label 
          key={method} 
          className={`group relative flex items-center p-6 border-2 transition-all duration-500 cursor-pointer 
            ${paymentMethod === method ? "border-[#D4AF77] bg-[#D4AF77]/10" : "border-white/20 bg-white/[0.02] hover:border-white"}`}
        >
          <input 
            name="payment" 
            value={method} 
            type="radio" 
            checked={paymentMethod === method}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-5 h-5 text-[#D4AF77] bg-black border-white focus:ring-0" 
          />
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
              <span className="block text-xs md:text-sm tracking-widest uppercase font-black text-white">
                {method === "COD" ? "Cash on Delivery" : "Pay via WhatsApp"}
              </span>
              {method !== "COD" && (
                <span className="text-[10px] bg-white text-black px-3 py-1 font-black rounded-sm">SAVE 20%</span>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  </motion.section>

  <div className="pt-10">
    <button 
      disabled={loading} 
      className="w-full bg-[#D4AF77] text-black py-6 text-xs md:text-sm tracking-[0.4em] font-black uppercase hover:bg-white transition-all active:scale-[0.98] shadow-2xl"
    >
      {loading ? "Confirming Order..." : "Complete Purchase"}
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
  src={(() => {
    // 1. Get the first image from the comma-separated string
    const firstUrl = productImage?.split(',')[0] || "";
    
    // 2. Apply your existing PDF conversion logic to that single URL
    return firstUrl.toLowerCase().endsWith(".pdf") 
      ? firstUrl.replace(".pdf", ".png") 
      : firstUrl;
  })()} 
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
          Hand-Crafted in <span className="text-black/60">Pakistan Euturro</span> <br />
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
