import { useState } from 'react';
import {
  Plus,
  Edit3,
  Users,
  Eye,
  Copy,
  Check,
  Calendar,
  ImageOff,
  ExternalLink,
  MessageSquare,
  Trash2,
} from 'lucide-react';
import {
  useDeleteInvitation,
  useQuickUpdateInvitation,
} from '../../../hooks/useAdminInvitations';

export default function InvitationsTab({
  invitations,
  onCreateNew,
  onManage,
  showToast,
}) {
  const deleteInvitation = useDeleteInvitation();
  const quickUpdate = useQuickUpdateInvitation();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (inv) => {
    const url = `${window.location.origin}/${inv.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(inv.id);
    showToast('Link undangan berhasil disalin!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTogglePublish = async (inv) => {
    const next = !inv.is_published;
    await quickUpdate.mutateAsync({ id: inv.id, is_published: next });
    showToast(
      next
        ? `Undangan "${inv.groom_name} & ${inv.bride_name}" berhasil DITAYANGKAN!`
        : `Undangan "${inv.groom_name} & ${inv.bride_name}" diubah ke DRAFT.`
    );
  };

  const handleDelete = (inv) => {
    if (
      confirm(
        `Hapus undangan "${inv.slug}"? Tindakan ini tidak bisa dibatalkan.`
      )
    ) {
      deleteInvitation.mutate(inv.id);
      showToast('Undangan dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Daftar Undangan Digital ({invitations.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik tombol status Tayang/Draft pada kartu untuk mempublikasikan undangan dalam 1 klik.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm shadow-purple-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Undangan Baru</span>
        </button>
      </div>

      {invitations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-sm mb-4">
            Kamu belum memiliki undangan.
          </p>
          <button
            onClick={onCreateNew}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Undangan Pertama Anda</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {inv.cover_photo_url ? (
                    <img
                      src={inv.cover_photo_url}
                      alt={inv.slug}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageOff className="w-8 h-8 text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-semibold">
                      {inv.template?.name ?? 'Monochrome Line-Art'}
                    </span>
                  </div>

                  {/* 1-Click Publish Toggle Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(inv)}
                      disabled={quickUpdate.isPending}
                      className={`px-3 py-1 backdrop-blur-md rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        inv.is_published
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                      title="Klik untuk mengubah status Tayang / Draft"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>
                        {inv.is_published ? 'TAYANG (Aktif)' : 'DRAFT (Klik Tayang)'}
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {inv.akad_date}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-900/70 px-2 py-0.5 rounded-md text-[11px]">
                      <Eye className="w-3 h-3" />
                      {inv.views_count ?? 0}x
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {inv.groom_name} &amp; {inv.bride_name}
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="truncate text-slate-500 max-w-[190px] font-mono">
                      /{inv.slug}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyLink(inv)}
                        className="text-purple-600 hover:text-purple-700 p-1.5 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        title="Salin Link"
                      >
                        {copiedId === inv.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={`/${inv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-600 hover:text-purple-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Buka Link Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  onClick={() => onManage(inv.id, 'editor')}
                  className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  title="Edit Konten & Foto"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onManage(inv.id, 'guests')}
                  className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  title="Kelola Tamu & Sebar WA"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onManage(inv.id, 'rsvp')}
                  className="w-9 h-9 bg-white hover:bg-slate-100 text-purple-600 border border-slate-200 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  title="Buku Tamu & RSVP"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <a
                  href={`/dashboard/preview/${inv.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 bg-white hover:bg-slate-100 text-indigo-600 border border-slate-200 rounded-xl transition-all flex items-center justify-center"
                  title="Preview Undangan"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleDelete(inv)}
                  className="w-9 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  title="Hapus Undangan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
