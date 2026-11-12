import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift, CreditCard, MapPin, MessageCircle } from 'lucide-react';
import { BotanicalCorner, DiamondDivider } from './MonochromeOrnaments';
import { sounds } from '../utils/soundEffects';
import { getInvitationTexts } from '../utils/templateConfig';

export default function DigitalEnvelope({ invitation, accounts = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const texts = getInvitationTexts(invitation);

  const defaultAccounts = [
    {
      id: 1,
      bank_name: 'BCA (Bank Central Asia)',
      account_number: '1234567890',
      account_holder: invitation?.groom_name || 'M Yusuf Effendi',
      tier: 'Platinum Account',
    },
    {
      id: 2,
      bank_name: 'Bank Syariah Indonesia (BSI)',
      account_number: '7192837465',
      account_holder: invitation?.bride_name || 'Nor Nabilla',
      tier: 'Syariah Priority',
    },
  ];

  const bankList = accounts && accounts.length > 0 ? accounts : defaultAccounts;

  const handleCopy = (text, id) => {
    sounds.playChime();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const getWaConfirmationUrl = (bankName) => {
    const cleanPhone = (texts.whatsapp_number || '6281234567890').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Assalamu'alaikum, selamat atas pernikahannya! Alhamdulillah kami telah mengirimkan tanda kasih melalui transfer ${bankName}. Semoga berkah dan bahagia selalu. Aamiin.`
    );
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`;
  };

  return (
    <section id="gift" className="py-20 sm:py-28 px-4 bg-paper-texture text-zinc-900 border-b border-zinc-200">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-clean-sans text-zinc-500 font-semibold block">
            {texts.gift_badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial-serif text-zinc-900 mt-1 font-normal">
            {texts.gift_title}
          </h2>
          <DiamondDivider className="max-w-xs mx-auto mt-3" />
          <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 max-w-md mx-auto mt-2 leading-relaxed">
            {texts.gift_intro_text}
          </p>
        </div>

        {/* Bank Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {bankList.map((acc, idx) => (
            <motion.div
              key={acc.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative border border-zinc-900 bg-white p-6 sm:p-8 rounded-sm shadow-lg flex flex-col justify-between overflow-hidden group hover:border-black transition-colors"
            >
              <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-zinc-900" />
                    <span className="font-editorial-serif text-lg font-bold tracking-wider text-zinc-900">
                      {acc.bank_name}
                    </span>
                  </div>
                  <div className="w-8 h-6 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-400 border border-zinc-500/50 flex items-center justify-center p-0.5">
                    <div className="w-full h-full border border-zinc-600/40 rounded-xs" />
                  </div>
                </div>

                {/* Account Number Box */}
                <div className="my-4 py-2.5 px-4 bg-zinc-50 border border-zinc-300 rounded-sm">
                  <span className="text-[9px] tracking-widest font-clean-sans text-zinc-400 block uppercase">
                    NOMOR REKENING
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-zinc-950 mt-0.5">
                    {acc.account_number}
                  </div>
                </div>

                {/* Account Holder Name */}
                <div className="mb-5 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] tracking-widest font-clean-sans text-zinc-400 block uppercase">
                      ATAS NAMA
                    </span>
                    <p className="font-editorial-serif text-base sm:text-lg font-bold text-zinc-900">
                      {acc.account_holder}
                    </p>
                  </div>
                  <span className="text-[10px] font-clean-sans text-zinc-400 uppercase tracking-widest">
                    {acc.tier || 'Private'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Copy & WhatsApp Confirmation */}
              <div className="relative z-10 pt-2 space-y-2">
                <button
                  onClick={() => handleCopy(acc.account_number, acc.id || idx)}
                  className={`w-full py-2.5 px-4 text-xs font-clean-sans uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 rounded-sm transition-all border cursor-pointer ${
                    copiedId === (acc.id || idx)
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-100 shadow-sm'
                  }`}
                >
                  {copiedId === (acc.id || idx) ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>

                <a
                  href={getWaConfirmationUrl(acc.bank_name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 text-[11px] font-clean-sans text-zinc-600 hover:text-zinc-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Section */}
        <div className="mt-12 max-w-2xl mx-auto border border-zinc-900 bg-white p-6 sm:p-8 text-center relative shadow-md">
          <div className="absolute inset-1.5 border border-zinc-200 pointer-events-none" />
          <BotanicalCorner position="top-left" className="w-10 h-10 absolute top-1 left-1 opacity-60" />
          <BotanicalCorner position="bottom-right" className="w-10 h-10 absolute bottom-1 right-1 opacity-60" />

          <div className="relative z-10">
            <Gift className="w-6 h-6 mx-auto text-zinc-900 mb-2" />
            <h4 className="font-editorial-serif text-xl sm:text-2xl font-medium text-zinc-900 mb-2">
              {texts.physical_gift_heading}
            </h4>
            <p className="text-xs sm:text-sm font-clean-sans text-zinc-600 mb-4 max-w-md mx-auto">
              {texts.physical_gift_subheading}
            </p>

            <div className="bg-zinc-50 border border-zinc-300 p-4 rounded-sm text-left max-w-lg mx-auto">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-clean-sans font-semibold text-zinc-900">
                    {texts.physical_gift_title}
                  </p>
                  <p className="text-xs font-clean-sans text-zinc-600 mt-1 leading-relaxed">
                    {texts.physical_gift_address}
                  </p>
                  <p className="text-[11px] font-clean-sans text-zinc-500 mt-1">
                    {texts.physical_gift_receiver}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  `${texts.physical_gift_address} (${texts.physical_gift_receiver})`,
                  'physical-gift'
                )
              }
              className={`mt-4 px-6 py-2.5 text-xs font-clean-sans uppercase tracking-widest rounded-sm border cursor-pointer transition-all ${
                copiedId === 'physical-gift'
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-100 shadow-sm'
              }`}
            >
              {copiedId === 'physical-gift' ? 'Alamat Berhasil Disalin!' : 'Salin Alamat Lengkap'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
