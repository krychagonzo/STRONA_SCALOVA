import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BENEFITS = [
  {
    title: "Pasja",
    desc: "Miłość do tworzenia i ciągłego doskonalenia napędza wszystko, co robimy, nadając każdemu projektowi unikalny charakter. Wchodzimy w stan 'flow'.",
    icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  },
  {
    title: "Kreatywność",
    desc: "Innowacje biorą się z otwartego umysłu. Ciekawość i luz inspirują nas do nieszablonowego myślenia z dala od utartych, standardowych ścieżek.",
    icon: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5 M9 18h6 M10 22h4" /></>
  },
  {
    title: "Współpraca",
    desc: "Razem zawsze osiągamy więcej. Różnorodne talenty i wspólne doświadczenia sprawiają, że nieustannie się rozwijamy. Gramy do jednej bramki.",
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" /><circle cx="9" cy="7" r="4" /></>
  },
  {
    title: "Profesjonalizm",
    desc: "Dążymy do najwyższej jakości w każdym detalu. Rzetelność i terminowość to priorytety, a skupienie i dyscyplina dają nam ogromną satysfakcję.",
    icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>
  },
  {
    title: "Innowacyjność",
    desc: "Sięgamy po najnowsze narzędzia i rozwiązania. Optymalizujemy i automatyzujemy. Wyprzedzanie trendów leży w naszym ścisłym DNA.",
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  }
];

const JOBS = [
  {
    id: 1,
    title: "AI Automation Engineer",
    type: "B2B / W PEŁNI ZDALNIE",
    desc: "Projektowanie autonomicznych agentów AI, mapowanie procesów w Make/n8n oraz integracja zewnętrznych API (OpenAI, Anthropic). Oczekujemy analitycznego sznytu i brutalnej obsesji na punkcie skracania czasu ludzkiej pracy. Wymagane portfolio."
  },
  {
    id: 2,
    title: "Performance Media Buyer",
    type: "B2B / W PEŁNI ZDALNIE",
    desc: "Skalowanie budżetów rzędu min. 100k PLN w ekosystemie Meta Ads i Google Ads. Interesuje nas tylko generowanie wysokiego ROASu, a nie 'tanie kliknięcia'. Wynagrodzenie skalowane premią od wygenerowanego przez Ciebie zysku dla klientów."
  },
  {
    id: 3,
    title: "Creative Visual Designer",
    type: "B2B / HYBRYDOWO (POZNAŃ)",
    desc: "Odpowiedzialność za tworzenie statycznych i ruchomych kreacji konwertujących. Musisz 'czuć' kinową estetykę, rozumieć zasadę brutalizmu połączonego z minimalizmem, a także bardzo sprawnie posługiwać się środowiskiem Figma oraz After Effects."
  }
];

export default function Career() {
  const [activeAccordion, setActiveAccordion] = useState(-1);

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center">

      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="careerNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#careerNoise)"/>
        </svg>
      </div>
      
      {/* UNIFIED CAREER SECTION */}
      <section className="w-full pt-40 md:pt-48 pb-24 md:pb-32 px-4 md:px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <span className="font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-6 block text-center">
           Dołącz Do Nas
        </span>
        
        {/* Kontener wyznaczający szerokość całości kaskadowo z wielkością napisu KARIERA */}
        <div className="inline-flex flex-col items-stretch max-w-full mx-auto">
          <h1 className="text-ivory text-[50px] sm:text-[70px] md:text-[110px] lg:text-[150px] xl:text-[200px] 2xl:text-[240px] font-heading font-bold tracking-tighter leading-[0.8] uppercase text-center whitespace-nowrap select-none">
            KARIERA
          </h1>

          <div className="w-full flex justify-center mt-6 md:mt-8 px-2">
            <p className="font-sans text-xs sm:text-sm md:text-sm text-ivory/60 max-w-[700px] leading-relaxed text-center">
              Tworzymy miejsce, w którym digital marketing płynnie łączy się z nowymi technologiami i automatyzacją. Jeśli chcesz realnie wpływać na rozwój firm w internecie, a przy tym pracować w świetnej atmosferze – dobrze trafiłeś. Zobacz, co napędza nas każdego dnia:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12 w-full mt-10 md:mt-16">
            {BENEFITS.map((benefit, idx) => (
               <div 
                 key={idx}
                 className="group relative flex flex-col items-start justify-between bg-[#0c0c0c] rounded-none p-4 md:p-6 lg:p-5 xl:p-6 border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 w-full aspect-square"
               >
                 <div className="absolute top-3 left-3 text-[9px] text-ivory/20 font-sans opacity-50 group-hover:opacity-100 transition-opacity">
                    {String(idx).padStart(2, '0')}
                 </div>

                 <div className="w-8 h-8 md:w-12 md:h-12 mt-2 bg-obsidian border border-white/10 flex items-center justify-center text-ivory/40 group-hover:text-accent group-hover:border-accent/40 transition-all duration-500 rounded-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                       {benefit.icon}
                    </svg>
                 </div>
                 
                 <div className="mt-4 w-full z-10">
                   <h3 className="font-heading text-sm md:text-base lg:text-[15px] xl:text-lg text-ivory uppercase tracking-widest mb-1.5 font-light group-hover:text-accent transition-colors duration-500">
                     {benefit.title}
                   </h3>
                   <p className="font-sans text-ivory/50 text-[10px] md:text-xs leading-relaxed line-clamp-4">
                     {benefit.desc}
                   </p>
                 </div>

                 {/* Glow element */}
                 <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-500 pointer-events-none" />
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-accent/20 transition-all duration-500 pointer-events-none z-20" />
               </div>
            ))}
          </div>
        </div>
      </section>


      {/* OFERTY PRACY (ACCORDION) */}
      <section className="relative w-full bg-obsidian py-20 px-4 md:px-8 flex flex-col items-center select-none border-t border-white/5">
        <div className="w-full max-w-[1100px]">
          <div className="mb-16 md:mb-24 text-center uppercase tracking-widest font-heading px-6 flex flex-col items-center">
            <h2 className="text-ivory text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tighter text-center leading-[0.9] uppercase">
              Otwarte Rekrutacje
            </h2>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {JOBS.map((job, index) => {
              const isActive = activeAccordion === index;
              return (
                <div key={index} className="border-b border-white/10">
                  <div
                    onClick={() => setActiveAccordion(isActive ? -1 : index)}
                    className={`group flex w-full cursor-pointer items-center justify-between py-6 md:py-8 px-2 md:px-6 transition-colors duration-300 ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                       <span className="font-heading text-accent/60 text-[10px] tracking-[0.2em] uppercase border border-accent/20 px-3 py-1 rounded-sm w-fit">
                         {job.type}
                       </span>
                       <h3 className={`font-heading text-xl md:text-3xl uppercase tracking-widest font-light transition-colors duration-500 mt-2 md:mt-0 ${isActive ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'}`}>
                         {job.title}
                       </h3>
                    </div>

                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center text-lg md:text-xl font-light transition-colors duration-500 ml-4 ${isActive ? 'border-accent text-accent' : 'border-white/20 text-white/40 group-hover:border-white/50 group-hover:text-white/80'}`}>
                      {isActive ? '−' : '＋'}
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col md:flex-row gap-6 md:gap-12 px-2 md:px-6 ${isActive ? 'max-h-[500px] opacity-100 pb-8 md:pb-12' : 'max-h-0 opacity-0 pb-0'}`}>
                    <p className="font-sans text-ivory/60 text-sm md:text-base leading-relaxed font-light normal-case flex-1">
                      {job.desc}
                    </p>
                    <div className="flex-shrink-0 flex items-start">
                       <button className="group relative overflow-hidden font-heading font-bold uppercase tracking-wider text-xs px-8 py-4 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(212,255,0,0.15)] flex items-center gap-3">
                         <span className="relative z-10 w-full text-center">APLIKUJ TERAZ</span>
                       </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / FORMULARZ */}
      <section className="w-full py-32 px-6 flex justify-center bg-[linear-gradient(to_bottom,#0c0c0c_0%,#111_100%)] relative z-10">
         <div className="max-w-[700px] w-full flex flex-col items-center">
             <div className="text-center mb-12">
               <h3 className="text-ivory text-3xl font-heading font-light tracking-widest uppercase mb-4">
                 Nie widzisz swojej roli?
               </h3>
               <p className="font-sans text-ivory/50">
                 Zawsze mamy miejsce dla wybitnych talentów. Zostaw nam swój ślad.
               </p>
             </div>
             
             <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
               <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Imię i Nazwisko</label>
                    <input type="text" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="Jan Kowalski" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 relative">
                    <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Adres Email</label>
                    <input type="email" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="twoj@email.com" />
                  </div>
               </div>
               
               <div className="flex flex-col gap-2 w-full relative mt-2">
                  <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Link do CV lub Portfolio (LinkedIn / Dysk)</label>
                  <input type="url" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans" placeholder="https://..." />
               </div>

               <div className="flex flex-col gap-2 w-full relative mt-2">
                  <label className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] font-heading ml-4 bg-[#111] absolute -top-2 left-2 px-2 z-10">Wiadomość (opcjonalnie)</label>
                  <textarea rows="4" className="w-full bg-transparent border border-white/10 rounded-none px-6 py-4 text-ivory focus:outline-none focus:border-accent transition-colors font-sans resize-none" placeholder="Twoja supermoc to..."></textarea>
               </div>

               <button type="submit" className="group relative overflow-hidden font-heading font-bold uppercase tracking-widest text-sm px-10 py-5 bg-ivory text-obsidian transition-all duration-300 hover:bg-accent hover:shadow-[0_0_40px_rgba(212,255,0,0.2)] mt-6 mx-auto rounded-none hover:-translate-y-1">
                  Zgłoś swoją gotowość
               </button>
             </form>

         </div>
      </section>

    </div>
  );
}
