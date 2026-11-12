import { useState } from 'react';
import { Smartphone, ExternalLink, RefreshCw, Printer } from 'lucide-react';
import { useInvitation } from '../../../hooks/useAdminInvitations';
import AcaraSubTab from './editor/AcaraSubTab';
import KataKataSubTab from './editor/KataKataSubTab';
import GaleriSubTab from './editor/GaleriSubTab';
import StorySubTab from './editor/StorySubTab';
import AmplopSubTab from './editor/AmplopSubTab';
import VisibilitasSubTab from './editor/VisibilitasSubTab';

const SUB_TABS = [
  { id: 'acara', label: '💍 Acara & Mempelai' },
  { id: 'katakata', label: '✍️ Kata-Kata & Teks' },
  { id: 'galeri', label: '🖼️ Foto, Adjust & Musik' },
  { id: 'story', label: '📖 Story' },
  { id: 'amplop', label: '💳 Amplop Digital' },
  { id: 'visibilitas', label: '👁️ Visibilitas Seksi' },
];

export default function EditorTab({ invitationId, showToast, onOpenPrintTab }) {
  const { data: invitation, isLoading } = useInvitation(invitationId);
  const [subTab, setSubTab] = useState('acara');
  const [previewKey, setPreviewKey] = useState(0);

  if (isLoading) return <p className="text-sm text-slate-400 py-8 text-center">Memuat...</p>;
  if (!invitation) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 min-w-0 bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-6 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Edit Konten Undangan</h3>
            <p className="text-xs text-slate-500">
              Atur rincian mempelai, kata-kata fleksibel, adjust posisi foto, cerita cinta, dan amplop digital.
            </p>
          </div>
          <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 truncate max-w-full">
            Tema: {invitation.template?.name || 'Monochrome Line-Art (Nor & Yusuf)'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
          {SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`sm:flex-1 py-2 rounded-xl text-xs font-semibold transition-all truncate px-2.5 cursor-pointer ${
                subTab === t.id ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {subTab === 'acara' && (
          <AcaraSubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
        {subTab === 'katakata' && (
          <KataKataSubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
        {subTab === 'galeri' && (
          <GaleriSubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
        {subTab === 'story' && (
          <StorySubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
        {subTab === 'amplop' && (
          <AmplopSubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
        {subTab === 'visibilitas' && (
          <VisibilitasSubTab
            invitation={invitation}
            showToast={(msg) => {
              showToast(msg);
              setPreviewKey((k) => k + 1);
            }}
          />
        )}
      </div>

      {/* Live Real Template Preview Panel */}
      <div className="lg:col-span-4 min-w-0 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-3 shadow-sm sticky top-20">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-purple-500" />
            <span>Live Pratinjau Tema</span>
          </h3>
          <button
            type="button"
            onClick={() => setPreviewKey((k) => k + 1)}
            className="text-xs text-slate-500 hover:text-purple-600 inline-flex items-center gap-1 cursor-pointer"
            title="Muat Ulang Pratinjau"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-slate-800 shadow-lg bg-white h-[520px] relative">
          <iframe
            key={`${invitation.id}-${previewKey}-${invitation.updated_at || ''}`}
            src={`/dashboard/preview/${invitation.id}?embed=1`}
            title="Live Invitation Preview"
            className="w-full h-full border-0"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`/dashboard/preview/${invitation.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Pratinjau Penuh</span>
          </a>
          <a
            href={`/${invitation.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Link Live</span>
          </a>
        </div>

        {onOpenPrintTab && (
          <button
            type="button"
            onClick={onOpenPrintTab}
            className="w-full py-2.5 px-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-purple-300" />
            <span>Buka Desain Undangan Fisik (Siap Cetak)</span>
          </button>
        )}
      </div>
    </div>
  );
}
