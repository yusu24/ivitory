import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { OpeningModal } from './components/OpeningModal';
import { FloatingParticles } from './components/FloatingParticles';
import { HeroSection } from './components/HeroSection';
import { BrideGroomSection } from './components/BrideGroomSection';
import { LoveStorySection } from './components/LoveStorySection';
import { CountdownSection } from './components/CountdownSection';
import { EventSection } from './components/EventSection';
import { GallerySection } from './components/GallerySection';
import { WeddingGiftSection } from './components/WeddingGiftSection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookSection } from './components/GuestbookSection';
import { FooterSection } from './components/FooterSection';
import { AutoScrollController } from './components/AutoScrollController';
import { MusicPlayer } from './components/MusicPlayer';

import './style.css';

export default function ElegantBrownTemplate({
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
  const couple = {
    groom: {
      fullName: invitation.groom_name,
      shortName: invitation.groom_nickname || invitation.groom_name,
      fatherName: invitation.groom_parents?.split('&')[0]?.trim() || '',
      motherName: invitation.groom_parents?.split('&')[1]?.trim() || '',
      childOrder: 'Putra dari',
      bio: '',
      instagram: '@instagram',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    bride: {
      fullName: invitation.bride_name,
      shortName: invitation.bride_nickname || invitation.bride_name,
      fatherName: invitation.bride_parents?.split('&')[0]?.trim() || '',
      motherName: invitation.bride_parents?.split('&')[1]?.trim() || '',
      childOrder: 'Putri dari',
      bio: '',
      instagram: '@instagram',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    }
  };

  const events = [];
  if (invitation.akad_date) {
    events.push({
      id: 'akad',
      title: 'Akad Nikah',
      date: new Date(invitation.akad_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: invitation.akad_time || '08:00',
      timezone: 'WIB',
      venueName: invitation.akad_location,
      address: invitation.akad_address,
      googleMapsUrl: invitation.akad_map_url,
      embedMapUrl: '',
      iconType: 'akad'
    });
  }
  if (invitation.resepsi_date) {
    events.push({
      id: 'resepsi',
      title: 'Resepsi',
      date: new Date(invitation.resepsi_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: invitation.resepsi_time || '11:00',
      timezone: 'WIB',
      venueName: invitation.resepsi_location,
      address: invitation.resepsi_address,
      googleMapsUrl: invitation.resepsi_map_url,
      embedMapUrl: '',
      iconType: 'resepsi'
    });
  }

  const loveStory = invitation.love_story_items?.map((item, idx) => ({
    id: String(item.id || idx),
    year: new Date(item.item_date).getFullYear().toString(),
    title: item.title,
    date: new Date(item.item_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    description: item.story,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
  })) || [];

  const gallery = invitation.gallery_photos?.map((item, idx) => ({
    id: String(item.id || idx),
    url: item.url || item,
    caption: item.caption || '',
    category: 'all',
    aspectRatio: 'landscape'
  })) || [];

  const bankAccounts = invitation.bank_accounts?.map((item, idx) => ({
    id: String(item.id || idx),
    bankName: item.bank_name,
    accountNumber: item.account_number,
    accountHolder: item.account_holder,
    logoUrl: '',
    qrisUrl: ''
  })) || [];

  const musicPlaylist = invitation.music_url ? [
    {
      id: 'track-1',
      title: 'Lagu Pernikahan',
      artist: 'Musik Latar',
      audioUrl: invitation.music_url
    }
  ] : [
    {
      id: 'track-default-1',
      title: 'A Thousand Years (Piano Elegance)',
      artist: 'Romantic Piano Collection',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112187.mp3'
    },
    {
      id: 'track-default-2',
      title: 'Beautiful In White (Acoustic Strings)',
      artist: 'Classical Ensemble',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a2b388.mp3?filename=wedding-march-piano-10115.mp3'
    }
  ];

  const weddingDateISO = invitation.akad_date || '2026-10-24T08:00:00';
  const weddingDateFormatted = events[0]?.date || '24 Oktober 2026';
  const venueName = events[0]?.venueName || 'Gedung Pernikahan';

  const [wishes, setWishes] = useState([]);

  const handleAddWish = (wish) => {
    setWishes([wish, ...wishes]);
  };
  
  const scrollToNext = () => {
    const el = document.getElementById('bride-groom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1B17] relative font-sans-clean overflow-x-hidden selection:bg-[#6E473B]/20">
      
      {!isOpen && (
        <OpeningModal
          guestName={guestName || 'Tamu Undangan'}
          coupleNames={{
            groomShort: couple.groom.shortName,
            brideShort: couple.bride.shortName,
            groomFull: couple.groom.fullName,
            brideFull: couple.bride.fullName,
          }}
          weddingDate={weddingDateFormatted}
          onOpenInvitation={onOpen}
        />
      )}

      {isOpen && (
        <>
          <FloatingParticles />
          
          {!disableMusic && (
            <>
              <MusicPlayer playlist={musicPlaylist} autoPlayTriggered={isPlaying} />
              <AutoScrollController isActive={isOpen} />
            </>
          )}

          <main className="relative z-10 space-y-8 sm:space-y-16">
            <HeroSection
              groomName={couple.groom.shortName}
              brideName={couple.bride.shortName}
              weddingDate={weddingDateFormatted}
              venueName={venueName}
              onScrollToNext={scrollToNext}
            />

            <BrideGroomSection
              couple={couple}
              quote={{ text: invitation.opening_text || "Dan di antara tanda-tanda kekuasaan-Nya...", source: "Ar-Rum: 21" }}
            />

            <LoveStorySection stories={loveStory} />

            <CountdownSection
              weddingDateISO={weddingDateISO}
              weddingDateFormatted={weddingDateFormatted}
            />

            <EventSection events={events} />

            <GallerySection photos={gallery} />

            <WeddingGiftSection
              bankAccounts={bankAccounts}
              qrisImageUrl=""
              physicalGiftAddress={{
                recipient: couple.groom.shortName,
                phone: "-",
                address: "-"
              }}
            />

            <RsvpSection
              defaultGuestName={guestName || ''}
              onAddWish={handleAddWish}
            />

            <GuestbookSection
              wishes={wishes}
              onToggleLike={() => {}}
            />
          </main>

          <FooterSection
            groomName={couple.groom.shortName}
            brideName={couple.bride.shortName}
            guestName={guestName}
            onScrollToTop={scrollToTop}
          />
        </>
      )}
    </div>
  );
}
