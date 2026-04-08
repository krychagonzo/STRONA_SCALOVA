import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
   const sectionRef = useRef(null);

   useEffect(() => {
      let ctx = gsap.context(() => {
         // Intro animations
         gsap.from('.fade-up-element', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top 70%',
            }
         });
      }, sectionRef);
      return () => ctx.revert();
   }, []);

   return (
      <section id="proof" ref={sectionRef} className="relative w-full py-16 overflow-hidden bg-obsidian flex flex-col items-center">
         {/* Subtle Background Elements */}


         <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

            <div className="text-center mb-14 flex flex-col items-center">
               <h2 className="fade-up-element text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
                  JEDEN SYSTEM. CZTERY FILARY.
               </h2>
            </div>

            {/* Filar 1: SPRZEDAŻ */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 01</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Sprzedaż</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Gotowe lejki i skrypty sprzedażowe, które 24/7 zamieniają zebrany ruch w domknięte transakcje.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <div className="absolute w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
                  <img src="/SPRZEDAZ.png" alt="Sprzedaż" className="w-full max-w-xs relative z-10" />
               </div>
            </div>

            {/* Filar 2: WIDOCZNOŚĆ W SIECI */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-16 mb-20 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 02</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Widoczność w Sieci</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Prestiżową platformę internetową i wizerunek, który natychmiastowo pozycjonuje Cię jako lidera.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <div className="absolute w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
                  <img src="/WIDOCZNOSC.png" alt="Widoczność w Sieci" className="w-full max-w-xs relative z-10" />
               </div>
            </div>

            {/* Filar 3: AUTOMATYZACJE */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 03</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Automatyzacje</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Inteligentne systemy AI i ułożony CRM, które na zawsze uwalniają firmę od pożeraczy czasu.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <div className="absolute w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
                  <img src="/AUTOMATYZACJA.png" alt="Automatyzacje" className="w-full max-w-xs relative z-10" />
               </div>
            </div>

            {/* Filar 4: MARKETING */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-16 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 04</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Marketing</h3>
                  <p className="font-sans text-lg text-ivory/60 mb-8 leading-relaxed">
                     Ultraprecyzyjne kampanie reklamowe wymierzone w wyłączny napływ gorących, chętnych do zakupu leadów.
                  </p>
                  <div className="flex items-center gap-6">
                     <div className="flex flex-col">
                        <span className="font-heading text-3xl text-ivory font-light tracking-tight">14<span className="text-accent text-xl">x</span></span>
                        <span className="font-heading text-xs text-ivory/40 uppercase tracking-widest">Średni ROAS</span>
                     </div>
                     <div className="h-10 w-[1px] bg-slate/30"></div>
                     <div className="flex flex-col">
                        <span className="font-heading text-3xl text-ivory font-light tracking-tight">&lt;15<span className="text-accent text-xl">%</span></span>
                        <span className="font-heading text-xs text-ivory/40 uppercase tracking-widest">Spadek CPL</span>
                     </div>
                  </div>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <div className="absolute w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
                  <img src="/MARKETING.png" alt="Marketing" className="w-full max-w-xs relative z-10" />
               </div>
            </div>

         </div>
      </section>
   );
}


