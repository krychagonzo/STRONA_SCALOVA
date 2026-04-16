import React from 'react';

export default function FooterCTA({ onOpenModal }) {
  return (
    <div id="footer-cta" className="w-full bg-[#0E0E0E] flex flex-col items-center">

      {/* Top Part (Dots + CTA + Bottom Line) */}
      <div className="relative w-full flex flex-col items-center justify-center pt-24 min-h-[500px]">

        {/* Background Dot Matrix Wrapper */}
        <div className="absolute inset-0 pointer-events-none opacity-40 flex justify-center w-full h-[calc(100%+2rem)] mt-[-2rem]">
          {/* Edge fades */}
          <div
            className="w-full h-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 100%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect'
            }}
          >
            {/* Center cutout (radial hole for text) */}
            <div
              className="w-full h-full"
              style={{
                maskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at center, transparent 35%, black 65%)'
              }}
            >
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dot-matrix" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#FEFCE8" opacity="0.6" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-matrix)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Big CTA Content */}
        <section className="max-w-4xl mx-auto text-center sticky top-[15%] pb-40 z-10">
            <h2 className="title-anim font-heading font-light text-3xl md:text-4xl lg:text-6xl text-ivory mb-6 tracking-tight leading-[0.9] uppercase text-balance">
                Przestań walczyć z rynkiem. Zainstaluj system, który go <span className="text-accent underline decoration-ivory/20 underline-offset-[12px]">zdominuje.</span>
            </h2>
            <p className="description-anim font-sans text-base md:text-lg text-ivory/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Nie czekaj! Umów bezpłatną konsultację, aby dowiedzieć się, gdzie tracisz czas i uciekają Twoi klienci.
            </p>

          <button
            onClick={onOpenModal}
            className="group relative overflow-hidden rounded-none font-heading font-bold uppercase tracking-wider text-xl px-12 py-5 bg-accent text-obsidian transition-all duration-300 hover:scale-[1.05] shadow-[0_0_40px_rgba(212,255,0,0.2)] hover:shadow-[0_0_60px_rgba(212,255,0,0.5)] mx-auto"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            <span className="relative z-10 flex items-center justify-center gap-4">
              ODBIERZ BEZPŁATNY PLAN DZIAŁANIA
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
          </button>
        </section>

        {/* Full-width Line Separator directly under CTA block */}
        <div className="w-full relative z-10 bg-slate/30 h-[1px]"></div>
      </div>

      {/* Footer Area */}
      <footer className="w-full bg-[#0E0E0E] rounded-none px-8 pt-16 pb-8 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6 md:mb-10">
              <a href="/" className="block">
                <img src="/logo.png" alt="Scalova Logo" className="h-20 md:h-24 w-auto object-contain scale-110 md:scale-125 origin-left hover:brightness-110 transition-all" />
              </a>
            </div>


          </div>

          <div>
            <h4 className="font-heading font-semibold text-ivory mb-4 opacity-90 uppercase tracking-widest text-xs">Nawigacja</h4>
            <ul className="flex flex-col gap-3 font-heading text-sm text-ivory/50">
              <li><a href="#features" className="hover:text-accent transition-colors">Bariery</a></li>
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Podejście</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Usługi</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Metodologia</a></li>
              <li><a href="#team" className="hover:text-accent transition-colors">Zespół</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-ivory mb-4 opacity-90 uppercase tracking-widest text-xs">Kontakt</h4>
            <ul className="flex flex-col gap-3 font-heading text-sm text-ivory/50">
              <li><a href="#" className="hover:text-accent transition-colors">contact@scalova.com</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">61 830 00 00</a></li>
              <li>Poznań, Polska</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-heading text-xs text-ivory/40">© {new Date().getFullYear()} Scalova. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4 font-heading text-xs text-ivory/40">
            <a href="#" className="hover:text-ivory transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-ivory transition-colors">Regulamin</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
