import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { BotanicalCorner, DiamondDivider, CircularTextSeal } from './MonochromeOrnaments';
import { getInvitationTexts, getPhotoSlotConfig } from '../utils/templateConfig';

export default function FooterSection({ invitation, onScrollToTop }) {
  const texts = getInvitationTexts(invitation);
  const coverPhotoCfg = getPhotoSlotConfig(invitation, 'cover');

  const groomName = invitation?.groom_name || 'M Yusuf Effendi';
  const brideName = invitation?.bride_name || 'Nor Nabilla';

  const handleScrollTop = () => {
    if (onScrollToTop) onScrollToTop();
  };

  return (
    <footer className="relative bg-paper-texture text-zinc-900 py-24 sm:py-32 px-4 overflow-hidden border-t border-zinc-200">
      {/* Decorative self-drawing corners */}
      <BotanicalCorner position="top-left" className="w-20 h-20 absolute top-4 left-4 opacity-50" />
      <BotanicalCorner position="top-right" className="w-20 h-20 absolute top-4 right-4 opacity-50" />
      <BotanicalCorner position="bottom-left" className="w-20 h-20 absolute bottom-4 left-4 opacity-70" />
      <BotanicalCorner position="bottom-right" className="w-20 h-20 absolute bottom-4 right-4 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Couple Ring Illustration Medallion with Orbiting Circular Text Seal */}
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-5 pointer-events-none opacity-85">
            <CircularTextSeal
              text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • THANK YOU • `}
            />
          </div>
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-zinc-950 shadow-xl mx-auto bg-white p-1.5 relative">
            <div className="w-full h-full rounded-full overflow-hidden border border-zinc-300 bg-white">
              <img
                src={invitation?.cover_photo_url || "/templates/minimal-monochrome/couple_real.png"}
                alt={`${brideName} & ${groomName}`}
                style={coverPhotoCfg.style}
                className={`w-full h-full transition-transform duration-500 ${coverPhotoCfg.filterClass}`}
                onError={(e) => {
                  e.currentTarget.src = "/templates/minimal-monochrome/couple_real.png";
                }}
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-950 text-white border border-white text-[9px] uppercase tracking-[0.28em] font-clean-sans px-3.5 py-0.5 rounded-full shadow-lg whitespace-nowrap font-semibold">
            N &amp; Y
          </div>
        </div>

        <h3 className="font-script-calligraphy text-4xl sm:text-6xl text-zinc-950 mb-3">
          {brideName} &amp; {groomName}
        </h3>

        <p className="font-editorial-serif italic text-base sm:text-xl text-zinc-700 max-w-lg mx-auto leading-relaxed mt-3">
          &ldquo;{texts.closing_text}&rdquo;
        </p>

        <DiamondDivider className="max-w-xs mx-auto my-7" text="TERIMA KASIH" />

        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-700 font-semibold tracking-wider">
            {texts.closing_thanks}
          </p>
          <p className="text-[11px] font-clean-sans uppercase tracking-[0.32em] text-zinc-500">
            {texts.closing_greeting}
          </p>
        </div>

        {/* Back to Top */}
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-zinc-950 bg-white text-zinc-950 text-xs font-clean-sans uppercase tracking-[0.25em] font-semibold hover:bg-zinc-950 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </motion.button>
        </div>

        <div className="mt-14 pt-6 border-t border-zinc-200/80 text-[10px] font-clean-sans tracking-[0.25em] uppercase text-zinc-400">
          Personal Wedding Invitation &bull; {brideName} &amp; {groomName} &bull; Haute Atelier Monochrome Edition
        </div>
      </motion.div>
    </footer>
  );
}
