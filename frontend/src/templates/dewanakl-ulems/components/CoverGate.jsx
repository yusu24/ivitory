import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CoverGate({
  invitation,
  guestName = 'Bapak/Ibu/Saudara/i',
  isOpen,
  onOpen,
  isDark = false,
}) {
  if (isOpen) return null;

  const groomName = invitation?.groom_nickname || invitation?.groom_name?.split(' ')[0] || 'Wahyu';
  const brideName = invitation?.bride_nickname || invitation?.bride_name?.split(' ')[0] || 'Riski';
  const coupleTitle = `${groomName} & ${brideName}`;
  const coverPhoto = invitation?.cover_photo_url || '/templates/ulems/bg.webp';

  const handleOpenClick = () => {
    // 1. Basic confetti burst
    confetti({
      origin: { y: 0.9 },
      zIndex: 9999,
      particleCount: 70,
      spread: 80,
    });

    // 2. Heart-shaped confetti rain (from Ulems confetti.js)
    try {
      const heart = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.033, 0, 0, 0.033, -5.56, -5.53],
      });
      const end = Date.now() + 2500;
      const colors = ['#FFC0CB', '#FF1493', '#C71585'];

      const frame = () => {
        colors.forEach((color) => {
          confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: 80,
            origin: { x: Math.random(), y: Math.random() * 0.4 },
            zIndex: 9999,
            colors: [color],
            shapes: [heart],
            gravity: 0.7,
            scalar: 0.8,
          });
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
    } catch {
      // Fallback
    }

    // 3. Trigger parent onOpen
    if (onOpen) onOpen();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-black text-white' : 'bg-white text-zinc-900'
        }`}
      >
        {/* Ambient Blurred Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={coverPhoto}
            alt="Background"
            className="w-full h-full object-cover filter blur-[6px] opacity-30 scale-105"
            onError={(e) => {
              e.currentTarget.src = '/templates/ulems/bg.webp';
            }}
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-t from-black via-black/80 to-black/90'
                : 'bg-gradient-to-t from-white via-white/85 to-white/95'
            }`}
          />
        </div>

        {/* Center Content Matching Ulems #welcome */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center text-center max-w-sm w-full mx-auto px-4 py-8"
        >
          <h2 className="font-esthetic text-4xl sm:text-5xl mb-3 leading-tight">
            The Wedding Of
          </h2>

          {/* Circular Photo with White Border & Shadow */}
          <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden mx-auto my-3 bg-zinc-200">
            <img
              src={coverPhoto}
              alt={coupleTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/templates/ulems/bg.webp';
              }}
            />
          </div>

          <h1 className="font-esthetic text-5xl sm:text-6xl my-3 leading-tight">
            {coupleTitle}
          </h1>

          {/* Guest Name Card */}
          <div
            className={`my-3 py-2.5 px-6 rounded-2xl shadow-sm border max-w-xs w-full mx-auto transition-colors duration-300 ${
              isDark
                ? 'bg-zinc-900/90 border-zinc-700 text-white'
                : 'bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
          >
            <span className="text-[10px] font-josefin uppercase tracking-wider opacity-70 block">
              Kepada Yth Bapak/Ibu/Saudara/i
            </span>
            <p className="font-josefin font-semibold text-base sm:text-lg mt-0.5 truncate">
              {guestName}
            </p>
          </div>

          {/* Bouncing Open Invitation Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenClick}
            className={`mt-4 px-8 py-3 rounded-2xl font-josefin font-semibold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 cursor-pointer transition-all border ${
              isDark
                ? 'bg-white text-black border-white hover:bg-zinc-100'
                : 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800'
            }`}
          >
            <MailOpen className="w-4 h-4 animate-bounce" />
            <span>Open Invitation</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
