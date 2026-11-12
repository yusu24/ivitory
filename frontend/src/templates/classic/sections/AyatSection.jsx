import Reveal from '../components/Reveal';
import { SectionHeading, LeafBranch } from '../components/Botanicals';

export default function AyatSection({ invitation }) {
  return (
    <section className="relative px-6 py-20 text-center overflow-hidden">
      <LeafBranch className="absolute -left-12 -top-6 h-48 w-48 text-[var(--ig-sage-300)] opacity-40 rotate-45 pointer-events-none" />
      <LeafBranch className="absolute -right-12 -bottom-6 h-48 w-48 text-[var(--ig-sage-300)] opacity-40 -rotate-45 pointer-events-none" />

      <div className="mx-auto max-w-2xl relative z-10">
        <Reveal>
          <div className="ig-card rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[rgba(180,149,90,0.3)] shadow-lg">
            <p dir="rtl" className="ig-arabic text-3xl sm:text-4xl leading-relaxed text-[var(--ig-sage-900)] mb-6">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <SectionHeading eyebrow="Tanda Kebesaran-Nya" />

            <div className="mt-6 space-y-4">
              <p dir="rtl" className="ig-arabic text-xl sm:text-2xl leading-loose text-[var(--ig-sage-800)] font-normal">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
              </p>
              
              <div className="ig-hairline mx-auto w-24 my-6 opacity-60" />

              <p className="ig-serif text-base sm:text-lg italic leading-relaxed text-[var(--ig-muted)] max-w-lg mx-auto">
                &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
              </p>

              <p className="ig-sans text-xs uppercase tracking-[0.25em] text-[var(--ig-gold)] font-medium pt-2">
                QS. Ar-Rum: 21
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
