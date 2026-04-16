import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    }, navRef);
    return () => ctx.revert();
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  }, [location.pathname]);

  const navLinks = [
    { name: "Strona Główna", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Dołącz do nas", path: "/do-lacz-do-nas" }
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 text-ivory flex items-center justify-between px-8 py-3 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Dispersion Blur Layers */}
        <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/10 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/15 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/25 backdrop-blur-[16px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/40 backdrop-blur-[32px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="absolute inset-0 z-[-1] pointer-events-none bg-obsidian/70 backdrop-blur-[80px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

        <Link to="/" className="group/logo font-heading font-bold text-xl tracking-widest cursor-pointer flex items-center relative h-full pointer-events-auto hover:filter-none">
          <img src="/logo.png" alt="Scalova Logo" className="h-16 md:h-20 absolute top-1/2 -translate-y-1/2 left-0 w-auto object-contain origin-left scale-110 md:scale-125" style={{ maxWidth: 'none' }} />
          <div className="h-6 w-36 md:w-56 opacity-0 pointer-events-none"></div>
        </Link>
        
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-8 lg:gap-11 xl:gap-16 font-heading text-sm text-ivory/80 uppercase tracking-widest font-light tracking-tight pointer-events-auto">
          {location.pathname === '/' ? (
            <>
              <a href="#features" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Bariery <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#philosophy" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Podejście <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#services" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Usługi <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#protocol" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Metodologia <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
            </>
          ) : (
             <>
               <Link to="/" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                  Strona Główna <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
               </Link>
             </>
          )}

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
        </div>

        <div className="flex items-center pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-ivory/80 hover:text-accent transition-colors duration-300 p-2 flex items-center justify-center rounded-full hover:bg-white/5"
            aria-label="Toggle menu"
          >
             <div className="relative w-7 h-7 flex items-center justify-center">
                 <Menu className={`absolute inset-0 w-7 h-7 transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                 <X className={`absolute inset-0 w-7 h-7 transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
             </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div 
        className="fixed inset-0 z-[55] bg-obsidian flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
           clipPath: isMenuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)',
           pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <ul className="flex flex-col items-center gap-12 sm:gap-16 relative z-10 w-full mt-12 pb-12">
          {navLinks.map((link, idx) => (
            <li key={idx} className="overflow-hidden">
               <Link 
                 to={link.path}
                 className="group relative flex text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-heading font-light uppercase tracking-tighter text-ivory transition-colors duration-500 will-change-transform inline-block group overflow-hidden"
                 onMouseEnter={(e) => {
                   const textEl = e.currentTarget.querySelector('.menu-text-normal');
                   const hoverEl = e.currentTarget.querySelector('.menu-text-hover');
                   if(textEl) textEl.style.transform = 'translateY(-100%)';
                   if(hoverEl) hoverEl.style.transform = 'translateY(0)';
                 }}
                 onMouseLeave={(e) => {
                   const textEl = e.currentTarget.querySelector('.menu-text-normal');
                   const hoverEl = e.currentTarget.querySelector('.menu-text-hover');
                   if(textEl) textEl.style.transform = 'translateY(0)';
                   if(hoverEl) hoverEl.style.transform = 'translateY(100%)';
                 }}
               >
                 <div className="relative overflow-hidden w-full h-full pb-2">
                   <div className="menu-text-normal transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] w-full text-center">
                     {link.name}
                   </div>
                   <div className="menu-text-hover absolute top-0 left-0 w-full text-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full text-accent" aria-hidden="true">
                     {link.name}
                   </div>
                 </div>
               </Link>
            </li>
          ))}
        </ul>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-ivory/40">
           <div className="flex gap-8">
              <a href="#" className="hover:text-ivory transition-colors">Instagram</a>
              <a href="#" className="hover:text-ivory transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-ivory transition-colors">Facebook</a>
           </div>
           <p className="text-xs uppercase tracking-widest font-heading text-center">Projekt i Realizacja Scalova</p>
        </div>
      </div>
    </>
  );
}
