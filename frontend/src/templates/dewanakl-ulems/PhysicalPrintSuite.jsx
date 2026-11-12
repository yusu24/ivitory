import React, { useState } from 'react';
import BasePrintSuiteEngine, {
  UniversalCropMarks,
  UniversalQrBox,
  UniversalCircularSeal,
} from '../shared/print/BasePrintSuiteEngine';
import './style.css';

/**
 * Lumina Glass (dewanakl-ulems) Physical Print Suite
 * Built on BasePrintSuiteEngine & calibrated with Modern Minimal / Clean Slate Design Tokens:
 * 3 Template Pilihan Cetak Fisik:
 * 1. 'modern-acrylic' (Template 1: Modern Translucent Acrylic & Hairline Double Frame)
 * 2. 'editorial-monogram' (Template 2: Clean Typography & Giant Centered Monogram)
 * 3. 'minimal-wave' (Template 3: Contemporary Minimal dengan fokus pada ruang putih & aksen garis tipis)
 */

const TEMPLATES = [
  {
    id: 'modern-acrylic',
    name: 'Template 1: Modern Acrylic Look',
    description: 'Tata letak modern hairline dengan medali monogram bundar dan tipografi estetik',
  },
  {
    id: 'editorial-monogram',
    name: 'Template 2: Editorial Monogram',
    description: 'Tipografi editorial bersih dengan inisial mempelai melingkar dan bingkai presisi',
  },
  {
    id: 'minimal-wave',
    name: 'Template 3: Contemporary Minimal',
    description: 'Desain ultra-modern kontemporer dengan aksen garis minimal dan fokus tipografi',
  },
];

const PAPER_THEMES = [
  { id: 'pure-white', label: 'Putih Murni (Ultra White Card)', isDark: false },
  { id: 'frost-gray', label: 'Abu Es Halus (Frosted Gray)', isDark: false },
  { id: 'obsidian-black', label: 'Sampul Obsidian Black + Tinta Putih', isDark: true },
];

export default function LuminaGlassPrintSuite({ invitation, embeddedInDashboard = false }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern-acrylic');
  const [selectedPaperTheme, setSelectedPaperTheme] = useState('pure-white');

  const brideName = invitation?.bride_name || 'Clarissa Aurelia Putri';
  const groomName = invitation?.groom_name || 'Aditya Mahendra';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Clarissa';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Aditya';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const brideParents =
    invitation?.bride_parents || 'Bapak Darmawan & Ibu Lilis Suryani';
  const groomParents =
    invitation?.groom_parents || 'Bapak Gunawan & Ibu Rina Kusuma';

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-05-22';
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

  const akadTime = `${invitation?.akad_time?.slice(0, 5) || '09:00'} WITA - Selesai`;
  const resepsiTime = `${invitation?.resepsi_time?.slice(0, 5) || '16:00'} WITA - Selesai`;

  const akadLocation = invitation?.akad_location || 'The Glass House Tirtha';
  const akadAddress =
    invitation?.akad_address || 'Jl. Karang Mas, Uluwatu, Badung, Bali';
  const resepsiLocation = invitation?.resepsi_location || 'Cliffside Lawn Uluwatu';
  const resepsiAddress =
    invitation?.resepsi_address || 'Uluwatu, Kabupaten Badung, Bali';

  const slug = invitation?.slug || 'clarissa-aditya';
  const onlineUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/${slug}` : `https://invitory.id/${slug}`;
  const mapsUrl =
    invitation?.resepsi_map_url ||
    invitation?.akad_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(resepsiLocation)}`;

  const coverPhotoSrc =
    invitation?.cover_photo_url ||
    invitation?.hero_image_url ||
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80';

  const isDarkCover = selectedPaperTheme === 'obsidian-black';
  const paperBgClass =
    selectedPaperTheme === 'frost-gray'
      ? 'bg-slate-100/90 text-slate-900'
      : selectedPaperTheme === 'obsidian-black'
      ? 'bg-zinc-950 text-white'
      : 'bg-white text-slate-900';

  // SHEET 1: SAMPUL DEPAN (A5)
  const renderSheet1Cover = ({ showCropMarks, showIllustration, guestNamePrint }) => (
    <div
      className={`print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl ${paperBgClass} border border-slate-300 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none font-josefin`}
    >
      {showCropMarks && <UniversalCropMarks color={isDarkCover ? '#94a3b8' : '#334155'} />}

      {/* Modern Hairline Frame per Template */}
      {selectedTemplateId === 'editorial-monogram' ? (
        <>
          <div
            className={`absolute inset-4 border pointer-events-none ${
              isDarkCover ? 'border-white/70' : 'border-slate-900/70'
            }`}
          />
          <div
            className={`absolute inset-6 border border-dashed pointer-events-none ${
              isDarkCover ? 'border-white/20' : 'border-slate-300'
            }`}
          />
        </>
      ) : selectedTemplateId === 'minimal-wave' ? (
        <>
          <div
            className={`absolute inset-3 border-2 pointer-events-none ${
              isDarkCover ? 'border-white/90' : 'border-slate-900'
            }`}
          />
          <div
            className={`absolute inset-5 border pointer-events-none ${
              isDarkCover ? 'border-white/30' : 'border-slate-200'
            }`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-4 border pointer-events-none ${
              isDarkCover ? 'border-white/80' : 'border-slate-900/80'
            }`}
          />
          <div
            className={`absolute inset-5.5 border pointer-events-none ${
              isDarkCover ? 'border-white/20' : 'border-slate-200'
            }`}
          />
        </>
      )}

      {/* Top Header */}
      <div className="text-center pt-5 relative z-10">
        <span
          className={`inline-block px-3.5 py-1 text-[8px] uppercase tracking-[0.35em] font-semibold ${
            isDarkCover ? 'bg-white text-zinc-950' : 'bg-slate-900 text-white'
          }`}
        >
          WEDDING INVITATION
        </span>
        <p
          className={`text-[8.5px] uppercase tracking-[0.3em] font-medium mt-2 ${
            isDarkCover ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          THE UNION OF TWO HEARTS
        </p>
      </div>

      {/* Center Calligraphy Names & Monogram */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 text-center">
        {selectedTemplateId === 'editorial-monogram' ? (
          /* Template 2: Giant Monogram Centered */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center mb-2 shadow-sm ${
                isDarkCover
                  ? 'border-white bg-zinc-900 text-white'
                  : 'border-slate-900 bg-slate-50 text-slate-900'
              }`}
            >
              <span className="font-esthetic text-5xl">{monogram}</span>
            </div>
            <p className="text-[7.5px] uppercase tracking-[0.3em] font-bold text-slate-400">
              EST. {dateObj.getFullYear()}
            </p>
          </div>
        ) : selectedTemplateId === 'minimal-wave' ? (
          /* Template 3: Clean Rectangular Card */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-28 h-36 border p-1 flex items-center justify-center relative shadow-sm ${
                isDarkCover
                  ? 'border-white bg-zinc-900'
                  : 'border-slate-900 bg-slate-50'
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
                <span className="font-esthetic text-4xl text-slate-900">{monogram}</span>
              )}
            </div>
          </div>
        ) : (
          /* Template 1: Circular Seal with Photo */
          showIllustration ? (
            <div className="relative mb-3">
              <div className="absolute -inset-4 pointer-events-none">
                <UniversalCircularSeal
                  id="luminaSealCover"
                  text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • LUMINA GLASS • `}
                  color={isDarkCover ? '#cbd5e1' : '#64748b'}
                />
              </div>
              <div
                className={`w-32 h-32 rounded-full border-2 p-1 bg-white shadow-md flex items-center justify-center relative ${
                  isDarkCover ? 'border-white' : 'border-slate-900'
                }`}
              >
                <div className="w-full h-full rounded-full border border-dashed border-slate-300 overflow-hidden bg-white">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1.5 right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-sm ${
                    isDarkCover ? 'bg-white text-zinc-950' : 'bg-slate-900 text-white'
                  }`}
                >
                  {monogram}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-20 h-20 rounded-full border flex items-center justify-center mb-3 shadow-xs ${
                isDarkCover
                  ? 'border-white bg-zinc-900 text-white'
                  : 'border-slate-900 bg-slate-50 text-slate-900'
              }`}
            >
              <span className="font-esthetic text-4xl">{monogram}</span>
            </div>
          )
        )}

        <h1 className="font-esthetic text-5xl sm:text-[54px] leading-tight">
          {brideName}
        </h1>
        <div className="flex items-center justify-center gap-3 my-1">
          <div className={`w-10 h-[1px] ${isDarkCover ? 'bg-white/30' : 'bg-slate-300'}`} />
          <span className="font-serif italic text-base opacity-75">&amp;</span>
          <div className={`w-10 h-[1px] ${isDarkCover ? 'bg-white/30' : 'bg-slate-300'}`} />
        </div>
        <h2 className="font-esthetic text-5xl sm:text-[54px] leading-tight">
          {groomName}
        </h2>

        <p
          className={`text-[9px] uppercase tracking-[0.3em] font-bold mt-4 ${
            isDarkCover ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Guest Label Box */}
      <div className="relative z-10 text-center pb-2">
        <div
          className={`max-w-[270px] mx-auto border p-3 shadow-2xs ${
            isDarkCover
              ? 'border-white/40 bg-zinc-900/90 text-white'
              : 'border-slate-300 bg-slate-50/80 text-slate-900'
          }`}
        >
          <p
            className={`text-[7.5px] uppercase tracking-[0.22em] mb-1 ${
              isDarkCover ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-sm font-serif italic font-bold min-h-[22px]">
            {guestNamePrint?.trim() || 'Tamu Undangan Terhormat'}
          </p>
          <p
            className={`text-[7px] tracking-widest uppercase mt-0.5 ${
              isDarkCover ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Di Tempat
          </p>
        </div>
      </div>
    </div>
  );

  // SHEET 2: ISI UTAMA (MEMPELAI & AYAT) - A5
  const renderSheet2Couple = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-white text-slate-900 border border-slate-300 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none font-josefin">
      {showCropMarks && <UniversalCropMarks color="#334155" />}

      {/* Watermark Monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-esthetic text-[150px] font-bold text-slate-900/[0.035] tracking-widest leading-none">
          {monogram}
        </span>
      </div>

      {selectedTemplateId === 'editorial-monogram' ? (
        <>
          <div className="absolute inset-4 border border-slate-900/70 pointer-events-none" />
          <div className="absolute inset-6 border border-dashed border-slate-300 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'minimal-wave' ? (
        <>
          <div className="absolute inset-3 border-2 border-slate-900 pointer-events-none" />
          <div className="absolute inset-5 border border-slate-200 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border border-slate-900/80 pointer-events-none" />
          <div className="absolute inset-5.5 border border-slate-200 pointer-events-none" />
        </>
      )}

      {/* Top Greeting */}
      <div className="text-center pt-5 relative z-10">
        <p className="font-arabic text-base text-slate-800 mb-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[7.8px] text-slate-600 leading-relaxed max-w-[340px] mx-auto italic font-serif">
          &ldquo;Dan di antara kebesaran-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram bersamanya.&rdquo;
        </p>
        <p className="text-[7.5px] uppercase tracking-widest font-bold text-slate-800 mt-1">
          (QS. Ar-Rum: 21)
        </p>
      </div>

      {/* Couple Profiles */}
      <div className="my-auto py-2 text-center relative z-10">
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 bg-slate-900 text-white text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE BRIDE
          </span>
          <h3 className="font-esthetic text-4xl sm:text-[42px] text-slate-900 leading-tight">
            {brideName}
          </h3>
          <p className="text-[8px] text-slate-600 mt-0.5">
            Putri dari {brideParents}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 my-2">
          <div className="w-12 h-[1px] bg-slate-300" />
          <span className="text-xs font-serif italic text-slate-500">&amp;</span>
          <div className="w-12 h-[1px] bg-slate-300" />
        </div>

        <div className="mt-1">
          <span className="inline-block px-2.5 py-0.5 bg-slate-900 text-white text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE GROOM
          </span>
          <h3 className="font-esthetic text-4xl sm:text-[42px] text-slate-900 leading-tight">
            {groomName}
          </h3>
          <p className="text-[8px] text-slate-600 mt-0.5">
            Putra dari {groomParents}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-3 relative z-10 border-t border-slate-200 pt-2.5">
        <p className="text-[7.5px] uppercase tracking-[0.22em] text-slate-500 font-bold mb-1">
          Turut Mengundang
        </p>
        <p className="text-[7.5px] text-slate-800 leading-tight">
          Segenap Keluarga Besar Mempelai Pria &amp; Wanita
        </p>
      </div>
    </div>
  );

  // SHEET 3: JADWAL ACARA & DUAL SMART QR CARD - A5
  const renderSheet3Event = ({ showCropMarks, showTurutMengundang, turutMengundangText }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-white text-slate-900 border border-slate-300 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none font-josefin">
      {showCropMarks && <UniversalCropMarks color="#334155" />}

      {selectedTemplateId === 'editorial-monogram' ? (
        <>
          <div className="absolute inset-4 border border-slate-900/70 pointer-events-none" />
          <div className="absolute inset-6 border border-dashed border-slate-300 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'minimal-wave' ? (
        <>
          <div className="absolute inset-3 border-2 border-slate-900 pointer-events-none" />
          <div className="absolute inset-5 border border-slate-200 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-4 border border-slate-900/80 pointer-events-none" />
          <div className="absolute inset-5.5 border border-slate-200 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="text-center pt-5 relative z-10">
        <span className="text-[8.5px] uppercase tracking-[0.32em] font-bold text-slate-900">
          AGENDA &amp; LOKASI PERNIKAHAN
        </span>
      </div>

      {/* Dual Event Schedule */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 relative z-10">
        <div className="border border-slate-300 bg-slate-50 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-slate-900 text-white text-[7px] uppercase font-bold tracking-widest">
            Akad / Pemberkatan
          </span>
          <p className="font-serif italic font-bold text-xs text-slate-900 mt-1">
            {formattedDateLong}
          </p>
          <p className="text-[7.5px] font-semibold text-slate-600 mt-0.5">
            Pukul {akadTime}
          </p>
          <p className="text-[8px] font-bold text-slate-900 mt-1 font-serif">
            {akadLocation}
          </p>
          <p className="text-[7px] text-slate-600 max-w-[190px] mx-auto mt-0.5 leading-tight">
            {akadAddress}
          </p>
        </div>

        <div className="border border-slate-300 bg-slate-50 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-slate-900 text-white text-[7px] uppercase font-bold tracking-widest">
            Resepsi Pernikahan
          </span>
          <p className="font-serif italic font-bold text-xs text-slate-900 mt-1">
            {formattedResepsiDate}
          </p>
          <p className="text-[7.5px] font-semibold text-slate-600 mt-0.5">
            Pukul {resepsiTime}
          </p>
          <p className="text-[8px] font-bold text-slate-900 mt-1 font-serif">
            {resepsiLocation}
          </p>
          <p className="text-[7px] text-slate-600 max-w-[190px] mx-auto mt-0.5 leading-tight">
            {resepsiAddress}
          </p>
        </div>
      </div>

      {/* Turut Mengundang */}
      {showTurutMengundang && turutMengundangText?.trim() && (
        <div className="text-center py-1.5 px-3 border-y border-dashed border-slate-300 bg-slate-50/60 relative z-10">
          <span className="text-[7px] uppercase tracking-[0.25em] font-bold text-slate-800 block mb-0.5">
            Turut Mengundang:
          </span>
          <div className="text-[7.5px] text-slate-600 leading-snug space-y-0.5">
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
          sublabel="Scan RSVP & Buku Tamu"
          colorDark="#0f172a"
          borderColor="#0f172a"
        />
        <UniversalQrBox
          url={mapsUrl}
          label="Lokasi Acara"
          sublabel={resepsiLocation}
          colorDark="#0f172a"
          borderColor="#0f172a"
        />
      </div>

      {/* Footer */}
      <div className="text-center pb-2 relative z-10">
        <p className="text-[7.5px] text-slate-600 italic">
          Kehormatan dan kebahagiaan bagi kami atas kehadiran dan doa restu Anda.
        </p>
        <p className="font-esthetic text-xl text-slate-900 mt-0.5">
          {brideShort} &amp; {groomShort}
        </p>
      </div>
    </div>
  );

  // SHEET 4: SOUVENIR KARTU & BELLY BAND - A5
  const renderSheet4Souvenir = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-white text-slate-900 border border-slate-300 p-6 flex flex-col justify-between overflow-hidden select-none font-josefin">
      {showCropMarks && <UniversalCropMarks color="#334155" />}

      <div className="text-center border-b border-dashed border-slate-300 pb-1.5">
        <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-slate-900">
          ✂ LEMBAR AKSESORIS LUMINA GLASS &bull; SIAP GUNTING ✂
        </span>
        <p className="text-[7px] text-slate-500 mt-0.5">
          Potong mengikuti garis putus-putus untuk kartu penukaran souvenir dan pita amplop.
        </p>
      </div>

      {/* 4x Souvenir Coupons */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-slate-500 font-bold block mb-1">
          1. Kupon Penukaran Souvenir (4 Pcs)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-dashed border-slate-400 p-2.5 bg-slate-50 flex flex-col justify-between h-[92px] text-center relative"
            >
              <div className="flex items-center justify-between text-[6.5px] text-slate-500">
                <span>PASS #{i}</span>
                <span className="text-[6.5px] font-bold text-slate-900">&bull; PASS &bull;</span>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-semibold text-slate-500">
                  Terima Kasih
                </p>
                <p className="font-esthetic text-2xl text-slate-900 leading-tight">
                  {brideShort} &amp; {groomShort}
                </p>
                <p className="text-[6.5px] text-slate-600 mt-0.5">
                  Kupon Penukaran Souvenir
                </p>
              </div>
              <div className="border-t border-slate-200 pt-0.5 text-[6.5px] text-slate-500">
                {formattedDateShort}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2x Thank You Tags with Ribbon Hole */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-slate-500 font-bold block mb-1">
          2. Kartu Ucapan Terima Kasih (Thank You Tag)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2].map((num) => (
            <div
              key={num}
              className="border border-dashed border-slate-400 p-2.5 bg-white flex flex-col items-center justify-center text-center relative"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-slate-900 mb-1" />
              <span className="text-[6.5px] uppercase tracking-widest text-slate-500">
                TERIMA KASIH ATAS DOA RESTU
              </span>
              <p className="font-esthetic text-2xl text-slate-900 my-0.5">
                {brideName} &amp; {groomName}
              </p>
              <span className="text-[7px] uppercase tracking-[0.2em] font-semibold text-slate-700">
                {formattedDateUpper}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1x Belly Band (Pita Amplop) */}
      <div className="border border-dashed border-slate-400 bg-slate-900 text-white p-2.5 text-center">
        <div className="flex items-center justify-between text-[6.5px] text-slate-400 uppercase tracking-widest mb-1">
          <span>PITA AMPLOP / BELLY BAND MODERN</span>
          <span className="font-mono text-[7px]">{formattedDateShort}</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-white/40" />
          <div className="text-center">
            <span className="font-esthetic text-2xl tracking-widest">
              {monogram}
            </span>
            <span className="block text-[7px] uppercase tracking-[0.25em] text-slate-300">
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
      suiteTitle="Desain Undangan Fisik • Lumina Glass"
      suiteBadge="Lumina Glass Haute Suite • A5 Print Ready"
      suiteSubtitle="Format cetak presisi A5, tipografi estetik modern, kupon souvenir, & belly band siap cetak"
      accentColor="#0f172a"
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
