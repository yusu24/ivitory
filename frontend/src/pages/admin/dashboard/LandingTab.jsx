import { useEffect, useState } from 'react';
import {
  Save,
  Plus,
  Edit3,
  Trash2,
  Check,
  CheckCircle2,
  Star,
  Eye,
  EyeOff,
  MessageSquareQuote,
  LayoutTemplate,
  Phone,
  X,
} from 'lucide-react';
import { FAQ_DATA, TESTIMONIALS_DATA } from '../../../pages/landing/data';
import {
  useSuperAdminPackages,
  useCreatePackage,
  useUpdatePackage,
  useDeletePackage,
} from '../../../hooks/usePackages';
import {
  useLandingContent,
  useUpdateLandingContent,
} from '../../../hooks/useBrandSettings';
import FaqFormModal from './FaqFormModal';

export const DEFAULT_FOOTER_SETTINGS = {
  description:
    'Platform pembuatan undangan pernikahan, ulang tahun, dan syukuran digital berbasis web dengan estetika desain modern, interaktif, dan berkesan.',
  whatsappNumber: '6281234567890',
  whatsappLabel: 'Tanya CS WhatsApp',
  whatsappMessage: 'Halo kak, saya ingin tanya seputar pembuatan undangan digital',
  showFloatingWa: true,
  instagramUrl: 'https://instagram.com',
  copyrightText: '© 2026 Invitory Digital Studio. All rights reserved.',
  bottomTagline: 'Dibuat dengan penuh cinta untuk momen bahagia Anda',
};

export function getSavedTestimonials() {
  try {
    const saved = localStorage.getItem('invitory_testimonials_items');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return TESTIMONIALS_DATA.map((t) => ({ ...t, isVisible: true }));
}

export function getSavedFooterSettings() {
  try {
    const saved = localStorage.getItem('invitory_footer_settings');
    if (saved) {
      return { ...DEFAULT_FOOTER_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_FOOTER_SETTINGS;
}

const SUB_TABS = [
  { id: 'pricing', label: '1. Paket & Harga (Atur Batasan)' },
  { id: 'hero', label: '2. Hero Banner & Footer' },
  { id: 'testimonials', label: '3. Kontrol Komen / Testimoni' },
  { id: 'footer', label: '4. Setting Footer & CS WA' },
  { id: 'faq', label: '5. FAQ (Tanya Jawab)' },
];

export default function LandingTab({ showToast, initialSubTab = 'pricing' }) {
  const [subTab, setSubTab] = useState(initialSubTab);
  const { data: brandData } = useLandingContent();
  const updateLanding = useUpdateLandingContent();

  const [heroForm, setHeroForm] = useState({
    hero_eyebrow: 'Digital Invitation Platform #1 Indonesia',
    hero_title: 'Rayakan hari bahagiamu dengan undangan yang kekinian & intim',
    hero_subtitle:
      'Buat momen pernikahan & acara istimewa Anda tak terlupakan dengan undangan digital yang elegan, interaktif, dan siap disebar dalam 5 menit.',
    cta_primary_label: 'Mulai Buat Undangan',
    cta_secondary_label: 'Saya Sudah Punya Akun',
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState(getSavedTestimonials);
  const [editingTesti, setEditingTesti] = useState(null);
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);

  // Footer State
  const [footerForm, setFooterForm] = useState(getSavedFooterSettings);

  // FAQ State
  const [faqItems, setFaqItems] = useState(() => {
    try {
      const saved = localStorage.getItem('invitory_faq_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return FAQ_DATA.map((f, i) => ({ id: `faq-${i}`, ...f }));
  });
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);

  useEffect(() => {
    if (brandData) {
      setHeroForm({
        hero_eyebrow: brandData.hero_eyebrow ?? '',
        hero_title: brandData.hero_title ?? '',
        hero_subtitle: brandData.hero_subtitle ?? '',
        cta_primary_label: brandData.cta_primary_label ?? 'Mulai Buat Undangan',
        cta_secondary_label: brandData.cta_secondary_label ?? 'Saya Sudah Punya Akun',
      });
    }
  }, [brandData]);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    try {
      await updateLanding.mutateAsync(heroForm);
      showToast('Konten Hero Banner berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan konten Hero.');
    }
  };

  const persistTestimonials = (nextList) => {
    setTestimonials(nextList);
    try {
      localStorage.setItem('invitory_testimonials_items', JSON.stringify(nextList));
    } catch {
      // ignore
    }
  };

  const handleToggleTestiVisibility = (id) => {
    const next = testimonials.map((t) =>
      t.id === id ? { ...t, isVisible: t.isVisible === false ? true : false } : t
    );
    persistTestimonials(next);
    showToast('Status tampil komentar di Landing Page diperbarui!');
  };

  const handleDeleteTesti = (id) => {
    if (!confirm('Hapus komentar/testimoni ini dari Landing Page?')) return;
    const next = testimonials.filter((t) => t.id !== id);
    persistTestimonials(next);
    showToast('Testimoni dihapus.');
  };

  const handleSaveTesti = (e) => {
    e.preventDefault();
    if (!editingTesti) return;
    const exists = testimonials.some((t) => t.id === editingTesti.id);
    const next = exists
      ? testimonials.map((t) => (t.id === editingTesti.id ? editingTesti : t))
      : [{ ...editingTesti, id: `testi-${Date.now()}` }, ...testimonials];
    persistTestimonials(next);
    setIsTestiModalOpen(false);
    setEditingTesti(null);
    showToast(exists ? 'Testimoni berhasil diperbarui!' : 'Testimoni baru berhasil ditambahkan!');
  };

  const handleSaveFooter = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('invitory_footer_settings', JSON.stringify(footerForm));
      window.dispatchEvent(new Event('invitory:footer-updated'));
      showToast('Pengaturan Footer & Icon Mengambang CS WA berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan pengaturan Footer.');
    }
  };

  const handleSaveFaq = (faq) => {
    setFaqItems((prev) => {
      const exists = prev.some((f) => f.id === faq.id);
      const next = exists
        ? prev.map((f) => (f.id === faq.id ? faq : f))
        : [...prev, faq];
      try {
        localStorage.setItem('invitory_faq_items', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast(editingFaq ? 'FAQ berhasil diperbarui!' : 'FAQ baru berhasil ditambahkan!');
    setIsFaqModalOpen(false);
    setEditingFaq(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              subTab === t.id
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'pricing' && <PricingManager showToast={showToast} />}

      {subTab === 'hero' && (
        <form
          onSubmit={handleSaveHero}
          className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pengaturan Teks Header &amp; Banner Hero
              </h3>
              <p className="text-xs text-slate-500">
                Ubah ucapan selamat datang dan teks tombol utama di halaman depan.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tersambung ke Server</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Eyebrow Pill Label (Atas Judul)
              </label>
              <input
                type="text"
                required
                value={heroForm.hero_eyebrow}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, hero_eyebrow: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Judul Utama Hero
              </label>
              <input
                type="text"
                required
                value={heroForm.hero_title}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, hero_title: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Teks Tombol Utama (CTA 1)
              </label>
              <input
                type="text"
                required
                value={heroForm.cta_primary_label}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, cta_primary_label: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Teks Tombol Kedua (CTA 2)
              </label>
              <input
                type="text"
                required
                value={heroForm.cta_secondary_label}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, cta_secondary_label: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Deskripsi Subtitle Hero
              </label>
              <textarea
                rows={3}
                required
                value={heroForm.hero_subtitle}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, hero_subtitle: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={updateLanding.isPending}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm shadow-purple-600/20 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>
                {updateLanding.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
              </span>
            </button>
          </div>
        </form>
      )}

      {subTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-purple-600" />
                <span>Kontrol Komen &amp; Testimoni Landing Page ({testimonials.length})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Atur ulasan pelanggan yang ditampilkan di halaman depan. Anda bisa menyembunyikan, mengedit, atau menambah testimoni baru.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingTesti({
                  id: '',
                  coupleName: '',
                  eventType: 'Pernikahan di Jakarta',
                  avatar:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                  quote: '',
                  rating: 5,
                  date: 'Oktober 2026',
                  templateUsed: 'The Ethereal Garden',
                  isVisible: true,
                });
                setIsTestiModalOpen(true);
              }}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Komen / Testimoni</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((item) => {
              const isVisible = item.isVisible !== false;
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all shadow-xs ${
                    isVisible
                      ? 'border-slate-200'
                      : 'border-slate-200/60 bg-slate-50/70 opacity-65'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(Number(item.rating) || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleTestiVisibility(item.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer border ${
                          isVisible
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                        title="Klik untuk tampilkan/sembunyikan di Landing Page"
                      >
                        {isVisible ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Tampil</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Disembunyikan</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <img
                        src={
                          item.avatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
                        }
                        alt={item.coupleName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-xs truncate">
                          {item.coupleName}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.eventType} • {item.templateUsed}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTesti({ ...item });
                            setIsTestiModalOpen(true);
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-amber-600 rounded-lg text-xs cursor-pointer"
                          title="Edit Testimoni"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTesti(item.id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs cursor-pointer"
                          title="Hapus Testimoni"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(subTab === 'footer' || subTab === 'hero') && (
        <form
          onSubmit={handleSaveFooter}
          className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-purple-600" />
                <span>Pengaturan Footer &amp; Tombol Mengambang (Floating) CS WhatsApp</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Atur teks deskripsi bawah website, hak cipta (copyright), serta tombol mengambang Chat CS WhatsApp di pojok kanan bawah layar.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 cursor-pointer">
              <input
                type="checkbox"
                checked={footerForm.showFloatingWa !== false}
                onChange={(e) =>
                  setFooterForm({
                    ...footerForm,
                    showFloatingWa: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span>Tampilkan Icon Mengambang CS WA</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Deskripsi Brand di Footer
              </label>
              <textarea
                rows={3}
                required
                value={footerForm.description}
                onChange={(e) =>
                  setFooterForm({ ...footerForm, description: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nomor WhatsApp CS (Format 628xxx)
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="6281234567890"
                  value={footerForm.whatsappNumber}
                  onChange={(e) =>
                    setFooterForm({
                      ...footerForm,
                      whatsappNumber: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Label Tombol Mengambang (Floating) WhatsApp
              </label>
              <input
                type="text"
                required
                value={footerForm.whatsappLabel}
                onChange={(e) =>
                  setFooterForm({ ...footerForm, whatsappLabel: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Pesan Otomatis Saat Pengunjung Klik Icon Chat CS WA
              </label>
              <input
                type="text"
                required
                value={footerForm.whatsappMessage}
                onChange={(e) =>
                  setFooterForm({ ...footerForm, whatsappMessage: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Teks Copyright (Kiri Bawah Footer)
              </label>
              <input
                type="text"
                required
                value={footerForm.copyrightText}
                onChange={(e) =>
                  setFooterForm({ ...footerForm, copyrightText: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Tagline Penutup (Kanan Bawah Footer)
              </label>
              <input
                type="text"
                required
                value={footerForm.bottomTagline}
                onChange={(e) =>
                  setFooterForm({ ...footerForm, bottomTagline: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm shadow-purple-600/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Footer &amp; CS WA</span>
            </button>
          </div>
        </form>
      )}

      {subTab === 'faq' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              Daftar Tanya Jawab FAQ ({faqItems.length})
            </h3>
            <button
              onClick={() => {
                setEditingFaq(null);
                setIsFaqModalOpen(true);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start justify-between gap-4 shadow-xs"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-500">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setIsFaqModalOpen(true);
                    }}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-amber-600 rounded-lg text-xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const next = faqItems.filter((f) => f.id !== faq.id);
                      setFaqItems(next);
                      try {
                        localStorage.setItem('invitory_faq_items', JSON.stringify(next));
                      } catch {
                        // ignore
                      }
                      showToast('FAQ Dihapus');
                    }}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isFaqModalOpen && (
        <FaqFormModal
          faq={editingFaq}
          onSave={handleSaveFaq}
          onClose={() => {
            setIsFaqModalOpen(false);
            setEditingFaq(null);
          }}
        />
      )}

      {isTestiModalOpen && editingTesti && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <form
            onSubmit={handleSaveTesti}
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">
                {editingTesti.id ? 'Edit Komen / Testimoni' : 'Tambah Komen / Testimoni Baru'}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setIsTestiModalOpen(false);
                  setEditingTesti(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nama Pasangan / Klien
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bagas & Amanda"
                  value={editingTesti.coupleName}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, coupleName: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Jenis Acara &amp; Kota
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Pernikahan di Jakarta"
                  value={editingTesti.eventType}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, eventType: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Tema Template yang Dipakai
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: The Ethereal Garden"
                  value={editingTesti.templateUsed}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, templateUsed: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Rating Bintang (1 - 5)
                </label>
                <select
                  value={editingTesti.rating}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, rating: Number(e.target.value) })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                >
                  <option value={5}>5 Bintang (Sempurna)</option>
                  <option value={4}>4 Bintang</option>
                  <option value={3}>3 Bintang</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Isi Komentar / Testimoni
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tulis kesan pesan pelanggan..."
                  value={editingTesti.quote}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, quote: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  URL Foto Profil / Avatar (Opsional)
                </label>
                <input
                  type="url"
                  value={editingTesti.avatar}
                  onChange={(e) =>
                    setEditingTesti({ ...editingTesti, avatar: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsTestiModalOpen(false);
                  setEditingTesti(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Simpan Testimoni
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export function getSavedPackageConfigs() {
  try {
    const raw = localStorage.getItem('invitory_package_configs');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function inferPackageConfig(plan, savedConfigs = {}) {
  const key = plan?.id ? `id-${plan.id}` : `name-${plan?.name}`;
  const saved = savedConfigs[key] || savedConfigs[plan?.name] || {};
  const nameLower = (plan?.name || '').toLowerCase();
  const isGold = nameLower.includes('gold') || nameLower.includes('premium');
  const isPlatinum =
    nameLower.includes('platinum') ||
    nameLower.includes('exclusive') ||
    nameLower.includes('vip');
  const featsText = (plan?.features || []).join(' ').toLowerCase();

  return {
    originalPrice:
      saved.originalPrice !== undefined
        ? saved.originalPrice
        : isGold
          ? 149000
          : isPlatinum
            ? 249000
            : 0,
    badge:
      saved.badge !== undefined
        ? saved.badge
        : isGold
          ? 'Paling Diminati 🔥'
          : isPlatinum
            ? 'Fitur VIP'
            : '',
    isPopular:
      saved.isPopular !== undefined ? saved.isPopular : Boolean(isGold),
    ctaText:
      saved.ctaText ||
      (Number(plan?.price) === 0
        ? 'Coba Gratis Sekarang'
        : `Pilih ${plan?.name || 'Paket'}`),
    maxGuests:
      saved.maxGuests ||
      (featsText.includes('50')
        ? '50'
        : featsText.includes('100')
          ? '100'
          : isGold || isPlatinum || featsText.includes('tanpa batas') || featsText.includes('unlimited')
            ? 'unlimited'
            : '50'),
    maxGallery:
      saved.maxGallery ||
      (isPlatinum
        ? 'unlimited'
        : isGold || featsText.includes('10 foto') || featsText.includes('galeri')
          ? '10'
          : '4'),
    musicTier:
      saved.musicTier ||
      (isGold || isPlatinum || featsText.includes('bebas') || featsText.includes('kustom')
        ? 'custom'
        : 'basic'),
    allowMapsCalendar:
      saved.allowMapsCalendar !== undefined ? saved.allowMapsCalendar : true,
    allowRsvpWishes:
      saved.allowRsvpWishes !== undefined ? saved.allowRsvpWishes : true,
    allowDigitalEnvelope:
      saved.allowDigitalEnvelope !== undefined
        ? saved.allowDigitalEnvelope
        : Boolean(isGold || isPlatinum || featsText.includes('amplop')),
    allowWaBroadcast:
      saved.allowWaBroadcast !== undefined
        ? saved.allowWaBroadcast
        : Boolean(isGold || isPlatinum || featsText.includes('whatsapp')),
    allowExportRsvp:
      saved.allowExportRsvp !== undefined
        ? saved.allowExportRsvp
        : Boolean(isPlatinum || featsText.includes('export') || featsText.includes('excel')),
    allowPrintSuite:
      saved.allowPrintSuite !== undefined
        ? saved.allowPrintSuite
        : Boolean(isPlatinum || featsText.includes('cetak')),
    allowVipSupport:
      saved.allowVipSupport !== undefined
        ? saved.allowVipSupport
        : Boolean(isPlatinum || featsText.includes('vip')),
    customFeaturesText: saved.customFeaturesText || '',
  };
}

export function buildFeatureListFromConfig(durationDays, cfg) {
  const list = [];

  // 1. Masa aktif
  const days = Number(durationDays);
  if (!durationDays || days <= 0) {
    list.push('Masa Aktif Selamanya (Lifetime)');
  } else if (days === 365) {
    list.push('Masa aktif 1 Tahun (365 Hari)');
  } else if (days === 180) {
    list.push('Masa aktif 6 Bulan (180 Hari)');
  } else if (days === 90) {
    list.push('Masa aktif 3 Bulan (90 Hari)');
  } else if (days === 30) {
    list.push('Masa aktif 1 Bulan (30 Hari)');
  } else {
    list.push(`Masa aktif ${days} hari`);
  }

  // 2. Kuota Tamu
  if (cfg.maxGuests === 'unlimited') {
    list.push('Tamu TANPA BATAS (Unlimited Nama Tamu & RSVP)');
  } else {
    list.push(`Maksimal ${cfg.maxGuests} nama tamu undangan`);
  }

  // 3. Musik Latar
  if (cfg.musicTier === 'custom') {
    list.push('Kustom Musik Background Bebas');
  } else if (cfg.musicTier === 'basic') {
    list.push('1 Pilihan Lagu Musik Latar');
  }

  // 4. Galeri Foto
  if (cfg.maxGallery === 'unlimited') {
    list.push('Galeri Foto & Video Prewedding Tanpa Batas');
  } else if (Number(cfg.maxGallery) > 0) {
    list.push(`Galeri Foto (hingga ${cfg.maxGallery} foto)`);
  }

  // 5. Sakelar Fitur
  if (cfg.allowMapsCalendar) {
    list.push('Informasi Acara, Navigasi Google Maps & Kalender');
  }
  if (cfg.allowRsvpWishes) {
    list.push('Fitur Buku Tamu, Doa & Konfirmasi RSVP');
  }
  if (cfg.allowDigitalEnvelope) {
    list.push('Amplop Digital & Rekening / QRIS Transfer');
  }
  if (cfg.allowWaBroadcast) {
    list.push('Broadcast & Sebar Otomatis Format WhatsApp');
  }
  if (cfg.allowExportRsvp) {
    list.push('Export Data RSVP & Buku Tamu ke Excel / CSV');
  }
  if (cfg.allowPrintSuite) {
    list.push('Fitur Undangan Cetak Fisik (Siap Print A5 / PDF)');
  }
  if (cfg.allowVipSupport) {
    list.push('Prioritas Dukungan VIP CS WhatsApp');
  }

  // 6. Custom extra lines
  if (cfg.customFeaturesText) {
    cfg.customFeaturesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((line) => {
        if (!list.includes(line)) list.push(line);
      });
  }

  return list;
}

function PricingManager({ showToast }) {
  const { data: packages, isLoading } = useSuperAdminPackages();
  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();

  const [editingPlan, setEditingPlan] = useState(null);
  const [planConfig, setPlanConfig] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState(getSavedPackageConfigs);

  const openCreate = () => {
    setIsCreating(true);
    const initialPlan = {
      name: '',
      price: 79000,
      description: 'Fitur lengkap untuk pernikahan & acara istimewa Anda.',
      duration_days: 365,
      features: [],
    };
    setEditingPlan(initialPlan);
    setPlanConfig({
      originalPrice: 149000,
      badge: 'Paling Diminati 🔥',
      isPopular: false,
      ctaText: 'Pilih Paket Ini',
      maxGuests: 'unlimited',
      maxGallery: '10',
      musicTier: 'custom',
      allowMapsCalendar: true,
      allowRsvpWishes: true,
      allowDigitalEnvelope: true,
      allowWaBroadcast: true,
      allowExportRsvp: false,
      allowPrintSuite: false,
      allowVipSupport: false,
      customFeaturesText: '',
    });
  };

  const openEdit = (plan) => {
    setIsCreating(false);
    setEditingPlan({
      ...plan,
      duration_days: plan.duration_days ?? '',
      features: plan.features ?? [],
    });
    setPlanConfig(inferPackageConfig(plan, savedConfigs));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const generatedFeatures = buildFeatureListFromConfig(
      editingPlan.duration_days,
      planConfig
    );

    const payload = {
      name: editingPlan.name,
      price: Number(editingPlan.price) || 0,
      description: editingPlan.description || null,
      duration_days: editingPlan.duration_days
        ? Number(editingPlan.duration_days)
        : null,
      features: generatedFeatures,
      is_active: true,
    };

    let savedPkg;
    if (isCreating) {
      savedPkg = await createPackage.mutateAsync(payload);
    } else {
      savedPkg = await updatePackage.mutateAsync({
        id: editingPlan.id,
        ...payload,
      });
    }

    const pkgKey = savedPkg?.id
      ? `id-${savedPkg.id}`
      : editingPlan.id
        ? `id-${editingPlan.id}`
        : `name-${editingPlan.name}`;

    const nextConfigs = {
      ...savedConfigs,
      [pkgKey]: planConfig,
      [editingPlan.name]: planConfig,
    };
    setSavedConfigs(nextConfigs);
    try {
      localStorage.setItem(
        'invitory_package_configs',
        JSON.stringify(nextConfigs)
      );
    } catch {
      // ignore
    }

    showToast(
      isCreating
        ? 'Paket baru & batasan kuota berhasil dibuat!'
        : `Paket ${editingPlan.name} & batasan kuotanya berhasil diperbarui!`
    );
    setEditingPlan(null);
    setPlanConfig(null);
    setIsCreating(false);
  };

  const handleDelete = (plan) => {
    if (confirm(`Hapus paket "${plan.name}"?`)) {
      deletePackage.mutate(plan.id);
      showToast('Paket dihapus.');
    }
  };

  if (isLoading)
    return (
      <p className="text-sm text-slate-400 py-8 text-center">Memuat paket...</p>
    );

  const previewFeatures =
    editingPlan && planConfig
      ? buildFeatureListFromConfig(editingPlan.duration_days, planConfig)
      : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Daftar Paket Harga &amp; Batasan Kuota Fitur
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur harga, harga coret diskon, label badge, batas jumlah tamu, masa aktif, hingga checklist fitur setiap paket di Landing Page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages?.map((plan) => {
          const cfg = inferPackageConfig(plan, savedConfigs);
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 relative flex flex-col justify-between shadow-xs transition-all ${
                cfg.isPopular
                  ? 'border-2 border-purple-500 ring-4 ring-purple-500/10'
                  : 'border border-slate-200'
              }`}
            >
              {cfg.badge && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {cfg.badge}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 font-semibold text-[10px] rounded-full uppercase tracking-wider inline-block ${
                      plan.is_active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {plan.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold">
                    {cfg.maxGuests === 'unlimited'
                      ? 'Unlimited Tamu'
                      : `Maks. ${cfg.maxGuests} Tamu`}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {plan.description || 'Belum ada deskripsi.'}
                </p>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-emerald-600">
                    {plan.price === 0
                      ? 'Rp 0 (Gratis)'
                      : `Rp ${plan.price.toLocaleString('id-ID')}`}
                  </span>
                  {Number(cfg.originalPrice) > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      Rp {Number(cfg.originalPrice).toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mb-4">
                  {plan.duration_days
                    ? `Masa aktif ${plan.duration_days} hari`
                    : 'Masa aktif selamanya (Lifetime)'}
                </p>

                <ul className="space-y-2 mb-6">
                  {(plan.features ?? []).map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 flex items-start gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEdit(plan)}
                  className="flex-1 py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-purple-200 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Atur Batasan &amp; Edit Paket</span>
                </button>
                <button
                  onClick={() => handleDelete(plan)}
                  className="w-9 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center border border-rose-200 cursor-pointer shrink-0"
                  title="Hapus Paket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editingPlan && planConfig && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-purple-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                {isCreating
                  ? 'Tambah Paket Harga & Batasan Baru'
                  : `Atur Paket & Batasan Kuota: ${editingPlan.name}`}
              </h4>
              <p className="text-xs text-slate-500">
                Pilih batasan kuota di bawah ini — daftar poin fitur di kartu Landing Page akan tersusun otomatis.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingPlan(null);
                setPlanConfig(null);
                setIsCreating(false);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BAGIAN 1: HARGA & TAMPILAN KARTU */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              A. Informasi Harga &amp; Tampilan Kartu di Landing Page
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nama Paket
                </label>
                <input
                  required
                  type="text"
                  placeholder="Misal: Paket Gold"
                  value={editingPlan.name}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Harga Jual (Rp, isi 0 jika Gratis)
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={editingPlan.price}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Harga Coret / Sebelum Diskon (Rp)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Kosongkan / 0 jika tanpa diskon"
                  value={planConfig.originalPrice || ''}
                  onChange={(e) =>
                    setPlanConfig({
                      ...planConfig,
                      originalPrice: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Label Pita / Badge Atas Kartu
                </label>
                <input
                  type="text"
                  placeholder="Misal: Paling Diminati 🔥 atau Fitur VIP"
                  value={planConfig.badge}
                  onChange={(e) =>
                    setPlanConfig({ ...planConfig, badge: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Teks Tombol Pilih Paket
                </label>
                <input
                  type="text"
                  placeholder="Misal: Pilih Paket Gold"
                  value={planConfig.ctaText}
                  onChange={(e) =>
                    setPlanConfig({ ...planConfig, ctaText: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer bg-purple-50/70 border border-purple-200 rounded-xl px-3.5 py-2 w-full">
                  <input
                    type="checkbox"
                    checked={planConfig.isPopular}
                    onChange={(e) =>
                      setPlanConfig({
                        ...planConfig,
                        isPopular: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-purple-600 rounded"
                  />
                  <span className="text-xs font-semibold text-purple-900">
                    Highlight Kartu (Tampil Menonjol)
                  </span>
                </label>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Deskripsi Singkat Paket
                </label>
                <input
                  type="text"
                  value={editingPlan.description ?? ''}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN 2: BATASAN KUOTA UTAMA */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              B. Pengaturan Batasan Kuota Paket (Masa Aktif, Jumlah Tamu, Galeri &amp; Musik)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  1. Masa Aktif Undangan
                </label>
                <select
                  value={String(editingPlan.duration_days ?? '')}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      duration_days: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="3">3 Hari (Uji Coba / Gratis)</option>
                  <option value="7">7 Hari (1 Minggu)</option>
                  <option value="30">30 Hari (1 Bulan)</option>
                  <option value="90">90 Hari (3 Bulan)</option>
                  <option value="180">180 Hari (6 Bulan)</option>
                  <option value="365">365 Hari (1 Tahun)</option>
                  <option value="">Selamanya (Lifetime)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  2. Batas Maksimal Tamu Undangan
                </label>
                <select
                  value={planConfig.maxGuests}
                  onChange={(e) =>
                    setPlanConfig({ ...planConfig, maxGuests: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="25">Maksimal 25 Nama Tamu</option>
                  <option value="50">Maksimal 50 Nama Tamu</option>
                  <option value="100">Maksimal 100 Nama Tamu</option>
                  <option value="300">Maksimal 300 Nama Tamu</option>
                  <option value="unlimited">
                    Tanpa Batas / Unlimited Tamu
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  3. Batas Galeri Foto Prewedding
                </label>
                <select
                  value={planConfig.maxGallery}
                  onChange={(e) =>
                    setPlanConfig({ ...planConfig, maxGallery: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="0">Tanpa Galeri Foto (0 Foto)</option>
                  <option value="4">Maksimal 4 Foto Galeri</option>
                  <option value="10">Maksimal 10 Foto Galeri</option>
                  <option value="unlimited">Unlimited Foto &amp; Video</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  4. Fitur Musik Latar (Audio)
                </label>
                <select
                  value={planConfig.musicTier}
                  onChange={(e) =>
                    setPlanConfig({ ...planConfig, musicTier: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="none">Tidak Termasuk Musik</option>
                  <option value="basic">1 Pilihan Lagu Standar</option>
                  <option value="custom">Kustom Musik Background Bebas</option>
                </select>
              </div>
            </div>
          </div>

          {/* BAGIAN 3: CHECKLIST FITUR */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-purple-700">
              C. Checklist Fitur yang Dibuka di Paket Ini (Centang untuk Mengaktifkan)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  key: 'allowMapsCalendar',
                  label: 'Informasi Acara & Google Maps Lokasi',
                },
                {
                  key: 'allowRsvpWishes',
                  label: 'Buku Tamu, Ucapan & Konfirmasi RSVP',
                },
                {
                  key: 'allowDigitalEnvelope',
                  label: 'Amplop Digital & Rekening / QRIS',
                },
                {
                  key: 'allowWaBroadcast',
                  label: 'Broadcast & Kirim WhatsApp Otomatis',
                },
                {
                  key: 'allowExportRsvp',
                  label: 'Export Data Tamu & RSVP ke Excel/CSV',
                },
                {
                  key: 'allowPrintSuite',
                  label: 'Fitur Undangan Cetak Fisik (Print PDF)',
                },
                {
                  key: 'allowVipSupport',
                  label: 'Prioritas Dukungan VIP CS WhatsApp',
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    planConfig[item.key]
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(planConfig[item.key])}
                    onChange={(e) =>
                      setPlanConfig({
                        ...planConfig,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* BAGIAN 4: FITUR TAMBAHAN & PREVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Fitur Tambahan Lainnya (Opsional, 1 baris 1 fitur)
              </label>
              <textarea
                rows={4}
                placeholder="Ketik baris fitur tambahan jika ada (misal: Custom Domain / Filter IG)..."
                value={planConfig.customFeaturesText}
                onChange={(e) =>
                  setPlanConfig({
                    ...planConfig,
                    customFeaturesText: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Pratinjau Daftar Fitur yang Akan Tampil di Kartu Landing Page ({previewFeatures.length} Poin):
              </span>
              <ul className="space-y-1.5">
                {previewFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 flex items-start gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setEditingPlan(null);
                setPlanConfig(null);
                setIsCreating(false);
              }}
              className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createPackage.isPending || updatePackage.isPending}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Paket &amp; Batasan</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
