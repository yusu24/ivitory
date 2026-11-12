import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ExternalLink, Calendar, Copy, Check, Sparkles } from 'lucide-react';
import { BotanicalCorner, DiamondDivider } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';
import { getInvitationTexts } from '../utils/templateConfig';

export default function EventDetails({ invitation, showDresscode = true }) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeSwatch, setActiveSwatch] = useState('Hitam Obsidian');

  const texts = getInvitationTexts(invitation);

  const handleCopyAddress = (text, id) => {
    sounds.playChime();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const akadLocation = invitation?.akad_location || 'Masjid Agung Al-Akbar Surabaya';
  const akadAddress =
    invitation?.akad_address ||
    'Jl. Masjid Al-Akbar Timur No.1, Pagesangan, Jambangan, Surabaya';
  const resepsiLocation = invitation?.resepsi_location || 'Grand City Convention Hall';
  const resepsiAddress =
    invitation?.resepsi_address ||
    'Jl. Walikota Mustajab No.1, Ketabang, Genteng, Surabaya';

  const events = [
    {
      id: 'akad',
      badge: 'SACRED VOWS • AGENDA 01',
      title: texts.akad_title,
      subtitle: texts.akad_subtitle,
      date: invitation?.akad_date
        ? new Date(invitation.akad_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Senin, 18 Januari 2027',
      time: `${invitation?.akad_time?.slice(0, 5) || '08:00'} WIB - Selesai`,
      venue: akadLocation,
      address: akadAddress,
      mapUrl:
        invitation?.akad_map_url ||
        `https://maps.google.com/?q=${encodeURIComponent(akadLocation)}`,
    },
    {
      id: 'resepsi',
      badge: 'ROYAL BANQUET • AGENDA 02',
      title: texts.resepsi_title,
      subtitle: texts.resepsi_subtitle,
      date: invitation?.resepsi_date
        ? new Date(invitation.resepsi_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : invitation?.akad_date
        ? new Date(invitation.akad_date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Senin, 18 Januari 2027',
      time: `${invitation?.resepsi_time?.slice(0, 5) || '11:00'} WIB - Selesai`,
      venue: resepsiLocation,
      address: resepsiAddress,
      mapUrl:
        invitation?.resepsi_map_url ||
        `https://maps.google.com/?q=${encodeURIComponent(resepsiLocation)}`,
    },
  ];

  const dressCodeSwatches = [
    { name: 'Hitam Obsidian', colorClass: 'bg-zinc-950 border-zinc-800', desc: 'Klasik, Tegas & Timeless' },
    { name: 'Putih Gading', colorClass: 'bg-white border-zinc-300', desc: 'Suci, Bersih & Minimalis' },
    { name: 'Abu Monokrom', colorClass: 'bg-zinc-400 border-zinc-500', desc: 'Modern & Harmonis' },
    { name: 'Batik Nusantara', colorClass: 'bg-stone-700 border-stone-800', desc: 'Anggun & Berbudaya' },
  ];

  return (
    <section
      id="event"
      className="py-24 sm:py-32 px-4 bg-paper-texture text-zinc-900 border-b border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header with Mosque Line Art Sketch in Arched Frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="w-32 h-36 sm:w-36 sm:h-40 mx-auto mb-5 p-2 rounded-t-full border-2 border-zinc-950 bg-white shadow-md relative flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full rounded-t-full border border-dashed border-zinc-300 flex items-center justify-center p-2">
              <img
                src="/templates/minimal-monochrome/mosque_lineart.jpg"
                alt="Mosque Arch Line Art"
                className="w-full h-full object-contain filter contrast-125"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          <span className="text-[11px] uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block mb-1">
            {texts.event_badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 mt-1 font-normal">
            {texts.event_title}
          </h2>
          <DiamondDivider className="max-w-xs mx-auto mt-3" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-md mx-auto mt-2 leading-relaxed">
            {texts.event_intro_text}
          </p>
        </motion.div>

        {/* Dual Clean White Atelier Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {events.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative p-8 sm:p-11 flex flex-col justify-between text-center transition-all duration-500 overflow-hidden bg-white text-zinc-950 border-2 border-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <div className="shimmer-sweep absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent pointer-events-none" />

              {/* Inner double border */}
              <div className="absolute inset-2 border border-zinc-300 pointer-events-none" />

              {/* Self-drawing Botanical corners */}
              <BotanicalCorner
                position={idx === 0 ? 'top-left' : 'top-right'}
                className={`w-12 h-12 absolute top-2.5 ${
                  idx === 0 ? 'left-2.5' : 'right-2.5'
                } opacity-75`}
              />
              <BotanicalCorner
                position={idx === 0 ? 'bottom-right' : 'bottom-left'}
                className={`w-12 h-12 absolute bottom-2.5 ${
                  idx === 0 ? 'right-2.5' : 'left-2.5'
                } opacity-75`}
              />

              <div className="relative z-10">
                <span className="inline-block px-3 py-0.5 text-[9px] tracking-[0.32em] font-clean-sans uppercase font-semibold mb-3 bg-zinc-950 text-white">
                  {evt.badge}
                </span>

                <h3 className="font-editorial-serif text-3xl sm:text-4xl font-normal mb-1">
                  {evt.title}
                </h3>
                <p className="font-script-calligraphy text-xl sm:text-2xl mb-6 text-zinc-600">
                  {evt.subtitle}
                </p>

                <div className="space-y-4 max-w-xs mx-auto">
                  {/* Date & Time */}
                  <div className="py-3 px-4 border border-zinc-200 bg-zinc-50/80">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 opacity-80" />
                      <span className="text-xs sm:text-sm font-clean-sans font-semibold tracking-wider uppercase">
                        {evt.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-clean-sans opacity-80">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{evt.time}</span>
                    </div>
                  </div>

                  {/* Venue & Address */}
                  <div className="flex flex-col items-center pt-2">
                    <div className="w-9 h-9 rounded-full border border-zinc-900 bg-zinc-50 flex items-center justify-center mb-2">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="font-editorial-serif font-bold text-lg sm:text-xl">
                      {evt.venue}
                    </h4>
                    <p className="text-xs font-clean-sans mt-1.5 leading-relaxed text-zinc-600">
                      {evt.address}
                    </p>

                    {/* Copy Address Button */}
                    <button
                      onClick={() => handleCopyAddress(evt.address, evt.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-clean-sans underline underline-offset-4 cursor-pointer transition-colors text-zinc-600 hover:text-zinc-950"
                    >
                      {copiedId === evt.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-semibold">Alamat Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Alamat Lengkap</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="mt-8 pt-6 border-t border-zinc-200 relative z-10">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-clean-sans uppercase tracking-[0.22em] font-semibold transition-all shadow-md cursor-pointer bg-zinc-950 text-white hover:bg-zinc-800"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Petunjuk Google Maps</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Dress Code Guidance Palette */}
        {showDresscode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 max-w-xl mx-auto bg-white border-2 border-zinc-950 p-7 text-center shadow-md relative"
        >
          <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 text-[10px] font-clean-sans uppercase tracking-[0.32em] text-zinc-500 font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-zinc-800" />
            {texts.dress_code_title}
          </span>
          <p className="text-xs font-clean-sans text-zinc-600 leading-relaxed mb-5">
            {texts.dress_code_text}
          </p>

          <div className="flex justify-center items-center gap-5 my-3">
            {dressCodeSwatches.map((swatch) => {
              const isSelected = activeSwatch === swatch.name;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => {
                    sounds.playPaperClick();
                    setActiveSwatch(swatch.name);
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <motion.span
                    animate={{ scale: isSelected ? 1.2 : 1 }}
                    className={`w-9 h-9 rounded-full border-2 shadow-sm transition-all ${
                      swatch.colorClass
                    } ${isSelected ? 'ring-2 ring-zinc-950 ring-offset-2' : 'opacity-80 group-hover:opacity-100'}`}
                  />
                  <span
                    className={`text-[10px] font-clean-sans mt-2 transition-colors ${
                      isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-500'
                    }`}
                  >
                    {swatch.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
            <span className="text-xs font-editorial-serif italic text-zinc-900 font-semibold">
              {activeSwatch} &mdash;{' '}
              {dressCodeSwatches.find((s) => s.name === activeSwatch)?.desc}
            </span>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
