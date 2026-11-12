import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { MusicTrack } from '../types/wedding';

interface MusicPlayerProps {
  playlist: MusicTrack[];
  autoPlayTriggered: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist, autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Handle autoplay trigger when "Buka Undangan" is clicked
  useEffect(() => {
    if (autoPlayTriggered && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Autoplay prevented by browser policies:', err);
        });
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio play error:', err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        loop
        preload="auto"
      />

      {/* Persistent Floating Bottom-Right Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Expanded Track info popup */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="glass-card-dark rounded-2xl p-4 text-white text-xs shadow-2xl border border-[#D4AF37]/40 w-64 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] ${isPlaying ? 'animate-spin-slow' : ''}`}>
                  <Disc className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-serif-luxury font-medium text-sm text-white truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Mute and Playlist controls */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 text-white/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
                  <span className="text-[10px] uppercase font-mono">{isMuted ? 'Muted' : 'Sound On'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {playlist.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentTrackIndex === idx ? 'bg-[#D4AF37] w-4' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Spinning Vinyl Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowControls((prev) => !prev)}
            onDoubleClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#3D261D] text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(92,58,33,0.6)] flex items-center justify-center relative cursor-pointer group"
          >
            {/* Spinning Disc Effect */}
            <div
              className={`w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#2B1B17] transition-transform ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <Music className="w-4 h-4 text-[#D4AF37]" />
            </div>

            {/* Play/Pause Overlay Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full brown-gold-gradient-bg text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
            </button>
          </motion.button>
        </div>
      </div>
    </>
  );
};
