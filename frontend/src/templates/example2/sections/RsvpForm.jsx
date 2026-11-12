import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Check } from 'lucide-react';
import { rsvpSchema } from '../../../schemas/invitation';
import { useSubmitRsvp } from '../../../hooks/usePublicInvitation';

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
    <div className="space-y-6 rounded-3xl border border-amber-500/10 bg-stone-900/60 p-6 backdrop-blur-md md:col-span-5">
      <h3 className="font-serif text-xl font-bold text-stone-100">Konfirmasi Kehadiran</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-stone-400">Nama Tamu</label>
          <input
            {...register('guest_name')}
            placeholder="Masukkan nama Anda..."
            className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3.5 py-2.5 text-sm text-stone-100 outline-none transition-colors focus:border-amber-500"
          />
          {errors.guest_name && <p className="mt-1 text-xs text-rose-400">{errors.guest_name.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs text-stone-400">Status Kehadiran</label>
          <select
            {...register('attendance')}
            className="w-full cursor-pointer rounded-lg border border-stone-800 bg-stone-950 px-3 py-2.5 text-sm text-stone-100 outline-none transition-colors focus:border-amber-500"
          >
            <option value="hadir">✓ Hadir, Insya Allah</option>
            <option value="ragu">? Masih Ragu / Tentatif</option>
            <option value="tidak_hadir">✗ Berhalangan Hadir</option>
          </select>
        </div>

        {attendance === 'hadir' && (
          <div>
            <label className="mb-1 block text-xs text-stone-400">Jumlah Tamu</label>
            <input
              type="number"
              min={1}
              max={10}
              {...register('guest_count', { valueAsNumber: true })}
              className="w-full rounded-lg border border-stone-800 bg-stone-950 px-3.5 py-2.5 text-sm text-stone-100 outline-none transition-colors focus:border-amber-500"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs text-stone-400">Pesan Ucapan / Doa Restu</label>
          <textarea
            rows={4}
            {...register('message')}
            placeholder="Tulis ucapan selamat dan doa restu Anda..."
            className="w-full resize-none rounded-lg border border-stone-800 bg-stone-950 px-3.5 py-2.5 text-sm leading-relaxed text-stone-100 outline-none transition-colors focus:border-amber-500"
          />
        </div>

        {submitted && (
          <div className="flex animate-pulse items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
            <Check size={14} />
            <span>Doa Restu berhasil dikirimkan ke papan ucapan!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 py-3 font-medium text-stone-950 shadow-lg shadow-amber-500/10 transition-all hover:from-amber-500 hover:to-yellow-600 disabled:opacity-60"
        >
          <Send size={14} />
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Doa Restu'}</span>
        </button>
      </form>
    </div>
  );
}
