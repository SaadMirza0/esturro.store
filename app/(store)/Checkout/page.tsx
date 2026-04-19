"use client";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Get data from URL
  const productName = searchParams.get("name") || "Product";
  const productPrice = parseFloat(searchParams.get("price") || "0");
  const selectedSize = searchParams.get("size") || "N/A";
  const productImage = searchParams.get("image") || "";

  const shippingFee: number = 0; // Free shipping for now, or you can change this
  const total = productPrice + shippingFee;

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
      payment_method: formData.get("payment"),
      // Use the real data from URL
      total_amount: total, 
      product_name: productName,
      size: selectedSize
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        window.location.href = "/order-success";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Order failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-on-surface mb-4">Checkout</h1>
            <p className="text-sm tracking-widest uppercase text-on-surface-variant/70">Shipping and Payment Details</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <h2 className="text-2xl mb-8 font-headline italic">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="relative group">
                  <input name="full_name" required className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300" id="full_name" placeholder=" " type="text" />
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary" htmlFor="full_name">Full Name *</label>
                </div>
                <div className="relative group">
                  <input name="email" className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300" id="email" placeholder=" " type="email" />
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary" htmlFor="email">Email Address (Optional)</label>
                </div>
                <div className="relative group md:col-span-2">
                  <input name="phone" required className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300" id="contact" placeholder=" " type="tel" />
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary" htmlFor="contact">WhatsApp Number *</label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl mb-8 font-headline italic">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="relative group">
                  <select name="province" className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300 appearance-none" id="province">
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">KPK</option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60" htmlFor="province">Province</label>
                </div>
                <div className="relative group">
                  <input name="city" required className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300" id="city" placeholder=" " type="text" />
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary" htmlFor="city">City *</label>
                </div>
                <div className="relative group md:col-span-2">
                  <input name="address" required className="peer block w-full px-0 py-2 bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary transition-colors duration-300" id="address" placeholder=" " type="text" />
                  <label className="absolute left-0 top-2 -z-10 origin-[0] -translate-y-6 scale-75 text-xs tracking-widest uppercase text-on-surface-variant/60 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary" htmlFor="address">Full Delivery Address *</label>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl mb-8 font-headline italic">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-6 bg-surface-container-low border border-transparent cursor-pointer group hover:border-black transition-all">
                  <input defaultChecked name="payment" value="Advance Payment" className="w-4 h-4 text-black border-outline-variant focus:ring-0" type="radio" />
                  <div className="ml-4">
                    <span className="block text-xs tracking-[0.2em] uppercase font-bold">Advance Payment</span>
                    <span className="text-[10px] text-on-surface-variant/60 tracking-wider">SECURE ONLINE TRANSACTION</span>
                  </div>
                </label>
                <label className="flex items-center p-6 bg-surface-container-low border border-transparent cursor-pointer group hover:border-black transition-all">
                  <input name="payment" value="COD" className="w-4 h-4 text-black border-outline-variant focus:ring-0" type="radio" />
                  <div className="ml-4">
                    <span className="block text-xs tracking-[0.2em] uppercase font-bold">Cash on Delivery</span>
                    <span className="text-[10px] text-on-surface-variant/60 tracking-wider">PAY UPON ARRIVAL</span>
                  </div>
                </label>
              </div>
            </section>

            <div className="pt-8">
              <button disabled={loading} className="w-full bg-black text-white py-6 text-xs tracking-[0.3em] font-bold uppercase hover:bg-zinc-800 transition-all duration-500 shadow-sm disabled:opacity-50" type="submit">
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
           <div className="bg-[#FAF9F6] p-10 lg:sticky lg:top-40 border border-outline-variant/10">
             <h2 className="text-2xl mb-10 font-headline italic">Order Summary</h2>
             
             <div className="flex gap-6 mb-10 pb-10 border-b border-outline-variant/20">
               <div className="w-24 h-32 bg-white overflow-hidden flex-shrink-0">
                 <img src={productImage} alt={productName} className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col justify-center">
                 <h3 className="text-lg font-bold mb-1">{productName}</h3>
                 <p className="text-xs tracking-[0.2em] uppercase text-on-surface-variant/60 mb-2">Size: {selectedSize}</p>
                 <p className="text-sm font-bold">₨{productPrice.toLocaleString()}</p>
               </div>
             </div>

             <div className="space-y-4 mb-8">
               <div className="flex justify-between text-xs tracking-widest uppercase text-on-surface-variant/70">
                 <span>Subtotal</span>
                 <span>₨{productPrice.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-xs tracking-widest uppercase text-on-surface-variant/70">
                 <span>Shipping</span>
                 <span>{shippingFee === 0 ? "FREE" : `₨${shippingFee.toLocaleString()}`}</span>
               </div>
             </div>

             <div className="flex justify-between border-t border-black pt-6">
               <span className="text-sm tracking-[0.2em] font-bold uppercase">Total</span>
               <span className="text-3xl font-bold tracking-tight">₨{total.toLocaleString()}</span>
             </div>

             <div className="mt-10 p-4 border border-primary/20 bg-primary/5">
                <p className="text-[10px] tracking-widest uppercase text-center font-bold text-primary">Limited Edition Product</p>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
