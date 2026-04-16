import React, { useState } from 'react';


const problems = [
  {
    icon: "/SEKCJA_BARIERY/IKONY_PRZEPALANY_BUDZET.svg",
    title: "Przepalone budżety,",
    desc: "Twoje kampanie działają - ale nikt nie sprawdza czy zarabiają. Co miesiąc dziesiątki tysięcy złotych idą w reklamy, które nie zwracają ani złotówki."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_LEADY.svg",
    title: "Tracisz gorące leady,",
    desc: "Ktoś się zainteresował, wypełnił formularz, napisał. I zniknął. Nie do konkurencji - Ty go po prostu zgubiłeś. Zła oferta, za wolna odpowiedź, brak follow-upu."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_MARKA.svg",
    title: "Szukają Ciebie,",
    desc: "Klienci szukają tego co sprzedajesz - i trafiają do konkurencji. Nie dlatego, że są lepsi. Dlatego, że ich widać, a Ciebie nie."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_WYGLAD.svg",
    title: "Klienci negocjują,",
    desc: "Zanim powiesz słowo, klient już ocenił Twoją markę. Amatorskie logo, przestarzała strona, brak spójności - i zaczyna negocjować cenę zamiast kupować."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_RECZNE_PROCESY.svg",
    title: "Ręczne procesy",
    desc: "Twoi ludzie robią ręcznie to, co można zautomatyzować. Kopiują, przeklejają, przypominają, raportują. Płacisz za czas, który nie tworzy żadnej wartości."
  }
];

export default function Features() {
  const [activeStep, setActiveStep] = useState(-1);

  return (
    <section id="features" className="relative w-full bg-obsidian py-20 md:py-28 px-4 md:px-8 flex flex-col items-center select-none z-10">
      <div className="w-full max-w-[1100px]">

        {/* NAGŁÓWEK SEKCJI */}
        <div className="mb-10 md:mb-16 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Bariery
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            TWÓJ BIZNES <span className="text-accent">TRACI KAŻDEGO DNIA.</span>
          </h2>
          <p className="text-ivory/60 mt-6 text-base md:text-lg max-w-2xl mx-auto normal-case tracking-normal leading-relaxed">
            Każda firma osiąga moment, w którym samo dokładanie ludzi i godzin przestaje przynosić efekty. To właśnie wtedy ukryte luki operacyjne i wizerunkowe zaczynają kosztować najwięcej.
          </p>
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/10">
          {problems.map((problem, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* IKONA MASKOWANA */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 md:w-9 md:h-9 transition-colors duration-500 mr-2 md:mr-4 ${isActive ? 'bg-accent' : 'bg-ivory/30 group-hover:bg-accent/60'}`}
                    style={{
                      maskImage: `url('${problem.icon}')`,
                      WebkitMaskImage: `url('${problem.icon}')`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat'
                    }}
                  />

                  {/* TYTUŁ */}
                  <h3 className={`flex-1 text-left font-heading text-2xl lg:text-[28px] tracking-tight uppercase transition-colors duration-500 px-2 md:px-4 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {problem.title}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY OPIS */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-[5.5rem] pr-4 xl:pr-32 pb-10 md:pb-12 text-balance">
                    {problem.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
