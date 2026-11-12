import { motion } from 'framer-motion';
import { BohoLine } from '../components/BohoOrnaments';

const QUOTE_TEXT =
  'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.';
const QUOTE_SOURCE = 'QS. Ar-Rum Ayat 21';

export default function AyatSection() {
  return (
    <section className="relative py-16 px-6 bg-transparent text-center">
      <div className="max-w-3xl mx-auto z-10 relative flex flex-col items-center">
        <BohoLine className="w-16 mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="px-4"
        >
          <p className="font-boho-serif italic text-base sm:text-lg text-[var(--color-boho-text)] leading-relaxed max-w-2xl mx-auto opacity-80">
            "{QUOTE_TEXT}"
          </p>
          <p className="font-boho-sans font-semibold text-[10px] text-[var(--color-boho-sage)] mt-6 uppercase tracking-[0.3em]">
            — {QUOTE_SOURCE}
          </p>
        </motion.div>
        <BohoLine className="w-16 mt-8" />
      </div>
    </section>
  );
}
