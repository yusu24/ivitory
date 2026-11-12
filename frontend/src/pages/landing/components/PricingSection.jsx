import { PRICING_PLANS } from '../data';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { usePackagesList } from '../../../hooks/usePackages';
import {
  getSavedPackageConfigs,
  inferPackageConfig,
} from '../../admin/dashboard/LandingTab';

export function mapBackendPackagesToDisplay(dbPackages) {
  if (!Array.isArray(dbPackages) || dbPackages.length === 0) {
    return PRICING_PLANS;
  }

  const savedConfigs = getSavedPackageConfigs();

  return dbPackages.map((pkg) => {
    const cfg = inferPackageConfig(pkg, savedConfigs);

    return {
      id: pkg.id,
      name: pkg.name,
      price: Number(pkg.price) || 0,
      originalPrice:
        Number(cfg.originalPrice) > 0 ? Number(cfg.originalPrice) : null,
      popular: Boolean(cfg.isPopular),
      badge: cfg.badge || null,
      description:
        pkg.description ||
        (pkg.duration_days
          ? `Masa aktif ${pkg.duration_days} hari untuk momen spesial Anda.`
          : 'Masa aktif selamanya tanpa batas waktu.'),
      features: Array.isArray(pkg.features) ? pkg.features : [],
      ctaText:
        cfg.ctaText ||
        (Number(pkg.price) === 0
          ? 'Coba Gratis Sekarang'
          : `Pilih ${pkg.name}`),
      limits: cfg,
    };
  });
}

export default function PricingSection({ onSelectPlan }) {
  const { data: dbPackages } = usePackagesList();
  const plans = mapBackendPackagesToDisplay(dbPackages);

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Tanpa Biaya Tersembunyi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Pilihan Paket Terjangkau
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Investasi sekali bayar tanpa langganan bulanan. Bebas pilih seluruh desain template untuk paket manapun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`glass-card rounded-[36px] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'bg-white/70 border-2 border-purple-400 shadow-2xl scale-[1.03] z-10'
                    : 'bg-white/35 border border-white/60'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-extrabold uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-serif-title italic text-slate-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans-body">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8 pb-6 border-b border-slate-200/60">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-bold text-slate-900 font-serif-title tracking-tight">
                        {plan.price === 0
                          ? 'Rp 0'
                          : `Rp ${plan.price.toLocaleString('id-ID')}`}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-medium font-sans-body">
                          Rp {plan.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium font-sans-body mt-1.5 block">
                      {plan.price === 0
                        ? 'Gratis • Langsung Aktif'
                        : 'Sekali Bayar • Bebas Pilih Semua Tema'}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-700 font-sans-body">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                    isPopular
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-purple-900/20'
                      : 'bg-white/80 hover:bg-white text-slate-800 border border-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/30 backdrop-blur-md border border-white/60 rounded-3xl p-6 text-center text-xs text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <p>
            Membutuhkan kustomisasi khusus seperti tema korporat atau event besar?{' '}
            <a href="#faq" className="text-purple-700 font-bold underline">
              Hubungi CS WhatsApp kami
            </a>{' '}
            untuk konsultasi gratis.
          </p>
        </div>
      </div>
    </section>
  );
}
