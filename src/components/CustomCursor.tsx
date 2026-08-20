import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useScrollReveal';

type CursorLabel = '' | 'VIEW' | 'EXPLORE' | 'OPEN';

export function CustomCursor() {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<CursorLabel>('');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        '[data-cursor], a, button, input, textarea, select, [role="button"]'
      ) as HTMLElement | null;
      if (interactive) {
        const cursorType = interactive.getAttribute('data-cursor');
        setHovering(true);
        if (cursorType === 'view') setLabel('VIEW');
        else if (cursorType === 'explore') setLabel('EXPLORE');
        else if (cursorType === 'open') setLabel('OPEN');
        else setLabel('');
      } else {
        setHovering(false);
        setLabel('');
      }
    };

    document.body.classList.add('cursor-none-desktop');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      document.body.classList.remove('cursor-none-desktop');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-gold-400"
        style={{ transition: 'width 0.2s, height 0.2s' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          width: hovering ? (label ? 80 : 40) : 28,
          height: hovering ? (label ? 80 : 40) : 28,
          transition: 'width 0.25s, height 0.25s',
        }}
      >
        <div
          className="rounded-full border border-gold-400/50 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: label ? 'rgba(212,160,73,0.12)' : 'transparent',
          }}
        >
          {label && (
            <span className="text-[9px] tracking-[0.2em] text-gold-300 font-medium">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
