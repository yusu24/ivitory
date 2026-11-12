import React, { useState } from 'react';
import BasePrintSuiteEngine, {
  UniversalCropMarks,
  UniversalQrBox,
  UniversalCircularSeal,
} from '../shared/print/BasePrintSuiteEngine';
import { BohoArch, BohoLeaf } from './components/BohoOrnaments';

/**
 * Terra Botanica (boho-terracotta) Physical Print Suite
 * Built on BasePrintSuiteEngine & calibrated with Solar Dusk / Terracotta Design Tokens:
 * 3 Template Pilihan Cetak Fisik:
 * 1. 'boho-arch' (Template 1: Bohemian Arch dengan siluet daun palem & monogram lengkung)
 * 2. 'terracotta-frame' (Template 2: Terracotta Geometric Frame dengan aksen garis hairline minimalis)
 * 3. 'botanical-crest' (Template 3: Botanical Sun Crest dengan medali melingkar & tipografi terakota)
 */

const TEMPLATES = [
  {
    id: 'boho-arch',
    name: 'Template 1: Bohemian Arch',
    description: 'Lengkungan khas boho hangat dengan siluet daun palem & monogram lengkung',
  },
  {
    id: 'terracotta-frame',
    name: 'Template 2: Terracotta Frame',
    description: 'Bingkai ganda terakota geometris dengan aksen garis hairline minimalis',
  },
  {
    id: 'botanical-crest',
    name: 'Template 3: Botanical Sun Crest',
    description: 'Medali bulat bertuliskan nama melingkar dengan lingkaran matahari hangat',
  },
];

const PAPER_THEMES = [
  { id: 'warm-sand', label: 'Warm Sand (Krem Terakota Hangat)', isDark: false },
  { id: 'cotton-clean', label: 'Cotton Clean White (Hemat Tinta)', isDark: false },
  { id: 'terracotta-bold', label: 'Sampul Bold Terracotta Earth', isDark: true },
];

export default function BohoTerracottaPrintSuite({ invitation, embeddedInDashboard = false }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('boho-arch');
  const [selectedPaperTheme, setSelectedPaperTheme] = useState('warm-sand');

  const brideName = invitation?.bride_name || 'Anindya Putri Maharani';
  const groomName = invitation?.groom_name || 'Rian Pratama Putra';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Anindya';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Rian';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const brideParents =
    invitation?.bride_parents || 'Bapak Ir. Hendra Wijaya & Ibu Ratna Sari';
  const groomParents =
    invitation?.groom_parents || 'Bapak Drs. Surya Pratama & Ibu Dewi Anggraini';

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-02-14';
  const dateObj = new Date(eventDateRaw);
  const formattedDateLong = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDateUpper = dateObj
    .toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase();
  const formattedDateShort = dateObj
    .toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');

  const resepsiDateRaw = invitation?.resepsi_date || eventDateRaw;
  const formattedResepsiDate = new Date(resepsiDateRaw).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const akadTime = `${invitation?.akad_time?.slice(0, 5) || '08:30'} WIB - Selesai`;
  const resepsiTime = `${invitation?.resepsi_time?.slice(0, 5) || '11:30'} WIB - Selesai`;

  const akadLocation = invitation?.akad_location || 'Gedong Putih Villa';
  const akadAddress =
    invitation?.akad_address || 'Jl. Sersan Bajuri KM 4.7, Lembang, Bandung';
  const resepsiLocation = invitation?.resepsi_location || 'Pine Forest Venue Bandung';
  const resepsiAddress =
    invitation?.resepsi_address || 'Lembang, Kabupaten Bandung Barat';

  const slug = invitation?.slug || 'anin-rian';
  const onlineUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : `https://invitory.id/${slug}`;
  const mapsUrl =
    invitation?.resepsi_map_url ||
    invitation?.akad_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(resepsiLocation)}`;

  const coverPhotoSrc =
    invitation?.cover_photo_url ||
    invitation?.hero_image_url ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';

  const isDarkCover = selectedPaperTheme === 'terracotta-bold';
  const paperBgClass =
    selectedPaperTheme === 'cotton-clean'
      ? 'bg-white text-[#4a3f35]'
      : selectedPaperTheme === 'terracotta-bold'
      ? 'bg-[#8c3d2c] text-amber-50'
      : 'bg-[#faf4ee] text-[#4a3f35]';

  // SHEET 1: SAMPUL DEPAN (A5)
  const renderSheet1Cover = ({ showCropMarks, showIllustration, guestNamePrint }) => (
    <div
      className={`print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl ${paperBgClass} border border-[#b2533e]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && <UniversalCropMarks color={isDarkCover ? '#fed7aa' : '#b2533e'} />}

      {/* Frame based on selected template */}
      {selectedTemplateId === 'boho-arch' ? (
        <>
          <div
            className={`absolute inset-4 border-2 rounded-t-[140px] pointer-events-none ${
              isDarkCover ? 'border-amber-200' : 'border-[#b2533e]/60'
            }`}
          />
          <div
            className={`absolute inset-6 border rounded-t-[130px] pointer-events-none ${
              isDarkCover ? 'border-amber-400/40' : 'border-[#c18c5d]/40'
            }`}
          />
        </>
      ) : selectedTemplateId === 'botanical-crest' ? (
        <>
          <div
            className={`absolute inset-4 border pointer-events-none ${
              isDarkCover ? 'border-amber-200' : 'border-[#b2533e]'
            }`}
          />
          <div
            className={`absolute inset-5.5 border-2 pointer-events-none ${
              isDarkCover ? 'border-amber-400/50' : 'border-[#c18c5d]/50'
            }`}
          />
          <div
            className={`absolute inset-7 border border-dashed pointer-events-none ${
              isDarkCover ? 'border-amber-500/30' : 'border-[#b2533e]/30'
            }`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-4 border-2 pointer-events-none ${
              isDarkCover ? 'border-amber-200' : 'border-[#b2533e]/70'
            }`}
          />
          <div
            className={`absolute inset-6 border pointer-events-none ${
              isDarkCover ? 'border-amber-400/40' : 'border-[#c18c5d]/40'
            }`}
          />
        </>
      )}

      {/* Corner Botanical Sprigs */}
      <div
        className={`absolute top-7 left-7 opacity-75 pointer-events-none w-14 h-20 -rotate-12 ${
          isDarkCover ? 'text-amber-200' : 'text-[#5c6f68]'
        }`}
      >
        <BohoLeaf className="w-full h-full" />
      </div>
      <div
        className={`absolute top-7 right-7 opacity-75 pointer-events-none w-14 h-20 rotate-12 scale-x-[-1] ${
          isDarkCover ? 'text-amber-200' : 'text-[#5c6f68]'
        }`}
      >
        <BohoLeaf className="w-full h-full" />
      </div>

      {/* Header */}
      <div className="text-center pt-7 relative z-10">
        <span
          className={`inline-block px-3.5 py-1 text-[8.5px] uppercase tracking-[0.38em] font-bold ${
            isDarkCover ? 'bg-amber-100 text-[#8c3d2c]' : 'bg-[#b2533e] text-white'
          }`}
        >
          THE WEDDING OF
        </span>
        <p
          className={`text-[8px] uppercase tracking-[0.3em] font-medium mt-2 ${
            isDarkCover ? 'text-amber-200' : 'text-[#5c6f68]'
          }`}
        >
          CELEBRATION OF LOVE
        </p>
      </div>

      {/* Center Couple / Arch & Names */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 text-center">
        {selectedTemplateId === 'botanical-crest' ? (
          /* Template 3: Sun Crest */
          <div className="flex flex-col items-center mb-3">
            <div className="relative w-30 h-30 flex items-center justify-center mb-2">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#b2533e]/40 pointer-events-none" />
              <div
                className={`w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-md ${
                  isDarkCover
                    ? 'border-amber-200 bg-[#702f21] text-amber-100'
                    : 'border-[#b2533e] bg-[#eedfd2] text-[#b2533e]'
                }`}
              >
                <span className="font-serif italic font-bold text-xl">{monogram}</span>
              </div>
            </div>
            <p className="text-[7.5px] uppercase tracking-[0.28em] font-semibold text-[#5c6f68]">
              EST. {dateObj.getFullYear()}
            </p>
          </div>
        ) : selectedTemplateId === 'terracotta-frame' ? (
          /* Template 2: Clean Geometric Photo Frame */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-30 h-36 border-2 p-1 bg-white shadow-md flex items-center justify-center relative ${
                isDarkCover ? 'border-amber-200' : 'border-[#b2533e]'
              }`}
            >
              {showIllustration ? (
                <div className="w-full h-full overflow-hidden bg-white">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span className="font-serif italic text-2xl font-bold tracking-widest text-[#b2533e]">
                  {monogram}
                </span>
              )}
              <div
                className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-[8px] font-bold text-white shadow-xs ${
                  isDarkCover ? 'bg-[#8c3d2c]' : 'bg-[#b2533e]'
                }`}
              >
                {monogram}
              </div>
            </div>
          </div>
        ) : (
          /* Template 1: Arch Shape Photo Medallion */
          showIllustration ? (
            <div className="relative mb-3">
              <div className="absolute -inset-4 pointer-events-none">
                <UniversalCircularSeal
                  id="bohoSealCover"
                  text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • TERRA BOTANICA • `}
                  color={isDarkCover ? '#fef3c7' : '#b2533e'}
                />
              </div>
              <div
                className={`w-32 h-32 rounded-t-[60px] rounded-b-full border-2 p-1.5 bg-white shadow-md flex items-center justify-center relative ${
                  isDarkCover ? 'border-amber-200' : 'border-[#b2533e]'
                }`}
              >
                <div className="w-full h-full rounded-t-[54px] rounded-b-full overflow-hidden bg-white">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1.5 right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-serif italic font-bold shadow-sm ${
                    isDarkCover ? 'bg-amber-100 text-[#8c3d2c]' : 'bg-[#b2533e] text-white'
                  }`}
                >
                  {monogram}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-18 h-18 rounded-t-full border flex items-center justify-center mb-3 shadow-2xs ${
                isDarkCover
                  ? 'border-amber-200 bg-[#702f21] text-amber-100'
                  : 'border-[#b2533e] bg-[#eedfd2]/60 text-[#b2533e]'
              }`}
            >
              <span className="font-serif italic font-bold text-lg">{monogram}</span>
            </div>
          )
        )}

        <h1
          className={`font-serif italic text-4xl sm:text-[46px] leading-none ${
            isDarkCover ? 'text-amber-100' : 'text-[#b2533e]'
          }`}
        >
          {brideName}
        </h1>
        <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[180px]">
          <div className={`h-[1px] flex-1 ${isDarkCover ? 'bg-amber-300/40' : 'bg-[#b2533e]/40'}`} />
          <span className="font-serif italic text-sm">&amp;</span>
          <div className={`h-[1px] flex-1 ${isDarkCover ? 'bg-amber-300/40' : 'bg-[#b2533e]/40'}`} />
        </div>
        <h2
          className={`font-serif italic text-4xl sm:text-[46px] leading-none ${
            isDarkCover ? 'text-amber-100' : 'text-[#b2533e]'
          }`}
        >
          {groomName}
        </h2>

        <p
          className={`text-[9px] uppercase tracking-[0.3em] font-semibold mt-3 ${
            isDarkCover ? 'text-amber-200' : 'text-[#5c6f68]'
          }`}
        >
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Guest Label */}
      <div className="relative z-10 text-center pb-2">
        <div
          className={`max-w-[270px] mx-auto py-2.5 border-t border-b ${
            isDarkCover
              ? 'border-amber-300/40 text-amber-100'
              : 'border-[#b2533e]/30 text-[#4a3f35]'
          }`}
        >
          <p
            className={`text-[7.5px] uppercase tracking-[0.22em] mb-1 font-sans ${
              isDarkCover ? 'text-amber-200' : 'text-[#5c6f68]'
            }`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-sm font-serif italic font-bold min-h-[20px]">
            {guestNamePrint?.trim() || 'Tamu Undangan Terhormat'}
          </p>
        </div>
      </div>
    </div>
  );

  // SHEET 2: ISI UTAMA (MEMPELAI & KATA PENGANTAR) - A5
  const renderSheet2Couple = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#faf4ee] text-[#4a3f35] border border-[#b2533e]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#b2533e" />}

      {/* Watermark Monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif italic text-[140px] font-bold text-[#b2533e]/[0.035] tracking-widest leading-none">
          {monogram}
        </span>
      </div>

      {selectedTemplateId === 'boho-arch' ? (
        <>
          <div className="absolute inset-4 border-2 border-[#b2533e]/60 rounded-t-[140px] pointer-events-none" />
          <div className="absolute inset-6 border border-[#c18c5d]/40 rounded-t-[130px] pointer-events-none" />
        </>
      ) : selectedTemplateId === 'botanical-crest' ? (
        <>
          <div className="absolute inset-4 border border-[#b2533e]/80 pointer-events-none" />
          <div className="absolute inset-5.5 border-2 border-[#c18c5d]/60 pointer-events-none" />
          <div className="absolute inset-7 border border-dashed border-[#b2533e]/30 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border-2 border-[#b2533e]/60 pointer-events-none" />
          <div className="absolute inset-6 border border-[#c18c5d]/40 pointer-events-none" />
        </>
      )}

      {/* Top Greeting */}
      <div className="text-center pt-7 relative z-10">
        <p className="font-serif text-xs text-[#b2533e] italic mb-1">
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </p>
        <p className="text-[7.8px] text-[#4a3f35]/85 leading-relaxed max-w-[340px] mx-auto italic font-serif">
          Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:
        </p>
      </div>

      {/* Couple Section */}
      <div className="my-auto py-2 text-center relative z-10">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 bg-[#b2533e] text-white text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE BRIDE
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[28px] font-bold text-[#b2533e] leading-tight">
            {brideName}
          </h3>
          <p className="text-[8px] text-[#5c6f68] mt-0.5 font-sans">
            Putri dari {brideParents}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[160px] mx-auto">
          <div className="h-[1px] flex-1 bg-[#b2533e]/40" />
          <span className="font-serif italic text-sm text-[#b2533e]">&amp;</span>
          <div className="h-[1px] flex-1 bg-[#b2533e]/40" />
        </div>

        <div className="mt-1">
          <span className="inline-block px-2.5 py-0.5 bg-[#b2533e] text-white text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE GROOM
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[28px] font-bold text-[#b2533e] leading-tight">
            {groomName}
          </h3>
          <p className="text-[8px] text-[#5c6f68] mt-0.5 font-sans">
            Putra dari {groomParents}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-3 relative z-10 border-t border-[#b2533e]/20 pt-2.5">
        <p className="text-[7.5px] uppercase tracking-[0.22em] text-[#5c6f68] font-semibold mb-1 font-sans">
          Turut Mengundang
        </p>
        <p className="text-[7.5px] text-[#4a3f35] leading-tight font-sans">
          Segenap Keluarga Besar Kedua Mempelai
        </p>
      </div>
    </div>
  );

  // SHEET 3: JADWAL ACARA & DUAL SMART QR CARD - A5
  const renderSheet3Event = ({ showCropMarks, showTurutMengundang, turutMengundangText }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#faf4ee] text-[#4a3f35] border border-[#b2533e]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#b2533e" />}

      {selectedTemplateId === 'boho-arch' ? (
        <>
          <div className="absolute inset-4 border-2 border-[#b2533e]/60 rounded-t-[140px] pointer-events-none" />
          <div className="absolute inset-6 border border-[#c18c5d]/40 rounded-t-[130px] pointer-events-none" />
        </>
      ) : selectedTemplateId === 'botanical-crest' ? (
        <>
          <div className="absolute inset-4 border border-[#b2533e]/80 pointer-events-none" />
          <div className="absolute inset-5.5 border-2 border-[#c18c5d]/60 pointer-events-none" />
          <div className="absolute inset-7 border border-dashed border-[#b2533e]/30 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border-2 border-[#b2533e]/60 pointer-events-none" />
          <div className="absolute inset-6 border border-[#c18c5d]/40 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="text-center pt-7 relative z-10">
        <span className="text-[8.5px] uppercase tracking-[0.32em] font-bold text-[#b2533e] font-sans">
          WAKTU &amp; TEMPAT ACARA
        </span>
      </div>

      {/* Dual Events */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 relative z-10">
        <div className="border border-[#b2533e]/30 bg-[#eedfd2]/40 rounded-2xl p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#b2533e] text-white text-[7px] uppercase font-bold tracking-widest rounded-full font-sans">
            Akad Nikah
          </span>
          <p className="font-serif italic font-bold text-xs text-[#4a3f35] mt-1">
            {formattedDateLong}
          </p>
          <p className="text-[7.5px] font-semibold text-[#5c6f68] mt-0.5 font-sans">
            Pukul {akadTime}
          </p>
          <p className="text-[8px] font-bold text-[#b2533e] mt-1 font-serif">
            {akadLocation}
          </p>
          <p className="text-[7px] text-[#4a3f35]/80 max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {akadAddress}
          </p>
        </div>

        <div className="border border-[#b2533e]/30 bg-[#eedfd2]/40 rounded-2xl p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#b2533e] text-white text-[7px] uppercase font-bold tracking-widest rounded-full font-sans">
            Resepsi Pernikahan
          </span>
          <p className="font-serif italic font-bold text-xs text-[#4a3f35] mt-1">
            {formattedResepsiDate}
          </p>
          <p className="text-[7.5px] font-semibold text-[#5c6f68] mt-0.5 font-sans">
            Pukul {resepsiTime}
          </p>
          <p className="text-[8px] font-bold text-[#b2533e] mt-1 font-serif">
            {resepsiLocation}
          </p>
          <p className="text-[7px] text-[#4a3f35]/80 max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {resepsiAddress}
          </p>
        </div>
      </div>

      {/* Turut Mengundang List */}
      {showTurutMengundang && turutMengundangText?.trim() && (
        <div className="text-center py-1.5 px-3 border-y border-dashed border-[#b2533e]/30 bg-[#eedfd2]/30 relative z-10">
          <span className="text-[7px] uppercase tracking-[0.25em] font-bold text-[#b2533e] block mb-0.5">
            Turut Mengundang:
          </span>
          <div className="text-[7.5px] text-[#5c6f68] leading-snug space-y-0.5">
            {turutMengundangText
              .split('\n')
              .filter((l) => l.trim())
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {/* Dual Scannable QR Codes: Online + Maps */}
      <div className="grid grid-cols-2 gap-2.5 my-1 relative z-10">
        <UniversalQrBox
          url={onlineUrl}
          label="Undangan Digital"
          sublabel="Scan RSVP & Ucapan"
          colorDark="#b2533e"
          borderColor="#b2533e"
        />
        <UniversalQrBox
          url={mapsUrl}
          label="Lokasi Acara"
          sublabel={resepsiLocation}
          colorDark="#b2533e"
          borderColor="#b2533e"
        />
      </div>

      {/* Footer Closing */}
      <div className="text-center pb-2 relative z-10">
        <p className="text-[7.5px] text-[#5c6f68] italic font-serif">
          Merupakan suatu kehormatan bagi kami atas kehadiran dan doa restu Anda.
        </p>
        <p className="font-serif italic font-bold text-xs text-[#b2533e] mt-0.5">
          {brideShort} &amp; {groomShort}
        </p>
      </div>
    </div>
  );

  // SHEET 4: SOUVENIR KARTU & BELLY BAND - A5
  const renderSheet4Souvenir = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#faf4ee] text-[#4a3f35] border border-[#b2533e]/30 p-6 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#b2533e" />}

      <div className="text-center border-b border-dashed border-[#b2533e]/40 pb-1.5">
        <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-[#b2533e] font-sans">
          ✂ LEMBAR AKSESORIS TERRA BOTANICA &bull; SIAP GUNTING ✂
        </span>
        <p className="text-[7px] text-[#5c6f68] mt-0.5 font-sans">
          Gunting mengikuti garis putus-putus untuk kartu souvenir &amp; pita pengikat amplop.
        </p>
      </div>

      {/* 4x Souvenir Coupons */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#5c6f68] font-bold block mb-1">
          1. Kupon Penukaran Souvenir (4 Pcs)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-dashed border-[#b2533e]/50 p-2.5 bg-[#eedfd2]/30 rounded-xl flex flex-col justify-between h-[92px] text-center relative"
            >
              <div className="flex items-center justify-between text-[6.5px] text-[#5c6f68]">
                <span>BOHO PASS #{i}</span>
                <span className="text-[6.5px] font-bold text-[#b2533e]">&bull; VOUCHER &bull;</span>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-semibold text-[#5c6f68]">
                  Terima Kasih
                </p>
                <p className="font-serif italic font-bold text-sm text-[#b2533e] leading-tight">
                  {brideShort} &amp; {groomShort}
                </p>
                <p className="text-[6.5px] text-[#4a3f35]/80 mt-0.5">
                  Kupon Penukaran Souvenir
                </p>
              </div>
              <div className="border-t border-[#b2533e]/20 pt-0.5 text-[6.5px] text-[#5c6f68]">
                {formattedDateShort}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2x Thank You Tags with Ribbon Hole */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#5c6f68] font-bold block mb-1">
          2. Kartu Ucapan Terima Kasih (Thank You Tag)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2].map((num) => (
            <div
              key={num}
              className="border border-dashed border-[#b2533e]/50 p-2.5 bg-white rounded-xl flex flex-col items-center justify-center text-center relative"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-[#b2533e] mb-1" />
              <span className="text-[6.5px] uppercase tracking-widest text-[#5c6f68]">
                TERIMA KASIH ATAS KEHADIRAN ANDA
              </span>
              <p className="font-serif italic font-bold text-base text-[#b2533e] my-0.5">
                {brideName} &amp; {groomName}
              </p>
              <span className="text-[7px] uppercase tracking-[0.2em] font-semibold text-[#c18c5d]">
                {formattedDateUpper}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1x Belly Band (Pita Amplop) */}
      <div className="border border-dashed border-[#b2533e]/50 bg-[#b2533e] text-white rounded-xl p-2.5 text-center">
        <div className="flex items-center justify-between text-[6.5px] text-amber-100/70 uppercase tracking-widest font-sans mb-1">
          <span>PITA AMPLOP TERRACOTTA / BELLY BAND</span>
          <span className="font-mono text-[7px]">{formattedDateShort}</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-white/40" />
          <div className="text-center">
            <span className="font-serif italic text-base tracking-widest font-bold">
              {monogram}
            </span>
            <span className="block text-[7px] uppercase tracking-[0.25em] text-amber-100 font-sans">
              {formattedDateUpper}
            </span>
          </div>
          <div className="h-[1px] w-12 bg-white/40" />
        </div>
      </div>
    </div>
  );

  return (
    <BasePrintSuiteEngine
      suiteTitle="Desain Undangan Fisik • Terra Botanica"
      suiteBadge="Terra Botanica Haute Suite • A5 Print Ready"
      suiteSubtitle="Format cetak presisi A5, aksen arch boho, kupon souvenir, & belly band terracotta"
      accentColor="#b2533e"
      invitation={invitation}
      embeddedInDashboard={embeddedInDashboard}
      templates={TEMPLATES}
      selectedTemplateId={selectedTemplateId}
      onSelectTemplateId={setSelectedTemplateId}
      paperThemes={PAPER_THEMES}
      selectedPaperTheme={selectedPaperTheme}
      onSelectPaperTheme={setSelectedPaperTheme}
      renderSheet1Cover={renderSheet1Cover}
      renderSheet2Couple={renderSheet2Couple}
      renderSheet3Event={renderSheet3Event}
      renderSheet4Souvenir={renderSheet4Souvenir}
    />
  );
}
