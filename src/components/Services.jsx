import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InteractiveDotGrid from './ui/InteractiveDotGrid';
import { Globe, Megaphone, MonitorPlay, Settings, TrendingUp, Cpu, Palette, Phone } from 'lucide-react';

const servicesList = [
  {
    title: "Platformy Web & AI Chatboty",
    desc: "Nieziemsko szybkie witryny ze zintegrowanymi asystentami wyłapującymi leady 24/7.",
    features: ["Błyskawiczne ładowanie UX/UI", "Autonomiczna kwalifikacja zapytań", "Architektura najwyższej konwersji"],
    extendedDesc: "Projektujemy środowiska internetowe, które działają jak Twoi najlepsi handlowcy. Budujemy bezkompromisowe i szybkie platformy wyposażone w dedykowane modele AI. Asystent automatycznie opiekuje się odwiedzającymi, odpowiada na techniczne pytania i kwalifikuje leady, zamieniając stronę w maszynę do wyników.",
    icon: Globe
  },
  {
    title: "Kampanie reklamowe i posty organiczne",
    desc: "Precyzyjnie celowane reklamy optymalizowane pod jak najwyższy zwrot (ROI).",
    features: ["Maksymalizacja ROAS w Ads", "Retargeting wielokanałowy", "Budowa organicznego zaangażowania"],
    extendedDesc: "Przepalamy kompromisy, nie budżety reklamowe. Tworzymy i bezwzględnie optymalizujemy kampanie w środowiskach Meta oraz Google. Jednocześnie spójnie prowadzimy kanały organiczne, trafiając wyłącznie do osób o najwyższej intencji zakupowej.",
    icon: Megaphone
  },
  {
    title: "Content & Kreacje wizualne",
    desc: "Uderzające produkcje i grafiki budujące status niepodważalnego lidera.",
    features: ["Profesjonalne wideo promocyjne", "Wysokiej klasy fotografia cyfrowa", "Content na media społecznościowe"],
    extendedDesc: "Jeśli nie przykujesz uwagi klienta w 3 sekundy, tracisz go bezpowrotnie. Tworzymy absolutnie światowej klasy materiały wideo, spójny content reklamowy i wizualizacje, które w ułamku sekundy budują w podświadomości klienta autorytet, usprawiedliwiając rynkowe pozycjonowanie premium.",
    icon: MonitorPlay
  },
  {
    title: "Automatyzacje procesów wewnętrznych",
    desc: "Połączenie rozproszonych aplikacji w jeden, bezbłędny, bezobsługowy organizm.",
    features: ["Integracje API i Webhooks", "Eliminacja przepisywania danych", "Oszczędność tysięcy godzin rocznie"],
    extendedDesc: "Zdejmij z zespołu żmudną, wyniszczającą pracę operacyjną. Tworzymy niewidzialne mosty systemowe. Faktury wysyłane z automatu? Leady automatycznie przypisywane do kalendarza CRM odpowiedniego handlowca? Wszystko procesowane jest 24/7 na backendzie.",
    icon: Settings
  },
  {
    title: "Szkolenia sprzedażowe i optymalizacja ofert",
    desc: "Edukacja zespołu i układanie ofert, podnoszące statystyki zamykanych transakcji.",
    features: ["Skrypty i protokoły handlowe", "Warsztaty zamykania procesów", "Redesign ofert (Pitch Deck)"],
    extendedDesc: "Szkolimy Twoje kadry do bezwzględnego egzekwowania celów finansowych. Dostarczamy twarde procedury rozmów B2B oraz strukturyzujemy proces przygotowywania ofert. Standardowy plik PDF zmieniamy w interaktywną pułapkę konwersyjną, której nikt nie odmówi.",
    icon: TrendingUp
  },
  {
    title: "Wdrażanie AI do firm",
    desc: "Bezproblemowa implementacja sztucznej inteligencji napędzającej rynkową przewagę.",
    features: ["Modele językowe LLM", "Chatboty asystenckie B2B", "Analiza big data na życzenie"],
    extendedDesc: "Nie pozwól systemom opartym na sztucznej inteligencji stać się wyłącznie przewagą Twojej konkurencji. Wprowadzamy w Twoje szeregi potężne narzędzia AI, które redukują zapotrzebowanie na powtarzalną pracę operacyjną, tną koszty i pomagają analizować rynkowe wzorce.",
    icon: Cpu
  },
  {
    title: "Identyfikacje wizualne",
    desc: "Księgi znaku i bezkompromisowy branding do pozycjonowania marek High-End.",
    features: ["Unikalne, ponadczasowe logo", "Katalogi do spójności Brand Book", "Pełna kolorystyka i fonty"],
    extendedDesc: "W świecie szybkich decyzji, profesjonalizm poznaje się po okładce. Opracowujemy totalną spójność wizualną całej firmy. Prestiżowy i surowy branding oddzielający na pierwszy rzut oka markę wybitną od amatorskiej konkurencji.",
    icon: Palette
  },
  {
    title: "Złoty numer",
    desc: "Bezpośredni i natychmiastowo zapadający w pamięć kluczowy punkt styku z marką.",
    features: ["Zapamiętywalność numeru VIP", "Budowa natychmiastowej wielkości", "Zaufanie w B2B"],
    extendedDesc: "Złote, powtarzalne numery telefoniczne są ułamkiem budowania monumentalnego wizerunku wielkiej stabilnej firmy. Klienci intuicyjnie bardziej ufają organizacjom, które pod każdym możliwym względem komunikacyjnym okazują rzetelność, profesjonalizm i dbają o prestiż na pierwszej linii frontu.",
    icon: Phone
  }
];

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
        maskImage: 'linear-gradient(to bottom, transparent, black 300px, black calc(100% - 150px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 300px, black calc(100% - 150px), transparent)'
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
          animate={{ opacity: selectedService !== null ? 0.2 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full relative flex flex-col justify-center items-center min-h-[100px] lg:min-h-[140px] mb-8 lg:mb-12">
            <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] 2xl:text-[68px] font-heading font-bold tracking-tighter text-center leading-[0.9] relative z-10 pointer-events-none w-full uppercase">
              OBSZARY NASZEGO WSPARCIA
            </h2>
            <motion.img 
              src="/LOGO_3D.png" 
              alt="" 
              style={{ y: logoY, rotate: logoRotate }}
              className="absolute -right-20 md:-right-32 lg:-right-48 top-[75%] -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[800px] xl:w-[1000px] h-auto z-0 pointer-events-none opacity-20 md:opacity-40 lg:opacity-100 object-contain" 
            />
          </div>
          <p className="text-ivory/70 mt-6 text-base md:text-lg xl:text-xl max-w-4xl normal-case tracking-normal text-center mx-auto leading-relaxed relative z-10">
            Nie doradzamy z boku. Instalujemy w Twojej firmie konkretne narzędzia i procesy – od nowoczesnego wizerunku po bezobsługową sprzedaż – które od pierwszego dnia pracują na Twój wynik.
          </p>
        </motion.div>

        {/* Dynamiczny Kontener - Animacja Przejścia */}
        <div ref={containerRef} className="relative w-full flex-1 flex flex-col justify-center items-center">
          <div className="relative w-full">
            
            {/* BAZOWA SIATKA (W TLE) */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full px-6 md:px-12 auto-rows-max transition-all duration-700 relative z-30 ${selectedService !== null ? "pointer-events-none" : ""}`}>
              {servicesList.map((service, idx) => {
                const Icon = service.icon;
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
                      <motion.div layoutId={`icon-${idx}`} className="mb-8 text-ivory/40 group-hover:text-obsidian transition-all duration-500">
                        <Icon className="w-10 h-10 xl:w-12 xl:h-12" strokeWidth={1.5} />
                      </motion.div>
                      <motion.h3 layoutId={`title-${idx}`} className="text-ivory group-hover:text-obsidian transition-colors duration-500 font-heading font-light tracking-tight text-xl md:text-2xl xl:text-[28px] uppercase leading-tight relative z-10">
                        {service.title}
                      </motion.h3>
                    </div>

                    <div className="flex items-center gap-2 text-ivory/30 group-hover:text-obsidian transition-all duration-500 mt-8 relative z-10 transition-transform group-hover:translate-x-1">
                      <span className="font-heading text-[10px] tracking-[0.3em] uppercase">WIĘCEJ</span>
                      <div className="w-6 h-[1px] bg-current"></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* OVERLAY: POWIĘKSZONY KAFELEK */}
            <AnimatePresence>
              {selectedService !== null && (
                <motion.div
                  layoutId={`wrapper-${selectedService}`}
                  className="absolute top-0 left-2 right-2 lg:left-4 lg:right-4 z-50 p-8 md:p-14 lg:p-20 flex flex-col md:flex-row gap-12 lg:gap-24 shadow-[0_0_80px_rgba(212,255,0,0.08)_inset] overflow-hidden"
                  transition={{ layout: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
                  style={{
                    background: "rgba(12, 12, 12, 0.95)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    borderLeft: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    className="w-full flex justify-between flex-col md:flex-row gap-12 lg:gap-24 relative z-10"
                  >
                    {/* Ozdobne cyber-linie w narożnikach */}
                    <div className="absolute -top-20 -right-20 w-[1px] h-32 bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0"></div>
                    <div className="absolute -bottom-20 -left-20 w-32 h-[1px] bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0"></div>

                    {/* Lewa kolumna: logotyp, title, checkmarki */}
                    <div className="flex-1 flex flex-col relative z-10">
                      <motion.div layoutId={`icon-${selectedService}`} className="mb-6 md:mb-10 text-accent drop-shadow-[0_0_15px_rgba(212,255,0,0.6)]">
                        {React.createElement(servicesList[selectedService].icon, { className: "w-14 h-14", strokeWidth: 1.5 })}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                        className="font-heading font-light text-accent/80 text-xs tracking-[0.2em] mb-4 border border-accent/20 bg-accent/5 inline-block self-start px-3 py-1"
                      >
                        SEKCJA WDROŻENIOWA
                      </motion.div>
                      
                      <motion.h3 layoutId={`title-${selectedService}`} className="text-ivory font-heading font-light tracking-tight text-3xl md:text-5xl mb-8 uppercase text-balance leading-tight">
                        {servicesList[selectedService].title}
                      </motion.h3>

                      <div className="flex flex-col gap-5 border-t border-slate/40 pt-8 mt-auto">
                        {servicesList[selectedService].features.map((feat, fIdx) => (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (fIdx * 0.1) }}
                            key={fIdx}
                            className="flex items-center gap-4 text-base font-heading font-medium text-ivory/90"
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="text-accent shrink-0 drop-shadow-[0_0_8px_rgba(212,255,0,0.4)]">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{feat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Prawa kolumna: Rozbudowany opis + przyciski */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                        className="flex-[1.2] flex flex-col justify-center relative z-10 pt-4 md:pt-[104px]"
                    >
                      <div className="mb-14">
                        <h4 className="font-heading font-bold text-xl text-ivory mb-6 tracking-wide uppercase border-l-2 border-accent pl-4">Opis Obszaru Operacyjnego</h4>
                        <p className="font-sans text-ivory/70 text-lg md:text-[19px] leading-relaxed text-balance">
                          {servicesList[selectedService].extendedDesc}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedService(null); }}
                          className="group py-4 px-8 bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-heading font-bold uppercase tracking-widest text-ivory/80 rounded-lg transition-all duration-300 hover:border-ivory/30 hover:bg-white/10 flex-1 sm:flex-none flex items-center justify-center gap-3 relative overflow-hidden"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
                          WRÓĆ
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); scrollToCTA(); }}
                          className="group relative overflow-hidden py-4 px-8 bg-accent text-obsidian text-sm font-heading font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] hover:-translate-y-1 flex-1 sm:flex-[2] text-center"
                        >
                          <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] transition-all duration-1000 ease-in-out group-hover:left-[150%] z-0 pointer-events-none"></div>
                          <span className="relative z-10">ZAREZERWUJ KONSULTACJĘ</span>
                        </button>
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
