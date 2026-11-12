import React, { useState } from 'react';
import {
  Printer,
  Sparkles,
  FileText,
  Layers,
  Scissors,
  User,
  Users,
  Eye,
  Check,
  MapPin,
  Smartphone,
  Download,
  Settings,
  Sliders,
  X,
  FileDown,
  Image as ImageIcon,
  BookOpen,
  Mail,
  FoldVertical,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  FoldHorizontal,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { getInvitationTexts, getPhotoSlotConfig } from './utils/templateConfig';
import './style.css';

/**
 * Static (Print-Safe) Botanical Corner SVG Flourish
 * Renders at 100% opacity immediately without Framer Motion viewport delays so PDF/Print is always crisp.
 */
function PrintBotanicalCorner({ className = 'w-14 h-14', position = 'top-left', dark = false }) {
  let transform = '';
  if (position === 'top-right') transform = 'scale-x-[-1]';
  else if (position === 'bottom-left') transform = 'scale-y-[-1]';
  else if (position === 'bottom-right') transform = 'scale-[-1]';

  const colorClass = dark ? 'text-zinc-100' : 'text-zinc-900';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${colorClass} pointer-events-none ${transform} ${className}`}
    >
      <path d="M2 38 L2 2 L38 2" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path
        d="M6 6 C 25 15, 45 40, 75 75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[
        'M12 10 Q 18 2, 28 8 Q 20 18, 12 10 Z',
        'M10 18 Q 2 24, 8 34 Q 18 26, 10 18 Z',
        'M24 22 Q 32 14, 42 20 Q 34 32, 24 22 Z',
        'M22 30 Q 16 40, 24 48 Q 32 38, 22 30 Z',
        'M38 36 Q 48 28, 58 34 Q 48 46, 38 36 Z',
        'M36 44 Q 30 56, 40 62 Q 46 52, 36 44 Z',
        'M52 52 Q 62 44, 72 50 Q 64 62, 52 52 Z',
        'M68 68 Q 78 72, 88 82 Q 78 88, 68 68 Z',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.09"
        />
      ))}
      <path d="M16 8 Q 22 12, 24 22" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
}

/**
 * Watercolor Floral Cluster (Bunga Mawar & Peony Pink/Peach Watercolor)
 * Sesuai model foto fisik cetak undangan
 */
function WatercolorFloralCluster({ className = 'w-32 h-16', style = {} }) {
  return (
    <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      {/* Soft Green Leaves */}
      <path d="M40 50 C20 40 10 20 25 10 C40 0 55 25 40 50 Z" fill="#84a98c" opacity="0.85" />
      <path d="M55 45 C45 30 50 10 65 5 C80 0 85 25 55 45 Z" fill="#52796f" opacity="0.75" />
      <path d="M195 50 C215 40 225 20 210 10 C195 0 180 25 195 50 Z" fill="#84a98c" opacity="0.85" />
      <path d="M180 45 C190 30 185 10 170 5 C155 0 150 25 180 45 Z" fill="#52796f" opacity="0.75" />
      {/* Side small roses */}
      <circle cx="65" cy="55" r="22" fill="#fda4af" opacity="0.9" />
      <circle cx="65" cy="55" r="16" fill="#f43f5e" opacity="0.35" />
      <circle cx="67" cy="53" r="10" fill="#be123c" opacity="0.3" />
      <circle cx="170" cy="55" r="22" fill="#fda4af" opacity="0.9" />
      <circle cx="170" cy="55" r="16" fill="#f43f5e" opacity="0.35" />
      <circle cx="168" cy="53" r="10" fill="#be123c" opacity="0.3" />
      {/* Center main rose */}
      <circle cx="118" cy="48" r="28" fill="#fecdd3" opacity="0.95" />
      <circle cx="118" cy="48" r="21" fill="#fb7185" opacity="0.5" />
      <circle cx="116" cy="46" r="14" fill="#e11d48" opacity="0.4" />
      <circle cx="118" cy="47" r="7" fill="#9f1239" opacity="0.5" />
      {/* Petal curves */}
      <path d="M100 45 Q118 30 136 45 Q118 60 100 45" stroke="#be123c" strokeWidth="1.2" opacity="0.4" fill="none" />
      <path d="M105 40 Q118 25 131 40" stroke="#be123c" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M108 52 Q118 62 128 52" stroke="#be123c" strokeWidth="1" opacity="0.4" fill="none" />
      {/* Golden pollen dots */}
      <circle cx="35" cy="35" r="3.5" fill="#fbbf24" opacity="0.75" />
      <circle cx="200" cy="35" r="3.5" fill="#fbbf24" opacity="0.75" />
      <circle cx="85" cy="25" r="2.5" fill="#f472b6" opacity="0.8" />
      <circle cx="150" cy="25" r="2.5" fill="#f472b6" opacity="0.8" />
    </svg>
  );
}

/**
 * Watercolor Corner Flourish (Sudut Bunga Watercolor Pink/Peach)
 */
function WatercolorCornerFlourish({ position = 'top-right', className = 'w-24 h-24' }) {
  let transform = '';
  if (position === 'top-left') transform = 'scale-x-[-1]';
  else if (position === 'bottom-left') transform = 'scale-[-1]';
  else if (position === 'bottom-right') transform = 'scale-y-[-1]';

  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${transform} ${className} pointer-events-none`}>
      <path d="M115 10 C90 15 75 35 70 60 C85 55 105 40 115 10 Z" fill="#52796f" opacity="0.65" />
      <path d="M100 5 C80 20 65 40 50 55 C65 50 85 30 100 5 Z" fill="#84a98c" opacity="0.75" />
      <path d="M110 35 C100 50 80 65 60 75 C75 65 95 55 110 35 Z" fill="#6b9080" opacity="0.6" />
      <circle cx="85" cy="35" r="20" fill="#fda4af" opacity="0.9" />
      <circle cx="85" cy="35" r="14" fill="#fb7185" opacity="0.5" />
      <circle cx="83" cy="33" r="8" fill="#be123c" opacity="0.4" />
      <circle cx="55" cy="45" r="13" fill="#fecdd3" opacity="0.9" />
      <circle cx="55" cy="45" r="8" fill="#f43f5e" opacity="0.4" />
      <circle cx="95" cy="65" r="11" fill="#fecdd3" opacity="0.85" />
      <circle cx="70" cy="20" r="2.5" fill="#fbbf24" opacity="0.8" />
      <circle cx="40" cy="55" r="2.5" fill="#fbbf24" opacity="0.8" />
    </svg>
  );
}

/**
 * Purple Tree Silhouette (Siluet Pohon Ungu di Sisi Acara)
 * Sesuai foto cetak fisik
 */
function PurpleTreeSilhouette({ className = 'w-16 h-28', flip = false }) {
  return (
    <svg
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${flip ? 'scale-x-[-1]' : ''} ${className} pointer-events-none`}
    >
      <path
        d="M50 155 L50 85 Q50 65 35 45 M50 80 Q55 60 70 45 M50 95 Q38 80 25 70 M50 90 Q65 75 75 65"
        stroke="#701a75"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="48" cy="35" r="23" fill="#86198f" opacity="0.28" />
      <circle cx="32" cy="48" r="19" fill="#a21caf" opacity="0.32" />
      <circle cx="68" cy="45" r="21" fill="#701a75" opacity="0.3" />
      <circle cx="50" cy="55" r="25" fill="#c026d3" opacity="0.25" />
      <circle cx="25" cy="72" r="15" fill="#86198f" opacity="0.28" />
      <circle cx="75" cy="68" r="16" fill="#a21caf" opacity="0.28" />
    </svg>
  );
}

/**
 * Static (Print-Safe) Diamond Divider: ─── ✦ ───
 */
function PrintDiamondDivider({ text = '', dark = false, className = '' }) {
  const lineColor = dark ? 'bg-zinc-600' : 'bg-zinc-900';
  const textColor = dark ? 'text-zinc-200' : 'text-zinc-800';
  const iconColor = dark ? 'text-white' : 'text-zinc-950';

  return (
    <div className={`flex items-center justify-center gap-2.5 w-full my-2 ${className}`}>
      <div className={`h-[1px] flex-1 max-w-[85px] ${lineColor} opacity-45`} />
      <div className={`flex items-center gap-1.5 ${iconColor}`}>
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current shrink-0">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
        </svg>
        {text && (
          <span
            className={`text-[8px] tracking-[0.24em] font-clean-sans uppercase ${textColor} px-1 font-semibold whitespace-nowrap`}
          >
            {text}
          </span>
        )}
        {text && (
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current shrink-0">
            <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
          </svg>
        )}
      </div>
      <div className={`h-[1px] flex-1 max-w-[85px] ${lineColor} opacity-45`} />
    </div>
  );
}

/**
 * Static Circular Seal for Print Medallion
 */
function PrintCircularSeal({ text, id = 'printSealPath', dark = false }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
      <defs>
        <path
          id={id}
          d="M 100, 100 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
        />
      </defs>
      <text
        className={`text-[8.2px] font-clean-sans uppercase tracking-[0.28em] font-semibold ${
          dark ? 'fill-zinc-300' : 'fill-zinc-600'
        }`}
      >
        <textPath href={`#${id}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/**
 * Percetakan Crop Marks (Tanda Potong Sudut 3mm Bleed)
 */
function CropMarksOverlay({ isSpread = false, folds = [] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {/* 4 Corners Bleed 3mm */}
      <div className="absolute top-0 left-3 w-[0.5px] h-3 bg-zinc-400" />
      <div className="absolute top-3 left-0 w-3 h-[0.5px] bg-zinc-400" />

      <div className="absolute top-0 right-3 w-[0.5px] h-3 bg-zinc-400" />
      <div className="absolute top-3 right-0 w-3 h-[0.5px] bg-zinc-400" />

      <div className="absolute bottom-0 left-3 w-[0.5px] h-3 bg-zinc-400" />
      <div className="absolute bottom-3 left-0 w-3 h-[0.5px] bg-zinc-400" />

      <div className="absolute bottom-0 right-3 w-[0.5px] h-3 bg-zinc-400" />
      <div className="absolute bottom-3 right-0 w-3 h-[0.5px] bg-zinc-400" />

      {/* Crease fold notch marks */}
      {folds.map((pct, idx) => (
        <React.Fragment key={idx}>
          <div
            className="absolute top-0 w-[0.5px] h-2.5 bg-zinc-500"
            style={{ left: pct }}
          />
          <div
            className="absolute bottom-0 w-[0.5px] h-2.5 bg-zinc-500"
            style={{ left: pct }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Scannable QR Code with crisp fallback
 */
function ScannableQrBox({ url, label, sublabel, dark = false }) {
  const [imgError, setImgError] = useState(false);
  const encoded = encodeURIComponent(url || 'https://invitory.id');
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&color=09090b&bgcolor=ffffff&data=${encoded}`;

  return (
    <div className={`flex flex-col items-center text-center p-2.5 border ${
      dark ? 'border-zinc-300 bg-zinc-900 text-white' : 'border-zinc-900 bg-white text-zinc-950'
    } relative`}>
      <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
      <div className="w-16 h-16 sm:w-18 sm:h-18 p-1 bg-white flex items-center justify-center relative z-10 border border-zinc-100">
        {!imgError ? (
          <img
            src={qrSrc}
            alt={label}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg viewBox="0 0 36 36" className="w-full h-full text-zinc-950 fill-current">
            <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm2 2h2v2H6V6zm18-4h10v10H24V2zm2 2v6h6V4h-6zm2 2h2v2h-2V6zM2 24h10v10H2V24zm2 2v6h6v-6H4zm2 2h2v2H6v-2zm10-22h2v4h-2V6zm4 2h2v4h-2V8zm-4 6h4v2h-4v-2zm6 0h2v4h-2v-4zm-8 4h2v4h-2v-4zm4 4h6v2h-6v-2zm8-2h4v4h-4v-4zm-12 6h2v6h-2v-6zm6 2h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        )}
      </div>
      <span className={`text-[7.5px] font-clean-sans uppercase tracking-[0.2em] font-bold mt-1.5 relative z-10 ${
        dark ? 'text-zinc-100' : 'text-zinc-950'
      }`}>
        {label}
      </span>
      {sublabel && (
        <span className={`text-[7px] font-clean-sans mt-0.5 max-w-[120px] truncate relative z-10 ${
          dark ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          {sublabel}
        </span>
      )}
    </div>
  );
}

export default function PhysicalPrintSuite({ invitation, embeddedInDashboard = false }) {
  const texts = getInvitationTexts(invitation);
  const coverPhotoCfg = getPhotoSlotConfig(invitation, 'cover');

  // --- CONFIGURATION STATES ---
  // Layout Structure: 'flat' | 'bifold' | 'vertical-arch' | 'gatefold' | 'pocket'
  const [layoutStructure, setLayoutStructure] = useState('flat');
  // Paper Size: STRICTLY ONLY 'A4' | 'A5'
  const [paperSize, setPaperSize] = useState('A5');
  // Ink Mode: 'original' | 'eco'
  const [inkMode, setInkMode] = useState('original');
  // Paper Theme: 'cotton' | 'textured' | 'noir-cover'
  const [paperTheme, setPaperTheme] = useState('cotton');
  
  // Vertical Arch Folding Preview State ('open' | 'folded') & active side ('cover' | 'back' | 'inside')
  const [archFoldView, setArchFoldView] = useState('open'); // 'open' | 'folded'
  const [archFoldSide, setArchFoldSide] = useState('cover'); // 'cover' | 'back' | 'inside'
  // Outer Spread Back Cover 180° Head-to-Head Rotation (True by default for proper folded orientation)
  const [outerBackCoverRotation, setOuterBackCoverRotation] = useState(true);

  // Bleed & Print Toggles
  const [showCropMarks, setShowCropMarks] = useState(true);
  const [showIllustration, setShowIllustration] = useState(true);
  const [guestNamePrint, setGuestNamePrint] = useState('');
  const [showTurutMengundang, setShowTurutMengundang] = useState(true);
  const [turutMengundangText, setTurutMengundangText] = useState(
    'Keluarga Besar Bpk. H. Bambang Sutrisno\nKeluarga Besar Bpk. H. Slamet Widodo\nSegenap Kerabat & Sahabat Tercinta'
  );

  // Export Modal & Processing State
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');

  // Bride & Groom Info
  const brideName = invitation?.bride_name || 'Nor Nabilla';
  const groomName = invitation?.groom_name || 'M Yusuf Effendi';
  const brideShort = invitation?.bride_nickname || brideName.split(' ')[0] || 'Nabilla';
  const groomShort = invitation?.groom_nickname || groomName.split(' ')[0] || 'Yusuf';
  const monogram = `${brideShort.charAt(0).toUpperCase()} & ${groomShort.charAt(0).toUpperCase()}`;

  const brideParents =
    invitation?.bride_parents || 'Bapak H. Bambang Sutrisno & Ibu Hj. Endang Lestari';
  const groomParents =
    invitation?.groom_parents || 'Bapak H. Slamet Widodo & Ibu Hj. Sri Wahyuni';

  const eventDateRaw = invitation?.akad_date || invitation?.resepsi_date || '2026-10-21';
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

  // Exact calendar badge date components (as in user physical photo)
  const dayNameUpper = dateObj.toLocaleDateString('id-ID', { weekday: 'long' }).toUpperCase() || 'RABU';
  const dayNumber = dateObj.toLocaleDateString('id-ID', { day: 'numeric' }) || '21';
  const monthYearUpper = dateObj.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).toUpperCase() || 'OKTOBER 2026';

  const resepsiDateRaw = invitation?.resepsi_date || eventDateRaw;
  const formattedResepsiDate = new Date(resepsiDateRaw).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const akadTime = `${invitation?.akad_time?.slice(0, 5) || '08:00'} WIB - Selesai`;
  const resepsiTime = `${invitation?.resepsi_time?.slice(0, 5) || '11:00'} WIB - Selesai`;

  const akadLocation = invitation?.akad_location || 'Kediaman Mempelai Wanita';
  const akadAddress =
    invitation?.akad_address ||
    'Dsn. Pohjejer RT 02/ RW 06 Ds. Bulang Kec. Prambon Kab. Sidoarjo';
  const resepsiLocation = invitation?.resepsi_location || 'Kediaman Mempelai Wanita';
  const resepsiAddress =
    invitation?.resepsi_address ||
    'Dsn. Pohjejer RT 02/ RW 06 Ds. Bulang Kec. Prambon Kab. Sidoarjo';

  const slug = invitation?.slug || 'lusy-dedik';
  const onlineInvitationUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${slug}`
      : `https://invitory.id/${slug}`;
  const mapsUrl =
    invitation?.resepsi_map_url ||
    invitation?.akad_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(resepsiLocation)}`;

  const coverPhotoSrc =
    invitation?.cover_photo_url ||
    invitation?.hero_image_url ||
    '/templates/minimal-monochrome/couple_real.png';

  // --- INK MODE & PAPER STYLING LOGIC ---
  const isNoirCoverEffective = inkMode === 'eco' ? false : paperTheme === 'noir-cover';
  const paperBgEffective =
    inkMode === 'eco'
      ? 'bg-white'
      : paperTheme === 'textured'
      ? 'bg-paper-texture'
      : 'bg-white';

  const getBadgeClass = (dark = false) => {
    if (inkMode === 'eco') {
      return 'border border-zinc-950 bg-white text-zinc-950';
    }
    return dark ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white';
  };

  // --- ACTIONS: EXPORT HELPERS ---
  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportProgress('Menyiapkan generator PDF kualitas percetakan...');
    try {
      const isLandscape = layoutStructure === 'bifold' || layoutStructure === 'gatefold';
      const pdfFormat = paperSize.toLowerCase(); // 'a4' | 'a5'
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: pdfFormat,
      });

      const sheets = document.querySelectorAll('.print-target-sheet');
      if (!sheets || sheets.length === 0) {
        alert('Tidak ada lembar cetak yang terdeteksi.');
        setIsExporting(false);
        return;
      }

      for (let i = 0; i < sheets.length; i++) {
        setExportProgress(`Mengonversi lembar ${i + 1} dari ${sheets.length} ke PDF (${paperSize})...`);
        const sheet = sheets[i];
        const canvas = await html2canvas(sheet, {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: inkMode === 'eco' ? '#ffffff' : '#fdfdfb',
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        if (i > 0) {
          pdf.addPage(pdfFormat, isLandscape ? 'landscape' : 'portrait');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      }

      setExportProgress('Menyelesaikan file PDF...');
      const filename = `Undangan-Cetak-Atelier-${layoutStructure}-${paperSize}-${inkMode}.pdf`;
      pdf.save(filename);
      setShowExportModal(false);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Terjadi kendala saat merender PDF. Anda juga bisa menggunakan tombol Cetak Langsung Browser (Save as PDF).');
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportImages = async (format = 'png') => {
    setIsExporting(true);
    const ext = format === 'jpg' ? 'jpg' : 'png';
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    setExportProgress(`Menyiapkan export gambar ${ext.toUpperCase()} (${paperSize} • 300 DPI)...`);

    try {
      const sheets = document.querySelectorAll('.print-target-sheet');
      if (!sheets || sheets.length === 0) {
        alert('Tidak ada lembar cetak yang terdeteksi.');
        setIsExporting(false);
        return;
      }

      for (let i = 0; i < sheets.length; i++) {
        setExportProgress(`Merender lembar ${i + 1} dari ${sheets.length} (${paperSize} • 300 DPI)...`);
        const sheet = sheets[i];
        const canvas = await html2canvas(sheet, {
          scale: 3, // ~300 DPI
          useCORS: true,
          logging: false,
          backgroundColor: inkMode === 'eco' ? '#ffffff' : '#fdfdfb',
        });
        const link = document.createElement('a');
        link.download = `Atelier-LineArt-${layoutStructure}-${paperSize}-${inkMode}-Lembar-${i + 1}.${ext}`;
        link.href = canvas.toDataURL(mime, 0.95);
        link.click();
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      setShowExportModal(false);
    } catch (error) {
      console.error('Image export failed:', error);
      alert('Gagal mengekspor gambar.');
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  // ==========================================
  // SHEET RENDERERS
  // ==========================================

  // SHEET 1: SAMPUL DEPAN (FRONT COVER) - A5
  const renderFrontCoverSheet = (isHalfSpread = false) => (
    <div
      className={`print-sheet print-target-sheet relative w-full ${
        isHalfSpread ? 'h-full' : 'max-w-[460px] aspect-[148/210]'
      } mx-auto shadow-xl border ${
        isNoirCoverEffective
          ? 'bg-zinc-950 text-white border-zinc-800'
          : `${paperBgEffective} text-zinc-950 border-zinc-300`
      } p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && !isHalfSpread && <CropMarksOverlay />}

      <div
        className={`absolute inset-3 border-2 pointer-events-none ${
          isNoirCoverEffective ? 'border-zinc-200' : 'border-zinc-950'
        }`}
      />
      <div
        className={`absolute inset-4.5 border pointer-events-none ${
          isNoirCoverEffective ? 'border-zinc-700' : 'border-zinc-300'
        }`}
      />

      <PrintBotanicalCorner position="top-left" dark={isNoirCoverEffective} className="w-12 h-12 absolute top-5 left-5 opacity-90" />
      <PrintBotanicalCorner position="top-right" dark={isNoirCoverEffective} className="w-12 h-12 absolute top-5 right-5 opacity-90" />
      <PrintBotanicalCorner position="bottom-left" dark={isNoirCoverEffective} className="w-12 h-12 absolute bottom-5 left-5 opacity-90" />
      <PrintBotanicalCorner position="bottom-right" dark={isNoirCoverEffective} className="w-12 h-12 absolute bottom-5 right-5 opacity-90" />

      {/* Top Header */}
      <div className="text-center pt-2 relative z-10">
        <span
          className={`inline-block px-3 py-0.5 text-[8px] font-clean-sans uppercase tracking-[0.35em] font-semibold ${getBadgeClass(
            isNoirCoverEffective
          )}`}
        >
          {texts.hero_badge || "WALIMATUL 'URS"}
        </span>
        <p
          className={`text-[8px] font-clean-sans uppercase tracking-[0.3em] mt-1.5 font-medium ${
            isNoirCoverEffective ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          {texts.hero_subtitle || 'THE WEDDING CELEBRATION OF'}
        </p>
      </div>

      {/* Center Medallion & Names */}
      <div className="flex flex-col items-center justify-center my-auto py-1 relative z-10 text-center">
        {showIllustration ? (
          <div className="relative mb-4">
            <div className="absolute -inset-4 pointer-events-none">
              <PrintCircularSeal
                id="coverSealPath"
                dark={isNoirCoverEffective}
                text={`${brideName.toUpperCase()} & ${groomName.toUpperCase()} • WALIMATUL 'URS • `}
              />
            </div>
            <div
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 p-1.5 bg-white shadow-md flex items-center justify-center relative ${
                isNoirCoverEffective ? 'border-zinc-200' : 'border-zinc-950'
              }`}
            >
              <div className="w-full h-full rounded-full border border-dashed border-zinc-300 overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={coverPhotoSrc}
                  alt={`${brideName} & ${groomName}`}
                  style={coverPhotoCfg.style}
                  className={`w-full h-full ${coverPhotoCfg.filterClass}`}
                  onError={(e) => {
                    e.currentTarget.src = '/templates/minimal-monochrome/couple_real.png';
                  }}
                />
              </div>
              <div
                className={`absolute -bottom-1.5 right-2.5 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[8.5px] font-editorial-serif font-bold ${
                  inkMode === 'eco'
                    ? 'bg-white text-zinc-950 border-zinc-950 ring-1 ring-zinc-950'
                    : 'bg-zinc-950 text-white'
                }`}
              >
                {monogram}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`w-22 h-22 rounded-full border-2 flex flex-col items-center justify-center mb-4 ${
              isNoirCoverEffective ? 'border-zinc-200 bg-zinc-900' : 'border-zinc-950 bg-white'
            }`}
          >
            <span className="font-editorial-serif italic text-2xl font-bold tracking-widest">
              {monogram}
            </span>
          </div>
        )}

        <h1 className="font-script-calligraphy text-3.5xl sm:text-4xl leading-none">
          {brideName}
        </h1>
        <div className="flex items-center justify-center gap-3 my-0.5">
          <span className={`w-7 h-[1px] ${isNoirCoverEffective ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
          <span className="font-editorial-serif italic text-base">&amp;</span>
          <span className={`w-7 h-[1px] ${isNoirCoverEffective ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
        </div>
        <h2 className="font-script-calligraphy text-3.5xl sm:text-4xl leading-none">
          {groomName}
        </h2>

        <p
          className={`text-[9px] font-clean-sans tracking-[0.28em] uppercase font-semibold mt-2.5 ${
            isNoirCoverEffective ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Guest Label Box */}
      <div className="pb-1 relative z-10">
        <div
          className={`max-w-[260px] mx-auto py-2 px-4 border text-center relative ${
            isNoirCoverEffective
              ? 'bg-zinc-900/90 border-zinc-300 text-white'
              : 'bg-white border-zinc-950 text-zinc-950'
          }`}
        >
          <div
            className={`absolute inset-0.5 border pointer-events-none ${
              isNoirCoverEffective ? 'border-zinc-700' : 'border-zinc-200'
            }`}
          />
          <span
            className={`text-[7.5px] uppercase tracking-[0.22em] font-clean-sans block mb-1 ${
              isNoirCoverEffective ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            {texts.cover_guest_label || 'Kepada Yth. Bapak/Ibu/Saudara/i:'}
          </span>

          {guestNamePrint.trim() ? (
            <p className="font-editorial-serif font-bold text-sm leading-snug">
              {guestNamePrint}
            </p>
          ) : (
            <div className="pt-2 pb-0.5 px-2">
              <div
                className={`border-b border-dashed w-full mb-1.5 ${
                  isNoirCoverEffective ? 'border-zinc-600' : 'border-zinc-400'
                }`}
              />
              <span
                className={`text-[7px] font-clean-sans tracking-[0.2em] uppercase ${
                  isNoirCoverEffective ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                Di Tempat
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // SHEET 2: ISI UTAMA — MEMPELAI & AYAT SUCI (MAIN CARD) - A5
  const renderMainCoupleSheet = (isHalfSpread = false) => (
    <div
      className={`print-sheet print-target-sheet relative w-full ${
        isHalfSpread ? 'h-full' : 'max-w-[460px] aspect-[148/210]'
      } mx-auto shadow-xl border border-zinc-300 ${paperBgEffective} text-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && !isHalfSpread && <CropMarksOverlay />}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-editorial-serif text-[120px] font-bold text-zinc-900/[0.025] tracking-widest leading-none">
          {brideShort.charAt(0)}&amp;{groomShort.charAt(0)}
        </span>
      </div>

      <div className="absolute inset-3 border-2 border-zinc-950 pointer-events-none" />
      <div className="absolute inset-4.5 border border-zinc-300 pointer-events-none" />

      <PrintBotanicalCorner position="top-left" className="w-11 h-11 absolute top-5 left-5 opacity-85" />
      <PrintBotanicalCorner position="top-right" className="w-11 h-11 absolute top-5 right-5 opacity-85" />
      <PrintBotanicalCorner position="bottom-left" className="w-11 h-11 absolute bottom-5 left-5 opacity-85" />
      <PrintBotanicalCorner position="bottom-right" className="w-11 h-11 absolute bottom-5 right-5 opacity-85" />

      {/* Top Bismillah & Ayat Suci */}
      <div className="text-center pt-2 px-2 relative z-10">
        <p className="font-arabic text-xl sm:text-2xl text-zinc-950 mb-1.5 leading-relaxed">
          {texts.opening_bismillah || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
        </p>
        <p className="font-editorial-serif italic text-[10px] sm:text-[10.5px] text-zinc-700 leading-relaxed max-w-[320px] mx-auto">
          &ldquo;{texts.opening_text}&rdquo;
        </p>
        <span className="inline-block text-[8px] font-clean-sans uppercase tracking-[0.24em] font-bold text-zinc-900 mt-1">
          — {texts.opening_surah || 'QS. Ar-Rum: 21'} —
        </span>
      </div>

      <PrintDiamondDivider text="ASSALAMU'ALAIKUM WR. WB." />

      {/* Center Couple Details */}
      <div className="text-center px-3 my-auto relative z-10 space-y-2.5">
        <p className="text-[9px] font-clean-sans text-zinc-600 leading-relaxed max-w-[310px] mx-auto">
          {texts.couple_intro_text}
        </p>

        {/* Bride */}
        <div>
          <span className={`inline-block px-2.5 py-0.5 text-[7px] font-clean-sans uppercase tracking-[0.28em] font-semibold mb-0.5 ${getBadgeClass()}`}>
            {texts.bride_role_label || 'THE BRIDE'}
          </span>
          <h2 className="font-script-calligraphy text-3xl sm:text-3.5xl text-zinc-950 leading-tight">
            {brideName}
          </h2>
          <p className="text-[8px] font-clean-sans uppercase tracking-[0.18em] text-zinc-500 font-semibold mt-0.5">
            {texts.bride_parents_label || 'Putri Tercinta Dari'}
          </p>
          <p className="font-editorial-serif font-semibold text-xs text-zinc-900">
            {brideParents}
          </p>
        </div>

        {/* Ampersand */}
        <div className="flex items-center justify-center gap-3 py-0.5">
          <div className="h-[1px] w-10 bg-zinc-300" />
          <div className="w-6 h-6 rounded-full border border-zinc-950 flex items-center justify-center font-editorial-serif italic text-xs font-bold bg-white">
            &amp;
          </div>
          <div className="h-[1px] w-10 bg-zinc-300" />
        </div>

        {/* Groom */}
        <div>
          <span className={`inline-block px-2.5 py-0.5 text-[7px] font-clean-sans uppercase tracking-[0.28em] font-semibold mb-0.5 ${getBadgeClass()}`}>
            {texts.groom_role_label || 'THE GROOM'}
          </span>
          <h2 className="font-script-calligraphy text-3xl sm:text-3.5xl text-zinc-950 leading-tight">
            {groomName}
          </h2>
          <p className="text-[8px] font-clean-sans uppercase tracking-[0.18em] text-zinc-500 font-semibold mt-0.5">
            {texts.groom_parents_label || 'Putra Tercinta Dari'}
          </p>
          <p className="font-editorial-serif font-semibold text-xs text-zinc-900">
            {groomParents}
          </p>
        </div>
      </div>

      {/* Footer Monogram */}
      <div className="text-center pb-1 relative z-10">
        <div className="w-14 h-[1px] bg-zinc-300 mx-auto mb-1" />
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.32em] text-zinc-500 font-semibold">
          {brideShort.toUpperCase()} &amp; {groomShort.toUpperCase()} • HAUTE ATELIER
        </span>
      </div>
    </div>
  );

  // SHEET 3: RANGKAIAN ACARA & QR CODE DIGITAL - A5
  const renderEventAndQrSheet = (isHalfSpread = false) => (
    <div
      className={`print-sheet print-target-sheet relative w-full ${
        isHalfSpread ? 'h-full' : 'max-w-[460px] aspect-[148/210]'
      } mx-auto shadow-xl border border-zinc-300 ${paperBgEffective} text-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && !isHalfSpread && <CropMarksOverlay />}

      <div className="absolute inset-3 border-2 border-zinc-950 pointer-events-none" />
      <div className="absolute inset-4.5 border border-zinc-300 pointer-events-none" />

      <PrintBotanicalCorner position="top-left" className="w-11 h-11 absolute top-5 left-5 opacity-85" />
      <PrintBotanicalCorner position="top-right" className="w-11 h-11 absolute top-5 right-5 opacity-85" />
      <PrintBotanicalCorner position="bottom-left" className="w-11 h-11 absolute bottom-5 left-5 opacity-85" />
      <PrintBotanicalCorner position="bottom-right" className="w-11 h-11 absolute bottom-5 right-5 opacity-85" />

      {/* Top Event Header */}
      <div className="text-center pt-1.5 relative z-10">
        <div className="w-11 h-13 mx-auto mb-1 p-1 rounded-t-full border border-zinc-950 bg-white flex items-center justify-center overflow-hidden">
          <img
            src="/templates/minimal-monochrome/mosque_lineart.jpg"
            alt="Mosque Arch"
            className="w-full h-full object-contain filter contrast-125"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.3em] text-zinc-500 font-semibold block">
          {texts.event_badge || 'WAKTU & TEMPAT PELAKSANAAN'}
        </span>
        <h3 className="font-editorial-serif text-xl sm:text-2xl text-zinc-950 font-semibold leading-tight">
          {texts.event_title || 'Rangkaian Acara'}
        </h3>
      </div>

      {/* Dual Event Schedule Boxes */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5 relative z-10">
        {/* Akad Nikah */}
        <div className="border border-zinc-950 bg-white p-2.5 text-center relative">
          <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
          <span className={`inline-block px-2 py-0.5 text-[7px] font-clean-sans uppercase tracking-[0.24em] font-semibold mb-1 ${getBadgeClass()}`}>
            {texts.akad_title || 'AKAD NIKAH'}
          </span>
          <p className="font-editorial-serif font-bold text-[11px] text-zinc-950 leading-snug">
            {formattedDateLong}
          </p>
          <p className="text-[8.5px] font-clean-sans font-semibold text-zinc-700 mt-0.5 pb-1 border-b border-dashed border-zinc-300">
            Pukul {akadTime}
          </p>
          <p className="font-editorial-serif font-bold text-[10px] text-zinc-950 mt-1 leading-tight">
            {akadLocation}
          </p>
          <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5 leading-relaxed truncate">
            {akadAddress}
          </p>
        </div>

        {/* Resepsi Pernikahan */}
        <div className="border border-zinc-950 bg-white p-2.5 text-center relative">
          <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
          <span className={`inline-block px-2 py-0.5 text-[7px] font-clean-sans uppercase tracking-[0.24em] font-semibold mb-1 ${getBadgeClass()}`}>
            {texts.resepsi_title || 'RESEPSI'}
          </span>
          <p className="font-editorial-serif font-bold text-[11px] text-zinc-950 leading-snug">
            {formattedResepsiDate}
          </p>
          <p className="text-[8.5px] font-clean-sans font-semibold text-zinc-700 mt-0.5 pb-1 border-b border-dashed border-zinc-300">
            Pukul {resepsiTime}
          </p>
          <p className="font-editorial-serif font-bold text-[10px] text-zinc-950 mt-1 leading-tight">
            {resepsiLocation}
          </p>
          <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5 leading-relaxed truncate">
            {resepsiAddress}
          </p>
        </div>
      </div>

      {/* Turut Mengundang */}
      {showTurutMengundang && turutMengundangText.trim() && (
        <div className="text-center py-1 px-2 border-y border-dashed border-zinc-300 bg-zinc-50/60 relative z-10">
          <span className="text-[7px] font-clean-sans uppercase tracking-[0.26em] font-bold text-zinc-700 block mb-0.5">
            Turut Mengundang:
          </span>
          <div className="text-[8px] font-editorial-serif text-zinc-800 leading-snug space-y-0.5">
            {turutMengundangText
              .split('\n')
              .filter((l) => l.trim())
              .slice(0, 3)
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {/* Smart QR Bridge */}
      <div className="grid grid-cols-2 gap-2.5 my-1 relative z-10">
        <ScannableQrBox
          url={onlineInvitationUrl}
          label="RSVP & Web Digital"
          sublabel={`/${slug}`}
        />
        <ScannableQrBox
          url={mapsUrl}
          label="Scan Lokasi Acara"
          sublabel={resepsiLocation}
        />
      </div>

      {/* Closing & Signature */}
      <div className="text-center pb-1 relative z-10">
        <p className="text-[8px] font-clean-sans text-zinc-600 leading-relaxed max-w-[320px] mx-auto mb-0.5">
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu berkenan hadir memberikan doa restu.
        </p>
        <p className="font-editorial-serif italic font-semibold text-[9.5px] text-zinc-900">
          {texts.closing_greeting || "Wassalamu'alaikum Warahmatullahi Wabarakatuh"}
        </p>
        <p className="font-script-calligraphy text-xl text-zinc-950 mt-0.5 leading-none">
          {brideShort} &amp; {groomShort}
        </p>
      </div>
    </div>
  );

  // SHEET 4: COVER BELAKANG / BACK COVER - A5
  const renderBackCoverSheet = (isHalfSpread = false) => (
    <div
      className={`print-sheet print-target-sheet relative w-full ${
        isHalfSpread ? 'h-full' : 'max-w-[460px] aspect-[148/210]'
      } mx-auto shadow-xl border border-zinc-300 ${
        isNoirCoverEffective ? 'bg-zinc-950 text-white border-zinc-800' : `${paperBgEffective} text-zinc-950`
      } p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && !isHalfSpread && <CropMarksOverlay />}

      <div className={`absolute inset-3 border-2 pointer-events-none ${isNoirCoverEffective ? 'border-zinc-200' : 'border-zinc-950'}`} />
      <div className={`absolute inset-4.5 border pointer-events-none ${isNoirCoverEffective ? 'border-zinc-700' : 'border-zinc-300'}`} />

      <PrintBotanicalCorner position="top-left" dark={isNoirCoverEffective} className="w-11 h-11 absolute top-5 left-5 opacity-80" />
      <PrintBotanicalCorner position="top-right" dark={isNoirCoverEffective} className="w-11 h-11 absolute top-5 right-5 opacity-80" />
      <PrintBotanicalCorner position="bottom-left" dark={isNoirCoverEffective} className="w-11 h-11 absolute bottom-5 left-5 opacity-80" />
      <PrintBotanicalCorner position="bottom-right" dark={isNoirCoverEffective} className="w-11 h-11 absolute bottom-5 right-5 opacity-80" />

      {/* Top Monogram */}
      <div className="text-center pt-3 relative z-10">
        <div className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center font-editorial-serif font-bold italic text-xl ${
          isNoirCoverEffective ? 'border-zinc-300 text-white bg-zinc-900' : 'border-zinc-950 text-zinc-950 bg-white'
        }`}>
          {monogram}
        </div>
        <p className={`text-[8px] font-clean-sans uppercase tracking-[0.3em] font-semibold mt-2 ${
          isNoirCoverEffective ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          THE WEDDING OF {brideShort.toUpperCase()} &amp; {groomShort.toUpperCase()}
        </p>
      </div>

      {/* Center Closing Blessing */}
      <div className="text-center px-4 my-auto relative z-10">
        <p className="font-arabic text-lg sm:text-xl mb-2">
          جَزَاكُمُ اللَّهُ خَيْرًا
        </p>
        <p className={`font-editorial-serif italic text-xs leading-relaxed max-w-[280px] mx-auto ${
          isNoirCoverEffective ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          &ldquo;Tiada rangkaian kata terindah selain rasa syukur dan terima kasih yang tulus atas kehadiran serta untaian doa restu Bapak/Ibu/Saudara/i sekalian.&rdquo;
        </p>
        <div className={`w-12 h-[1px] mx-auto my-3 ${isNoirCoverEffective ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
        <p className="font-script-calligraphy text-2xl text-current">
          {brideName} &amp; {groomName}
        </p>
        <p className={`text-[8px] font-clean-sans uppercase tracking-[0.22em] mt-1 ${
          isNoirCoverEffective ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          {formattedDateUpper}
        </p>
      </div>

      {/* Bottom Barcode / Atelier Hallmark */}
      <div className="text-center pb-2 relative z-10">
        <div className="inline-flex flex-col items-center">
          <div className={`flex items-center gap-1 mb-1 ${isNoirCoverEffective ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <span className="text-[7px] font-clean-sans tracking-[0.35em] uppercase">HAUTE ATELIER LINE-ART</span>
          </div>
          <span className={`text-[6.5px] font-clean-sans tracking-[0.25em] ${isNoirCoverEffective ? 'text-zinc-600' : 'text-zinc-400'}`}>
            OFFICIAL PRINT SUITE • {slug.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );

  // SHEET 5: KUPON SOUVENIR, THANK YOU TAG & BELLY BAND - A5
  const renderSouvenirAndTagsSheet = () => (
    <div
      className={`print-sheet print-target-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-xl border border-zinc-300 bg-white text-zinc-950 p-5 sm:p-6 flex flex-col justify-between overflow-hidden select-none`}
    >
      {showCropMarks && <CropMarksOverlay />}

      <div className="text-center border-b border-dashed border-zinc-300 pb-1.5">
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.28em] text-zinc-400 font-semibold">
          ✂ LEMBAR POTONG PELENGKAP CETAK (SOUVENIR, TAG &amp; BELLY BAND) ✂
        </span>
      </div>

      {/* 4x Souvenir Coupons */}
      <div>
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.22em] text-zinc-500 font-semibold block mb-1">
          1. Kupon Penukaran Souvenir (4 Pcs)
        </span>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="border border-dashed border-zinc-400 p-1 bg-white">
              <div className={`border border-zinc-950 p-2 text-center relative ${inkMode === 'eco' ? 'bg-white' : 'bg-paper-texture'}`}>
                <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
                <span className={`inline-block px-1.5 py-0.2 text-[6px] font-clean-sans uppercase tracking-[0.24em] font-semibold mb-0.5 ${getBadgeClass()}`}>
                  KUPON SOUVENIR
                </span>
                <p className="font-script-calligraphy text-lg text-zinc-950 leading-tight">
                  {brideShort} &amp; {groomShort}
                </p>
                <p className="text-[7px] font-clean-sans uppercase tracking-[0.16em] text-zinc-600">
                  {formattedDateShort}
                </p>
                <p className="text-[6px] font-clean-sans text-zinc-500 mt-0.5 italic">
                  Tukarkan di meja penerima tamu
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2x Thank You Tags */}
      <div>
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.22em] text-zinc-500 font-semibold block mb-1">
          2. Kartu Ucapan Souvenir (Thank You Tag)
        </span>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map((num) => (
            <div key={num} className="border border-dashed border-zinc-400 p-1 bg-white">
              <div className="border border-zinc-950 p-2.5 text-center relative bg-white flex flex-col items-center">
                <div className="w-2 h-2 rounded-full border border-zinc-950 mb-1" />
                <span className="text-[6.5px] font-clean-sans uppercase tracking-[0.26em] text-zinc-500 font-semibold">
                  TERIMA KASIH DOA RESTUNYA
                </span>
                <p className="font-script-calligraphy text-xl text-zinc-950 my-0.5">
                  {brideName} &amp; {groomName}
                </p>
                <span className="text-[7px] font-clean-sans tracking-[0.22em] uppercase font-bold text-zinc-800">
                  {formattedDateUpper}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Belly Band */}
      <div>
        <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.22em] text-zinc-500 font-semibold block mb-1">
          3. Belly Band / Sabuk Kertas Pengikat Undangan
        </span>
        <div className="border border-dashed border-zinc-400 p-1">
          <div className={`border-y-2 border-zinc-950 py-2.5 px-3 flex items-center justify-between relative ${
            inkMode === 'eco' ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white'
          }`}>
            <span className={`text-[7px] font-clean-sans uppercase tracking-[0.28em] ${inkMode === 'eco' ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {brideName.toUpperCase()}
            </span>
            <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-editorial-serif font-bold text-[11px] shadow-sm shrink-0 ${
              inkMode === 'eco'
                ? 'bg-white text-zinc-950 border-zinc-950 ring-1 ring-zinc-950'
                : 'bg-white text-zinc-950 border-zinc-950 ring-2 ring-white'
            }`}>
              {monogram}
            </div>
            <span className={`text-[7px] font-clean-sans uppercase tracking-[0.28em] ${inkMode === 'eco' ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {groomName.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // MODEL BARU: VERTICAL ARCH & FLORAL BIFOLD
  // (SESUAI FOTO FISIK CETAK DARI PENGGUNA - A4 BISA DILIPAT JADI A5)
  // ==========================================
  const renderVerticalArchLayout = () => {
    const isA4 = paperSize === 'A4';
    const sheetAspectClass = isA4 ? 'max-w-[560px] aspect-[210/297]' : 'max-w-[440px] aspect-[148/210]';
    const foldedAspectClass = isA4 ? 'max-w-[560px] aspect-[210/148.5]' : 'max-w-[440px] aspect-[148/105]';
    const foldedSizeLabel = isA4 ? 'A5 (210 × 148.5 mm)' : 'A6 (148 × 105 mm)';
    const unfoldedSizeLabel = isA4 ? 'A4 (210 × 297 mm)' : 'A5 (148 × 210 mm)';

    return (
      <div className="space-y-8">
        {/* INTERACTIVE FOLD/UNFOLD CONTROLLER (NO-PRINT) */}
        <div className="no-print bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200 rounded-3xl p-4 sm:p-5 max-w-[560px] mx-auto shadow-sm space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <FoldHorizontal className="w-3.5 h-3.5 text-purple-600" />
                <span>Simulasi Lipat Kertas {paperSize}</span>
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {archFoldView === 'folded'
                  ? `Hasil Jadi Kartu Terlipat • ${foldedSizeLabel}`
                  : `Lembar Cetak Utuh • ${unfoldedSizeLabel}`}
              </h4>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setArchFoldView('open')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  archFoldView === 'open'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Utuh ({paperSize})</span>
              </button>
              <button
                type="button"
                onClick={() => setArchFoldView('folded')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  archFoldView === 'folded'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FoldHorizontal className="w-3.5 h-3.5" />
                <span>Simulasi Lipat ({isA4 ? 'A5' : 'A6'}) 🔥</span>
              </button>
            </div>
          </div>

          {/* Secondary Sub-Tabs when in Folded Mode */}
          {archFoldView === 'folded' && (
            <div className="pt-2.5 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Tampilan Lipat:</span>
                {[
                  { id: 'cover', label: '1. Cover Depan (Nama Tamu)' },
                  { id: 'back', label: '2. Cover Belakang (QR & Doa)' },
                  { id: 'inside', label: '3. Buka Isi Undangan' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setArchFoldSide(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      archFoldSide === tab.id
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Lipat tengah horizontal di {isA4 ? '148.5 mm' : '105 mm'}
              </span>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* SIMULASI TAMPILAN TERLIPAT (INTERACTIVE 3D FOLDED PREVIEW) */}
        {/* ---------------------------------------------------- */}
        {archFoldView === 'folded' && (
          <div className="no-print space-y-4">
            {/* 1. FRONT COVER OF FOLDED CARD */}
            {archFoldSide === 'cover' && (
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Tampak Muka Depan Kartu (Setelah Kertas {paperSize} Dilipat Menjadi {foldedSizeLabel})
                  </span>
                </div>
                <div
                  className={`relative w-full ${foldedAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 ${
                    inkMode === 'eco' ? 'bg-white' : 'bg-[#fffdfa]'
                  } text-zinc-950 p-6 sm:p-7 flex flex-col justify-between overflow-hidden rounded-t-sm select-none transition-all duration-300`}
                >
                  {/* Fold Edge Crease Indicator (Simulates the top folded edge) */}
                  <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-stone-400/25 to-transparent pointer-events-none border-b border-stone-300/60" />
                  <div className="absolute top-1 inset-x-0 flex justify-center pointer-events-none">
                    <span className="px-2 py-0.2 bg-stone-100/90 border border-stone-300 rounded-full text-[6.5px] font-bold uppercase tracking-widest text-stone-600">
                      ▲ Sisi Lipatan Atas (Folded Edge) ▲
                    </span>
                  </div>

                  {inkMode !== 'eco' && (
                    <>
                      <WatercolorCornerFlourish position="bottom-left" className="w-24 h-24 absolute bottom-0 left-0 opacity-85" />
                      <WatercolorCornerFlourish position="bottom-right" className="w-24 h-24 absolute bottom-0 right-0 opacity-85" />
                    </>
                  )}

                  <div className="text-center pt-3 relative z-10">
                    <span className={`inline-block px-3 py-0.5 text-[7.5px] font-clean-sans uppercase tracking-[0.3em] font-semibold ${getBadgeClass()}`}>
                      UNDANGAN PERNIKAHAN
                    </span>
                    <p className="font-script-calligraphy text-2.5xl sm:text-3xl text-zinc-950 mt-1.5 mb-0.5">
                      {brideName} &amp; {groomName}
                    </p>
                    <p className="text-[8.5px] font-clean-sans uppercase tracking-[0.25em] font-bold text-zinc-700">
                      {formattedDateUpper}
                    </p>
                  </div>

                  {/* Kotak Nama Tamu di Cover */}
                  <div className="my-auto relative z-10 max-w-[280px] mx-auto w-full py-2.5 px-4 border border-zinc-950 bg-white text-center shadow-xs">
                    <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
                    <span className="text-[7px] uppercase tracking-[0.2em] font-clean-sans text-zinc-500 block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <p className="font-editorial-serif font-bold text-sm text-zinc-950 truncate">
                      {guestNamePrint.trim() || 'Nama Tamu Undangan'}
                    </p>
                    <span className="text-[6.5px] font-clean-sans uppercase tracking-widest text-zinc-400 mt-0.5 block">
                      Di Tempat
                    </span>
                  </div>

                  <div className="text-center pb-1 relative z-10 flex items-center justify-between text-[7px] text-zinc-400">
                    <span>HAUTE ATELIER</span>
                    <span className="tracking-[0.25em] uppercase">OFFICIAL PRINT SUITE</span>
                    <span>{paperSize} FOLD</span>
                  </div>
                </div>

                {/* Quick Action Navigation below card */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setArchFoldSide('inside')}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Buka Isi Undangan (Lihat Bagian Dalam)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchFoldSide('back')}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Balik ke Cover Belakang ➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. BACK COVER OF FOLDED CARD */}
            {archFoldSide === 'back' && (
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Tampak Belakang Kartu (Cover Belakang Saat Terlipat • QR Map &amp; Doa)
                  </span>
                </div>
                <div
                  className={`relative w-full ${foldedAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 ${
                    inkMode === 'eco' ? 'bg-white' : 'bg-[#fffdfa]'
                  } text-zinc-950 p-6 sm:p-7 flex flex-col justify-between overflow-hidden rounded-t-sm select-none transition-all duration-300`}
                >
                  <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-stone-400/25 to-transparent pointer-events-none border-b border-stone-300/60" />
                  <div className="absolute top-1 inset-x-0 flex justify-center pointer-events-none">
                    <span className="px-2 py-0.2 bg-stone-100/90 border border-stone-300 rounded-full text-[6.5px] font-bold uppercase tracking-widest text-stone-600">
                      ▲ Sisi Lipatan Atas (Folded Edge) ▲
                    </span>
                  </div>

                  {inkMode !== 'eco' && (
                    <>
                      <WatercolorCornerFlourish position="top-left" className="w-20 h-20 absolute top-0 left-0 opacity-80" />
                      <WatercolorCornerFlourish position="top-right" className="w-20 h-20 absolute top-0 right-0 opacity-80" />
                    </>
                  )}

                  <div className="text-center pt-3 relative z-10">
                    <div className="w-11 h-11 mx-auto rounded-full border border-zinc-950 flex items-center justify-center font-editorial-serif font-bold italic text-base bg-white mb-1 shadow-xs">
                      {monogram}
                    </div>
                    <p className="text-[7.5px] font-clean-sans uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                      THE WEDDING CELEBRATION
                    </p>
                  </div>

                  <div className="text-center px-4 my-auto relative z-10">
                    <p className="font-arabic text-base sm:text-lg mb-1">
                      بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                    </p>
                    <p className="font-editorial-serif italic text-[9.5px] sm:text-[10px] text-zinc-700 leading-relaxed max-w-[280px] mx-auto">
                      &ldquo;Semoga Allah memberkahimu dan memberkahi atasmu serta mengumpulkan kalian berdua dalam kebaikan.&rdquo;
                    </p>
                    <div className="pt-2">
                      <ScannableQrBox
                        url={onlineInvitationUrl}
                        label="RSVP & Peta Lokasi"
                        sublabel={`/${slug}`}
                      />
                    </div>
                  </div>

                  <div className="text-center pb-1 text-[7px] font-clean-sans uppercase tracking-[0.22em] text-zinc-400 relative z-10">
                    HAUTE ATELIER • DUPLEX BACK COVER
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setArchFoldSide('cover')}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>⬅ Balik ke Cover Depan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchFoldSide('inside')}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Buka Isi Undangan ➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. INSIDE VIEW OF FOLDED CARD (OPEN SPREAD WITH 3D CREASE) */}
            {archFoldSide === 'inside' && (
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Tampak Sisi Dalam Terbuka (Kubah Foto di Atas &amp; Jadwal di Bawah Terhubung Lipatan)
                  </span>
                </div>
                <div
                  className={`relative w-full ${sheetAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 ${
                    inkMode === 'eco' ? 'bg-white' : 'bg-[#fffdfa]'
                  } text-zinc-950 flex flex-col justify-between overflow-hidden select-none transition-all duration-300`}
                >
                  {/* UPPER PANEL: ARCH & NAMES */}
                  <div className="relative h-1/2 p-6 sm:p-7 flex flex-col justify-between">
                    {inkMode !== 'eco' && (
                      <WatercolorCornerFlourish position="top-right" className="w-28 h-28 absolute top-0 right-0 opacity-90 z-0" />
                    )}

                    <div className="flex items-start gap-4 sm:gap-5 relative z-10 pt-2">
                      <div className="relative shrink-0 flex flex-col items-center">
                        <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-t-full border-2 border-stone-300 overflow-hidden bg-white shadow-md flex items-center justify-center p-1">
                          <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100 flex items-center justify-center">
                            <img
                              src={coverPhotoSrc}
                              alt={`${brideName} & ${groomName}`}
                              style={coverPhotoCfg.style}
                              className={`w-full h-full object-cover ${coverPhotoCfg.filterClass}`}
                              onError={(e) => {
                                e.currentTarget.src = '/templates/minimal-monochrome/couple_real.png';
                              }}
                            />
                          </div>
                        </div>

                        {inkMode !== 'eco' && (
                          <div className="-mt-6 relative z-10">
                            <WatercolorFloralCluster className="w-32 sm:w-36 h-14" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-left pt-1">
                        <p className="font-script-calligraphy text-base sm:text-lg text-zinc-900 leading-tight">
                          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
                        </p>

                        <p className="text-[7.5px] sm:text-[8px] font-clean-sans text-zinc-600 leading-snug mt-1.5 mb-2.5 max-w-[240px]">
                          Maha Suci Allah SWT yang telah menciptakan Makhluk-Nya berpasang-pasangan, Ya Allah, Perkenankanlah kami menyatukan langkah dan izinkanlah kami menikahkan Putra - Putri kami :
                        </p>

                        <div>
                          <h2 className="font-editorial-serif font-bold text-lg sm:text-xl text-zinc-900 leading-none">
                            {brideName}
                          </h2>
                          <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5">
                            Putri dari {brideParents}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 my-1.5">
                          <span className="w-10 h-[1px] bg-zinc-300" />
                          <span className="font-editorial-serif italic text-xs text-zinc-500">dan</span>
                          <span className="w-10 h-[1px] bg-zinc-300" />
                        </div>

                        <div>
                          <h2 className="font-editorial-serif font-bold text-lg sm:text-xl text-zinc-900 leading-none">
                            {groomName}
                          </h2>
                          <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5">
                            Putra dari {groomParents}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="h-2" />
                  </div>

                  {/* 3D REALISTIC FOLD CREASE SHADOW IN CENTER */}
                  <div className="relative z-20 w-full h-4 bg-gradient-to-b from-stone-300/40 via-stone-200/20 to-stone-300/40 border-y border-dashed border-stone-300 flex items-center justify-center">
                    <span className="px-3 py-0.5 bg-white/95 rounded-full text-[7px] font-bold uppercase tracking-widest text-stone-600 border border-stone-200 shadow-2xs">
                      Garis Lipatan Tengah (Crease • {isA4 ? '148.5 mm' : '105 mm'})
                    </span>
                  </div>

                  {/* LOWER PANEL: SCHEDULE & DETAILS */}
                  <div className="relative h-1/2 p-6 sm:p-7 flex flex-col justify-between">
                    {inkMode !== 'eco' && (
                      <>
                        <PurpleTreeSilhouette className="w-16 h-36 absolute bottom-12 left-0 opacity-40 z-0" />
                        <PurpleTreeSilhouette flip className="w-16 h-36 absolute bottom-12 right-0 opacity-40 z-0" />
                        <WatercolorCornerFlourish position="bottom-left" className="w-24 h-24 absolute bottom-0 left-0 opacity-85 z-0" />
                        <WatercolorCornerFlourish position="bottom-right" className="w-24 h-24 absolute bottom-0 right-0 opacity-85 z-0" />
                      </>
                    )}

                    <div className="text-center relative z-10 pt-1">
                      <p className="text-[8px] sm:text-[8.5px] font-clean-sans text-zinc-600 leading-relaxed max-w-[340px] mx-auto">
                        Dengan memohon Rahmat dan Ridho Allah SWT kami bermaksud menyelenggarakan Acara Resepsi Pernikahan Putra-Putri kami, yang Insya Allah akan dilaksanakan pada :
                      </p>
                    </div>

                    <div className="flex items-center gap-4 my-auto relative z-10 px-2 sm:px-3">
                      <div className="flex flex-col items-center justify-center shrink-0 w-24 text-center">
                        <span className="text-[9px] font-clean-sans font-bold tracking-widest text-zinc-800 uppercase">
                          {dayNameUpper}
                        </span>

                        <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white my-1 shadow-md ${
                          inkMode === 'eco' ? 'bg-zinc-950' : 'bg-[#9d174d]'
                        }`}>
                          <span className="font-editorial-serif font-bold text-2xl leading-none">
                            {dayNumber}
                          </span>
                        </div>

                        <span className="text-[7.5px] font-clean-sans font-bold tracking-wider text-zinc-800 uppercase text-center leading-tight">
                          {monthYearUpper}
                        </span>
                      </div>

                      <div className="w-[1.5px] h-28 bg-[#a16207]/40 relative shrink-0">
                        <div className="absolute top-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-[#a16207]/60" />
                      </div>

                      <div className="flex-1 space-y-3 pl-1 text-left">
                        <div>
                          <h3 className="font-editorial-serif font-bold italic text-xs sm:text-[13px] text-zinc-900 leading-tight">
                            {texts.akad_title || 'Akad Nikah'}
                          </h3>
                          <p className="text-[8px] font-clean-sans text-zinc-700 font-semibold mt-0.5">
                            Pukul : {akadTime}
                          </p>
                          <p className="text-[7.5px] font-clean-sans text-zinc-600 leading-snug">
                            Bertempat di {akadLocation}, {akadAddress}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-editorial-serif font-bold italic text-xs sm:text-[13px] text-zinc-900 leading-tight">
                            {texts.resepsi_title || 'Resepsi Pernikahan'}
                          </h3>
                          <p className="text-[8px] font-clean-sans text-zinc-700 font-semibold mt-0.5">
                            Pukul : {resepsiTime}
                          </p>
                          <p className="text-[7.5px] font-clean-sans text-zinc-600 leading-snug">
                            Bertempat di {resepsiLocation}, {resepsiAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center relative z-10 pb-2 space-y-1.5">
                      <p className="text-[7.5px] sm:text-[8px] font-clean-sans text-zinc-600 leading-relaxed max-w-[340px] mx-auto">
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan Do&apos;a Restu Kepada Kedua Mempelai.
                      </p>

                      <p className="font-script-calligraphy text-base sm:text-lg text-zinc-950 leading-tight">
                        Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
                      </p>

                      <p className="text-[7.5px] font-clean-sans tracking-wider uppercase font-semibold text-zinc-500">
                        KAMI YANG BERBAHAGIA
                      </p>

                      <div className="grid grid-cols-2 gap-2 max-w-[320px] mx-auto pt-0.5 text-center">
                        <div className="text-[7.5px] font-editorial-serif font-bold text-zinc-800">
                          Kel. {brideParents}
                        </div>
                        <div className="text-[7.5px] font-editorial-serif font-bold text-zinc-800">
                          Kel. {groomParents}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setArchFoldSide('cover')}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <FoldHorizontal className="w-3.5 h-3.5" />
                    <span>Tutup Kembali / Lipat Kartu</span>
                  </button>
                </div>
              </div>
            )}

            {/* Practical Folding Instructions Callout */}
            <div className="max-w-[560px] mx-auto p-4 bg-purple-50/80 border border-purple-200 rounded-2xl text-slate-700 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-purple-900">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Petunjuk Cetak &amp; Lipat Kertas {paperSize}:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                <li>Cetak <strong>Lembar 1 (Sisi Dalam)</strong> dan <strong>Lembar 2 (Sisi Luar)</strong> secara bolak-balik (Duplex) pada 1 lembar kertas {paperSize}.</li>
                <li>Lipat kertas tepat di garis tengah horizontal ({isA4 ? '148.5 mm dari atas' : '105 mm dari atas'}).</li>
                <li>Kertas {paperSize} kini menjadi kartu undangan lipat {foldedSizeLabel} dengan kotak nama tamu di depan dan foto kubah di bagian dalam.</li>
              </ol>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* PRINTABLE SHEETS (ALWAYS IN DOM FOR PRINT & PDF) */}
        {/* ---------------------------------------------------- */}
        <div className={`space-y-10 ${archFoldView === 'folded' ? 'pt-6 border-t border-slate-200' : ''}`}>
          {archFoldView === 'folded' && (
            <div className="no-print text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                <Printer className="w-3.5 h-3.5 text-purple-600" />
                <span>Lembar Kerja Cetak Utuh ({paperSize}) — Digunakan Saat Tombol Cetak / PDF Ditekan</span>
              </div>
            </div>
          )}

          {/* 1. SISI DALAM (INNER SPREAD TALL) — PERSIS SEPERTI FOTO FISIK PENGGUNA */}
          <div>
            <div className="no-print flex items-center justify-between max-w-[560px] mx-auto mb-2 px-1">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <FoldHorizontal className="w-3.5 h-3.5 text-pink-600" />
                <span>Lembar 1: Sisi Dalam (Inner Spread) — Foto Kubah &amp; Jadwal Acara Kalender Merah</span>
              </span>
              <span className="text-[11px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                {paperSize} Portrait
              </span>
            </div>

            {/* Standard Aspect Ratio Container (A4: aspect-[210/297] / A5: aspect-[148/210]) */}
            <div className={`print-sheet print-target-sheet print-vertical-arch-spread relative w-full ${sheetAspectClass} mx-auto shadow-2xl border border-zinc-300 ${
              inkMode === 'eco' ? 'bg-white' : 'bg-[#fffdfa]'
            } text-zinc-950 flex flex-col justify-between overflow-hidden select-none`}>
              {showCropMarks && <CropMarksOverlay isSpread folds={['50%']} />}

              {/* Exact 50% Horizontal Fold Guide Line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
                <div className="w-full border-t border-dashed border-zinc-400" />
                <span className="no-print absolute px-3 py-0.5 bg-white border border-purple-300 rounded-full text-[7.5px] font-clean-sans font-bold uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                  <Scissors className="w-2.5 h-2.5" />
                  <span>Garis Lipat Tengah • Lipat Jadi {foldedSizeLabel}</span>
                </span>
              </div>

              {/* BAGIAN ATAS (UPPER HALF - EXACT 50%): JENDELA KUBAH + NAMA MEMPELAI */}
              <div className="relative h-1/2 p-6 sm:p-7 flex flex-col justify-between">
                {inkMode !== 'eco' && (
                  <WatercolorCornerFlourish position="top-right" className="w-28 h-28 absolute top-0 right-0 opacity-90 z-0" />
                )}

                <div className="flex items-start gap-4 sm:gap-5 relative z-10 pt-2">
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-28 sm:w-32 h-40 sm:h-44 rounded-t-full border-2 border-stone-300 overflow-hidden bg-white shadow-md flex items-center justify-center p-1">
                      <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100 flex items-center justify-center">
                        <img
                          src={coverPhotoSrc}
                          alt={`${brideName} & ${groomName}`}
                          style={coverPhotoCfg.style}
                          className={`w-full h-full object-cover ${coverPhotoCfg.filterClass}`}
                          onError={(e) => {
                            e.currentTarget.src = '/templates/minimal-monochrome/couple_real.png';
                          }}
                        />
                      </div>
                    </div>

                    {inkMode !== 'eco' && (
                      <div className="-mt-6 relative z-10">
                        <WatercolorFloralCluster className="w-32 sm:w-36 h-14" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-left pt-1">
                    <p className="font-script-calligraphy text-base sm:text-lg text-zinc-900 leading-tight">
                      Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
                    </p>

                    <p className="text-[7.5px] sm:text-[8px] font-clean-sans text-zinc-600 leading-snug mt-1.5 mb-2.5 max-w-[240px]">
                      Maha Suci Allah SWT yang telah menciptakan Makhluk-Nya berpasang-pasangan, Ya Allah, Perkenankanlah kami menyatukan langkah dan izinkanlah kami menikahkan Putra - Putri kami :
                    </p>

                    <div className="mt-1">
                      <h2 className="font-editorial-serif font-bold text-lg sm:text-xl text-zinc-900 leading-none">
                        {brideName}
                      </h2>
                      <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5">
                        Putri dari {brideParents}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 my-1.5">
                      <span className="w-10 h-[1px] bg-zinc-300" />
                      <span className="font-editorial-serif italic text-xs text-zinc-500">dan</span>
                      <span className="w-10 h-[1px] bg-zinc-300" />
                    </div>

                    <div>
                      <h2 className="font-editorial-serif font-bold text-lg sm:text-xl text-zinc-900 leading-none">
                        {groomName}
                      </h2>
                      <p className="text-[7.5px] font-clean-sans text-zinc-600 mt-0.5">
                        Putra dari {groomParents}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-2" />
              </div>

              {/* BAGIAN BAWAH (LOWER HALF - EXACT 50%): ACARA, KALENDER & DOA RESTU */}
              <div className="relative h-1/2 p-6 sm:p-7 flex flex-col justify-between">
                {inkMode !== 'eco' && (
                  <>
                    <PurpleTreeSilhouette className="w-16 h-36 absolute bottom-12 left-0 opacity-40 z-0" />
                    <PurpleTreeSilhouette flip className="w-16 h-36 absolute bottom-12 right-0 opacity-40 z-0" />
                    <WatercolorCornerFlourish position="bottom-left" className="w-24 h-24 absolute bottom-0 left-0 opacity-85 z-0" />
                    <WatercolorCornerFlourish position="bottom-right" className="w-24 h-24 absolute bottom-0 right-0 opacity-85 z-0" />
                  </>
                )}

                <div className="text-center relative z-10 pt-1">
                  <p className="text-[8px] sm:text-[8.5px] font-clean-sans text-zinc-600 leading-relaxed max-w-[340px] mx-auto">
                    Dengan memohon Rahmat dan Ridho Allah SWT kami bermaksud menyelenggarakan Acara Resepsi Pernikahan Putra-Putri kami, yang Insya Allah akan dilaksanakan pada :
                  </p>
                </div>

                <div className="flex items-center gap-4 my-auto relative z-10 px-2 sm:px-3">
                  <div className="flex flex-col items-center justify-center shrink-0 w-24 text-center">
                    <span className="text-[9px] font-clean-sans font-bold tracking-widest text-zinc-800 uppercase">
                      {dayNameUpper}
                    </span>

                    <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white my-1 shadow-md ${
                      inkMode === 'eco' ? 'bg-zinc-950' : 'bg-[#9d174d]'
                    }`}>
                      <span className="font-editorial-serif font-bold text-2xl leading-none">
                        {dayNumber}
                      </span>
                    </div>

                    <span className="text-[7.5px] font-clean-sans font-bold tracking-wider text-zinc-800 uppercase text-center leading-tight">
                      {monthYearUpper}
                    </span>
                  </div>

                  <div className="w-[1.5px] h-28 bg-[#a16207]/40 relative shrink-0">
                    <div className="absolute top-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-[#a16207]/60" />
                  </div>

                  <div className="flex-1 space-y-3 pl-1 text-left">
                    <div>
                      <h3 className="font-editorial-serif font-bold italic text-xs sm:text-[13px] text-zinc-900 leading-tight">
                        {texts.akad_title || 'Akad Nikah'}
                      </h3>
                      <p className="text-[8px] font-clean-sans text-zinc-700 font-semibold mt-0.5">
                        Pukul : {akadTime}
                      </p>
                      <p className="text-[7.5px] font-clean-sans text-zinc-600 leading-snug">
                        Bertempat di {akadLocation}, {akadAddress}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-editorial-serif font-bold italic text-xs sm:text-[13px] text-zinc-900 leading-tight">
                        {texts.resepsi_title || 'Resepsi Pernikahan'}
                      </h3>
                      <p className="text-[8px] font-clean-sans text-zinc-700 font-semibold mt-0.5">
                        Pukul : {resepsiTime}
                      </p>
                      <p className="text-[7.5px] font-clean-sans text-zinc-600 leading-snug">
                        Bertempat di {resepsiLocation}, {resepsiAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center relative z-10 pb-2 space-y-1.5">
                  <p className="text-[7.5px] sm:text-[8px] font-clean-sans text-zinc-600 leading-relaxed max-w-[340px] mx-auto">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan Do&apos;a Restu Kepada Kedua Mempelai.
                  </p>

                  <p className="font-script-calligraphy text-base sm:text-lg text-zinc-950 leading-tight">
                    Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
                  </p>

                  <p className="text-[7.5px] font-clean-sans tracking-wider uppercase font-semibold text-zinc-500">
                    KAMI YANG BERBAHAGIA
                  </p>

                  <div className="grid grid-cols-2 gap-2 max-w-[320px] mx-auto pt-0.5 text-center">
                    <div className="text-[7.5px] font-editorial-serif font-bold text-zinc-800">
                      Kel. {brideParents}
                    </div>
                    <div className="text-[7.5px] font-editorial-serif font-bold text-zinc-800">
                      Kel. {groomParents}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SISI LUAR (OUTER SPREAD TALL) — COVER DEPAN SAAT DILIPAT & COVER BELAKANG */}
          <div>
            <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between max-w-[560px] mx-auto mb-2 px-1 gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <FoldHorizontal className="w-3.5 h-3.5 text-purple-600" />
                <span>Lembar 2: Sisi Luar (Outer Spread Duplex)</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOuterBackCoverRotation(!outerBackCoverRotation)}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    outerBackCoverRotation
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                  title="Klik untuk mengubah orientasi putaran 180°"
                >
                  <RefreshCw className={`w-3 h-3 text-amber-700 transition-transform duration-300 ${outerBackCoverRotation ? 'rotate-180' : ''}`} />
                  <span>
                    {outerBackCoverRotation
                      ? 'Orientasi: Terbalik 180° (Head-to-Head Siap Lipat ✓)'
                      : 'Orientasi: Sejajar Normal'}
                  </span>
                </button>
              </div>
            </div>

            <div className={`print-sheet print-target-sheet print-vertical-arch-spread relative w-full ${sheetAspectClass} mx-auto shadow-2xl border border-zinc-300 ${
              inkMode === 'eco' ? 'bg-white' : 'bg-[#fffdfa]'
            } text-zinc-950 flex flex-col justify-between overflow-hidden select-none`}>
              {showCropMarks && <CropMarksOverlay isSpread folds={['50%']} />}

              {/* Exact 50% Horizontal Fold Guide Line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
                <div className="w-full border-t border-dashed border-zinc-400" />
                <span className="no-print absolute px-3 py-0.5 bg-white border border-purple-300 rounded-full text-[7.5px] font-clean-sans font-bold uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                  <Scissors className="w-2.5 h-2.5" />
                  <span>Garis Lipat Tengah • Lipat Jadi {foldedSizeLabel}</span>
                </span>
              </div>

              {/* Sisi Atas: Cover Belakang (Dirotasi 180° Head-to-Head jika outerBackCoverRotation aktif) */}
              <div className={`relative h-1/2 p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 ${
                outerBackCoverRotation ? 'rotate-180' : ''
              }`}>
                {/* Visual helper badge when rotated */}
                {outerBackCoverRotation && (
                  <div className="no-print absolute top-2 right-2 z-30 pointer-events-none rotate-180">
                    <span className="px-2 py-0.5 bg-amber-500/90 text-white rounded-full text-[6.5px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Terbalik 180° (Agar Saat Dilipat Menjadi Tegak)</span>
                    </span>
                  </div>
                )}
                {inkMode !== 'eco' && (
                  <>
                    <WatercolorCornerFlourish position="top-left" className="w-20 h-20 absolute top-0 left-0 opacity-80" />
                    <WatercolorCornerFlourish position="top-right" className="w-20 h-20 absolute top-0 right-0 opacity-80" />
                  </>
                )}

                <div className="text-center pt-2 relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-full border border-zinc-950 flex items-center justify-center font-editorial-serif font-bold italic text-lg bg-white mb-2 shadow-xs">
                    {monogram}
                  </div>
                  <p className="text-[8px] font-clean-sans uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                    THE WEDDING CELEBRATION
                  </p>
                </div>

                <div className="text-center px-4 my-auto relative z-10">
                  <p className="font-arabic text-lg mb-1.5">
                    بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                  </p>
                  <p className="font-editorial-serif italic text-[10px] text-zinc-700 leading-relaxed max-w-[280px] mx-auto">
                    &ldquo;Semoga Allah memberkahimu dan memberkahi atasmu serta mengumpulkan kalian berdua dalam kebaikan.&rdquo;
                  </p>
                  <div className="pt-3">
                    <ScannableQrBox
                      url={onlineInvitationUrl}
                      label="RSVP & Peta Lokasi"
                      sublabel={`/${slug}`}
                    />
                  </div>
                </div>

                <div className="text-center pb-1 text-[7px] font-clean-sans uppercase tracking-[0.22em] text-zinc-400 relative z-10">
                  HAUTE ATELIER • DUPLEX FLIP
                </div>
              </div>

              {/* Sisi Bawah: Cover Depan saat terlipat (Muka Depan Undangan) */}
              <div className="relative h-1/2 p-6 sm:p-7 flex flex-col justify-between">
                {inkMode !== 'eco' && (
                  <>
                    <WatercolorCornerFlourish position="bottom-left" className="w-24 h-24 absolute bottom-0 left-0 opacity-85" />
                    <WatercolorCornerFlourish position="bottom-right" className="w-24 h-24 absolute bottom-0 right-0 opacity-85" />
                  </>
                )}

                <div className="text-center pt-2 relative z-10">
                  <span className={`inline-block px-3 py-0.5 text-[7.5px] font-clean-sans uppercase tracking-[0.3em] font-semibold ${getBadgeClass()}`}>
                    UNDANGAN PERNIKAHAN
                  </span>
                  <p className="font-script-calligraphy text-2.5xl sm:text-3xl text-zinc-950 mt-2 mb-0.5">
                    {brideName} &amp; {groomName}
                  </p>
                  <p className="text-[8.5px] font-clean-sans uppercase tracking-[0.25em] font-bold text-zinc-700">
                    {formattedDateUpper}
                  </p>
                </div>

                {/* Kotak Nama Tamu di Cover */}
                <div className="my-auto relative z-10 max-w-[260px] mx-auto w-full py-2.5 px-4 border border-zinc-950 bg-white text-center shadow-xs">
                  <div className="absolute inset-0.5 border border-zinc-200 pointer-events-none" />
                  <span className="text-[7px] uppercase tracking-[0.2em] font-clean-sans text-zinc-500 block mb-1">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <p className="font-editorial-serif font-bold text-sm text-zinc-950 truncate">
                    {guestNamePrint.trim() || 'Nama Tamu Undangan'}
                  </p>
                  <span className="text-[6.5px] font-clean-sans uppercase tracking-widest text-zinc-400 mt-1 block">
                    Di Tempat
                  </span>
                </div>

                <div className="text-center pb-2 relative z-10">
                  <span className="text-[7px] font-clean-sans tracking-[0.3em] uppercase text-zinc-400">
                    OFFICIAL PRINT COLLECTION
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lembar Pelengkap Souvenir */}
          <div>
            <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
              <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Kupon Souvenir &amp; Tag (A5)</span>
              <span className="text-[11px] text-slate-500">Siap Potong</span>
            </div>
            {renderSouvenirAndTagsSheet()}
          </div>
        </div>
      </div>
    );
  };

  // BIFOLD BOOKLET (A4 LANDSCAPE DUPLEX READY)
  const renderBifoldLayout = () => (
    <div className="space-y-10">
      <div>
        <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Sisi Luar (Outer Spread) — Cover Belakang [Kiri] + Cover Depan [Kanan]</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">A4 Landscape (297 × 210 mm) • Siap Lipat Tengah</span>
        </div>
        <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-2 overflow-hidden">
          {showCropMarks && <CropMarksOverlay isSpread folds={['50%']} />}
          <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-zinc-300 z-20 pointer-events-none" />
          <div className="h-full border-r border-dashed border-zinc-200">
            {renderBackCoverSheet(true)}
          </div>
          <div className="h-full">
            {renderFrontCoverSheet(true)}
          </div>
        </div>
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Sisi Dalam (Inner Spread) — Kartu Inti Mempelai [Kiri] + Jadwal Acara &amp; QR [Kanan]</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Duplex Back-to-Back</span>
        </div>
        <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-2 overflow-hidden">
          {showCropMarks && <CropMarksOverlay isSpread folds={['50%']} />}
          <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-zinc-300 z-20 pointer-events-none" />
          <div className="h-full border-r border-dashed border-zinc-200">
            {renderMainCoupleSheet(true)}
          </div>
          <div className="h-full">
            {renderEventAndQrSheet(true)}
          </div>
        </div>
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Souvenir &amp; Sabuk Pengikat (A5)</span>
          <span className="text-[11px] text-slate-500">A5 Portrait</span>
        </div>
        {renderSouvenirAndTagsSheet()}
      </div>
    </div>
  );

  // GATEFOLD SPREAD (1 Central Panel A5 + 2 Flanking Flaps 74mm each)
  const renderGatefoldLayout = () => (
    <div className="space-y-10">
      <div>
        <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <FoldVertical className="w-3.5 h-3.5 text-purple-600" />
            <span>Gatefold Bagian Dalam (Inner Spread) — Sayap Kiri (74mm) + Inti Mempelai (148mm) + Sayap Kanan (74mm)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Ukuran Total A4 Landscape</span>
        </div>

        <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-4 overflow-hidden">
          {showCropMarks && <CropMarksOverlay isSpread folds={['25%', '75%']} />}

          <div className="absolute inset-y-0 left-1/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-3/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />

          {/* LEFT FLAP (25% Width - 74mm) */}
          <div className={`col-span-1 border-r border-zinc-200 p-4 sm:p-5 flex flex-col justify-between ${paperBgEffective} text-zinc-950 relative`}>
            <div className="absolute inset-2 border border-zinc-300 pointer-events-none" />
            <div className="text-center pt-2 relative z-10">
              <span className={`inline-block px-2 py-0.5 text-[6.5px] font-clean-sans uppercase tracking-[0.25em] font-semibold ${getBadgeClass()}`}>
                SAYAP KIRI
              </span>
              <p className="font-arabic text-base mt-2 mb-1">
                {texts.opening_bismillah || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
              </p>
              <p className="font-editorial-serif italic text-[8.5px] text-zinc-700 leading-snug">
                &ldquo;{texts.opening_text}&rdquo;
              </p>
              <span className="text-[7px] font-clean-sans uppercase tracking-[0.2em] font-bold text-zinc-900 mt-1 block">
                — {texts.opening_surah || 'QS. Ar-Rum: 21'} —
              </span>
            </div>

            <div className="my-auto py-2 text-center relative z-10">
              <div className="w-10 h-10 mx-auto rounded-full border border-zinc-950 flex items-center justify-center font-editorial-serif italic text-sm font-bold bg-white mb-2">
                &amp;
              </div>
              <p className="text-[7.5px] font-clean-sans text-zinc-600 leading-relaxed">
                Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
              </p>
            </div>

            <div className="text-center pb-1 text-[7px] font-clean-sans uppercase tracking-[0.22em] text-zinc-400 relative z-10">
              ✂ LIPAT KE DALAM ✂
            </div>
          </div>

          {/* CENTER PANEL (50% Width - 148mm A5 Main Core) */}
          <div className={`col-span-2 border-r border-zinc-200 p-5 sm:p-6 flex flex-col justify-between ${paperBgEffective} text-zinc-950 relative`}>
            <div className="absolute inset-2.5 border-2 border-zinc-950 pointer-events-none" />
            <div className="absolute inset-4 border border-zinc-300 pointer-events-none" />

            <PrintBotanicalCorner position="top-left" className="w-9 h-9 absolute top-4.5 left-4.5 opacity-80" />
            <PrintBotanicalCorner position="top-right" className="w-9 h-9 absolute top-4.5 right-4.5 opacity-80" />
            <PrintBotanicalCorner position="bottom-left" className="w-9 h-9 absolute bottom-4.5 left-4.5 opacity-80" />
            <PrintBotanicalCorner position="bottom-right" className="w-9 h-9 absolute bottom-4.5 right-4.5 opacity-80" />

            <div className="text-center pt-1 relative z-10">
              <span className={`inline-block px-2.5 py-0.5 text-[7px] font-clean-sans uppercase tracking-[0.3em] font-semibold ${getBadgeClass()}`}>
                {texts.hero_badge || "WALIMATUL 'URS"}
              </span>
              <p className="text-[8px] font-clean-sans text-zinc-500 uppercase tracking-[0.22em] mt-1">
                MEMPELAI PERNIKAHAN
              </p>
            </div>

            <div className="text-center my-auto py-1 relative z-10 space-y-2">
              <div>
                <h2 className="font-script-calligraphy text-3xl sm:text-3.5xl text-zinc-950 leading-tight">
                  {brideName}
                </h2>
                <p className="text-[7.5px] font-clean-sans uppercase tracking-[0.16em] text-zinc-500 font-semibold">
                  Putri dari: {brideParents}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-zinc-300" />
                <span className="font-editorial-serif italic text-base text-zinc-950 font-bold">&amp;</span>
                <span className="w-8 h-[1px] bg-zinc-300" />
              </div>

              <div>
                <h2 className="font-script-calligraphy text-3xl sm:text-3.5xl text-zinc-950 leading-tight">
                  {groomName}
                </h2>
                <p className="text-[7.5px] font-clean-sans uppercase tracking-[0.16em] text-zinc-500 font-semibold">
                  Putra dari: {groomParents}
                </p>
              </div>
            </div>

            <div className="text-center pb-1 relative z-10">
              <span className="text-[7.5px] font-clean-sans tracking-[0.26em] uppercase font-bold text-zinc-800">
                {formattedDateUpper}
              </span>
            </div>
          </div>

          {/* RIGHT FLAP (25% Width - 74mm Event & Smart QR) */}
          <div className={`col-span-1 p-4 sm:p-5 flex flex-col justify-between ${paperBgEffective} text-zinc-950 relative`}>
            <div className="absolute inset-2 border border-zinc-300 pointer-events-none" />

            <div className="text-center pt-2 relative z-10">
              <span className={`inline-block px-2 py-0.5 text-[6.5px] font-clean-sans uppercase tracking-[0.25em] font-semibold ${getBadgeClass()}`}>
                SAYAP KANAN
              </span>
              <p className="text-[7.5px] font-clean-sans uppercase tracking-[0.22em] text-zinc-500 font-bold mt-1.5">
                RANGKAIAN ACARA
              </p>
            </div>

            <div className="space-y-2 my-auto relative z-10">
              <div className="border border-zinc-950 p-1.5 bg-white text-center">
                <span className="text-[6.5px] font-clean-sans font-bold uppercase tracking-[0.2em] block">
                  AKAD NIKAH
                </span>
                <p className="text-[7.5px] font-editorial-serif font-bold text-zinc-950">
                  {formattedDateShort}
                </p>
                <p className="text-[7px] font-clean-sans text-zinc-600">
                  {akadTime}
                </p>
              </div>

              <div className="border border-zinc-950 p-1.5 bg-white text-center">
                <span className="text-[6.5px] font-clean-sans font-bold uppercase tracking-[0.2em] block">
                  RESEPSI
                </span>
                <p className="text-[7.5px] font-editorial-serif font-bold text-zinc-950">
                  {formattedResepsiDate}
                </p>
                <p className="text-[7px] font-clean-sans text-zinc-600">
                  {resepsiTime}
                </p>
              </div>

              <div className="pt-1">
                <ScannableQrBox
                  url={onlineInvitationUrl}
                  label="RSVP & Peta"
                  sublabel={`/${slug}`}
                />
              </div>
            </div>

            <div className="text-center pb-1 text-[7px] font-clean-sans uppercase tracking-[0.22em] text-zinc-400 relative z-10">
              ✂ LIPAT KE DALAM ✂
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <FoldVertical className="w-3.5 h-3.5 text-purple-600" />
            <span>Gatefold Bagian Luar (Outer Flaps Spread) — Tampilan Saat Pintu Gerbang Terkatup</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Tampak Muka Luar</span>
        </div>

        <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-4 overflow-hidden">
          {showCropMarks && <CropMarksOverlay isSpread folds={['25%', '75%']} />}

          <div className="absolute inset-y-0 left-1/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-3/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />

          {/* Sayap Luar Kiri */}
          <div className={`col-span-1 border-r border-zinc-200 p-4 flex flex-col justify-between ${
            isNoirCoverEffective ? 'bg-zinc-950 text-white' : `${paperBgEffective} text-zinc-950`
          } relative`}>
            <div className="absolute inset-2 border border-zinc-300/60 pointer-events-none" />
            <PrintBotanicalCorner position="top-left" dark={isNoirCoverEffective} className="w-8 h-8 absolute top-3 left-3 opacity-75" />
            <div className="text-right pt-3 pr-1 relative z-10">
              <span className="text-[6.5px] font-clean-sans tracking-[0.25em] uppercase font-bold block opacity-70">
                UNDANGAN
              </span>
              <p className="font-editorial-serif text-xs italic mt-1">
                Walimatul &apos;Urs
              </p>
            </div>
            <div className="my-auto text-right pr-1 relative z-10">
              <span className="font-script-calligraphy text-2xl">
                {brideShort}
              </span>
            </div>
            <div className="text-right pb-1 text-[6.5px] font-clean-sans tracking-[0.2em] opacity-60">
              TERBUKA KE KANAN ➔
            </div>
          </div>

          {/* Punggung Belakang */}
          <div className="col-span-2 border-r border-zinc-200">
            {renderBackCoverSheet(true)}
          </div>

          {/* Sayap Luar Kanan */}
          <div className={`col-span-1 p-4 flex flex-col justify-between ${
            isNoirCoverEffective ? 'bg-zinc-950 text-white' : `${paperBgEffective} text-zinc-950`
          } relative`}>
            <div className="absolute inset-2 border border-zinc-300/60 pointer-events-none" />
            <PrintBotanicalCorner position="top-right" dark={isNoirCoverEffective} className="w-8 h-8 absolute top-3 right-3 opacity-75" />
            <div className="text-left pt-3 pl-1 relative z-10">
              <span className="text-[6.5px] font-clean-sans tracking-[0.25em] uppercase font-bold block opacity-70">
                PERNIKAHAN
              </span>
              <p className="font-editorial-serif text-xs italic mt-1">
                The Wedding Of
              </p>
            </div>
            <div className="my-auto pl-1 relative z-10">
              <span className="font-script-calligraphy text-2xl">
                {groomShort}
              </span>
              <div className="mt-2 border border-current p-1.5 text-center">
                <span className="text-[6px] uppercase tracking-[0.16em] block">
                  Kepada Yth:
                </span>
                <p className="font-editorial-serif font-bold text-[9px] mt-0.5 truncate">
                  {guestNamePrint.trim() || 'Nama Tamu Undangan'}
                </p>
              </div>
            </div>
            <div className="text-left pb-1 text-[6.5px] font-clean-sans tracking-[0.2em] opacity-60">
              ⬅ TERBUKA KE KIRI
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Souvenir &amp; Tag (A5)</span>
          <span className="text-[11px] text-slate-500">Siap Potong</span>
        </div>
        {renderSouvenirAndTagsSheet()}
      </div>
    </div>
  );

  // POCKET & INSERT
  const renderPocketAndInsertLayout = () => (
    <div className="space-y-10">
      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-purple-600" />
            <span>Bagian 1 — Saku Amplop Luar (Pocket Sleeve A5 dengan Pola Lengkung Saku)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Pocket Sleeve</span>
        </div>

        <div className={`print-sheet print-target-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl border border-zinc-300 ${
          isNoirCoverEffective ? 'bg-zinc-950 text-white' : `${paperBgEffective} text-zinc-950`
        } p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none`}>
          {showCropMarks && <CropMarksOverlay />}

          <div className="absolute inset-3 border-2 border-zinc-950 pointer-events-none" />
          <div className="absolute inset-4.5 border border-zinc-300 pointer-events-none" />

          <div className="text-center pt-2 relative z-10">
            <span className={`inline-block px-3 py-0.5 text-[8px] font-clean-sans uppercase tracking-[0.32em] font-semibold ${getBadgeClass(isNoirCoverEffective)}`}>
              AMPLOP SAKU EKSKLUSIF
            </span>
            <p className="text-[8.5px] font-clean-sans uppercase tracking-[0.24em] text-zinc-500 mt-1">
              HAUTE ATELIER POCKET SUITE
            </p>
          </div>

          <div className="text-center my-auto py-2 relative z-10">
            <div className={`w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center font-editorial-serif italic text-2xl font-bold mb-3 shadow-sm ${
              isNoirCoverEffective ? 'border-zinc-300 bg-zinc-900 text-white' : 'border-zinc-950 bg-white text-zinc-950'
            }`}>
              {monogram}
            </div>

            <h1 className="font-script-calligraphy text-3.5xl sm:text-4xl">
              {brideName}
            </h1>
            <p className="font-editorial-serif italic text-base my-0.5">&amp;</p>
            <h2 className="font-script-calligraphy text-3.5xl sm:text-4xl">
              {groomName}
            </h2>

            <div className="mt-3 max-w-[240px] mx-auto border border-current py-2 px-3 text-center">
              <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.2em] block text-zinc-500 mb-0.5">
                Kepada Yth:
              </span>
              <p className="font-editorial-serif font-bold text-xs truncate">
                {guestNamePrint.trim() || 'Bapak/Ibu/Saudara/i'}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-2 border-t border-dashed border-zinc-400 text-center">
            <div className="w-16 h-4 mx-auto -mt-4 bg-white border-t border-x border-zinc-400 rounded-t-full flex items-center justify-center">
              <span className="text-[6.5px] font-clean-sans font-bold text-zinc-500">LENGKUNG SAKU</span>
            </div>
            <span className="text-[7.5px] font-clean-sans uppercase tracking-[0.24em] text-zinc-500 block mt-1">
              ✂ LIPAT TAB LEM SEPANJANG GARIS PUTUS-PUTUS UNTUK MEMBENTUK SAKU ✂
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Bagian 2 — Kartu Sisipan Inti (Vertical Main Insert 138 × 200 mm)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Insert Vertikal</span>
        </div>
        {renderMainCoupleSheet()}
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Bagian 3 — Kartu Sisipan Pendamping (Jadwal Acara &amp; Smart QR Slip)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">Insert Slip</span>
        </div>
        {renderEventAndQrSheet()}
      </div>

      <div>
        <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
          <span className="text-xs font-bold text-slate-700">Lembar Kupon Souvenir &amp; Tag (A5)</span>
          <span className="text-[11px] text-slate-500">Siap Potong</span>
        </div>
        {renderSouvenirAndTagsSheet()}
      </div>
    </div>
  );

  return (
    <div className="physical-suite-wrapper">
      {/* DEDICATED PRINT CSS */}
      <style>{`
        @media print {
          @page {
            size: ${
              paperSize === 'A4'
                ? (layoutStructure === 'bifold' || layoutStructure === 'gatefold'
                    ? 'A4 landscape'
                    : 'A4 portrait')
                : (layoutStructure === 'bifold' || layoutStructure === 'gatefold'
                    ? 'A5 landscape'
                    : 'A5 portrait')
            };
            margin: 0mm;
          }
          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          aside, header, nav, .no-print, .export-modal-backdrop {
            display: none !important;
          }
          main, .physical-suite-wrapper, #physical-print-area {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
          }
          .print-sheet {
            max-width: 100% !important;
            width: ${
              paperSize === 'A4'
                ? (layoutStructure === 'bifold' || layoutStructure === 'gatefold' ? '297mm' : '210mm')
                : (layoutStructure === 'bifold' || layoutStructure === 'gatefold' ? '210mm' : '148mm')
            } !important;
            height: ${
              paperSize === 'A4'
                ? (layoutStructure === 'bifold' || layoutStructure === 'gatefold' ? '210mm' : '297mm')
                : (layoutStructure === 'bifold' || layoutStructure === 'gatefold' ? '148mm' : '210mm')
            } !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .print-bifold-spread {
            width: ${paperSize === 'A4' ? '297mm' : '210mm'} !important;
            height: ${paperSize === 'A4' ? '210mm' : '148mm'} !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .print-vertical-arch-spread {
            width: ${paperSize === 'A4' ? '210mm' : '148mm'} !important;
            height: ${paperSize === 'A4' ? '297mm' : '210mm'} !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>

      {/* TOP STUDIO TOOLBAR */}
      <div className="no-print bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 mb-8 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>Studio Cetak Fisik • Atelier Line-Art (Multi-Layout &amp; Export)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-title italic font-bold text-slate-900">
              Desain Undangan Fisik &amp; Format Ekspor Fleksibel
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans-body mt-0.5">
              Tersedia 5 pilihan struktur lipatan, setting ukuran kertas (A4 &amp; A5), mode hemat tinta, dan tombol export siap cetak untuk{' '}
              <strong className="text-slate-800">
                {brideName} &amp; {groomName}
              </strong>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="px-5 py-3.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-zinc-950 hover:from-purple-800 hover:to-zinc-900 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-purple-200" />
              <span>Pengaturan &amp; Format Ekspor</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-md shadow-zinc-950/15 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-300" />
              <span>Cetak Sekarang</span>
            </button>
          </div>
        </div>

        {/* QUICK CONTROL BAR (4 COLUMNS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* 1. Layout Structure Quick Switch */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Bentuk Lipatan (5 Model)</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'flat', label: 'Flat Card Suite', sub: 'Lembar Lepas' },
                { id: 'bifold', label: 'Bifold Booklet', sub: 'Lipat Dua A4/A5' },
                { id: 'vertical-arch', label: 'Kubah & Floral', sub: 'Foto Cetak 🔥' },
                { id: 'gatefold', label: 'Gatefold Spread', sub: '3-Panel Gerbang' },
                { id: 'pocket', label: 'Pocket & Insert', sub: 'Saku & Sisipan' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLayoutStructure(opt.id)}
                  className={`px-2 py-1.5 rounded-xl text-left transition-all cursor-pointer ${
                    layoutStructure === opt.id
                      ? 'bg-zinc-900 text-white shadow-xs ring-1 ring-zinc-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                  } ${opt.id === 'pocket' ? 'col-span-2' : ''}`}
                >
                  <div className="text-[10.5px] font-bold truncate">{opt.label}</div>
                  <div className={`text-[8.5px] truncate ${layoutStructure === opt.id ? 'text-zinc-300' : 'text-slate-400'}`}>
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Paper Size: HANYA A4 & A5 */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Ukuran Kertas</span>
              </span>
              <span className="text-[10px] font-bold text-purple-700 font-mono">
                {paperSize}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setPaperSize('A4')}
                className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  paperSize === 'A4'
                    ? 'bg-zinc-900 text-white shadow-xs ring-1 ring-zinc-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                }`}
              >
                <div className="text-[11px] font-bold">Kertas A4</div>
                <div className={`text-[9px] ${paperSize === 'A4' ? 'text-zinc-300' : 'text-slate-400'}`}>210 × 297 mm</div>
              </button>
              <button
                type="button"
                onClick={() => setPaperSize('A5')}
                className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  paperSize === 'A5'
                    ? 'bg-zinc-900 text-white shadow-xs ring-1 ring-zinc-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                }`}
              >
                <div className="text-[11px] font-bold">Kertas A5</div>
                <div className={`text-[9px] ${paperSize === 'A5' ? 'text-zinc-300' : 'text-slate-400'}`}>148 × 210 mm</div>
              </button>
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">
              {paperSize === 'A4'
                ? 'Standar percetakan HVS & booklet lipat'
                : 'Standar kartu undangan fisik kompak'}
            </p>
          </div>

          {/* 3. Ink Mode & Paper Palette */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Gaya Tinta &amp; Nuansa</span>
              </span>
              <span className="text-[10px] font-normal text-purple-700 font-mono">
                {inkMode === 'eco' ? 'Eco Clean' : 'Original'}
              </span>
            </label>
            <div className="flex items-center gap-1.5 mb-1.5">
              <button
                type="button"
                onClick={() => setInkMode('original')}
                className={`flex-1 py-1.5 px-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center ${
                  inkMode === 'original'
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Original
              </button>
              <button
                type="button"
                onClick={() => setInkMode('eco')}
                className={`flex-1 py-1.5 px-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  inkMode === 'eco'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <Check className="w-3 h-3" />
                <span>Eco White</span>
              </button>
            </div>

            {inkMode === 'original' && (
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'cotton', label: 'Cotton' },
                  { id: 'textured', label: 'Textured' },
                  { id: 'noir-cover', label: 'Noir' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaperTheme(p.id)}
                    className={`py-1 px-0.5 rounded-lg text-[9.5px] font-semibold text-center truncate transition-all cursor-pointer ${
                      paperTheme === p.id
                        ? 'bg-zinc-800 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Tamu & Opsi Crop Marks */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              <span>Nama Tamu di Kotak Cetak</span>
            </label>
            <input
              type="text"
              value={guestNamePrint}
              onChange={(e) => setGuestNamePrint(e.target.value)}
              placeholder="Kosongkan untuk tulis tangan..."
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex items-center gap-2.5 pt-1">
              <label className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={(e) => setShowCropMarks(e.target.checked)}
                  className="rounded border-slate-300 text-zinc-900"
                />
                <Scissors className="w-3 h-3 text-slate-500" />
                <span>Bleed 3mm</span>
              </label>

              <label className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIllustration}
                  onChange={(e) => setShowIllustration(e.target.checked)}
                  className="rounded border-slate-300 text-zinc-900"
                />
                <Eye className="w-3 h-3 text-slate-500" />
                <span>Foto</span>
              </label>
            </div>
          </div>
        </div>

        {/* Turut Mengundang Accordion */}
        <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showTurutMengundang}
                onChange={(e) => setShowTurutMengundang(e.target.checked)}
                className="rounded border-slate-300 text-zinc-900"
              />
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Tampilkan Daftar &ldquo;Turut Mengundang&rdquo; pada Kartu Acara</span>
            </label>
            <span className="text-[11px] text-slate-400">1 baris = 1 perwakilan keluarga</span>
          </div>
          {showTurutMengundang && (
            <textarea
              rows={2}
              value={turutMengundangText}
              onChange={(e) => setTurutMengundangText(e.target.value)}
              placeholder="Ketik daftar kerabat yang turut mengundang..."
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: PENGATURAN & FORMAT EKSPOR                        */}
      {/* ======================================================== */}
      {showExportModal && (
        <div className="export-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-purple-100 text-purple-800 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Sliders className="w-3 h-3 text-purple-700" />
                  <span>Pengaturan &amp; Format Ekspor</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif-title">
                  Konfigurasi Cetak Fisik &amp; Download File Master
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tentukan bentuk lipatan, ukuran kertas (hanya A4 &amp; A5), efisiensi tinta, dan format file.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECTION 1: PILIHAN BENTUK LIPATAN */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>1. Pilihan Bentuk Lipatan (Layout Structure)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'vertical-arch',
                    title: 'Lipat Vertikal Kubah Floral',
                    desc: 'Model seperti foto cetak fisik: foto kubah lengkung, buket mawar watercolor, kalender tanggal merah & siluet pohon ungu.',
                    badge: '🔥 Model Foto Cetak',
                    highlight: true,
                  },
                  {
                    id: 'flat',
                    title: 'Flat Card Suite',
                    desc: 'Halaman dicetak per lembar terpisah. Cocok untuk set amplop lepas atau binder.',
                    badge: 'Lembar Lepas',
                  },
                  {
                    id: 'bifold',
                    title: 'Bifold Booklet',
                    desc: 'Menggabungkan halaman ke layout Landscape (Sisi Luar: Cover Belakang + Depan, Sisi Dalam: Inti + Acara).',
                    badge: 'Landscape Duplex',
                  },
                  {
                    id: 'gatefold',
                    title: 'Gatefold Spread',
                    desc: '1 panel dasar tengah dan 2 panel penutup samping (kiri & kanan).',
                    badge: '3 Panel Gerbang',
                  },
                  {
                    id: 'pocket',
                    title: 'Pocket & Insert',
                    desc: 'Format saku amplop luar berpola lekuk + kartu sisipan vertikal & slip kupon pelengkap.',
                    badge: 'Saku & Sisipan',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLayoutStructure(item.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      layoutStructure === item.id
                        ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                        : item.highlight
                        ? 'border-pink-200 hover:border-pink-300 bg-pink-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    } ${item.id === 'pocket' ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-md ${
                        layoutStructure === item.id
                          ? 'bg-purple-600 text-white'
                          : item.highlight
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: PILIHAN UKURAN KERTAS (HANYA A4 & A5) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>2. Pilihan Ukuran Kertas Cetak (Hanya A4 &amp; A5)</span>
                </span>
                <span className="text-[10px] text-purple-700 font-mono font-bold">
                  Aktif: Kertas {paperSize}
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  onClick={() => setPaperSize('A4')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paperSize === 'A4'
                      ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Kertas A4</span>
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        210 × 297 mm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Standar percetakan kertas HVS &amp; Art Paper besar, ideal untuk Booklet Lipat Dua (Bifold) dan Lipat Vertikal.
                    </p>
                  </div>
                  {paperSize === 'A4' && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 ml-2" />}
                </div>

                <div
                  onClick={() => setPaperSize('A5')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paperSize === 'A5'
                      ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Kertas A5</span>
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        148 × 210 mm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Ukuran standar kartu undangan fisik kompak / flat card suite per lembar.
                    </p>
                  </div>
                  {paperSize === 'A5' && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 ml-2" />}
                </div>
              </div>
            </div>

            {/* SECTION 3: PILIHAN GAYA TINTA */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>3. Pilihan Gaya Tinta (Ink/Color Mode)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  onClick={() => setInkMode('original')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    inkMode === 'original'
                      ? 'border-zinc-950 bg-zinc-50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">Original Theme</span>
                    {inkMode === 'original' && <CheckCircle2 className="w-4 h-4 text-zinc-950" />}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Sesuai palet warna tema yang dipilih (Cotton, Tekstur Alami, atau Noir Obsidian Cover).
                  </p>
                </div>

                <div
                  onClick={() => setInkMode('eco')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    inkMode === 'eco'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-950">Eco / Clean White (Hemat Tinta)</span>
                    {inkMode === 'eco' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Otomatis menghapus latar gelap menjadi putih murni, menyisakan teks dan border tipis untuk menghemat tinta printer hingga 85%.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: FORMAT OUTPUT FILE */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-purple-600" />
                <span>3. Format Output File Siap Pakai</span>
              </label>

              {isExporting && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2.5 text-purple-900 text-xs font-medium animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-700 shrink-0" />
                  <span>{exportProgress || 'Sedang memproses dokumen...'}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => {
                    setShowExportModal(false);
                    setTimeout(handlePrint, 300);
                  }}
                  className="p-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Printer className="w-4 h-4 text-purple-300" />
                      <span className="text-[9px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-mono">@media print</span>
                    </div>
                    <span className="text-xs font-bold block">Cetak Langsung Browser</span>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-snug">
                      Dialog window.print() siap kirim ke mesin printer fisik atau simpan PDF instan.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-purple-300 mt-3 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Buka Dialog Cetak &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isExporting}
                  onClick={handleExportPdf}
                  className="p-3.5 bg-gradient-to-br from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between group shadow-md shadow-purple-900/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <FileDown className="w-4 h-4 text-purple-200" />
                      <span className="text-[9px] bg-purple-900/80 px-1.5 py-0.5 rounded text-purple-200 font-mono">jsPDF Master</span>
                    </div>
                    <span className="text-xs font-bold block">Simpan PDF Percetakan</span>
                    <p className="text-[10px] text-purple-200/90 mt-1 leading-snug">
                      File PDF siap kirim ke percetakan profesional, lengkap dengan tanda crop marks bleed 3mm.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-white mt-3 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Download PDF &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleExportImages('png')}
                  className="p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <ImageIcon className="w-4 h-4 text-purple-300" />
                      <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-zinc-300 font-mono">300 DPI</span>
                    </div>
                    <span className="text-xs font-bold block">Download Gambar PNG / JPG</span>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                      Gambar resolusi tinggi per lembar untuk preview digital, arsip vendor, atau stiker.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportImages('png');
                      }}
                      className="text-[10px] font-bold text-purple-300 hover:underline"
                    >
                      PNG (Lossless)
                    </span>
                    <span className="text-slate-600">•</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportImages('jpg');
                      }}
                      className="text-[10px] font-bold text-purple-300 hover:underline"
                    >
                      JPG (Foto)
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Data otomatis disinkronkan dari profil mempelai <strong>{brideShort} &amp; {groomShort}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                Tutup Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PRINTABLE CARDS CANVAS AREA                              */}
      {/* ======================================================== */}
      <div
        id="physical-print-area"
        className={`${
          embeddedInDashboard
            ? 'bg-slate-100/80 border border-slate-200/80 rounded-3xl p-4 sm:p-8'
            : 'py-6 px-4'
        }`}
      >
        {/* Render selected layout structure */}
        {layoutStructure === 'vertical-arch' && renderVerticalArchLayout()}
        {layoutStructure === 'bifold' && renderBifoldLayout()}
        {layoutStructure === 'gatefold' && renderGatefoldLayout()}
        {layoutStructure === 'pocket' && renderPocketAndInsertLayout()}
        {layoutStructure === 'flat' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 01 — Sampul Depan ({paperSize} • {paperSize === 'A4' ? '21 × 29.7 cm' : '14.8 × 21 cm'})
                </span>
                <span className="text-[11px] text-slate-500">Front Cover / Amplop</span>
              </div>
              {renderFrontCoverSheet()}
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 02 — Isi Utama: Mempelai &amp; Ayat Suci ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Main Invitation Card</span>
              </div>
              {renderMainCoupleSheet()}
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 03 — Jadwal Acara &amp; QR Code Digital ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Event &amp; Smart QR Card</span>
              </div>
              {renderEventAndQrSheet()}
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 04 — Kupon Souvenir, Tag &amp; Belly Band ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Siap Gunting</span>
              </div>
              {renderSouvenirAndTagsSheet()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
