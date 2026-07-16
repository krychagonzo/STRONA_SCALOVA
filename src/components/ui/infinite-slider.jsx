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
    <div className={cn('overflow-hidden flex', className)} style={{ flexDirection: isH ? 'row' : 'column' }}>
      <style>{`
        @keyframes slide-fwd {
          0% { transform: ${isH ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)'}; }
          100% { transform: ${isH ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, -100%, 0)'}; }
        }
        @keyframes slide-rev {
          0% { transform: ${isH ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, -100%, 0)'}; }
          100% { transform: ${isH ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)'}; }
        }
        .animate-infinite-slider {
          animation: ${animName} ${duration}s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      <div 
        className="flex shrink-0 animate-infinite-slider" 
        style={{ 
          gap: `${gap}px`, 
          flexDirection: isH ? 'row' : 'column',
          paddingRight: isH ? `${gap}px` : undefined,
          paddingBottom: !isH ? `${gap}px` : undefined
        }}
      >
        {children}
      </div>
      <div 
        className="flex shrink-0 animate-infinite-slider" 
        style={{ 
          gap: `${gap}px`, 
          flexDirection: isH ? 'row' : 'column',
          paddingRight: isH ? `${gap}px` : undefined,
          paddingBottom: !isH ? `${gap}px` : undefined
        }} 
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
