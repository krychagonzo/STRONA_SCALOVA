import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Identyfikacja wizualna marki", desc: "Logo, paleta kolorów, typografia, system graficzny - cała tożsamość wizualna zaprojektowana pod spójność i profesjonalizm. Klient widzi markę premium zanim przeczyta pierwsze słowo." },
  { title: "Projekty graficzne pod social media", desc: "Instagram, LinkedIn, Facebook - każdy format zaprojektowany pod specyfikę platformy i zachowanie jej użytkowników. Spójne, rozpoznawalne, konwertujące." },
  { title: "Fotografia produktowa i wizerunkowa", desc: "Profesjonalna sesja zdjęciowa budująca wizerunek marki i prezentująca produkt w sposób, który sprzedaje. Bez stockowych zdjęć - autentyczność i jakość." },
  { title: "Szablony brandowe do samodzielnego użytku", desc: "Zestaw szablonów w Twoich kolorach i fontach - możesz publikować sam bez angażowania grafika przy każdym poście. Pełna spójność wizualna bez stałych kosztów." },
  { title: "Strategia contentowa i kalendarz", desc: "Definiujemy o czym, jak i do kogo mówisz. Miesięczny kalendarz z zaplanowanymi tematami, formatami i celami - regularność bez chaosu last-minute." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Audyt komunikacji wizualnej", desc: "Analizujemy obecny wizerunek, spójność i pozycję w stosunku do konkurencji. Wiemy co poprawić zanim zaczniemy tworzyć." },
  { number: "02", title: "Strategia pozycjonowania eksperta", desc: "Definiujemy głos marki, tematykę i sposób komunikacji, który buduje autorytet - nie tylko obecność w sieci." },
  { number: "03", title: "Miesięczny kalendarz contentowy", desc: "Każdy post zaplanowany z wyprzedzeniem - temat, format, platforma, cel. Regularność bez chaosu last-minute." },
  { number: "04", title: "Projekty graficzne pod każdą platformę", desc: "Instagram, LinkedIn, Facebook - każdy format zaprojektowany pod specyfikę platformy i zachowanie jej użytkowników." },
  { number: "05", title: "Szablony do samodzielnego użycia", desc: "Dostajesz zestaw szablonów w swoich kolorach i fontach - możesz publikować sam bez angażowania grafika przy każdym poście." },
  { number: "06", title: "Analiza wyników i optymalizacja", desc: "Co miesiąc sprawdzamy co działa, co nie, i dostosowujemy strategię. Content, który się nie poprawia, to zmarnowany budżet." },
];

const steps = [
  { num: "01", label: "AUDYT", title: "Mapujemy wizerunek i komunikację", desc: "Analizujemy każdy kanał, ton komunikacji i materiały graficzne. Wiemy gdzie jesteś i jak wyglądasz na tle konkurencji." },
  { num: "02", label: "POZYCJONOWANIE", title: "Definiujemy głos i pozycję eksperta", desc: "Ustalamy o czym będziesz mówić, jak i do kogo. Strategia contentowa to nie harmonogram postów - to system budowania autorytetu." },
  { num: "03", label: "PRODUKCJA", title: "Tworzymy materiały pod platformy i cele", desc: "Projektujemy i przygotowujemy materiały z wyprzedzeniem. Każdy element zatwierdzony zanim trafi do publikacji." },
  { num: "04", label: "DYSTRYBUCJA", title: "Planujemy, analizujemy, iterujemy", desc: "Publikujemy według harmonogramu i mierzymy efekty. Co miesiąc raport z wnioskami i plan na kolejny okres." },
];

const stats = [
  { stat: "7x", label: "więcej zasięgu generuje content z wyraźną pozycją ekspercką w porównaniu do postów 'ogólnych'" },
  { stat: "84%", label: "kupujących sprawdza social media marki przed podjęciem decyzji zakupowej" },
  { stat: "21 dni", label: "do pierwszych widocznych zmian w postrzeganiu marki przez odbiorców" },
];

const problems = [
  { title: "Postujesz, ale nic z tego nie wynika", desc: "Regularność bez strategii to przepalanie czasu. Zasięgi małe, zaangażowanie zerowe, zero zapytań od klientów." },
  { title: "Wyglądasz amatorsko na tle konkurencji", desc: "Niespójne grafiki, różne style, brak tożsamości wizualnej. Klient porównuje Cię z profesjonalną marką i wybiera tę drugą." },
  { title: "Nie masz czasu na content", desc: "Prowadzisz firmę - content to zawsze ostatnia rzecz na liście. Albo wychodzi naprędce, albo nie wychodzi wcale." },
];

export default function StatyczneTresci({ onOpenModal }) {
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

      {/* HERO */}
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
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Statyczne treści wizualne</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Pozycja eksperta.<br />
            Budowana<br />
            <span className="text-ivory">każdym postem.</span>
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_STATYCZNE_TRESCI_WIZ.svg'}')`,
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
            Tworzymy statyczne treści wizualne, które budują Twoją pozycję eksperta i są projektowane pod konkretne platformy i cele. Nie produkujemy contentu dla samego contentu - każdy materiał ma pracować na wynik.
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

      {/* STATS */}
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

      {/* PROBLEM */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">PROBLEM</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl">
              Content bez strategii<br />
              <span className="text-ivory/40">to czas i pieniądze</span><br />
              wydane na nic.
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

      {/* DELIVERABLES */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO DOSTAJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight">
              System contentowy gotowy<br />do pracy od pierwszego tygodnia.
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
              Od audytu do spójnego<br />wizerunku eksperta.
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

      {/* CTA */}
      <section className="w-full py-28 px-6 md:px-16 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,255,0,0.04) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,255,0,0.3) 50%, transparent)' }} />
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-6 opacity-80">GOTOWY NA ZMIANĘ?</p>
          <h2 className="font-heading font-light text-3xl md:text-5xl lg:text-6xl text-ivory uppercase tracking-tight leading-tight mb-6">
            Zacznij budować pozycję eksperta.<br />
            <span className="text-accent">Systematycznie.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Przeanalizujemy Twoją obecną komunikację i pokażemy co konkretnie zmienić, żeby zaczęła budować autorytet.
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
