import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { WaveSeparator } from './WaveSeparator';

export default function WeddingDateSection({ invitation, isDark = false }) {
  const targetDateISO = invitation?.akad_date || invitation?.resepsi_date || '2026-10-17T08:00:00';
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDateISO).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateISO]);

  const akadDate = invitation?.akad_date ? new Date(invitation.akad_date).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }) : 'Sabtu, 17 Oktober 2026';

  const resepsiDate = invitation?.resepsi_date ? new Date(invitation.resepsi_date).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }) : 'Sabtu, 17 Oktober 2026';

  return (
    <>
      {/* Wave from bg-alt (Story) to bg-main (Wedding Date) */}
      <WaveSeparator type="alt-to-main" isDark={isDark} />

      <section
        id="wedding-date"
        className="pt-6 pb-0 text-center transition-colors duration-300 relative"
        style={{ backgroundColor: 'var(--ulems-bg-main)', color: 'var(--ulems-text-main)' }}
      >
        <div className="max-w-md mx-auto px-4 relative z-10">
          
          <h2 className="font-esthetic text-4xl sm:text-5xl mb-6">
            Moment Bahagia
          </h2>

          {/* Countdown Pill matching Ulems */}
          <div
            className="border rounded-full shadow-sm py-3 px-6 mb-8 max-w-sm mx-auto transition-colors duration-300"
            style={{
              backgroundColor: 'var(--ulems-bg-card-alt)',
              borderColor: 'var(--ulems-border-card)',
            }}
          >
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-josefin font-bold text-xl sm:text-2xl">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-josefin text-[10px] uppercase tracking-wider opacity-70">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="font-josefin text-xs opacity-80 max-w-sm mx-auto mb-8">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, insyaAllah kami akan menyelenggarakan acara:
          </p>

          {/* Event Cards */}
          <div className="space-y-6 text-left">
            {/* 1. Akad Nikah */}
            <div
              className="p-6 rounded-3xl border shadow-sm text-center transition-colors duration-300"
              style={{
                backgroundColor: 'var(--ulems-bg-card)',
                borderColor: 'var(--ulems-border-card)',
              }}
            >
              <h3 className="font-esthetic text-3xl mb-4">
                Akad
              </h3>

              <div className="space-y-2 text-xs font-josefin opacity-90">
                <div className="flex items-center justify-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{akadDate}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{invitation?.akad_time || '08:00'} WIB - Selesai</span>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-sm">
                    {invitation?.akad_location || 'Masjid Agung Kauman'}
                  </p>
                  <p className="text-[11px] opacity-75 mt-0.5">
                    {invitation?.akad_address || 'Jl. Kauman No. 1, Yogyakarta'}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={invitation?.akad_map_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-josefin rounded-full shadow-sm transition-all cursor-pointer ulems-btn-outline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lihat Google Maps</span>
                </a>
              </div>
            </div>

            {/* 2. Resepsi */}
            <div
              className="p-6 rounded-3xl border shadow-sm text-center transition-colors duration-300"
              style={{
                backgroundColor: 'var(--ulems-bg-card)',
                borderColor: 'var(--ulems-border-card)',
              }}
            >
              <h3 className="font-esthetic text-3xl mb-4">
                Resepsi
              </h3>

              <div className="space-y-2 text-xs font-josefin opacity-90">
                <div className="flex items-center justify-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{resepsiDate}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{invitation?.resepsi_time || '11:00'} WIB - Selesai</span>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-sm">
                    {invitation?.resepsi_location || 'Grand City Ballroom'}
                  </p>
                  <p className="text-[11px] opacity-75 mt-0.5">
                    {invitation?.resepsi_address || 'Jl. Walikota Mustajab No. 1, Surabaya'}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <a
                  href={invitation?.resepsi_map_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-josefin rounded-full shadow-sm transition-all cursor-pointer ulems-btn-outline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lihat Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Dress Code Section */}
          <div className="my-8 py-4">
            <p className="text-xs font-josefin opacity-80 mb-3">
              Demi kehangatan bersama, kami memohon kesediaan Anda untuk mengenakan dress code berikut:
            </p>
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full border border-current shadow-sm bg-stone-100" title="Batik / Neutral" />
              <span className="w-6 h-6 rounded-full border border-current shadow-sm bg-amber-800" title="Earth Tone" />
              <span className="w-6 h-6 rounded-full border border-current shadow-sm bg-stone-800" title="Formal Black" />
            </div>
            <p className="font-josefin font-medium text-xs">
              Busana batik dan bersepatu rapi
            </p>
          </div>

        </div>

        {/* Wave to Gallery (main-to-alt) */}
        <WaveSeparator type="main-to-alt" isDark={isDark} />
      </section>
    </>
  );
}
