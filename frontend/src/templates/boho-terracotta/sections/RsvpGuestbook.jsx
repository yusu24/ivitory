import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, HelpCircle, MessageSquare, Send, Users, X } from 'lucide-react';
import { BohoFlower } from '../components/BohoOrnaments';
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
  'w-full rounded-xl border border-[var(--color-boho-terracotta)]/30 bg-white/50 px-4 py-3 text-sm text-[var(--color-boho-text)] placeholder-[var(--color-boho-sage)]/70 focus:border-[var(--color-boho-terracotta)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-boho-terracotta)] transition-all';

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
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
            Reservation & Wishes
          </p>
          <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-4">
            RSVP & Guestbook
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)]/30 rounded-3xl p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-[-20px] left-[-20px] text-[var(--color-boho-sage)] opacity-20">
               <BohoFlower className="w-24 h-24" />
            </div>

            <div className="flex items-center justify-center gap-2.5 mb-6 relative z-10">
              <Users className="h-5 w-5 text-[var(--color-boho-terracotta)]" />
              <h3 className="font-boho-serif text-xl text-[var(--color-boho-text)]">Konfirmasi Kehadiran</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div>
                <label className="mb-1 block font-boho-sans text-[10px] font-semibold uppercase tracking-wider text-[var(--color-boho-text)] opacity-80">
                  Nama Lengkap
                </label>
                <input {...register('guest_name')} className={inputClass} placeholder="Nama lengkap Anda" />
                {errors.guest_name && <p className="mt-1 text-xs text-rose-500">{errors.guest_name.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block font-boho-sans text-[10px] font-semibold uppercase tracking-wider text-[var(--color-boho-text)] opacity-80">
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
                          active ? 'border-[var(--color-boho-terracotta)] bg-[var(--color-boho-terracotta)]/10 text-[var(--color-boho-terracotta)]' : 'border-[var(--color-boho-terracotta)]/20 bg-white/50 text-[var(--color-boho-sage)] hover:border-[var(--color-boho-terracotta)]/50'
                        }`}
                      >
                        <input type="radio" value={opt.value} {...register('attendance')} className="hidden" />
                        <Icon className={`mb-1.5 h-4 w-4 ${active ? 'text-[var(--color-boho-terracotta)]' : 'opacity-70'}`} />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {attendance === 'hadir' && (
                <div>
                  <label className="mb-1 block font-boho-sans text-[10px] font-semibold uppercase tracking-wider text-[var(--color-boho-text)] opacity-80">
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
                <label className="mb-1 block font-boho-sans text-[10px] font-semibold uppercase tracking-wider text-[var(--color-boho-text)] opacity-80">
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
                className="flex w-full items-center justify-center gap-2 bg-[var(--color-boho-terracotta)] hover:bg-[var(--color-boho-terracotta-dark)] text-white py-3.5 rounded-xl font-semibold shadow-sm transition-colors text-[10px] tracking-widest uppercase font-boho-sans disabled:opacity-60"
              >
                <Send size={13} />
                {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
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
            <div className="flex items-center gap-2.5 mb-4 border-b border-[var(--color-boho-terracotta)]/20 pb-4">
              <MessageSquare className="text-[var(--color-boho-terracotta)] w-6 h-6 opacity-80" />
              <h3 className="font-boho-serif text-2xl text-[var(--color-boho-text)]">Doa Hangat & Ucapan Tamu</h3>
              {entries.length > 0 && (
                <span className="bg-[var(--color-boho-terracotta)]/20 text-[var(--color-boho-terracotta-dark)] text-[10px] px-2.5 py-0.5 rounded-full font-bold ml-1">
                  {entries.length}
                </span>
              )}
            </div>

            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading && (
                <p className="text-sm text-[var(--color-boho-sage)] text-center py-6 font-boho-sans">Memuat ucapan...</p>
              )}
              {!isLoading && entries.length === 0 && (
                <div className="py-12 text-center text-[var(--color-boho-sage)] rounded-2xl border border-dashed border-[var(--color-boho-terracotta)]/30 bg-[var(--color-boho-bg)]">
                  <MessageSquare className="mx-auto mb-3 h-10 w-10 text-[var(--color-boho-terracotta)] opacity-40" />
                  <p className="text-sm italic font-boho-serif">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
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
                    className="rounded-2xl border border-[var(--color-boho-terracotta)]/20 bg-white p-5 text-left shadow-sm"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[var(--color-boho-text)]">{entry.guest_name}</span>
                        <span className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${badge.cls}`}>
                          <BadgeIcon className="h-2 w-2" />
                          {badge.label}
                        </span>
                      </div>
                      <span className="text-[9px] text-[var(--color-boho-sage)] font-boho-sans">{formatTime(entry.created_at)}</span>
                    </div>
                    {entry.message && (
                      <p className="text-sm leading-relaxed text-[var(--color-boho-text)] opacity-80 font-boho-sans">"{entry.message}"</p>
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
