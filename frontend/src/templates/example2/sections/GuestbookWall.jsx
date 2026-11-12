import { usePublicRsvpWall } from '../../../hooks/usePublicInvitation';

const statusStyle = {
  hadir: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  tidak_hadir: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  ragu: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const statusLabel = {
  hadir: 'Hadir',
  tidak_hadir: 'Absen',
  ragu: 'Ragu',
};

export default function GuestbookWall({ slug }) {
  const { data } = usePublicRsvpWall(slug);
  const entries = data?.data ?? [];

  return (
    <div className="space-y-4 md:col-span-7">
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-100">
          <span>Papan Doa Tamu</span>
          <span className="rounded-full bg-stone-800 px-2 py-0.5 font-mono text-xs font-bold text-amber-400">
            {entries.length}
          </span>
        </h3>
      </div>

      <div className="max-h-[460px] space-y-4 overflow-y-auto pr-2">
        {entries.length === 0 && (
          <p className="py-8 text-center text-sm text-stone-500">Jadilah yang pertama memberikan doa restu!</p>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="relative rounded-2xl border border-stone-800/40 bg-stone-900/35 p-5 transition-all hover:border-amber-500/20"
          >
            <span
              className={`absolute right-4 top-4 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                statusStyle[entry.attendance] ?? statusStyle.hadir
              }`}
            >
              {entry.attendance === 'hadir' && entry.guest_count
                ? `Hadir (${entry.guest_count} Pax)`
                : statusLabel[entry.attendance]}
            </span>

            <h4 className="pr-20 font-semibold tracking-wide text-stone-200">{entry.guest_name}</h4>
            <p className="mt-1 font-mono text-xs text-stone-500">
              {new Date(entry.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            {entry.message && (
              <p className="mt-3 whitespace-pre-wrap text-sm font-light italic leading-relaxed text-stone-300">
                &ldquo;{entry.message}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
