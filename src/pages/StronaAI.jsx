import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Landing page", desc: "Jedna strona, jeden cel - konwersja. Projektujemy landing page'e pod konkretną kampanię lub produkt, z precyzyjną ścieżką prowadzącą odwiedzającego prosto do formularza, zakupu lub telefonu. Zero rozpraszaczy." },
  { title: "Rozbudowana witryna firmowa", desc: "Cyfrowa centrala Twojego biznesu. Wielostronicowa platforma z pełną architekturą informacji - oferta, case studies, blog, zespół. Buduje zaufanie i pozycję eksperta na lata." },
  { title: "AI-asystent na stronie", desc: "Zaawansowany AI-asystent wytrenowany na wiedzy o Twojej firmie. Prowadzi gładką, sprzedażową konwersację z klientem 24/7 - kwalifikuje leady, rozbija obiekcje i zapisuje kontakt prosto do CRM." },
  { title: "Integracja z CRM i narzędziami", desc: "Leady ze strony trafiają bezpośrednio do Twojego CRM. Automatyczne powiadomienia, follow-upy i segmentacja - bez żadnej ręcznej pracy po Twojej stronie." },
  { title: "Optymalizacja wydajności i SEO", desc: "Niewidoczna przewaga, którą widać w wynikach. Czas ładowania poniżej 1,5 sekundy i pozycja w Google - zoptymalizowane razem, żeby przyciągać i zatrzymywać ruch." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  {
    number: "01",
    title: "Platforma webowa pod konwersję",
    desc: "Projekt i kod strony zoptymalizowany pod ścieżkę klienta - od pierwszego kliknięcia do wypełnienia formularza."
  },
  {
    number: "02",
    title: "AI-asystent skrojony pod Twój biznes",
    desc: "AI-asystent wytrenowany na wiedzy o Twojej firmie, ofercie i FAQ. Kwalifikuje, odpowiada i zbiera dane 24/7."
  },
  {
    number: "03",
    title: "Czas ładowania poniżej 1,5s",
    desc: "Każde 100ms opóźnienia to -1% konwersji. Optymalizujemy każdy zasób, żeby strona działała szybciej niż oczekiwanie klienta."
  },
  {
    number: "04",
    title: "Integracja z całym Twoim ekosystemem",
    desc: "Leady ze strony trafiają prosto do CRM, automatyczne powiadomienia i follow-upy uruchamiają się same. Zero ręcznej pracy, zero utraconych kontaktów."
  },
  {
    number: "05",
    title: "Dashboard analityczny",
    desc: "Widzisz skąd przychodzą klienci, które strony konwertują, a które tracą ruch - w czasie rzeczywistym."
  },
  {
    number: "06",
    title: "Spokój przez pierwsze 30 dni",
    desc: "Monitorujemy, poprawiamy i dostrajamy AI-asystenta na podstawie realnych rozmów. Ty nie musisz nic pilnować."
  }
];

const steps = [
  {
    num: "01",
    label: "AUDYT",
    title: "Analizujemy gdzie tracisz klientów",
    desc: "Mapujemy obecną stronę, ścieżki użytkowników i punkty porzuceń. Rozumiemy Twoją ofertę i typowego klienta zanim zaczniemy projektować."
  },
  {
    num: "02",
    label: "PROJEKT",
    title: "Projektujesz razem z nami, ekran po ekranie",
    desc: "Projektujemy każdy ekran pod konwersję - nie pod estetykę. Zatwierdzasz wygląd przed wdrożeniem, bez niespodzianek."
  },
  {
    num: "03",
    label: "WDROŻENIE",
    title: "Budujemy, trenujemy, uruchamiamy",
    desc: "Budujemy platformę i trenujemy AI-asystenta na wiedzy o Twojej firmie. Testujemy na realnych scenariuszach przed startem."
  },
  {
    num: "04",
    label: "OPTYMALIZACJA",
    title: "Dane, testy, doskonalenie",
    desc: "Po starcie analizujemy zachowania użytkowników i iterujemy. Strona z każdym tygodniem konwertuje lepiej - nie gorzej."
  }
];

const painPoints = [
  {
    stat: "53%",
    label: "użytkowników porzuca stronę ładującą się dłużej niż 3 sekundy",
  },
  {
    stat: "79%",
    label: "leadów nigdy nie wraca, jeśli nie dostanie odpowiedzi w ciągu 5 minut",
  },
  {
    stat: "68%",
    label: "odwiedzających wychodzi, nie pozostawiając śladu",
  }
];

export default function StronaAI({ onOpenModal }) {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%'
        }
      });

      gsap.from('.deliverable-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.deliverables-grid',
          start: 'top 75%'
        }
      });

      gsap.from('.step-row', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 75%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-obsidian text-ivory font-sans selection:bg-accent selection:text-obsidian">

      {/* HERO */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-16 xl:px-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,255,0,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.4) 50%, transparent)' }} />

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Strona & AI-asystent</span>
          </div>

          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Twoja strona.<br />
              <span className="text-ivory">Najlepszy handlowiec,</span><br />
              jakiego zatrudnisz.
            </h1>
            <div
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_STRONA_AI.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_STRONA_AI.svg'}')`,
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
            Projektujemy strony, które nie czekają - same zagadują klientów, oddzielają gotowych do zakupu od przypadkowych, i zapisują kontakt do CRM, zanim Ty zdążysz otworzyć skrzynkę.
          </p>

          <div className="hero-line flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenModal}
              className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(212,255,0,0.15)] hover:shadow-[0_0_60px_rgba(212,255,0,0.35)]"
            >
              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
              <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
            </button>
            <a
              href="#jak-dzialamy"
              className="group font-heading font-bold uppercase tracking-wider text-sm px-10 py-4 border border-ivory/10 text-ivory/60 hover:border-ivory/30 hover:text-ivory transition-all duration-300 flex items-center justify-center gap-3"
            >
              JAK TO DZIAŁA
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-y-1"><path d="M12 5v14m-7-7 7 7 7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section ref={statsRef} className="w-full border-t border-b border-ivory/5 py-12 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-8 opacity-80">KOSZT BRAKU REAKCJI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-ivory/5">
            {painPoints.map((p, i) => (
              <div key={i} className="stat-card flex flex-col gap-2 md:px-12 first:pl-0 last:pr-0">
                <span className="font-heading text-4xl md:text-5xl text-accent font-light">{p.stat}</span>
                <span className="font-sans text-ivory/50 text-sm leading-relaxed max-w-xs">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Twoja strona traci klientów<br />
              <span className="text-ivory/40">właśnie teraz,</span><br />
              gdy to czytasz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/5">
            {[
              { title: "Wolno się ładuje", desc: "Klienci nie czekają. Każda sekunda opóźnienia to klient, który wszedł już na stronę konkurencji." },
              { title: "Nikt nie odbiera zapytań", desc: "Formularz kontaktowy i cisza przez 3 dni. Klient dawno podjął decyzję - tyle że bez Ciebie." },
              { title: "Wizytówka zamiast maszyny sprzedażowej", desc: "Ładne zdjęcia, brak ścieżki konwersji. Odwiedzający nie wiedzą co mają zrobić i wychodzą bez kontaktu." },
            ].map((item, i) => (
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
        eyebrow="Do wyboru. Do łączenia."
        heading={<>CO <span className="text-accent">WDRAŻAMY.</span></>}
        description="Każdą możesz uruchomić osobno. Razem nie zostawiają miejsca dla konkurencji."
        items={subServices}
      />

      {/* DELIVERABLES */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Nie kawałki układanki.<br />Gotowy system.
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

      {/* PROCESS */}
      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Od audytu do działającej<br />strony w 4 krokach.
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-ivory/10 group-hover:text-accent/40 transition-colors duration-300">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
            <div className="border-t border-ivory/5" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ServiceHeroCanvas />
        </div>

        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-ivory/40 text-[10px] tracking-[0.25em] uppercase mb-6">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Przestań tracić klientów.<br />
            Zacznij ich zbierać.
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twoją obecną stronę i pokażemy konkretnie, ile klientów tracisz i co zmienić, żeby to odwrócić.
          </p>
          <button
            onClick={onOpenModal}
            className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-base px-14 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.04] shadow-[0_0_60px_rgba(212,255,0,0.15)] hover:shadow-[0_0_80px_rgba(212,255,0,0.4)]"
          >
            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
            <span className="relative z-10">UMÓW BEZPŁATNĄ KONSULTACJĘ</span>
          </button>
        </div>
      </section>
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}
