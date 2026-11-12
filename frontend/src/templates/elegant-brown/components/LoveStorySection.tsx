import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { StoryItem } from '../types/wedding';

interface LoveStorySectionProps {
  stories: StoryItem[];
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ stories }) => {
  return (
    <section id="love-story" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Kisah Cinta Kami
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Jejak Langkah Cinta
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Center Vertical Gold Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#5C3A21]/20 via-[#5C3A21] to-[#5C3A21]/20 hidden md:block" />

        <div className="space-y-12 md:space-y-20">
          {stories.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-md h-64 sm:h-72 rounded-3xl overflow-hidden border border-[#5C3A21]/30 shadow-2xl relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1310]/80 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Node Badge (Mobile / Desktop) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#3D261D] items-center justify-center text-[#D4AF37] shadow-xl z-10">
                  <Heart className="w-4 h-4 fill-[#D4AF37]" />
                </div>

                {/* Text Side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl relative hover:border-[#5C3A21]/40 transition-colors">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#5C3A21]/15 text-[#5C3A21] text-xs font-bold font-mono uppercase mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-semibold text-[#2B1B17] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2B1B17]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
