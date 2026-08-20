import { motion } from 'framer-motion';
import {
  Ruler,
  Building2,
  Sofa,
  Box,
  Home,
  Briefcase,
  Hammer,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';

const ICONS: Record<string, LucideIcon> = {
  Ruler,
  Building2,
  Sofa,
  Box,
  Home,
  Briefcase,
  Hammer,
};

export function Services() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-950 overflow-hidden"
    >
      <div className="blueprint-grid-fine absolute inset-0 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-300/5 rounded-xl overflow-hidden">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative bg-ink-900 p-8 md:p-10 hover:bg-ink-850 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors">
                      <Icon size={24} />
                    </div>
                  )}
                  <span className="text-5xl font-serif text-cream-300/5 group-hover:text-gold-500/10 transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-cream-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-cream-300/60 leading-relaxed">
                  {service.description}
                </p>
                <button
                  onClick={openForm}
                  className="mt-6 flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-gold-400/0 group-hover:text-gold-400 transition-all duration-300"
                >
                  Enquire
                  <ArrowUpRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
