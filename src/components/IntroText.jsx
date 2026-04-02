import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroText() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        gsap.from('.intro-anim', {
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="w-full bg-obsidian py-24 md:py-32 px-6 flex justify-center border-b border-slate/30 relative overflow-hidden">
      {/* subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,255,0,0.03)_0%,rgba(14,14,14,0)_70%)]"></div>
      
      <div className="max-w-5xl text-center relative z-10 flex flex-col items-center">
        <h2 className="intro-anim font-heading font-light text-sm md:text-base text-accent tracking-[0.2em] uppercase mb-8 border border-accent/30 py-1.5 px-4 rounded-full bg-accent/5">Rozwiązanie</h2>
        <p className="intro-anim font-heading text-3xl md:text-4xl lg:text-5xl text-ivory/90 text-balance leading-tight font-light">
          Zastępujemy chaos operacyjny <span className="font-medium text-ivory underline decoration-accent decoration-2 underline-offset-8">autonomicznymi ekosystemami</span>, gwarantując niezawodność, ciągłość sprzedaży i 10x wyższą przepustowość.
        </p>
      </div>
    </section>
  );
}
