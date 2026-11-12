import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Heart, CheckCircle2, UserCheck, MessageSquare, Clock, Users, Sparkles, SmilePlus } from 'lucide-react';
import { BotanicalCorner, DiamondDivider } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';
import { getInvitationTexts } from '../utils/templateConfig';
import api from '../../../lib/axios';

export default function RsvpAndGuestbook({ invitation, slug, guestName: initialGuestName = '' }) {
  const texts = getInvitationTexts(invitation);
  const [formData, setFormData] = useState({
    name: initialGuestName || '',
    attendance: 'hadir',
    pax: '2',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const defaultWishes = [
    {
      id: 'sample-1',
      name: 'Dimas Kurniawan & Keluarga',
      attendance: 'hadir',
      pax: 2,
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khoir. Selamat menempuh hidup baru Yusuf & Nabilla! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.',
      date: '10 menit yang lalu',
      likes: 6,
      reactions: { heart: 4, pray: 7 },
    },
    {
      id: 'sample-2',
      name: 'Siti Rahmawati S.T.',
      attendance: 'hadir',
      pax: 1,
      message: 'Masya Allah terharu banget liat perjalanan kalian berdua dari awal kuliah dulu sampai akhirnya sah melangkah ke pelaminan. Turut berbahagia sedalam-dalamnya!',
      date: '45 menit yang lalu',
      likes: 12,
      reactions: { heart: 8, pray: 11 },
    },
    {
      id: 'sample-3',
      name: 'Rizki Pratama & Partner',
      attendance: 'hadir',
      pax: 2,
      message: 'Selamat bro Yusuf & Nabilla! Doa terbaik untuk kalian berdua. Pasti hadir memeriahkan momen bahagia kalian. Sehat & sukses selalu!',
      date: '2 jam yang lalu',
      likes: 5,
      reactions: { heart: 3, pray: 5 },
    },
    {
      id: 'sample-4',
      name: 'Keluarga Besar Sidoarjo',
      attendance: 'hadir',
      pax: 4,
      message: 'Alhamdulillah selamat menempuh bahtera rumah tangga. Semoga senantiasa dilimpahi rezeki yang berkah dan keturunan yang sholeh/sholehah.',
      date: 'Kemarin',
      likes: 19,
      reactions: { heart: 14, pray: 20 },
    },
  ];

  // Wishes feed state
  const [wishes, setWishes] = useState(defaultWishes);

  // Fetch live RSVP entries from backend when viewing a real invitation
  useEffect(() => {
    if (!slug || slug === 'preview') return;
    let mounted = true;
    api
      .get(`/api/invitations/${slug}/rsvp`)
      .then((res) => {
        if (!mounted) return;
        const dbItems = (res.data?.data || []).map((entry) => ({
          id: entry.id,
          name: entry.guest_name,
          attendance: entry.attendance,
          pax: entry.guest_count || 1,
          message: entry.message || 'Selamat menempuh hidup baru, semoga bahagia selalu!',
          date: entry.created_at
            ? new Date(entry.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : 'Baru saja',
          likes: 1,
          reactions: { heart: 1, pray: 2 },
        }));
        if (dbItems.length > 0) {
          setWishes([...dbItems, ...defaultWishes]);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleAttendanceSelect = (val) => {
    sounds.playPaperClick();
    setFormData((prev) => ({ ...prev, attendance: val }));
  };

  const handleLike = (id) => {
    sounds.playSparkle();
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isLiked = !w.liked;
          return {
            ...w,
            likes: isLiked ? w.likes + 1 : w.likes - 1,
            liked: isLiked,
          };
        }
        return w;
      })
    );
  };

  const handlePrayReaction = (id) => {
    sounds.playChime();
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const prayed = !w.prayed;
          return {
            ...w,
            prayed,
            reactions: {
              ...w.reactions,
              pray: (w.reactions?.pray || 0) + (prayed ? 1 : -1),
            },
          };
        }
        return w;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    sounds.playPaperClick();
    setIsSubmitting(true);

    try {
      if (slug && slug !== 'preview') {
        await api.post(`/api/invitations/${slug}/rsvp`, {
          guest_name: formData.name,
          attendance: formData.attendance,
          guest_count: parseInt(formData.pax, 10),
          message: formData.message,
        });
      }
    } catch (err) {
      console.warn('API submission notice:', err);
    } finally {
      sounds.playChime();

      // Trigger luxury double confetti burst
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#09090b', '#71717a', '#d4d4d8', '#ffffff', '#eab308'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#09090b', '#d4d4d8', '#ffffff'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#09090b', '#d4d4d8', '#ffffff'],
          });
        }, 200);
      } catch {
        // ignore
      }

      const newWish = {
        id: Date.now(),
        name: formData.name,
        attendance: formData.attendance,
        pax: parseInt(formData.pax, 10),
        message: formData.message,
        date: 'Baru saja',
        likes: 1,
        liked: true,
        reactions: { heart: 1, pray: 1 },
      };

      setWishes([newWish, ...wishes]);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: initialGuestName || '',
        attendance: 'hadir',
        pax: '2',
        message: '',
      });
    }
  };

  // Summary stats
  const hadirCount = wishes.filter((w) => w.attendance === 'hadir').length;

  return (
    <section id="rsvp" className="py-24 sm:py-32 px-4 bg-white text-zinc-900 border-b border-zinc-200 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block mb-2">
            {texts.rsvp_badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 font-normal">
            {texts.rsvp_title}
          </h2>
          <p className="font-script-calligraphy text-2xl sm:text-3xl text-zinc-600 mt-1 mb-3">
            {texts.rsvp_subtitle}
          </p>
          <DiamondDivider className="max-w-xs mx-auto" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-md mx-auto mt-3 leading-relaxed">
            {texts.rsvp_intro_text}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* ================= FORM RSVP (5 Cols) ================= */}
          <div className="lg:col-span-5 relative border border-zinc-900 bg-white p-6 sm:p-8 rounded-sm shadow-md">
            <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />
            <BotanicalCorner position="top-left" className="w-10 h-10 absolute top-1.5 left-1.5 opacity-60" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-medium text-zinc-900">
                    Kartu Konfirmasi
                  </h3>
                  <span className="text-[10px] font-clean-sans uppercase tracking-[0.2em] text-zinc-400">
                    Wedding of Yusuf &amp; Nabilla
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-900 text-xs font-editorial-serif">
                  RSVP
                </div>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-3.5 bg-zinc-900 text-white text-xs font-clean-sans flex items-start gap-2.5 rounded-sm shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Terima kasih banyak!</p>
                    <p className="text-zinc-300 text-[11px] mt-0.5">Konfirmasi kehadiran dan untaian doa Anda telah berhasil tercatat.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4.5">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-clean-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-medium">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Muhammad Yusuf Effendi"
                    className="w-full px-3.5 py-2.5 text-xs font-clean-sans bg-zinc-50 border border-zinc-300 rounded-sm focus:border-zinc-900 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Attendance Buttons */}
                <div>
                  <label className="block text-[11px] font-clean-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-medium">
                    Konfirmasi Kehadiran <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'hadir', label: 'Hadir', sub: 'Pasti Datang' },
                      { key: 'ragu', label: 'Ragu-ragu', sub: 'Masih Diusahakan' },
                      { key: 'tidak_hadir', label: 'Berhalangan', sub: 'Kirim Doa' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleAttendanceSelect(opt.key)}
                        className={`py-2 px-1 text-center rounded-sm border cursor-pointer transition-all ${
                          formData.attendance === opt.key
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                            : 'bg-zinc-50 text-zinc-600 border-zinc-300 hover:border-zinc-600'
                        }`}
                      >
                        <span className="block text-[11px] font-clean-sans uppercase tracking-wider font-semibold">
                          {opt.label}
                        </span>
                        <span className={`block text-[9px] font-clean-sans ${formData.attendance === opt.key ? 'text-zinc-300' : 'text-zinc-400'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-[11px] font-clean-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-medium">
                    Jumlah Tamu Hadir
                  </label>
                  <div className="relative">
                    <select
                      value={formData.pax}
                      onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-clean-sans bg-zinc-50 border border-zinc-300 rounded-sm focus:border-zinc-900 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">1 Orang (Sendiri)</option>
                      <option value="2">2 Orang (Bersama Pasangan)</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang (Keluarga)</option>
                      <option value="5">5+ Orang (Rombongan Keluarga)</option>
                    </select>
                    <Users className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-clean-sans uppercase tracking-wider text-zinc-700 mb-1.5 font-medium">
                    Untaian Doa &amp; Pesan Hangat <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan ucapan selamat dan doa terbaik untuk kedua mempelai..."
                    className="w-full px-3.5 py-2.5 text-xs font-clean-sans bg-zinc-50 border border-zinc-300 rounded-sm focus:border-zinc-900 focus:bg-white focus:outline-none resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-clean-sans uppercase tracking-[0.25em] font-medium rounded-sm border border-zinc-900 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Mengirim Doa...' : 'Kirim RSVP & Doa Restu'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* ================= GUESTBOOK WISHES FEED (7 Cols) ================= */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-900 bg-white p-6 sm:p-8 rounded-sm shadow-md relative">
              <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />

              {/* Header Feed */}
              <div className="relative z-10 flex flex-wrap items-center justify-between pb-4 border-b border-zinc-200 mb-6 gap-3">
                <div>
                  <h3 className="font-editorial-serif text-2xl font-medium text-zinc-900">
                    Buku Tamu &amp; Untaian Doa
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-clean-sans text-zinc-500">
                      {wishes.length} Pesan Masuk
                    </span>
                    <span className="text-zinc-300">&bull;</span>
                    <span className="text-[11px] font-clean-sans text-zinc-700 font-medium">
                      {hadirCount} Tamu Mengonfirmasi Hadir
                    </span>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-300 px-3 py-1.5 rounded-full text-xs font-clean-sans text-zinc-800">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Live Guestbook</span>
                </div>
              </div>

              {/* Wishes List (Max height with smooth scroll) */}
              <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1.5 relative z-10 custom-scrollbar">
                {wishes.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-zinc-200 bg-zinc-50/80 p-4 sm:p-5 rounded-sm relative hover:border-zinc-400 hover:bg-white transition-all shadow-xs"
                  >
                    {/* Top Row: Name and badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        {/* Initial Badge */}
                        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center font-clean-sans shrink-0 shadow-xs">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-clean-sans font-semibold text-zinc-950">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-clean-sans">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.date}
                            </span>
                            {item.pax && (
                              <span>&bull; {item.pax} Orang</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Attendance Tag */}
                      <span
                        className={`text-[9px] uppercase tracking-wider font-clean-sans px-2.5 py-0.5 rounded-sm border shrink-0 ${
                          item.attendance === 'hadir'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : item.attendance === 'ragu'
                            ? 'bg-zinc-200 text-zinc-800 border-zinc-300'
                            : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                        }`}
                      >
                        {item.attendance === 'hadir'
                          ? '✓ Hadir'
                          : item.attendance === 'ragu'
                          ? '? Ragu'
                          : 'Berhalangan'}
                      </span>
                    </div>

                    {/* Message Body */}
                    <p className="mt-3 text-xs sm:text-sm font-clean-sans text-zinc-800 leading-relaxed font-normal">
                      {item.message}
                    </p>

                    {/* Bottom Reaction Action Buttons */}
                    <div className="mt-3.5 pt-2.5 border-t border-zinc-200/80 flex items-center justify-between text-zinc-600">
                      <span className="text-[10px] font-clean-sans text-zinc-400">
                        Doa Restu
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Aamiin reaction */}
                        <button
                          onClick={() => handlePrayReaction(item.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border text-[11px] font-clean-sans transition-all cursor-pointer ${
                            item.prayed
                              ? 'bg-zinc-900 text-white border-zinc-900'
                              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                          }`}
                        >
                          <span>🤲 Aamiin</span>
                          <span className="text-[10px] font-semibold">{item.reactions?.pray || 0}</span>
                        </button>

                        {/* Like heart */}
                        <button
                          onClick={() => handleLike(item.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border text-[11px] font-clean-sans transition-all cursor-pointer ${
                            item.liked
                              ? 'bg-rose-50 text-rose-600 border-rose-300'
                              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900'
                          }`}
                        >
                          <Heart
                            className={`w-3 h-3 ${
                              item.liked ? 'fill-rose-500 text-rose-500' : 'text-zinc-600'
                            }`}
                          />
                          <span className="text-[10px] font-semibold">{item.likes}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
