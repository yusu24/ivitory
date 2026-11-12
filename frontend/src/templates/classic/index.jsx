import { useEffect } from 'react';
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
import MusicToggle from './sections/MusicToggle';
import './style.css';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Pinyon+Script&family=Jost:wght@300;400;500&family=Amiri:wght@400;700&display=swap';

function useIvoryGardenFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-ivory-garden-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    link.setAttribute('data-ivory-garden-fonts', '1');
    document.head.appendChild(link);
  }, []);
}

export default function ClassicTemplate({
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
  useIvoryGardenFonts();

  return (
    <div className="ivory-garden ig-paper-texture min-h-screen overflow-x-hidden">
      <CoverGate invitation={invitation} guestName={guestName} isOpen={isOpen} onOpen={onOpen} />

      {!disableMusic && invitation.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}
      {!disableMusic && (
        <MusicToggle isPlaying={isPlaying} onToggle={onToggleMusic} visible={isOpen && !!invitation.music_url} />
      )}

      {isOpen && (
        <>
          <Hero invitation={invitation} />
          <AyatSection invitation={invitation} />
          <CoupleInfo invitation={invitation} />
          <Countdown invitation={invitation} />
          <EventDetails invitation={invitation} />
          <LoveStory items={invitation.love_story_items} />
          <Gallery photos={invitation.gallery_photos} />
          <DigitalEnvelope accounts={invitation.bank_accounts} />
          <RsvpForm slug={slug} guestName={guestName} />
          <GuestbookWall slug={slug} />
          <Footer invitation={invitation} />
        </>
      )}
    </div>
  );
}
