import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BohoFlower } from '../components/BohoOrnaments';

export default function Gallery({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Map backend gallery_photos (array of objects with .url) to array of URLs
  const images = (photos || []).map((p) => (typeof p === 'string' ? p : p.url)).filter(Boolean);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % images.length);
      else if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
          Galeri Momen Bahagia
        </p>
        <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-4">
          Our Precious Moments
        </h2>
        <p className="text-sm text-[var(--color-boho-text)] opacity-80 italic font-boho-serif max-w-md mx-auto mb-12 leading-relaxed">
          Momen-momen indah kebersamaan kami yang abadi dalam jepretan cinta dan harmoni.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative">
          <div className="absolute top-[-40px] left-[-20px] text-[var(--color-boho-terracotta-light)] opacity-20 z-0">
             <BohoFlower className="w-24 h-24" />
          </div>

          {images.map((imgUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setLightboxIndex(index)}
              className={`cursor-pointer group relative overflow-hidden bg-[var(--color-boho-bg)] shadow-md aspect-[3/4] z-10 ${index % 2 === 0 ? 'rounded-t-full rounded-b-xl' : 'rounded-b-full rounded-t-xl'}`}
            >
              <div className="absolute inset-2 border border-[var(--color-boho-terracotta)]/30 rounded-[inherit] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={imgUrl}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--color-boho-terracotta)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 backdrop-blur-[2px]">
                <div className="flex items-center gap-1.5 text-white text-xs tracking-wider uppercase font-boho-sans font-medium">
                  <Image size={12} />
                  <span>Perbesar</span>
                </div>
              </div>
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
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/75 hover:text-[var(--color-boho-terracotta)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 border border-white/10"
            >
              <X size={20} />
            </button>
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 sm:left-6 text-white/75 hover:text-[var(--color-boho-terracotta)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="max-w-4xl max-h-[80vh] w-full px-16 flex flex-col items-center justify-center">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[lightboxIndex]}
                alt={`Foto ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-t-full rounded-b-3xl border border-[var(--color-boho-terracotta)]/30 shadow-2xl"
              />
              <p className="text-white/60 text-xs font-boho-sans mt-4 uppercase tracking-[0.2em]">
                Foto {lightboxIndex + 1} dari {images.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 sm:right-6 text-white/75 hover:text-[var(--color-boho-terracotta)] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
