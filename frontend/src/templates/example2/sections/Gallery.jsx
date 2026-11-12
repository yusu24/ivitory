import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Gallery({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!photos || photos.length === 0) return null;

  const close = () => setActiveIndex(null);
  const prev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % photos.length);
  };

  return (
    <section id="section-gallery" className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h2 className="mb-16 font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">Galeri Foto Mempelai</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, idx) => (
          <Reveal key={photo.id} delay={Math.min(idx * 0.1, 0.4)}>
            <button
              onClick={() => setActiveIndex(idx)}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-amber-500/10 bg-stone-900/60 p-6 text-center shadow-lg transition-colors hover:border-amber-500/40"
            >
              <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l border-t border-amber-500/30 transition-colors group-hover:border-amber-500" />
              <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-amber-500/30 transition-colors group-hover:border-amber-500" />

              <div className="relative h-48 w-full overflow-hidden rounded-xl">
                <img
                  src={photo.url}
                  alt={photo.caption ?? ''}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-stone-950/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Heart size={24} className="animate-pulse text-amber-400" />
                </div>
              </div>

              {photo.caption && (
                <p className="mt-4 font-serif text-xs font-semibold tracking-wide text-stone-300">{photo.caption}</p>
              )}
              <p className="mt-1 font-mono text-[10px] uppercase text-amber-500/70">Klik untuk memperbesar</p>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950/95 px-4 backdrop-blur-md"
          >
            <button onClick={close} className="absolute right-6 top-6 rounded-full border border-stone-800 bg-stone-900/50 p-2.5 text-stone-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
            <button onClick={prev} className="absolute left-4 rounded-full border border-stone-800 bg-stone-900/50 p-3.5 text-stone-400 hover:text-white md:left-8">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} className="absolute right-4 rounded-full border border-stone-800 bg-stone-900/50 p-3.5 text-stone-400 hover:text-white md:right-8">
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex max-h-[75vh] max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[activeIndex].url}
                alt={photos[activeIndex].caption ?? ''}
                className="max-h-[65vh] max-w-full rounded-lg border border-amber-500/20 object-contain"
              />
              {photos[activeIndex].caption && (
                <p className="mt-6 font-serif text-base italic text-amber-400">{photos[activeIndex].caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
