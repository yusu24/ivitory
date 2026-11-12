import React, { useState } from 'react';
import CoverGate from './components/CoverGate';
import DesktopSidebar from './components/DesktopSidebar';
import HomeHero from './components/HomeHero';
import MempelaiSection from './components/MempelaiSection';
import QuranSection from './components/QuranSection';
import WeddingDateSection from './components/WeddingDateSection';
import LoveStorySection from './components/LoveStorySection';
import GallerySection from './components/GallerySection';
import GiftSection from './components/GiftSection';
import RsvpCommentSection from './components/RsvpCommentSection';
import BottomNav from './components/BottomNav';
import FloatingControls from './components/FloatingControls';

import './style.css';

export default function DewanaklUlemsTemplate({
  invitation,
  slug,
  guestName = 'Bapak/Ibu/Saudara/i',
  isOpen,
  isPlaying,
  disableMusic = false,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  const [isDark, setIsDark] = useState(false);
  const audioSrc = invitation?.music_url || '/templates/ulems/pure-love-304010.mp3';

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const scrollToNext = () => {
    const el = document.getElementById('bride');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`${
        isDark ? 'ulems-theme-dark' : 'ulems-theme-light'
      } ulems-wrapper min-h-screen font-josefin relative`}
    >
      {/* Background Audio */}
      {!disableMusic && <audio ref={audioRef} src={audioSrc} loop />}

      {/* 1. Welcome / Cover Gate Modal */}
      <CoverGate
        invitation={invitation}
        guestName={guestName}
        isOpen={isOpen}
        onOpen={onOpen}
        isDark={isDark}
      />

      {/* 2. Floating Controls (Theme Toggle & Music Disc) */}
      {!disableMusic && (
        <FloatingControls
          isPlaying={isPlaying}
          onToggleMusic={onToggleMusic}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          visible={isOpen}
        />
      )}

      {/* 3. Sticky Bottom Navigation */}
      <BottomNav visible={isOpen} />

      {/* 4. Main Split Layout: Fixed Desktop Left + Scrollable Smartphone Right */}
      {isOpen && (
        <div className="w-full min-h-screen transition-all duration-500">
          {/* Left Fixed Desktop Sidebar (60% on desktop, completely fixed to viewport) */}
          <DesktopSidebar invitation={invitation} isDark={isDark} />

          {/* Right Scrollable Smartphone Container (40% on desktop, 100% on mobile) */}
          <main
            className="ulems-mobile-container min-h-screen relative shadow-2xl transition-colors duration-300 pb-20"
            style={{ backgroundColor: 'var(--ulems-bg-main)' }}
          >
            {/* Home Hero */}
            <HomeHero
              invitation={invitation}
              onScrollToNext={scrollToNext}
              isDark={isDark}
            />

            {/* Mempelai */}
            <MempelaiSection invitation={invitation} isDark={isDark} />

            {/* Firman Allah */}
            <QuranSection />

            {/* Kisah Cinta */}
            <LoveStorySection
              stories={invitation?.love_story_items}
              isDark={isDark}
            />

            {/* Waktu & Tempat (Akad & Resepsi) */}
            <WeddingDateSection invitation={invitation} isDark={isDark} />

            {/* Galeri */}
            <GallerySection
              photos={invitation?.gallery_photos}
              isDark={isDark}
            />

            {/* Tanda Kasih / Love Gift */}
            <GiftSection
              accounts={invitation?.bank_accounts}
              isDark={isDark}
            />

            {/* RSVP & Ucapan */}
            <RsvpCommentSection
              slug={slug}
              guestName={guestName}
            />
          </main>
        </div>
      )}
    </div>
  );
}
