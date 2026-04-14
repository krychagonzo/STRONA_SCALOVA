import React, { useState } from 'react';

const problems = [
  {
    icon: "/SEKCJA_BARIERY/IKONY_PRZEPALANY_BUDZET.svg",
    title: "Przepalony budżet",
    desc: "Twoje kampanie działają — ale nikt nie sprawdza czy zarabiają. Co miesiąc dziesiątki tysięcy złotych idą w reklamy, które nie zwracają ani złotówki."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_LEADY.svg",
    title: "Leady, które uciekają",
    desc: "Ktoś się zainteresował, wypełnił formularz, napisał. I zniknął. Nie do konkurencji — Ty go po prostu zgubiłeś. Zła oferta, za wolna odpowiedź, brak follow-upu."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_MARKA.svg",
    title: "Marka, której nie widać",
    desc: "Klienci szukają tego co sprzedajesz — i trafiają do konkurencji. Nie dlatego, że są lepsi. Dlatego, że ich widać, a Ciebie nie."
  },
  {
    icon: "/SEKCJA_BARIERY/IKONY_WYGLAD.svg",
    title: "Wygląd, który kosztuje",
    desc: "Zanim powiesz słowo, klient już ocenił Twoją markę. Amatorskie logo, przestarzała strona, brak spójności — i zaczyna negocjować cenę zamiast kupować."
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
        <div className="flex flex-col border-t border-white/20">
          {problems.map((problem, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="border-b border-white/20">

                {/* WIERSZ — nagłówek, zawsze widoczny */}
                <div
                  onClick={() => setActiveStep(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 md:gap-6 py-3 md:py-4 px-2 md:px-6 transition-colors duration-300 ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                >
                  {/* IKONA — mała, zawsze widoczna */}
                  <div
                    className={`flex-shrink-0 w-[28px] h-[28px] md:w-[36px] md:h-[36px] transition-all duration-500 ${isActive ? 'text-accent scale-[1.8]' : 'text-white/30 group-hover:text-white/50 scale-100'}`}
                    style={{
                      maskImage: `url(${problem.icon})`,
                      WebkitMaskImage: `url(${problem.icon})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      backgroundColor: 'currentColor',
                    }}
                  />

                  {/* TYTUŁ */}
                  <h3 className={`flex-1 text-center font-heading text-xl md:text-3xl uppercase tracking-widest font-light transition-colors duration-500 ${isActive ? 'text-ivory' : 'text-ivory/60 group-hover:text-ivory/90'}`}>
                    {problem.title}
                  </h3>

                  {/* PRZYCISK +/− */}
                  <div className={`flex-shrink-0 w-7 h-7 md:w-9 md:h-9 border rounded-full flex items-center justify-center text-base md:text-lg font-light transition-colors duration-500 ${isActive ? 'border-accent text-accent' : 'border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white/70'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY OPIS */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-heading text-ivory/60 text-sm md:text-base leading-relaxed font-light normal-case px-2 md:px-6 pb-5 md:pb-7 text-center mx-auto max-w-3xl">
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
