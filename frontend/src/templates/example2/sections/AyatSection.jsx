import { Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';

const QUOTE = {
  javanese:
    "Gegaraning wong akrami dudu bondho dudu rupo, amung ati pawitane. Luput pisan keno pisan, yen gampang luwih gampang, yen angel angel kalangkung.",
  translation:
    'Pilar utama pernikahan bukanlah harta ataupun rupa, melainkan ketulusan hati. Sekali melangkah untuk selamanya; jika dimudahkan akan sangat mudah, jika dipersulit akan teramat sulit.',
  source: 'Serat Wedhatama',
};

export default function AyatSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[80px]" />
      <Reveal className="space-y-6">
        <div className="flex justify-center text-amber-500 opacity-70">
          <Sparkles size={24} className="animate-pulse" />
        </div>

        <p className="mx-auto max-w-2xl px-4 font-serif text-xl italic leading-relaxed text-stone-200 md:text-2xl">
          &ldquo;{QUOTE.javanese}&rdquo;
        </p>

        <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <p className="mx-auto max-w-lg font-sans text-xs font-light leading-relaxed text-stone-400">
          Artinya: &ldquo;{QUOTE.translation}&rdquo;
        </p>

        <span className="block font-mono text-[10px] tracking-wider text-amber-500/80">&mdash; {QUOTE.source}</span>
      </Reveal>
    </section>
  );
}
