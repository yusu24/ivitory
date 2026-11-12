import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section
      id="story-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 text-[#f2f2f2] md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-20 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Kisah Cinta Kami
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a059]/30" />
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute bottom-0 left-1/2 top-0 z-0 hidden w-px -translate-x-1/2 bg-[#c5a059]/30 md:block" />

          <div className="relative z-10 space-y-16">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center justify-center gap-8 md:flex-row md:gap-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-1/2 top-4 z-20 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#c5a059]/60 bg-[#0d0d0d] text-[#c5a059] shadow-md md:flex">
                    <Heart className="h-3.5 w-3.5 fill-[#c5a059]/20" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex w-full flex-col items-center md:w-[45%] md:items-stretch"
                  >
                    <div className="w-full max-w-md rounded-none border border-[#c5a059]/15 bg-[#141414] p-6 shadow-2xl transition-all duration-300 hover:border-[#c5a059]/35 md:max-w-none">
                      {item.item_date && (
                        <span className="mb-3 inline-block bg-[#c5a059] px-4 py-1 font-serif text-xs font-semibold tracking-widest text-black">
                          {new Date(`${item.item_date}T00:00:00`).getFullYear()}
                        </span>
                      )}
                      <h3 className="mb-2 font-serif text-xl font-light tracking-wide text-white">{item.title}</h3>
                      <p className="text-justify text-xs font-light leading-relaxed text-stone-300 md:text-sm">
                        {item.story}
                      </p>
                    </div>
                  </motion.div>

                  <div className="hidden w-full md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
