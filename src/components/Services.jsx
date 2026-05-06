import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import InteractiveDotGrid from './ui/InteractiveDotGrid';

const servicesList = [
  {
    title: "Strona & AI-asystent",
    tag: "Web",
    slug: "/uslugi/strona-ai",
    areaLabel: "INFRASTRUKTURA POZYSKIWANIA LEADÓW",
    desc: "Większość stron firmowych to wizytówki, które czekają aż ktoś sam zadzwoni. Twoja będzie działać inaczej: ładuje się w mniej niż 1,5 sekundy, odpowiada na pytania klientów o 3 w nocy i kwalifikuje zapytania zanim Ty zdążysz otworzyć skrzynkę. Budujemy platformę, która zamienia ruch w realne leady - każdego dnia, bez Twojego udziału.",
    features: ["Landing page", "Rozbudowana witryna firmowa", "AI-asystent na stronie", "Integracja z CRM i narzędziami", "Optymalizacja wydajności i SEO"],
    icon: "/SEKCJA_USLUGI/IKONA_STRONA_AI.svg"
  },
  {
    title: "Kampanie & Organic",
    tag: "Performance",
    slug: "/uslugi/kampanie",
    areaLabel: "TWÓJ SILNIK WZROSTU",
    desc: "Większość agencji optymalizuje kampanie pod kliknięcia i zasięg. My optymalizujemy pod sprzedaż. Łączymy płatne reklamy w Google i Meta z treściami organicznymi, żeby każda złotówka budżetu była śledzona do konkretnej transakcji, a nie do wykresu, którym można się pochwalić na spotkaniu.",
    features: ["Meta Ads (Facebook & Instagram)", "Google Ads (Search & Display)", "YouTube Ads", "Artykuły sponsorowane i Native Ads", "Content organiczny"],
    icon: "/SEKCJA_USLUGI/IKONA_KAMPANIE_ORGANIC.svg"
  },
  {
    title: "Statyczne treści wizualne",
    tag: "Wizerunek",
    slug: "/uslugi/statyczne-tresci",
    areaLabel: "SYSTEM BUDOWANIA AUTORYTETU",
    desc: "Projektujemy unikalny kod wizualny Twojej firmy. Od kompleksowego rebrandingu, przez fotorealistyczne rendery 3D i grafikę AI, aż po sprzedażowe Pitch Decki i infografiki. Tworzymy spójne materiały, które budują autorytet, podnoszą postrzeganą wartość usług i bezpośrednio przyspieszają zamykanie transakcji.",
    features: ["Identyfikacja Wizualna i Rebranding", "Wizualizacje Produktów i Architektury", "Grafika Wspierana przez AI", "Design Sprzedażowy i Materiały", "Infografiki i Wizualizacja Danych"],
    icon: "/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg"
  },
  {
    title: "Automatyzacje",
    tag: "Operacje",
    slug: "/uslugi/automatyzacje",
    areaLabel: "TWÓJ BEZOSOBOWY BACK-OFFICE",
    desc: "Twój zespół codziennie traci godziny na ręczne przepisywanie danych, powiadomienia, które można wysyłać automatycznie, i zadania, które nie wymagają człowieka - tylko nikt jeszcze tego nie ustawił. Audytujemy procesy, usuwamy powtarzalną pracę i budujemy system, który wykonuje ją zamiast Twojego zespołu. Od pierwszego tygodnia.",
    features: ["Automatyzacja procesów operacyjnych", "Konfiguracja i optymalizacja CRM", "Automatyczne fakturowanie", "Automatyzacja komunikacji z klientem", "Zarządzanie zespołem i monitorowanie"],
    icon: "/SEKCJA_USLUGI/IKONA_AUTOMATYZACJE.svg"
  },
  {
    title: "Sprzedaż & Oferta",
    tag: "Przychody",
    slug: "/uslugi/sprzedaz",
    areaLabel: "PRZEBUDOWA PROCESU ZAMYKANIA",
    desc: "Słaba oferta to nie problem graficzny. To zły układ argumentów i brak odpowiedzi na pytania, które klient ma w głowie zanim je zada. Przebudowujemy Twój proces sprzedaży od podstaw: analiza dlaczego klienci odchodzą, nowa struktura oferty i przeszkolony zespół, który wie jak jej używać - więcej zamkniętych transakcji przy tych samych leadach.",
    features: ["Przebudowa oferty handlowej", "Skrypty i scenariusze rozmów", "Szkolenie zespołu sprzedażowego", "Materiały wspierające sprzedaż", "System mierzenia win-rate"],
    icon: "/SEKCJA_USLUGI/IKONA_SPRZEDAZ_OFERTA.svg"
  },
  {
    title: "AI w firmie",
    tag: "Technologia",
    slug: "/uslugi/ai-w-firmie",
    areaLabel: "TWOJA PRZEWAGA TECHNOLOGICZNA",
    desc: "Dziewięć na dziesięć firm testuje AI przez rok i wraca do Excela. My nie wdrażamy eksperymentów - wdrażamy konkretne narzędzia dopasowane do Twoich procesów: asystentów dla zespołu, automatyzację komunikacji z klientami i analizę danych, która zastępuje ręczne raporty. Twój zespół zaczyna używać AI produktywnie od pierwszego tygodnia, bez miesięcy szkoleń.",
    features: ["Audyt gotowości firmy na AI", "Korporacyjna baza wiedzy AI", "Asystenci AI dla zespołu", "Automatyzacja komunikacji z klientami", "Analiza danych i raportowanie AI"],
    icon: "/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg"
  },
  {
    title: "Ruchome treści wizualne",
    tag: "Marka",
    slug: "/uslugi/ruchome-tresci",
    areaLabel: "TWOJA FABRYKA UWAGI",
    desc: "Ożywiamy biznes, tłumacząc skomplikowane idee językiem płynnego ruchu. Produkujemy fotorealistyczne animacje 3D, wideo szkoleniowe, angażujące formaty na Social Media oraz wirtualną rzeczywistość. Tworzymy dynamikę, która odciąża działy obsługi, zatrzymuje kciuk i zostaje w pamięci klientów na dłużej.",
    features: ["Animacje 2D i 3D", "Explainer Videos (Filmy instruktażowe)", "Social Media & Montaż Dynamiczny", "Wirtualna Rzeczywistość (VR) i Interakcja", "Motion Design w Interfejsach (UI)"],
    icon: "/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg"
  },
  {
    title: "Złoty numer",
    tag: "Rozpoznawalność",
    slug: "/uslugi/zloty-numer",
    areaLabel: "TWOJA LINIA PIERWSZEGO KONTAKTU",
    desc: "Numer telefonu to najkrótszy most między klientem a sprzedażą - pod warunkiem, że klient go pamięta. Złoty numer to narzędzie sprzedażowe, które wpisuje się z głowy, bez szukania w kontaktach. Pomagamy wybrać, zarejestrować i wdrożyć numer, który wzmacnia rozpoznawalność przy każdym kontakcie z marką - billboardzie, reklamie, wizytówce.",
    features: ["Spersonalizowany Złoty Numer", "Rejestracja, konfiguracja i przekazanie", "Integracja zaawansowanej centrali", "Wdrożenie we wszystkich kanałach", "System zaawansowanej analityki", "Automatyzacja CRM"],
    icon: "/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg"
  }
];

const RenderIcon = ({ icon, className }) => {
  if (typeof icon === 'string') {
    return (
      <div
        className={`${className} bg-current`}
        style={{
          maskImage: `url(${icon})`,
          WebkitMaskImage: `url(${icon})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      />
    );
  }
  const IconComponent = icon;
  return <IconComponent className={className} strokeWidth={1.5} />;
};

const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(null);
  const containerRef = useRef(null);
  const overlayTouchStart = useRef(null);

  const openService = (idx) => {
    setSelectedService(idx);
    setOverlayIndex(idx);
    if (window.innerWidth < 1024) {
      window.dispatchEvent(new CustomEvent('force-navbar-show'));
    }
  };

  const closeService = () => {
    setSelectedService(null);
    setOverlayIndex(null);
  };

  const handleOverlayTouchStart = (e) => {
    overlayTouchStart.current = e.touches[0].clientX;
  };

  const handleOverlayTouchEnd = (e) => {
    if (overlayTouchStart.current === null) return;
    const diff = overlayTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setOverlayIndex(prev => Math.min(prev + 1, servicesList.length - 1));
      else setOverlayIndex(prev => Math.max(prev - 1, 0));
    }
    overlayTouchStart.current = null;
  };

  // Scroll into view only on desktop — on mobile the overlay covers the whole screen
  useEffect(() => {
    if (selectedService !== null && containerRef.current && isDesktop) {
      setTimeout(() => {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 200);
    }
  }, [selectedService]);

  // Lock body scroll when mobile overlay is open — iOS Safari requires position:fixed
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (selectedService !== null && isMobile) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
    return () => {};
  }, [selectedService]);

  const sectionRef = useRef(null);
  // useScroll creates a scroll listener — only wire it up on desktop where it's used
  const { scrollYProgress } = useScroll(
    isDesktop ? { target: sectionRef, offset: ['start end', 'end start'] } : {}
  );
  const _deadValue = useMotionValue(0); // stable no-op for mobile
  const logoY = useTransform(isDesktop ? scrollYProgress : _deadValue, [0, 1], isDesktop ? [-150, -850] : [0, 0]);
  const logoRotate = useTransform(isDesktop ? scrollYProgress : _deadValue, [0, 1], isDesktop ? [-5, 15] : [0, 0]);

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('footer-cta');
    if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
  };

  const activeService = overlayIndex !== null ? servicesList[overlayIndex] : null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full bg-[linear-gradient(to_bottom,#1a1a1a_0%,#0c0c0c_100%)] py-20 md:py-32 px-2 md:px-6 flex justify-center relative overflow-x-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)'
      }}
    >
      {/* Dot grid — desktop only (never mounted on mobile — constant RAF loop) */}
      {isDesktop && <div className="absolute inset-0 hidden md:flex justify-center w-full h-full z-0 opacity-40">
        <div
          className="w-full h-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect'
          }}
        >
          <div
            className="w-full h-full"
            style={{
              maskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)'
            }}
          >
            <InteractiveDotGrid />
          </div>
        </div>
      </div>}

      <div className="max-w-[1640px] w-full flex flex-col items-center flex-1 relative z-[2]">

        {/* Header */}
        <motion.div
          className="w-full px-2 md:px-12 mb-12 md:mb-16 uppercase tracking-widest font-heading flex flex-col items-center text-center"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full relative flex flex-col justify-center items-center min-h-[100px] lg:min-h-[140px] mb-3 lg:mb-4">
            <div className="relative z-30 flex flex-col items-center isolate">
              <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Usługi</span>
              <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-normal tracking-tighter text-center leading-[0.9] uppercase">
                Co wdrażamy w Twojej firmie.
              </h2>
            </div>
            {/* Parallax logo — desktop only */}
            <motion.img
              src="/LOGO_3D_2.png"
              alt=""
              style={{ y: logoY, rotate: logoRotate }}
              className="hidden md:block absolute -right-20 md:-right-32 lg:-right-48 top-[75%] -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] h-auto z-0 pointer-events-none md:opacity-40 lg:opacity-100 object-contain"
            />
          </div>
          <p className="text-ivory/60 mt-4 text-base md:text-lg max-w-3xl normal-case tracking-normal text-center mx-auto leading-relaxed relative z-10">
            Nie doradzamy z boku. Instalujemy w Twojej firmie konkretne narzędzia i procesy - od nowoczesnego wizerunku po bezobsługową sprzedaż - które od pierwszego dnia pracują na Twój wynik.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative w-full flex-1 flex flex-col justify-center items-center">
          <div className="relative w-full">

            {/* GRID — 2 cols mobile, 2 cols md, 4 cols lg */}
            <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-4 w-full px-0 sm:px-4 md:px-8 lg:px-16 xl:px-32 auto-rows-max transition-all duration-700 relative z-30 ${selectedService !== null ? 'pointer-events-none' : ''}`}>
              {servicesList.map((service, idx) => {
                const isSelected = selectedService === idx;
                const isHidden = selectedService !== null && !isSelected;

                return (
                  <motion.div
                    layoutId={isDesktop ? `wrapper-${idx}` : undefined}
                    key={`base-card-${idx}`}
                    initial={{ opacity: 0, y: isDesktop ? 30 : 0 }}
                    animate={{ opacity: isHidden ? 0 : isSelected ? 0 : 1, y: 0 }}
                    transition={{
                      duration: isDesktop ? (isHidden ? 0.2 : 0.4) : 0,
                      delay: isDesktop && isHidden ? idx * 0.04 : 0,
                      layout: { duration: isSelected ? 1.0 : 0, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="group aspect-[4/5] sm:aspect-square w-full border border-white/5 bg-[#0c0c0c] p-3 sm:p-5 xl:p-8 flex flex-col justify-between md:hover:bg-accent md:hover:border-accent md:hover:-translate-y-2 cursor-pointer transition-[background-color,border-color,color] md:transition-all duration-300 overflow-hidden relative"
                    onClick={() => openService(idx)}
                  >
                    <div className="flex flex-col">
                      <motion.div layoutId={isDesktop ? `icon-${idx}` : undefined} className="mb-3 sm:mb-6 text-ivory/50 md:group-hover:text-obsidian transition-[background-color,border-color,color] duration-300">
                        <RenderIcon icon={service.icon} className="w-14 h-14 sm:w-16 sm:h-16 md:w-14 md:h-14 xl:w-20 xl:h-20" />
                      </motion.div>
                      <motion.h3 layoutId={isDesktop ? `title-${idx}` : undefined} className="text-ivory md:group-hover:text-obsidian transition-colors duration-500 font-heading font-light tracking-tight text-[17px] xs:text-[18px] sm:text-[20px] md:text-sm lg:text-xl xl:text-[22px] 2xl:text-[26px] uppercase leading-[1.1] relative z-10 break-words">
                        {service.title}
                      </motion.h3>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto pt-3 sm:pt-6 border-t border-white/5 md:group-hover:border-obsidian/10 transition-colors duration-500 relative z-10">
                      <div className="flex items-center gap-1.5 sm:gap-3 text-ivory/40 md:group-hover:text-obsidian transition-[background-color,border-color,color] duration-300">
                        <span className="font-heading text-[12px] sm:text-[14px] md:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase">WIĘCEJ</span>
                        <div className="w-4 sm:w-8 h-[1px] bg-current"></div>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-9 md:h-9 border border-white/10 md:group-hover:border-obsidian/30 flex items-center justify-center text-base sm:text-xl md:text-lg font-light text-ivory/30 md:group-hover:text-obsidian transition-[background-color,border-color,color] duration-300 shrink-0">
                        ＋
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* BACKDROP — desktop only */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-40 hidden md:block"
                  onClick={closeService}
                />
              )}
            </AnimatePresence>

            {/* MOBILE OVERLAY — portal to body, escapes mask-image stacking context */}
            {createPortal(
              <AnimatePresence>
              {selectedService !== null && activeService && (
                <motion.div
                  className="fixed top-0 left-0 right-0 bottom-0 z-[59] md:hidden flex flex-col"
                  style={{ background: '#0c0c0c' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onTouchStart={handleOverlayTouchStart}
                  onTouchEnd={handleOverlayTouchEnd}
                >
                  {/* Spacer matching navbar height — navbar (z-60) renders on top */}
                  <div className="h-[68px] shrink-0 border-b-2 border-accent/25" />

                  {/* Top bar */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-accent text-[11px] tracking-[0.25em]">
                        {String((overlayIndex ?? 0) + 1).padStart(2, '0')} / {String(servicesList.length).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-ivory/30 text-[10px] border border-white/10 px-2 py-0.5 uppercase tracking-widest">
                        {activeService.tag}
                      </span>
                    </div>
                    <button onClick={closeService} className="text-ivory/40 hover:text-ivory p-2 -mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto pb-8 no-scrollbar">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={overlayIndex}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.18 }}
                        className="px-5 pt-6"
                      >
                        {/* Icon + Title */}
                        <div className="flex items-center gap-4 mb-5">
                          <RenderIcon icon={activeService.icon} className="w-10 h-10 text-ivory/40 shrink-0" />
                          <h3 className="text-ivory font-heading font-light tracking-tight text-2xl uppercase leading-tight">
                            {activeService.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-ivory/60 text-sm leading-relaxed mb-7">
                          {activeService.desc}
                        </p>

                        {/* Features */}
                        <div className="flex flex-col gap-3 mb-8">
                          {activeService.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3 text-sm font-heading text-ivory/60">
                              <span className="font-mono text-accent text-[11px] shrink-0 mt-[2px] tracking-[0.2em]">
                                {String(fIdx + 1).padStart(2, '0')}
                              </span>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        {activeService.slug && (
                          <Link
                            to={activeService.slug}
                            onClick={closeService}
                            className="w-full py-4 bg-accent text-obsidian text-[11px] font-heading font-bold uppercase tracking-widest flex items-center justify-center gap-3 mb-2"
                          >
                            DOWIEDZ SIĘ WIĘCEJ
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                          </Link>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Wskaźnik stron (Slider Indicators) na dole */}
                  <div className="pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 shrink-0 bg-[#0c0c0c] border-t border-white/5 flex items-center justify-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {servicesList.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 transition-all duration-500 rounded-full ${i === overlayIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20'}`} 
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
              </AnimatePresence>,
              document.body
            )}

            {/* DESKTOP OVERLAY — layoutId expand */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  layoutId={`wrapper-${selectedService}`}
                  className="absolute top-0 left-2 right-2 lg:left-4 lg:right-4 z-50 overflow-hidden hidden md:block"
                  transition={{ layout: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
                  style={{
                    background: "rgba(12, 12, 12, 0.97)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <motion.div
                    layoutId={`icon-${selectedService}`}
                    className="absolute top-2 right-4 md:top-4 md:right-8 lg:top-4 lg:right-10 z-30 text-white/[0.07] pointer-events-none"
                  >
                    <RenderIcon icon={servicesList[selectedService].icon} className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 object-contain" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    className="relative z-10 w-full flex flex-col md:min-h-[620px]"
                  >
                    {/* Header */}
                    <div className="w-full p-8 md:p-12 lg:p-16 pb-10 md:pb-14 lg:pb-16 border-b border-white/5 flex flex-col relative z-20">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="font-mono text-accent text-[11px] tracking-[0.25em]">
                          {String(selectedService + 1).padStart(2, '0')} / 08
                        </span>
                        <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase border border-white/10 px-2 py-0.5">
                          {servicesList[selectedService].tag}
                        </span>
                      </div>
                      <motion.h3
                        layoutId={`title-${selectedService}`}
                        className="text-ivory font-heading font-light tracking-tighter text-5xl lg:text-[4.5rem] xl:text-[5.5rem] uppercase leading-[0.9] w-full text-left"
                      >
                        {servicesList[selectedService].title}
                      </motion.h3>
                    </div>

                    <div className="flex flex-col md:flex-row flex-1">
                      {/* Left: features */}
                      <div className="md:w-[40%] xl:w-[35%] p-8 md:p-12 lg:p-16 flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative z-10">
                        <div className="flex flex-col gap-4 mt-auto">
                          {servicesList[selectedService].features.map((feat, fIdx) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.45 + (fIdx * 0.1) }}
                              key={fIdx}
                              className="flex items-start gap-4 text-sm font-heading text-ivory/60"
                            >
                              <span className="font-mono text-accent text-[11px] tracking-[0.2em] shrink-0 mt-[3px]">
                                {String(fIdx + 1).padStart(2, '0')}
                              </span>
                              <span className="leading-snug">{feat}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Right: desc + buttons */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.45 } }}
                        className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-end relative z-10"
                      >
                        <div className="mb-6 md:mb-8">
                          <p className="font-sans text-ivory/65 text-base md:text-lg xl:text-xl leading-relaxed">
                            {servicesList[selectedService].desc}
                          </p>
                        </div>

                        <div className="hidden md:flex flex-col sm:flex-row gap-3 pt-8 border-t border-white/5">
                          <button
                            onClick={(e) => { e.stopPropagation(); closeService(); }}
                            className="group py-4 px-8 bg-white/5 border border-white/10 text-[11px] font-heading font-bold uppercase tracking-widest text-ivory/70 transition-all duration-300 hover:border-ivory/20 hover:bg-white/10 flex items-center justify-center gap-3"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="m15 18-6-6 6-6" /></svg>
                            WRÓĆ
                          </button>
                          {servicesList[selectedService].slug ? (
                            <Link
                              to={servicesList[selectedService].slug}
                              onClick={(e) => e.stopPropagation()}
                              className="group relative overflow-hidden py-4 px-10 bg-accent text-obsidian text-[11px] font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 flex-1 text-center flex items-center justify-center gap-3"
                            >
                              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
                              <span className="relative z-10 flex items-center gap-3">
                                DOWIEDZ SIĘ WIĘCEJ
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                              </span>
                            </Link>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); scrollToCTA(); }}
                              className="group relative overflow-hidden py-4 px-10 bg-accent text-obsidian text-[11px] font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 flex-1 text-center"
                            >
                              <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 group-hover:left-[150%] pointer-events-none" />
                              <span className="relative z-10">ZAREZERWUJ KONSULTACJĘ</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
