import React from 'react';
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

        {/* LISTA STATYCZNA */}
        <div className="flex flex-col border-t border-white/20 relative">
          {problems.map((problem, index) => {
            const IconComponent = problem.Icon;
            return (
              <div
                key={index}
                className="border-b border-white/20 overflow-hidden hover:bg-white/[0.01] transition-colors duration-500"
              >
                <div
                  className="group flex w-full items-start pt-2 md:pt-4 pb-2 md:pb-4 px-2 md:px-8"
                >
                  {/* IKONA */}
                  <div className="w-[30%] md:w-[35%] pl-1 md:pl-0 flex items-start justify-center md:justify-start">
                    <IconComponent
                      className="w-[70px] h-[70px] md:w-[120px] md:h-[120px] text-accent/30 group-hover:text-accent transition-colors duration-700"
                      strokeWidth={0.6}
                    />
                  </div>

                  {/* ZAWARTOŚĆ PRAWA STRONA */}
                  <div className="w-[70%] md:w-[65%] flex justify-between items-start pt-2 md:pt-4">
                    <div className="flex flex-col pr-4 mt-0 md:mt-1">
                      <h3 className="font-heading text-lg md:text-3xl uppercase tracking-widest text-ivory/60 group-hover:text-ivory transition-colors duration-500 font-light">
                        {problem.title}
                      </h3>

                      <div class="mt-2 md:mt-3">
                        <p className="font-heading text-ivory/70 text-xs md:text-sm lg:text-base leading-relaxed max-w-2xl font-light normal-case">
                          {problem.desc}
                        </p>
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
