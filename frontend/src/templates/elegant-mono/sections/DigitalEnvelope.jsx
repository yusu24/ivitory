import { useState } from 'react';
import { Copy, Check, Gift, CreditCard } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function DigitalEnvelope({ accounts }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <section id="section-gift" className="bg-taupe-100 px-6 py-20">
      <div className="mx-auto max-w-sm text-center">
        <Reveal>
          <Gift className="mx-auto h-7 w-7 text-taupe-500" strokeWidth={1.5} />
          <p className="mt-3 font-cursive text-4xl text-taupe-600">Titip Hadiah</p>
          <p className="mx-auto mt-4 max-w-xs text-sm text-taupe-600">
            Doa restu Anda adalah karunia terindah. Jika ingin memberi tanda kasih, kami sediakan pilihan berikut.
          </p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {accounts.map((acc, index) => (
            <Reveal key={acc.id} delay={Math.min(index * 0.08, 0.3)}>
              <BankCard account={acc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BankCard({ account }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(account.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-taupe-50 to-taupe-200 p-5 text-left shadow-md">
      <div className="flex items-start justify-between">
        <CreditCard className="h-7 w-7 text-taupe-400" strokeWidth={1.2} />
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-taupe-700">{account.bank_name}</p>
      </div>
      <p className="mt-6 font-mono text-lg tracking-widest text-taupe-800">{account.account_number}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-xs uppercase tracking-wide text-taupe-500">{account.account_holder}</p>
        <button
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-taupe-700 px-3 py-1.5 text-xs text-ivory transition hover:bg-taupe-800"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
    </div>
  );
}
