import React from 'react';

export default function QuranSection() {
  return (
    <section
      className="py-12 text-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--ulems-bg-alt)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4">
        
        <h2 className="font-esthetic text-3xl sm:text-4xl mb-6">
          Allah Subhanahu Wa Ta&apos;ala Berfirman
        </h2>

        <div className="space-y-4 text-center">
          {/* Card 1 */}
          <div
            className="p-5 rounded-2xl shadow-sm border transition-colors duration-300"
            style={{
              backgroundColor: 'var(--ulems-bg-card)',
              borderColor: 'var(--ulems-border-card)',
            }}
          >
            <p className="font-josefin text-xs sm:text-sm leading-relaxed mb-2 opacity-90">
              &ldquo;Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).&rdquo;
            </p>
            <span className="font-josefin font-semibold text-[11px] uppercase tracking-wider block opacity-70">
              QS. Adh-Dhariyat: 49
            </span>
          </div>

          {/* Card 2 */}
          <div
            className="p-5 rounded-2xl shadow-sm border transition-colors duration-300"
            style={{
              backgroundColor: 'var(--ulems-bg-card)',
              borderColor: 'var(--ulems-border-card)',
            }}
          >
            <p className="font-josefin text-xs sm:text-sm leading-relaxed mb-2 opacity-90">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <span className="font-josefin font-semibold text-[11px] uppercase tracking-wider block opacity-70">
              QS. Ar-Rum: 21
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
