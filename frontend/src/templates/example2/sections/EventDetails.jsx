import { Calendar, Clock, MapPin, Heart, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';

function toGCalUTC(date, time) {
  const hhmm = time ? time.slice(0, 5) : '00:00';
  const d = new Date(`${date}T${hhmm}:00`);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export default function EventDetails({ invitation }) {
  const hasResepsi = Boolean(invitation.resepsi_date);

  return (
    <section id="section-events" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.02),transparent_70%)]" />
      <h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">
        Agenda &amp; Lokasi Acara
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <EventCard
            icon={<Heart size={18} className="text-amber-500/40" />}
            badge="Upacara Akad Nikah"
            title="Akad Nikah"
            date={invitation.akad_date}
            time={invitation.akad_time}
            venue={invitation.akad_location}
            mapLink={invitation.akad_map_url}
            brideName={invitation.bride_nickname || invitation.bride_name}
            groomName={invitation.groom_nickname || invitation.groom_name}
          />
        </Reveal>
        {hasResepsi && (
          <Reveal delay={0.1}>
            <EventCard
              icon={<Sparkles size={18} className="text-amber-500/40" />}
              badge="Walimahan / Syukuran"
              title="Resepsi"
              date={invitation.resepsi_date}
              time={invitation.resepsi_time}
              venue={invitation.resepsi_location}
              mapLink={invitation.resepsi_map_url}
              brideName={invitation.bride_nickname || invitation.bride_name}
              groomName={invitation.groom_nickname || invitation.groom_name}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function EventCard({ icon, badge, title, date, time, venue, mapLink, brideName, groomName }) {
  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const calendarLink = date
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        `${title} ${brideName} & ${groomName}`,
      )}&dates=${toGCalUTC(date, time)}/${toGCalUTC(date, time)}&details=${encodeURIComponent(
        'Mohon doa restunya untuk pernikahan kami',
      )}&location=${encodeURIComponent(venue ?? '')}`
    : null;

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/10 bg-stone-900/60 p-8 backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500">{badge}</span>
          {icon}
        </div>

        <h3 className="font-serif text-3xl font-bold text-stone-100">{title}</h3>

        <div className="space-y-4 text-sm text-stone-300">
          <div className="flex items-start gap-3">
            <Calendar size={18} className="mt-0.5 shrink-0 text-amber-500" />
            <div>
              <p className="font-semibold text-stone-200">Tanggal</p>
              <p className="mt-0.5 font-light">{formattedDate}</p>
            </div>
          </div>
          {time && (
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-amber-500" />
              <div>
                <p className="font-semibold text-stone-200">Waktu</p>
                <p className="mt-0.5 font-light">{time.slice(0, 5)} WIB</p>
              </div>
            </div>
          )}
          {venue && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-amber-500" />
              <div>
                <p className="font-semibold text-stone-200">Tempat</p>
                <p className="mt-0.5 font-light leading-relaxed">{venue}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 pt-2 sm:flex-row">
        {mapLink && (
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-stone-950 px-5 py-3 text-xs font-medium text-amber-400 transition-all hover:border-amber-500/50 hover:bg-stone-800"
          >
            <MapPin size={14} />
            Buka Google Maps
          </a>
        )}
        {calendarLink && (
          <a
            href={calendarLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-semibold text-stone-950 transition-all hover:bg-amber-600"
          >
            <Calendar size={14} />
            Simpan Kalender
          </a>
        )}
      </div>
    </div>
  );
}
