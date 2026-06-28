import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Bayer 4×4 ordered dithering matrix — eliminates banding on dark gradients
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

    const DELAY_MS    = 2000;
    const DURATION_MS = 2500;
    const GLOW_FINAL  = 0.50;

    const BR = 14, BG = 14, BB = 14;
    const GR = 42, GG = 42, GB = 54;

    const drawDithered = (glowT, w, h) => {
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
          const ss = 1 - t * t * (3 - 2 * t);
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

    let currentGlow = 0;
    drawDithered(currentGlow, w, h);

    let rafId = null;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawDithered(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, DELAY_MS);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      drawDithered(currentGlow, w, h);
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

// Renders the last animation frame (lossless WebP with alpha) onto a canvas,
// applying the same chromakey to guarantee transparent background.
function StaticLastFrame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width  = CW;
    canvas.height = CH;

    const img = new Image();
    img.src = '/HERO_ANIM_last.webp';
    img.onload = () => {
      ctx.clearRect(0, 0, CW, CH);
      ctx.drawImage(img, 0, 0, CW, CH);
      const frame = ctx.getImageData(0, 0, CW, CH);
      const d = frame.data;
      const LOW = 14, HIGH = 50, RANGE = HIGH - LOW;
      for (let i = 0; i < d.length; i += 4) {
        const brightness = d[i] > d[i + 1]
          ? (d[i] > d[i + 2] ? d[i] : d[i + 2])
          : (d[i + 1] > d[i + 2] ? d[i + 1] : d[i + 2]);
        if (brightness < HIGH) {
          d[i + 3] = brightness <= LOW
            ? 0
            : Math.round(((brightness - LOW) / RANGE) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto block"
      style={{ willChange: 'transform' }}
    />
  );
}

// Canvas pixel-chromakey: draws dark-bg MP4 to canvas and keys out
// near-black background (#0E0E0E), giving true transparency on all browsers.
// When video autoplay is blocked (battery saver / power mode), falls back
// to a static transparent WebP of the final frame.
const CW = 480;
const CH = 270;

function MobileHeroCanvas() {
  const canvasRef = useRef(null);
  const videoRef  = useRef(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;

    // Attempt playback — catch rejection caused by battery saver / autoplay policy
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => setBlocked(true));
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width  = CW;
    canvas.height = CH;

    let rafId;
    let lastTs = 0;
    const FRAME_MS = 1000 / 30;

    const drawFrame = (ts) => {
      rafId = requestAnimationFrame(drawFrame);
      if (ts - lastTs < FRAME_MS - 2) return;
      lastTs = ts;
      if (video.readyState < 2 || video.paused || video.ended) return;

      // Clear to fully transparent before each frame
      ctx.clearRect(0, 0, CW, CH);
      ctx.drawImage(video, 0, 0, CW, CH);
      const frame = ctx.getImageData(0, 0, CW, CH);
      const d = frame.data;

      // Smooth alpha ramp: transparent at ≤14 (= bg colour), opaque at ≥50
      const LOW = 14, HIGH = 50, RANGE = HIGH - LOW;
      for (let i = 0; i < d.length; i += 4) {
        const brightness = d[i] > d[i + 1]
          ? (d[i] > d[i + 2] ? d[i] : d[i + 2])
          : (d[i + 1] > d[i + 2] ? d[i + 1] : d[i + 2]);
        if (brightness < HIGH) {
          d[i + 3] = brightness <= LOW
            ? 0
            : Math.round(((brightness - LOW) / RANGE) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    rafId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Battery saver / autoplay blocked → draw static last frame through canvas chromakey
  if (blocked) {
    return <StaticLastFrame />;
  }

  return (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          top: 0,
          left: 0,
        }}
      >
        <source src="/HERO_ANIM_mobile.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

export default function Hero() {
  const comp     = useRef(null);
  const textDone = useRef(false);

  const revealMobileText = useCallback(() => {
    if (textDone.current) return;
    textDone.current = true;
    gsap.fromTo('.hero-anim-mobile',
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: (i) => i === 0 ? 0.9 : 1,
        duration: 1.8,
        stagger: 0.18,
        ease: 'power3.out',
        force3D: true,
      }
    );
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Desktop animations
      gsap.fromTo('.hero-anim-left',
        { x: '15vw', y: '8vh', opacity: 0 },
        { x: 0, y: 0, opacity: (i) => i === 0 ? 0.9 : 1, duration: 2.5, stagger: 0.1, ease: 'power3.out', delay: 2, force3D: true }
      );
      gsap.fromTo('.hero-anim-right',
        { x: '-15vw', y: '-8vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 2.5, ease: 'power3.out', delay: 2.2, force3D: true }
      );

      // Scroll parallax — desktop only
      if (window.innerWidth >= 1200) {
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
            preventOverlaps: true,
          },
        });
      }
    }, comp);

    // Mobile: text always appears after 2 s — animation plays concurrently
    let textTimer;
    if (window.innerWidth < 768) {
      textTimer = setTimeout(revealMobileText, 2000);
    }

    return () => {
      ctx.revert();
      clearTimeout(textTimer);
    };
  }, [revealMobileText]);

  return (
    <>
    <section ref={comp} className="relative w-full h-[112svh] md:h-[100svh] overflow-hidden flex items-end">

      {/* Canvas background — Bayer-dithered glow, zero banding */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* Desktop content */}
      <div className="relative w-full px-4 sm:px-8 xl:px-16 h-full hidden md:flex flex-col items-center justify-center md:pt-20">
        <div className="w-full max-w-[1920px] flex flex-col items-center">
          <div id="hero-content-wrapper" className="w-full flex flex-col select-none relative z-40">
            <span className="hero-anim-left opacity-0 gpu-accelerated self-start inline-block font-heading font-light text-accent text-xs tracking-[0.2em] uppercase mb-8">
               // AGENCJA SKALOWANIA BIZNESU
            </span>
            <span className="hero-anim-left opacity-0 gpu-accelerated self-start font-heading font-light md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory/90 leading-tight">
              Skaluj biznes,
            </span>
            <div className="h-20 lg:h-[4rem] xl:h-[6rem] w-full"></div>
            <span className="hero-anim-right opacity-0 gpu-accelerated self-end font-heading font-light md:text-7xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight text-ivory leading-[0.9] text-right">
              odzyskaj czas.
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: 3D logo animation — 200 vw wide (clipped), logo edge-to-edge */}
      {typeof window !== 'undefined' && window.innerWidth < 768 && (
        <div
          className="absolute z-30 pointer-events-none overflow-hidden"
          style={{ top: '4%', left: '-47vw', right: '-53vw' }}
        >
          <MobileHeroCanvas />
        </div>
      )}

      {/* Mobile text — fades in after 2 s, sits right below the animation */}
      <div
        className="md:hidden absolute inset-x-0 z-40 pointer-events-none select-none px-6 flex flex-col items-center text-center"
        style={{ top: 'calc(4% + 104vw)' }}
      >
        <span className="hero-anim-mobile opacity-0 font-heading font-light text-accent text-[11px] tracking-[0.25em] uppercase mb-4">
          // AGENCJA SKALOWANIA BIZNESU
        </span>
        <h1 className="hero-anim-mobile opacity-0 font-heading font-light tracking-tight text-ivory/90 text-[12.5vw] leading-[1.05] flex flex-col gap-[0.1em]">
          <span>Skaluj biznes,</span>
          <span className="text-ivory">odzyskaj czas.</span>
        </h1>
      </div>

      {/* Desktop logo animation layer */}
      <div className="front-logo-wrapper gpu-accelerated absolute inset-0 z-30 pointer-events-none hidden md:block">
        {typeof window !== 'undefined' && window.innerWidth >= 1200 && (
          <video
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain scale-[1.6]"
          >
            <source src="/ANIM_05_LOGO_1.webm" type="video/webm" />
          </video>
        )}
      </div>

    </section>

    {/* Subtext Section */}
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
