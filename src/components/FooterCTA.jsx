import React from 'react';

export default function FooterCTA() {
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
        <section className="w-full max-w-5xl px-6 z-10 text-center relative pointer-events-auto pb-40">
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 tracking-tight text-balance">
            Przestań walczyć z rynkiem.<br />Zainstaluj system, który go zdominuje.
          </h2>
          <p className="font-heading text-lg md:text-xl text-ivory/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Nie czekaj! Umów bezpłatną konsultację, aby dowiedzieć się, gdzie tracisz czas i uciekają Twoi klienci.
          </p>

          <button 
            className="group relative overflow-hidden rounded-lg font-heading font-bold uppercase tracking-wider text-xl px-12 py-5 bg-accent text-obsidian transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-[2px] shadow-[0_0_40px_rgba(212,255,0,0.2)] mx-auto" 
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="absolute inset-0 w-full h-full bg-ivory origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            <span className="relative z-10 flex items-center justify-center gap-4">
              ZAREZERWUJ KONSULTACJĘ
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="lucide lucide-arrow-right transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
            <h3 className="font-heading font-bold text-3xl text-ivory mb-4 tracking-tight">
              <a href="/" className="hover:text-accent transition-colors">
                Scalova
              </a>
            </h3>
            <p className="font-heading text-sm text-ivory/50 max-w-sm mb-6">Wdrożenie do biznesu technologii AI, automatyzacja procesów i bezkompromisowe wyskalowanie firmy.</p>
            
            {/* System Status */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-slate/50 bg-[#0E0E0E]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-sm h-3 w-3 bg-accent"></span>
              </div>
              <span className="font-data text-xs text-ivory/60 tracking-wider">SYSTEM OPERATIONAL</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-ivory mb-4 opacity-90 uppercase tracking-widest text-xs">Nawigacja</h4>
            <ul className="flex flex-col gap-3 font-heading text-sm text-ivory/50">
              <li><a href="#features" className="hover:text-accent transition-colors">Korzyści</a></li>
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Podejście</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Metodologia</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-ivory mb-4 opacity-90 uppercase tracking-widest text-xs">Kontakt</h4>
            <ul className="flex flex-col gap-3 font-heading text-sm text-ivory/50">
              <li><a href="#" className="hover:text-accent transition-colors">contact@scalova.com</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">+48 000 000 000</a></li>
              <li>Warszawa, Polska</li>
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
