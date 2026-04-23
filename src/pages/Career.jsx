import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Bayer 4×4 ordered dithering matrix, normalized to [-1, 1]
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function CareerCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    const DURATION_MS = 2500;  // smooth transition
    const GLOW_FINAL  = 0.50;  // resting intensity

    const BR = 14, BG = 14, BB = 14;   // base #0E0E0E
    const GR = 42, GG = 42, GB = 42;   // glow #2a2a2a (gray)

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = 0; // ellipse_at_top
      const rx = w * 0.35; // keep it subtle
      const ry = h * 0.8;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const dither = BAYER4[(y & 3) * 4 + (x & 3)];
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          const t  = Math.min(Math.sqrt(dx * dx + dy * dy), 1.0);
          const ss = 1 - t * t * (3 - 2 * t); // smoothstep
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
    canvas.width  = w;
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
      canvas.width  = w;
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

const BENEFITS = [
  {
    title: "Pasja",
    desc: "Miłość do tworzenia i ciągłego doskonalenia napędza wszystko, co robimy, nadając każdemu projektowi unikalny charakter. Wchodzimy w stan 'flow'.",
    icon: "/KARIERA/IKONY_PASJA.svg"
  },
  {
    title: "Kreatywność",
    desc: "Innowacje biorą się z otwartego umysłu. Ciekawość i luz inspirują nas do nieszablonowego myślenia z dala od utartych, standardowych ścieżek.",
    icon: "/KARIERA/IKONY_KREATYWNOSC.svg"
  },
  {
    title: "Współpraca",
    desc: "Razem zawsze osiągamy więcej. Różnorodne talenty i wspólne doświadczenia sprawiają, że nieustannie się rozwijamy. Gramy do jednej bramki.",
    icon: "/KARIERA/IKONY_WSPOLPRACA.svg"
  },
  {
    title: "Profesjonalizm",
    desc: "Dążymy do najwyższej jakości w każdym detalu. Rzetelność i terminowość to priorytety, a skupienie i dyscyplina dają nam ogromną satysfakcję.",
    icon: "/KARIERA/IKONY_PROFESJONALIZM.svg"
  },
  {
    title: "Innowacyjność",
    desc: "Sięgamy po najnowsze narzędzia i rozwiązania. Optymalizujemy i automatyzujemy. Wyprzedzanie trendów leży w naszym ścisłym DNA.",
    icon: "/KARIERA/IKONY_INNOWACYJNOSC.svg"
  }
];

const JOBS = [
  {
    id: 1,
    title: "HANDLOWIEC",
    type: "B2B / ZDALNIE",
    desc: "Szukamy bezkompromisowego negocjatora (High-Ticket Closer) do sprzedaży kompleksowych ekosystemów cyfrowych z portfolio agencji. Oczekujemy biznesowego spojrzenia i swobodnego łączenia naszych kluczowych filarów: zaawansowanych stron www, kreacji wizualnych (wideo/statyka) oraz zautomatyzowanych procesów. Twoim celem będzie precyzyjne pozycjonowanie naszej przewagi rynkowej i domykanie inwestycji B2B na poziomie zarządczym. Pracujemy na mocnych, wyselekcjonowanych leadach z własnych kampanii. System prowizyjny bez górnego sufitu."
  },
  {
    id: 2,
    title: "AI ARTIST",
    type: "B2B / ZDALNIE",
    desc: "Poszukujemy kreatywnego architekta wizualnego do tworzenia najwyższej jakości autorskich materiałów komercyjnych dla kampanii naszych klientów. Oczekujemy doskonałego wyczucia estetyki, biegłości w prompt engineeringu i dbałości o spójność opowiadanych historii. Jeśli cenisz sobie profesjonalizm, masz głowę pełną świeżych pomysłów i chcesz tworzyć angażujące projekty, z których wspólnie będziemy dumni – to idealnie trafiłeś. Zapewniamy świetną atmosferę i dużą przestrzeń do rozwoju Twoich talentów."
  }
];

export default function Career() {
  const [activeAccordion, setActiveAccordion] = useState(-1);
  const [applyingJobId, setApplyingJobId] = useState(null);

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center">

      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1200px]">
          <CareerCanvas />
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="careerNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#careerNoise)"/>
        </svg>
      </div>
      
      {/* UNIFIED CAREER SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-24 md:pb-32 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Kariera
        </span>
        
        {/* Kontener wyznaczający szerokość całości kaskadowo z wielkością napisu DOŁĄCZ DO NAS */}
        <div className="inline-flex flex-col items-stretch max-w-[95vw] overflow-hidden sm:max-w-full mx-auto">
          <h1 className="text-ivory text-[36px] sm:text-[48px] md:text-[72px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            DOŁĄCZ DO NAS
          </h1>

          <div className="w-full flex justify-center mt-10 md:mt-14 px-4">
            <p className="font-sans text-base sm:text-lg md:text-xl xl:text-[22px] text-ivory/60 max-w-[900px] leading-[1.6] text-center text-balance block">
              Tworzymy miejsce, w którym digital marketing płynnie łączy się z nowymi technologiami i automatyzacją. Jeśli chcesz realnie wpływać na rozwój firm w internecie, a przy tym pracować w świetnej atmosferze - dobrze trafiłeś. Zobacz, co napędza nas każdego dnia:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mx-auto gap-4 md:gap-8 xl:gap-12 w-full mt-20 md:mt-32 lg:mt-40 pb-8">
            {BENEFITS.map((benefit, idx) => (
               <div
                 key={idx}
                 className="group relative flex flex-col justify-start transition-all duration-500 hover:-translate-y-1 w-full"
               >
                 <div className="absolute top-0 right-0 font-mono text-xs text-ivory/20 group-hover:text-accent/50 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                 </div>

                 <div className="flex flex-col items-start w-full pointer-events-none mt-2 lg:mt-0">
                    <div 
                       className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-ivory/50 group-hover:bg-accent transition-colors duration-500"
                       style={{
                         maskImage: `url('${benefit.icon}')`,
                         maskSize: 'contain',
                         maskPosition: 'left center',
                         maskRepeat: 'no-repeat',
                         WebkitMaskImage: `url('${benefit.icon}')`,
                         WebkitMaskSize: 'contain',
                         WebkitMaskPosition: 'left center',
                         WebkitMaskRepeat: 'no-repeat'
                       }}
                    />
                 </div>
                 
                 <div className="w-full z-10 mt-6 lg:mt-8">
                   <h3 className="text-2xl xl:text-[28px] tracking-tighter uppercase font-heading font-normal text-ivory group-hover:text-accent transition-colors duration-500 mb-4 break-words leading-none">{benefit.title}</h3>
                   <p className="font-sans text-sm xl:text-[15px] leading-relaxed text-ivory/60 transition-colors">
                     {benefit.desc}
                   </p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>


      {/* OFERTY PRACY (ACCORDION) */}
      <section className="relative w-full bg-obsidian py-20 px-4 md:px-8 flex flex-col items-center select-none border-t border-white/5">
        <div className="w-full max-w-[1100px]">
          <div className="mb-16 md:mb-24 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
            <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
              Otwarte Rekrutacje
            </h2>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {JOBS.map((job, index) => {
              const isActive = activeAccordion === index;
              return (
                <div key={index} className="border-b border-white/10">
                  <div
                    onClick={() => {
                      if (isActive) {
                        setActiveAccordion(-1);
                        setApplyingJobId(null);
                      } else {
                        setActiveAccordion(index);
                        setApplyingJobId(null);
                      }
                    }}
                    className={`group flex w-full cursor-pointer items-center justify-between py-6 md:py-8 px-2 md:px-6 transition-colors duration-300 ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                       <span className="font-heading text-accent/60 text-[10px] tracking-[0.2em] uppercase border border-accent/20 px-3 py-1 rounded-sm w-fit">
                         {job.type}
                       </span>
                       <h3 className={`font-heading text-xl md:text-3xl uppercase tracking-widest font-light transition-colors duration-500 mt-2 md:mt-0 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                         {job.title}
                       </h3>
                    </div>

                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center text-lg md:text-xl font-light transition-colors duration-500 ml-4 ${isActive ? 'border-accent text-accent' : 'border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white/80'}`}>
                      {isActive ? '−' : '＋'}
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col md:flex-row gap-6 md:gap-12 px-2 md:px-6 ${isActive ? 'max-h-[800px] opacity-100 pt-6 md:pt-8 pb-8 md:pb-12' : 'max-h-0 opacity-0 pt-0 pb-0'}`}>
                    {applyingJobId === job.id ? (
                      <div className="w-full flex flex-col transition-all duration-500 opacity-100">
                        <form className="w-full flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert('Zgłoszenie wysłane!'); setApplyingJobId(null); }}>
                           <input type="text" placeholder="Imię i Nazwisko" className="w-full bg-transparent border border-white/10 px-4 py-3 text-ivory text-sm focus:border-accent outline-none font-sans" required />
                           <input type="email" placeholder="Adres Email" className="w-full bg-transparent border border-white/10 px-4 py-3 text-ivory text-sm focus:border-accent outline-none font-sans" required />
                           <input type="url" placeholder="Link do CV lub Portfolio (LinkedIn / Dysk)" className="w-full bg-transparent border border-white/10 px-4 py-3 text-ivory text-sm focus:border-accent outline-none font-sans" required />
                           <textarea rows="3" placeholder="Wiadomość (dlaczego Ty?)" className="w-full bg-transparent border border-white/10 px-4 py-3 text-ivory text-sm focus:border-accent outline-none textarea-resize-none font-sans"></textarea>
                           <div className="flex gap-4 items-center mt-2">
                             <button type="submit" className="font-heading font-bold uppercase text-xs tracking-widest px-8 py-4 bg-accent text-obsidian hover:scale-[1.03] transition-all shadow-[0_0_20px_rgba(212,255,0,0.15)] flex-1 sm:flex-none">
                               Wyślij
                             </button>
                             <button type="button" onClick={() => setApplyingJobId(null)} className="font-heading font-bold uppercase text-xs tracking-widest px-8 py-4 border border-white/20 text-ivory/50 hover:text-ivory hover:border-white/40 transition-all flex-1 sm:flex-none text-center">
                               Anuluj
                             </button>
                           </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <p className="font-sans text-ivory/60 text-sm md:text-base leading-relaxed font-light normal-case flex-1">
                          {job.desc}
                        </p>
                        <div className="flex-shrink-0 flex items-start">
                           <button onClick={(e) => { e.stopPropagation(); setApplyingJobId(job.id); }} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-xs px-8 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(212,255,0,0.15)] flex items-center gap-3">
                             <span className="relative z-10 w-full text-center">APLIKUJ TERAZ</span>
                           </button>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / FORMULARZ */}
      <section className="w-full py-32 px-6 flex justify-center bg-[linear-gradient(to_bottom,#0c0c0c_0%,#111_100%)] relative z-10">
         <div className="max-w-[700px] w-full flex flex-col items-center">
             <div className="text-center mb-12">
               <h3 className="text-ivory text-3xl font-heading font-light tracking-widest uppercase mb-4">
                 Nie widzisz swojej roli?
               </h3>
               <p className="font-sans text-ivory/50">
                 Zawsze mamy miejsce dla wybitnych talentów. Zostaw nam swój ślad.
               </p>
             </div>
             
             <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
               <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Imię i Nazwisko</label>
                    <input type="text" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="Jan Kowalski" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Adres Email</label>
                    <input type="email" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="twoj@email.com" />
                  </div>
               </div>
               
               <div className="flex flex-col gap-2 w-full relative mt-2">
                  <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Link do CV lub Portfolio (LinkedIn / Dysk)</label>
                  <input type="url" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="https://..." />
               </div>

               <div className="flex flex-col gap-2 w-full relative mt-2">
                  <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Wiadomość (opcjonalnie)</label>
                  <textarea rows="4" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans resize-none" placeholder="Twoja supermoc to..."></textarea>
               </div>

               <button type="submit" className="group relative overflow-hidden font-heading font-bold uppercase tracking-widest text-sm px-10 py-5 bg-ivory text-obsidian transition-all duration-300 hover:bg-accent hover:shadow-[0_0_40px_rgba(212,255,0,0.2)] mt-6 mx-auto rounded-none hover:-translate-y-1">
                  Zgłoś swoją gotowość
               </button>
             </form>

         </div>
      </section>

    </div>
  );
}
