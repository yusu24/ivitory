import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send, Users } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/Botanicals';
import { rsvpSchema } from '../../../schemas/invitation';
import { useSubmitRsvp } from '../../../hooks/usePublicInvitation';

const attendanceOptions = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'ragu', label: 'Ragu-ragu' },
  { value: 'tidak_hadir', label: 'Tidak Hadir' },
];

export default function RsvpForm({ slug, guestName }) {
  const submitRsvp = useSubmitRsvp(slug);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden bg-[var(--ig-ivory-deep)]">
      <div className="mx-auto max-w-xl relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Konfirmasi Kehadiran" title="RSVP Tamu" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm sm:text-base italic text-[var(--ig-muted)] leading-relaxed">
            Kehadiran dan doa restu Anda sangat berarti bagi kelancaran dan keberkahan momen istimewa kami:
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="ig-card rounded-[36px] p-8 sm:p-10 mt-10 text-left border border-[rgba(180,149,90,0.35)] shadow-xl space-y-6"
          >
            {/* Nama */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--ig-sage-700)] font-semibold mb-1.5">
                Nama Lengkap
              </label>
              <input
                {...register('guest_name')}
                placeholder="Masukkan nama Anda..."
                className="w-full bg-[var(--ig-paper)] border border-[rgba(180,149,90,0.3)] rounded-2xl px-4 py-3 text-sm text-[var(--ig-ink)] focus:outline-none focus:border-[var(--ig-gold)]"
              />
              {errors.guest_name && (
                <p className="text-xs text-rose-600 mt-1">{errors.guest_name.message}</p>
              )}
            </div>

            {/* Pilihan Kehadiran */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--ig-sage-700)] font-semibold mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {attendanceOptions.map((opt) => {
                  const isSelected = attendance === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`cursor-pointer rounded-2xl border p-3 text-center text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[var(--ig-sage-700)] bg-[var(--ig-sage-700)] text-[var(--ig-paper)] shadow-md'
                          : 'border-[rgba(180,149,90,0.3)] bg-[var(--ig-paper)] text-[var(--ig-ink)] hover:bg-[var(--ig-sage-50)]'
                      }`}
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        {...register('attendance')}
                        className="hidden"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Jumlah Tamu */}
            {attendance === 'hadir' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--ig-sage-700)] font-semibold mb-1.5">
                  Jumlah Orang yang Hadir
                </label>
                <div className="relative">
                  <Users className="h-4 w-4 text-[var(--ig-muted)] absolute left-4 top-3.5" />
                  <input
                    type="number"
                    min={1}
                    max={10}
                    {...register('guest_count', { valueAsNumber: true })}
                    className="w-full bg-[var(--ig-paper)] border border-[rgba(180,149,90,0.3)] rounded-2xl pl-11 pr-4 py-3 text-sm text-[var(--ig-ink)] focus:outline-none focus:border-[var(--ig-gold)]"
                  />
                </div>
              </div>
            )}

            {/* Ucapan */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[var(--ig-sage-700)] font-semibold mb-1.5">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                rows={3}
                {...register('message')}
                placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                className="w-full bg-[var(--ig-paper)] border border-[rgba(180,149,90,0.3)] rounded-2xl px-4 py-3 text-sm text-[var(--ig-ink)] focus:outline-none focus:border-[var(--ig-gold)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="ig-btn-primary w-full cursor-pointer disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi Kehadiran'}</span>
            </button>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Terima kasih, konfirmasi kehadiran Anda telah tersimpan!</span>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
