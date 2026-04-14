import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pb';
import {
  Search, MessageCircle, User, ChevronDown,
  Menu, Heart, Bell, HelpCircle,
  Clock, Star, ArrowRight, ShieldCheck,
  CheckCircle, Phone, Sparkles, Palette, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '919030811329';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const openWhatsApp = (message = '') => {
  const url = message
    ? `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
    : WHATSAPP_LINK;
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
const Twitter = () => <SocialIcon d="M22 4s-1 2.17-2.67 2.17a5.55 5.55 0 0 1-5 4c0 0-4.17.67-6.17-2.17 0 0-1.5 4.17 2 7 0 0-2.33 1.33-4 1.33 0 0 4.17 3.5 11 0 0 0-6.17-10 0 0-4.17-1 4.17-6.17-1.17 0 0 1.5 2.17 3 2.17L22 4z" />;

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
          <span className="text-green-300 cursor-pointer hover:text-green-200 transition-colors" onClick={() => openWhatsApp()}>WhatsApp Us</span>
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
  const navigate = useNavigate();
  return (
    <header className="bg-white sticky top-0 z-[100] shadow-sm w-full">
      <div className="container mx-auto px-4 md:px-12 py-5 flex items-center gap-4 lg:gap-12">
        {/* Mobile Menu Icon */}
        <button className="lg:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => window.location.href = '/'}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full overflow-hidden shadow-[0_0_20px_rgba(191,30,46,0.2)] border-2 border-gray-50 transform hover:rotate-3 transition-all">
            <img src="/images/logo.png" alt="Desi Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <div className="hidden xl:flex flex-col leading-none">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">Digital Prints</span>
            <span className="text-[11px] font-black text-[#bf1e2e] uppercase tracking-[0.2em]">Premium Digital Studio</span>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex-1 relative group max-w-2xl lg:max-w-3xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#bf1e2e] transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search designs & collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 md:h-12 bg-gray-50 rounded-full pl-12 pr-4 text-gray-800 outline-none border border-gray-100 focus:border-[#bf1e2e]/30 focus:bg-white transition-all font-medium shadow-inner"
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#bf1e2e] p-2.5 rounded-full text-white hover:bg-[#a01826] transition-all shadow-md active:scale-95">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex items-center gap-1 md:gap-4 shrink-0">
          <button
            onClick={() => openWhatsApp('Hi! I saw your portfolio and I\'m interested in your digital design services.')}
            className="hidden sm:flex flex-col items-center hover:text-[#25D366] transition-colors group"
          >
            <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase mt-1">Chat</span>
          </button>
          <button
            onClick={() => openWhatsApp('Hi! I saw your portfolio and I\'m interested in your digital design services.')}
            className="flex items-center gap-2 bg-[#25D366] text-white font-black px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-xs md:text-sm uppercase tracking-tighter"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">Order Now</span>
            <span className="md:hidden">Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavigationBar = ({ occasions, activeOccasion, onSelect }) => {
  return (
    <nav className="border border-gray-200 bg-white/80 backdrop-blur-md w-full rounded-2xl shadow-sm mb-10 overflow-x-auto">
      <ul className="flex items-center justify-start lg:justify-center gap-6 lg:gap-14 py-3 px-4 text-[12px] lg:text-[13px] font-bold text-gray-800 uppercase tracking-widest whitespace-nowrap min-w-max lg:min-w-0">
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
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } });
      tl.from('.hero-badge', { opacity: 0, y: 15, duration: 0.2 })
        .from('.hero-heading', { opacity: 0, y: 20, duration: 0.3 }, '-=0.1')
        .from('.hero-desc', { opacity: 0, y: 15, duration: 0.2 }, '-=0.2')
        .from('.hero-btns > *', { opacity: 0, y: 10, stagger: 0.05, duration: 0.2 }, '-=0.15')
        .from('.hero-avail', { opacity: 0, x: -10, duration: 0.2 }, '-=0.15')
        .from('.hero-video-wrap', { opacity: 0, scale: 0.98, duration: 0.4 }, '-=0.3')
        .from('.hero-phone-badge', { opacity: 0, y: 15, duration: 0.2 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-[550px] lg:min-h-[680px] overflow-hidden bg-gradient-to-br from-[#8b0000] via-[#bf1e2e] to-[#e63946] flex items-center py-16 lg:py-12">
      {/* Animated glass sliding bars */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="hero-sliding-bars absolute inset-0" style={{ width: '200%' }}>
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full backdrop-blur-[1px]"
              style={{
                width: '200px',
                left: `${i * (100 / 12)}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 80%, transparent 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                borderRight: '1px solid rgba(255,255,255,0.03)',
                boxShadow: '0 0 30px rgba(255,255,255,0.02)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center relative z-10 gap-12 lg:gap-0">
        <div className="w-full lg:flex-1 text-center lg:text-left space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <span className="hero-badge inline-block bg-white/15 backdrop-blur-md text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg border border-white/20">Custom Digital Art Studio</span>
            <h1 className="hero-heading text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tighter drop-shadow-lg">
              Your <br /> <span className="relative">
                Special Moment
                <div className="absolute bottom-0 left-0 w-full h-3 bg-white/15 -z-10 -rotate-1" />
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-white/40" />
              </span> <br /> Designed.
            </h1>
          </div>
          <p className="hero-desc text-xl text-white/80 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Premium digital invitations, welcome boards & event art — crafted with love. Browse my work, pick a design you love, and message me on WhatsApp to bring it to life.
          </p>
          <div className="hero-btns flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
            <a
              href="#gallery"
              className="bg-white hover:bg-gray-50 text-[#bf1e2e] font-black px-12 py-5 text-lg rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter text-center"
            >
              Browse My Work
            </a>
            <button
              onClick={() => openWhatsApp('Hi! I\'m interested in getting a custom digital design.')}
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black px-12 py-5 text-lg rounded-full shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter flex items-center justify-center gap-3 border-2 border-[#25D366]"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Message on WhatsApp
            </button>
          </div>

          {/* Availability Badge */}
          <div className="hero-avail flex items-center gap-3 justify-center lg:justify-start pt-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
              <div className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-pulse shadow-[0_0_8px_#25D366]" />
              <span className="text-xs font-black text-white uppercase tracking-wider">Available 24/7</span>
            </div>
            <span className="text-sm font-bold text-white/50">Instant replies</span>
          </div>
        </div>

        <div className="w-full lg:flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="hero-video-wrap relative w-full max-w-[440px] lg:max-w-[460px] xl:max-w-[500px]">
            <div className="aspect-[3/4] rounded-[36px] lg:rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border-[6px] lg:border-[8px] border-white/20 relative group transition-transform duration-700 hover:scale-[1.02] bg-gradient-to-br from-[#bf1e2e] to-[#8b0000]">
              <video
                src="https://huggingface.co/spaces/theuntoldcreator1999/desidigitalprints/resolve/main/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
            </div>

            {/* Floating WhatsApp Badge */}
            <div
              onClick={() => openWhatsApp()}
              className="hero-phone-badge absolute -bottom-6 left-0 lg:-left-8 bg-white p-4 md:p-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-bounce-slow border border-gray-50 z-20 cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#bf1e2e]/10 text-[#bf1e2e] rounded-2xl flex items-center justify-center">
                <Phone className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm md:text-base leading-none">+91 90308 11329</p>
                <p className="text-[10px] font-bold text-[#bf1e2e] uppercase tracking-widest mt-1.5 line-clamp-1">24/7 Available</p>
              </div>
            </div>

            {/* Decorative Elements (Desktop only) */}
            <div className="hidden xl:block absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCircles = ({ occasions, onSelect, activeId }) => {
  const catRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-heading', {
        opacity: 0, y: 20, duration: 0.2, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: '.cat-heading', start: 'top 95%', once: true }
      });
      gsap.from('.cat-circle', {
        opacity: 0, y: 15, scale: 0.98, stagger: 0.05, duration: 0.2, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: '.cat-circles-wrap', start: 'top 95%', once: true }
      });
    }, catRef);
    return () => ctx.revert();
  }, [occasions]);

  return (
    <div ref={catRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="cat-heading text-center mb-12 space-y-3">
          <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">Collections</div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Browse by Occasion</h2>
          <p className="text-gray-500 font-medium italic">Hand-crafted collections for every celebration</p>
        </div>
        <div className="cat-circles-wrap flex flex-wrap justify-center gap-6 md:gap-12">
          {occasions.map(occ => (
            <div
              key={occ.id}
              className="cat-circle flex flex-col items-center gap-4 group cursor-pointer"
              onClick={() => onSelect(occ)}
            >
              <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-3 p-1.5 transition-all duration-500 ${activeId === occ.id ? 'border-[#bf1e2e] scale-110 shadow-[0_10px_30px_rgba(191,30,46,0.2)]' : 'border-transparent group-hover:border-[#bf1e2e]/30'}`}>
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/${occ.name}/200/200`} loading="lazy" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className={`absolute inset-0 transition-colors ${activeId === occ.id ? 'bg-[#bf1e2e]/10' : 'bg-black/10 group-hover:bg-[#bf1e2e]/10'}`} />
                </div>
              </div>
              <span className={`text-sm md:text-base font-black uppercase tracking-tighter transition-colors ${activeId === occ.id ? 'text-[#bf1e2e]' : 'text-gray-900 group-hover:text-[#bf1e2e]'}`}>{occ.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppOrder = () => {
    openWhatsApp(`Hi! I'm interested in this design: "${item.name}". Can you customize it for my event?`);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Overlay Tools */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-[#bf1e2e]/80 via-black/40 to-black/20 flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-[2px]"
            >
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-white text-[#bf1e2e] font-black py-4 rounded-full shadow-xl transform transition-transform hover:scale-105 active:scale-95 text-sm uppercase tracking-tighter flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Order This Design
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-white/15 backdrop-blur-md text-white border border-white/30 font-black py-4 rounded-full shadow-xl hover:bg-white/25 transition-all text-sm uppercase tracking-tighter flex items-center justify-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Customize This
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-lg">
          <Heart className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-[#bf1e2e] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-lg">Featured</div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-[17px] font-black leading-[1.2] text-gray-900 line-clamp-2 hover:text-[#bf1e2e] cursor-pointer transition-colors uppercase tracking-tighter">{item.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            <span className="text-[11px] font-bold text-gray-500 ml-1">Premium Quality</span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Digital Print</span>
            <span className="text-sm font-bold text-gray-400">Custom Pricing</span>
          </div>
          <button
            onClick={handleWhatsAppOrder}
            className="flex items-center gap-2 text-xs font-black text-[#bf1e2e] uppercase tracking-tighter group/more hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            Enquire <ArrowRight className="w-3 h-3 transition-transform group-hover/more:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- How It Works Section ---
const HowItWorks = () => {
  const howRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-heading', {
        opacity: 0, y: 20, duration: 0.2, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: '.hiw-heading', start: 'top 95%', once: true }
      });
      gsap.from('.hiw-step', {
        opacity: 0, y: 20, stagger: 0.05, duration: 0.2, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: '.hiw-steps', start: 'top 90%', once: true }
      });
      gsap.from('.hiw-cta', {
        opacity: 0, y: 10, duration: 0.2, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: '.hiw-cta', start: 'top 95%', once: true }
      });
    }, howRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={howRef} id="how-it-works" className="py-24 bg-gradient-to-b from-white to-[#fff5f5] scroll-mt-36">
      <div className="container mx-auto px-6">
        <div className="hiw-heading text-center mb-16 space-y-4">
          <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">Simple Process</div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">How It Works</h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Three simple steps to get your perfect custom design</p>
        </div>
        <div className="hiw-steps grid grid-cols-1 md:grid-cols-3 gap-16">
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
        <div className="hiw-cta mt-16 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openWhatsApp('Hi! I\'d like to discuss a custom design for my event.')}
            className="bg-[#bf1e2e] hover:bg-[#a01826] text-white font-black px-10 py-5 text-lg rounded-full shadow-[0_15px_30px_rgba(191,30,46,0.3)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter inline-flex items-center justify-center gap-3"
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
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.banner-content', {
        opacity: 0, y: 30, scale: 0.99, duration: 0.3, ease: 'power2.out', force3D: true,
        scrollTrigger: { trigger: bannerRef.current, start: 'top 95%', once: true }
      });
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="py-20 bg-gradient-to-br from-[#8b0000] via-[#bf1e2e] to-[#e63946] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="banner-content max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-black uppercase tracking-widest">Available Right Now</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Ready to Make Your <br /> Event Unforgettable?
          </h2>
          <p className="text-white/80 text-xl font-medium max-w-xl mx-auto">
            Just send me a WhatsApp message with your ideas. I'll craft the perfect digital design for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => openWhatsApp('Hi! I want to order a custom design for my event! 🎉')}
              className="bg-white text-[#bf1e2e] font-black px-12 py-5 text-lg rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter flex items-center justify-center gap-3"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Chat on WhatsApp
            </button>
            <a
              href="tel:+919030811329"
              className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-black px-12 py-5 text-lg rounded-full shadow-lg transition-all hover:scale-105 hover:bg-white/20 active:scale-95 uppercase tracking-tighter flex items-center justify-center gap-3"
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

const Footer = () => (
  <footer className="bg-[#222] text-white pt-20 pb-10 px-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b border-white/10 pb-20">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden p-1 shadow-lg border-2 border-[#bf1e2e]">
            <img src="/images/logo.png" className="w-full h-full object-cover rounded-full" alt="Logo" />
          </div>
          <span className="text-4xl font-black tracking-tighter">Desi Digital Prints</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          Premium digital invitations, welcome boards & event designs crafted with love. Browse my portfolio and message me on WhatsApp to get your custom design.
        </p>

        {/* WhatsApp Contact */}
        <div
          onClick={() => openWhatsApp()}
          className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 px-5 py-3 rounded-2xl cursor-pointer hover:bg-[#25D366]/20 transition-all group"
        >
          <WhatsAppIcon className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-sm font-black text-white">+91 9030811329</p>
            <p className="text-[10px] font-bold text-[#25D366] uppercase tracking-widest">Available 24/7 • Tap to Chat</p>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {[
        { title: 'Services', links: ['Wedding Invitations', 'Birthday Cards', 'Welcome Boards', 'Save the Dates', 'Event Posters'] },
        { title: 'Quick Links', links: ['Browse Gallery', 'How It Works', 'About the Artist', 'Custom Orders'] },
        { title: 'Contact', links: ['WhatsApp: +91 9030811329', 'Available 24/7', 'Custom Requests Welcome', 'Fast Turnaround'] }
      ].map((col, idx) => (
        <div key={idx} className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-[#bf1e2e]">{col.title}</h4>
          <ul className="space-y-4">
            {col.links.map((link, lIdx) => (
              <li key={lIdx} className="text-sm text-gray-400 hover:text-white cursor-pointer font-medium transition-colors">
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="container mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
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
        onClick={() => openWhatsApp('Hi! I visited your website and I\'m interested in your designs! 🎨')}
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

export default function LandingPage({ templates, onStart }) {
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [occasions, setOccasions] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [occData, uploadedData] = await Promise.all([
          pb.getFullList('occasions', { sort: 'name' }),
          pb.getFullList('images', { sort: '-created' })
        ]);

        setOccasions(occData || []);

        const staticTemplates = (templates || []).map(t => ({
          id: `t-${t.id}`,
          image_url: t.thumbnailUrl,
          name: t.name,
          template: t,
          occasion_id: 'all' // Templates show everywhere by default or can be categorized
        }));

        const formattedUploads = (uploadedData || []).map(img => ({
          ...img,
          image_url: pb.getFileUrl('images', img.id, img.file),
          occasion_id: img.occasion
        }));

        const unifiedImages = [...formattedUploads, ...staticTemplates];
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
    setVisibleCount(8); // Reset pagination on category change
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOccasion = activeOccasion === 'all' || img.occasion_id === activeOccasion;
    return matchesSearch && matchesOccasion;
  });

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#bf1e2e] selection:text-white page-fadein">
      <PromoBar />
      <MainHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main>
        <HeroSection />

        <CategoryCircles
          occasions={occasions}
          onSelect={handleFilterChange}
          activeId={activeOccasion}
        />

        {/* Gallery Section */}
        <section id="gallery" ref={galleryRef} className="py-20 bg-[#f9f9f9] scroll-mt-36">
          <div className="container mx-auto px-6">
            <div className="gallery-heading flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-[#bf1e2e]/10 text-[#bf1e2e] text-[10px] font-black uppercase tracking-widest rounded-full">My Portfolio</div>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
                  {activeOccasion === 'all' ? 'Featured Designs' : `${occasions.find(o => o.id === activeOccasion)?.name} Collection`}
                </h2>
                <p className="text-gray-400 text-sm font-medium">Like a design? Tap to order via WhatsApp</p>
              </div>
              <p className="text-gray-400 font-bold uppercase text-sm tracking-widest">
                {filteredImages.length} designs
              </p>
            </div>

            <NavigationBar
              occasions={occasions}
              activeOccasion={activeOccasion}
              onSelect={handleFilterChange}
            />

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-gray-200 animate-pulse aspect-[4/5] rounded-xl" />
                ))}
              </div>
            ) : filteredImages.length > 0 ? (
              <>
                <div className={`grid gap-8 ${filteredImages.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : filteredImages.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : filteredImages.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                  <AnimatePresence mode="popLayout">
                    {displayedImages.map((img, idx) => (
                      <motion.div
                        key={img.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: (idx % 8) * 0.05 }}
                      >
                        <ProductCard item={img} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {hasMore && (
                  <div className="mt-16 flex justify-center pb-10">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 8)}
                      className="group relative px-12 py-4 bg-white text-black font-black uppercase tracking-tighter text-lg rounded-full border-2 border-gray-900 shadow-[0_10px_0_#1a1a1a] active:shadow-none active:translate-y-[10px] transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2" id="loadMoreBtn">
                        Load More Designs
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
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

        <HowItWorks />
        <WhatsAppBanner />
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Tailwind Utility for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
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
