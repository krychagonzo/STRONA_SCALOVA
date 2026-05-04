import React, { useEffect, useRef } from 'react';

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
      startDrawLoop();
    };

    const handleMouseLeave = () => {
      isActive = false;
      startDrawLoop(); // let glowOffset decay to 0
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      targetMouseX = touch.clientX - rect.left;
      targetMouseY = touch.clientY - rect.top;
      if (!isActive) {
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
        isActive = true;
      }
      startDrawLoop();
    };

    const handleTouchEnd = () => {
      isActive = false;
      startDrawLoop();
    };

    const section = canvas.closest('section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
      section.addEventListener('touchmove', handleTouchMove, { passive: true });
      section.addEventListener('touchend', handleTouchEnd);
    }

    const startDrawLoop = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const draw = () => {
      animationFrameId = null;

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

      // Base pass: all dots at constant opacity (no globalAlpha switch per dot)
      ctx.globalAlpha = 0.3;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * spacing + spacing / 2;
          const y = offsetY + r * spacing + spacing / 2;
          ctx.beginPath();
          ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Active pass: only dots near cursor, drawn on top
      if (glowOffset > 0.005) {
        for (let r = 0; r <= rows; r++) {
          for (let c = 0; c <= cols; c++) {
            const x = offsetX + c * spacing + spacing / 2;
            const y = offsetY + r * spacing + spacing / 2;
            const dx = currentMouseX - x;
            const dy = currentMouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < activeRadius) {
              const intensity = 1 - (distance / activeRadius);
              const easeIntensity = Math.pow(intensity, 1.4) * glowOffset;
              const rScale = baseRadius * (1 + easeIntensity * 1.5);
              ctx.globalAlpha = 0.3 + (easeIntensity * 0.35);
              ctx.beginPath();
              ctx.arc(x, y, rScale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Only keep the loop alive if something is still animating
      if (isActive || glowOffset > 0.005) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    // Draw once (idle state — loop stops immediately since !isActive && glowOffset=0)
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
        section.removeEventListener('touchmove', handleTouchMove);
        section.removeEventListener('touchend', handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />;
};

export default InteractiveDotGrid;
