import Reveal from '../components/Reveal';

export default function CoupleInfo({ invitation }) {
  return (
    <section id="section-couple" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-lg text-center">
        <Reveal>
          <p className="font-cursive text-3xl text-taupe-600">Assalamu&rsquo;alaikum Warahmatullahi Wabarakatuh</p>
        </Reveal>

        <div className="mt-14 space-y-14">
          <Reveal delay={0.05}>
            <Person label="The Groom" name={invitation.groom_name} nickname={invitation.groom_nickname} parents={invitation.groom_parents} />
          </Reveal>
          <Reveal delay={0.15}>
            <Person label="The Bride" name={invitation.bride_name} nickname={invitation.bride_nickname} parents={invitation.bride_parents} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Person({ label, name, nickname, parents }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-taupe-400">{label}</p>
      <p className="mt-3 font-cursive text-4xl text-taupe-700">{nickname || name}</p>
      <h3 className="mt-2 font-display text-xl text-stone-900">{name}</h3>
      <p className="mx-auto mt-3 h-px w-16 border-t border-dashed border-taupe-300" />
      {parents && <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone-500">Putra/Putri dari {parents}</p>}
    </div>
  );
}
