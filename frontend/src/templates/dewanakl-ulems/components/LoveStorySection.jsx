import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function LoveStorySection({ stories = [], isDark = false }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const defaultStories = [
    {
      year: 'Januari 2025',
      title: '💼 Awal Pertemuan Sederhana',
      content:
        'Pada Januari 2025, kami pertama kali bertemu dalam proyek kerja bersama. Interaksi kami di ruang rapat terbatas pada urusan kerja, penuh adab dan profesional, menjaga jarak dan fokus pada tugas.',
    },
    {
      year: 'Februari 2025',
      title: '💞 Benih Cinta dalam Ujian',
      content:
        'Di tengah tekanan proyek, kami menemukan kecocokan dalam ketenangan dan kecerdasan cara berpikir. Merasa ada kesamaan visi dan nilai keimanan, kami beristikharah dan memutuskan memulai taaruf dengan perantara ustaz terpercaya.',
    },
    {
      year: 'Maret 2025',
      title: '💍 Langkah Menuju Ridha Allah',
      content:
        'Setelah istikharah dan mendapat restu dari kedua keluarga tercinta, kami memantapkan niat suci melangkah menuju ikatan pernikahan yang diridhai Allah Subhanahu Wa Ta\'ala.',
    },
  ];

  const storyList = stories && stories.length > 0 ? stories : defaultStories;

  const handleReveal = (e) => {
    // Heart shape confetti burst
    try {
      const heart = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.033, 0, 0, 0.033, -5.56, -5.53],
      });
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 20,
        spread: 60,
        shapes: [heart],
        colors: ['#FF69B4', '#FF1493', '#C71585'],
        origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight },
        zIndex: 9999,
      });
    } catch {
      // Fallback
    }
    setIsRevealed(true);
  };

  return (
    <section
      id="story"
      className="pt-2 pb-8 transition-colors duration-300"
      style={{ backgroundColor: 'var(--ulems-bg-alt)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4">
        <div
          className="rounded-3xl p-6 shadow-sm border transition-colors duration-300 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--ulems-bg-card)',
            borderColor: 'var(--ulems-border-card)',
          }}
        >
          <h2 className="font-esthetic text-center text-3xl sm:text-4xl mb-4">
            Kisah Cinta
          </h2>

          <div className="relative">
            {/* Interactive "Lihat Story" Overlay Button matching Ulems */}
            {!isRevealed && (
              <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-2xl">
                <button
                  onClick={handleReveal}
                  className="px-6 py-2.5 rounded-full ulems-btn-outline font-josefin text-xs uppercase tracking-wider font-semibold shadow-lg flex items-center gap-2 cursor-pointer bg-white/90 text-zinc-900 border-none hover:bg-white"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
                  <span>Lihat Story</span>
                </button>
              </div>
            )}

            {/* Scrollable Story Timeline */}
            <div className={`space-y-6 max-h-80 overflow-y-auto pr-1 ${!isRevealed ? 'filter blur-[3px]' : ''}`}>
              {storyList.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  {/* Number Circle Badge */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-josefin font-bold text-xs"
                      style={{ backgroundColor: 'var(--ulems-bg-alt)' }}
                    >
                      {idx + 1}
                    </div>
                    {idx < storyList.length - 1 && (
                      <div className="w-0.5 h-16 bg-current opacity-25 mt-1" />
                    )}
                  </div>

                  <div className="flex-1 pb-2">
                    <h3 className="font-josefin font-semibold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="font-josefin text-xs opacity-80 leading-relaxed">
                      {item.content || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
