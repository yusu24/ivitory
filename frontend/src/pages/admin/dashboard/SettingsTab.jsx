import { useEffect, useRef, useState } from 'react';
import {
  Save,
  Info,
  Upload,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  Globe,
  LayoutTemplate,
  Phone,
} from 'lucide-react';
import {
  useLandingContent,
  useUpdateLandingContent,
  useUploadBrandLogo,
  useDeleteBrandLogo,
  useUploadFavicon,
  useDeleteFavicon,
} from '../../../hooks/useBrandSettings';
import { getSavedFooterSettings } from './LandingTab';

const DEFAULT_SETTINGS = {
  bcaAccount: '',
  mandiriAccount: '',
  csWhatsapp: '6281234567890',
};

export default function SettingsTab({ showToast }) {
  const { data: brandData } = useLandingContent();
  const updateBrand = useUpdateLandingContent();
  const uploadLogo = useUploadBrandLogo();
  const deleteLogo = useDeleteBrandLogo();
  const uploadFavicon = useUploadFavicon();
  const deleteFavicon = useDeleteFavicon();

  const fileInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const [siteName, setSiteName] = useState('Invitory');
  const [form, setForm] = useState(DEFAULT_SETTINGS);
  const [footerForm, setFooterForm] = useState(getSavedFooterSettings);

  useEffect(() => {
    if (brandData?.site_name) {
      setSiteName(brandData.site_name);
    }
  }, [brandData]);

  const handleLogoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadLogo.mutateAsync(file);
      showToast('Logo website berhasil diperbarui!');
    } catch {
      showToast('Gagal mengunggah logo. Pastikan ukuran maksimal 4MB (PNG/JPG/SVG/WEBP).');
    }
    e.target.value = '';
  };

  const handleRemoveLogo = async () => {
    if (!confirm('Kembalikan logo website ke ikon default Invitory?')) return;
    try {
      await deleteLogo.mutateAsync();
      showToast('Logo dikembalikan ke ikon default.');
    } catch {
      showToast('Gagal menghapus logo.');
    }
  };

  const handleFaviconFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadFavicon.mutateAsync(file);
      showToast('Icon Tab Browser (Favicon) berhasil diperbarui!');
    } catch {
      showToast('Gagal mengunggah icon tab. Gunakan format PNG, SVG, ICO, atau WEBP (Maks. 2MB).');
    }
    e.target.value = '';
  };

  const handleRemoveFavicon = async () => {
    if (!confirm('Kembalikan icon tab browser ke default?')) return;
    try {
      await deleteFavicon.mutateAsync();
      showToast('Icon tab browser dikembalikan ke default.');
    } catch {
      showToast('Gagal menghapus icon tab.');
    }
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    try {
      await updateBrand.mutateAsync({
        site_name: siteName.trim() || 'Invitory',
      });
      localStorage.setItem('invitory_footer_settings', JSON.stringify(footerForm));
      window.dispatchEvent(new Event('invitory:footer-updated'));
      showToast('Identitas brand, pengaturan footer & CS WhatsApp berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan pengaturan.');
    }
  };

  const logoUrl = brandData?.logo_url;
  const faviconUrl = brandData?.favicon_url;
  const effectiveFaviconUrl = faviconUrl || logoUrl || '/favicon.svg';
  const displayBrand = siteName.trim() || 'Invitory';

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* 1. Card Pengaturan Logo, Icon Tab (Favicon) & Nama Brand Website */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              <span>Pengaturan Logo, Icon Tab Browser &amp; Identitas Brand</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur gambar logo utama, icon tab browser (favicon), dan nama brand (default: <strong>Invitory</strong>).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri: Logo Utama Website */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 flex flex-col items-center justify-between space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              1. Logo Utama Website (Navbar, Sidebar &amp; Footer)
            </span>

            {/* Preview Navbar Style */}
            <div className="bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm flex items-center justify-center gap-2.5 min-h-[56px]">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={displayBrand}
                  className="h-9 sm:h-10 w-auto max-w-[180px] object-contain"
                />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-sm">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
                      <Sparkles className="w-4 h-4 fill-purple-200 text-purple-600" />
                    </div>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-800 font-sans">
                    {displayBrand}
                    <span className="text-purple-500 font-serif italic">.</span>
                  </span>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleLogoFileChange}
              className="hidden"
            />

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadLogo.isPending}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {uploadLogo.isPending ? 'Mengunggah...' : 'Upload Logo Baru'}
                </span>
              </button>

              {logoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  disabled={deleteLogo.isPending}
                  title="Hapus & Kembalikan ke Default"
                  className="w-9 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl inline-flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Rekomendasi: PNG transparan / SVG persegi panjang (Maks. 4MB)
            </p>
          </div>

          {/* Kolom Kanan: Icon Tab Browser (Favicon) */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 flex flex-col items-center justify-between space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-500" />
              <span>2. Icon di Tab Browser (Favicon)</span>
            </span>

            {/* Browser Tab Mockup Preview */}
            <div className="w-full max-w-[280px] bg-slate-200/80 pt-2 px-2 rounded-t-xl border border-slate-300 shadow-inner">
              <div className="bg-white rounded-t-lg px-3 py-2 flex items-center gap-2.5 shadow-xs">
                <img
                  src={effectiveFaviconUrl}
                  alt="Favicon"
                  className="w-4 h-4 object-contain shrink-0 rounded-xs"
                />
                <span className="text-xs font-semibold text-slate-700 truncate flex-1">
                  {displayBrand} — Undangan Digital
                </span>
                <span className="text-[10px] text-slate-400 font-bold">×</span>
              </div>
            </div>

            <input
              ref={faviconInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,.ico"
              onChange={handleFaviconFileChange}
              className="hidden"
            />

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => faviconInputRef.current?.click()}
                disabled={uploadFavicon.isPending}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>
                  {uploadFavicon.isPending ? 'Mengunggah...' : 'Upload Icon Tab'}
                </span>
              </button>

              {faviconUrl && (
                <button
                  type="button"
                  onClick={handleRemoveFavicon}
                  disabled={deleteFavicon.isPending}
                  title="Hapus Icon Tab & Gunakan Default"
                  className="w-9 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl inline-flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Rekomendasi: Ikon kotak 1:1 (misal 64x64 px atau 512x512 px) format PNG, SVG, atau ICO.
            </p>
          </div>
        </div>

        {/* Brand Name & Details */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Brand / Judul Tab Browser
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Invitory"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-purple-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Nama ini akan menjadi <strong>Judul Tab Browser</strong> serta tampil di footer dan teks default apabila tidak menggunakan gambar logo.
            </p>
          </div>

          <div className="lg:col-span-5 bg-purple-50/70 border border-purple-200 rounded-2xl p-4 text-xs text-purple-900 space-y-1">
            <p className="font-bold">Tips Icon Tab (Favicon):</p>
            <p className="text-[11px] text-purple-800">
              Karena ukuran icon di tab browser sangat kecil (16x16 px), gunakan <strong>simbol/monogram saja</strong> tanpa tulisan panjang agar terlihat tajam.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Card Pengaturan Footer Website & Icon Mengambang (Floating) Chat CS WA */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-purple-600" />
              <span>Pengaturan Footer Landing Page &amp; Icon Mengambang CS WhatsApp</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur deskripsi footer, teks copyright, serta tombol mengambang (floating) Chat CS WhatsApp di pojok kanan bawah Landing Page.
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
      </div>

      {/* 3. Card Pengaturan Rekening Pembayaran */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Pengaturan Rekening Pembayaran Manual
          </h3>
          <p className="text-xs text-slate-500">
            Informasi ini ditampilkan sebagai alternatif konfirmasi pembayaran manual
          </p>
        </div>

        <div className="flex items-start gap-2.5 bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-800">
          <Info className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <p>
            Pembayaran otomatis diproses melalui Midtrans. Pengaturan di bawah digunakan untuk alternatif transfer manual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Rekening Transfer BCA (opsional)
            </label>
            <input
              type="text"
              value={form.bcaAccount}
              onChange={(e) => setForm({ ...form, bcaAccount: e.target.value })}
              placeholder="1234567890 - PT Invitory Digital"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Rekening Transfer Mandiri (opsional)
            </label>
            <input
              type="text"
              value={form.mandiriAccount}
              onChange={(e) => setForm({ ...form, mandiriAccount: e.target.value })}
              placeholder="1234567890 - PT Invitory Digital"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={updateBrand.isPending}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>
              {updateBrand.isPending ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
