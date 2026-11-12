import { useRef, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Smartphone, Printer } from 'lucide-react';
import { useInvitation } from '../../hooks/useAdminInvitations';
import { TEMPLATE_REGISTRY, DEFAULT_TEMPLATE_KEY } from '../../templates/registry';
import PhysicalPrintSuite from '../../templates/monochrome-lineart/PhysicalPrintSuite';

export default function InvitationLivePreviewPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';

  const { data: invitation, isLoading, isError } = useInvitation(id);
  const [isOpen, setIsOpen] = useState(isEmbed);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewMode, setPreviewMode] = useState(
    searchParams.get('mode') === 'print' ? 'print' : 'online'
  );
  const audioRef = useRef(null);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-white text-zinc-600 text-xs">Memuat pratinjau...</div>;
  }

  if (isError || !invitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-center">
        <p className="text-zinc-600">Undangan tidak ditemukan atau kamu tidak punya akses.</p>
        <Link to="/dashboard" className="text-sm text-zinc-900 underline">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
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

  const TemplateComponent =
    TEMPLATE_REGISTRY[invitation.template?.slug] ?? TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_KEY];

  return (
    <div>
      {!isEmbed && (
        <>
          <div className="no-print fixed left-4 top-4 z-[60]">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 rounded-full bg-white/95 border border-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-md backdrop-blur transition hover:bg-zinc-900 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke Editor
            </Link>
          </div>
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
        </>
      )}

      {!isEmbed && previewMode === 'print' ? (
        <div className="min-h-screen bg-slate-100 pt-20 pb-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <PhysicalPrintSuite invitation={invitation} />
          </div>
        </div>
      ) : (
        <TemplateComponent
          invitation={invitation}
          slug={invitation.slug}
          guestName="Bapak/Ibu Tamu Undangan"
          isOpen={isOpen}
          isPlaying={isPlaying}
          onOpen={handleOpen}
          onToggleMusic={toggleMusic}
          audioRef={audioRef}
        />
      )}
    </div>
  );
}
