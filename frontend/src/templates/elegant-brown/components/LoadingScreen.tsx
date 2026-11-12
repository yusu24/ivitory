import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 bg-[#2B1B17] flex flex-col items-center justify-center text-white px-6 overflow-hidden"
    >
      {/* Background Subtle Shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_75%)] pointer-events-none" />

      {/* Floating Sparkles in Loading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 animate-bounce opacity-40 text-[#D4AF37]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-pulse opacity-30 text-[#D4AF37]">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        {/* Monogram Monolith Logo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#D4AF37]/50 flex items-center justify-center p-2 mb-6 relative group shadow-[0_0_35px_rgba(92,58,33,0.6)]">
          <div className="w-full h-full rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#3D261D]/90 backdrop-blur-md">
            <span className="font-script text-3xl sm:text-4xl gold-gradient-text tracking-wide select-none">
              MY <span className="text-xs font-serif-luxury font-light text-[#D4AF37] mx-0.5">&amp;</span> NN
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-light mb-3">
          The Wedding Celebration
        </p>

        <h1 className="font-serif-luxury text-xl sm:text-2xl text-white/90 font-light tracking-widest mb-8">
          M Yusuf Effendi <span className="text-[#D4AF37] font-script text-2xl mx-1">&amp;</span> Nor Nabila
        </h1>

        {/* Progress Bar Container */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-3">
          <motion.div
            className="h-full gold-gradient-bg shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
          {progress}% Loading Experience
        </p>
      </motion.div>
    </motion.div>
  );
};
