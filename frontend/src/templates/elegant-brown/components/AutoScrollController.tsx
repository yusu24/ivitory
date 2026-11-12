import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowDown, Gauge, Sparkles } from 'lucide-react';

interface AutoScrollControllerProps {
  isActive: boolean;
}

export const AutoScrollController: React.FC<AutoScrollControllerProps> = ({ isActive }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(1.2); // Pixels per frame
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Auto scroll loop
  useEffect(() => {
    if (!isAutoScrolling || !isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const scrollStep = () => {
      // Check if reached bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        setIsAutoScrolling(false);
        return;
      }

      window.scrollBy(0, scrollSpeed);
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    };

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrolling, scrollSpeed, isActive]);

  // Pause auto scroll when user touches screen or uses mouse wheel manually
  useEffect(() => {
    const handleUserInteraction = (e: Event) => {
      // Only stop if user is actively wheeling or touching
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
    };
  }, [isAutoScrolling]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Speed Selector Popup */}
      <AnimatePresence>
        {showSpeedMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            className="glass-card-dark rounded-2xl p-3 text-white text-xs shadow-2xl border border-[#D4AF37]/40 backdrop-blur-xl flex flex-col gap-2 min-w-[160px]"
          >
            <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono">
              <Gauge className="w-3.5 h-3.5" />
              <span>Kecepatan Gulir</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: 'Pelan', val: 0.8 },
                { label: 'Sedang', val: 1.5 },
                { label: 'Cepat', val: 2.8 },
              ].map((sp) => (
                <button
                  key={sp.label}
                  onClick={() => {
                    setScrollSpeed(sp.val);
                    setShowSpeedMenu(false);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all ${
                    scrollSpeed === sp.val
                      ? 'bg-[#D4AF37] text-[#1A1A1A] font-bold'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Toggle Pill */}
      <div className="flex items-center gap-1.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`py-3 px-5 rounded-full border shadow-[0_0_20px_rgba(92,58,33,0.5)] flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-xl ${
            isAutoScrolling
              ? 'bg-[#5C3A21] text-[#FBF5B7] border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
              : 'bg-[#3D261D]/95 text-white border-[#D4AF37]/50 hover:border-[#D4AF37]'
          }`}
        >
          {isAutoScrolling ? (
            <>
              <Pause className="w-4 h-4 fill-[#FBF5B7]" />
              <span>Hentikan Gulir</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D4AF37]" />
              <span>Auto Scroll</span>
            </>
          )}
        </motion.button>

        {/* Speed Adjustment Button */}
        <button
          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
          className="w-10 h-10 rounded-full bg-[#3D261D]/95 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center hover:border-[#D4AF37] transition-all cursor-pointer backdrop-blur-xl shadow-lg"
          title="Atur Kecepatan Gulir"
        >
          <Gauge className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
