import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, MapPin } from 'lucide-react';
import { DiamondDivider } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';

export default function LoveStorySection({ stories = [] }) {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const defaultStories = [
    {
      id: 1,
      chapter: 'Chapter I',
      year: '2020',
      title: 'Awal Mula Bertemu',
      subtitle: 'Ketika Takdir Membuka Halaman Pertama',
      story:
        'Dipertemukan di sela aktivitas perkuliahan dan ruang diskusi. Berawal dari sapaan hangat dan obrolan sederhana, tak disangka benih kekaguman mulai tumbuh seiring berjalannya waktu.',
      location: 'Kampus & Ruang Diskusi',
      likes: 12,
      quote: '“Setiap pandangan pertama menyimpan rahasia takdir yang menanti untuk diungkap.”',
    },
    {
      id: 2,
      chapter: 'Chapter II',
      year: '2023',
      title: 'Menjalin Komitmen',
      subtitle: 'Dua Jiwa Menyatu dalam Satu Visi',
      story:
        'Setelah saling memahami karakter dan cita-cita hidup, kami memantapkan hati untuk saling mendukung, saling mendoakan, dan melangkah bersama menuju impian yang selaras.',
      location: 'Sebuah Sore di Sudut Kota',
      likes: 18,
      quote: '“Bukan tentang menemukan yang sempurna, melainkan saling menyempurnakan bersama.”',
    },
    {
      id: 3,
      chapter: 'Chapter III',
      year: '2025',
      title: 'Hari Pertunangan',
      subtitle: 'Restu Suci Kedua Keluarga Besar',
      story:
        'Dengan penuh rasa syukur dan restu orang tua tercinta, sebuah ikatan tulus diresmikan melalui prosesi lamaran yang khidmat dan hangat, menyatukan dua keluarga dalam doa.',
      location: 'Kediaman Mempelai Wanita',
      likes: 24,
      quote: '“Saat dua hati telah yakin, restu orang tua menjadi payung terindah menuju ridha-Nya.”',
    },
    {
      id: 4,
      chapter: 'Chapter IV',
      year: '2027',
      title: 'Menuju Pelaminan',
      subtitle: 'Ikrar Suci untuk Seumur Hidup',
      story:
        'Kini, dengan izin Allah SWT, kami bersiap mengikrarkan janji suci di hadapan para saksi. Mengawali babak baru perjalanan hidup sebagai sepasang suami dan istri.',
      location: 'Masjid Agung Al-Akbar Surabaya',
      likes: 36,
      quote: '“Dan perjalanan abadi kami pun resmi dimulai dari detik ini.”',
    },
  ];

  const items =
    stories && stories.length > 0
      ? stories.map((s, idx) => ({
          id: s.id || idx + 1,
          chapter: `Chapter ${['I', 'II', 'III', 'IV', 'V', 'VI'][idx] || idx + 1}`,
          year: s.item_date
            ? new Date(s.item_date).getFullYear().toString()
            : s.year || `Fase ${idx + 1}`,
          title: s.title,
          subtitle: s.subtitle || 'Lembaran Cerita Kami',
          story: s.story || s.description,
          location: s.location || 'Momen Berharga',
          likes: 10 + idx * 5,
          quote: s.quote || 'Cinta yang bertumbuh dalam kebaikan dan doa.',
        }))
      : defaultStories;

  const [storyLikes, setStoryLikes] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: { count: item.likes, liked: false } }), {})
  );

  const handleLikeStory = (id, event) => {
    sounds.playSparkle();

    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 28,
        spread: 45,
        origin: { x, y },
        colors: ['#09090b', '#52525b', '#d4d4d8', '#f43f5e'],
        ticks: 85,
      });
    } catch {
      // ignore
    }

    setStoryLikes((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  return (
    <section
      id="story"
      className="py-24 sm:py-32 px-4 bg-zinc-50 text-zinc-900 border-b border-zinc-200 relative overflow-hidden"
    >
      {/* Background ambient fine grids / textures */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block mb-2">
            MEMOIR &amp; PERJALANAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-950 font-normal">
            Our Love Story
          </h2>
          <p className="font-script-calligraphy text-2xl sm:text-3xl text-zinc-600 mt-1 mb-3">
            Dua Hati Menenun Takdir
          </p>
          <DiamondDivider className="max-w-xs mx-auto" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-md mx-auto mt-3 leading-relaxed">
            Setiap jengkal langkah yang kami tempuh merupakan bagian dari skenario indah Sang Maha Pencipta.
          </p>
        </motion.div>

        {/* Editorial Timeline with Scroll-Linked Living Ink Line */}
        <div
          ref={timelineRef}
          className="relative ml-4 sm:ml-28 md:ml-36 space-y-16 py-4"
        >
          {/* Static Background Track Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-200" />

          {/* Scroll-Linked Living Black Ink Line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-950 origin-top z-10"
          />

          {items.map((item, idx) => {
            const isLiked = storyLikes[item.id]?.liked;
            const currentCount = storyLikes[item.id]?.count ?? item.likes;
            const isOdd = idx % 2 === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 28, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-7 sm:pl-12 group"
              >
                {/* Timeline node marker */}
                <motion.div
                  whileInView={{ scale: [0.7, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="absolute -left-[15px] top-4 w-8 h-8 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-125 z-20"
                >
                  <span className="font-editorial-serif text-xs font-bold">{idx + 1}</span>
                </motion.div>

                {/* Left Year & Chapter Badge for desktop */}
                <div className="sm:absolute sm:-left-36 sm:top-3.5 text-left sm:text-right mb-2 sm:mb-0">
                  <span className="block text-[10px] font-clean-sans uppercase tracking-[0.25em] text-zinc-500 font-bold mb-0.5">
                    {item.chapter}
                  </span>
                  <span className="inline-block px-3 py-0.5 bg-zinc-950 text-white text-[11px] font-clean-sans font-semibold tracking-widest shadow-sm">
                    {item.year}
                  </span>
                </div>

                {/* Polaroid / Archival Scrapbook Card */}
                <motion.div
                  whileHover={{ y: -4, rotate: 0 }}
                  className={`bg-white border-2 border-zinc-950 p-6 sm:p-8 shadow-[0_14px_35px_rgba(0,0,0,0.07)] relative transition-all duration-500 hover:shadow-[0_22px_50px_rgba(0,0,0,0.14)] overflow-hidden ${
                    isOdd ? 'sm:rotate-[0.4deg]' : 'sm:-rotate-[0.4deg]'
                  }`}
                >
                  {/* Shimmer Sweep */}
                  <div className="shimmer-sweep absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent pointer-events-none" />

                  <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />

                  {/* Top Bar: Chapter Title & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3.5 mb-4 relative z-10">
                    <div>
                      <span className="text-[10px] font-clean-sans uppercase tracking-[0.25em] text-zinc-400 font-bold block">
                        {item.chapter} &bull; {item.year}
                      </span>
                      <h3 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-zinc-950 mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                    {item.location && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-clean-sans uppercase tracking-wider text-zinc-700 bg-zinc-100 px-3 py-1 border border-zinc-300 font-medium">
                        <MapPin className="w-3 h-3 text-zinc-900" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="font-script-calligraphy text-2xl text-zinc-700 mb-2 relative z-10">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Main Story Narrative */}
                  <p className="text-xs sm:text-sm font-clean-sans text-zinc-700 leading-relaxed font-normal relative z-10">
                    {item.story}
                  </p>

                  {/* Romantic Quote in Atelier style */}
                  {item.quote && (
                    <div className="mt-4 py-3 px-4 border-l-2 border-zinc-950 bg-zinc-50 relative z-10">
                      <p className="font-editorial-serif italic text-xs sm:text-sm text-zinc-700">
                        {item.quote}
                      </p>
                    </div>
                  )}

                  {/* Bottom Interaction: Heart / Send Blessing */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-200 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-clean-sans text-zinc-400 tracking-wider uppercase">
                      Kirimkan doa untuk babak ini
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => handleLikeStory(item.id, e)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-clean-sans transition-all duration-300 cursor-pointer ${
                        isLiked
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                          : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-950 hover:bg-zinc-50'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isLiked ? 'fill-rose-500 text-rose-500 scale-125' : 'text-zinc-700'
                        }`}
                      />
                      <span className="font-semibold">{currentCount} Doa Cinta</span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
