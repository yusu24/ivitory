import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Copy,
  Check,
  Music,
  VolumeX,
  Send,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  Flower2,
} from 'lucide-react';
import Floral3DScene from './components/Floral3DScene';
import Tilt3DCard from './components/Tilt3DCard';
import { usePublicRsvpWall, useSubmitRsvp } from '../../hooks/usePublicInvitation';

function formatIndoDate(dateStr) {
  if (!dateStr) return 'Minggu, 14 Februari 2027';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function useCountdown(targetDateStr) {
  const [timeLeft, setTimeLeft] = useState({ days: 48, hours: 12, minutes: 30, seconds: 15 });

  useEffect(() => {
    const target = targetDateStr ? new Date(targetDateStr).getTime() : Date.now() + 48 * 86400000;
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  return timeLeft;
}

export default function Floral3DTemplate({
  invitation = {},
  slug = 'preview',
  guestName = 'Bapak/Ibu/Saudara/i',
  isOpen = false,
  isPlaying = false,
  disableMusic = false,
  onOpen,
  onToggleMusic,
  audioRef,
}) {
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // RSVP & Guestbook state
  const isRealSlug = Boolean(slug && slug !== 'preview');
  const { data: rsvpWallData } = usePublicRsvpWall(isRealSlug ? slug : null);
  const submitRsvpMutation = useSubmitRsvp(slug);

  const [localWishes, setLocalWishes] = useState([
    {
      id: 1,
      sender_name: 'Keluarga Besar Dr. Hendra Wijaya',
      message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah penuh bunga kebahagiaan.',
      attendance: 'attending',
      created_at: 'Baru saja',
    },
    {
      id: 2,
      sender_name: 'Clarissa & Sahabat',
      message: 'Undangan 3D-nya cantik dan romantis sekali! InsyaAllah kami hadir di hari bahagia kalian.',
      attendance: 'attending',
      created_at: '15 menit lalu',
    },
  ]);

  const [rsvpForm, setRsvpForm] = useState({
    name: guestName !== 'Bapak/Ibu Tamu Kehormatan' ? guestName : '',
    attendance: 'attending',
    guests_count: 2,
    message: '',
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const brideNickname = invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || 'Aurelia';
  const groomNickname = invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || 'Keenan';
  const brideFullName = invitation.bride_name || 'Aurelia Rose Maharani';
  const groomFullName = invitation.groom_name || 'Keenan Dharma Putra';
  const brideParents = invitation.bride_parents || 'Putri dari Bapak Ir. Darmawan & Ibu Hj. Rosita Sari';
  const groomParents = invitation.groom_parents || 'Putra dari Bapak Drs. Suryono & Ibu Hj. Melati Kusuma';

  const coverPhoto =
    invitation.cover_photo_url ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';
  const bridePhoto =
    invitation.bride_photo_url ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80';
  const groomPhoto =
    invitation.groom_photo_url ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80';

  const countdown = useCountdown(invitation.akad_date);

  const handleOpen3DEnvelope = () => {
    setEnvelopeOpening(true);
    setTimeout(() => {
      onOpen?.();
    }, 850);
  };

  const handleCopyRekening = (number, id) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2200);
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    if (isRealSlug) {
      try {
        await submitRsvpMutation.mutateAsync({
          guest_name: rsvpForm.name,
          status: rsvpForm.attendance,
          pax: Number(rsvpForm.guests_count) || 1,
          message: rsvpForm.message,
        });
      } catch {
        // Fallback to local state if preview
      }
    }

    if (rsvpForm.message.trim()) {
      setLocalWishes((prev) => [
        {
          id: Date.now(),
          sender_name: rsvpForm.name,
          message: rsvpForm.message,
          attendance: rsvpForm.attendance,
          created_at: 'Baru saja',
        },
        ...prev,
      ]);
    }
    setRsvpSubmitted(true);
    setRsvpForm((prev) => ({ ...prev, message: '' }));
  };

  const apiWishes = rsvpWallData?.data;
  const wishesList = apiWishes && apiWishes.length > 0 ? apiWishes : localWishes;
  const galleryPhotos =
    invitation.gallery_photos && invitation.gallery_photos.length > 0
      ? invitation.gallery_photos
      : [
          {
            id: 1,
            url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
            caption: 'Taman Bunga Mawar di Musim Semi',
          },
          {
            id: 2,
            url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
            caption: 'Janji Suci di Bawah Gerbang Bunga',
          },
          {
            id: 3,
            url: 'https://images.unsplash.com/photo-1583939000340-c69c5be0e386?auto=format&fit=crop&w=900&q=80',
            caption: 'Senyum Bahagia Menuju Pelaminan',
          },
          {
            id: 4,
            url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
            caption: 'Genggaman Tangan Selamanya',
          },
          {
            id: 5,
            url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80',
            caption: 'Cincin Emas Ikatan Cinta',
          },
          {
            id: 6,
            url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
            caption: 'Langkah Bersama Menuju Keabadian',
          },
        ];

  const loveStories =
    invitation.love_story_items && invitation.love_story_items.length > 0
      ? invitation.love_story_items
      : [
          {
            id: 1,
            item_date: 'Musim Semi 2022',
            title: 'Pertemuan Pertama di Taman Bunga',
            story:
              'Takdir mempertemukan kami dalam suasana hangat yang dipenuhi senyum tulus. Sejak hari itu, setiap percakapan menjadi awal dari bunga cinta yang terus mekar.',
          },
          {
            id: 2,
            item_date: 'Oktober 2025',
            title: 'Lamaran & Ikatan Restu Keluarga',
            story:
              'Di hadapan kedua keluarga tercinta, kami mengikrarkan keseriusan untuk melangkah bersama dan menyatukan dua hati dalam ikatan suci.',
          },
          {
            id: 3,
            item_date: formatIndoDate(invitation.akad_date),
            title: 'Awal Keabadian Kami',
            story:
              'Dengan memohon ridho Tuhan Yang Maha Esa, kami mengikat janji suci pernikahan untuk saling mencintai dan menjaga sepanjang usia.',
          },
        ];

  const bankAccounts =
    invitation.bank_accounts && invitation.bank_accounts.length > 0
      ? invitation.bank_accounts
      : [
          {
            id: 1,
            bank_name: 'Bank Central Asia (BCA)',
            account_number: '8290382910',
            account_holder: brideFullName,
          },
          {
            id: 2,
            bank_name: 'Bank Mandiri',
            account_number: '140002391823',
            account_holder: groomFullName,
          },
        ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf4f6] via-[#faeaee] to-[#fdf6f0] text-[#4a2531] font-sans-body relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-950">
      {/* Audio Element */}
      {!disableMusic && (
        <audio
          ref={audioRef}
          src={invitation.music_url || '/templates/ulems/pure-love-304010.mp3'}
          loop
        />
      )}

      {/* Fullscreen Interactive 3D WebGL Floral & Wedding Rings Scene */}
      <Floral3DScene isCover={!isOpen} animate={isOpen} />

      {/* Ambient Soft Rose & Champagne Glows */}
      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none z-0" />

      {/* =====================================================================
          3D INTERACTIVE ENVELOPE & FLORAL ARCH COVER GATE
      ===================================================================== */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="cover-3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.18,
              filter: 'blur(12px)',
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#fdf2f5]/75 via-[#f9e5eb]/65 to-[#fdf4f6]/85 backdrop-blur-xs"
          >
            <div
              className="w-full max-w-md relative"
              style={{ perspective: '1400px' }}
            >
              <Tilt3DCard intensity={0} className="p-7 sm:p-9 text-center border-2 border-white/80">
                {/* 3D Envelope Top Flap Indicator */}
                <div
                  className="mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 p-0.5 shadow-lg shadow-rose-300/50 transition-transform duration-700"
                  style={{
                    transform: envelopeOpening
                      ? 'translateZ(45px) rotateX(180deg) scale(1.15)'
                      : 'translateZ(35px)',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
                    <Flower2 className="w-8 h-8 text-rose-500" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-amber-700 mt-0.5">
                      3D Floral
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.22em] text-rose-800 mb-3">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>The Wedding Of</span>
                </div>

                {/* Couple Names in 3D Depth */}
                <h1
                  className="text-4xl sm:text-5xl font-serif-title italic font-bold text-[#4a202d] tracking-tight leading-tight mb-2 drop-shadow-xs"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  {brideNickname} <span className="text-rose-400 font-normal">&amp;</span> {groomNickname}
                </h1>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700/80 mb-6">
                  {formatIndoDate(invitation.akad_date)}
                </p>

                {/* Framed Couple Thumbnail with 3D Floral Ring */}
                <div className="relative mx-auto w-36 h-36 mb-6">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-rose-300 via-amber-200 to-pink-300 opacity-75 blur-2xs" />
                  <img
                    src={coverPhoto}
                    alt={`${brideNickname} & ${groomNickname}`}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                </div>

                {/* Guest Name Box */}
                <div className="bg-rose-50/85 border border-rose-200/80 rounded-2xl p-4 mb-6 shadow-inner">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-rose-600 font-semibold mb-1">
                    Kepada Yth. Bapak/Ibu/Saudara/i
                  </p>
                  <p className="text-base font-bold text-[#4a202d] font-serif-title">
                    {guestName || 'Tamu Kehormatan'}
                  </p>
                </div>

                {/* Open 3D Invitation Button */}
                <button
                  type="button"
                  onClick={handleOpen3DEnvelope}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-[0.18em] shadow-lg shadow-rose-400/40 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{envelopeOpening ? 'Membuka Taman 3D...' : 'Buka Undangan 3D'}</span>
                </button>
              </Tilt3DCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MAIN 3D FLORAL INVITATION CONTENT
      ===================================================================== */}
      {isOpen && (
        <motion.div
          key="main-3d"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10"
        >
          {/* Floating Music Toggle Button */}
          {!disableMusic && (
            <button
              type="button"
              onClick={onToggleMusic}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/85 backdrop-blur-xl border border-rose-200 shadow-lg shadow-rose-500/20 flex items-center justify-center text-rose-600 hover:scale-110 transition-all cursor-pointer"
              title="Putar / Hentikan Musik"
            >
              {isPlaying ? (
                <Music className="w-5 h-5 animate-spin [animation-duration:6s]" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>
          )}

          {/* 1. HERO SECTION WITH 3D ROTATING WEDDING RINGS & FLORAL ARCH */}
          <section className="min-h-screen flex flex-col items-center justify-between py-14 px-4 sm:px-6 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-xs text-[11px] font-bold uppercase tracking-[0.22em] text-rose-800"
            >
              <Flower2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Rosé Jardin • Interactive 3D Wedding</span>
            </motion.div>

            {/* Spacer so the 3D Interlocked Wedding Rings & Blooming Floral Arch shine in the middle */}
            <div className="my-auto py-28 sm:py-32 flex flex-col items-center">
              <div className="px-6 py-5 rounded-[32px] bg-white/50 backdrop-blur-md border border-white/80 shadow-lg max-w-lg">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-700 mb-2">
                  Pernikahan Suci
                </p>
                <h1 className="text-4xl sm:text-6xl font-serif-title italic font-bold text-[#4a202d] drop-shadow-xs leading-tight">
                  {brideNickname} <span className="text-rose-400 font-normal">&amp;</span> {groomNickname}
                </h1>
                <p className="mt-3 text-xs sm:text-sm font-semibold text-rose-800/90 tracking-widest uppercase">
                  {formatIndoDate(invitation.akad_date)}
                </p>
              </div>
            </div>

            {/* 3D Floating Glass Countdown Pills */}
            <div className="w-full max-w-md grid grid-cols-4 gap-2.5 sm:gap-3">
              {[
                { label: 'Hari', value: countdown.days },
                { label: 'Jam', value: countdown.hours },
                { label: 'Menit', value: countdown.minutes },
                { label: 'Detik', value: countdown.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/75 backdrop-blur-xl border border-rose-200/80 p-3 shadow-md hover:-translate-y-1 transition-transform"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-rose-700 font-serif-title">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-rose-900/60 mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. SACRED VERSE / OPENING QUOTE */}
          <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
            <Tilt3DCard intensity={7} className="p-8 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 border border-rose-200 mx-auto mb-5 flex items-center justify-center text-rose-600 shadow-inner">
                <Heart className="w-5 h-5 fill-rose-400 text-rose-500" />
              </div>
              <p className="text-sm sm:text-base italic leading-relaxed text-[#5c303e] font-serif-title mb-4">
                &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                — QS. Ar-Rum : 21 —
              </p>
              {invitation.opening_text && (
                <p className="mt-6 pt-6 border-t border-rose-200/60 text-xs sm:text-sm text-[#6b3c4b] leading-relaxed">
                  {invitation.opening_text}
                </p>
              )}
            </Tilt3DCard>
          </section>

          {/* 3. COUPLE PROFILES IN 3D PERSPECTIVE CARDS */}
          <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-3">
                <Flower2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Mempelai Berbahagia</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title italic font-bold text-[#4a202d]">
                Dua Hati Satu Janji Suci
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Bride 3D Card */}
              <Tilt3DCard intensity={9} className="p-8 text-center flex flex-col items-center justify-between">
                <div className="relative w-44 h-56 mx-auto mb-6">
                  <div className="absolute -inset-2 rounded-[100px] bg-gradient-to-b from-rose-300 via-amber-200 to-pink-300 opacity-70 blur-xs" />
                  <img
                    src={bridePhoto}
                    alt={brideFullName}
                    className="relative w-full h-full object-cover rounded-[100px] border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                    The Bride
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-title italic font-bold text-[#4a202d] mb-2">
                    {brideFullName}
                  </h3>
                  <p className="text-xs text-rose-800/80 leading-relaxed max-w-xs mx-auto">
                    {brideParents}
                  </p>
                </div>
              </Tilt3DCard>

              {/* Groom 3D Card */}
              <Tilt3DCard intensity={9} className="p-8 text-center flex flex-col items-center justify-between">
                <div className="relative w-44 h-56 mx-auto mb-6">
                  <div className="absolute -inset-2 rounded-[100px] bg-gradient-to-b from-amber-300 via-rose-300 to-pink-300 opacity-70 blur-xs" />
                  <img
                    src={groomPhoto}
                    alt={groomFullName}
                    className="relative w-full h-full object-cover rounded-[100px] border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                    The Groom
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-title italic font-bold text-[#4a202d] mb-2">
                    {groomFullName}
                  </h3>
                  <p className="text-xs text-rose-800/80 leading-relaxed max-w-xs mx-auto">
                    {groomParents}
                  </p>
                </div>
              </Tilt3DCard>
            </div>
          </section>

          {/* 4. EVENT DETAILS (AKAD & RESEPSI) IN 3D CARDS */}
          <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-3">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Waktu &amp; Tempat</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title italic font-bold text-[#4a202d]">
                Rangkaian Acara Pernikahan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Akad Nikah */}
              <Tilt3DCard intensity={8} className="p-8 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white mx-auto mb-5 flex items-center justify-center shadow-md shadow-rose-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700 block mb-1">
                    Prosesi Sakral
                  </span>
                  <h3 className="text-2xl font-serif-title italic font-bold text-[#4a202d] mb-6">
                    Akad Nikah
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-[#5c303e] bg-rose-50/70 rounded-2xl p-4 border border-rose-200/60 mb-6">
                    <div className="flex items-center justify-center gap-2 font-bold">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>{formatIndoDate(invitation.akad_date)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 font-medium">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Pukul {invitation.akad_time || '08:00'} WIB - Selesai</span>
                    </div>
                    <div className="pt-2 border-t border-rose-200/50">
                      <p className="font-bold text-[#4a202d]">
                        {invitation.akad_location || 'Glasshouse Floral Sanctuary'}
                      </p>
                      <p className="text-xs text-rose-800/75 mt-0.5">
                        {invitation.akad_address || 'Jl. Karang Mas Sejahtera, Uluwatu, Bali'}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={invitation.akad_map_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-[#4a202d] hover:bg-[#381620] text-white text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4 text-rose-300" />
                  <span>Petunjuk Lokasi Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </a>
              </Tilt3DCard>

              {/* Resepsi Pernikahan */}
              <Tilt3DCard intensity={8} className="p-8 text-center flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white mx-auto mb-5 flex items-center justify-center shadow-md shadow-amber-300">
                    <Flower2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-700 block mb-1">
                    Perayaan Cinta
                  </span>
                  <h3 className="text-2xl font-serif-title italic font-bold text-[#4a202d] mb-6">
                    Resepsi Pernikahan
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-[#5c303e] bg-rose-50/70 rounded-2xl p-4 border border-rose-200/60 mb-6">
                    <div className="flex items-center justify-center gap-2 font-bold">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>{formatIndoDate(invitation.resepsi_date || invitation.akad_date)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 font-medium">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Pukul {invitation.resepsi_time || '11:00'} WIB - Selesai</span>
                    </div>
                    <div className="pt-2 border-t border-rose-200/50">
                      <p className="font-bold text-[#4a202d]">
                        {invitation.resepsi_location || 'Royal Rose Botanical Ballroom'}
                      </p>
                      <p className="text-xs text-rose-800/75 mt-0.5">
                        {invitation.resepsi_address || 'Jl. Karang Mas Sejahtera, Uluwatu, Bali'}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={invitation.resepsi_map_url || invitation.akad_map_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Lokasi Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </a>
              </Tilt3DCard>
            </div>
          </section>

          {/* 5. 3D LOVE STORY TIMELINE */}
          <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-3">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Perjalanan Cinta</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title italic font-bold text-[#4a202d]">
                Kisah Cinta Kami
              </h2>
            </div>

            <div className="space-y-6">
              {loveStories.map((item, idx) => (
                <Tilt3DCard key={item.id || idx} intensity={6} className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-400 text-white font-serif-title font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                        {item.item_date}
                      </span>
                      <h3 className="text-xl font-serif-title italic font-bold text-[#4a202d] mt-0.5 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5c303e] leading-relaxed">
                        {item.story}
                      </p>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </section>

          {/* 6. 3D INTERACTIVE GALLERY */}
          <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Potret Kebahagiaan</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title italic font-bold text-[#4a202d]">
                Galeri Momen Indah
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryPhotos.map((photo, idx) => (
                <Tilt3DCard
                  key={photo.id || idx}
                  intensity={10}
                  showFloralCorners={false}
                  className="p-3 cursor-pointer group"
                >
                  <div
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative h-64 rounded-[26px] overflow-hidden"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || `Galeri ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/25 to-transparent text-white">
                      <p className="text-xs font-serif-title italic">
                        {photo.caption || 'Momen Bahagia'}
                      </p>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </section>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-3">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full max-h-[75vh] object-cover rounded-2xl"
                />
                {selectedPhoto.caption && (
                  <p className="text-center py-3 text-sm font-serif-title italic text-[#4a202d]">
                    {selectedPhoto.caption}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 7. AMPLOP DIGITAL (3D GIFT CARDS) */}
          <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-3">
                <Gift className="w-3.5 h-3.5 text-rose-500" />
                <span>Tanda Kasih</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-title italic font-bold text-[#4a202d]">
                Amplop Digital 3D
              </h2>
              <p className="text-xs sm:text-sm text-rose-800/80 max-w-md mx-auto mt-2">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin mengirimkan tanda kasih, dapat melalui rekening berikut:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bankAccounts.map((acc, idx) => (
                <Tilt3DCard key={acc.id || idx} intensity={10} className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-bold uppercase tracking-widest">
                      {acc.bank_name}
                    </span>
                    <Gift className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-xl sm:text-2xl font-mono font-extrabold text-[#4a202d] tracking-wider my-3">
                    {acc.account_number}
                  </p>
                  <p className="text-xs text-rose-800/80 font-semibold mb-5">
                    a.n. {acc.account_holder}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyRekening(acc.account_number, acc.id || idx)}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-100/90 hover:bg-rose-200/80 text-rose-900 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedAccount === (acc.id || idx) ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </Tilt3DCard>
              ))}
            </div>
          </section>

          {/* 8. RSVP & UCAPAN DOA RESTU */}
          <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
            <Tilt3DCard intensity={5} className="p-7 sm:p-10">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 border border-rose-200 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-700 mb-2">
                  <Send className="w-3 h-3 text-rose-500" />
                  <span>Konfirmasi &amp; Doa Restu</span>
                </span>
                <h2 className="text-3xl font-serif-title italic font-bold text-[#4a202d]">
                  Buku Tamu &amp; RSVP
                </h2>
              </div>

              {rsvpSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Terima kasih! Konfirmasi kehadiran dan doa restu Anda telah tersimpan.</span>
                </div>
              )}

              <form onSubmit={handleRsvpSubmit} className="space-y-4 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4a202d] mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                      placeholder="Masukkan nama Anda..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-rose-200 text-xs text-[#4a202d] focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#4a202d] mb-1.5">
                      Konfirmasi Kehadiran
                    </label>
                    <select
                      value={rsvpForm.attendance}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, attendance: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-rose-200 text-xs font-semibold text-[#4a202d] focus:outline-none focus:border-rose-400"
                    >
                      <option value="attending">Hadir</option>
                      <option value="not_attending">Maaf, Belum Bisa Hadir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4a202d] mb-1.5">
                    Ucapan &amp; Doa Restu
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Tuliskan doa & harapan terbaik untuk kedua mempelai..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-rose-200 text-xs text-[#4a202d] focus:outline-none focus:border-rose-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Konfirmasi &amp; Ucapan</span>
                </button>
              </form>

              {/* Wishes Feed */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {wishesList.map((wish, idx) => (
                  <div
                    key={wish.id || idx}
                    className="p-4 rounded-2xl bg-white/80 border border-rose-100 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-[#4a202d]">
                        {wish.sender_name || wish.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          wish.attendance === 'attending'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {wish.attendance === 'attending' ? 'Hadir' : 'Berhalangan'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5c303e] leading-relaxed">{wish.message}</p>
                  </div>
                ))}
              </div>
            </Tilt3DCard>
          </section>

          {/* 9. ROMANTIC 3D FOOTER */}
          <footer className="py-16 px-4 text-center">
            <div className="max-w-md mx-auto">
              <Flower2 className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <p className="text-xs uppercase tracking-[0.22em] text-rose-700/80 font-semibold mb-1">
                Kami Yang Berbahagia
              </p>
              <h3 className="text-3xl font-serif-title italic font-bold text-[#4a202d] mb-6">
                {brideNickname} &amp; {groomNickname}
              </h3>
              <p className="text-[11px] text-rose-900/60">
                Rosé Jardin 3D Interactive Edition • Powered by Three.js WebGL
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
