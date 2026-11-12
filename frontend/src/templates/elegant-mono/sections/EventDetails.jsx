import { MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function EventDetails({ invitation }) {
  const hasResepsi = Boolean(invitation.resepsi_date);

  return (
    <section id="section-events" className="bg-taupe-50 px-6 py-20">
      <div className="mx-auto max-w-md space-y-10 text-center">
        <Reveal>
          <EventCard
            title="Akad Nikah"
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
              title="Resepsi"
              date={invitation.resepsi_date}
              time={invitation.resepsi_time}
              location={invitation.resepsi_location}
              address={invitation.resepsi_address}
              mapUrl={invitation.resepsi_map_url}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function EventCard({ title, date, time, location, address, mapUrl }) {
  const d = date ? new Date(`${date}T00:00:00`) : null;
  const dayName = d ? d.toLocaleDateString('id-ID', { weekday: 'long' }) : '';
  const dayNumber = d ? d.getDate() : '';
  const monthYear = d ? d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : '';

  return (
    <div className="rounded-3xl border border-taupe-200 bg-white px-6 py-10 shadow-sm">
      <p className="font-cursive text-3xl text-taupe-600">{title}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-taupe-400">{monthYear}</p>

      <div className="mx-auto mt-6 flex items-center justify-center gap-4">
        <span className="text-sm text-taupe-500">{dayName}</span>
        <span className="h-8 w-px bg-taupe-200" />
        <span className="font-display text-5xl text-stone-900">{dayNumber}</span>
      </div>

      {time && <p className="mt-6 text-sm text-taupe-500">Pukul {time.slice(0, 5)} WIB</p>}
      {location && (
        <p className="mt-2 text-sm text-taupe-600">
          {location}
          {address && <span className="block text-xs text-taupe-400">{address}</span>}
        </p>
      )}

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-taupe-500 px-6 py-2.5 text-sm text-ivory transition hover:bg-taupe-600"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.5} />
          Maps Lokasi Acara
        </a>
      )}
    </div>
  );
}
