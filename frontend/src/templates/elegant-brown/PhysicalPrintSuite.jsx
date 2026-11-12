import React, { useState } from 'react';
import BasePrintSuiteEngine, {
  UniversalCropMarks,
  UniversalQrBox,
  UniversalCircularSeal,
} from '../shared/print/BasePrintSuiteEngine';
import './style.css';

/**
 * Royal Mocha (elegant-brown) Physical Print Suite
 * Built on BasePrintSuiteEngine & calibrated with Mocha Mousse / Vintage Paper Design Tokens:
 * 3 Template Pilihan Cetak Fisik:
 * 1. 'royal-medallion' (Template 1: Ornate Vintage Medallion & Double Gold Frame)
 * 2. 'victorian-border' (Template 2: Victorian Classic Flourish & Filigree Corner)
 * 3. 'minimal-luxury' (Template 3: Clean Mocha Editorial with Gold Line Accents)
 */

const TEMPLATES = [
  {
    id: 'royal-medallion',
    name: 'Template 1: Royal Medallion',
    description: 'Medali bulat monogram cokelat moka dengan ornamen sudut klasik & bingkai emas ganda',
  },
  {
    id: 'victorian-border',
    name: 'Template 2: Victorian Flourish',
    description: 'Bingkai sudut victorian klasik dengan garis lengkung mewah khas istana',
  },
  {
    id: 'minimal-luxury',
    name: 'Template 3: Minimal Luxury Mocha',
    description: 'Tata letak modern mewah dalam palet cokelat moka bersih dan garis hairline emas',
  },
];

const PAPER_THEMES = [
  { id: 'cream-ivory', label: 'Krem Gading Mewah (Warm Ivory Paper)', isDark: false },
  { id: 'clean-cotton', label: 'Putih Bersih (Hemat Tinta)', isDark: false },
  { id: 'royal-mocha-dark', label: 'Sampul Royal Mocha Dark Obsidian', isDark: true },
];

function VintageCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 36 L4 4 L36 4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 28 L12 12 L28 12" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <circle cx="36" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="36" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 w-full my-2.5 ${className}`}>
      <div className="h-[1px] flex-1 max-w-[85px] bg-[#d4af37]/60" />
      <div className="flex items-center gap-1 text-[#d4af37]">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
        </svg>
      </div>
      <div className="h-[1px] flex-1 max-w-[85px] bg-[#d4af37]/60" />
    </div>
  );
}

export default function ElegantBrownPrintSuite({ invitation, embeddedInDashboard = false }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('royal-medallion');
  const [selectedPaperTheme, setSelectedPaperTheme] = useState('cream-ivory');

  const brideName = invitation?.bride_name || 'Kirana Larasati';
  const groomName = invitation?.groom_name || 'Bagas Prakoso';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Kirana';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Bagas';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const brideParents =
    invitation?.bride_parents || 'Bapak H. Prabowo Santoso & Ibu Hj. Retno Wulan';
  const groomParents =
    invitation?.groom_parents || 'Bapak H. Sudirman & Ibu Hj. Nurhayati';

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-08-08';
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

  const akadTime = `${invitation?.akad_time?.slice(0, 5) || '08:00'} WIB - Selesai`;
  const resepsiTime = `${invitation?.resepsi_time?.slice(0, 5) || '11:00'} WIB - Selesai`;

  const akadLocation = invitation?.akad_location || 'Masjid Sunda Kelapa';
  const akadAddress =
    invitation?.akad_address || 'Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat';
  const resepsiLocation =
    invitation?.resepsi_location || 'Bali Room Hotel Indonesia Kempinski';
  const resepsiAddress =
    invitation?.resepsi_address || 'Jl. M.H. Thamrin No. 1, Jakarta Pusat';

  const slug = invitation?.slug || 'kirana-bagas';
  const onlineUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : `https://invitory.id/${slug}`;
  const mapsUrl =
    invitation?.resepsi_map_url ||
    invitation?.akad_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(resepsiLocation)}`;

  const coverPhotoSrc =
    invitation?.cover_photo_url ||
    invitation?.hero_image_url ||
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80';

  const isDarkCover = selectedPaperTheme === 'royal-mocha-dark';
  const paperBgClass =
    selectedPaperTheme === 'clean-cotton'
      ? 'bg-white text-[#2b1b17]'
      : selectedPaperTheme === 'royal-mocha-dark'
      ? 'bg-[#3d261d] text-[#fbf5b7]'
      : 'bg-[#fbf8f3] text-[#2b1b17]';

  // SHEET 1: SAMPUL DEPAN (A5)
  const renderSheet1Cover = ({ showCropMarks, showIllustration, guestNamePrint }) => (
    <div
      className={`print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl ${paperBgClass} border border-[#8b5a2b]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && <UniversalCropMarks color={isDarkCover ? '#fde68a' : '#8b5a2b'} />}

      {/* Ornate Borders per Template */}
      {selectedTemplateId === 'victorian-border' ? (
        <>
          <div
            className={`absolute inset-4 border pointer-events-none ${
              isDarkCover ? 'border-[#fbf5b7]/70' : 'border-[#8b5a2b]'
            }`}
          />
          <div
            className={`absolute inset-5.5 border-2 pointer-events-none ${
              isDarkCover ? 'border-[#d4af37]/60' : 'border-[#d4af37]/80'
            }`}
          />
          <div
            className={`absolute inset-7 border border-dashed pointer-events-none ${
              isDarkCover ? 'border-[#fbf5b7]/20' : 'border-[#8b5a2b]/30'
            }`}
          />
        </>
      ) : selectedTemplateId === 'minimal-luxury' ? (
        <>
          <div
            className={`absolute inset-3 border-2 pointer-events-none ${
              isDarkCover ? 'border-[#fbf5b7]' : 'border-[#8b5a2b]'
            }`}
          />
          <div
            className={`absolute inset-5 border pointer-events-none ${
              isDarkCover ? 'border-[#d4af37]/50' : 'border-[#d4af37]/40'
            }`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-4 border-2 pointer-events-none ${
              isDarkCover ? 'border-[#fbf5b7]' : 'border-[#8b5a2b]/70'
            }`}
          />
          <div
            className={`absolute inset-5.5 border pointer-events-none ${
              isDarkCover ? 'border-[#d4af37]/60' : 'border-[#d4af37]/60'
            }`}
          />
        </>
      )}

      {/* Vintage Corners */}
      <div className={`absolute top-6 left-6 w-12 h-12 pointer-events-none opacity-85 ${isDarkCover ? 'text-[#fbf5b7]' : 'text-[#8b5a2b]'}`}>
        <VintageCorner className="w-full h-full" />
      </div>
      <div className={`absolute top-6 right-6 w-12 h-12 pointer-events-none opacity-85 scale-x-[-1] ${isDarkCover ? 'text-[#fbf5b7]' : 'text-[#8b5a2b]'}`}>
        <VintageCorner className="w-full h-full" />
      </div>
      <div className={`absolute bottom-6 left-6 w-12 h-12 pointer-events-none opacity-85 scale-y-[-1] ${isDarkCover ? 'text-[#fbf5b7]' : 'text-[#8b5a2b]'}`}>
        <VintageCorner className="w-full h-full" />
      </div>
      <div className={`absolute bottom-6 right-6 w-12 h-12 pointer-events-none opacity-85 scale-[-1] ${isDarkCover ? 'text-[#fbf5b7]' : 'text-[#8b5a2b]'}`}>
        <VintageCorner className="w-full h-full" />
      </div>

      {/* Top Header */}
      <div className="text-center pt-5 relative z-10">
        <span
          className={`inline-block px-4 py-1 text-[8px] uppercase tracking-[0.38em] font-semibold ${
            isDarkCover ? 'bg-[#fbf5b7] text-[#3d261d]' : 'bg-[#3d261d] text-[#fbf5b7]'
          }`}
        >
          WALIMATUL 'URS
        </span>
        <p
          className={`text-[8.5px] uppercase tracking-[0.32em] font-semibold mt-2.5 ${
            isDarkCover ? 'text-[#d4af37]' : 'text-[#8b5a2b]'
          }`}
        >
          ROYAL WEDDING CELEBRATION
        </p>
      </div>

      {/* Center Monogram / Couple Illustration & Names */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 text-center">
        {selectedTemplateId === 'victorian-border' ? (
          /* Template 2: Victorian Flourish Monogram */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-28 h-28 border-2 flex items-center justify-center mb-2 shadow-md ${
                isDarkCover
                  ? 'border-[#d4af37] bg-[#24130c] text-[#fbf5b7]'
                  : 'border-[#d4af37] bg-[#3d261d] text-[#fbf5b7]'
              }`}
            >
              <span className="font-serif italic text-3xl font-bold tracking-widest">
                {monogram}
              </span>
            </div>
            <p className="text-[7.5px] uppercase tracking-[0.3em] font-semibold text-[#8b5a2b]">
              THE ROYAL NUPTIALS
            </p>
          </div>
        ) : selectedTemplateId === 'minimal-luxury' ? (
          /* Template 3: Rectangular Photo Frame */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-28 h-36 border-2 p-1 bg-white shadow-md flex items-center justify-center relative ${
                isDarkCover ? 'border-[#fbf5b7]' : 'border-[#8b5a2b]'
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
                <span className="font-serif italic text-2xl font-bold tracking-widest text-[#3d261d]">
                  {monogram}
                </span>
              )}
              <div
                className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-[8px] font-bold text-[#fbf5b7] bg-[#3d261d] border border-[#d4af37]`}
              >
                {monogram}
              </div>
            </div>
          </div>
        ) : (
          /* Template 1: Circular Medallion */
          showIllustration ? (
            <div className="relative mb-3">
              <div className="absolute -inset-4 pointer-events-none">
                <UniversalCircularSeal
                  id="mochaSealCover"
                  text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • ROYAL MOCHA • `}
                  color={isDarkCover ? '#fef3c7' : '#8b5a2b'}
                />
              </div>
              <div
                className={`w-32 h-32 rounded-full border-2 p-1.5 bg-white shadow-md flex items-center justify-center relative ${
                  isDarkCover ? 'border-[#fbf5b7]' : 'border-[#8b5a2b]'
                }`}
              >
                <div className="w-full h-full rounded-full border border-dashed border-[#8b5a2b]/30 overflow-hidden bg-white">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1.5 right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-serif italic font-bold shadow-sm ${
                    isDarkCover ? 'bg-[#fbf5b7] text-[#3d261d]' : 'bg-[#3d261d] text-[#fbf5b7]'
                  }`}
                >
                  {monogram}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-3 shadow-md ${
                isDarkCover
                  ? 'border-[#d4af37] bg-[#24130c] text-[#fbf5b7]'
                  : 'border-[#d4af37] bg-[#3d261d] text-[#fbf5b7]'
              }`}
            >
              <span className="font-serif italic text-2xl font-bold tracking-wider">
                {monogram}
              </span>
            </div>
          )
        )}

        <h1
          className={`font-serif italic text-4xl sm:text-[46px] leading-none ${
            isDarkCover ? 'text-[#fbf5b7]' : 'text-[#3d261d]'
          }`}
        >
          {brideName}
        </h1>
        <div className="my-1.5">
          <GoldDivider />
        </div>
        <h2
          className={`font-serif italic text-4xl sm:text-[46px] leading-none ${
            isDarkCover ? 'text-[#fbf5b7]' : 'text-[#3d261d]'
          }`}
        >
          {groomName}
        </h2>

        <p
          className={`text-[9px] uppercase tracking-[0.3em] font-bold mt-3 ${
            isDarkCover ? 'text-[#d4af37]' : 'text-[#8b5a2b]'
          }`}
        >
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Guest Box */}
      <div className="relative z-10 text-center pb-2">
        <div
          className={`max-w-[280px] mx-auto border p-3 shadow-2xs ${
            isDarkCover
              ? 'border-[#fbf5b7]/40 bg-[#2b170e]/90 text-[#fbf5b7]'
              : 'border-[#8b5a2b]/30 bg-[#f4ece1]/80 text-[#3d261d]'
          }`}
        >
          <p
            className={`text-[7.5px] uppercase tracking-[0.22em] mb-1 font-sans ${
              isDarkCover ? 'text-[#d4af37]' : 'text-[#8b5a2b]'
            }`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-sm font-serif italic font-bold min-h-[22px]">
            {guestNamePrint?.trim() || 'Tamu Undangan Terhormat'}
          </p>
          <p
            className={`text-[7px] tracking-widest uppercase mt-0.5 font-sans ${
              isDarkCover ? 'text-[#d4af37]/80' : 'text-[#8b5a2b]'
            }`}
          >
            Di Tempat
          </p>
        </div>
      </div>
    </div>
  );

  // SHEET 2: ISI UTAMA (MEMPELAI & KUTIPAN SAKRAL) - A5
  const renderSheet2Couple = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fbf8f3] text-[#2b1b17] border border-[#8b5a2b]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#8b5a2b" />}

      {/* Watermark Monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif italic text-[140px] font-bold text-[#8b5a2b]/[0.035] tracking-widest leading-none">
          {monogram}
        </span>
      </div>

      {selectedTemplateId === 'victorian-border' ? (
        <>
          <div className="absolute inset-4 border border-[#8b5a2b] pointer-events-none" />
          <div className="absolute inset-5.5 border-2 border-[#d4af37]/80 pointer-events-none" />
          <div className="absolute inset-7 border border-dashed border-[#8b5a2b]/30 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'minimal-luxury' ? (
        <>
          <div className="absolute inset-3 border-2 border-[#8b5a2b] pointer-events-none" />
          <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border-2 border-[#8b5a2b]/70 pointer-events-none" />
          <div className="absolute inset-5.5 border border-[#d4af37]/60 pointer-events-none" />
        </>
      )}

      {/* Top Ayat */}
      <div className="text-center pt-4 relative z-10">
        <p className="font-serif text-sm text-[#8b5a2b] italic mb-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[7.8px] text-[#5c3a21] leading-relaxed max-w-[340px] mx-auto italic font-serif">
          &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <p className="text-[7.5px] uppercase tracking-widest font-bold text-[#3d261d] mt-1 font-sans">
          (QS. Ar-Rum: 21)
        </p>
      </div>

      {/* Couple Profiles */}
      <div className="my-auto py-2 text-center relative z-10">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 bg-[#3d261d] text-[#fbf5b7] text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE BRIDE
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[28px] font-bold text-[#3d261d] leading-tight">
            {brideName}
          </h3>
          <p className="text-[8px] text-[#8b5a2b] mt-0.5 font-sans">
            Putri tercinta dari {brideParents}
          </p>
        </div>

        <div className="flex items-center justify-center my-2">
          <GoldDivider />
        </div>

        <div className="mt-1">
          <span className="inline-block px-2.5 py-0.5 bg-[#3d261d] text-[#fbf5b7] text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE GROOM
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[28px] font-bold text-[#3d261d] leading-tight">
            {groomName}
          </h3>
          <p className="text-[8px] text-[#8b5a2b] mt-0.5 font-sans">
            Putra tercinta dari {groomParents}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-3 relative z-10 border-t border-[#8b5a2b]/20 pt-2.5">
        <p className="text-[7.5px] uppercase tracking-[0.22em] text-[#8b5a2b] font-bold mb-1 font-sans">
          Turut Mengundang
        </p>
        <p className="text-[7.5px] text-[#3d261d] leading-tight font-sans">
          Keluarga Besar Bpk. H. Prabowo Santoso &amp; Bpk. H. Sudirman
        </p>
      </div>
    </div>
  );

  // SHEET 3: JADWAL ACARA & DUAL SMART QR PASS - A5
  const renderSheet3Event = ({ showCropMarks, showTurutMengundang, turutMengundangText }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fbf8f3] text-[#2b1b17] border border-[#8b5a2b]/30 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#8b5a2b" />}

      {selectedTemplateId === 'victorian-border' ? (
        <>
          <div className="absolute inset-4 border border-[#8b5a2b] pointer-events-none" />
          <div className="absolute inset-5.5 border-2 border-[#d4af37]/80 pointer-events-none" />
          <div className="absolute inset-7 border border-dashed border-[#8b5a2b]/30 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'minimal-luxury' ? (
        <>
          <div className="absolute inset-3 border-2 border-[#8b5a2b] pointer-events-none" />
          <div className="absolute inset-5 border border-[#d4af37]/40 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border-2 border-[#8b5a2b]/70 pointer-events-none" />
          <div className="absolute inset-5.5 border border-[#d4af37]/60 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="text-center pt-4 relative z-10">
        <span className="text-[8.5px] uppercase tracking-[0.32em] font-bold text-[#3d261d] font-sans">
          RANGKAIAN ACARA PERNIKAHAN
        </span>
      </div>

      {/* Dual Events */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 relative z-10">
        <div className="border border-[#8b5a2b]/30 bg-[#f4ece1]/60 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#3d261d] text-[#fbf5b7] text-[7px] uppercase font-bold tracking-widest font-sans">
            Akad Nikah
          </span>
          <p className="font-serif italic font-bold text-xs text-[#3d261d] mt-1">
            {formattedDateLong}
          </p>
          <p className="text-[7.5px] font-semibold text-[#8b5a2b] mt-0.5 font-sans">
            Pukul {akadTime}
          </p>
          <p className="text-[8px] font-bold text-[#3d261d] mt-1 font-serif">
            {akadLocation}
          </p>
          <p className="text-[7px] text-[#5c3a21] max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {akadAddress}
          </p>
        </div>

        <div className="border border-[#8b5a2b]/30 bg-[#f4ece1]/60 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#3d261d] text-[#fbf5b7] text-[7px] uppercase font-bold tracking-widest font-sans">
            Resepsi Pernikahan
          </span>
          <p className="font-serif italic font-bold text-xs text-[#3d261d] mt-1">
            {formattedResepsiDate}
          </p>
          <p className="text-[7.5px] font-semibold text-[#8b5a2b] mt-0.5 font-sans">
            Pukul {resepsiTime}
          </p>
          <p className="text-[8px] font-bold text-[#3d261d] mt-1 font-serif">
            {resepsiLocation}
          </p>
          <p className="text-[7px] text-[#5c3a21] max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {resepsiAddress}
          </p>
        </div>
      </div>

      {/* Turut Mengundang List */}
      {showTurutMengundang && turutMengundangText?.trim() && (
        <div className="text-center py-1.5 px-3 border-y border-dashed border-[#8b5a2b]/30 bg-[#f4ece1]/40 relative z-10">
          <span className="text-[7px] uppercase tracking-[0.25em] font-bold text-[#3d261d] block mb-0.5">
            Turut Mengundang:
          </span>
          <div className="text-[7.5px] text-[#5c3a21] leading-snug space-y-0.5">
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
          colorDark="#3d261d"
          borderColor="#8b5a2b"
        />
        <UniversalQrBox
          url={mapsUrl}
          label="Lokasi Acara"
          sublabel={resepsiLocation}
          colorDark="#3d261d"
          borderColor="#8b5a2b"
        />
      </div>

      {/* Footer */}
      <div className="text-center pb-2 relative z-10">
        <p className="text-[7.5px] text-[#5c3a21] italic font-serif">
          Kehormatan dan kebahagiaan bagi kami atas kehadiran dan doa restu Anda.
        </p>
        <p className="font-serif italic font-bold text-xs text-[#3d261d] mt-0.5">
          {brideShort} &amp; {groomShort}
        </p>
      </div>
    </div>
  );

  // SHEET 4: SOUVENIR KARTU & BELLY BAND - A5
  const renderSheet4Souvenir = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fbf8f3] text-[#2b1b17] border border-[#8b5a2b]/30 p-6 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#8b5a2b" />}

      <div className="text-center border-b border-dashed border-[#8b5a2b]/40 pb-1.5">
        <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-[#3d261d] font-sans">
          ✂ LEMBAR AKSESORIS ROYAL MOCHA &bull; SIAP GUNTING ✂
        </span>
        <p className="text-[7.5px] text-[#8b5a2b] mt-0.5 font-sans">
          Potong mengikuti garis batas untuk kartu penukaran souvenir dan pita amplop royal.
        </p>
      </div>

      {/* 4x Souvenir Coupons */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#8b5a2b] font-bold block mb-1">
          1. Kupon Penukaran Souvenir (4 Pcs)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-dashed border-[#8b5a2b]/50 p-2.5 bg-[#f4ece1]/50 flex flex-col justify-between h-[92px] text-center relative"
            >
              <div className="flex items-center justify-between text-[6.5px] text-[#8b5a2b]">
                <span>ROYAL #{i}</span>
                <span className="text-[6.5px] font-bold text-[#d4af37]">&bull; VOUCHER &bull;</span>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-semibold text-[#8b5a2b]">
                  Terima Kasih
                </p>
                <p className="font-serif italic font-bold text-sm text-[#3d261d] leading-tight">
                  {brideShort} &amp; {groomShort}
                </p>
                <p className="text-[6.5px] text-[#5c3a21] mt-0.5">
                  Kupon Penukaran Souvenir
                </p>
              </div>
              <div className="border-t border-[#8b5a2b]/20 pt-0.5 text-[6.5px] text-[#8b5a2b]">
                {formattedDateShort}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2x Thank You Tags with Ribbon Hole */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#8b5a2b] font-bold block mb-1">
          2. Kartu Ucapan Terima Kasih (Thank You Tag)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2].map((num) => (
            <div
              key={num}
              className="border border-dashed border-[#8b5a2b]/50 p-2.5 bg-white flex flex-col items-center justify-center text-center relative"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-[#8b5a2b] mb-1" />
              <span className="text-[6.5px] uppercase tracking-widest text-[#8b5a2b]">
                TERIMA KASIH ATAS DOA RESTU ANDA
              </span>
              <p className="font-serif italic font-bold text-base text-[#3d261d] my-0.5">
                {brideName} &amp; {groomName}
              </p>
              <span className="text-[7px] uppercase tracking-[0.2em] font-semibold text-[#d4af37]">
                {formattedDateUpper}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1x Belly Band (Pita Amplop) */}
      <div className="border border-dashed border-[#8b5a2b]/50 bg-[#3d261d] text-[#fbf5b7] p-2.5 text-center">
        <div className="flex items-center justify-between text-[6.5px] text-[#d4af37] uppercase tracking-widest font-sans mb-1">
          <span>PITA AMPLOP / BELLY BAND ROYAL MOCHA</span>
          <span className="font-mono text-[7px]">{formattedDateShort}</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-[#d4af37]/50" />
          <div className="text-center">
            <span className="font-serif italic text-base tracking-widest font-bold">
              {monogram}
            </span>
            <span className="block text-[7px] uppercase tracking-[0.25em] text-[#d4af37] font-sans">
              {formattedDateUpper}
            </span>
          </div>
          <div className="h-[1px] w-12 bg-[#d4af37]/50" />
        </div>
      </div>
    </div>
  );

  return (
    <BasePrintSuiteEngine
      suiteTitle="Desain Undangan Fisik • Royal Mocha"
      suiteBadge="Royal Mocha Haute Suite • A5 Print Ready"
      suiteSubtitle="Format cetak presisi A5, balutan cokelat moka & emas, kupon souvenir, & belly band siap cetak"
      accentColor="#3d261d"
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
