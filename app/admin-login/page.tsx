"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/Order'); // Or wherever the dashboard main page is
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm w-full bg-white border border-black/5 p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif text-[#1C1C19] tracking-[0.15em] mb-1">
            ESTURRO
          </h1>
          <div className="h-[1px] w-8 bg-[#D4AF77] mx-auto mb-3"></div>
          <p className="text-black/40 text-[10px] tracking-[0.25em] uppercase font-medium">
            Authorized Access Only
          </p>
        </div>

        {/* Form - Backend Logic Preserved */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label className="text-[10px] uppercase tracking-widest text-black/40 mb-2 block ml-1">
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F5F5F3] border-none text-[#1C1C19] px-4 py-4 focus:ring-1 focus:ring-[#D4AF77] focus:outline-none transition-all placeholder:text-black/20 text-center text-sm"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[11px] text-center italic"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1C1C19] hover:bg-[#2C2C28] text-white font-light py-4 px-6 transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-[11px]"
          >
            {loading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>
      </motion.div>

  
     
    </div>
  );
}
