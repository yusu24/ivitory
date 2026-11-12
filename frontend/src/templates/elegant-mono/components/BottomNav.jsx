import { Home, Users, Image as ImageIcon, MapPin, Gift, Volume2, VolumeX } from 'lucide-react';

const LINKS = [
  { href: '#section-home', icon: Home, label: 'Beranda' },
  { href: '#section-couple', icon: Users, label: 'Mempelai' },
  { href: '#section-gallery', icon: ImageIcon, label: 'Galeri' },
  { href: '#section-events', icon: MapPin, label: 'Acara' },
  { href: '#section-gift', icon: Gift, label: 'Hadiah' },
];

export default function BottomNav({ isPlaying, onToggleMusic, hasMusic, visible }) {
  if (!visible) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
      <div className="flex items-center gap-1 rounded-full bg-stone-900/90 px-2 py-2 text-ivory shadow-xl backdrop-blur">
        {LINKS.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ivory/80 transition hover:bg-white/10 hover:text-gold-400"
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </a>
        ))}
        {hasMusic && (
          <button
            onClick={onToggleMusic}
            aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-stone-900 transition hover:bg-gold-400"
          >
            {isPlaying ? <Volume2 className="h-4 w-4" strokeWidth={1.5} /> : <VolumeX className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        )}
      </div>
    </nav>
  );
}
