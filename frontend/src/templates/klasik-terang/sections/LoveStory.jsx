import { motion } from 'framer-motion';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-20 px-4 bg-white/30 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-2">
          Kisah Kasih Perjalanan Kami
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A453E] font-light mb-12">
          Perjalanan Cinta (Love Story)
        </h2>

        <div className="relative border-l border-dashed border-[#D4AF37]/50 pl-8 ml-4 md:ml-auto md:mr-auto text-left space-y-12 max-w-xl">
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
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#FAF6F0] transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8C8479]" />
              </div>

              {/* Year tag */}
              {item.year && (
                <span className="inline-block bg-[#8C8479] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-semibold px-4 py-1.5 rounded-full mb-3 shadow-sm">
                  {item.year}
                </span>
              )}

              {/* Card */}
              <div className="bg-white/80 border border-[#D4AF37]/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-serif text-lg font-normal text-[#4A453E] mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed text-[#6B655D]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
