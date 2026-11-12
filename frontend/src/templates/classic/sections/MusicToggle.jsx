import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle, visible }) {
  if (!visible) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ig-sage-700)] text-[var(--ig-gold-soft)] border border-[rgba(214,195,154,0.4)] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[var(--ig-sage-900)] cursor-pointer"
      aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
      title={isPlaying ? 'Matikan musik latar' : 'Putar musik latar'}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 animate-pulse" strokeWidth={1.8} />
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={1.8} />
      )}
    </button>
  );
}
