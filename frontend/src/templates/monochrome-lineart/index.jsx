import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import CoverGate from './components/CoverGate';
import Hero from './components/Hero';
import QuoteAndJourney from './components/QuoteAndJourney';
import BrideGroomSection from './components/BrideGroomSection';
import CountdownSection from './components/CountdownSection';
import EventDetails from './components/EventDetails';
import LoveStorySection from './components/LoveStorySection';
import GallerySection from './components/GallerySection';
import DigitalEnvelope from './components/DigitalEnvelope';
import RsvpAndGuestbook from './components/RsvpAndGuestbook';
import FooterSection from './components/FooterSection';
import MusicPlayer from './components/MusicPlayer';
import BottomNav from './components/BottomNav';
import { AmbientMonochromeParticles, EditorialMarquee } from './components/MonochromeOrnaments';
import { getSectionVisibility } from './utils/templateConfig';

import './style.css';

export default function MonochromeLineartTemplate({
  invitation,
  slug,
  guestName = 'Bapak/Ibu Tamu',
  isOpen,
  isPlaying,
  disableMusic = false,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  const defaultMusic = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112187.mp3';
  const musicSource = invitation?.music_url || defaultMusic;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const brideName = invitation?.bride_name || 'Nor Nabilla';
  const groomName = invitation?.groom_name || 'M Yusuf Effendi';

  // Section visibility flags
  const vis = getSectionVisibility(invitation);

  const scrollToNext = () => {
    const el = document.getElementById('couple');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-clean-sans selection:bg-zinc-950 selection:text-white relative overflow-x-hidden">
      {/* Top Kinetic Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-zinc-950 origin-left z-[55] shadow-xs"
      />

      {/* Desktop Architectural Editorial Side Rails */}
      {isOpen && (
        <>
          <div className="hidden xl:flex fixed left-3 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-none select-none opacity-45">
            <div className="w-[1px] h-16 bg-zinc-900" />
            <span
              className="text-[9px] font-clean-sans uppercase tracking-[0.4em] text-zinc-800 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {brideName.toUpperCase()} &amp; {groomName.toUpperCase()}
            </span>
            <div className="w-[1px] h-16 bg-zinc-900" />
          </div>

          <div className="hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-none select-none opacity-45">
            <div className="w-[1px] h-16 bg-zinc-900" />
            <span
              className="text-[9px] font-clean-sans uppercase tracking-[0.4em] text-zinc-800 whitespace-nowrap"
              style={{ writingMode: 'vertical-rl' }}
            >
              HAUTE ATELIER • MONOCHROME EDITION
            </span>
            <div className="w-[1px] h-16 bg-zinc-900" />
          </div>
        </>
      )}

      {/* Ambient Floating Monochrome Particles */}
      {isOpen && <AmbientMonochromeParticles />}

      {/* Background audio element */}
      {!disableMusic && <audio ref={audioRef} src={musicSource} loop />}

      {/* Opening Cover Gate Modal */}
      <CoverGate
        invitation={invitation}
        guestName={guestName}
        isOpen={isOpen}
        onOpen={onOpen}
      />

      {/* Main Content (visible once opened) */}
      {isOpen && (
        <div>
          {/* Floating Music Controller */}
          {!disableMusic && (
            <MusicPlayer
              isPlaying={isPlaying}
              onToggleMusic={onToggleMusic}
              hasMusic={true}
            />
          )}

          {/* Floating Bottom Nav */}
          <BottomNav visible={isOpen} />

          {/* 1. Hero Section */}
          <div id="hero">
            <Hero invitation={invitation} onScrollToNext={scrollToNext} />
          </div>

          {/* Kinetic Monochrome Editorial Ribbon */}
          <EditorialMarquee
            items={[
              `${brideName.toUpperCase()} & ${groomName.toUpperCase()}`,
              "WALIMATUL 'URS",
              "TWO HEARTS • ONE JOURNEY",
              "SACRED COVENANT IN MONOCHROME",
            ]}
            dark={false}
          />

          {/* 2. Quote & Academic/Study Motif */}
          <QuoteAndJourney invitation={invitation} openingText={invitation?.opening_text} />

          {/* 3. Bride & Groom Profiles */}
          <BrideGroomSection invitation={invitation} />

          {/* 4. Countdown Timer & Save The Date */}
          {vis.show_countdown && (
            <CountdownSection
              weddingDateISO={invitation?.akad_date || invitation?.resepsi_date}
              brideName={brideName}
              groomName={groomName}
            />
          )}

          {/* 5. Event Schedules (Akad & Resepsi) — dresscode visibility handled inside */}
          <EventDetails invitation={invitation} showDresscode={vis.show_dresscode} />

          {/* 6. Love Story / Our Journey Timeline */}
          {vis.show_story && (
            <LoveStorySection stories={invitation?.love_story_items} />
          )}

          {/* 7. Photo Gallery with B&W / Noir / Color Switcher */}
          {vis.show_gallery && (
            <GallerySection photos={invitation?.gallery_photos} />
          )}

          {/* 8. Digital Envelope & Gift */}
          {vis.show_amplop && (
            <DigitalEnvelope
              invitation={invitation}
              accounts={invitation?.bank_accounts}
            />
          )}

          {/* 9. RSVP & Digital Wishes Wall */}
          {vis.show_rsvp && (
            <RsvpAndGuestbook invitation={invitation} slug={slug} guestName={guestName} />
          )}

          {/* 10. Footer & Closing */}
          <FooterSection invitation={invitation} onScrollToTop={scrollToTop} />
        </div>
      )}
    </div>
  );
}
