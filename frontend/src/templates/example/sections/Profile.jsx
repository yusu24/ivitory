import { Heart } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Profile({ invitation }) {
  return (
    <section
      id="profile-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 text-[#f2f2f2] md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-24 px-4 text-center">
          <div className="mb-6 flex justify-center">
            <Heart className="h-6 w-6 fill-[#c5a059]/10 text-[#c5a059]" />
          </div>
          <p className="mx-auto max-w-2xl font-serif text-base font-light italic leading-relaxed text-stone-300 md:text-lg">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
            menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <span className="mt-4 block font-mono text-xs uppercase tracking-[0.3em] text-[#c5a059]">
            &mdash; QS. Ar-Rum: 21
          </span>
          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />
        </Reveal>

        <Reveal className="mb-20 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Mempelai Pernikahan
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Assalamu&rsquo;alaikum Wr. Wb.
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-stone-400">
            Dengan memohon rahmat dan ridho Allah SWT, kami dengan senang hati mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri pernikahan putra-putri kami:
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2 lg:gap-24">
          <Reveal delay={0.05}>
            <Person
              label="The Groom"
              name={invitation.groom_name}
              nickname={invitation.groom_nickname}
              parents={invitation.groom_parents}
              photo={invitation.cover_photo_url}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Person
              label="The Bride"
              name={invitation.bride_name}
              nickname={invitation.bride_nickname}
              parents={invitation.bride_parents}
              photo={invitation.cover_photo_url}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Person({ label, name, nickname, parents, photo }) {
  const initial = (nickname || name || '?').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="group relative mb-8">
        <div className="absolute -inset-3 rounded-full border border-[#c5a059]/30 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute -inset-1.5 rounded-full border border-[#c5a059]/10" />
        <div className="relative h-52 w-52 overflow-hidden rounded-full border-[3px] border-[#c5a059]/40 bg-stone-900 shadow-2xl">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="h-full w-full object-cover brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-6xl font-light italic text-[#c5a059]/50">
              {initial}
            </div>
          )}
        </div>
      </div>

      <h3 className="font-serif text-2xl font-light tracking-wide text-white">{name}</h3>
      <p className="mb-4 mt-2 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a059]">
        {label}
      </p>

      {parents && (
        <div className="space-y-1.5 text-xs font-light text-stone-300 md:text-sm">
          <p className="opacity-75">Putra/Putri dari:</p>
          <p className="tracking-wide text-white">{parents}</p>
        </div>
      )}
    </div>
  );
}
