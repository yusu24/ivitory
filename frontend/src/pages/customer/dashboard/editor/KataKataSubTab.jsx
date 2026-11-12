import { useEffect, useState } from 'react';
import { Check, RotateCcw, FileText, BookOpen, Users, Calendar, Gift, MessageSquare } from 'lucide-react';
import { useUpdateInvitation } from '../../../../hooks/useAdminInvitations';
import {
  COVER_BG_THEMES,
  DEFAULT_CUSTOM_TEXTS,
  getInvitationTexts,
} from '../../../../templates/monochrome-lineart/utils/templateConfig';

export default function KataKataSubTab({ invitation, showToast }) {
  const updateInvitation = useUpdateInvitation(invitation.id);
  const [texts, setTexts] = useState(() => getInvitationTexts(invitation));

  useEffect(() => {
    setTexts(getInvitationTexts(invitation));
  }, [invitation]);

  const handleChange = (key, val) => {
    setTexts((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetDefault = () => {
    if (confirm('Kembalikan seluruh kata-kata ke teks bawaan (default) template?')) {
      setTexts({ ...DEFAULT_CUSTOM_TEXTS });
      showToast('Teks dikembalikan ke default. Klik Simpan untuk menerapkan.');
    }
  };

  const handleSave = async () => {
    await updateInvitation.mutateAsync({
      slug: invitation.slug,
      template_id: invitation.template_id ?? invitation.template?.id ?? 1,
      groom_name: invitation.groom_name,
      groom_nickname: invitation.groom_nickname ?? '',
      groom_parents: invitation.groom_parents ?? '',
      bride_name: invitation.bride_name,
      bride_nickname: invitation.bride_nickname ?? '',
      bride_parents: invitation.bride_parents ?? '',
      opening_text: texts.opening_text,
      custom_texts: texts,
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
    showToast('Seluruh kata-kata & teks undangan berhasil disimpan!');
  };

  return (
    <div className="space-y-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Kustomisasi Kata-Kata &amp; Kalimat Undangan</h4>
          <p className="text-[11px] text-slate-500">
            Seluruh teks sudah terisi otomatis dengan kalimat default. Ubah bagian mana pun sesuai keinginan Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefault}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={updateInvitation.isPending}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{updateInvitation.isPending ? 'Menyimpan...' : 'Simpan Kata-Kata'}</span>
          </button>
        </div>
      </div>

      {/* 1. Sampul & Hero */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-purple-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          1. Sampul (Cover Gate) &amp; Halaman Utama (Hero)
        </h5>

        {/* Pilihan Background Layar Sampul */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
          <label className="text-slate-700 font-semibold block">
            Tema Background Layar Pembuka (Cover Gate)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {COVER_BG_THEMES.map((item) => {
              const selected = (texts.cover_bg_theme || 'botanical_lineart') === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleChange('cover_bg_theme', item.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    selected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: item.swatch }}
                  />
                  <span className="text-[11px] font-semibold truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
          <TextField
            label="Atau Gunakan URL Gambar Background Sampul Kustom (Opsional)"
            value={texts.cover_bg_custom_url || ''}
            onChange={(v) => handleChange('cover_bg_custom_url', v)}
            placeholder="https://... (Kosongkan jika menggunakan tema di atas)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Label Header Sampul"
            value={texts.cover_header}
            onChange={(v) => handleChange('cover_header', v)}
          />
          <TextField
            label="Label Sapaan Tamu di Sampul"
            value={texts.cover_guest_label}
            onChange={(v) => handleChange('cover_guest_label', v)}
          />
          <TextField
            label="Teks Tombol Buka Undangan"
            value={texts.cover_button_text}
            onChange={(v) => handleChange('cover_button_text', v)}
          />
          <TextField
            label="Badge Atas Hero"
            value={texts.hero_badge}
            onChange={(v) => handleChange('hero_badge', v)}
          />
          <TextField
            label="Sub-judul Hero"
            value={texts.hero_subtitle}
            onChange={(v) => handleChange('hero_subtitle', v)}
          />
          <TextField
            label="Teks Pembatas Hero"
            value={texts.hero_divider_text}
            onChange={(v) => handleChange('hero_divider_text', v)}
          />
        </div>
      </div>

      {/* 2. Ayat Suci & Kutipan Pembuka */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-indigo-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          2. Ayat Suci &amp; Kutipan Pembuka
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TextField
            label="Judul Kutipan"
            value={texts.opening_title}
            onChange={(v) => handleChange('opening_title', v)}
          />
          <TextField
            label="Sub-judul Kutipan"
            value={texts.opening_subtitle}
            onChange={(v) => handleChange('opening_subtitle', v)}
          />
          <TextField
            label="Sumber Ayat / Surah"
            value={texts.opening_surah}
            onChange={(v) => handleChange('opening_surah', v)}
          />
        </div>
        <TextField
          label="Lafadz Bismillah / Pembuka Arab"
          value={texts.opening_bismillah}
          onChange={(v) => handleChange('opening_bismillah', v)}
        />
        <div>
          <label className="text-slate-500 block mb-1">Isi Terjemahan Ayat / Kutipan Pembuka</label>
          <textarea
            rows={3}
            value={texts.opening_text}
            onChange={(e) => handleChange('opening_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
      </div>

      {/* 3. Kata-Kata Profil Mempelai */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-pink-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          3. Seksi Profil Kedua Mempelai
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Judul Seksi Mempelai"
            value={texts.couple_title}
            onChange={(v) => handleChange('couple_title', v)}
          />
          <TextField
            label="Sub-judul Kaligrafi Mempelai"
            value={texts.couple_subtitle}
            onChange={(v) => handleChange('couple_subtitle', v)}
          />
        </div>
        <div>
          <label className="text-slate-500 block mb-1">Kalimat Pengantar Mempelai</label>
          <textarea
            rows={2}
            value={texts.couple_intro_text}
            onChange={(e) => handleChange('couple_intro_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <TextField
            label="Label Orang Tua Mempelai Wanita"
            value={texts.bride_parents_label}
            onChange={(v) => handleChange('bride_parents_label', v)}
          />
          <TextField
            label="Username Instagram Mempelai Wanita (tanpa @)"
            value={texts.bride_instagram}
            onChange={(v) => handleChange('bride_instagram', v)}
            placeholder="misal: nabilla"
          />
          <div className="md:col-span-2">
            <label className="text-slate-500 block mb-1">Kutipan / Doa Kartu Mempelai Wanita</label>
            <textarea
              rows={2}
              value={texts.bride_quote}
              onChange={(e) => handleChange('bride_quote', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </div>

          <TextField
            label="Label Orang Tua Mempelai Pria"
            value={texts.groom_parents_label}
            onChange={(v) => handleChange('groom_parents_label', v)}
          />
          <TextField
            label="Username Instagram Mempelai Pria (tanpa @)"
            value={texts.groom_instagram}
            onChange={(v) => handleChange('groom_instagram', v)}
            placeholder="misal: yusuf"
          />
          <div className="md:col-span-2">
            <label className="text-slate-500 block mb-1">Kutipan / Doa Kartu Mempelai Pria</label>
            <textarea
              rows={2}
              value={texts.groom_quote}
              onChange={(e) => handleChange('groom_quote', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* 4. Rangkaian Acara & Dress Code */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-emerald-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          4. Rangkaian Acara &amp; Panduan Busana
        </h5>
        <div>
          <label className="text-slate-500 block mb-1">Kalimat Pengantar Rangkaian Acara</label>
          <textarea
            rows={2}
            value={texts.event_intro_text}
            onChange={(e) => handleChange('event_intro_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Judul Kartu Acara 1 (Akad)"
            value={texts.akad_title}
            onChange={(v) => handleChange('akad_title', v)}
          />
          <TextField
            label="Judul Kartu Acara 2 (Resepsi)"
            value={texts.resepsi_title}
            onChange={(v) => handleChange('resepsi_title', v)}
          />
          <TextField
            label="Judul Box Dress Code"
            value={texts.dress_code_title}
            onChange={(v) => handleChange('dress_code_title', v)}
          />
          <TextField
            label="Keterangan Dress Code"
            value={texts.dress_code_text}
            onChange={(v) => handleChange('dress_code_text', v)}
          />
        </div>
      </div>

      {/* 5. Amplop Digital & Kado Fisik */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-amber-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5" />
          5. Amplop Digital &amp; Alamat Kado Fisik
        </h5>
        <div>
          <label className="text-slate-500 block mb-1">Kalimat Pengantar Amplop Digital</label>
          <textarea
            rows={2}
            value={texts.gift_intro_text}
            onChange={(e) => handleChange('gift_intro_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Nama Tempat / Kediaman Penerima Kado"
            value={texts.physical_gift_title}
            onChange={(v) => handleChange('physical_gift_title', v)}
          />
          <TextField
            label="Nama & No. HP Penerima Kado"
            value={texts.physical_gift_receiver}
            onChange={(v) => handleChange('physical_gift_receiver', v)}
          />
          <div className="md:col-span-2">
            <label className="text-slate-500 block mb-1">Alamat Lengkap Pengiriman Kado Fisik</label>
            <textarea
              rows={2}
              value={texts.physical_gift_address}
              onChange={(e) => handleChange('physical_gift_address', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
            />
          </div>
          <TextField
            label="Nomor WhatsApp Konfirmasi Amplop (Format 628...)"
            value={texts.whatsapp_number}
            onChange={(v) => handleChange('whatsapp_number', v)}
          />
        </div>
      </div>

      {/* 6. RSVP & Ucapan Penutup (Footer) */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <h5 className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          6. Pengantar RSVP &amp; Kalimat Penutup (Footer)
        </h5>
        <div>
          <label className="text-slate-500 block mb-1">Kalimat Pengantar RSVP &amp; Buku Tamu</label>
          <textarea
            rows={2}
            value={texts.rsvp_intro_text}
            onChange={(e) => handleChange('rsvp_intro_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <div>
          <label className="text-slate-500 block mb-1">Kalimat Penutup / Ucapan Terima Kasih (Footer)</label>
          <textarea
            rows={3}
            value={texts.closing_text}
            onChange={(e) => handleChange('closing_text', e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextField
            label="Ucapan Syukur Penutup"
            value={texts.closing_thanks}
            onChange={(v) => handleChange('closing_thanks', v)}
          />
          <TextField
            label="Salam Penutup"
            value={texts.closing_greeting}
            onChange={(v) => handleChange('closing_greeting', v)}
          />
        </div>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="text-slate-500 block mb-1">{label}</label>
      <input
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
      />
    </div>
  );
}
