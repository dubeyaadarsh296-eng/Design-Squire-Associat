import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';
import { STUDIO } from '@/lib/constants';
import { STUDIO_IMAGES } from '@/lib/images';

export function About() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-900 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
              <img
                src={STUDIO_IMAGES.studio}
                alt={`${STUDIO.architect} — ${STUDIO.role} | Design Square & Associates`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-8 w-48 h-48 border border-gold-500/20 rounded-2xl -z-0 hidden md:block" />
            <div className="absolute -top-4 -left-4 lg:left-8 w-32 h-32 border border-gold-500/10 rounded-2xl -z-0 hidden md:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
              About the Architect
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-100 leading-tight">
              Designed With Vision.
              <br />
              <span className="italic text-gradient-gold">Built With Purpose.</span>
            </h2>

            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-serif text-xl text-gold-300">
                  {STUDIO.architect}
                </h3>
                <p className="text-sm text-cream-300/60 tracking-wide">
                  {STUDIO.role}
                </p>
                <p className="text-xs text-cream-300/40 mt-1">
                  {STUDIO.fullName}
                </p>
              </div>

              <p className="text-sm md:text-base text-cream-300/70 leading-relaxed">
                {STUDIO.architect} leads {STUDIO.name} with a passion for
                creating spaces that balance functionality, aesthetics and
                structural integrity. From residential homes to commercial
                spaces, each project is approached with attention to detail and
                a commitment to delivering designs that serve the people who
                live and work in them.
              </p>
              <p className="text-sm md:text-base text-cream-300/60 leading-relaxed">
                The studio offers comprehensive services spanning architectural
                design, structural engineering, interior design and 3D
                visualization — guiding projects from initial concept through to
                execution support.
              </p>
            </div>

            <button
              onClick={openForm}
              className="mt-8 inline-flex items-center gap-2 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-ink-950 px-6 py-3 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
            >
              Work With Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
