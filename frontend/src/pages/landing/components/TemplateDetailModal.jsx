import { X, CheckCircle2, Heart, Music, Calendar, MapPin, Eye } from 'lucide-react';

export default function TemplateDetailModal({ template, onClose, onUseTemplate }) {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white rounded-[36px] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden bg-slate-900">
          {template.thumbnail_url ? (
            <img src={template.thumbnail_url} alt={template.name} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <iframe
                src={`/preview-template/${template.slug}?embed=1&cover=1`}
                className="w-full h-[800px] border-none"
                title={template.name}
                tabIndex={-1}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/40 mb-2 inline-block">
              Pernikahan
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-title italic font-bold">{template.name}</h3>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-slate-600 text-sm font-sans-body leading-relaxed">{template.description || 'Tema elegan untuk momen spesial Anda.'}</p>

          <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-4 space-y-2 text-xs text-purple-950">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Music className="w-4 h-4 text-purple-600" />
              <span>Lagu Latar Default: Instrumental Romantis</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Contoh Acara: Nama Pria & Nama Wanita</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>Lokasi Acara</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Fitur Termasuk di Tema Ini</h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
              {['RSVP Real-Time & Rekap', 'Amplop Digital QRIS/Bank', 'Countdown Timer Acara', 'Google Maps Navigasi', 'Lagu Latar Auto-Play', 'Galeri Photo Slide'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onUseTemplate(template);
                onClose();
              }}
              className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
              <span>Gunakan Tema Ini</span>
            </button>
            {template.slug && (
              <a
                href={`/preview-template/${template.slug}`}
                target="_blank"
                rel="noreferrer"
                className="py-4 px-6 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-sm rounded-2xl flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Pratinjau</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
