import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/Botanicals';

export default function Gallery({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!photos || photos.length === 0) return null;

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setActiveIndex((i) => (i + 1) % photos.length);

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Momen Berharga" title="Galeri Foto" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm italic text-[var(--ig-muted)]">
            Potret kebersamaan yang terpatri hangat dalam setiap langkah perjalanan kami:
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <Reveal key={photo.id || index} delay={Math.min(index * 0.08, 0.4)}>
              <div
                onClick={() => setActiveIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-[rgba(180,149,90,0.3)] shadow-md aspect-[4/5] bg-[var(--ig-ivory-deep)]"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto Momen'}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,52,39,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="flex items-center gap-2 text-[var(--ig-gold-soft)] text-xs font-semibold uppercase tracking-wider">
                    <Eye className="h-4 w-4" />
                    <span>Lihat Foto</span>
                  </div>
                  {photo.caption && (
                    <p className="ig-serif text-white text-sm italic mt-1 drop-shadow-sm truncate">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <button
            onClick={close}
            className="absolute right-5 top-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
          
          <button
            onClick={prev}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={1.5} />
          </button>

          <div className="max-h-[85vh] max-w-4xl text-center">
            <img
              src={photos[activeIndex].url}
              alt={photos[activeIndex].caption || ''}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain mx-auto shadow-2xl"
            />
            {photos[activeIndex].caption && (
              <p className="ig-serif text-white/90 text-base italic mt-4">
                {photos[activeIndex].caption}
              </p>
            )}
          </div>

          <button
            onClick={next}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
