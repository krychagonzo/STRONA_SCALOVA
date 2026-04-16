import React, { useState } from 'react';

const FAQS = [
  {
    q: "Jak długo trwa wdrożenie systemu platformy i automatyzacji?",
    a: "Standardowo pełen proces od audytu po wdrożenie 'live' zamyka się w 4-8 tygodniach, zależnie od wybranego zakresu infrastruktury. Pracujemy jednak modułowo, co oznacza, że pierwsze efekty i asystentów jesteśmy w stanie uruchomić znacznie szybciej, bez przerywania Twojej bieżącej pracy."
  },
  {
    q: "Czy potrzebuję programistów lub eksperckiej wiedzy w zespole?",
    a: "Kompletnie nie. Budujemy nasze systemy w myśl zasady 'bezobsługowego back-office'. Twoim naczelnym zadaniem jest wyłącznie zamykanie wygenerowanych leadów. Cała integracja techniczna, od stron po automatyzacje API i szkolenie AI-asystenta, leży bezkompromisowo po naszej stronie."
  },
  {
    q: "Czym tak właściwie jest AI-asystent i w czym przypomina człowieka?",
    a: "To zaawansowany duży model językowy (LLM) brutalnie wytrenowany na procedurach, polityce i cennikach Twojej firmy. To nie jest zwykły bot z prostym drzewem decyzyjnym 'tak/nie'. Utrzymuje on gładką, sprzedażową konwersację z klientem, rozbija drobne obiekcje i zapisuje potencjalne deale prosto w dedykowanym CRM o dowolnej porze."
  },
  {
    q: "Na czym dokładnie polega optymalizacja budżetów 'pod sprzedaż'?",
    a: "Większość tradycyjnych agencji fetyszyzuje zasięgi oraz tanie tzw. 'kliki'. Nas to kompletnie nie interesuje. Instalujemy w Twojej infrastrukturze bezwzględny system śledzenia każdego wygenerowanego leada z kampanii. Jeśli kreacja, niezależnie od estetyki, nie sprowadza gotówki na Twoje konto we wskazany sposób – ucinamy jej budżet i przestawiamy wektor."
  },
  {
    q: "Jak mogę sprawdzić, czy Wasze zaplecza pasują do mojej branży?",
    a: "Zasady brutalnej i systemowej sprzedaży są na ogół niezmienne – proces prowadzenia uwagi z chłodnego kontaktu do sprawnie sfinalizowanego deala wygląda tak samo w sprzedaży deweloperskiej, branży technologicznej czy na etapie skalowania B2B. Oceniamy rentowność już po pierwszej fazie – jeśli systemy nie mają u Ciebie sensu ekonomicznego, po prostu odmówimy podjęcia współpracy."
  }
];

export default function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[150vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="faqNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#faqNoise)"/>
        </svg>
      </div>
      
      {/* HEADER SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-12 md:pb-20 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Centrum Wiedzy
        </span>
        
        <div className="inline-flex flex-col items-stretch max-w-[95vw] overflow-hidden sm:max-w-full mx-auto">
          <h1 className="text-ivory text-[50px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] 2xl:text-[220px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            PYTANIA (FAQ)
          </h1>

          <div className="w-full flex justify-center mt-10 md:mt-14 px-4">
            <p className="font-sans text-base sm:text-lg md:text-xl xl:text-[22px] text-ivory/60 max-w-[900px] leading-[1.6] text-center text-balance block">
              Odpowiedzi na najczęstsze obiekcje biznesowe i techniczne jeszcze przed naszą pierwszą rozmową. Pragniemy maksymalnie skrócić dystans – systemowa wiedza powinna być ułożona całkowicie od ręki.
            </p>
          </div>
        </div>
      </section>

      {/* ACCORDION SECTION */}
      <section className="relative w-full max-w-[1240px] px-4 md:px-8 mt-12 mx-auto z-10">
        <div className="flex flex-col border-t border-white/10">
          {FAQS.map((faq, index) => {
            const isActive = activeAccordion === index;
            return (
              <div key={index} className="border-b border-white/10">
                <div
                  onClick={() => setActiveAccordion(isActive ? -1 : index)}
                  className={`group flex w-full cursor-pointer items-center gap-4 py-8 md:py-10 px-4 xl:px-8 transition-colors duration-300 ${isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* NUMER OZNACZENIA */}
                  <div className={`flex-shrink-0 font-mono text-sm uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-accent' : 'text-ivory/30 group-hover:text-accent/60'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* TYTUŁ (PYTANIE) */}
                  <h3 className={`flex-1 font-heading text-2xl lg:text-[28px] tracking-tight transition-colors duration-500 px-4 md:px-8 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                    {faq.q}
                  </h3>

                  {/* PRZYCISK INTERAKTYWNY */}
                  <div className={`flex-shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-xl font-light transition-all duration-500 ${isActive ? 'border-accent text-accent bg-accent/5' : 'text-ivory/40 group-hover:border-accent/40 group-hover:text-accent'}`}>
                    {isActive ? '−' : '＋'}
                  </div>
                </div>

                {/* ROZWIJANY KONTENT OPISU */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-24 pr-4 xl:pr-32 pb-10 md:pb-12 text-balance">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
