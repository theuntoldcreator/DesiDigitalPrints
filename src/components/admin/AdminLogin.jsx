import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const ADMIN_PIN = '8055';

export default function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (pin === ADMIN_PIN) {
        onLogin();
      } else {
        setError('Invalid PIN. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);

    // Auto-login when correct 4-digit PIN is entered
    if (value.length === 4 && value === ADMIN_PIN) {
      setLoading(true);
      setTimeout(() => onLogin(), 400);
    } else if (value.length === 4 && value !== ADMIN_PIN) {
      setError('Invalid PIN. Please try again.');
      setTimeout(() => { setPin(''); setError(''); }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-[440px] text-center mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl mb-4 bg-white border-2 border-white transform hover:rotate-3 transition-all">
           <img src="/images/logo.png" alt="Desi Prints Logo" className="w-full h-full object-cover scale-110" />
        </div>
        <h1 className="text-[#bf1e2e] text-4xl font-black tracking-tighter mb-2">Digital Admin</h1>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Premium Management Portal</p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[440px] border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-gray-400" />
            </div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Enter Admin PIN</label>
            <input
              type="password"
              inputMode="numeric"
              required
              value={pin}
              onChange={handlePinChange}
              placeholder="••••"
              maxLength={4}
              className="w-48 p-4 bg-gray-50 border border-gray-200 rounded-xl text-2xl font-black text-center tracking-[0.5em] focus:outline-none focus:border-[#bf1e2e] focus:bg-white transition-all"
              autoFocus
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#bf1e2e] text-xs font-bold text-center bg-red-50 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || pin.length < 4}
            className="w-full bg-black text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#bf1e2e] transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </button>
        </form>
      </motion.div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onClick={() => window.location.href = '/'}
          className="text-sm font-bold text-gray-400 hover:text-[#bf1e2e] transition-all flex items-center gap-2 group"
        >
          ← <span className="group-hover:underline">Back to Website</span>
        </button>
        <div className="text-sm text-gray-500 text-center">
          <b>Desi Digital Prints</b> for Business & Wedding Planning.
        </div>
      </div>
    </div>
  );
}
