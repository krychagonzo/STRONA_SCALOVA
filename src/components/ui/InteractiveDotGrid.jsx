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

      ctx.fillStyle = 'rgb(212, 255, 0)'; // Accent color

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
            rScale = baseRadius * (1 + easeIntensity * 1.5);
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

export default InteractiveDotGrid;
