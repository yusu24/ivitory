import React, { useState } from 'react';
import { Copy, Check, CreditCard } from 'lucide-react';
import { WaveSeparator } from './WaveSeparator';

export default function GiftSection({ accounts = [], isDark = false }) {
  const [copiedId, setCopiedId] = useState(null);

  const defaultAccounts = [
    {
      id: 1,
      bank_name: 'Bank Central Asia (BCA)',
      account_number: '1234567890',
      account_holder: 'Wahyu Pratama',
    },
    {
      id: 2,
      bank_name: 'Bank Mandiri',
      account_number: '9876543210123',
      account_holder: 'Riski Rahmawati',
    },
  ];

  const bankList = accounts && accounts.length > 0 ? accounts : defaultAccounts;

  const handleCopy = (num, id) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="gift"
      className="pt-10 pb-0 transition-colors duration-300 relative"
      style={{ backgroundColor: 'var(--ulems-bg-alt)', color: 'var(--ulems-text-main)' }}
    >
      <div className="max-w-md mx-auto px-4 text-center relative z-10">
        
        <h2 className="font-esthetic text-4xl sm:text-5xl mb-2">
          Love Gift
        </h2>
        <p className="font-josefin text-xs opacity-75 mb-8 max-w-xs mx-auto">
          Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:
        </p>

        <div className="space-y-4 mb-10">
          {bankList.map((acc, idx) => (
            <div
              key={acc.id || idx}
              className="p-6 rounded-3xl shadow-sm border text-center transition-colors duration-300"
              style={{
                backgroundColor: 'var(--ulems-bg-card)',
                borderColor: 'var(--ulems-border-card)',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 opacity-80" />
                <span className="font-josefin font-bold text-base">
                  {acc.bank_name}
                </span>
              </div>

              <div
                className="my-2 py-2 px-4 rounded-xl inline-block border transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--ulems-bg-card-alt)',
                  borderColor: 'var(--ulems-border)',
                }}
              >
                <span className="font-mono font-bold text-base sm:text-lg tracking-wider">
                  {acc.account_number}
                </span>
              </div>

              <p className="font-josefin text-xs opacity-80 mb-4">
                a.n. <strong className="font-semibold">{acc.account_holder}</strong>
              </p>

              <button
                onClick={() => handleCopy(acc.account_number, acc.id || idx)}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-josefin rounded-full border border-current shadow-sm transition-all cursor-pointer ulems-btn-outline"
              >
                {copiedId === (acc.id || idx) ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Wave to RsvpCommentSection (alt-to-main) */}
      <WaveSeparator type="alt-to-main" isDark={isDark} />
    </section>
  );
}
