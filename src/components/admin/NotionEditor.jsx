import React, { useState, useEffect } from 'react';
import { Save, Trash2, ChevronLeft, Calendar, FileText, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-fox-toast';
import { pb } from '../../lib/pb';

export default function NotionEditor({ onBack }) {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await pb.getFullList('notes', { sort: '-created' });
      setNotes(data);
      if (data.length > 0 && !activeNote) setActiveNote(data[0]);
    } catch (err) {
      console.error('Notes fetch failed:', err);
    }
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await pb.create('notes', { title: 'Untitled Page', content: '' });
      setNotes([newNote, ...notes]);
      setActiveNote(newNote);
    } catch (err) {
      console.error('Note creation failed:', err);
    }
  };

  const handleUpdateNote = async () => {
    if (!activeNote) return;
    setIsSaving(true);
    try {
      await pb.update('notes', activeNote.id, {
        title: activeNote.title,
        content: activeNote.content
      });
      setLastSaved(new Date().toLocaleTimeString());
      fetchNotes();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    const toastId = toast.custom(
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontWeight: 700, fontSize: '14px' }}>Delete this page?</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={async () => { toast.remove(toastId); try { await pb.delete('notes', id); const filtered = notes.filter(n => n.id !== id); setNotes(filtered); if (activeNote?.id === id) setActiveNote(filtered[0] || null); toast.success('Page deleted'); } catch (err) { console.error('Delete failed:', err); toast.error('Delete failed'); } }} style={{ padding: '6px 16px', background: '#bf1e2e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Yes, Delete</button>
          <button onClick={() => toast.remove(toastId)} style={{ padding: '6px 16px', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
        </div>
      </div>,
      { duration: 10000 }
    );
  };

  return (
    <div className="flex h-[calc(100vh-160px)] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 transition-colors duration-500 text-gray-900 dark:text-white">
      
      {/* Sidebar List */}
      <aside className="w-80 border-r border-gray-100 dark:border-zinc-800 flex flex-col bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Notebook</h3>
          <button 
            onClick={handleCreateNote}
            className="p-1.5 hover:bg-white dark:hover:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 transition-all text-gray-500 hover:text-[#bf1e2e]"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`group p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeNote?.id === note.id ? 'bg-white dark:bg-zinc-800 border-[#bf1e2e] shadow-md' : 'border-transparent hover:bg-white/50 dark:hover:bg-zinc-800/50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <FileText className={`w-4 h-4 ${activeNote?.id === note.id ? 'text-[#bf1e2e]' : 'text-gray-400'}`} />
                <button onClick={(e) => handleDeleteNote(note.id, e)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <h4 className="font-black text-xs uppercase tracking-tighter truncate text-gray-900 dark:text-gray-100">{note.title || 'Untitled'}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Edited {new Date(note.updated).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Editor */}
      <main className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        {activeNote ? (
          <>
            {/* Editor Toolbar */}
            <div className="px-10 py-6 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-gray-300 dark:text-zinc-600">
                 <Calendar className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">{new Date(activeNote.updated).toDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                {lastSaved && <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Auto-saved at {lastSaved}</span>}
                <button 
                  onClick={handleUpdateNote}
                  disabled={isSaving}
                  className="bg-black dark:bg-white dark:text-black dark:hover:bg-[#bf1e2e] dark:hover:text-white hover:bg-[#bf1e2e] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 active:scale-95"
                >
                  {isSaving ? <Sparkles className="w-3 h-3 animate-pulse" /> : <Save className="w-3 h-3" />}
                  {isSaving ? 'Syncing...' : 'Save Draft'}
                </button>
              </div>
            </div>

            {/* Editing Canvas */}
            <div className="flex-1 overflow-y-auto px-20 py-16 custom-scrollbar">
              <input 
                value={activeNote.title}
                onChange={(e) => setActiveNote({...activeNote, title: e.target.value})}
                placeholder="Page Title"
                className="w-full bg-transparent text-5xl font-black text-gray-900 dark:text-white border-none outline-none mb-12 placeholder:text-gray-100 dark:placeholder:text-zinc-800 tracking-tighter"
              />
              <textarea 
                value={activeNote.content}
                onChange={(e) => setActiveNote({...activeNote, content: e.target.value})}
                placeholder="Start writing your thoughts or lead information here..."
                className="w-full bg-transparent min-h-[500px] text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed border-none outline-none resize-none placeholder:text-gray-100 dark:placeholder:text-zinc-800"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-200 dark:text-zinc-800">
             <FileText className="w-20 h-20 mb-4 opacity-5 dark:opacity-20" />
             <p className="font-black uppercase tracking-[0.3em] text-[10px]">Select or Create a Page</p>
          </div>
        )}
      </main>
    </div>
  );
}

const PlusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
