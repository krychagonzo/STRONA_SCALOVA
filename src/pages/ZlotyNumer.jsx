import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  {
    title: "Spersonalizowany Złoty Numer",
    desc: "Zaczynamy od audytu Twojej marki i specyfiki branży. Na tej podstawie dobieramy unikalny wzorzec cyfr, który fonetycznie i wizualnie wkleja się w pamięć Twojego idealnego klienta. To nie jest losowy wybór – to strategiczna decyzja wizerunkowa."
  },
  {
    title: "Rejestracja, konfiguracja i przekazanie",
    desc: "Przejmujemy 100% formalności. Reprezentujemy Cię przed operatorem telekomunikacyjnym, załatwiamy umowy, rejestrację i techniczne przypisanie numeru. Oszczędzasz czas i nerwy – dostajesz od nas numer gotowy do użycia."
  },
  {
    title: "Integracja zaawansowanej centrali (IVR i Routing)",
    desc: "Złoty numer to tylko front, pod spodem budujemy inteligentny silnik. Konfigurujemy profesjonalne zapowiedzi głosowe (IVR), okazjonalne komunikaty oraz precyzyjne przekierowania. Klient dzwoni na jeden prestiżowy numer, a system automatycznie kieruje połączenie na numery komórkowe Twoich handlowców."
  },
  {
    title: "Strategiczne wdrożenie we wszystkich kanałach",
    desc: "Gotowy system wypuszczamy w świat. Planujemy podmianę numeru we wszystkich Twoich punktach styku z klientem: strona www, wizytówka Google, social media, billboardy czy flota samochodowa. Zapewniamy płynne przejście – bez ryzyka utraty choćby jednego dzwoniącego leada podczas zmiany."
  },
  {
    title: "System zaawansowanej analityki połączeń",
    desc: "Oddajemy w Twoje ręce przejrzysty panel danych. Śledzisz czas trwania rozmów, precyzyjną liczbę połączeń przychodzących i wychodzących, obciążenie linii w godzinach szczytu oraz skuteczność poszczególnych handlowców. Masz wreszcie twarde dane do mierzenia ROI z kampanii i optymalizacji sprzedaży."
  },
  {
    number: "+",
    title: "OPCJA ROZSZERZONA: Automatyzacja CRM",
    desc: "Dla firm stawiających na maksymalne skalowanie, oferujemy dodatkową integrację centrali telefonicznej z Twoim systemem CRM. Każde połączenie automatycznie otwiera kartę klienta, przypisuje leada do odpowiedniego handlowca i loguje historię kontaktu. Zero ręcznego przepisywania numerów i pełna kontrola nad procesem sprzedaży."
  },
];


gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Maksymalizacja konwersji z reklam", desc: "Twój marketing wreszcie zacznie w pełni zarabiać. Klienci natychmiast zapamiętują Złoty Numer z billboardu, radia czy samochodu firmowego, co drastycznie zwiększa liczbę dzwoniących. Eliminujesz u klienta barierę 'nie mam jak zapisać'." },
  { number: "02", title: "Pewność, że każdy klient zostanie obsłużony", desc: "Dzięki inteligentnym przekierowaniom żaden telefon nie pozostanie bez odpowiedzi. Jeśli jedna linia jest zajęta, system automatycznie łączy dzwoniącego z kolejnym wolnym doradcą. Zapewniasz płynną komunikację bez 'głuchych telefonów' czy uciążliwych sygnałów zajętości." },
  { number: "03", title: "Wizerunek lidera w branży", desc: "Prestiżowy ciąg cyfr i profesjonalne zapowiedzi na infolinii (IVR) budują autorytet od pierwszej sekundy. Klient, słysząc spersonalizowane powitanie, podświadomie czuje, że dzwoni do dużej, stabilnej i godnej zaufania firmy." },
  { number: "04", title: "Kontrola nad budżetem", desc: "Dzięki analityce połączeń wiesz dokładnie, skąd dzwonią klienci. Przestajesz przepalać pieniądze na nietrafione kampanie. Widzisz czarno na białym, które reklamy generują prawdziwe rozmowy sprzedażowe." },
  { number: "05", title: "Pełna delegacja i oszczędność czasu", desc: "Otrzymujesz gotowy do działania ekosystem bez angażowania własnych zasobów. Przejmujemy na siebie kontakt z operatorami, wszelkie formalności oraz kompleksową konfigurację techniczną. Twój zespół może skupić się na strategicznych celach biznesowych, podczas gdy my dbamy o każdy detal wdrożenia." },
  { number: "06", title: "Skalowalność i porządek w zespole", desc: "Twój system telefoniczny rośnie razem z firmą. Dodanie nowego pracownika do kolejki to kwestia chwili. A dzięki wsparciu automatyzacji (jak integracja z CRM), zyskujesz pełną historię kontaktów i odciążasz zespół z ręcznego wklepywania numerów." },
];

const steps = [
  { num: "01", label: "ANALIZA / KONCEPCJA", title: "Audyt i strategia doboru numeru", desc: "Analizujemy Twoją branżę, specyfikę grupy docelowej oraz cele wizerunkowe. Na tej podstawie dobieramy unikalny wzorzec cyfr, który idealnie rezonuje z wizerunkiem Twojej marki i maksymalizuje łatwość zapamiętania." },
  { num: "02", label: "ADMINISTRACJA / TECHNOLOGIA", title: "Kompleksowa realizacja i wdrożenie systemu", desc: "Przejmujemy całkowitą odpowiedzialność za formalności administracyjne i kontakt z operatorami. Jednocześnie realizujemy pełną konfigurację techniczną centrali (zapowiedzi IVR, inteligentny routing) oraz planowe wdrożenie numeru we wszystkich kanałach reklamowych i wizerunkowych, gwarantując ciągłość komunikacji." },
  { num: "03", label: "SUKCES / WZROST", title: "Monitoring, analiza i optymalizacja wyników", desc: "Monitorujemy każdy aspekt ruchu telefonicznego w Twojej firmie. Dostarczamy precyzyjne dane o skuteczności kampanii, obciążeniu linii i efektywności zespołu. Masz w ręku twarde argumenty, by świadomie optymalizować koszty i procesy sprzedażowe." },
];

const stats = [
  { stat: "67%", label: "klientów woli zadzwonić niż wypełnić formularz - telefon to najkrótszy most do sprzedaży" },
  { stat: "3,2x", label: "wyższy wskaźnik zapamiętywania mają złote numery w porównaniu do standardowych" },
  { stat: "3 sek", label: "potrzebuje klient na zapamiętanie dobrze dobranego złotego numeru bez zapisywania" },
];

const problems = [
  { title: "Twój numer zaczyna się od 517 jak tysiące innych", desc: "Klient słyszy numer raz i natychmiast go zapomina. Musi wracać na stronę, szukać wizytówki, wpisywać w wyszukiwarkę - i po drodze trafia do konkurencji." },
  { title: "Tracisz połączenia, bo nikt nie pamięta numeru", desc: "Billboard, reklama radiowa, wideo - klient chce zadzwonić, ale nie ma gdzie zapisać. Złoty numer eliminuje tę barierę całkowicie." },
  { title: "Numer nie wzmacnia marki", desc: "Dobry numer to element tożsamości - tak jak logo. Przypadkowy ciąg cyfr mówi klientowi: ta firma nie myśli o detalach." },
];

export default function ZlotyNumer({ onOpenModal }) {
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
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Złoty numer</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Numer, który klient<br />
            pamięta<br />
            <span className="text-ivory">bez zapisywania.</span>
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_ZLOTY_NUMER.svg'}')`,
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
            Telefon nadal jest najszybszym mostem między klientem a sprzedażą. Złoty numer to narzędzie sprzedażowe, które wzmacnia rozpoznawalność marki w każdym punkcie styku - billboardzie, reklamie, wizytówce.
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
              Klient chce zadzwonić.<br />
              <span className="text-ivory/40">Ale nie pamięta numeru.</span><br />
              Więc dzwoni do konkurencji.
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
        description="Każdą usługę uruchamiamy w sprawdzonym, chronologicznym procesie. Razem tworzą szczelny system sprzedażowy."
        items={subServices}
      />

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              Nie sprzedajemy cyfr.<br />
              <span className="text-accent">Wdrażamy system, który zwiększa sprzedaż.</span>
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
              Od strategicznego wyboru<br />
              <span className="text-accent/60">do pełnego wdrożenia.</span>
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
            Daj klientom powód,<br />
            <span className="text-accent">żeby zadzwonili.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Pokażemy Ci jakie numery są dostępne w Twojej branży i jak wdrożyć złoty numer bez przerwy w działaniu firmy.
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
