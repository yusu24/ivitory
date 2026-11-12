import { useState } from 'react';
import { Trash2, Search, Download, MessageSquare } from 'lucide-react';
import { useAdminRsvpList, useDeleteRsvpEntry } from '../../../hooks/useAdminRsvp';

const ATTENDANCE_LABELS = {
  hadir: { label: 'Hadir', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  tidak_hadir: { label: 'Berhalangan', className: 'bg-rose-50 text-rose-700 border-rose-200' },
  ragu: { label: 'Ragu-ragu', className: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export default function RsvpTab({ invitationId, showToast }) {
  const { data, isLoading } = useAdminRsvpList(invitationId);
  const deleteRsvp = useDeleteRsvpEntry(invitationId);
  const entries = data?.data ?? [];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttendance, setFilterAttendance] = useState('all');

  const totalHadirPax = entries
    .filter((e) => e.attendance === 'hadir')
    .reduce((sum, e) => sum + (e.guest_count || 1), 0);
  const totalRagu = entries.filter((e) => e.attendance === 'ragu').length;
  const totalTidakHadir = entries.filter((e) => e.attendance === 'tidak_hadir').length;

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      (e.guest_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.message ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAtt =
      filterAttendance === 'all' || e.attendance === filterAttendance;
    return matchesSearch && matchesAtt;
  });

  const handleDelete = (entry) => {
    if (confirm(`Hapus ucapan dari "${entry.guest_name}"?`)) {
      deleteRsvp.mutate(entry.id);
      showToast('Ucapan dihapus.');
    }
  };

  const handleExportCsv = () => {
    if (entries.length === 0) return;
    const headers = ['Nama Tamu', 'Status Kehadiran', 'Jumlah Pax', 'Ucapan & Doa', 'Tanggal'];
    const rows = entries.map((e) => [
      `"${(e.guest_name || '').replace(/"/g, '""')}"`,
      e.attendance,
      e.guest_count || 1,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      e.created_at ? new Date(e.created_at).toLocaleDateString('id-ID') : '',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rekap-rsvp-undangan-${invitationId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast?.('Rekap RSVP berhasil diunduh (CSV)!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <span>Daftar Konfirmasi RSVP &amp; Ucapan Tamu ({entries.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Data kehadiran otomatis dari tamu yang mengisi buku tamu di link undangan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
              ✓ Hadir: {totalHadirPax} Orang
            </span>
            <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl">
              ? Ragu: {totalRagu}
            </span>
            <span className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
              ✕ Berhalangan: {totalTidakHadir}
            </span>
            {entries.length > 0 && (
              <button
                type="button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu atau isi doa..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="w-full sm:w-52">
            <select
              value={filterAttendance}
              onChange={(e) => setFilterAttendance(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="all">Semua Kehadiran ({entries.length})</option>
              <option value="hadir">Hadir ({totalHadirPax} Orang)</option>
              <option value="ragu">Ragu-ragu ({totalRagu})</option>
              <option value="tidak_hadir">Berhalangan ({totalTidakHadir})</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <p className="text-sm text-slate-400 py-6 text-center">Memuat data RSVP...</p>
        )}

        <div className="space-y-3">
          {filteredEntries.map((entry) => {
            const badge =
              ATTENDANCE_LABELS[entry.attendance] ?? ATTENDANCE_LABELS.hadir;
            return (
              <div
                key={entry.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">
                      {entry.guest_name}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badge.className}`}
                    >
                      {badge.label} ({entry.guest_count || 1} Orang)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">
                      {new Date(entry.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(entry)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Hapus Ucapan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {entry.message && (
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                )}
              </div>
            );
          })}
          {!isLoading && filteredEntries.length === 0 && (
            <p className="text-slate-400 text-center py-8 text-sm">
              Belum ada ucapan atau konfirmasi RSVP yang cocok.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
