import { MessageCircleHeart, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/Botanicals';
import { usePublicRsvpWall } from '../../../hooks/usePublicInvitation';

const attendanceBadge = {
  hadir: { label: 'Hadir', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  tidak_hadir: { label: 'Tidak Hadir', bg: 'bg-rose-50 text-rose-800 border-rose-200' },
  ragu: { label: 'Ragu-ragu', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return 'baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

export default function GuestbookWall({ slug }) {
  const { data, isLoading } = usePublicRsvpWall(slug);
  const entries = data?.data ?? [];

  if (!isLoading && entries.length === 0) return null;

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-2xl relative z-10">
        <Reveal>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[var(--ig-sage-50)] border border-[var(--ig-gold-soft)] flex items-center justify-center text-[var(--ig-sage-700)] shadow-sm">
            <MessageCircleHeart className="h-6 w-6 text-[var(--ig-gold)]" strokeWidth={1.5} />
          </div>
          <SectionHeading eyebrow="Doa & Harapan" title="Buku Tamu & Ucapan" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm italic text-[var(--ig-muted)]">
            Untaian doa restu dari para sahabat, keluarga, dan kerabat tercinta:
          </p>
        </Reveal>

        <div className="mt-12 space-y-4 text-left max-h-[500px] overflow-y-auto pr-1 ig-no-scrollbar">
          {entries.map((entry, index) => {
            const badge = attendanceBadge[entry.attendance] || attendanceBadge.hadir;
            return (
              <Reveal key={entry.id || index} delay={Math.min(index * 0.05, 0.3)}>
                <div className="ig-card rounded-[24px] p-6 border border-[rgba(180,149,90,0.3)] shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[var(--ig-sage-100)] flex items-center justify-center text-[var(--ig-sage-800)] font-serif font-bold text-xs uppercase">
                        {(entry.guest_name || 'T')[0]}
                      </div>
                      <p className="font-semibold text-sm text-[var(--ig-ink)]">
                        {entry.guest_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <span className="text-[11px] text-[var(--ig-muted)] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(entry.created_at)}
                      </span>
                    </div>
                  </div>

                  {entry.message && (
                    <p className="ig-serif text-sm italic text-[var(--ig-ink)] mt-2 pl-1 leading-relaxed">
                      &ldquo;{entry.message}&rdquo;
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
