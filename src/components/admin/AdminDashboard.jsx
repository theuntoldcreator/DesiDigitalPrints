import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Plus, 
  Upload as UploadIcon, 
  ChevronRight, 
  Home, 
  Trash2, 
  LogOut,
  Clock,
  MoreVertical,
  ArrowLeft,
  Search,
  BarChart3,
  Book,
  Activity,
  ChevronDown,
  RefreshCcw,
  Sun,
  Moon,
  Pencil,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import OccasionManager from './OccasionManager';
import ImageManager from './ImageManager';
import NotionEditor from './NotionEditor';
import { pb } from '../../lib/pb';

export default function AdminDashboard({ onLogout }) {
  const [view, setView] = useState('folders'); // 'folders', 'images', 'create', 'upload', 'analytics', 'notebook'
  const [occasions, setOccasions] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('desi_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('desi_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchOccasions();
    fetchStats();
    
    // Initial health check
    pb.healthCheck().then(ok => setIsConnected(ok));

    // Real-time Subscriptions
    const unsubOcc = pb.subscribe('occasions', () => fetchOccasions());
    const unsubStats = pb.subscribe('stats', () => fetchStats());

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const healthTimer = setInterval(async () => {
      const ok = await pb.healthCheck();
      setIsConnected(ok);
    }, 30000); // Check every 30s
    
    return () => {
      unsubOcc();
      unsubStats();
      clearInterval(timer);
      clearInterval(healthTimer);
    };
  }, []);

  const fetchOccasions = async () => {
    try {
      const data = await pb.getFullList('occasions', { sort: 'name' });
      setOccasions(data || []);
      // If we got data, we are connected
      setIsConnected(true);
    } catch (err) {
      if (err.message === 'PB_OFFLINE') {
        setIsConnected(false);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const data = await pb.getFullList('stats', { filter: 'name="visitors"' });
      if (data.length > 0) setStats(data[0]);
    } catch (err) {
      console.error('Stats fetch failed:', err);
    }
  };

  const resetStats = async () => {
    if (!stats || !confirm('Reset all visitor data?')) return;
    try {
      await pb.update('stats', stats.id, { value: 0, history: {} });
      fetchStats();
    } catch (err) {
      alert('Reset failed');
    }
  };

  const openFolder = (occ) => {
    setSelectedOccasion(occ);
    setView('images');
  };

  const goHome = () => {
    setView('folders');
    setSelectedOccasion(null);
  };

  const deleteOccasion = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this entire booklet collection?')) return;
    try {
      await pb.delete('occasions', id);
      setOccasions(occasions.filter(o => o.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleRenameOccasion = async (id, newName) => {
    if (!newName.trim()) return;
    try {
      const updated = await pb.update('occasions', id, { name: newName.trim() });
      setOccasions(prev => prev.map(o => o.id === id ? { ...o, name: updated.name } : o));
      // Also update selectedOccasion if it's the one being renamed
      if (selectedOccasion?.id === id) {
        setSelectedOccasion(prev => ({ ...prev, name: updated.name }));
      }
    } catch (err) {
      console.error('Rename failed:', err);
      alert('Failed to rename booklet.');
    }
  };

  // Helper for Chart
  const renderVisitorChart = () => {
    if (!stats || !stats.history) return <div className="text-gray-300">No data yet</div>;
    const history = stats.history;
    const keys = Object.keys(history).sort();
    const values = keys.map(k => history[k]);
    const max = Math.max(...values, 5);
    
    return (
      <div className="w-full h-48 flex items-end gap-2 px-4 group">
        {keys.map((date, i) => (
          <div key={date} className="flex-1 flex flex-col items-center group/bar" title={`${date}: ${values[i]}`}>
            <div 
              className="w-full bg-[#bf1e2e]/20 group-hover/bar:bg-[#bf1e2e] transition-all rounded-t-lg relative"
              style={{ height: `${(values[i] / max) * 100}%` }}
            >
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">{values[i]} visits</span>
            </div>
            <span className="text-[8px] font-black text-gray-400 mt-2 uppercase tracking-tighter truncate w-full text-center">
              {date.split('-').slice(1).join('/')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-500">
      
      {/* Dynamic Main Workspace */}
      <main className="flex-1 overflow-hidden relative flex flex-col text-gray-900 dark:text-white">
        {/* Mobile Top Bar */}
        <div className="flex md:hidden h-16 border-b border-gray-100 dark:border-zinc-800 items-center justify-between px-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl z-30 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
             <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain bg-black dark:bg-white rounded-lg p-1" />
             <div>
                <h1 className="text-[9px] font-black tracking-[0.2em] uppercase leading-none text-gray-900 dark:text-white">Desi Digital Prints</h1>
                <span className="text-[8px] font-bold text-[#bf1e2e] uppercase tracking-widest">Global Studio Panel</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all text-gray-500 dark:text-gray-400">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
             <button onClick={goHome} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all text-gray-500 dark:text-gray-400">
                <Home className="w-4 h-4" />
             </button>
             <button title="Visit Site" onClick={() => window.location.href = '/'} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all text-gray-500 dark:text-gray-400">
                <ExternalLink className="w-4 h-4" />
             </button>
             <button onClick={onLogout} className="p-2 bg-[#bf1e2e] text-white rounded-lg hover:opacity-90 transition-all shadow-sm">
                <LogOut className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          <AnimatePresence mode="wait">
            {view === 'folders' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10"
              >
                {occasions.map((occ) => (
                  <FolderItem key={occ.id} occ={occ} onClick={() => openFolder(occ)} onDelete={(e) => deleteOccasion(occ.id, e)} onRename={(newName) => handleRenameOccasion(occ.id, newName)} />
                ))}
                <div onClick={() => setView('create')} className="aspect-[4/5] border-3 border-dashed border-gray-200 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:border-[#bf1e2e] hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-xl">
                    <Plus className="w-8 h-8 text-gray-300 group-hover:text-[#bf1e2e] group-hover:scale-125 transition-all" />
                    <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest group-hover:text-gray-900">Add Collection</span>
                </div>
              </motion.div>
            )}

            {view === 'images' && selectedOccasion && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <ImageManager occasions={occasions} selectedOccasion={selectedOccasion} onSelectOccasion={setSelectedOccasion} />
              </motion.div>
            )}

            {view === 'analytics' && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto w-full space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <StatCard icon={Activity} label="Total Reach" value={stats?.value || 0} color="#bf1e2e" />
                   <StatCard icon={FolderOpen} label="Booklets" value={occasions.length} color="#bf1e2e" />
                   <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-2xl flex flex-col justify-between group">
                      <div className="flex items-center justify-between mb-2">
                         <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-500"><Clock className="w-5 h-5" /></div>
                         <button onClick={resetStats} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-300 dark:text-gray-600 hover:text-red-500 transition-all"><RefreshCcw className="w-4 h-4" /></button>
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Update</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-12 rounded-[50px] shadow-2xl border border-gray-50 dark:border-zinc-800">
                   <div className="flex items-center justify-between mb-12">
                      <div>
                         <h3 className="text-[10px] font-black text-[#bf1e2e] uppercase tracking-[0.3em] mb-2">Traffic Insights</h3>
                         <h2 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">Visitor Growth Chart</h2>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                         <div className="w-2 h-2 rounded-full bg-[#bf1e2e]" /> Real-time Data
                      </div>
                   </div>
                   {renderVisitorChart()}
                </div>
              </motion.div>
            )}

            {view === 'notebook' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <NotionEditor />
              </motion.div>
            )}

            {view === 'create' && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto pb-20">
                 <OccasionManager occasions={occasions} onUpdate={(newOccs) => { setOccasions(newOccs); goHome(); }} />
               </motion.div>
            )}

            {view === 'upload' && (
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pb-20">
                  <ImageManager occasions={occasions} selectedOccasion={selectedOccasion} onSelectOccasion={setSelectedOccasion} />
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Unified ELITE TASKBAR (Bottom) */}
      <footer className="h-20 md:h-24 bg-black text-white px-4 md:px-8 flex items-center justify-center md:justify-between relative z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] shrink-0">
         <div className="hidden md:flex items-center gap-6 w-1/4">
            <div className="flex items-center gap-3">
               <img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain bg-white rounded-xl p-1.5" />
               <div className="hidden xl:block">
                  <p className="text-[12px] font-black uppercase tracking-[0.2em] leading-none">Desi Digital</p>
                  <p className="text-[9px] font-bold text-[#bf1e2e] uppercase tracking-widest mt-1">Global Studio Panel</p>
               </div>
            </div>
         </div>

         {/* Center - Main Navigation (The Dock) */}
         <div className="flex-1 flex justify-center w-full md:w-auto">
            <div className="flex justify-around md:justify-center items-center gap-1 md:gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/5 shadow-2xl w-full md:w-auto overflow-x-auto">
              <NavTab icon={Home} label="Library" active={view === 'folders' || view === 'images'} onClick={goHome} />
              <NavTab icon={Plus} label="New" active={view === 'create'} onClick={() => setView('create')} />
              <NavTab icon={UploadIcon} label="Upload" active={view === 'upload'} onClick={() => setView('upload')} />
              <NavTab icon={BarChart3} label="Analytics" active={view === 'analytics'} onClick={() => setView('analytics')} />
              <NavTab icon={Book} label="Notebook" active={view === 'notebook'} onClick={() => setView('notebook')} />
            </div>
         </div>

         <div className="hidden md:flex items-center justify-end gap-6 w-1/4">
            <div className={`hidden xl:flex items-center gap-2 transition-all duration-700 ${isConnected ? 'opacity-100' : 'opacity-40 animate-pulse'}`}>
               <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_12px_#22c55e]' : 'bg-red-500'}`} />
               <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                 {isConnected ? 'Cloud Synced' : 'Syncing...'}
               </span>
            </div>
            
            <div className="h-8 w-[1px] bg-white/10 hidden xl:block" />
            
            <div className="flex items-center gap-4 text-gray-400">
               <button 
                 onClick={() => setIsDarkMode(!isDarkMode)} 
                 className="hidden md:flex p-3 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
               >
                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>
               <div className="text-right leading-none hidden xl:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">{currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <p className="text-[10px] font-bold mt-1 whitespace-nowrap">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
               </div>
               
               <button 
                 onClick={() => window.location.href = '/'}
                 title="View Landing Page"
                 className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[#bf1e2e] hover:border-[#bf1e2e] transition-all group"
               >
                 <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
               </button>

               <button 
                 onClick={onLogout}
                 title="Log Out"
                 className="w-12 h-12 shrink-0 rounded-xl bg-[#bf1e2e] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(191,30,46,0.4)] hover:scale-110 active:scale-95 transition-all"
               >
                 <LogOut className="w-5 h-5" />
               </button>
            </div>
         </div>
      </footer>
    </div>
  );
}

// Sub-components for cleaner code
function NavTab({ icon: Icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      title={label}
      className={`flex justify-center items-center gap-2 md:gap-3 px-3 md:px-6 py-2.5 md:py-3 rounded-xl transition-all duration-300 ${active ? 'bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:scale-105' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
    >
      <Icon className={`w-5 h-5 md:w-4 md:h-4 ${active ? 'text-[#bf1e2e]' : ''}`} />
      <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function FolderItem({ occ, onClick, onDelete, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(occ.name);

  const startEditing = (e) => {
    e.stopPropagation();
    setEditValue(occ.name);
    setIsEditing(true);
  };

  const cancelEditing = (e) => {
    if (e) e.stopPropagation();
    setIsEditing(false);
    setEditValue(occ.name);
  };

  const saveRename = (e) => {
    if (e) e.stopPropagation();
    if (editValue.trim() && editValue.trim() !== occ.name) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={isEditing ? undefined : onClick}
      className="group flex flex-col items-center gap-4 cursor-pointer"
    >
      <div className="w-full aspect-[4/5] bg-white dark:bg-zinc-900 rounded-[40px] shadow-lg border border-gray-50 dark:border-zinc-800 flex items-center justify-center relative group-hover:shadow-2xl group-hover:bg-[#bf1e2e]/5 dark:group-hover:bg-[#bf1e2e]/10 transition-all outline outline-0 outline-[#bf1e2e] group-hover:outline-4">
         <FolderOpen className="w-20 h-20 text-[#bf1e2e]/20 group-hover:text-[#bf1e2e] transition-all" />
         
         {/* Edit button */}
         <button 
           onClick={startEditing} 
           className="absolute top-4 left-4 p-3 bg-white dark:bg-zinc-800 text-gray-400 hover:text-[#bf1e2e] rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100"
           title="Rename booklet"
         >
            <Pencil className="w-4 h-4" />
         </button>

         {/* Delete button */}
         <button onClick={onDelete} className="absolute top-4 right-4 p-3 bg-white dark:bg-zinc-800 text-red-500 rounded-2xl shadow-xl opacity-0 truncate group-hover:opacity-100 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-all transform scale-75 group-hover:scale-100">
            <Trash2 className="w-4 h-4" />
         </button>
      </div>

      {/* Name / Edit area */}
      <div className="text-center w-full px-1">
        {isEditing ? (
          <div className="flex items-center gap-1.5 justify-center" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveRename();
                if (e.key === 'Escape') cancelEditing();
              }}
              className="w-full bg-white dark:bg-zinc-800 border-2 border-[#bf1e2e] rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-tighter outline-none dark:text-white text-center"
            />
            <button
              onClick={saveRename}
              className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-90 transition-all shadow-md shrink-0"
              title="Save"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={cancelEditing}
              className="p-1.5 bg-gray-200 dark:bg-zinc-700 text-gray-500 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-all shrink-0"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <h4 
              className="font-black text-xs uppercase tracking-tighter text-gray-900 dark:text-white group-hover:text-[#bf1e2e] transition-colors"
              onDoubleClick={startEditing}
              title="Double-click to rename"
            >
              {occ.name}
            </h4>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Collection</p>
          </>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-2xl border border-gray-50 dark:border-zinc-800 flex flex-col justify-between group hover:border-[#bf1e2e]/20 dark:hover:border-[#bf1e2e]/20 transition-all">
       <div className="p-4 rounded-2xl w-fit mb-4" style={{ backgroundColor: `${color}10`, color: color }}>
          <Icon className="w-6 h-6" />
       </div>
       <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
          <p className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white group-hover:scale-110 origin-left transition-transform">{value}</p>
       </div>
    </div>
  );
}

