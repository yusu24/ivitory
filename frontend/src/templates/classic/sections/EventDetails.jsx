import { MapPin, Clock, CalendarDays, ExternalLink } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SectionHeading, LeafBranch } from '../components/Botanicals';

export default function EventDetails({ invitation }) {
  const hasResepsi = Boolean(invitation.resepsi_date);

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <LeafBranch className="absolute -left-10 top-1/2 -translate-y-1/2 h-64 w-64 text-[var(--ig-sage-300)] opacity-30 pointer-events-none" />
      <LeafBranch className="absolute -right-10 top-1/2 -translate-y-1/2 h-64 w-64 -scale-x-100 text-[var(--ig-sage-300)] opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Save The Date" title="Rangkaian Acara" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm sm:text-base italic text-[var(--ig-muted)]">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di acara kami:
          </p>
        </Reveal>

        <div className={`mt-14 grid grid-cols-1 gap-8 ${hasResepsi ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
          <Reveal delay={0.1}>
            <EventCard
              title="Akad Nikah"
              date={invitation.akad_date}
              time={invitation.akad_time}
              location={invitation.akad_location}
              address={invitation.akad_address}
              mapUrl={invitation.akad_map_url}
              badge="Sakral & Khidmat"
            />
          </Reveal>

          {hasResepsi && (
            <Reveal delay={0.2}>
              <EventCard
                title="Resepsi Pernikahan"
                date={invitation.resepsi_date}
                time={invitation.resepsi_time}
                location={invitation.resepsi_location}
                address={invitation.resepsi_address}
                mapUrl={invitation.resepsi_map_url}
                badge="Perayaan Bahagia"
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function EventCard({ title, date, time, location, address, mapUrl, badge }) {
  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="ig-card rounded-[36px] p-8 sm:p-10 text-left flex flex-col justify-between h-full relative group border border-[rgba(180,149,90,0.35)] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="ig-sans text-[10px] uppercase tracking-[0.25em] text-[var(--ig-gold)] font-semibold border-b border-[var(--ig-gold-soft)] pb-0.5">
            {badge}
          </span>
          <div className="h-2 w-2 rounded-full bg-[var(--ig-gold)] opacity-70" />
        </div>

        <h3 className="ig-script text-4xl sm:text-5xl text-[var(--ig-sage-700)] leading-tight mb-6">
          {title}
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-[var(--ig-ink)]">
          {formattedDate && (
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-full bg-[var(--ig-sage-50)] border border-[rgba(180,149,90,0.3)] flex items-center justify-center shrink-0 text-[var(--ig-sage-700)]">
                <CalendarDays className="h-4 w-4" strokeWidth={1.6} />
              </div>
              <div className="pt-1">
                <p className="ig-eyebrow !text-[9px] !text-[var(--ig-muted)]">Hari & Tanggal</p>
                <p className="ig-serif text-base sm:text-lg font-medium italic text-[var(--ig-sage-900)]">{formattedDate}</p>
              </div>
            </div>
          )}

          {time && (
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-full bg-[var(--ig-sage-50)] border border-[rgba(180,149,90,0.3)] flex items-center justify-center shrink-0 text-[var(--ig-sage-700)]">
                <Clock className="h-4 w-4" strokeWidth={1.6} />
              </div>
              <div className="pt-1">
                <p className="ig-eyebrow !text-[9px] !text-[var(--ig-muted)]">Waktu Acara</p>
                <p className="ig-serif text-base sm:text-lg font-medium italic text-[var(--ig-sage-900)]">
                  Pukul {time.slice(0, 5)} WIB
                </p>
              </div>
            </div>
          )}

          {location && (
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-full bg-[var(--ig-sage-50)] border border-[rgba(180,149,90,0.3)] flex items-center justify-center shrink-0 text-[var(--ig-sage-700)]">
                <MapPin className="h-4 w-4" strokeWidth={1.6} />
              </div>
              <div className="pt-1">
                <p className="ig-eyebrow !text-[9px] !text-[var(--ig-muted)]">Lokasi & Tempat</p>
                <p className="ig-serif text-base sm:text-lg font-medium italic text-[var(--ig-sage-900)]">{location}</p>
                {address && (
                  <p className="ig-sans text-xs text-[var(--ig-muted)] mt-1 leading-relaxed">{address}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {mapUrl && (
        <div className="mt-8 pt-6 border-t border-[rgba(180,149,90,0.2)]">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-btn-primary w-full text-center group-hover:bg-[var(--ig-sage-900)] transition-all cursor-pointer"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.6} />
            <span>Petunjuk Lokasi Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}
