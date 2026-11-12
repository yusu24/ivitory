import React, { useState } from 'react';
import BasePrintSuiteEngine, {
  UniversalCropMarks,
  UniversalQrBox,
  UniversalCircularSeal,
} from '../shared/print/BasePrintSuiteEngine';
import { LeafBranch, FloralCorner, LeafDivider, Wreath } from './components/Botanicals';
import './style.css';

/**
 * Ivory Garden (classic) Physical Print Suite
 * Built on BasePrintSuiteEngine & calibrated with Sage Garden / Nature Design Tokens:
 * 3 Pilihan Template Cetak Fisik:
 * 1. 'botanical-editorial' (Template 1: Luxury Botanical Editorial with Medallion & Wax Seal)
 * 2. 'minimal-arch' (Template 2: Clean Architectural Arch with Eucalyptus Garland & Diamond Framing)
 * 3. 'royal-crest' (Template 3: Grand Laurel Wreath Monogram with High-Couture Symmetrical Layout)
 */

const TEMPLATES = [
  {
    id: 'botanical-editorial',
    name: 'Template 1: Botanical Editorial',
    description: 'Medali bulat dengan stempel lilin, sulur daun eukaliptus, & tipografi mewah',
  },
  {
    id: 'minimal-arch',
    name: 'Template 2: Minimalist Arch',
    description: 'Bingkai lengkung arsitektural gading dengan karangan daun halus & ornamen gantung',
  },
  {
    id: 'royal-crest',
    name: 'Template 3: Grand Royal Crest',
    description: 'Wreath laurel melingkar penuh dengan inisial monogram ganda & tata letak simetris megah',
  },
];

const PAPER_THEMES = [
  { id: 'ivory-cotton', label: 'Putih Gading (Ivory Clean Paper)', isDark: false },
  { id: 'textured', label: 'Tekstur Kertas Cotton Berpori (Sage)', isDark: false },
  { id: 'emerald-noir', label: 'Sampul Hijau Zamrud Tua (Emerald Velvet)', isDark: true },
];

export default function IvoryGardenPrintSuite({ invitation, embeddedInDashboard = false }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('botanical-editorial');
  const [selectedPaperTheme, setSelectedPaperTheme] = useState('ivory-cotton');
  const [sealColor, setSealColor] = useState('gold'); // 'gold' | 'emerald'

  const brideName = invitation?.bride_name || 'Nadia Safitri Zahra';
  const groomName = invitation?.groom_name || 'Dimas Anggara Putra';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Nadia';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Dimas';
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const brideParents =
    invitation?.bride_parents || 'Bapak H. Ahmad Fauzi & Ibu Hj. Siti Rahmah';
  const groomParents =
    invitation?.groom_parents || 'Bapak H. Lukman Hakim & Ibu Hj. Yuliana';

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2027-12-12';
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

  const akadLocation = invitation?.akad_location || 'Masjid Agung Al-Azhar';
  const akadAddress =
    invitation?.akad_address || 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan';
  const resepsiLocation =
    invitation?.resepsi_location || 'The Glasshouse at Sampoerna Strategic';
  const resepsiAddress =
    invitation?.resepsi_address || 'Jl. Jend. Sudirman Kav. 45, Jakarta Selatan';

  const slug = invitation?.slug || 'nadia-dimas';
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

  const isDarkCover = selectedPaperTheme === 'emerald-noir';
  const paperBgClass =
    selectedPaperTheme === 'textured'
      ? 'bg-[#f5f4ed] text-[#1b382b]'
      : selectedPaperTheme === 'emerald-noir'
      ? 'bg-[#0f281e] text-emerald-50'
      : 'bg-[#fdfbf7] text-[#1f3f2f]';

  // Toolbar Extra: Pilihan Warna Stempel Lilin
  const renderExtraToolbar = () => (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
          Aksen Stempel Lilin (Wax Seal):
        </span>
        <button
          type="button"
          onClick={() => setSealColor('gold')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
            sealColor === 'gold'
              ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Gold Emas</span>
        </button>
        <button
          type="button"
          onClick={() => setSealColor('emerald')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
            sealColor === 'emerald'
              ? 'bg-emerald-800 border-emerald-900 text-white font-bold shadow-2xs'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Emerald Zamrud</span>
        </button>
      </div>
      <span className="text-[10.5px] text-emerald-700">
        Template aktif: <strong className="capitalize">{selectedTemplateId.replace('-', ' ')}</strong>
      </span>
    </div>
  );

  // SHEET 1: SAMPUL DEPAN (A5)
  const renderSheet1Cover = ({ showCropMarks, showIllustration, guestNamePrint }) => (
    <div
      className={`print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl ${paperBgClass} border border-[#2d5a43]/20 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && <UniversalCropMarks color={isDarkCover ? '#a7f3d0' : '#2d5a43'} />}

      {/* Frame Styling per Template */}
      {selectedTemplateId === 'minimal-arch' ? (
        <>
          <div
            className={`absolute inset-4 border-2 rounded-t-[140px] pointer-events-none ${
              isDarkCover ? 'border-emerald-300' : 'border-[#2d5a43]'
            }`}
          />
          <div
            className={`absolute inset-5.5 border rounded-t-[130px] pointer-events-none ${
              isDarkCover ? 'border-emerald-600' : 'border-[#d4af37]/60'
            }`}
          />
          <div className="absolute top-7 left-1/2 -translate-x-1/2 pointer-events-none opacity-80">
            <LeafDivider className="w-24 text-[#d4af37]" />
          </div>
        </>
      ) : selectedTemplateId === 'royal-crest' ? (
        <>
          <div
            className={`absolute inset-3.5 border pointer-events-none ${
              isDarkCover ? 'border-emerald-300/80' : 'border-[#2d5a43]'
            }`}
          />
          <div
            className={`absolute inset-5 border-2 pointer-events-none ${
              isDarkCover ? 'border-emerald-500/60' : 'border-[#d4af37]/70'
            }`}
          />
          <div
            className={`absolute inset-6.5 border border-dashed pointer-events-none ${
              isDarkCover ? 'border-emerald-700/60' : 'border-[#2d5a43]/30'
            }`}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute inset-3.5 border-2 pointer-events-none ${
              isDarkCover ? 'border-emerald-300' : 'border-[#2d5a43]/70'
            }`}
          />
          <div
            className={`absolute inset-5 border pointer-events-none ${
              isDarkCover ? 'border-emerald-600' : 'border-[#d4af37]/60'
            }`}
          />
        </>
      )}

      {/* Botanical Corner Ornaments */}
      <div className="absolute top-5 left-5 w-16 h-16 pointer-events-none opacity-85">
        <FloralCorner className="w-full h-full" />
      </div>
      <div className="absolute top-5 right-5 w-16 h-16 pointer-events-none opacity-85 scale-x-[-1]">
        <FloralCorner className="w-full h-full" />
      </div>
      <div className="absolute bottom-5 left-5 w-16 h-16 pointer-events-none opacity-85 scale-y-[-1]">
        <FloralCorner className="w-full h-full" />
      </div>
      <div className="absolute bottom-5 right-5 w-16 h-16 pointer-events-none opacity-85 scale-[-1]">
        <FloralCorner className="w-full h-full" />
      </div>

      {/* Top Header */}
      <div className="text-center pt-3 relative z-10">
        <span
          className={`inline-block px-3.5 py-1 text-[8.5px] uppercase tracking-[0.38em] font-semibold ${
            isDarkCover ? 'bg-emerald-100 text-[#0f281e]' : 'bg-[#1f3f2f] text-amber-50'
          }`}
        >
          WALIMATUL 'URS
        </span>
        <p
          className={`text-[8.5px] uppercase tracking-[0.32em] mt-2 font-medium ${
            isDarkCover ? 'text-emerald-300' : 'text-[#52796f]'
          }`}
        >
          THE WEDDING OF
        </p>
      </div>

      {/* Center Layout Varied by Template */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 text-center">
        {selectedTemplateId === 'royal-crest' ? (
          /* Template 3: Grand Royal Crest */
          <div className="flex flex-col items-center mb-2">
            <div className="relative w-32 h-32 flex items-center justify-center mb-2">
              <Wreath
                className={`w-full h-full absolute inset-0 ${
                  isDarkCover ? 'text-emerald-300' : 'text-[#d4af37]'
                }`}
              />
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-md ${
                  sealColor === 'gold'
                    ? 'bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#8a630a] text-amber-50 border-amber-200'
                    : 'bg-[#1f3f2f] text-emerald-100 border-emerald-300'
                }`}
              >
                <span className="font-serif italic font-bold text-sm tracking-wider">
                  {monogram}
                </span>
              </div>
            </div>
            <p className="text-[7.5px] uppercase tracking-[0.3em] font-semibold text-[#52796f] mb-1">
              EST. {dateObj.getFullYear()}
            </p>
          </div>
        ) : selectedTemplateId === 'minimal-arch' ? (
          /* Template 2: Minimalist Arch Center */
          <div className="flex flex-col items-center mb-3">
            <div
              className={`w-28 h-36 rounded-t-full border-2 p-1.5 flex items-center justify-center relative shadow-sm ${
                isDarkCover ? 'border-emerald-300 bg-[#0f281e]' : 'border-[#2d5a43] bg-white'
              }`}
            >
              {showIllustration ? (
                <div className="w-full h-full rounded-t-full overflow-hidden bg-white">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <span className="font-serif italic text-2xl font-bold tracking-widest text-[#2d5a43]">
                  {monogram}
                </span>
              )}
              <div
                className={`absolute -bottom-2 w-7 h-7 rounded-full border flex items-center justify-center text-[8.5px] font-bold ${
                  sealColor === 'gold'
                    ? 'bg-[#d4af37] text-white border-white'
                    : 'bg-[#1f3f2f] text-white border-white'
                }`}
              >
                ✦
              </div>
            </div>
          </div>
        ) : (
          /* Template 1: Botanical Editorial with Circular Seal */
          showIllustration ? (
            <div className="relative mb-3">
              <div className="absolute -inset-4 pointer-events-none">
                <UniversalCircularSeal
                  id="classicCoverSeal"
                  text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • IVORY GARDEN • `}
                  color={isDarkCover ? '#6ee7b7' : '#52796f'}
                />
              </div>
              <div
                className={`w-32 h-32 rounded-full border-2 p-1.5 bg-white shadow-md flex items-center justify-center relative ${
                  isDarkCover ? 'border-emerald-300' : 'border-[#2d5a43]'
                }`}
              >
                <div className="w-full h-full rounded-full border border-dashed border-[#2d5a43]/30 overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={coverPhotoSrc}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1.5 right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-serif italic font-bold shadow-sm ${
                    sealColor === 'gold'
                      ? 'bg-gradient-to-br from-[#d4af37] to-[#8a630a] text-amber-50'
                      : 'bg-[#1f3f2f] text-emerald-100'
                  }`}
                >
                  {monogram}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-28 h-28 flex items-center justify-center mb-2">
              <Wreath
                className={`w-full h-full absolute inset-0 ${
                  isDarkCover ? 'text-emerald-400' : 'text-[#2d5a43]/60'
                }`}
              />
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                  sealColor === 'gold'
                    ? 'bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#8a630a] text-amber-50'
                    : 'bg-[#1f3f2f] text-emerald-100'
                }`}
              >
                <span className="font-serif italic font-bold text-xs">{monogram}</span>
              </div>
            </div>
          )
        )}

        <h1
          className={`font-serif italic text-4xl sm:text-[44px] leading-none tracking-tight ${
            isDarkCover ? 'text-emerald-100' : 'text-[#1f3f2f]'
          }`}
        >
          {brideName}
        </h1>
        <div className="my-1.5 flex items-center justify-center text-[#d4af37]">
          <LeafDivider className="w-28 text-[#d4af37]" />
        </div>
        <h2
          className={`font-serif italic text-4xl sm:text-[44px] leading-none tracking-tight ${
            isDarkCover ? 'text-emerald-100' : 'text-[#1f3f2f]'
          }`}
        >
          {groomName}
        </h2>

        <p
          className={`text-[9px] uppercase tracking-[0.3em] font-semibold mt-3 ${
            isDarkCover ? 'text-emerald-300' : 'text-[#52796f]'
          }`}
        >
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Guest Label Box */}
      <div className="relative z-10 text-center pb-2">
        <div
          className={`max-w-[280px] mx-auto border p-3 shadow-2xs ${
            isDarkCover
              ? 'border-emerald-300/50 bg-[#0b2018]/90 text-emerald-100'
              : 'border-[#2d5a43]/30 bg-[#f7f4ea]/80 text-[#1f3f2f]'
          }`}
        >
          <p
            className={`text-[7.5px] uppercase tracking-[0.22em] mb-1 font-sans ${
              isDarkCover ? 'text-emerald-300' : 'text-[#52796f]'
            }`}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-sm font-serif italic font-bold min-h-[22px]">
            {guestNamePrint?.trim() || 'Tamu Undangan Terhormat'}
          </p>
          <p
            className={`text-[7px] tracking-widest uppercase mt-0.5 font-sans ${
              isDarkCover ? 'text-emerald-400' : 'text-[#52796f]'
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
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fdfbf7] text-[#1f3f2f] border border-[#2d5a43]/20 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#2d5a43" />}

      {/* Giant Monogram Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif italic text-[140px] font-bold text-[#2d5a43]/[0.03] tracking-widest leading-none">
          {monogram}
        </span>
      </div>

      {selectedTemplateId === 'minimal-arch' ? (
        <>
          <div className="absolute inset-4 border-2 rounded-t-[140px] border-[#2d5a43]/60 pointer-events-none" />
          <div className="absolute inset-6 border rounded-t-[130px] border-[#d4af37]/40 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'royal-crest' ? (
        <>
          <div className="absolute inset-3.5 border border-[#2d5a43]/80 pointer-events-none" />
          <div className="absolute inset-5 border-2 border-[#d4af37]/70 pointer-events-none" />
          <div className="absolute inset-6.5 border border-dashed border-[#2d5a43]/30 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-3.5 border-2 border-[#2d5a43]/70 pointer-events-none" />
          <div className="absolute inset-5 border border-[#d4af37]/50 pointer-events-none" />
        </>
      )}

      {/* Top Quranic Verse */}
      <div className="text-center pt-2 relative z-10">
        <p className="font-serif text-xs text-[#2d5a43] italic mb-1">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[7.8px] text-[#52796f] leading-relaxed max-w-[340px] mx-auto italic font-serif">
          &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <p className="text-[7.5px] uppercase tracking-widest font-semibold text-[#1f3f2f] mt-1 font-sans">
          (QS. Ar-Rum: 21)
        </p>
      </div>

      {/* Middle Couple Details */}
      <div className="my-auto py-2 text-center relative z-10">
        <p className="text-[8px] uppercase tracking-[0.24em] text-[#52796f] mb-3 font-sans">
          Maha Suci Allah yang telah mempertemukan kami:
        </p>

        {/* Bride */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-0.5 bg-[#1f3f2f] text-amber-50 text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE BRIDE
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[26px] font-bold text-[#1f3f2f] leading-tight">
            {brideName}
          </h3>
          <p className="text-[8px] text-[#52796f] mt-0.5 font-sans">
            Putri tercinta dari {brideParents}
          </p>
        </div>

        <div className="flex items-center justify-center my-1.5 text-[#d4af37]">
          <LeafDivider className="w-24 text-[#d4af37]" />
        </div>

        {/* Groom */}
        <div className="mt-1">
          <span className="inline-block px-2.5 py-0.5 bg-[#1f3f2f] text-amber-50 text-[7px] uppercase tracking-[0.25em] font-semibold mb-1">
            THE GROOM
          </span>
          <h3 className="font-serif italic text-2xl sm:text-[26px] font-bold text-[#1f3f2f] leading-tight">
            {groomName}
          </h3>
          <p className="text-[8px] text-[#52796f] mt-0.5 font-sans">
            Putra tercinta dari {groomParents}
          </p>
        </div>
      </div>

      {/* Turut Mengundang */}
      <div className="text-center pb-2 relative z-10 border-t border-[#2d5a43]/20 pt-2.5">
        <p className="text-[7.5px] uppercase tracking-[0.22em] text-[#52796f] font-semibold mb-1 font-sans">
          Turut Mengundang
        </p>
        <p className="text-[7.5px] text-[#1f3f2f] leading-tight font-sans">
          Keluarga Besar Bpk. H. Ahmad Fauzi &amp; Bpk. H. Lukman Hakim
        </p>
      </div>
    </div>
  );

  // SHEET 3: JADWAL ACARA & DUAL QR CODE DIGITAL - A5
  const renderSheet3Event = ({ showCropMarks, showTurutMengundang, turutMengundangText }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fdfbf7] text-[#1f3f2f] border border-[#2d5a43]/20 p-7 sm:p-9 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#2d5a43" />}

      {selectedTemplateId === 'minimal-arch' ? (
        <>
          <div className="absolute inset-4 border-2 rounded-t-[140px] border-[#2d5a43]/60 pointer-events-none" />
          <div className="absolute inset-6 border rounded-t-[130px] border-[#d4af37]/40 pointer-events-none" />
        </>
      ) : selectedTemplateId === 'royal-crest' ? (
        <>
          <div className="absolute inset-3.5 border border-[#2d5a43]/80 pointer-events-none" />
          <div className="absolute inset-5 border-2 border-[#d4af37]/70 pointer-events-none" />
          <div className="absolute inset-6.5 border border-dashed border-[#2d5a43]/30 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-3.5 border-2 border-[#2d5a43]/70 pointer-events-none" />
          <div className="absolute inset-5 border border-[#d4af37]/50 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <div className="text-center pt-2 relative z-10">
        <span className="text-[8.5px] uppercase tracking-[0.32em] font-bold text-[#1f3f2f] font-sans">
          RANGKAIAN ACARA PERNIKAHAN
        </span>
        <div className="flex items-center justify-center my-1 text-[#d4af37]">
          <LeafDivider className="w-20 text-[#d4af37]" />
        </div>
      </div>

      {/* Dual Schedule Boxes */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 relative z-10">
        {/* Akad */}
        <div className="border border-[#2d5a43]/25 bg-[#f7f4ea]/60 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#1f3f2f] text-amber-50 text-[7px] uppercase font-bold tracking-widest font-sans">
            Akad Nikah
          </span>
          <p className="font-serif italic font-bold text-xs text-[#1f3f2f] mt-1">
            {formattedDateLong}
          </p>
          <p className="text-[7.5px] font-semibold text-[#52796f] mt-0.5 font-sans">
            Pukul {akadTime}
          </p>
          <p className="text-[8px] font-bold text-[#1f3f2f] mt-1 font-serif">
            {akadLocation}
          </p>
          <p className="text-[7px] text-[#52796f] max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {akadAddress}
          </p>
        </div>

        {/* Resepsi */}
        <div className="border border-[#2d5a43]/25 bg-[#f7f4ea]/60 p-2.5 text-center">
          <span className="inline-block px-2 py-0.5 bg-[#1f3f2f] text-amber-50 text-[7px] uppercase font-bold tracking-widest font-sans">
            Resepsi Pernikahan
          </span>
          <p className="font-serif italic font-bold text-xs text-[#1f3f2f] mt-1">
            {formattedResepsiDate}
          </p>
          <p className="text-[7.5px] font-semibold text-[#52796f] mt-0.5 font-sans">
            Pukul {resepsiTime}
          </p>
          <p className="text-[8px] font-bold text-[#1f3f2f] mt-1 font-serif">
            {resepsiLocation}
          </p>
          <p className="text-[7px] text-[#52796f] max-w-[190px] mx-auto mt-0.5 leading-tight font-sans">
            {resepsiAddress}
          </p>
        </div>
      </div>

      {/* Turut Mengundang List */}
      {showTurutMengundang && turutMengundangText?.trim() && (
        <div className="text-center py-1.5 px-3 border-y border-dashed border-[#2d5a43]/20 bg-[#f7f4ea]/40 relative z-10">
          <span className="text-[7px] uppercase tracking-[0.25em] font-bold text-[#1f3f2f] block mb-0.5">
            Turut Mengundang:
          </span>
          <div className="text-[7.5px] text-[#52796f] leading-snug space-y-0.5">
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
          colorDark="#1f3f2f"
          borderColor="#2d5a43"
        />
        <UniversalQrBox
          url={mapsUrl}
          label="Lokasi Acara"
          sublabel={resepsiLocation}
          colorDark="#1f3f2f"
          borderColor="#2d5a43"
        />
      </div>

      {/* Footer Closing */}
      <div className="text-center pb-1 relative z-10">
        <p className="text-[7.5px] text-[#52796f] italic font-serif">
          Merupakan suatu kehormatan &amp; kebahagiaan bagi kami atas kehadiran doa restu Anda.
        </p>
        <p className="font-serif italic font-bold text-xs text-[#1f3f2f] mt-0.5">
          {brideShort} &amp; {groomShort}
        </p>
      </div>
    </div>
  );

  // SHEET 4: KUPON SOUVENIR, THANK YOU TAG & BELLY BAND - A5
  const renderSheet4Souvenir = ({ showCropMarks }) => (
    <div className="print-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl bg-[#fdfbf7] text-[#1f3f2f] border border-[#2d5a43]/20 p-6 flex flex-col justify-between overflow-hidden select-none">
      {showCropMarks && <UniversalCropMarks color="#2d5a43" />}

      {/* Header Info */}
      <div className="text-center border-b border-dashed border-[#2d5a43]/30 pb-1.5">
        <span className="text-[8px] uppercase tracking-[0.25em] font-bold text-[#1f3f2f] font-sans">
          ✂ LEMBAR AKSESORIS BOTANIK &bull; SIAP GUNTING ✂
        </span>
        <p className="text-[7px] text-[#52796f] mt-0.5">
          Gunting mengikuti garis putus-putus untuk kupon souvenir, tag terima kasih, dan pita amplop.
        </p>
      </div>

      {/* 4x Souvenir Exchange Coupons */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#52796f] font-bold block mb-1">
          1. Kupon Penukaran Souvenir (4 Pcs)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-dashed border-[#2d5a43]/40 p-2.5 bg-[#f7f4ea]/40 flex flex-col justify-between h-[92px] text-center relative"
            >
              <div className="flex items-center justify-between text-[6.5px] text-[#52796f]">
                <span>TAG #{i}</span>
                <span className="text-[6.5px] font-bold text-[#d4af37]">&bull; PASS &bull;</span>
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-widest font-semibold text-[#52796f]">
                  Terima Kasih
                </p>
                <p className="font-serif italic font-bold text-sm text-[#1f3f2f] leading-tight">
                  {brideShort} &amp; {groomShort}
                </p>
                <p className="text-[6.5px] text-[#52796f] mt-0.5">
                  Kupon Penukaran Souvenir
                </p>
              </div>
              <div className="border-t border-[#2d5a43]/20 pt-0.5 text-[6.5px] text-[#52796f]">
                {formattedDateShort}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2x Thank You Tags with Ribbon Hole */}
      <div>
        <span className="text-[7.5px] uppercase tracking-[0.22em] text-[#52796f] font-bold block mb-1">
          2. Kartu Ucapan Souvenir (Thank You Tag)
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {[1, 2].map((num) => (
            <div
              key={num}
              className="border border-dashed border-[#2d5a43]/40 p-2.5 bg-white flex flex-col items-center justify-center text-center relative"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-[#2d5a43] mb-1" />
              <span className="text-[6.5px] uppercase tracking-widest text-[#52796f]">
                TERIMA KASIH ATAS DOA RESTU
              </span>
              <p className="font-serif italic font-bold text-base text-[#1f3f2f] my-0.5">
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
      <div className="border border-dashed border-[#2d5a43]/40 bg-[#1f3f2f] text-amber-50 p-2.5 text-center">
        <div className="flex items-center justify-between text-[6.5px] text-amber-200/70 uppercase tracking-widest font-sans mb-1">
          <span>PITA AMPLOP / BELLY BAND (LIPAT KELILING AMPLOP)</span>
          <span className="font-mono text-[7px]">{formattedDateShort}</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <LeafDivider className="w-16 text-[#d4af37]" />
          <div className="text-center">
            <span className="font-serif italic text-base tracking-widest font-bold">
              {monogram}
            </span>
            <span className="block text-[7px] uppercase tracking-[0.25em] text-amber-200 font-sans">
              {formattedDateUpper}
            </span>
          </div>
          <LeafDivider className="w-16 text-[#d4af37]" />
        </div>
      </div>
    </div>
  );

  return (
    <BasePrintSuiteEngine
      suiteTitle="Desain Undangan Fisik • Ivory Garden"
      suiteBadge="Ivory Garden Haute Suite • A5 Print Ready"
      suiteSubtitle="Format cetak presisi A5, stempel lilin, kupon souvenir, & belly band siap cetak"
      accentColor="#1f3f2f"
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
      extraToolbarControls={renderExtraToolbar}
    />
  );
}
