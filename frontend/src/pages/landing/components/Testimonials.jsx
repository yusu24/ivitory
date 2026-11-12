import { Star, Sparkles, Quote } from 'lucide-react';
import { getSavedTestimonials } from '../../admin/dashboard/LandingTab';

export default function Testimonials() {
  const visibleTestimonials = getSavedTestimonials().filter(
    (item) => item.isVisible !== false
  );

  if (visibleTestimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 relative bg-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Kisah Bahagia</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Dipercaya Oleh Ribuan Pasangan
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Dengar cerita mereka yang telah membagikan momen bahagia secara elegan bersama Invitory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-[32px] p-8 flex flex-col justify-between relative group hover:scale-[1.02] transition-all"
            >
              <Quote className="w-8 h-8 text-purple-200 absolute top-6 right-6 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic font-sans-body mb-6">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
                <img
                  src={
                    item.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
                  }
                  alt={item.coupleName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h3 className="font-bold text-slate-800 text-sm font-sans-body">
                    {item.coupleName}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {item.eventType} •{' '}
                    <span className="text-purple-600 font-semibold">
                      {item.templateUsed}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
