"use client";
import React from 'react';

export default function ShippingReceipt({ order, onClose }: { order: any, onClose: () => void }) {
  // Current date for the manifest
  const today = new Date().toLocaleDateString('en-PK', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white overflow-y-auto min-h-screen">
      
      {/* --- SIMPLE CLOSE BUTTON (Top Left) --- */}
      <button 
        onClick={onClose}
        className="fixed top-6 left-6 z-[1000] bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest print:hidden hover:bg-zinc-800 transition-colors"
      >
        ✕ Close
      </button>

      <div className="max-w-[800px] mx-auto bg-white p-12 text-black font-sans border border-gray-100 print:border-0 print:p-0 mt-10 md:mt-0">
        
        {/* --- HEADER ARCHITECTURE --- */}
        <div className="flex justify-between items-start border-b-2 border-black pb-10 mb-12">
          <div>
            <h1 className="text-4xl font-serif tracking-tighter uppercase mb-2">Esturro</h1>
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold">Modern Shirts Store</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] tracking-widest uppercase font-bold">Shipping Manifest</p>
            <p className="text-xl font-mono font-bold">#EST-{order.id.toString().padStart(5, '0')}</p>
            <p className="text-[10px] uppercase opacity-60">{today}</p>
          </div>
        </div>

        {/* --- LOGISTICS GRID --- */}
        <div className="grid grid-cols-2 gap-20 mb-16">
          <div className="space-y-4">
            <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-black/10 pb-2">Purchase By.</h2>
            <div className="space-y-1">
              <p className="text-lg font-bold uppercase">{order.full_name}</p>
              <p className="text-sm leading-relaxed text-black/80">{order.address}</p>
              <p className="text-sm font-bold uppercase">{order.city}, {order.province}</p>
              <p className="text-sm font-mono pt-2">{order.phone}</p>
            </div>
          </div>
          
          <div className="space-y-4 text-right">
            <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-black/10 pb-2 text-right">From</h2>
            <div className="space-y-1 text-sm text-black/80">
              <p className="font-bold uppercase">Esturro Shirts</p>
              <p>Rawalpindi , DhokeHassu</p>
              <p>Islamabad, Pakistan</p>
              <p className="font-mono pt-2">+92 301 0544620</p>
            </div>
          </div>
        </div>

        {/* --- PRODUCT LEDGER --- */}
        <table className="w-full mb-16 border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-4 text-left text-[10px] tracking-widest uppercase font-bold">Description</th>
              <th className="py-4 text-center text-[10px] tracking-widest uppercase font-bold">Reference</th>
              <th className="py-4 text-center text-[10px] tracking-widest uppercase font-bold">Size</th>
              <th className="py-4 text-right text-[10px] tracking-widest uppercase font-bold">Valuation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            <tr>
              <td className="py-8">
                <p className="text-lg font-serif italic">{order.product_name || "Premium Silhouette Series"}</p>
              </td>
              <td className="py-8 text-center font-mono text-sm">#EST-{order.id.toString().padStart(4, '0')}</td>
              <td className="py-8 text-center font-bold uppercase">{order.size || "Standard"}</td>
              <td className="py-8 text-right font-bold">₨ {Number(order.total_amount).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        {/* --- SETTLEMENT SUMMARY --- */}
        <div className="flex justify-end mb-24">
          <div className="w-72 space-y-4">
            <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase border-b border-black/5 pb-2">
              <span className="text-black/40">Settlement Mode</span>
              <span className="font-bold">{order.payment_method || "COD"}</span>
            </div>
            <div className="flex justify-between items-baseline pt-4">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Total Valuation</span>
              <span className="text-3xl font-sans font-bold tracking-tighter">₨ {Number(order.total_amount).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* --- ATELIER FOOTER --- */}
        <div className="border-t border-black pt-10 flex justify-between items-end opacity-60">
          <div className="max-w-xs space-y-4">
            <p className="text-[8px] tracking-[0.3em] uppercase leading-relaxed font-bold">
              This manifest verifies the authenticity of the garment. 
              All pieces are inspected at our Islamabad Atelier for architectural precision before dispatch.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-black flex items-center justify-center font-serif italic text-xl select-none">E</div>
              <div className="w-10 h-10 border border-black flex items-center justify-center font-serif italic text-xl select-none">S</div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] tracking-[0.5em] uppercase font-bold">Esturro </p>
            <p className="text-[9px] tracking-[0.5em] uppercase font-bold mt-1">esturro.Store</p>
          </div>
        </div>

        {/* ACTION BUTTONS - HIDDEN DURING PRINT */}
        <div className="mt-12 flex justify-center gap-6 print:hidden pb-12">
          <button 
            onClick={() => window.print()}
            className="bg-[#1C1C19] text-white px-10 py-5 text-[10px] tracking-[0.3em] uppercase font-bold "
          >
            Print Shipping Manifest
          </button>
        </div>
      </div>
    </div>
  );
}
