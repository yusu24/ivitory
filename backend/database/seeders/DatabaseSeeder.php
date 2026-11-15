<?php

namespace Database\Seeders;

use App\Models\Invitation;
use App\Models\LandingContent;
use App\Models\Package;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Template::ensureBuiltInTemplates();
        Package::ensureDefaults();

        if (LandingContent::count() === 0) {
            LandingContent::create([
                'site_name' => 'Invitory',
                'logo_path' => 'brand/aeFZ5C3G4NYUdiDISxtfu2Www7nZ06izGgLkTvTE.png',
                'favicon_path' => 'brand/YzREQjuI8PI73vMoG0mZH1ssJ6623h4565PTClMO.png',
                'hero_eyebrow' => 'Undangan Digital',
                'hero_title' => 'Rayakan hari bahagiamu dengan undangan yang kekinian & intim',
                'hero_subtitle' => 'Buat undangan pernikahan digital dalam hitungan menit. Elegan, personal untuk setiap tamu, lengkap dengan RSVP, galeri, dan cerita cintamu.',
                'cta_primary_label' => 'Mulai Buat Undangan',
                'cta_secondary_label' => 'Saya Sudah Punya Akun',
                'features' => [
                    ['icon' => 'Users', 'title' => 'Sapaan Personal', 'description' => 'Setiap tamu mendapat link undangan dengan namanya sendiri.'],
                    ['icon' => 'Music2', 'title' => 'Musik & Animasi', 'description' => 'Efek buka amplop dan musik latar yang terasa intim.'],
                    ['icon' => 'Sparkles', 'title' => 'RSVP & Buku Tamu', 'description' => 'Kelola kehadiran dan ucapan tamu langsung dari dashboard.'],
                ],
            ]);
        }

        $admin = User::updateOrCreate(
            ['email' => 'makeproject240696@gmail.com'],
            [
                'name' => 'M Yusuf Effendi (Super Admin)',
                'password' => 'Aku240696@',
                'role' => 'superadmin',
                'email_verified_at' => now(),
            ]
        );

        $monochromeTemplate = Template::where('slug', 'monochrome-lineart')->first();

        if (Invitation::where('slug', 'yusuf-cahya')->doesntExist()) {
            $invitation = $admin->invitations()->create([
                'template_id' => $monochromeTemplate?->id,
                'slug' => 'yusuf-cahya',
                'groom_name' => 'M Yusuf Effendi',
                'groom_nickname' => 'Yusuf (Pendi)',
                'groom_parents' => 'Bapak Yazid & Ibu Tasmonah',
                'bride_name' => 'Nor Nabilla Muhammad',
                'bride_nickname' => 'Cahya',
                'bride_parents' => 'Bapak Muhammad Suafiq & Ibu Zuliatun',
                'cover_photo_path' => 'invitations/cover_e56531d7-00c2-45be-9de6-776808b91915.png',
                'hero_photo_path' => null,
                'bride_photo_path' => 'invitations/bride_c255b547-ba53-49a0-851b-d772e5e90b9c.JPEG',
                'groom_photo_path' => 'invitations/groom_c1aa0fdb-d67b-46c2-8a15-f2b37bb0df84.jpg',
                'opening_text' => 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.',
                'custom_texts' => json_decode('{"cover_header":"HAUTE ATELIER INVITATION","cover_guest_label":"Kepada Yth. Bapak\\/Ibu\\/Saudara\\/i:","cover_button_text":"Buka Undangan","cover_hint_text":"Sentuh ilustrasi atau tombol untuk membuka","cover_bg_theme":"botanical_lineart","cover_bg_custom_url":null,"hero_badge":"WALIMATUL \u2018URS","hero_subtitle":"THE WEDDING CELEBRATION OF","hero_divider_text":"TWO HEARTS \u2022 ONE JOURNEY","opening_title":"TWO HEARTS \u2022 ONE JOURNEY","opening_subtitle":"A LIFETIME TOGETHER","opening_bismillah":"\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650","opening_text":"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.","opening_surah":"QS. Ar-Rum: 21","couple_badge":"MEMPELAI BERBAHAGIA","couple_title":"The Happy Couple","couple_subtitle":"Maha Suci Allah yang Mempersatukan Dua Hati","couple_intro_text":"Dengan penuh rasa syukur dan memohon ridha Allah SWT, kami mengharapkan berkah atas ikrar suci pernikahan kami berdua:","bride_role_label":"THE BRIDE","bride_parents_label":"Putri Tercinta Dari","bride_quote":"Dan di balik setiap doa tulus, selalu ada harapan untuk melangkah bersama dalam jalan kebaikan.","bride_instagram":null,"groom_role_label":"THE GROOM","groom_parents_label":"Putra Tercinta Dari","groom_quote":"Memimpin dengan kasih, melindungi dengan kesabaran, dan mencintai dalam ketaatan pada-Nya.","groom_instagram":null,"countdown_badge":"MENGHITUNG HARI BAHAGIA","countdown_title":"Save The Date","event_badge":"WAKTU & TEMPAT PELAKSANAAN","event_title":"Rangkaian Acara","event_intro_text":"Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta\'ala, kami mengundang Anda untuk hadir pada:","akad_title":"Akad Nikah","akad_subtitle":"Ikrar Suci Pernikahan","resepsi_title":"Resepsi Pernikahan","resepsi_subtitle":"Perayaan & Ramah Tamah","dress_code_title":"PANDUAN BUSANA (ATELIER DRESS CODE)","dress_code_text":"Klik palet warna di bawah ini untuk melihat inspirasi keselarasan busana tamu undangan:","story_badge":"MEMOIR & PERJALANAN","story_title":"Our Love Story","story_subtitle":"Dua Hati Menenun Takdir","story_intro_text":"Setiap jengkal langkah yang kami tempuh merupakan bagian dari skenario indah Sang Maha Pencipta.","gallery_badge":"EXHIBITION & MEMORI","gallery_title":"Moments in Monochrome","gallery_subtitle":"Dokumentasi Perjalanan Cinta","gallery_intro_text":"Setiap detik yang terekam adalah bukti kasih dan komitmen kami berdua dalam menyongsong masa depan.","gift_badge":"TANDA KASIH","gift_title":"Amplop & Kado Digital","gift_intro_text":"Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui:","physical_gift_heading":"Kirim Kado Fisik","physical_gift_subheading":"Bagi yang berkenan mengirimkan kado langsung ke kediaman mempelai:","physical_gift_title":"Kediaman Mempelai","physical_gift_address":"Jl. Rungkut Asri Timur No. 18, Rungkut Kidul, Kec. Rungkut, Kota Surabaya, Jawa Timur 60293","physical_gift_receiver":"Penerima: M Yusuf Effendi (0812-3456-7890)","whatsapp_number":"6281234567890","rsvp_badge":"KONFIRMASI & DOA RESTU","rsvp_title":"RSVP & Buku Tamu","rsvp_subtitle":"Kehadiran Anda adalah Kebahagiaan Kami","rsvp_intro_text":"Mohon kesediaan Bapak\\/Ibu\\/Saudara\\/i untuk mengonfirmasi kehadiran dan menguntaikan doa restu bagi kami berdua.","closing_text":"Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, apabila Bapak\\/Ibu\\/Saudara\\/i berkenan hadir untuk memberikan doa restu bagi lembaran baru kehidupan kami.","closing_thanks":"Jazaakumullahu Khairan Katsiran","closing_greeting":"Wassalamu\'alaikum Warahmatullahi Wabarakatuh","section_visibility":{"show_dresscode":false,"show_story":true,"show_gallery":true,"show_amplop":true,"show_rsvp":true,"show_countdown":true}}', true),
                'photo_settings' => json_decode('{"cover":{"scale":96,"x":25,"y":66,"fit":"cover","grayscale":true},"hero":{"scale":100,"x":50,"y":18,"fit":"contain","grayscale":false},"bride":{"scale":89,"x":50,"y":100,"fit":"cover","grayscale":true},"groom":{"scale":115,"x":53,"y":0,"fit":"cover","grayscale":false}}', true),
                'akad_date' => '2027-01-03',
                'akad_time' => '10:00:00',
                'akad_location' => 'Masjid Nurul Huda',
                'akad_address' => 'Masjid Nurul Huda, Gowah, Blimbing, Kec. Paciran, Kab. Lamongan, Jawa Timur',
                'akad_map_url' => 'https://maps.app.goo.gl/3XsvaUYKD8BK8JYV8',
                'resepsi_date' => '2027-01-03',
                'resepsi_time' => '11:00:00',
                'resepsi_location' => 'PRIMA Hall Paciran',
                'resepsi_address' => 'PRIMA Hall, Jl. Raya Daendles, RT.01/RW09, Kandangsemangkon, Kec. Paciran, Kabupaten Lamongan, Jawa Timur 62264',
                'resepsi_map_url' => 'https://maps.app.goo.gl/fkPcG18a2N2ANNcr7',
                'music_path' => 'music/6797795a-5850-42ee-b795-8b6498b926c4.mp3',
                'is_published' => true,
                'views_count' => 8,
            ]);

            $galleryFiles = [
                'gallery/3b093c0c-5b6c-410e-aebe-8f348331a750.JPEG',
                'gallery/7667f80b-4e72-4beb-95e5-ccfdabcf6776.JPEG',
                'gallery/fa0cdf95-c31e-4747-b29a-fa01684ee969.JPEG',
                'gallery/1e14e878-3b25-47b5-8736-43d8c029ddff.JPEG',
                'gallery/583993eb-f517-4938-9df6-284990dfd9e0.JPEG',
                'gallery/8552aeee-8572-431b-b16e-b733474e7015.JPEG',
            ];
            foreach ($galleryFiles as $idx => $path) {
                $invitation->galleryPhotos()->create([
                    'photo_path' => $path,
                    'caption' => null,
                    'order_index' => $idx,
                ]);
            }

            $invitation->bankAccounts()->createMany([
                ['type' => 'bank', 'bank_name' => 'BRI', 'account_number' => '302101020085532', 'account_holder' => 'A.n. Nor Nabilla Muhammad', 'order_index' => 0],
                ['type' => 'bank', 'bank_name' => 'BSI', 'account_number' => '7242397821', 'account_holder' => 'A.n. Nor Nabilla Muhamma', 'order_index' => 1],
                ['type' => 'bank', 'bank_name' => 'BCA', 'account_number' => '8640512041', 'account_holder' => 'A n. M Yusuf Effendi', 'order_index' => 2],
            ]);

            $invitation->guests()->createMany([
                ['name' => 'Bpk. H. Ahmad & Keluarga', 'phone' => '081234567890', 'category' => 'Keluarga Besar', 'status_sent' => true],
                ['name' => 'Ibu Hj. Siti Aminah', 'phone' => '085712345678', 'category' => 'Keluarga Besar', 'status_sent' => false],
                ['name' => 'Dimas Kurniawan & Partner', 'phone' => '081398765432', 'category' => 'Sahabat / Teman Dekat', 'status_sent' => false],
                ['name' => 'dr. Rina Permata, Sp.A', 'phone' => '081122334455', 'category' => 'Rekan Kerja / VIP', 'status_sent' => false],
            ]);

            $invitation->rsvpEntries()->create([
                'guest_name' => 'Testing',
                'attendance' => 'hadir',
                'guest_count' => 1,
                'message' => 'Terima kasih ya sudha di undang',
            ]);
        }

        if (Invitation::where('slug', 'rizky-ayu')->doesntExist()) {
            $this->call(DemoInvitationSeeder::class);
        }
    }
}
