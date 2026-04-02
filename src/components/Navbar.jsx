import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

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

      // Removed ScrollTrigger for background toggle as requested.
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 text-ivory flex items-center justify-between px-8 py-6 pointer-events-none"
    >
      {/* Dispersion Blur Layers (Stacked for progressive depth) */}
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/10 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/15 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/25 backdrop-blur-[16px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/40 backdrop-blur-[32px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/70 backdrop-blur-[80px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

      <a href="/" className="group/logo font-heading font-bold text-xl tracking-widest cursor-pointer flex items-center relative h-full pointer-events-auto hover:filter-none">
        <img src="/logo.png" alt="Scalova Logo" className="h-24 md:h-28 absolute top-1/2 -translate-y-1/2 left-0 w-auto object-contain origin-left scale-150 md:scale-[1.75]" style={{ maxWidth: 'none' }} />
        {/* Invisible spacer to keep flex layout intact */}
        <div className="h-8 w-48 md:w-72 opacity-0 pointer-events-none"></div>
      </a>
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-32 lg:gap-48 xl:gap-64 font-heading text-base text-ivory/80 uppercase tracking-widest font-light tracking-tight pointer-events-auto">
        <a href="#features" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
          Korzyści
          <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
        </a>
        <a href="#philosophy" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
          Podejście
          <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
        </a>
        <a href="#protocol" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
          Metodologia
          <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
        </a>

        {/* Subtle Gradient Line Below Links */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
      </div>

      <div className="flex items-center gap-6 pointer-events-auto">
        <a href="#" className="text-ivory/60 hover:text-accent transition-all duration-300 transform hover:-translate-y-[1px]">
          <Instagram size={20} strokeWidth={1.5} />
        </a>
        <a href="#" className="text-ivory/60 hover:text-accent transition-all duration-300 transform hover:-translate-y-[1px]">
          <Facebook size={20} strokeWidth={1.5} />
        </a>
        <a href="#" className="text-ivory/60 hover:text-accent transition-all duration-300 transform hover:-translate-y-[1px]">
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
      </div>
    </nav>
  );
}
