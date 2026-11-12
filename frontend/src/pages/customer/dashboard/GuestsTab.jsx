import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Send,
  Copy,
  Check,
  Trash2,
  Plus,
  Search,
  Users,
  FileText,
  FileSpreadsheet,
  Upload,
  Download,
  X,
  Eye,
  Info,
  Edit3,
  RotateCcw,
  Zap,
  Play,
  Pause,
  Square,
  Settings2,
  CheckCircle2,
  AlertCircle,
  SkipForward,
} from 'lucide-react';
import { useInvitation } from '../../../hooks/useAdminInvitations';
import {
  useGuestsList,
  useAddGuest,
  useBulkAddGuests,
  useUpdateGuest,
  useDeleteGuest,
  useSendGuestWhatsapp,
} from '../../../hooks/useGuests';

const CATEGORIES = [
  'Keluarga Besar',
  'Sahabat / Teman Dekat',
  'Rekan Kerja / VIP',
  'Tetangga',
];

const DELAY_PRESETS = [
  { id: 'instant', label: 'Instan (1 detik / tamu)', minSec: 1, maxSec: 1 },
  { id: 'fast', label: 'Cepat (3 – 5 detik / tamu)', minSec: 3, maxSec: 5 },
  { id: 'safe', label: 'Aman Standar (6 – 10 detik / tamu • Direkomendasikan)', minSec: 6, maxSec: 10 },
  { id: 'ultra_safe', label: 'Sangat Aman (10 – 15 detik / tamu • Ratusan Tamu)', minSec: 10, maxSec: 15 },
];

const DEFAULT_WA_TEMPLATE = `Assalamu'alaikum Wr. Wb
Bismillahirrahmanirrahim.

Yth. {nama_tamu},

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami:

{nama_mempelai}

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi:

{link_undangan}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini. Terima kasih banyak atas perhatiannya.

Wassalamu'alaikum Wr. Wb.
Terima Kasih.`;

function normalizePhone(raw) {
  if (raw === null || raw === undefined) return '';
  let str = String(raw).trim();
  if (!str) return '';
  // Remove spaces, dashes, parentheses
  let digits = str.replace(/[^0-9+]/g, '');
  if (!digits) return '';
  // In Excel, leading 0 is often stripped (e.g. 81234567890)
  if (digits.startsWith('8') && digits.length >= 9) {
    digits = '0' + digits;
  } else if (digits.startsWith('+62')) {
    digits = '0' + digits.slice(3);
  } else if (digits.startsWith('62') && digits.length >= 10) {
    digits = '0' + digits.slice(2);
  }
  return digits;
}

function buildWaMessage(templateStr, guest, invitation) {
  const guestName = guest?.name || 'Nama Tamu';
  const inviteUrl = `${window.location.origin}/${invitation.slug}?to=${encodeURIComponent(guestName)}`;
  const coupleNames = `${invitation.bride_name || invitation.bride_nickname || 'Mempelai Wanita'} & ${invitation.groom_name || invitation.groom_nickname || 'Mempelai Pria'}`;
  const eventDate = invitation.akad_date || invitation.resepsi_date || '-';
  const eventLocation = invitation.akad_location || invitation.resepsi_location || '-';

  const rawTemplate = templateStr && templateStr.trim() ? templateStr : DEFAULT_WA_TEMPLATE;

  return rawTemplate
    .replace(/\{nama_tamu\}|"Nama yang di undang"/gi, guestName)
    .replace(/\{nama_mempelai\}|"Nama mempelai"/gi, coupleNames)
    .replace(/\{link_undangan\}|"Link undangan"/gi, inviteUrl)
    .replace(/\{tanggal_acara\}/gi, eventDate)
    .replace(/\{lokasi_acara\}/gi, eventLocation);
}

function getWaLink(guest, invitation, templateStr) {
  const text = buildWaMessage(templateStr, guest, invitation);

  let cleanPhone = (guest.phone ?? '').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);

  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }
  // If phone is empty, wa.me/?text=... opens WhatsApp Contact Picker on HP/Desktop
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export default function GuestsTab({ invitationId, showToast }) {
  const { data: invitation } = useInvitation(invitationId);
  const { data: guests = [], isLoading } = useGuestsList(invitationId);
  const addGuest = useAddGuest(invitationId);
  const bulkAddGuests = useBulkAddGuests(invitationId);
  const updateGuest = useUpdateGuest(invitationId);
  const deleteGuest = useDeleteGuest(invitationId);
  const sendGuestWhatsapp = useSendGuestWhatsapp(invitationId);

  const fileInputRef = useRef(null);
  const templateTextareaRef = useRef(null);
  const broadcastAbortRef = useRef(false);
  const broadcastPauseRef = useRef(false);

  const storageKey = `invitory_wa_template_${invitationId}`;
  const gatewayStorageKey = `invitory_wa_gateway_${invitationId}`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // WA Message Template Editor State
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [waTemplate, setWaTemplate] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || DEFAULT_WA_TEMPLATE;
    } catch {
      return DEFAULT_WA_TEMPLATE;
    }
  });

  // Auto-Broadcast (Blast) State
  const [showBroadcastPanel, setShowBroadcastPanel] = useState(false);
  const [broadcastMode, setBroadcastMode] = useState('auto_blast'); // 'auto_blast' | 'rapid_queue'
  const [broadcastTargetFilter, setBroadcastTargetFilter] = useState('unsent'); // 'unsent' | 'all'
  const [broadcastCategoryFilter, setBroadcastCategoryFilter] = useState('all');
  const [delayPresetId, setDelayPresetId] = useState('safe');
  const [showGatewayConfig, setShowGatewayConfig] = useState(false);
  const [gatewayProvider, setGatewayProvider] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(gatewayStorageKey) || '{}');
      return saved.provider || 'fonnte';
    } catch {
      return 'fonnte';
    }
  });
  const [gatewayToken, setGatewayToken] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(gatewayStorageKey) || '{}');
      return saved.token || '';
    } catch {
      return '';
    }
  });
  const [gatewayUrl, setGatewayUrl] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(gatewayStorageKey) || '{}');
      return saved.url || '';
    } catch {
      return '';
    }
  });

  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isBroadcastPaused, setIsBroadcastPaused] = useState(false);
  const [broadcastTotal, setBroadcastTotal] = useState(0);
  const [broadcastCompleted, setBroadcastCompleted] = useState(0);
  const [broadcastStatusText, setBroadcastStatusText] = useState('');
  const [broadcastLogs, setBroadcastLogs] = useState([]);
  const [rapidQueueIndex, setRapidQueueIndex] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setWaTemplate(saved || DEFAULT_WA_TEMPLATE);
    } catch {
      setWaTemplate(DEFAULT_WA_TEMPLATE);
    }
  }, [storageKey]);

  const handleSaveGatewayConfig = () => {
    try {
      localStorage.setItem(
        gatewayStorageKey,
        JSON.stringify({
          provider: gatewayProvider,
          token: gatewayToken,
          url: gatewayUrl,
        })
      );
    } catch {
      // ignore
    }
    showToast('Pengaturan koneksi WhatsApp Gateway disimpan!');
    setShowGatewayConfig(false);
  };

  // Excel import state
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [excelFileName, setExcelFileName] = useState('');
  const [excelPreviewRows, setExcelPreviewRows] = useState([]);
  const [defaultExcelCategory, setDefaultExcelCategory] = useState(CATEGORIES[0]);

  const handleSaveWaTemplate = () => {
    try {
      localStorage.setItem(storageKey, waTemplate);
    } catch {
      // ignore storage errors
    }
    showToast('Kata pengantar WhatsApp berhasil disimpan!');
    setShowTemplateEditor(false);
  };

  const handleResetWaTemplate = () => {
    setWaTemplate(DEFAULT_WA_TEMPLATE);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore storage errors
    }
    showToast('Kata pengantar dikembalikan ke format default!');
  };

  const handleInsertTag = (tag) => {
    const el = templateTextareaRef.current;
    if (!el) {
      setWaTemplate((prev) => `${prev} ${tag}`);
      return;
    }
    const start = el.selectionStart ?? waTemplate.length;
    const end = el.selectionEnd ?? waTemplate.length;
    const updated = waTemplate.slice(0, start) + tag + waTemplate.slice(end);
    setWaTemplate(updated);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + tag.length, start + tag.length);
    }, 0);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addGuest.mutateAsync({
      name: name.trim(),
      phone: normalizePhone(phone) || null,
      category,
    });
    setName('');
    setPhone('');
    showToast(`Tamu "${name.trim()}" berhasil ditambahkan!`);
  };

  const handleDownloadTemplate = () => {
    const sampleData = [
      {
        'Nama Tamu': 'Bpk. H. Ahmad & Keluarga',
        'Nomor WhatsApp': '081234567890',
        Kategori: 'Keluarga Besar',
      },
      {
        'Nama Tamu': 'Ibu Hj. Siti Aminah',
        'Nomor WhatsApp': '085712345678',
        Kategori: 'Keluarga Besar',
      },
      {
        'Nama Tamu': 'Dimas Kurniawan & Partner',
        'Nomor WhatsApp': '081398765432',
        Kategori: 'Sahabat / Teman Dekat',
      },
      {
        'Nama Tamu': 'dr. Rina Permata, Sp.A',
        'Nomor WhatsApp': '081122334455',
        Kategori: 'Rekan Kerja / VIP',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    worksheet['!cols'] = [{ wch: 32 }, { wch: 20 }, { wch: 24 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Tamu');
    XLSX.writeFile(workbook, 'Template_Daftar_Tamu_Undangan.xlsx');
    showToast('Template Excel berhasil diunduh!');
  };

  const handleExportGuestsExcel = () => {
    if (guests.length === 0) {
      showToast('Belum ada daftar tamu untuk di-export.');
      return;
    }

    const rows = guests.map((g, idx) => ({
      No: idx + 1,
      'Nama Tamu': g.name,
      'Nomor WhatsApp': g.phone || '',
      Kategori: g.category || 'Keluarga Besar',
      'Status Sebar WA': g.status_sent ? 'Sudah Terkirim' : 'Belum Dikirim',
      'Link Personal Undangan': `${window.location.origin}/${invitation.slug}?to=${encodeURIComponent(g.name)}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet['!cols'] = [
      { wch: 6 },
      { wch: 32 },
      { wch: 18 },
      { wch: 22 },
      { wch: 18 },
      { wch: 55 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Tamu');
    XLSX.writeFile(workbook, `Daftar_Tamu_${invitation.slug}.xlsx`);
    showToast('Daftar tamu berhasil di-export ke Excel!');
  };

  const handleExcelFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    setShowExcelModal(true);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (!jsonRows || jsonRows.length === 0) {
        showToast('File Excel kosong atau tidak memiliki baris data.');
        e.target.value = '';
        return;
      }

      const parsed = [];
      for (const row of jsonRows) {
        const keys = Object.keys(row);
        if (keys.length === 0) continue;

        const nameKey =
          keys.find((k) => /nama|name|tamu|guest/i.test(k)) ?? keys[0];
        const phoneKey =
          keys.find((k) => /wa|whatsapp|hp|telp|telepon|phone|nomor|no/i.test(k) && k !== nameKey) ??
          keys[1];
        const catKey =
          keys.find((k) => /kategori|category|grup|group|keterangan/i.test(k)) ??
          keys[2];

        const rawName = String(row[nameKey] ?? '').trim();
        if (!rawName || /^nama(\s+tamu)?$/i.test(rawName)) continue;

        const rawPhone = phoneKey ? normalizePhone(row[phoneKey]) : '';
        const rawCat = catKey ? String(row[catKey] ?? '').trim() : '';

        parsed.push({
          name: rawName,
          phone: rawPhone || '',
          category: rawCat || defaultExcelCategory,
        });
      }

      setExcelPreviewRows(parsed);
      if (parsed.length > 0) {
        showToast(`Berhasil membaca ${parsed.length} tamu dari "${file.name}"!`);
      } else {
        showToast('Tidak ditemukan kolom Nama Tamu yang valid di file tersebut.');
      }
    } catch {
      showToast('Gagal membaca file Excel. Pastikan format .xlsx, .xls, atau .csv.');
    }

    e.target.value = '';
  };

  const handleUpdatePreviewRow = (index, field, val) => {
    setExcelPreviewRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: val } : row))
    );
  };

  const handleRemovePreviewRow = (index) => {
    setExcelPreviewRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirmExcelImport = async () => {
    const validRows = excelPreviewRows
      .map((r) => ({
        name: r.name.trim(),
        phone: normalizePhone(r.phone) || null,
        category: r.category?.trim() || defaultExcelCategory,
      }))
      .filter((r) => r.name.length > 0);

    if (validRows.length === 0) return;

    await bulkAddGuests.mutateAsync(validRows);
    showToast(`${validRows.length} tamu dari Excel berhasil disimpan!`);
    setExcelPreviewRows([]);
    setExcelFileName('');
    setShowExcelModal(false);
  };

  const handleToggleSent = (guest) => {
    updateGuest.mutate({ id: guest.id, status_sent: !guest.status_sent });
  };

  const handleDelete = (guest) => {
    deleteGuest.mutate(guest.id);
    showToast('Tamu berhasil dihapus');
  };

  const handleCopyLink = (guest) => {
    const url = `${window.location.origin}/${invitation.slug}?to=${encodeURIComponent(guest.name)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    showToast(`Link personal untuk "${guest.name}" berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyWaText = (guest) => {
    const text = buildWaMessage(waTemplate, guest, invitation);
    navigator.clipboard.writeText(text);
    showToast(`Teks undangan WA untuk "${guest.name}" berhasil disalin!`);
  };

  if (!invitation) return null;

  const sampleGuestForPreview = guests[0] || { name: 'Bpk. H. Ahmad & Keluarga' };
  const liveMessagePreview = buildWaMessage(waTemplate, sampleGuestForPreview, invitation);

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.phone ?? '').includes(searchQuery);
    const matchesCat = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const sentCount = guests.filter((g) => g.status_sent).length;

  // Target guests for broadcast
  const broadcastCandidates = guests.filter((g) => {
    const matchStatus = broadcastTargetFilter === 'unsent' ? !g.status_sent : true;
    const matchCat =
      broadcastCategoryFilter === 'all' || g.category === broadcastCategoryFilter;
    return matchStatus && matchCat;
  });

  const broadcastGuestsWithPhone = broadcastCandidates.filter(
    (g) => (g.phone ?? '').replace(/[^0-9]/g, '').length >= 8
  );

  const activeRapidGuest =
    broadcastCandidates[rapidQueueIndex] || broadcastCandidates[0] || null;

  const sleepWithPauseAndAbort = async (ms) => {
    const step = 250;
    let elapsed = 0;
    while (elapsed < ms) {
      if (broadcastAbortRef.current) return false;
      if (broadcastPauseRef.current) {
        await new Promise((r) => setTimeout(r, step));
        continue;
      }
      await new Promise((r) => setTimeout(r, step));
      elapsed += step;
    }
    return !broadcastAbortRef.current;
  };

  const handleStartAutoBroadcast = async () => {
    if (broadcastGuestsWithPhone.length === 0) {
      showToast('Tidak ada tamu dengan nomor WhatsApp yang siap di-broadcast.');
      return;
    }

    const queue = [...broadcastGuestsWithPhone];
    const preset = DELAY_PRESETS.find((p) => p.id === delayPresetId) || DELAY_PRESETS[2];

    broadcastAbortRef.current = false;
    broadcastPauseRef.current = false;
    setIsBroadcasting(true);
    setIsBroadcastPaused(false);
    setBroadcastTotal(queue.length);
    setBroadcastCompleted(0);
    setBroadcastLogs([]);

    let successCount = 0;

    for (let i = 0; i < queue.length; i++) {
      if (broadcastAbortRef.current) break;

      while (broadcastPauseRef.current && !broadcastAbortRef.current) {
        setBroadcastStatusText('Broadcast dijeda sementara...');
        await new Promise((r) => setTimeout(r, 300));
      }
      if (broadcastAbortRef.current) break;

      const currentGuest = queue[i];
      setBroadcastStatusText(
        `Mengirim (${i + 1}/${queue.length}) ke ${currentGuest.name} (${currentGuest.phone})...`
      );

      const messageText = buildWaMessage(waTemplate, currentGuest, invitation);
      const timeStr = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      try {
        await sendGuestWhatsapp.mutateAsync({
          id: currentGuest.id,
          message: messageText,
          provider: gatewayToken.trim() ? gatewayProvider : 'simulation',
          api_token: gatewayToken.trim() || null,
          gateway_url: gatewayUrl.trim() || null,
        });

        successCount++;
        setBroadcastCompleted(i + 1);
        setBroadcastLogs((prev) => [
          {
            id: `${currentGuest.id}-${Date.now()}`,
            name: currentGuest.name,
            phone: currentGuest.phone,
            status: 'success',
            time: timeStr,
          },
          ...prev,
        ]);
      } catch (err) {
        const errMsg =
          err?.response?.data?.message || 'Gagal mengirim pesan ke nomor ini';
        setBroadcastCompleted(i + 1);
        setBroadcastLogs((prev) => [
          {
            id: `${currentGuest.id}-${Date.now()}`,
            name: currentGuest.name,
            phone: currentGuest.phone,
            status: 'error',
            error: errMsg,
            time: timeStr,
          },
          ...prev,
        ]);
      }

      // Wait anti-ban delay before next guest
      if (i < queue.length - 1 && !broadcastAbortRef.current) {
        const randomSec =
          Math.floor(Math.random() * (preset.maxSec - preset.minSec + 1)) +
          preset.minSec;
        for (let rem = randomSec; rem > 0; rem--) {
          if (broadcastAbortRef.current) break;
          setBroadcastStatusText(
            `Jeda aman anti-blokir ${rem} detik sebelum mengirim ke ${queue[i + 1].name}...`
          );
          const ok = await sleepWithPauseAndAbort(1000);
          if (!ok) break;
        }
      }
    }

    setIsBroadcasting(false);
    setIsBroadcastPaused(false);

    if (broadcastAbortRef.current) {
      setBroadcastStatusText(
        `Broadcast dihentikan. Berhasil terkirim ke ${successCount} dari ${queue.length} tamu.`
      );
      showToast(`Broadcast dihentikan (${successCount} terkirim).`);
    } else {
      setBroadcastStatusText(
        `🎉 Selesai! Berhasil mengirim broadcast ke ${successCount} dari ${queue.length} tamu.`
      );
      showToast(`🎉 Broadcast selesai! ${successCount} undangan berhasil terkirim.`);
    }
  };

  const handleTogglePauseBroadcast = () => {
    const nextPaused = !isBroadcastPaused;
    broadcastPauseRef.current = nextPaused;
    setIsBroadcastPaused(nextPaused);
  };

  const handleStopBroadcast = () => {
    broadcastAbortRef.current = true;
    broadcastPauseRef.current = false;
    setIsBroadcastPaused(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xs overflow-hidden">
        {/* Top Header & Excel Import/Export Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600 shrink-0" />
              <span>Manajemen Daftar Tamu &amp; Sebar WhatsApp ({guests.length} Tamu)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Setiap nama tamu otomatis mendapatkan link personal (<code>?to=Nama+Tamu</code>) di sampul undangan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold">
              ✓ {sentCount} Terkirim
            </span>

            {/* Hidden File Input for Direct Excel Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleExcelFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => setShowBroadcastPanel(!showBroadcastPanel)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                showBroadcastPanel
                  ? 'bg-zinc-900 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Broadcast Massal Otomatis</span>
            </button>

            <button
              type="button"
              onClick={() => setShowTemplateEditor(!showTemplateEditor)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                showTemplateEditor
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Kata Pengantar WA</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
              title="Unduh contoh format Excel (.xlsx)"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Template Excel</span>
            </button>

            <button
              type="button"
              onClick={() => setShowExcelModal(!showExcelModal)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Import dari Excel</span>
            </button>

            {guests.length > 0 && (
              <button
                type="button"
                onClick={handleExportGuestsExcel}
                className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl inline-flex items-center justify-center transition-all cursor-pointer"
                title="Export Daftar Tamu ke Excel (.xlsx)"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Info Banner: Cara Kerja Broadcast WA & Nama Tamu Personal */}
        <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-xs text-slate-700">
          <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed flex-1">
            <p className="font-bold text-slate-900">
              2 Cara Mudah Mengirim Undangan WhatsApp:
            </p>
            <p>
              1. <strong>Kirim Massal Otomatis (Ratusan Tamu):</strong> Klik tombol{' '}
              <button
                type="button"
                onClick={() => setShowBroadcastPanel(true)}
                className="font-bold text-emerald-700 underline cursor-pointer"
              >
                Broadcast Massal Otomatis
              </button>{' '}
              untuk mengirim ke seluruh daftar tamu secara otomatis dengan jeda aman anti-blokir.
              <br />
              2. <strong>Kirim Satuan &amp; Kustomisasi Pesan:</strong> Klik tombol hijau <strong>Kirim WA</strong> pada baris tamu atau atur kalimat undangan di{' '}
              <button
                type="button"
                onClick={() => setShowTemplateEditor(true)}
                className="font-bold text-purple-700 underline cursor-pointer"
              >
                Edit Kata Pengantar WA
              </button>
              .
            </p>
          </div>
        </div>

        {/* Auto-Broadcast Massal Panel */}
        {showBroadcastPanel && (
          <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                  <span>Auto-Blast &amp; Antrean Pintar</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Broadcast Undangan WhatsApp ke Ratusan Tamu
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kirim undangan personal (lengkap dengan nama &amp; link khusus tiap tamu) tanpa perlu klik tabel satu per satu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBroadcastPanel(false)}
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 inline-flex items-center justify-center shrink-0 cursor-pointer border border-emerald-200"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-white/80 p-1.5 rounded-2xl border border-emerald-200/80">
              <button
                type="button"
                onClick={() => setBroadcastMode('auto_blast')}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                  broadcastMode === 'auto_blast'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'hover:bg-emerald-50/70 text-slate-700'
                }`}
              >
                <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${broadcastMode === 'auto_blast' ? 'text-amber-300 fill-amber-300' : 'text-emerald-600'}`} />
                <div>
                  <p className="text-xs font-bold">Mode 1: Auto-Blast 1x Klik (Otomatis di Background)</p>
                  <p className={`text-[11px] mt-0.5 ${broadcastMode === 'auto_blast' ? 'text-emerald-50' : 'text-slate-500'}`}>
                    Sekali klik, sistem mengirim ke ratusan nomor WA secara berurutan dengan jeda aman anti-banned.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBroadcastMode('rapid_queue');
                  setRapidQueueIndex(0);
                }}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                  broadcastMode === 'rapid_queue'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'hover:bg-emerald-50/70 text-slate-700'
                }`}
              >
                <SkipForward className={`w-4 h-4 shrink-0 mt-0.5 ${broadcastMode === 'rapid_queue' ? 'text-amber-300' : 'text-emerald-600'}`} />
                <div>
                  <p className="text-xs font-bold">Mode 2: Antrean Cepat 1-Tombol (Tanpa Gateway)</p>
                  <p className={`text-[11px] mt-0.5 ${broadcastMode === 'rapid_queue' ? 'text-emerald-50' : 'text-slate-500'}`}>
                    Langsung lompat dari Tamu #1 ke Tamu berikutnya dengan 1 tombol besar tanpa cari baris di tabel.
                  </p>
                </div>
              </button>
            </div>

            {/* Filter Target Tamu & Jeda */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white border border-emerald-200/80 rounded-2xl p-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Target Status Tamu
                </label>
                <select
                  value={broadcastTargetFilter}
                  onChange={(e) => {
                    setBroadcastTargetFilter(e.target.value);
                    setRapidQueueIndex(0);
                  }}
                  disabled={isBroadcasting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="unsent">Hanya yang Belum Terkirim (Direkomendasikan)</option>
                  <option value="all">Semua Tamu (Termasuk Kirim Ulang)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Filter Kategori Tamu
                </label>
                <select
                  value={broadcastCategoryFilter}
                  onChange={(e) => {
                    setBroadcastCategoryFilter(e.target.value);
                    setRapidQueueIndex(0);
                  }}
                  disabled={isBroadcasting}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="all">Semua Kategori</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {broadcastMode === 'auto_blast' ? (
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Jeda Aman Anti-Blokir WA
                  </label>
                  <select
                    value={delayPresetId}
                    onChange={(e) => setDelayPresetId(e.target.value)}
                    disabled={isBroadcasting}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  >
                    {DELAY_PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex flex-col justify-center bg-emerald-50/70 rounded-xl px-3 py-2 border border-emerald-200/60">
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Total Antrean</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {broadcastCandidates.length} Tamu Siap Dikirim
                  </span>
                </div>
              )}
            </div>

            {broadcastMode === 'auto_blast' ? (
              <div className="space-y-3">
                {/* WA Gateway Connection Bar */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        gatewayToken.trim() ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <div>
                      <span className="font-bold text-slate-800">
                        Status Mesin Pengirim:{' '}
                        {gatewayToken.trim()
                          ? `Terhubung ke ${gatewayProvider.toUpperCase()} Gateway`
                          : 'Mode Simulasi / Server Internal Aktif'}
                      </span>
                      <span className="text-slate-500 block text-[11px]">
                        {gatewayToken.trim()
                          ? 'Pesan dikirim langsung via API WhatsApp Gateway ke nomor tujuan.'
                          : 'Berjalan otomatis & menandai status terkirim. Klik "Atur WA Gateway" jika ingin menghubungkan Token Fonnte/Wablas.'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGatewayConfig(!showGatewayConfig)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    <span>{showGatewayConfig ? 'Tutup Pengaturan' : 'Atur WA Gateway (Fonnte/Wablas)'}</span>
                  </button>
                </div>

                {/* Collapsible Gateway Configuration */}
                {showGatewayConfig && (
                  <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Provider WhatsApp Gateway
                        </label>
                        <select
                          value={gatewayProvider}
                          onChange={(e) => setGatewayProvider(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <option value="fonnte">Fonnte (Rekomendasi Indonesia)</option>
                          <option value="wablas">Wablas</option>
                          <option value="custom">Custom Webhook / WAHA</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Token API Device (Dari Fonnte / Wablas)
                        </label>
                        <input
                          type="password"
                          value={gatewayToken}
                          onChange={(e) => setGatewayToken(e.target.value)}
                          placeholder="Masukkan Token API..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Endpoint URL (Opsional)
                        </label>
                        <input
                          type="text"
                          value={gatewayUrl}
                          onChange={(e) => setGatewayUrl(e.target.value)}
                          placeholder="Default otomatis sesuai provider"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <p className="text-[11px] text-slate-500">
                        Cara pakai Fonnte: Daftar di <code>fonnte.com</code> &rarr; Scan QR WA Anda &rarr; Salin Token Device ke kolom di atas.
                      </p>
                      <button
                        type="button"
                        onClick={handleSaveGatewayConfig}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer shrink-0"
                      >
                        Simpan Koneksi
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Action & Progress Area */}
                <div className="bg-white border border-emerald-200 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Siap Broadcast ke{' '}
                        <span className="text-emerald-700 text-sm font-extrabold">
                          {broadcastGuestsWithPhone.length} Tamu
                        </span>{' '}
                        yang Memiliki Nomor WA
                      </p>
                      {broadcastCandidates.length > broadcastGuestsWithPhone.length && (
                        <p className="text-[11px] text-amber-700 mt-0.5">
                          * Ada {broadcastCandidates.length - broadcastGuestsWithPhone.length} tamu yang belum diisi nomor WA-nya (gunakan Mode Antrean Cepat untuk memilih kontak di HP).
                        </p>
                      )}
                    </div>

                    {!isBroadcasting ? (
                      <button
                        type="button"
                        onClick={handleStartAutoBroadcast}
                        disabled={broadcastGuestsWithPhone.length === 0}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>
                          Mulai Broadcast Sekarang ({broadcastGuestsWithPhone.length} Tamu)
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleTogglePauseBroadcast}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {isBroadcastPaused ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Lanjutkan</span>
                            </>
                          ) : (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-white" />
                              <span>Jeda</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleStopBroadcast}
                          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>Hentikan</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar & Status */}
                  {(isBroadcasting || broadcastCompleted > 0 || broadcastStatusText) && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">
                          {broadcastStatusText}
                        </span>
                        {broadcastTotal > 0 && (
                          <span className="font-bold text-emerald-700">
                            {Math.round((broadcastCompleted / broadcastTotal) * 100)}% ({broadcastCompleted}/{broadcastTotal})
                          </span>
                        )}
                      </div>

                      {broadcastTotal > 0 && (
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.round((broadcastCompleted / broadcastTotal) * 100))}%`,
                            }}
                          />
                        </div>
                      )}

                      {/* Live Delivery Logs */}
                      {broadcastLogs.length > 0 && (
                        <div className="max-h-36 overflow-y-auto bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 space-y-1.5 mt-2">
                          {broadcastLogs.map((log) => (
                            <div
                              key={log.id}
                              className="flex items-center justify-between text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-slate-100"
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                {log.status === 'success' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                ) : (
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                )}
                                <span className="font-bold text-slate-800 truncate">
                                  {log.name}
                                </span>
                                <span className="text-slate-400 font-mono">
                                  ({log.phone})
                                </span>
                              </div>
                              <span
                                className={`text-[10px] font-semibold shrink-0 ${
                                  log.status === 'success' ? 'text-emerald-700' : 'text-rose-600'
                                }`}
                              >
                                {log.status === 'success'
                                  ? `✓ Terkirim • ${log.time}`
                                  : `${log.error} • ${log.time}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Mode 2: Rapid Queue 1-Button Card */
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 sm:p-5">
                {activeRapidGuest ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Antrean Tamu #{Math.min(rapidQueueIndex + 1, broadcastCandidates.length)} dari {broadcastCandidates.length}
                      </span>
                      <h5 className="text-base font-extrabold text-slate-900">
                        {activeRapidGuest.name}
                      </h5>
                      <p className="text-xs text-slate-500 font-mono">
                        Nomor WA: {activeRapidGuest.phone || 'Pilih dari Kontak WA HP'} • Kategori: {activeRapidGuest.category}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={getWaLink(activeRapidGuest, invitation, waTemplate)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          if (!activeRapidGuest.status_sent) {
                            handleToggleSent(activeRapidGuest);
                          }
                          if (broadcastTargetFilter !== 'unsent') {
                            setRapidQueueIndex((prev) =>
                              prev + 1 < broadcastCandidates.length ? prev + 1 : 0
                            );
                          }
                        }}
                        className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim WA &amp; Otomatis Lanjut Tamu Berikutnya</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          setRapidQueueIndex((prev) =>
                            prev + 1 < broadcastCandidates.length ? prev + 1 : 0
                          )
                        }
                        className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <SkipForward className="w-3.5 h-3.5" />
                        <span>Lewati</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-500">
                    🎉 Semua tamu pada filter ini sudah terkirim! Ubah filter ke &ldquo;Semua Tamu&rdquo; jika ingin mengirim ulang.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* WhatsApp Message Template Editor Panel */}
        {showTemplateEditor && (
          <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Kustomisasi Kata Pengantar Undangan WhatsApp</span>
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sesuaikan kalimat undangan sesuai keinginan Anda. Variabel bertanda kurung kurawal akan otomatis berubah mengikuti nama masing-masing tamu.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateEditor(false)}
                className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 inline-flex items-center justify-center shrink-0 cursor-pointer border border-purple-200"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Variable Insertion Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-500 mr-1">
                Sisipkan Variabel Otomatis:
              </span>
              {[
                { tag: '{nama_tamu}', label: '+ Nama yang Diundang' },
                { tag: '{nama_mempelai}', label: '+ Nama Mempelai' },
                { tag: '{link_undangan}', label: '+ Link Undangan' },
                { tag: '{tanggal_acara}', label: '+ Tanggal Acara' },
                { tag: '{lokasi_acara}', label: '+ Lokasi Acara' },
              ].map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => handleInsertTag(item.tag)}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  {item.label} <code className="text-[10px] text-purple-500">{item.tag}</code>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Editable Textarea */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                  Format Teks Pesan (Bisa Diedit)
                </label>
                <textarea
                  ref={templateTextareaRef}
                  rows={14}
                  value={waTemplate}
                  onChange={(e) => setWaTemplate(e.target.value)}
                  className="w-full bg-white border border-purple-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-purple-500 font-sans"
                  placeholder="Tulis kata pengantar WhatsApp di sini..."
                />
              </div>

              {/* Right: Live WhatsApp Bubble Preview */}
              <div className="space-y-1.5 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                  Pratinjau Hasil di WhatsApp ({sampleGuestForPreview.name})
                </span>
                <div className="flex-1 bg-[#E5DDD5] border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="bg-[#DCF8C6] text-slate-900 rounded-xl rounded-tr-none p-3.5 shadow-xs text-xs whitespace-pre-wrap break-words leading-relaxed">
                    {liveMessagePreview}
                  </div>
                  <p className="text-[10px] text-slate-600 mt-2 text-right italic">
                    * Opsi otomatis mengikuti nama tiap tamu pada daftar di bawah
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-200/60">
              <button
                type="button"
                onClick={handleResetWaTemplate}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Kata-Kata Default</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowTemplateEditor(false)}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={handleSaveWaTemplate}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Kata Pengantar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Excel Import & Preview Panel */}
        {showExcelModal && (
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Import Daftar Tamu dari File Excel (.xlsx / .xls / .csv)</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Unduh template Excel, isi kolom <strong>Nama Tamu</strong>, <strong>Nomor WhatsApp</strong>, dan <strong>Kategori</strong>, lalu unggah ke sini. Nomor WA yang kehilangan angka <code>0</code> di depan pada Excel akan otomatis diperbaiki.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExcelModal(false)}
                className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 inline-flex items-center justify-center shrink-0 cursor-pointer border border-emerald-200"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1 & Step 2 Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Langkah 1
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    Belum punya format Excel-nya?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Unduh contoh file Excel yang sudah siap diisi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Template</span>
                </button>
              </div>

              <div className="bg-white border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Langkah 2
                  </span>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {excelFileName ? `File: ${excelFileName}` : 'Pilih File Excel Anda'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Mendukung file .xlsx, .xls, atau .csv
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih File Excel</span>
                </button>
              </div>
            </div>

            {/* Preview Parsed Excel Rows */}
            {excelPreviewRows.length > 0 && (
              <div className="bg-white border border-emerald-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Pratinjau Data Excel ({excelPreviewRows.length} Tamu Siap Di-import)
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Anda dapat mengecek atau mengedit nama dan nomor WA di bawah ini sebelum disimpan.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setExcelPreviewRows([]);
                        setExcelFileName('');
                      }}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmExcelImport}
                      disabled={bulkAddGuests.isPending}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {bulkAddGuests.isPending
                          ? 'Menyimpan...'
                          : `Import ${excelPreviewRows.length} Tamu Sekarang`}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                        <th className="py-2 px-2 w-8">#</th>
                        <th className="py-2 px-2">Nama Tamu</th>
                        <th className="py-2 px-2">Nomor WhatsApp</th>
                        <th className="py-2 px-2">Kategori</th>
                        <th className="py-2 px-2 text-right w-10">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {excelPreviewRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-2 text-slate-400 font-mono">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.name}
                              onChange={(e) =>
                                handleUpdatePreviewRow(idx, 'name', e.target.value)
                              }
                              className="w-full min-w-[140px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.phone}
                              onChange={(e) =>
                                handleUpdatePreviewRow(idx, 'phone', e.target.value)
                              }
                              placeholder="0812..."
                              className="w-full min-w-[110px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-700"
                            />
                          </td>
                          <td className="py-2 px-2">
                            <input
                              type="text"
                              value={row.category}
                              onChange={(e) =>
                                handleUpdatePreviewRow(idx, 'category', e.target.value)
                              }
                              className="w-full min-w-[110px] bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700"
                            />
                          </td>
                          <td className="py-2 px-2 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemovePreviewRow(idx)}
                              title="Hapus baris ini"
                              className="w-7 h-7 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg inline-flex items-center justify-center cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Single Add Form */}
        <form
          onSubmit={handleAdd}
          className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Nama Tamu (Tampil di Sampul)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Misal: Bpk. H. Ahmad & Keluarga"
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Nomor WhatsApp (Opsional)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="081234567890"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Kategori Tamu
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={addGuest.isPending}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tamu</span>
          </button>
        </form>

        {/* Search & Filter Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau nomor WA..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="all">Semua Kategori ({guests.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <p className="text-sm text-slate-400 py-6 text-center">Memuat daftar tamu...</p>
        )}

        {!isLoading && (
          <>
            {/* Mobile View: Ergonomic Cards for Sending via HP */}
            <div className="sm:hidden space-y-3">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="bg-slate-50/90 border border-slate-200 rounded-2xl p-3.5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{guest.name}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 bg-white border border-slate-200 text-purple-700 rounded-full text-[10px] font-semibold">
                          {guest.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {guest.phone || 'Pilih Kontak di WA'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleSent(guest)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0 cursor-pointer ${
                        guest.status_sent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {guest.status_sent ? '✓ Terkirim' : '⏳ Belum'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/70">
                    <a
                      href={getWaLink(guest, invitation, waTemplate)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        if (!guest.status_sent) handleToggleSent(guest);
                      }}
                      className="flex-1 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl inline-flex items-center justify-center gap-1.5 text-xs font-bold shadow-2xs transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{guest.phone ? 'Kirim WA Langsung' : 'Pilih Kontak WA'}</span>
                    </a>

                    <a
                      href={`/${invitation.slug}?to=${encodeURIComponent(guest.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 bg-zinc-900 text-white rounded-xl inline-flex items-center justify-center"
                      title="Lihat Sampul Tamu"
                    >
                      <Eye className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyWaText(guest)}
                      className="w-9 h-9 bg-white border border-slate-200 text-slate-700 rounded-xl inline-flex items-center justify-center"
                      title="Salin Pesan WA"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(guest)}
                      className="w-9 h-9 bg-purple-50 border border-purple-200 text-purple-700 rounded-xl inline-flex items-center justify-center"
                      title="Salin Link"
                    >
                      {copiedId === guest.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(guest)}
                      className="w-9 h-9 bg-rose-50 text-rose-600 rounded-xl inline-flex items-center justify-center"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredGuests.length === 0 && (
                <div className="py-10 text-center text-xs text-slate-400">
                  Belum ada tamu ditambahkan atau cocok dengan filter.
                </div>
              )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Nama Tamu</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Nomor WhatsApp</th>
                    <th className="py-3 px-3 text-center">Status Sebar</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-slate-800">{guest.name}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-purple-700 rounded-full text-[10px] font-semibold">
                          {guest.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 font-mono">
                        {guest.phone || 'Pilih Kontak di WA'}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleToggleSent(guest)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                            guest.status_sent
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {guest.status_sent ? '✓ Terkirim' : '⏳ Belum'}
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <a
                            href={getWaLink(guest, invitation, waTemplate)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                              if (!guest.status_sent) handleToggleSent(guest);
                            }}
                            className="px-2.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold transition-all"
                            title="Kirim Undangan via WhatsApp (Otomatis buka WA HP / WA Web)"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Kirim WA</span>
                          </a>
                          <a
                            href={`/${invitation.slug}?to=${encodeURIComponent(guest.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg inline-flex items-center justify-center transition-all"
                            title={`Lihat Tampilan Sampul untuk "${guest.name}"`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopyWaText(guest)}
                            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg inline-flex items-center justify-center cursor-pointer"
                            title="Salin Teks Pesan WA Lengkap"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyLink(guest)}
                            className="w-8 h-8 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg inline-flex items-center justify-center cursor-pointer"
                            title="Salin Link Personal Tamu"
                          >
                            {copiedId === guest.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(guest)}
                            className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer"
                            title="Hapus Tamu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredGuests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400">
                        Belum ada tamu ditambahkan atau cocok dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
