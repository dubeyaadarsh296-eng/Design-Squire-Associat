import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { STUDIO_IMAGES } from '@/lib/images';

export function BeforeAfter() {
  const { ref, visible } = useScrollReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updateSlider(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouch = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-950 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            Transformation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            Before &amp; After
          </h2>
          <p className="mt-4 text-sm text-cream-300/50 max-w-lg mx-auto">
            Drag the slider to see how spaces are transformed through thoughtful
            design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none"
          data-cursor="view"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouch}
        >
          {/* After image (full) */}
          <img
            src={STUDIO_IMAGES.exterior4}
            alt="After — completed architectural project by Design Square & Associates"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-4 right-4 text-xs tracking-[0.2em] uppercase text-cream-100 bg-ink-950/60 px-3 py-1.5 rounded-full">
            After
          </span>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={STUDIO_IMAGES.exterior1}
              alt="Before — earlier stage of the project"
              className="absolute inset-0 h-full object-cover"
              style={{ width: `${containerRef.current?.offsetWidth || 1000}px` }}
              loading="lazy"
            />
            <span className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase text-cream-100 bg-ink-950/60 px-3 py-1.5 rounded-full">
              Before
            </span>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gold-400 cursor-ew-resize"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            onMouseDown={handleMouseDown}
            onTouchStart={(e) => {
              isDragging.current = true;
              handleTouch(e);
            }}
            onTouchEnd={() => {
              isDragging.current = false;
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-ink-950 shadow-lg">
              <MoveHorizontal size={20} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
