import React, { useEffect, useRef } from 'react';

// Bayer 4x4 ordered dithering matrix, normalized to [-1, 1]
const BAYER4 = [
   0,  8,  2, 10,
  12,  4, 14,  6,
   3, 11,  1,  9,
  15,  7, 13,  5,
].map(v => (v / 16 - 0.5) * 2);

export default function ServiceHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    const DURATION_MS = 2500;  
    const GLOW_FINAL  = 0.50;  

    const BR = 14, BG = 14, BB = 14;   // base #0E0E0E
    const GR = 42, GG = 42, GB = 42;   // glow #2a2a2a (gray)

    const drawAt = (glowT, w, h) => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const cx = w * 0.5;
      const cy = h; // ellipse_at_bottom
      const rx = w * 0.75; 
      const ry = h * 0.8;  

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
    drawAt(currentGlow, w, h);

    let rafId = null;
    let startTs = null;

    const animate = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      drawAt(currentGlow, w, h);
      if (p < 1.0) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w;
      canvas.height = h;
      drawAt(currentGlow, w, h);
    });
    ro.observe(canvas);

    return () => {
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
