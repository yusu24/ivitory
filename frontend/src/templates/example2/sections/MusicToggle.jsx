import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle, visible }) {
  if (!visible) return null;

  return (
    <div className="fixed right-6 top-6 z-40 flex items-center gap-2">
      <button
        onClick={onToggle}
        className="rounded-full border border-amber-500/30 bg-stone-900/90 p-3.5 text-amber-400 shadow-2xl backdrop-blur-md transition-all hover:bg-stone-800"
        title="Toggle Music"
      >
        {isPlaying ? <Volume2 size={20} className="animate-bounce" /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
