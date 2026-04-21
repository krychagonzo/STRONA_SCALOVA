import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';
import ServicePageNav from '../components/ServicePageNav';
import ServiceHeroCanvas from '../components/ServiceHeroCanvas';

const subServices = [
  { title: "Identyfikacja Wizualna i Rebranding", desc: "Tworzymy unikalny kod genetyczny Twojej firmy. Projektujemy logo, dobieramy typografię i kolorystykę, które tworzą spójny wizerunek lidera. Pomagamy też odświeżyć istniejące marki, aby nadążały za dynamicznie zmieniającym się rynkiem." },
  { title: "Wizualizacje Produktów i Architektury (CGI)", desc: "Tworzymy obrazy, które wyprzedzają rzeczywistość. Perfekcyjne rendery 3D pozwalają sprzedawać produkty, zanim zjadą z linii produkcyjnej, lub prezentować inwestycje budowlane w fazie projektu. To jakość, która eliminuje kosztowne sesje zdjęciowe." },
  { title: "Grafika Wspierana przez AI (Opcja ekonomiczna)", desc: "Wykorzystujemy potencjał sztucznej inteligencji, aby dostarczać unikalne ilustracje i obrazy w krótkim czasie. Rozwiązanie dla marek, które potrzebują wysokiej jakości contentu przy zachowaniu optymalnego budżetu." },
  { title: "Design Sprzedażowy i Materiały Marketingowe", desc: "Wszystko, co wspiera domykanie transakcji. Projektujemy eleganckie katalogi, oferty PDF (Pitch Decks), skuteczne banery reklamowe oraz grafiki do mediów społecznościowych - każdy projekt pod czytelność i skuteczność komunikatu." },
  { title: "Infografiki i Wizualizacja Danych", desc: "Przekładamy liczby na język korzyści. Tworzymy przejrzyste wykresy i schematy procesów, które w przystępny sposób pokazują Twoją skuteczność, wzrosty lub zasady działania usług. Kluczowe narzędzie w budowaniu wizerunku eksperta." },
  { title: "Oznakowanie Przestrzeni i Eventów", desc: "Przenosimy Twoją markę do świata fizycznego. Projektujemy spójne systemy oznakowania biur, stoisk targowych i materiałów konferencyjnych. Twoja marka jest tak samo profesjonalna w sieci, jak i podczas bezpośredniego spotkania z klientem." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Natychmiastowa czytelność marki", desc: "Klient od razu wie, z kim ma do czynienia. Profesjonalny wygląd skraca drogę od zainteresowania do decyzji o współpracy." },
  { number: "02", title: "Wyższa postrzegana wartość usług", desc: "Firmy, które dbają o estetykę, mogą pozwolić sobie na wyższe marże. Jakość wizualna jest dla klienta sygnałem jakości Twojej pracy." },
  { number: "03", title: "Sprawność operacyjna zespołu", desc: "Dzięki wizualizacji procesów wewnętrznych i standardów, Twoi pracownicy popełniają mniej błędów i szybciej adaptują się do nowych zadań." },
  { number: "04", title: "Oszczędność czasu i budżetu", desc: "Dzięki CGI i AI dostarczamy materiały wizualne szybciej i taniej niż w przypadku tradycyjnych metod, zachowując przy tym najwyższą, światową jakość." },
  { number: "05", title: "Spójna marka we wszystkich punktach styku", desc: "Od strony www i social mediów po materiały konferencyjne i oznakowanie przestrzeni. Klient, który spotyka Twoją markę wszędzie, za każdym razem odbiera ten sam sygnał: profesjonalizm i dbałość o detal." },
  { number: "06", title: "Skuteczniejsze zamykanie transakcji", desc: "Dobrze zaprojektowana oferta lub Pitch Deck to cichy sprzedawca, który działa za Ciebie. Klient trzymający profesjonalne materiały w rękach podejmuje decyzję szybciej i z większym zaufaniem." },
];

const steps = [
  { num: "01", label: "ANALIZA I KONTEKST", title: "Rozumiemy, gdzie firma traci energię", desc: "Szukamy miejsc, gdzie obraz może pomóc — czy to w słabej sprzedaży, czy w niejasnych procesach wewnętrznych." },
  { num: "02", label: "PROJEKTOWANIE", title: "Dobieramy formę do celu", desc: "Chcesz sprzedać projekt — tworzymy rendery 3D. Chcesz usprawnić pracę biura — tworzymy schematy i szablony dokumentów." },
  { num: "03", label: "KREACJA", title: "Tworzymy z dbałością o precyzję", desc: "Tworzymy finalne grafiki, dbając o każdy piksel. Łączymy rzemiosło z nowoczesnymi technologiami." },
  { num: "04", label: "IMPLEMENTACJA", title: "Wdrażamy i wspieramy", desc: "Pomagamy wdrożyć nowe materiały w życie firmy. Twój zespół wie jak ich używać, klienci zauważają nową jakość." },
];

const stats = [
  { stat: "7x", label: "więcej zasięgu generuje content z wyraźną pozycją ekspercką w porównaniu do postów 'ogólnych'" },
  { stat: "84%", label: "kupujących sprawdza social media marki przed podjęciem decyzji zakupowej" },
  { stat: "21 dni", label: "do pierwszych widocznych zmian w postrzeganiu marki przez odbiorców" },
];

const problems = [
  { title: "Poczucie bycia jednym z wielu", desc: "Twoja marka nie wyróżnia się na tle konkurencji, przez co klienci kierują się głównie ceną, a nie wartością Twojego brandu." },
  { title: "Brak spójności w komunikacji", desc: "Inaczej wyglądasz w mediach społecznościowych, a inaczej w ofertach wysyłanych do klientów. Ten chaos buduje podwiadomy brak zaufania." },
  { title: "Trudne do zrozumienia materiały wewnętrzne", desc: "Twoi pracownicy gubią się w gąszczu tekstu w instrukcjach i procedurach. Brakuje wizualnego przewodnika, który uprościłby ich codzienną pracę." },
  { title: "Wysokie koszty i długi czas oczekiwania", desc: "Potrzebujesz profesjonalnych zdjęć produktów lub architektury, ale organizacja sesji zdjęciowych trwa tygodniami i pochłania ogromne budżety." },
  { title: "Oferty i pitch decki, które nie zamykają sprzedaży", desc: "Wysyłasz świetną ofertę — i cisza. Materiały bez profesjonalnego projektu giną w skrzynce klienta. Elegancki Pitch Deck to różnica między 'przemyślę' a 'kiedy zaczynamy'." },
  { title: "Twoje liczby imponują, ale nie przekonują", desc: "Masz doskonale wyniki, referencje i wzrosty — ale prezentowane w tabeli lub bloku tekstu nie robią wrażenia. Bez wizualizacji danych klient nie poczuje skali Twojego sukcesu." },
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
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Statyczne treści wizualne</span>
          </div>


          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Twój wizerunek<br />
              <span className="text-ivory">mówi,</span><br />
              zanim Ty zaczniesz.
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
            Pierwsze wrażenie trwa ułamek sekundy i jest decyzją, której klient nie jest świadomy. Projektujemy identyfikacje, wizualizacje i materiały, które wygrywają ten moment — zawsze.
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
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl mb-6">
              Gdzie Twój wizerunek traci pieniądze?
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Warstwa wizualna to pierwsze wrażenie, które klient wyrabia sobie w ciągu sekund. Rozpoznajemy go za każdym razem, gdy firma wygląda gorzej, niż działa:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
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
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Statyczny design — trwałe aktywa Twojego biznesu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Statyczny design to inwestycja w trwałe aktywa Twojego biznesu. Dzięki niemu zyskujesz:
            </p>
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
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Nasza droga do Twojego wizerunku.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Każdy projekt traktujemy jako proces porządkowania Twojej rzeczywistości biznesowej.
            </p>
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
      <ServicePageNav onOpenModal={onOpenModal} />
    </div>
  );
}
