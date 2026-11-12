import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { BohoArch, BohoFlower } from '../components/BohoOrnaments';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  return timeStr.slice(0, 5).replace(':', '.') + ' WIB';
}

function EventCard({ icon: Icon, title, subtitle, date, time, venue, address, mapsUrl, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="bg-[var(--color-boho-bg)] relative overflow-hidden rounded-[80px] rounded-bl-xl p-8 sm:p-10 border border-[var(--color-boho-terracotta)]/30 shadow-md flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 text-[var(--color-boho-sage)] opacity-20">
         <BohoFlower className="w-16 h-16" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[var(--color-boho-terracotta)]/10 p-3 rounded-t-full border border-[var(--color-boho-terracotta)]/20">
            <Icon size={22} className="text-[var(--color-boho-terracotta)]" />
          </div>
          <div>
            <h3 className="font-boho-serif text-xl font-medium text-[var(--color-boho-text)]">{title}</h3>
            <p className="text-[10px] text-[var(--color-boho-sage)] tracking-widest uppercase font-boho-sans">{subtitle}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[var(--color-boho-text)]/80">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-[var(--color-boho-terracotta)] mt-0.5 shrink-0 opacity-70" />
            <div>
              <p className="font-semibold text-[var(--color-boho-text)] font-boho-sans text-[10px] uppercase tracking-wider">Waktu</p>
              <p className="font-boho-serif mt-0.5">{formatDate(date)}</p>
              {time && <p className="text-xs text-[var(--color-boho-text)] mt-0.5 font-medium">{formatTime(time)}</p>}
            </div>
          </div>

          {venue && (
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[var(--color-boho-terracotta)] mt-0.5 shrink-0 opacity-70" />
              <div>
                <p className="font-semibold text-[var(--color-boho-text)] font-boho-sans text-[10px] uppercase tracking-wider">Tempat / Lokasi</p>
                <p className="font-boho-serif font-semibold text-[var(--color-boho-terracotta-dark)] mt-0.5">{venue}</p>
                {address && <p className="text-xs leading-relaxed mt-1 opacity-90">{address}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {mapsUrl && (
        <div className="mt-8 pt-6 border-t border-[var(--color-boho-terracotta)]/20 relative z-10">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-boho-terracotta)] hover:bg-[var(--color-boho-terracotta-dark)] text-white py-3 rounded-full transition-all shadow-sm font-boho-sans font-semibold text-[10px] tracking-widest uppercase"
          >
            <MapPin size={13} />
            Petunjuk Lokasi (Google Maps)
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function EventDetail({ invitation }) {
  const hasAkad = invitation.akad_date || invitation.akad_location;
  const hasResepsi = invitation.resepsi_date || invitation.resepsi_location;

  return (
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
          Waktu & Tempat Pelaksanaan
        </p>
        <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-12">
          Detail Acara Spesial
        </h2>

        <div className={`grid grid-cols-1 gap-8 text-left ${hasAkad && hasResepsi ? 'md:grid-cols-2' : ''}`}>
          {hasAkad && (
            <EventCard
              icon={Calendar}
              title="Akad Nikah"
              subtitle="Pemberkatan Suci"
              date={invitation.akad_date}
              time={invitation.akad_time}
              venue={invitation.akad_location}
              address={invitation.akad_address}
              mapsUrl={invitation.akad_map_url}
              delay={0}
            />
          )}
          {hasResepsi && (
            <EventCard
              icon={Users}
              title="Resepsi Pernikahan"
              subtitle="Perayaan Kebahagiaan"
              date={invitation.resepsi_date}
              time={invitation.resepsi_time}
              venue={invitation.resepsi_location}
              address={invitation.resepsi_address}
              mapsUrl={invitation.resepsi_map_url}
              delay={0.2}
            />
          )}
        </div>
      </div>
    </section>
  );
}
