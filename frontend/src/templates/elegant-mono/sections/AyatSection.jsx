import Reveal from '../components/Reveal';
import Ornament from '../components/Ornament';

export default function AyatSection() {
  return (
    <section className="bg-taupe-100 px-6 py-16 text-center">
      <Reveal>
        <p className="font-cursive text-4xl text-taupe-600">Save The Date</p>

        <Ornament className="mt-5" />

        <div className="mx-auto mt-8 max-w-xl">
          <p dir="rtl" className="font-arabic text-xl leading-loose text-taupe-800 sm:text-2xl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ
            بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="mt-5 text-sm italic leading-relaxed text-taupe-600 sm:text-base">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram
            kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-taupe-500">QS. Ar-Rum: 21</p>
        </div>
      </Reveal>
    </section>
  );
}
