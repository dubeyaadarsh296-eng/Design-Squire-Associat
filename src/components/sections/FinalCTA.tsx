import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';
import { STUDIO } from '@/lib/constants';
import { STUDIO_IMAGES } from '@/lib/images';

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-ink-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={STUDIO_IMAGES.exterior5}
          alt="Architectural project backdrop — Design Square & Associates"
          className="w-full h-full object-cover opacity-15"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/80 to-ink-900" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-6">
            Let&apos;s Begin
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream-100 leading-tight text-balance">
            Your Dream Home Starts With a{' '}
            <span className="italic text-gradient-gold">Conversation.</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-cream-300/60 leading-relaxed max-w-xl mx-auto">
            Have a plot, concept or simply an idea? Let&apos;s turn it into a
            space designed around you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openForm}
              className="group flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 px-7 py-3.5 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <a
              href={`tel:${STUDIO.phoneRaw}`}
              className="group flex items-center gap-2 border border-cream-300/20 text-cream-100 hover:border-gold-500/40 hover:text-gold-400 px-7 py-3.5 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
            >
              <Phone size={16} />
              Call {STUDIO.architect}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
