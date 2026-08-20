import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { STUDIO_IMAGES } from '@/lib/images';

const STAGES = [
  {
    label: '2D Floor Plan',
    image:
      'https://images.pexels.com/photos/4458210/pexels-photo-4458210.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Every project begins with precise 2D planning and layout.',
  },
  {
    label: '3D Exterior',
    image: STUDIO_IMAGES.exterior3,
    description: 'The plan is transformed into a realistic 3D visualization.',
  },
  {
    label: 'Finished Project',
    image: STUDIO_IMAGES.exterior1,
    description: 'The design comes to life in the finished built space.',
  },
];

export function BlueprintTo3D() {
  const { ref, visible } = useScrollReveal();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-900 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            From Blueprint to Reality
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image transition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={STAGES[stage].image}
                  alt={STAGES[stage].label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs tracking-[0.2em] uppercase text-cream-100 bg-ink-950/60 px-3 py-1.5 rounded-full">
                  {STAGES[stage].label}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Stage selector */}
          <div className="space-y-6">
            {STAGES.map((s, i) => (
              <motion.button
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                onClick={() => setStage(i)}
                className={`block w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                  stage === i
                    ? 'border-gold-500/40 bg-gold-500/5'
                    : 'border-cream-300/10 hover:border-cream-300/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-serif text-3xl ${
                      stage === i ? 'text-gradient-gold' : 'text-cream-300/20'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      className={`font-serif text-xl ${
                        stage === i ? 'text-cream-100' : 'text-cream-300/60'
                      }`}
                    >
                      {s.label}
                    </h3>
                    <p className="text-sm text-cream-300/50 mt-1">
                      {s.description}
                    </p>
                  </div>
                </div>
                {stage === i && (
                  <motion.div
                    layoutId="stage-indicator"
                    className="h-px bg-gold-500 mt-4 origin-left"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
