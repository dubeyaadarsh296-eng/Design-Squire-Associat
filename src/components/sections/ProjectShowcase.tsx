import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, MapPin, Calendar, Maximize } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/lib/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLeadForm } from '@/components/LeadFormContext';
import { STUDIO_IMAGES } from '@/lib/images';

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Modern Residence',
    category: 'Residential',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'A contemporary family home designed with clean lines, open spaces and natural light.',
    concept: 'Designed around the concept of seamless indoor-outdoor living.',
    image_url: STUDIO_IMAGES.exterior1,
    gallery_urls: [
      STUDIO_IMAGES.exterior1,
      STUDIO_IMAGES.exterior2,
    ],
    is_published: true,
    sort_order: 1,
    created_at: '',
  },
  {
    id: 'p2',
    title: 'Luxury Villa',
    category: 'Residential',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'An elegant villa featuring expansive glass facades and premium finishes.',
    concept: 'A retreat that blends modern luxury with warmth.',
    image_url: STUDIO_IMAGES.exterior3,
    gallery_urls: [
      STUDIO_IMAGES.exterior3,
      STUDIO_IMAGES.exterior4,
    ],
    is_published: true,
    sort_order: 2,
    created_at: '',
  },
  {
    id: 'p3',
    title: 'Contemporary Home',
    category: 'Residential',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'A contemporary home balancing functionality with refined aesthetics.',
    concept: 'Clean geometry meeting warm materials.',
    image_url: STUDIO_IMAGES.exterior5,
    gallery_urls: [
      STUDIO_IMAGES.exterior5,
    ],
    is_published: true,
    sort_order: 3,
    created_at: '',
  },
  {
    id: 'p4',
    title: 'Interior Design Showcase',
    category: 'Interior',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'A thoughtfully designed interior space with elegant furnishings and lighting.',
    concept: 'Where functionality meets refined aesthetics.',
    image_url: STUDIO_IMAGES.exterior6,
    gallery_urls: [
      STUDIO_IMAGES.exterior6,
      STUDIO_IMAGES.exterior7,
    ],
    is_published: true,
    sort_order: 4,
    created_at: '',
  },
  {
    id: 'p5',
    title: 'Evening Elegance',
    category: '3D Visualization',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'A 3D architectural visualization showcasing dramatic evening lighting.',
    concept: 'Bringing designs to life before construction begins.',
    image_url: STUDIO_IMAGES.exterior7,
    gallery_urls: [
      STUDIO_IMAGES.exterior7,
      STUDIO_IMAGES.exterior2,
    ],
    is_published: true,
    sort_order: 5,
    created_at: '',
  },
  {
    id: 'p6',
    title: 'Serene Bedroom Design',
    category: 'Interior',
    location: 'Gorakhpur',
    year: null,
    area: null,
    description: 'A calm, modern bedroom designed for comfort and tranquility.',
    concept: 'A personal sanctuary with soft tones and warm lighting.',
    image_url: STUDIO_IMAGES.exterior2,
    gallery_urls: [
      STUDIO_IMAGES.exterior2,
      STUDIO_IMAGES.exterior4,
    ],
    is_published: true,
    sort_order: 6,
    created_at: '',
  },
];

export function ProjectShowcase() {
  const { ref, visible } = useScrollReveal();
  const { openForm } = useLeadForm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data as Project[]);
        } else {
          setProjects(PLACEHOLDER_PROJECTS);
        }
      } catch {
        setProjects(PLACEHOLDER_PROJECTS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 bg-ink-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-4">
            Portfolio
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-serif text-3xl md:text-5xl text-cream-100">
              Selected Works
            </h2>
            <p className="text-sm text-cream-300/50 max-w-sm">
              A glimpse of projects designed with vision and built with purpose.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-ink-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelected(project)}
                data-cursor="open"
                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image_url}
                  alt={`${project.title} — ${project.category} in ${project.location || 'Gorakhpur'}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-cream-100">
                    {project.title}
                  </h3>
                  {project.location && (
                    <p className="text-xs text-cream-300/60 mt-1 flex items-center gap-1">
                      <MapPin size={12} />
                      {project.location}
                    </p>
                  )}
                  <p className="text-sm text-cream-300/50 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1 text-gold-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs tracking-[0.15em] uppercase">
                      View Project
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onEnquire={openForm}
      />
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
  onEnquire,
}: {
  project: Project | null;
  onClose: () => void;
  onEnquire: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [project]);

  const gallery = project
    ? project.gallery_urls.length > 0
      ? project.gallery_urls
      : [project.image_url]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-ink-950/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scrollbar-hide glass rounded-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ink-800/80 text-cream-300/70 hover:text-gold-400 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-t-2xl">
              <img
                src={gallery[activeImage]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeImage ? 'bg-gold-400 w-8' : 'bg-cream-300/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 md:p-10">
              <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase">
                {project.category}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-cream-100 mt-2">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-5 mt-4 text-sm text-cream-300/60">
                {project.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gold-500" />
                    {project.location}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gold-500" />
                    {project.year}
                  </span>
                )}
                {project.area && (
                  <span className="flex items-center gap-1.5">
                    <Maximize size={14} className="text-gold-500" />
                    {project.area}
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm md:text-base text-cream-300/70 leading-relaxed">
                  {project.description}
                </p>
                {project.concept && (
                  <div>
                    <h4 className="text-xs tracking-[0.2em] text-gold-400 uppercase mb-2">
                      Architectural Concept
                    </h4>
                    <p className="text-sm text-cream-300/60 leading-relaxed">
                      {project.concept}
                    </p>
                  </div>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-8">
                  {gallery.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImage
                          ? 'border-gold-400'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${project.title} image ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-cream-300/10">
                <p className="text-cream-300/60 text-sm mb-4">
                  Interested in a similar project?
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onEnquire();
                  }}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 px-6 py-3 rounded-lg text-sm tracking-[0.12em] uppercase font-medium transition-all"
                >
                  Discuss Your Project
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
