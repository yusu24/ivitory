import { useEffect, useState } from 'react';
import {
  Music,
  Plus,
  Trash2,
  Image as ImageIcon,
  SlidersHorizontal,
  Check,
  RotateCcw,
  Upload,
} from 'lucide-react';
import {
  useUpdateInvitation,
  useUploadSlotPhoto,
  useDeleteSlotPhoto,
  useUploadMusic,
} from '../../../../hooks/useAdminInvitations';
import { useAddGalleryPhoto, useDeleteGalleryPhoto } from '../../../../hooks/useAdminChildResources';
import {
  DEFAULT_PHOTO_SETTINGS,
  getPhotoSlotConfig,
} from '../../../../templates/monochrome-lineart/utils/templateConfig';

const PHOTO_SLOTS = [
  {
    id: 'cover',
    label: '1. Foto Sampul & Footer',
    desc: 'Tampil di lingkaran pembuka (Cover Gate) dan bagian bawah (Footer).',
    urlKey: 'cover_photo_url',
    frameShape: 'rounded-full w-36 h-36',
  },
  {
    id: 'hero',
    label: '2. Foto / Ilustrasi Hero Utama',
    desc: 'Tampil di medali besar halaman utama (Hero). Jika kosong, otomatis memakai foto sampul/ilustrasi.',
    urlKey: 'hero_image_url',
    frameShape: 'rounded-full w-36 h-36',
  },
  {
    id: 'bride',
    label: '3. Foto Mempelai Wanita',
    desc: 'Tampil di bingkai lengkung kartu profil Mempelai Wanita.',
    urlKey: 'bride_photo_url',
    frameShape: 'rounded-t-full rounded-b-md w-32 h-40',
  },
  {
    id: 'groom',
    label: '4. Foto Mempelai Pria',
    desc: 'Tampil di bingkai lengkung kartu profil Mempelai Pria.',
    urlKey: 'groom_photo_url',
    frameShape: 'rounded-t-full rounded-b-md w-32 h-40',
  },
];

export default function GaleriSubTab({ invitation, showToast }) {
  const updateInvitation = useUpdateInvitation(invitation.id);
  const uploadSlotPhoto = useUploadSlotPhoto(invitation.id);
  const deleteSlotPhoto = useDeleteSlotPhoto(invitation.id);
  const uploadMusic = useUploadMusic(invitation.id);
  const addGalleryPhoto = useAddGalleryPhoto(invitation.id);
  const deleteGalleryPhoto = useDeleteGalleryPhoto(invitation.id);

  const [activeSlot, setActiveSlot] = useState('cover');
  const [caption, setCaption] = useState('');

  const [photoSettings, setPhotoSettings] = useState(() => ({
    cover: getPhotoSlotConfig(invitation, 'cover'),
    hero: getPhotoSlotConfig(invitation, 'hero'),
    bride: getPhotoSlotConfig(invitation, 'bride'),
    groom: getPhotoSlotConfig(invitation, 'groom'),
  }));

  useEffect(() => {
    setPhotoSettings({
      cover: getPhotoSlotConfig(invitation, 'cover'),
      hero: getPhotoSlotConfig(invitation, 'hero'),
      bride: getPhotoSlotConfig(invitation, 'bride'),
      groom: getPhotoSlotConfig(invitation, 'groom'),
    });
  }, [invitation]);

  const currentSlotMeta = PHOTO_SLOTS.find((s) => s.id === activeSlot) || PHOTO_SLOTS[0];
  const currentCfg = photoSettings[activeSlot] || DEFAULT_PHOTO_SETTINGS[activeSlot];

  const getSlotPreviewUrl = (slotId) => {
    if (slotId === 'cover') {
      return invitation.cover_photo_url || '/templates/minimal-monochrome/couple_real.png';
    }
    if (slotId === 'hero') {
      return (
        invitation.hero_image_url ||
        invitation.cover_photo_url ||
        '/templates/minimal-monochrome/couple_real.png'
      );
    }
    if (slotId === 'bride') {
      return (
        invitation.bride_photo_url ||
        invitation.cover_photo_url ||
        '/templates/minimal-monochrome/couple_real.png'
      );
    }
    return (
      invitation.groom_photo_url ||
      invitation.cover_photo_url ||
      '/templates/minimal-monochrome/couple_real.png'
    );
  };

  const updateSlotField = (field, value) => {
    setPhotoSettings((prev) => ({
      ...prev,
      [activeSlot]: {
        ...prev[activeSlot],
        [field]: value,
      },
    }));
  };

  const handleResetSlot = () => {
    const def = DEFAULT_PHOTO_SETTINGS[activeSlot];
    setPhotoSettings((prev) => ({
      ...prev,
      [activeSlot]: { ...def },
    }));
    showToast('Posisi & zoom dikembalikan ke default. Klik Simpan untuk menerapkan.');
  };

  const handleSavePhotoSettings = async () => {
    const cleanSettings = {};
    for (const slot of ['cover', 'hero', 'bride', 'groom']) {
      const s = photoSettings[slot];
      cleanSettings[slot] = {
        scale: Number(s.scale),
        x: Number(s.x),
        y: Number(s.y),
        fit: s.fit,
        grayscale: Boolean(s.grayscale),
      };
    }

    await updateInvitation.mutateAsync({
      slug: invitation.slug,
      template_id: invitation.template_id ?? invitation.template?.id ?? 1,
      groom_name: invitation.groom_name,
      groom_nickname: invitation.groom_nickname ?? '',
      groom_parents: invitation.groom_parents ?? '',
      bride_name: invitation.bride_name,
      bride_nickname: invitation.bride_nickname ?? '',
      bride_parents: invitation.bride_parents ?? '',
      opening_text: invitation.opening_text ?? '',
      photo_settings: cleanSettings,
      akad_date: invitation.akad_date,
      akad_time: invitation.akad_time?.slice(0, 5) || '08:00',
      akad_location: invitation.akad_location,
      akad_address: invitation.akad_address ?? '',
      akad_map_url: invitation.akad_map_url ?? '',
      resepsi_date: invitation.resepsi_date ?? '',
      resepsi_time: invitation.resepsi_time?.slice(0, 5) || '',
      resepsi_location: invitation.resepsi_location ?? '',
      resepsi_address: invitation.resepsi_address ?? '',
      resepsi_map_url: invitation.resepsi_map_url ?? '',
      is_published: invitation.is_published ?? false,
    });
    showToast('Pengaturan posisi & zoom seluruh foto berhasil disimpan!');
  };

  const handleSlotFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadSlotPhoto.mutateAsync({ slot: activeSlot, file });
    showToast(`${currentSlotMeta.label} berhasil diunggah!`);
    e.target.value = '';
  };

  const handleSlotDelete = async () => {
    if (confirm(`Kembalikan ${currentSlotMeta.label} ke ilustrasi default?`)) {
      await deleteSlotPhoto.mutateAsync(activeSlot);
      showToast('Foto dikembalikan ke ilustrasi default.');
    }
  };

  const handleMusic = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadMusic.mutateAsync(file);
    showToast('Musik latar berhasil diunggah!');
  };

  const handleAddPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await addGalleryPhoto.mutateAsync({ file, caption: caption || undefined });
    setCaption('');
    showToast('Foto galeri berhasil ditambahkan!');
    e.target.value = '';
  };

  const handleDeletePhoto = (id) => {
    if (confirm('Hapus foto ini dari galeri?')) {
      deleteGalleryPhoto.mutate(id);
      showToast('Foto galeri dihapus.');
    }
  };

  const hasCustomSlotFile = Boolean(invitation[currentSlotMeta.urlKey]);

  return (
    <div className="space-y-6 text-xs">
      {/* ================= 1. UPLOAD & ADJUST SEMUA FOTO UTAMA ================= */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>Upload &amp; Adjust Posisi / Zoom Foto Utama</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pilih bagian foto di bawah ini untuk mengganti gambar dan mengatur Zoom, Geser Kiri-Kanan (X), serta Atas-Bawah (Y).
            </p>
          </div>

          <button
            type="button"
            onClick={handleSavePhotoSettings}
            disabled={updateInvitation.isPending}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Posisi & Zoom Foto'}</span>
          </button>
        </div>

        {/* Slot Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PHOTO_SLOTS.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setActiveSlot(slot.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeSlot === slot.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
              }`}
            >
              <span className="block font-semibold text-[11px] truncate">{slot.label}</span>
              <span
                className={`block text-[10px] mt-0.5 ${
                  activeSlot === slot.id ? 'text-purple-100' : 'text-slate-400'
                }`}
              >
                {invitation[slot.urlKey] ? '✓ Foto Kustom' : 'Ilustrasi Default'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Slot Editor & Live Frame Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-white border border-slate-200 rounded-2xl p-4">
          {/* Live Frame Preview (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Pratinjau Bingkai ({currentSlotMeta.label})
            </span>

            <div
              className={`relative overflow-hidden border-2 border-zinc-900 bg-white shadow-lg ${currentSlotMeta.frameShape}`}
            >
              <img
                src={getSlotPreviewUrl(activeSlot)}
                alt={currentSlotMeta.label}
                style={{
                  objectFit: currentCfg.fit,
                  objectPosition: `${currentCfg.x}% ${currentCfg.y}%`,
                  transform: `scale(${currentCfg.scale / 100})`,
                  transformOrigin: `${currentCfg.x}% ${currentCfg.y}%`,
                }}
                className={`w-full h-full transition-all duration-150 ${
                  currentCfg.grayscale ? 'filter grayscale contrast-115' : ''
                }`}
              />
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-3 max-w-[220px]">
              {currentSlotMeta.desc}
            </p>

            {/* Upload / Reset Photo File Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold cursor-pointer shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadSlotPhoto.isPending ? 'Mengunggah...' : 'Ganti Foto Ini'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSlotFileUpload}
                  className="hidden"
                />
              </label>

              {hasCustomSlotFile && (
                <button
                  type="button"
                  onClick={handleSlotDelete}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl font-semibold cursor-pointer"
                >
                  Pakai Ilustrasi Default
                </button>
              )}
            </div>
          </div>

          {/* Sliders for Zoom, X, Y, Fit, Grayscale (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                Pengaturan Posisi &amp; Skala ({currentSlotMeta.label})
              </span>
              <button
                type="button"
                onClick={handleResetSlot}
                className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Posisi</span>
              </button>
            </div>

            {/* Zoom / Scale Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Perbesar / Perkecil (Zoom)</span>
                <span className="font-semibold text-purple-600">{currentCfg.scale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="220"
                step="1"
                value={currentCfg.scale}
                onChange={(e) => updateSlotField('scale', Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Horizontal X Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Geser Kiri ↔ Kanan (Posisi X)</span>
                <span className="font-semibold text-purple-600">{currentCfg.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={currentCfg.x}
                onChange={(e) => updateSlotField('x', Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Vertical Y Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">Geser Atas ↕ Bawah (Posisi Y)</span>
                <span className="font-semibold text-purple-600">{currentCfg.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={currentCfg.y}
                onChange={(e) => updateSlotField('y', Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Fit Mode & Grayscale Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Mode Pas Bingkai</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: 'cover', label: 'Penuh (Cover)' },
                    { key: 'contain', label: 'Utuh (Contain)' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => updateSlotField('fit', opt.key)}
                      className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] cursor-pointer ${
                        currentCfg.fit === opt.key
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Efek Warna Foto</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: false, label: 'Warna Asli' },
                    { key: true, label: 'Hitam Putih' },
                  ].map((opt) => (
                    <button
                      key={String(opt.key)}
                      type="button"
                      onClick={() => updateSlotField('grayscale', opt.key)}
                      className={`py-1.5 px-2 rounded-lg border font-semibold text-[11px] cursor-pointer ${
                        Boolean(currentCfg.grayscale) === opt.key
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MUSIK LATAR ================= */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-purple-500" />
          Musik Latar Undangan (MP3 / WAV / OGG)
        </label>
        {invitation.music_url && (
          <audio controls src={invitation.music_url} className="w-full mb-2 h-10" />
        )}
        <input
          type="file"
          accept="audio/*"
          onChange={handleMusic}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:px-3 file:py-1 file:text-xs cursor-pointer"
        />
      </div>

      {/* ================= 3. GALERI FOTO KENANGAN ================= */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
          Album Galeri Foto Kenangan ({invitation.gallery_photos?.length || 0} Foto)
        </label>

        {invitation.gallery_photos?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {invitation.gallery_photos.map((photo) => (
              <div key={photo.id} className="relative group bg-white p-1.5 rounded-xl border border-slate-200">
                <img
                  src={photo.url}
                  alt={photo.caption ?? ''}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                {photo.caption && (
                  <p className="mt-1.5 text-[10px] text-slate-600 truncate px-1">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-3 space-y-2">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Ketik judul / keterangan foto galeri (opsional)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
          <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 rounded-xl font-semibold cursor-pointer transition-colors">
            <Plus className="w-4 h-4" />
            <span>{addGalleryPhoto.isPending ? 'Mengunggah Foto...' : 'Tambah Foto ke Galeri'}</span>
            <input type="file" accept="image/*" onChange={handleAddPhoto} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
