import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CATEGORY_ICONS } from './Portfolio';

export default function PortfolioItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PORTFOLIO_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-obsidian flex flex-col items-center justify-center text-ivory">
        <h1 className="text-3xl md:text-5xl font-heading mb-6 uppercase tracking-tighter">Projekt nie znaleziony</h1>
        <button 
          onClick={() => navigate('/portfolio')} 
          className="group relative flex items-center justify-center py-3 px-8 bg-[#0c0c0c] text-ivory border border-white/20 hover:border-accent hover:text-accent transition-all duration-500 font-heading text-xs uppercase tracking-widest overflow-hidden"
        >
          <span className="relative z-10 w-full text-center">Wróć do portfolio</span>
          <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors pointer-events-none" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-obsidian flex flex-col items-center pb-32">
      {/* AMBIENT GRADIENT & ANTI-BANDING NOISE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
        {/* Full-bleed subtle base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1f]/40 via-[#0D0D12]/80 to-[#0D0D12]" />
        
        {/* Main wide subtle glow - ensuring it fully fades well before height ends */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[150vh] min-h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_50%)] mix-blend-screen" />
        
        {/* Additional concentrated horizontal glow from the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] md:w-[160vw] h-[800px] md:h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_50%)] mix-blend-screen" />

        {/* SVG NOISE to completely destroy banding */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="portfolioNoiseItem">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#portfolioNoiseItem)"/>
        </svg>
      </div>

      <section className="w-full max-w-[1400px] pt-32 md:pt-48 pb-12 px-4 md:px-8 relative z-10 flex flex-col items-start">
        <button 
          onClick={() => navigate('/portfolio')}
          className="group flex flex-row items-center gap-3 text-ivory/50 hover:text-accent transition-colors mb-12 md:mb-20 font-heading text-[10px] md:text-xs tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
          Powrót do prac
        </button>

        {/* HEADER SECTION & DYNAMIC LAYOUT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full mb-16 md:mb-24"
        >
          {project.media.length === 1 ? (
            <div className="flex flex-col gap-20 lg:gap-32">
              <div className="w-full">
                <div className="flex flex-row flex-wrap items-center gap-2 mb-4 opacity-90">
                   {project.categories?.map((c, idx) => (
                     <React.Fragment key={c}>
                       {idx > 0 && <span className="font-heading font-light text-ivory/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase">//</span>}
                       <div className="flex flex-row items-center gap-2">
                          {CATEGORY_ICONS[c] && (
                            <div 
                              className="w-3.5 h-3.5 bg-accent" 
                              style={{ WebkitMask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                            />
                          )}
                          <span className="font-heading font-light text-accent text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                            {c}
                          </span>
                       </div>
                     </React.Fragment>
                   ))}
                </div>
                <h1 className="text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </div>
              
              <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                <div className="lg:w-1/2 w-full flex justify-center group relative break-inside-avoid">
                  {project.media[0].type === 'video' ? (
                    <video 
                      src={project.media[0].src} 
                      autoPlay loop muted playsInline 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                    />
                  ) : (
                    <img 
                      src={project.media[0].src} 
                      alt={project.title} 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="lg:w-1/2 flex flex-col">
                  <div className="border-l-2 border-accent/30 pl-6 lg:pl-10 relative">
                    <div className="absolute top-0 -left-[2px] w-[2px] h-8 bg-accent" />
                    {project.fullDesc.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="font-sans text-ivory/70 text-sm md:text-base leading-relaxed mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/2">
                <div className="flex flex-row flex-wrap items-center gap-2 mb-4 opacity-90">
                   {project.categories?.map((c, idx) => (
                     <React.Fragment key={c}>
                       {idx > 0 && <span className="font-heading font-light text-ivory/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase">//</span>}
                       <div className="flex flex-row items-center gap-2">
                          {CATEGORY_ICONS[c] && (
                            <div 
                              className="w-3.5 h-3.5 bg-accent" 
                              style={{ WebkitMask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, mask: `url(${CATEGORY_ICONS[c]}) no-repeat center`, WebkitMaskSize: 'contain', maskSize: 'contain' }}
                            />
                          )}
                          <span className="font-heading font-light text-accent text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                            {c}
                          </span>
                       </div>
                     </React.Fragment>
                   ))}
                </div>
                <h1 className="text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </div>

              <div className="lg:w-1/2 flex flex-col justify-end">
                <div className="border-l-2 border-accent/30 pl-6 lg:pl-10 relative">
                  <div className="absolute top-0 -left-[2px] w-[2px] h-8 bg-accent" />
                  {project.fullDesc.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="font-sans text-ivory/70 text-sm md:text-base leading-relaxed mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* GALLERY - MASONRY (2 COLUMNS) - NO CROPPING */}
        {project.media.length > 1 && (
          <div className="columns-1 md:columns-2 gap-6 md:gap-12 w-full mt-12 space-y-6 md:space-y-12">
            {project.media.map((item, idx) => {
              const isVideo = item.type === 'video';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full break-inside-avoid flex items-center justify-center group"
                >                
                  {isVideo ? (
                    <video 
                      src={item.src} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={`${project.title} - media ${idx + 1}`} 
                      className="w-full max-h-[85vh] h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2"
                      loading="lazy"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
}
