import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle, visible }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <button
        onClick={onToggle}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a059]/50 bg-[#0d0d0d]/90 text-[#c5a059] shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          isPlaying ? 'ring-1 ring-[#c5a059]/80 ring-offset-2 ring-offset-[#0d0d0d]' : ''
        }`}
        title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
      >
        {isPlaying && <div className="absolute inset-0 animate-ping rounded-full bg-[#c5a059]/10 duration-1000" />}
        <div
          className={`absolute inset-1 rounded-full border border-dashed border-[#c5a059]/30 ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '6s' }}
        />
        <div className="relative z-10">
          {isPlaying ? (
            <Volume2 className="h-5 w-5 animate-pulse text-[#c5a059]" />
          ) : (
            <VolumeX className="h-5 w-5 text-[#c5a059]/60" />
          )}
        </div>
      </button>
    </div>
  );
}
