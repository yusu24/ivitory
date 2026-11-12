import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/Botanicals';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-2xl relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Kisah Indah Kami" title="Perjalanan Cinta" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm italic text-[var(--ig-muted)]">
            Setiap lembaran cerita mempertemukan kami hingga ke gerbang pernikahan yang suci:
          </p>
        </Reveal>

        <div className="mt-14 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[var(--ig-gold)] before:to-transparent">
          <div className="space-y-12">
            {items.map((item, index) => {
              const formattedDate = item.item_date
                ? new Date(`${item.item_date}T00:00:00`).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : null;

              return (
                <Reveal key={item.id} delay={Math.min(index * 0.1, 0.4)}>
                  <div className="relative flex flex-col items-center">
                    {/* Center floral badge node */}
                    <div className="h-9 w-9 rounded-full bg-[var(--ig-paper)] border-2 border-[var(--ig-gold)] flex items-center justify-center z-10 shadow-md my-2">
                      <div className="h-3 w-3 rounded-full bg-[var(--ig-sage-600)]" />
                    </div>

                    <div className="ig-card rounded-[28px] p-6 sm:p-8 mt-4 w-full max-w-lg border border-[rgba(180,149,90,0.3)] shadow-md text-center transition-transform hover:-translate-y-1">
                      {formattedDate && (
                        <span className="ig-sans text-[10px] uppercase tracking-[0.25em] text-[var(--ig-gold)] font-medium">
                          {formattedDate}
                        </span>
                      )}
                      
                      <h4 className="ig-script text-3xl sm:text-4xl text-[var(--ig-sage-700)] mt-1">
                        {item.title}
                      </h4>

                      <p className="ig-serif text-sm sm:text-base italic leading-relaxed text-[var(--ig-ink)] mt-3">
                        &ldquo;{item.story}&rdquo;
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
