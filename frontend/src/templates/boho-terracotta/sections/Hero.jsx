import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BohoArch, BohoFlower, BohoLine } from '../components/BohoOrnaments';

export default function Hero({ invitation }) {
  const brideNick = invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || 'Mempelai';
  const groomNick = invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || 'Mempelai';

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!invitation.akad_date) return;
    const targetDate = new Date(`${invitation.akad_date}T08:00:00`);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [invitation.akad_date]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 bg-transparent">
      {/* Top Floral Accent */}
      <div className="absolute top-0 w-full flex justify-center opacity-70 mt-8 text-[var(--color-boho-terracotta-light)]">
        <BohoFlower className="w-24 h-24" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl mx-auto flex flex-col items-center px-4 z-10 mt-16"
      >
        <p className="font-boho-sans text-[var(--color-boho-sage)] text-[10px] tracking-[0.3em] uppercase mb-4 font-medium">
          Maha Suci Allah, Kami Memohon Ridho-Mu
        </p>

        <h1 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-6">
          Walimatul 'Ursy Pernikahan
        </h1>

        <BohoLine className="w-32 my-6" />

        <h2 className="font-boho-script text-6xl sm:text-7xl text-[var(--color-boho-terracotta)] leading-tight mb-8">
          {brideNick} <br />
          <span className="text-3xl text-[var(--color-boho-terracotta-light)] block my-2 font-boho-serif">&</span>{' '}
          {groomNick}
        </h2>

        <p className="font-boho-serif text-sm text-[var(--color-boho-text)] tracking-wider max-w-md mx-auto mb-10 leading-relaxed italic">
          {invitation.opening_text || 'Kami mengundang Anda untuk merayakan babak baru kehidupan cinta kami.'}
        </p>

        {/* Countdown Timer */}
        {invitation.akad_date && (
          <div className="bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)] border-opacity-30 rounded-t-[40px] rounded-b-md p-6 shadow-sm max-w-md w-full relative overflow-hidden">
            <div className="absolute -top-4 -right-4 text-[var(--color-boho-sage)] opacity-20">
               <BohoFlower className="w-20 h-20" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-6">
              Hitung Mundur Menuju Hari Bahagia
            </p>
            <div className="grid grid-cols-4 gap-2.5 text-center relative z-10">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/50 p-3 rounded-lg border border-[var(--color-boho-terracotta)]/20">
                  <span className="block font-boho-serif text-2xl sm:text-3xl font-light text-[var(--color-boho-text)]">{value}</span>
                  <span className="text-[9px] text-[var(--color-boho-terracotta-dark)] uppercase font-boho-sans tracking-widest font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
