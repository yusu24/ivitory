import React from 'react';
import { WaveSeparator } from './WaveSeparator';

export default function MempelaiSection({ invitation, isDark = false }) {
  const groomName = invitation?.groom_name || 'Wahyu Pratama, S.Kom';
  const groomParents = invitation?.groom_parents || 'Bapak Joko Santoso & Ibu Siti Aminah';

  const brideName = invitation?.bride_name || 'Riski Rahmawati, S.Pd';
  const brideParents = invitation?.bride_parents || 'Bapak Bambang Supriyadi & Ibu Sri Lestari';

  const groomPhoto = invitation?.groom_photo_url || '/templates/ulems/cowo.webp';
  const bridePhoto = invitation?.bride_photo_url || '/templates/ulems/cewe.webp';

  return (
    <section
      id="bride"
      className="pt-10 pb-0 text-center transition-colors duration-300 relative"
      style={{ backgroundColor: 'var(--ulems-bg-main)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4 relative z-10">
        
        {/* Bismillah in Arabic */}
        <h2 className="font-arabic text-2xl sm:text-3xl py-2">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h2>

        {/* Salam in Sacramento */}
        <h3 className="font-esthetic text-3xl sm:text-4xl py-2">
          Assalamualaikum Warahmatullahi Wabarakatuh
        </h3>

        <p className="font-josefin text-xs sm:text-sm opacity-80 max-w-sm mx-auto mb-8 leading-relaxed">
          {invitation?.opening_text || 'Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berkenan menghadiri acara pernikahan kami:'}
        </p>

        {/* ================= MEMPELAI PRIA ================= */}
        <div className="relative my-8">
          {/* Authentic Floating Heart SVG from Ulems */}
          <div className="absolute top-2 right-8 text-rose-500 opacity-60 animate-ulems-love pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </div>

          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden mx-auto mb-4 bg-zinc-200">
            <img
              src={groomPhoto}
              alt={groomName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/templates/ulems/cowo.webp';
              }}
            />
          </div>

          <h4 className="font-esthetic text-3xl sm:text-4xl mb-1">
            {groomName}
          </h4>
          <p className="font-josefin text-xs opacity-70 mt-2">
            Putra dari:
          </p>
          <p className="font-josefin font-medium text-xs sm:text-sm">
            {groomParents}
          </p>
        </div>

        {/* Ampersand in Sacramento */}
        <div className="font-esthetic text-6xl sm:text-7xl my-4 leading-none">
          &amp;
        </div>

        {/* ================= MEMPELAI WANITA ================= */}
        <div className="relative my-8">
          {/* Authentic Floating Heart SVG from Ulems */}
          <div className="absolute top-2 left-8 text-rose-500 opacity-60 animate-ulems-love pointer-events-none" style={{ animationDelay: '1.8s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </div>

          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl overflow-hidden mx-auto mb-4 bg-zinc-200">
            <img
              src={bridePhoto}
              alt={brideName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/templates/ulems/cewe.webp';
              }}
            />
          </div>

          <h4 className="font-esthetic text-3xl sm:text-4xl mb-1">
            {brideName}
          </h4>
          <p className="font-josefin text-xs opacity-70 mt-2">
            Putri dari:
          </p>
          <p className="font-josefin font-medium text-xs sm:text-sm">
            {brideParents}
          </p>
        </div>

      </div>

      {/* Seamless Wave to Quran & LoveStory (main-to-alt) */}
      <WaveSeparator type="main-to-alt" isDark={isDark} />
    </section>
  );
}
