import React, { useEffect, useState, useRef, useMemo, memo } from 'react';
import { pb } from '../lib/pb';
import {
  Search, MessageCircle, ChevronDown,
  Clock, ArrowRight,
  CheckCircle, Phone, Sparkles,
  X, ChevronUp, Maximize2, ExternalLink as ExternalLinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const CLOUD_IMAGES = [
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796441/27_adpvr9.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796441/01_oldv2p.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796440/23_h3aews.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796440/03_udbgle.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796440/02_br4upy.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796439/22_x8ad46.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796439/05_nulkj8.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796439/09_xyxntq.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796439/04_p0esji.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796438/06_xyppl9.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796438/07_j5qwq9.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796438/08_y8vfgk.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796437/110_ah4gzh.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796437/12_n6ho2s.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/15_x5nvjr.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796437/13_ibotmh.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/17_r9ncvc.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/14_ob6oul.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/16_hdcxdk.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/19_wwmr0b.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796436/18_zmpuln.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796435/21_sdibbb.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/31_t4xvgb.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/24_umfbsq.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796435/28_eztymb.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/30_kgeu27.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/32_miclrl.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/26_er8cfs.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/25_d1mgn7.png",
  "https://res.cloudinary.com/dlt9qkkev/image/upload/v1776796434/33_vpdmwk.png"
];



const WHATSAPP_NUMBER = '919030811329';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const openWhatsApp = (message = '', activeOccasion = 'all') => {
  let defaultMsg = 'Hi! I saw your portfolio and I\'m interested in your designs! 🎨';
  if (activeOccasion !== 'all' && !message) {
    defaultMsg = `Hi! I'm interested in your ${activeOccasion} collection designs! 🎨`;
  }

  const finalMsg = message || defaultMsg;
  const url = `${WHATSAPP_LINK}?text=${encodeURIComponent(finalMsg)}`;
  window.open(url, '_blank');
};

// --- WhatsApp SVG Icon ---
const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// --- Social Icons (Custom SVGs for robustness) ---
const SocialIcon = ({ d, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 transition-transform cursor-pointer">
    <path d={d} />
  </svg>
);

const Facebook = () => <SocialIcon d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
const Instagram = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:scale-110 transition-transform cursor-pointer">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Twitter = () => <SocialIcon d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />;

const PromoBar = () => {
  const messages = [
    "💬 MESSAGE US ON WHATSAPP • AVAILABLE 24/7",
    "🎨 CUSTOM DIGITAL INVITATIONS & WELCOME BOARDS",
    "💎 TRUSTED BY THOUSANDS OF HAPPY CLIENTS",
    "📅 NEW 2026 COLLECTIONS ARE NOW LIVE!"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="bg-[#bf1e2e] text-white h-10 overflow-hidden relative border-b border-white/10">
      <div className="container mx-auto h-full px-4 md:px-12 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
        {/* Left Static Links */}
        <div className="hidden lg:flex gap-6 shrink-0">
          <a href="#gallery" className="hover:text-white/80 transition-colors">Browse Gallery</a>
          <a href="#how-it-works" className="hover:text-white/80 transition-colors">How It Works</a>
          <span className="text-white hover:text-white/70 cursor-pointer transition-colors" onClick={() => openWhatsApp()}>WhatsApp Us</span>
        </div>

        {/* Center Vertical Notifications */}
        <div className="flex-1 h-full flex items-center justify-center relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute whitespace-nowrap"
            >
              {messages[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Static Links */}
        <div className="hidden lg:flex gap-6 shrink-0 items-center">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80" onClick={() => openWhatsApp()}>
            <Phone className="w-3.5 h-3.5" />
            <span>+91 9030811329</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80">
            <Clock className="w-3.5 h-3.5" />
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHeader = ({ searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="bg-white sticky top-0 z-[100] shadow-sm w-full">
      <div className="container mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
        {/* Simplified Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => window.location.href = '/'}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full overflow-hidden shadow-md border border-gray-100 transform hover:rotate-3 transition-all">
            <img src="/images/logo.png" alt="Desi Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-lg md:text-xl font-black tracking-tighter text-gray-900 line-clamp-1">Digital Prints</span>
            <span className="text-[8px] md:text-[9px] font-black text-[#bf1e2e] uppercase tracking-widest">Premium Studio</span>
          </div>
        </div>

        {/* Minimalist Search Expansion */}
        <div className="flex-1 flex justify-center max-w-xl">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative flex items-center w-full"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-gray-50 rounded-full pl-5 pr-12 text-sm font-medium border border-gray-100 focus:border-[#bf1e2e]/30 focus:bg-white transition-all outline-none"
                />
                <button
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  className="absolute right-2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-gray-400 hover:text-[#bf1e2e] transition-colors group flex items-center gap-2"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest text-gray-300">Find Design</span>
              </button>
            )}
          </AnimatePresence>
        </div>

        {/* Minimalist Interlocking Social Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden lg:inline text-xs font-black uppercase tracking-widest text-gray-400">Let's Talk</span>
          <div className="flex items-center -space-x-3 group cursor-pointer">
            {/* Instagram Button with Perfect Gradient */}
            <a
              href="https://instagram.com/desi.digital.prints"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full flex items-center justify-center shadow-lg hover:z-10 hover:scale-110 active:scale-95 transition-all"
              title="Follow on Instagram"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            {/* WhatsApp Button */}
            <button
              onClick={(e) => { e.stopPropagation(); openWhatsApp(); }}
              className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:z-10 hover:scale-110 active:scale-95 transition-all"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavigationBar = ({ occasions, activeOccasion, onSelect }) => {
  return (
    <nav className="border border-gray-200 bg-white/80 backdrop-blur-md w-full rounded-2xl shadow-sm mb-10 overflow-x-auto hide-scrollbar">
      <ul className="flex items-center justify-start lg:justify-center gap-4 sm:gap-6 lg:gap-14 py-3 px-4 text-[11px] sm:text-[12px] lg:text-[13px] font-bold text-gray-800 uppercase tracking-widest whitespace-nowrap min-w-max lg:min-w-0">
        <li
          onClick={() => onSelect({ id: 'all', name: 'All' })}
          className={`cursor-pointer hover:text-[#bf1e2e] transition-all relative group py-1 ${activeOccasion === 'all' ? 'text-[#bf1e2e]' : ''}`}
        >
          All Designs
          <div className="absolute -bottom-[13px] left-0 w-full h-0.5 bg-[#bf1e2e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </li>
        {occasions.map(occ => (
          <li
            key={occ.id}
            onClick={() => onSelect(occ)}
            className={`cursor-pointer hover:text-[#bf1e2e] transition-all relative group py-1 ${activeOccasion === occ.id ? 'text-[#bf1e2e]' : ''}`}
          >
            {occ.name}
            <div className={`absolute -bottom-[13px] left-0 w-full h-0.5 bg-[#bf1e2e] transition-transform origin-left ${activeOccasion === occ.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const HeroSection = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.warn('[Video] Playback blocked by browser, waiting for user interaction...'));
    }
  }, []);

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[calc(100vh-96px)] overflow-hidden bg-gradient-to-br from-[#8b0000] via-[#bf1e2e] to-[#e63946] flex items-center py-10 sm:py-14 lg:py-0">
      {/* Animated glass sliding bars */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="hero-sliding-bars absolute inset-0" style={{ width: '200%' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full"
              style={{
                width: '200px',
                left: `${i * (100 / 6)}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-stretch relative z-10 gap-8 sm:gap-10 lg:gap-0">
        <div className="w-full lg:flex-1 text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1 flex flex-col justify-center py-2 lg:py-6">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter drop-shadow-xl max-w-2xl">
              Designs That Bring Every Idea to Life
            </h1>
          </div>
          <p className="hero-desc text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed italic">
            "From luxury invitations and event boards to social media creatives and custom graphics — explore premium designs crafted for every occasion and brand. Browse our work, choose your style, and connect on WhatsApp to get started."
          </p>
          <div className="hero-btns flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start pt-4 sm:pt-6">
            <a
              href="#gallery"
              className="bg-white hover:bg-gray-50 text-[#bf1e2e] font-black px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter text-center border-2 border-white"
            >
              Explore Designs
            </a>
          </div>

          {/* Availability & Studio Badge Row */}
          <div className="hero-avail flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-sm">
              <div className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-pulse shadow-[0_0_8px_#25D366]" />
              <span className="text-xs font-black text-white uppercase tracking-wider">Available 24/7</span>
            </div>
            <span className="text-sm font-bold text-white/50 hidden md:inline">•</span>
            <span className="hero-badge bg-white/15 backdrop-blur-md text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg border border-white/20">Custom Digital Art Studio</span>
          </div>
        </div>

        <div className="w-full lg:flex-1 flex justify-center lg:justify-end items-center order-1 lg:order-2 py-0 lg:py-6">
          <div className="w-[65%] sm:w-[55%] md:w-[45%] lg:w-full max-w-[400px] aspect-[2/3] rounded-[28px] sm:rounded-[36px] lg:rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-4 sm:border-[6px] lg:border-[8px] border-white/20 relative group transition-transform duration-700 hover:scale-[1.02] bg-gradient-to-br from-[#bf1e2e] to-[#8b0000]">
            <video
              ref={videoRef}
              src="https://huggingface.co/spaces/theuntoldcreator1999/desidigitalprints/resolve/main/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
          </div>


          {/* Decorative Elements (Desktop only) */}
          <div className="hidden xl:block absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

const CategoryCircles = ({ occasions, images, onSelect, activeId }) => {
  // Build a map of occasionId -> first image URL for that collection
  const coverMap = useMemo(() => {
    const map = {};
    images.forEach(img => {
      if (img.occasion_id && img.occasion_id !== 'all' && !map[img.occasion_id] && img.image_url) {
        map[img.occasion_id] = img.image_url;
      }
    });
    return map;
  }, [images]);

  return (
    <div className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="cat-heading text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">Collections</div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter">Browse by Occasion</h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium italic">Hand-crafted collections for every celebration</p>
        </div>
        <div className="cat-circles-wrap flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12">
          {occasions.map(occ => {
            const cover = coverMap[occ.id];
            return (
              <div
                key={occ.id}
                className="cat-circle flex flex-col items-center gap-4 group cursor-pointer"
                onClick={() => onSelect(occ)}
              >
                <div className={`w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-3 p-1 sm:p-1.5 transition-all duration-500 ${activeId === occ.id ? 'border-[#bf1e2e] scale-110 shadow-[0_10px_30px_rgba(191,30,46,0.2)]' : 'border-transparent group-hover:border-[#bf1e2e]/30'}`}>
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {cover ? (
                      <img
                        src={cover}
                        alt={occ.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#bf1e2e]/20 to-[#8b0000]/30 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl select-none">
                          {occ.name.includes('Wed') ? '💍' : occ.name.includes('Birth') ? '🎂' : occ.name.includes('Anni') ? '🥂' : '🎉'}
                        </span>
                      </div>
                    )}
                    <div className={`absolute inset-0 transition-colors ${activeId === occ.id ? 'bg-[#bf1e2e]/10' : 'bg-black/10 group-hover:bg-[#bf1e2e]/10'}`} />
                  </div>
                </div>
                <span className={`text-xs sm:text-sm md:text-base font-black uppercase tracking-tighter transition-colors ${activeId === occ.id ? 'text-[#bf1e2e]' : 'text-gray-900 group-hover:text-[#bf1e2e]'}`}>{occ.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProductCard = memo(({ item, onPreview }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
      onClick={() => onPreview(item)}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-50 border-2 border-transparent group-hover:border-[#bf1e2e]/10">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name || 'Design'}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
              e.target.parentElement.innerHTML = '<span class="text-xs text-gray-400 font-bold uppercase">Image Error</span>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-xs text-gray-400 font-bold uppercase">No Image</span>
          </div>
        )}
        {/* Subtle hover overlay for polish */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
    </div>
  );
});

// --- Image Preview Modal Component ---
const ImagePreviewModal = ({ item, onClose }) => {
  useEffect(() => {
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/98 p-4 overflow-hidden" onClick={onClose}>
       <button 
         onClick={onClose} 
         className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[1001] p-3 bg-white/10 rounded-full backdrop-blur-md"
       >
          <X className="w-8 h-8" />
       </button>
       
       <motion.div 
         initial={{ scale: 0.95, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="relative max-w-4xl w-full flex flex-col items-center gap-6"
         onClick={(e) => e.stopPropagation()}
       >
          <img 
            src={item.image_url} 
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" 
            alt={item.name}
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'w-64 h-64 flex flex-col items-center justify-center bg-zinc-800 rounded-2xl text-white gap-4';
              fallback.innerHTML = '<span class="text-3xl">⚠️</span><span class="font-bold">Image failed to load</span>';
              e.target.parentNode.insertBefore(fallback, e.target);
            }}
          />

        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">{item.name || 'Premium Design'}</h3>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => openWhatsApp(`Hi! I'm interested in this design: ${item.name || 'Premium Design'}`)}
              className="bg-[#25D366] text-white font-black px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-tighter text-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Order on WhatsApp
            </button>
            <button
              onClick={() => window.open(item.image_url, '_blank')}
              className="bg-white/10 text-white border border-white/20 font-black px-6 py-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-3 uppercase tracking-tighter text-xs"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Original
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


// --- Custom Hook for Infinite Auto-Scroll with Manual Control ---
const useInfiniteScroll = (ref, speed = 0.5, isActive = true) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || !isActive) return;

    let animationFrameId;
    let isInteracting = false;
    let lastInteractionTime = 0;

    const scroll = () => {
      // Resume auto-scroll only if not interacting and enough time has passed since last interaction
      if (!isInteracting && Date.now() - lastInteractionTime > 1500) {
        el.scrollTop += speed;
        // Seamless loop jump
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = 1;
        } else if (el.scrollTop <= 0) {
          el.scrollTop = (el.scrollHeight / 2) - 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleStart = () => { isInteracting = true; };
    const handleEnd = () => {
      isInteracting = false;
      lastInteractionTime = Date.now();
    };

    el.addEventListener('mousedown', handleStart, { passive: true });
    el.addEventListener('touchstart', handleStart, { passive: true });
    el.addEventListener('wheel', handleEnd, { passive: true }); // Pause on wheel
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mousedown', handleStart);
      el.removeEventListener('touchstart', handleStart);
      el.removeEventListener('wheel', handleEnd);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [speed, isActive]);
};

// --- Vertical Column Marquee Component ---
const VerticalColumnMarquee = ({ items, speed = 0.5 }) => {
  const scrollRef = useRef(null);
  // Double the items for seamless loop
  const displayItems = useMemo(() => [...items, ...items], [items]);

  useInfiniteScroll(scrollRef, speed);

  return (
    <div
      ref={scrollRef}
      className="relative overflow-y-auto hide-scrollbar h-full py-4 flex-1 cursor-grab active:cursor-grabbing select-none"
      style={{ scrollBehavior: 'auto' }} // Must be auto for smooth JS scroll
    >
      <div className="flex flex-col gap-6">
        {displayItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-full shrink-0"
          >
            <ProductCard item={item} onPreview={(img) => window.dispatchEvent(new CustomEvent('open-preview', { detail: img }))} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- How It Works Section ---
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-[#fff5f5] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="hiw-heading text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">Simple Process</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">How It Works</h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium max-w-lg mx-auto">Three simple steps to get your perfect custom design</p>
        </div>
        <div className="hiw-steps grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16">
          {[
            { icon: Search, step: '01', title: 'Browse Designs', desc: 'Explore my portfolio of premium digital invitations, welcome boards, and event art across all occasions.' },
            { icon: MessageCircle, step: '02', title: 'Message on WhatsApp', desc: 'Found something you love? Send me a message on WhatsApp with the design you like and your event details.' },
            { icon: Sparkles, step: '03', title: 'Get Your Design', desc: 'I\'ll customize your chosen design with your details and deliver the high-res digital file — fast and beautiful.' }
          ].map((prop, i) => (
            <div key={i} className="hiw-step flex flex-col items-center text-center gap-4 group relative">
              <div className="absolute -top-4 -right-4 text-8xl font-black text-[#bf1e2e]/[0.04] select-none pointer-events-none group-hover:text-[#bf1e2e]/[0.08] transition-colors">{prop.step}</div>
              <div className="w-20 h-20 bg-gray-50 text-[#bf1e2e] rounded-3xl flex items-center justify-center group-hover:bg-[#bf1e2e] group-hover:text-white transition-all duration-500 shadow-xl border border-gray-100 relative z-10">
                <prop.icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{prop.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA below How It Works */}
        <div className="hiw-cta mt-10 sm:mt-16 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openWhatsApp('Hi! I\'d like to discuss a custom design for my event.')}
            className="bg-[#bf1e2e] hover:bg-[#a01826] text-white font-black px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg rounded-full shadow-[0_15px_30px_rgba(191,30,46,0.3)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter inline-flex items-center justify-center gap-3"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Start Your Order on WhatsApp
          </button>
          <a
            href="tel:+919030811329"
            className="bg-white text-[#bf1e2e] border-2 border-[#bf1e2e] font-black px-10 py-5 text-lg rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter inline-flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5" />
            +91 9030811329
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Contact CTA Banner --- 
const WhatsAppBanner = () => {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-br from-[#8b0000] via-[#bf1e2e] to-[#e63946] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="banner-content max-w-3xl mx-auto space-y-5 sm:space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-black uppercase tracking-widest">Available Right Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
            Ready to Make Your <br /> Event Unforgettable?
          </h2>
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto">
            Just send me a WhatsApp message with your ideas. I'll craft the perfect digital design for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => openWhatsApp('Hi! I want to order a custom design for my event! 🎉')}
              className="bg-white text-[#bf1e2e] font-black px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter flex items-center justify-center gap-3"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Chat on WhatsApp
            </button>
            <a
              href="tel:+919030811329"
              className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-black px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg rounded-full shadow-lg transition-all hover:scale-105 hover:bg-white/20 active:scale-95 uppercase tracking-tighter flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              +91 9030811329
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ occasions, onSelect }) => (
  <footer className="bg-[#111] text-white pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-8">
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 border-b border-white/10 pb-12 sm:pb-16 md:pb-20">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden p-1 shadow-lg border-2 border-[#bf1e2e]">
            <img src="/images/logo.png" className="w-full h-full object-cover rounded-full" alt="Logo" />
          </div>
          <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">Digital Prints</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          Premium digital invitations, luxury welcome boards & bespoke event art — hand-crafted to elevate your celebration. Click below to chat directly with us.
        </p>

        {/* WhatsApp Contact */}
        <div
          onClick={() => openWhatsApp('Hi! I\'d like to discuss a custom design project.')}
          className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 px-5 py-3 rounded-2xl cursor-pointer hover:bg-[#25D366]/20 transition-all group"
        >
          <WhatsAppIcon className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-sm font-black text-white">+91 9030811329</p>
            <p className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest">Available 24/7 • Tap to Chat</p>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <a href="https://instagram.com/desi.digital.prints" target="_blank" rel="noreferrer">
            <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          </a>
          <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black uppercase tracking-widest text-[#bf1e2e]">Categories</h4>
        <ul className="space-y-4">
          {occasions.slice(0, 5).map(occ => (
            <li
              key={occ.id}
              onClick={() => onSelect(occ)}
              className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors"
            >
              {occ.name}
            </li>
          ))}
          <li onClick={() => onSelect({ id: 'all' })} className="text-sm text-[#bf1e2e] hover:text-white cursor-pointer font-black uppercase tracking-widest">View All</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black uppercase tracking-widest text-[#bf1e2e]">Quick Links</h4>
        <ul className="space-y-4">
          <li onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors">Browse Gallery</li>
          <li onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors">How It Works</li>
          <li onClick={() => openWhatsApp('Hi! I\'d like to place a custom order.')} className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors">Custom Orders</li>
          <li onClick={() => openWhatsApp('Hi! I have a question about your services.')} className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors">Support</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black uppercase tracking-widest text-[#bf1e2e]">Contact</h4>
        <ul className="space-y-4">
          <li className="text-sm text-gray-400 font-medium">WhatsApp: +91 9030811329</li>
          <li className="text-sm text-gray-400 font-medium italic">Available 24/7</li>
          <li className="text-sm text-gray-400 font-medium">Bespoke Requests Welcome</li>
          <li className="text-sm text-gray-400 font-medium">Fast Turnaround</li>
        </ul>
      </div>
    </div>

    <div className="container mx-auto pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        <span>© 2026 DESI DIGITAL PRINTS</span>
        <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
        <span className="hover:text-white cursor-pointer">TERMS OF USE</span>
      </div>
      <div className="flex items-center gap-6 grayscale opacity-50">
        <CheckCircle className="w-8 h-8" />
        <span className="text-xs font-black uppercase tracking-tighter">Handcrafted with ❤️</span>
      </div>
    </div>
  </footer>
);

// --- Floating WhatsApp Button ---
const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-4 max-w-[220px] border border-gray-100"
          >
            <p className="text-sm font-bold text-gray-900">👋 Hey! Need a custom design?</p>
            <p className="text-xs text-gray-500 mt-1">Message me on WhatsApp, I reply instantly!</p>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs hover:bg-gray-300 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => openWhatsApp()}
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group relative"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 text-white" />
        {/* Ping animation */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};


// --- Main Page Component ---

// --- Premium Scroll to Top Component with Progress ---
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      setIsVisible(window.scrollY > 300);

      // Calculate progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 30 * 2 * Math.PI; // radius 30

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[90] pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            className="group relative w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 border border-gray-100"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                className="text-gray-100"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="30"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                className="text-[#bf1e2e]"
              />
            </svg>
            <ChevronUp className="w-6 h-6 text-[#bf1e2e] group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function LandingPage({ templates, onStart }) {
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [occasions, setOccasions] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [previewImage, setPreviewImage] = useState(null);

  const galleryRef = useRef(null);

  useEffect(() => {
    // Listen for preview events from the marquee (since it's a separate component)
    const handlePreview = (e) => setPreviewImage(e.detail);
    window.addEventListener('open-preview', handlePreview);
    return () => window.removeEventListener('open-preview', handlePreview);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [occData, uploadedData] = await Promise.all([
          pb.getFullList('occasions', { sort: 'name' }),
          pb.getFullList('images', { sort: '-created,id' })
        ]);

        setOccasions(occData || []);

        const staticTemplates = (templates || []).map(t => {
          if (!t) return null;
          return {
            id: `t-${t.id}`,
            image_url: t.thumbnailUrl || '',
            name: t.name || 'Untitled Design',
            template: t,
            occasion_id: 'all'
          };
        }).filter(Boolean);

        const formattedUploads = (uploadedData || []).map(img => {
          if (!img) return null;
          let url = '';
          if (img.external_url) {
            url = optimizeImageUrl(img.external_url);
          } else if (img.file) {
            url = pb.getFileUrl('images', img.id, img.file);
          }
          return {
            ...img,
            image_url: url,
            occasion_id: img.occasion || 'all'
          };
        }).filter(Boolean);

        const formattedCloudImages = CLOUD_IMAGES.map((url, idx) => ({
          id: `cloud-${idx}`,
          image_url: optimizeImageUrl(url),
          name: `Premium Design ${idx + 1}`,
          occasion_id: 'all'
        }));

        // Fisher-Yates shuffle — fresh random order on every page load
        const unifiedImages = [...formattedUploads, ...staticTemplates, ...formattedCloudImages];
        for (let i = unifiedImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [unifiedImages[i], unifiedImages[j]] = [unifiedImages[j], unifiedImages[i]];
        }
        setImages(unifiedImages);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchData();

    // --- VISITOR PULSE (ANALYTICS) ---
    const trackVisit = async () => {
      const hasCounted = sessionStorage.getItem('desi_pulse_counted');
      if (hasCounted) return;

      try {
        const stats = await pb.getFullList('stats', { filter: 'name="visitors"' });
        const today = new Date().toISOString().split('T')[0];

        if (stats.length > 0) {
          const s = stats[0];
          const history = s.history || {};
          history[today] = (history[today] || 0) + 1;
          await pb.update('stats', s.id, {
            value: (s.value || 0) + 1,
            history: history
          });
        } else {
          await pb.create('stats', {
            name: 'visitors',
            value: 1,
            history: { [today]: 1 }
          });
        }
        sessionStorage.setItem('desi_pulse_counted', 'true');
      } catch (err) {
        console.warn('[Analytics] Pulse failed (Space might be initializing)');
      }
    };
    trackVisit();

    // Real-time Subscriptions
    const unsubOcc = pb.subscribe('occasions', () => fetchData());
    const unsubImg = pb.subscribe('images', () => fetchData());

    return () => {
      unsubOcc();
      unsubImg();
    };
  }, [templates]);

  const handleFilterChange = (occ) => {
    setActiveOccasion(occ.id);
    setVisibleCount(8);
    // Smooth scroll to gallery on filter change if not already in viewport
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredImages = useMemo(() => images.filter(img => {
    const matchesSearch = img.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOccasion = activeOccasion === 'all' || img.occasion_id === activeOccasion;
    return matchesSearch && matchesOccasion;
  }), [images, searchQuery, activeOccasion]);

  const displayedImages = useMemo(() => filteredImages.slice(0, visibleCount), [filteredImages, visibleCount]);
  const hasMore = visibleCount < filteredImages.length;



  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#bf1e2e] selection:text-white page-fadein">
      <PromoBar />
      <MainHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main>
        <HeroSection />

        {/* Gallery Section */}
        <section id="gallery" ref={galleryRef} className="py-12 sm:py-16 md:py-20 bg-[#f9f9f9] scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="gallery-heading flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-4">
                <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">My Portfolio</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                  {activeOccasion === 'all' ? 'Featured Designs' : `${occasions.find(o => o.id === activeOccasion)?.name} Collection`}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">Like a design? Tap to order via WhatsApp</p>
              </div>
              <p className="text-gray-400 font-bold uppercase text-xs sm:text-sm tracking-widest">
                {filteredImages.length} designs
              </p>
            </div>

            <NavigationBar
              occasions={occasions}
              activeOccasion={activeOccasion}
              onSelect={handleFilterChange}
            />

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-gray-200 animate-pulse aspect-[2/3] rounded-xl" />
                ))}
              </div>
            ) : filteredImages.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
                  <AnimatePresence mode="popLayout">
                    {displayedImages.map((img, idx) => (
                      <motion.div
                        key={img.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: (idx % 8) * 0.05 }}
                        className="cursor-pointer"
                      >
                        <ProductCard item={img} onPreview={setPreviewImage} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Infinite Scroll Trigger */}
                {hasMore && (
                  <div
                    ref={(el) => {
                      if (el) {
                        const observer = new IntersectionObserver((entries) => {
                          if (entries[0].isIntersecting) {
                            setVisibleCount(prev => prev + 8);
                          }
                        }, { threshold: 0.5 });
                        observer.observe(el);
                      }
                    }}
                    className="h-20 flex items-center justify-center mt-10"
                  >
                    <div className="w-8 h-8 border-4 border-gray-100 border-t-[#bf1e2e] rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">No designs found</h3>
                <p className="text-gray-500 font-medium mt-2">Try a different search or browse all designs.</p>
              </div>
            )}
          </div>
        </section>

        <CategoryCircles
          occasions={occasions}
          images={images}
          onSelect={handleFilterChange}
          activeId={activeOccasion}
        />

        <HowItWorks />
        <WhatsAppBanner />
      </main>



      <Footer occasions={occasions} onSelect={handleFilterChange} />
      <ScrollToTop />

      <AnimatePresence>
        {previewImage && (
          <ImagePreviewModal item={previewImage} onClose={() => setPreviewImage(null)} />
        )}
      </AnimatePresence>

      {/* Tailwind Utility for Marquee */}
      <style>{`
        @keyframes heroSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-sliding-bars {
          animation: heroSlide 30s linear infinite;
          will-change: transform;
        }
        .hero-badge, .hero-heading, .hero-desc, .hero-btns, .hero-video-wrap, .cat-circle, .hiw-step, .banner-content {
          will-change: opacity, transform;
        }
        @keyframes pageFadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-fadein {
          animation: pageFadeIn 0.1s ease-out forwards;
          will-change: opacity, transform;
        }
      `}
      </style>
    </div>
  );
}
