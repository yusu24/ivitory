export const SAMPLE_INVITATION = {
  id: 0,
  slug: 'preview',
  groom_name: 'Muhammad Rizky Ramadhan',
  groom_nickname: 'Rizky',
  groom_parents: 'Bapak H. Slamet Widodo & Ibu Hj. Sri Wahyuni',
  bride_name: 'Dyah Ayu Kusumawardani',
  bride_nickname: 'Ayu',
  bride_parents: 'Bapak H. Bambang Sutrisno & Ibu Hj. Endang Lestari',
  cover_photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  opening_text:
    "Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  akad_date: '2027-06-12',
  akad_time: '08:00',
  akad_location: 'Masjid Agung Kauman',
  akad_address: 'Jl. Kauman No. 1, Yogyakarta',
  akad_map_url: 'https://maps.google.com/?q=Masjid+Agung+Kauman+Yogyakarta',
  resepsi_date: '2027-06-12',
  resepsi_time: '11:00',
  resepsi_location: 'Pendopo Ageng Royal Ambarrukmo',
  resepsi_address: 'Jl. Laksda Adisucipto, Yogyakarta',
  resepsi_map_url: 'https://maps.google.com/?q=Royal+Ambarrukmo+Yogyakarta',
  music_url: null,
  is_published: true,
  love_story_items: [
    {
      id: 1,
      item_date: '2019-02-14',
      title: 'Pertama Bertemu',
      story: 'Kami dipertemukan dalam sebuah acara keluarga. Perkenalan sederhana itu ternyata menjadi awal kisah yang indah.',
    },
    {
      id: 2,
      item_date: '2022-06-10',
      title: 'Lamaran',
      story: 'Kami melangsungkan lamaran disaksikan keluarga besar sebagai tanda keseriusan menuju jenjang pernikahan.',
    },
    {
      id: 3,
      item_date: '2027-06-12',
      title: 'Hari Bahagia',
      story: 'Dengan izin Allah SWT, kami melangsungkan akad nikah dan resepsi pernikahan, mengikat janji suci sebagai suami istri.',
    },
  ],
  gallery_photos: [
    { id: 1, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', caption: 'Prewedding di Taman Harmoni' },
    { id: 2, url: 'https://images.unsplash.com/photo-1583939000340-c69c5be0e386?auto=format&fit=crop&w=800&q=80', caption: 'Momen Canda Tawa Bersama' },
    { id: 3, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', caption: 'Ketulusan Tatapan Kasih' },
    { id: 4, url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', caption: 'Kerapihan Busana Adat' },
    { id: 5, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', caption: 'Janji Suci dalam Keheningan' },
    { id: 6, url: 'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=800&q=80', caption: 'Melangkah Selaras Bersama' },
  ],
  bank_accounts: [
    { id: 1, type: 'bank', bank_name: 'Bank Central Asia (BCA)', account_number: '8290382910', account_holder: 'Mempelai Pria' },
    { id: 2, type: 'bank', bank_name: 'Bank Mandiri', account_number: '140002391823', account_holder: 'Mempelai Wanita' },
  ],
  owner: null,
  template: null,
  created_at: new Date().toISOString(),
};

/**
 * Curated Template Metadata & Dummy Couples per Theme
 * Short, memorable 2-word names + tailored dummy data for real live previews.
 */
export const TEMPLATE_SHOWCASE_META = {
  'floral-3d': {
    cleanName: 'Rosé Jardin 3D',
    styleBadge: '3D Floral Interaktif',
    coupleLabel: 'Aurelia & Keenan',
    eventCity: 'Uluwatu, Bali • 14 Feb 2027',
    description:
      'Tema romantis berbunga 3D interaktif berbasis WebGL Three.js dengan cincin pernikahan emas 3D, kelopak mawar 3D melayang, dan kartu perspektif 3D.',
    dummyData: {
      slug: 'aurelia-keenan',
      bride_name: 'Aurelia Rose Maharani',
      bride_nickname: 'Aurelia',
      bride_parents: 'Putri dari Bapak Ir. Darmawan & Ibu Hj. Rosita Sari',
      groom_name: 'Keenan Dharma Putra',
      groom_nickname: 'Keenan',
      groom_parents: 'Putra dari Bapak Drs. Suryono & Ibu Hj. Melati Kusuma',
      cover_photo_url:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      akad_date: '2027-02-14',
      akad_time: '08:30',
      akad_location: 'Glasshouse Floral Sanctuary',
      akad_address: 'Jl. Karang Mas Sejahtera, Uluwatu, Bali',
      akad_map_url: 'https://maps.google.com/?q=Uluwatu+Bali',
      resepsi_date: '2027-02-14',
      resepsi_time: '11:30',
      resepsi_location: 'Royal Rose Botanical Ballroom',
      resepsi_address: 'Jl. Karang Mas Sejahtera, Uluwatu, Bali',
      resepsi_map_url: 'https://maps.google.com/?q=Uluwatu+Bali',
    },
  },
  'monochrome-lineart': {
    cleanName: 'Atelier Line-Art',
    styleBadge: 'Minimalis Monokrom',
    coupleLabel: 'Nabilla & Yusuf',
    eventCity: 'Surabaya • 18 Jan 2027',
    description:
      'Desain monokrom bergaya editorial dengan ilustrasi sketsa garis romantis, ornamen botani halus, serta versi cetak fisik siap pakai.',
    dummyData: {
      slug: 'nor-yusuf',
      bride_name: 'Nor Nabilla',
      bride_nickname: 'Nabilla',
      bride_parents: 'Bapak H. Bambang Sutrisno & Ibu Hj. Endang Lestari',
      groom_name: 'M Yusuf Effendi',
      groom_nickname: 'Yusuf',
      groom_parents: 'Bapak H. Slamet Widodo & Ibu Hj. Sri Wahyuni',
      cover_photo_url: '/templates/minimal-monochrome/couple_real.png',
      hero_image_url: '/templates/minimal-monochrome/couple_real.png',
      akad_date: '2027-01-18',
      akad_time: '08:00',
      akad_location: 'Masjid Agung Al-Akbar',
      akad_address: 'Jl. Masjid Al-Akbar Timur No. 1, Surabaya',
      akad_map_url: 'https://maps.google.com/?q=Masjid+Agung+Al-Akbar+Surabaya',
      resepsi_date: '2027-01-18',
      resepsi_time: '11:00',
      resepsi_location: 'Grand City Convention Hall',
      resepsi_address: 'Jl. Walikota Mustajab No. 1, Surabaya',
      resepsi_map_url: 'https://maps.google.com/?q=Grand+City+Convention+Hall+Surabaya',
    },
  },
  'boho-terracotta': {
    cleanName: 'Terra Botanica',
    styleBadge: 'Boho & Hangat',
    coupleLabel: 'Anindya & Rian',
    eventCity: 'Bandung • 14 Feb 2027',
    description:
      'Nuansa boho hangat berpadu palet terracotta lembut, lengkungan arsitektural, dan tipografi kaligrafi yang romantis.',
    dummyData: {
      slug: 'anin-rian',
      bride_name: 'Anindya Putri Maharani',
      bride_nickname: 'Anindya',
      bride_parents: 'Bapak Ir. Hendra Wijaya & Ibu Ratna Sari',
      groom_name: 'Rian Pratama Putra',
      groom_nickname: 'Rian',
      groom_parents: 'Bapak Drs. Surya Pratama & Ibu Dewi Anggraini',
      cover_photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      akad_date: '2027-02-14',
      akad_time: '08:30',
      akad_location: 'Gedong Putih Villa',
      akad_address: 'Jl. Sersan Bajuri KM 4.7, Lembang, Bandung',
      resepsi_date: '2027-02-14',
      resepsi_time: '11:30',
      resepsi_location: 'Pine Forest Venue Bandung',
      resepsi_address: 'Lembang, Kabupaten Bandung Barat',
    },
  },
  'dewanakl-ulems': {
    cleanName: 'Lumina Glass',
    styleBadge: 'Modern Interaktif',
    coupleLabel: 'Clarissa & Aditya',
    eventCity: 'Bali • 22 Mei 2027',
    description:
      'Tata letak modern interaktif dengan fitur mode terang/gelap, gelombang dinamis, dan aksen tipografi anggun.',
    dummyData: {
      slug: 'clarissa-aditya',
      bride_name: 'Clarissa Aurelia Putri',
      bride_nickname: 'Clarissa',
      bride_parents: 'Bapak Darmawan & Ibu Lilis Suryani',
      groom_name: 'Aditya Mahendra',
      groom_nickname: 'Aditya',
      groom_parents: 'Bapak Gunawan & Ibu Rina Kusuma',
      cover_photo_url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
      akad_date: '2027-05-22',
      akad_time: '09:00',
      akad_location: 'The Glass House Tirtha',
      akad_address: 'Jl. Karang Mas, Uluwatu, Badung, Bali',
      resepsi_date: '2027-05-22',
      resepsi_time: '16:00',
      resepsi_location: 'Cliffside Lawn Uluwatu',
      resepsi_address: 'Uluwatu, Kabupaten Badung, Bali',
    },
  },
  'elegant-brown': {
    cleanName: 'Royal Mocha',
    styleBadge: 'Klasik & Mewah',
    coupleLabel: 'Kirana & Bagas',
    eventCity: 'Jakarta • 08 Agu 2027',
    description:
      'Sentuhan klasik berkelas dalam palet cokelat moka dan krem gading, dilengkapi fitur auto-scroll dan partikel hangat.',
    dummyData: {
      slug: 'kirana-bagas',
      bride_name: 'Kirana Larasati',
      bride_nickname: 'Kirana',
      bride_parents: 'Bapak H. Prabowo Santoso & Ibu Hj. Retno Wulan',
      groom_name: 'Bagas Prakoso',
      groom_nickname: 'Bagas',
      groom_parents: 'Bapak H. Sudirman & Ibu Hj. Nurhayati',
      cover_photo_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
      akad_date: '2027-08-08',
      akad_time: '08:00',
      akad_location: 'Masjid Sunda Kelapa',
      akad_address: 'Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat',
      resepsi_date: '2027-08-08',
      resepsi_time: '11:00',
      resepsi_location: 'Bali Room Hotel Indonesia Kempinski',
      resepsi_address: 'Jl. M.H. Thamrin No. 1, Jakarta Pusat',
    },
  },
  classic: {
    cleanName: 'Ivory Garden',
    styleBadge: 'Floral & Hijau Segar',
    coupleLabel: 'Nadia & Dimas',
    eventCity: 'Jakarta • 12 Des 2027',
    description:
      'Keanggunan warna gading dan hijau zamrud dengan bingkai kaca transparan serta ornamen emas klasik.',
    dummyData: {
      slug: 'nadia-dimas',
      bride_name: 'Nadia Safitri Zahra',
      bride_nickname: 'Nadia',
      bride_parents: 'Bapak H. Ahmad Fauzi & Ibu Hj. Siti Rahmah',
      groom_name: 'Dimas Anggara Putra',
      groom_nickname: 'Dimas',
      groom_parents: 'Bapak H. Lukman Hakim & Ibu Hj. Yuliana',
      cover_photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      akad_date: '2027-12-12',
      akad_time: '08:00',
      akad_location: 'Masjid Agung Al-Azhar',
      akad_address: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
      resepsi_date: '2027-12-12',
      resepsi_time: '11:00',
      resepsi_location: 'The Glasshouse at Sampoerna Strategic',
      resepsi_address: 'Jl. Jend. Sudirman Kav. 45, Jakarta Selatan',
    },
  },
};

export function getDummyInvitationForTemplate(templateSlug) {
  const meta = TEMPLATE_SHOWCASE_META[templateSlug];
  if (!meta) {
    if (templateSlug?.includes('monochrome') || templateSlug?.includes('minimal')) {
      return {
        ...SAMPLE_INVITATION,
        ...TEMPLATE_SHOWCASE_META['monochrome-lineart'].dummyData,
      };
    }
    return SAMPLE_INVITATION;
  }

  return {
    ...SAMPLE_INVITATION,
    ...meta.dummyData,
  };
}
