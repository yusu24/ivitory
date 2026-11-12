import CoverGate from './sections/CoverGate';
import StickyHeader from './sections/StickyHeader';
import Profile from './sections/Profile';
import EventDetail from './sections/EventDetail';
import LoveStory from './sections/LoveStory';
import Gallery from './sections/Gallery';
import GiftEnvelope from './sections/GiftEnvelope';
import RsvpForm from './sections/RsvpForm';
import GuestbookWall from './sections/GuestbookWall';
import Footer from './sections/Footer';
import MusicToggle from './sections/MusicToggle';
import ScrollToTop from './components/ScrollToTop';

export default function ExampleTemplate({
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
    <div className="min-h-screen bg-[#0d0d0d] font-sans text-[#f2f2f2] antialiased selection:bg-[#c5a059]/30 selection:text-white">
      <CoverGate invitation={invitation} guestName={guestName} isOpen={isOpen} onOpen={onOpen} />

      {invitation.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}

      {isOpen && (
        <div className="relative">
          <StickyHeader invitation={invitation} />

          <main>
            <Profile invitation={invitation} />
            <EventDetail invitation={invitation} />
            <LoveStory items={invitation.love_story_items} />
            <Gallery photos={invitation.gallery_photos} />
            <GiftEnvelope accounts={invitation.bank_accounts} />
            <RsvpForm slug={slug} guestName={guestName} />
            <GuestbookWall slug={slug} />
          </main>

          <Footer invitation={invitation} />

          <ScrollToTop />
          <MusicToggle isPlaying={isPlaying} onToggle={onToggleMusic} visible={!!invitation.music_url} />
        </div>
      )}
    </div>
  );
}
