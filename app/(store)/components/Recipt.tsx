"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer } from 'lucide-react';

export default function ShippingReceipt({ order, isOpen, onClose }: { order: any, isOpen: boolean, onClose: () => void }) {
  
  // Handle Scroll Lock and Escape Key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!order) return null;

  const today = new Date().toLocaleDateString('en-PK', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center sm:p-4 md:p-8">
          
          {/* 1. DARK GLASS OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1C1C19]/90 backdrop-blur-md cursor-zoom-out print:hidden"
          />

          {/* 2. THE RECEIPT CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="relative w-full max-w-[850px] h-full max-h-[95vh] bg-white overflow-y-auto 0px shadow-2xl print:max-h-full print:overflow-visible print:shadow-none"
          >
            {/* STICKY ACTION BAR (Hidden during print) */}
            <div className="sticky top-0 right-0 w-full flex justify-end gap-4 p-6 bg-white/80 backdrop-blur-md z-20 border-b border-gray-100 print:hidden">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-[#1C1C19] text-white px-6 py-2.5 text-[10px] tracking-widest uppercase font-bold hover:bg-[#D4AF77] transition-all active:scale-95"
              >
                <Printer size={14} /> Print
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* THE ACTUAL PRINTABLE CONTENT */}
            <div className="p-8 md:p-16 text-black font-sans print:p-0">
              
              {/* --- HEADER --- */}
              <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-12">
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif tracking-tighter uppercase mb-2">Esturro</h1>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-60">Atelier Archive</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] tracking-widest uppercase font-bold mb-2">Manifest</p>
                  <p className="text-xl md:text-2xl font-mono font-bold">#EST-{order.id.toString().padStart(5, '0')}</p>
                  <p className="text-[10px] uppercase opacity-40 mt-1">{today}</p>
                </div>
              </div>

              {/* --- LOGISTICS --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-4">
                  <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-black/10 pb-2">Client</h2>
                  <div className="space-y-1">
                    <p className="text-lg font-bold uppercase">{order.full_name}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{order.address}</p>
                    <p className="text-sm font-bold uppercase">{order.city}, {order.province}</p>
                    <p className="text-sm font-mono pt-2">{order.phone}</p>
                  </div>
                </div>
                
                <div className="space-y-4 md:text-right">
                  <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-black/10 pb-2">Origin</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-bold text-black uppercase">Esturro Atelier House</p>
                    <p>Industrial Area, Sector I-9</p>
                    <p>Islamabad, Pakistan</p>
                    <p className="font-mono pt-2">+92 301 0544620</p>
                  </div>
                </div>
              </div>

              {/* --- TABLE --- */}
              <div className="mb-16">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="py-4 text-left text-[10px] tracking-widest uppercase font-bold">Description</th>
                      <th className="py-4 text-center text-[10px] tracking-widest uppercase font-bold hidden sm:table-cell">Ref</th>
                      <th className="py-4 text-right text-[10px] tracking-widest uppercase font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-10">
                        <p className="text-2xl font-serif italic">{order.product_name || "Signature Silhouette"}</p>
                        <p className="text-[9px] uppercase tracking-widest text-black/40 mt-1">Size: {order.size || "Standard"} / Premium Giza Cotton</p>
                      </td>
                      <td className="py-10 text-center font-mono text-sm hidden sm:table-cell">#EST-{order.id}</td>
                      <td className="py-10 text-right font-bold text-lg">₨ {Number(order.total_amount).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* --- SUMMARY --- */}
              <div className="flex justify-end mb-20">
                <div className="w-full max-w-xs space-y-4">
                  <div className="flex justify-between text-xs tracking-widest uppercase border-b border-black/5 pb-2">
                    <span className="text-gray-400">Method</span>
                    <span className="font-bold">{order.payment_method || "COD"}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4">
                    <span className="text-[11px] tracking-[0.4em] uppercase font-bold">Total Due</span>
                    <span className="text-4xl font-sans font-bold tracking-tighter">₨ {Number(order.total_amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* --- FOOTER --- */}
              <div className="border-t border-black pt-10 flex justify-between items-end">
                <div className="max-w-xs space-y-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase leading-loose font-medium opacity-50">
                    Hand-finished in Islamabad. <br />
                    Manifest verified for authenticity.
                  </p>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-black flex items-center justify-center font-serif italic text-xl bg-black text-white">E</div>
                    <div className="w-10 h-10 border border-black flex items-center justify-center font-serif italic text-xl">S</div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-[0.5em] uppercase font-black">Esturro</p>
                  <p className="text-[10px] font-bold text-gray-400">esturro.store</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
