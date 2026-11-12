import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTemplatesList } from '../../../hooks/useTemplates';
import { usePackagesList } from '../../../hooks/usePackages';
import { mapBackendPackagesToDisplay } from './PricingSection';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function CreateOrderModal({
  isOpen,
  onClose,
  initialTemplate,
  initialPlan,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { data: dbTemplates } = useTemplatesList();
  const { data: dbPackages } = usePackagesList();
  const plans = mapBackendPackagesToDisplay(dbPackages);

  const [groom, setGroom] = useState('');
  const [bride, setBride] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-24');
  const [selectedThemeId, setSelectedThemeId] = useState(
    initialTemplate?.id || null
  );
  const [selectedPlanId, setSelectedPlanId] = useState(
    initialPlan?.id || plans[1]?.id || plans[0]?.id || 'plan-gold'
  );

  useEffect(() => {
    if (initialTemplate?.id) setSelectedThemeId(initialTemplate.id);
  }, [initialTemplate]);

  useEffect(() => {
    if (initialPlan?.id) setSelectedPlanId(initialPlan.id);
  }, [initialPlan]);

  if (!isOpen) return null;

  const homeLink =
    user?.role === 'superadmin' || user?.role === 'admin'
      ? '/admin'
      : '/dashboard';

  const handleFinishCreation = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        'invitory_pending_order_draft',
        JSON.stringify({
          groom,
          bride,
          eventDate,
          selectedThemeId,
          selectedPlanId,
          savedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore storage errors
    }
    onClose();
    navigate(user ? homeLink : '/register');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-white rounded-[36px] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              {step}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm font-sans-body">
                {step === 1 && 'Data Undangan'}
                {step === 2 && 'Pilih Paket & Tema'}
              </h3>
              <p className="text-[10px] text-slate-500">Langkah {step} dari 2</p>
            </div>
          </div>

          <div className="flex gap-1">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-6 h-1.5 rounded-full ${
                  s <= step ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Pria / Mempelai 1
                </label>
                <input
                  type="text"
                  required
                  value={groom}
                  onChange={(e) => setGroom(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Wanita / Mempelai 2
                </label>
                <input
                  type="text"
                  required
                  value={bride}
                  onChange={(e) => setBride(e.target.value)}
                  placeholder="Contoh: Anindya Putri"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Hari Bahagia
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Pilih Tema &amp; Paket</span>
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleFinishCreation} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Pilih Tema Desain (Bebas Semua Paket)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(dbTemplates || []).slice(0, 4).map((tmpl) => (
                  <button
                    type="button"
                    key={tmpl.id}
                    onClick={() => setSelectedThemeId(tmpl.id)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      selectedThemeId === tmpl.id
                        ? 'bg-purple-900 text-white border-purple-900 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="truncate pr-2">{tmpl.name}</span>
                    {selectedThemeId === tmpl.id && (
                      <Check className="w-4 h-4 text-purple-300 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Pilih Paket Fitur Layanan
              </label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <button
                    type="button"
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between cursor-pointer ${
                      selectedPlanId === plan.id
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">
                        {plan.name}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {plan.description}
                      </span>
                    </div>
                    <span className="font-extrabold text-xs text-purple-900">
                      {plan.price === 0
                        ? 'Gratis'
                        : `Rp ${plan.price.toLocaleString('id-ID')}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl cursor-pointer"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>
                  {user
                    ? 'Lanjutkan di Dashboard'
                    : 'Buat Akun & Terbitkan Undangan'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
