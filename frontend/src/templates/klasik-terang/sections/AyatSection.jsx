import { motion } from 'framer-motion';
import { FlourishDivider } from '../components/ClassicOrnaments';

const QUOTE_TEXT =
  'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.';
const QUOTE_SOURCE = 'QS. Ar-Rum Ayat 21';

export default function AyatSection() {
  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-[#FDFBF7] to-white/60 text-center">
      <div className="max-w-3xl mx-auto z-10 relative">
        <FlourishDivider className="mx-auto w-48 mb-8 text-[#D4AF37]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="px-4"
        >
          <p className="font-serif italic text-base sm:text-lg text-[#6B655D] leading-relaxed max-w-2xl mx-auto">
            "{QUOTE_TEXT}"
          </p>
          <p className="font-sans font-medium text-[10px] text-[#8C8479] mt-5 uppercase tracking-[0.3em]">
            — {QUOTE_SOURCE}
          </p>
        </motion.div>
        <FlourishDivider className="mx-auto w-48 mt-8 rotate-180 text-[#D4AF37]" />
      </div>
    </section>
  );
}
