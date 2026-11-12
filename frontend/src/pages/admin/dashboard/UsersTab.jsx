import { useState } from 'react';
import {
  Search,
  UserPlus,
  ShieldCheck,
  KeyRound,
  Trash2,
  X,
  Check,
  Users,
  Info,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import {
  useSuperAdminUsers,
  useUpdateUserRole,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from '../../../hooks/useUsers';

const ROLE_CONFIG = {
  superadmin: {
    label: 'Super Admin',
    badgeClass: 'bg-purple-100 text-purple-800 border border-purple-200',
  },
  admin: {
    label: 'Admin Dashboard',
    badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  },
  user: {
    label: 'Pengguna Undangan',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
  },
};

export default function UsersTab({ mode = 'customers', showToast }) {
  const isAdminsMode = mode === 'admins';
  const { user: currentUser } = useAuth();
  const { data: users = [], isLoading } = useSuperAdminUsers();
  const updateUserRole = useUpdateUserRole();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | null
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: isAdminsMode ? 'admin' : 'user',
  });

  // Strictly separate Admin accounts vs Customer (Pengguna Undangan) accounts
  const scopedUsers = users.filter((u) =>
    isAdminsMode
      ? u.role === 'superadmin' || u.role === 'admin'
      : u.role === 'user'
  );

  const filteredUsers = scopedUsers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  const openCreateModal = () => {
    setSelectedUser(null);
    setForm({
      name: '',
      email: '',
      password: '',
      role: isAdminsMode ? 'admin' : 'user',
    });
    setModalMode('create');
  };

  const openEditModal = (u) => {
    setSelectedUser(u);
    setForm({
      name: u.name,
      email: u.email,
      password: '',
      role: isAdminsMode ? u.role : 'user',
    });
    setModalMode('edit');
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    const targetRole = isAdminsMode ? form.role : 'user';
    try {
      if (modalMode === 'create') {
        await createUser.mutateAsync({ ...form, role: targetRole });
        showToast(
          isAdminsMode
            ? `Akun ${ROLE_CONFIG[targetRole]?.label} "${form.name}" berhasil dibuat!`
            : `Akun Pengguna Undangan "${form.name}" berhasil dibuat!`
        );
      } else if (modalMode === 'edit' && selectedUser) {
        await updateUser.mutateAsync({
          id: selectedUser.id,
          name: form.name,
          email: form.email,
          role: targetRole,
          ...(form.password ? { password: form.password } : {}),
        });
        showToast(`Data akun "${form.name}" berhasil diperbarui!`);
      }
      setModalMode(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menyimpan akun.');
    }
  };

  const handleChangeAdminLevel = (u, newRole) => {
    if (newRole === u.role) return;
    updateUserRole.mutate(
      { id: u.id, role: newRole },
      {
        onSuccess: () =>
          showToast(
            `Level akses ${u.name} diubah menjadi ${ROLE_CONFIG[newRole]?.label || newRole}`
          ),
        onError: (err) =>
          showToast(err.response?.data?.message ?? 'Gagal mengubah level admin.'),
      }
    );
  };

  const handleDelete = (u) => {
    const label = isAdminsMode ? 'akun Admin' : 'akun Pengguna Undangan';
    if (confirm(`Hapus ${label} "${u.name}" (${u.email})?`)) {
      deleteUser.mutate(u.id, {
        onSuccess: () => showToast(`Akun ${u.name} berhasil dihapus.`),
        onError: (err) =>
          showToast(err.response?.data?.message ?? 'Gagal menghapus akun.'),
      });
    }
  };

  const superAdminCount = scopedUsers.filter((u) => u.role === 'superadmin').length;
  const staffAdminCount = scopedUsers.filter((u) => u.role === 'admin').length;

  return (
    <div className="space-y-6">
      {/* Contextual Banner - Luxury Gradient Card */}
      {isAdminsMode ? (
        <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-800 text-white shadow-lg shadow-purple-600/15 border border-white/15 flex items-start gap-4">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="font-bold text-sm sm:text-base text-white">
              Manajemen Tim Admin Dashboard ({scopedUsers.length} Akun Admin)
            </p>
            <p className="text-xs text-purple-100/90 leading-relaxed">
              Halaman ini <strong>khusus untuk mengelola akun internal Admin Dashboard</strong> (<code className="px-1.5 py-0.5 rounded bg-white/15 text-white font-mono text-[11px]">/admin</code>) dan terpisah dari daftar pelanggan undangan. Hanya <strong>Super Admin</strong> yang dapat membuat akun staf Admin baru.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-800 text-white shadow-lg shadow-blue-600/15 border border-white/15 flex items-start gap-4">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <Users className="w-5 h-5 text-cyan-200" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="font-bold text-sm sm:text-base text-white">
              Daftar Pengguna Undangan ({scopedUsers.length} Pelanggan)
            </p>
            <p className="text-xs text-cyan-100/90 leading-relaxed">
              Halaman ini <strong>khusus menampilkan pelanggan yang mendaftar untuk membuat undangan digital</strong> (<code className="px-1.5 py-0.5 rounded bg-white/15 text-white font-mono text-[11px]">/dashboard</code>). Akun di daftar ini tidak memiliki akses ke halaman Admin Dashboard.
            </p>
          </div>
        </div>
      )}

      {/* Top Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={
                isAdminsMode
                  ? 'Cari nama atau email staf admin...'
                  : 'Cari nama atau email pengguna undangan...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          {isAdminsMode && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                {superAdminCount} Super Admin
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                {staffAdminCount} Admin Dashboard
              </span>
            </div>
          )}
        </div>

        {currentUser?.role === 'superadmin' && (
          <button
            type="button"
            onClick={openCreateModal}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              isAdminsMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>
              {isAdminsMode
                ? 'Tambah Akun Admin Dashboard'
                : 'Tambah Akun Pengguna Undangan'}
            </span>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400">
          Memuat data akun...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center text-xs text-slate-400">
          {isAdminsMode
            ? 'Belum ada akun staf Admin yang sesuai pencarian.'
            : 'Belum ada akun Pengguna Undangan yang sesuai pencarian.'}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">
                    {isAdminsMode ? 'Nama & Email Admin' : 'Nama & Email Pelanggan'}
                  </th>
                  <th className="py-3.5 px-4">
                    {isAdminsMode ? 'Tingkatan Admin' : 'Status Akun'}
                  </th>
                  {isAdminsMode ? (
                    <th className="py-3.5 px-4">Ubah Tingkatan Admin</th>
                  ) : (
                    <>
                      <th className="py-3.5 px-4">Paket Terakhir</th>
                      <th className="py-3.5 px-4">Jumlah Undangan</th>
                    </>
                  )}
                  <th className="py-3.5 px-4">Tanggal Terdaftar</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const roleInfo = ROLE_CONFIG[u.role] || ROLE_CONFIG.user;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-xs border border-purple-200 shrink-0">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {u.id === currentUser?.id && (
                                <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">
                                  Anda
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${roleInfo.badgeClass}`}
                        >
                          {isAdminsMode && <ShieldCheck className="w-3 h-3" />}
                          <span>{roleInfo.label}</span>
                        </span>
                      </td>

                      {isAdminsMode ? (
                        <td className="py-3.5 px-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleChangeAdminLevel(u, e.target.value)}
                            disabled={
                              u.id === currentUser?.id ||
                              updateUserRole.isPending ||
                              currentUser?.role !== 'superadmin'
                            }
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
                          >
                            <option value="admin">Admin Dashboard (Staf)</option>
                            <option value="superadmin">Super Admin (Pemilik)</option>
                          </select>
                        </td>
                      ) : (
                        <>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {u.package ?? '—'}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-purple-600">
                            {u.invitations_count ?? 0} Undangan
                          </td>
                        </>
                      )}

                      <td className="py-3.5 px-4 text-slate-500">
                        {u.created_at
                          ? new Date(u.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {currentUser?.role === 'superadmin' ? (
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(u)}
                              className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-amber-600 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer"
                              title="Edit Profil / Reset Password"
                            >
                              <KeyRound className="w-4 h-4" />
                            </button>

                            {u.id !== currentUser?.id && (
                              <button
                                type="button"
                                onClick={() => handleDelete(u)}
                                className="w-8 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg inline-flex items-center justify-center transition-colors cursor-pointer"
                                title="Hapus Akun"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Create / Edit User (Strictly Scoped to Mode!) */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {modalMode === 'create'
                    ? isAdminsMode
                      ? 'Buat Akun Admin Dashboard Baru'
                      : 'Buat Akun Pengguna Undangan Baru'
                    : `Edit Akun: ${selectedUser?.name}`}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAdminsMode
                    ? 'Akun ini akan memiliki akses ke halaman Admin Dashboard (/admin).'
                    : 'Akun ini khusus untuk pelanggan mengelola undangannya di /dashboard.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              {isAdminsMode && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tingkatan Akses Admin
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    disabled={selectedUser?.id === currentUser?.id}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-none focus:border-purple-500"
                  >
                    <option value="admin">
                      Admin Dashboard (Staf Operasional Pesanan &amp; Template)
                    </option>
                    <option value="superadmin">
                      Super Admin (Pemilik Utama / Akses Penuh)
                    </option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={
                    isAdminsMode ? 'Contoh: Staf Admin Invitory' : 'Contoh: Budi & Siti'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={isAdminsMode ? 'admin@invitory.id' : 'pelanggan@email.com'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {modalMode === 'create'
                    ? 'Password Login'
                    : 'Password Baru (Kosongkan jika tidak ingin ganti)'}
                </label>
                <input
                  type="password"
                  required={modalMode === 'create'}
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={createUser.isPending || updateUser.isPending}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold inline-flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Akun</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
