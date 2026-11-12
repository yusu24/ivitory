import React from 'react';
import { Disc3, Moon, Sun } from 'lucide-react';

export default function FloatingControls({
  isPlaying,
  onToggleMusic,
  isDark,
  onToggleTheme,
  visible = true,
}) {
  if (!visible) return null;

  return (
    <aside aria-label="Template Controls" className="fixed bottom-20 right-4 z-50 flex flex-col gap-3">
      {/* 1. Theme Toggle Button */}
      <button
        onClick={onToggleTheme}
        className="w-11 h-11 rounded-full backdrop-blur-md border shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
        style={{
          backgroundColor: 'var(--ulems-nav-bg)',
          borderColor: 'var(--ulems-border-card)',
          color: 'var(--ulems-text-main)',
        }}
        title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-500" />
        )}
      </button>

      {/* 2. Audio Toggle Button with Authentic Ulems Spin */}
      <button
        onClick={onToggleMusic}
        className="w-11 h-11 rounded-full backdrop-blur-md border shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
        style={{
          backgroundColor: 'var(--ulems-nav-bg)',
          borderColor: 'var(--ulems-border-card)',
          color: 'var(--ulems-text-main)',
        }}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        <div className={isPlaying ? 'ulems-spin-disc' : 'opacity-70'}>
          <Disc3 className="w-5 h-5 text-emerald-500" />
        </div>
      </button>
    </aside>
  );
}
