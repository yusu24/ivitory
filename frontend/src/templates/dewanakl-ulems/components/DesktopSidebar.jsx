import React, { useState, useEffect } from 'react';

export default function DesktopSidebar({ invitation, isDark = false }) {
  const groomName = invitation?.groom_nickname || invitation?.groom_name?.split(' ')[0] || 'Wahyu';
  const brideName = invitation?.bride_nickname || invitation?.bride_name?.split(' ')[0] || 'Riski';
  const coupleTitle = `${groomName} & ${brideName}`;

  const eventDate = invitation?.akad_date || invitation?.resepsi_date || '2026-10-17';
  const formattedDate = new Date(eventDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const photos = [
    invitation?.cover_photo_url || '/templates/ulems/bg.webp',
    '/templates/ulems/bg.webp',
    invitation?.gallery_photos?.[0]?.url || '/templates/ulems/cowo.webp',
  ].filter(Boolean);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % photos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <aside
      className="ulems-desktop-sidebar items-center justify-center p-6 overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundColor: 'var(--ulems-bg-main)',
        color: 'var(--ulems-text-main)',
      }}
    >
      {/* Background Slideshow with Authentic Ulems Crossfade & Zoom */}
      {photos.map((src, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 ulems-slide ${
            activeSlide === idx
              ? 'opacity-35 ulems-slide-active pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={src}
            alt="Slideshow Background"
            className="w-full h-full object-cover filter blur-[0.5px]"
            onError={(e) => {
              e.currentTarget.src = '/templates/ulems/bg.webp';
            }}
          />
        </div>
      ))}

      {/* Adaptive Theme Gradient Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-black/85 via-black/40 to-black/80'
            : 'bg-gradient-to-t from-white/85 via-white/45 to-white/80'
        }`}
      />

      {/* Center Frosted Glass Card matching capture 2 (simple, smaller, single-line) */}
      <div
        className={`relative z-10 text-center px-8 py-5 rounded-[26px] backdrop-blur-md shadow-md max-w-xs transition-all duration-500 ${
          isDark
            ? 'bg-black/50 border border-white/15 text-white'
            : 'bg-white/75 border border-white/60 text-zinc-900 shadow-zinc-400/20'
        }`}
      >
        <h2
          className={`font-esthetic text-2xl sm:text-3xl mb-3 leading-snug whitespace-nowrap transition-colors duration-500 ${
            isDark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {coupleTitle}
        </h2>
        <p
          className={`font-josefin text-xs sm:text-sm m-0 tracking-wide transition-colors duration-500 ${
            isDark ? 'text-zinc-200' : 'text-zinc-800'
          }`}
        >
          {formattedDate}
        </p>
      </div>
    </aside>
  );
}
