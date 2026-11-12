import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, HelpCircle, MessageSquare, Send, Users, X } from 'lucide-react';
import { CornerOrnament } from '../components/ClassicOrnaments';
import { rsvpSchema } from '../../../schemas/invitation';
import { useSubmitRsvp, usePublicRsvpWall } from '../../../hooks/usePublicInvitation';

const attendanceOptions = [
  { value: 'hadir', label: 'Hadir', icon: Check },
  { value: 'tidak_hadir', label: 'Absen', icon: X },
  { value: 'ragu', label: 'Ragu', icon: HelpCircle },
];

const statusBadge = {
  hadir: { label: 'Hadir', icon: Check, cls: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  tidak_hadir: { label: 'Absen', icon: X, cls: 'bg-rose-50 text-rose-500 border-rose-200' },
  ragu: { label: 'Ragu', icon: HelpCircle, cls: 'bg-amber-50 text-amber-600 border-amber-200' },
};

const inputClass =
  'w-full rounded-xl border border-[#D4AF37]/25 bg-[#FDFBF7] px-4 py-3 text-sm text-[#4A453E] placeholder-[#A69D8F] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all';

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function RsvpGuestbook({ slug, guestName }) {
  const submitRsvp = useSubmitRsvp(slug);
  const { data: wallData, isLoading } = usePublicRsvpWall(slug);
  const entries = wallData?.data ?? [];
  const [submitted, setSubmitted] = useState(false);

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guest_name: guestName ?? '', attendance: 'hadir', guest_count: 1, message: '' },
  });

  useEffect(() => {
    if (guestName) setValue('guest_name', guestName);
  }, [guestName, setValue]);

  const attendance = watch('attendance');

  const onSubmit = async (values) => {
    await submitRsvp.mutateAsync(values);
    setSubmitted(true);
    reset({ guest_name: values.guest_name, attendance: 'hadir', guest_count: 1, message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative py-20 px-4 bg-white/30 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-2">
            Reservation & Wishes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A453E] font-light">
            Konfirmasi Kehadiran & Doa
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-white/95 backdrop-blur-md border border-[#D4AF37]/25 rounded-3xl p-8 shadow-xl relative"
          >
            <div className="absolute top-3 left-3 opacity-30">
              <CornerOrnament className="w-8 h-8" />
            </div>

            <div className="flex items-center justify-center gap-2.5 mb-6">
              <Users className="h-5 w-5 text-[#D4AF37]" />
              <h3 className="font-serif text-lg font-normal text-[#4A453E]">Isi Buku Tamu</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8C8479]">
                  Nama Lengkap
                </label>
                <input {...register('guest_name')} className={inputClass} placeholder="Nama lengkap Anda" />
                {errors.guest_name && <p className="mt-1 text-xs text-rose-500">{errors.guest_name.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8C8479]">
                  Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {attendanceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = attendance === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-3 text-xs font-medium transition-all ${
                          active ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#8C8479]' : 'border-[#D4AF37]/20 bg-[#FDFBF7] text-[#8C8479] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <input type="radio" value={opt.value} {...register('attendance')} className="hidden" />
                        <Icon className={`mb-1.5 h-4 w-4 ${active ? 'text-[#D4AF37]' : 'text-[#A69D8F]'}`} />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {attendance === 'hadir' && (
                <div>
                  <label className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8C8479]">
                    Jumlah Tamu
                  </label>
                  <input
                    type="number" min={1} max={10}
                    {...register('guest_count', { valueAsNumber: true })}
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block font-sans text-[10px] font-semibold uppercase tracking-wider text-[#8C8479]">
                  Ucapan & Doa Restu
                </label>
                <textarea
                  rows={3}
                  {...register('message')}
                  placeholder="Tuliskan ucapan selamat dan doa tulus Anda..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 bg-[#4A453E] hover:bg-[#5E574E] text-white py-3.5 rounded-xl font-semibold shadow-md transition-colors text-xs tracking-[0.15em] uppercase disabled:opacity-60"
              >
                <Send size={13} />
                {isSubmitting ? 'Mengirim...' : 'KIRIM KONFIRMASI'}
              </button>

              {submitted && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-xs font-bold text-emerald-600">
                  ✓ Konfirmasi berhasil dikirim! Terima kasih.
                </div>
              )}
            </form>
          </motion.div>

          {/* Guestbook Wall */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5 mb-4">
              <MessageSquare className="text-[#8C8479] w-6 h-6" />
              <h3 className="font-serif text-2xl font-normal text-[#4A453E]">Doa Hangat & Ucapan Tamu</h3>
              {entries.length > 0 && (
                <span className="bg-[#4A453E] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold ml-1">
                  {entries.length}
                </span>
              )}
            </div>

            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1">
              {isLoading && (
                <p className="text-sm text-[#8C8479] text-center py-6">Memuat ucapan...</p>
              )}
              {!isLoading && entries.length === 0 && (
                <div className="py-12 text-center text-[#A69D8F] rounded-2xl border border-dashed border-[#D4AF37]/20 bg-white/20">
                  <MessageSquare className="mx-auto mb-3 h-10 w-10 text-[#D4AF37] opacity-40" />
                  <p className="text-sm italic">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
                </div>
              )}
              {entries.map((entry) => {
                const badge = statusBadge[entry.attendance] ?? statusBadge.hadir;
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-[#D4AF37]/20 bg-white p-5 text-left shadow-sm"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#4A453E]">{entry.guest_name}</span>
                        <span className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${badge.cls}`}>
                          <BadgeIcon className="h-2 w-2" />
                          {badge.label}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#A69D8F]">{formatTime(entry.created_at)}</span>
                    </div>
                    {entry.message && (
                      <p className="text-xs italic leading-relaxed text-[#6B655D] sm:text-sm">"{entry.message}"</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
