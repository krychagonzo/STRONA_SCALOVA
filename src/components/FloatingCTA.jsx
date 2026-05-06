import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingCTA({ onOpenModal }) {
  const comp = useRef(null);

  useEffect(() => {
    let observer;
    let isFooterVisible = false;

    let ctx = gsap.context(() => {
      // Start hidden
      gsap.set(comp.current, { y: 150, opacity: 0 });
      let isVisible = false;

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          let shouldBeVisible = false;

          // Hide when at the very top of the page
          if (window.scrollY < window.innerHeight * 0.5) {
            shouldBeVisible = false;
          } else if (self.direction === 1 || isFooterVisible) {
            // Scrolling down or footer is visible -> hide
            shouldBeVisible = false;
          } else if (self.direction === -1 && !isFooterVisible) {
            // Scrolling up and footer not visible -> show
            shouldBeVisible = true;
          }

          // Only trigger animation if state changes
          if (shouldBeVisible && !isVisible) {
            isVisible = true;
            gsap.to(comp.current, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', overwrite: true, force3D: true });
          } else if (!shouldBeVisible && isVisible) {
            isVisible = false;
            gsap.to(comp.current, { y: 150, opacity: 0, duration: 0.8, ease: 'power3.inOut', overwrite: true, force3D: true });
          }
        }
      });

      // Observer to track if footer is visible
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isFooterVisible = entry.isIntersecting;
            if (isFooterVisible && isVisible) {
              // Immediately hide if footer becomes visible
              isVisible = false;
              gsap.to(comp.current, { y: 150, opacity: 0, duration: 0.8, ease: 'power3.inOut', overwrite: true, force3D: true });
            }
          });
        },
        { threshold: 0.05 }
      );

      const footerElement = document.getElementById('footer-cta');
      if (footerElement) {
        observer.observe(footerElement);
      }
    }, comp);

    return () => {
      ctx.revert();
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div ref={comp} id="floating-cta" className="fixed bottom-5 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
      <button
        onClick={onOpenModal}
        className="w-max flex justify-center items-center group relative overflow-hidden rounded-none font-heading font-bold uppercase tracking-wider text-[11px] sm:text-sm md:text-base px-6 py-3 md:px-10 md:py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.05] md:hover:scale-[1.1] shadow-[0_0_25px_rgba(198,211,0,0.35)] md:shadow-[0_0_40px_rgba(198,211,0,0.3)] border border-accent/50"
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] transition-all duration-1000 ease-in-out group-hover:left-[150%] z-0 pointer-events-none"></div>
        <span className="relative z-10 flex items-center gap-3 md:gap-8 whitespace-nowrap">
          <span className="translate-y-[1px]">Zarezerwuj konsultację</span>
          <img src="/LOGO_BLACK.png" alt="Arrow" className="h-4 md:h-8 w-auto object-contain md:scale-125" />
        </span>
      </button>
    </div>
  );
}
