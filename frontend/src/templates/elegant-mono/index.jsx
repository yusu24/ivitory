import CoverGate from './sections/CoverGate';
import Hero from './sections/Hero';
import AyatSection from './sections/AyatSection';
import CoupleInfo from './sections/CoupleInfo';
import Countdown from './sections/Countdown';
import EventDetails from './sections/EventDetails';
import LoveStory from './sections/LoveStory';
import Gallery from './sections/Gallery';
import DigitalEnvelope from './sections/DigitalEnvelope';
import RsvpForm from './sections/RsvpForm';
import GuestbookWall from './sections/GuestbookWall';
import Footer from './sections/Footer';
import BottomNav from './components/BottomNav';

export default function ElegantMonoTemplate({
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
    <div className="bg-white">
      <CoverGate invitation={invitation} guestName={guestName} isOpen={isOpen} onOpen={onOpen} />

      {invitation.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}
      <BottomNav
        isPlaying={isPlaying}
        onToggleMusic={onToggleMusic}
        hasMusic={!!invitation.music_url}
        visible={isOpen}
      />

      <Hero invitation={invitation} />
      <Countdown invitation={invitation} />
      <AyatSection />
      <CoupleInfo invitation={invitation} />
      <EventDetails invitation={invitation} />
      <LoveStory items={invitation.love_story_items} />
      <Gallery photos={invitation.gallery_photos} />
      <DigitalEnvelope accounts={invitation.bank_accounts} />
      <RsvpForm slug={slug} guestName={guestName} />
      <GuestbookWall slug={slug} />
      <Footer invitation={invitation} />
    </div>
  );
}
