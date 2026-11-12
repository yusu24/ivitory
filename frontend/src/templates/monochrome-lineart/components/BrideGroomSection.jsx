import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BotanicalCorner, DiamondDivider, InterlockingHearts } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';
import { getInvitationTexts, getPhotoSlotConfig } from '../utils/templateConfig';

function InteractiveCoupleCard({
  roleLabel,
  fullName,
  shortName,
  parentsLabel,
  parentsName,
  quote,
  instagramHandle,
  photoUrl,
  photoConfig,
  monogramChar,
  cornerTop,
  cornerBottom,
  direction = -1,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 24,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cleanIg = (instagramHandle || shortName || 'instagram')
    .replace(/^@/, '')
    .toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 35, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="group relative border-2 border-zinc-950 bg-white p-8 sm:p-12 text-center shadow-[0_18px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.16)] transition-shadow duration-500 overflow-hidden preserve-3d"
    >
      <div className="shimmer-sweep absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent pointer-events-none" />

      {/* Double deckle inner frame */}
      <div className="absolute inset-2 border border-zinc-300 pointer-events-none" />
      <BotanicalCorner position={cornerTop} className={`w-12 h-12 absolute top-2.5 ${cornerTop.includes('left') ? 'left-2.5' : 'right-2.5'} opacity-85`} />
      <BotanicalCorner position={cornerBottom} className={`w-12 h-12 absolute bottom-2.5 ${cornerBottom.includes('left') ? 'left-2.5' : 'right-2.5'} opacity-45`} />

      {/* Architectural Arch Portrait Frame with Wax Seal Accent */}
      <div className="relative w-40 h-48 sm:w-44 sm:h-52 mx-auto mb-6">
        <div className="w-full h-full rounded-t-full rounded-b-md border-2 border-zinc-950 p-1.5 bg-white shadow-md">
          <div className="w-full h-full rounded-t-full rounded-b-sm border border-zinc-300 overflow-hidden flex items-center justify-center bg-zinc-50 relative">
            <img
              src={photoUrl}
              alt={fullName}
              style={photoConfig.style}
              className={`w-full h-full transition-transform duration-700 ${photoConfig.filterClass}`}
              onError={(e) => {
                e.currentTarget.src = "/templates/minimal-monochrome/couple_real.png";
              }}
            />
          </div>
        </div>

        {/* Monogram Seal Badge */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: -8 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-white text-xs font-editorial-serif font-bold shadow-lg"
        >
          {monogramChar}
        </motion.div>
      </div>

      <span className="inline-block px-3 py-0.5 bg-zinc-950 text-white text-[9px] tracking-[0.35em] font-clean-sans uppercase font-semibold mt-2 mb-2">
        {roleLabel}
      </span>

      <h3 className="font-script-calligraphy text-4xl sm:text-5xl text-zinc-950 mb-2">
        {fullName}
      </h3>

      <div className="my-4 py-3.5 border-y border-dashed border-zinc-300 bg-zinc-50/50 px-3">
        <p className="text-[10px] font-clean-sans text-zinc-500 uppercase tracking-[0.22em] font-semibold mb-1">
          {parentsLabel}
        </p>
        <p className="font-editorial-serif font-semibold text-base sm:text-lg text-zinc-900 leading-snug">
          {parentsName}
        </p>
      </div>

      <p className="font-editorial-serif italic text-xs sm:text-sm text-zinc-600 max-w-xs mx-auto mb-5 leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex justify-center">
        <a
          href={`https://instagram.com/${cleanIg}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => sounds.playPaperClick()}
          className="inline-flex items-center gap-2 px-5 py-2 border border-zinc-900 bg-white hover:bg-zinc-950 text-zinc-900 hover:text-white rounded-full text-xs font-clean-sans transition-all duration-300 shadow-2xs cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className="tracking-wider font-medium">@{cleanIg}</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function BrideGroomSection({ invitation }) {
  const texts = getInvitationTexts(invitation);
  const bridePhotoCfg = getPhotoSlotConfig(invitation, 'bride');
  const groomPhotoCfg = getPhotoSlotConfig(invitation, 'groom');

  const brideName = invitation?.bride_name || 'Nor Nabilla';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Nabilla';
  const brideParents = invitation?.bride_parents || 'Bapak H. Bambang Sutrisno & Ibu Hj. Endang Lestari';

  const groomName = invitation?.groom_name || 'M Yusuf Effendi';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Yusuf';
  const groomParents = invitation?.groom_parents || 'Bapak H. Slamet Widodo & Ibu Hj. Sri Wahyuni';

  return (
    <section id="couple" className="py-24 sm:py-32 px-4 bg-paper-texture text-zinc-900 border-b border-zinc-200 relative overflow-hidden perspective-1200">
      {/* Background ambient subtle watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.025] text-[18vw] font-editorial-serif font-black tracking-widest text-zinc-900 whitespace-nowrap">
        N &amp; Y
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block mb-2">
            {texts.couple_badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 font-normal">
            {texts.couple_title}
          </h2>
          <p className="font-script-calligraphy text-2xl sm:text-3xl text-zinc-600 mt-1 mb-3">
            {texts.couple_subtitle}
          </p>
          <DiamondDivider className="max-w-xs mx-auto" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-lg mx-auto mt-3 leading-relaxed">
            {texts.couple_intro_text}
          </p>
        </motion.div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 relative items-center">
          {/* MEMPELAI WANITA (BRIDE) */}
          <InteractiveCoupleCard
            roleLabel={texts.bride_role_label}
            fullName={brideName}
            shortName={brideShort}
            parentsLabel={texts.bride_parents_label}
            parentsName={brideParents}
            quote={texts.bride_quote}
            instagramHandle={texts.bride_instagram}
            photoUrl={invitation?.bride_photo_url || invitation?.cover_photo_url || "/templates/minimal-monochrome/couple_real.png"}
            photoConfig={bridePhotoCfg}
            monogramChar={brideShort.charAt(0).toUpperCase() || 'N'}
            cornerTop="top-left"
            cornerBottom="bottom-right"
            direction={-1}
          />

          {/* Center Ampersand & Pulsing Thread of Fate Connector for desktop */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-16 h-16 rounded-full bg-zinc-950 text-white border-4 border-white flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="font-editorial-serif italic text-2xl font-bold leading-none">&amp;</span>
            </motion.div>
          </div>

          {/* MEMPELAI PRIA (GROOM) */}
          <InteractiveCoupleCard
            roleLabel={texts.groom_role_label}
            fullName={groomName}
            shortName={groomShort}
            parentsLabel={texts.groom_parents_label}
            parentsName={groomParents}
            quote={texts.groom_quote}
            instagramHandle={texts.groom_instagram}
            photoUrl={invitation?.groom_photo_url || invitation?.cover_photo_url || "/templates/minimal-monochrome/couple_real.png"}
            photoConfig={groomPhotoCfg}
            monogramChar={groomShort.charAt(0).toUpperCase() || 'Y'}
            cornerTop="top-right"
            cornerBottom="bottom-left"
            direction={1}
          />
        </div>

        {/* Bottom Interlocking Hearts Ornament */}
        <div className="mt-14 flex flex-col items-center justify-center opacity-75">
          <InterlockingHearts className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-clean-sans uppercase tracking-[0.35em] text-zinc-500">
            {brideShort} &amp; {groomShort} Forever
          </span>
        </div>
      </div>
    </section>
  );
}
