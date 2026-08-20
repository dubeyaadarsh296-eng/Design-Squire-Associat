import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';
import { STUDIO } from '@/lib/constants';

export function Contact() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();

  const contacts = [
    {
      icon: Phone,
      label: 'Phone',
      value: STUDIO.phone,
      href: `tel:${STUDIO.phoneRaw}`,
      color: 'text-gold-400',
    },
    {
      icon: Mail,
      label: 'Email',
      value: STUDIO.email,
      href: `mailto:${STUDIO.email}`,
      color: 'text-gold-400',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: STUDIO.instagram,
      href: STUDIO.instagramUrl,
      color: 'text-gold-400',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: STUDIO.facebook,
      href: STUDIO.googleBusiness,
      color: 'text-gold-400',
    },
    {
      icon: MapPin,
      label: 'Google Business',
      value: 'View on Google',
      href: STUDIO.googleBusiness,
      color: 'text-gold-400',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-950 overflow-hidden"
    >
      <div className="blueprint-grid absolute inset-0 opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            Let&apos;s Design Your Next Space.
          </h2>
          <p className="mt-4 text-sm text-cream-300/60 max-w-lg mx-auto">
            Reach out to discuss your project. We&apos;re here to help turn your
            vision into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 p-6 rounded-xl glass hover:border-gold-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors flex-shrink-0">
                <c.icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-cream-300/40 mb-1">
                  {c.label}
                </p>
                <p className="text-sm text-cream-100 truncate group-hover:text-gold-300 transition-colors">
                  {c.value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={openForm}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 px-8 py-4 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
          >
            Submit Your Project Enquiry
          </button>
        </motion.div>
      </div>
    </section>
  );
}
