import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLeadForm } from './LeadFormContext';
import { useScrollPosition } from '@/hooks/useScrollReveal';
import { STUDIO } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: '3D Designs', href: '#3d-experience' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const scrollY = useScrollPosition();
  const { openForm } = useLeadForm();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 60;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <span className="font-serif text-2xl font-semibold text-gradient-gold tracking-wide">
              {STUDIO.shortName}
            </span>
            <span className="hidden lg:block text-[10px] tracking-[0.2em] text-cream-300/50 uppercase border-l border-cream-300/20 pl-3 group-hover:text-cream-300/70 transition-colors">
              {STUDIO.name}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs tracking-[0.15em] uppercase text-cream-300/70 hover:text-gold-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openForm}
              className="hidden md:inline-flex text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-ink-950 rounded-lg transition-all"
            >
              Start Your Project
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-cream-300/80"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-ink-950/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-2xl font-semibold text-gradient-gold">
                {STUDIO.shortName}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-cream-300/80"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-serif text-2xl text-cream-100 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openForm();
                }}
                className="mt-4 text-sm tracking-[0.15em] uppercase px-8 py-3 bg-gold-500 text-ink-950 rounded-lg font-medium"
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
