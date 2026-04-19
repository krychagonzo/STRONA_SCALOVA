import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Audyt gotowości firmy na AI", desc: "Analizujemy procesy, dane i narzędzia w Twojej firmie. Identyfikujemy gdzie AI przyniesie realny zwrot z inwestycji, a gdzie byłby tylko kosztem bez efektu. Konkretna mapa wdrożenia z wyceną ROI." },
  { title: "Asystenci AI dla zespołu", desc: "Każdy pracownik z własnym asystentem AI dopasowanym do jego roli - marketing, sprzedaż, obsługa klienta. Konfigurujemy, trenujemy i integrujemy z istniejącymi narzędziami zespołu." },
  { title: "Automatyzacja komunikacji z klientami", desc: "AI obsługuje zapytania, kwalifikuje leady i wysyła follow-upy automatycznie. Twój zespół zajmuje się klientami gotowymi do zakupu - reszta działa sama, 24/7." },
  { title: "Analiza danych i raportowanie AI", desc: "AI analizuje dane sprzedażowe, marketingowe i operacyjne w czasie rzeczywistym. Dostajesz wnioski i rekomendacje, nie surowe liczby do ręcznej interpretacji w Excelu." },
  { title: "Szkolenia i warsztaty AI", desc: "Twój zespół rozumie jak używać AI produktywnie w codziennej pracy - nie tylko co to jest. Warsztaty na realnych scenariuszach z Twojej branży, pełna dokumentacja i wsparcie po wdrożeniu." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt gotowości firmy na AI", desc: "Analizujemy procesy, dane i narzędzia. Identyfikujemy gdzie AI przyniesie realny zwrot, a gdzie byłby tylko kosztem i chaosem." },
  { number: "02", title: "Dobór narzędzi pod Twoje procesy", desc: "Nie polecamy tego co modne - polecamy to co działa w Twojej branży i przy Twoich zasobach. Konkretne narzędzia, konkretne przypadki użycia." },
  { number: "03", title: "Automatyzacja komunikacji z klientami", desc: "AI obsługuje zapytania, kwalifikuje leady, wysyła follow-upy. Twój zespół zajmuje się klientami gotowymi do zakupu - reszta działa sama." },
  { number: "04", title: "Asystenci AI dla zespołu", desc: "Każdy pracownik z własnym asystentem AI dopasowanym do jego roli. Marketing, sprzedaż, obsługa - każdy dział pracuje szybciej." },
  { number: "05", title: "Analiza danych i raportowanie", desc: "AI analizuje dane sprzedażowe, marketingowe i operacyjne. Dostajesz wnioski i rekomendacje, nie surowe liczby do ręcznej interpretacji." },
  { number: "06", title: "Szkolenie zespołu i dokumentacja", desc: "Twój zespół rozumie jak używać AI produktywnie - nie tylko co to jest. Pełna dokumentacja, żebyś nie był uzależniony od nas." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Mapujemy procesy i szanse na AI", desc: "Analizujemy każdy dział i proces. Identyfikujemy gdzie AI zaoszczędzi czas, zredukuje błędy lub zwiększy przychód - z realną wyceną ROI." },
  { num: "02", label: "DOBÓR", title: "Wybieramy i konfigurujemy narzędzia", desc: "Dobieramy narzędzia dopasowane do Twoich procesów i budżetu. Konfigurujemy, integrujemy z istniejącymi systemami i testujemy przed wdrożeniem." },
  { num: "03", label: "WDROŻENIE", title: "Wdrażamy i testujemy na realnych danych", desc: "Uruchamiamy narzędzia w Twojej firmie. Każde wdrożenie testowane na realnych scenariuszach - nie na demo danych." },
  { num: "04", label: "ADOPCJA", title: "Szkolimy zespół i mierzymy efekty", desc: "Warsztaty dla każdego działu. Śledzimy metryki adopcji i efektywności - wiesz ile czasu i pieniędzy oszczędza każde wdrożone narzędzie." },
];

const stats = [
  { stat: "9/10", label: "firm 'eksperymentuje z AI' przez rok i wraca do Excela bez żadnego realnego wdrożenia" },
  { stat: "3,4h", label: "dziennie oszczędza pracownik z dobrze skonfigurowanym asystentem AI w swojej roli" },
  { stat: "7 dni", label: "do pierwszego wdrożonego narzędzia AI działającego w Twoich realnych procesach" },
];

const problems = [
  { title: "'Eksperymentujemy z AI' od roku", desc: "ChatGPT do pisania maili i prompt engineering na YouTube. Zero realnego wdrożenia w procesach, zero mierzalnego efektu dla firmy." },
  { title: "Nie wiesz od czego zacząć", desc: "Tysiące narzędzi, setki use-case'ów. Bez kogoś, kto wie co działa w Twojej branży, gubisz się w możliwościach i nie robisz nic." },
  { title: "Zespół boi się AI lub jej nie ufa", desc: "Bez porządnego szkolenia i kontekstu AI to zagrożenie dla stanowisk, nie wsparcie. Adopcja kuleje, narzędzia stoją nieużywane." },
];

export default function AIwFirmie({ onOpenModal }) {
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.from('.stat-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } });
      gsap.from('.deliverable-card', { y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.deliverables-grid', start: 'top 75%' } });
      gsap.from('.step-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 75%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30">Usługi</span>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">AI w firmie</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              AI, które<br />
            <span className="text-ivory">naprawdę działa</span><br />
            w Twojej firmie.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg'}')`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'right center',
                WebkitMaskPosition: 'right center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
              }}
            />
          </div>
          <p className="hero-line font-sans text-ivory/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Nie eksperymenty, nie warsztaty z buzzwordami. Wdrażamy konkretne narzędzia AI dopasowane do Twoich procesów - od pierwszego tygodnia Twój zespół używa ich produktywnie i widzi efekty.
          </p>
          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]">
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a href="#jak-dzialamy" className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3">
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
          {stats.map((p, i) => (
            <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
              <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
              <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Większość firm wie, że AI<br />
              <span className="text-ivory/40">jest przyszłością.</span><br />
              Żadna nie wie jak zacząć.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {problems.map((item, i) => (
              <div key={i} className="bg-[#0c0c0c] p-8 md:p-10 flex flex-col gap-4">
                <div className="w-8 h-[2px] bg-accent" />
                <h3 className="font-heading text-ivory text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="font-sans text-ivory/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO ŚWIADCZYMY */}
      <SubServices
        eyebrow="Usługi w ramach kategorii"
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą usługę możesz uruchomić osobno. Razem tworzą system bez luk."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO DOSTAJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Realne wdrożenie AI.<br />Nie warsztaty i prezentacje.
            </h2>
          </div>
          <div className="deliverables-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
            {deliverables.map((d) => (
              <div key={d.number} className="deliverable-card bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0f0f0f] transition-colors duration-300">
                <span className="font-mono text-accent/50 text-xs tracking-[0.2em]">{d.number}</span>
                <h3 className="font-heading text-ivory text-lg uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">{d.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed mt-auto">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do zespołu<br />produktywnego z AI w tydzień.
            </h2>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex flex-col md:flex-row gap-6 md:gap-16 py-10 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-500">
                <div className="flex items-start gap-6 md:w-64 shrink-0">
                  <span className="font-mono text-accent/40 text-xs tracking-[0.2em] mt-1">{step.num}</span>
                  <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase mt-1">{step.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-ivory text-xl md:text-2xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                  <p className="font-sans text-ivory/50 text-sm md:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden md:flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań eksperymentować.<br />
            <span className="text-accent">Zacznij wdrażać.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Zmapujemy Twoje procesy i pokażemy konkretnie, które z nich AI może usprawnić w pierwszym tygodniu.
          </p>
          <button onClick={onOpenModal} className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]">
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
    </div>
  );
}
