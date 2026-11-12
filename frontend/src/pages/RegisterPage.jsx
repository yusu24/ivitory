import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  User,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLandingContent } from '../hooks/useBrandSettings';
import { registerSchema } from '../schemas/auth';

export default function RegisterPage() {
  const { register: doRegister } = useAuth();
  const { data: brandData } = useLandingContent();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

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
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values) => {
    setServerError('');
    setSuccessMessage('');

    if (!agreeTerms) {
      setServerError('Anda harus menyetujui Syarat & Ketentuan Layanan.');
      return;
    }

    try {
      await doRegister(values.name, values.email, values.password, values.password_confirmation);
      setSuccessMessage('Pendaftaran akun berhasil! Mengalihkan ke dashboard...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 500);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      setServerError(apiErrors ? Object.values(apiErrors).flat().join(' ') : 'Gagal mendaftar. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF8F5] font-sans-body selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Left Showcase Column */}
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
            <span>Mulai Dalam 5 Menit Gratis</span>
          </div>

          <h1 className="text-3xl xl:text-5xl font-extrabold tracking-tight leading-[1.18] mb-4 text-white">
            Buat Undangan Digital <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-rose-100">
              Impian Pernikahan Anda.
            </span>
          </h1>

          <p className="text-slate-300/90 text-sm xl:text-base leading-relaxed mb-8 font-light">
            Daftar sekarang untuk mengakses koleksi template mewah eksklusif, kelola daftar tamu tak terbatas, dan aktifkan amplop digital langsung ke rekening Anda.
          </p>

          {/* Floating Glassmorphism Mockup Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-widest text-purple-200/80 uppercase px-2.5 py-1 rounded-md bg-white/10 border border-white/15">
                Fitur Spesial Pengantin
              </span>
              <span className="text-xs text-purple-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                Siap Sebar
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Desain responsif mobile &amp; animasi kelopak bunga mekar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Kirim undangan personal per nama tamu via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Buku tamu digital real-time &amp; konfirmasi RSVP otomatis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300/80">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white text-xs">15,000+ Pengantin Telah Bergabung</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>4.9 / 5.0</span>
          </div>
          <div className="hidden xl:flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Garansi 100% Aman</span>
          </div>
        </div>
      </div>

      {/* 2. Right Form Column */}
      <div className="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center px-6 sm:px-12 lg:px-12 xl:px-16 py-10 relative overflow-hidden">
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
          <div className="lg:hidden mb-6 text-center">
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
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mulai Buat Undangan 🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Daftar akun gratis dan buat undangan digital yang siap dibagikan ke orang-orang tercinta.
            </p>
          </div>

          {/* Google One-Click Button */}
          <div className="mb-5">
            <button
              type="button"
              onClick={() => setGoogleNotice(true)}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-3 hover:border-slate-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Daftar dengan Akun Google</span>
            </button>
            {googleNotice && (
              <p className="mt-2 text-[11px] text-center text-purple-700 bg-purple-50 p-2 rounded-lg border border-purple-100">
                Fitur Google Sign-In sedang disiapkan. Silakan gunakan formulir pendaftaran di bawah.
              </p>
            )}

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                Atau Isi Formulir
              </span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>
          </div>

          {/* Alerts */}
          {serverError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-start gap-2 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Nama Lengkap Anda"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
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
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password_confirmation')}
                  placeholder="Ketik ulang kata sandi"
                  className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all shadow-2xs"
                />
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-purple-600 focus:ring-purple-400"
                />
                <span>
                  Saya menyetujui <span className="text-purple-700 font-semibold underline">Syarat &amp; Ketentuan</span> serta Kebijakan Privasi {siteName}.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-slate-900/15 hover:shadow-purple-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Mendaftarkan Akun...</span>
              ) : (
                <>
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4 text-purple-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer Login Link */}
          <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-200/80">
            <p>
              Sudah memiliki akun?{' '}
              <Link to="/login" className="text-purple-700 font-bold hover:underline">
                Masuk di sini ➔
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
