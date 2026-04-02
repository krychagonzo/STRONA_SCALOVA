import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('footer-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full bg-[linear-gradient(to_bottom,transparent_0%,#0c0c0c_15%,#0c0c0c_85%,transparent_100%)] py-32 px-6 flex justify-center relative overflow-x-hidden">



      <div className="max-w-[1440px] w-full flex flex-col items-center flex-1 relative z-[2]">

        {/* Header - ukrywa się powoli gdy jesteśmy w detalach */}
        <motion.div
          className="text-center mb-16 uppercase tracking-widest font-heading px-6"
          animate={{ opacity: selectedService !== null ? 0.2 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-ivory text-3xl md:text-5xl font-bold mb-4">
            OBSZARY NASZEGO WSPARCIA
          </h2>
          <p className="text-ivory/50 mt-6 text-sm max-w-2xl mx-auto normal-case tracking-normal">Nie doradzamy z boku. Instalujemy w Twojej firmie konkretne narzędzia i procesy – od nowoczesnego wizerunku po bezobsługową sprzedaż – które od pierwszego dnia pracują na Twój wynik.</p>
        </motion.div>

        {/* Dynamiczny Kontener - Animacja Przejścia */}
        <div ref={containerRef} className="relative w-full flex-1 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {selectedService === null ? (
              // GRID VIEW
              <motion.div
                key="grid"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-2 lg:px-4"
              >
                {servicesList.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      layoutId={`service-card-${idx}`}
                      key={idx}
                      variants={item}
                      className="group h-full w-full rounded-none border border-slate/50 bg-[#131313] shadow-xl p-8 flex flex-col transition-all duration-500 hover:bg-accent hover:border-obsidian/20 relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedService(idx)}
                    >
                      {/* Ikona SVG (Lucide) */}
                      <motion.div
                        layoutId={`service-icon-${idx}`}
                        className="mb-8 text-ivory/40 group-hover:text-obsidian/70 transition-all duration-500"
                      >
                        <Icon className="w-10 h-10" strokeWidth={1.5} />
                      </motion.div>

                      <motion.h3 layoutId={`service-title-${idx}`} className="text-ivory group-hover:text-obsidian transition-colors duration-500 font-heading font-bold text-lg mb-4 uppercase tracking-widest h-20 leading-tight">
                        {service.title}
                      </motion.h3>

                      <p className="font-heading text-ivory/50 group-hover:text-obsidian/80 text-xs leading-relaxed h-16 transition-colors duration-500">
                        {service.desc}
                      </p>

                      <button
                        className="self-start py-2.5 px-6 border border-slate/50 text-xs font-heading font-medium uppercase tracking-widest text-ivory/60 rounded-lg transition-all duration-500 group-hover:border-obsidian/30 group-hover:text-obsidian mt-auto relative z-10"
                      >
                        PODGLĄD
                      </button>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              // EXPANDED DETAILS VIEW
              <motion.div
                layoutId={`service-card-${selectedService}`}
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full relative rounded-none p-8 md:p-14 lg:p-20 flex flex-col md:flex-row gap-12 lg:gap-24 transition-all shadow-[0_0_80px_rgba(212,255,0,0.08)_inset] overflow-hidden"
                style={{
                  background: "rgba(20, 20, 20, 0.4)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderTop: "1px solid rgba(212,255,0,0.3)",
                  borderLeft: "1px solid rgba(212,255,0,0.3)"
                }}
              >
                {/* Ozdobne cyber-linie w narożnikach pełnego okna */}
                <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0"></div>
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0"></div>

                {/* Lewa kolumna: tytuł i checkmarki */}
                <div className="flex-1 flex flex-col relative z-10">
                  <motion.div layoutId={`service-icon-${selectedService}`} className="mb-6 md:mb-10 text-accent drop-shadow-[0_0_15px_rgba(212,255,0,0.6)]">
                    {React.createElement(servicesList[selectedService].icon, { className: "w-14 h-14", strokeWidth: 1.5 })}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                    className="font-heading font-light text-accent/80 text-xs tracking-[0.2em] mb-4 border border-accent/20 bg-accent/5 inline-block self-start px-3 py-1"
                  >
                    SEKCJA WDROŻENIOWA
                  </motion.div>
                  <motion.h3 layoutId={`service-title-${selectedService}`} className="text-ivory font-heading font-black text-3xl md:text-5xl mb-8 uppercase tracking-widest text-balance leading-tight">
                    {servicesList[selectedService].title}
                  </motion.h3>

                  <div className="flex flex-col gap-5 border-t border-slate/40 pt-8 mt-auto">
                    {servicesList[selectedService].features.map((feat, fIdx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (fIdx * 0.1) }}
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
                <div className="flex-[1.2] flex flex-col justify-center relative z-10 pt-4 md:pt-[104px]">
                  <div className="mb-14">
                    <h4 className="font-heading font-bold text-xl text-ivory mb-6 tracking-wide uppercase border-l-2 border-accent pl-4">Opis Obszaru Operacyjnego</h4>
                    <p className="font-sans text-ivory/70 text-lg md:text-[19px] leading-relaxed text-balance">
                      {servicesList[selectedService].extendedDesc}
                    </p>
                  </div>

                  {/* Przyciski Akcji */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="group py-4 px-8 bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-heading font-bold uppercase tracking-widest text-ivory/80 rounded-lg transition-all duration-300 hover:border-ivory/30 hover:bg-white/10 flex-1 sm:flex-none flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6" /></svg>
                      WRÓC
                    </button>
                    <button
                      onClick={scrollToCTA}
                      className="py-4 px-8 bg-accent text-obsidian text-sm font-heading font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.4)] hover:-translate-y-1 flex-1 sm:flex-[2] text-center"
                    >
                      ZAREZERWUJ KONSULTACJĘ
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
