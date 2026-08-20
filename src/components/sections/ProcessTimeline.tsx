import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PROCESS_STEPS } from '@/lib/constants';

export function ProcessTimeline() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-900 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            From Idea to Reality
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-12 left-0 right-0 h-px bg-cream-300/10" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={visible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 origin-left"
          />
          <div className="grid grid-cols-8 gap-2 relative">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="relative flex justify-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gold-500 border-4 border-ink-900 z-10" />
                </div>
                <span className="font-serif text-2xl text-gradient-gold block mb-2">
                  {step.num}
                </span>
                <h3 className="text-xs tracking-[0.1em] uppercase text-cream-100 mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-cream-300/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-cream-300/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={visible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 origin-top"
          />
          <div className="space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-gold-500 border-2 border-ink-900" />
                <span className="font-serif text-xl text-gradient-gold block mb-1">
                  {step.num}
                </span>
                <h3 className="text-sm tracking-[0.05em] uppercase text-cream-100 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-cream-300/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
