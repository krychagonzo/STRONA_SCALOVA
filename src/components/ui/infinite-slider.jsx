'use client';
import { cn } from '../../lib/utils';
import { useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}) {
  const [measureRef, { width, height }] = useMeasure();
  const innerRef = useRef(null);
  const durationRef = useRef(duration);
  const animStartedRef = useRef(false);
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const size = direction === 'horizontal' ? width : height;
  const halfSize = size / 2;
  const isH = direction === 'horizontal';
  const animName = `inf-${isH ? 'x' : 'y'}${reverse ? 'r' : 'f'}`;
  const fromVal = reverse ? -halfSize : 0;
  const toVal = reverse ? 0 : -halfSize;

  const setRef = (el) => {
    measureRef(el);
    innerRef.current = el;
  };

  const startAnim = (dur) => {
    const el = innerRef.current;
    if (!el || !halfSize) return;
    durationRef.current = dur;

    // Odczytaj aktualną pozycję, żeby uniknąć skoku do początku
    const raw = window.getComputedStyle(el).transform;
    const matrix = new DOMMatrix(raw === 'none' ? undefined : raw);
    const currentPos = isH ? matrix.m41 : matrix.m42;
    const traveled = Math.abs(currentPos - fromVal);
    const progress = halfSize > 0 ? Math.min(traveled / halfSize, 1) : 0;
    const delay = -progress * dur;

    el.style.animation = 'none';
    // Force reflow TYLKO jeśli element jest w DOM
    void el.offsetWidth;
    el.style.animation = `${animName} ${dur}s linear ${delay}s infinite`;
    el.style.willChange = 'transform';
    animStartedRef.current = true;
  };

  // Uruchom animację gdy halfSize jest dostępny. Przy resizach kontynuuj bez przerwy.
  useEffect(() => {
    if (!halfSize) return;
    // Przy pierwszym uruchomieniu lub gdy jeszcze nie startowało — startuj od zera
    if (!animStartedRef.current) {
      startAnim(durationRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halfSize]);

  return (
    <div className={cn('overflow-hidden', className)}>
      {/* Keyframe injection - oddzielnie od startAnim żeby nie powodować reflow */}
      {halfSize > 0 && (
        <style>{`
          @keyframes ${animName} {
            from { transform: ${isH ? `translateX(${fromVal}px)` : `translateY(${fromVal}px)`}; }
            to   { transform: ${isH ? `translateX(${toVal}px)` : `translateY(${toVal}px)`}; }
          }
        `}</style>
      )}
      <div
        ref={setRef}
        className="flex w-max"
        style={{ gap: `${gap}px`, flexDirection: isH ? 'row' : 'column' }}
        onMouseEnter={durationOnHover && canHover ? () => startAnim(durationOnHover) : undefined}
        onMouseLeave={durationOnHover && canHover ? () => startAnim(duration) : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
