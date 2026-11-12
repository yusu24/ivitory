import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function MusicPlayer({ isPlaying, onToggleMusic, hasMusic = true }) {
  if (!hasMusic) return null;

  const handleToggle = () => {
    sounds.playChime();
    if (onToggleMusic) onToggleMusic();
  };

  return (
    <div className="fixed bottom-20 left-4 z-40 sm:bottom-6 sm:left-6">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleToggle}
        className="flex items-center gap-2.5 px-3.5 py-2 bg-white/95 backdrop-blur-md border border-zinc-900 rounded-full shadow-xl text-zinc-900 hover:bg-white transition-all cursor-pointer group"
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Mini Vinyl Record */}
        <div
          className={`relative w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 shadow-sm ${
            isPlaying ? 'animate-vinyl-spin' : ''
          }`}
        >
          {/* Vinyl Grooves */}
          <div className="w-5 h-5 rounded-full border border-zinc-700/60" />
          {/* Center Label */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-zinc-100 border border-zinc-900 flex items-center justify-center">
            <span className="w-0.5 h-0.5 rounded-full bg-zinc-900" />
          </div>
        </div>

        {/* Track Title & Animated Soundwave */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] font-clean-sans tracking-widest font-semibold uppercase text-zinc-900 leading-tight">
            Wedding Sonata
          </span>
          <span className="text-[9px] font-clean-sans text-zinc-500 tracking-wider">
            {isPlaying ? 'Sedang Diputar' : 'Musik Dijeda'}
          </span>
        </div>

        {/* Dynamic Soundwave Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-4 px-1">
          {isPlaying ? (
            <>
              <div className="w-0.5 bg-zinc-900 rounded-full soundwave-bar-1" />
              <div className="w-0.5 bg-zinc-900 rounded-full soundwave-bar-2" />
              <div className="w-0.5 bg-zinc-900 rounded-full soundwave-bar-3" />
              <div className="w-0.5 bg-zinc-900 rounded-full soundwave-bar-4" />
            </>
          ) : (
            <div className="flex items-center gap-0.5 text-zinc-400">
              <VolumeX className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
}
