import { useState } from 'react';
import { useTemplatesList } from '../../../hooks/useTemplates';
import { TEMPLATE_SHOWCASE_META } from '../../../lib/sampleInvitation';
import { Sparkles, Eye, Heart, Search, Printer } from 'lucide-react';
import { hasPhysicalPrintSuite } from '../../../templates/printSuiteRegistry';

export default function TemplateGallery({ onSelectTemplate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: dbTemplates, isLoading } = useTemplatesList();

  const fallbackTemplates = [
    {
      id: 7,
      name: 'Rosé Jardin 3D',
      slug: 'floral-3d',
      description: TEMPLATE_SHOWCASE_META['floral-3d'].description,
      price: 0,
    },
    {
      id: 1,
      name: 'Atelier Line-Art',
      slug: 'monochrome-lineart',
      description: TEMPLATE_SHOWCASE_META['monochrome-lineart'].description,
      price: 0,
    },
    {
      id: 2,
      name: 'Terra Botanica',
      slug: 'boho-terracotta',
      description: TEMPLATE_SHOWCASE_META['boho-terracotta'].description,
      price: 0,
    },
    {
      id: 6,
      name: 'Lumina Glass',
      slug: 'dewanakl-ulems',
      description: TEMPLATE_SHOWCASE_META['dewanakl-ulems'].description,
      price: 0,
    },
    {
      id: 3,
      name: 'Royal Mocha',
      slug: 'elegant-brown',
      description: TEMPLATE_SHOWCASE_META['elegant-brown'].description,
      price: 0,
    },
    {
      id: 5,
      name: 'Ivory Garden',
      slug: 'classic',
      description: TEMPLATE_SHOWCASE_META.classic.description,
      price: 0,
    },
  ];

  // Strictly follow templates activated by Super Admin (fallback to 6 themes only if API is unreachable)
  const rawTemplates =
    Array.isArray(dbTemplates) && dbTemplates.length > 0
      ? dbTemplates
      : fallbackTemplates.slice(0, 6);

  // Enrich each template with clean short name, style badge, and dummy couple label
  const activeTemplates = rawTemplates.map((tmpl) => {
    const meta = TEMPLATE_SHOWCASE_META[tmpl.slug];
    return {
      ...tmpl,
      displayName: meta?.cleanName || tmpl.name,
      styleBadge: meta?.styleBadge || 'Pernikahan',
      coupleLabel: meta?.coupleLabel || 'Pasangan Mempelai',
      eventCity: meta?.eventCity || 'Indonesia',
      displayDescription: meta?.description || tmpl.description || 'Tema elegan untuk momen spesial Anda.',
    };
  });

  const filteredTemplates = activeTemplates.filter((tmpl) => {
    const q = searchQuery.toLowerCase();
    return (
      tmpl.displayName.toLowerCase().includes(q) ||
      tmpl.styleBadge.toLowerCase().includes(q) ||
      tmpl.coupleLabel.toLowerCase().includes(q) ||
      tmpl.displayDescription.toLowerCase().includes(q)
    );
  });

  return (
    <section id="templates" className="py-20 sm:py-28 px-4 sm:px-8 relative bg-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-md border border-white/70 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 mb-4 shadow-sm font-sans-body">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Koleksi Eksklusif 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Pilih Tema Undangan Favorit Anda
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Pratinjau langsung tampilan halaman sampul undangan beserta data contoh mempelai di setiap kartu.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            <button className="px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap bg-slate-900 text-white shadow-md">
              Semua Tema ({activeTemplates.length})
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tema (mis: Atelier, Jawa, Boho)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-white/80 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
            />
          </div>
        </div>

        {isLoading && <p className="text-center py-8 text-slate-500">Memuat template...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const iframeSrc = `/preview-template/${template.slug}?embed=1&cover=1`;
            const hasPrintSuite = hasPhysicalPrintSuite(template.slug);

            return (
              <div
                key={template.id}
                className="glass-card glass-card-hover rounded-[32px] overflow-hidden flex flex-col justify-between group border border-white/70"
              >
                {/* Initial Cover Viewport (Static Cover Preview) */}
                <div className="relative h-88 overflow-hidden bg-slate-900">
                  <div
                    className="absolute top-0 left-0 pointer-events-none overflow-hidden origin-top-left"
                    style={{
                      width: '153.85%',
                      height: '153.85%',
                      transform: 'scale(0.65)',
                    }}
                  >
                    <iframe
                      key={template.slug}
                      src={iframeSrc}
                      loading="lazy"
                      title={template.displayName}
                      tabIndex={-1}
                      className="w-full h-full block border-0 pointer-events-none select-none bg-white"
                    />
                  </div>

                  {/* Subtle bottom gradient for readable couple badge */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent pointer-events-none" />

                  {/* Top-Left Style & Price Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-800 shadow-sm border border-white">
                      {template.styleBadge}
                    </span>
                    {template.price === 0 && (
                      <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold shadow-md">
                        Gratis
                      </span>
                    )}
                    {hasPrintSuite && (
                      <span className="px-2.5 py-1 bg-zinc-900/90 text-white rounded-full text-[10px] font-semibold border border-white/20 shadow-md inline-flex items-center gap-1">
                        <Printer className="w-2.5 h-2.5 text-purple-300" />
                        <span>+ Cetak Fisik</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom-Left Real Dummy Couple Info */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 z-10 pointer-events-none">
                    <div className="min-w-0">
                      <span className="text-[9.5px] text-white/80 uppercase font-semibold tracking-[0.18em] block font-sans-body">
                        Demo Mempelai • {template.eventCity}
                      </span>
                      <p className="text-white font-serif-title text-xl font-bold italic truncate drop-shadow-xs">
                        {template.coupleLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Info & Actions */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white/60 backdrop-blur-md">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-2xl font-bold font-serif-title italic text-slate-900 leading-tight">
                        {template.displayName}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans-body line-clamp-2">
                      {template.displayDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2.5">
                    <button
                      onClick={() =>
                        onSelectTemplate({
                          ...template,
                          name: template.displayName,
                        })
                      }
                      className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span>Gunakan Tema</span>
                      <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300 group-hover/btn:scale-125 transition-transform" />
                    </button>

                    {hasPrintSuite && (
                      <a
                        href={`/preview-template/${template.slug}?mode=print`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white/85 hover:bg-white text-slate-800 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs"
                        title="Lihat Versi Cetak Fisik"
                      >
                        <Printer className="w-4 h-4 text-purple-700" />
                      </a>
                    )}

                    <a
                      href={`/preview-template/${template.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/85 hover:bg-white text-slate-800 border border-slate-200/80 rounded-2xl transition-colors shadow-2xs"
                      title="Lihat Pratinjau Langsung Layar Penuh"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white/30 rounded-3xl border border-white/50">
            <p className="text-slate-600 font-semibold mb-2">
              Tema tidak ditemukan untuk pencarian &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-purple-700 font-bold underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
