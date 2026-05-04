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
  // Hover speed change only fires on real pointer devices — touch simulates enter/leave
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const size = direction === 'horizontal' ? width : height;
  const halfSize = size / 2;
  const isH = direction === 'horizontal';
  // Stable animation name based on direction + reverse; doesn't change on resize
  const animName = `inf-${isH ? 'x' : 'y'}${reverse ? 'r' : 'f'}`;
  const fromVal = reverse ? -halfSize : 0;
  const toVal = reverse ? 0 : -halfSize;

  const setRef = (el) => {
    measureRef(el);
    innerRef.current = el;
  };

  // Start or restart the CSS animation, reading current position for seamless speed changes
  const startAnim = (dur) => {
    const el = innerRef.current;
    if (!el || !halfSize) return;
    durationRef.current = dur;
    const raw = window.getComputedStyle(el).transform;
    const matrix = new DOMMatrix(raw === 'none' ? undefined : raw);
    const currentPos = isH ? matrix.m41 : matrix.m42;
    const traveled = Math.abs(currentPos - fromVal);
    const progress = Math.min(traveled / halfSize, 1);
    const delay = -progress * dur;
    el.style.animation = 'none';
    el.offsetHeight; // force reflow so 'none' takes effect before re-applying
    el.style.animation = `${animName} ${dur}s linear ${delay}s infinite`;
  };

  // Start / restart when halfSize becomes available or changes (window resize)
  useEffect(() => {
    if (halfSize) startAnim(durationRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halfSize]);

  return (
    <div className={cn('overflow-hidden', className)}>
      {/* Keyframe values depend on halfSize — re-injected on resize */}
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
