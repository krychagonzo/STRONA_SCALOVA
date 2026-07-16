import { useEffect, useRef, useCallback } from 'react';
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

// ─────────────────────────────────────────────────────────────────
// MobileHeroChromakey — DPR-aware canvas, max jakość na Retina.
//
// • Renderuje w natywnej gęstości pikseli (cap 3×):
//   iPhone 15 Pro (DPR=3): canvas 1440×810 → zero CSS upscale.
// • imageSmoothingQuality:'high' → bicubic drawImage.
// • Rampa alpha 10→60 → ostrzejsze krawędzie logo.
// • BEZ loop: po zakończeniu wideo canvas zostaje z ostatnią klatką.
// • RVFC: getImageData tylko przy nowej klatce (30×/s nie 60×/s).
// ─────────────────────────────────────────────────────────────────
function MobileHeroChromakey() {
  const canvasRef = useRef(null);
  const videoRef  = useRef(null);
  const rafRef    = useRef(null);
  const rvfcRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video  = videoRef.current;
    if (!canvas || !video) return;

    // Natywna rozdzielczość fizyczna — cap 4× (maksymalna jakość Retina)
    const dpr = Math.min(window.devicePixelRatio || 1, 4);
    const W = Math.round(480 * dpr);
    const H = Math.round(270 * dpr);

    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';  // bicubic przy drawImage

    // Rampa alpha: LOW=10 (tło), HIGH=60 (krawędź) → ostrzejsze krawędzie logo
    const LOW = 10, HIGH = 60, RANGE = HIGH - LOW;

    const processFrame = () => {
      if (video.readyState < 2) return;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(video, 0, 0, W, H);
      const frame = ctx.getImageData(0, 0, W, H);
      const d = frame.data;
      for (let i = 0; i < d.length; i += 4) {
        const b = d[i] > d[i+1]
          ? (d[i] > d[i+2] ? d[i] : d[i+2])
          : (d[i+1] > d[i+2] ? d[i+1] : d[i+2]);
        if (b < HIGH) {
          d[i+3] = b <= LOW ? 0 : Math.round(((b - LOW) / RANGE) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    // Fallback dla trybu oszczędzania energii (autoplay zablokowany)
    const renderStaticFallback = () => {
      const img = new Image();
      img.src = '/HERO_ANIM_last.webp';
      img.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, W, H);
        const frame = ctx.getImageData(0, 0, W, H);
        const d = frame.data;
        for (let i = 0; i < d.length; i += 4) {
          const b = d[i] > d[i+1] ? (d[i] > d[i+2] ? d[i] : d[i+2]) : (d[i+1] > d[i+2] ? d[i+1] : d[i+2]);
          if (b < HIGH) {
            d[i+3] = b <= LOW ? 0 : Math.round(((b - LOW) / RANGE) * 255);
          }
        }
        ctx.putImageData(frame, 0, 0);
      };
    };

    const supportsRVFC = typeof video.requestVideoFrameCallback === 'function';

    const startLoop = () => {
      if (supportsRVFC) {
        const onFrame = () => {
          processFrame();
          if (!video.ended) rvfcRef.current = video.requestVideoFrameCallback(onFrame);
        };
        rvfcRef.current = video.requestVideoFrameCallback(onFrame);
      } else {
        let lastTs = 0;
        const FRAME_MS = 1000 / 30;
        const loop = (ts) => {
          if (video.ended) return;
          rafRef.current = requestAnimationFrame(loop);
          if (ts - lastTs < FRAME_MS - 2) return;
          lastTs = ts;
          processFrame();
        };
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          startLoop();
        }).catch(() => {
          // Play zablokowany (np. tryb oszczędzania energii) -> ładujemy ostatnią klatkę
          renderStaticFallback();
        });
      } else {
        startLoop();
      }
    };

    if (video.readyState >= 1) {
      tryPlay();
    } else {
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
    }

    // Zatrzymaj pętlę rysowania gdy wideo dobiegnie końca — canvas trzyma ostatnią klatkę
    const onEnded = () => {
      cancelAnimationFrame(rafRef.current);
      if (rvfcRef.current && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(rvfcRef.current);
        rvfcRef.current = null;
      }
      processFrame();
    };

    video.addEventListener('ended', onEnded, { once: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (rvfcRef.current && video.cancelVideoFrameCallback) {
        video.cancelVideoFrameCallback(rvfcRef.current);
      }
      video.removeEventListener('ended', onEnded);
    };
  }, []);

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
        <source src="/HERO_ANIM_mobile.mp4"  type="video/mp4"  />
        <source src="/HERO_ANIM_mobile.webm" type="video/webm" />
      </video>
      <canvas
        ref={canvasRef}
        className="w-full h-auto block"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
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
    // Staggered line-by-line reveal — crisp on 60 Hz mobile screens
    gsap.fromTo('.hero-anim-mobile',
      { y: 48, opacity: 0, rotateX: 8 },
      {
        y: 0,
        rotateX: 0,
        opacity: (i) => i === 0 ? 0.85 : 1,
        duration: 1.4,
        stagger: 0.22,
        ease: 'power4.out',
        force3D: true,
        transformOrigin: 'center bottom',
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

    // Mobile: text always appears after 1.6 s — snappier reveal
    let textTimer;
    if (window.innerWidth < 768) {
      textTimer = setTimeout(revealMobileText, 1600);
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

      {/* Mobile: 3D logo animation — DPR-aware canvas chromakey */}
      <div
        className="md:hidden absolute z-30 pointer-events-none overflow-hidden"
        style={{ top: '4%', left: '-47vw', right: '-53vw' }}
      >
        <MobileHeroChromakey />
      </div>

      {/* Mobile text — fades in after 1.6 s, sits right below the animation */}
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
            style={{ mixBlendMode: 'screen' }}
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
