"use client";
import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Orders from API
    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // 2. Calculate Stats
    const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const avgValue = orders.length > 0 ? (totalRevenue / orders.length).toFixed(0) : 0;

    if (loading) return <div className="p-20 text-center font-manrope uppercase tracking-widest text-[10px]">Loading Atelier Records...</div>;

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <p className="text-primary font-body text-xs tracking-[0.2em] uppercase font-semibold">Atelier Operations</p>
                    <h2 className="text-5xl md:text-6xl font-headline tracking-tighter text-on-surface">Order Management</h2>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-surface-container-low text-on-surface border border-outline-variant/20 font-label text-[10px] tracking-[0.2em] uppercase hover:bg-surface-container transition-colors">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-outline-variant/10 mb-12">
                <div className="bg-white p-8 space-y-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface/60">Total Revenue</p>
                    <p className="text-3xl font-headline italic">PKR {totalRevenue.toLocaleString()}</p>
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Live Balance</p>
                </div>
                <div className="bg-white p-8 space-y-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface/60">Pending Orders</p>
                    <p className="text-3xl font-headline">{pendingOrders}</p>
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Awaiting Fulfillment</p>
                </div>
                <div className="bg-white p-8 space-y-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface/60">Average Value</p>
                    <p className="text-3xl font-headline">{Number(avgValue).toLocaleString()}</p>
                    <p className="text-[10px] text-on-surface/40 uppercase tracking-wider">Per Transaction</p>
                </div>
                <div className="bg-white p-8 space-y-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface/60">Total Volume</p>
                    <p className="text-3xl font-headline">{orders.length}</p>
                    <p className="text-[10px] text-on-surface/40 uppercase tracking-wider">Total Orders</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-outline-variant/10 shadow-[0_20px_40px_rgba(28,28,25,0.02)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low">
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10">Order ID</th>
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10">Customer Details</th>
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10">City</th>
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10">Amount (PKR)</th>
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10">Status</th>
                                <th className="px-8 py-6 text-[10px] tracking-[0.2em] uppercase font-semibold text-on-surface/60 border-b border-outline-variant/10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-surface-bright transition-colors">
                                    <td className="px-8 py-6 font-mono text-xs text-primary font-bold">#EST-{order.id.toString().padStart(5, '0')}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-[10px] font-bold">
                                                {order.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-tight">{order.full_name}</p>
                                                <p className="text-[10px] text-on-surface/50 tracking-wider">{order.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-on-surface/70 uppercase tracking-widest">{order.city}</td>
                                    <td className="px-8 py-6 font-headline italic text-lg">{Number(order.total_amount).toLocaleString()}</td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-600 border-green-200'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-b-2 border-primary/20 pb-0.5 transition-all hover:border-primary">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 border-t border-outline-variant/10 flex items-center justify-between">
                    <p className="text-[10px] text-on-surface/50 uppercase tracking-widest">Total {orders.length} orders recorded</p>
                </div>
            </div>
        </div>
    );
}
