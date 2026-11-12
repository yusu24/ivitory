import CoverGate from './sections/CoverGate';
import Hero from './sections/Hero';
import AyatSection from './sections/AyatSection';
import CoupleInfo from './sections/CoupleInfo';
import EventDetails from './sections/EventDetails';
import LoveStory from './sections/LoveStory';
import Gallery from './sections/Gallery';
import DigitalEnvelope from './sections/DigitalEnvelope';
import RsvpSection from './sections/RsvpSection';
import GamelanKeyboard from './sections/GamelanKeyboard';
import Footer from './sections/Footer';
import MusicToggle from './sections/MusicToggle';

export default function Example2Template({
  invitation,
  slug,
  guestName,
  isOpen,
  isPlaying,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  return (
    <div className="relative min-h-screen bg-stone-950 font-sans text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
      <CoverGate invitation={invitation} guestName={guestName} isOpen={isOpen} onOpen={onOpen} />

      {invitation.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}

      {isOpen && (
        <div className="relative overflow-x-hidden">
          <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <MusicToggle isPlaying={isPlaying} onToggle={onToggleMusic} visible={!!invitation.music_url} />

          <Hero invitation={invitation} />
          <AyatSection />
          <CoupleInfo invitation={invitation} />
          <EventDetails invitation={invitation} />
          <LoveStory items={invitation.love_story_items} />
          <Gallery photos={invitation.gallery_photos} />
          <DigitalEnvelope accounts={invitation.bank_accounts} />
          <RsvpSection slug={slug} guestName={guestName} />
          <GamelanKeyboard />
          <Footer invitation={invitation} />
        </div>
      )}
    </div>
  );
}
