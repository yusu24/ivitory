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
  Palette,
  QrCode,
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
  Download,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Universal Percetakan Crop Marks (Tanda Potong Sudut 3mm Bleed & Garis Lipat)
 */
export function UniversalCropMarks({ color = '#71717a', isSpread = false, folds = [] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <div className="absolute top-0 left-3 w-[0.5px] h-2.5" style={{ backgroundColor: color }} />
      <div className="absolute top-3 left-0 w-2.5 h-[0.5px]" style={{ backgroundColor: color }} />
      <div className="absolute top-0 right-3 w-[0.5px] h-2.5" style={{ backgroundColor: color }} />
      <div className="absolute top-3 right-0 w-2.5 h-[0.5px]" style={{ backgroundColor: color }} />
      <div className="absolute bottom-0 left-3 w-[0.5px] h-2.5" style={{ backgroundColor: color }} />
      <div className="absolute bottom-3 left-0 w-2.5 h-[0.5px]" style={{ backgroundColor: color }} />
      <div className="absolute bottom-0 right-3 w-[0.5px] h-2.5" style={{ backgroundColor: color }} />
      <div className="absolute bottom-3 right-0 w-2.5 h-[0.5px]" style={{ backgroundColor: color }} />
      {folds.map((pos, idx) => (
        <React.Fragment key={idx}>
          <div className="absolute top-0 w-[0.5px] h-2 opacity-70" style={{ left: pos, backgroundColor: color }} />
          <div className="absolute bottom-0 w-[0.5px] h-2 opacity-70" style={{ left: pos, backgroundColor: color }} />
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Scannable QR Box with Crisp Fallback
 */
export function UniversalQrBox({
  url,
  label,
  sublabel,
  colorDark = '#09090b',
  colorLight = '#ffffff',
  borderColor = '#09090b',
}) {
  const [imgError, setImgError] = useState(false);
  const cleanHex = colorDark.replace('#', '');
  const cleanBg = colorLight.replace('#', '');
  const encoded = encodeURIComponent(url || 'https://invitory.id');
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&color=${cleanHex}&bgcolor=${cleanBg}&data=${encoded}`;

  return (
    <div
      className="flex flex-col items-center text-center p-2.5 bg-white relative"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div className="absolute inset-0.5 border border-black/10 pointer-events-none" />
      <div className="w-18 h-18 sm:w-20 sm:h-20 p-1 bg-white flex items-center justify-center relative z-10">
        {!imgError ? (
          <img
            src={qrSrc}
            alt={label}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <QrCode className="w-10 h-10" style={{ color: colorDark }} />
        )}
      </div>
      <span
        className="text-[8px] uppercase tracking-[0.22em] font-bold mt-1.5 relative z-10"
        style={{ color: colorDark }}
      >
        {label}
      </span>
      {sublabel && (
        <span className="text-[7.5px] text-slate-500 mt-0.5 max-w-[125px] truncate relative z-10">
          {sublabel}
        </span>
      )}
    </div>
  );
}

/**
 * Circular Seal Monogram
 */
export function UniversalCircularSeal({
  text,
  id = 'univSealPath',
  color = '#71717a',
}) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
      <defs>
        <path
          id={id}
          d="M 100, 100 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
        />
      </defs>
      <text
        className="text-[8.2px] uppercase tracking-[0.28em] font-semibold"
        style={{ fill: color }}
      >
        <textPath href={`#${id}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/**
 * BasePrintSuiteEngine
 * Engine lengkap standar Atelier Line-Art yang diadopsi ke semua template:
 * - 5 Model Lipatan (Flat Card Suite, Bifold Booklet, Lipat Vertikal, Gatefold Spread, Pocket & Insert)
 * - Modal Pengaturan & Format Ekspor Lengkap (PDF Percetakan, PNG/JPG 300 DPI, window.print())
 * - Setting Kertas Khusus A4 (210 × 297 mm) & A5 (148 × 210 mm)
 * - Gaya Tinta: Original Theme vs Eco Clean White (Hemat Tinta)
 * - Simulasi Lipatan Interaktif (Terbuka Penuh vs Kartu Terlipat)
 * - Orientasi Head-to-Head 180° otomatis pada Sisi Luar agar saat dilipat tidak ada yang terbalik
 */
export default function BasePrintSuiteEngine({
  suiteTitle = 'Print Suite',
  suiteBadge = 'Studio Cetak Fisik',
  suiteSubtitle = 'Sinkron Otomatis dari Data Undangan',
  accentColor = '#09090b',
  invitation,
  embeddedInDashboard = false,
  templates = [],
  selectedTemplateId,
  onSelectTemplateId,
  paperThemes = [],
  selectedPaperTheme,
  onSelectPaperTheme,
  renderSheet1Cover,
  renderSheet2Couple,
  renderSheet3Event,
  renderSheet4Souvenir,
  extraToolbarControls = null,
}) {
  // --- CONFIGURATION STATES ---
  // Layout Structure: 'flat' | 'bifold' | 'vertical-arch' | 'gatefold' | 'pocket'
  const [layoutStructure, setLayoutStructure] = useState('flat');
  // Paper Size: STRICTLY ONLY 'A4' | 'A5'
  const [paperSize, setPaperSize] = useState('A5');
  // Ink Mode: 'original' | 'eco'
  const [inkMode, setInkMode] = useState('original');

  // Vertical Folding Preview State ('open' | 'folded') & active side ('cover' | 'back' | 'inside')
  const [archFoldView, setArchFoldView] = useState('open'); // 'open' | 'folded'
  const [archFoldSide, setArchFoldSide] = useState('cover'); // 'cover' | 'back' | 'inside'
  // Sisi Luar Head-to-Head 180° Rotation (Default true agar saat dilipat posisinya tegak sempurna)
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
  const monogram = `${brideShort.charAt(0)} & ${groomShort.charAt(0)}`;

  const isA4 = paperSize === 'A4';
  const sheetAspectClass = isA4 ? 'max-w-[560px] aspect-[210/297]' : 'max-w-[440px] aspect-[148/210]';
  const foldedAspectClass = isA4 ? 'max-w-[560px] aspect-[210/148.5]' : 'max-w-[440px] aspect-[148/105]';
  const foldedSizeLabel = isA4 ? 'A5 (210 × 148.5 mm)' : 'A6 (148 × 105 mm)';
  const unfoldedSizeLabel = isA4 ? 'A4 (210 × 297 mm)' : 'A5 (148 × 210 mm)';

  const sharedProps = {
    layoutStructure,
    paperSize,
    inkMode,
    isA4,
    showCropMarks,
    showIllustration,
    guestNamePrint,
    showTurutMengundang,
    turutMengundangText,
    selectedTemplateId,
    selectedPaperTheme,
    monogram,
  };

  // --- EXPORT HANDLERS ---
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
      const cleanTitle = suiteTitle.replace(/[^a-zA-Z0-9]/g, '-');
      const filename = `Undangan-Cetak-${cleanTitle}-${layoutStructure}-${paperSize}-${inkMode}.pdf`;
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

      const cleanTitle = suiteTitle.replace(/[^a-zA-Z0-9]/g, '-');
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
        link.download = `${cleanTitle}-${layoutStructure}-${paperSize}-${inkMode}-Lembar-${i + 1}.${ext}`;
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

  return (
    <div className={`physical-suite-wrapper ${inkMode === 'eco' ? 'eco-mode-active' : ''}`}>
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
        .eco-mode-active .print-sheet,
        .eco-mode-active .print-target-sheet {
          background-color: #ffffff !important;
          background-image: none !important;
        }
      `}</style>

      {/* TOP STUDIO TOOLBAR */}
      <div className="no-print bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 mb-8 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ backgroundColor: accentColor }}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{suiteBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-slate-900">
              {suiteTitle} &bull; Desain Cetak &amp; Ekspor Fleksibel
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
              {suiteSubtitle} &bull; Mempelai:{' '}
              <strong className="text-slate-800">
                {brideName} &amp; {groomName}
              </strong>
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

        {/* Template Selector Bar (Jika tema menyediakan beberapa template cetak) */}
        {templates.length > 1 && (
          <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-purple-600" />
                <span>Pilih Varian Template Desain Cetak</span>
              </label>
              <span className="text-[10px] text-slate-400 font-semibold">
                {templates.length} Pilihan Desain
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {templates.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => onSelectTemplateId?.(tmpl.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-zinc-900 shadow-sm ring-1 ring-zinc-900'
                        : 'bg-white/60 border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{tmpl.name}</p>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    {tmpl.description && (
                      <p className="text-[10.5px] text-slate-500 mt-0.5 line-clamp-1">
                        {tmpl.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
                { id: 'vertical-arch', label: 'Lipat Vertikal', sub: 'Model Kubah 🔥' },
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

          {/* 3. Ink Mode & Paper Themes */}
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

            {inkMode === 'original' && paperThemes.length > 0 && (
              <div className="grid grid-cols-1 gap-1">
                {paperThemes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectPaperTheme?.(p.id)}
                    className={`py-1 px-2 rounded-lg text-[9.5px] font-semibold text-left truncate transition-all cursor-pointer flex items-center justify-between ${
                      selectedPaperTheme === p.id
                        ? 'bg-zinc-800 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span className="truncate">{p.label}</span>
                    {selectedPaperTheme === p.id && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
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
              placeholder="Kosongkan untuk tulis tangan / stiker..."
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <label className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={(e) => setShowCropMarks(e.target.checked)}
                  className="rounded border-slate-300 text-zinc-900"
                />
                <Scissors className="w-3 h-3 text-slate-500" />
                <span>Crop Marks 3mm</span>
              </label>

              <label className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIllustration}
                  onChange={(e) => setShowIllustration(e.target.checked)}
                  className="rounded border-slate-300 text-zinc-900"
                />
                <Eye className="w-3 h-3 text-slate-500" />
                <span>Foto/Ilustrasi</span>
              </label>
            </div>
          </div>
        </div>

        {/* Extra Controls per Theme */}
        {extraToolbarControls && (
          <div className="border-t border-slate-100 pt-3">
            {extraToolbarControls(sharedProps)}
          </div>
        )}

        {/* Turut Mengundang Editor */}
        <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showTurutMengundang}
                onChange={(e) => setShowTurutMengundang(e.target.checked)}
                className="rounded border-slate-300 text-zinc-900"
              />
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Tampilkan Daftar &ldquo;Turut Mengundang&rdquo; di Lembar Acara</span>
            </label>
            <span className="text-[11px] text-slate-400">1 baris = 1 nama keluarga/kerabat</span>
          </div>
          {showTurutMengundang && (
            <textarea
              rows={2}
              value={turutMengundangText}
              onChange={(e) => setTurutMengundangText(e.target.value)}
              placeholder="Ketik daftar keluarga besar yang turut mengundang..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: PENGATURAN & FORMAT EKSPOR                         */}
      {/* ======================================================== */}
      {showExportModal && (
        <div className="export-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-purple-100 text-purple-900 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Sliders className="w-3 h-3 text-purple-700" />
                  <span>Pengaturan &amp; Format Ekspor Fisik</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Konfigurasi Siap Cetak &amp; Download
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih bentuk lipatan, ukuran kertas standar (A4/A5), mode tinta, dan format file.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
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
                    id: 'flat',
                    title: 'Flat Card Suite',
                    desc: 'Halaman dicetak per lembar terpisah (A5). Cocok untuk model loose-leaf card klasik.',
                  },
                  {
                    id: 'bifold',
                    title: 'Bifold Booklet (Lipat Dua)',
                    desc: 'Layout A4 Landscape (Sisi Luar: Belakang + Depan, Sisi Dalam: Mempelai + Acara) siap cetak duplex.',
                  },
                  {
                    id: 'vertical-arch',
                    title: 'Lipat Vertikal (Model Kubah) 🔥',
                    desc: 'Layout A4 Portrait lipat tengah ke A5 Landscape dengan simulasi lipat & orientasi head-to-head.',
                  },
                  {
                    id: 'gatefold',
                    title: 'Gatefold Spread (Gerbang 3-Panel)',
                    desc: '1 panel tengah A5 dan 2 panel sayap penutup samping (kiri & kanan 74mm).',
                  },
                  {
                    id: 'pocket',
                    title: 'Pocket & Insert',
                    desc: 'Format saku amplop luar + kartu sisipan vertikal elegan.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLayoutStructure(item.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      layoutStructure === item.id
                        ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    } ${item.id === 'pocket' ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      {layoutStructure === item.id && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: PILIHAN UKURAN KERTAS (HANYA A4 & A5) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>2. Pilihan Ukuran Kertas (Terkunci A4 &amp; A5)</span>
                </span>
                <span className="text-[11px] font-bold text-purple-700 font-mono">
                  {paperSize} Selected
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div
                  onClick={() => setPaperSize('A4')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                    paperSize === 'A4'
                      ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kertas A4 (210 × 297 mm)</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Standar utama percetakan duplex, booklet bifold A4 landscape, atau lembar kerja HVS/Art Paper tebal.
                    </p>
                  </div>
                  {paperSize === 'A4' && <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 ml-2" />}
                </div>

                <div
                  onClick={() => setPaperSize('A5')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                    paperSize === 'A5'
                      ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kertas A5 (148 × 210 mm)</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Format kartu undangan terpisah, amplop saku, dan standar undangan fisik premium kompak.
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
                    Sesuai palet warna tema yang dipilih (Warm Sand, Krem Ningrat, Royal Moka, atau Putih Gading).
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

            {/* SECTION 4: FORMAT OUTPUT FILE */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-purple-600" />
                <span>4. Format Output File Siap Pakai</span>
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
        {/* MODEL 1: FLAT CARD SUITE */}
        {layoutStructure === 'flat' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 01 — Sampul Depan ({paperSize} • {isA4 ? '21 × 29.7 cm' : '14.8 × 21 cm'})
                </span>
                <span className="text-[11px] text-slate-500">Front Cover</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet1Cover(sharedProps)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 02 — Isi Utama: Mempelai &amp; Doa ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Main Couple</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet2Couple(sharedProps)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 03 — Jadwal Acara &amp; QR Code ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Event &amp; Smart QR</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet3Event(sharedProps)}
              </div>
            </div>

            <div className="space-y-2">
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto px-1">
                <span className="text-xs font-bold text-slate-700">
                  Lembar 04 — Kupon Souvenir, Tag &amp; Belly Band ({paperSize})
                </span>
                <span className="text-[11px] text-slate-500">Siap Potong</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet4Souvenir(sharedProps)}
              </div>
            </div>
          </div>
        )}

        {/* MODEL 2: BIFOLD BOOKLET (A4/A5 LANDSCAPE DUPLEX READY) */}
        {layoutStructure === 'bifold' && (
          <div className="space-y-10">
            {/* Sisi Luar: Cover Belakang [Kiri] + Cover Depan [Kanan] */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Sisi Luar (Outer Spread) — Cover Belakang [Kiri] + Cover Depan [Kanan]</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">{isA4 ? 'A4 Landscape (297 × 210 mm)' : 'A5 Landscape (210 × 148 mm)'}</span>
              </div>
              <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-2 overflow-hidden">
                {showCropMarks && <UniversalCropMarks isSpread folds={['50%']} />}
                <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-zinc-300 z-20 pointer-events-none" />
                <div className="h-full border-r border-dashed border-zinc-200 overflow-hidden">
                  {renderSheet4Souvenir ? renderSheet4Souvenir({ ...sharedProps, isHalfSpread: true }) : renderSheet1Cover(sharedProps)}
                </div>
                <div className="h-full overflow-hidden">
                  {renderSheet1Cover({ ...sharedProps, isHalfSpread: true })}
                </div>
              </div>
            </div>

            {/* Sisi Dalam: Mempelai [Kiri] + Acara & QR [Kanan] */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Sisi Dalam (Inner Spread) — Inti Mempelai [Kiri] + Jadwal Acara &amp; QR [Kanan]</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Duplex Back-to-Back</span>
              </div>
              <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-2 overflow-hidden">
                {showCropMarks && <UniversalCropMarks isSpread folds={['50%']} />}
                <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dashed border-zinc-300 z-20 pointer-events-none" />
                <div className="h-full border-r border-dashed border-zinc-200 overflow-hidden">
                  {renderSheet2Couple({ ...sharedProps, isHalfSpread: true })}
                </div>
                <div className="h-full overflow-hidden">
                  {renderSheet3Event({ ...sharedProps, isHalfSpread: true })}
                </div>
              </div>
            </div>

            {/* Pelengkap Souvenir */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Souvenir &amp; Tag ({paperSize})</span>
                <span className="text-[11px] text-slate-500">Siap Potong</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet4Souvenir(sharedProps)}
              </div>
            </div>
          </div>
        )}

        {/* MODEL 3: LIPAT VERTIKAL DENGAN SIMULASI LIPAT & HEAD-TO-HEAD ROTATION */}
        {layoutStructure === 'vertical-arch' && (
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

            {/* SIMULASI TAMPILAN TERLIPAT */}
            {archFoldView === 'folded' && (
              <div className="no-print space-y-4">
                {archFoldSide === 'cover' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Tampak Muka Depan Kartu (Setelah Kertas {paperSize} Dilipat Menjadi {foldedSizeLabel})
                      </span>
                    </div>
                    <div className={`relative w-full ${foldedAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 bg-white overflow-hidden rounded-t-sm select-none`}>
                      <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-stone-400/25 to-transparent pointer-events-none border-b border-stone-300/60" />
                      <div className="absolute top-1 inset-x-0 flex justify-center pointer-events-none">
                        <span className="px-2 py-0.2 bg-stone-100/90 border border-stone-300 rounded-full text-[6.5px] font-bold uppercase tracking-widest text-stone-600">
                          ▲ Sisi Lipatan Atas (Folded Edge) ▲
                        </span>
                      </div>
                      <div className="h-full overflow-hidden">
                        {renderSheet1Cover({ ...sharedProps, isHalfSpread: true })}
                      </div>
                    </div>
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

                {archFoldSide === 'back' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Tampak Belakang Kartu (Cover Belakang Saat Terlipat • QR Map &amp; Doa)
                      </span>
                    </div>
                    <div className={`relative w-full ${foldedAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 bg-white overflow-hidden rounded-t-sm select-none`}>
                      <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-stone-400/25 to-transparent pointer-events-none border-b border-stone-300/60" />
                      <div className="absolute top-1 inset-x-0 flex justify-center pointer-events-none">
                        <span className="px-2 py-0.2 bg-stone-100/90 border border-stone-300 rounded-full text-[6.5px] font-bold uppercase tracking-widest text-stone-600">
                          ▲ Sisi Lipatan Atas (Folded Edge) ▲
                        </span>
                      </div>
                      <div className="h-full overflow-hidden">
                        {renderSheet4Souvenir({ ...sharedProps, isHalfSpread: true })}
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

                {archFoldSide === 'inside' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Tampak Sisi Dalam Terbuka (Mempelai di Atas &amp; Jadwal di Bawah Terhubung Lipatan)
                      </span>
                    </div>
                    <div className={`relative w-full ${sheetAspectClass} mx-auto shadow-2xl border-2 border-zinc-400/80 bg-white flex flex-col justify-between overflow-hidden select-none`}>
                      <div className="h-1/2 overflow-hidden border-b border-dashed border-zinc-300">
                        {renderSheet2Couple({ ...sharedProps, isHalfSpread: true })}
                      </div>
                      <div className="relative z-20 w-full h-4 bg-gradient-to-b from-stone-300/40 via-stone-200/20 to-stone-300/40 border-y border-dashed border-stone-300 flex items-center justify-center">
                        <span className="px-3 py-0.5 bg-white/95 rounded-full text-[7px] font-bold uppercase tracking-widest text-stone-600 border border-stone-200 shadow-2xs">
                          Garis Lipatan Tengah (Crease • {isA4 ? '148.5 mm' : '105 mm'})
                        </span>
                      </div>
                      <div className="h-1/2 overflow-hidden">
                        {renderSheet3Event({ ...sharedProps, isHalfSpread: true })}
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

                <div className="max-w-[560px] mx-auto p-4 bg-purple-50/80 border border-purple-200 rounded-2xl text-slate-700 text-xs space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-purple-900">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>Petunjuk Cetak &amp; Lipat Kertas {paperSize}:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                    <li>Cetak <strong>Lembar 1 (Sisi Dalam)</strong> dan <strong>Lembar 2 (Sisi Luar)</strong> secara bolak-balik (Duplex) pada 1 lembar kertas {paperSize}.</li>
                    <li>Lipat kertas tepat di garis tengah horizontal ({isA4 ? '148.5 mm dari atas' : '105 mm dari atas'}).</li>
                    <li>Kertas {paperSize} otomatis menjadi kartu lipat {foldedSizeLabel} dengan nama tamu di depan dan isi acara di dalam.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* PRINTABLE SHEETS (ALWAYS IN DOM FOR PRINT & PDF) */}
            <div className={`space-y-10 ${archFoldView === 'folded' ? 'pt-6 border-t border-slate-200' : ''}`}>
              {archFoldView === 'folded' && (
                <div className="no-print text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                    <Printer className="w-3.5 h-3.5 text-purple-600" />
                    <span>Lembar Kerja Cetak Utuh ({paperSize}) — Digunakan Saat Tombol Cetak / PDF Ditekan</span>
                  </div>
                </div>
              )}

              {/* Lembar 1: Sisi Dalam */}
              <div>
                <div className="no-print flex items-center justify-between max-w-[560px] mx-auto mb-2 px-1">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                    <FoldHorizontal className="w-3.5 h-3.5 text-pink-600" />
                    <span>Lembar 1: Sisi Dalam (Inner Spread) — Mempelai di Atas + Jadwal Acara di Bawah</span>
                  </span>
                  <span className="text-[11px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    {paperSize} Portrait
                  </span>
                </div>

                <div className={`print-sheet print-target-sheet print-vertical-arch-spread relative w-full ${sheetAspectClass} mx-auto shadow-2xl border border-zinc-300 bg-white flex flex-col justify-between overflow-hidden select-none`}>
                  {showCropMarks && <UniversalCropMarks isSpread folds={['50%']} />}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
                    <div className="w-full border-t border-dashed border-zinc-400" />
                    <span className="no-print absolute px-3 py-0.5 bg-white border border-purple-300 rounded-full text-[7.5px] font-bold uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                      <Scissors className="w-2.5 h-2.5" />
                      <span>Garis Lipat Tengah • Lipat Jadi {foldedSizeLabel}</span>
                    </span>
                  </div>

                  <div className="relative h-1/2 overflow-hidden border-b border-dashed border-zinc-200">
                    {renderSheet2Couple({ ...sharedProps, isHalfSpread: true })}
                  </div>
                  <div className="relative h-1/2 overflow-hidden">
                    {renderSheet3Event({ ...sharedProps, isHalfSpread: true })}
                  </div>
                </div>
              </div>

              {/* Lembar 2: Sisi Luar (Duplex Ready with 180° Head-to-Head Rotation) */}
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

                <div className={`print-sheet print-target-sheet print-vertical-arch-spread relative w-full ${sheetAspectClass} mx-auto shadow-2xl border border-zinc-300 bg-white flex flex-col justify-between overflow-hidden select-none`}>
                  {showCropMarks && <UniversalCropMarks isSpread folds={['50%']} />}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
                    <div className="w-full border-t border-dashed border-zinc-400" />
                    <span className="no-print absolute px-3 py-0.5 bg-white border border-purple-300 rounded-full text-[7.5px] font-bold uppercase tracking-wider text-purple-700 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                      <Scissors className="w-2.5 h-2.5" />
                      <span>Garis Lipat Tengah • Lipat Jadi {foldedSizeLabel}</span>
                    </span>
                  </div>

                  {/* Sisi Atas: Cover Belakang (Dirotasi 180° jika outerBackCoverRotation aktif) */}
                  <div className={`relative h-1/2 overflow-hidden border-b border-dashed border-zinc-200 transition-transform duration-300 ${
                    outerBackCoverRotation ? 'rotate-180' : ''
                  }`}>
                    {outerBackCoverRotation && (
                      <div className="no-print absolute top-2 right-2 z-30 pointer-events-none rotate-180">
                        <span className="px-2 py-0.5 bg-amber-500/90 text-white rounded-full text-[6.5px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>Terbalik 180° (Agar Saat Dilipat Menjadi Tegak)</span>
                        </span>
                      </div>
                    )}
                    {renderSheet4Souvenir({ ...sharedProps, isHalfSpread: true })}
                  </div>

                  {/* Sisi Bawah: Cover Depan */}
                  <div className="relative h-1/2 overflow-hidden">
                    {renderSheet1Cover({ ...sharedProps, isHalfSpread: true })}
                  </div>
                </div>
              </div>

              {/* Lembar Pelengkap Souvenir */}
              <div>
                <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                  <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Kupon Souvenir &amp; Tag ({paperSize})</span>
                  <span className="text-[11px] text-slate-500">Siap Potong</span>
                </div>
                <div className="print-target-sheet">
                  {renderSheet4Souvenir(sharedProps)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODEL 4: GATEFOLD SPREAD (GERBANG 3-PANEL) */}
        {layoutStructure === 'gatefold' && (
          <div className="space-y-10">
            <div>
              <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <FoldVertical className="w-3.5 h-3.5 text-purple-600" />
                  <span>Gatefold Bagian Dalam (Inner Spread) — Sayap Kiri (74mm) + Inti Mempelai (148mm) + Sayap Kanan (74mm)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Total A4 Landscape</span>
              </div>

              <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-4 overflow-hidden">
                {showCropMarks && <UniversalCropMarks isSpread folds={['25%', '75%']} />}
                <div className="absolute inset-y-0 left-1/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />
                <div className="absolute inset-y-0 left-3/4 w-[1px] border-r border-dashed border-zinc-400 z-20 pointer-events-none" />

                {/* Left Flap */}
                <div className="col-span-1 border-r border-zinc-200 p-4 flex flex-col justify-between bg-white text-zinc-950 relative">
                  <div className="text-center pt-2">
                    <span className="text-[7.5px] uppercase tracking-widest font-bold text-zinc-500">SAYAP KIRI</span>
                    <p className="text-[8px] italic text-zinc-600 mt-2">
                      &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu...&rdquo;
                    </p>
                  </div>
                  <div className="my-auto text-center font-bold text-lg text-zinc-800">
                    {monogram}
                  </div>
                  <div className="text-center text-[7px] text-zinc-400 uppercase tracking-widest">
                    ✂ LIPAT KE DALAM ✂
                  </div>
                </div>

                {/* Center Core */}
                <div className="col-span-2 border-r border-zinc-200 overflow-hidden">
                  {renderSheet2Couple({ ...sharedProps, isHalfSpread: true })}
                </div>

                {/* Right Flap */}
                <div className="col-span-1 p-4 flex flex-col justify-between bg-white text-zinc-950 relative">
                  <div className="text-center pt-2">
                    <span className="text-[7.5px] uppercase tracking-widest font-bold text-zinc-500">SAYAP KANAN</span>
                    <p className="text-[8px] font-bold text-zinc-800 uppercase tracking-wider mt-2">
                      Rangkaian Acara
                    </p>
                  </div>
                  <div className="my-auto overflow-hidden text-center scale-90">
                    {renderSheet3Event({ ...sharedProps, isHalfSpread: true })}
                  </div>
                  <div className="text-center text-[7px] text-zinc-400 uppercase tracking-widest">
                    ✂ LIPAT KE DALAM ✂
                  </div>
                </div>
              </div>
            </div>

            {/* Sisi Luar Gatefold */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[920px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <FoldVertical className="w-3.5 h-3.5 text-purple-600" />
                  <span>Gatefold Bagian Luar (Outer Spread) — Sayap Terkatup</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Tampak Luar</span>
              </div>
              <div className="print-sheet print-bifold-spread print-target-sheet relative max-w-[920px] aspect-[297/210] mx-auto shadow-2xl border border-zinc-300 bg-white grid grid-cols-4 overflow-hidden">
                {showCropMarks && <UniversalCropMarks isSpread folds={['25%', '75%']} />}
                <div className="col-span-1 border-r border-zinc-200 p-4 flex flex-col justify-between text-right">
                  <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-400">UNDANGAN</span>
                  <span className="font-serif italic text-base text-zinc-800">{brideShort}</span>
                  <span className="text-[6.5px] text-zinc-400">BUKA KE KANAN ➔</span>
                </div>
                <div className="col-span-2 border-r border-zinc-200 overflow-hidden">
                  {renderSheet4Souvenir({ ...sharedProps, isHalfSpread: true })}
                </div>
                <div className="col-span-1 p-4 flex flex-col justify-between text-left">
                  <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-400">PERNIKAHAN</span>
                  <span className="font-serif italic text-base text-zinc-800">{groomShort}</span>
                  <span className="text-[6.5px] text-zinc-400">⬅ BUKA KE KIRI</span>
                </div>
              </div>
            </div>

            {/* Pelengkap Souvenir */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="text-xs font-bold text-slate-700">Lembar Pelengkap Souvenir &amp; Tag ({paperSize})</span>
                <span className="text-[11px] text-slate-500">Siap Potong</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet4Souvenir(sharedProps)}
              </div>
            </div>
          </div>
        )}

        {/* MODEL 5: POCKET & INSERT */}
        {layoutStructure === 'pocket' && (
          <div className="space-y-10">
            {/* Bagian 1: Pocket Sleeve */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <span>Bagian 1 — Saku Amplop Luar (Pocket Sleeve {paperSize} dengan Pola Saku)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Pocket Sleeve</span>
              </div>
              <div className="print-sheet print-target-sheet relative w-full max-w-[460px] aspect-[148/210] mx-auto shadow-2xl border border-zinc-300 bg-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none">
                {showCropMarks && <UniversalCropMarks />}
                <div className="absolute inset-3 border-2 border-zinc-950 pointer-events-none" />
                <div className="text-center pt-2 relative z-10">
                  <span className="inline-block px-3 py-0.5 text-[8px] uppercase tracking-widest font-bold bg-zinc-950 text-white">
                    AMPLOP SAKU EKSKLUSIF
                  </span>
                  <p className="text-[8.5px] uppercase tracking-[0.24em] text-zinc-500 mt-1">
                    ROYAL POCKET SUITE &bull; {paperSize}
                  </p>
                </div>
                <div className="text-center my-auto py-2 relative z-10">
                  <div className="w-18 h-18 mx-auto rounded-full border-2 border-zinc-950 flex items-center justify-center font-serif italic text-2xl font-bold mb-3 bg-white shadow-xs">
                    {monogram}
                  </div>
                  <h1 className="font-serif text-3xl text-zinc-900">{brideName}</h1>
                  <p className="font-serif italic text-base my-0.5 text-zinc-500">&amp;</p>
                  <h2 className="font-serif text-3xl text-zinc-900">{groomName}</h2>
                  <div className="mt-3 max-w-[240px] mx-auto border border-zinc-950 py-2 px-3 text-center">
                    <span className="text-[7.5px] uppercase tracking-[0.2em] block text-zinc-500 mb-0.5">Kepada Yth:</span>
                    <p className="font-serif font-bold text-xs truncate text-zinc-900">
                      {guestNamePrint.trim() || 'Bapak/Ibu/Saudara/i'}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 pt-2 border-t border-dashed border-zinc-400 text-center">
                  <span className="text-[7.5px] uppercase tracking-[0.24em] text-zinc-500 block">
                    ✂ LIPAT TAB LEM SEPANJANG GARIS PUTUS-PUTUS UNTUK MEMBENTUK SAKU ✂
                  </span>
                </div>
              </div>
            </div>

            {/* Bagian 2: Kartu Sisipan Inti */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>Bagian 2 — Kartu Sisipan Inti (Vertical Main Insert)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Insert Vertikal</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet2Couple(sharedProps)}
              </div>
            </div>

            {/* Bagian 3: Kartu Sisipan Pendamping */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  <span>Bagian 3 — Kartu Sisipan Pendamping (Jadwal Acara &amp; Smart QR Slip)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Insert Slip</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet3Event(sharedProps)}
              </div>
            </div>

            {/* Bagian 4: Kupon Souvenir */}
            <div>
              <div className="no-print flex items-center justify-between max-w-[460px] mx-auto mb-2 px-1">
                <span className="text-xs font-bold text-slate-700">Lembar Kupon Souvenir &amp; Tag ({paperSize})</span>
                <span className="text-[11px] text-slate-500">Siap Potong</span>
              </div>
              <div className="print-target-sheet">
                {renderSheet4Souvenir(sharedProps)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
