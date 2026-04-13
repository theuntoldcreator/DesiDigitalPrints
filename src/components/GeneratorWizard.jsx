import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Download, Monitor, Sparkles, Layers, Box, Waves, Cloud, Copy, Check } from 'lucide-react';
import { pb } from '../lib/pb';

export default function GeneratorWizard({ selectedTemplate, onBack }) {
  // Form State
  const [isSaving, setIsSaving] = useState(false);
  const [savedLink, setSavedLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [deviceMode, setDeviceMode] = useState('Desktop');
  const [names, setNames] = useState('Rahul & Aisha');
  const [date, setDate] = useState('Saturday, December 24, 2026');
  const [venue, setVenue] = useState('The Grand Palace, Jaipur');
  const [heroImg, setHeroImg] = useState('https://picsum.photos/seed/desiwed1/1600/1000');
  const [galleryImg1, setGalleryImg1] = useState('https://picsum.photos/seed/desiwed2/800/1000');
  const [galleryImg2, setGalleryImg2] = useState('https://picsum.photos/seed/desiwed3/800/1000');
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' or 'light'
  
  // 3D Engine State
  const [layoutMode, setLayoutMode] = useState('tunnel'); // 'tunnel', 'cube', 'liquid'

  // Live Output
  const [previewHtml, setPreviewHtml] = useState('');

  // 1. Core Base HTML (Shared among layouts)
  const buildBaseHtml = () => {
    const isDark = themeMode === 'dark';
    const bgClass = isDark ? 'bg-[#0a0a0f] text-white' : 'bg-[#faf8f5] text-gray-900';
    const cardBg = isDark ? 'bg-black/40 border-gray-800' : 'bg-white/40 border-gray-200';
    const textAccent = isDark ? 'text-amber-400' : 'text-amber-700';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${names} — 3D Invitation</title>
  <script src="https://cdn.tailwindcss.com"><` + `/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><` + `/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"><` + `/script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Montserrat', sans-serif; overflow-x: hidden; }
    h1, h2, h3, .serif { font-family: 'Playfair Display', serif; }
    .glass { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  </style>
</head>
<body class="${bgClass} antialiased selection:bg-amber-500 selection:text-white">

  <section class="min-h-screen relative flex items-center justify-center p-8 text-center overflow-hidden" data-step="0">
    <div class="absolute inset-0 z-0">
      <img src="${heroImg}" class="w-full h-full object-cover opacity-${isDark ? '30' : '20'}" alt="Hero" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-${isDark ? '[#0a0a0f]' : '[#faf8f5]'}"></div>
    </div>
    <div class="relative z-10 max-w-4xl mx-auto">
      <p class="text-xs md:text-sm tracking-[0.4em] uppercase ${textAccent} mb-6 font-semibold fade-in-up">Together Forever</p>
      <h1 class="text-6xl md:text-8xl lg:text-[9rem] serif mb-8 leading-none tracking-tight fade-in-up" style="line-height: 0.9;">${names}</h1>
      <p class="text-lg md:text-2xl mt-4 tracking-widest uppercase font-light opacity-80 fade-in-up">${date}</p>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
      <span class="text-xs tracking-widest uppercase">Scroll Down</span><br/>↓
    </div>
  </section>

  <section class="min-h-screen relative flex items-center justify-center p-8" data-step="1">
    <div class="${cardBg} glass border p-12 md:p-24 rounded-[3rem] shadow-2xl max-w-4xl w-full text-center">
      <h2 class="text-4xl md:text-6xl serif mb-6 ${textAccent}">The Celebration</h2>
      <div class="w-20 h-px bg-current opacity-20 mx-auto my-8"></div>
      <p class="text-lg md:text-xl leading-relaxed opacity-80 mb-12 max-w-2xl mx-auto">
        With joyous hearts and the blessings of our families, we invite you to share in the beginning of our new life together.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div>
          <p class="text-xs tracking-widest uppercase ${textAccent} mb-2 font-bold">When</p>
          <p class="text-xl serif">${date}</p>
          <p class="opacity-60 text-sm mt-2">Ceremony begins at 5:00 PM</p>
        </div>
        <div>
          <p class="text-xs tracking-widest uppercase ${textAccent} mb-2 font-bold">Where</p>
          <p class="text-xl serif">${venue}</p>
          <p class="opacity-60 text-sm mt-2">Reception to follow immediately after.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="min-h-screen relative flex items-center justify-center p-8" data-step="2">
    <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="text-left order-2 md:order-1">
        <h2 class="text-5xl md:text-7xl serif mb-6">Our Moments</h2>
        <p class="text-lg opacity-70 leading-relaxed max-w-md">Every single day with you feels like a dream. We cannot wait to make a lifetime of memories.</p>
      </div>
      <div class="grid grid-cols-2 gap-4 order-1 md:order-2">
        <img src="${galleryImg1}" class="w-full h-[50vh] object-cover rounded-[2rem] shadow-xl translate-y-8" />
        <img src="${galleryImg2}" class="w-full h-[50vh] object-cover rounded-[2rem] shadow-xl -translate-y-8" />
      </div>
    </div>
  </section>

  <section class="min-h-screen relative flex flex-col items-center justify-center p-8 text-center" data-step="3">
    <h2 class="text-[5rem] md:text-[8rem] serif mb-8 ${textAccent} opacity-20 absolute" style="white-space:nowrap; top: 10%;">Join Us</h2>
    <div class="relative z-10">
      <h2 class="text-4xl md:text-6xl serif mb-6">Are you attending?</h2>
      <p class="opacity-70 mb-12 tracking-wide">Please kindly confirm your presence.</p>
      <button class="bg-${isDark ? 'white text-black' : 'black text-white'} px-12 py-5 rounded-full text-sm tracking-[0.2em] font-bold uppercase hover:scale-105 transition-transform shadow-2xl">
        RSVP Now
      </button>
    </div>
  </section>
`;
  };

  // 2. Wrap HTML inside the correct GSAP Engine Logic
  const generateFinishedCode = useCallback(() => {
    const baseHtml = buildBaseHtml();
    let gsapScript = '';

    if (layoutMode === 'tunnel') {
      gsapScript = `
  <!-- 3D TUNNEL ENGINE -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const sections = gsap.utils.toArray('section');
      const total = sections.length;
      
      // Setup Body for virtual scrolling
      gsap.set('body', { height: (total * 120) + 'vh', overflowX: 'hidden' });
      
      // Create 3D Camera Wrapper
      const camera = document.createElement('div');
      camera.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100vh;perspective:2000px;overflow:hidden;transform-style:preserve-3d;';
      
      const world = document.createElement('div');
      world.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;transform-style:preserve-3d;';
      camera.appendChild(world);

      while(document.body.firstChild && document.body.firstChild.tagName !== 'SCRIPT') {
        world.appendChild(document.body.firstChild);
      }
      document.body.insertBefore(camera, document.body.firstChild);

      // Stack sections deep in Z-space
      // Each section is 2500px apart
      const zDepth = 2500;
      sections.forEach((sec, i) => {
        gsap.set(sec, {
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100vh',
          z: -zDepth * i,
          opacity: Math.max(0, 1 - (i * 0.3)), // slight fog
          transformOrigin: '50% 50%'
        });
      });

      // Fly the world forward towards the camera on scroll
      gsap.to(world, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        z: zDepth * (total - 1),
        ease: 'none'
      });

      // Section Opacity Fade In/Out as camera passes
      sections.forEach((sec, i) => {
        gsap.to(sec, {
          scrollTrigger: {
            trigger: 'body',
            start: () => (i * 120) - 60 + 'vh', // Fade in
            end: () => (i * 120) + 60 + 'vh', // Fade out when passed
            scrub: 1
          },
          opacity: 1,
          ease: 'power1.inOut'
        });
      });
    });
  <` + `/script>
`;
    } else if (layoutMode === 'cube') {
      gsapScript = `
  <!-- 3D CUBE ROTATION ENGINE -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const sections = gsap.utils.toArray('section');
      const total = sections.length;
      
      // Setup Body for virtual scrolling
      gsap.set('body', { height: (total * 100) + 'vh', overflowX: 'hidden' });
      
      // Create 3D Scene
      const scene = document.createElement('div');
      scene.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100vh;perspective:1500px;overflow:hidden;';
      
      const cube = document.createElement('div');
      const depth = window.innerHeight / 2;
      cube.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;transform-style:preserve-3d;transform-origin:50% 50% -' + depth + 'px;';
      scene.appendChild(cube);

      while(document.body.firstChild && document.body.firstChild.tagName !== 'SCRIPT') {
        cube.appendChild(document.body.firstChild);
      }
      document.body.insertBefore(scene, document.body.firstChild);

      // Attach sections to cube faces
      sections.forEach((sec, i) => {
        const rotationX = i * 90;
        gsap.set(sec, {
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100vh',
          transformOrigin: '50% 50% -' + depth + 'px',
          rotationX: -rotationX,
          backfaceVisibility: 'hidden',
        });
      });

      // Rotate Cube on scroll
      gsap.to(cube, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
        rotationX: (total - 1) * 90,
        ease: 'none'
      });
    });
  <` + `/script>
`;
    } else {
      // Liquid / Flat
      gsapScript = `
  <!-- STANDARD PARALLAX LIQUID ENGINE -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      gsap.utils.toArray('.fade-in-up').forEach((el, i) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.2, delay: i * 0.1, ease: 'power3.out' });
      });
      
      gsap.utils.toArray('section').forEach(sec => {
        // Parallax effect on backgrounds or images
        const imgs = sec.querySelectorAll('img');
        if(imgs.length) {
          gsap.to(imgs, {
            scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 },
            y: 100, ease: 'none'
          });
        }
      });
    });
  <` + `/script>
`;
    }

    return baseHtml + gsapScript + `</body>\n</html>`;
  }, [names, date, venue, heroImg, galleryImg1, galleryImg2, themeMode, layoutMode]);

  // Update Preview iframe when settings change
  useEffect(() => {
    setPreviewHtml(generateFinishedCode());
  }, [generateFinishedCode]);

  // Handle Save to Cloud
  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      const config = {
        names, date, venue, heroImg, galleryImg1, galleryImg2, themeMode, layoutMode
      };
      const record = await pb.create('websites', {
        template_name: selectedTemplate.name,
        couple_names: names,
        event_date: date,
        venue: venue,
        config: JSON.stringify(config),
        html: generateFinishedCode()
      });
      
      const link = `${window.location.origin}/invite/${record.id}`;
      setSavedLink(link);
    } catch (err) {
      console.error('Cloud save failed:', err);
      alert('Cloud save failed. Ensure you have created the "websites" collection in PocketBase.');
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(savedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* ── LEFT: SETUP WIZARD FORM ── */}
      <aside className="w-[450px] bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-2xl z-20">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <button onClick={onBack} className="text-gray-400 hover:text-black transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider text-black">DESI GENERATOR</span>
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSaveToCloud} 
              disabled={isSaving}
              className="bg-[#bf1e2e] hover:bg-[#a01927] text-white px-4 py-2 rounded-lg text-xs font-black tracking-widest transition flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : <Cloud className="w-4 h-4" />}
              SAVE TO CLOUD
            </button>
            <button onClick={handleDownload} className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm active:scale-95">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-2">Build your 3D Experience</h2>
            <p className="text-sm text-gray-500 leading-relaxed">Fill out the details below. Watch the live preview instantly adapt and generate the complex GSAP logic automatically.</p>
          </div>

          <div className="space-y-6">
            {/* GSAP LAYOUT ENGINE */}
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-blue-800 tracking-wider uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 1. Select 3D Engine
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => setLayoutMode('tunnel')} className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${layoutMode === 'tunnel' ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-400/20' : 'bg-white/50 border-gray-200 hover:border-blue-200 hover:bg-white'}`}>
                  <Layers className={`w-5 h-5 ${layoutMode === 'tunnel' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">3D Tunnel Scroll</span>
                    <span className="text-xs text-gray-500 mt-1 block">Sections fly towards you deeply in Z-space as you scroll down.</span>
                  </div>
                </button>
                <button onClick={() => setLayoutMode('cube')} className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${layoutMode === 'cube' ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-400/20' : 'bg-white/50 border-gray-200 hover:border-blue-200 hover:bg-white'}`}>
                  <Box className={`w-5 h-5 ${layoutMode === 'cube' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">Infinite Cube Rotation</span>
                    <span className="text-xs text-gray-500 mt-1 block">Scroll to rotate a massive digital box. Each section is a face.</span>
                  </div>
                </button>
                <button onClick={() => setLayoutMode('liquid')} className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${layoutMode === 'liquid' ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-400/20' : 'bg-white/50 border-gray-200 hover:border-blue-200 hover:bg-white'}`}>
                  <Waves className={`w-5 h-5 ${layoutMode === 'liquid' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div>
                    <span className="font-bold text-gray-900 block text-sm">Liquid Parallax (Standard)</span>
                    <span className="text-xs text-gray-500 mt-1 block">Smooth vertical scrolling with deep parallax image logic.</span>
                  </div>
                </button>
              </div>
            </div>

            {/* EVENT DETAILS */}
            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-gray-600 tracking-wider uppercase mb-4">2. Event Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Couple Names</label>
                  <input type="text" value={names} onChange={(e) => setNames(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Date & Time</label>
                  <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Venue</label>
                  <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition" />
                </div>
              </div>
            </div>

            {/* DESIGN SETTINGS */}
            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-gray-600 tracking-wider uppercase mb-4">3. Art Direction</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Color Theme</label>
                  <div className="flex gap-2">
                    <button onClick={() => setThemeMode('dark')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${themeMode === 'dark' ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>Midnight Dark</button>
                    <button onClick={() => setThemeMode('light')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${themeMode === 'light' ? 'bg-white text-black border-gray-400 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}>Pearl Light</button>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200 mt-4">
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Hero Image URL</label>
                  <input type="text" value={heroImg} onChange={(e) => setHeroImg(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-600 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Gallery Image 1 (Vertical)</label>
                  <input type="text" value={galleryImg1} onChange={(e) => setGalleryImg1(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-600 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Gallery Image 2 (Vertical)</label>
                  <input type="text" value={galleryImg2} onChange={(e) => setGalleryImg2(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-600 focus:outline-none" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </aside>

      {/* ── RIGHT: LIVE INTERACTIVE IFRAME PREVIEW ── */}
      <main className="flex-1 flex flex-col relative bg-gray-100 border-l border-gray-300">
        
        {/* Top Navbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-center shrink-0 z-10 shadow-sm px-4">
           {/* Viewport Toggles */}
           <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setDeviceMode('Desktop')} className={`p-1.5 rounded-md transition ${deviceMode === 'Desktop' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setDeviceMode('Mobile')} className={`p-1.5 rounded-md transition ${deviceMode === 'Mobile' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Live Iframe Wrapper */}
        <div className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-4 md:p-8">
            <div className={`transition-all duration-300 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-300 relative ${deviceMode === 'Mobile' ? 'w-[375px] h-[812px]' : 'w-full h-full max-w-7xl'}`}>
               {/* 
                 Crucial: The iframe MUST be completely reinstantiated when layoutMode changes 
                 because GSAP modifies the DOM architecture inside the iframe.
                 We force a key re-render here.
               */}
               <iframe
                 key={`preview-${layoutMode}-${themeMode}`}
                 srcDoc={previewHtml}
                 className="absolute inset-0 w-full h-full border-0 bg-transparent"
                 title="Live 3D Preview"
               />
            </div>
        </div>
      </main>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {savedLink && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-12 max-w-xl w-full text-center relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Live on Cloud!</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-8">Invitation Generated Successfully</p>
              
              <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border-2 border-dashed border-gray-200 mb-8">
                <input readOnly value={savedLink} className="bg-transparent flex-1 text-sm font-bold text-gray-500 outline-none" />
                <button onClick={copyToClipboard} className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <button onClick={() => setSavedLink(null)} className="text-sm font-black text-gray-400 hover:text-black uppercase tracking-widest">
                Close & Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
