import { HeartHandshake, MessageSquare, Check, X, HelpCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import { usePublicRsvpWall } from '../../../hooks/usePublicInvitation';

const statusBadge = {
  hadir: { label: 'Hadir', icon: Check, className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  tidak_hadir: { label: 'Absen', icon: X, className: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  ragu: { label: 'Ragu', icon: HelpCircle, className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
};

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function GuestbookWall({ slug }) {
  const { data, isLoading } = usePublicRsvpWall(slug);
  const entries = data?.data ?? [];

  if (!isLoading && entries.length === 0) return null;

  return (
    <section className="relative border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 pb-24 text-[#f2f2f2] md:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-8 flex items-center justify-center gap-3">
          <HeartHandshake className="h-5 w-5 text-[#c5a059]" />
          <h3 className="font-serif text-xl font-light tracking-wide text-white">
            Buku Tamu &amp; Doa Restu ({entries.length})
          </h3>
        </Reveal>

        <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
          {entries.map((entry, index) => {
            const badge = statusBadge[entry.attendance] ?? statusBadge.hadir;
            const BadgeIcon = badge.icon;
            const initials = entry.guest_name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <Reveal key={entry.id} delay={Math.min(index * 0.05, 0.3)}>
                <div className="flex items-start gap-4 rounded-none border border-[#c5a059]/10 bg-[#141414] p-5 shadow-lg transition-colors hover:border-[#c5a059]/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-[#c5a059]/30 bg-[#c5a059]/10 font-serif text-xs font-semibold text-[#c5a059]">
                    {initials}
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-serif text-sm font-semibold text-white">{entry.guest_name}</h4>
                        <span className={`inline-flex items-center gap-0.5 rounded-none border px-2 py-0.5 text-[9px] font-medium ${badge.className}`}>
                          <BadgeIcon className="h-2 w-2" />
                          {badge.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-stone-500">{formatTime(entry.created_at)}</span>
                    </div>
                    {entry.message && (
                      <p className="text-justify text-xs font-light leading-relaxed text-stone-300 md:text-sm">
                        {entry.message}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
          {entries.length === 0 && (
            <div className="py-12 text-center text-stone-500">
              <MessageSquare className="mx-auto mb-3 h-10 w-10 text-[#c5a059] opacity-30" />
              <p className="text-sm">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
