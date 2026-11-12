import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Momen Indah
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Galeri Kenangan
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
        {[
          { id: 'all', label: 'Semua Momen' },
          { id: 'prewedding', label: 'Prewedding' },
          { id: 'engagement', label: 'Lamaran' },
          { id: 'moments', label: 'Detail & Suasana' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-[#3D261D] text-[#FBF5B7] border border-[#D4AF37] shadow-lg'
                : 'glass-panel text-[#2B1B17]/80 hover:text-[#2B1B17] border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Masonry Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-3xl overflow-hidden border border-white/80 shadow-xl cursor-pointer bg-black/5"
            style={{
              height: photo.aspectRatio === 'portrait' ? '380px' : photo.aspectRatio === 'square' ? '280px' : '240px'
            }}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
            />
            {/* Glass Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-1">
                {photo.category}
              </span>
              <p className="font-serif-luxury text-lg font-medium leading-snug">
                {photo.caption}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/80 font-light">
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Perbesar Foto</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center relative"
            >
              <img
                src={filteredPhotos[activeLightboxIndex].url}
                alt={filteredPhotos[activeLightboxIndex].caption}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain border border-white/20 shadow-2xl"
              />
              <p className="font-serif-luxury text-xl text-white mt-4 font-light">
                {filteredPhotos[activeLightboxIndex].caption}
              </p>
              <p className="text-xs text-[#D4AF37] font-mono mt-1 uppercase tracking-widest">
                {activeLightboxIndex + 1} / {filteredPhotos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
