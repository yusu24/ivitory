import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface CountdownSectionProps {
  weddingDateISO: string;
  weddingDateFormatted: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  weddingDateISO,
  weddingDateFormatted,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(weddingDateISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [weddingDateISO]);

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent('Pernikahan M Yusuf Effendi & Nor Nabila Muhammad');
    const details = encodeURIComponent('Momen Bahagia Pernikahan Yusuf & Nabila di The Ritz-Carlton Pacific Place Jakarta');
    const location = encodeURIComponent('The Ritz-Carlton Pacific Place, SCBD Jakarta');
    // Format YYYYMMDDTHHMMSSZ
    const startDate = '20261024T010000Z'; // 08:00 WIB
    const endDate = '20261024T080000Z';   // 15:00 WIB

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-card-dark rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl"
      >
        {/* Shimmer Background Accent */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5C3A21]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#3D261D]/50 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Menghitung Hari Kebahagiaan</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-wide mb-3 text-white">
          Menuju Hari Istimewa
        </h2>

        <p className="text-xs sm:text-sm text-[#D4AF37] font-light tracking-widest uppercase mb-10">
          {weddingDateFormatted}
        </p>

        {/* Countdown Digit Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/15 rounded-2xl p-4 sm:p-6 backdrop-blur-md flex flex-col items-center justify-center group hover:border-[#D4AF37]/60 transition-colors"
            >
              <span className="font-serif-luxury text-3xl sm:text-5xl font-semibold gold-gradient-text tracking-wider">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-white/80 font-light mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add To Calendar Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToGoogleCalendar}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#D4AF37] bg-[#3D261D] text-[#FBF5B7] hover:bg-[#5C3A21] text-xs font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg"
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Simpan Ke Google Calendar</span>
        </motion.button>
      </motion.div>
    </section>
  );
};
