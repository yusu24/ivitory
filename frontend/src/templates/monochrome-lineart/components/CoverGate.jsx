import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, MailOpen, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BotanicalCorner, CircularTextSeal } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';
import {
  COVER_BG_THEMES,
  getInvitationTexts,
  getPhotoSlotConfig,
} from '../utils/templateConfig';

export default function CoverGate({
  invitation,
  guestName = 'Tamu Undangan',
  isOpen,
  onOpen,
}) {
  const [isOpening, setIsOpening] = useState(false);
  const [previewBgOverride, setPreviewBgOverride] = useState(null);

  // Interactive 3D Mouse Tilt & Parallax Physics (powered by Framer Motion springs)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5.5, -5.5]), {
    stiffness: 160,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5.5, 5.5]), {
    stiffness: 160,
    damping: 24,
  });
  const bgShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 28,
  });
  const bgShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 28,
  });
  const lightShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), {
    stiffness: 100,
    damping: 30,
  });

  if (isOpen) return null;

  const texts = getInvitationTexts(invitation);
  const coverPhotoCfg = getPhotoSlotConfig(invitation, 'cover');
  const rawTheme = previewBgOverride || texts.cover_bg_theme || 'botanical_lineart';
  const activeBgTheme =
    rawTheme === 'alabaster' ||
    rawTheme === 'champagne' ||
    rawTheme === 'botanical_garden' ||
    rawTheme === 'vintage_paper'
      ? 'botanical_lineart'
      : rawTheme;

  const groomName = invitation?.groom_name || 'M Yusuf Effendi';
  const brideName = invitation?.bride_name || 'Nor Nabilla';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Yusuf';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Nabilla';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-01-18';
  const formattedDate = new Date(eventDateRaw)
    .toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleOpenCeremony = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playWaxSealBreak();

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#09090b', '#a67c52', '#d4c8aa', '#f5f1e6', '#ffffff'],
        zIndex: 9999,
      });

      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#09090b', '#a67c52', '#ffffff'],
          zIndex: 9999,
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#09090b', '#a67c52', '#ffffff'],
          zIndex: 9999,
        });
      }, 300);
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      if (onOpen) onOpen();
    }, 950);
  };

  const customBgUrl = texts.cover_bg_custom_url?.trim();
  const photoBackdropUrl =
    customBgUrl ||
    invitation?.gallery_photos?.[0]?.url ||
    invitation?.cover_photo_url ||
    '/templates/minimal-monochrome/atelier-botanical-lineart-bg.jpg';

  /**
   * Renders a full-bleed viewport scene spanned seamlessly across Left & Right split curtains
   * (`side === 'left'` renders `left-0 w-[200%]`, `side === 'right'` renders `-left-full w-[200%]`)
   */
  const renderFullBleedScene = (side) => {
    const positionClass = side === 'left' ? 'left-0 w-[200%]' : '-left-full w-[200%]';

    if (customBgUrl || activeBgTheme === 'photo_blur') {
      return (
        <div className={`absolute inset-y-0 ${positionClass} overflow-hidden bg-stone-900`}>
          <motion.div
            style={{ x: bgShiftX, y: bgShiftY, backgroundImage: `url("${photoBackdropUrl}")` }}
            className="absolute -inset-6 bg-cover bg-center scale-105 blur-md opacity-65"
          />
          <div className="absolute inset-0 bg-radial from-black/15 via-black/35 to-black/70" />
        </div>
      );
    }

    if (activeBgTheme === 'botanical_lineart_noir') {
      return (
        <div className={`absolute inset-y-0 ${positionClass} overflow-hidden bg-[#141311]`}>
          <motion.div
            style={{
              x: bgShiftX,
              y: bgShiftY,
              backgroundImage:
                'url("/templates/minimal-monochrome/atelier-botanical-lineart-bg.jpg")',
            }}
            className="absolute -inset-5 bg-cover bg-center scale-105 invert brightness-[0.88] sepia-[0.35] hue-rotate-[6deg] contrast-125"
          />
          {/* Outer Fine-Line Architectural Frame & Animated Botanical Flourishes */}
          <div className="absolute inset-4 sm:inset-7 border border-amber-200/20 pointer-events-none" />
          <div className="absolute inset-5 sm:inset-8 border border-white/10 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-stone-950/20 to-stone-950/65 pointer-events-none" />
        </div>
      );
    }

    if (activeBgTheme === 'travertine_atelier') {
      return (
        <div className={`absolute inset-y-0 ${positionClass} overflow-hidden bg-[#eae3d5]`}>
          <motion.div
            style={{
              x: bgShiftX,
              y: bgShiftY,
              backgroundImage: 'url("/templates/minimal-monochrome/atelier-flatlay-bg.jpg")',
            }}
            className="absolute -inset-5 bg-cover bg-center scale-105"
          />
          <motion.div
            style={{ x: lightShiftX }}
            className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,transparent_35%,rgba(255,250,240,0.22)_55%,transparent_80%)] pointer-events-none"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-stone-900/5 to-stone-900/30 pointer-events-none" />
        </div>
      );
    }

    if (activeBgTheme === 'walnut_candlelight') {
      return (
        <div className={`absolute inset-y-0 ${positionClass} overflow-hidden bg-[#24160e]`}>
          <motion.div
            style={{
              x: bgShiftX,
              y: bgShiftY,
              backgroundImage: 'url("/templates/minimal-monochrome/atelier-walnut-bg.jpg")',
            }}
            className="absolute -inset-5 bg-cover bg-center scale-105"
          />
          {/* Warm Golden Hour Candlelight Vignette */}
          <div className="absolute inset-0 bg-radial from-amber-500/5 via-stone-950/20 to-stone-950/65" />
          <motion.div
            style={{ x: lightShiftX }}
            className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,215,150,0.09)_38%,transparent_52%,rgba(255,215,150,0.06)_68%,transparent_85%)] pointer-events-none"
          />
        </div>
      );
    }

    if (activeBgTheme === 'noir') {
      return (
        <div className={`absolute inset-y-0 ${positionClass} bg-noir-texture`}>
          <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/60 to-black" />
        </div>
      );
    }

    // Default: 'botanical_lineart' — Hand-Drawn Fine-Line Peonies, Garden Roses, Cosmos & Eucalyptus on Warm Cotton Paper
    return (
      <div className={`absolute inset-y-0 ${positionClass} overflow-hidden bg-[#f6f1e6]`}>
        <motion.div
          style={{
            x: bgShiftX,
            y: bgShiftY,
            backgroundImage:
              'url("/templates/minimal-monochrome/atelier-botanical-lineart-bg.jpg")',
          }}
          className="absolute -inset-5 bg-cover bg-center scale-105"
        />
        {/* Subtle Morning Sunbeam Gobo & Outer Fine-Line Frame */}
        <motion.div
          style={{ x: lightShiftX }}
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28)_0%,transparent_38%,rgba(255,250,240,0.25)_58%,transparent_82%)] pointer-events-none"
        />
        <div className="absolute inset-4 sm:inset-7 border border-stone-800/20 pointer-events-none" />
        <div className="absolute inset-5 sm:inset-8 border border-stone-600/10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-stone-900/15 pointer-events-none" />
      </div>
    );
  };

  const isDarkCurtain =
    activeBgTheme === 'noir' ||
    activeBgTheme === 'botanical_lineart_noir' ||
    activeBgTheme === 'walnut_candlelight' ||
    activeBgTheme === 'photo_blur' ||
    Boolean(customBgUrl);

  const activeThemeLabel =
    COVER_BG_THEMES.find((t) => t.id === activeBgTheme)?.label || 'Bunga Line-Art';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none perspective-1200"
      >
        {/* Split-Curtain Left Panel (Seamless Left Half of Flat-Lay Desk) */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isOpening ? '-102%' : '0%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className={`absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r ${
            isDarkCurtain ? 'border-white/15' : 'border-stone-400/35'
          } z-0`}
        >
          {renderFullBleedScene('left')}
        </motion.div>

        {/* Split-Curtain Right Panel (Seamless Right Half of Flat-Lay Desk) */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isOpening ? '102%' : '0%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className={`absolute inset-y-0 right-0 w-1/2 overflow-hidden border-l ${
            isDarkCurtain ? 'border-white/15' : 'border-stone-400/35'
          } z-0`}
        >
          {renderFullBleedScene('right')}
        </motion.div>

        {/* Live Studio Backdrop Switcher Pill (Bottom Center) */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-stone-300/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          <Palette className="w-3.5 h-3.5 text-zinc-700" />
          <span className="text-[10px] font-clean-sans font-bold uppercase tracking-wider text-zinc-700 hidden sm:inline">
            Meja Studio:
          </span>
          <div className="flex items-center gap-1.5">
            {COVER_BG_THEMES.map((item) => {
              const active = activeBgTheme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPreviewBgOverride(item.id)}
                  title={item.label}
                  className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                    active
                      ? 'scale-125 ring-2 ring-zinc-950 border-white shadow-sm'
                      : 'border-stone-400 opacity-80 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: item.swatch }}
                />
              );
            })}
          </div>
          <span className="text-[10px] font-editorial-serif italic text-zinc-600 pl-1 border-l border-stone-300 hidden md:inline">
            {activeThemeLabel}
          </span>
        </div>

        {/* 3D Tilt Envelope Card Container with Stacked Physical Stationery Layers */}
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ y: 36, opacity: 0, scale: 0.93 }}
          animate={
            isOpening
              ? { y: -30, opacity: 0, scale: 1.08, filter: 'blur(6px)' }
              : { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-lg preserve-3d"
        >
          {/* Physical Backing Layer 1: Angled Warm Deckle-Edge Envelope Card */}
          <div
            className="absolute inset-0 bg-[#f5f0e6] border border-[#d6cbb9] shadow-xl pointer-events-none hidden sm:block"
            style={{ transform: 'rotate(-2.3deg) translate(-8px, 6px)' }}
          >
            <div className="absolute inset-2 border border-dashed border-[#c7baa5]/70" />
          </div>

          {/* Physical Backing Layer 2: Translucent Vellum Sheet */}
          <div
            className="absolute inset-0 bg-white/75 backdrop-blur-[2px] border border-stone-300/80 shadow-lg pointer-events-none hidden sm:block"
            style={{ transform: 'rotate(1.6deg) translate(7px, 4px)' }}
          />

          {/* Main Atelier Card Body */}
          <div
            className={`relative bg-[#fffdf9] ${
              isDarkCurtain
                ? 'shadow-[0_35px_95px_rgba(0,0,0,0.75)]'
                : 'shadow-[0_28px_65px_rgba(45,38,33,0.28),0_8px_20px_rgba(45,38,33,0.12)]'
            } border-2 border-zinc-950 p-6 sm:p-10 overflow-hidden group`}
            style={{
              backgroundImage: 'radial-gradient(#d4d0c8 0.7px, transparent 0.7px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="shimmer-sweep absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-200/30 to-transparent pointer-events-none" />

            {/* Double Fine Hairline Border */}
            <div className="absolute inset-2 sm:inset-3 border border-zinc-950 pointer-events-none" />
            <div className="absolute inset-3.5 sm:inset-4.5 border border-zinc-300 pointer-events-none" />

            {/* Self-Drawing Corner Botanical Flourishes */}
            <BotanicalCorner position="top-left" className="w-12 h-12 sm:w-14 sm:h-14 absolute top-4 left-4 text-zinc-900 opacity-90" />
            <BotanicalCorner position="top-right" className="w-12 h-12 sm:w-14 sm:h-14 absolute top-4 right-4 text-zinc-900 opacity-90" />
            <BotanicalCorner position="bottom-left" className="w-12 h-12 sm:w-14 sm:h-14 absolute bottom-4 left-4 text-zinc-900 opacity-90" />
            <BotanicalCorner position="bottom-right" className="w-12 h-12 sm:w-14 sm:h-14 absolute bottom-4 right-4 text-zinc-900 opacity-90" />

            {/* Envelope Header Text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center pt-1 relative z-10"
            >
              <span className="inline-block px-3 py-0.5 bg-zinc-950 text-white text-[9px] sm:text-[10px] font-clean-sans uppercase tracking-[0.38em] font-semibold mb-2">
                {texts.cover_header}
              </span>
              <div className="w-16 h-[1px] bg-zinc-900 mx-auto" />
            </motion.div>

            {/* Couple Calligraphy Title */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7 }}
              className="text-center my-3.5 relative z-10"
            >
              <h2 className="font-script-calligraphy text-4xl sm:text-5xl text-zinc-950 leading-tight">
                {brideName}
              </h2>
              <div className="flex items-center justify-center gap-3 my-0.5">
                <span className="w-8 h-[1px] bg-zinc-300" />
                <span className="font-editorial-serif italic text-lg text-zinc-600">
                  &amp;
                </span>
                <span className="w-8 h-[1px] bg-zinc-300" />
              </div>
              <h2 className="font-script-calligraphy text-4xl sm:text-5xl text-zinc-950 leading-tight">
                {groomName}
              </h2>
              <p className="text-[10px] sm:text-[11px] font-clean-sans tracking-[0.28em] text-zinc-700 font-semibold uppercase mt-2">
                {formattedDate}
              </p>
            </motion.div>

            {/* Guest Name Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="my-4 py-3 px-6 bg-zinc-50/95 border border-zinc-900 text-center max-w-xs mx-auto shadow-xs relative z-10"
            >
              <div className="absolute inset-1 border border-zinc-200 pointer-events-none" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-clean-sans block">
                {texts.cover_guest_label}
              </span>
              <p className="text-sm sm:text-base font-editorial-serif font-bold text-zinc-950 mt-0.5 truncate">
                {guestName || 'Bapak/Ibu Tamu Undangan'}
              </p>
            </motion.div>

            {/* Interactive Couple Photo Medallion with Orbiting Circular Text Seal */}
            <div className="flex flex-col items-center justify-center mt-5 relative z-20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCeremony}
                className="group/medallion relative cursor-pointer focus:outline-none"
                title="Klik untuk Buka Undangan"
              >
                <div className="absolute -inset-4 sm:-inset-5 pointer-events-none">
                  <CircularTextSeal
                    text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • WALIMATUL 'URS • `}
                  />
                </div>

                {/* Circular Portrait Frame */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 bg-white border-2 border-zinc-950 shadow-xl overflow-visible">
                  <div className="w-full h-full rounded-full overflow-hidden border border-zinc-300 bg-white">
                    <img
                      src={invitation?.cover_photo_url || "/templates/minimal-monochrome/couple_real.png"}
                      alt={`${brideName} & ${groomName}`}
                      style={coverPhotoCfg.style}
                      className={`w-full h-full transition-transform duration-500 bg-white ${coverPhotoCfg.filterClass}`}
                      onError={(e) => {
                        e.currentTarget.src = "/templates/minimal-monochrome/couple_real.png";
                      }}
                    />
                  </div>

                  {/* Monogram Seal Badge in Corner */}
                  <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-zinc-950 text-white border-2 border-white flex items-center justify-center text-[10px] font-editorial-serif font-bold shadow-lg">
                    {monogram}
                  </div>

                  <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-950 opacity-60" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-zinc-950 border border-white" />
                  </span>
                </div>
              </motion.div>

              {/* High-Contrast Magnetic Buka Undangan Action Button */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenCeremony}
                className="mt-7 px-8 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-clean-sans uppercase tracking-[0.28em] font-semibold shadow-xl border border-zinc-950 transition-all duration-300 flex items-center gap-2.5 cursor-pointer animate-ring-pulse group/btn"
              >
                <MailOpen className="w-3.5 h-3.5 text-zinc-200 transition-transform group-hover/btn:-translate-y-0.5" />
                <span>{isOpening ? 'Membuka Tirai...' : texts.cover_button_text}</span>
              </motion.button>

              <div className="flex items-center gap-1.5 mt-3 text-zinc-500">
                <Sparkles className="w-3 h-3 text-zinc-700 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[9px] tracking-[0.22em] uppercase font-clean-sans text-zinc-500">
                  {texts.cover_hint_text}
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
