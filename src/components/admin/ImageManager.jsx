import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Plus, X } from 'lucide-react';

export default function ImageManager({ occasions, selectedOccasion, onSelectOccasion }) {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newName, setNewName] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedOccasion) {
      fetchImages();
    }
  }, [selectedOccasion]);

  const fetchImages = async () => {
    try {
      const res = await fetch(`/api/occasions/${selectedOccasion.id}/images`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedOccasion) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', newName || file.name);

    setIsUploading(true);
    try {
      const res = await fetch(`/api/occasions/${selectedOccasion.id}/images`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchImages();
        setNewName('');
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/occasions/images/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Occasion Selector for Mobile/Content Area */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#e7f3ff] p-2 rounded-lg">
            <ImageIcon className="text-[#1877f2] w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">Carousel Images</h2>
            <p className="text-xs text-gray-500">Managing images for <b>{selectedOccasion?.name}</b></p>
          </div>
        </div>
        <select 
          value={selectedOccasion?.id || ''} 
          onChange={(e) => {
            const occ = occasions.find(o => o.id === parseInt(e.target.value));
            onSelectOccasion(occ);
          }}
          className="bg-gray-100 border-none rounded-lg p-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#1877f2]"
        >
          {occasions.map(occ => (
            <option key={occ.id} value={occ.id}>{occ.name}</option>
          ))}
        </select>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">Add New Image</h3>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image Name (Optional)</label>
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Wedding Main View"
              className="w-full bg-gray-100 border-none rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#1877f2]"
            />
          </div>
          <button 
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 md:flex-none bg-[#1877f2] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-[#166fe5] disabled:bg-gray-400 transition-colors w-full md:w-auto"
          >
            <Upload className="w-5 h-5" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload} 
          />
        </div>
        <p className="mt-4 text-xs text-gray-500 text-center">
          Supported formats: JPG, PNG, WEBP. Max size: 5MB.
        </p>
      </div>

      {/* Images Grid */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">Current Carousel Images</h3>
        {images.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-gray-400">
            <ImageIcon className="w-16 h-16 opacity-20 mb-2" />
            <p>No images uploaded for this occasion yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <img 
                  src={img.image_url} 
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
