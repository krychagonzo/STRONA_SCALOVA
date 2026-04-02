import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingCTA() {
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
        className="group relative overflow-hidden rounded-lg font-heading font-bold uppercase tracking-wider text-xs md:text-sm pl-8 pr-1.5 py-1.5 md:pl-10 md:pr-2 md:py-2 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-accent/20 border border-[#D4FF00]/50 hover:shadow-[0_0_30px_rgba(212,255,0,0.6)] hover:border-accent"
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="absolute inset-0 w-full h-full bg-ivory origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
        <span className="relative z-10 flex items-center gap-4 md:gap-6 whitespace-nowrap">
          <span className="translate-y-[1px]">Zarezerwuj konsultację</span>
          <img src="/LOGO_BLACK.png" alt="Arrow" className="h-10 md:h-[48px] w-auto object-contain transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
}
