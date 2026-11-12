/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
export const THEMES = [
  {
    id: "sage-green",
    name: "Sage Green Minimalist",
    primary: "bg-[#606c38]",
    secondary: "text-[#606c38]",
    background: "bg-[#f4f7f2]",
    cardBg: "bg-white",
    textPrimary: "text-[#2b3a1a]",
    textSecondary: "text-[#586445]",
    accent: "border-[#dda15e]",
    buttonColor: "bg-[#606c38] hover:bg-[#4a532b]",
    buttonText: "text-white",
    fontHeading: "font-serif",
    fontBody: "font-sans",
    containerClass: "from-[#f4f7f2] via-[#e8efe3] to-[#f4f7f2]",
    primaryColor: "#606c38"
  },
  {
    id: "earthy-terracotta",
    name: "Earthy Terracotta",
    primary: "bg-[#bc6c25]",
    secondary: "text-[#bc6c25]",
    background: "bg-[#fefae0]",
    cardBg: "bg-[#fffdf2]",
    textPrimary: "text-[#5c3c10]",
    textSecondary: "text-[#8c6c40]",
    accent: "border-[#dda15e]",
    buttonColor: "bg-[#bc6c25] hover:bg-[#9a531a]",
    buttonText: "text-white",
    fontHeading: "font-serif",
    fontBody: "font-sans",
    containerClass: "from-[#fefae0] via-[#faebd7] to-[#fefae0]",
    primaryColor: "#bc6c25"
  },
  {
    id: "royal-gold",
    name: "Royal Gold & White",
    primary: "bg-[#c5a85c]",
    secondary: "text-[#c5a85c]",
    background: "bg-[#fafafa]",
    cardBg: "bg-white",
    textPrimary: "text-[#1e2022]",
    textSecondary: "text-[#686d76]",
    accent: "border-[#c5a85c]",
    buttonColor: "bg-[#c5a85c] hover:bg-[#b09347]",
    buttonText: "text-white",
    fontHeading: "font-serif",
    fontBody: "font-sans",
    containerClass: "from-[#fafafa] via-[#f4ebd0] to-[#fafafa]",
    primaryColor: "#c5a85c"
  },
  {
    id: "rose-gold",
    name: "Romantic Rose Gold",
    primary: "bg-[#b76e79]",
    secondary: "text-[#b76e79]",
    background: "bg-[#fff5f5]",
    cardBg: "bg-white",
    textPrimary: "text-[#4e2f34]",
    textSecondary: "text-[#8c5a61]",
    accent: "border-[#e4b4b4]",
    buttonColor: "bg-[#b76e79] hover:bg-[#9e5560]",
    buttonText: "text-white",
    fontHeading: "font-serif",
    fontBody: "font-sans",
    containerClass: "from-[#fff5f5] via-[#ffe3e3] to-[#fff5f5]",
    primaryColor: "#b76e79"
  },
  {
    id: "midnight-navy",
    name: "Midnight Navy Luxury",
    primary: "bg-[#0f172a]",
    secondary: "text-[#c5a85c]",
    background: "bg-[#0f172a]",
    cardBg: "bg-[#1e293b]",
    textPrimary: "text-[#f8fafc]",
    textSecondary: "text-[#94a3b8]",
    accent: "border-[#c5a85c]",
    buttonColor: "bg-[#c5a85c] hover:bg-[#b09347]",
    buttonText: "text-[#0f172a] font-semibold",
    fontHeading: "font-serif",
    fontBody: "font-sans",
    containerClass: "from-[#0f172a] via-[#1e1b4b] to-[#0f172a]",
    primaryColor: "#c5a85c"
  }
];
export const MUSIC_TRACKS = [
  {
    name: "Beautiful Dream (Piano)",
    url: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
  },
  {
    name: "Reverie Love Story (Acoustic & Piano)",
    url: "https://assets.mixkit.co/music/preview/mixkit-reverie-251.mp3"
  },
  {
    name: "Serenade of the Stars (Symphonic)",
    url: "https://assets.mixkit.co/music/preview/mixkit-serenade-of-the-stars-1166.mp3"
  },
  {
    name: "SoundHelix Soft Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];
export const DEFAULT_INVITATION_DATA = {
  title: "The Wedding Of",
  groomName: "Yusuf",
  groomFullName: "Yusuf Efendi, S.T.",
  groomParents: "Bpk. Hendra Efendi & Ibu Aminah",
  groomInstagram: "yusuf.efendi",
  groomOrder: "Putra Pertama",
  groomPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
  brideName: "Nabila",
  brideFullName: "Nabila Safira, S.Kom.",
  brideParents: "Bpk. Ahmad Safitri & Ibu Rina Marlina",
  brideInstagram: "nabila.safira",
  brideOrder: "Putri Kedua",
  bridePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  mainEventDate: "2026-09-20",
  // Default date
  events: [
    {
      title: "Akad Nikah",
      date: "Minggu, 20 September 2026",
      time: "08:00 - 10:00 WIB",
      locationName: "Masjid Raya Al-Bina",
      address: "Jl. Pintu Satu Senayan, Gelora, Kec. Tanah Abang, Jakarta Pusat",
      mapsUrl: "https://maps.app.goo.gl/9xZ7f2V1x8W2z3Y4A"
    },
    {
      title: "Resepsi Pernikahan",
      date: "Minggu, 20 September 2026",
      time: "11:00 - 14:00 WIB",
      locationName: "Gedung Serbaguna Al-Bina",
      address: "Jl. Pintu Satu Senayan, Gelora, Kec. Tanah Abang, Jakarta Pusat",
      mapsUrl: "https://maps.app.goo.gl/9xZ7f2V1x8W2z3Y4A"
    }
  ],
  loveStories: [
    {
      id: "story-1",
      year: "2021",
      title: "Awal Bertemu",
      description: "Pertemuan pertama kami bermula di bangku universitas saat bersama-sama mengikuti organisasi kemahasiswaan. Kesamaan minat dan visi menyatukan kami dalam obrolan hangat."
    },
    {
      id: "story-2",
      year: "2023",
      title: "Menyatakan Komitmen",
      description: "Setelah dua tahun saling mengenal dan menguatkan satu sama lain, kami memutuskan untuk berkomitmen melangkah ke jenjang yang lebih serius bersama keluarga."
    },
    {
      id: "story-3",
      year: "2025",
      title: "Lamaran (Khithbah)",
      description: "Pertemuan dua keluarga besar resmi melangsungkan acara lamaran. Hari di mana mimpi untuk membina mahligai rumah tangga mulai dirajut secara nyata."
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1519225495810-7517c319b53b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600"
  ],
  gifts: [
    {
      id: "gift-1",
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "1234567890",
      accountHolder: "Yusuf Efendi"
    },
    {
      id: "gift-2",
      bankName: "Bank Mandiri",
      accountNumber: "9876543210",
      accountHolder: "Nabila Safira"
    }
  ],
  giftAddress: "Perumahan Indah Permai, Blok B No. 12, Kec. Palmerah, Jakarta Barat",
  giftRecipientName: "Nabila Safira (Kediaman Mempelai Wanita)",
  quoteText: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
  quoteSource: "QS. Ar-Rum: 21",
  musicUrl: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3",
  themeId: "sage-green"
};
