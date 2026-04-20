"use client";
import { useEffect, useState } from "react";
import { Edit2, Trash2, FileText, ChevronRight, Download, X } from "lucide-react";
import ShippingReceipt from "../components/Recipt";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/Orders");
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    const handleStatusUpdate = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
            const res = await fetch(`/api/Orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) fetchOrders(); // Refresh table
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Permanently purge this record?")) {
            try {
                const res = await fetch(`/api/Orders/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    // Refresh list
                    setOrders(orders.filter(order => order.id !== id));
                }
            } catch (error) {
                alert("Archive update failed.");
            }
        }
    };


    const handleViewReceipt = (order: any) => {
        setSelectedOrder(order);
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return new Date(b.created_at) - new Date(a.created_at); // Sort by date within categories
    });

    const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount || 0), 0);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FCF9F4]">
            <p className="font-sans uppercase tracking-[0.5em] text-[10px] text-[#1C1C19]/40 animate-pulse">Establishing Secure Link...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto bg-[#FCF9F4] min-h-screen text-[#1C1C19]">


            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-[#1C1C19]/5 pb-10">
                <div className="space-y-4">
                    <span className="text-[#D4AF77] text-[10px] tracking-[0.5em] uppercase font-bold block">Internal Ledger</span>
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tighter leading-none">Orders <span className="italic font-light">Archive</span></h2>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-[#1C1C19] text-[#FCF9F4] text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#D4AF77] transition-all duration-500">
                        <Download size={14} /> Export Archive
                    </button>
                </div>
            </div>

            <div className="bg-white border border-[#1C1C19]/5 shadow-sm overflow-hidden">

                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F6F3EE]">
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5">ID</th>
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5">Client</th>
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5">Location</th>
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5">Amount</th>
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5">Status</th>
                                <th className="px-6 py-5 text-[9px] tracking-[0.3em] uppercase font-bold text-[#1C1C19]/40 border-b border-[#1C1C19]/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1C1C19]/5 font-sans">
                            {sortedOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-[#FCF9F4]/50 transition-colors">
                                    <td className="px-6 py-5 text-[11px] font-bold text-[#D4AF77]">#EST-{order.id.toString().padStart(4, '0')}</td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs font-bold uppercase text-[#1C1C19]">{order.full_name}</div>
                                        <div className="text-[10px] text-[#1C1C19]/40">{order.phone}</div>
                                    </td>
                                    <td className="px-6 py-5 text-[10px] text-[#1C1C19]/60 uppercase tracking-widest font-bold">{order.city}</td>
                                    <td className="px-6 py-5 font-serif italic text-base">₨{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${order.status === 'Pending' ? 'border-orange-200 text-orange-600 bg-orange-50/50' :
                                                order.status === 'Failed' ? 'border-red-200 text-red-600 bg-red-50/50' :
                                                    'border-green-100 text-green-700 bg-green-50/50'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleViewReceipt(order)} className="p-2 hover:bg-[#D4AF77]/10 text-[#D4AF77] transition-all" title="View Receipt">
                                                <FileText size={16} />
                                            </button>
                                            <button onClick={() => handleStatusUpdate(order.id, order.status)} className="p-2 hover:bg-gray-100 text-gray-500 transition-all" title="Toggle Status">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(order.id)} className="p-2 hover:bg-red-50 text-red-400 transition-all" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARD VIEW */}
                <div className="lg:hidden divide-y divide-[#1C1C19]/5">
                    {sortedOrders.map((order) => (
                        <div key={order.id} className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-bold text-[#D4AF77] mb-1">#EST-{order.id.toString().padStart(4, '0')}</p>
                                    <h3 className="text-sm font-black uppercase text-[#1C1C19]">{order.full_name}</h3>
                                    <p className="text-[10px] text-[#1C1C19]/40 uppercase tracking-widest">{order.city}</p>
                                </div>
                                <span className={`px-3 py-1 text-[8px] font-black uppercase border ${order.status === 'Pending' ? 'border-orange-200 text-orange-600' :
                                        order.status === 'Failed' ? 'border-red-200 text-red-600' :
                                            'border-green-100 text-green-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <p className="text-lg font-serif italic">₨{Number(order.total_amount).toLocaleString()}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => handleViewReceipt(order)} className="p-3 bg-[#D4AF77]/10 text-[#76592A] active:scale-95">
                                        <FileText size={18} />
                                    </button>
                                    <button onClick={() => handleStatusUpdate(order.id, order.status)} className="p-3 bg-gray-50 text-[#1C1C19] active:scale-95" title="Toggle Status">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(order.id)} className="p-3 bg-red-50 text-red-500 active:scale-95">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* --- FOOTER STATS --- */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
                <p className="text-[9px] tracking-[0.3em] uppercase font-bold">{orders.length} Entries in Manifest</p>
            
            </div>
            {/* --- RECEIPT MODAL --- */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C19]/90 backdrop-blur-sm overflow-y-auto">
                    <div className="relative w-full max-w-4xl animate-in fade-in zoom-in duration-300 my-auto">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors print:hidden"
                        >
                            <X size={24} />
                        </button>
                        <div className="bg-white shadow-2xl">
                            <ShippingReceipt order={selectedOrder} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
