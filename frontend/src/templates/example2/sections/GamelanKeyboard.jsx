import { motion } from 'framer-motion';
import { gamelanSynth } from '../utils/gamelanSynth';

const KEYS = [
  { label: 'Ji (1)', freq: 261.63, height: 'h-24' },
  { label: 'Ro (2)', freq: 293.66, height: 'h-[5.5rem]' },
  { label: 'Lu (3)', freq: 329.63, height: 'h-20' },
  { label: 'Ma (5)', freq: 392.0, height: 'h-[4.5rem]' },
  { label: 'Nem (6)', freq: 440.0, height: 'h-16' },
  { label: "Ji' (1')", freq: 523.25, height: 'h-14' },
  { label: "Ro' (2')", freq: 587.33, height: 'h-12' },
];

export default function GamelanKeyboard() {
  return (
    <section className="mx-auto mt-10 max-w-xl border-t border-stone-900 px-6 py-16 text-center">
      <div className="mb-4 flex justify-center">
        <svg viewBox="0 0 100 40" className="h-8 w-20 text-amber-500 opacity-60">
          <circle cx="50" cy="20" r="3" fill="currentColor" />
          <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
      <h3 className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text font-serif text-lg font-bold text-transparent">
        Saron Gamelan Mini
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-stone-400">
        Ketuk bilah gamelan perunggu di bawah ini untuk membunyikan nada tradisional penyejuk hati:
      </p>

      <div className="mx-auto mt-8 flex max-w-md justify-center gap-1.5 md:gap-2.5">
        {KEYS.map((key) => (
          <motion.button
            key={key.label}
            whileTap={{ scale: 0.9, y: 5 }}
            onClick={() => gamelanSynth.playChime(key.freq, false, 1.5)}
            className={`relative flex flex-1 ${key.height} flex-col justify-end rounded-b-xl border-x border-b border-amber-300 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 pb-3 font-mono text-[10px] font-bold text-stone-950 shadow-xl shadow-amber-950/40 transition-all duration-300 hover:from-amber-400 hover:to-amber-500`}
          >
            <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-stone-800 bg-stone-900" />
            <span>{key.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
