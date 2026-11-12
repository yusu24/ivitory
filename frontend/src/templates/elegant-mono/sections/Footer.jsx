import { Heart } from 'lucide-react';

export default function Footer({ invitation }) {
  return (
    <footer className="bg-taupe-900 px-6 py-16 pb-28 text-center text-ivory">
      <Heart className="mx-auto h-6 w-6 text-gold-400" strokeWidth={1.5} />
      <p className="mt-4 font-cursive text-4xl text-ivory">
        {invitation.groom_nickname || invitation.groom_name}
        <span className="mx-2">&amp;</span>
        {invitation.bride_nickname || invitation.bride_name}
      </p>
      <p className="mx-auto mt-6 max-w-md text-sm text-ivory/60">
        Terima kasih atas doa dan restu yang Anda berikan. Kami menantikan kehadiran Anda di hari bahagia kami.
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold-400/70">
        Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh
      </p>
    </footer>
  );
}
