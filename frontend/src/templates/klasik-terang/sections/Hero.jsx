import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CornerOrnament, LuxuryCrest, GoldLeafBranch, LaceBorder } from '../components/ClassicOrnaments';

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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 bg-white/30">
      {/* Lace top */}
      <div className="absolute top-0 left-0 w-full z-10">
        <LaceBorder color="#D4AF37" />
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-12 left-4">
        <CornerOrnament className="w-14 h-14 opacity-60" />
      </div>
      <div className="absolute top-12 right-4 rotate-90">
        <CornerOrnament className="w-14 h-14 opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl mx-auto flex flex-col items-center px-4 z-10"
      >
        <LuxuryCrest className="w-16 h-16 text-[#D4AF37] mb-6 opacity-80" />

        <p className="font-sans text-[#8C8479] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
          Maha Suci Allah, Kami Memohon Ridho-Mu
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#8C8479] italic tracking-wide font-light">
          Walimatul 'Ursy Pernikahan
        </h1>

        <div className="my-8 flex items-center justify-center gap-2">
          <span className="h-[1px] w-12 bg-[#D4AF37]/30" />
          <span className="text-[#D4AF37]">✦</span>
          <span className="h-[1px] w-12 bg-[#D4AF37]/30" />
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl font-light italic tracking-wide text-[#4A453E] leading-tight mb-8">
          {brideNick} <br />
          <span className="text-xl sm:text-2xl text-[#8C8479] block my-2 font-sans font-normal uppercase tracking-widest">&</span>{' '}
          {groomNick}
        </h2>

        <p className="font-serif text-sm text-[#8C8479] tracking-wider max-w-md mx-auto mb-10 leading-relaxed italic">
          {invitation.opening_text || 'Kami mengundang Anda untuk merayakan babak baru kehidupan cinta kami.'}
        </p>

        <div className="flex gap-4 items-center opacity-85 mb-8">
          <GoldLeafBranch className="w-24 h-12" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <GoldLeafBranch className="w-24 h-12" flipped />
        </div>

        {/* Countdown Timer */}
        {invitation.akad_date && (
          <div className="bg-[#FDFBF7]/85 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl p-6 shadow-md max-w-md w-full">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-4">
              Hitung Mundur Menuju Hari Bahagia
            </p>
            <div className="grid grid-cols-4 gap-2.5 text-center">
              {[
                { value: timeLeft.days, label: 'Hari' },
                { value: timeLeft.hours, label: 'Jam' },
                { value: timeLeft.minutes, label: 'Menit' },
                { value: timeLeft.seconds, label: 'Detik' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-[#FDFBF7] p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="block font-serif text-2xl sm:text-3xl font-light text-[#4A453E]">{value}</span>
                  <span className="text-[9px] text-[#8C8479] uppercase font-sans tracking-widest font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
