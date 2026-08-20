import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';

export function MidCTA() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-ink-850 overflow-hidden">
      <div className="blueprint-grid-fine absolute inset-0 opacity-30" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100 leading-tight text-balance">
            Have a Plot?
            <br />
            <span className="text-gradient-gold italic">
              Let&apos;s Turn It Into Your Dream Home.
            </span>
          </h2>
          <button
            onClick={openForm}
            className="mt-8 group inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 px-8 py-4 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
          >
            Discuss Your Project
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
