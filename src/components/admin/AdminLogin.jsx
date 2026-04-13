import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      const sessionData = {
        isLoggedIn: true,
        loginTime: Date.now()
      };
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
      onLogin();
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-[400px] text-center mb-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(191,30,46,0.3)] mb-6 bg-white border-4 border-white transform hover:scale-105 transition-all">
           <img src="/images/logo.png" alt="Desi Prints Logo" className="w-full h-full object-cover scale-110" />
        </div>
        <h1 className="text-[#bf1e2e] text-6xl font-black tracking-tighter mb-4 drop-shadow-sm">DesiPrints</h1>
        <p className="text-xl text-gray-700 leading-tight px-4">
          Admin Dashboard Management for Your Digital Invitation Store.
        </p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-[400px] border border-gray-100"
      >
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md bg-white border border-gray-100">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
          </div>
            <h2 className="text-xl font-semibold">Enter Admin PIN</h2>
          </div>

          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter 4-digit PIN"
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#1877f2] text-white py-3 rounded-lg text-xl font-bold hover:bg-[#166fe5] transition-colors"
          >
            Log In
          </button>

          <div className="border-t border-gray-200 mt-4 pt-4 text-center">
            <button
              type="button"
              className="bg-[#42b72a] text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-[#36a420] transition-colors"
            >
              Reset PIN
            </button>
          </div>
        </form>
      </motion.div>

      <div className="mt-8 text-sm text-gray-500 text-center">
        <b>Desi Digital Prints</b> for Business & Wedding Planning.
      </div>
    </div>
  );
}
