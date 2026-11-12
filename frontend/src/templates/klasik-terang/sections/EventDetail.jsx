import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { LaceBorder } from '../components/ClassicOrnaments';

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
      className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/30 shadow-xl flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#FDFBF7] p-3 rounded-2xl border border-[#D4AF37]/25">
            <Icon size={22} className="text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium text-[#4A453E]">{title}</h3>
            <p className="text-[10px] text-[#8C8479] tracking-widest uppercase font-sans">{subtitle}</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#6B655D]">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-[#8C8479] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#4A453E] font-sans text-xs uppercase tracking-wider">Waktu</p>
              <p className="font-serif mt-0.5">{formatDate(date)}</p>
              {time && <p className="text-xs text-[#8C8479] mt-0.5 font-medium">{formatTime(time)}</p>}
            </div>
          </div>

          {venue && (
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#8C8479] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#4A453E] font-sans text-xs uppercase tracking-wider">Tempat / Lokasi</p>
                <p className="font-serif font-semibold text-[#8C8479] mt-0.5">{venue}</p>
                {address && <p className="text-xs leading-relaxed mt-1">{address}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {mapsUrl && (
        <div className="mt-8 pt-6 border-t border-[#FDFBF7]">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDFBF7] text-[#4A453E] border border-[#D4AF37] py-3 rounded-xl transition-all shadow-sm font-sans font-semibold text-[10px] tracking-widest uppercase"
          >
            <MapPin size={13} className="text-[#D4AF37]" />
            PETUNJUK LOKASI (GOOGLE MAPS)
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
    <section className="relative py-20 px-4 bg-[#FDFBF7] border-t border-b border-[#D4AF37]/20 z-10">
      <div className="absolute top-0 left-0 w-full rotate-180 z-10">
        <LaceBorder color="#D4AF37" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-2">
          Waktu & Tempat Pelaksanaan
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A453E] font-light mb-12">
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
