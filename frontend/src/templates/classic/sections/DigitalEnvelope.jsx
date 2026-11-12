import { useState } from 'react';
import { Copy, Check, Landmark, Wallet, Gift, Heart } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/Botanicals';

export default function DigitalEnvelope({ accounts }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-xl relative z-10">
        <Reveal>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[var(--ig-sage-50)] border border-[var(--ig-gold-soft)] flex items-center justify-center text-[var(--ig-sage-700)] shadow-sm">
            <Gift className="h-6 w-6 text-[var(--ig-gold)]" strokeWidth={1.5} />
          </div>
          <SectionHeading eyebrow="Tanda Kasih" title="Amplop Digital" />
          <p className="ig-serif mx-auto mt-4 max-w-md text-sm sm:text-base italic text-[var(--ig-muted)] leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui rekening berikut:
          </p>
        </Reveal>

        <div className="mt-12 space-y-5 text-left">
          {accounts.map((acc, index) => (
            <Reveal key={acc.id || index} delay={Math.min(index * 0.1, 0.3)}>
              <AccountCard account={acc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccountCard({ account }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(account.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWallet = account.type === 'ewallet';

  return (
    <div className="ig-card rounded-[28px] p-6 border border-[rgba(180,149,90,0.35)] shadow-md flex items-center justify-between gap-4 transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 rounded-2xl bg-[var(--ig-sage-50)] border border-[rgba(180,149,90,0.25)] flex items-center justify-center shrink-0 text-[var(--ig-sage-700)]">
          {isWallet ? (
            <Wallet className="h-6 w-6 text-[var(--ig-gold)]" strokeWidth={1.5} />
          ) : (
            <Landmark className="h-6 w-6 text-[var(--ig-gold)]" strokeWidth={1.5} />
          )}
        </div>
        <div className="min-w-0">
          <p className="ig-sans text-xs uppercase tracking-wider font-semibold text-[var(--ig-sage-700)] truncate">
            {account.bank_name}
          </p>
          <p className="font-mono text-base sm:text-lg font-bold text-[var(--ig-ink)] tracking-wide my-0.5">
            {account.account_number}
          </p>
          <p className="ig-serif text-xs italic text-[var(--ig-muted)] truncate">
            a.n. {account.account_holder}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={copy}
        className={`ig-btn-ghost shrink-0 cursor-pointer ${
          copied ? '!border-emerald-600 !bg-emerald-50 !text-emerald-800' : ''
        }`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Tersalin</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Salin</span>
          </>
        )}
      </button>
    </div>
  );
}
