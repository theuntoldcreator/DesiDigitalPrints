import React, { useState } from 'react';
import { Plus, Trash2, MoreHorizontal } from 'lucide-react';

export default function OccasionManager({ occasions, onUpdate }) {
  const [newOccasion, setNewOccasion] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newOccasion) return;
    
    // In a real app, I'd call POST /api/occasions
    // For now, I'll assume they pre-seed but let's add logic if needed
    // Simplified for this demo
    setNewOccasion('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-xl">Manage Occasions</h2>
        <button className="bg-[#1877f2] text-white p-2 rounded-lg flex items-center gap-1 hover:bg-[#166fe5]">
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-sm">Add New</span>
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {occasions.map((occ) => (
            <div key={occ.id} className="flex items-center justify-between p-4 bg-[#f0f2f5] rounded-xl hover:bg-gray-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-2xl">{occ.name === 'Wedding' ? '💍' : occ.name === 'Engagement' ? '💎' : '🎉'}</span>
                </div>
                <div>
                  <h3 className="font-bold">{occ.name}</h3>
                  <p className="text-xs text-gray-500">Active category in landing page</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-red-500 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
        All occasions are displayed as options on the Main Website.
      </div>
    </div>
  );
}
