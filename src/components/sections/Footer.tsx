import { Phone, Mail, Instagram, Facebook, MapPin, ArrowUp } from 'lucide-react';
import { STUDIO } from '@/lib/constants';
import { useLeadForm } from '@/components/LeadFormContext';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: '3D Designs', href: '#3d-experience' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const { openForm } = useLeadForm();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink-950 border-t border-cream-300/10 pt-16 pb-8">
      <div className="blueprint-grid-fine absolute inset-0 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl font-semibold text-gradient-gold mb-3">
              {STUDIO.shortName}
            </h3>
            <p className="text-sm text-cream-300/60 mb-2">
              {STUDIO.fullName}
            </p>
            <p className="text-xs tracking-[0.1em] uppercase text-gold-400/60 mb-6">
              {STUDIO.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={`tel:${STUDIO.phoneRaw}`}
                className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-cream-300/60 hover:text-gold-400 transition-colors"
                aria-label="Call"
              >
                <Phone size={16} />
              </a>
              <a
                href={`mailto:${STUDIO.email}`}
                className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-cream-300/60 hover:text-gold-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={STUDIO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-cream-300/60 hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={STUDIO.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-cream-300/60 hover:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={STUDIO.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-cream-300/60 hover:text-gold-400 transition-colors"
                aria-label="Google Business"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cream-300/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-cream-300/60 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-cream-300/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${STUDIO.phoneRaw}`}
                  className="text-sm text-cream-300/60 hover:text-gold-400 transition-colors block"
                >
                  {STUDIO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="text-sm text-cream-300/60 hover:text-gold-400 transition-colors block break-all"
                >
                  {STUDIO.email}
                </a>
              </li>
              <li>
                <button
                  onClick={openForm}
                  className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Start Your Project &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-300/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-300/40 text-center md:text-left">
            &copy; 2026 Design Square &amp; Associates Engineers &amp;
            Architects. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-cream-300/40 hover:text-gold-400 transition-colors"
          >
            Back to Top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
