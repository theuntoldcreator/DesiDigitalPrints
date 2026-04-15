import React, { useState } from 'react';
import { Plus, Trash2, Layers, CheckCircle, AlertTriangle, Pencil, Check, X } from 'lucide-react';
import { toast } from 'react-fox-toast';
import { pb } from '../../lib/pb';

export default function OccasionManager({ occasions, onUpdate }) {
  const [newOccasion, setNewOccasion] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newOccasion) return;
    
    setIsSaving(true);
    try {
      const saved = await pb.create('occasions', { name: newOccasion });
      onUpdate([...occasions, saved]);
      setNewOccasion('');
    } catch (err) {
      toast.error('Failed to save to PocketBase. Ensure the "occasions" collection exists.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    const toastId = toast.custom(
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontWeight: 700, fontSize: '14px' }}>Delete this booklet?</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={async () => { toast.remove(toastId); try { await pb.delete('occasions', id); onUpdate(occasions.filter(o => o.id !== id)); toast.success('Booklet deleted'); } catch (err) { console.error('Delete failed:', err); toast.error('Delete failed'); } }} style={{ padding: '6px 16px', background: '#bf1e2e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Yes, Delete</button>
          <button onClick={() => toast.remove(toastId)} style={{ padding: '6px 16px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
        </div>
      </div>,
      { duration: 10000 }
    );
  };

  const startEditing = (occ) => {
    setEditingId(occ.id);
    setEditName(occ.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleRename = async (id) => {
    if (!editName.trim()) return;
    if (editName.trim() === occasions.find(o => o.id === id)?.name) {
      cancelEditing();
      return;
    }

    setIsRenaming(true);
    try {
      const updated = await pb.update('occasions', id, { name: editName.trim() });
      // Update local state immediately so UI reflects the change
      onUpdate(occasions.map(o => o.id === id ? { ...o, name: updated.name } : o));
      cancelEditing();
    } catch (err) {
      console.error('Rename failed:', err);
      toast.error('Failed to rename booklet. Please try again.');
    } finally {
      setIsRenaming(false);
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
               <div className="flex items-center gap-4 flex-1 min-w-0">
                 <div className="w-12 h-12 bg-white dark:bg-zinc-700 rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 dark:border-zinc-600 shrink-0">
                    {occ.name.includes('Wed') ? '💍' : occ.name.includes('Birth') ? '🎂' : '🎉'}
                 </div>
                 
                 {editingId === occ.id ? (
                   <div className="flex items-center gap-2 flex-1 min-w-0">
                     <input
                       autoFocus
                       type="text"
                       value={editName}
                       onChange={(e) => setEditName(e.target.value)}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter') handleRename(occ.id);
                         if (e.key === 'Escape') cancelEditing();
                       }}
                       className="flex-1 min-w-0 bg-white dark:bg-zinc-700 border-2 border-[#bf1e2e] rounded-xl px-4 py-2 text-sm font-black uppercase tracking-tight outline-none dark:text-white transition-all"
                     />
                     <button
                       onClick={() => handleRename(occ.id)}
                       disabled={isRenaming}
                       className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 active:scale-95 transition-all shadow-md shrink-0"
                       title="Save"
                     >
                       <Check className="w-4 h-4" />
                     </button>
                     <button
                       onClick={cancelEditing}
                       className="p-2 bg-gray-200 dark:bg-zinc-600 text-gray-500 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-zinc-500 transition-all shrink-0"
                       title="Cancel"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </div>
                 ) : (
                   <span className="font-black text-gray-900 dark:text-white tracking-tight text-lg uppercase truncate">{occ.name}</span>
                 )}
               </div>
               
               {editingId !== occ.id && (
                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                   <button 
                     onClick={() => startEditing(occ)}
                     className="p-2 text-gray-300 dark:text-gray-600 hover:text-[#bf1e2e] hover:bg-[#bf1e2e]/10 rounded-lg transition-all"
                     title="Rename booklet"
                   >
                     <Pencil className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => handleDelete(occ.id)}
                     className="p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                 </div>
               )}
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
