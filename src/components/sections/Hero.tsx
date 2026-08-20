import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLeadForm } from '@/components/LeadFormContext';
import { STUDIO } from '@/lib/constants';
import { STUDIO_IMAGES } from '@/lib/images';

export function Hero() {
  const { openForm } = useLeadForm();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector('#intro');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePos.x * -20,
          y: mousePos.y * -20,
          scale: 1.08,
        }}
      >
        <img
          src={STUDIO_IMAGES.exterior1}
          alt="Architectural project by Design Square & Associates — Gorakhpur"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
          style={{
            x: mousePos.x * 15,
            y: mousePos.y * 10,
          }}
        >
          <p className="text-[11px] md:text-xs tracking-[0.35em] text-gold-400 uppercase mb-6">
            {STUDIO.fullName}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream-100 leading-[1.1] text-balance">
            We Design Spaces That{' '}
            <span className="italic text-gradient-gold">Define</span> the Way You
            Live.
          </h1>
          <p className="mt-6 text-sm md:text-base text-cream-300/70 tracking-wide max-w-2xl mx-auto leading-relaxed">
            Architectural Design &bull; Engineering &bull; Interior Design &bull;{' '}
            3D Visualization
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToNext}
              className="group flex items-center gap-2 bg-cream-100 hover:bg-white text-ink-950 px-7 py-3.5 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
            >
              Explore Our Designs
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={openForm}
              className="group flex items-center gap-2 border border-gold-500/50 text-gold-400 hover:bg-gold-500 hover:text-ink-950 px-7 py-3.5 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
            >
              Get Your Dream Home Designed
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300/50 hover:text-gold-400 transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
