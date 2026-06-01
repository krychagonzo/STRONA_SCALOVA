'use client';
import { cn } from '../../lib/utils';

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className,
}) {
  const isH = direction === 'horizontal';
  const animName = reverse ? 'slide-rev' : 'slide-fwd';
  
  return (
    <div className={cn('overflow-hidden flex', className)} style={{ gap: `${gap}px`, flexDirection: isH ? 'row' : 'column' }}>
      <style>{`
        @keyframes slide-fwd {
          0% { transform: ${isH ? 'translateX(0)' : 'translateY(0)'}; }
          100% { transform: ${isH ? `translateX(calc(-100% - ${gap}px))` : `translateY(calc(-100% - ${gap}px))`}; }
        }
        @keyframes slide-rev {
          0% { transform: ${isH ? `translateX(calc(-100% - ${gap}px))` : `translateY(calc(-100% - ${gap}px))`}; }
          100% { transform: ${isH ? 'translateX(0)' : 'translateY(0)'}; }
        }
        .animate-infinite-slider {
          animation: ${animName} ${duration}s linear infinite;
        }
      `}</style>
      <div 
        className="flex shrink-0 animate-infinite-slider" 
        style={{ gap: `${gap}px`, flexDirection: isH ? 'row' : 'column' }}
      >
        {children}
      </div>
      <div 
        className="flex shrink-0 animate-infinite-slider" 
        style={{ gap: `${gap}px`, flexDirection: isH ? 'row' : 'column' }} 
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
