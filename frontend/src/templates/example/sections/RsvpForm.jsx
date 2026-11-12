import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Users, Check, X, HelpCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import { rsvpSchema } from '../../../schemas/invitation';
import { useSubmitRsvp } from '../../../hooks/usePublicInvitation';

const attendanceOptions = [
  { value: 'hadir', label: 'Hadir', icon: Check },
  { value: 'tidak_hadir', label: 'Absen', icon: X },
  { value: 'ragu', label: 'Ragu', icon: HelpCircle },
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
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="rsvp-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 text-[#f2f2f2] md:px-12 lg:px-24"
    >
      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Reservation &amp; Wishes
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Konfirmasi Kehadiran &amp; Doa
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a059]/30" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative rounded-none border border-[#c5a059]/15 bg-[#141414] p-6 shadow-2xl md:p-8"
          >
            <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-[#c5a059]/20" />
            <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-[#c5a059]/20" />
            <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[#c5a059]/20" />
            <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[#c5a059]/20" />

            <div className="mb-6 flex items-center gap-2.5">
              <Users className="h-5 w-5 text-[#c5a059]" />
              <h3 className="font-serif text-lg font-light tracking-wide text-white">Isi Buku Tamu</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                  Nama Lengkap
                </label>
                <input {...register('guest_name')} className={inputClass} placeholder="Contoh: Budi Susanto" />
                {errors.guest_name && <p className="mt-1 text-xs text-rose-400">{errors.guest_name.message}</p>}
              </div>

              <div>
                <label className="mb-2.5 block font-sans text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                  Pernyataan Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {attendanceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = attendance === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-none border p-3 text-xs font-medium transition-all duration-300 ${
                          active
                            ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]'
                            : 'border-stone-800 bg-[#0d0d0d] text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <input type="radio" value={opt.value} {...register('attendance')} className="hidden" />
                        <Icon className={`mb-1.5 h-4 w-4 ${active ? 'text-[#c5a059]' : 'text-stone-500'}`} />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {attendance === 'hadir' && (
                <div>
                  <label className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                    Jumlah Tamu
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    {...register('guest_count', { valueAsNumber: true })}
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Tuliskan ucapan selamat dan doa tulus Anda di sini..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-none border border-[#c5a059] bg-[#c5a059] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-[#c5a059] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </button>

              {submitted && (
                <div className="mt-4 rounded-none border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs font-light text-emerald-400">
                  ✓ Konfirmasi Anda berhasil dikirim! Terima kasih.
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-none border border-stone-800 bg-[#0d0d0d] px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-[#c5a059]/50 focus:outline-none transition-all font-light';
