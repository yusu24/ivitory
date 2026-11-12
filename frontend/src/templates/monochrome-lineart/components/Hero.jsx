import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { BotanicalCorner, DiamondDivider, CircularTextSeal } from './MonochromeOrnaments';
import { getInvitationTexts, getPhotoSlotConfig } from '../utils/templateConfig';

export default function Hero({ invitation, onScrollToNext }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const medallionY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const texts = getInvitationTexts(invitation);
  const heroPhotoCfg = getPhotoSlotConfig(invitation, 'hero');

  const groomName = invitation?.groom_name || 'M Yusuf Effendi';
  const brideName = invitation?.bride_name || 'Nor Nabilla';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Yusuf';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Nabilla';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-01-18';
  const formattedDate = new Date(eventDateRaw).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const locationName = invitation?.akad_location || invitation?.resepsi_location || 'Surabaya, Jawa Timur';
  const heroPhotoSrc =
    invitation?.hero_image_url ||
    invitation?.cover_photo_url ||
    '/templates/minimal-monochrome/couple_real.png';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-between px-4 py-12 sm:py-16 bg-paper-texture overflow-hidden text-zinc-900 border-b border-zinc-200"
    >
      {/* Subtle Giant Editorial Background Monogram Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="font-editorial-serif text-[28vw] font-bold text-zinc-900/[0.025] tracking-widest leading-none">
          N&amp;Y
        </span>
      </motion.div>

      {/* Architectural Outer Hairline Frame */}
      <div className="absolute inset-3 sm:inset-6 border border-zinc-300/80 pointer-events-none z-0" />

      {/* Decorative Self-Drawing Botanical Corner Flourishes */}
      <BotanicalCorner
        position="top-left"
        className="w-20 h-20 sm:w-32 sm:h-32 absolute top-4 left-4 sm:top-7 sm:left-7 text-zinc-900 opacity-85"
      />
      <BotanicalCorner
        position="top-right"
        className="w-20 h-20 sm:w-32 sm:h-32 absolute top-4 right-4 sm:top-7 sm:right-7 text-zinc-900 opacity-85"
      />
      <BotanicalCorner
        position="bottom-left"
        className="w-16 h-16 sm:w-24 sm:h-24 absolute bottom-4 left-4 sm:bottom-7 sm:left-7 text-zinc-900 opacity-40"
      />
      <BotanicalCorner
        position="bottom-right"
        className="w-16 h-16 sm:w-24 sm:h-24 absolute bottom-4 right-4 sm:bottom-7 sm:right-7 text-zinc-900 opacity-40"
      />

      {/* Top Editorial Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pt-4 z-10"
      >
        <div className="inline-flex items-center gap-2.5 border border-zinc-950 px-5 py-1.5 mb-3 bg-zinc-950 text-white shadow-md">
          <Sparkles className="w-3 h-3 text-zinc-300" />
          <span className="text-[10px] sm:text-xs tracking-[0.38em] font-clean-sans uppercase font-semibold">
            {texts.hero_badge}
          </span>
          <Sparkles className="w-3 h-3 text-zinc-300" />
        </div>
        <p className="text-[11px] sm:text-xs font-clean-sans tracking-[0.35em] uppercase text-zinc-500 font-semibold">
          {texts.hero_subtitle}
        </p>
      </motion.div>

      {/* Main Center Content */}
      <div className="flex flex-col items-center max-w-2xl w-full my-auto py-6 z-10 text-center">
        {/* Couple Line Art Drawing in Luxury Double Medallion + Orbiting Seal */}
        <motion.div
          style={{ y: medallionY }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 group"
        >
          <div className="absolute -inset-6 sm:-inset-8 pointer-events-none opacity-85">
            <CircularTextSeal
              text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • ${texts.hero_divider_text} • `}
            />
          </div>

          {/* Outer Ring with Double Architectural Border */}
          <div className="w-56 h-56 sm:w-68 sm:h-68 rounded-full border-2 border-zinc-950 p-2.5 relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-dashed border-zinc-400 flex items-center justify-center overflow-hidden p-3 bg-zinc-50/40 relative">
              <img
                src={heroPhotoSrc}
                alt="Couple Line Art Illustration"
                style={heroPhotoCfg.style}
                className={`w-full h-full transition-transform duration-500 ${heroPhotoCfg.filterClass}`}
                onError={(e) => {
                  e.currentTarget.src = "/templates/minimal-monochrome/couple_real.png";
                }}
              />
            </div>

            {/* Elegant Monogram Wax Stamp Badge */}
            <motion.div
              whileHover={{ scale: 1.12, rotate: -6 }}
              className="absolute -bottom-2 right-8 bg-zinc-950 border-2 border-white rounded-full w-11 h-11 flex items-center justify-center text-white text-xs font-editorial-serif font-bold shadow-lg"
            >
              {monogram}
            </motion.div>
          </div>
        </motion.div>

        {/* Bride & Groom Calligraphy Names with Staggered Spring Reveal */}
        <motion.div
          style={{ y: titleY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.18, delayChildren: 0.3 },
            },
          }}
          className="space-y-1 mb-4"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="font-script-calligraphy text-5xl sm:text-6xl md:text-7xl text-zinc-950 font-normal leading-tight"
          >
            {brideName}
          </motion.h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
            }}
            className="flex items-center justify-center gap-4 my-1"
          >
            <div className="h-[1px] w-16 bg-zinc-900" />
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-900 font-editorial-serif italic text-lg text-zinc-900 bg-white shadow-2xs">
              &amp;
            </span>
            <div className="h-[1px] w-16 bg-zinc-900" />
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="font-script-calligraphy text-5xl sm:text-6xl md:text-7xl text-zinc-950 font-normal leading-tight"
          >
            {groomName}
          </motion.h2>
        </motion.div>

        {/* Diamond Divider */}
        <DiamondDivider className="max-w-xs" text={texts.hero_divider_text} />

        {/* High-Contrast Date and Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 text-xs sm:text-sm font-clean-sans"
        >
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-950 text-white border border-zinc-950 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-300" />
            <span className="font-semibold tracking-[0.18em] uppercase text-[11px]">{formattedDate}</span>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-zinc-950 border border-zinc-950 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-zinc-800" />
            <span className="font-semibold tracking-[0.18em] uppercase text-[11px]">{locationName}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="text-center pb-2 z-10 cursor-pointer group"
        onClick={onScrollToNext}
      >
        <span className="text-[10px] tracking-[0.35em] font-clean-sans uppercase text-zinc-500 block mb-1.5 group-hover:text-zinc-950 transition-colors font-medium">
          Gulir Ke Bawah
        </span>
        <div className="w-6 h-9 rounded-full border border-zinc-900 mx-auto flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-zinc-950 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
