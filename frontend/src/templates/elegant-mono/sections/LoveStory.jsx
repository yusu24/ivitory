import Reveal from '../components/Reveal';

export default function LoveStory({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-taupe-100 px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <p className="font-cursive text-4xl text-taupe-600">Sebuah Kisah</p>
        </Reveal>

        <div className="mt-10 space-y-5 text-left">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index * 0.08, 0.4)}>
              <div className="rounded-2xl border border-taupe-200 bg-white p-6 text-center shadow-sm">
                {item.item_date && (
                  <p className="text-xs uppercase tracking-wider text-taupe-400">
                    {new Date(`${item.item_date}T00:00:00`).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
                <h3 className="mt-2 font-display text-xl text-taupe-700">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.story}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
