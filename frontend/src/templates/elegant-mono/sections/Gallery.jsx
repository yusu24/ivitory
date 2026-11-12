import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';

export default function Gallery({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!photos || photos.length === 0) return null;

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setActiveIndex((i) => (i + 1) % photos.length);

  return (
    <section id="section-gallery" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-cursive text-4xl text-taupe-600">Galeri Kami</p>
          <Ornament className="mt-4" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.id} delay={Math.min(index * 0.05, 0.3)}>
              <button
                onClick={() => setActiveIndex(index)}
                className="block aspect-square w-full overflow-hidden rounded-xl border border-taupe-200"
              >
                <img
                  src={photo.url}
                  alt={photo.caption ?? ''}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4">
          <button onClick={close} className="absolute right-5 top-5 text-white/80 hover:text-white">
            <X className="h-7 w-7" strokeWidth={1.5} />
          </button>
          <button onClick={prev} className="absolute left-3 text-white/80 hover:text-white sm:left-8">
            <ChevronLeft className="h-9 w-9" strokeWidth={1.5} />
          </button>
          <img
            src={photos[activeIndex].url}
            alt={photos[activeIndex].caption ?? ''}
            className="max-h-[80vh] max-w-full object-contain"
          />
          <button onClick={next} className="absolute right-3 text-white/80 hover:text-white sm:right-8">
            <ChevronRight className="h-9 w-9" strokeWidth={1.5} />
          </button>
          {photos[activeIndex].caption && (
            <p className="absolute bottom-6 text-center text-sm text-white/80">{photos[activeIndex].caption}</p>
          )}
        </div>
      )}
    </section>
  );
}
