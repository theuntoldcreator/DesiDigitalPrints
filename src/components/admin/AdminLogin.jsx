import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await pb.admins.authWithPassword(email, password);
      onLogin();
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
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
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#bf1e2e] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#bf1e2e] focus:bg-white transition-all"
              />
            </div>
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
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#bf1e2e] transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
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
