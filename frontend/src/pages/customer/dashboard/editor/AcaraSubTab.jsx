import { useEffect, useState } from 'react';
import { Check, Heart, Calendar, Lock, Globe } from 'lucide-react';
import { useUpdateInvitation } from '../../../../hooks/useAdminInvitations';
import { DEFAULT_CUSTOM_TEXTS } from '../../../../templates/monochrome-lineart/utils/templateConfig';

export default function AcaraSubTab({ invitation, showToast }) {
  const updateInvitation = useUpdateInvitation(invitation.id);

  const [form, setForm] = useState(() => toForm(invitation));

  useEffect(() => {
    setForm(toForm(invitation));
  }, [invitation]);

  const handleSave = async () => {
    await updateInvitation.mutateAsync(form);
    showToast('Perubahan data mempelai & acara berhasil disimpan!');
  };

  const handleQuickTogglePublish = async () => {
    const next = !form.is_published;
    setForm((prev) => ({ ...prev, is_published: next }));
    await updateInvitation.mutateAsync({ ...form, is_published: next });
    showToast(
      next
        ? 'Undangan berhasil DITAYANGKAN (Publik)!'
        : 'Undangan diubah ke mode DRAFT.'
    );
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Top Bar: Slug, Locked Theme & Instant Publish Switch */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="font-semibold text-slate-600 block mb-1">
              Alamat Link Undangan (slug)
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-purple-500">
              <span className="text-slate-400 select-none">/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-40 sm:w-48 bg-transparent text-slate-900 font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Tema Aktif (Terkunci)</span>
            </label>
            <div className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold">
              {invitation.template?.name || 'Monochrome Line-Art (Nor & Yusuf)'}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>Status Tayang (1-Klik)</span>
            </label>
            <button
              type="button"
              onClick={handleQuickTogglePublish}
              disabled={updateInvitation.isPending}
              className={`px-3.5 py-2 rounded-xl font-semibold inline-flex items-center gap-2 border transition-all cursor-pointer ${
                form.is_published
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  form.is_published ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>
                {form.is_published ? 'Tayang Publik (Aktif)' : 'Draft (Klik Tayangkan)'}
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={updateInvitation.isPending}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>

      {/* Mempelai Pria & Wanita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="font-semibold text-purple-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-purple-500" />
            Mempelai Pria
          </h4>
          <Field label="Nama Lengkap">
            <input
              type="text"
              value={form.groom_name}
              onChange={(e) => setForm({ ...form, groom_name: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Nama Panggilan">
            <input
              type="text"
              value={form.groom_nickname}
              onChange={(e) => setForm({ ...form, groom_nickname: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Keterangan Orang Tua">
            <input
              type="text"
              value={form.groom_parents}
              onChange={(e) => setForm({ ...form, groom_parents: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="font-semibold text-pink-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500" />
            Mempelai Wanita
          </h4>
          <Field label="Nama Lengkap">
            <input
              type="text"
              value={form.bride_name}
              onChange={(e) => setForm({ ...form, bride_name: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Nama Panggilan">
            <input
              type="text"
              value={form.bride_nickname}
              onChange={(e) => setForm({ ...form, bride_nickname: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Keterangan Orang Tua">
            <input
              type="text"
              value={form.bride_parents}
              onChange={(e) => setForm({ ...form, bride_parents: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>
      </div>

      {/* Akad / Acara Utama */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="font-semibold text-indigo-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          Akad Nikah / Acara Utama
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Tanggal Akad">
            <input
              type="date"
              value={form.akad_date}
              onChange={(e) => setForm({ ...form, akad_date: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Waktu Akad">
            <input
              type="time"
              value={form.akad_time}
              onChange={(e) => setForm({ ...form, akad_time: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Nama Tempat / Gedung / Masjid">
            <input
              type="text"
              value={form.akad_location}
              onChange={(e) => setForm({ ...form, akad_location: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Alamat Lengkap">
            <input
              type="text"
              value={form.akad_address}
              onChange={(e) => setForm({ ...form, akad_address: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>
        <Field label="Link Google Maps Akad">
          <input
            type="text"
            value={form.akad_map_url}
            onChange={(e) => setForm({ ...form, akad_map_url: e.target.value })}
            placeholder="https://maps.google.com/?q=..."
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </Field>
      </div>

      {/* Resepsi */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="font-semibold text-emerald-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
          Resepsi Pernikahan (Opsional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Tanggal Resepsi">
            <input
              type="date"
              value={form.resepsi_date}
              onChange={(e) => setForm({ ...form, resepsi_date: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Waktu Resepsi">
            <input
              type="time"
              value={form.resepsi_time}
              onChange={(e) => setForm({ ...form, resepsi_time: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Nama Tempat Resepsi">
            <input
              type="text"
              value={form.resepsi_location}
              onChange={(e) => setForm({ ...form, resepsi_location: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
          <Field label="Alamat Lengkap Resepsi">
            <input
              type="text"
              value={form.resepsi_address}
              onChange={(e) => setForm({ ...form, resepsi_address: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </Field>
        </div>
        <Field label="Link Google Maps Resepsi">
          <input
            type="text"
            value={form.resepsi_map_url}
            onChange={(e) => setForm({ ...form, resepsi_map_url: e.target.value })}
            placeholder="https://maps.google.com/?q=..."
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </Field>
      </div>

      {/* Bottom Save Action Bar */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            className="rounded border-slate-300 text-purple-600 focus:ring-0"
          />
          <span className="font-semibold">
            Publikasikan undangan (agar link /{form.slug} bisa dibuka oleh tamu)
          </span>
        </label>

        <button
          onClick={handleSave}
          disabled={updateInvitation.isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Check className="w-4 h-4" />
          <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-slate-500 block mb-1 font-medium">{label}</label>
      {children}
    </div>
  );
}

function toForm(invitation) {
  return {
    template_id: invitation.template_id ?? invitation.template?.id ?? 1,
    slug: invitation.slug ?? '',
    groom_name: invitation.groom_name ?? '',
    groom_nickname: invitation.groom_nickname ?? '',
    groom_parents: invitation.groom_parents ?? '',
    bride_name: invitation.bride_name ?? '',
    bride_nickname: invitation.bride_nickname ?? '',
    bride_parents: invitation.bride_parents ?? '',
    opening_text: invitation.opening_text || DEFAULT_CUSTOM_TEXTS.opening_text,
    akad_date: invitation.akad_date ?? '',
    akad_time: invitation.akad_time?.slice(0, 5) ?? '',
    akad_location: invitation.akad_location ?? '',
    akad_address: invitation.akad_address ?? '',
    akad_map_url: invitation.akad_map_url ?? '',
    resepsi_date: invitation.resepsi_date ?? '',
    resepsi_time: invitation.resepsi_time?.slice(0, 5) ?? '',
    resepsi_location: invitation.resepsi_location ?? '',
    resepsi_address: invitation.resepsi_address ?? '',
    resepsi_map_url: invitation.resepsi_map_url ?? '',
    is_published: invitation.is_published ?? false,
  };
}
