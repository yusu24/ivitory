import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { WaveSeparator } from './WaveSeparator';

export default function HomeHero({ invitation, onScrollToNext, isDark = false }) {
  const groomName = invitation?.groom_nickname || invitation?.groom_name?.split(' ')[0] || 'Wahyu';
  const brideName = invitation?.bride_nickname || invitation?.bride_name?.split(' ')[0] || 'Riski';
  const coupleTitle = `${groomName} & ${brideName}`;
  const coverPhoto = invitation?.cover_photo_url || '/templates/ulems/bg.webp';

  const eventDate = invitation?.akad_date || invitation?.resepsi_date || '2026-10-17';
  const dateObj = new Date(eventDate);
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`The Wedding of ${coupleTitle}`);
    const details = encodeURIComponent(`Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami.`);
    const startIso = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endObj = new Date(dateObj.getTime() + 4 * 60 * 60 * 1000);
    const endIso = endObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startIso}/${endIso}`;
  };

  return (
    <section
      id="home"
      className="relative pt-12 pb-0 overflow-hidden text-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--ulems-bg-alt)', color: 'var(--ulems-text-main)' }}
    >
      {/* Background Masked Cover Image from Ulems */}
      <img
        src={coverPhoto}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 ulems-bg-cover-home pointer-events-none"
        onError={(e) => {
          e.currentTarget.src = '/templates/ulems/bg.webp';
        }}
      />

      <div className="max-w-md mx-auto px-4 relative z-10">
        <h1 className="font-esthetic text-4xl sm:text-5xl pt-4 pb-2">
          Undangan Pernikahan
        </h1>

        {/* Circular photo with white border & shadow */}
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white/90 shadow-xl overflow-hidden mx-auto my-5 bg-zinc-200">
          <img
            src={coverPhoto}
            alt={coupleTitle}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/templates/ulems/bg.webp';
            }}
          />
        </div>

        <h2 className="font-esthetic text-4xl sm:text-5xl my-2">
          {coupleTitle}
        </h2>

        <p className="font-josefin text-base sm:text-lg my-2 opacity-80">
          {formattedDate}
        </p>

        {/* Save Google Calendar Button */}
        <div className="mt-4 mb-8">
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full ulems-btn-outline text-xs font-josefin shadow-sm cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-500" />
            <span>Save Google Calendar</span>
          </a>
        </div>

        {/* Authentic Ulems Mouse Scroll Down Animation */}
        <div
          onClick={onScrollToNext}
          className="flex flex-col items-center justify-center cursor-pointer mb-6 opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className="ulems-mouse-box border border-current border-2 rounded-full flex justify-center pt-1.5 mb-1.5">
            <div className="ulems-mouse-dot rounded-full bg-current" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-josefin">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Seamless Wave to #bride (alt-to-main) */}
      <WaveSeparator type="alt-to-main" isDark={isDark} />
    </section>
  );
}
