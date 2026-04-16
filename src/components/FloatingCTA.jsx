import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingCTA({ onOpenModal }) {
  const comp = useRef(null);

  useEffect(() => {
    let observer;
    let timeoutId;

    let ctx = gsap.context(() => {
      // Start hidden, drop in after hero animation
      gsap.from(comp.current, {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
        delay: 3
      });
    }, comp);

    // Setup Intersection Observer to track the FooterCTA
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Footer is visible, hide CTA
            gsap.to(comp.current, { y: 150, opacity: 0, duration: 0.5, ease: 'power2.in' });
          } else {
            // Footer is not visible, show CTA
            gsap.to(comp.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the footer is visible
    );

    // Wait for the initial drop-in animation to complete (3s delay + 2s duration = 5s)
    // before observing the footer, to prevent the observer from interrupting the entry animation.
    timeoutId = setTimeout(() => {
      const footerElement = document.getElementById('footer-cta');
      if (footerElement) {
        observer.observe(footerElement);
      }
    }, 5000);

    return () => {
      ctx.revert();
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div ref={comp} className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
      <button
        onClick={onOpenModal}
        className="group relative overflow-hidden rounded-none font-heading font-bold uppercase tracking-wider text-sm md:text-base pl-8 pr-4 py-3 md:pl-10 md:pr-6 md:py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.1] shadow-2xl shadow-accent/20 border border-accent/50"
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] transition-all duration-1000 ease-in-out group-hover:left-[150%] z-0 pointer-events-none"></div>
        <span className="relative z-10 flex items-center gap-4 md:gap-8 whitespace-nowrap">
          <span className="translate-y-[1px]">Zarezerwuj konsultację</span>
          <img src="/LOGO_BLACK.png" alt="Arrow" className="h-6 md:h-8 scale-110 md:scale-125 w-auto object-contain transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
}
