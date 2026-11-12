import { useState } from 'react';
import { XCircle, Sparkles } from 'lucide-react';
import { useCreateTemplate, useUpdateTemplate } from '../../../hooks/useTemplates';
import { TEMPLATE_REGISTRY } from '../../../templates/registry';

export default function TemplateFormModal({ template, onClose, showToast }) {
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const isEditing = Boolean(template);

  const availableEngines = Object.entries(TEMPLATE_REGISTRY).map(([slug, meta]) => ({
    slug,
    name: meta.name,
  }));

  const [form, setForm] = useState({
    name: template?.name ?? '',
    slug: template?.slug ?? 'monochrome-lineart',
    price: template?.price != null ? String(template.price) : '0',
    description: template?.description ?? '',
    is_active: template?.is_active ?? true,
    show_on_landing: template?.show_on_landing ?? true,
    thumbnail: null,
  });

  const isPending = createTemplate.isPending || updateTemplate.isPending;

  const handleEngineSelect = (slug) => {
    const found = availableEngines.find((e) => e.slug === slug);
    setForm((prev) => ({
      ...prev,
      slug,
      name: prev.name || found?.name || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug,
      price: Number(form.price) || 0,
      description: form.description || null,
      is_active: form.is_active,
      show_on_landing: form.show_on_landing,
      ...(form.thumbnail ? { thumbnail: form.thumbnail } : {}),
    };

    if (isEditing) {
      await updateTemplate.mutateAsync({ id: template.id, ...payload });
      showToast('Template berhasil diperbarui!');
    } else {
      await createTemplate.mutateAsync(payload);
      showToast('Template baru berhasil ditambahkan!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 cursor-pointer"
        >
          <XCircle className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {isEditing ? 'Edit Template Undangan' : 'Tambah Template Undangan Baru'}
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Pilih mesin desain (Engine Template) dari daftar yang tersedia atau ketik kode slug secara manual.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3.5">
            <label className="block text-[11px] font-bold text-purple-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilih Cepat Mesin Desain (Template Engine Terdaftar)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableEngines.map((eng) => (
                <button
                  key={eng.slug}
                  type="button"
                  onClick={() => handleEngineSelect(eng.slug)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    form.slug === eng.slug
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {eng.name} ({eng.slug})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Nama Tampilan Template
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="misal: Monochrome Line-Art (Nor & Yusuf)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Kode Template (slug)
              </label>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="misal: monochrome-lineart"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Harga (Rp)
              </label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Thumbnail Gambar (Opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, thumbnail: e.target.files?.[0] ?? null })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:px-3 file:py-1 file:text-xs cursor-pointer"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Desain editorial monokromatis klasik dengan animasi sinematik..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="rounded bg-slate-50 border-slate-300 text-purple-600 focus:ring-0"
              />
              <span>Aktif (Tersedia untuk dipilih)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.show_on_landing}
                onChange={(e) => setForm({ ...form, show_on_landing: e.target.checked })}
                className="rounded bg-slate-50 border-slate-300 text-purple-600 focus:ring-0"
              />
              <span>Tampilkan di Katalog Landing Page</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl text-xs cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-purple-600/20 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? 'Menyimpan...' : 'Simpan Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
