import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Bayer 4x4 dithering — eliminuje banding na ciemnych gradientach
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function PortfolioCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });
    const DURATION_MS = 2500;
    const GLOW_FINAL  = 0.50;
    const BR = 14, BG = 14, BB = 14;
    const GR = 42, GG = 42, GB = 42;

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = 0;
      const rx = w * 0.75;
      const ry = 1200;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const dither = BAYER4[(y & 3) * 4 + (x & 3)];
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          const t  = Math.min(Math.sqrt(dx * dx + dy * dy), 1.0);
          const ss = 1 - t * t * (3 - 2 * t);
          const alpha = ss * glowT;
          const r = BR + (GR - BR) * alpha;
          const g = BG + (GG - BG) * alpha;
          const b = BB + (GB - BB) * alpha;
          const n = dither * 2;
          data[i]     = Math.min(255, Math.max(0, r + n));
          data[i + 1] = Math.min(255, Math.max(0, g + n));
          data[i + 2] = Math.min(255, Math.max(0, b + n));
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    let currentGlow = 0;
    drawAt(currentGlow, w, h);

    let rafId = null;
    let startTs = null;
    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawAt(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      drawAt(currentGlow, w, h);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

const CATEGORIES = [
  "Wszystkie",
  "STATYCZNE TREŚCI WIZUALNE",
  "RUCHOME TREŚCI WIZUALNE",
  "STRONA & AI ASYSTENT"
];

export const CATEGORY_ICONS = {
  "STATYCZNE TREŚCI WIZUALNE": "/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg",
  "RUCHOME TREŚCI WIZUALNE": "/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg",
  "STRONA & AI ASYSTENT": "/SEKCJA_USLUGI/IKONA_STRONA_AI.svg"
};

export default function Portfolio() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl && CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : "Wszystkie"
  );
  const navigate = useNavigate();

  const filteredProjects = PORTFOLIO_DATA.filter(project => 
    activeCategory === "Wszystkie" ? true : project.categories?.includes(activeCategory)
  );

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      
      {/* AMBIENT GRADIENT z Bayer diteringiem */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ height: '120vh' }}>
          <PortfolioCanvas />
        </div>
      </div>

      {/* UNIFIED PORTFOLIO SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-32 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Nasze Prace
        </span>
        
        {/* Kontener wyznaczający szerokość całości kaskadowo z wielkością napisu PORTFOLIO */}
        <div className="inline-flex flex-col items-stretch max-w-full mx-auto px-4 md:px-0">
          <h1 className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-ivory text-[40px] sm:text-[60px] md:text-[90px] lg:text-[130px] xl:text-[160px] 2xl:text-[200px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            <img src="/LOGO_WHITE.svg" alt="SCALOVA" className="h-[0.72em] w-auto opacity-100" />
            <span>PORTFOLIO</span>
          </h1>
          
          {/* FILTER CATEGORIES */}
          <div className="grid grid-cols-2 md:flex md:flex-row flex-wrap justify-center gap-1 md:gap-6 w-full mt-4 md:mt-8">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative flex flex-col md:flex-row items-center justify-center p-2 md:py-3 md:px-4 md:gap-4 rounded-none font-heading text-[11px] sm:text-[13px] md:text-[15px] uppercase tracking-widest transition-all duration-500 bg-transparent outline-none ${
                  activeCategory === cat 
                  ? 'text-accent font-bold scale-105' 
                  : 'text-ivory/40 hover:text-ivory hover:-translate-y-0.5'
                }`}
              >
                {/* DECORATIVE TOP-RIGHT CORNER REVEAL */}
                <div 
                  className={`absolute top-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-current pointer-events-none ${
                    activeCategory === cat 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : 'opacity-0 translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0'
                  }`}
                  style={{ WebkitMask: 'url(/ROG.png) no-repeat center', mask: 'url(/ROG.png) no-repeat center', WebkitMaskSize: 'contain', maskSize: 'contain' }}
                />

                {/* ICON */}
                {cat !== "Wszystkie" && CATEGORY_ICONS[cat] && (
                  <div 
                    className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 bg-current" 
                    style={{ WebkitMask: `url(${CATEGORY_ICONS[cat]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[cat]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                  />
                )}
                
                <span className="relative z-10 text-center leading-tight mt-1 md:mt-0 max-w-full px-1">{cat}</span>
              </button>
            ))}
          </div>

          {/* PROJECT TILES (SQUARE & IN 3 COLUMNS MATCHING HEADER WIDTH) */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 w-full mt-10 md:mt-16"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/portfolio/${project.id}`)}
                  className="group relative w-full aspect-square rounded-none overflow-hidden bg-[#0c0c0c] cursor-pointer isolate transform-gpu border border-white/5 hover:border-accent/40 transition-all duration-500"
                >
                  {/* INITIAL IMAGE / VIDEO */}
                  {project.thumbnail.endsWith('.mp4') ? (
                    <video 
                      src={project.thumbnail} 
                      autoPlay loop muted playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <picture>
                      <source media="(max-width: 1023px)" srcSet={project.thumbnail.replace(/\.[^/.]+$/, '_mobile.webp')} type="image/webp" />
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                      />
                    </picture>
                  )}
                  
                  {/* DARK OVERLAY (Shows only on hover to let image pop initially) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none" />

                  {/* CONTENT REVEAL ON HOVER */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                     <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                       <div className="flex flex-row flex-wrap gap-3 mb-3">
                         {project.categories?.map(c => (
                           <div key={c} className="flex flex-row items-center gap-1.5">
                              {CATEGORY_ICONS[c] && (
                                <div 
                                  className="w-3 h-3 md:w-3.5 md:h-3.5 bg-accent" 
                                  style={{ WebkitMask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                                />
                              )}
                              <span className="font-heading font-light text-accent text-[8px] md:text-[9px] tracking-[0.2em] uppercase">
                                {c}
                              </span>
                           </div>
                         ))}
                       </div>
                       <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory uppercase tracking-tighter mb-2 leading-tight text-accent transition-colors duration-500">
                         {project.title}
                       </h3>
                     </div>
                  </div>

                  {/* HOVER BORDER GLOW */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-accent/20 transition-all duration-500 pointer-events-none z-20" />

                  {/* TOP-RIGHT CORNER "ROG.png" INDICATOR */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none z-30">
                    <img src="/ROG.png" alt="" className="w-6 h-6 md:w-8 md:h-8 brightness-0 invert object-contain" />
                  </div>

                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
