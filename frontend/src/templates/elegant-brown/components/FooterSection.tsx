import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Share2, Check, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterSectionProps {
  groomName: string;
  brideName: string;
  guestName: string;
  onScrollToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  groomName,
  brideName,
  guestName,
  onScrollToTop,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(guestName || 'Tamu Undangan')}`;

    if (navigator.share) {
      navigator
        .share({
          title: `The Wedding of ${groomName} & ${brideName}`,
          text: `Undangan Pernikahan Online M Yusuf Effendi & Nor Nabila Muhammad`,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      confetti({ particleCount: 30, spread: 50 });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="relative bg-[#1F1310] text-white pt-20 pb-12 px-6 overflow-hidden border-t border-[#5C3A21]/40">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,58,33,0.3)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 bg-[#2B1B17] flex items-center justify-center p-1 mb-6 shadow-[0_0_25px_rgba(92,58,33,0.5)]">
          <span className="font-script text-xl gold-gradient-text">
            MY &amp; NN
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-2">
          Terima Kasih Atas Doa &amp; Restu Anda
        </p>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-white my-3">
          {groomName} <span className="text-[#D4AF37] font-script text-3xl sm:text-4xl">&amp;</span> {brideName}
        </h2>

        <p className="text-xs text-white/80 max-w-lg leading-relaxed font-light my-6 italic">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk pernikahan kami."
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-6" />

        {/* Share Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-[#D4AF37] bg-[#3D261D] text-[#FBF5B7] hover:bg-[#5C3A21] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Bagikan Undangan Ini</span>
              </>
            )}
          </button>

          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Kembali Ke Atas</span>
          </button>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-white/40 font-mono">
          &copy; {new Date().getFullYear()} M Yusuf Effendi &amp; Nor Nabila Muhammad. Crafted with Love &amp; Elegance.
        </p>
      </div>
    </footer>
  );
};
