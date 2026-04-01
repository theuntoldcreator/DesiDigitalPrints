import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';




/* ── Liquid Text Component ─────────────────────────────────────────
   Each character gets a GSAP-driven liquid wobble on mouse hover.
   The SVG filter creates a gooey / liquid displacement effect.
   ─────────────────────────────────────────────────────────────── */
function LiquidText({ text, className = '' }) {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  const handleMouseEnter = useCallback(() => {
    charsRef.current.forEach((char, i) => {
      gsap.killTweensOf(char);
      gsap.fromTo(char,
        { y: 0, scale: 1, rotateZ: 0, opacity: 1 },
        {
          y: () => gsap.utils.random(-18, 18),
          scale: gsap.utils.random(0.92, 1.12),
          rotateZ: gsap.utils.random(-8, 8),
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
          delay: i * 0.025,
        }
      );
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    charsRef.current.forEach((char, i) => {
      gsap.killTweensOf(char);
      gsap.to(char, {
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        delay: i * 0.02,
      });
    });
  }, []);

  // Track mouse position across the text for per-character ripple
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    charsRef.current.forEach((char) => {
      if (!char) return;
      const charRect = char.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2 - rect.left;
      const charCenterY = charRect.top + charRect.height / 2 - rect.top;
      const distX = mouseX - charCenterX;
      const distY = mouseY - charCenterY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 150;

      if (dist < maxDist) {
        const force = 1 - dist / maxDist;
        gsap.to(char, {
          y: -force * 14,
          x: (distX / dist) * force * -6,
          scale: 1 + force * 0.1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  }, []);

  const words = text.split(' ');

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ filter: 'url(#liquid-filter)' }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => {
            const globalIndex = words.slice(0, wi).join('').length + ci + wi;
            return (
              <span
                key={`${wi}-${ci}`}
                ref={(el) => { charsRef.current[globalIndex] = el; }}
                className="inline-block will-change-transform"
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/* ── Main Landing Page ─────────────────────────────────────────── */
export default function LandingPage({ templates, onStart }) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const animRef = useRef(null);

  // Build carousel cards from DB templates (repeat to fill 12 slots for a full ring)
  const buildCarouselCards = () => {
    if (templates && templates.length > 0) {
      const cards = [];
      for (let i = 0; i < 12; i++) {
        const tpl = templates[i % templates.length];
        cards.push({ id: `tpl-${i}`, img: tpl.thumbnailUrl, name: tpl.name, template: tpl });
      }
      return cards;
    }
    // Fallback placeholders while loading
    return Array.from({ length: 12 }, (_, i) => ({
      id: `ph-${i}`, img: `https://picsum.photos/seed/desi${i + 1}/400/560`, name: `Template ${i + 1}`, template: null,
    }));
  };

  const carouselCards = buildCarouselCards();
  const totalCards = carouselCards.length;
  const anglePerCard = 360 / totalCards;
  const radius = 700;

  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.012;

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;
      setRotation(prev => (prev + speed * delta) % 360);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Stagger entrance animation variants for framer-motion
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden font-sans" data-theme="light">
      
      {/* SVG Filter for the liquid / gooey text effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Navbar with framer-motion entrance */}
      <motion.nav 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full px-6 md:px-12 py-5 flex justify-between items-center z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shrink-0"
      >
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ duration: 0.4 }}>
            <Sparkles className="w-5 h-5 text-black" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-black">DesiDigitalPrints</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Features</a>
          <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Pricing</a>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center pt-8 md:pt-12 relative">
        
        {/* Text with staggered entrance + Liquid hover */}
        <motion.div 
          className="text-center px-4 max-w-3xl mx-auto z-20 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-gray-400 font-semibold tracking-[0.25em] uppercase text-xs mb-4">
            Introducing
          </motion.p>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold text-black tracking-tight leading-[1.08] mb-4">
            <LiquidText text="Website Templates for" />
            <br/>
            <LiquidText text="Wedding Invites" />
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">
            Easy-to-customize, Effortless to Share,<br/>
            Website Templates for your Big Day.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (templates && templates.length > 0) onStart(templates[0]);
              }}
              className="bg-black text-white hover:bg-gray-900 transition-colors px-10 py-4 rounded-full font-medium text-base shadow-2xl shadow-black/10 relative z-30"
            >
              Choose a template
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Curved Carousel */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full -mt-24 md:-mt-20 relative flex items-center justify-center overflow-hidden"
          style={{ height: '520px', perspective: '1200px' }}
        >
          {/* The rotating ring */}
          <div
            style={{
              width: '200px',
              height: '300px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(-8deg) rotateY(${rotation}deg)`,
            }}
          >
            {carouselCards.map((card, index) => {
              const angle = anglePerCard * index;
              return (
                <div
                  key={card.id}
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => {
                    if (card.template) {
                      onStart(card.template);
                    } else if (templates && templates.length > 0) {
                      onStart(templates[0]);
                    }
                  }}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card */}
                  <div className="w-[200px] h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-shadow duration-300 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative bg-white">
                    <img src={card.img} alt={card.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-2xl backdrop-blur-[2px] gap-2">
                      <span className="text-white text-xs font-bold tracking-wider uppercase">{card.name}</span>
                      <span className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Use Template
                      </span>
                    </div>
                  </div>
                  {/* Shadow reflection */}
                  <div className="absolute left-4 right-4 h-8 rounded-full" style={{ bottom: '-30px', background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)', filter: 'blur(8px)' }}></div>
                </div>
              );
            })}
          </div>

          {/* Floor shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-32 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, transparent 70%)' }}></div>

          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
}
