import Reveal from '../components/Reveal';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="section-story" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">
        Kisah Kasih Kita
      </h2>

      <div className="relative ml-4 space-y-12 border-l border-amber-500/20 md:ml-32">
        {items.map((item, idx) => {
          const year = item.item_date ? new Date(`${item.item_date}T00:00:00`).getFullYear() : null;
          return (
            <Reveal key={item.id} delay={Math.min(idx * 0.1, 0.4)} className="relative pl-8">
              <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-amber-500 bg-stone-950">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              </div>

              {year && (
                <div className="absolute -left-36 top-1 hidden w-24 text-right font-mono text-xs font-bold text-amber-500 md:block">
                  {year}
                </div>
              )}

              <div className="rounded-2xl border border-stone-800/60 bg-stone-900/40 p-6">
                <h4 className="font-serif text-lg font-bold text-stone-100">
                  {item.title} {year && <span className="font-mono text-sm text-amber-500/70">({year})</span>}
                </h4>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-300">{item.story}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
