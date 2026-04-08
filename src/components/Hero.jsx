import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Left side texts start shifted to the right and down (towards true center)
      gsap.from('.hero-anim-left', {
        x: '20vw',
        y: '10vh',
        opacity: 0,
        filter: 'blur(10px)', // Reduced from 15px
        duration: 3,
        stagger: 0.1, // Faster stagger
        ease: 'power3.out',
        delay: 2,
        force3D: true
      });
      // Right side text starts shifted to the left and up (towards true center)
      gsap.from('.hero-anim-right', {
        x: '-20vw',
        y: '-10vh',
        opacity: 0,
        filter: 'blur(10px)', // Reduced from 15px
        duration: 3,
        ease: 'power3.out',
        delay: 2.2,
        force3D: true
      });


      // Front logo reacts to scroll (goes diagonally right and up)
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
          scrub: 1, // Smooth scrub for premium fluid feel
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} className="relative w-full h-[100dvh] overflow-hidden flex items-end">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-obsidian pointer-events-none">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ANIM_05_TLO.mp4" type="video/mp4" />
        </video>
        {/* Subtle radial gradient for depth and text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(39,39,42,0.1)_0%,rgba(14,14,14,0.9)_100%)]"></div>
      </div>

      {/* Content - Centered */}
      <div className="relative w-full px-4 sm:px-8 xl:px-16 h-full flex flex-col items-center justify-center pt-10 md:pt-20">
        <div className="w-full max-w-[1920px] flex flex-col items-center">
          <div id="hero-content-wrapper" className="w-full flex flex-col select-none relative z-40">
            <span className="hero-anim-left gpu-accelerated self-start inline-block font-heading font-light text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 opacity-90">
               // AGENCJA SKALOWANIA BIZNESU
            </span>

            <span className="hero-anim-left gpu-accelerated self-start font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory/90 leading-tight">
              Skaluj biznes,
            </span>

            {/* Spacer imitating the previous cube height for layout balance */}
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

      {/* Front Transparent Animation Layer - rendered over texts */}
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
