import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Navbar entrance animation
      // Properly hide it initially without transition conflict
      if (navRef.current) navRef.current.style.transition = 'none';
      
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 3,
        onComplete: () => {
          if (navRef.current) {
            navRef.current.style.transition = '';
            gsap.set(navRef.current, { clearProps: 'all' });
          }
        }
      });

      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'bg-obsidian/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]',
          targets: navRef.current
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 border-b border-slate bg-obsidian/40 backdrop-blur-lg text-ivory flex items-center justify-between px-8 py-4"
    >
      <a href="/" className="font-heading font-bold text-xl tracking-widest cursor-pointer flex items-center relative h-full">
        <img src="/logo.png" alt="Scalova Logo" className="h-16 md:h-20 absolute top-1/2 -translate-y-1/2 left-0 w-auto object-contain drop-shadow-[0_0_1px_rgba(250,248,245,0.7)] origin-left scale-125 md:scale-150" style={{ maxWidth: 'none' }} />
        {/* Invisible spacer to keep flex layout intact */}
        <div className="h-8 w-36 md:w-48 opacity-0 pointer-events-none"></div>
      </a>
      <div className="hidden md:flex gap-20 lg:gap-32 xl:gap-40 font-heading text-sm text-ivory/80 uppercase tracking-widest">
        <a href="#features" className="hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">Korzyści</a>
        <a href="#philosophy" className="hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">Podejście</a>
        <a href="#protocol" className="hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">Metodologia</a>
      </div>
      <button
        className="group relative overflow-hidden rounded-none font-heading font-bold uppercase tracking-wider text-sm px-6 py-2 bg-accent text-obsidian transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-[1px]"
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="absolute inset-0 w-full h-full bg-ivory origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
        <span className="relative z-10 flex items-center gap-2">
          kutas dupa
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </span>
      </button>
    </nav>
  );
}
