import { useState } from 'react';
import {
  Plus,
  Eye,
  Edit3,
  Trash2,
  Sparkles,
  Globe,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  useSuperAdminTemplates,
  useDeleteTemplate,
  useUpdateTemplate,
} from '../../../hooks/useTemplates';
import TemplateFormModal from './TemplateFormModal';

export default function TemplatesTab({ showToast }) {
  const { data: templates = [], isLoading } = useSuperAdminTemplates();
  const deleteTemplate = useDeleteTemplate();
  const updateTemplate = useUpdateTemplate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const openCreate = () => {
    setEditingTemplate(null);
    setIsModalOpen(true);
  };

  const openEdit = (tpl) => {
    setEditingTemplate(tpl);
    setIsModalOpen(true);
  };

  const handleDelete = (tpl) => {
    if (confirm(`Hapus template "${tpl.name}"?`)) {
      deleteTemplate.mutate(tpl.id);
      showToast('Template dihapus.');
    }
  };

  const handleToggleActive = async (tpl) => {
    await updateTemplate.mutateAsync({
      id: tpl.id,
      name: tpl.name,
      slug: tpl.slug,
      price: tpl.price ?? 0,
      description: tpl.description ?? '',
      is_active: !tpl.is_active,
      show_on_landing: tpl.show_on_landing,
    });
    showToast(
      `Template "${tpl.name}" ${!tpl.is_active ? 'diaktifkan' : 'dinonaktifkan'}.`
    );
  };

  const handleToggleLanding = async (tpl) => {
    await updateTemplate.mutateAsync({
      id: tpl.id,
      name: tpl.name,
      slug: tpl.slug,
      price: tpl.price ?? 0,
      description: tpl.description ?? '',
      is_active: tpl.is_active,
      show_on_landing: !tpl.show_on_landing,
    });
    showToast(
      `Template "${tpl.name}" ${
        tpl.show_on_landing ? 'disembunyikan dari' : 'ditampilkan di'
      } Landing Page.`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Katalog Template Undangan ({templates.length} Total)</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {templates.filter((t) => t.is_active && t.show_on_landing).length} Aktif di Pemasaran
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atur template yang ingin diaktifkan untuk katalog pemasaran di Landing Page. Menonaktifkan template di sini <strong>tidak memengaruhi</strong> pelanggan yang sudah menggunakan template tersebut.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Template Baru</span>
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-400 py-8 text-center">Memuat katalog template...</p>
      )}

      {!isLoading && templates.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 text-sm">Belum ada template terdaftar.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden group hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="h-64 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                <div
                  className="absolute top-0 left-0 pointer-events-none overflow-hidden origin-top-left"
                  style={{
                    width: '153.85%',
                    height: '153.85%',
                    transform: 'scale(0.65)',
                  }}
                >
                  <iframe
                    src={`/preview-template/${tpl.slug}?embed=1`}
                    loading="lazy"
                    className="w-full h-full block border-0 pointer-events-none select-none bg-white"
                    title={tpl.name}
                    tabIndex={-1}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-black/65 backdrop-blur-md text-white text-[10px] font-mono font-semibold rounded-full border border-white/20">
                    {tpl.slug}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold font-serif-title italic text-white drop-shadow-xs">
                    {tpl.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-300">
                    {tpl.price > 0 ? `Rp ${tpl.price.toLocaleString('id-ID')}` : 'Gratis / Termasuk Paket'}
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {tpl.description || 'Desain undangan digital eksklusif siap pakai.'}
                </p>

                {/* 1-Click Quick Status Toggles */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(tpl)}
                    disabled={updateTemplate.isPending}
                    className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      tpl.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {tpl.is_active ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{tpl.is_active ? 'Status: Aktif' : 'Nonaktif'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleLanding(tpl)}
                    disabled={updateTemplate.isPending}
                    className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      tpl.show_on_landing
                        ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{tpl.show_on_landing ? 'Tampil Landing' : 'Sembunyi'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <a
                href={`/preview-template/${tpl.slug}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-white hover:bg-slate-100 text-purple-600 rounded-xl flex items-center justify-center transition-colors border border-slate-200"
                title="Preview Template"
              >
                <Eye className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => openEdit(tpl)}
                className="w-9 h-9 bg-white hover:bg-slate-100 text-amber-500 rounded-xl flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
                title="Edit Template"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(tpl)}
                className="w-9 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center transition-colors border border-rose-200 cursor-pointer"
                title="Hapus Template"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TemplateFormModal
          template={editingTemplate}
          onClose={() => setIsModalOpen(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}
