import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation, ExternalLink, Sparkles } from 'lucide-react';
import { EventDetail } from '../types/wedding';

interface EventSectionProps {
  events: EventDetail[];
}

export const EventSection: React.FC<EventSectionProps> = ({ events }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'akad');
  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Rangkaian Acara
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Waktu &amp; Lokasi Acara
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {events.map((evt, idx) => (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className={`glass-panel rounded-3xl p-8 sm:p-10 border transition-all duration-300 relative flex flex-col justify-between shadow-2xl ${
              selectedEventId === evt.id
                ? 'border-[#5C3A21] ring-2 ring-[#5C3A21]/30'
                : 'border-white/80 hover:border-[#5C3A21]/40'
            }`}
          >
            {/* Top Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D261D] text-[#FBF5B7] text-xs font-mono uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{evt.title}</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#2B1B17] font-semibold mb-4">
                {evt.title}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#2B1B17]/80 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#5C3A21]/15 text-[#5C3A21] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2B1B17]">{evt.date}</p>
                    <p className="text-xs text-[#5C3A21]">{evt.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#5C3A21]/15 text-[#5C3A21] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2B1B17]">{evt.venueName}</p>
                    <p className="text-xs text-[#2B1B17]/70 leading-relaxed mt-1">
                      {evt.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#5C3A21]/15">
              <a
                href={evt.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl brown-gradient-bg text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md group"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
                <span>Petunjuk Lokasi</span>
              </a>

              <button
                onClick={() => setSelectedEventId(evt.id)}
                className={`py-3 px-4 rounded-xl border text-xs font-medium tracking-wider uppercase transition-all ${
                  selectedEventId === evt.id
                    ? 'bg-[#3D261D] text-[#FBF5B7] border-[#3D261D]'
                    : 'border-[#5C3A21]/30 text-[#2B1B17] hover:bg-[#5C3A21]/10'
                }`}
              >
                Pratinjau Peta
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded Google Maps Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-4 sm:p-6 border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Peta Lokasi: {activeEvent.venueName}</span>
          </div>
          <a
            href={activeEvent.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8E7C5C] hover:text-[#1A1A1A] underline inline-flex items-center gap-1"
          >
            <span>Buka Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-black/10 shadow-inner relative bg-gray-100">
          <iframe
            title={`Map for ${activeEvent.title}`}
            src={activeEvent.embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter contrast-105"
          />
        </div>
      </motion.div>
    </section>
  );
};
