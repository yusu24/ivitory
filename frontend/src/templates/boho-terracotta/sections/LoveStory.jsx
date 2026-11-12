import { motion } from 'framer-motion';
import { BohoFlower } from '../components/BohoOrnaments';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
          Kisah Kasih Perjalanan Kami
        </p>
        <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-12">
          Love Story
        </h2>

        <div className="relative border-l border-[var(--color-boho-terracotta)]/40 pl-8 ml-4 md:ml-auto md:mr-auto text-left space-y-12 max-w-xl">
          {items.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-[var(--color-boho-bg)] border-2 border-[var(--color-boho-terracotta)] rounded-full flex items-center justify-center shadow-sm transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-boho-sage)]" />
              </div>

              {/* Year tag */}
              {item.year && (
                <span className="inline-block bg-[var(--color-boho-terracotta-light)] text-white text-[10px] uppercase tracking-[0.2em] font-boho-sans font-semibold px-4 py-1.5 rounded-full mb-3 shadow-sm">
                  {item.year}
                </span>
              )}

              {/* Card */}
              <div className="bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)]/20 rounded-r-[40px] rounded-l-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-[-10px] right-[-10px] text-[var(--color-boho-sage)] opacity-10">
                   <BohoFlower className="w-16 h-16" />
                </div>
                <h4 className="font-boho-serif text-lg font-normal text-[var(--color-boho-text)] mb-2 relative z-10">{item.title}</h4>
                <p className="text-sm leading-relaxed text-[var(--color-boho-text)] opacity-80 font-boho-sans relative z-10">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
