import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, CalendarPlus, Heart } from 'lucide-react';
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

function toGCalUTC(date, time) {
  const hhmm = time ? time.slice(0, 5) : '00:00';
  const d = new Date(`${date}T${hhmm}:00`);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export default function EventDetail({ invitation }) {
  const target = new Date(`${invitation.akad_date}T${invitation.akad_time ?? '00:00'}`);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target.getTime()]);

  const hasResepsi = Boolean(invitation.resepsi_date);

  const calendarLink = (() => {
    const title = encodeURIComponent(`Pernikahan ${invitation.groom_name} & ${invitation.bride_name}`);
    const start = toGCalUTC(invitation.akad_date, invitation.akad_time);
    const end = toGCalUTC(
      hasResepsi ? invitation.resepsi_date : invitation.akad_date,
      hasResepsi ? invitation.resepsi_time : invitation.akad_time,
    );
    const details = encodeURIComponent(`Mohon doa restu dalam pernikahan kami.\n\nAkad: ${invitation.akad_location}`);
    const location = encodeURIComponent(invitation.akad_location ?? '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  })();

  const units = timeLeft
    ? [
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
      ]
    : [];

  return (
    <section
      id="event-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 text-[#f2f2f2] md:px-12 lg:px-24"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Save The Date
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Informasi Acara
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a059]/30" />
        </Reveal>

        {timeLeft && (
          <Reveal className="relative mx-auto mb-20 max-w-xl rounded-none border border-[#c5a059]/30 bg-[#141414] p-8 shadow-2xl md:p-10">
            <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-[#c5a059]/20" />
            <div className="absolute right-2 top-2 h-4 w-4 border-r border-t border-[#c5a059]/20" />
            <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#c5a059]/20" />
            <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#c5a059]/20" />

            <h4 className="mb-8 text-center font-sans text-[10px] uppercase tracking-[0.25em] text-stone-400">
              Menghitung Hari Kebahagiaan
            </h4>

            <div className="grid grid-cols-4 gap-4 text-center">
              {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center">
                  <span className="font-serif text-3xl font-light text-[#c5a059] md:text-5xl">
                    {String(u.value).padStart(2, '0')}
                  </span>
                  <span className="mt-2 text-[9px] font-light uppercase tracking-widest text-stone-400 md:text-xs">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href={calendarLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-none border border-[#c5a059]/40 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#c5a059] shadow-md transition-all duration-300 hover:bg-[#c5a059]/10"
              >
                <CalendarPlus className="h-4 w-4" />
                Ingatkan Saya di Google Calendar
              </a>
            </div>
          </Reveal>
        )}

        <div className="mb-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <Reveal>
            <EventCard
              icon={<Heart className="h-5 w-5" />}
              title="Akad Nikah"
              subtitle="Pemberkatan & Janji Suci"
              date={invitation.akad_date}
              time={invitation.akad_time}
              location={invitation.akad_location}
              address={invitation.akad_address}
              mapUrl={invitation.akad_map_url}
            />
          </Reveal>
          {hasResepsi && (
            <Reveal delay={0.1}>
              <EventCard
                icon={<Calendar className="h-5 w-5" />}
                title="Resepsi Pernikahan"
                subtitle="Perayaan & Jamuan Kasih"
                date={invitation.resepsi_date}
                time={invitation.resepsi_time}
                location={invitation.resepsi_location}
                address={invitation.resepsi_address}
                mapUrl={invitation.resepsi_map_url}
              />
            </Reveal>
          )}
        </div>

        <Reveal className="h-[320px] overflow-hidden rounded-none border border-[#c5a059]/20 bg-[#141414] p-2 shadow-2xl">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              invitation.akad_address || invitation.akad_location || '',
            )}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer"
            title="Lokasi Pernikahan"
            className="rounded-none opacity-70 grayscale contrast-[120%] brightness-90"
          />
        </Reveal>
      </div>
    </section>
  );
}

function EventCard({ icon, title, subtitle, date, time, location, address, mapUrl }) {
  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="flex h-full flex-col justify-between rounded-none border border-[#c5a059]/15 bg-[#141414] p-8 shadow-xl transition-all duration-300 hover:border-[#c5a059]/35 md:p-10">
      <div>
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a059]/20 bg-[#c5a059]/10 text-[#c5a059]">
          {icon}
        </div>
        <h3 className="mb-1 font-serif text-2xl font-light tracking-wide text-white">{title}</h3>
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">{subtitle}</p>

        <div className="space-y-5 text-sm font-light text-stone-300">
          <div className="flex items-start gap-4">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#c5a059]" />
            <p className="font-normal text-[#f2f2f2]">{formattedDate}</p>
          </div>
          {time && (
            <div className="flex items-start gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#c5a059]" />
              <p className="font-normal text-[#f2f2f2]">{time.slice(0, 5)} WIB</p>
            </div>
          )}
          {location && (
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#c5a059]" />
              <div>
                <p className="font-normal text-white">{location}</p>
                {address && <p className="mt-1.5 text-xs leading-relaxed text-stone-400">{address}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {mapUrl && (
        <div className="mt-10 border-t border-stone-800 pt-6">
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#c5a059] transition-colors duration-300 hover:text-white"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-[11px] font-light uppercase tracking-wider">Petunjuk Arah Google Maps</span>
          </a>
        </div>
      )}
    </div>
  );
}
