import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, CreditCard, Copy, Check, QrCode, MapPin, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BankAccount } from '../types/wedding';

interface WeddingGiftSectionProps {
  bankAccounts: BankAccount[];
  qrisImageUrl: string;
  physicalGiftAddress: { recipient: string; phone: string; address: string };
}

export const WeddingGiftSection: React.FC<WeddingGiftSectionProps> = ({
  bankAccounts,
  qrisImageUrl,
  physicalGiftAddress,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<boolean>(false);
  const [showAddressCopied, setShowAddressCopied] = useState<boolean>(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    // Trigger subtle gold confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#FBF5B7', '#8E7C5C']
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleCopyAddress = () => {
    const fullText = `${physicalGiftAddress.recipient}\n${physicalGiftAddress.phone}\n${physicalGiftAddress.address}`;
    navigator.clipboard.writeText(fullText);
    setShowAddressCopied(true);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#FBF5B7', '#8E7C5C']
    });

    setTimeout(() => {
      setShowAddressCopied(false);
    }, 2500);
  };

  return (
    <section id="gift" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#5C3A21] font-semibold mb-2">
          Ungkapan Kasih
        </p>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2B1B17] font-light">
          Hadiah Pernikahan (Digital Angpao)
        </h2>
        <div className="w-20 h-[2px] brown-gradient-bg mx-auto mt-4 rounded-full" />
        <p className="text-xs sm:text-sm text-[#2B1B17]/80 font-light max-w-xl mx-auto mt-4">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih berupa hadiah digital, kami menyediakannya di bawah ini.
        </p>
      </div>

      {/* Grid Bank Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {bankAccounts.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="glass-panel rounded-3xl p-8 border border-white/80 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#5C3A21]/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#3D261D] text-[#FBF5B7] flex items-center justify-center font-serif-luxury font-bold text-lg shadow-md">
                    <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-serif-luxury font-bold text-xl text-[#2B1B17] block">
                      {account.bankName}
                    </span>
                    <span className="text-[10px] text-[#5C3A21] uppercase tracking-widest block font-mono">
                      Transfer Bank
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#5C3A21]/15 text-[#5C3A21] text-[10px] font-mono font-bold uppercase">
                  Verified
                </span>
              </div>

              <div className="bg-white/60 rounded-2xl p-5 border border-[#5C3A21]/15 mb-6">
                <p className="text-[11px] uppercase tracking-widest text-[#2B1B17]/60 mb-1">
                  Nomor Rekening
                </p>
                <p className="font-mono text-2xl font-bold text-[#2B1B17] tracking-wider">
                  {account.accountNumber}
                </p>
                <p className="text-xs font-semibold text-[#5C3A21] mt-2">
                  a.n {account.accountHolder}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(account.accountNumber, account.id)}
              className="w-full py-3.5 px-6 rounded-xl brown-gold-gradient-bg text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer border border-[#D4AF37]/30"
            >
              {copiedId === account.id ? (
                <>
                  <Check className="w-4 h-4 text-[#FBF5B7]" />
                  <span className="text-[#FBF5B7]">Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#FBF5B7]" />
                  <span className="text-[#FBF5B7]">Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* QRIS & Physical Gift Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QRIS Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 border border-white/80 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#3D261D] text-[#D4AF37]">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#2B1B17]">
                  Transfer QRIS Semua E-Wallet
                </h3>
                <p className="text-xs text-[#5C3A21]">
                  Gopay, OVO, Dana, ShopeePay, LinkAja &amp; Mobile Banking
                </p>
              </div>
            </div>
            <p className="text-xs text-[#2B1B17]/80 leading-relaxed mb-6 font-light">
              Pindai kode QRIS secara langsung untuk mengirimkan hadiah dengan praktis melalui aplikasi e-wallet pilihan Anda.
            </p>
          </div>

          <button
            onClick={() => setShowQrisModal(true)}
            className="w-full py-3.5 px-6 rounded-xl border border-[#5C3A21] bg-[#3D261D] text-[#FBF5B7] hover:bg-[#5C3A21] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#D4AF37]" />
            <span>Tampilkan Kode QRIS</span>
          </button>
        </motion.div>

        {/* Physical Gift Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel rounded-3xl p-8 border border-white/80 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#3D261D] text-[#D4AF37]">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#2B1B17]">
                  Kirim Kado / Fisik
                </h3>
                <p className="text-xs text-[#5C3A21]">
                  Alamat Pengiriman Kado Pernikahan
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-4 border border-[#5C3A21]/15 text-xs text-[#2B1B17] space-y-1 mb-6">
              <p className="font-bold text-[#2B1B17]">{physicalGiftAddress.recipient}</p>
              <p className="text-[#5C3A21] font-mono">{physicalGiftAddress.phone}</p>
              <p className="text-[#2B1B17]/80 leading-relaxed mt-2">
                {physicalGiftAddress.address}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            className="w-full py-3.5 px-6 rounded-xl border border-[#5C3A21]/30 bg-white/80 hover:bg-white text-[#2B1B17] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            {showAddressCopied ? (
              <>
                <Check className="w-4 h-4 text-[#5C3A21]" />
                <span>Alamat Disalin!</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 text-[#5C3A21]" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* QRIS Modal */}
      <AnimatePresence>
        {showQrisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQrisModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-dark rounded-3xl p-8 max-w-sm w-full text-center relative border border-[#D4AF37]/50 shadow-2xl text-white"
            >
              <button
                onClick={() => setShowQrisModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>QRIS Resmi</span>
              </div>

              <h3 className="font-serif-luxury text-2xl font-light mb-1">
                Scan QRIS
              </h3>
              <p className="text-xs text-white/70 mb-6">
                Yusuf &amp; Nabila Wedding
              </p>

              <div className="bg-white p-4 rounded-2xl inline-block shadow-xl mb-6">
                <img
                  src={qrisImageUrl}
                  alt="QRIS Digital Angpao"
                  className="w-56 h-56 object-contain"
                />
              </div>

              <p className="text-[11px] text-white/60">
                Mendukung BCA Mobile, Mandiri Livin, BRImo, BNI Mobile, Gopay, OVO, ShopeePay, DANA &amp; QRIS Indonesia.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
