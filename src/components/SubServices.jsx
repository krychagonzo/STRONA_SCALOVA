import React, { useState } from 'react';

export default function SubServices({ eyebrow, heading, description, items }) {
  const [activeStep, setActiveStep] = useState(-1);

  return (
    <section className="relative w-full bg-obsidian py-20 md:py-28 px-4 md:px-8 flex flex-col items-center select-none z-10">
      <div className="w-full max-w-[1100px]">

        {/* NAGŁÓWEK SEKCJI */}
        <div className="mb-10 md:mb-16 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            {eyebrow}
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-medium tracking-tighter text-center leading-[0.9] uppercase">
            {heading}
          </h2>
          {description && (
            <p className="text-ivory/60 mt-6 text-base md:text-lg max-w-2xl mx-auto normal-case tracking-normal leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/10">
          {items.map((item, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* NUMER */}
                  <div className={`flex-shrink-0 font-mono text-sm uppercase tracking-widest transition-colors duration-500 mr-2 md:mr-4 ${isActive ? 'text-accent' : 'text-ivory/30 group-hover:text-accent/60'}`}>
                  {item.number ?? String(index + 1).padStart(2, '0')}
                  </div>

                  {/* TYTUŁ */}
                  <h3 className={`flex-1 text-left font-heading text-2xl lg:text-[28px] tracking-tight uppercase transition-colors duration-500 px-2 md:px-4 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {item.title}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY OPIS */}
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className={`overflow-hidden transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-10 sm:pl-16 md:pl-[5.5rem] pr-4 sm:pr-8 xl:pr-32 pt-6 md:pt-8 pb-10 md:pb-12 text-balance">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
