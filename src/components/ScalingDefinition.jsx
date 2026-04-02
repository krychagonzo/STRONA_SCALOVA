import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveDotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = 0;
    let height = 0;
    
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let isActive = false;
    let glowOffset = 0;

    const spacing = 24;
    const baseRadius = 1.5; 
    const activeRadius = 150; 

    const updateSize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Initialize map
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      
      if (!isActive) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
        isActive = true;
      }
    };

    const handleMouseLeave = () => {
      isActive = false;
    };

    const section = canvas.closest('section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    const draw = () => {
      if (isActive) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.15;
        currentMouseY += (targetMouseY - currentMouseY) * 0.15;
      }
      
      glowOffset += ((isActive ? 1 : 0) - glowOffset) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      const offsetX = (width - cols * spacing) / 2;
      const offsetY = (height - rows * spacing) / 2;

      ctx.fillStyle = 'rgb(212, 255, 0)';

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * spacing + spacing / 2;
          const y = offsetY + r * spacing + spacing / 2;
          
          const dx = currentMouseX - x;
          const dy = currentMouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let rScale = baseRadius;
          let opacity = 0.3;
          
          if (distance < activeRadius && glowOffset > 0.01) {
            const intensity = 1 - (distance / activeRadius);
            const easeIntensity = Math.pow(intensity, 1.4) * glowOffset;
            // Lekkie powiększenie bez mocnego świecenia
            rScale = baseRadius * (1 + easeIntensity * 1.5);
            // Tylko trochę jaśniejsze u szczytu (od 0.3 z max podbiciem do 0.65)
            opacity = 0.3 + (easeIntensity * 0.35);
          }
          
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, rScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />;
};

export default function ScalingDefinition() {
  return (
    <section className="relative w-full bg-obsidian flex flex-col justify-center items-center z-10 border-y border-slate/20">
      <div className="w-full bg-obsidian text-ivory py-24 md:py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Interactive Radial Dot Matrix Wrapper */}
        <div className="absolute inset-0 flex justify-center w-full h-[calc(100%+2rem)] mt-[-1rem] z-0">
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
        
        <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium leading-relaxed md:leading-snug text-balance text-ivory/80 pointer-events-auto">
              Skalowanie to inwestycja, która pracuje bez końca. Wdrażasz technologię raz, aby obsługiwać <span className="font-extrabold text-accent tracking-tight drop-shadow-[0_0_15px_rgba(212,255,0,0.5)]">10x więcej klientów</span> bez powiększania zespołu i stałych kosztów.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
