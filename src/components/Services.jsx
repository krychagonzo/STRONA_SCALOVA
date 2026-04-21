import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InteractiveDotGrid from './ui/InteractiveDotGrid';
import { Globe, Megaphone, MonitorPlay, Settings, TrendingUp, Cpu, Palette, Phone } from 'lucide-react';

const servicesList = [
  {
    title: "Strona & AI-asystent",
    tag: "Web",
    slug: "/uslugi/strona-ai",
    areaLabel: "INFRASTRUKTURA POZYSKIWANIA LEADÓW",
    desc: "Zamiast strony, która tylko wygląda - platforma, która pozyskuje leady 24/7, nawet gdy śpisz.",
    extendedDesc: "Większość stron firmowych istnieje tylko po to, żeby istnieć.\n\nTwoja będzie pracować - kwalifikować zapytania, zbierać dane kontaktowe i odpowiadać na pytania klientów o 3 w nocy.\n\nProjektujemy platformy, które ładują się w mniej niż 1,5 sekundy i zamieniają ruch w realne leady, zanim Ty zdążysz otworzyć skrzynkę mailową.",
    features: ["Strona ładuje się w <1,5s - poniżej progu porzuceń", "Chatbot zbiera i kwalifikuje leady zanim Ty otworzysz maila"],
    metricContent: "Chatbot kwalifikuje zapytania zanim Ty je zobaczysz. Ładowanie <1,5s.",
    icon: "/SEKCJA_USLUGI/IKONA_STRONA_AI.svg"
  },
  {
    title: "Kampanie & Organic",
    tag: "Performance",
    slug: "/uslugi/kampanie",
    areaLabel: "TWÓJ SILNIK WZROSTU",
    desc: "Zamiast budżetu wrzuconego w reklamę - każda złotówka śledzona do konkretnej sprzedaży.",
    extendedDesc: "Większość agencji optymalizuje pod kliknięcia. My optymalizujemy pod pieniądze.\n\nKażda kampania jest śledzona do sprzedaży, nie do zasięgu.\n\nŁączymy płatną dystrybucję z organicznym wzrostem - żeby każda złotówka pracowała na wynik, a nie na wykres, którym można się pochwalić na spotkaniu.",
    features: ["Każda złotówka budżetu śledzona do konkretnej sprzedaży", "Płatna dystrybucja i organiczny zasięg w jednej strategii"],
    metricContent: "Optymalizacja pod ROAS, nie pod kliknięcia. Raporty co tydzień.",
    icon: "/SEKCJA_USLUGI/IKONA_KAMPANIE_ORGANIC.svg"
  },
  {
    title: "Statyczne treści wizualne",
    tag: "Wizerunek",
    slug: "/uslugi/statyczne-tresci",
    areaLabel: "SYSTEM BUDOWANIA AUTORYTETU",
    desc: "Zamiast postów 'dla algorytmu' - materiały, które ustawiają Cię jako oczywisty wybór w branży.",
    extendedDesc: "Algorytmy faworyzują regularność. Klienci faworyzują wiarygodność.\n\nTworzymy statyczne treści wizualne, które robią jedno i drugie jednocześnie - budują Twoją pozycję eksperta i są projektowane pod konkretne formaty dystrybucji.\n\nNie produkujemy contentu dla samego contentu. Każdy materiał ma cel: zaufanie, zasięg albo sprzedaż.",
    features: ["Content projektowany pod cel - nie pod algorytm", "Spójna estetyka eksperta we wszystkich kanałach"],
    metricContent: "Pozycja eksperta budowana regularnym contentem opartym na danych.",
    icon: "/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg"
  },
  {
    title: "Automatyzacje",
    tag: "Operacje",
    slug: "/uslugi/automatyzacje",
    areaLabel: "TWÓJ BEZOSOBOWY BACK-OFFICE",
    desc: "Zamiast 5 aplikacji, które ze sobą nie gadają - jeden system, który działa bez Twojego udziału.",
    extendedDesc: "Większość firm traci codziennie godziny na ręczne przepisywanie danych między aplikacjami, które nigdy nie były zaprojektowane do współpracy.\n\nAudytujemy Twoje procesy, identyfikujemy punkty tarcia i budujemy system, który łączy CRM, fakturowanie i raportowanie w jeden sprawnie działający przepływ.\n\nBez programistów, bez chaosu, od pierwszego tygodnia.",
    features: ["CRM, faktury i raporty w jednym automatycznym przepływie", "Zero ręcznej pracy przy powtarzalnych procesach"],
    metricContent: "Łączymy CRM, faktury, powiadomienia i raporty w jedno.",
    icon: "/SEKCJA_USLUGI/IKONA_AUTOMATYZACJE.svg"
  },
  {
    title: "Sprzedaż & Oferta",
    tag: "Przychody",
    slug: "/uslugi/sprzedaz",
    areaLabel: "PRZEBUDOWA PROCESU ZAMYKANIA",
    desc: "Zamiast ofert, które 'pójdą do akceptacji' - pitch, który zamyka na pierwszym spotkaniu.",
    extendedDesc: "Słaba oferta to nie problem graficzny - to problem struktury argumentacji.\n\nPrzebudowujemy Twój pitch od podstaw: zaczynamy od zrozumienia, dlaczego klienci kupują (albo nie), a kończymy na materiale handlowym i przeszkolonym zespole, który wie jak go używać.\n\nEfekt: wyższy win-rate przy tych samych leadach.",
    features: ["Oferta przepisana pod psychologię decyzji zakupowych", "Zespół handlowy przeszkolony z mierzalnym efektem"],
    metricContent: "Szkolenie + przebudowa oferty pod wyższy win-rate.",
    icon: "/SEKCJA_USLUGI/IKONA_SPRZEDAZ_OFERTA.svg"
  },
  {
    title: "AI w firmie",
    tag: "Technologia",
    slug: "/uslugi/ai-w-firmie",
    areaLabel: "TWOJA PRZEWAGA TECHNOLOGICZNA",
    desc: "Zamiast 'eksperymentowania z AI' - konkretne narzędzia działające w Twoich procesach od pierwszego tygodnia.",
    extendedDesc: "Dziewięć na dziesięć firm 'eksperymentuje z AI' przez rok i wraca do Excela.\n\nWdrażamy konkretne narzędzia dopasowane do Twoich procesów - od automatyzacji komunikacji z klientami, przez analizę danych, po asystentów dla Twojego zespołu.\n\nBez miesięcy szkoleń, bez przestojów. Twój zespół zaczyna używać AI produktywnie od pierwszego tygodnia.",
    features: ["Narzędzia AI dopasowane do Twoich procesów - nie szablonowe", "Zespół produktywny z AI od pierwszego tygodnia"],
    metricContent: "Wdrożenie bez chaosu. Twój zespół wie jak używać, nie tylko co to jest.",
    icon: "/SEKCJA_USLUGI/IKONA_AI_FIRMA.svg"
  },
  {
    title: "Ruchome treści wizualne",
    tag: "Marka",
    slug: "/uslugi/ruchome-tresci",
    areaLabel: "TWOJA FABRYKA UWAGI",
    desc: "Zamiast materiałów 'do wrzucenia' - wideo, które zatrzymuje kciuk i zostaje w głowie.",
    extendedDesc: "W świecie krótkiej uwagi wideo jest walutą.\n\nTworzymy ruchome treści wizualne - od reelsów i shortów po animacje produktowe - które zatrzymują kciuk w połowie przewijania i sprawiają, że marka zapada w pamięć, zanim klient zdąży pomyśleć 'skip'.\n\nKażdy materiał zoptymalizowany pod konkretny format i cel dystrybucji.",
    features: ["Reelsy, shorty i animacje zoptymalizowane pod każdą platformę", "Scenariusze pisane pod psychologię zatrzymania uwagi"],
    metricContent: "Pełna księga znaku + wytyczne dla każdego touchpointu.",
    icon: "/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg"
  },
  {
    title: "Złoty numer",
    tag: "Rozpoznawalność",
    slug: "/uslugi/zloty-numer",
    areaLabel: "TWOJA LINIA PIERWSZEGO KONTAKTU",
    desc: "Zamiast numeru, który gubi się w historii połączeń — jeden symbol, który klient wpisuje z pamięci.",
    extendedDesc: "Telefon nadal jest najszybszym mostem między klientem a sprzedażą.\n\nZłoty numer to narzędzie sprzedażowe, które klient pamięta bez zapisywania w kontaktach.\n\nPomagamy wybrać, zarejestrować i wdrożyć numer, który wzmacnia rozpoznawalność przy każdym touchpoincie - billboardzie, reklamie, wizytówce.",
    features: ["Numer, który klient pamięta bez zapisywania w kontaktach", "Rozpoznawalność marki wzmocniona na każdym kroku."],
    metricContent: "Kluczowy punkt styku z marką. Zapada w pamięć, zanim klient zdąży zapisać kontakt.",
    icon: "/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg"
  }
];

const RenderIcon = ({ icon, className, strokeWidth = 1.5 }) => {
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
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedService !== null && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [selectedService]);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [-150, -850]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('footer-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="w-full bg-[linear-gradient(to_bottom,#1a1a1a_0%,#0c0c0c_100%)] py-32 px-6 flex justify-center relative overflow-x-hidden"
      style={{ 
        maskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 80px, black calc(100% - 150px), transparent)'
      }}
    >
      {/* Interactive Radial Dot Matrix Background */}
      <div className="absolute inset-0 flex justify-center w-full h-full z-0 opacity-40">
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
      </div>


      <div className="max-w-[1640px] w-full flex flex-col items-center flex-1 relative z-[2]">

        {/* Header - ukrywa się powoli gdy jesteśmy w detalach */}
        <motion.div
          className="w-full px-6 md:px-12 mb-16 uppercase tracking-widest font-heading flex flex-col items-center text-center"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full relative flex flex-col justify-center items-center min-h-[100px] lg:min-h-[140px] mb-3 lg:mb-4">
            <div className="relative z-30 flex flex-col items-center isolate">
              <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-4 block">Usługi</span>
              <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
                Co wdrażamy w Twojej firmie.
              </h2>
            </div>
            <motion.img 
              src="/LOGO_3D_2.png" 
              alt="" 
              style={{ y: logoY, rotate: logoRotate }}
              className="absolute -right-20 md:-right-32 lg:-right-48 top-[75%] -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] h-auto z-0 pointer-events-none opacity-20 md:opacity-40 lg:opacity-100 object-contain" 
            />
          </div>
          <p className="text-ivory/60 mt-4 text-base md:text-lg max-w-3xl normal-case tracking-normal text-center mx-auto leading-relaxed relative z-10">
            Nie doradzamy z boku. Instalujemy w Twojej firmie konkretne narzędzia i procesy - od nowoczesnego wizerunku po bezobsługową sprzedaż - które od pierwszego dnia pracują na Twój wynik.
          </p>
        </motion.div>

        {/* Dynamiczny Kontener - Animacja Przejścia */}
        <div ref={containerRef} className="relative w-full flex-1 flex flex-col justify-center items-center">
          <div className="relative w-full">
            
            {/* BAZOWA SIATKA (W TLE) */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-32 auto-rows-max transition-all duration-700 relative z-30 ${selectedService !== null ? "pointer-events-none" : ""}`}>
              {servicesList.map((service, idx) => {
                const isSelected = selectedService === idx;
                const isHidden = selectedService !== null && !isSelected;

                return (
                  <motion.div
                    layoutId={`wrapper-${idx}`}
                    key={`base-card-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isHidden ? 0 : isSelected ? 0 : 1, y: 0 }}
                    transition={{ 
                      duration: isHidden ? 0.2 : 0.4, 
                      delay: isHidden ? idx * 0.04 : 0,
                      layout: { duration: isSelected ? 1.0 : 0, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="group aspect-square w-full rounded-none border border-white/5 bg-[#0c0c0c] p-6 xl:p-8 flex flex-col justify-between hover:bg-accent hover:border-accent hover:-translate-y-2 cursor-pointer transition-all duration-500 overflow-hidden relative"
                    onClick={() => setSelectedService(idx)}
                  >
                    <div className="flex flex-col">
                      <motion.div layoutId={`icon-${idx}`} className="mb-8 text-ivory/50 group-hover:text-obsidian transition-all duration-500">
                        <RenderIcon icon={service.icon} className="w-16 h-16 xl:w-20 xl:h-20" strokeWidth={1.5} />
                      </motion.div>
                      <motion.h3 layoutId={`title-${idx}`} className="text-ivory group-hover:text-obsidian transition-colors duration-500 font-heading font-light tracking-tight text-xl md:text-2xl xl:text-[28px] uppercase leading-tight relative z-10">
                        {service.title}
                      </motion.h3>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto pt-6 border-t border-white/5 group-hover:border-obsidian/10 transition-colors duration-500 relative z-10">
                      <div className="flex items-center gap-3 text-ivory/40 group-hover:text-obsidian transition-all duration-500 transition-transform group-hover:translate-x-1">
                        <span className="font-heading text-[10px] tracking-[0.3em] uppercase">WIĘCEJ</span>
                        <div className="w-8 h-[1px] bg-current"></div>
                      </div>
                      <div className="w-9 h-9 border border-white/10 group-hover:border-obsidian/30 flex items-center justify-center text-lg font-light text-ivory/30 group-hover:text-obsidian transition-all duration-500">
                        ＋
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CLICK OUTSIDE BACKDROP */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-40"
                  onClick={() => setSelectedService(null)}
                />
              )}
            </AnimatePresence>

            {/* OVERLAY: POWIĘKSZONY KAFELEK — Proposal B "Command Center" */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  layoutId={`wrapper-${selectedService}`}
                  className="absolute top-0 left-2 right-2 lg:left-4 lg:right-4 z-50 overflow-hidden"
                  transition={{ layout: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
                  style={{
                    background: "rgba(12, 12, 12, 0.97)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 0 80px rgba(201,168,76,0.04) inset",
                  }}
                >
                  {/* WATERMARK: ta sama ikona serwisu — duża, w tle */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: '-20px',
                      left: '-20px',
                      width: '300px',
                      height: '300px',
                      background: 'rgba(250,248,245,0.055)',
                      maskImage: `url(${servicesList[selectedService].icon})`,
                      WebkitMaskImage: `url(${servicesList[selectedService].icon})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  />


                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    className="relative z-10 w-full flex flex-col md:flex-row md:min-h-[620px]"
                  >
                    {/* LEWA KOLUMNA — 1/3 */}
                    <div className="md:w-[38%] p-8 md:p-12 lg:p-16 flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative">

                      {/* Mała aktywna ikona */}
                      <motion.div layoutId={`icon-${selectedService}`} className="mb-8 text-ivory/60">
                        <RenderIcon icon={servicesList[selectedService].icon} className="w-14 h-14 md:w-16 md:h-16" strokeWidth={1.5} />
                      </motion.div>

                      {/* Numer seryjny + tag */}
                      <div className="flex items-center gap-4 mb-5">
                        <span className="font-mono text-accent text-[11px] tracking-[0.25em]">
                          {String(selectedService + 1).padStart(2, '0')} / 08
                        </span>
                        <span className="font-mono text-ivory/30 text-[10px] tracking-[0.2em] uppercase border border-white/10 px-2 py-0.5">
                          {servicesList[selectedService].tag}
                        </span>
                      </div>

                      {/* Tytuł */}
                      <motion.h3
                        layoutId={`title-${selectedService}`}
                        className="text-ivory font-heading font-bold tracking-tighter text-2xl md:text-3xl lg:text-[2.2rem] uppercase leading-[0.95] text-balance"
                      >
                        {servicesList[selectedService].title}
                      </motion.h3>

                      {/* Checkmarki */}
                      <div className="flex flex-col gap-4 border-t border-white/5 pt-7 mt-auto">
                        {servicesList[selectedService].features.map((feat, fIdx) => (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 + (fIdx * 0.1) }}
                            key={fIdx}
                            className="flex items-start gap-3 text-sm font-heading text-ivory/55"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-accent shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(201,168,76,0.5)]">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{feat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* PRAWA KOLUMNA — 2/3 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.45 } }}
                      className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-end"
                    >
                      {/* Dolna część: label + skrócony opis — przyklejone do dołu */}
                      <div className="mb-8">
                        <h4 className="font-heading font-bold text-[11px] uppercase tracking-[0.3em] text-ivory/80 mb-6 pl-4 border-l-2 border-accent">
                          {servicesList[selectedService].areaLabel}
                        </h4>
                        <p className="font-sans text-ivory/65 text-lg md:text-xl leading-relaxed">
                          {servicesList[selectedService].desc}
                        </p>
                      </div>

                      {/* Przyciski */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-white/5">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedService(null); }}
                          className="group py-4 px-8 bg-white/5 border border-white/10 text-[11px] font-heading font-bold uppercase tracking-widest text-ivory/70 transition-all duration-300 hover:border-ivory/20 hover:bg-white/10 flex items-center justify-center gap-3"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
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
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
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
