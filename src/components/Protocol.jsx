import React, { useState } from 'react';

const steps = [
  {
    num: "01",
    title: "Audyt i diagnoza firmy",
    desc: "Rozkładamy Twój obecny model na czynniki pierwsze. Identyfikujemy przestarzałe procesy, dziury w sprzedaży i przepalane budżety, które obecnie blokują Twój wzrost."
  },
  {
    num: "02",
    title: "Przedstawienie rozwiązań",
    desc: "Prezentujemy konkretny plan działania. Pokazujemy, jak nowa strona, identyfikacja wizualna, celne reklamy i zautomatyzowana sprzedaż zwiększą Twoje przychody."
  },
  {
    num: "03",
    title: "Wdrożenie i szkolenie",
    desc: "Instalujemy gotowy ekosystem w Twojej firmie. Wdrażamy wszystkie technologie, uruchamiamy marketing i prowadzimy twarde szkolenia dla Twojego zespołu. Przekazujemy gotowy system, byście od razu mogli zacząć dominować."
  },
  {
    num: "04",
    title: "Skalowanie wyników",
    desc: "Monitorujemy wyniki i stale optymalizujemy kampanie. Analizujemy dane, przeprowadzamy testy A/B i rozbudowujemy systemy, by skutecznie maksymalizować zwrot z inwestycji (ROI)."
  }
];

export default function Protocol() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="protocol" className="relative w-full bg-obsidian py-32 md:py-48 px-4 md:px-8 flex flex-col items-center select-none">
      <div className="w-full max-w-[1400px]">
        <div className="mb-20 md:mb-32 text-center uppercase tracking-widest font-heading px-6">
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            PROCES TRANSFORMACJI
          </h2>
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/20 relative">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div 
                key={index} 
                className={`border-b border-white/20 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[900px] bg-white/[0.02]' : 'max-h-[90px] md:max-h-[140px] hover:bg-white/[0.01]'}`}
              >
                <div 
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className="group flex w-full cursor-pointer items-start pt-6 md:pt-10 pb-16 md:pb-32 px-2 md:px-8"
                >
                  {/* NUMER */}
                  <div className="w-[30%] md:w-[35%] pl-1 md:pl-0">
                    <span 
                       className={`font-heading text-[110px] md:text-[250px] leading-[0.75] font-bold uppercase transition-colors duration-700 ${isActive ? 'text-accent' : 'text-accent/30 group-hover:text-accent/60'}`}
                    >
                      {step.num}
                    </span>
                  </div>
                  
                  {/* ZAWARTOŚĆ PRAWA STRONA */}
                  <div className="w-[70%] md:w-[65%] flex justify-between items-start pt-5 md:pt-12">
                    <div className="flex flex-col pr-4 mt-0 md:mt-1">
                      <h3 className={`font-heading text-lg md:text-3xl uppercase tracking-widest transition-colors duration-500 font-light ${isActive ? 'text-ivory' : 'text-ivory/60 group-hover:text-ivory/90'}`}>
                        {step.title}
                      </h3>
                      
                      <div className={`overflow-hidden transition-all duration-700 delay-100 ${isActive ? 'max-h-[500px] opacity-100 mt-4 md:mt-8' : 'max-h-0 opacity-0 mt-0'}`}>

                        <p className="font-heading text-ivory/70 text-xs md:text-base leading-relaxed max-w-2xl font-light normal-case">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 mt-0">
                      <div className={`w-8 h-8 md:w-11 md:h-11 border-[1px] md:border-[1.5px] rounded-full flex items-center justify-center text-xl md:text-2xl font-light transition-colors duration-500 ${isActive ? 'border-accent text-accent' : 'border-white/20 text-white/50 group-hover:border-white/60 group-hover:text-white'}`}>
                        {isActive ? '−' : '＋'}
                      </div>
                    </div>
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
