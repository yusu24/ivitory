import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarPlus, Download } from 'lucide-react';
import { DiamondDivider, BotanicalCorner } from './MonochromeOrnaments';

export default function CountdownSection({
  weddingDateISO,
  brideName = 'Nor Nabilla',
  groomName = 'M Yusuf Effendi',
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingDateISO || '2027-01-18T08:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [weddingDateISO]);

  const targetDateObj = new Date(weddingDateISO || '2027-01-18T08:00:00');
  const formattedDate = targetDateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Pure URL computation (no sound side-effect!)
  const googleCalendarUrl = (() => {
    const title = encodeURIComponent(`The Wedding of ${brideName} & ${groomName}`);
    const details = encodeURIComponent(
      `Pernikahan ${brideName} & ${groomName}. Bersama merayakan hari bahagia dan mengalirkan doa restu.`
    );
    const startIso = targetDateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endObj = new Date(targetDateObj.getTime() + 4 * 60 * 60 * 1000);
    const endIso = endObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startIso}/${endIso}`;
  })();

  // iCal / Apple Calendar .ics Download Generator
  const handleDownloadIcs = () => {
    const startIso = targetDateObj.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endObj = new Date(targetDateObj.getTime() + 4 * 60 * 60 * 1000);
    const endIso = endObj.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Yusuf & Nabilla Wedding//ID',
      'BEGIN:VEVENT',
      `SUMMARY:The Wedding of ${brideName} & ${groomName}`,
      `DESCRIPTION:Pernikahan ${brideName} & ${groomName}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'LOCATION:Surabaya, Jawa Timur',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-yusuf-nabilla.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-22 sm:py-28 px-4 bg-paper-texture text-zinc-900 border-b border-zinc-200 relative overflow-hidden">
      {/* Decorative self-drawing botanical corners */}
      <BotanicalCorner position="top-left" className="w-20 h-20 absolute top-4 left-4 opacity-50" />
      <BotanicalCorner position="bottom-right" className="w-20 h-20 absolute bottom-4 right-4 opacity-50" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 border border-zinc-900 bg-white text-[10px] tracking-[0.35em] font-clean-sans uppercase text-zinc-900 font-semibold mb-2 shadow-2xs">
            MENGHITUNG HARI BAHAGIA
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 mt-1 font-normal">
            Save The Date
          </h2>
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 tracking-widest uppercase mt-2 font-medium">
            {formattedDate}
          </p>

          <DiamondDivider className="max-w-xs mx-auto my-5" text="COUNTDOWN" />
        </motion.div>

        {/* Live Circular Ring Countdown Grid with Silent Spring Flip Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-2xl mx-auto my-8">
          {[
            { label: 'HARI', value: timeLeft.days, max: 365 },
            { label: 'JAM', value: timeLeft.hours, max: 24 },
            { label: 'MENIT', value: timeLeft.minutes, max: 60 },
            { label: 'DETIK', value: timeLeft.seconds, max: 60 },
          ].map((item, idx) => {
            const percentage = Math.min(100, Math.max(0, (item.value / item.max) * 100));
            const circumference = 2 * Math.PI * 38;
            const strokeDashoffset = circumference - (percentage / 100) * circumference;
            const formattedVal = String(item.value).padStart(2, '0');

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white text-zinc-950 border-2 border-zinc-950 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center relative group"
              >
                {/* Double frame corner */}
                <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />

                {/* Circular SVG Ring */}
                <div className="relative w-24 h-24 flex items-center justify-center my-1">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
                    <circle
                      cx="44"
                      cy="44"
                      r="38"
                      stroke="#f4f4f5"
                      strokeWidth="2.5"
                      fill="transparent"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="38"
                      stroke="#09090b"
                      strokeWidth="3.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  {/* Spring Animated Number (100% Silent) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={formattedVal}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                        className="text-2xl sm:text-3xl font-editorial-serif font-bold text-zinc-950"
                      >
                        {formattedVal}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <span className="text-[10px] tracking-[0.28em] font-clean-sans font-bold text-zinc-500 uppercase mt-1">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Action Suite: Google Calendar & iCal Download */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 text-white text-xs font-clean-sans uppercase tracking-[0.22em] font-semibold hover:bg-zinc-800 transition-all border border-zinc-950 shadow-md cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Simpan ke Google Calendar</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 text-xs font-clean-sans uppercase tracking-[0.22em] font-semibold hover:bg-zinc-100 transition-all border border-zinc-950 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Kalender (.ics)</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
