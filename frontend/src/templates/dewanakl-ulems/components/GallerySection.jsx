import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { WaveSeparator } from './WaveSeparator';

export default function GallerySection({ photos = [], isDark = false }) {
  const [activePhoto, setActivePhoto] = useState(null);

  const defaultPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1583939000340-c69c5be0e386?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 4' },
    { id: 5, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 5' },
    { id: 6, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding 6' },
  ];

  const galleryList = photos && photos.length > 0 ? photos : defaultPhotos;

  return (
    <section
      id="gallery"
      className="pt-10 pb-0 transition-colors duration-300 relative"
      style={{ backgroundColor: 'var(--ulems-bg-main)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4 text-center relative z-10">
        
        <h2 className="font-esthetic text-4xl sm:text-5xl mb-6">
          Galeri
        </h2>

        {/* 2-Column Grid matching Ulems Gallery */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {galleryList.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => setActivePhoto(photo.url || photo)}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-zinc-200 border border-white/20"
            >
              <img
                src={photo.url || photo}
                alt={photo.caption || 'Galeri'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 text-white hover:text-zinc-300 p-2 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto}
            alt="Preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Wave to GiftSection (main-to-alt) */}
      <WaveSeparator type="main-to-alt" isDark={isDark} />
    </section>
  );
}
