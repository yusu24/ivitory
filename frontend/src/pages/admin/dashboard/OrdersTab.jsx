import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Edit3,
  ExternalLink,
  DollarSign,
  Clock,
  ShoppingBag,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useSuperAdminOrders, useUpdateOrderStatus } from '../../../hooks/useOrders';
import { STATUS_LABELS } from './statusLabels';

export default function OrdersTab({ showToast, onOpenStudio }) {
  const { data: orders = [], isLoading } = useSuperAdminOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((ord) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      String(ord.id).includes(q) ||
      (ord.user?.name ?? '').toLowerCase().includes(q) ||
      (ord.user?.email ?? '').toLowerCase().includes(q) ||
      (ord.invitation
        ? `${ord.invitation.groom_name} ${ord.invitation.bride_name}`
        : ''
      )
        .toLowerCase()
        .includes(q);
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (order, status) => {
    updateOrderStatus.mutate(
      { id: order.id, status },
      {
        onSuccess: () =>
          showToast(
            status === 'paid'
              ? `Pesanan #${order.id} diverifikasi LUNAS & undangan diaktifkan!`
              : `Status pesanan #${order.id} diubah ke ${STATUS_LABELS[status]?.label ?? status}`
          ),
      }
    );
  };

  const paidCount = orders.filter((o) => o.status === 'paid').length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const expiredCount = orders.filter((o) => o.status === 'expired').length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.status === 'paid' ? o.amount : 0),
    0
  );

  const STATUS_FILTERS = [
    { value: 'all', label: `Semua (${orders.length})` },
    { value: 'pending', label: `Pending (${pendingCount})` },
    { value: 'paid', label: `Lunas / Aktif (${paidCount})` },
    { value: 'expired', label: `Expired (${expiredCount})` },
  ];

  return (
    <div className="space-y-6">
      {/* Top KPI Summary - Premium Gradient Glassmorphic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Omset Lunas Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white shadow-lg shadow-emerald-600/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <DollarSign className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <TrendingUp className="w-3 h-3 text-emerald-200" />
              <span>Total Omset Lunas</span>
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
                <CheckCircle2 className="w-3 h-3 text-emerald-200" />
                {paidCount} Transaksi Lunas Selesai
              </span>
            </div>
          </div>
        </div>

        {/* Menunggu Verifikasi Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg shadow-amber-500/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <Clock className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <Clock className="w-3 h-3 text-amber-200" />
              <span>Menunggu Verifikasi</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Clock className="w-5 h-5 text-amber-200" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {pendingCount} <span className="text-sm font-medium text-white/75">Pesanan</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 text-white text-[11px] font-bold inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                Perlu Ditinjau &amp; Dikonfirmasi
              </span>
            </div>
          </div>
        </div>

        {/* Total Transaksi Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-800 text-white shadow-lg shadow-purple-600/20 border border-white/15">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
          <div className="absolute right-3 top-3 text-white/10 group-hover:text-white/20 transition-all pointer-events-none">
            <ShoppingBag className="w-16 h-16 -mr-2 -mt-2" />
          </div>

          <div className="relative z-10 flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white/95 shadow-xs">
              <ShoppingBag className="w-3 h-3 text-pink-300" />
              <span>Total Transaksi</span>
            </span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-black text-white tracking-tight drop-shadow-xs">
              {orders.length} <span className="text-sm font-medium text-white/75">Transaksi</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-semibold">
                {expiredCount} Kedaluwarsa
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 backdrop-blur-sm border border-emerald-300/30 text-emerald-100 text-[11px] font-semibold">
                {paidCount} Berhasil
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari ID, Nama Mempelai, Pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="w-full sm:w-52">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            {STATUS_FILTERS.map((st) => (
              <option key={st.value} value={st.value}>
                Status: {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400">
          Memuat daftar pesanan...
        </div>
      )}

      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-sm">Tidak ada pesanan yang cocok.</p>
        </div>
      )}

      {!isLoading && filteredOrders.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">ID &amp; Mempelai</th>
                  <th className="py-3.5 px-4">Pelanggan</th>
                  <th className="py-3.5 px-4">Template &amp; Paket</th>
                  <th className="py-3.5 px-4">Nominal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => {
                  const badge = STATUS_LABELS[ord.status] ?? STATUS_LABELS.pending;
                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800 text-sm">
                          {ord.invitation
                            ? `${ord.invitation.groom_name} & ${ord.invitation.bride_name}`
                            : `Pesanan #${ord.id}`}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          #{ord.id} •{' '}
                          {new Date(ord.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700 font-semibold">{ord.user?.name}</div>
                        <div className="text-[10px] text-slate-400">{ord.user?.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700 font-medium">
                          {ord.template?.name ?? '—'}
                        </div>
                        <div className="text-[10px] text-purple-600 font-semibold">
                          Paket: {ord.package?.name ?? '—'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 text-sm">
                        Rp {ord.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${badge.className}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {ord.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(ord, 'paid')}
                              disabled={updateOrderStatus.isPending}
                              className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg inline-flex items-center justify-center shadow-xs transition-all cursor-pointer"
                              title="Verifikasi Lunas"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}

                          {ord.invitation?.id && onOpenStudio && (
                            <button
                              type="button"
                              onClick={() => onOpenStudio(ord.invitation.id)}
                              className="w-8 h-8 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg inline-flex items-center justify-center cursor-pointer"
                              title="Edit Undangan Pelanggan"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}

                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord, e.target.value)}
                            disabled={updateOrderStatus.isPending}
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1.5 font-semibold focus:outline-none disabled:opacity-50 cursor-pointer"
                            title="Ubah Status Pesanan"
                          >
                            <option value="paid">Lunas</option>
                            <option value="pending">Pending</option>
                            <option value="expired">Expired</option>
                            <option value="failed">Batal</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
