/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Copy,
  Check,
  Send,
  Volume2,
  VolumeX,
  Camera,
  MessageSquare,
  Image as ImageIcon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { LeafyCorner, FloralDivider, LeafyWreath, BackgroundOrnaments } from "./Ornaments";
export default function InvitationContent({
  data,
  theme,
  guestName,
  isMusicPlaying,
  onToggleMusic,
  wishes,
  onAddWish
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedBankId, setCopiedBankId] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [formName, setFormName] = useState(guestName || "");
  const [formStatus, setFormStatus] = useState("Hadir");
  const [formGuests, setFormGuests] = useState(1);
  const [formMessage, setFormMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const accentColor = theme.primaryColor || "#b45309";
  const homeRef = useRef(null);
  const mempelaiRef = useRef(null);
  const acaraRef = useRef(null);
  const ceritaRef = useRef(null);
  const galeriRef = useRef(null);
  const rsvpRef = useRef(null);
  useEffect(() => {
    if (guestName) {
      setFormName(guestName);
    }
  }, [guestName]);
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(data.mainEventDate) - +/* @__PURE__ */ new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1e3 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1e3 * 60 * 60) % 24),
          minutes: Math.floor(difference / 1e3 / 60 % 60),
          seconds: Math.floor(difference / 1e3 % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1e3);
    return () => clearInterval(timer);
  }, [data.mainEventDate]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      if (rsvpRef.current && scrollPosition >= rsvpRef.current.offsetTop) {
        setActiveSection("rsvp");
      } else if (galeriRef.current && scrollPosition >= galeriRef.current.offsetTop) {
        setActiveSection("galeri");
      } else if (ceritaRef.current && scrollPosition >= ceritaRef.current.offsetTop) {
        setActiveSection("cerita");
      } else if (acaraRef.current && scrollPosition >= acaraRef.current.offsetTop) {
        setActiveSection("acara");
      } else if (mempelaiRef.current && scrollPosition >= mempelaiRef.current.offsetTop) {
        setActiveSection("mempelai");
      } else {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (ref, id) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };
  const handleCopyBank = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedBankId(id);
    setTimeout(() => setCopiedBankId(null), 3e3);
  };
  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3e3);
  };
  const handleSubmitRSVP = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) return;
    onAddWish({
      name: formName,
      status: formStatus,
      guestCount: formGuests,
      message: formMessage
    });
    setFormMessage("");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4e3);
  };
  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex !== null && data.gallery.length > 0) {
      setActivePhotoIndex((activePhotoIndex - 1 + data.gallery.length) % data.gallery.length);
    }
  };
  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (activePhotoIndex !== null && data.gallery.length > 0) {
      setActivePhotoIndex((activePhotoIndex + 1) % data.gallery.length);
    }
  };
  return <div className={`relative w-full min-h-screen ${theme.background} pb-28 text-slate-800 selection:bg-amber-100 overflow-x-hidden`}>
      {
    /* Background Ornaments Watermarks */
  }
      <BackgroundOrnaments color={accentColor} themeId={theme.id} />

      {
    /* Dynamic Falling Petals effect on content */
  }
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 12 }).map((_, i) => <div
    key={i}
    className="absolute bg-rose-200/25 rounded-full blur-[0.5px]"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${6 + Math.random() * 8}px`,
      height: `${6 + Math.random() * 8}px`,
      animation: `float-slow ${8 + Math.random() * 10}s infinite ease-in-out`,
      animationDelay: `${Math.random() * 5}s`
    }}
  />)}
      </div>

      {
    /* Floating Music Controller */
  }
      <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    onClick={onToggleMusic}
    className="fixed top-4 right-4 z-40 p-3 bg-white/75 backdrop-blur-md rounded-full shadow-lg border border-amber-500/20 text-amber-700 hover:bg-white transition-all cursor-pointer flex items-center justify-center"
    aria-label="Mute or Play background music"
  >
        {isMusicPlaying ? <div className="flex items-center gap-1">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] h-2 bg-amber-600 animate-[bar-bounce_0.8s_infinite_alternate]" />
              <span className="w-[2px] h-3 bg-amber-600 animate-[bar-bounce_0.6s_infinite_alternate_0.2s]" />
              <span className="w-[2px] h-1.5 bg-amber-600 animate-[bar-bounce_0.7s_infinite_alternate_0.1s]" />
            </div>
          </div> : <VolumeX className="w-5 h-5 text-gray-400" />}
      </motion.button>

      {
    /* Floating Bottom Nav Menu */
  }
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-lg border border-amber-500/10 shadow-xl rounded-full px-4 py-2 flex items-center gap-1 md:gap-2 max-w-[90vw] overflow-x-auto no-scrollbar">
        <button
    onClick={() => scrollToSection(homeRef, "home")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "home" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <Heart className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Home</span>
        </button>
        <button
    onClick={() => scrollToSection(mempelaiRef, "mempelai")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "mempelai" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Mempelai</span>
        </button>
        <button
    onClick={() => scrollToSection(acaraRef, "acara")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "acara" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Acara</span>
        </button>
        <button
    onClick={() => scrollToSection(ceritaRef, "cerita")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "cerita" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Cerita</span>
        </button>
        <button
    onClick={() => scrollToSection(galeriRef, "galeri")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "galeri" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Galeri</span>
        </button>
        <button
    onClick={() => scrollToSection(rsvpRef, "rsvp")}
    className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeSection === "rsvp" ? `${theme.secondary} scale-110 font-medium` : "text-gray-400"}`}
  >
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">RSVP</span>
        </button>
      </div>

      {
    /* SECTION 1: HERO / HOME */
  }
      <div id="home" ref={homeRef} className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 pt-16 pb-20 text-center relative z-10">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        
        {
    /* Frame Portrait */
  }
        <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
    className="relative w-64 h-80 md:w-72 md:h-96 rounded-t-full overflow-hidden border-8 border-white shadow-xl shadow-amber-900/5 mb-8"
  >
          <img
    src={data.gallery[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"}
    alt="Couple portrait cover"
    className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="max-w-xl"
  >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold mb-3">Pernikahan Impian</p>
          <h2
    className="text-4xl md:text-5xl font-script text-amber-600 leading-relaxed italic mb-4 font-semibold"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
            {data.groomName} & {data.brideName}
          </h2>
          <p className="text-sm font-serif text-slate-500 italic mb-8">
            {data.events[0]?.date || "Minggu, 20 September 2026"}
          </p>

          {
    /* Countdown timer UI */
  }
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto my-6">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-amber-500/10 shadow-md">
              <span className="block text-2xl font-bold font-serif text-slate-800">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Hari</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-amber-500/10 shadow-md">
              <span className="block text-2xl font-bold font-serif text-slate-800">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Jam</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-amber-500/10 shadow-md">
              <span className="block text-2xl font-bold font-serif text-slate-800">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Menit</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-amber-500/10 shadow-md">
              <span className="block text-2xl font-bold font-serif text-slate-800">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">Detik</span>
            </div>
          </div>
        </motion.div>
      </div>

      {
    /* QUOTE SECTION */
  }
      <div className="relative w-full max-w-xl mx-auto px-6 py-12 text-center relative z-10">
        <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5 }}
    className="bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-inner"
  >
          <Heart className="w-8 h-8 text-amber-500/40 fill-amber-500/5 mx-auto mb-4" />
          <p className="text-sm md:text-base leading-relaxed text-slate-600 font-serif italic mb-4">
            "{data.quoteText}"
          </p>
          <span className="text-xs tracking-wider text-amber-700 font-semibold uppercase">{data.quoteSource}</span>
        </motion.div>
      </div>

      {
    /* SECTION 2: MEMPELAI (BRIDE & GROOM PROFILE) */
  }
      <div id="mempelai" ref={mempelaiRef} className="w-full max-w-3xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">Profil Mempelai</span>
          <h2 className="text-3xl font-serif text-slate-800 mt-2 font-semibold">Mempelai Yang Berbahagia</h2>
          <FloralDivider color={accentColor} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {
    /* GROOM COLUMN */
  }
          <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="flex flex-col items-center text-center bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-lg shadow-amber-950/5 relative"
  >
            <LeafyWreath color={accentColor} className="w-44 h-44 mb-4">
              <div className="w-34 h-34 rounded-full overflow-hidden border-4 border-white shadow-md relative z-10">
                <img src={data.groomPhoto} alt={data.groomName} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
              </div>
            </LeafyWreath>
            <h3
    className="text-3xl font-script text-amber-600 italic font-semibold"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
              {data.groomName}
            </h3>
            <p className="text-base font-bold text-slate-800 mt-1 font-serif">{data.groomFullName}</p>
            <p className="text-xs text-slate-500 mt-3 italic">{data.groomOrder} dari pasangan:</p>
            <p className="text-sm font-semibold text-slate-700 mt-1 font-serif">{data.groomParents}</p>
            
            {data.groomInstagram && <a
    href={`https://Camera.com/${data.groomInstagram}`}
    target="_blank"
    rel="noreferrer noopener"
    className="mt-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white text-slate-600 font-medium border border-slate-200/60 transition-all shadow-sm"
  >
                <Camera className="w-3.5 h-3.5" />
                <span>@{data.groomInstagram}</span>
              </a>}
          </motion.div>

          {
    /* BRIDE COLUMN */
  }
          <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="flex flex-col items-center text-center bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-lg shadow-amber-950/5 relative"
  >
            <LeafyWreath color={accentColor} className="w-44 h-44 mb-4">
              <div className="w-34 h-34 rounded-full overflow-hidden border-4 border-white shadow-md relative z-10">
                <img src={data.bridePhoto} alt={data.brideName} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
              </div>
            </LeafyWreath>
            <h3
    className="text-3xl font-script text-amber-600 italic font-semibold"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
              {data.brideName}
            </h3>
            <p className="text-base font-bold text-slate-800 mt-1 font-serif">{data.brideFullName}</p>
            <p className="text-xs text-slate-500 mt-3 italic">{data.brideOrder} dari pasangan:</p>
            <p className="text-sm font-semibold text-slate-700 mt-1 font-serif">{data.brideParents}</p>
            
            {data.brideInstagram && <a
    href={`https://Camera.com/${data.brideInstagram}`}
    target="_blank"
    rel="noreferrer noopener"
    className="mt-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white text-slate-600 font-medium border border-slate-200/60 transition-all shadow-sm"
  >
                <Camera className="w-3.5 h-3.5" />
                <span>@{data.brideInstagram}</span>
              </a>}
          </motion.div>
        </div>
      </div>

      {
    /* SECTION 3: ACARA / EVENTS */
  }
      <div id="acara" ref={acaraRef} className="w-full max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">Informasi Acara</span>
          <h2 className="text-3xl font-serif text-slate-800 mt-2 font-semibold">Waktu & Tempat Acara</h2>
          <FloralDivider color={accentColor} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {data.events.map((evt, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: i * 0.2 }}
    className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-amber-500/10 shadow-md shadow-amber-950/5 flex flex-col justify-between relative overflow-hidden"
  >
              {
    /* Corner botanical decorations on event cards */
  }
              <LeafyCorner className="absolute top-1 left-1 text-amber-600/30 w-16 h-16 pointer-events-none" color={accentColor} />
              <LeafyCorner className="absolute top-1 right-1 text-amber-600/30 w-16 h-16 pointer-events-none rotate-90" color={accentColor} />
              <div>
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-amber-500/10 text-amber-600 rounded-full">
                    {i === 0 ? <Heart className="w-6 h-6 fill-amber-500/10" /> : <Calendar className="w-6 h-6" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-800 text-center mb-6">{evt.title}</h3>
                
                <div className="space-y-4 mb-8 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-slate-800">Hari / Tanggal</span>
                      <span>{evt.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-slate-800">Waktu</span>
                      <span>{evt.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-slate-800">Tempat</span>
                      <span className="font-bold text-slate-800">{evt.locationName}</span>
                      <p className="text-xs text-slate-500 mt-1">{evt.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {evt.mapsUrl && <a
    href={evt.mapsUrl}
    target="_blank"
    rel="noreferrer noopener"
    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-xs tracking-wide shadow-sm transition-all duration-300 ${theme.buttonColor} ${theme.buttonText}`}
  >
                  <MapPin className="w-4 h-4" />
                  <span>Petunjuk Lokasi (Google Maps)</span>
                </a>}
            </motion.div>)}
        </div>
      </div>

      {
    /* SECTION 4: LOVE STORY (TIMELINE) */
  }
      <div id="cerita" ref={ceritaRef} className="w-full max-w-2xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">Perjalanan Cinta Kami</span>
          <h2 className="text-3xl font-serif text-slate-800 mt-2 font-semibold">Our Love Story</h2>
          <FloralDivider color={accentColor} className="mt-4" />
        </div>

        <div className="relative border-l-2 border-amber-500/20 pl-6 ml-4 space-y-12">
          {data.loveStories.map((story, i) => <motion.div
    key={story.id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: i * 0.1 }}
    className="relative"
  >
              {
    /* timeline bullet */
  }
              <div className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#f4f7f2] border-4 border-amber-500/60 flex items-center justify-center z-10">
                <Heart className="w-2.5 h-2.5 text-amber-600 fill-amber-500/20" />
              </div>
              
              <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-sm">
                <span className="text-xs font-bold text-amber-700 font-serif bg-amber-500/10 px-2.5 py-1 rounded-full">{story.year}</span>
                <h3 className="text-base font-bold text-slate-800 mt-3 font-serif">{story.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{story.description}</p>
              </div>
            </motion.div>)}
        </div>
      </div>

      {
    /* SECTION 5: GALLERY */
  }
      <div id="galeri" ref={galeriRef} className="w-full max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">Galeri Bahagia</span>
          <h2 className="text-3xl font-serif text-slate-800 mt-2 font-semibold">Momen Indah Kami</h2>
          <FloralDivider color={accentColor} className="mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.gallery.map((imgUrl, i) => <motion.div
    key={i}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i % 3 * 0.15 }}
    className="group relative aspect-square rounded-2xl overflow-hidden border border-white/60 shadow-sm cursor-pointer"
    onClick={() => setActivePhotoIndex(i)}
  >
              <img
    src={imgUrl}
    alt={`Prewedding Moment ${i + 1}`}
    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
  />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all" />
              </div>
            </motion.div>)}
        </div>
      </div>

      {
    /* SECTION 6: DIGITAL GIFTS / AMPLOP DIGITAL */
  }
      <div className="w-full max-w-3xl mx-auto px-6 py-20 relative z-10">
        <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/80 shadow-md text-center">
          <Gift className="w-10 h-10 text-amber-600/60 mx-auto mb-4" />
          <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Kado Pernikahan</span>
          <h2 className="text-2xl font-serif text-slate-800 mt-1 font-semibold">Amplop Digital</h2>
          <p className="text-xs text-slate-500 mt-3 max-w-md mx-auto mb-10">
            Bagi keluarga dan kerabat yang ingin memberikan kado pernikahan digital, silakan mengirimkan melalui rekening/dompet digital berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left mb-8">
            {data.gifts.map((gift) => <div
    key={gift.id}
    className="bg-white p-6 rounded-2xl border border-amber-500/15 shadow-sm relative overflow-hidden"
  >
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-slate-900 pointer-events-none">
                  <Gift className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-amber-700 uppercase bg-amber-500/15 px-2.5 py-1 rounded-full font-serif">
                    {gift.bankName}
                  </span>
                </div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400">Nomor Rekening:</span>
                <span className="block text-base font-mono font-bold text-slate-700 mt-0.5 tracking-wider">
                  {gift.accountNumber}
                </span>
                
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 mt-3">Atas Nama:</span>
                <span className="block text-sm font-semibold text-slate-700 font-serif">
                  {gift.accountHolder}
                </span>

                <button
    onClick={() => handleCopyBank(gift.id, gift.accountNumber)}
    className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 bg-amber-50 hover:bg-amber-100/70 border border-amber-500/10 text-amber-800 rounded-xl text-xs font-semibold transition-colors"
  >
                  {copiedBankId === gift.id ? <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Berhasil Disalin!</span>
                    </> : <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin No. Rekening</span>
                    </>}
                </button>
              </div>)}
          </div>

          {data.giftAddress && <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-500/10 text-left">
              <span className="block text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
                Kirim Kado / Bingkisan Fisik:
              </span>
              <p className="text-xs text-slate-600 font-serif leading-relaxed mb-1">
                {data.giftAddress}
              </p>
              <p className="text-xs font-bold text-slate-700 mt-2 font-serif">
                Penerima: {data.giftRecipientName}
              </p>
              
              <button
    onClick={() => handleCopyAddress(`${data.giftAddress} (Penerima: ${data.giftRecipientName})`)}
    className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
  >
                {copiedAddress ? <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Alamat Disalin!</span>
                  </> : <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salin Alamat Kirim</span>
                  </>}
              </button>
            </div>}
        </div>
      </div>

      {
    /* SECTION 7: RSVP & UCAPAN / DOSA (GUESTBOOK) */
  }
      <div id="rsvp" ref={rsvpRef} className="w-full max-w-3xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">Konfirmasi Kehadiran</span>
          <h2 className="text-3xl font-serif text-slate-800 mt-2 font-semibold">RSVP & Ucapan Bahagia</h2>
          <FloralDivider color={accentColor} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {
    /* RSVP FORM */
  }
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md">
            <h3 className="text-base font-bold text-slate-800 mb-5 font-serif border-b border-amber-500/10 pb-3">Kirim Konfirmasi</h3>
            
            <form onSubmit={handleSubmitRSVP} className="space-y-4 text-xs md:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Tamu *</label>
                <input
    type="text"
    value={formName}
    onChange={(e) => setFormName(e.target.value)}
    placeholder="Masukkan Nama Anda"
    required
    className="w-full p-3 rounded-xl border border-slate-200 bg-white/50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-700"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Konfirmasi Kehadiran *</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hadir", "Tidak Hadir", "Ragu-ragu"].map((status) => <button
    key={status}
    type="button"
    onClick={() => setFormStatus(status)}
    className={`py-2 px-1 rounded-xl text-center text-xs font-semibold cursor-pointer border transition-all ${formStatus === status ? "bg-amber-100 border-amber-500 text-amber-800 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
  >
                      {status}
                    </button>)}
                </div>
              </div>

              {formStatus === "Hadir" && <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Jumlah Tamu Hadir</label>
                  <select
    value={formGuests}
    onChange={(e) => setFormGuests(Number(e.target.value))}
    className="w-full p-3 rounded-xl border border-slate-200 bg-white/50 focus:border-amber-500/50 focus:outline-none text-slate-700"
  >
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} Orang</option>)}
                  </select>
                </div>}

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Ucapan & Doa Restu *</label>
                <textarea
    value={formMessage}
    onChange={(e) => setFormMessage(e.target.value)}
    placeholder="Tulis ucapan selamat dan doa restu Anda..."
    required
    rows={4}
    className="w-full p-3 rounded-xl border border-slate-200 bg-white/50 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500 focus:outline-none text-slate-700 resize-none"
  />
              </div>

              <button
    type="submit"
    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-xs tracking-wider shadow-sm transition-all duration-300 ${theme.buttonColor} ${theme.buttonText}`}
  >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim RSVP & Ucapan</span>
              </button>
            </form>
          </div>

          {
    /* UCAPAN / GUEST WISHES VIEW */
  }
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/90 shadow-md flex flex-col h-[480px]">
            <h3 className="text-base font-bold text-slate-800 mb-4 font-serif border-b border-amber-500/10 pb-3 flex items-center justify-between">
              <span>Wishes ({wishes.length})</span>
              <BookOpen className="w-4.5 h-4.5 text-amber-600/60" />
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 no-scrollbar">
              {wishes.length === 0 ? <div className="text-center py-16 text-slate-400">
                  <Heart className="w-10 h-10 mx-auto opacity-20 mb-3" />
                  <p className="text-xs">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>
                </div> : wishes.map((wish) => <motion.div
    key={wish.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-3.5 rounded-2xl bg-white border border-amber-500/5 shadow-sm"
  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xs font-bold text-slate-800 font-serif">{wish.name}</h4>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${wish.status === "Hadir" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : wish.status === "Tidak Hadir" ? "bg-rose-50 text-rose-700 border border-rose-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                        {wish.status} {wish.status === "Hadir" && `(${wish.guestCount})`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 whitespace-pre-line mt-1 font-sans italic">
                      "{wish.message}"
                    </p>
                    <span className="block text-[8px] text-slate-400 mt-2 text-right">
                      {wish.timestamp}
                    </span>
                  </motion.div>)}
            </div>
          </div>
        </div>
      </div>

      {
    /* SECTION 8: PENUTUP */
  }
      <div className="relative w-full max-w-xl mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
    className="space-y-6"
  >
          <p className="text-xs md:text-sm font-serif leading-relaxed text-slate-600 max-w-md mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-slate-400">Kami Yang Berbahagia,</p>
          
          <h2
    className="text-4xl md:text-5xl font-script text-amber-600 leading-relaxed italic font-semibold"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
            {data.groomName} & {data.brideName}
          </h2>
          <p className="text-xs text-slate-400 italic">Beserta Segenap Keluarga Besar</p>
          
          <div className="pt-8 text-amber-500/30 flex justify-center">
            <Heart className="w-6 h-6 fill-amber-500/10" />
          </div>
        </motion.div>
      </div>

      {
    /* GALLERY LIGHTBOX */
  }
      <AnimatePresence>
        {activePhotoIndex !== null && <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4 cursor-zoom-out select-none"
    onClick={() => setActivePhotoIndex(null)}
  >
            {
    /* Close Button */
  }
            <button
    onClick={() => setActivePhotoIndex(null)}
    className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
  >
              <X className="w-6 h-6" />
            </button>

            {
    /* Lightbox Content Container */
  }
            <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
              {
    /* Prev Button */
  }
              <button
    onClick={handlePrevPhoto}
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 text-white hover:bg-white/25 rounded-full p-2 hover:scale-105 active:scale-95 transition-all z-50 border border-white/10"
  >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
    key={activePhotoIndex}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    src={data.gallery[activePhotoIndex]}
    alt={`Prewedding Gallery ${activePhotoIndex + 1}`}
    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
    onClick={(e) => e.stopPropagation()}
  />

              {
    /* Next Button */
  }
              <button
    onClick={handleNextPhoto}
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 text-white hover:bg-white/25 rounded-full p-2 hover:scale-105 active:scale-95 transition-all z-50 border border-white/10"
  >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {
    /* Thumbnail caption index indicator */
  }
            <div className="absolute bottom-4 text-white text-xs tracking-wider uppercase bg-black/50 px-4 py-1.5 rounded-full">
              Foto {activePhotoIndex + 1} dari {data.gallery.length}
            </div>
          </motion.div>}
      </AnimatePresence>

      {
    /* RSVP Success Toast Notification */
  }
      <AnimatePresence>
        {showSuccessToast && <motion.div
    initial={{ opacity: 0, y: 50, x: "-50%" }}
    animate={{ opacity: 1, y: 0, x: "-50%" }}
    exit={{ opacity: 0, y: 50, x: "-50%" }}
    className="fixed bottom-24 left-1/2 z-50 bg-emerald-600 text-white rounded-2xl px-6 py-4 flex items-center gap-3 shadow-2xl font-semibold text-xs border border-emerald-500 max-w-sm text-center"
  >
            <Check className="w-5 h-5 bg-white/20 p-0.5 rounded-full animate-bounce" />
            <span>Terima kasih! RSVP dan doa restu Anda telah disimpan & ditambahkan ke Guestbook.</span>
          </motion.div>}
      </AnimatePresence>
    </div>;
}
