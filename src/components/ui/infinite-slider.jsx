'use client';
import { cn } from '../../lib/utils';
import { useMotionValue, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const isHovered = useRef(false);
  const controlsRef = useRef(null);

  const size = direction === 'horizontal' ? width : height;
  const halfSize = size / 2;

  useEffect(() => {
    if (!halfSize) return;

    const from = reverse ? -halfSize : 0;
    const to = reverse ? 0 : -halfSize;

    const startAnimation = (dur) => {
      if (controlsRef.current) controlsRef.current.stop();
      controlsRef.current = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: dur * (Math.abs(translation.get() - to) / halfSize),
        onComplete: () => {
          translation.set(from);
          controlsRef.current = animate(translation, [from, to], {
            ease: 'linear',
            duration: dur,
            repeat: Infinity,
            repeatType: 'loop',
          });
        },
      });
    };

    startAnimation(duration);
    return () => { controlsRef.current?.stop(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [halfSize, direction, reverse]);

  const handleMouseEnter = () => {
    if (!durationOnHover) return;
    isHovered.current = true;
    if (controlsRef.current) controlsRef.current.stop();
    controlsRef.current = animate(translation, [translation.get(), reverse ? 0 : -halfSize], {
      ease: 'linear',
      duration: durationOnHover * (Math.abs(translation.get() - (reverse ? 0 : -halfSize)) / halfSize),
      onComplete: () => {
        translation.set(reverse ? -halfSize : 0);
        if (isHovered.current) {
          controlsRef.current = animate(translation, [reverse ? -halfSize : 0, reverse ? 0 : -halfSize], {
            ease: 'linear',
            duration: durationOnHover,
            repeat: Infinity,
            repeatType: 'loop',
          });
        }
      },
    });
  };

  const handleMouseLeave = () => {
    if (!durationOnHover) return;
    isHovered.current = false;
    if (controlsRef.current) controlsRef.current.stop();
    controlsRef.current = animate(translation, [translation.get(), reverse ? 0 : -halfSize], {
      ease: 'linear',
      duration: duration * (Math.abs(translation.get() - (reverse ? 0 : -halfSize)) / halfSize),
      onComplete: () => {
        translation.set(reverse ? -halfSize : 0);
        controlsRef.current = animate(translation, [reverse ? -halfSize : 0, reverse ? 0 : -halfSize], {
          ease: 'linear',
          duration: duration,
          repeat: Infinity,
          repeatType: 'loop',
        });
      },
    });
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        ref={ref}
        className='flex w-max'
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
