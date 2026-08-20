import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { STUDIO_IMAGES } from '@/lib/images';

const GALLERY_IMAGES = [
  { url: STUDIO_IMAGES.exterior1, alt: 'Architectural project by Design Square & Associates — Gorakhpur' },
  { url: STUDIO_IMAGES.exterior2, alt: 'Residential design by Design Square & Associates' },
  { url: STUDIO_IMAGES.exterior3, alt: 'Architectural project by Design Square & Associates — Gorakhpur' },
  { url: STUDIO_IMAGES.exterior4, alt: 'Residential design by Design Square & Associates' },
  { url: STUDIO_IMAGES.exterior5, alt: 'Architectural project by Design Square & Associates — Gorakhpur' },
  { url: STUDIO_IMAGES.exterior6, alt: 'Residential design by Design Square & Associates' },
  { url: STUDIO_IMAGES.exterior7, alt: 'Architectural project by Design Square & Associates — Gorakhpur' },
  { url: STUDIO_IMAGES.studio, alt: 'Design Square & Associates — studio work' },
];

export function PhotoGallery() {
  const { ref, visible } = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-950 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            Visual Archive
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
            Photo Gallery
          </h2>
          <p className="mt-4 text-sm text-cream-300/50 max-w-lg mx-auto">
            A collection of project photographs and architectural work.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
              onClick={() => openLightbox(i)}
              data-cursor="view"
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-ink-950/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full glass-light text-cream-300/80 hover:text-gold-400 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full glass-light text-cream-300/80 hover:text-gold-400 transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full glass-light text-cream-300/80 hover:text-gold-400 transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={GALLERY_IMAGES[lightboxIndex].url}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] uppercase text-cream-300/50">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
