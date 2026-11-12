import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Users, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestWish } from '../types/wedding';

interface RsvpSectionProps {
  defaultGuestName: string;
  onAddWish: (newWish: GuestWish) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ defaultGuestName, onAddWish }) => {
  const [name, setName] = useState<string>(defaultGuestName || '');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newWish: GuestWish = {
        id: `wish-${Date.now()}`,
        senderName: name.trim(),
        attendance,
        guestCount: attendance === 'hadir' ? guestCount : 0,
        message: message.trim(),
        createdAt: 'Baru saja',
        likes: 0,
      };

      onAddWish(newWish);
      setIsSubmitting(false);
      setIsSuccess(true);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FBF5B7', '#8E7C5C', '#1A1A1A']
      });

      // Reset form message
      setMessage('');
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1200);
  };

  return (
    <section id="rsvp" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Konfirmasi Kehadiran
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          RSVP &amp; Ucapan Selamat
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
        <p className="text-xs sm:text-sm text-[#2B1B17]/80 font-light max-w-lg mx-auto mt-4">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-2xl relative overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Name Input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#2B1B17] font-semibold mb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>Nama Lengkap *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bapak Ahmad &amp; Istri"
              className="w-full px-5 py-3.5 rounded-2xl bg-white/80 border border-[#5C3A21]/20 text-sm text-[#2B1B17] placeholder-[#2B1B17]/40 focus:outline-none focus:border-[#5C3A21] focus:ring-1 focus:ring-[#5C3A21] transition-all"
            />
          </div>

          {/* Attendance Choice */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#2B1B17] font-semibold mb-2">
              Konfirmasi Kehadiran *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'hadir', label: 'Ya, Saya Hadir' },
                { id: 'tidak_hadir', label: 'Maaf, Berhalangan' },
                { id: 'ragu', label: 'Masih Ragu' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAttendance(opt.id as any)}
                  className={`py-3 px-4 rounded-2xl text-xs font-medium tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                    attendance === opt.id
                      ? 'bg-[#3D261D] text-[#FBF5B7] border-[#D4AF37] shadow-lg'
                      : 'bg-white/60 text-[#2B1B17]/80 border-[#5C3A21]/15 hover:border-[#5C3A21]/40'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count (if attending) */}
          {attendance === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-xs uppercase tracking-wider text-[#2B1B17] font-semibold mb-2 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#5C3A21]" />
                <span>Jumlah Tamu yang Hadir *</span>
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/80 border border-[#5C3A21]/20 text-sm text-[#2B1B17] focus:outline-none focus:border-[#5C3A21] transition-all"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </motion.div>
          )}

          {/* Message / Wish Textarea */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#2B1B17] font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#5C3A21]" />
              <span>Ucapan &amp; Doa Restu *</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan harapan dan doa terbaik Anda untuk kedua mempelai..."
              className="w-full px-5 py-3.5 rounded-2xl bg-white/80 border border-[#5C3A21]/20 text-sm text-[#2B1B17] placeholder-[#2B1B17]/40 focus:outline-none focus:border-[#5C3A21] focus:ring-1 focus:ring-[#5C3A21] transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-8 rounded-2xl brown-gold-gradient-bg text-white font-semibold text-xs tracking-widest uppercase shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/30 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Mengirim Konfirmasi...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#FBF5B7]" />
                <span className="text-[#FBF5B7]">Kirim RSVP &amp; Ucapan</span>
              </>
            )}
          </button>

          {/* Success Banner */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#3D261D] text-[#FBF5B7] border border-[#D4AF37] flex items-center gap-3 text-xs font-medium shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>Terima kasih! Konfirmasi dan doa Anda telah berhasil kami terima.</span>
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
};
