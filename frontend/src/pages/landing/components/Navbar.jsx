import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Heart,
  LogOut,
  ChevronDown,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useLandingContent } from '../../../hooks/useBrandSettings';

export default function Navbar({ onOpenCreateModal }) {
  const { user, logout } = useAuth();
  const { data: brandData, isLoading: brandLoading } = useLandingContent();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const siteName = brandData?.site_name || 'Invitory';
  const logoUrl = brandData?.logo_url;
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setLogoError(false);
  }, [logoUrl]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 sm:px-8 py-3.5 flex items-center justify-between ${
          scrolled
            ? 'bg-white/60 backdrop-blur-2xl border border-white/80 shadow-lg shadow-purple-900/5'
            : 'bg-white/30 backdrop-blur-md border border-white/40 shadow-sm'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group min-h-[36px]">
          {brandLoading && !brandData ? (
            <div className="h-9 w-28 rounded-lg bg-slate-200/50 animate-pulse" />
          ) : logoUrl && !logoError ? (
            <img
              src={logoUrl}
              alt={siteName}
              onError={() => setLogoError(true)}
              className="h-9 sm:h-10 w-auto max-w-[180px] object-contain group-hover:scale-105 transition-transform"
            />
          ) : (
            <>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
                  <Sparkles className="w-4 h-4 fill-purple-200 text-purple-600" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 font-sans">
                {siteName}<span className="text-purple-500 font-serif italic">.</span>
              </span>
            </>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-widest">
          <a href="#templates" className="hover:text-purple-600 transition-colors">Templates</a>
          <a href="#live-studio" className="hover:text-purple-600 transition-colors flex items-center gap-1">
            <span>Demo Live</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </a>
          <a href="#features" className="hover:text-purple-600 transition-colors">Fitur</a>
          <a href="#pricing" className="hover:text-purple-600 transition-colors">Harga</a>
          <a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a>
        </nav>

        <div className="hidden sm:flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="px-3.5 py-1.5 bg-white/80 hover:bg-white text-slate-800 rounded-full text-xs font-semibold shadow-sm border border-slate-200/80 flex items-center gap-2 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-xl p-2 z-50 text-xs">
                  <div className="p-2.5 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-slate-800 truncate">{user.name}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                          user.role === 'superadmin'
                            ? 'bg-purple-100 text-purple-700'
                            : user.role === 'admin'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {user.role === 'superadmin'
                          ? 'Super Admin'
                          : user.role === 'admin'
                          ? 'Admin'
                          : 'Pengguna'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="py-1">
                    {user.role === 'superadmin' || user.role === 'admin' ? (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold flex items-center gap-2 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span>
                          {user.role === 'superadmin'
                            ? 'Panel Super Admin'
                            : 'Admin Dashboard'}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold flex items-center gap-2 transition-colors mb-1"
                        >
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span>Dashboard Undangan Saya</span>
                        </Link>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenCreateModal();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-medium flex items-center gap-2 transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span>Buat Undangan Baru</span>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-slate-700 hover:text-purple-600 text-xs font-semibold rounded-full hover:bg-white/50 transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-500" />
                <span>Masuk</span>
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 border border-purple-400/30"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Gratis</span>
              </Link>
            </div>
          )}

        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-purple-600 rounded-full bg-white/40 border border-white/60"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 flex flex-col gap-4">
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Pilihan Template</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-bold">12+ Tema</span>
          </a>
          <a
            href="#live-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Live Interactive Preview</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100"
          >
            Fitur Unggulan
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100"
          >
            Paket Harga & Promo
          </a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">
            Tanya Jawab (FAQ)
          </a>

          {user ? (
            <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
              {user.role === 'superadmin' || user.role === 'admin' ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl"
                >
                  {user.role === 'superadmin' ? 'Panel Super Admin' : 'Admin Dashboard'}
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl"
                >
                  Dashboard Undangan Saya
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Gratis</span>
              </Link>
            </div>
          )}

          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Buat Undangan Digital Sekarang</span>
          </Link>
        </div>
      )}
    </header>
  );
}
