import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServicePageNav({ onOpenModal }) {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      const pastHero = scrollY > windowH * 0.75;
      const nearCTA = scrollY + windowH > docH - 320;

      setShowCTA(pastHero && !nearCTA);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* BACK ARROW — fixed bottom-left */}
      <Link
        to="/#services"
        className="fixed bottom-8 left-8 z-50 group w-12 h-12 flex items-center justify-center border border-ivory/10 bg-obsidian/80 backdrop-blur-sm text-ivory/30 hover:text-accent hover:border-accent/40 transition-all duration-300"
        aria-label="Wróć do usług"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>

      {/* FLOATING CTA — fixed bottom-right, scroll-triggered */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          showCTA ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <button
          onClick={onOpenModal}
          className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-[11px] px-7 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.2)] hover:shadow-[0_0_60px_rgba(212,255,0,0.4)]"
        >
          <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
          <span className="relative z-10">ZAREZERWUJ KONSULTACJĘ</span>
        </button>
      </div>
    </>
  );
}
