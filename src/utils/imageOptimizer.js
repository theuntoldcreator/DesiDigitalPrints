/**
 * Utility to optimize image URLs, specifically targeting Cloudinary
 * for performance improvements (f_auto, q_auto).
 */

export const optimizeImageUrl = (url, width = 800) => {
  if (!url) return '';
  
  // If it's a Cloudinary URL, inject transformations
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    // Avoid double transformation if already present
    if (url.includes('/f_auto') || url.includes('/q_auto')) return url;
    
    const parts = url.split('/upload/');
    // Inject f_auto (auto format), q_auto (auto quality), and width
    return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`;
  }
  
  // For PocketBase files, they are usually optimized by the server or we can add thumb params
  // But for now, we'll return as is or add PocketBase thumb params if needed.
  return url;
};
