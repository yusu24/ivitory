import React from 'react';
import { motion } from 'framer-motion';
import { DiamondDivider, BotanicalCorner } from './MonochromeOrnaments';
import { getInvitationTexts } from '../utils/templateConfig';

export default function QuoteAndJourney({ invitation, openingText }) {
  const texts = getInvitationTexts(invitation);
  const quote = openingText || texts.opening_text;
  const words = quote.split(' ');

  return (
    <section className="py-20 sm:py-28 px-4 bg-white text-zinc-900 border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Clean White Atelier Card with Double Fine Hairline Border */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white text-zinc-950 p-7 sm:p-14 border-2 border-zinc-950 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] overflow-hidden group"
        >
          {/* Subtle Hover Shimmer */}
          <div className="shimmer-sweep absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-200/35 to-transparent pointer-events-none" />

          {/* Inner Fine Hairline Border */}
          <div className="absolute inset-2 sm:inset-3 border border-zinc-300 pointer-events-none" />

          {/* Self-Drawing Botanical Corners */}
          <BotanicalCorner position="top-left" className="w-14 h-14 sm:w-18 sm:h-18 absolute top-3.5 left-3.5 opacity-90" />
          <BotanicalCorner position="top-right" className="w-14 h-14 sm:w-18 sm:h-18 absolute top-3.5 right-3.5 opacity-90" />
          <BotanicalCorner position="bottom-left" className="w-14 h-14 sm:w-18 sm:h-18 absolute bottom-3.5 left-3.5 opacity-90" />
          <BotanicalCorner position="bottom-right" className="w-14 h-14 sm:w-18 sm:h-18 absolute bottom-3.5 right-3.5 opacity-90" />

          {/* Top Motif: Academic / Journey Line Art with Gentle Floating Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-6 relative z-10"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 sm:w-36 sm:h-36 relative mb-3 p-2 rounded-full border border-dashed border-zinc-300 bg-white"
            >
              <img
                src="/templates/minimal-monochrome/study_lineart.jpg"
                alt="Study and Journey Motif"
                className="w-full h-full object-contain filter contrast-125 rounded-full"
              />
            </motion.div>

            <p className="text-[11px] sm:text-xs tracking-[0.32em] uppercase font-clean-sans text-zinc-900 font-semibold">
              {texts.opening_title}
            </p>
            <p className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-clean-sans text-zinc-500 mt-1">
              {texts.opening_subtitle}
            </p>
          </motion.div>

          <DiamondDivider className="max-w-xs mx-auto" />

          {/* Arabic Calligraphy / Bismillah */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="my-6"
          >
            <span className="font-arabic text-2xl sm:text-4xl text-zinc-950 tracking-wide block">
              {texts.opening_bismillah}
            </span>
          </motion.div>

          {/* Staggered Word-by-Word Reveal Holy Verse Quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02, delayChildren: 0.12 },
              },
            }}
            className="max-w-2xl mx-auto px-2 sm:px-4"
          >
            <p className="font-editorial-serif italic text-base sm:text-xl text-zinc-800 leading-relaxed font-normal">
              &ldquo;
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 8, filter: 'blur(2px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  }}
                  className="inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
              &rdquo;
            </p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mt-6"
            >
              <span className="inline-block px-5 py-1.5 text-[11px] font-clean-sans uppercase tracking-[0.3em] text-zinc-950 font-semibold border-y border-zinc-900">
                {texts.opening_surah}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
