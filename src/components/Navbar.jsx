import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Navbar() {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;
    
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: target,
        offsetY: targetId === '#services' ? -80 : 30
      },
      ease: "power3.inOut"
    });
  };

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
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  }, [location.pathname]);

  // Force show when service overlay opens on mobile
  useEffect(() => {
    const show = () => setIsVisible(true);
    window.addEventListener('force-navbar-show', show);
    return () => window.removeEventListener('force-navbar-show', show);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;
      
      if (Math.abs(scrollDiff) > 5) {
        if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
          setIsVisible(prev => prev ? prev : true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(prev => !prev ? prev : false);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Strona Główna", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "FAQ", path: "/faq" },
    { name: "Dołącz do nas", path: "/do-lacz-do-nas" }
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[60] w-full text-ivory flex items-center justify-between px-5 md:px-8 pb-1.5 md:pb-3 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} ${isVisible ? 'translate-y-0' : '-translate-y-40'}`}
        style={{ transform: 'translateZ(0)', willChange: 'transform', paddingTop: 'calc(env(safe-area-inset-top) + 0.375rem)' }}
      >
        {/* Mobile: single solid bg with blur, stretched upwards to prevent top gaps */}
        <div className="md:hidden absolute -top-16 bottom-0 left-0 right-0 z-[-1] pointer-events-none bg-[#0c0c0c]/95 backdrop-blur-md border-b border-white/5" />
        {/* Desktop: dispersion blur layers */}
        <div className="hidden md:block absolute inset-0 z-[-1] pointer-events-none bg-obsidian/10 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="hidden md:block absolute inset-0 z-[-1] pointer-events-none bg-obsidian/15 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="hidden md:block absolute inset-0 z-[-1] pointer-events-none bg-obsidian/25 backdrop-blur-[16px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="hidden md:block absolute inset-0 z-[-1] pointer-events-none bg-obsidian/40 backdrop-blur-[32px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="hidden md:block absolute inset-0 z-[-1] pointer-events-none bg-obsidian/70 backdrop-blur-[80px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

        <Link to="/" className="group/logo font-heading font-bold text-xl tracking-widest cursor-pointer flex items-center relative h-full pointer-events-auto hover:filter-none">
          <img src="/logo.png" alt="Scalova Logo" className="h-16 md:h-20 absolute top-1/2 -translate-y-1/2 left-0 w-auto object-contain origin-left scale-110 md:scale-125" style={{ maxWidth: 'none' }} />
          <div className="h-6 w-36 md:w-56 opacity-0 pointer-events-none"></div>
        </Link>
        
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-8 lg:gap-11 xl:gap-16 font-heading text-sm text-ivory/80 uppercase tracking-widest font-light tracking-tight pointer-events-auto">
          {location.pathname === '/' ? (
            <>
              <a href="#features" onClick={(e) => handleScrollTo(e, '#features')} className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Bariery <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#philosophy" onClick={(e) => handleScrollTo(e, '#philosophy')} className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Podejście <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Usługi <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#protocol" onClick={(e) => handleScrollTo(e, '#protocol')} className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Metodologia <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
              <a href="#team" onClick={(e) => handleScrollTo(e, '#team')} className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                Zespół <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
              </a>
            </>
          ) : (
             <>
               <Link to="/" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                  Strona Główna <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
               </Link>
               <Link to="/portfolio" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                  Portfolio <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
               </Link>
               <Link to="/faq" className="group/nav-link relative hover:text-accent transition-colors duration-300 transform hover:-translate-y-[1px] block">
                  FAQ <img src="/ROG.png" alt="" className="absolute -top-1 -right-4 w-3 h-3 opacity-0 group-hover/nav-link:opacity-100 transition-opacity duration-300" />
               </Link>
             </>
          )}

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-ivory/20 to-transparent" />
        </div>

        <div className="flex items-center pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-ivory/80 hover:text-accent transition-colors duration-300 p-1 md:p-2 flex items-center justify-center rounded-full hover:bg-white/5"
            aria-label="Toggle menu"
          >
             <div className="relative w-7 h-7 flex items-center justify-center">
                 <Menu className={`absolute inset-0 w-7 h-7 transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                 <X className={`absolute inset-0 w-7 h-7 transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
             </div>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[54] bg-[#000000]/60 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Side Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 z-[55] w-full sm:w-[450px] h-[100dvh] bg-[#0c0c0c]/40 backdrop-blur-2xl border-l border-white/5 flex flex-col overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <filter id="menuNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#menuNoise)"/>
        </svg>

        <div className="flex-1 flex flex-col px-8 sm:px-14 pt-32 pb-12 relative z-10 overflow-y-auto w-full">
           <span className="font-heading text-[10px] text-ivory/30 tracking-[0.3em] uppercase mb-12 block border-l-2 border-accent/30 pl-4">
             MENU
           </span>
           
           <ul className="flex flex-col items-start gap-0 w-full border-t border-white/5">
             {navLinks.map((link, idx) => (
               <li key={idx} className="w-full relative group/menu-item border-b border-white/5">
                  <Link 
                    to={link.path}
                    className="relative flex items-center w-full py-8 text-2xl sm:text-3xl font-heading uppercase text-ivory/80 transition-colors duration-500 z-10"
                    onClick={() => setTimeout(() => setIsMenuOpen(false), 100)}
                  >
                    <span className="relative group-hover/menu-item:text-accent transition-colors duration-500 font-light tracking-widest block">
                       {link.name}
                       <img src="/ROG.png" alt="" className="absolute -top-1 sm:-top-2 -right-5 sm:-right-6 w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/menu-item:opacity-100 transition-opacity duration-300" />
                    </span>
                  </Link>
               </li>
             ))}
           </ul>
           
           <div className="mt-auto pt-16 flex flex-col gap-6 text-ivory/40">
              <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-ivory/30">Szybki Kontakt</span>
              <div className="flex gap-6 font-sans text-xs uppercase tracking-widest text-ivory/60">
                 <a href="https://www.instagram.com/scalova.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a>
                 <a href="https://www.linkedin.com/company/scalova/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
                 <a href="https://www.facebook.com/people/Scalova/61563223480934/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Facebook</a>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
