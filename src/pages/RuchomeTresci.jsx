import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubServices from '../components/SubServices';

const subServices = [
  { title: "Animacje 2D i 3D", desc: "Ożywiamy idee, których nie da się uchwycić tradycyjną kamerą. Od subtelnego ruchu logo, który buduje profesjonalny charakter marki, po fotorealistyczne prezentacje produktów i przekroje techniczne. To idealne rozwiązanie, gdy chcesz pokazać wnętrze mechanizmu lub projekt, który jeszcze nie istnieje." },
  { title: "Explainer Videos (Filmy instruktażowe)", desc: "Dobre wideo wyjaśniające to pomost między Twoją wiedzą a zrozumieniem klienta lub pracownika. Tworzymy krótkie formy, które w prosty, ludzki sposób tłumaczą nawet najbardziej zawiłe procesy - zarówno na zewnątrz, jak i wewnątrz organizacji." },
  { title: "Social Media & Montaż Dynamiczny", desc: "W świecie krótkich form (Reels, TikTok, YouTube Shorts) liczą się pierwsze sekundy. Przygotujemy dla Ciebie materiały, które zatrzymują wzrok podczas szybkiego przewijania ekranu. Dbamy o rytm, napisy i efekty, które budują zasięgi oraz autentyczne zaangażowanie społeczności." },
  { title: "Wirtualna Rzeczywistość (VR) i Interakcja", desc: "Zamiast opowiadać o projekcie, pozwól swoim klientom po prostu w nim być. Tworzymy cyfrowe przestrzenie, które można odwiedzić, zwiedzić i poczuć. To idealne narzędzie dla deweloperów, architektów i wizjonerów, którzy chcą skrócić dystans między pomysłem a decyzją zakupową." },
  { title: "Motion Design w Interfejsach (UI)", desc: "Usprawniamy odbiór Twoich narzędzi cyfrowych. Projektujemy mikrowyraziste animacje dla stron www i aplikacji, które prowadzą użytkownika za rękę. To detal, który sprawia, że proces zakupu lub rejestracji staje się płynny i intuicyjny." },
];

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  { number: "01", title: "Precyzyjny przekaz, który się nie męczy", desc: "Raz przygotowany film szkoleniowy lub prezentacja produktu będzie zawsze tak samo profesjonalna, niezależnie od tego, czy ogląda go pierwszy, czy setny odbiorca." },
  { number: "02", title: "Autorytet budowany profesjonalizmem", desc: "Wysokiej jakości animacje i montaż stawiają Cię w rzędzie liderów. Klient widzi firmę, która dba o detale i inwestuje w najwyższą jakość komunikacji." },
  { number: "03", title: "Uwolnienie zasobów ludzkich", desc: "Dzięki wideo instruktażowym Twój zespół może zająć się tworzeniem wartości, zamiast ciągłym powtarzaniem procedur. To realna oszczędność pieniędzy i energii." },
  { number: "04", title: "Głębsza relacja z odbiorcą", desc: "Ruch i dźwięk angażują zmysły znacznie silniej niż statyczny obraz. Budujesz emocjonalną więź z klientem, która zamienia zwykłego widza w lojalnego partnera." },
  { number: "05", title: "Zasięgi, które rosną organicznie", desc: "Algorytmy każdej platformy — od Instagram po LinkedIn — premiują wideo ponad wszystkie inne formaty. Jeden dobrze zaprojektowany materiał dociera do nowych odbiorców bez dodatkowego budżetu reklamowego." },
  { number: "06", title: "Jeden materiał, wiele zastosowań", desc: "Animacja lub wideo wyprodukowane raz pracuje jednocześnie na stronie www, w social mediach, prezentacji sprzedażowej i procesie onboardingu. Inwestujesz raz — czerpiesz wielotorowo." },
];

const steps = [
  { num: "01", label: "SCENARIUSZ I CEL", desc: "Ustalamy cel, grupę docelową i format. To fundament całej produkcji." },
  { num: "02", label: "STORYBOARD", desc: "Rozrysowujemy kluczowe kadry. Akceptujesz strukturę przed startem produkcji." },
  { num: "03", label: "PRODUKCJA", desc: "Realizacja dopasowana do marki — każdy kadr ma swoje uzasadnienie." },
  { num: "04", label: "DŹWIĘK I SZLIF", desc: "Dobieramy warstwę dźwiękową, która nadaje całości kinowy charakter." },
  { num: "05", label: "WDROŻENIE", desc: "Formaty pod każdą platformę — od ekranów po smartfony." },
];

const stats = [
  { stat: "91%", label: "konsumentów chce oglądać więcej materiałów video od marek, które obserwują" },
  { stat: "2s", label: "masz na zatrzymanie kciuka - tyle trwa decyzja o pominięciu lub obejrzeniu materiału" },
  { stat: "6x", label: "więcej konwersji generują landing pages z wideo w porównaniu do stron tylko z tekstem" },
];

const problems = [
  { title: "Tracisz czas na powtarzalne tłumaczenia", desc: "Czujesz, że połowę dnia spędzasz na wyjaśnianiu klientom lub nowym pracownikom tych samych zasad działania. Twoje słowa ulatują, a wideo zostaje i pracuje za Ciebie." },
  { title: "Twoja oferta jest zbyt trudna do opisania tekstem", desc: "Masz innowacyjny produkt lub usługę, której nie da się streścić w dwóch zdaniach. Bez wizualizacji tracisz uwagę tych, którzy nie mają czasu na czytanie długich instrukcji." },
  { title: "Marka wydaje się nieruchoma na tle konkurencji", desc: "W świecie zdominowanym przez wideo, statyczna obecność bywa odbierana jako brak nowoczesności. Brakuje Ci dynamiki, która ożywiłaby Twój przekaz i nadała mu ludzką twarz." },
  { title: "Onboarding paraliżuje pracę zespołu", desc: "Każdy nowy pracownik to godziny pracy Twoich liderów poświęcone na szkolenia. Brakuje Ci standardu, który wprowadzałby ludzi w procesy bez Twojego ciągłego udziału." },
  { title: "Sprzedajesz coś, czego nie można dotknąć", desc: "Usługi, oprogramowanie, projekty B2B - to kategorie, gdzie słowa nie wystarczą. Animacja lub wirtualna prezentacja pozwala klientowi poczuć wartość produktu, zanim podejmie decyzję." },
  { title: "Twoje social media nie generują zaangażowania", desc: "Posty giną w feedzie, zasięgi spadają, komentarzy brak. Statyczne treści nie mają szans w algorytmach nastawionych na wideo. Potrzebujesz dynamiki, która zatrzymuje uwagę i buduje społeczność." },
];

export default function RuchomeTresci({ onOpenModal }) {
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
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-65"
          >
            <source src="/SEKCJA_RUCHOME_TRESCI_WIZUALNE/SHOWREEL.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
        </div>
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="hero-line flex items-center gap-3 mb-10">
            <Link to="/" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Strona główna</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <Link to="/#services" className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory/30 hover:text-accent transition-colors">Usługi</Link>
            <span className="text-ivory/20 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">Ruchome treści wizualne</span>
          </div>
          <div className="hero-line relative flex items-center justify-between w-full mb-8 md:mb-12">
            <h1 className="relative z-10 w-full md:w-[75%] font-heading font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] tracking-tight leading-[0.9] text-ivory uppercase">
              Obraz, który<br />
              <span className="text-ivory">porusza</span><br />
              i przekonuje.
            </h1>
            <div 
              className="absolute right-[-10%] md:right-0 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] bg-white/[0.03] pointer-events-none z-0"
              style={{
                maskImage: `url('${'/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg'}')`,
                WebkitMaskImage: `url('${'/SEKCJA_USLUGI/IKONA_RUCHOME_TRESCI_WIZUALNE.svg'}')`,
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
            Dynamika obrazu pozwala przekazać emocje i dane w sposób, którego żaden tekst nie jest w stanie oddać. Projektujemy ruch, który ma cel — nie ozdobę.
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
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight max-w-3xl mb-6">
              Gdzie Twoja firma traci energię i potencjał?
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Obraz dynamiczny to odpowiedź na konkretne wyzwania, z którymi mierzy się każdy rozwijający się biznes. Pomagamy Ci, gdy czujesz, że:
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

      <section className="w-full py-28 px-6 md:px-16 xl:px-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">CO ZYSKUJESZ</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Realne zyski z dynamiki przekazu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Tworzymy treści, które stają się fundamentem Twojej komunikacji zewnętrznej i wewnętrznej. To coś więcej niż obraz - to sposób na skalowanie jakości i standardów Twojej firmy, który pozwala jej rezonować silniej, przy jednoczesnym odciążeniu zasobów, którymi dysponujesz.
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

      <section id="jak-dzialamy" className="w-full py-28 px-6 md:px-16 xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-[10px] tracking-[0.25em] uppercase mb-4 opacity-80">JAK DZIAŁAMY</p>
            <h2 className="font-heading font-light text-3xl md:text-5xl text-ivory uppercase tracking-tight leading-tight mb-6">
              Nasza droga do Twojego obrazu.
            </h2>
            <p className="font-sans text-ivory/50 text-base md:text-lg max-w-2xl leading-relaxed">
              Proces tworzenia ruchomych treści dzielimy na kroki, które gwarantują, że efekt końcowy będzie dokładnie taki, jakiego potrzebuje Twój biznes.
            </p>
          </div>
          <div className="steps-container flex flex-col">
            {steps.map((step) => (
              <div key={step.num} className="step-row group flex items-center gap-8 md:gap-12 py-5 border-t border-ivory/5 hover:border-accent/20 transition-colors duration-300">
                <span className="font-mono text-accent/30 text-[10px] tracking-[0.2em] shrink-0 w-6 text-right">{step.num}</span>
                <h3 className="font-heading text-ivory text-base md:text-xl uppercase tracking-[0.12em] shrink-0 w-40 md:w-56 group-hover:text-accent transition-colors duration-300">{step.label}</h3>
                <p className="font-sans text-ivory/40 text-sm leading-relaxed flex-1">{step.desc}</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" className="hidden md:block shrink-0 text-ivory/10 group-hover:text-accent/40 group-hover:-rotate-45 transition-all duration-300"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
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
            Zacznij zatrzymywać uwagę.<br />
            <span className="text-accent">Zamiast ją tracić.</span>
          </h2>
          <p className="font-sans text-ivory/50 text-lg max-w-xl mx-auto leading-relaxed mb-12">
            Umów bezpłatną konsultację. Pokażemy Ci jak wyglądałaby Twoja strategia video i jakie formaty najlepiej pasują do Twojej marki i odbiorców.
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
