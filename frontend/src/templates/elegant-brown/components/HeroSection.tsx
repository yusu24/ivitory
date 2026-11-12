import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  venueName: string;
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  groomName,
  brideName,
  weddingDate,
  venueName,
  onScrollToNext,
}) => {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#2B1B17] text-white pt-12 pb-16">
      {/* Background Hero Image with Slow Motion Parallax Feel */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat scale-105 animate-pulse"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop')`,
          animationDuration: '12s'
        }}
      />
      {/* Luxury Vignette & Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2B1B17]/90 via-[#3D261D]/75 to-[#1F1310] pointer-events-none" />

      {/* Golden & Brown Shimmer Radial */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(92,58,33,0.35)_0%,transparent_75%)] pointer-events-none" />

      {/* Decorative Frame */}
      <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/35 rounded-3xl pointer-events-none z-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D261D]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-[0_0_25px_rgba(92,58,33,0.5)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
            The Wedding Celebration
          </span>
        </motion.div>

        {/* Wedding Names in Great Vibes / Cormorant Garamond */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center justify-center my-2 drop-shadow-lg"
        >
          <span className="font-script text-5xl sm:text-7xl lg:text-8xl gold-gradient-text leading-tight mb-2 sm:mb-4 pb-2">{groomName}</span>
          <span className="font-serif-luxury text-4xl sm:text-6xl gold-gradient-text italic my-2">&amp;</span>
          <span className="font-script text-5xl sm:text-7xl lg:text-8xl gold-gradient-text leading-tight mt-2 sm:mt-4 pt-2">{brideName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif-luxury text-lg sm:text-2xl text-white/90 font-light tracking-widest my-4"
        >
          Kami Mengundang Anda Dalam Momen Kebahagiaan Kami
        </motion.p>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />

        {/* Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 text-xs sm:text-sm font-light text-white/80 my-4"
        >
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{weddingDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span className="max-w-xs truncate">{venueName}</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={onScrollToNext}
          className="mt-12 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors cursor-pointer group"
        >
          <span>Gulir Ke Bawah</span>
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </motion.button>
      </div>
    </section>
  );
};
