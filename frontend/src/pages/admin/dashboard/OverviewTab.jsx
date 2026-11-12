import { useState } from 'react';
import {
  DollarSign,
  FileText,
  Sparkles,
  Users,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Plus,
  Edit3,
  Globe,
  CreditCard,
  Eye,
  Copy,
  Check,
  Heart,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useSuperAdminTemplates } from '../../../hooks/useTemplates';
import { useSuperAdminUsers } from '../../../hooks/useUsers';
import { useUpdateOrderStatus } from '../../../hooks/useOrders';
import {
  useInvitationsList,
  useQuickUpdateInvitation,
} from '../../../hooks/useAdminInvitations';
import { STATUS_LABELS } from './statusLabels';

export default function OverviewTab({
  orders,
  totalRevenue,
  activeOrdersCount,
  pendingOrdersCount,
  onNavigateTab,
  isSuperAdmin = false,
  showToast,
}) {
  const { data: templates } = useSuperAdminTemplates();
  const { data: users } = useSuperAdminUsers();
  const { data: invitations = [] } = useInvitationsList();
  const updateOrderStatus = useUpdateOrderStatus();
  const quickUpdateInvitation = useQuickUpdateInvitation();

  const [copiedId, setCopiedId] = useState(null);

  const recentOrders = orders.slice(0, 5);
  const recentInvitations = invitations.slice(0, 5);
  const publishedInvCount = invitations.filter((i) => i.is_published).length;
  const totalViews = invitations.reduce((sum, i) => sum + (i.views_count ?? 0), 0);

  const handleTogglePublish = async (inv) => {
    const next = !inv.is_published;
    await quickUpdateInvitation.mutateAsync({ id: inv.id, is_published: next });
    showToast?.(
      next
        ? `Undangan "${inv.groom_name} & ${inv.bride_name}" sekarang TAYANG!`
        : `Undangan "${inv.groom_name} & ${inv.bride_name}" diubah ke DRAFT.`
    );
  };

  const handleCopyLink = (inv) => {
    const url = `${window.location.origin}/${inv.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(inv.id);
    showToast?.(`Link ${url} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Admin Control Center */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-purple-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-wider uppercase text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isSuperAdmin
                ? 'Panel Kendali Super Admin'
                : 'Panel Operasional Admin Dashboard'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Pusat Manajemen Sistem, Pesanan, Template &amp; Akun
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
            Pantau seluruh transaksi pesanan, aktifkan tayangan undangan pelanggan, kelola katalog tema, serta atur akun Admin Dashboard dan Pengguna Undangan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-purple-600" />
            <span>Verifikasi Pesanan ({pendingOrdersCount})</span>
          </button>

          {isSuperAdmin && (
            <button
              type="button"
              onClick={() => onNavigateTab('admins')}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Kelola Akun Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Section KPI Cards - Premium Invitation/Dashboard Aesthetic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Undangan Card */}
        <div
          onClick={() => onNavigateTab('invitations')}
          className="relative overflow-hidden rounded-3xl p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-800 text-white shadow-lg shadow-purple-600/20 border border-white/15"
        >
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
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 backdrop-blur-sm border border-emerald-300/30 text-emerald-100 text-[11px] font-semibold">
                {publishedInvCount} Tayang
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold">
                {totalViews.toLocaleString('id-ID')}x Dilihat
              </span>
            </div>
          </div>
        </div>

        {/* Omset Penjualan Card */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="relative overflow-hidden rounded-3xl p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white shadow-lg shadow-emerald-600/20 border border-white/15"
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <DollarSign className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <TrendingUp className="w-3 h-3 text-emerald-200" />
              <span>Omset Penjualan</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <DollarSign className="w-5 h-5 text-emerald-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-xs break-all">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-100 font-semibold">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-200" />
                {activeOrdersCount} transaksi lunas
              </span>
            </div>
          </div>
        </div>

        {/* Antrean Pesanan Card */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="relative overflow-hidden rounded-3xl p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg shadow-amber-500/20 border border-white/15"
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <FileText className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <FileText className="w-3 h-3 text-amber-200" />
              <span>Antrean Pesanan</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <ShoppingBag className="w-5 h-5 text-amber-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {orders.length} <span className="text-sm font-medium text-white/75">Pesanan</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[11px] font-bold inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                {pendingOrdersCount} Menunggu Verifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Pengguna & Tema Card */}
        <div
          onClick={() => onNavigateTab('customers')}
          className="relative overflow-hidden rounded-3xl p-5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-800 text-white shadow-lg shadow-blue-600/20 border border-white/15"
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <Users className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <Users className="w-3 h-3 text-cyan-200" />
              <span>Pengguna &amp; Tema</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {(users ?? []).filter((u) => u.role === 'user').length} <span className="text-sm font-medium text-white/75">Pelanggan</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold">
                {templates?.length ?? 0} Template Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Pantauan Undangan Pelanggan */}
      <div className="rounded-3xl shadow-md overflow-hidden border border-purple-100 bg-white">
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Daftar Undangan Pelanggan Terbaru</span>
            </h3>
            <p className="text-xs text-purple-100/90 mt-0.5">
              Pantau undangan yang dibuat oleh Pengguna Undangan dan kelola status Tayang / Draft
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('invitations')}
              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Lihat Semua ({invitations.length})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {recentInvitations.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
              <p className="text-xs text-slate-400">Belum ada undangan pelanggan yang dibuat.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Mempelai &amp; Link</th>
                    <th className="py-3 px-3">Pemilik Akun</th>
                    <th className="py-3 px-3">Tema</th>
                    <th className="py-3 px-3">Tanggal Akad</th>
                    <th className="py-3 px-3 text-center">Status Tayang (1-Klik)</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentInvitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-800 text-sm">
                          {inv.groom_name} &amp; {inv.bride_name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono text-purple-600 font-semibold">
                            /{inv.slug}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyLink(inv)}
                            className="text-slate-400 hover:text-purple-600 cursor-pointer"
                            title="Salin Link"
                          >
                            {copiedId === inv.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-[10px] text-slate-400">• {inv.views_count ?? 0} views</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-700">
                          {inv.owner?.name || 'Pelanggan'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {inv.owner?.email || '—'}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-[11px] font-semibold">
                          {inv.template?.name || 'Monochrome Line-Art'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 font-medium">{inv.akad_date}</td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(inv)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                            inv.is_published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                          title="Klik untuk ubah Tayang / Draft"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              inv.is_published ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span>{inv.is_published ? 'Tayang' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <a
                            href={`/dashboard/preview/${inv.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg inline-flex items-center justify-center"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <a
                            href={`/${inv.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-100 rounded-lg inline-flex items-center justify-center"
                            title="Buka Link Publik"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid: Recent Orders & Quick Admin Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl shadow-md overflow-hidden border border-emerald-100 bg-white">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-200" />
                <span>Transaksi &amp; Pesanan Terbaru</span>
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">Verifikasi pembayaran pelanggan dengan 1 klik</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <span>Semua Pesanan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">Belum ada transaksi pesanan masuk.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">ID &amp; Acara</th>
                      <th className="py-2.5 px-3">Pelanggan</th>
                      <th className="py-2.5 px-3">Nominal</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((ord) => {
                      const badge = STATUS_LABELS[ord.status] ?? STATUS_LABELS.pending;
                      return (
                        <tr key={ord.id} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-slate-800">
                              {ord.invitation
                                ? `${ord.invitation.groom_name} & ${ord.invitation.bride_name}`
                                : `Pesanan #${ord.id}`}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              #{ord.id} • {ord.template?.name ?? '—'}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-slate-700 font-medium">{ord.user?.name}</div>
                            <div className="text-[10px] text-slate-400">{ord.user?.email}</div>
                          </td>
                          <td className="py-3 px-3 font-bold text-emerald-600">
                            Rp {ord.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${badge.className}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {ord.status === 'pending' ? (
                              <button
                                onClick={() =>
                                  updateOrderStatus.mutate(
                                    { id: ord.id, status: 'paid' },
                                    {
                                      onSuccess: () =>
                                        showToast?.(`Pesanan #${ord.id} berhasil diverifikasi LUNAS!`),
                                    }
                                  )
                                }
                                disabled={updateOrderStatus.isPending}
                                className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer"
                                title="Verifikasi Lunas"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <span className="inline-flex items-center justify-center w-8 h-8 text-emerald-600" title="Selesai">
                                <Check className="w-4 h-4" />
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl shadow-md overflow-hidden border border-amber-100 bg-white flex flex-col">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Menu Pengaturan Cepat</span>
            </h3>
            <p className="text-xs text-amber-100/90 mt-0.5">Pintasan administrasi sistem</p>
          </div>

          <div className="p-6 flex flex-col flex-1 justify-between">
            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('templates')}
                className="w-full p-3 bg-purple-50/70 hover:bg-purple-100/80 text-slate-700 rounded-2xl font-semibold text-xs flex items-center justify-between transition-all border border-purple-100 hover:border-purple-200 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span>Kelola Katalog Template</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
              </button>

              {isSuperAdmin && (
                <>
                  <button
                    onClick={() => onNavigateTab('landing')}
                    className="w-full p-3 bg-emerald-50/70 hover:bg-emerald-100/80 text-slate-700 rounded-2xl font-semibold text-xs flex items-center justify-between transition-all border border-emerald-100 hover:border-emerald-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span>Atur Paket Harga &amp; Landing Page</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </button>

                  <button
                    onClick={() => onNavigateTab('admins')}
                    className="w-full p-3 bg-violet-50/70 hover:bg-violet-100/80 text-slate-700 rounded-2xl font-semibold text-xs flex items-center justify-between transition-all border border-violet-100 hover:border-violet-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                      <span>Kelola Akun Admin Dashboard</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 transition-colors" />
                  </button>
                </>
              )}
              <button
                onClick={() => onNavigateTab('customers')}
                className="w-full p-3 bg-blue-50/70 hover:bg-blue-100/80 text-slate-700 rounded-2xl font-semibold text-xs flex items-center justify-between transition-all border border-blue-100 hover:border-blue-200 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span>Daftar Pengguna Undangan</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>

            <div className="mt-6 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sistem &amp; Penyimpanan Aktif</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">
                Semua fitur upload foto, custom teks, dan buku tamu berjalan real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
