import React, { useState } from 'react';
import { TrendingDown, Filter, EyeOff, Globe, Hourglass } from 'lucide-react';

const problems = [
  {
    Icon: TrendingDown,
    title: "Przepalony budżet",
    desc: "Twoje kampanie działają — ale nikt nie sprawdza czy zarabiają. Co miesiąc dziesiątki tysięcy złotych idą w reklamy, które nie zwracają ani złotówki."
  },
  {
    Icon: Filter,
    title: "Leady, które uciekają",
    desc: "Ktoś się zainteresował, wypełnił formularz, napisał. I zniknął. Nie do konkurencji — Ty go po prostu zgubiłeś. Zła oferta, za wolna odpowiedź, brak follow-upu."
  },
  {
    Icon: EyeOff,
    title: "Marka, której nie widać",
    desc: "Klienci szukają tego co sprzedajesz — i trafiają do konkurencji. Nie dlatego, że są lepsi. Dlatego, że ich widać, a Ciebie nie."
  },
  {
    Icon: Globe,
    title: "Wygląd, który kosztuje",
    desc: "Zanim powiesz słowo, klient już ocenił Twoją markę. Amatorskie logo, przestarzała strona, brak spójności — i zaczyna negocjować cenę zamiast kupować."
  },
  {
    Icon: Hourglass,
    title: "Ręczne procesy",
    desc: "Twoi ludzie robią ręcznie to, co można zautomatyzować. Kopiują, przeklejają, przypominają, raportują. Płacisz za czas, który nie tworzy żadnej wartości."
  }
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section id="features" className="relative w-full bg-obsidian py-20 md:py-28 px-4 md:px-8 flex flex-col items-center select-none z-10">
      <div className="w-full max-w-[1100px]">
        <div className="mb-20 md:mb-32 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
          <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">
            Bariery
          </span>
          <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
            TWÓJ BIZNES <span className="text-accent">TRACI KAŻDEGO DNIA.</span>
          </h2>
          <p className="text-ivory/50 mt-6 text-sm max-w-2xl mx-auto normal-case tracking-normal">
            Każda firma osiąga moment, w którym samo dokładanie ludzi i godzin przestaje przynosić efekty. To właśnie wtedy ukryte luki operacyjne i wizerunkowe zaczynają kosztować najwięcej.
          </p>
        </div>

        {/* LISTA AKORDEONOWA */}
        <div className="flex flex-col border-t border-white/20 relative">
          {problems.map((problem, index) => {
            const isActive = activeIndex === index;
            const IconComponent = problem.Icon;
            return (
              <div
                key={index}
                className={`border-b border-white/20 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[900px] bg-white/[0.02]' : 'max-h-[90px] md:max-h-[140px] hover:bg-white/[0.01]'}`}
              >
                <div
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  className="group flex w-full cursor-pointer items-center pt-2 md:pt-3 pb-4 md:pb-8 px-2 md:px-8"
                >
                  {/* IKONA */}
                  <div className="w-[30%] md:w-[35%] pl-1 md:pl-0 flex items-start justify-center md:justify-start">
                    <IconComponent
                      className={`w-[70px] h-[70px] md:w-[120px] md:h-[120px] transition-colors duration-700 ${isActive ? 'text-accent' : 'text-accent/30 group-hover:text-accent'}`}
                      strokeWidth={0.6}
                    />
                  </div>

                  {/* ZAWARTOŚĆ PRAWA STRONA */}
                  <div className="w-[70%] md:w-[65%] flex justify-between items-center">
                    <div className="flex flex-col pr-4 mt-0 md:mt-1">
                      <h3 className={`font-heading text-lg md:text-3xl uppercase tracking-widest transition-colors duration-500 font-normal ${isActive ? 'text-ivory' : 'text-ivory/60 group-hover:text-ivory'}`}>
                        {problem.title}
                      </h3>

                      <div className={`overflow-hidden transition-all duration-700 delay-100 ${isActive ? 'max-h-[500px] opacity-100 mt-2 md:mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                        <p className="font-heading text-ivory/70 text-xs md:text-sm lg:text-base leading-relaxed max-w-2xl font-light normal-case">
                          {problem.desc}
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
