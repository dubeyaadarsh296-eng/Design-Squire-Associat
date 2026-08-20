import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Plus, X } from 'lucide-react';
import { STUDIO } from '@/lib/constants';
import { useMediaQuery } from '@/hooks/useScrollReveal';

export function FloatingContact() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {expanded && (
              <>
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  href={`tel:${STUDIO.phoneRaw}`}
                  className="flex items-center gap-2 bg-gold-500 text-ink-950 px-4 py-3 rounded-full text-sm font-medium shadow-lg"
                >
                  <Phone size={18} />
                  Call
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  href={`mailto:${STUDIO.email}`}
                  className="flex items-center gap-2 bg-cream-100 text-ink-950 px-4 py-3 rounded-full text-sm font-medium shadow-lg"
                >
                  <Mail size={18} />
                  Email
                </motion.a>
              </>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center shadow-xl"
            whileTap={{ scale: 0.9 }}
          >
            {expanded ? <X size={24} /> : <Plus size={24} />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
