import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Check, X, Search, Sparkles } from 'lucide-react';
import { GuestWish } from '../types/wedding';

interface GuestbookSectionProps {
  wishes: GuestWish[];
  onToggleLike: (wishId: string) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ wishes, onToggleLike }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredWishes = wishes.filter(
    (w) =>
      w.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="wishes" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Doa &amp; Harapan
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Buku Tamu Digital ({wishes.length})
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="w-4 h-4 text-[#5C3A21]/60 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama pengirim atau isi ucapan..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 border border-[#5C3A21]/20 text-xs text-[#2B1B17] placeholder-[#2B1B17]/40 focus:outline-none focus:border-[#5C3A21] transition-all shadow-sm"
        />
      </div>

      {/* Wishes Stream Container */}
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {filteredWishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-2xl p-6 border border-white/80 shadow-md relative hover:border-[#5C3A21]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#3D261D] text-[#FBF5B7] font-serif-luxury font-bold text-sm flex items-center justify-center border border-[#D4AF37] shadow-sm shrink-0">
                    {wish.senderName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-lg font-semibold text-[#2B1B17]">
                      {wish.senderName}
                    </h4>
                    <span className="text-[10px] text-[#5C3A21] font-mono block">
                      {wish.createdAt}
                    </span>
                  </div>
                </div>

                {/* Attendance Badge */}
                <div className="shrink-0">
                  {wish.attendance === 'hadir' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold uppercase">
                      <Check className="w-3 h-3" />
                      Hadir ({wish.guestCount} Tamu)
                    </span>
                  ) : wish.attendance === 'tidak_hadir' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold uppercase">
                      <X className="w-3 h-3" />
                      Berhalangan
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold uppercase">
                      Masih Ragu
                    </span>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <p className="text-xs sm:text-sm text-[#1A1A1A]/85 leading-relaxed font-light mb-4 pl-1">
                "{wish.message}"
              </p>

              {/* Like / Heart Action */}
              <div className="flex items-center justify-end border-t border-black/5 pt-3">
                <button
                  onClick={() => onToggleLike(wish.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#1A1A1A]/70 hover:text-rose-500 transition-colors cursor-pointer group"
                >
                  <Heart className={`w-3.5 h-3.5 ${wish.likes > 0 ? 'fill-rose-500 text-rose-500' : 'group-hover:text-rose-500'}`} />
                  <span className="font-mono text-[11px]">{wish.likes} Menyukai</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredWishes.length === 0 && (
          <div className="text-center py-12 text-xs text-[#1A1A1A]/60 italic font-light">
            Belum ada ucapan yang sesuai dengan pencarian Anda.
          </div>
        )}
      </div>
    </section>
  );
};
