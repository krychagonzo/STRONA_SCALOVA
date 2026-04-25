import React, { useState, useEffect, useRef } from 'react';

// Bayer 4x4 — identyczne jak ServiceHeroCanvas
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function FAQCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    const DURATION_MS = 2500;
    const GLOW_FINAL  = 0.50;

    const BR = 14, BG = 14, BB = 14;  // base #0E0E0E
    const GR = 42, GG = 42, GB = 42;  // glow #2a2a2a

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = 0; // gradient od góry
      const rx = w * 0.75;
      const ry = 1200;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const dither = BAYER4[(y & 3) * 4 + (x & 3)];
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          const t  = Math.min(Math.sqrt(dx * dx + dy * dy), 1.0);
          const ss = 1 - t * t * (3 - 2 * t);
          const alpha = ss * glowT;
          const r = BR + (GR - BR) * alpha;
          const g = BG + (GG - BG) * alpha;
          const b = BB + (GB - BB) * alpha;
          const n = dither * 2;
          data[i]     = Math.min(255, Math.max(0, r + n));
          data[i + 1] = Math.min(255, Math.max(0, g + n));
          data[i + 2] = Math.min(255, Math.max(0, b + n));
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width  = w;
    canvas.height = h;

    let currentGlow = 0;
    drawAt(currentGlow, w, h);

    let rafId = null;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawAt(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // ResizeObserver tylko przerysowuje przy zmianie rozmiaru — nie restartuje animacji
    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      drawAt(currentGlow, w, h);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

const FAQS = [
  {
    q: "Jak mogę sprawdzić, czy Wasze zaplecza pasują do mojej branży?",
    a: "Pierwszym etapem współpracy jest zawsze diagnoza, w której wskazujemy konkretne miejsca, gdzie Twoja firma traci czas i pieniądze, co pozwala nam precyzyjnie dopasować narzędzia do Twojej branży."
  },
  {
    q: "Jak wyceniane są Wasze usługi?",
    a: "W przypadku konkretnych wdrożeń, takich jak budowa nowej strony czy instalacja systemu AI, stosujemy wycenę projektową opartą na zakresie prac."
  },
  {
    q: "Dla jakich firm wasze usługi przynoszą najlepsze efekty?",
    a: "Wspieramy przedsiębiorstwa, które chcą zwiększyć skalę działania bez konieczności proporcjonalnego zwiększania zatrudnienia i kosztów stałych"
  },
  {
    q: "Czy potrzebuję programistów lub eksperckiej wiedzy w zespole?",
    a: "Nie musisz posiadać własnego działu IT, my dostarczamy i instalujemy wszystkie technologie, a następnie szkolimy Twój zespół z ich obsługi."
  },
  {
    q: "Czy sztuczna inteligencja nie sprawi, że moja marka straci \"ludzką twarz\"?",
    a: "To jeden z największych mitów. AI nie zastępuje empatii – AI uwalnia czas, byś mógł być bardziej empatyczny dla kluczowych klientów. Maszyny wykonują powtarzalną czarną robotę, analizują dane i personalizują komunikaty w ułamku sekundy, podczas gdy Ty i Twój zespół możecie skupić się na budowaniu prawdziwych, ludzkich relacji tam, gdzie to najbardziej potrzebne."
  },
  {
    q: "Czym tak właściwie jest AI-asystent i jaką może pełnić funkcje na mojej stronie?",
    a: "System błyskawicznie odpowiada na pytania o cenniki, usługi i FAQ, rozbijając obiekcje klientów, zanim zdążysz otworzyć skrzynkę mailową."
  },
  {
    q: "Czym jest landing page a czym Witryna firmowa?",
    a: "Landing page to Twój najlepszy handlowiec nastawiony na jeden cel (zakup lub kontakt), podczas gdy witryna firmowa to cyfrowa centrala budująca zaufanie i markę na lata."
  },
  {
    q: "Co realnie zyskuję dzięki profesjonalnej identyfikacji wizualnej? Czy to tylko \"ładne logo\"?",
    a: "Profesjonalny wizerunek jest sygnałem jakości – klienci chętniej płacą więcej firmom, które wyglądają na liderów swojej branży."
  },
  {
    q: "Jak animacja może wpłynąć na moją firmę?",
    a: "Wysokiej klasy motion design wyróżnia Cię na tle konkurencji i sprawia, że Twój przekaz jest lepiej zapamiętywany oraz pozwala w 60 sekund wytłumaczyć procesy, które na piśmie zajęłyby kilka stron, co zwiększa szansę na zainteresowanie ofertą."
  },
  {
    q: "Czy animacja to rozwiązanie tylko do pozyskiwania klientów, czy pomoże mi również zoptymalizować procesy wewnątrz firmy?",
    a: "Wideo-instrukcje i explainer video odciążają działy obsługi klienta, rozwiązując typowe problemy użytkowników bez udziału człowieka."
  }
];

export default function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      {/* AMBIENT GRADIENT z anti-banding dithering */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ height: '120vh' }}>
          <FAQCanvas />
        </div>
      </div>
      
      {/* HEADER SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-12 md:pb-20 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Centrum Wiedzy
        </span>
        
        <div className="inline-flex flex-col items-stretch max-w-[95vw] overflow-hidden sm:max-w-full mx-auto">
          <h1 className="text-ivory text-[50px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] 2xl:text-[220px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            FAQ
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
                  <p className="font-sans text-ivory/60 text-base md:text-[17px] xl:text-[19px] leading-relaxed font-light normal-case pl-16 md:pl-24 pr-4 xl:pr-32 pt-6 md:pt-8 pb-10 md:pb-12 text-balance whitespace-pre-wrap">
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
