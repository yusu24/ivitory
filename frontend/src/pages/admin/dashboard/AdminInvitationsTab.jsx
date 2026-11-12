import { useState } from 'react';
import {
  Search,
  Eye,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Heart,
  TrendingUp,
  Globe,
} from 'lucide-react';
import {
  useInvitationsList,
  useQuickUpdateInvitation,
  useDeleteInvitation,
} from '../../../hooks/useAdminInvitations';

export default function AdminInvitationsTab({ showToast }) {
  const { data: invitations = [], isLoading } = useInvitationsList();
  const quickUpdate = useQuickUpdateInvitation();
  const deleteInvitation = useDeleteInvitation();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const filteredInvitations = invitations.filter((inv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (inv.groom_name ?? '').toLowerCase().includes(q) ||
      (inv.bride_name ?? '').toLowerCase().includes(q) ||
      (inv.slug ?? '').toLowerCase().includes(q) ||
      (inv.owner?.name ?? '').toLowerCase().includes(q) ||
      (inv.owner?.email ?? '').toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && inv.is_published) ||
      (statusFilter === 'draft' && !inv.is_published);

    return matchesSearch && matchesStatus;
  });

  const handleTogglePublish = async (inv) => {
    const nextStatus = !inv.is_published;
    await quickUpdate.mutateAsync({
      id: inv.id,
      is_published: nextStatus,
    });
    showToast(
      nextStatus
        ? `Undangan "${inv.groom_name} & ${inv.bride_name}" berhasil DITAYANGKAN (Aktif)!`
        : `Undangan "${inv.groom_name} & ${inv.bride_name}" diubah ke mode DRAFT.`
    );
  };

  const handleCopyLink = (inv) => {
    const url = `${window.location.origin}/${inv.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(inv.id);
    showToast(`Link ${url} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (inv) => {
    if (
      confirm(
        `Hapus undangan "${inv.groom_name} & ${inv.bride_name}" (/${inv.slug})? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      deleteInvitation.mutate(inv.id);
      showToast('Undangan berhasil dihapus.');
    }
  };

  const publishedCount = invitations.filter((i) => i.is_published).length;
  const draftCount = invitations.length - publishedCount;
  const totalViews = invitations.reduce((sum, i) => sum + (i.views_count ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Top KPI Summary Cards - Luxury Gradient Glassmorphic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Undangan Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-800 text-white shadow-lg shadow-purple-600/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <Heart className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <Heart className="w-3 h-3 text-pink-300" />
              <span>Total Undangan</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {invitations.length} <span className="text-sm font-medium text-white/75">Undangan</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold">
                Koleksi Undangan Aktif
              </span>
            </div>
          </div>
        </div>

        {/* Tayang / Publik Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white shadow-lg shadow-emerald-600/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <CheckCircle2 className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-200" />
              <span>Tayang / Publik</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Globe className="w-5 h-5 text-emerald-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {publishedCount} <span className="text-sm font-medium text-white/75">Tayang</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 backdrop-blur-sm border border-emerald-300/30 text-emerald-100 text-[11px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                Dapat Diakses Publik Online
              </span>
            </div>
          </div>
        </div>

        {/* Masih Draft Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg shadow-amber-500/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <Clock className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <Clock className="w-3 h-3 text-amber-200" />
              <span>Masih Draft</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Clock className="w-5 h-5 text-amber-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {draftCount} <span className="text-sm font-medium text-white/75">Draft</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[11px] font-bold">
                Belum Dipublikasikan
              </span>
            </div>
          </div>
        </div>

        {/* Total Kunjungan Tamu Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-800 text-white shadow-lg shadow-blue-600/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <Eye className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <Eye className="w-3 h-3 text-cyan-200" />
              <span>Total Kunjungan Tamu</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 text-cyan-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {totalViews.toLocaleString('id-ID')}x <span className="text-sm font-medium text-white/75">Views</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold">
                Interaksi Tamu Undangan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter, Search & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama mempelai, slug link, atau email pemilik..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="all">Semua Status ({invitations.length})</option>
              <option value="published">Tayang ({publishedCount})</option>
              <option value="draft">Draft ({draftCount})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invitations Data Table / Cards */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400">
          Memuat daftar undangan pelanggan...
        </div>
      ) : filteredInvitations.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-16 text-center space-y-2">
          <p className="text-sm text-slate-500 font-medium">
            Tidak ada undangan pelanggan yang sesuai dengan pencarian.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Mempelai &amp; Link Undangan</th>
                  <th className="py-3.5 px-4">Tema Aktif</th>
                  <th className="py-3.5 px-4">Tanggal Acara</th>
                  <th className="py-3.5 px-4">Pemilik Akun (Pelanggan)</th>
                  <th className="py-3.5 px-4 text-center">Status Tayang (1-Klik)</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {inv.cover_photo_url ? (
                            <img
                              src={inv.cover_photo_url}
                              alt={inv.slug}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Sparkles className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {inv.groom_name} &amp; {inv.bride_name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-mono text-purple-600 font-semibold">
                              /{inv.slug}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyLink(inv)}
                              className="text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                              title="Salin Link"
                            >
                              {copiedId === inv.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <span className="text-[10px] text-slate-400">
                              • {inv.views_count ?? 0}x dilihat
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold">
                        {inv.template?.name || 'Monochrome Line-Art'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{inv.akad_date || '—'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[160px]">
                        {inv.akad_location || '—'}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-700">
                        {inv.owner?.name || 'Pelanggan'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {inv.owner?.email || ''}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(inv)}
                        disabled={quickUpdate.isPending}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                          inv.is_published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Klik untuk langsung mengubah status Tayang / Draft"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            inv.is_published ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        <span>{inv.is_published ? 'Tayang' : 'Draft'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <a
                          href={`/dashboard/preview/${inv.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg inline-flex items-center justify-center transition-colors"
                          title="Preview Undangan"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        <a
                          href={`/${inv.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-purple-600 rounded-lg inline-flex items-center justify-center transition-colors"
                          title="Buka Link Publik"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(inv)}
                          className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer"
                          title="Hapus Undangan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
