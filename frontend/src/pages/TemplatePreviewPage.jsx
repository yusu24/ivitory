import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Smartphone, Printer } from 'lucide-react';
import { TEMPLATE_REGISTRY } from '../templates/registry';
import { getDummyInvitationForTemplate } from '../lib/sampleInvitation';
import { getPrintSuiteForTemplate } from '../templates/printSuiteRegistry';

export default function TemplatePreviewPage() {
  const { templateSlug } = useParams();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';
  const isPhoneSimulator = searchParams.get('phone') === '1';

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewMode, setPreviewMode] = useState(
    searchParams.get('mode') === 'print' ? 'print' : 'online'
  );
  const [customOverrides, setCustomOverrides] = useState({});
  const [customGuestName, setCustomGuestName] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'INVITORY_STUDIO_UPDATE') {
        const { overrides, guestName: nextGuest, isOpen: nextIsOpen } = event.data;
        if (overrides) setCustomOverrides(overrides);
        if (typeof nextGuest === 'string') setCustomGuestName(nextGuest);
        if (typeof nextIsOpen === 'boolean') setIsOpen(nextIsOpen);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const TemplateComponent = TEMPLATE_REGISTRY[templateSlug];
  const PrintSuiteComponent = getPrintSuiteForTemplate(templateSlug);
  const hasPrintSuite = Boolean(PrintSuiteComponent);

  if (!TemplateComponent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream text-center">
        <p className="text-sage-600">Template &ldquo;{templateSlug}&rdquo; tidak ditemukan.</p>
        <Link to="/" className="text-sm text-sage-800 underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const baseInvitationData = getDummyInvitationForTemplate(templateSlug);
  const sampleInvitationData = {
    ...baseInvitationData,
    ...customOverrides,
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (isPhoneSimulator && window.parent !== window) {
      window.parent.postMessage({ type: 'INVITORY_STUDIO_OPENED' }, '*');
    }
    if (!isEmbed && !isPhoneSimulator && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const hideFloatingChrome = isEmbed || isPhoneSimulator;

  return (
    <div
      className={
        isEmbed
          ? `embed-template-preview overflow-hidden select-none ${
              isOpen ? 'embed-hero-mode' : 'embed-cover-mode'
            }`
          : isPhoneSimulator
          ? 'phone-simulator-preview select-none'
          : ''
      }
    >
      {isEmbed && (
        <style>{`
          .embed-template-preview ::-webkit-scrollbar {
            display: none;
          }
          .embed-template-preview {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .embed-template-preview *,
          .embed-template-preview *::before,
          .embed-template-preview *::after {
            animation: none !important;
            transition: none !important;
          }
          /* Hide floating music buttons, bottom navbars, and fixed headers inside card thumbnails */
          .embed-hero-mode .fixed,
          .embed-hero-mode nav {
            display: none !important;
          }
        `}</style>
      )}

      {isPhoneSimulator && (
        <style>{`
          .phone-simulator-preview ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      )}

      {!hideFloatingChrome && (
        <>
          <div className="no-print fixed left-4 top-4 z-[60]">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full bg-white/95 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-md backdrop-blur transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali
            </Link>
          </div>

          {hasPrintSuite ? (
            <div className="no-print fixed right-4 top-4 z-[60] flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-zinc-900 shadow-xl">
              <button
                type="button"
                onClick={() => setPreviewMode('online')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewMode === 'online'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Undangan Online</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('print')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewMode === 'print'
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Versi Fisik (Cetak)</span>
              </button>
            </div>
          ) : (
            <div className="no-print fixed right-4 top-4 z-[60] rounded-full bg-black/75 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-md">
              Pratinjau &mdash; {sampleInvitationData.bride_nickname} &amp; {sampleInvitationData.groom_nickname}
            </div>
          )}
        </>
      )}

      {!hideFloatingChrome && hasPrintSuite && previewMode === 'print' && PrintSuiteComponent ? (
        <div className="min-h-screen bg-slate-100 pt-20 pb-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <PrintSuiteComponent invitation={sampleInvitationData} />
          </div>
        </div>
      ) : (
        <TemplateComponent
          invitation={
            hideFloatingChrome ? { ...sampleInvitationData, music_url: null } : sampleInvitationData
          }
          slug="preview"
          guestName={customGuestName || 'Bapak/Ibu Tamu Kehormatan'}
          isOpen={isOpen}
          isPlaying={hideFloatingChrome ? false : isPlaying}
          disableMusic={hideFloatingChrome}
          onOpen={handleOpen}
          onToggleMusic={toggleMusic}
          audioRef={audioRef}
        />
      )}
    </div>
  );
}
