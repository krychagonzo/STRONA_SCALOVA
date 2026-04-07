import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    title: "Wdrożenie i szkolenie z obsługi",
    desc: "Instalujemy gotowy ekosystem w Twojej firmie. Wdrażamy wszystkie technologie, uruchamiamy marketing i prowadzimy twarde szkolenia dla Twojego zespołu. Przekazujemy gotowy system, byście od razu mogli zacząć dominować w swojej branży."
  }
];

export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {

      cardsRef.current.forEach((card, i) => {
        // Usunąłem GSAP pin: true. Natywny CSS "sticky" załatwi nakładanie się KART bez tworzenia sztucznego, długiego dystansu scrollowania!

        // Usunąłem problematyczną animację wejściową, dzięki czemu kafelki od razu natywnie się ładują i są widoczne.

        // c. Animacja "odsuwająca w głąb" poprzednią zaparkowaną kartę
        if (i > 0) {
          const prevCard = cardsRef.current[i - 1];

          gsap.to(prevCard, {
            scale: 0.75,
            opacity: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              end: "top 128px",
              scrub: 0.5,
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative w-full bg-obsidian py-32 px-6 flex flex-col items-center">

      {/* Wymuszenie końca strefy przyklejenia, aby nagłówek 'wypiął' się tuż przed ucieczką ostatniej karty */}
      <div className="absolute inset-x-0 top-0 bottom-[calc(clamp(350px,45vh,450px)+320px)] pointer-events-none z-20 flex justify-center">
        <div className="w-full max-w-6xl pt-32">
          <div className="sticky top-32 text-center uppercase tracking-widest font-heading drop-shadow-[0_4px_15px_rgba(10,10,10,0.9)]">
            <h2 className="text-ivory text-3xl md:text-5xl font-light tracking-tight mb-4">
              PROCES TRANSFORMACJI
            </h2>
          </div>
        </div>
      </div>

      {/* Niewidzialny spacer rekompensujący wyjęcie nagłówka z normalnego układu DOM */}
      <div className="h-[80px] mb-20 w-full"></div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-[90vh] pb-32">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            // Węższy i niższy kafelek, przyklejający się poniżej zaktualizowanego nagłówka
            className="w-full max-w-4xl mx-auto h-[45vh] min-h-[350px] max-h-[450px] flex items-center justify-center sticky top-[240px] border border-slate/30 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.9),_0_0_100px_rgba(0,0,0,0.6),_0_0_250px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{ backgroundColor: index === 0 ? '#0a0a0a' : index === 1 ? '#0f0f0f' : '#141414' }}
          >
            {/* Wnętrze karty z tekstem */}
            <div className="flex flex-col items-center gap-4 text-center px-6 max-w-4xl">
              <span className="font-heading font-light text-accent text-sm tracking-widest uppercase mb-2">
                Faza {step.num}
              </span>
              <h2 className="font-heading text-ivory text-4xl md:text-6xl font-light tracking-tight uppercase leading-tight">
                {step.title}
              </h2>
              <p className="font-heading text-ivory/60 text-base md:text-lg max-w-2xl leading-relaxed mt-4 normal-case">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
