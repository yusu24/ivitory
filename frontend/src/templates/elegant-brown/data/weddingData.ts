import { WeddingData } from '../types/wedding';

export const initialWeddingData: WeddingData = {
  guestName: 'Tamu Undangan',
  weddingDateISO: '2026-10-24T08:00:00+07:00', // Saturday, 24 October 2026
  heroSubtitle: 'The Wedding Celebration of',
  quote: {
    text: 'Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'Q.S. Ar-Rum: 21'
  },
  couple: {
    groom: {
      fullName: 'M Yusuf Effendi, S.T.',
      shortName: 'Yusuf',
      fatherName: 'Bpk. H. Effendi Ahmad',
      motherName: 'Ibu Hj. Siti Rahmah',
      childOrder: 'Putra Pertama dari',
      bio: 'Seorang arsitek perangkat lunak yang berjiwa tenang dan menyukai seni fotografi.',
      instagram: '@yusuf.effendi',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    },
    bride: {
      fullName: 'Nor Nabila Muhammad, S.Ked.',
      shortName: 'Nabila',
      fatherName: 'Bpk. H. Muhammad Ismail',
      motherName: 'Ibu Hj. Nurjanah',
      childOrder: 'Putri Kedua dari',
      bio: 'Dokter muda yang penuh empati, penyuka musik klasik dan bunga mawar putih.',
      instagram: '@nornabila.m',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
    }
  },
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      date: 'Sabtu, 24 Oktober 2026',
      time: '08:00 - 10:00 WIB',
      timezone: 'WIB',
      venueName: 'Grand Ballroom - The Ritz-Carlton Pacific Place',
      address: 'SCBD, Jl. Jend. Sudirman No.52-53, Senayan, Kebayoran Baru, Jakarta Selatan',
      googleMapsUrl: 'https://maps.google.com/?q=The+Ritz+Carlton+Pacific+Place+Jakarta',
      embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273017774944!2d106.80806497586822!3d-6.227694993760432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15049581f4b%3A0x6b7db0a02f66e07c!2sThe%20Ritz-Carlton%20Jakarta%2C%20Pacific%20Place!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
      iconType: 'akad'
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      date: 'Sabtu, 24 Oktober 2026',
      time: '11:00 - 15:00 WIB',
      timezone: 'WIB',
      venueName: 'Grand Ballroom - The Ritz-Carlton Pacific Place',
      address: 'SCBD, Jl. Jend. Sudirman No.52-53, Senayan, Kebayoran Baru, Jakarta Selatan',
      googleMapsUrl: 'https://maps.google.com/?q=The+Ritz+Carlton+Pacific+Place+Jakarta',
      embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273017774944!2d106.80806497586822!3d-6.227694993760432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15049581f4b%3A0x6b7db0a02f66e07c!2sThe%20Ritz-Carlton%20Jakarta%2C%20Pacific%20Place!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
      iconType: 'resepsi'
    }
  ],
  loveStory: [
    {
      id: 'story-1',
      year: '2022',
      title: 'Awal Pertemuan',
      date: '14 Februari 2022',
      description: 'Takdir mempertemukan kami dalam sebuah seminar kebudayaan. Tatap mata singkat yang berlanjut pada percakapan hangat hingga larut malam.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'story-2',
      year: '2024',
      title: 'Prosesi Lamaran',
      date: '18 Mei 2024',
      description: 'Di hadapan keluarga besar kedua belah pihak dengan restu dan kehangatan, Yusuf resmi mengutarakan niat suci untuk melamar Nabila.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'story-3',
      year: '2026',
      title: 'Menuju Pernikahan Suci',
      date: '24 Oktober 2026',
      description: 'Atas izin dan rahmat Allah SWT, kami mengikat ikrar suci pernikahan untuk melangkah bersama mengarungi keabadian cinta.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
      caption: 'Pelukan Hangat di Senja Hari',
      category: 'prewedding',
      aspectRatio: 'portrait'
    },
    {
      id: 'gal-2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      caption: 'Momen Bahagia Lamaran',
      category: 'engagement',
      aspectRatio: 'landscape'
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
      caption: 'Canda Tawa di Taman Bunga',
      category: 'prewedding',
      aspectRatio: 'portrait'
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
      caption: 'Elegansi Gaun & Tuxedo',
      category: 'prewedding',
      aspectRatio: 'square'
    },
    {
      id: 'gal-5',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
      caption: 'Pertukaran Cincin Kebahagiaan',
      category: 'engagement',
      aspectRatio: 'landscape'
    },
    {
      id: 'gal-6',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
      caption: 'Dekorasi Bunga Elegan',
      category: 'moments',
      aspectRatio: 'portrait'
    }
  ],
  bankAccounts: [
    {
      id: 'bank-bca',
      bankName: 'Bank BCA',
      accountNumber: '8830912445',
      accountHolder: 'M YUSUF EFFENDI',
      logoUrl: 'BCA'
    },
    {
      id: 'bank-mandiri',
      bankName: 'Bank Mandiri',
      accountNumber: '1370019284712',
      accountHolder: 'NOR NABILA MUHAMMAD',
      logoUrl: 'MANDIRI'
    }
  ],
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126580014ID.LINKAJA.WWW0118936009110000001000021520102408000003033605204581253033605802ID5919YUSUF+DAN+NABILA+WED5913JAKARTA+SELATAN6007JAKARTA61051219062070703A0163045E1B',
  physicalGiftAddress: {
    recipient: 'M Yusuf Effendi / Nor Nabila',
    phone: '+62 812-3456-7890',
    address: 'Jl. Wijaya Executive Residence No. 8B, Kebayoran Baru, Jakarta Selatan, 12160'
  },
  musicPlaylist: [
    {
      id: 'track-1',
      title: 'A Thousand Years (Piano Elegance)',
      artist: 'Romantic Piano Collection',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112187.mp3'
    },
    {
      id: 'track-2',
      title: 'Beautiful In White (Acoustic Strings)',
      artist: 'Classical Ensemble',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a2b388.mp3?filename=wedding-march-piano-10115.mp3'
    }
  ],
  defaultWishes: [
    {
      id: 'wish-1',
      senderName: 'Dr. Hendra & Keluarga',
      attendance: 'hadir',
      guestCount: 2,
      message: 'Selamat untuk Yusuf dan Nabila! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Dilimpahi keberkahan dan kebahagiaan selalu.',
      createdAt: '2 jam yang lalu',
      likes: 12
    },
    {
      id: 'wish-2',
      senderName: 'Anisa Rahma, M.Sc.',
      attendance: 'hadir',
      guestCount: 1,
      message: 'MasyaAllah tabarakallah Nabila & Yusuf! Terharu banget melihat perjalanan kalian. Semoga lancar sampai hari H dan selamanya berbahagia!',
      createdAt: '5 jam yang lalu',
      likes: 8
    },
    {
      id: 'wish-3',
      senderName: 'Bapak Ahmad Subagyo & Istri',
      attendance: 'hadir',
      guestCount: 2,
      message: 'Selamat menempuh hidup baru untuk Ananda Yusuf & Nabila. Doa terbaik dari kami sekeluarga.',
      createdAt: '1 hari yang lalu',
      likes: 15
    },
    {
      id: 'wish-4',
      senderName: 'Rizky & Maya',
      attendance: 'tidak_hadir',
      guestCount: 0,
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Maaf belum bisa hadir langsung tapi doa kami menyertai kalian!',
      createdAt: '2 hari yang lalu',
      likes: 6
    }
  ]
};
