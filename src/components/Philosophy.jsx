import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Globe, Bot, Target } from 'lucide-react';

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
      <section id="proof" ref={sectionRef} className="relative w-full py-32 overflow-hidden bg-obsidian flex flex-col items-center">
         {/* Subtle Background Elements */}
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
         <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-slate/5 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

            {/* Header Section */}
            <div className="text-center mb-24 flex flex-col items-center">
               <h2 className="fade-up-element font-heading font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-ivory drop-shadow-md uppercase leading-[1.05]">
                  JEDEN SYSTEM. CZTERY FILARY.
               </h2>
            </div>

            {/* Filar 1: SPRZEDAŻ */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-40 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 01</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Sprzedaż</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Gotowe lejki i skrypty sprzedażowe, które 24/7 zamieniają zebrany ruch w domknięte transakcje.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <SalesFunnelGraphic />
               </div>
            </div>

            {/* Filar 2: WIDOCZNOŚĆ W SIECI */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16 md:gap-24 mb-40 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 02</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Widoczność w Sieci</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Prestiżową platformę internetową i wizerunek, który natychmiastowo pozycjonuje Cię jako lidera.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <VisibilityGraphic />
               </div>
            </div>

            {/* Filar 3: AUTOMATYZACJE */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-40 fade-up-element">
               <div className="w-full md:w-5/12 max-w-lg">
                  <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Filar 03</span>
                  <h3 className="font-heading font-light text-5xl md:text-6xl mb-6 text-ivory drop-shadow-md uppercase tracking-tight">Automatyzacje</h3>
                  <p className="font-sans text-lg text-ivory/60 leading-relaxed">
                     Inteligentne systemy AI i ułożony CRM, które na zawsze uwalniają firmę od pożeraczy czasu.
                  </p>
               </div>

               <div className="w-full md:w-7/12 relative flex items-center justify-center">
                  <SalesFunnelGraphic />
               </div>
            </div>

            {/* Filar 4: MARKETING */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16 md:gap-24 fade-up-element">
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
                  <NodeNetworkGraphic />
               </div>
            </div>

         </div>
      </section>
   );
}

// ---- GRAPHIC COMPONENTS ----

function SalesFunnelGraphic() {
   return (
      <div className="w-full max-w-sm aspect-square relative flex items-center justify-center bg-[#080808] border border-slate/20 rounded-md overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-accent/5 rounded-full blur-[80px]"></div>
         <div className="flex flex-col items-center gap-3 z-10 w-full px-8">
            <div className="w-full h-12 bg-[#111] border border-slate/20 rounded-sm flex items-center justify-between px-6 shadow-inner">
               <span className="font-data text-[10px] text-ivory/50 tracking-widest">LEADS</span>
               <span className="font-data text-[12px] text-ivory font-bold">12,400</span>
            </div>
            <div className="w-4/5 h-12 bg-[#141414] border border-slate/30 rounded-sm flex items-center justify-between px-6 shadow-inner mt-1">
               <span className="font-data text-[10px] text-ivory/60 tracking-widest">PROSPECTS</span>
               <span className="font-data text-[12px] text-ivory font-bold">3,120</span>
            </div>
            <div className="w-3/5 h-16 bg-accent/10 border border-accent/40 rounded-sm flex items-center justify-between px-6 shadow-[0_0_20px_rgba(212,255,0,0.1)] relative mt-1">
               <span className="font-heading font-light text-[10px] text-accent tracking-widest">CLOSED</span>
               <span className="font-heading text-xl text-accent font-bold tracking-wider">850</span>
               <div className="absolute -right-3 -top-3 p-1.5 bg-[#080808] border border-accent rounded-md shadow-[0_0_10px_rgba(212,255,0,0.3)]">
                  <TrendingUp className="w-4 h-4 text-accent" />
               </div>
            </div>
         </div>
      </div>
   );
}

function VisibilityGraphic() {
   return (
      <div className="w-full max-w-sm aspect-square relative flex items-center justify-center bg-[#080808] border border-slate/20 rounded-md overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-accent/5 rounded-full blur-[80px]"></div>
         <div className="relative z-10 flex flex-col items-center w-full px-8">
            <div className="w-full bg-[#111] rounded-t-md h-8 border-x border-t border-slate/20 flex items-center px-4 gap-2">
               <div className="w-2 h-2 rounded-full bg-slate/50"></div>
               <div className="w-2 h-2 rounded-full bg-slate/50"></div>
               <div className="w-2 h-2 rounded-full bg-slate/50"></div>
            </div>
            <div className="w-full bg-[#050505] border border-slate/20 p-6 flex flex-col gap-4">
               <div className="w-full flex items-center gap-4">
                  <Globe className="w-6 h-6 text-accent/80" />
                  <div className="h-2 bg-slate/20 rounded-full w-full"></div>
               </div>
               <div className="w-full flex flex-col gap-2 mt-4 p-4 border border-accent/30 bg-accent/5 rounded-sm relative shadow-inner">
                  <div className="absolute -left-2 -top-2 px-2 py-0.5 bg-accent text-obsidian font-bold text-[8px] tracking-widest rounded-sm">RANK #1</div>
                  <div className="h-2.5 bg-accent/80 w-3/4 rounded-full"></div>
                  <div className="h-1.5 bg-slate/30 w-full rounded-full mt-2"></div>
                  <div className="h-1.5 bg-slate/30 w-4/5 rounded-full"></div>
               </div>
               <div className="w-full flex flex-col gap-2 p-4 border border-slate/20 rounded-sm opacity-40">
                  <div className="h-2.5 bg-slate/40 w-2/3 rounded-full"></div>
                  <div className="h-1.5 bg-slate/30 w-full rounded-full mt-2"></div>
               </div>
            </div>
         </div>
      </div>
   );
}

function TerminalGraphic() {
   return (
      <div className="w-full max-w-sm aspect-square relative flex items-center justify-center bg-[#080808] border border-slate/20 rounded-md overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-accent/5 rounded-full blur-[80px]"></div>
         <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
            <div className="flex items-center justify-center gap-6 relative w-full px-8">
               <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-slate/30 -z-10 -translate-y-1/2"></div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-sm border border-slate/40 bg-[#111] flex items-center justify-center">
                     <span className="font-data text-[8px] text-ivory/70">LEAD</span>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-sm border border-accent bg-accent/10 flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.15)] relative">
                     <Bot className="w-6 h-6 text-accent" />
                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-[#080808]"></div>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-sm border border-slate/40 bg-[#111] flex items-center justify-center">
                     <span className="font-data text-[8px] text-ivory/70">CRM</span>
                  </div>
               </div>
            </div>
            <div className="w-3/4 p-4 border border-slate/20 bg-[#0A0A0A] flex flex-col gap-2 rounded-sm mt-2 shadow-inner">
               <div className="flex justify-between items-center">
                  <span className="font-data text-[9px] text-ivory/50 tracking-widest">WORKFLOW SYS</span>
                  <span className="font-heading font-light text-[9px] text-accent tracking-widest">100% AUTO</span>
               </div>
               <div className="w-full h-1 bg-slate/20 rounded-full overflow-hidden mt-1">
                  <div className="w-full h-full bg-accent"></div>
               </div>
            </div>
         </div>
      </div>
   );
}

function NodeNetworkGraphic() {
   return (
      <div className="w-full max-w-sm aspect-square relative flex items-center justify-center bg-[#080808] border border-slate/20 rounded-md overflow-hidden shadow-2xl p-8">
         <div className="absolute inset-0 bg-accent/5 rounded-full blur-[80px]"></div>
         <div className="w-full h-full flex flex-col justify-between z-10 relative mt-2">
            <div className="flex justify-between items-start w-full">
               <div className="flex flex-col gap-1">
                  <span className="font-data text-[10px] text-ivory/50 tracking-widest uppercase">Aktywne Kampanie</span>
                  <span className="font-heading text-4xl font-bold text-ivory">14<span className="text-accent text-2xl">x ROAS</span></span>
               </div>
               <div className="p-3 bg-accent/10 border border-accent/30 rounded-full shadow-[0_0_15px_rgba(212,255,0,0.1)]">
                  <Target className="w-5 h-5 text-accent" />
               </div>
            </div>
            {/* Static Bar Chart */}
            <div className="w-full flex items-end justify-between gap-3 h-32 border-b border-slate/30 pb-2">
               <div className="w-1/5 h-1/4 bg-slate/20 rounded-t-sm"></div>
               <div className="w-1/5 h-2/5 bg-slate/30 rounded-t-sm"></div>
               <div className="w-1/5 h-1/2 bg-slate/40 rounded-t-sm"></div>
               <div className="w-1/5 h-3/4 bg-slate/60 rounded-t-sm"></div>
               <div className="w-1/5 h-full bg-accent relative rounded-t-sm shadow-[0_0_15px_rgba(212,255,0,0.3)]">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-heading font-light text-[10px] text-accent">MAX</div>
               </div>
            </div>
            <div className="flex justify-between w-full mt-2 px-1 text-center">
               <span className="font-data text-[8px] text-ivory/30 w-1/5">M1</span>
               <span className="font-data text-[8px] text-ivory/30 w-1/5">M2</span>
               <span className="font-data text-[8px] text-ivory/30 w-1/5">M3</span>
               <span className="font-data text-[8px] text-ivory/30 w-1/5">M4</span>
               <span className="font-heading font-light text-[8px] text-accent w-1/5">NOW</span>
            </div>
         </div>
      </div>
   );
}
