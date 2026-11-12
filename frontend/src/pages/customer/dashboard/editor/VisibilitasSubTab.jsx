import { useEffect, useState } from 'react';
import { Check, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import { useUpdateInvitation } from '../../../../hooks/useAdminInvitations';
import {
  DEFAULT_CUSTOM_TEXTS,
  getInvitationTexts,
} from '../../../../templates/monochrome-lineart/utils/templateConfig';

/**
 * Daftar section undangan yang bisa di-enable / disable oleh customer.
 * key     = nama key di custom_texts.section_visibility
 * label   = label yang ditampilkan
 * desc    = deskripsi singkat
 * emoji   = ikon emoji
 */
const SECTIONS = [
  {
    key: 'show_dresscode',
    label: 'Panduan Busana (Dress Code)',
    desc: 'Box palet warna busana di seksi Rangkaian Acara.',
    emoji: '👔',
  },
  {
    key: 'show_story',
    label: 'Linimasa Kisah Cinta (Love Story)',
    desc: 'Timeline perjalanan cinta kedua mempelai.',
    emoji: '📖',
  },
  {
    key: 'show_gallery',
    label: 'Galeri Foto',
    desc: 'Koleksi foto prewedding & momen spesial.',
    emoji: '🖼️',
  },
  {
    key: 'show_amplop',
    label: 'Amplop Digital & Kado',
    desc: 'Rekening bank / e-wallet & alamat pengiriman kado fisik.',
    emoji: '💳',
  },
  {
    key: 'show_rsvp',
    label: 'RSVP & Buku Tamu',
    desc: 'Formulir konfirmasi kehadiran dan buku tamu digital.',
    emoji: '📝',
  },
  {
    key: 'show_countdown',
    label: 'Hitung Mundur (Countdown)',
    desc: 'Penghitung hari menuju hari bahagia.',
    emoji: '⏳',
  },
];

/**
 * Ambil nilai visibility dari custom_texts; default semua true.
 */
function getVisibility(invitation) {
  const custom = invitation?.custom_texts ?? {};
  const visibility = custom.section_visibility ?? {};
  const result = {};
  for (const s of SECTIONS) {
    result[s.key] = visibility[s.key] !== false; // default: true
  }
  return result;
}

export default function VisibilitasSubTab({ invitation, showToast }) {
  const updateInvitation = useUpdateInvitation(invitation.id);
  const [visibility, setVisibility] = useState(() => getVisibility(invitation));

  useEffect(() => {
    setVisibility(getVisibility(invitation));
  }, [invitation]);

  const handleToggle = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    const existingTexts = getInvitationTexts(invitation);
    const updatedTexts = {
      ...existingTexts,
      section_visibility: visibility,
    };

    await updateInvitation.mutateAsync({
      slug: invitation.slug,
      template_id: invitation.template_id ?? invitation.template?.id ?? 1,
      groom_name: invitation.groom_name,
      groom_nickname: invitation.groom_nickname ?? '',
      groom_parents: invitation.groom_parents ?? '',
      bride_name: invitation.bride_name,
      bride_nickname: invitation.bride_nickname ?? '',
      bride_parents: invitation.bride_parents ?? '',
      opening_text: invitation.opening_text ?? existingTexts.opening_text,
      custom_texts: updatedTexts,
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
      photo_settings: invitation.photo_settings ?? {},
    });

    showToast('Pengaturan visibilitas seksi berhasil disimpan!');
  };

  const allEnabled = SECTIONS.every((s) => visibility[s.key]);

  const handleToggleAll = () => {
    const next = !allEnabled;
    const updated = {};
    for (const s of SECTIONS) updated[s.key] = next;
    setVisibility(updated);
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-purple-500" />
            Visibilitas Seksi Undangan
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Aktifkan atau nonaktifkan seksi yang ingin ditampilkan di undangan Anda.
            Seksi yang dinonaktifkan tidak akan muncul bagi tamu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleAll}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {allEnabled ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{allEnabled ? 'Nonaktifkan Semua' : 'Aktifkan Semua'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={updateInvitation.isPending}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Visibilitas'}</span>
          </button>
        </div>
      </div>

      {/* Toggle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTIONS.map((section) => {
          const isOn = visibility[section.key];
          return (
            <div
              key={section.key}
              className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                isOn
                  ? 'bg-white border-emerald-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-xl leading-none shrink-0 mt-0.5">{section.emoji}</span>
                <div className="min-w-0">
                  <p
                    className={`font-semibold truncate ${
                      isOn ? 'text-slate-800' : 'text-slate-500 line-through'
                    }`}
                  >
                    {section.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{section.desc}</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={() => handleToggle(section.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus:outline-none ${
                  isOn
                    ? 'bg-emerald-500 border-emerald-600'
                    : 'bg-slate-300 border-slate-400'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform ${
                    isOn ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-start gap-3">
        <span className="text-blue-500 text-base shrink-0">💡</span>
        <p className="text-[11px] text-blue-700 leading-relaxed">
          Perubahan visibilitas hanya mempengaruhi tampilan undangan online. Data yang sudah
          dimasukkan (rekening, foto galeri, dll.) tetap tersimpan dan akan muncul kembali
          saat seksi diaktifkan lagi.
        </p>
      </div>

      {/* Save Bottom Bar */}
      <div className="pt-3 border-t border-slate-200 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={updateInvitation.isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>
    </div>
  );
}
