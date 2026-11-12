import Reveal from '../components/Reveal';

export default function CoupleInfo({ invitation }) {
  return (
    <section id="section-couple" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">
        Mempelai Pernikahan
      </h2>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
        <Reveal delay={0.05}>
          <Person
            label="Putri Tercinta dari:"
            name={invitation.bride_name}
            parents={invitation.bride_parents}
            photo={invitation.cover_photo_url}
            variant="female"
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Person
            label="Putra Tercinta dari:"
            name={invitation.groom_name}
            parents={invitation.groom_parents}
            photo={invitation.cover_photo_url}
            variant="male"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Person({ label, name, parents, photo, variant }) {
  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="group relative h-56 w-56">
        <div
          className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-amber-500 opacity-60 transition-all duration-500 group-hover:scale-105"
          style={variant === 'male' ? { animationDirection: 'reverse' } : undefined}
        />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 opacity-20 blur-md" />

        <div className="absolute inset-2 flex items-center justify-center overflow-hidden rounded-full border border-amber-500/30 bg-stone-900 p-4">
          {photo ? (
            <img src={photo} alt={name} className="h-full w-full rounded-full object-cover" />
          ) : variant === 'female' ? (
            <svg viewBox="0 0 100 100" className="h-32 w-32 text-amber-500 opacity-85">
              <circle cx="50" cy="38" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M50,22 C44,22 40,26 40,32 C40,26 36,22 30,22 C25,22 22,26 22,32 C22,42 36,46 50,46"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <ellipse cx="50" cy="22" rx="10" ry="6" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
              <path d="M18,90 C18,70 32,58 50,58 C68,58 82,70 82,90" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,58 L50,90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M42,66 L58,66 M38,76 L62,76" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="50" cy="66" r="1.5" fill="currentColor" />
              <circle cx="50" cy="76" r="1.5" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="h-32 w-32 text-amber-500 opacity-85">
              <circle cx="50" cy="38" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M32,36 C32,22 68,22 68,36 C68,32 50,22 32,36 Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1" />
              <path d="M40,24 Q50,28 60,24" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="20" r="4.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
              <path d="M18,90 C18,70 32,58 50,58 C68,58 82,70 82,90" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,58 L50,90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M42,58 L50,72 L58,58" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="74" r="1.5" fill="currentColor" />
              <circle cx="50" cy="81" r="1.5" fill="currentColor" />
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold text-amber-400">{name}</h3>
        {parents && (
          <>
            <p className="font-mono text-xs italic text-stone-400">{label}</p>
            <p className="text-sm font-medium text-stone-200">{parents}</p>
          </>
        )}
      </div>
    </div>
  );
}
