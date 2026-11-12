export interface CoupleInfo {
  groom: {
    fullName: string;
    shortName: string;
    fatherName: string;
    motherName: string;
    childOrder: string; // e.g., "Putra Pertama dari"
    bio: string;
    instagram: string;
    photo: string;
  };
  bride: {
    fullName: string;
    shortName: string;
    fatherName: string;
    motherName: string;
    childOrder: string;
    bio: string;
    instagram: string;
    photo: string;
  };
}

export interface StoryItem {
  id: string;
  year: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  date: string;
  time: string;
  timezone: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  iconType: 'akad' | 'resepsi' | 'ngunduh';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'all' | 'prewedding' | 'engagement' | 'moments';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl?: string;
  qrisUrl?: string;
}

export interface GuestWish {
  id: string;
  senderName: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  message: string;
  createdAt: string;
  likes: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
}

export interface WeddingData {
  guestName: string;
  weddingDateISO: string;
  heroSubtitle: string;
  quote: {
    text: string;
    source: string;
  };
  couple: CoupleInfo;
  events: EventDetail[];
  loveStory: StoryItem[];
  gallery: GalleryPhoto[];
  bankAccounts: BankAccount[];
  qrisImageUrl: string;
  physicalGiftAddress: {
    recipient: string;
    phone: string;
    address: string;
  };
  musicPlaylist: MusicTrack[];
  defaultWishes: GuestWish[];
}
