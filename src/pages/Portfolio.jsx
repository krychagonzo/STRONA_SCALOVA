import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ["Wszystkie", "Animacja", "Grafika", "Automatyzacja", "Strony"];

const PROJECTS = [
  {
    id: 1,
    title: "Nura Health",
    category: "Strony",
    desc: "Platforma e-commerce generująca 14x ROAS, zbudowana z myślą o milisekundowych czasach ładowania i konwersji przewyższającej standardy branży.",
    img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80"
  },
  {
    id: 2,
    title: "Cypher Security",
    category: "Grafika",
    desc: "Rebranding dla lidera cyberbezpieczeństwa. Rozpoznawalna, brutalistyczna estetyka i bezkompromisowe oparcie o dane wizualne.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
  },
  {
    id: 3,
    title: "Lumine",
    category: "Automatyzacja",
    desc: "Kampania reklamowa z zautomatyzowanymi lejkami skierowana do segmentu ultra-premium. Optymalizacja lejków zaowocowała spadkiem CPL o 45%.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 4,
    title: "Aura Aesthetics",
    category: "Strony",
    desc: "System rezerwacyjny połączony z wysoce estetyczną wizytówką kliniki. Efekt? Pełna automatyzacja kalendarza spotkań i napływ nowych leadów.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
  },
  {
    id: 5,
    title: "Kinesis Lab",
    category: "Animacja",
    desc: "Produkcja ruchomych i statycznych treści wizualnych pod Meta Ads. Skrócenie cyklu decyzyjnego klientów o równe 43%.",
    img: "https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?w=800&q=80"
  },
  {
    id: 6,
    title: "Onyx Real Estate",
    category: "Automatyzacja",
    desc: "Budowa silnika analitycznego bazującego na No-Code i wdrożenie automatyzacji rynków dla agencji nieruchomości klasy A.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const filteredProjects = PROJECTS.filter(project => 
    activeCategory === "Wszystkie" ? true : project.category === activeCategory
  );

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      
      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="portfolioNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#portfolioNoise)"/>
        </svg>
      </div>

      {/* UNIFIED PORTFOLIO SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-32 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Nasze Prace
        </span>
        
        {/* Kontener wyznaczający szerokość całości kaskadowo z wielkością napisu PORTFOLIO */}
        <div className="inline-flex flex-col items-stretch max-w-full mx-auto">
          <h1 className="text-ivory text-[45px] sm:text-[70px] md:text-[110px] lg:text-[150px] xl:text-[180px] 2xl:text-[220px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            PORTFOLIO
          </h1>
          
          {/* FILTER CATEGORIES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2 w-full mt-4 md:mt-8">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative flex flex-col items-center justify-center py-2 px-1 md:py-3 md:px-2 min-h-[40px] md:min-h-[50px] rounded-none font-heading text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-500 border overflow-hidden ${
                  activeCategory === cat 
                  ? 'bg-accent text-obsidian border-accent font-bold shadow-[0_0_20px_rgba(212,255,0,0.2)] z-10' 
                  : 'bg-[#0c0c0c] text-ivory/60 border-white/5 hover:border-white/20 hover:-translate-y-0.5 hover:text-ivory'
                }`}
              >
                <div className="absolute top-1 left-1.5 text-[7px] sm:text-[8px] text-current/30 font-sans opacity-50 group-hover:opacity-100 transition-opacity">
                   {String(idx).padStart(2, '0')}
                </div>
                <span className="relative z-10 text-center leading-tight mt-1 truncate max-w-full px-1">{cat}</span>
                
                {activeCategory !== cat && (
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-500 pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* PROJECT TILES (SQUARE & IN 3 COLUMNS MATCHING HEADER WIDTH) */}
          <motion.div 
             layout
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 w-full mt-10 md:mt-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    layout: { type: "spring", stiffness: 250, damping: 25 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }}
                  className="group relative w-full aspect-square rounded-none overflow-hidden bg-[#0c0c0c] cursor-pointer isolate transform-gpu border border-white/5 hover:border-accent/40 transition-all duration-500"
                >
                  {/* INITIAL IMAGE */}
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* DARK OVERLAY (Gets darker on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700 pointer-events-none" />

                  {/* CONTENT REVEAL ON HOVER */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                     <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                       <span className="font-heading font-light text-accent text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-3 block opacity-80">
                         {project.category}
                       </span>
                       <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl text-ivory uppercase tracking-tighter mb-4 leading-tight group-hover:text-accent transition-colors duration-500">
                         {project.title}
                       </h3>
                       
                       {/* DESCRIPTION FADES IN */}
                       <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                          <div className="overflow-hidden">
                            <p className="font-sans text-ivory/60 text-xs md:text-sm leading-relaxed pt-2 w-full">
                               {project.desc}
                            </p>
                          </div>
                       </div>
                     </div>
                  </div>

                  {/* HOVER BORDER GLOW */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-accent/20 transition-all duration-500 pointer-events-none z-20" />

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
