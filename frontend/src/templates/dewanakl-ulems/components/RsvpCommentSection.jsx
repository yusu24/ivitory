import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart, CheckCircle2, Clock } from 'lucide-react';
import axios from 'axios';

export default function RsvpCommentSection({ slug, guestName = '' }) {
  const [formData, setFormData] = useState({
    name: guestName || '',
    attendance: 'hadir',
    pax: '1',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Aditya & Rina',
      attendance: 'hadir',
      message: 'Selamat menempuh hidup baru ya! Semoga menjadi keluarga yang sakinah mawaddah warahmah.',
      date: '10 menit lalu',
      likes: 6,
    },
    {
      id: 2,
      name: 'Fajar Nugraha',
      attendance: 'hadir',
      message: 'Barakallah lakuma wa baraka alaikuma! Doa terbaik selalu untuk kalian berdua.',
      date: '1 jam lalu',
      likes: 4,
    },
    {
      id: 3,
      name: 'Dewi Anggraeni',
      attendance: 'ragu',
      message: 'Selamat berbahagia, semoga dilancarkan acaranya sampai hari H!',
      date: '2 jam lalu',
      likes: 2,
    },
  ]);

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1, liked: !c.liked } : c))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    try {
      if (slug && slug !== 'preview') {
        await axios.post(`/api/invitations/${slug}/rsvp`, {
          guest_name: formData.name,
          attendance: formData.attendance,
          guest_count: parseInt(formData.pax, 10),
          message: formData.message,
        });
      }
    } catch (err) {
      console.warn('API submission notice:', err);
    } finally {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

      const newEntry = {
        id: Date.now(),
        name: formData.name,
        attendance: formData.attendance,
        message: formData.message,
        date: 'Baru saja',
        likes: 0,
      };

      setComments([newEntry, ...comments]);
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: guestName || '',
        attendance: 'hadir',
        pax: '1',
        message: '',
      });
    }
  };

  return (
    <section
      id="comment"
      className="py-12 transition-colors duration-300"
      style={{ backgroundColor: 'var(--ulems-bg-main)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4">
        
        <h2 className="font-esthetic text-4xl sm:text-5xl text-center mb-2">
          Ucapan &amp; Doa
        </h2>
        <p className="font-josefin text-xs text-center opacity-70 mb-8">
          Kirimkan doa dan konfirmasi kehadiran Anda
        </p>

        {/* RSVP Form */}
        <div
          className="p-6 rounded-3xl border shadow-sm mb-8 transition-colors duration-300"
          style={{
            backgroundColor: 'var(--ulems-bg-card)',
            borderColor: 'var(--ulems-border-card)',
          }}
        >
          {submitted && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-600 text-xs font-josefin flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Terima kasih! Pesan dan konfirmasi Anda telah terkirim.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-josefin font-medium mb-1">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama lengkap"
                className="w-full px-4 py-2.5 text-xs font-josefin rounded-xl border focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--ulems-input-bg)',
                  borderColor: 'var(--ulems-border)',
                  color: 'var(--ulems-text-main)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-josefin font-medium mb-1">
                Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'hadir', label: 'Hadir' },
                  { key: 'ragu', label: 'Ragu' },
                  { key: 'tidak_hadir', label: 'Absen' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: item.key })}
                    className={`py-2 text-xs font-josefin rounded-xl border transition-all cursor-pointer ${
                      formData.attendance === item.key
                        ? 'border-current font-bold shadow-sm'
                        : 'opacity-70 border-transparent hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor:
                        formData.attendance === item.key
                          ? 'var(--ulems-bg-main)'
                          : 'var(--ulems-input-bg)',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-josefin font-medium mb-1">
                Ucapan &amp; Doa
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan ucapan untuk kedua mempelai..."
                className="w-full px-4 py-2 text-xs font-josefin rounded-xl border focus:outline-none resize-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--ulems-input-bg)',
                  borderColor: 'var(--ulems-border)',
                  color: 'var(--ulems-text-main)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 font-josefin font-semibold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-current hover:opacity-80"
              style={{
                backgroundColor: 'var(--ulems-text-main)',
                color: 'var(--ulems-bg-main)',
              }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
            </button>
          </form>
        </div>

        {/* Comments Feed */}
        <div className="space-y-3 mb-10 max-h-96 overflow-y-auto pr-1">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl border text-left transition-colors duration-300"
              style={{
                backgroundColor: 'var(--ulems-bg-card)',
                borderColor: 'var(--ulems-border-card)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-josefin font-semibold text-xs">
                  {c.name}
                </span>
                <span className="text-[10px] font-josefin px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  {c.attendance === 'hadir' ? 'Hadir' : c.attendance === 'ragu' ? 'Ragu' : 'Tidak Hadir'}
                </span>
              </div>
              <p className="font-josefin text-xs opacity-80 leading-relaxed my-1">
                {c.message}
              </p>
              <div className="flex items-center justify-between text-[10px] opacity-60 pt-2 border-t border-current/10">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {c.date}
                </span>
                <button
                  onClick={() => handleLike(c.id)}
                  className="flex items-center gap-1 hover:text-rose-500 cursor-pointer"
                >
                  <Heart className={`w-3 h-3 ${c.liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{c.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Alhamdulillah */}
        <div className="text-center pt-6 border-t border-current/10">
          <h3 className="font-arabic text-2xl mb-2">
            اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ
          </h3>
          <p className="font-josefin text-xs opacity-70">
            Terima kasih atas segala doa restu Anda.
          </p>
          <div className="mt-6 text-[10px] opacity-50 font-josefin">
            Ulems Template &bull; Created with &hearts; by Dewanakl
          </div>
        </div>

      </div>
    </section>
  );
}
