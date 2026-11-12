import { Sparkles, Palette, Edit3, Share2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenCreateModal }) {
  const steps = [
    {
      stepNumber: '01',
      title: 'Pilih Tema Undangan',
      description: 'Pilih dari belasan desain frosted glass eksklusif yang dirancang khusus untuk pernikahan, ulang tahun, atau syukuran.',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
    },
    {
      stepNumber: '02',
      title: 'Isi Informasi & Foto',
      description: 'Masukkan nama pengantin, tanggal, lokasi acara, lagu pilihan, galeri foto, hingga nomor rekening amplop digital.',
      icon: Edit3,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      stepNumber: '03',
      title: 'Sebar via WhatsApp / QR',
      description: 'Gunakan fitur auto-generate pesan WhatsApp dengan nama tamu kustom atau bagikan kode QR unik secara instan.',
      icon: Share2,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 relative bg-gradient-to-b from-transparent via-purple-50/30 to-transparent">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Mudah & Cepat</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Cara Mudah Membuat Undangan Digital
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Tanpa perlu skill coding atau desain. Undangan siap disebarkan hanya dalam 3 langkah mudah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.stepNumber} className="glass-card glass-card-hover rounded-[32px] p-8 text-left flex flex-col justify-between relative group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} p-0.5 shadow-lg shadow-purple-500/20`}>
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-slate-800">
                        <Icon className="w-6 h-6 text-slate-800" />
                      </div>
                    </div>
                    <span className="text-3xl font-extrabold font-serif-title italic text-purple-300">{step.stepNumber}</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif-title italic text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans-body">{step.description}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-xs font-bold text-purple-700">
                  <span>Langkah {idx + 1} Selesai</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
