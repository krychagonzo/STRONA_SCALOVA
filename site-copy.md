# STRONA SCALOVA - KOD ŹRÓDŁOWY / COPY

Należy wykorzystać ten dokument do utrzymania kontekstu dotyczącego treści (copy), sekcji produktowych oraz budowy wizualnej brutalistycznej strony głównej oraz podstron.



## Plik: Hero.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Bayer 4×4 ordered dithering matrix, normalized to [-1, 1]
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    const DELAY_MS    = 2000;  // wait before starting
    const DURATION_MS = 2500;  // slow, smooth transition
    const GLOW_FINAL  = 0.50;  // resting intensity (subtle, not dramatic)

    const BR = 14, BG = 14, BB = 14;   // base #0E0E0E — same as site bg
    const GR = 42, GG = 42, GB = 54;   // glow #2A2A36 — slightly lighter/cooler

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = h;
      const rx = w * 0.80;
      const ry = h * 0.58;

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

    // Start as pure obsidian — identical to rest of page
    let currentGlow = 0;
    drawAt(currentGlow, w, h);

    let rafId = null;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      // ease-in-out sine — slow start, smooth middle, slow end
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawAt(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
      // done — stays at GLOW_FINAL, no more frames
    };

    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, DELAY_MS);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      drawAt(currentGlow, w, h);
    });
    ro.observe(canvas);

    return () => {
      clearTimeout(timer);
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

export default function Hero() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-anim-left', {
        x: '20vw',
        y: '10vh',
        opacity: 0,
        filter: 'blur(10px)',
        duration: 3,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 2,
        force3D: true
      });
      gsap.from('.hero-anim-right', {
        x: '-20vw',
        y: '-10vh',
        opacity: 0,
        filter: 'blur(10px)',
        duration: 3,
        ease: 'power3.out',
        delay: 2.2,
        force3D: true
      });
      gsap.to('.front-logo-wrapper', {
        x: '50vw',
        y: '-50vh',
        scale: 0.8,
        opacity: 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: comp.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative w-full h-[100dvh] overflow-hidden flex items-end">

      {/* Canvas background — Bayer-dithered gradient, zero banding */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="relative w-full px-4 sm:px-8 xl:px-16 h-full flex flex-col items-center justify-center pt-10 md:pt-20">
        <div className="w-full max-w-[1920px] flex flex-col items-center">
          <div id="hero-content-wrapper" className="w-full flex flex-col select-none relative z-40">
            <span className="hero-anim-left gpu-accelerated self-start inline-block font-heading font-light text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 opacity-90">
               // AGENCJA SKALOWANIA BIZNESU
            </span>

            <span className="hero-anim-left gpu-accelerated self-start font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory/90 leading-tight">
              Skaluj biznes,
            </span>

            <div className="h-8 sm:h-12 md:h-20 lg:h-[4rem] xl:h-[6rem] w-full"></div>

            <span className="hero-anim-right gpu-accelerated self-end font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory leading-[0.9] text-right mt-4 md:mt-0">
              odzyskaj czas.
            </span>
            <p className="hero-anim-left gpu-accelerated self-center mt-12 md:mt-16 text-center text-ivory/70 text-sm md:text-base font-sans max-w-xl">
              Przeprowadzamy audyt, usprawniamy firmy od środka, budujemy ich pozycję na zewnątrz.
            </p>
          </div>
        </div>
      </div>

      {/* Front logo animation layer */}
      <div className="front-logo-wrapper gpu-accelerated absolute inset-0 z-30 pointer-events-none">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ANIM_05_LOGO_1.webm" type="video/webm" />
        </video>
      </div>

    </section>
  );
}

```


## Plik: Features.jsx
```jsx
import React, { useState } from 'react';


const problems = [
  {
    icon: "/SEKCJA_BARIERY/IKONY_PRZEPALANY_BUDZET.svg",
    title: "Przepalone budżety",
    desc: "Twoje kampanie działają - ale nikt nie sprawdza czy zarabiają. Co miesiąc dziesiątki tysięcy złotych idą w reklamy, które nie zwracają ani złotówki."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_LEADY.svg",
    title: "Utracone leady",
    desc: "Ktoś się zainteresował, wypełnił formularz, napisał. I zniknął. Nie do konkurencji - Ty go po prostu zgubiłeś. Zła oferta, za wolna odpowiedź, brak follow-upu."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_MARKA.svg",
    title: "Niewidzialność w sieci",
    desc: "Klienci szukają tego co sprzedajesz - i trafiają do konkurencji. Nie dlatego, że są lepsi. Dlatego, że ich widać, a Ciebie nie."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_WYGLAD.svg",
    title: "Słaba pozycja cenowa",
    desc: "Zanim powiesz słowo, klient już ocenił Twoją markę. Amatorskie logo, przestarzała strona, brak spójności - i zaczyna negocjować cenę zamiast kupować."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_RECZNE_PROCESY.svg",
    title: "Ręczne procesy",
    desc: "Twoi ludzie robią ręcznie to, co można zautomatyzować. Kopiują, przeklejają, przypominają, raportują. Płacisz za czas, który nie tworzy żadnej wartości."
  }
];

export default function Features() {
  const [activeStep, setActiveStep] = useState(-1);

  return (
    <section id="features" className="relative w-full bg-obsidian py-20 md:py-28 px-4 md:px-8 flex flex-col items-center select-none z-10">
      <div className="w-full max-w-[1100px]">

        {/* NAGŁÓWEK SEKCJI */}
        <div className="mb-10 md:mb-16 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Bariery
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            PIĘĆ LUK, PRZEZ KTÓRE <span className="text-accent">TRACISZ PRZEWAGĘ.</span>
          </h2>
          <p className="text-ivory/60 mt-6 text-base md:text-lg max-w-2xl mx-auto normal-case tracking-normal leading-relaxed">
            Każda firma osiąga moment, w którym samo dokładanie ludzi i godzin przestaje przynosić efekty. To właśnie wtedy ukryte luki operacyjne i wizerunkowe zaczynają kosztować najwięcej.
          </p>
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/10">
          {problems.map((problem, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* IKONA MASKOWANA */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 md:w-9 md:h-9 transition-colors duration-500 mr-2 md:mr-4 ${isActive ? 'bg-accent' : 'bg-ivory/30 group-hover:bg-accent/60'}`}
                    style={{
                      maskImage: `url('${problem.icon}')`,
                      WebkitMaskImage: `url('${problem.icon}')`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat'
                    }}
                  />

                  {/* TYTUŁ */}
                  <h3 className={`flex-1 text-left font-heading text-2xl lg:text-[28px] tracking-tight uppercase transition-colors duration-500 px-2 md:px-4 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {problem.title}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY OPIS */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-[5.5rem] pr-4 xl:pr-32 pt-6 md:pt-8 pb-10 md:pb-12 text-balance">
                    {problem.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

```


## Plik: Philosophy.jsx
```jsx
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
      <section id="philosophy" ref={sectionRef} className="relative w-full py-12 overflow-hidden bg-obsidian flex flex-col items-center">
         {/* Subtle Background Elements */}


         <div className="relative z-10 w-full max-w-4xl mx-auto px-6">

            <div className="text-center mb-14 flex flex-col items-center">
               <span className="fade-up-element font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
                  Podejście
               </span>
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
                     Gotowe lejki i skrypty sprzedażowe, które 24/7 zamieniają potencjalnych klientów w domknięte transakcje.
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
                  <span className="text-xl md:text-2xl lg:text-[26px] font-heading font-light text-ivory block mt-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                     Strona i wizerunek, które robią pierwsze wrażenie za Ciebie - i sprawiają, że klient przychodzi już przekonany.
                  </span>
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
                     Inteligentne systemy AI i ułożony CRM. Zero powtarzalnych zadań, 100% kontroli nad firmą.
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



```


## Plik: Protocol.jsx
```jsx
import React, { useState } from 'react';

const steps = [
  {
    num: "01",
    title: "Diagnoza systemu.",
    desc: "Analizujemy Twój model biznesowy, procesy sprzedażowe i marketing - i wskazujemy dokładnie gdzie firma traci czas i pieniądze."
  },
  {
    num: "02",
    title: "Plan i strategia.",
    desc: "Prezentujemy konkretny plan działania. Pokazujemy, jak nowa strona, identyfikacja wizualna, celne reklamy i zautomatyzowana sprzedaż zwiększą Twoje przychody."
  },
  {
    num: "03",
    title: "Transfer.",
    desc: "Instalujemy wszystko w Twojej firmie. Technologie, procesy, marketing - uruchamiamy i szkolimy zespół. Wychodzisz z gotowym systemem, który działa od pierwszego dnia."
  }
];

export default function Protocol() {
  const [activeStep, setActiveStep] = useState(-1);

  return (
    <section id="protocol" className="relative w-full bg-obsidian py-20 md:py-28 px-4 md:px-8 flex flex-col items-center select-none z-10">
      <div className="w-full max-w-[1100px]">

        {/* NAGŁÓWEK SEKCJI */}
        <div className="mb-10 md:mb-16 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Metodologia
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            PROCES TRANSFORMACJI
          </h2>
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/10">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* NUMER */}
                  <div className={`flex-shrink-0 font-heading font-light text-4xl md:text-5xl leading-none w-16 md:w-20 transition-colors duration-500 ${isActive ? 'text-accent' : 'text-ivory/20 group-hover:text-accent/50'}`}>
                    {step.num}
                  </div>

                  {/* TYTUŁ */}
                  <h3 className={`flex-1 text-left font-heading text-2xl lg:text-[28px] tracking-tight uppercase transition-colors duration-500 px-2 md:px-4 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {step.title}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY OPIS */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-[5.5rem] pr-4 xl:pr-32 pt-6 md:pt-8 pb-10 md:pb-12 text-balance">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

```


## Plik: Services.jsx
```jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InteractiveDotGrid from './ui/InteractiveDotGrid';
import { Globe, Megaphone, MonitorPlay, Settings, TrendingUp, Cpu, Palette, Phone } from 'lucide-react';

const servicesList = [
  {
    title: "Strona & AI-asystent",
    tag: "Web",
    slug: "/uslugi/strona-ai",
    areaLabel: "INFRASTRUKTURA POZYSKIWANIA LEADÓW",
    desc: "Zamiast strony, która tylko wygląda - platforma, która pozyskuje leady 24/7, nawet gdy śpisz.",
    extendedDesc: "Większość stron firmowych istnieje tylko po to, żeby istnieć.\n\nTwoja będzie pracować - kwalifikować zapytania, zbierać dane kontaktowe i odpowiadać na pytania klientów o 3 w nocy.\n\nProjektujemy platformy, które ładują się w mniej niż 1,5 sekundy i zamieniają ruch w realne leady, zanim Ty zdążysz otworzyć skrzynkę mailową.",
    features: ["Landing page", "Rozbudowana witryna firmowa", "AI-asystent na stronie", "Integracja z CRM i narzędziami", "Optymalizacja wydajności i SEO"],
    metricContent: "Chatbot kwalifikuje zapytania zanim Ty je zobaczysz. Ładowanie <1,5s.",
    icon: "/SEKCJA_USLUGI/IKONA_STRONA_AI.svg"
  },
  {
    title: "Kampanie & Organic",
    tag: "Performance",
    slug: "/uslugi/kampanie",
    areaLabel: "TWÓJ SILNIK WZROSTU",
    desc: "Zamiast budżetu wrzuconego w reklamę - każda złotówka śledzona do konkretnej sprzedaży.",
    extendedDesc: "Większość agencji optymalizuje pod kliknięcia. My optymalizujemy pod pieniądze.\n\nKażda kampania jest śledzona do sprzedaży, nie do zasięgu.\n\nŁączymy płatną dystrybucję z organicznym wzrostem - żeby każda złotówka pracowała na wynik, a nie na wykres, którym można się pochwalić na spotkaniu.",
    features: ["Meta Ads (Facebook & Instagram)", "Google Ads (Search & Display)", "YouTube Ads", "Artykuły sponsorowane i Native Ads", "Content organiczny"],
    metricContent: "Optymalizacja pod ROAS, nie pod kliknięcia. Raporty co tydzień.",
    icon: "/SEKCJA_USLUGI/IKONA_KAMPANIE_ORGANIC.svg"
  },
  {
    title: "Statyczne treści wizualne",
    tag: "Wizerunek",
    slug: "/uslugi/statyczne-tresci",
    areaLabel: "SYSTEM BUDOWANIA AUTORYTETU",
    desc: "Projektujemy unikalny kod wizualny Twojej firmy. Od kompleksowego rebrandingu, przez fotorealistyczne rendery 3D i grafikę AI, aż po sprzedażowe Pitch Decki i infografiki. Tworzymy spójne materiały, które budują autorytet, podnoszą postrzeganą wartość usług i bezpośrednio przyspieszają zamykanie transakcji.",
    extendedDesc: "Algorytmy faworyzują regularność. Klienci faworyzują wiarygodność.\n\nTworzymy statyczne treści wizualne, które robią jedno i drugie jednocześnie - budują Twoją pozycję eksperta i są projektowane pod konkretne formaty dystrybucji.\n\nNie produkujemy contentu dla samego contentu. Każdy materiał ma cel: zaufanie, zasięg albo sprzedaż.",
    features: ["Identyfikacja Wizualna i Rebranding", "Wizualizacje Produktów i Architektury", "Grafika Wspierana przez AI", "Design Sprzedażowy i Materiały", "Infografiki i Wizualizacja Danych"],
    metricContent: "Pozycja eksperta budowana regularnym contentem opartym na danych.",
    icon: "/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg"
  },
  {
    title: "Automatyzacje",
    tag: "Operacje",
    slug: "/uslugi/automatyzacje",
    areaLabel: "TWÓJ BEZOSOBOWY BACK-OFFICE",
    desc: "Zamiast 5 aplikacji, które ze sobą nie gadają - jeden system, który działa bez Twojego udziału.",
    extendedDesc: "Większość firm traci codziennie godziny na ręczne przepisywanie danych między aplikacjami, które nigdy nie były zaprojektowane do współpracy.\n\nAudytujemy Twoje procesy, identyfikujemy punkty tarcia i budujemy system, który łączy CRM, fakturowanie i raportowanie w jeden sprawnie działający przepływ.\n\nBez programistów, bez chaosu, od pierwszego tygodnia.",
    features: ["Automatyzacja procesów operacyjnych", "Konfiguracja i optymalizacja CRM", "Automatyczne fakturowanie", "Automatyzacja komunikacji z klientem", "Zarządzanie zespołem i monitorowanie"],
    metricContent: "Łączymy CRM, faktury, powiadomienia i raporty w jedno.",
    icon: "/SEKCJA_USLUGI/IKONA_AUTOMATYZACJE.svg"
  },
  {
    title: "Sprzedaż & Oferta",
    tag: "Przychody",
    slug: "/uslugi/sprzedaz",
    areaLabel: "PRZEBUDOWA PROCESU ZAMYKANIA",
    desc: "Zamiast ofert, które 'pójdą do akceptacji' - pitch, który zamyka na pierwszym spotkaniu.",
    extendedDesc: "Słaba oferta to nie problem graficzny - to problem struktury argumentacji.\n\nPrzebudowujemy Twój pitch od podstaw: zaczynamy od zrozumienia, dlaczego klienci kupują (albo nie), a kończymy na materiale handlowym i przeszkolonym zespole, który wie jak go używać.\n\nEfekt: wyższy win-rate przy tych samych leadach.",
    features: ["Przebudowa oferty handlowej", "Skrypty i scenariusze rozmów", "Szkolenie zespołu sprzedażowego", "Materiały wspierające sprzedaż", "System mierzenia win-rate"],
    metricContent: "Szkolenie + przebudowa oferty pod wyższy win-rate.",
    icon: "/SEKCJA_USLUGI/IKONA_SPRZEDAZ_OFERTA.svg"
  },
  {
    title: "AI w firmie",
    tag: "Technologia",
    slug: "/uslugi/ai-w-firmie",
    areaLabel: "TWOJA PRZEWAGA TECHNOLOGICZNA",
    desc: "Zamiast 'eksperymentowania z AI' - konkretne narzędzia działające w Twoich procesach od pierwszego tygodnia.",
    extendedDesc: "Dziewięć na dziesięć firm 'eksperymentuje z AI' przez rok i wraca do Excela.\n\nWdrażamy konkretne narzędzia dopasowane do Twoich procesów - od automatyzacji komunikacji z klientami, przez analizę danych, po asystentów dla Twojego zespołu.\n\nBez miesięcy szkoleń, bez przestojów. Twój zespół zaczyna używać AI produktywnie od pierwszego tygodnia.",
    features: ["Audyt gotowości firmy na AI", "Korporacyjna baza wiedzy AI", "Asystenci AI dla zespołu", "Automatyzacja komunikacji z klientami", "Analiza danych i raportowanie AI"],
    metricContent: "Wdrożenie bez chaosu. Twój zespół wie jak używać, nie tylko co to jest.",
    icon: "/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg"
  },
  {
    title: "Ruchome treści wizualne",
    tag: "Marka",
    slug: "/uslugi/ruchome-tresci",
    areaLabel: "TWOJA FABRYKA UWAGI",
    desc: "Ożywiamy biznes, tłumacząc skomplikowane idee językiem płynnego ruchu. Produkujemy fotorealistyczne animacje 3D, wideo szkoleniowe, angażujące formaty na Social Media oraz wirtualną rzeczywistość. Tworzymy dynamikę, która odciąża działy obsługi, zatrzymuje kciuk i zostaje w pamięci klientów na dłużej.",
    extendedDesc: "W świecie krótkiej uwagi wideo jest walutą.\n\nTworzymy ruchome treści wizualne - od reelsów i shortów po animacje produktowe - które zatrzymują kciuk w połowie przewijania i sprawiają, że marka zapada w pamięć, zanim klient zdąży pomyśleć 'skip'.\n\nKażdy materiał zoptymalizowany pod konkretny format i cel dystrybucji.",
    features: ["Animacje 2D i 3D", "Explainer Videos (Filmy instruktażowe)", "Social Media & Montaż Dynamiczny", "Wirtualna Rzeczywistość (VR) i Interakcja", "Motion Design w Interfejsach (UI)"],
    metricContent: "Pełna księga znaku + wytyczne dla każdego touchpointu.",
    icon: "/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg"
  },
  {
    title: "Złoty numer",
    tag: "Rozpoznawalność",
    slug: "/uslugi/zloty-numer",
    areaLabel: "TWOJA LINIA PIERWSZEGO KONTAKTU",
    desc: "Zamiast numeru, który gubi się w historii połączeń — jeden symbol, który klient wpisuje z pamięci.",
    extendedDesc: "Telefon nadal jest najszybszym mostem między klientem a sprzedażą.\n\nZłoty numer to narzędzie sprzedażowe, które klient pamięta bez zapisywania w kontaktach.\n\nPomagamy wybrać, zarejestrować i wdrożyć numer, który wzmacnia rozpoznawalność przy każdym touchpoincie - billboardzie, reklamie, wizytówce.",
    features: ["Spersonalizowany Złoty Numer", "Rejestracja, konfiguracja i przekazanie", "Integracja zaawansowanej centrali", "Wdrożenie we wszystkich kanałach", "System zaawansowanej analityki", "Automatyzacja CRM"],
    metricContent: "Kluczowy punkt styku z marką. Zapada w pamięć, zanim klient zdąży zapisać kontakt.",
    icon: "/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg"
  }
];

const RenderIcon = ({ icon, className, strokeWidth = 1.5 }) => {
  if (typeof icon === 'string') {
    return (
      <div 
        className={`${className} bg-current`} 
        style={{ 
          maskImage: `url(${icon})`, 
          WebkitMaskImage: `url(${icon})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }} 
      />
    );
  }
  
  const IconComponent = icon;
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedService !== null && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [selectedService]);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [-150, -850]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('footer-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="w-full bg-[linear-gradient(to_bottom,#1a1a1a_0%,#0c0c0c_100%)] py-32 px-6 flex justify-center relative overflow-x-hidden"
      style={{ 
        maskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)'
      }}
    >
      {/* Interactive Radial Dot Matrix Background */}
      <div className="absolute inset-0 flex justify-center w-full h-full z-0 opacity-40">
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


      <div className="max-w-[1640px] w-full flex flex-col items-center flex-1 relative z-[2]">

        {/* Header - ukrywa się powoli gdy jesteśmy w detalach */}
        <motion.div
          className="w-full px-6 md:px-12 mb-16 uppercase tracking-widest font-heading flex flex-col items-center text-center"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full relative flex flex-col justify-center items-center min-h-[100px] lg:min-h-[140px] mb-3 lg:mb-4">
            <div className="relative z-30 flex flex-col items-center isolate">
              <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Usługi</span>
              <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
                Co wdrażamy w Twojej firmie.
              </h2>
            </div>
            <motion.img 
              src="/LOGO_3D_2.png" 
              alt="" 
              style={{ y: logoY, rotate: logoRotate }}
              className="absolute -right-20 md:-right-32 lg:-right-48 top-[75%] -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] h-auto z-0 pointer-events-none opacity-20 md:opacity-40 lg:opacity-100 object-contain" 
            />
          </div>
          <p className="text-ivory/60 mt-4 text-base md:text-lg max-w-3xl normal-case tracking-normal text-center mx-auto leading-relaxed relative z-10">
            Nie doradzamy z boku. Instalujemy w Twojej firmie konkretne narzędzia i procesy - od nowoczesnego wizerunku po bezobsługową sprzedaż - które od pierwszego dnia pracują na Twój wynik.
          </p>
        </motion.div>

        {/* Dynamiczny Kontener - Animacja Przejścia */}
        <div ref={containerRef} className="relative w-full flex-1 flex flex-col justify-center items-center">
          <div className="relative w-full">
            
            {/* BAZOWA SIATKA (W TLE) */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-32 auto-rows-max transition-all duration-700 relative z-30 ${selectedService !== null ? "pointer-events-none" : ""}`}>
              {servicesList.map((service, idx) => {
                const isSelected = selectedService === idx;
                const isHidden = selectedService !== null && !isSelected;

                return (
                  <motion.div
                    layoutId={`wrapper-${idx}`}
                    key={`base-card-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isHidden ? 0 : isSelected ? 0 : 1, y: 0 }}
                    transition={{ 
                      duration: isHidden ? 0.2 : 0.4, 
                      delay: isHidden ? idx * 0.04 : 0,
                      layout: { duration: isSelected ? 1.0 : 0, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="group aspect-square w-full rounded-none border border-white/5 bg-[#0c0c0c] p-6 xl:p-8 flex flex-col justify-between hover:bg-accent hover:border-accent hover:-translate-y-2 cursor-pointer transition-all duration-500 overflow-hidden relative"
                    onClick={() => setSelectedService(idx)}
                  >
                    <div className="flex flex-col">
                      <motion.div layoutId={`icon-${idx}`} className="mb-8 text-ivory/50 group-hover:text-obsidian transition-all duration-500">
                        <RenderIcon icon={service.icon} className="w-16 h-16 xl:w-20 xl:h-20" strokeWidth={1.5} />
                      </motion.div>
                      <motion.h3 layoutId={`title-${idx}`} className="text-ivory group-hover:text-obsidian transition-colors duration-500 font-heading font-light tracking-tight text-xl md:text-2xl xl:text-[28px] uppercase leading-tight relative z-10">
                        {service.title}
                      </motion.h3>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto pt-6 border-t border-white/5 group-hover:border-obsidian/10 transition-colors duration-500 relative z-10">
                      <div className="flex items-center gap-3 text-ivory/40 group-hover:text-obsidian transition-all duration-500 transition-transform group-hover:translate-x-1">
                        <span className="font-heading text-[10px] tracking-[0.3em] uppercase">WIĘCEJ</span>
                        <div className="w-8 h-[1px] bg-current"></div>
                      </div>
                      <div className="w-9 h-9 border border-white/10 group-hover:border-obsidian/30 flex items-center justify-center text-lg font-light text-ivory/30 group-hover:text-obsidian transition-all duration-500">
                        ＋
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CLICK OUTSIDE BACKDROP */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setSelectedService(null)}
                />
              )}
            </AnimatePresence>

            {/* OVERLAY: POWIĘKSZONY KAFELEK — Proposal B "Command Center" */}
            <AnimatePresence>
              {selectedService !== null && (
                  <motion.div
                    layoutId={`wrapper-${selectedService}`}
                    className="absolute top-0 left-2 right-2 lg:left-4 lg:right-4 z-50 overflow-hidden"
                    transition={{ layout: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
                    style={{
                      background: "rgba(12, 12, 12, 0.97)",
                      backdropFilter: "blur(32px)",
                      WebkitBackdropFilter: "blur(32px)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.7)",
                    }}
                  >
                  {/* Duża ikona w prawym górnym rogu */}
                  <motion.div 
                    layoutId={`icon-${selectedService}`} 
                    className="absolute top-2 right-4 md:top-4 md:right-8 lg:top-4 lg:right-10 z-30 text-white/[0.07] pointer-events-none"
                  >
                    <RenderIcon icon={servicesList[selectedService].icon} className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 object-contain" strokeWidth={1} />
                  </motion.div>


                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    className="relative z-10 w-full flex flex-col min-h-[620px]"
                  >
                    {/* WSPÓLNY NAGŁÓWEK NA CAŁĄ SZEROKOŚĆ */}
                    <div className="w-full p-8 md:p-12 lg:p-16 pb-10 md:pb-14 lg:pb-16 border-b border-white/5 flex flex-col relative z-20">
                      {/* Numer seryjny + tag */}
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="font-mono text-accent text-[11px] tracking-[0.25em]">
                          {String(selectedService + 1).padStart(2, '0')} / 08
                        </span>
                        <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase border border-white/10 px-2 py-0.5">
                          {servicesList[selectedService].tag}
                        </span>
                      </div>

                      {/* Gigantyczny Tytuł */}
                      <motion.h3
                        layoutId={`title-${selectedService}`}
                        className="text-ivory font-heading font-light tracking-tighter text-3xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] uppercase leading-[0.9] w-full text-left text-balance"
                      >
                        {servicesList[selectedService].title}
                      </motion.h3>
                    </div>

                    <div className="flex flex-col md:flex-row flex-1">
                      {/* LEWA KOLUMNA: CHECKMARKI */}
                      <div className="md:w-[40%] xl:w-[35%] p-8 md:p-12 lg:p-16 flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative z-10">
                        <div className="flex flex-col gap-4 mt-auto">
                          {servicesList[selectedService].features.map((feat, fIdx) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 + (fIdx * 0.1) }}
                              key={fIdx}
                              className="flex items-start gap-4 text-sm font-heading text-ivory/60"
                            >
                              <span className="font-mono text-accent text-[11px] tracking-[0.2em] shrink-0 mt-[3px]">
                                {String(fIdx + 1).padStart(2, '0')}
                              </span>
                              <span className="leading-snug">{feat}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* PRAWA KOLUMNA: OPIS I PRZYCISKI */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.45 } }}
                        className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-end relative z-10"
                      >
                        {/* Dolna część: opis — przyklejone do dołu */}
                        <div className="mb-6 md:mb-8">
                          <p className="font-sans text-ivory/65 text-lg md:text-xl leading-relaxed">
                            {servicesList[selectedService].desc}
                          </p>
                        </div>

                        {/* Przyciski */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-white/5">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedService(null); }}
                            className="group py-4 px-8 bg-white/5 border border-white/10 text-[11px] font-heading font-bold uppercase tracking-widest text-ivory/70 transition-all duration-300 hover:border-ivory/20 hover:bg-white/10 flex items-center justify-center gap-3"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
                            WRÓĆ
                          </button>
                          {servicesList[selectedService].slug ? (
                            <Link
                              to={servicesList[selectedService].slug}
                              onClick={(e) => e.stopPropagation()}
                              className="group relative overflow-hidden py-4 px-10 bg-accent text-obsidian text-[11px] font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 flex-1 text-center flex items-center justify-center gap-3"
                            >
                              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
                              <span className="relative z-10 flex items-center gap-3">
                                DOWIEDZ SIĘ WIĘCEJ
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                              </span>
                            </Link>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); scrollToCTA(); }}
                              className="group relative overflow-hidden py-4 px-10 bg-accent text-obsidian text-[11px] font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 flex-1 text-center"
                            >
                              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
                              <span className="relative z-10">ZAREZERWUJ KONSULTACJĘ</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

```


## Plik: Team.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamShowcase from './ui/team-showcase';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="team"
      ref={sectionRef} 
      className="relative w-full py-16 md:py-20 bg-obsidian overflow-hidden"
    >
      {/* Background elements to match the site's dark aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-20 uppercase tracking-widest font-heading px-6">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Zespół
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            Zespół, dla którego Twój wynik jest jedyną miarą sukcesu.
          </h2>
          <p className="text-ivory/60 mt-4 text-base md:text-lg max-w-2xl normal-case tracking-normal text-center mx-auto leading-relaxed relative z-10">
            W Scalovie uznajemy tylko jedną miarę sukcesu - czy Twoja firma jest dziś lepsza niż wczoraj.
          </p>
        </div>

        {/* The Showcase Component */}
        <div className="w-full relative">
          <TeamShowcase />
        </div>
        
      </div>
    </section>
  );
}

```


## Plik: ScalingDefinition.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import InteractiveDotGrid from './ui/InteractiveDotGrid';

export default function ScalingDefinition() {
  return (
    <section className="relative w-full bg-obsidian flex flex-col justify-center items-center z-10 border-y border-slate/20">
      <div className="w-full bg-obsidian text-ivory py-16 md:py-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Interactive Radial Dot Matrix Wrapper */}
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
        
        <div className="w-full max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium leading-relaxed md:leading-snug text-balance text-ivory/80 pointer-events-auto">
              Skalowanie to inwestycja, która pracuje bez końca. Wdrażasz technologię raz, aby obsługiwać <span className="font-extrabold text-accent tracking-tight drop-shadow-[0_0_15px_rgba(212,255,0,0.5)]">10x więcej klientów</span> bez powiększania zespołu i stałych kosztów.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

```


## Plik: AIwFirmie.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Audyt gotowości firmy na AI", desc: "Analizujemy procesy, dane i narzędzia w Twojej firmie. Identyfikujemy gdzie AI przyniesie realny zwrot z inwestycji, a gdzie byłby tylko kosztem bez efektu. Konkretna mapa wdrożenia z wyceną ROI." },
  { title: "Korporacyjna baza wiedzy AI", desc: "Budujemy dedykowany system AI zasilony kompletną wiedzą o Twojej firmie - strukturą organizacyjną, procesami, usługami, celami biznesowymi i historią decyzji. System działa jako stałe wsparcie strategiczne: identyfikuje priorytety, projektuje ścieżki do celów i diagnozuje bieżące wyzwania z głębokim zrozumieniem Twojego kontekstu. Precyzja niedostępna w żadnym generycznym narzędziu." },
  { title: "Asystenci AI dla zespołu", desc: "Każdy pracownik z własnym asystentem AI dopasowanym do jego roli - marketing, sprzedaż, obsługa klienta. Konfigurujemy, trenujemy i integrujemy z istniejącymi narzędziami zespołu." },
  { title: "Automatyzacja komunikacji z klientami", desc: "AI obsługuje zapytania, kwalifikuje leady i wysyła follow-upy automatycznie. Twój zespół zajmuje się klientami gotowymi do zakupu - reszta działa sama, 24/7." },
  { title: "Analiza danych i raportowanie AI", desc: "AI analizuje dane sprzedażowe, marketingowe i operacyjne w czasie rzeczywistym. Dostajesz wnioski i rekomendacje, nie surowe liczby do ręcznej interpretacji w Excelu." },
  { title: "Szkolenia i warsztaty AI", desc: "Twój zespół rozumie jak używać AI produktywnie w codziennej pracy - nie tylko co to jest. Warsztaty na realnych scenariuszach z Twojej branży, pełna dokumentacja i wsparcie po wdrożeniu." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt gotowości firmy na AI", desc: "Analizujemy procesy, dane i narzędzia. Identyfikujemy gdzie AI przyniesie realny zwrot, a gdzie byłby tylko kosztem i chaosem." },
  { number: "02", title: "Dobór narzędzi pod Twoje procesy", desc: "Nie polecamy tego co modne - polecamy to co działa w Twojej branży i przy Twoich zasobach. Konkretne narzędzia, konkretne przypadki użycia." },
  { number: "03", title: "Automatyzacja komunikacji z klientami", desc: "AI obsługuje zapytania, kwalifikuje leady, wysyła follow-upy. Twój zespół zajmuje się klientami gotowymi do zakupu - reszta działa sama." },
  { number: "04", title: "Asystenci AI dla zespołu", desc: "Każdy pracownik z własnym asystentem AI dopasowanym do jego roli. Marketing, sprzedaż, obsługa - każdy dział pracuje szybciej." },
  { number: "05", title: "Analiza danych i raportowanie", desc: "AI analizuje dane sprzedażowe, marketingowe i operacyjne. Dostajesz wnioski i rekomendacje, nie surowe liczby do ręcznej interpretacji." },
  { number: "06", title: "Szkolenie zespołu i dokumentacja", desc: "Twój zespół rozumie jak używać AI produktywnie - nie tylko co to jest. Pełna dokumentacja, żebyś nie był uzależniony od nas." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Mapujemy procesy i szanse na AI", desc: "Analizujemy każdy dział i proces. Identyfikujemy gdzie AI zaoszczędzi czas, zredukuje błędy lub zwiększy przychód - z realną wyceną ROI." },
  { num: "02", label: "DOBÓR", title: "Wybieramy i konfigurujemy narzędzia", desc: "Dobieramy narzędzia dopasowane do Twoich procesów i budżetu. Konfigurujemy, integrujemy z istniejącymi systemami i testujemy przed wdrożeniem." },
  { num: "03", label: "WDROŻENIE", title: "Wdrażamy i testujemy na realnych danych", desc: "Uruchamiamy narzędzia w Twojej firmie. Każde wdrożenie testowane na realnych scenariuszach - nie na demo danych." },
  { num: "04", label: "ADOPCJA", title: "Szkolimy zespół i mierzymy efekty", desc: "Warsztaty dla każdego działu. Śledzimy metryki adopcji i efektywności - wiesz ile czasu i pieniędzy oszczędza każde wdrożone narzędzie." },
];

const stats = [
  { stat: "9/10", label: "firm 'eksperymentuje z AI' przez rok i wraca do Excela bez żadnego realnego wdrożenia" },
  { stat: "3,4h", label: "dziennie oszczędza pracownik z dobrze skonfigurowanym asystentem AI w swojej roli" },
  { stat: "7 dni", label: "do pierwszego wdrożonego narzędzia AI działającego w Twoich realnych procesach" },
];

const problems = [
  { title: "'Eksperymentujemy z AI' od roku", desc: "ChatGPT do pisania maili i prompt engineering na YouTube. Zero realnego wdrożenia w procesach, zero mierzalnego efektu dla firmy." },
  { title: "Nie wiesz od czego zacząć", desc: "Tysiące narzędzi, setki use-case'ów. Bez kogoś, kto wie co działa w Twojej branży, gubisz się w możliwościach i nie robisz nic." },
  { title: "Zespół boi się AI lub jej nie ufa", desc: "Bez porządnego szkolenia i kontekstu AI to zagrożenie dla stanowisk, nie wsparcie. Adopcja kuleje, narzędzia stoją nieużywane." },
];

export default function AIwFirmie({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">AI w firmie</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              AI, które<br />
            <span className="text-ivory">naprawdę działa</span><br />
            w Twojej firmie.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>
          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Nie eksperymenty, nie warsztaty z buzzwordami. Wdrażamy konkretne narzędzia AI dopasowane do Twoich procesów - od pierwszego tygodnia Twój zespół używa ich produktywnie i widzi efekty.
          </p>
          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Większość firm wie, że AI<br />
              <span className="text-ivory/40">jest przyszłością.</span><br />
              Żadna nie wie jak zacząć.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Realne wdrożenie AI.<br />Nie warsztaty i prezentacje.
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do zespołu<br />produktywnego z AI w tydzień.
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań eksperymentować.<br />
            <span className="text-accent">Zacznij wdrażać.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Zmapujemy Twoje procesy i pokażemy konkretnie, które z nich AI może usprawnić w pierwszym tygodniu.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: Automatyzacje.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Automatyzacja procesów operacyjnych", desc: "Mapujemy każdy powtarzalny proces w firmie i programujemy automatyzacje, które działają w tle - cicho, niezawodnie, bez Twojego udziału. Twój zespół przestaje być maszyną do przepisywania danych i zaczyna robić to, za co naprawdę płacisz." },
  { title: "Konfiguracja i optymalizacja CRM", desc: "CRM ma działać na Ciebie - nie spowalniać Twój zespół. Konfigurujemy go tak, aby wykorzystać pełen potencjał systemu: automatyczne przypisywanie leadów, uzupełnianie danych bez ręcznego wpisywania i widok pipeline'u, który daje realną kontrolę nad sprzedażą." },
  { title: "Automatyczne fakturowanie i księgowość", desc: "Twoja księgowa nie powinna generować faktur ręcznie i przepisywać ich do systemu - powinna zajmować się optymalizacją podatkową. Automatyzujemy wystawianie, wysyłkę i windykację miękką faktur. Wdrażamy systemy OCR, które same odczytują i księgują dokumenty przychodzące." },
  { title: "Zarządzanie zespołem i monitorowanie postępów", desc: "Automatyczne wyznaczanie zadań po zdarzeniach w CRM, alerty o blokadach, tygodniowe raporty generowane bez pytania. Każdy wie co ma robić, Ty widzisz w jednym miejscu co stoi - bez spotkań statusowych i arkuszy Excela." },
  { title: "Automatyzacja komunikacji i follow-upów", desc: "Sekwencje e-mailowe, SMS-owe i follow-upy uruchamiane automatycznie po konkretnych zdarzeniach. Klient dostaje odpowiedź w sekundach - nie w godzinach." },
  { title: "Automatyzacja umawiania rozmów sprzedażowych SMS", desc: "System, który sam wysyła SMS do leadów, odpowiada na pytania i umawia termin rozmowy z handlowcem - bez ingerencji człowieka. Twój pipeline zapełnia się, kiedy Ty śpisz." },
  { title: "Reaktywacja utraconych leadów", desc: "Automatyczne sekwencje, które odświeżają kontakty, które milczą od 30, 60 lub 90 dni. Spersonalizowane wiadomości na podstawie historii - odzyskujesz leady, które uznałeś za martwe." },
  { title: "Automatyczne oferty i wyceny", desc: "Klient wypełnia formularz - otrzymuje profesjonalną ofertę w ciągu minut, bez angażowania handlowca. Budujemy kalkulatory wycen, generatory PDF i ścieżki akceptacji, które skracają cykl sprzedaży i eliminują ręczną robotę z każdego zapytania." },
  { title: "Automatyzacja postów w social media", desc: "Treści generowane i publikowane automatycznie według harmonogramu. Jeden brief raz w miesiącu - reszta dzieje się sama. Stała obecność w mediach bez angażowania zespołu." },
  { title: "Automatyzacja artykułów i pozycjonowania SEO", desc: "System, który generuje artykuły pod określone słowa kluczowe, formatuje je i publikuje na stronie. Twój blog rośnie i przyciąga ruch organiczny - bez redaktora na etacie." },
  { title: "Asystent skrzynki mailowej", desc: "AI czyta przychodzące maile, klasyfikuje je i przygotowuje spersonalizowane projekty odpowiedzi gotowe do wysyłki jednym kliknięciem. Obsługujesz skrzynkę 5x szybciej, bez utraty jakości." },
  { title: "Automatyzacje na żądanie", desc: "Masz niestandardowy proces, który chcesz zautomatyzować? Analizujemy Twój przypadek i budujemy system skrojony dokładnie pod Twój workflow - niezależnie od złożoności i narzędzi, których używasz." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt procesów i mapa tarcia", desc: "Mapujemy każdy powtarzalny proces w firmie. Identyfikujemy gdzie ludzie tracą czas i gdzie popełniają błędy, które kosztują Cię klientów." },
  { number: "02", title: "Projekt przepływów automatyzacji", desc: "Projektujemy logikę każdej automatyzacji zanim zaczniemy budować. Zatwierdzasz projekt - bez niespodzianek na końcu." },
  { number: "03", title: "Integracja CRM z resztą narzędzi", desc: "Łączymy CRM z formularzami, e-mailem, fakturowaniem i raportowaniem. Dane w jednym miejscu, zawsze aktualne." },
  { number: "04", title: "Automatyczne fakturowanie i przypomnienia", desc: "Faktury wystawiane automatycznie, przypomnienia o płatnościach bez Twojego udziału. Zero przeoczonej należności." },
  { number: "05", title: "System powiadomień i raportowania", desc: "Właściwe osoby dostają właściwe informacje we właściwym czasie. Ty widzisz stan firmy w jednym dashboardzie." },
  { number: "06", title: "Dokumentacja i przeszkolenie zespołu", desc: "Każda automatyzacja udokumentowana. Twój zespół wie jak z niej korzystać i co zrobić, gdy coś się zmieni." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Mapujemy każdy powtarzalny proces", desc: "Rozmawiamy z Tobą i Twoim zespołem. Śledzimy gdzie czas i dane uciekają przez ręczne działania, które można zautomatyzować." },
  { num: "02", label: "PROJEKT", title: "Projektujemy przepływy i dobieramy narzędzia", desc: "Wybieramy narzędzia dopasowane do Twoich potrzeb i budżetu. Projektujemy logikę każdego przepływu - zatwierdzasz zanim cokolwiek zostanie zbudowane." },
  { num: "03", label: "WDROŻENIE", title: "Budujemy i testujemy automatyzacje", desc: "Implementujemy, integrujemy i testujemy każdy przepływ na realnych danych. Nic nie idzie produkcyjnie bez Twojej akceptacji." },
  { num: "04", label: "PRZEKAZANIE", title: "Szkolimy zespół i dokumentujemy system", desc: "Twój zespół dostaje szkolenie i dokumentację. System należy do Ciebie - nie jesteś uzależniony od nas, żeby go obsługiwać." },
];

const stats = [
  { stat: "12h", label: "tygodniowo oszczędza średnia firma po wdrożeniu automatyzacji procesów powtarzalnych" },
  { stat: "94%", label: "mniej błędów w danych i procesach po eliminacji ręcznego przepisywania" },
  { stat: "7 dni", label: "do działającego pierwszego automatycznego przepływu w Twojej firmie" },
];

const problems = [
  { title: "Twój zespół robi robotę dla maszyn", desc: "Ręczne przepisywanie danych, wystawianie faktur z szablonu, wysyłanie tych samych maili. Godziny dziennie na zadania, które mogą działać same." },
  { title: "5 aplikacji, 0 synchronizacji", desc: "CRM w jednym miejscu, faktury w drugim, zadania w trzecim. Nikt nie wie, który zapis jest aktualny - i błędy kosztują Cię klientów." },
  { title: "Skalujesz firmę, ale koszty rosną szybciej niż przychody", desc: "Każdy nowy klient to więcej pracy administracyjnej. Bez automatyzacji nie skalujesz przychodu - skalujesz chaos." },
];

export default function Automatyzacje({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      {/* HERO */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Automatyzacje</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Twój back-office.<br />
            <span className="text-ivory">Bez Twojego</span><br />
            udziału.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_AUTOMATYZACJE.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_AUTOMATYZACJE.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>

          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Audytujemy Twoje procesy, identyfikujemy punkty tarcia i budujemy system, który łączy CRM, fakturowanie i raportowanie w jeden sprawnie działający przepływ - bez programistów, bez chaosu, od pierwszego tygodnia.
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Ręczna praca nie skaluje się.<br />
              <span className="text-ivory/40">Twój zespół robi robotę</span><br />
              dla maszyn.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      {/* DELIVERABLES */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Jeden system.<br />Wszystkie procesy pod kontrolą.
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do działającego<br />systemu w czterech krokach.
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Odzyskaj czas.<br />
            <span className="text-accent">Zautomatyzuj resztę.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Zmapujemy Twoje procesy i pokażemy konkretnie, które z nich możesz zautomatyzować w ciągu tygodnia.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: Career.jsx
```jsx
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
    title: "Sales Specialist / Closer",
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

                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center text-lg md:text-xl font-light transition-colors duration-500 ml-4 ${isActive ? 'border-accent text-accent' : 'border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white/80'}`}>
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

```


## Plik: FAQ.jsx
```jsx
import React, { useState, useEffect, useRef } from 'react';

// Bayer 4x4 ordered dithering matrix, normalized to [-1, 1]
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function FAQCanvas() {
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
      const rx = w * 0.75; 
      const ry = 1200; 

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

const FAQS = [
  {
    q: "Jak mogę sprawdzić, czy Wasze zaplecza pasują do mojej branży?",
    a: ""
  },
  {
    q: "Jak wyceniane są Wasze usługi?",
    a: "Nie mamy sztywnych, szablonowych cenników, ponieważ każdy biznes wymaga innej dźwigni. Pracujemy w modelu projektowym (np. wdrożenie konkretnego systemu AI) lub w modelu stałego partnerstwa (retajner). Zarezerwuj bezpłatną, sesję strategiczną – po krótkiej rozmowie będziemy w stanie określić widełki budżetowe adekwatne do poziomu, na który zamierzasz wprowadzić swoją markę."
  },
  {
    q: "Dla jakich firm wasze usługi przynoszą najlepsze efekty?",
    a: "Największą wartość dostarczamy markom, które osiągnęły już rynkowy sukces, ale czują, że ich dalszy rozwój wyhamował. Często spotykamy się z sytuacją, w której firma ma świetny produkt, jednak jej pracownicy tracą zbyt wiele czasu na żmudne, powtarzalne zadania. Właścicielom brakuje przestrzeni na myślenie strategiczne, a koszty prowadzenia działalności rosną szybciej niż same przychody. Rozumiemy te wyzwania. Nasze rozwiązania tworzymy z myślą o firmach, które chcą rozwijać się mądrze – zwiększając skalę swojego biznesu bez konieczności ciągłego zatrudniania nowych osób. Z powodzeniem wspieramy w tym branżę e-commerce, sektor B2B oraz firmy usługowe."
  },
  {
    q: "Czy potrzebuję programistów lub eksperckiej wiedzy w zespole?",
    a: ""
  },
  {
    q: "Czy sztuczna inteligencja nie sprawi, że moja marka straci \"ludzką twarz\"?",
    a: "To jeden z największych mitów. AI nie zastępuje empatii – AI uwalnia czas, byś mógł być bardziej empatyczny dla kluczowych klientów. Maszyny wykonują powtarzalną czarną robotę, analizują dane i personalizują komunikaty w ułamku sekundy, podczas gdy Ty i Twój zespół możecie skupić się na budowaniu prawdziwych, ludzkich relacji tam, gdzie to najbardziej potrzebne."
  },
  {
    q: "Czym tak właściwie jest AI-asystent i jaką może pełnić funkcje na mojej stronie?",
    a: "To zaawansowany duży model językowy (LLM) wytrenowany na procedurach, polityce i cennikach Twojej firmy. To nie jest zwykły bot z prostym drzewem decyzyjnym 'tak/nie'. Utrzymuje on gładką, sprzedażową konwersację z klientem, rozbija drobne obiekcje i zapisuje potencjalne deale prosto w dedykowanym CRM o dowolnej porze."
  },
  {
    q: "Czym jest landing page a czym Witryna firmowa?",
    a: "Landing Page to Twój najlepszy handlowiec. Ma jeden cel: złapać klienta za rękę, opowiedzieć mu o jednym konkretnym produkcie i doprowadzić do zakupu lub zostawienia kontaktu. Nie ma rozpraszaczy, nie ma menu. Prowadzi prosto do kasy.\n\nRozbudowana witryna firmowa (Cyfrowa centrala) to główna siedziba Twojej firmy. To biuro, w którym klient może pospacerować, wejść do działu „O nas”, zajrzeć do gabloty z „Case study”, przeczytać firmowego bloga i poznać całą historię marki. Tu budujesz relację i zaufanie na lata."
  },
  {
    q: "Jakiego rodzaju materiały wizualne tworzycie?",
    a: "Zajmujemy się pełnym spektrum kreacji konwertującej:\n• Wideo sprzedażowe i rolki (Reels/TikTok) zoptymalizowane pod algorytmy.\n• Wysokiej klasy fotografia produktowa i wizerunkowa.\n• Zasoby graficzne do kampanii reklamowych, w których wykorzystujemy również AI do błyskawicznego testowania setek wariantów (A/B testing) dla maksymalnej konwersji."
  },
  {
    q: "Czym jest VR i jak może mi pomóc?",
    a: ""
  },
  {
    q: "Co realnie zyskuję dzięki profesjonalnej identyfikacji wizualnej? Czy to tylko \"ładne logo\"?",
    a: ""
  },
  {
    q: "Jak animacja może wpłynąc na moją firmę?",
    a: ""
  },
  {
    q: "Czy animacja to rozwiązanie tylko do pozyskiwania klientów, czy pomoże mi również zoptymalizować procesy wewnątrz firmy?",
    a: "Traktowanie animacji wyłącznie jako \"ładnego obrazka do reklamy\" to marnowanie jej największego potencjału biznesowego. Jako agencja wdrażająca automatyzacje, patrzymy na motion design i explainer video dwutorowo: to narzędzie, które na zewnątrz generuje przychody, a wewnątrz firmy drastycznie tnie koszty operacyjne.\n\nNasi klienci wykorzystują tworzone przez nas materiały na trzech kluczowych frontach:\n\nNa zewnątrz (Skalowanie Sprzedaży): Jeśli Twój produkt lub usługa są skomplikowane, ściana tekstu natychmiast odstraszy potencjalnego klienta. Animacja w 30-60 sekund przekłada zawiłe procesy na język prostych korzyści. Zatrzymuje uwagę w social mediach, buduje wizerunek marki premium i płynnie wprowadza ruch do Twojego lejka sprzedażowego.\n\nWewnątrz (Automatyzacja Onboardingu i HR): Zamiast odrywać kluczowych managerów od pracy, by po raz setny tłumaczyli nowemu pracownikowi procedury, korzystasz z wewnętrznych wideo instrukcji. Nowy członek zespołu szybciej przyswaja wiedzę, informacje są zawsze zestandaryzowane, a Twoja firma oszczędza setki godzin pracy najdroższych specjalistów.\n\nObsługa Klienta i FAQ (Redukcja Kosztów Wsparcia): Krótkie animacje produktowe i tzw. wideo-instrukcje zdejmują ciężar z Twojego działu obsługi klienta. Kiedy użytkownik ma problem, nasz zautomatyzowany system wysyła mu przystępny explainer, rozwiązując sprawę bez angażowania człowieka."
  }
];

export default function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0">
          <FAQCanvas />
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="faqNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#faqNoise)"/>
        </svg>
      </div>
      
      {/* HEADER SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-12 md:pb-20 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Centrum Wiedzy
        </span>
        
        <div className="inline-flex flex-col items-stretch max-w-[95vw] overflow-hidden sm:max-w-full mx-auto">
          <h1 className="text-ivory text-[50px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] 2xl:text-[220px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            FAQ
          </h1>

          <div className="w-full flex justify-center mt-10 md:mt-14 px-4">
            <p className="font-sans text-base sm:text-lg md:text-xl xl:text-[22px] text-ivory/60 max-w-[900px] leading-[1.6] text-center text-balance block">
              Odpowiedzi na najczęstsze obiekcje biznesowe i techniczne jeszcze przed naszą pierwszą rozmową. Pragniemy maksymalnie skrócić dystans – systemowa wiedza powinna być ułożona całkowicie od ręki.
            </p>
          </div>
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="relative w-full max-w-[1240px] px-4 md:px-8 mt-12 mx-auto z-10">
        <div className="flex flex-col border-t border-white/10">
          {FAQS.map((faq, index) => {
            const isActive = activeAccordion === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveAccordion(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* NUMER OZNACZENIA */}
                  <div className={`flex-shrink-0 font-mono text-sm uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-accent' : 'text-ivory/30 group-hover:text-accent/60'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* TYTUŁ (PYTANIE) */}
                  <h3 className={`flex-1 font-heading text-2xl lg:text-[28px] tracking-tight transition-colors duration-500 px-4 md:px-8 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {faq.q}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY KONTENT OPISU */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-24 pr-4 xl:pr-32 pt-6 md:pt-8 pb-10 md:pb-12 text-balance whitespace-pre-wrap">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

```


## Plik: Home.jsx
```jsx
import React from 'react';
import Hero from '../components/Hero';
import { LogoCloud } from '../components/ui/logo-cloud';
import Features from '../components/Features';
import ScalingDefinition from '../components/ScalingDefinition';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Services from '../components/Services';
import Team from '../components/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <ScalingDefinition />
      <div className="h-10 md:h-16 w-full" />
      <Philosophy />
      <Services />
      <Protocol />
      <Team />
    </>
  );
}

```


## Plik: Kampanie.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Meta Ads (Facebook & Instagram)", desc: "Kampanie w ekosystemie Meta zoptymalizowane pod ROAS, nie pod zasięg. Precyzyjne targetowanie, testowanie kreacji i skalowanie budżetów na tym co faktycznie generuje sprzedaż." },
  { title: "Google Ads (Search & Display)", desc: "Kampanie w wyszukiwarce i sieci reklamowej Google. Łapiemy klientów w momencie, gdy aktywnie szukają Twojego produktu - z pełnym śledzeniem konwersji do sprzedaży." },
  { title: "YouTube Ads", desc: "Kampanie wideo w ekosystemie Google docierające do precyzyjnie określonych grup odbiorców. Format, który buduje markę i generuje konwersje tam, gdzie uwaga klienta jest najwyższa." },
  { title: "Artykuły sponsorowane i Native Ads", desc: "Dzięki sieci partnerów i agencji mamy bezpośredni dostęp do największych portali branżowych i informacyjnych w Polsce. Twoja marka pojawia się tam, gdzie Twoi klienci czytają - nie jako baner, ale jako wartościowy content." },
  { title: "Content organiczny (Social Media)", desc: "Strategia i produkcja contentu budującego zasięg bez płatnej dystrybucji. Każdy post ma cel - sprzedaż, zasięg lub pozycja eksperta. Regularność zaplanowana na miesiące do przodu." },
  { title: "Konfiguracja trackingu konwersji", desc: "Pełne wdrożenie pikseli, API konwersji i śledzenia server-side. Wiesz dokładnie która kampania przyniosła przychód, a która tylko kliknięcia - każda złotówka rozliczona." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt obecnych kampanii i budżetu", desc: "Analizujemy historię wydatków, wyniki i trackingi. Identyfikujemy gdzie budżet się pali, a gdzie jest potencjał do skalowania." },
  { number: "02", title: "Strategia dystrybucji płatnej i organicznej", desc: "Definiujemy kanały, grupy docelowe, budżety i cele ROAS. Płatne i organiczne razem - nie osobno." },
  { number: "03", title: "Pełna konfiguracja śledzenia konwersji", desc: "Każde kliknięcie śledzone do sprzedaży. Wiesz dokładnie, która kampania przyniosła przychód, a która tylko ruch." },
  { number: "04", title: "Kampanie Meta, Google, YouTube lub artykuły sponsorowane", desc: "Stawiamy i prowadzimy kampanie na wybranych platformach oraz negocjujemy placements na czołowych portalach w Polsce. Optymalizacja pod ROAS, nie pod zasięg." },
  { number: "05", title: "Strategia contentu organicznego", desc: "Regularny content budujący zasięg bez płatnej dystrybucji. Każdy post ma cel - sprzedaż, zasięg lub pozycja eksperta." },
  { number: "06", title: "Cotygodniowe raporty z wnioskami", desc: "Nie wykres z kliknięciami - raport z wnioskami i rekomendacjami. Zawsze wiesz co zmieniliśmy i dlaczego." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Analizujemy historię i trackingi", desc: "Zanim wydamy złotówkę, wiemy co działało, co nie i dlaczego. Audyt kampanii, pikseli, ustawień konwersji i struktury konta." },
  { num: "02", label: "STRATEGIA", title: "Definiujemy kanały, grupy i cele ROAS", desc: "Dobieramy platformy do Twojego produktu i klienta. Ustalamy budżety, cele i metryki sukcesu - zanim cokolwiek uruchomimy." },
  { num: "03", label: "URUCHOMIENIE", title: "Stawiamy kampanie i konfigurujemy śledzenie", desc: "Piszemy kreacje, ustawiamy grupy docelowe, podpinamy konwersje. Każdy element zatwierdzony przed startem." },
  { num: "04", label: "OPTYMALIZACJA", title: "Tygodniowe iteracje na podstawie danych", desc: "Co tydzień analizujemy wyniki i wprowadzamy zmiany. Budżet idzie tam, gdzie zarabia - nie tam, gdzie kiedyś działało." },
];

const stats = [
  { stat: "78%", label: "budżetów reklamowych jest marnowane na złe targetowanie i brak śledzenia konwersji" },
  { stat: "4,7x", label: "średni ROAS po optymalizacji kampanii w ciągu pierwszych 90 dni współpracy" },
  { stat: "3 tyg.", label: "do pierwszych mierzalnych wyników i danych potrzebnych do optymalizacji" },
];

const problems = [
  { title: "Budżet się pali, wyników brak", desc: "Wydajesz na reklamy, ale nie wiesz które przynoszą sprzedaż, a które tylko statystyki w panelu. Optymalizujesz w ciemno." },
  { title: "Organiczny zasięg spada", desc: "Algorytmy zmieniają się co kwartał. Bez strategii Twoje posty docierają do coraz mniejszej części odbiorców." },
  { title: "Agencja raportuje kliknięcia", desc: "Piękne slajdy z zasięgami i wyświetleniami. Zero informacji o tym, ile z tego przełożyło się na realną sprzedaż." },
];

export default function Kampanie({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      {/* HERO */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Kampanie & Organic</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Reklamy,<br />
            które <span className="text-ivory">zarabiają.</span><br />
            Nie wyglądają.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_KAMPANIE_ORGANIC.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_KAMPANIE_ORGANIC.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>

          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Każda kampania śledzona do sprzedaży, nie do kliknięć. Łączymy płatną dystrybucję z organicznym wzrostem - żeby każda złotówka pracowała na wynik, a nie na slajd w prezentacji.
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Większość budżetów reklamowych<br />
              <span className="text-ivory/40">finansuje agencji raporty,</span><br />
              nie Twój przychód.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      {/* DELIVERABLES */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Pełny system dystrybucji.<br />Mierzalny od pierwszego dnia.
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do kampanii<br />generującej przychód.
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań zgadywać.<br />
            <span className="text-accent">Zacznij optymalizować pod dane.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twoje obecne kampanie i pokażemy gdzie tracisz budżet i sprzedaż.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: PolitykaPrywatnosci.jsx
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const sections = [
  {
    num: '01',
    title: 'Słowniczek (Definicje)',
    content: `Aby dokument był czytelny, używamy w nim następujących pojęć:

Administrator (My): SCALOVA, z siedzibą przy 11 Listopada 82, Luboń 62-030, NIP: 7831897634.

Usługi: Wszelkie rozwiązania, które Ci oferujemy – od audytów i konsultacji, przez produkty AI i automatyzacje, aż po tworzenie treści wizualnych.

Strona: Nasza witryna internetowa działająca pod adresem www.scalova.pl.

RODO: Główne europejskie prawo chroniące Twoje dane (Rozporządzenie UE 2016/679 z dnia 27 kwietnia 2016 r.).

Użytkownik (Ty): Każda osoba, która odwiedza naszą Stronę, kontaktuje się z nami lub korzysta z naszych Usług.`,
  },
  {
    num: '02',
    title: 'Kto i jak dba o Twoje dane?',
    content: `Jesteśmy Administratorem Twoich danych osobowych. Oznacza to, że to my decydujemy, w jakim celu i w jaki sposób będą one przetwarzane, oraz bierzemy za to pełną odpowiedzialność.

Jeśli masz jakiekolwiek pytania dotyczące swojej prywatności, chcesz zaktualizować dane lub zażądać ich usunięcia, napisz do nas bezpośrednio na: rodo@scalova.pl.

Pamiętaj: jeśli nasza Strona odsyła Cię (linkuje) do zewnętrznych platform (np. Calendly do rezerwacji spotkań, LinkedIn, systemy płatności), te podmioty posiadają własne polityki prywatności, z którymi warto się zapoznać.`,
  },
  {
    num: '03',
    title: 'Jakie dane zbieramy i w jaki sposób?',
    content: `Gromadzimy tylko te informacje, które są nam niezbędne do świadczenia usług na najwyższym poziomie lub do optymalizacji naszych działań marketingowych.

A. Dane, które przekazujesz nam bezpośrednio:
Gdy rezerwujesz sesję strategiczną, wysyłasz maila lub dzwonisz do nas, przekazujesz nam m.in.: imię, nazwisko, adres e-mail, numer telefonu oraz informacje o Twojej firmie. (Rozmowy telefoniczne nie są przez nas nagrywane, chyba że zostaniesz o tym wyraźnie i uprzednio poinformowany).

B. Dane zbierane automatycznie (Technologia i Analityka):
Gdy korzystasz z naszej Strony, nasze systemy automatycznie rejestrują dane techniczne urządzenia i logowania (Twój adres IP, rodzaj przeglądarki, system operacyjny czy strefa czasowa), dane o Twojej aktywności (które podstrony czytasz, ile czasu na nich spędzasz), a także pliki Cookies - używamy ich, aby strona działała poprawnie i abyśmy mogli mierzyć skuteczność naszych kampanii. Szczegóły znajdziesz w naszej Polityce Cookies.

C. Dane z innych źródeł:
Jako agencja B2B, czasami weryfikujemy publicznie dostępne dane o Twojej firmie (np. w CEIDG lub KRS), aby lepiej przygotować się do rozmowy strategicznej i dopasować nasze rozwiązania do skali Twojego biznesu.

Ważne: Nasze usługi kierujemy do przedsiębiorców i profesjonalistów. Świadomie nie zbieramy danych od osób poniżej 16. roku życia.`,
  },
  {
    num: '04',
    title: 'Dlaczego przetwarzamy Twoje dane? (Podstawa prawna)',
    content: `Każde działanie na Twoich danych musi mieć uzasadnienie w prawie. Przetwarzamy Twoje informacje, ponieważ:

— Jest to niezbędne do zawarcia i wykonania umowy (np. gdy rozpoczynamy współpracę, wdrażamy u Ciebie systemy lub świadczymy usługi doradcze).

— Mamy w tym prawnie uzasadniony interes (np. odpowiadanie na Twoje zapytania, badanie analityki ruchu na stronie, dbanie o cyberbezpieczeństwo systemów, czy budowanie społeczności na profilach SCALOVA na LinkedIn, Facebooku czy Instagramie).

— Wymaga tego od nas prawo (np. przepisy podatkowe i księgowe wymuszają na nas przechowywanie faktur).

— Wyraziłeś na to wyraźną zgodę (np. zapisując się na nasz newsletter, pobierając darmowe materiały branżowe lub zgadzając się na ciasteczka marketingowe).`,
  },
  {
    num: '05',
    title: 'Twoje prawa (Co możesz zrobić ze swoimi danymi?)',
    content: `RODO daje Ci pełną kontrolę nad Twoimi danymi. W każdej chwili masz prawo do:

— Dostępu: Zapytania nas, czy i jakie Twoje dane przetwarzamy, oraz otrzymania ich kopii.
— Sprostowania: Poprawienia danych, jeśli są z błędami lub stały się nieaktualne.
— Usunięcia ("Prawo do bycia zapomnianym"): Żądania wykasowania danych, jeśli nie są nam już niezbędne do celów, dla których zostały zebrane.
— Ograniczenia przetwarzania: "Zamrożenia" operacji na Twoich danych w określonych sytuacjach.
— Sprzeciwu: Powiedzenia "stop" przetwarzaniu danych w celach marketingowych lub wynikających z naszych prawnie uzasadnionych interesów.
— Przenoszenia danych: Otrzymania od nas swoich danych w czytelnym formacie cyfrowym.
— Cofnięcia zgody: Jeśli przetwarzamy dane na podstawie Twojej zgody, możesz ją cofnąć w ułamku sekundy.

W celu realizacji swoich praw napisz na: rodo@scalova.pl. Zareagujemy tak szybko, jak to możliwe (maksymalnie w ciągu miesiąca). Masz również prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO), choć zawsze zachęcamy do wcześniejszego kontaktu z nami.`,
  },
  {
    num: '06',
    title: 'Komu udostępniamy Twoje dane?',
    content: `Aby dostarczać Ci usługi premium, współpracujemy z najlepszymi dostawcami technologii. Twoje dane mogą być przekazywane podmiotom, które nam pomagają:

— Dostawcom infrastruktury i oprogramowania: Firmom hostingowym, dostawcom przestrzeni chmurowej (np. Google Workspace, AWS), systemom CRM.
— Partnerom analitycznym i marketingowym: Platformom takim jak Meta (Facebook/Instagram), Google czy LinkedIn, które pomagają nam mierzyć skuteczność reklam i docierać do odpowiednich odbiorców B2B.
— Podmiotom wspierającym nasz biznes: Zaufanym biurom księgowym czy kancelariom prawnym.

Nie sprzedajemy Twoich danych handlarzom baz danych. Dzielimy się nimi tylko w niezbędnym zakresie, chroniąc je odpowiednimi umowami powierzenia.`,
  },
  {
    num: '07',
    title: 'Przekazywanie danych poza Europejski Obszar Gospodarczy (EOG)',
    content: `Z uwagi na to, że korzystamy z systemów wiodących globalnych gigantów technologicznych (np. Google, Meta), Twoje dane mogą trafiać poza EOG (np. do USA).

Dbamy o to, by taki transfer był maksymalnie bezpieczny i opierał się na rygorystycznych mechanizmach prawnych, takich jak Standardowe Klauzule Umowne (SCC) zatwierdzone przez Komisję Europejską, lub ramy Data Privacy Framework, które narzucają firmom z USA unijne standardy prywatności.`,
  },
  {
    num: '08',
    title: 'Jak długo przechowujemy Twoje dane?',
    content: `Nie trzymamy danych w nieskończoność. Przechowujemy je tylko tak długo, jak wymaga tego dany cel:

— Dane umowne i rozliczeniowe: Przez czas trwania współpracy, a następnie przez okres wymagany przez prawo podatkowe (standardowo 5 lat).
— Dane z formularzy i korespondencji: Do czasu zakończenia komunikacji i ewentualnego przedawnienia roszczeń.
— Dane z newslettera/marketingu: Do momentu, w którym cofniesz swoją zgodę lub zgłosisz sprzeciw.
— Pliki cookies: Zgodnie z cyklem życia danego ciasteczka lub do momentu ich wyczyszczenia w Twojej przeglądarce.`,
  },
  {
    num: '09',
    title: 'Bezpieczeństwo (Jak chronimy Twój biznes?)',
    content: `Jako agencja wdrażająca nowoczesne rozwiązania IT i AI, bezpieczeństwo traktujemy priorytetowo. Stosujemy wysokiej klasy certyfikaty SSL, szyfrowanie, restrykcyjne polityki dostępu do haseł (korzystamy z menedżerów haseł i uwierzytelniania dwuskładnikowego 2FA) oraz współpracujemy wyłącznie ze sprawdzonymi dostawcami serwerów.

Nasz zespół ma dostęp do Twoich danych tylko w zakresie niezbędnym do wykonania swojej pracy.`,
  },
  {
    num: '10',
    title: 'Profilowanie i zautomatyzowane podejmowanie decyzji',
    content: `Podobnie jak większość nowoczesnych firm w cyfrowym świecie, korzystamy z analityki i algorytmów (np. systemów reklamowych Google czy Meta), aby badać ruch na Stronie i dopasowywać nasze komunikaty do Twoich zainteresowań biznesowych.

Proces ten opiera się na spseudonimizowanych danych (nie wiemy konkretnie, kim jesteś, widzimy jedynie "ruch"). Te działania pomagają nam wyświetlać Ci trafniejsze reklamy, ale w żaden sposób nie wpływają istotnie na Twoją sytuację prawną, ani nie generują automatycznych decyzji ze skutkiem prawnym.`,
  },
  {
    num: '11',
    title: 'Zmiany w Polityce Prywatności',
    content: `Technologia się zmienia, prawo się zmienia, my rośniemy – dlatego ta Polityka Prywatności również może podlegać aktualizacjom. O istotnych zmianach będziemy informować bezpośrednio lub poprzez wyraźny komunikat na naszej Stronie.

Ostatnia aktualizacja: 01.01.2026`,
  },
];

export default function PolitykaPrywatnosci() {
  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full pt-48 pb-20 px-6 md:px-16 xl:px-32 border-b border-ivory/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30">Polityka Prywatności</span>
          </div>

          <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 block opacity-80">
            DOKUMENT PRAWNY
          </span>
          <h1 className="font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase mb-10">
            Polityka<br />Prywatności
          </h1>

          {/* Lead text */}
          <div className="max-w-3xl border-l-2 border-accent/40 pl-8 mt-10">
            <p className="font-sans text-ivory/60 text-lg leading-relaxed">
              Szacunek do Twojego biznesu zaczyna się od szacunku do Twoich danych. W SCALOVA projektujemy systemy opierające się na danych i automatyzacji, dlatego doskonale wiemy, jak ważna jest ich ochrona.
            </p>
            <p className="font-sans text-ivory/60 text-lg leading-relaxed mt-4">
              Niniejsza Polityka Prywatności to dokument, z którego dowiesz się, jak zbieramy, przetwarzamy i chronimy Twoje dane osobowe. Zależało nam, aby napisać ją możliwie najprostszym językiem – bez zbędnego, prawniczego żargonu, za to z pełną transparentnością.
            </p>
            <p className="font-sans text-ivory/50 text-base leading-relaxed mt-4">
              Prosimy o zapoznanie się z poniższymi zasadami przed rozpoczęciem korzystania z naszych usług i strony internetowej.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="w-full px-6 md:px-16 xl:px-32 py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col">
          {sections.map((section, idx) => (
            <div
              key={section.num}
              className="flex flex-col md:flex-row gap-8 md:gap-16 border-b border-ivory/5 py-14 md:py-16 last:border-b-0"
            >
              {/* Number + Title */}
              <div className="md:w-[340px] flex-shrink-0">
                <span className="font-mono text-accent/50 text-xs tracking-[0.25em] block mb-3">{section.num}</span>
                <h2 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1">
                {section.content.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-ivory/60 text-base md:text-[17px] leading-relaxed mb-5 last:mb-0 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* BOTTOM NAV */}
      <div className="w-full px-6 md:px-16 xl:px-32 py-10 border-t border-ivory/5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
            Powrót do strony głównej
          </Link>
          <p className="font-mono text-[10px] text-ivory/20 tracking-widest uppercase">Ostatnia aktualizacja: 01.01.2026</p>
        </div>
      </div>
    </div>
  );
}

```


## Plik: Portfolio.jsx
```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../data/portfolioData';

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
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                      loading="lazy"
                    />
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

```


## Plik: PortfolioItem.jsx
```jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CATEGORY_ICONS } from './Portfolio';

export default function PortfolioItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PORTFOLIO_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-obsidian flex flex-col items-center justify-center text-ivory">
        <h1 className="text-3xl md:text-5xl font-heading mb-6 uppercase tracking-tighter">Projekt nie znaleziony</h1>
        <button 
          onClick={() => navigate('/portfolio')} 
          className="group relative flex items-center justify-center py-3 px-8 bg-[#0c0c0c] text-ivory border border-white/20 hover:border-accent hover:text-accent transition-all duration-500 font-heading text-xs uppercase tracking-widest overflow-hidden"
        >
          <span className="relative z-10 w-full text-center">Wróć do portfolio</span>
          <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors pointer-events-none" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
        {/* Full-bleed subtle base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1f]/40 via-[#0D0D12]/80 to-[#0D0D12]" />
        
        {/* Main wide subtle glow - ensuring it fully fades well before height ends */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[150vh] min-h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_50%)] mix-blend-screen" />
        
        {/* Additional concentrated horizontal glow from the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] md:w-[160vw] h-[800px] md:h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_50%)] mix-blend-screen" />

        {/* SVG NOISE to completely destroy banding */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="portfolioNoiseItem">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#portfolioNoiseItem)"/>
        </svg>
      </div>

      <section className="w-full max-w-[1400px] pt-32 md:pt-48 pb-12 px-4 md:px-8 relative z-10 flex flex-col items-start">
        <button 
          onClick={() => navigate('/portfolio')}
          className="group flex flex-row items-center gap-3 text-ivory/50 hover:text-accent transition-colors mb-12 md:mb-20 font-heading text-[10px] md:text-xs tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
          Powrót do prac
        </button>

        {/* HEADER SECTION & DYNAMIC LAYOUT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full mb-16 md:mb-24"
        >
          {project.media.length === 1 ? (
            <div className="flex flex-col gap-20 lg:gap-32">
              <div className="w-full">
                <div className="flex flex-row flex-wrap items-center gap-2 mb-4 opacity-90">
                   {project.categories?.map((c, idx) => (
                     <React.Fragment key={c}>
                       {idx > 0 && <span className="font-heading font-light text-ivory/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase">//</span>}
                       <div className="flex flex-row items-center gap-2">
                          {CATEGORY_ICONS[c] && (
                            <div 
                              className="w-3.5 h-3.5 bg-accent" 
                              style={{ WebkitMask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                            />
                          )}
                          <span className="font-heading font-light text-accent text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                            {c}
                          </span>
                       </div>
                     </React.Fragment>
                   ))}
                </div>
                <h1 className="text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </div>
              
              <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                <div className="lg:w-1/2 w-full flex justify-center group relative break-inside-avoid">
                  {project.media[0].type === 'video' ? (
                    <video 
                      src={project.media[0].src} 
                      autoPlay loop muted playsInline 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                    />
                  ) : (
                    <img 
                      src={project.media[0].src} 
                      alt={project.title} 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="lg:w-1/2 flex flex-col">
                  <div className="border-l-2 border-accent/30 pl-6 lg:pl-10 relative">
                    <div className="absolute top-0 -left-[2px] w-[2px] h-8 bg-accent" />
                    {project.fullDesc.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="font-sans text-ivory/70 text-sm md:text-base leading-relaxed mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/2">
                <div className="flex flex-row flex-wrap items-center gap-2 mb-4 opacity-90">
                   {project.categories?.map((c, idx) => (
                     <React.Fragment key={c}>
                       {idx > 0 && <span className="font-heading font-light text-ivory/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase">//</span>}
                       <div className="flex flex-row items-center gap-2">
                          {CATEGORY_ICONS[c] && (
                            <div 
                              className="w-3.5 h-3.5 bg-accent" 
                              style={{ WebkitMask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                            />
                          )}
                          <span className="font-heading font-light text-accent text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                            {c}
                          </span>
                       </div>
                     </React.Fragment>
                   ))}
                </div>
                <h1 className="text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </div>

              <div className="lg:w-1/2 flex flex-col justify-end">
                <div className="border-l-2 border-accent/30 pl-6 lg:pl-10 relative">
                  <div className="absolute top-0 -left-[2px] w-[2px] h-8 bg-accent" />
                  {project.fullDesc.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="font-sans text-ivory/70 text-sm md:text-base leading-relaxed mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* GALLERY - MASONRY (2 COLUMNS) - NO CROPPING */}
        {project.media.length > 1 && (
          <div className="columns-1 md:columns-2 gap-6 md:gap-12 w-full mt-12 space-y-6 md:space-y-12">
            {project.media.map((item, idx) => {
              const isVideo = item.type === 'video';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full break-inside-avoid flex items-center justify-center group"
                >                
                  {isVideo ? (
                    <video 
                      src={item.src} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={`${project.title} - media ${idx + 1}`} 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
}

```


## Plik: Regulamin.jsx
```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const sections = [
  {
    num: '01',
    title: 'Postanowienia ogólne',
    content: `Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób świadczenia usług drogą elektroniczną za pośrednictwem strony internetowej www.scalova.pl (zwanej dalej "Stroną").

Operatorem Strony oraz Usługodawcą jest:
SCALOVA, z siedzibą przy ul. 11 Listopada 82, 62-030 Luboń, NIP: 7831897634 (zwanym dalej "Usługodawcą").

Kontakt z Usługodawcą możliwy jest pod adresem e-mail: contact@scalova.com lub telefonicznie pod numerem 61 830 00 00.

Regulamin jest stale i nieodpłatnie udostępniony na Stronie, w sposób umożliwiający jego pozyskanie, odtwarzanie i utrwalanie jego treści poprzez wydrukowanie lub zapisanie na nośniku.`,
  },
  {
    num: '02',
    title: 'Definicje',
    content: `Użytkownik – pełnoletnia osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która korzysta ze Strony i Usług.

Usługi – usługi świadczone drogą elektroniczną przez Usługodawcę na rzecz Użytkownika. Jako agencja wdrażająca nowoczesne rozwiązania IT i AI, oferujemy m.in. bezpłatne konsultacje wstępne, przesyłanie materiałów marketingowych, a także usługi deweloperskie i audytowe.

Umowa – umowa o świadczenie usług drogą elektroniczną zawarta pomiędzy Użytkownikiem a Usługodawcą.`,
  },
  {
    num: '03',
    title: 'Rodzaj i zakres usług elektronicznych',
    content: `Usługodawca umożliwia za pośrednictwem Strony korzystanie z następujących Usług:
— Przeglądanie treści i informacji, w tym oferty i portfolio agencji SCALOVA.
— Przesyłanie zapytań za pomocą interaktywnych formularzy kontaktowych.
— Umówienie bezpłatnej konsultacji doradczej (np. poprzez rozwiązania typu Calendly).

Korzystanie ze Strony i wymienionych Usług wstępnych jest bezpłatne. Jeśli klient zdecyduje się na odpłatną współpracę wdrożeniową, warunki tej współpracy reguluje odrębna umowa B2B zawarta w formie dokumentowej lub pisemnej.`,
  },
  {
    num: '04',
    title: 'Warunki techniczne i zasady korzystania ze strony',
    content: `Aby prawidłowo korzystać ze Strony, Użytkownik powinien dysponować sprzętem komputerowym (lub urządzeniem mobilnym) z dostępem do Internetu oraz aktualną przeglądarką internetową z włączoną obsługą JavaScript oraz plików cookies.

Zakazane jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, obraźliwym, wprowadzającym w błąd, a także podejmowanie działań, które mogą wywołać zakłócenia lub uszkodzenia systemów informatycznych Usługodawcy.
Usługodawca dokłada wszelkich starań, by zapewnić nieprzerwane działanie Strony, jednakże zastrzega sobie prawo do przerw technicznych wynikających z konieczności aktualizacji czy konserwacji systemów.`,
  },
  {
    num: '05',
    title: 'Zawieranie i rozwiązywanie umów',
    content: `Zawarcie umowy o świadczenie usług drogą elektroniczną w zakresie bezpłatnych funkcji Strony (np. dostęp do treści, wysłanie zapytania) następuje w momencie wyświetlenia Strony lub wysłania formularza.

Użytkownik ma prawo w każdej chwili zakończyć korzystanie ze Strony poprzez opuszczenie jej i zamknięcie okna przeglądarki. W przypadku Usług wymagających podania danych (rezerwacje, formularze kontaktowe), zasady przetwarzania danych określa Polityka Prywatności.`,
  },
  {
    num: '06',
    title: 'Tryb postępowania reklamacyjnego',
    content: `Jeżeli Usługi świadczone przez Stronę funkcjonują nieprawidłowo, Użytkownik ma prawo złożyć reklamację.

Reklamacje można zgłaszać na adres e-mail: contact@scalova.com, z dopiskiem "Reklamacja".
Zgłoszenie powinno zawierać: dane zgłaszającego, krótki opis zaistniałego problemu i okoliczności jego wystąpienia.

Usługodawca rozpatrzy reklamację powiadamiając Użytkownika o swoim stanowisku drogą mailową w terminie nie dłuższym niż 14 dni od jej otrzymania.`,
  },
  {
    num: '07',
    title: 'Własność intelektualna',
    content: `Wszelkie treści umieszczone na Stronie, w tym teksty, grafiki, logo, kod witryny, zdjęcia i animowane komponenty, stanowią przedmiot praw autorskich Usługodawcy (lub podmiotów współpracujących) i podlegają ochronie prawnej.

Kopiowanie, powielanie lub udostępnianie tych materiałów w celach komercyjnych bez pisemnej zgody SCALOVA jest surowo zabronione. Wdrożona szata graficzna w tym m.in. estetyka "Midnight Luxe" i "Organic Tech" to unikalne wytwory chronione prawem.`,
  },
  {
    num: '08',
    title: 'Postanowienia końcowe',
    content: `Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych przyczyn (np. zmiana przepisów prawa, zmiana modelu świadczenia usług). O zmianach Użytkownicy zostaną poinformowani bezpośrednio na Stronie z odpowiednim wyprzedzeniem.

W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają powszechnie obowiązujące przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz Ustawy o świadczeniu usług drogą elektroniczną.
Wszelkie spory będą rozwiązywane w pierwszej kolejności polubownie, a jeśli to się nie powiedzie – przed polarym sądem właściwym ustalonym zgodnie z odpowiednimi przepisami.`,
  },
];

export default function Regulamin() {
  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full pt-48 pb-20 px-6 md:px-16 xl:px-32 border-b border-ivory/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30">Regulamin</span>
          </div>

          <span className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 block opacity-80">
            DOKUMENT PRAWNY
          </span>
          <h1 className="font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase mb-10">
            Regulamin<br />Serwisu
          </h1>

          {/* Lead text */}
          <div className="max-w-3xl border-l-2 border-accent/40 pl-8 mt-10">
            <p className="font-sans text-ivory/60 text-lg leading-relaxed">
              Transparentność i budowanie zaufania to fundamenty naszej agencji. Niniejszy regulamin jasno określa zasady korzystania ze strony www.scalova.pl.
            </p>
            <p className="font-sans text-ivory/60 text-lg leading-relaxed mt-4">
              Został on stworzony tak, by odpowiadał literze prawa, spełniał minimum prawne wynikające z przepisów i w sposób jasny określał relację między Tobą (Użytkownikiem) a powierzonymi Ci treściami.
            </p>
            <p className="font-sans text-ivory/50 text-base leading-relaxed mt-4">
              Dokument jest zgodny z Ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="w-full px-6 md:px-16 xl:px-32 py-20">
        <div className="max-w-[1100px] mx-auto flex flex-col">
          {sections.map((section, idx) => (
            <div
              key={section.num}
              className="flex flex-col md:flex-row gap-8 md:gap-16 border-b border-ivory/5 py-14 md:py-16 last:border-b-0"
            >
              {/* Number + Title */}
              <div className="md:w-[340px] flex-shrink-0">
                <span className="font-mono text-accent/50 text-xs tracking-[0.25em] block mb-3">{section.num}</span>
                <h2 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex-1">
                {section.content.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-ivory/60 text-base md:text-[17px] leading-relaxed mb-5 last:mb-0 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NAV */}
      <div className="w-full px-6 md:px-16 xl:px-32 py-10 border-t border-ivory/5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
            Powrót do strony głównej
          </Link>
          <p className="font-mono text-[10px] text-ivory/20 tracking-widest uppercase">Obowiązuje od: 01.01.2026</p>
        </div>
      </div>
    </div>
  );
}

```


## Plik: RuchomeTresci.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';

const subServices = [
  { title: "Animacje 2D i 3D", desc: "Ożywiamy idee, których nie da się uchwycić tradycyjną kamerą. Od subtelnego ruchu logo, który buduje profesjonalny charakter marki, po fotorealistyczne prezentacje produktów i przekroje techniczne. To idealne rozwiązanie, gdy chcesz pokazać wnętrze mechanizmu lub projekt, który jeszcze nie istnieje." },
  { title: "Explainer Videos (Filmy instruktażowe)", desc: "Dobre wideo wyjaśniające to pomost między Twoją wiedzą a zrozumieniem klienta lub pracownika. Tworzymy krótkie formy, które w prosty, ludzki sposób tłumaczą nawet najbardziej zawiłe procesy - zarówno na zewnątrz, jak i wewnątrz organizacji." },
  { title: "Social Media & Montaż Dynamiczny", desc: "W świecie krótkich form (Reels, TikTok, YouTube Shorts) liczą się pierwsze sekundy. Przygotujemy dla Ciebie materiały, które zatrzymują wzrok podczas szybkiego przewijania ekranu. Dbamy o rytm, napisy i efekty, które budują zasięgi oraz autentyczne zaangażowanie społeczności." },
  { title: "Wirtualna Rzeczywistość (VR) i Interakcja", desc: "Zamiast opowiadać o projekcie, pozwól swoim klientom po prostu w nim być. Tworzymy cyfrowe przestrzenie, które można odwiedzić, zwiedzić i poczuć. To idealne narzędzie dla deweloperów, architektów i wizjonerów, którzy chcą skrócić dystans między pomysłem a decyzją zakupową." },
  { title: "Motion Design w Interfejsach (UI)", desc: "Usprawniamy odbiór Twoich narzędzi cyfrowych. Projektujemy mikrowyraziste animacje dla stron www i aplikacji, które prowadzą użytkownika za rękę. To detal, który sprawia, że proces zakupu lub rejestracji staje się płynny i intuicyjny." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Precyzyjny przekaz, który się nie męczy", desc: "Raz przygotowany film szkoleniowy lub prezentacja produktu będzie zawsze tak samo profesjonalna, niezależnie od tego, czy ogląda go pierwszy, czy setny odbiorca." },
  { number: "02", title: "Autorytet budowany profesjonalizmem", desc: "Wysokiej jakości animacje i montaż stawiają Cię w rzędzie liderów. Klient widzi firmę, która dba o detale i inwestuje w najwyższą jakość komunikacji." },
  { number: "03", title: "Uwolnienie zasobów ludzkich", desc: "Dzięki wideo instruktażowym Twój zespół może zająć się tworzeniem wartości, zamiast ciągłym powtarzaniem procedur. To realna oszczędność pieniędzy i energii." },
  { number: "04", title: "Głębsza relacja z odbiorcą", desc: "Ruch i dźwięk angażują zmysły znacznie silniej niż statyczny obraz. Budujesz emocjonalną więź z klientem, która zamienia zwykłego widza w lojalnego partnera." },
  { number: "05", title: "Zasięgi, które rosną organicznie", desc: "Algorytmy każdej platformy — od Instagram po LinkedIn — premiują wideo ponad wszystkie inne formaty. Jeden dobrze zaprojektowany materiał dociera do nowych odbiorców bez dodatkowego budżetu reklamowego." },
  { number: "06", title: "Jeden materiał, wiele zastosowań", desc: "Animacja lub wideo wyprodukowane raz pracuje jednocześnie na stronie www, w social mediach, prezentacji sprzedażowej i procesie onboardingu. Inwestujesz raz — czerpiesz wielotorowo." },
];

const steps = [
  { num: "01", label: "SCENARIUSZ I CEL", title: "Definiujemy cel i grupę docelową", desc: "Ustalamy dokładnie, co materiał ma osiągnąć i do kogo mówić. To fundament, od którego zależy każda późniejsza decyzja produkcyjna." },
  { num: "02", label: "STORYBOARD", title: "Rozrysowujemy strukturę przed produkcją", desc: "Kluczowe kadry i sekwencje powstają na papierze. Akceptujesz wizję, zanim ruszymy do realizacji — zero niespodzianek w podsumowaniu." },
  { num: "03", label: "PRODUKCJA", title: "Realizacja dopasowana do Twojej marki", desc: "Każdy kadr, kolor i ruch jest celowy. Tworzymy materiał, który brzmi i wygląda jak Twoja marka — nie jak szablon." },
  { num: "04", label: "DŹWIĘK I SZLIF", title: "Warstwa dźwiękowa i finalne detale", desc: "Dobieramy muzykę, lektora i efekty dźwiękowe, które nadają całości kinowy, profesjonalny charakter i wzmacniają przekaz." },
  { num: "05", label: "WDROŻENIE", title: "Gotowe formaty pod każdą platformę", desc: "Dostarczamy pliki zoptymalizowane pod konkretne kanały — od YouTube i Reels po prezentacje sprzedażowe i strony www." },
];


const stats = [
  { stat: "91%", label: "konsumentów chce oglądać więcej materiałów video od marek, które obserwują" },
  { stat: "2s", label: "masz na zatrzymanie kciuka - tyle trwa decyzja o pominięciu lub obejrzeniu materiału" },
  { stat: "6x", label: "więcej konwersji generują landing pages z wideo w porównaniu do stron tylko z tekstem" },
];

const problems = [
  { title: "Tracisz czas na powtarzalne tłumaczenia", desc: "Czujesz, że połowę dnia spędzasz na wyjaśnianiu klientom lub nowym pracownikom tych samych zasad działania. Twoje słowa ulatują, a wideo zostaje i pracuje za Ciebie." },
  { title: "Twoja oferta jest zbyt trudna do opisania tekstem", desc: "Masz innowacyjny produkt lub usługę, której nie da się streścić w dwóch zdaniach. Bez wizualizacji tracisz uwagę tych, którzy nie mają czasu na czytanie długich instrukcji." },
  { title: "Marka wydaje się nieruchoma na tle konkurencji", desc: "W świecie zdominowanym przez wideo, statyczna obecność bywa odbierana jako brak nowoczesności. Brakuje Ci dynamiki, która ożywiłaby Twój przekaz i nadała mu ludzką twarz." },
  { title: "Onboarding paraliżuje pracę zespołu", desc: "Każdy nowy pracownik to godziny pracy Twoich liderów poświęcone na szkolenia. Brakuje Ci standardu, który wprowadzałby ludzi w procesy bez Twojego ciągłego udziału." },
  { title: "Sprzedajesz coś, czego nie można dotknąć", desc: "Usługi, oprogramowanie, projekty B2B - to kategorie, gdzie słowa nie wystarczą. Animacja lub wirtualna prezentacja pozwala klientowi poczuć wartość produktu, zanim podejmie decyzję." },
  { title: "Twoje social media nie generują zaangażowania", desc: "Posty giną w feedzie, zasięgi spadają, komentarzy brak. Statyczne treści nie mają szans w algorytmach nastawionych na wideo. Potrzebujesz dynamiki, która zatrzymuje uwagę i buduje społeczność." },
];

export default function RuchomeTresci({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-65"
          >
            <source src="/SEKCJA_RUCHOME_TRESCI_WIZUALNE/SHOWREEL.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Ruchome treści wizualne</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Obraz, który<br />
              <span className="text-ivory">porusza</span><br />
              i przekonuje.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>
          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Dynamika obrazu pozwala przekazać emocje i dane w sposób, którego żaden tekst nie jest w stanie oddać. Projektujemy ruch, który ma cel — nie ozdobę.
          </p>
          <div className="hero-line flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
            </div>
            <Link to="/portfolio?category=RUCHOME TREŚCI WIZUALNE" className="group sm:ml-auto font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              PORTFOLIO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl mb-6">
              Gdzie Twoja firma traci energię i potencjał?
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Obraz dynamiczny to odpowiedź na konkretne wyzwania, z którymi mierzy się każdy rozwijający się biznes. Pomagamy Ci, gdy czujesz, że:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Realne zyski z dynamiki przekazu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Tworzymy treści, które stają się fundamentem Twojej komunikacji zewnętrznej i wewnętrznej. To coś więcej niż obraz - to sposób na skalowanie jakości i standardów Twojej firmy, który pozwala jej rezonować silniej, przy jednoczesnym odciążeniu zasobów, którymi dysponujesz.
            </p>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Nasza droga do Twojego obrazu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Proces tworzenia ruchomych treści dzielimy na kroki, które gwarantują, że efekt końcowy będzie dokładnie taki, jakiego potrzebuje Twój biznes.
            </p>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Zacznij zatrzymywać uwagę.<br />
            <span className="text-accent">Zamiast ją tracić.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Pokażemy Ci jak wyglądałaby Twoja strategia video i jakie formaty najlepiej pasują do Twojej marki i odbiorców.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: SprzedazOferta.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Przebudowa oferty handlowej", desc: "Przepisujemy Twoją ofertę pod psychologię decyzji zakupowych. Właściwa kolejność argumentów, właściwa cena, obiekcje rozbroione z góry - zanim klient zdąży je wypowiedzieć." },
  { title: "Skrypty i scenariusze rozmów", desc: "Handlowiec wie co powiedzieć na każdym etapie - od pierwszego kontaktu po follow-up po odmowie. Ustrukturyzowany proces zamiast improwizacji opartej na talencie jednostek." },
  { title: "Szkolenie zespołu sprzedażowego", desc: "Warsztaty z realnych scenariuszy, nie teorii sprzedaży. Twój zespół ćwiczy na trudnych klientach zanim zetknie się z nimi na żywo - i wie jak reagować w każdej sytuacji." },
  { title: "Materiały wspierające sprzedaż", desc: "Prezentacja, one-pager, case studies - wszystko zaprojektowane pod zamknięcie, nie pod pokazanie się. Klient dostaje to, czego potrzebuje do podjęcia decyzji." },
  { title: "System mierzenia win-rate", desc: "Wdrażamy metryki, które pokazują gdzie w lejku tracisz klientów. Wiesz co poprawić w kolejnym miesiącu - nie musisz czekać rok na wnioski." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt obecnego procesu sprzedaży", desc: "Analizujemy ścieżkę od leada do zamknięcia. Identyfikujemy gdzie i dlaczego tracisz klientów - zanim zaproponujemy jakiekolwiek zmiany." },
  { number: "02", title: "Przebudowa oferty handlowej", desc: "Przepisujemy Twoją ofertę pod psychologię decyzji zakupowych. Właściwa kolejność argumentów, właściwa cena, właściwe obiekcje z góry rozbroione." },
  { number: "03", title: "Skrypty i scenariusze rozmów", desc: "Handlowiec wie co powiedzieć na każdym etapie - od pierwszego kontaktu po follow-up po odmowie. Ustrukturyzowany proces zamiast improwizacji." },
  { number: "04", title: "Szkolenie zespołu sprzedażowego", desc: "Warsztaty z realnych scenariuszy, nie teorii. Twój zespół ćwiczy na trudnych klientach zanim zetknie się z nimi na żywo." },
  { number: "05", title: "Materiały wspierające sprzedaż", desc: "Prezentacja, one-pager, case studies - wszystko zaprojektowane pod zamknięcie, nie pod pokazanie się. Klient dostaje to, czego potrzebuje do decyzji." },
  { number: "06", title: "System mierzenia win-rate", desc: "Wdrażamy metryki, które pokazują gdzie w lejku tracisz klientów. Wiesz co poprawić w kolejnym miesiącu, nie po roku." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Analizujemy gdzie i dlaczego tracisz sprzedaż", desc: "Przeglądamy historię rozmów, ofert i zamknięć. Identyfikujemy konkretne punkty, w których klienci rezygnują - i dlaczego." },
  { num: "02", label: "STRATEGIA", title: "Projektujemy nowy proces i ofertę", desc: "Budujemy strukturę sprzedaży od nowa: pozycjonowanie, argumentacja, obiekcje, cena. Zatwierdzasz zanim trafi do zespołu." },
  { num: "03", label: "WDROŻENIE", title: "Szkolimy i wdrażamy materiały", desc: "Warsztaty z zespołem, gotowe skrypty i materiały handlowe. Twój dział sprzedaży zaczyna używać nowego procesu z pełnym wsparciem." },
  { num: "04", label: "OPTYMALIZACJA", title: "Mierzymy wyniki i iterujemy", desc: "Śledzimy win-rate, czas zamknięcia i jakość leadów. Co miesiąc wnosimy poprawki na podstawie realnych danych ze sprzedaży." },
];

const stats = [
  { stat: "60%", label: "handlowców nie ma ustrukturyzowanego procesu sprzedaży - improwizuje na każdej rozmowie" },
  { stat: "2,3x", label: "wyższy win-rate osiągają firmy z przebudowaną ofertą i przeszkolonym zespołem" },
  { stat: "30 dni", label: "do pierwszych mierzalnych zmian w wynikach sprzedażowych zespołu" },
];

const problems = [
  { title: "Oferta idzie do 'akceptacji' i ginie", desc: "Klient mówi 'muszę to przemyśleć' i nigdy nie wraca. Oferta nie tworzy poczucia pilności ani oczywistej wartości - czeka na decyzję zamiast ją wywoływać." },
  { title: "Każdy handlowiec sprzedaje inaczej", desc: "Jeden zamyka świetnie, reszta improwizuje. Bez ustrukturyzowanego procesu wyniki zależą od talentu, nie od systemu." },
  { title: "Nie wiesz gdzie tracisz w lejku", desc: "Mało zamknięć, ale nie wiesz czy problem jest w leadach, rozmowach czy ofercie. Optymalizujesz w ciemno i przepalasz czas." },
];

export default function SprzedazOferta({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Sprzedaż & Oferta</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Oferta, która<br />
            zamyka.<br />
            <span className="text-ivory">Na pierwszym spotkaniu.</span>
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_SPRZEDAZ_OFERTA.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_SPRZEDAZ_OFERTA.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>
          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Słaba oferta to nie problem graficzny - to problem struktury argumentacji. Przebudowujemy Twój pitch od podstaw i szkolimy zespół, który wie jak go używać. Efekt: wyższy win-rate przy tych samych leadach.
          </p>
          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Tracisz klientów nie dlatego,<br />
              <span className="text-ivory/40">że masz złą ofertę.</span><br />
              Dlatego, że ją źle prezentujesz.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Kompletny system sprzedaży.<br />Od oferty po zamknięcie.
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do przeszkolonego<br />zespołu z wyższym win-rate.
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań tracić klientów<br />
            <span className="text-accent">na etapie oferty.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twój obecny proces sprzedaży i pokażemy konkretnie, gdzie i dlaczego tracisz zamknięcia.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: StatyczneTresci.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Identyfikacja Wizualna i Rebranding", desc: "Tworzymy unikalny kod genetyczny Twojej firmy. Projektujemy logo, dobieramy typografię i kolorystykę, które tworzą spójny wizerunek lidera. Pomagamy też odświeżyć istniejące marki, aby nadążały za dynamicznie zmieniającym się rynkiem." },
  { title: "Wizualizacje Produktów i Architektury (CGI)", desc: "Tworzymy obrazy, które wyprzedzają rzeczywistość. Perfekcyjne rendery 3D pozwalają sprzedawać produkty, zanim zjadą z linii produkcyjnej, lub prezentować inwestycje budowlane w fazie projektu. To jakość, która eliminuje kosztowne sesje zdjęciowe." },
  { title: "Grafika Wspierana przez AI (Opcja ekonomiczna)", desc: "Wykorzystujemy potencjał sztucznej inteligencji, aby dostarczać unikalne ilustracje i obrazy w krótkim czasie. Rozwiązanie dla marek, które potrzebują wysokiej jakości contentu przy zachowaniu optymalnego budżetu." },
  { title: "Design Sprzedażowy i Materiały Marketingowe", desc: "Wszystko, co wspiera domykanie transakcji. Projektujemy eleganckie katalogi, oferty PDF (Pitch Decks), skuteczne banery reklamowe oraz grafiki do mediów społecznościowych - każdy projekt pod czytelność i skuteczność komunikatu." },
  { title: "Infografiki i Wizualizacja Danych", desc: "Przekładamy liczby na język korzyści. Tworzymy przejrzyste wykresy i schematy procesów, które w przystępny sposób pokazują Twoją skuteczność, wzrosty lub zasady działania usług. Kluczowe narzędzie w budowaniu wizerunku eksperta." },
  { title: "Oznakowanie Przestrzeni i Eventów", desc: "Przenosimy Twoją markę do świata fizycznego. Projektujemy spójne systemy oznakowania biur, stoisk targowych i materiałów konferencyjnych. Twoja marka jest tak samo profesjonalna w sieci, jak i podczas bezpośredniego spotkania z klientem." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Natychmiastowa czytelność marki", desc: "Klient od razu wie, z kim ma do czynienia. Profesjonalny wygląd skraca drogę od zainteresowania do decyzji o współpracy." },
  { number: "02", title: "Wyższa postrzegana wartość usług", desc: "Firmy, które dbają o estetykę, mogą pozwolić sobie na wyższe marże. Jakość wizualna jest dla klienta sygnałem jakości Twojej pracy." },
  { number: "03", title: "Sprawność operacyjna zespołu", desc: "Dzięki wizualizacji procesów wewnętrznych i standardów, Twoi pracownicy popełniają mniej błędów i szybciej adaptują się do nowych zadań." },
  { number: "04", title: "Oszczędność czasu i budżetu", desc: "Dzięki CGI i AI dostarczamy materiały wizualne szybciej i taniej niż w przypadku tradycyjnych metod, zachowując przy tym najwyższą, światową jakość." },
  { number: "05", title: "Spójna marka we wszystkich punktach styku", desc: "Od strony www i social mediów po materiały konferencyjne i oznakowanie przestrzeni. Klient, który spotyka Twoją markę wszędzie, za każdym razem odbiera ten sam sygnał: profesjonalizm i dbałość o detal." },
  { number: "06", title: "Skuteczniejsze zamykanie transakcji", desc: "Dobrze zaprojektowana oferta lub Pitch Deck to cichy sprzedawca, który działa za Ciebie. Klient trzymający profesjonalne materiały w rękach podejmuje decyzję szybciej i z większym zaufaniem." },
];

const steps = [
  { num: "01", label: "ANALIZA I KONTEKST", title: "Rozumiemy, gdzie firma traci energię", desc: "Szukamy miejsc, gdzie obraz może pomóc — czy to w słabej sprzedaży, czy w niejasnych procesach wewnętrznych." },
  { num: "02", label: "PROJEKTOWANIE", title: "Dobieramy formę do celu", desc: "Chcesz sprzedać projekt — tworzymy rendery 3D. Chcesz usprawnić pracę biura — tworzymy schematy i szablony dokumentów." },
  { num: "03", label: "KREACJA", title: "Tworzymy z dbałością o precyzję", desc: "Tworzymy finalne grafiki, dbając o każdy piksel. Łączymy rzemiosło z nowoczesnymi technologiami." },
  { num: "04", label: "IMPLEMENTACJA", title: "Wdrażamy i wspieramy", desc: "Pomagamy wdrożyć nowe materiały w życie firmy. Twój zespół wie jak ich używać, klienci zauważają nową jakość." },
];

const stats = [
  { stat: "7x", label: "więcej zasięgu generuje content z wyraźną pozycją ekspercką w porównaniu do postów 'ogólnych'" },
  { stat: "84%", label: "kupujących sprawdza social media marki przed podjęciem decyzji zakupowej" },
  { stat: "21 dni", label: "do pierwszych widocznych zmian w postrzeganiu marki przez odbiorców" },
];

const problems = [
  { title: "Poczucie bycia jednym z wielu", desc: "Twoja marka nie wyróżnia się na tle konkurencji, przez co klienci kierują się głównie ceną, a nie wartością Twojego brandu." },
  { title: "Brak spójności w komunikacji", desc: "Inaczej wyglądasz w mediach społecznościowych, a inaczej w ofertach wysyłanych do klientów. Ten chaos buduje podwiadomy brak zaufania." },
  { title: "Trudne do zrozumienia materiały wewnętrzne", desc: "Twoi pracownicy gubią się w gąszczu tekstu w instrukcjach i procedurach. Brakuje wizualnego przewodnika, który uprościłby ich codzienną pracę." },
  { title: "Wysokie koszty i długi czas oczekiwania", desc: "Potrzebujesz profesjonalnych zdjęć produktów lub architektury, ale organizacja sesji zdjęciowych trwa tygodniami i pochłania ogromne budżety." },
  { title: "Oferty i pitch decki, które nie zamykają sprzedaży", desc: "Wysyłasz świetną ofertę — i cisza. Materiały bez profesjonalnego projektu giną w skrzynce klienta. Elegancki Pitch Deck to różnica między 'przemyślę' a 'kiedy zaczynamy'." },
  { title: "Twoje liczby imponują, ale nie przekonują", desc: "Masz doskonale wyniki, referencje i wzrosty — ale prezentowane w tabeli lub bloku tekstu nie robią wrażenia. Bez wizualizacji danych klient nie poczuje skali Twojego sukcesu." },
];

export default function StatyczneTresci({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      {/* HERO */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Statyczne treści wizualne</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Twój wizerunek<br />
              <span className="text-ivory">mówi,</span><br />
              zanim Ty zaczniesz.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>

          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Pierwsze wrażenie trwa ułamek sekundy i jest decyzją, której klient nie jest świadomy. Projektujemy identyfikacje, wizualizacje i materiały, które wygrywają ten moment — zawsze.
          </p>

          <div className="hero-line flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
            </div>
            <Link to="/portfolio?category=STATYCZNE TREŚCI WIZUALNE" className="group sm:ml-auto font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              PORTFOLIO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl mb-6">
              Gdzie Twój wizerunek traci pieniądze?
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Warstwa wizualna to pierwsze wrażenie, które klient wyrabia sobie w ciągu sekund. Rozpoznajemy go za każdym razem, gdy firma wygląda gorzej, niż działa:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      {/* DELIVERABLES */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Statyczny design — trwałe aktywa Twojego biznesu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Statyczny design to inwestycja w trwałe aktywa Twojego biznesu. Dzięki niemu zyskujesz:
            </p>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Nasza droga do Twojego wizerunku.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Każdy projekt traktujemy jako proces porządkowania Twojej rzeczywistości biznesowej.
            </p>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Zacznij budować pozycję eksperta.<br />
            <span className="text-accent">Systematycznie.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twoją obecną komunikację i pokażemy co konkretnie zmienić, żeby zaczęła budować autorytet.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: StronaAI.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Landing page", desc: "Jedna strona, jeden cel - konwersja. Projektujemy landing page'e pod konkretną kampanię lub produkt, z precyzyjną ścieżką prowadzącą odwiedzającego prosto do formularza, zakupu lub telefonu. Zero rozpraszaczy." },
  { title: "Rozbudowana witryna firmowa", desc: "Cyfrowa centrala Twojego biznesu. Wielostronicowa platforma z pełną architekturą informacji - oferta, case studies, blog, zespół. Buduje zaufanie i pozycję eksperta na lata." },
  { title: "AI-asystent na stronie", desc: "Zaawansowany chatbot wytrenowany na wiedzy o Twojej firmie. Prowadzi gładką, sprzedażową konwersację z klientem 24/7 - kwalifikuje leady, rozbija obiekcje i zapisuje dane prosto do CRM." },
  { title: "Integracja z CRM i narzędziami", desc: "Leady ze strony trafiają bezpośrednio do Twojego CRM. Automatyczne powiadomienia, follow-upy i segmentacja - bez żadnej ręcznej pracy po Twojej stronie." },
  { title: "Optymalizacja wydajności i SEO", desc: "Czas ładowania poniżej 1,5 sekundy, pełna optymalizacja Core Web Vitals i struktura pod wyszukiwarki. Każde 100ms opóźnienia to -1% konwersji - eliminujemy każde zbędne milisekundy." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  {
    number: "01",
    title: "Platforma webowa pod konwersję",
    desc: "Projekt i kod strony zoptymalizowany pod ścieżkę klienta - od pierwszego kliknięcia do wypełnienia formularza."
  },
  {
    number: "02",
    title: "AI-asystent skrojony pod Twój biznes",
    desc: "Chatbot wytrenowany na wiedzy o Twojej firmie, ofercie i FAQ. Kwalifikuje, odpowiada i zbiera dane 24/7."
  },
  {
    number: "03",
    title: "Czas ładowania poniżej 1,5s",
    desc: "Każde 100ms opóźnienia to -1% konwersji. Optymalizujemy każdy zasób, żeby strona działała szybciej niż oczekiwanie klienta."
  },
  {
    number: "04",
    title: "Integracja z CRM i skrzynką",
    desc: "Leady trafiają bezpośrednio do Twojego CRM, automatyczne powiadomienia i follow-upy bez żadnej ręcznej pracy."
  },
  {
    number: "05",
    title: "Dashboard analityczny",
    desc: "Widzisz skąd przychodzą klienci, które strony konwertują, a które tracą ruch - w czasie rzeczywistym."
  },
  {
    number: "06",
    title: "30 dni wsparcia po wdrożeniu",
    desc: "Monitorujemy wyniki, wprowadzamy poprawki i tuningujemy AI-asystenta na podstawie realnych rozmów z klientami."
  }
];

const steps = [
  {
    num: "01",
    label: "AUDYT",
    title: "Analizujemy gdzie tracisz klientów",
    desc: "Mapujemy obecną stronę, ścieżki użytkowników i punkty porzuceń. Rozumiemy Twoją ofertę i typowego klienta zanim zaczniemy projektować."
  },
  {
    num: "02",
    label: "PROJEKT",
    title: "Wireframes, prototyp, design system",
    desc: "Projektujemy każdy ekran pod konwersję - nie pod estetykę. Zatwierdzasz wygląd przed wdrożeniem, bez niespodzianek."
  },
  {
    num: "03",
    label: "WDROŻENIE",
    title: "Kodujemy, konfigurujemy AI, testujemy",
    desc: "Budujemy platformę i trenujemy AI-asystenta na wiedzy o Twojej firmie. Testujemy na realnych scenariuszach przed startem."
  },
  {
    num: "04",
    label: "OPTYMALIZACJA",
    title: "Dane, testy, tuning",
    desc: "Po starcie analizujemy zachowania użytkowników i iterujemy. Strona z każdym tygodniem konwertuje lepiej - nie gorzej."
  }
];

const painPoints = [
  {
    stat: "53%",
    label: "użytkowników porzuca stronę ładującą się dłużej niż 3 sekundy",
  },
  {
    stat: "79%",
    label: "leadów nigdy nie wraca, jeśli nie dostanie odpowiedzi w ciągu 5 minut",
  },
  {
    stat: "68%",
    label: "odwiedzających wychodzi bez żadnego kontaktu z firmą",
  }
];

export default function StronaAI({ onOpenModal }) {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%'
        }
      });

      gsap.from('.deliverable-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.deliverables-grid',
          start: 'top 75%'
        }
      });

      gsap.from('.step-row', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 75%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,255,0,0.05) 0%, transparent 70%)' }} />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.4) 50%, transparent)' }} />

        <div className="max-w-[1400px] mx-auto w-full">
          {/* Breadcrumb */}
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Strona & AI-asystent</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Twoja strona.<br />
            <span className="text-ivory">Twój najlepszy</span><br />
            handlowiec.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_STRONA_AI.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_STRONA_AI.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>

          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Projektujemy platformy internetowe z wbudowaną inteligencją - które pozyskują leady, kwalifikują zapytania i konwertują ruch na sprzedaż, zanim Ty zdążysz otworzyć skrzynkę mailową.
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenModal}
              className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]"
            >
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a
              href="#jak-dzialamy"
              className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3"
            >
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {painPoints.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Twoja strona prawdopodobnie<br />
              <span className="text-ivory/40">traci klientów teraz,</span><br />
              gdy to czytasz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {[
              { title: "Wolno się ładuje", desc: "Klienci nie czekają. Każda sekunda opóźnienia to utracony potencjalny klient, który już wszedł na stronę konkurencji." },
              { title: "Nikt nie odbiera zapytań", desc: "Formularz kontaktowy i cisza przez 3 dni. Klient dawno podjął decyzję - tyle że bez Ciebie." },
              { title: "Strona istnieje, ale nie sprzedaje", desc: "Ładne zdjęcia, brak ścieżki konwersji. Odwiedzający nie wiedzą co mają zrobić i wychodzą bez kontaktu." },
            ].map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CO ŚWIADCZYMY ─── */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      {/* ─── DELIVERABLES ─── */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Wszystko, czego potrzeba<br />żeby strona zaczęła pracować.
            </h2>
          </div>

          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do działającej<br />platformy w 4 krokach.
            </h2>
          </div>

          <div className="steps-container flex flex-col">
            {steps.map((step, i) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
            {/* Final line */}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>


      {/* ─── STATS BAR ─── */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {painPoints.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Twoja strona prawdopodobnie<br />
              <span className="text-ivory/40">traci klientów teraz,</span><br />
              gdy to czytasz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {[
              { title: "Wolno się ładuje", desc: "Klienci nie czekają. Każda sekunda opóźnienia to utracony potencjalny klient, który już wszedł na stronę konkurencji." },
              { title: "Nikt nie odbiera zapytań", desc: "Formularz kontaktowy i cisza przez 3 dni. Klient dawno podjął decyzję - tyle że bez Ciebie." },
              { title: "Strona istnieje, ale nie sprzedaje", desc: "Ładne zdjęcia, brak ścieżki konwersji. Odwiedzający nie wiedzą co mają zrobić i wychodzą bez kontaktu." },
            ].map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CO ŚWIADCZYMY ─── */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      {/* ─── DELIVERABLES ─── */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Wszystko, czego potrzeba<br />żeby strona zaczęła pracować.
            </h2>
          </div>

          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do działającej<br />platformy w 4 krokach.
            </h2>
          </div>

          <div className="steps-container flex flex-col">
            {steps.map((step, i) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
            {/* Final line */}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>

        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-ivory/40 text-[10px] tracking-[0.25em] uppercase mb-6">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań tracić klientów.<br />
            Zacznij ich zbierać.
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twoją obecną stronę i pokażemy konkretnie, co i jak zmienić.
          </p>
          <button
            onClick={onOpenModal}
            className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]"
          >
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```


## Plik: ZlotyNumer.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  {
    title: "Spersonalizowany Złoty Numer",
    desc: "Zaczynamy od audytu Twojej marki i specyfiki branży. Na tej podstawie dobieramy unikalny wzorzec cyfr, który fonetycznie i wizualnie wkleja się w pamięć Twojego idealnego klienta. To nie jest losowy wybór – to strategiczna decyzja wizerunkowa."
  },
  {
    title: "Rejestracja, konfiguracja i przekazanie",
    desc: "Przejmujemy 100% formalności. Reprezentujemy Cię przed operatorem telekomunikacyjnym, załatwiamy umowy, rejestrację i techniczne przypisanie numeru. Oszczędzasz czas i nerwy – dostajesz od nas numer gotowy do użycia."
  },
  {
    title: "Integracja zaawansowanej centrali (IVR i Routing)",
    desc: "Złoty numer to tylko front, pod spodem budujemy inteligentny silnik. Konfigurujemy profesjonalne zapowiedzi głosowe (IVR), okazjonalne komunikaty oraz precyzyjne przekierowania. Klient dzwoni na jeden prestiżowy numer, a system automatycznie kieruje połączenie na numery komórkowe Twoich handlowców."
  },
  {
    title: "Strategiczne wdrożenie we wszystkich kanałach",
    desc: "Gotowy system wypuszczamy w świat. Planujemy podmianę numeru we wszystkich Twoich punktach styku z klientem: strona www, wizytówka Google, social media, billboardy czy flota samochodowa. Zapewniamy płynne przejście – bez ryzyka utraty choćby jednego dzwoniącego leada podczas zmiany."
  },
  {
    title: "System zaawansowanej analityki połączeń",
    desc: "Oddajemy w Twoje ręce przejrzysty panel danych. Śledzisz czas trwania rozmów, precyzyjną liczbę połączeń przychodzących i wychodzących, obciążenie linii w godzinach szczytu oraz skuteczność poszczególnych handlowców. Masz wreszcie twarde dane do mierzenia ROI z kampanii i optymalizacji sprzedaży."
  },
  {
    number: "+",
    title: "OPCJA ROZSZERZONA: Automatyzacja CRM",
    desc: "Dla firm stawiających na maksymalne skalowanie, oferujemy dodatkową integrację centrali telefonicznej z Twoim systemem CRM. Każde połączenie automatycznie otwiera kartę klienta, przypisuje leada do odpowiedniego handlowca i loguje historię kontaktu. Zero ręcznego przepisywania numerów i pełna kontrola nad procesem sprzedaży."
  },
];


gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Maksymalizacja konwersji z reklam", desc: "Twój marketing wreszcie zacznie w pełni zarabiać. Klienci natychmiast zapamiętują Złoty Numer z billboardu, radia czy samochodu firmowego, co drastycznie zwiększa liczbę dzwoniących. Eliminujesz u klienta barierę 'nie mam jak zapisać'." },
  { number: "02", title: "Pewność, że każdy klient zostanie obsłużony", desc: "Dzięki inteligentnym przekierowaniom żaden telefon nie pozostanie bez odpowiedzi. Jeśli jedna linia jest zajęta, system automatycznie łączy dzwoniącego z kolejnym wolnym doradcą. Zapewniasz płynną komunikację bez 'głuchych telefonów' czy uciążliwych sygnałów zajętości." },
  { number: "03", title: "Wizerunek lidera w branży", desc: "Prestiżowy ciąg cyfr i profesjonalne zapowiedzi na infolinii (IVR) budują autorytet od pierwszej sekundy. Klient, słysząc spersonalizowane powitanie, podświadomie czuje, że dzwoni do dużej, stabilnej i godnej zaufania firmy." },
  { number: "04", title: "Kontrola nad budżetem", desc: "Dzięki analityce połączeń wiesz dokładnie, skąd dzwonią klienci. Przestajesz przepalać pieniądze na nietrafione kampanie. Widzisz czarno na białym, które reklamy generują prawdziwe rozmowy sprzedażowe." },
  { number: "05", title: "Pełna delegacja i oszczędność czasu", desc: "Otrzymujesz gotowy do działania ekosystem bez angażowania własnych zasobów. Przejmujemy na siebie kontakt z operatorami, wszelkie formalności oraz kompleksową konfigurację techniczną. Twój zespół może skupić się na strategicznych celach biznesowych, podczas gdy my dbamy o każdy detal wdrożenia." },
  { number: "06", title: "Skalowalność i porządek w zespole", desc: "Twój system telefoniczny rośnie razem z firmą. Dodanie nowego pracownika do kolejki to kwestia chwili. A dzięki wsparciu automatyzacji (jak integracja z CRM), zyskujesz pełną historię kontaktów i odciążasz zespół z ręcznego wklepywania numerów." },
];

const steps = [
  { num: "01", label: "ANALIZA / KONCEPCJA", title: "Audyt i strategia doboru numeru", desc: "Analizujemy Twoją branżę, specyfikę grupy docelowej oraz cele wizerunkowe. Na tej podstawie dobieramy unikalny wzorzec cyfr, który idealnie rezonuje z wizerunkiem Twojej marki i maksymalizuje łatwość zapamiętania." },
  { num: "02", label: "ADMINISTRACJA / TECHNOLOGIA", title: "Kompleksowa realizacja i wdrożenie systemu", desc: "Przejmujemy całkowitą odpowiedzialność za formalności administracyjne i kontakt z operatorami. Jednocześnie realizujemy pełną konfigurację techniczną centrali (zapowiedzi IVR, inteligentny routing) oraz planowe wdrożenie numeru we wszystkich kanałach reklamowych i wizerunkowych, gwarantując ciągłość komunikacji." },
  { num: "03", label: "SUKCES / WZROST", title: "Monitoring, analiza i optymalizacja wyników", desc: "Monitorujemy każdy aspekt ruchu telefonicznego w Twojej firmie. Dostarczamy precyzyjne dane o skuteczności kampanii, obciążeniu linii i efektywności zespołu. Masz w ręku twarde argumenty, by świadomie optymalizować koszty i procesy sprzedażowe." },
];

const stats = [
  { stat: "67%", label: "klientów woli zadzwonić niż wypełnić formularz - telefon to najkrótszy most do sprzedaży" },
  { stat: "3,2x", label: "wyższy wskaźnik zapamiętywania mają złote numery w porównaniu do standardowych" },
  { stat: "3 sek", label: "potrzebuje klient na zapamiętanie dobrze dobranego złotego numeru bez zapisywania" },
];

const problems = [
  { title: "Twój numer zaczyna się od 517 jak tysiące innych", desc: "Klient słyszy numer raz i natychmiast go zapomina. Musi wracać na stronę, szukać wizytówki, wpisywać w wyszukiwarkę - i po drodze trafia do konkurencji." },
  { title: "Tracisz połączenia, bo nikt nie pamięta numeru", desc: "Billboard, reklama radiowa, wideo - klient chce zadzwonić, ale nie ma gdzie zapisać. Złoty numer eliminuje tę barierę całkowicie." },
  { title: "Numer nie wzmacnia marki", desc: "Dobry numer to element tożsamości - tak jak logo. Przypadkowy ciąg cyfr mówi klientowi: ta firma nie myśli o detalach." },
];

export default function ZlotyNumer({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Złoty numer</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Numer, który klient<br />
            pamięta<br />
            <span className="text-ivory">bez zapisywania.</span>
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>
          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Telefon nadal jest najszybszym mostem między klientem a sprzedażą. Złoty numer to narzędzie sprzedażowe, które wzmacnia rozpoznawalność marki w każdym punkcie styku - billboardzie, reklamie, wizytówce.
          </p>
          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Klient chce zadzwonić.<br />
              <span className="text-ivory/40">Ale nie pamięta numeru.</span><br />
              Więc dzwoni do konkurencji.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę uruchamiamy w sprawdzonym, chronologicznym procesie. Razem tworzą szczelny system sprzedażowy."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Nie sprzedajemy cyfr.<br />
              <span className="text-accent">Wdrażamy system, który zwiększa sprzedaż.</span>
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od strategicznego wyboru<br />
              <span className="text-accent/60">do pełnego wdrożenia.</span>
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Daj klientom powód,<br />
            <span className="text-accent">żeby zadzwonili.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Pokażemy Ci jakie numery są dostępne w Twojej branży i jak wdrożyć złoty numer bez przerwy w działaniu firmy.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}

```
