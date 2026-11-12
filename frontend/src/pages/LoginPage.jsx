import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  Heart,
  Star,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLandingContent } from '../hooks/useBrandSettings';
import { loginSchema } from '../schemas/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const { data: brandData } = useLandingContent();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const siteName = brandData?.site_name || 'Invitory';
  const logoUrl = brandData?.logo_url;
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setLogoError(false);
  }, [logoUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const loggedInUser = await login(values.email, values.password);
      setSuccessMessage('Selamat datang kembali! Mengalihkan ke dashboard...');
      const isAdminUser =
        loggedInUser?.role === 'superadmin' || loggedInUser?.role === 'admin';
      const homeLink = isAdminUser ? '/admin' : '/dashboard';
      setTimeout(() => {
        navigate(homeLink, { replace: true });
      }, 500);
    } catch (err) {
      setServerError(
        err.response?.data?.errors?.email?.[0] ??
          err.response?.data?.message ??
          'Gagal masuk. Periksa kembali email dan kata sandi Anda.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF8F5] font-sans-body selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Left Showcase Column (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-12 xl:p-16 flex-col justify-between">
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] bg-purple-600/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            {logoUrl && !logoError ? (
              <img
                src={logoUrl}
                alt={siteName}
                onError={() => setLogoError(true)}
                className="h-10 w-auto max-w-[180px] object-contain brightness-0 invert"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-900/90 rounded-[10px] flex items-center justify-center text-purple-300">
                    <Sparkles className="w-5 h-5 fill-purple-400/20 text-purple-300" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight text-white block">
                    {siteName}
                    <span className="text-purple-400 font-serif italic">.</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-purple-200/60 font-semibold block">
                    Digital Invitation Suite
                  </span>
                </div>
              </>
            )}
          </Link>
        </div>

        {/* Middle Value Proposition & Mockup Card */}
        <div className="relative z-10 my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-purple-200 tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Digital Invitation Platform #1</span>
          </div>

          <h1 className="text-3xl xl:text-5xl font-extrabold tracking-tight leading-[1.18] mb-4 text-white">
            Momen Bahagiamu, <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-rose-100">
              Dibagikan Sempurna.
            </span>
          </h1>

          <p className="text-slate-300/90 text-sm xl:text-base leading-relaxed mb-8 font-light">
            Buat undangan pernikahan digital yang memukau dalam 5 menit. Kelola ribuan tamu, RSVP real-time, buku tamu interaktif, dan amplop digital aman dalam satu platform.
          </p>

          {/* Floating Glassmorphism Mockup Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-widest text-purple-200/80 uppercase px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                The Ethereal Garden Edition
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Undangan
              </span>
            </div>

            <div className="mb-4">
              <p className="font-serif italic text-2xl font-bold text-white tracking-wide">
                Rian &amp; Anindya
              </p>
              <p className="text-xs text-slate-300/80 mt-1">
                Sabtu, 24 Oktober 2026 • Grand Ballroom Jakarta
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/10 text-center">
              <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                <p className="text-xs font-bold text-white">142</p>
                <p className="text-[10px] text-purple-200/70">Tamu RSVP</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                <p className="text-xs font-bold text-white">89</p>
                <p className="text-[10px] text-purple-200/70">Doa &amp; Pesan</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2 border border-white/10">
                <p className="text-xs font-bold text-emerald-300">Aktif</p>
                <p className="text-[10px] text-purple-200/70">Amplop Digital</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold ring-2 ring-slate-900">R</span>
              <span className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-[10px] font-bold ring-2 ring-slate-900">A</span>
              <span className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold ring-2 ring-slate-900">D</span>
            </div>
            <span className="font-medium text-white text-xs">15,000+ Pengantin Bahagia</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>4.9 / 5.0</span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Tanpa Iklan</span>
          </div>
        </div>
      </div>

      {/* 2. Right Form Column */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center px-6 sm:px-12 lg:px-12 xl:px-16 py-12 relative overflow-hidden">
        {/* Soft Ambient Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#FFE1E1] rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#E2EAFB] rounded-full blur-[100px] opacity-60 pointer-events-none" />

        {/* Floating Back Button */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-2xs transition-all hover:shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto relative z-10">
          {/* Mobile Logo Only */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={siteName}
                  className="h-10 w-auto max-w-[160px] object-contain mx-auto"
                />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-md shadow-purple-500/20">
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-purple-600">
                      <Sparkles className="w-4 h-4 fill-purple-100 text-purple-600" />
                    </div>
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    {siteName}
                    <span className="text-purple-500 font-serif italic">.</span>
                  </span>
                </>
              )}
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang Kembali 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Masuk ke akun Anda untuk melanjutkan pengelolaan undangan dan melihat ucapan tamu.
            </p>
          </div>

          {/* Google One-Click Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setGoogleNotice(true)}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-3 hover:border-slate-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Lanjutkan dengan Akun Google</span>
            </button>
            {googleNotice && (
              <p className="mt-2 text-[11px] text-center text-purple-700 bg-purple-50 p-2 rounded-lg border border-purple-100">
                Fitur Google Sign-In sedang disiapkan. Silakan masuk menggunakan email &amp; kata sandi Anda.
              </p>
            )}

            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Atau dengan Email
              </span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>
          </div>

          {/* Alerts */}
          {serverError && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-start gap-2.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="contoh: nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => setForgotNotice((v) => !v)}
                  className="text-[11px] text-purple-700 font-semibold hover:underline cursor-pointer"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.password.message}
                </p>
              )}
              {forgotNotice && (
                <p className="mt-2 text-[11px] text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  Untuk reset kata sandi, silakan hubungi tim dukungan kami atau administrator di support@invitory.com.
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 font-medium cursor-pointer">
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-slate-900/15 hover:shadow-purple-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4 text-purple-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer Register Link */}
          <div className="mt-8 text-center text-xs text-slate-500 pt-6 border-t border-slate-200/80">
            <p>
              Belum memiliki akun {siteName}?{' '}
              <Link to="/register" className="text-purple-700 font-bold hover:underline">
                Daftar Gratis Sekarang ➔
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
