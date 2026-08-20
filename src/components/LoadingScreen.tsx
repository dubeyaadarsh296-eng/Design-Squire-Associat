import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 500);
          return 100;
        }
        return p + 3;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="blueprint-grid-fine absolute inset-0 opacity-30" />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="font-serif text-6xl md:text-7xl font-semibold text-gradient-gold tracking-wide">
                DSA
              </h1>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-px w-32 bg-gold-500/60 origin-left mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] md:text-xs tracking-[0.35em] text-cream-300/60 uppercase"
            >
              Design Square &amp; Associates
            </motion.p>
            <div className="mt-10 w-40 h-px bg-ink-700 overflow-hidden">
              <div
                className="h-full bg-gold-500 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
