import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, X, CheckCircle, Check, ChevronDown } from 'lucide-react';
import { pb } from '../../lib/pb';

export default function ImageManager({ occasions, selectedOccasion, onSelectOccasion }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingOccasion, setIsAddingOccasion] = useState(false);
  const [newOccasionName, setNewOccasionName] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedOccasion) {
      fetchImages();
    }
  }, [selectedOccasion]);

  const fetchImages = async () => {
    try {
      const data = await pb.getFullList('images', { 
        filter: `occasion='${selectedOccasion.id}'`,
        sort: '-created'
      });
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large! Maximum size allowed is 5MB.');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Detect Dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height, ratio: (img.width / img.height).toFixed(2) });
    };
    img.src = url;
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDimensions(null);
    setNewName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedOccasion) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', newName || selectedFile.name);
    formData.append('occasion', selectedOccasion.id);

    setIsUploading(true);
    try {
      await pb.create('images', formData);
      fetchImages();
      clearSelection();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Ensure the "images" collection exists with "file", "name", and "occasion" fields.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuickAddOccasion = async () => {
    if (!newOccasionName.trim()) return;
    try {
      const record = await pb.create('occasions', { name: newOccasionName });
      onSelectOccasion?.(record);
      setNewOccasionName('');
      setIsAddingOccasion(false);
    } catch (err) {
      console.error('Quick add failed:', err);
      alert('Failed to create booklet. It might already exist.');
    }
  };

  const isIdealRatio = dimensions && Math.abs(dimensions.ratio - 0.8) < 0.1;

  return (
    <div className="flex flex-col gap-6 w-full pb-20">
      {/* Occasion Selector for Mobile/Content Area */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-4 w-full">
          <div className="bg-[#bf1e2e]/10 p-3 rounded-xl shrink-0">
            <ImageIcon className={`w-7 h-7 ${selectedOccasion ? 'text-[#bf1e2e]' : 'text-gray-400 animate-pulse'}`} />
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-lg tracking-tight truncate dark:text-white">
              {selectedOccasion ? 'Gallery Manager' : 'Quick Upload Hub'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded shrink-0">
                Target Booklet
              </span>
              <p className={`text-sm font-black uppercase tracking-tighter truncate ${selectedOccasion ? 'text-[#bf1e2e]' : 'text-amber-500'}`}>
                {selectedOccasion ? selectedOccasion.name : 'Selection Required'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          {isAddingOccasion ? (
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 p-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 w-full md:w-64 animate-in fade-in zoom-in-95 duration-200">
               <input 
                 autoFocus
                 type="text" 
                 value={newOccasionName}
                 onChange={(e) => setNewOccasionName(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleQuickAddOccasion()}
                 placeholder="New booklet name..."
                 className="flex-1 bg-transparent border-0 outline-none px-3 text-sm font-bold uppercase tracking-tighter dark:text-white"
               />
               <button 
                 onClick={handleQuickAddOccasion}
                 className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm"
               >
                 <Check className="w-4 h-4" />
               </button>
               <button 
                 onClick={() => setIsAddingOccasion(false)}
                 className="p-2 bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-all"
               >
                 <X className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1 md:w-64">
                <select 
                  value={selectedOccasion?.id || ''} 
                  onChange={(e) => {
                    const occ = occasions.find(o => o.id === e.target.value);
                    onSelectOccasion?.(occ);
                  }}
                  className={`w-full bg-gray-50 dark:bg-zinc-800 dark:text-white border-2 rounded-xl pl-4 pr-10 py-2.5 text-sm font-black uppercase tracking-tighter outline-none appearance-none transition-all cursor-pointer ${!selectedOccasion ? 'border-amber-400 animate-pulse' : 'border-gray-50 dark:border-zinc-800 hover:border-gray-100 dark:hover:border-zinc-700 focus:border-[#bf1e2e]'}`}
                >
                  <option value="" disabled>Select Booklet...</option>
                  {occasions.map(occ => (
                    <option key={occ.id} value={occ.id}>{occ.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <button 
                onClick={() => setIsAddingOccasion(true)}
                className="p-3 bg-[#bf1e2e] text-white rounded-xl shadow-[0_4px_12px_rgba(191,30,46,0.3)] hover:scale-110 active:scale-95 transition-all"
                title="Create New Booklet"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-zinc-800 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-4">
           {selectedOccasion && (
             <span className="text-[10px] font-black bg-[#bf1e2e] text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Target: {selectedOccasion.name}</span>
           )}
        </div>

        <h3 className="font-black text-2xl mb-8 tracking-tighter dark:text-white">Personalize Your Gallery</h3>
        
        {!selectedFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-gray-100 dark:border-zinc-700 rounded-[24px] p-12 flex flex-col items-center justify-center gap-4 hover:border-[#bf1e2e]/30 dark:hover:border-[#bf1e2e]/50 hover:bg-[#bf1e2e]/5 dark:hover:bg-[#bf1e2e]/10 transition-all cursor-pointer group"
          >
            <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-gray-300 dark:text-zinc-500 group-hover:text-[#bf1e2e] dark:group-hover:text-[#bf1e2e]" />
            </div>
            <div className="text-center">
              <p className="font-black text-xl text-gray-900 dark:text-white">Select invitation print</p>
              <p className="text-gray-400 dark:text-gray-500 font-medium">Recommended size: 800x1000px (4:5 Ratio)</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start animate-in fade-in slide-in-from-bottom-4">
            {/* Visual Preview */}
            <div className="w-full lg:w-[240px] aspect-[4/5] bg-gray-50 dark:bg-zinc-800 rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-700 shadow-2xl relative group">
               <img src={previewUrl} className="w-full h-full object-cover" />
               <button 
                 onClick={clearSelection}
                 className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
               >
                 <X className="w-4 h-4" />
               </button>
            </div>

            {/* Metadata & Controls */}
            <div className="flex-1 flex flex-col gap-6 w-full">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl border border-gray-100 dark:border-zinc-700">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Dimensions</p>
                    <p className="font-black text-lg text-gray-900 dark:text-white">{dimensions ? `${dimensions.width} x ${dimensions.height}` : 'Calculating...'}</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isIdealRatio ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30'}`}>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Quality Check</p>
                    <div className="flex items-center gap-2">
                      <p className={`font-black text-lg ${isIdealRatio ? 'text-green-600' : 'text-amber-600'}`}>
                        {isIdealRatio ? 'Perfect 4:5' : dimensions ? `Ratio: ${dimensions.ratio}` : '...'}
                      </p>
                      {isIdealRatio && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </div>
               </div>

               {!isIdealRatio && dimensions && (
                 <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
                   <div className="bg-amber-100 p-1.5 rounded-lg shrink-0">
                     <Upload className="w-4 h-4 text-amber-600" />
                   </div>
                   <p className="text-xs font-bold text-amber-800 leading-relaxed">
                     This image isn't the ideal 4:5 ratio. It will be centered and cropped on the main storefront to maintain the design balance.
                   </p>
                 </div>
               )}

               <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Royal Wedding Invitation"
                      className="w-full bg-gray-50 dark:bg-zinc-800 border-2 border-gray-100 dark:border-zinc-700 rounded-xl p-4 text-sm font-bold outline-none focus:border-[#bf1e2e] dark:focus:border-[#bf1e2e] transition-all dark:text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="flex-1 bg-[#bf1e2e] text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(191,30,46,0.2)] hover:bg-[#a01826] active:translate-y-1 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                    >
                      {isUploading ? 'Finalizing...' : 'Upload to Gallery'}
                      <Upload className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={clearSelection}
                      className="px-6 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all uppercase tracking-widest text-xs"
                    >
                      Cancel
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileSelect} 
        />
      </div>

      {/* Images Grid */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
        <h3 className="font-bold mb-4 dark:text-white">Current Carousel Images</h3>
        {images.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-gray-400 dark:text-zinc-500">
            <ImageIcon className="w-16 h-16 opacity-20 mb-2" />
            <p>No images uploaded for this occasion yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-[3/4] bg-gray-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-700">
                <img 
                  src={pb.getFileUrl('images', img.id, img.file)} 
                  alt={img.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-white text-xs font-bold truncate mb-2">{img.name}</p>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="bg-white text-red-500 p-2 rounded-lg flex items-center justify-center gap-1 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-xs font-bold">Delete</span>
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add More Placeholder */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-[#1877f2] hover:border-[#1877f2] hover:bg-blue-50 transition-all"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-bold">Add More</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
