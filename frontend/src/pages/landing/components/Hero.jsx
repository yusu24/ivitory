import { Link } from 'react-router-dom';
import { Sparkles, Play, ArrowRight, CheckCircle2, Star, Heart, ShieldCheck } from 'lucide-react';

export default function Hero({ onScrollToStudio }) {
  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 px-4 sm:px-8 flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#FFE1E1] rounded-full blur-[120px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#E2EAFB] rounded-full blur-[130px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-[25%] right-[10%] w-[350px] h-[350px] bg-[#FDFCF0] rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute top-[45%] left-[12%] w-[300px] h-[300px] bg-[#E8D5C4]/40 rounded-full blur-[110px] opacity-50 pointer-events-none"></div>

      <div className="hidden lg:block absolute top-[28%] left-[6%] w-14 h-14 bg-white/40 border border-white/60 rounded-full backdrop-blur-md shadow-lg pointer-events-none flex items-center justify-center">
        <Heart className="w-6 h-6 text-pink-400 fill-pink-100" />
      </div>
      <div className="hidden lg:block absolute bottom-[22%] left-[12%] w-10 h-10 bg-[#C8A2C8]/25 border border-white/60 rounded-full backdrop-blur-md shadow-md pointer-events-none flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-purple-600" />
      </div>
      <div className="hidden lg:block absolute top-[22%] right-[8%] w-16 h-16 bg-white/30 border border-white/50 rounded-full backdrop-blur-xl shadow-xl pointer-events-none flex items-center justify-center">
        <span className="text-xl">💍</span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="mb-6 px-4 sm:px-5 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.25em] text-slate-600 font-bold shadow-sm inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span>Digital Invitation Platform #1 Indonesia</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[0.98] font-serif-title italic text-slate-800 mb-6 tracking-tight">
          Your Story, <br className="hidden sm:inline" />
          <span className="font-sans-body not-italic font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-purple-950 to-slate-800">
            Beautifully Shared.
          </span>
        </h1>

        <p className="max-w-2xl text-slate-600 text-base sm:text-lg md:text-xl mb-10 leading-relaxed font-sans-body">
          Buat momen pernikahan & acara istimewa Anda tak terlupakan dengan undangan digital yang{' '}
          <span className="font-semibold text-purple-900 underline decoration-purple-300 underline-offset-4">
            elegan, interaktif
          </span>
          , dan siap disebar dalam 5 menit.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-2xl shadow-slate-900/20 hover:shadow-purple-900/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 border border-slate-700/60"
          >
            <span>Mulai Desain Undangan</span>
            <ArrowRight className="w-5 h-5 text-purple-300" />
          </Link>

          <button
            onClick={onScrollToStudio}
            className="w-full sm:w-auto px-8 py-4 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl font-bold text-base text-slate-800 shadow-lg shadow-purple-900/5 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
              <Play className="w-3.5 h-3.5 fill-purple-700 ml-0.5" />
            </div>
            <span>Lihat Demo Interactive</span>
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white/25 backdrop-blur-2xl border border-white/50 rounded-[32px] sm:rounded-[40px] shadow-2xl p-6 sm:p-10 text-left flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex-1 z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center text-white text-base shadow-md">
                ✨
              </div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-white/60">
                Featured Theme 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-title italic text-slate-800 mb-2">The Ethereal Garden</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans-body">
              Estetika floral lembut transparan dengan efek animasi kelopak mekar, lagu latar romantis, dan sistem
              RSVP digital otomatis.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>RSVP & Amplop Digital</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-xl border border-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Custom Music & Maps</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-72 grid grid-cols-2 gap-3 z-10">
            <div className="h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-pink-100/90 to-rose-200/80 border border-white/80 p-4 flex flex-col justify-between shadow-md relative overflow-hidden hover:scale-105 transition-transform">
              <div className="w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-xs">
                💐
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-800/80 uppercase tracking-widest block">
                  Pernikahan
                </span>
                <span className="text-xs font-bold text-slate-800 font-serif-title">Rian & Anindya</span>
              </div>
            </div>

            <div className="h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-indigo-100/90 to-purple-200/80 border border-white/80 p-4 flex flex-col justify-between shadow-md relative overflow-hidden hover:scale-105 transition-transform mt-4 sm:mt-6">
              <div className="w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-xs">
                🎂
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-800/80 uppercase tracking-widest block">
                  Sweet 17th
                </span>
                <span className="text-xs font-bold text-slate-800 font-sans-body">Kayla Party</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full max-w-4xl py-6 px-8 bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-sans-body">15,000+</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Undangan Terbuat</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-sans-body flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Kepuasan Pengguna</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-sans-body">5 Menit</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Proses Pembuatan</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-sans-body flex items-center justify-center gap-1 text-emerald-700">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>100%</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mt-1">Aman & Tanpa Iklan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
