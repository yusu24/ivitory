import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
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
    <section
      id="gallery-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Memories
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Galeri Kami
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a059]/30" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.id} delay={Math.min(index * 0.05, 0.3)}>
              <button
                onClick={() => setActiveIndex(index)}
                className="group relative w-full overflow-hidden rounded-none border border-[#c5a059]/15 bg-[#141414] p-2 shadow-xl transition-all duration-300 hover:border-[#c5a059]/45"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-950">
                  <img
                    src={photo.url}
                    alt={photo.caption ?? ''}
                    className="h-full w-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="mb-3 scale-90 rounded-none border border-[#c5a059]/30 bg-[#c5a059]/10 p-2.5 text-[#c5a059] transition-transform duration-300 group-hover:scale-100">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                    {photo.caption && (
                      <p className="translate-y-2 font-serif text-sm font-light tracking-wide text-[#f2f2f2] transition-transform duration-300 group-hover:translate-y-0">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
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
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d]/98 px-4 backdrop-blur-md"
            >
              <button
                onClick={close}
                className="absolute right-6 top-6 rounded-none border border-stone-800 bg-[#141414]/50 p-2.5 text-stone-400 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={prev}
                className="absolute left-4 rounded-none border border-stone-800 bg-[#141414]/50 p-3.5 text-stone-400 transition-all hover:scale-110 hover:text-white md:left-8"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 rounded-none border border-stone-800 bg-[#141414]/50 p-3.5 text-stone-400 transition-all hover:scale-110 hover:text-white md:right-8"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative flex max-h-[75vh] max-w-4xl flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[activeIndex].url}
                  alt={photos[activeIndex].caption ?? ''}
                  className="max-h-[65vh] max-w-full rounded-none border border-[#c5a059]/20 object-contain shadow-2xl"
                />
                <div className="mt-6 text-center">
                  {photos[activeIndex].caption && (
                    <p className="font-serif text-base font-light italic tracking-wide text-[#c5a059]">
                      {photos[activeIndex].caption}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
                    Foto {activeIndex + 1} dari {photos.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
