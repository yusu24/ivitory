import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Check,
  RefreshCw,
  ExternalLink,
  Smartphone,
  BookOpen,
  Eye,
  UserCheck,
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '../../../templates/registry';
import {
  TEMPLATE_SHOWCASE_META,
  getDummyInvitationForTemplate,
} from '../../../lib/sampleInvitation';
import { useTemplatesList } from '../../../hooks/useTemplates';

const STUDIO_TEMPLATES = [
  {
    slug: 'floral-3d',
    name: 'Rosé Jardin 3D',
    badge: '3D Floral Interaktif',
    accent: '#f43f5e',
  },
  {
    slug: 'monochrome-lineart',
    name: 'Atelier Line-Art',
    badge: 'Minimalis Monokrom',
    accent: '#18181b',
  },
  {
    slug: 'boho-terracotta',
    name: 'Terra Botanica',
    badge: 'Boho & Hangat',
    accent: '#c26d53',
  },
  {
    slug: 'dewanakl-ulems',
    name: 'Lumina Glass',
    badge: 'Modern Interaktif',
    accent: '#6366f1',
  },
  {
    slug: 'elegant-brown',
    name: 'Royal Mocha',
    badge: 'Klasik & Mewah',
    accent: '#78553a',
  },
  {
    slug: 'classic',
    name: 'Ivory Garden',
    badge: 'Floral & Hijau Segar',
    accent: '#15803d',
  },
];

export default function LiveStudioPreview() {
  const { data: dbTemplates } = useTemplatesList();

  // Strictly reflect active marketing templates enabled by Super Admin
  const availableThemes = (() => {
    if (Array.isArray(dbTemplates) && dbTemplates.length > 0) {
      return dbTemplates
        .filter((t) => t.slug && TEMPLATE_REGISTRY[t.slug])
        .map((t) => {
          const preset = STUDIO_TEMPLATES.find((s) => s.slug === t.slug);
          const meta = TEMPLATE_SHOWCASE_META[t.slug];
          return {
            slug: t.slug,
            name: meta?.cleanName || preset?.name || t.name,
            badge: meta?.styleBadge || preset?.badge || 'Eksklusif',
            accent: preset?.accent || '#9333ea',
          };
        });
    }
    return STUDIO_TEMPLATES.slice(0, 6);
  })();

  const initialSlug = availableThemes[0]?.slug || 'floral-3d';
  const initialDummy = getDummyInvitationForTemplate(initialSlug);

  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [groomName, setGroomName] = useState(initialDummy.groom_name);
  const [brideName, setBrideName] = useState(initialDummy.bride_name);
  const [guestTarget, setGuestTarget] = useState('Bapak/Ibu Tamu Kehormatan');
  const [eventDate, setEventDate] = useState(initialDummy.akad_date || '2027-02-14');
  const [eventLocation, setEventLocation] = useState(
    initialDummy.akad_location || 'Glasshouse Floral Sanctuary, Bali'
  );
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  // Keep selectedSlug synchronized if Super Admin deactivates the initial default template
  useEffect(() => {
    if (
      availableThemes.length > 0 &&
      !availableThemes.some((theme) => theme.slug === selectedSlug)
    ) {
      const nextSlug = availableThemes[0].slug;
      const dummy = getDummyInvitationForTemplate(nextSlug);
      setSelectedSlug(nextSlug);
      setGroomName(dummy.groom_name);
      setBrideName(dummy.bride_name);
      setEventDate(dummy.akad_date || '2027-02-14');
      setEventLocation(dummy.akad_location || 'Grand Ballroom, Jakarta');
    }
  }, [availableThemes, selectedSlug]);

  const iframeRef = useRef(null);

  const syncToPhoneIframe = useCallback(
    (overrideOpenState = isCoverOpen) => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      const baseInvitation = getDummyInvitationForTemplate(selectedSlug);
      win.postMessage(
        {
          type: 'INVITORY_STUDIO_UPDATE',
          guestName: guestTarget,
          isOpen: overrideOpenState,
          overrides: {
            groom_name: groomName,
            groom_nickname:
              groomName.trim().split(' ')[0] || baseInvitation.groom_nickname,
            bride_name: brideName,
            bride_nickname:
              brideName.trim().split(' ')[0] || baseInvitation.bride_nickname,
            akad_date: eventDate,
            resepsi_date: eventDate,
            akad_location: eventLocation,
            resepsi_location: eventLocation,
          },
        },
        '*'
      );
    },
    [selectedSlug, groomName, brideName, guestTarget, eventDate, eventLocation, isCoverOpen]
  );

  // Sync changes whenever studio inputs change
  useEffect(() => {
    syncToPhoneIframe(isCoverOpen);
  }, [syncToPhoneIframe, isCoverOpen]);

  // Listen when the user clicks "Buka Undangan" directly inside the phone screen
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'INVITORY_STUDIO_OPENED') {
        setIsCoverOpen(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSelectTheme = (slug) => {
    const dummy = getDummyInvitationForTemplate(slug);
    setSelectedSlug(slug);
    setGroomName(dummy.groom_name);
    setBrideName(dummy.bride_name);
    setEventDate(dummy.akad_date || '2027-02-14');
    setEventLocation(dummy.akad_location || 'Grand Ballroom, Jakarta');
  };

  const handleReset = () => {
    handleSelectTheme(availableThemes[0]?.slug || 'floral-3d');
    setGuestTarget('Bapak/Ibu Tamu Kehormatan');
    setIsCoverOpen(false);
  };

  const activeThemeMeta =
    availableThemes.find((t) => t.slug === selectedSlug) || availableThemes[0];

  return (
    <section id="live-studio" className="py-20 sm:py-28 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-md border border-white/70 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Interactive Mobile Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Simulasi Langsung Semua Template di Layar HP
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Pilih langsung dari koleksi template asli kami, ubah nama pasangan, dan rasakan pengalaman membuka undangan di dalam model smartphone secara interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Real Template Selector & Live Customizer */}
          <div className="lg:col-span-5 bg-white/45 backdrop-blur-2xl border border-white/70 rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg font-sans-body">
                  Studio Kustomisasi Live
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih template asli &amp; lihat tampilannya di HP
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-purple-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* 1. Real Template Collection Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                1. Pilih Template Undangan ({availableThemes.length} Tema Tersedia)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {availableThemes.map((theme) => {
                  const isSelected = theme.slug === selectedSlug;
                  return (
                    <button
                      type="button"
                      key={theme.slug}
                      onClick={() => handleSelectTheme(theme.slug)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]'
                          : 'bg-white/70 text-slate-700 border-white/90 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white/50"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{theme.name}</div>
                          <div
                            className={`text-[10px] truncate ${
                              isSelected ? 'text-purple-200' : 'text-slate-400'
                            }`}
                          >
                            {theme.badge}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-purple-300 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Couple & Event Inputs */}
            <div className="space-y-3.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                2. Ubah Data Mempelai &amp; Tamu
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Nama Mempelai Pria
                  </span>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 bg-white/75 border border-white/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Nama Mempelai Wanita
                  </span>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 bg-white/75 border border-white/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                    Tanggal Acara
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/75 border border-white/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                    Nama Tamu (Kepada Yth.)
                  </label>
                  <div className="relative">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={guestTarget}
                      onChange={(e) => setGuestTarget(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-white/75 border border-white/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                  Lokasi Gedung / Venue
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/75 border border-white/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* 3. Interactive View Mode Controls */}
            <div className="pt-3 border-t border-slate-200/60 space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                3. Mode Layar Smartphone
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCoverOpen(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isCoverOpen
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Tampilan Sampul</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCoverOpen(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCoverOpen
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-white/70 text-slate-700 border-slate-200 hover:bg-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Isi Undangan (Buka)</span>
                </button>
              </div>

              <a
                href={`/preview-template/${selectedSlug}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Eye className="w-4 h-4 text-purple-300" />
                <span>Buka Pratinjau Layar Penuh ({activeThemeMeta.name})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </a>
            </div>
          </div>

          {/* Right Panel: Real Smartphone Frame Rendering the Actual Selected Template in True Mobile Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Active Template Pill Indicator above Phone */}
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeThemeMeta.accent }}
              />
              <span>Template Aktif:</span>
              <strong className="text-slate-900 font-serif-title italic">
                {activeThemeMeta.name}
              </strong>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                {isCoverOpen ? 'Mode Terbuka (Scrollable)' : 'Mode Sampul'}
              </span>
            </div>

            {/* Smartphone Hardware Bezel */}
            <div className="relative w-full max-w-[395px] h-[720px] bg-slate-900 rounded-[54px] p-3 shadow-2xl shadow-purple-950/25 border-4 border-slate-800 ring-1 ring-white/20">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center pointer-events-none shadow-md">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-slate-700 ml-3" />
              </div>

              {/* True Mobile Viewport Iframe synced via postMessage */}
              <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-white">
                <iframe
                  ref={iframeRef}
                  key={selectedSlug}
                  src={`/preview-template/${selectedSlug}?phone=1`}
                  title={`Simulasi HP ${activeThemeMeta.name}`}
                  onLoad={() => syncToPhoneIframe(isCoverOpen)}
                  className="w-full h-full border-0 block bg-white"
                />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-500 text-center">
              Tip: Klik tombol <strong>&ldquo;Buka Undangan&rdquo;</strong> di dalam layar HP atau gulir (<em>scroll</em>) isi undangan secara langsung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
