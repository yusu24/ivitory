import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InvitationCover from './components/InvitationCover';
import InvitationContent from './components/InvitationContent';
import { DEFAULT_INVITATION_DATA, THEMES } from './components/data';
import './style.css';

export default function Example3Template({
  invitation,
  slug,
  guestName,
  isOpen,
  isPlaying,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  // Map the incoming `invitation` prop into the format expected by the template
  const data = {
    ...DEFAULT_INVITATION_DATA,
    musicUrl: invitation?.music_url || DEFAULT_INVITATION_DATA.musicUrl,
    loveStories: invitation?.love_story_items?.length 
      ? invitation.love_story_items.map((item, idx) => ({
          id: String(idx),
          year: item.year || '',
          title: item.title || '',
          description: item.story || item.description || ''
        })) 
      : DEFAULT_INVITATION_DATA.loveStories,
    gallery: invitation?.gallery_photos?.length 
      ? invitation.gallery_photos.map(p => p.url || p) 
      : DEFAULT_INVITATION_DATA.gallery,
    gifts: invitation?.bank_accounts?.length 
      ? invitation.bank_accounts.map((b, idx) => ({
          id: String(idx),
          bankName: b.bank_name || b.bankName || '',
          accountNumber: b.account_number || b.accountNumber || '',
          accountHolder: b.account_name || b.accountHolder || ''
        })) 
      : DEFAULT_INVITATION_DATA.gifts,
  };

  const activeTheme = THEMES[0]; // Sage Green Minimalist as default

  const [wishes, setWishes] = useState([]);

  const handleAddWish = (newWish) => {
    const wishItem = {
      id: `w-${Date.now()}`,
      ...newWish,
      timestamp: new Date().toLocaleString()
    };
    setWishes([wishItem, ...wishes]);
  };

  return (
    <div className="w-full min-h-screen bg-[#030712] overflow-hidden flex flex-col font-sans relative selection:bg-amber-500/30">
      {/* Required for host app's music toggle to work if not using internal */}
      {invitation?.music_url && <audio ref={audioRef} src={invitation.music_url} loop />}
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 z-30"
          >
            <InvitationCover 
              data={data} 
              theme={activeTheme} 
              guestName={guestName} 
              onOpen={onOpen}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full absolute inset-0 overflow-y-auto no-scrollbar"
          >
            <InvitationContent 
              data={data}
              theme={activeTheme}
              guestName={guestName}
              isMusicPlaying={isPlaying}
              onToggleMusic={onToggleMusic}
              wishes={wishes}
              onAddWish={handleAddWish}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
