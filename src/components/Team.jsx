import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamShowcase from './ui/team-showcase';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="team"
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 bg-obsidian overflow-hidden"
    >
      {/* Background elements to match the site's dark aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-20 uppercase tracking-widest font-heading px-6">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Zespół
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            Zespół, dla którego Twój wynik jest jedyną miarą sukcesu.
          </h2>
          <p className="text-ivory/50 mt-6 text-sm max-w-2xl mx-auto normal-case tracking-normal">
            W Scalovie uznajemy tylko jedną miarę sukcesu— czy Twoja firma jest dziś lepsza niż wczoraj.
          </p>
        </div>

        {/* The Showcase Component */}
        <div className="w-full relative">
          <TeamShowcase />
        </div>
        
      </div>
    </section>
  );
}
