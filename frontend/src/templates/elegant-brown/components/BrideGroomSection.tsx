import React from 'react';
import { motion } from 'framer-motion';
import { AtSign, Heart, Quote } from 'lucide-react';
import { CoupleInfo } from '../types/wedding';

interface BrideGroomSectionProps {
  couple: CoupleInfo;
  quote: { text: string; source: string };
}

export const BrideGroomSection: React.FC<BrideGroomSectionProps> = ({ couple, quote }) => {
  return (
    <section id="bride-groom" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Quran Quote Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto mb-20 relative overflow-hidden border border-[#D4AF37]/30 shadow-xl"
      >
        <Quote className="w-8 h-8 text-[#5C3A21]/40 mx-auto mb-4" />
        <p className="font-serif-luxury text-[#2B1B17] text-lg sm:text-xl italic leading-relaxed mb-4">
          "{quote.text}"
        </p>
        <div className="inline-block px-4 py-1 rounded-full bg-[#5C3A21]/15 text-[#5C3A21] font-semibold text-xs tracking-widest uppercase">
          {quote.source}
        </div>
      </motion.div>

      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Pasangan Pengantin
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Mempelai Pria &amp; Wanita
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
      </div>

      {/* Grid Groom & Bride */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        {/* GROOM CARD */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center relative border border-white/80 shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-500 group"
        >
          {/* Photo Container */}
          <div className="relative mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 border-2 border-[#D4AF37] shadow-xl group-hover:scale-105 transition-transform duration-500 relative">
              <img
                src={couple.groom.photo}
                alt={couple.groom.fullName}
                className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-2 right-4 bg-[#3D261D] text-[#D4AF37] p-2.5 rounded-full border border-[#D4AF37] shadow-lg">
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
            </div>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2B1B17] mb-1">
            {couple.groom.fullName}
          </h3>

          <p className="text-xs font-semibold text-[#5C3A21] uppercase tracking-widest mb-4">
            — Mempelai Pria —
          </p>

          <p className="text-xs text-[#2B1B17]/80 leading-relaxed font-light mb-6 max-w-sm">
            {couple.groom.bio}
          </p>

          <div className="w-full bg-white/60 rounded-2xl p-4 border border-[#5C3A21]/15 text-xs text-[#2B1B17] space-y-1 mb-6">
            <p className="text-[#5C3A21] font-medium">{couple.groom.childOrder}</p>
            <p className="font-semibold text-sm">{couple.groom.fatherName}</p>
            <p className="text-xs text-[#2B1B17]/70">&amp; {couple.groom.motherName}</p>
          </div>

          <a
            href={`https://instagram.com/${couple.groom.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3D261D] text-[#FBF5B7] text-xs font-medium tracking-wider hover:bg-[#5C3A21] transition-colors duration-300 shadow-md"
          >
            <AtSign className="w-4 h-4 text-[#D4AF37]" />
            <span>{couple.groom.instagram}</span>
          </a>
        </motion.div>

        {/* BRIDE CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center relative border border-white/80 shadow-2xl hover:border-[#5C3A21]/40 transition-all duration-500 group"
        >
          {/* Photo Container */}
          <div className="relative mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 border-2 border-[#D4AF37] shadow-xl group-hover:scale-105 transition-transform duration-500 relative">
              <img
                src={couple.bride.photo}
                alt={couple.bride.fullName}
                className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-2 right-4 bg-[#3D261D] text-[#D4AF37] p-2.5 rounded-full border border-[#D4AF37] shadow-lg">
              <Heart className="w-4 h-4 fill-[#D4AF37]" />
            </div>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2B1B17] mb-1">
            {couple.bride.fullName}
          </h3>

          <p className="text-xs font-semibold text-[#5C3A21] uppercase tracking-widest mb-4">
            — Mempelai Wanita —
          </p>

          <p className="text-xs text-[#2B1B17]/80 leading-relaxed font-light mb-6 max-w-sm">
            {couple.bride.bio}
          </p>

          <div className="w-full bg-white/60 rounded-2xl p-4 border border-[#5C3A21]/15 text-xs text-[#2B1B17] space-y-1 mb-6">
            <p className="text-[#5C3A21] font-medium">{couple.bride.childOrder}</p>
            <p className="font-semibold text-sm">{couple.bride.fatherName}</p>
            <p className="text-xs text-[#2B1B17]/70">&amp; {couple.bride.motherName}</p>
          </div>

          <a
            href={`https://instagram.com/${couple.bride.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3D261D] text-[#FBF5B7] text-xs font-medium tracking-wider hover:bg-[#5C3A21] transition-colors duration-300 shadow-md"
          >
            <AtSign className="w-4 h-4 text-[#D4AF37]" />
            <span>{couple.bride.instagram}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
