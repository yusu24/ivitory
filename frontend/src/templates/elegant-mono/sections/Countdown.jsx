import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';

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
  const target = new Date(`${invitation.akad_date}T${invitation.akad_time ?? '00:00'}`);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target.getTime()]);

  if (!timeLeft) return null;

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="bg-taupe-900 px-6 pb-14 pt-4 text-center text-ivory">
      <Reveal>
        <div className="mx-auto flex max-w-md justify-center gap-3 sm:gap-4">
          {units.map((unit) => (
            <div key={unit.label} className="flex-1 rounded-xl border border-ivory/15 bg-ivory/5 px-2 py-3 backdrop-blur-sm">
              <p className="font-cursive text-3xl text-gold-400 sm:text-4xl">{String(unit.value).padStart(2, '0')}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-ivory/60">{unit.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
