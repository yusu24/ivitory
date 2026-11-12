import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CoverGate from './sections/CoverGate';
import Hero from './sections/Hero';
import AyatSection from './sections/AyatSection';
import Profile from './sections/Profile';
import EventDetail from './sections/EventDetail';
import LoveStory from './sections/LoveStory';
import Gallery from './sections/Gallery';
import GiftEnvelope from './sections/GiftEnvelope';
import RsvpGuestbook from './sections/RsvpGuestbook';
import Footer from './sections/Footer';
import MusicPlayer from './components/MusicPlayer';

export default function BohoTerracottaTemplate({
  invitation,
  slug,
  guestName,
  isOpen,
  isPlaying,
  disableMusic = false,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  return (
    <div className="min-h-screen bg-[var(--color-boho-bg)] font-boho-sans text-[var(--color-boho-text)] antialiased selection:bg-[var(--color-boho-terracotta)]/30">
      {/* Fixed terracotta frame overlay */}
      <div className="fixed inset-4 border border-[var(--color-boho-terracotta)] opacity-20 pointer-events-none rounded-t-[100px] z-40" />

      {/* Cover Gate */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-50"
            exit={{ y: '-100vh', opacity: 0, transition: { duration: 1.0, ease: [0.77, 0, 0.175, 1] } }}
          >
            <CoverGate
              invitation={invitation}
              guestName={guestName}
              isOpen={isOpen}
              onOpen={onOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          {/* Legacy audio ref support (from InvitationPage.jsx) */}
          {!disableMusic && invitation.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}

          <main className="w-full min-h-screen pb-24 overflow-x-hidden">
            <Hero invitation={invitation} />
            <AyatSection />
            <Profile invitation={invitation} />
            <EventDetail invitation={invitation} />
            <LoveStory items={invitation.love_story_items} />
            <Gallery photos={invitation.gallery_photos} />
            <GiftEnvelope accounts={invitation.bank_accounts} />
            <RsvpGuestbook slug={slug} guestName={guestName} />
          </main>

          <Footer invitation={invitation} />

          {/* Music Player — use new MusicPlayer with synth support */}
          {!disableMusic && (
            <MusicPlayer
              musicUrl={invitation.music_url}
              autoPlayTriggered={isOpen}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
