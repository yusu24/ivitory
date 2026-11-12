import { useState } from 'react';
import { FEATURES_DATA } from '../data';
import {
  UserCheck,
  Wallet,
  Music,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  Check,
  Play,
  Pause,
  Copy,
  ChevronRight,
} from 'lucide-react';

const FEATURE_ICONS = {
  UserCheck,
  Wallet,
  Music,
  MapPin,
  Image: ImageIcon,
  Sparkles,
};

export default function FeatureShowcase() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isPlayingDemoMusic, setIsPlayingDemoMusic] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);

  const activeFeature = FEATURES_DATA[activeFeatureIndex];

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-4 shadow-sm font-sans-body">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Fitur Masa Kini</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Semua yang Anda Butuhkan dalam 1 Link
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg leading-relaxed">
            Teknologi undangan digital modern yang memudahkan penyebaran, pencatatan tamu, hingga penerimaan hadiah
            secara instan.
          </p>
        </div>

        <div className="bg-white/35 backdrop-blur-2xl border border-white/60 rounded-[36px] p-5 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            {FEATURES_DATA.map((feat, idx) => {
              const isSelected = idx === activeFeatureIndex;
              const IconComponent = FEATURE_ICONS[feat.iconName] || Sparkles;
              const stepNum = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveFeatureIndex(idx)}
                  className={`group p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/95 border-purple-200/90 shadow-xl shadow-purple-900/5 scale-[1.015]'
                      : 'bg-white/45 hover:bg-white/75 border-white/60 hover:border-purple-100 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white shadow-md shadow-purple-900/20'
                            : 'bg-white/90 text-purple-700 border border-purple-100/80 shadow-2xs group-hover:bg-purple-50/80'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`font-serif-title italic text-xs font-bold ${
                              isSelected ? 'text-purple-700' : 'text-slate-400 group-hover:text-purple-500'
                            }`}
                          >
                            {stepNum}
                          </span>
                          <span className="text-slate-300 text-[10px]">•</span>
                          <span
                            className={`font-sans-body text-[10px] uppercase tracking-[0.18em] font-semibold truncate ${
                              isSelected ? 'text-purple-700' : 'text-purple-600/80'
                            }`}
                          >
                            {feat.tag}
                          </span>
                        </div>
                        <h3
                          className={`text-[17px] sm:text-lg font-serif-title font-semibold leading-snug tracking-[-0.01em] transition-colors ${
                            isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                          }`}
                        >
                          {feat.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'text-purple-600 translate-x-0.5 opacity-100'
                          : 'text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-slate-900/10 rounded-3xl p-6 sm:p-10 border border-white/80 min-h-[380px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/75 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-slate-700 border border-white/80 font-sans-body shadow-2xs">
              Interactive Demo
            </div>

            {activeFeature.previewType === 'rsvp' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-purple-600 font-semibold block font-sans-body">
                      Real-Time Attendance
                    </span>
                    <span className="font-serif-title font-semibold text-slate-900 text-lg">
                      Dashboard Rekap Tamu
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1 rounded-full font-sans-body">
                    ● Live Sync
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="bg-purple-50/80 p-3 rounded-xl border border-purple-100">
                    <span className="text-2xl font-bold font-serif-title italic text-purple-950 block">128</span>
                    <span className="text-[10px] text-purple-700 uppercase tracking-wider font-semibold font-sans-body">
                      Hadir
                    </span>
                  </div>
                  <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100">
                    <span className="text-2xl font-bold font-serif-title italic text-amber-950 block">14</span>
                    <span className="text-[10px] text-amber-700 uppercase tracking-wider font-semibold font-sans-body">
                      Ragu
                    </span>
                  </div>
                  <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-100">
                    <span className="text-2xl font-bold font-serif-title italic text-rose-950 block">5</span>
                    <span className="text-[10px] text-rose-700 uppercase tracking-wider font-semibold font-sans-body">
                      Absen
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1 font-sans-body">
                  Tamu langsung masuk ke sistem rekap tanpa perlu dicatat manual. Anda dapat mengunduh rekap
                  PDF/Excel dengan 1 klik.
                </p>
              </div>
            )}

            {activeFeature.previewType === 'gift' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-100/80 border border-amber-200/60 flex items-center justify-center text-amber-700">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-title font-semibold text-slate-900 text-lg leading-tight">
                      Amplop Digital BCA
                    </h4>
                    <p className="text-xs text-slate-500 font-sans-body mt-0.5">8820-4910-22 a.n Rian Pratama</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('8820491022');
                    setCopiedDemo(true);
                    setTimeout(() => setCopiedDemo(false), 2000);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold font-sans-body rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  {copiedDemo ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDemo ? 'Nomor Rekening Tersalin!' : 'Uji Salin Nomor Rekening'}</span>
                </button>
              </div>
            )}

            {activeFeature.previewType === 'music' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mx-auto flex items-center justify-center text-white shadow-xl">
                  <Music className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif-title italic font-semibold text-slate-900 text-lg">
                    A Thousand Years (Piano)
                  </h4>
                  <p className="text-xs text-slate-500 font-sans-body mt-0.5">Preset Audio Romantis Invitory</p>
                </div>
                <button
                  onClick={() => setIsPlayingDemoMusic(!isPlayingDemoMusic)}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold font-sans-body rounded-full text-xs inline-flex items-center gap-2 shadow-md transition-all"
                >
                  {isPlayingDemoMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlayingDemoMusic ? 'Jeda Audio' : 'Uji Pemutar Musik'}</span>
                </button>
              </div>
            )}

            {activeFeature.previewType === 'maps' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif-title font-semibold text-slate-900 text-lg leading-tight">
                      Grand Ballroom Hotel Mulia
                    </h4>
                    <p className="text-xs text-slate-500 font-sans-body mt-0.5">
                      Jl. Asia Afrika No.6, Senayan, Jakarta Pusat
                    </p>
                  </div>
                </div>
                <div className="h-28 rounded-xl bg-slate-200 overflow-hidden relative border flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400"
                    alt="Map mockup"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <span className="absolute bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold font-sans-body text-slate-800 shadow-md">
                    📍 Pin GPS Presisi
                  </span>
                </div>
              </div>
            )}

            {activeFeature.previewType === 'gallery' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-5 shadow-2xl text-left space-y-3">
                <span className="text-base font-serif-title italic font-semibold text-slate-900 block">
                  Slide Foto Pre-Wedding
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border border-white" alt="Slide 1" />
                  <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border border-white" alt="Slide 2" />
                  <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border border-white" alt="Slide 3" />
                </div>
              </div>
            )}

            {activeFeature.previewType === 'filter' && (
              <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-center space-y-3">
                <Sparkles className="w-8 h-8 text-pink-500 mx-auto" />
                <h4 className="font-serif-title italic font-semibold text-slate-900 text-lg">
                  Custom Instagram Story Filter
                </h4>
                <p className="text-xs text-slate-500 font-sans-body leading-relaxed">
                  Frame foto elegan senada dengan tema undangan untuk tamu saat hadir di pesta.
                </p>
              </div>
            )}

            <div className="mt-6 max-w-md text-slate-700 text-xs sm:text-sm font-sans-body leading-relaxed">
              {activeFeature.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
