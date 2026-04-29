import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Bayer 4×4 ordered dithering matrix, normalized to [-1, 1]
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    const DELAY_MS    = 2000;  // wait before starting
    const DURATION_MS = 2500;  // slow, smooth transition
    const GLOW_FINAL  = 0.50;  // resting intensity (subtle, not dramatic)

    const BR = 14, BG = 14, BB = 14;   // base #0E0E0E — same as site bg
    const GR = 42, GG = 42, GB = 54;   // glow #2A2A36 — slightly lighter/cooler

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = h;
      const rx = w * 0.80;
      const ry = h * 0.58;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const dither = BAYER4[(y & 3) * 4 + (x & 3)];
          const dx = (x - cx) / rx;
          const dy = (y - cy) / ry;
          const t  = Math.min(Math.sqrt(dx * dx + dy * dy), 1.0);
          const ss = 1 - t * t * (3 - 2 * t); // smoothstep
          const alpha = ss * glowT;
          const r = BR + (GR - BR) * alpha;
          const g = BG + (GG - BG) * alpha;
          const b = BB + (GB - BB) * alpha;
          const n = dither * 2;
          data[i]     = Math.min(255, Math.max(0, r + n));
          data[i + 1] = Math.min(255, Math.max(0, g + n));
          data[i + 2] = Math.min(255, Math.max(0, b + n));
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width  = w;
    canvas.height = h;

    // Start as pure obsidian — identical to rest of page
    let currentGlow = 0;
    drawAt(currentGlow, w, h);

    let rafId = null;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      // ease-in-out sine — slow start, smooth middle, slow end
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawAt(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
      // done — stays at GLOW_FINAL, no more frames
    };

    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, DELAY_MS);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      drawAt(currentGlow, w, h);
    });
    ro.observe(canvas);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Hero() {
  const comp = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-anim-left', {
        x: '20vw',
        y: '10vh',
        opacity: 0,
        filter: 'blur(10px)',
        duration: 3,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 2,
        force3D: true
      });
      gsap.from('.hero-anim-right', {
        x: '-20vw',
        y: '-10vh',
        opacity: 0,
        filter: 'blur(10px)',
        duration: 3,
        ease: 'power3.out',
        delay: 2.2,
        force3D: true
      });
      gsap.to('.front-logo-wrapper', {
        x: '50vw',
        y: '-50vh',
        scale: 0.8,
        opacity: 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: comp.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <section ref={comp} className="relative w-full h-[100dvh] overflow-hidden flex items-end">

      {/* Canvas background — Bayer-dithered gradient, zero banding */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="relative w-full px-4 sm:px-8 xl:px-16 h-full flex flex-col items-center justify-center pt-10 md:pt-20">
        <div className="w-full max-w-[1920px] flex flex-col items-center">
          <div id="hero-content-wrapper" className="w-full flex flex-col select-none relative z-40">
            <span className="hero-anim-left gpu-accelerated self-start inline-block font-heading font-light text-accent text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 opacity-90">
               // AGENCJA SKALOWANIA BIZNESU
            </span>

            <span className="hero-anim-left gpu-accelerated self-start font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory/90 leading-tight">
              Skaluj biznes,
            </span>

            <div className="h-8 sm:h-12 md:h-20 lg:h-[4rem] xl:h-[6rem] w-full"></div>

            <span className="hero-anim-right gpu-accelerated self-end font-heading font-light text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory leading-[0.9] text-right mt-4 md:mt-0">
              odzyskaj czas.
            </span>
          </div>
        </div>
      </div>

      {/* Front logo animation layer */}
      <div className="front-logo-wrapper gpu-accelerated absolute inset-0 z-30 pointer-events-none">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ANIM_05_LOGO_1.webm" type="video/webm" />
        </video>
      </div>

    </section>

    {/* Subtext Section (moved from Hero) */}
    <section className="w-full bg-obsidian py-16 px-4 sm:px-8 xl:px-16 flex justify-center relative z-10">
      <div className="w-full max-w-[1920px] flex justify-center">
        <p className="text-center text-ivory/80 text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] tracking-tight font-sans w-full leading-relaxed mx-auto">
          Przeprowadzamy audyt, usprawniamy firmy od środka, budujemy ich pozycję na&nbsp;zewnątrz.
        </p>
      </div>
    </section>
    </>
  );
}
