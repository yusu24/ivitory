import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { DiamondDivider } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';

export default function GallerySection({ photos = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filterMode, setFilterMode] = useState('fine-bw'); // 'fine-bw' | 'noir' | 'color'

  const defaultPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85', caption: 'Langkah Awal Menuju Bahtera Cinta', tag: 'Portret' },
    { id: 2, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85', caption: 'Senyuman yang Selalu Menguatkan', tag: 'Candid' },
    { id: 3, url: 'https://images.unsplash.com/photo-1583939000340-c69c5be0e386?auto=format&fit=crop&w=1200&q=85', caption: 'Tatapan Penuh Keyakinan Masa Depan', tag: 'Prewedding' },
    { id: 4, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85', caption: 'Genggaman Tangan yang Takkan Lepas', tag: 'Detail' },
    { id: 5, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85', caption: 'Dalam Doa dan Harapan yang Sama', tag: 'Editorial' },
    { id: 6, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85', caption: 'Janji Sehidup Semati dalam Ridha-Nya', tag: 'Monochrome' },
  ];

  const galleryList = photos && photos.length > 0 ? photos : defaultPhotos;

  const filterModes = [
    { id: 'fine-bw', label: 'Fine-Art B&W' },
    { id: 'noir', label: 'Obsidian Noir' },
    { id: 'color', label: 'Warna Asli' },
  ];

  const getFilterClass = (mode) => {
    if (mode === 'fine-bw') return 'filter grayscale contrast-115 brightness-98';
    if (mode === 'noir') return 'filter grayscale contrast-150 brightness-90';
    return '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        sounds.playPaperClick();
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, galleryList.length]);

  const openLightbox = (index) => {
    sounds.playPaperClick();
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    sounds.playPaperClick();
    setSelectedIndex(null);
  };

  const handleNext = () => {
    sounds.playPaperClick();
    setSelectedIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrev = () => {
    sounds.playPaperClick();
    setSelectedIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  const currentPhoto = selectedIndex !== null ? galleryList[selectedIndex] : null;

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 bg-white text-zinc-900 border-b border-zinc-200 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block mb-2">
            EXHIBITION &amp; MEMORI
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 font-normal">
            Moments in Monochrome
          </h2>
          <p className="font-script-calligraphy text-2xl sm:text-3xl text-zinc-600 mt-1 mb-3">
            Dokumentasi Perjalanan Cinta
          </p>
          <DiamondDivider className="max-w-xs mx-auto" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-md mx-auto mt-3 leading-relaxed">
            Setiap detik yang terekam adalah bukti kasih dan komitmen kami berdua dalam menyongsong masa depan.
          </p>

          {/* 3-Mode Monochrome Aesthetic Switcher with Sliding Pill */}
          <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 border border-zinc-900 rounded-full mt-6 shadow-xs relative">
            {filterModes.map((mode) => {
              const active = filterMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    sounds.playPaperClick();
                    setFilterMode(mode.id);
                  }}
                  className={`relative px-4 py-1.5 text-[11px] font-clean-sans uppercase tracking-wider rounded-full transition-colors cursor-pointer z-10 ${
                    active ? 'text-white font-semibold' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="galleryFilterPill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 bg-zinc-950 rounded-full -z-10 shadow-sm"
                    />
                  )}
                  {mode.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Curated Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-7">
          {galleryList.map((photo, idx) => (
            <motion.div
              key={photo.id || idx}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.65, delay: (idx % 3) * 0.12 }}
              whileHover={{ y: -6 }}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer border-2 border-zinc-950 bg-white p-2.5 shadow-md transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-zinc-100 border border-zinc-200">
                <img
                  src={photo.url || photo}
                  alt={photo.caption || `Foto ${idx + 1}`}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${getFilterClass(
                    filterMode
                  )}`}
                  loading="lazy"
                />

                {/* Index badge at top corner */}
                <div className="absolute top-2.5 left-2.5 bg-zinc-950 text-white text-[10px] font-mono-code px-2 py-0.5 tracking-widest border border-white/20">
                  0{idx + 1}
                </div>

                {/* Hover Editorial Overlay */}
                <div className="absolute inset-0 bg-zinc-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white backdrop-blur-[2px]">
                  <div className="w-11 h-11 rounded-full border border-white/80 flex items-center justify-center mb-2.5 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-clean-sans uppercase tracking-[0.28em] font-semibold">
                    Lihat Karya
                  </span>
                  {photo.caption && (
                    <p className="font-editorial-serif italic text-xs text-zinc-200 mt-2 line-clamp-2 px-2">
                      &ldquo;{photo.caption}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Caption Pill */}
              <div className="pt-3 pb-1 px-1 flex items-center justify-between text-zinc-800">
                <p className="text-[11px] font-editorial-serif italic truncate font-medium">
                  {photo.caption || `Kenangan Bahagia #${idx + 1}`}
                </p>
                <span className="text-[9px] font-clean-sans uppercase tracking-widest text-zinc-400 pl-2 font-semibold">
                  {photo.tag || 'Atelier'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Full Carousel Controls */}
      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
              title="Tutup (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 hidden sm:flex items-center justify-center"
              title="Sebelumnya"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50 hidden sm:flex items-center justify-center"
              title="Berikutnya"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Photo Card Container */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-white border-2 border-zinc-950 p-3 sm:p-5 shadow-2xl flex flex-col"
            >
              <div className="relative overflow-hidden flex items-center justify-center bg-zinc-950 max-h-[72vh]">
                <img
                  src={currentPhoto.url || currentPhoto}
                  alt={currentPhoto.caption || 'Foto Terpilih'}
                  className={`max-w-full max-h-[72vh] object-contain transition-all ${getFilterClass(
                    filterMode
                  )}`}
                />
              </div>

              {/* Lightbox Footer */}
              <div className="pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 mt-2">
                <div>
                  <span className="text-[10px] font-clean-sans uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
                    Exhibition 0{selectedIndex + 1} / 0{galleryList.length}
                  </span>
                  <p className="font-editorial-serif text-sm sm:text-base text-zinc-900 font-medium">
                    {currentPhoto.caption || 'Momen Bahagia Mempelai'}
                  </p>
                </div>

                {/* Mobile Prev/Next Buttons */}
                <div className="flex sm:hidden items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="px-3 py-1 border border-zinc-900 text-xs font-clean-sans"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-3 py-1 bg-zinc-950 text-white text-xs font-clean-sans"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
