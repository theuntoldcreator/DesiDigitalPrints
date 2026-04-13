import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

export default function AdminWindow({ title, icon: Icon, children, onClose, onMinimize, isActive, zIndex }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragListener={true}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, zIndex }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={`absolute w-[90%] max-w-[900px] h-[75vh] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] border border-white/40 flex flex-col overflow-hidden ${isActive ? 'ring-2 ring-[#bf1e2e]/20' : ''}`}
      style={{ left: '5%', top: '10%' }}
    >
      {/* Window Title Bar */}
      <div className="h-14 bg-white/40 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 cursor-grab active:cursor-grabbing select-none shrink-0">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-8 h-8 bg-[#bf1e2e] rounded-lg flex items-center justify-center shadow-lg shadow-[#bf1e2e]/20">
              <Icon className="w-4 h-4 text-white" />
            </div>
          )}
          <span className="font-black text-sm uppercase tracking-tighter text-gray-800">{title}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onMinimize}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors hidden md:flex">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-500 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {children}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
}
