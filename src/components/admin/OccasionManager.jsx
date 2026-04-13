import React, { useState } from 'react';
import { Plus, Trash2, Layers, CheckCircle, AlertTriangle } from 'lucide-react';
import { pb } from '../../lib/pb';

export default function OccasionManager({ occasions, onUpdate }) {
  const [newOccasion, setNewOccasion] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newOccasion) return;
    
    setIsSaving(true);
    try {
      const saved = await pb.create('occasions', { name: newOccasion });
      onUpdate([...occasions, saved]);
      setNewOccasion('');
    } catch (err) {
      alert('Failed to save to PocketBase. Ensure the "occasions" collection exists.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booklet?')) return;
    try {
      await pb.delete('occasions', id);
      onUpdate(occasions.filter(o => o.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700 transition-colors">
      {/* Creation Section */}
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-zinc-800">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Generate Booklet</h2>
            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">New Event Collection</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <input 
              type="text" 
              placeholder="Booklet Name (e.g. Anniversary)" 
              value={newOccasion}
              onChange={(e) => setNewOccasion(e.target.value)}
              className="bg-gray-50 dark:bg-zinc-800 border-2 border-gray-100 dark:border-zinc-700 rounded-2xl px-6 py-4 text-sm font-black w-full outline-none focus:border-[#bf1e2e] dark:focus:border-[#bf1e2e] transition-all dark:text-white"
            />
            <button 
              disabled={isSaving}
              onClick={handleAdd}
              className="bg-[#bf1e2e] text-white px-10 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#a01826] transition-all shadow-xl active:scale-95 disabled:bg-gray-400 w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              <span className="font-black text-xs uppercase tracking-widest">{isSaving ? 'Saving...' : 'Create'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Available Booklets List */}
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
         <div className="mb-8 flex items-center justify-between border-b border-gray-50 dark:border-zinc-800 pb-6">
           <div>
             <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Available Booklets</h3>
             <p className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">{occasions.length} Collections Active</p>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {occasions.map((occ) => (
             <div 
               key={occ.id} 
               className="p-5 bg-gray-50/50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-between group hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl hover:border-[#bf1e2e]/10 dark:hover:border-[#bf1e2e]/20 border border-transparent transition-all border-dashed"
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 dark:border-zinc-600">
                    {occ.name.includes('Wed') ? '💍' : occ.name.includes('Birth') ? '🎂' : '🎉'}
                 </div>
                 <span className="font-black text-gray-900 dark:text-white tracking-tight text-lg uppercase">{occ.name}</span>
               </div>
               
               <button 
                 onClick={() => handleDelete(occ.id)}
                 className="p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
               >
                 <Trash2 className="w-5 h-5" />
               </button>
             </div>
           ))}
           
           {occasions.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400 dark:text-gray-600 font-black uppercase tracking-widest text-xs">
               No booklets found inside the system.
             </div>
           )}
         </div>
      </div>
    </div>
  );
}
