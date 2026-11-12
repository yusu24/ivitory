import { MessageCircleHeart } from 'lucide-react';
import Reveal from '../components/Reveal';
import { usePublicRsvpWall } from '../../../hooks/usePublicInvitation';

const attendanceLabel = {
  hadir: 'Hadir',
  tidak_hadir: 'Tidak Hadir',
  ragu: 'Masih Ragu',
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
    <section className="bg-taupe-50 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <MessageCircleHeart className="mx-auto h-7 w-7 text-taupe-500" strokeWidth={1.5} />
          <p className="mt-3 font-cursive text-4xl text-taupe-600">Ucapan &amp; Doa</p>
        </Reveal>

        <div className="mt-10 space-y-4 text-left">
          {entries.map((entry, index) => (
            <Reveal key={entry.id} delay={Math.min(index * 0.05, 0.3)}>
              <div className="rounded-2xl border border-taupe-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-stone-900">{entry.guest_name}</p>
                  <span className="shrink-0 text-xs text-stone-400">{timeAgo(entry.created_at)}</span>
                </div>
                <p className="mt-0.5 text-xs text-taupe-500">{attendanceLabel[entry.attendance]}</p>
                {entry.message && <p className="mt-2 text-sm text-stone-500">{entry.message}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
