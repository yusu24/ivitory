import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero({ invitation }) {
  const target = new Date(`${invitation.akad_date}T${invitation.akad_time ?? '00:00'}`);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target.getTime()]);

  const units = [
    { label: 'Hari', val: timeLeft.days },
    { label: 'Jam', val: timeLeft.hours },
    { label: 'Menit', val: timeLeft.minutes },
    { label: 'Detik', val: timeLeft.seconds },
  ];

  return (
    <section
      id="section-home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950" />
      <div className="pointer-events-none absolute inset-4 rounded-3xl border border-amber-200/50 opacity-30 md:inset-10" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 max-w-2xl space-y-6">
        <div className="flex justify-center">
          <svg viewBox="0 0 100 40" className="h-12 w-36 text-amber-500">
            <path
              d="M10,20 C30,5 40,5 50,20 C60,5 70,5 90,20 C70,35 60,35 50,20 C40,35 30,35 10,20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="50" cy="20" r="3.5" fill="currentColor" />
            <line x1="0" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="90" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">Walimatul &lsquo;Ursy</span>

        <h1 className="bg-gradient-to-r from-amber-100 via-yellow-400 to-amber-100 bg-clip-text py-2 font-serif text-5xl font-bold text-transparent md:text-7xl">
          {invitation.bride_nickname || invitation.bride_name} &amp; {invitation.groom_nickname || invitation.groom_name}
        </h1>

        <p className="mx-auto max-w-md px-4 text-sm font-light leading-relaxed tracking-wide text-stone-300">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Kami bermaksud memohon doa
          restu dalam pernikahan putra-putri kami.
        </p>

        <div className="pt-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-amber-500/80">Hitung Mundur Acara</p>
          <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 md:gap-4">
            {units.map((u) => (
              <div key={u.label} className="rounded-xl border border-amber-500/20 bg-stone-900/80 p-3 shadow-lg shadow-black/40 backdrop-blur-sm">
                <span className="block font-serif text-2xl font-bold tracking-tight text-amber-400 md:text-3xl">
                  {String(u.val).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">{u.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 pt-8 opacity-55">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Gulir ke bawah</span>
            <ChevronDown size={14} className="text-amber-500" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
