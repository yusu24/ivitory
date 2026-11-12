import { useEffect, useState } from 'react';
import { Sparkles, Heart, MessageCircle, ArrowUp } from 'lucide-react';
import { useLandingContent } from '../../../hooks/useBrandSettings';
import { getSavedFooterSettings } from '../../admin/dashboard/LandingTab';

export default function Footer() {
  const { data: brandData } = useLandingContent();
  const siteName = brandData?.site_name || 'Invitory';
  const logoUrl = brandData?.logo_url;
  const [logoError, setLogoError] = useState(false);
  const [footerSettings, setFooterSettings] = useState(getSavedFooterSettings);

  useEffect(() => {
    setLogoError(false);
  }, [logoUrl]);

  useEffect(() => {
    const syncFooter = () => setFooterSettings(getSavedFooterSettings());
    window.addEventListener('storage', syncFooter);
    window.addEventListener('invitory:footer-updated', syncFooter);
    return () => {
      window.removeEventListener('storage', syncFooter);
      window.removeEventListener('invitory:footer-updated', syncFooter);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl = `https://wa.me/${
    footerSettings.whatsappNumber || '6281234567890'
  }?text=${encodeURIComponent(
    footerSettings.whatsappMessage ||
      'Halo kak, saya ingin tanya mengenai undangan digital'
  )}`;

  const showFloatingWa = footerSettings.showFloatingWa !== false;

  return (
    <>
      <footer className="relative z-10 pt-16 pb-12 px-4 sm:px-8 border-t border-white/40 bg-white/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left space-y-3 max-w-sm">
            <a href="#" className="inline-flex items-center gap-2 group">
              {logoUrl && !logoError ? (
                <img
                  src={logoUrl}
                  alt={siteName}
                  onError={() => setLogoError(true)}
                  className="h-9 sm:h-10 w-auto max-w-[180px] object-contain"
                />
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-rose-400 p-0.5 shadow-md">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-slate-800 font-sans">
                    {siteName}
                    <span className="text-purple-500 font-serif italic">.</span>
                  </span>
                </>
              )}
            </a>
            <p className="text-xs text-slate-500 font-sans-body leading-relaxed">
              {footerSettings.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 uppercase tracking-widest">
            <a href="#templates" className="hover:text-purple-600 transition-colors">
              Templates
            </a>
            <a href="#live-studio" className="hover:text-purple-600 transition-colors">
              Demo Live
            </a>
            <a href="#features" className="hover:text-purple-600 transition-colors">
              Fitur
            </a>
            <a href="#pricing" className="hover:text-purple-600 transition-colors">
              Paket Harga
            </a>
            <a href="#faq" className="hover:text-purple-600 transition-colors">
              FAQ
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3.5 bg-white/80 hover:bg-white text-slate-700 rounded-2xl border border-white/80 shadow-md transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-4 h-4 text-purple-600" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{footerSettings.copyrightText}</p>
          <p className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{footerSettings.bottomTagline}</span>
          </p>
        </div>
      </footer>

      {/* Floating CS WhatsApp Button (placed OUTSIDE footer backdrop-blur so it truly floats on the viewport while scrolling) */}
      {showFloatingWa && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-600/30 flex items-center gap-2.5 text-xs font-bold transition-all hover:-translate-y-1 hover:scale-105 group border border-emerald-400"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping" />
          </div>
          <span className="hidden sm:inline">
            {footerSettings.whatsappLabel || 'Tanya CS WhatsApp'}
          </span>
        </a>
      )}
    </>
  );
}
