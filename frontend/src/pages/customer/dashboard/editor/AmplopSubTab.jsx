import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAddBankAccount, useDeleteBankAccount } from '../../../../hooks/useAdminChildResources';

export default function AmplopSubTab({ invitation, showToast }) {
  const addBankAccount = useAddBankAccount(invitation.id);
  const deleteBankAccount = useDeleteBankAccount(invitation.id);

  const [form, setForm] = useState({ type: 'bank', bank_name: '', account_number: '', account_holder: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.bank_name || !form.account_number || !form.account_holder) return;
    await addBankAccount.mutateAsync(form);
    setForm({ type: 'bank', bank_name: '', account_number: '', account_holder: '' });
    showToast('Rekening berhasil ditambahkan!');
  };

  const handleDelete = (id) => {
    if (confirm('Hapus rekening ini?')) {
      deleteBankAccount.mutate(id);
      showToast('Rekening dihapus.');
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <label className="font-semibold text-slate-600 block">Rekening Amplop &amp; Digital Gift</label>

      <div className="space-y-3">
        {invitation.bank_accounts?.map((bank) => (
          <div key={bank.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <span className="font-semibold text-slate-800">{bank.bank_name}</span>
            <span className="text-slate-600 font-mono">{bank.account_number}</span>
            <span className="text-slate-600">{bank.account_holder}</span>
            <button
              onClick={() => handleDelete(bank.id)}
              className="justify-self-end p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {(!invitation.bank_accounts || invitation.bank_accounts.length === 0) && (
          <p className="text-slate-400 text-center py-4">Belum ada rekening ditambahkan.</p>
        )}
      </div>

      <form onSubmit={handleAdd} className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          >
            <option value="bank">Bank</option>
            <option value="ewallet">E-Wallet</option>
          </select>
          <input
            type="text"
            value={form.bank_name}
            onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
            placeholder="Nama Bank / E-Wallet"
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
          <input
            type="text"
            value={form.account_number}
            onChange={(e) => setForm({ ...form, account_number: e.target.value })}
            placeholder="Nomor Rekening"
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
          <input
            type="text"
            value={form.account_holder}
            onChange={(e) => setForm({ ...form, account_holder: e.target.value })}
            placeholder="Atas Nama"
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <button
          type="submit"
          disabled={addBankAccount.isPending}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Rekening</span>
        </button>
      </form>
    </div>
  );
}
