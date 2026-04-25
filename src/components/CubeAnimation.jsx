import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CubeAnimation.css';

export default function CubeAnimation() {
  const cubeRef = useRef(null);

  useEffect(() => {
    // Continuous 3D rotation
    gsap.to(cubeRef.current, {
      rotationX: 360,
      rotationY: 360,
      rotationZ: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // Pulsing effect using GSAP
    gsap.to('.cube-face', {
      boxShadow: "0 0 30px rgba(212, 255, 0, 0.4), inset 0 0 20px rgba(212, 255, 0, 0.2)",
      borderColor: "rgba(212, 255, 0, 1)",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, []);

  return (
    <div className="scene-container w-full flex justify-center items-center my-6 md:my-10">
      <div className="cube" ref={cubeRef}>
        <div className="cube-face front">
          <div className="flex flex-col items-center justify-center w-full h-full gap-2 p-2 relative overflow-hidden">
            <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            </div>
            <span className="font-heading font-light text-[8px] md:text-[10px] text-accent mt-2 tracking-widest absolute bottom-2">AI CORE</span>
          </div>
        </div>
        <div className="cube-face back">
          <div className="font-heading font-light text-[10px] text-accent/70 text-center uppercase tracking-widest px-2">
            [SYSTEM<br/>ONLINE]
          </div>
        </div>
        <div className="cube-face right">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(212,255,0,0.8)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="cube-face left">
          <div className="grid grid-cols-3 gap-1 w-12 h-12 md:w-16 md:h-16">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-accent/40 rounded-sm shadow-[0_0_5px_rgba(212,255,0,0.5)]" style={{ animation: `pulse 2s infinite ${i * 0.15}s` }}></div>
            ))}
          </div>
        </div>
        <div className="cube-face top">
          <span className="font-heading font-light text-[10px] text-accent/50 rotate-90 tracking-widest">SYNC</span>
        </div>
        <div className="cube-face bottom">
          <div className="w-12 h-1 bg-accent/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
