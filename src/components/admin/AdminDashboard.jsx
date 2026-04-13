import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Image as ImageIcon, 
  Layers, 
  LogOut, 
  Search, 
  Plus, 
  MoreHorizontal,
  Bell,
  User
} from 'lucide-react';
import OccasionManager from './OccasionManager';
import ImageManager from './ImageManager';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('images'); // 'occasions', 'images'
  const [occasions, setOccasions] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  useEffect(() => {
    fetch('/api/occasions')
      .then(res => res.json())
      .then(data => {
        setOccasions(data);
        if (data.length > 0) setSelectedOccasion(data[0]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-14 bg-white shadow-sm flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md bg-[#bf1e2e]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="bg-[#f0f2f5] rounded-full px-3 py-2 flex items-center gap-2 w-[240px]">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search DesiPrints" 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center max-w-xl">
          <button className={`p-2 border-b-4 ${activeTab === 'home' ? 'border-[#1877f2] text-[#1877f2]' : 'border-transparent text-gray-500'}`}>
            <Home className="w-7 h-7" />
          </button>
          <button 
            onClick={() => setActiveTab('occasions')}
            className={`p-2 border-b-4 ${activeTab === 'occasions' ? 'border-[#1877f2] text-[#1877f2]' : 'border-transparent text-gray-500'}`}
          >
            <Layers className="w-7 h-7" />
          </button>
          <button 
            onClick={() => setActiveTab('images')}
            className={`p-2 border-b-4 ${activeTab === 'images' ? 'border-[#1877f2] text-[#1877f2]' : 'border-transparent text-gray-500'}`}
          >
            <ImageIcon className="w-7 h-7" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="bg-[#e4e6eb] p-2 rounded-full cursor-pointer hover:bg-gray-300">
            <Bell className="w-5 h-5 text-black" />
          </div>
          <button 
            onClick={onLogout}
            className="bg-[#e4e6eb] p-2 rounded-full cursor-pointer hover:bg-gray-300 text-black"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="bg-[#e4e6eb] p-2 rounded-full cursor-pointer hover:bg-gray-300">
            <User className="w-5 h-5 text-black" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[300px] hidden lg:flex flex-col p-4 gap-2 overflow-y-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#bf1e2e]">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-sm text-[#bf1e2e]">Desi Prints Admin</span>
          </div>
          
          <div 
            onClick={() => setActiveTab('occasions')}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'occasions' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          >
            <Layers className="w-9 h-9 text-[#1877f2]" />
            <span className="font-semibold text-sm">Manage Occasions</span>
          </div>

          <div 
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeTab === 'images' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          >
            <ImageIcon className="w-9 h-9 text-green-500" />
            <span className="font-semibold text-sm">Manage Carousel</span>
          </div>

          <div className="border-t border-gray-300 my-2 pt-2">
            <h3 className="px-2 text-gray-500 font-bold text-sm mb-2">My Shortcuts</h3>
            {occasions.map(occ => (
              <div 
                key={occ.id}
                onClick={() => {
                  setSelectedOccasion(occ);
                  setActiveTab('images');
                }}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedOccasion?.id === occ.id && activeTab === 'images' ? 'bg-blue-50 text-[#1877f2]' : 'hover:bg-gray-200'}`}
              >
                <div className="w-9 h-9 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xs uppercase">
                  {occ.name.charAt(0)}
                </div>
                <span className="font-medium text-sm">{occ.name} Photos</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-[800px] flex flex-col gap-6">
            {activeTab === 'occasions' ? (
              <OccasionManager occasions={occasions} onUpdate={(newOccs) => setOccasions(newOccs)} />
            ) : (
              <ImageManager 
                occasions={occasions} 
                selectedOccasion={selectedOccasion} 
                onSelectOccasion={setSelectedOccasion} 
              />
            )}
          </div>
        </main>

        {/* Right Sidebar (Sponsors/Contacts) */}
        <aside className="w-[300px] hidden xl:flex flex-col p-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-500 mb-4">Quick Stats</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span>Total Occasions</span>
                <span className="font-bold">{occasions.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Images</span>
                <span className="font-bold">42</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
