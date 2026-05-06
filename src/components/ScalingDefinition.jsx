import React from 'react';
import { motion } from 'framer-motion';

import InteractiveDotGrid from './ui/InteractiveDotGrid';

const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

export default function ScalingDefinition() {
  return (
    <section className="relative w-full bg-obsidian flex flex-col justify-center items-center z-10 border-y border-slate/20">
      <div className="w-full bg-obsidian text-ivory py-16 md:py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">

        {/* Interactive Radial Dot Matrix Wrapper — desktop only */}
        {isDesktop && (
        <div className="absolute inset-0 flex justify-center w-full h-[calc(100%+2rem)] mt-[-1rem] z-0">
          <div
            className="w-full h-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect'
            }}
          >
            <div
              className="w-full h-full"
              style={{
                maskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)'
              }}
            >
              <InteractiveDotGrid />
            </div>
          </div>
        </div>
        )}
        
        <div className="w-full max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-light leading-relaxed md:leading-snug text-ivory/80 pointer-events-auto">
              Skalowanie to inwestycja, która pracuje bez końca. Wdrażasz technologię raz, aby obsługiwać <span className="font-extrabold text-accent tracking-tight drop-shadow-[0_0_15px_rgba(212,255,0,0.5)]">10x więcej klientów</span> bez powiększania zespołu i stałych kosztów.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
