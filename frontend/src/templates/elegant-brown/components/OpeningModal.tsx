import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';

interface OpeningModalProps {
  guestName: string;
  coupleNames: { groomShort: string; brideShort: string; groomFull: string; brideFull: string };
  weddingDate: string;
  onOpenInvitation: () => void;
}

export const OpeningModal: React.FC<OpeningModalProps> = ({
  guestName,
  coupleNames,
  weddingDate,
  onOpenInvitation,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-40 bg-[#2B1B17] flex items-center justify-center p-4 sm:p-6 overflow-hidden text-white"
    >
      {/* Background Cinematic Image with Blur */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-105 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')` }}
      />
      
      {/* Soft Ambient Overlay (Lighter, matching loading screen ambiance) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B17]/75 via-[#3D261D]/60 to-[#1F1310]/80 z-0" />

      {/* Radial Golden Shimmer Glow matching Loading Screen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* Floating Sparkles Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/5 animate-bounce opacity-40 text-[#D4AF37]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-1/4 right-1/5 animate-pulse opacity-30 text-[#D4AF37]">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative Golden Floral Corners */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50 pointer-events-none rounded-tl-xl" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/50 pointer-events-none rounded-tr-xl" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]/50 pointer-events-none rounded-bl-xl" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50 pointer-events-none rounded-br-xl" />

      {/* Content Card */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative z-10 w-full max-w-lg glass-card-dark rounded-3xl p-8 sm:p-12 text-center border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(44,7,12,0.8)] flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Invitation</span>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/90 font-light mb-3">
          The Wedding Of
        </p>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal leading-tight tracking-wide mb-2">
          {coupleNames.groomFull}
        </h1>

        <div className="my-1 font-script text-3xl sm:text-4xl text-[#D4AF37]">
          &amp;
        </div>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal leading-tight tracking-wide mb-6">
          {coupleNames.brideFull}
        </h1>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />

        {/* Guest Name Section (Frameless / Seamless) */}
        <div className="w-full my-4 py-2 relative flex flex-col items-center">
          <p className="font-serif-luxury text-[11px] sm:text-xs text-[#D4AF37]/90 tracking-wider mb-1 font-medium italic">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="font-serif-luxury text-lg sm:text-xl text-[#FBF5B7] font-semibold tracking-wide capitalize mb-1">
            {guestName || 'Tamu Undangan'}
          </p>
          <p className="text-[11px] text-white/60 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        <p className="text-xs text-white/80 font-light tracking-widest uppercase mb-8">
          {weddingDate}
        </p>

        {/* Open Invitation Button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(92, 58, 33, 0.7)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenInvitation}
          className="w-full py-4 px-8 rounded-2xl brown-gold-gradient-bg text-white font-medium text-sm tracking-widest uppercase shadow-2xl border border-[#D4AF37]/40 flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[#FBF5B7] group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-[#FBF5B7]">Buka Undangan</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
