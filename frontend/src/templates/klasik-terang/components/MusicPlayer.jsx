import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { weddingSynth, SONGS } from '../utils/audioSynth';

export default function MusicPlayer({ musicUrl, autoPlayTriggered }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState('canon-synth');
  const audioRef = useRef(null);

  const currentSong = SONGS.find((s) => s.id === selectedSongId) || SONGS[0];

  // Auto play when envelope is opened
  useEffect(() => {
    if (autoPlayTriggered) {
      setIsPlaying(true);
      // If there's a backend music_url, use it; otherwise use synth
      if (musicUrl) {
        playMp3();
      } else {
        weddingSynth.init();
        setTimeout(() => {
          weddingSynth.start(selectedSongId);
        }, 100);
      }
    }
    return () => {
      stopAll();
    };
  }, [autoPlayTriggered]);

  // Handle song change
  useEffect(() => {
    if (!autoPlayTriggered || !isPlaying) return;
    stopAll();
    if (musicUrl) {
      playMp3();
    } else {
      weddingSynth.start(selectedSongId);
    }
  }, [selectedSongId]);

  const playMp3 = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch((err) => console.log('Audio blocked:', err));
  };

  const stopAll = () => {
    weddingSynth.stop();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAll();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (musicUrl) {
        playMp3();
      } else {
        weddingSynth.init();
        setTimeout(() => weddingSynth.start(selectedSongId), 50);
      }
    }
  };

  const selectSong = (songId) => {
    setSelectedSongId(songId);
    setShowSelector(false);
    setIsPlaying(true);
  };

  // Don't show selector if backend music_url is set (just use that)
  const showSongSelector = !musicUrl;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Song Selector Popover */}
      {showSelector && showSongSelector && (
        <div className="bg-white/95 backdrop-blur-md border border-[#C5A880]/30 shadow-xl rounded-2xl p-4 w-64 text-sm">
          <p className="text-xs font-semibold text-[#8E7550] uppercase tracking-wider mb-2 pb-1 border-b border-[#FAF6F0]">
            Pilih Musik Latar
          </p>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
            {SONGS.map((song) => (
              <button
                key={song.id}
                onClick={() => selectSong(song.id)}
                className={`text-left px-2 py-1.5 rounded-lg transition-colors text-xs flex flex-col ${
                  selectedSongId === song.id
                    ? 'bg-[#FAF6F0] text-[#8E7550] font-medium'
                    : 'text-[#624E33] hover:bg-[#FAF6F0]'
                }`}
              >
                <span>{song.title}</span>
                <span className="text-[10px] text-[#A68B63]">{song.artist}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="flex items-center gap-2">
        {showSongSelector && (
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="bg-white/90 hover:bg-[#FAF6F0] text-[#8E7550] border border-[#C5A880]/30 p-2.5 rounded-full shadow-lg transition-all"
            title="Ganti lagu"
          >
            <Music size={16} />
          </button>
        )}

        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-[#C5A880]/40 transition-all duration-500 ${
            isPlaying
              ? 'bg-[#8E7550] hover:bg-[#725C3E] text-white'
              : 'bg-white hover:bg-neutral-50 text-[#8E7550]'
          }`}
          title={isPlaying ? 'Senyapkan musik' : 'Putar musik'}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border border-amber-100/30 animate-[spin_4s_linear_infinite]" />
              <Volume2 size={20} className="relative animate-pulse" />
            </div>
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      </div>

      {/* Now playing tooltip */}
      {isPlaying && (
        <div className="bg-black/60 text-[10px] text-white px-2 py-0.5 rounded-md pointer-events-none mr-1 animate-bounce shadow-sm">
          {musicUrl ? '♪ Musik Latar' : `♪ ${currentSong.title}`}
        </div>
      )}
    </div>
  );
}
