import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PartyPopper } from 'lucide-react';
import Reveal from '../components/Reveal';
import { rsvpSchema } from '../../../schemas/invitation';
import { useSubmitRsvp } from '../../../hooks/usePublicInvitation';

const attendanceOptions = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'ragu', label: 'Masih Ragu' },
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
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-cursive text-4xl text-taupe-600">Konfirmasi Kehadiran</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4 rounded-3xl border border-taupe-200 bg-taupe-50 p-6 text-left sm:p-8">
            <div>
              <label className="mb-1 block text-sm text-taupe-600">Nama</label>
              <input {...register('guest_name')} className={inputClass} />
              {errors.guest_name && <p className="mt-1 text-xs text-maroon-600">{errors.guest_name.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-taupe-600">Konfirmasi Kehadiran</label>
              <div className="grid grid-cols-3 gap-2">
                {attendanceOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-full border px-2 py-2 text-center text-sm transition ${
                      attendance === opt.value
                        ? 'border-taupe-500 bg-taupe-500 text-ivory'
                        : 'border-taupe-200 text-taupe-500 hover:bg-taupe-100'
                    }`}
                  >
                    <input type="radio" value={opt.value} {...register('attendance')} className="hidden" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {attendance === 'hadir' && (
              <div>
                <label className="mb-1 block text-sm text-taupe-600">Jumlah Tamu</label>
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
              <label className="mb-1 block text-sm text-taupe-600">Ucapan &amp; Doa</label>
              <textarea rows={3} {...register('message')} className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-taupe-600 py-2.5 text-sm text-ivory transition hover:bg-taupe-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>

            {submitted && (
              <p className="flex items-center justify-center gap-1.5 text-sm text-taupe-600">
                <PartyPopper className="h-4 w-4" /> Terima kasih atas konfirmasi Anda!
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  'w-full rounded-xl border border-taupe-200 bg-white px-4 py-2 text-sm text-ink focus:border-taupe-500 focus:outline-none';
