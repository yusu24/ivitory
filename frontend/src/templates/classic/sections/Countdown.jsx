import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { SectionHeading, LeafBranch } from '../components/Botanicals';

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ invitation }) {
  const targetDate = invitation.akad_date || invitation.resepsi_date;
  const targetTime = invitation.akad_time || invitation.resepsi_time || '08:00';
  
  const target = new Date(`${targetDate}T${targetTime}`);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target.getTime()]);

  const units = [
    { label: 'Hari', value: timeLeft ? timeLeft.days : 0 },
    { label: 'Jam', value: timeLeft ? timeLeft.hours : 0 },
    { label: 'Menit', value: timeLeft ? timeLeft.minutes : 0 },
    { label: 'Detik', value: timeLeft ? timeLeft.seconds : 0 },
  ];

  return (
    <section className="relative px-6 py-20 text-center overflow-hidden bg-[var(--ig-sage-700)] text-[var(--ig-paper)]">
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(214, 195, 154, 0.4) 0, transparent 60%)`,
        }}
      />
      
      <div className="mx-auto max-w-2xl relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Menghitung Hari" title="Hari Bahagia Kami" light />
          <p className="ig-serif mt-3 text-sm italic text-[var(--ig-gold-soft)] max-w-md mx-auto">
            Setiap detik yang berlalu mengiringi langkah kami menuju ikatan suci yang penuh berkah.
          </p>

          <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
            {units.map((unit) => (
              <div 
                key={unit.label} 
                className="rounded-2xl border border-[rgba(214,195,154,0.3)] bg-[rgba(255,255,255,0.08)] backdrop-blur-md p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center"
              >
                <span className="ig-serif text-3xl sm:text-5xl font-light text-[var(--ig-gold-soft)] leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="ig-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--ig-paper)] opacity-80 mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
