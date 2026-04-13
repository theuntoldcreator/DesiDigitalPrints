import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, User, ChevronDown,
  Menu, Heart, Bell, HelpCircle,
  Truck, Star, ArrowRight, ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const PromoBar = () => (
  <div className="bg-[#bf1e2e] text-white overflow-hidden py-2 px-4 whitespace-nowrap relative">
    <div className="flex animate-marquee gap-8 items-center justify-center text-sm font-bold uppercase tracking-widest">
      <span>✨ 20% OFF ALL WEDDING INVITATIONS • CODE: DESI20 ✨</span>
      <span className="hidden md:inline">FREE WORLDWIDE DIGITAL DELIVERY • 24HR TURNAROUND</span>
      <span className="hidden lg:inline">TRUSTED BY 5000+ HAPPY COUPLES WORLDWIDE</span>
    </div>
  </div>
);

const UtilityHeader = () => (
  <div className="hidden md:flex bg-[#f9f9f9] border-b border-gray-200">
    <div className="container mx-auto px-4 md:px-12 py-2 flex justify-between items-center text-[13px] font-medium text-gray-600">
      <div className="flex gap-8">
        <a href="#" className="hover:text-[#bf1e2e] transition-colors">Sell Your Art</a>
        <a href="#" className="hover:text-[#bf1e2e] transition-colors">Order Status</a>
        <a href="#" className="hover:text-[#bf1e2e] transition-colors uppercase font-bold text-blue-700">Desi Plus</a>
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#bf1e2e]">
          <Truck className="w-4 h-4" /> <span>Track Order</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#bf1e2e]">
          <HelpCircle className="w-4 h-4" /> <span>Help</span>
        </div>
      </div>
    </div>
  </div>
);

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
        <div className="flex-1 relative group max-w-5xl">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#bf1e2e] transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search collections or occasions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 md:h-12 bg-gray-100 rounded-full pl-12 pr-4 text-gray-800 outline-none border border-transparent focus:border-gray-300 focus:bg-white transition-all font-medium"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#bf1e2e] p-2 rounded-full text-white hover:bg-[#a01826] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Account / Utilities */}
        <div className="flex items-center gap-1 md:gap-4 shrink-0">
          <button className="hidden sm:flex flex-col items-center hover:text-[#bf1e2e] transition-colors">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase mt-1">Sign In</span>
          </button>
          <button className="hidden sm:flex flex-col items-center hover:text-[#bf1e2e] transition-colors relative">
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase mt-1">My Stuff</span>
          </button>
          <button className="flex flex-col items-center hover:text-[#bf1e2e] transition-colors relative bg-gray-50 md:bg-transparent p-2 rounded-full">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#bf1e2e] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">0</span>
            <span className="hidden md:block text-[10px] font-bold uppercase mt-1">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavigationBar = ({ occasions, activeOccasion, onSelect }) => {
  return (
    <nav className="hidden lg:block border-b border-gray-100 bg-white sticky top-[88px] z-[90] w-full">
      <ul className="flex items-center justify-center gap-12 py-4 text-[14px] font-bold text-gray-700 uppercase tracking-wide">
        <li
          onClick={() => onSelect({ id: 'all', name: 'All' })}
          className={`cursor-pointer hover:text-[#bf1e2e] transition-all relative group py-1 ${activeOccasion === 'all' ? 'text-[#bf1e2e]' : ''}`}
        >
          New Arrivals
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-[#bf1e2e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </li>
        {occasions.map(occ => (
          <li
            key={occ.id}
            onClick={() => onSelect(occ)}
            className={`cursor-pointer hover:text-[#bf1e2e] transition-all relative group py-1 ${activeOccasion === occ.id ? 'text-[#bf1e2e]' : ''}`}
          >
            {occ.name}
            <div className={`absolute -bottom-3 left-0 w-full h-1 bg-[#bf1e2e] transition-transform origin-left ${activeOccasion === occ.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
          </li>
        ))}
        <li className="cursor-pointer hover:text-[#bf1e2e] transition-all relative group py-1 font-black text-blue-700">
          Zazzle Plus
        </li>
      </ul>
    </nav>
  );
};

const HeroSection = () => (
  <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-[#e8e9eb] flex items-center">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <div className="grid grid-cols-12 h-full gap-4">
        {[...Array(12)].map((_, i) => <div key={i} className="bg-gray-400/20" />)}
      </div>
    </div>

    <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center relative z-10">
      <div className="flex-1 text-center md:text-left space-y-6">
        <span className="inline-block bg-[#bf1e2e] text-white px-3 py-1 text-xs font-black uppercase tracking-widest rounded">Wedding Season 2026</span>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter">
          Make Your <br /> <span className="text-[#bf1e2e]">Special Day</span> <br /> Iconic.
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-md mx-auto md:mx-0">
          Ultra-premium digital invitations & welcome boards. Designed in minutes, delivered in hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
          <button className="bg-black hover:bg-gray-800 text-white font-black px-10 py-4 text-lg rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter">
            Shop Invitations
          </button>
          <button className="bg-white hover:bg-gray-50 text-black border border-gray-200 font-black px-10 py-4 text-lg rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter">
            View Bestsellers
          </button>
        </div>
      </div>
      <div className="flex-1 hidden md:flex justify-end pr-8">
        <div className="relative">
          <div className="w-[450px] h-[550px] rounded-[40px] overflow-hidden shadow-[-40px_-40px_0_rgba(191,30,46,0.1)] border border-white">
            <img src="/src/assets/hero.png" className="w-full h-full object-cover" alt="Hero Wedding" />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce-slow border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="font-black text-gray-900 leading-none">Trust-Locked</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Verified Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CategoryCircles = ({ occasions, onSelect, activeId }) => (
  <div className="py-16 md:py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Shop by Occasion</h2>
        <p className="text-gray-500 font-medium italic">Hand-picked collections for every moment</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {occasions.map(occ => (
          <div
            key={occ.id}
            className="flex flex-col items-center gap-4 group cursor-pointer"
            onClick={() => onSelect(occ)}
          >
            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 p-1.5 transition-all duration-500 ${activeId === occ.id ? 'border-[#bf1e2e] scale-110 shadow-xl' : 'border-transparent group-hover:border-gray-200'}`}>
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img src={`https://picsum.photos/seed/${occ.name}/200/200`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
            <span className={`text-sm md:text-base font-black uppercase tracking-tighter transition-colors ${activeId === occ.id ? 'text-[#bf1e2e]' : 'text-gray-900 group-hover:text-[#bf1e2e]'}`}>{occ.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProductCard = ({ item, templates, onStart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleDesign = () => {
    const tpl = item.template || templates.find(t => t.name.includes(item.name)) || templates[0];
    if (tpl) {
      onStart(tpl);
      navigate('/design');
    }
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
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-[2px]"
            >
              <button
                onClick={handleDesign}
                className="w-full bg-white text-black font-black py-4 rounded-full shadow-xl transform transition-transform hover:scale-105 active:scale-95 text-sm uppercase tracking-tighter"
              >
                Personalize it
              </button>
              <button className="w-full bg-black/60 text-white font-black py-4 rounded-full shadow-xl border border-white/20 hover:bg-black/80 transition-all text-sm uppercase tracking-tighter">
                Quick Look
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-lg">
          <Heart className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-[#bf1e2e] text-white text-[10px] font-black px-2 py-1 rounded uppercase">Trending</div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-[17px] font-black leading-[1.2] text-gray-900 line-clamp-2 hover:text-[#bf1e2e] cursor-pointer transition-colors uppercase tracking-tighter">{item.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            <span className="text-[11px] font-bold text-gray-500 ml-1">4.9 (124 reviews)</span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Digital Copy</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900">$12.99</span>
              <span className="text-sm text-gray-400 line-through font-bold">$19.99</span>
            </div>
          </div>
          <button onClick={handleDesign} className="flex items-center gap-2 text-xs font-black text-[#bf1e2e] uppercase tracking-tighter group/more">
            Design <ArrowRight className="w-3 h-3 transition-transform group-hover/more:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#222] text-white pt-20 pb-10 px-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b border-white/10 pb-20">
      <div className="lg:col-span-1 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden p-1 shadow-lg border-2 border-[#bf1e2e]">
            <img src="/images/logo.png" className="w-full h-full object-cover rounded-full" alt="Logo" />
          </div>
          <span className="text-4xl font-black tracking-tighter">Desi Digital Prints</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          The world's premium destination for digital Indian wedding invitations and custom celebrate events. Customization made human.
        </p>
        <div className="flex gap-4">
          <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {[
        { title: 'Shop', links: ['Wedding Invitations', 'Birthday Cards', 'Welcome Boards', 'Save the Dates', 'Zazzle Plus'] },
        { title: 'Company', links: ['About Desi Digital Prints', 'The Creators', 'Careers', 'Press', 'Sitemap'] },
        { title: 'Support', links: ['Help Center', 'Track Order', 'Your Digital Rights', 'Refund Policy', 'Contact Us'] },
        { title: 'Sell', links: ['Join our Marketplace', 'Creator Tools', 'Designer Stories', 'Creator Forum', 'Affiliate Program'] }
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
        <span className="text-xs font-black uppercase tracking-tighter">Verified by DigitalTrust</span>
      </div>
    </div>
  </footer>
);

// --- Main Page Component ---

export default function LandingPage({ templates, onStart }) {
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [occasions, setOccasions] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const occRes = await fetch('/api/occasions');
        const occData = await occRes.json();
        setOccasions(occData || []);

        // Initial load
        setImages((templates || []).map(t => ({
          id: t.id, image_url: t.thumbnailUrl, name: t.name, template: t
        })));
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [templates]);

  const handleFilterChange = async (occ) => {
    setActiveOccasion(occ.id);
    setLoading(true);
    try {
      if (occ.id === 'all') {
        setImages((templates || []).map(t => ({
          id: t.id, image_url: t.thumbnailUrl, name: t.name, template: t
        })));
      } else {
        const res = await fetch(`/api/occasions/${occ.id}/images`);
        const data = await res.json();
        setImages(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter(img =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#bf1e2e] selection:text-white">
      <PromoBar />
      <UtilityHeader />
      <MainHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NavigationBar
        occasions={occasions}
        activeOccasion={activeOccasion}
        onSelect={handleFilterChange}
      />

      <main>
        <HeroSection />

        <CategoryCircles
          occasions={occasions}
          onSelect={handleFilterChange}
          activeId={activeOccasion}
        />

        {/* Featured Products Section */}
        <section className="py-20 bg-[#f9f9f9]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">Explore Trends</div>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
                  {activeOccasion === 'all' ? 'Featured Collections' : `Top Digital ${occasions.find(o => o.id === activeOccasion)?.name} Prints`}
                </h2>
              </div>
              <p className="text-gray-400 font-bold uppercase text-sm tracking-widest">
                {filteredImages.length} results found
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-gray-200 animate-pulse aspect-[4/5] rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((img) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={img.id}
                    >
                      <ProductCard
                        item={img}
                        templates={templates}
                        onStart={onStart}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && filteredImages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">No masterpieces found</h3>
                <p className="text-gray-500 font-medium mt-2">Try a different vibe or clear your filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Secure checkout and 100% data privacy for your events.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Receive your high-res digital files within 12-24 hours.' },
              { icon: CheckCircle, title: 'Human Quality', desc: 'Every design is reviewed by our digital artists for perfection.' }
            ].map((prop, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 group">
                <div className="w-20 h-20 bg-gray-50 text-[#bf1e2e] rounded-3xl flex items-center justify-center group-hover:bg-[#bf1e2e] group-hover:text-white transition-all duration-500 shadow-xl border border-gray-100">
                  <prop.icon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{prop.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

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
      `}</style>
    </div>
  );
}
