<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DemoInvitationSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedCouple([
            'user' => ['name' => 'Muhammad Rizky Ramadhan', 'email' => 'rizky.ayu@example.com'],
            'invitation' => [
                'slug' => 'rizky-ayu',
                'groom_name' => 'Muhammad Rizky Ramadhan',
                'groom_nickname' => 'Rizky',
                'groom_parents' => 'Bapak H. Slamet Widodo & Ibu Hj. Sri Wahyuni',
                'bride_name' => 'Dyah Ayu Kusumawardani',
                'bride_nickname' => 'Ayu',
                'bride_parents' => 'Bapak H. Bambang Sutrisno & Ibu Hj. Endang Lestari',
                'opening_text' => "Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
                'akad_date' => '2026-10-17',
                'akad_time' => '08:00',
                'akad_location' => 'Masjid Agung Kauman',
                'akad_address' => 'Jl. Kauman No. 1, Yogyakarta',
                'akad_map_url' => 'https://maps.google.com/?q=Masjid+Agung+Kauman+Yogyakarta',
                'resepsi_date' => '2026-10-17',
                'resepsi_time' => '11:00',
                'resepsi_location' => 'Pendopo Ageng Royal Ambarrukmo',
                'resepsi_address' => 'Jl. Laksda Adisucipto, Yogyakarta',
                'resepsi_map_url' => 'https://maps.google.com/?q=Royal+Ambarrukmo+Yogyakarta',
                'is_published' => true,
            ],
            'love_story' => [
                ['item_date' => '2019-02-14', 'title' => 'Pertama Bertemu', 'story' => 'Kami dipertemukan dalam sebuah acara keluarga di Yogyakarta. Perkenalan sederhana itu ternyata menjadi awal kisah yang indah.'],
                ['item_date' => '2022-06-10', 'title' => 'Lamaran', 'story' => 'Rizky melamar Ayu disaksikan keluarga besar di kediaman keluarga Ayu, sebagai tanda keseriusan menuju jenjang pernikahan.'],
                ['item_date' => '2026-10-17', 'title' => 'Hari Bahagia', 'story' => 'Dengan izin Allah SWT, kami akan melangsungkan akad nikah dan resepsi pernikahan, mengikat janji suci sebagai suami istri.'],
            ],
            'bank_accounts' => [
                ['type' => 'bank', 'bank_name' => 'BCA', 'account_number' => '1234567890', 'account_holder' => 'Muhammad Rizky Ramadhan'],
                ['type' => 'ewallet', 'bank_name' => 'GoPay', 'account_number' => '081234567890', 'account_holder' => 'Dyah Ayu Kusumawardani'],
            ],
            'rsvp' => [
                ['guest_name' => 'Bapak Slamet & Keluarga', 'attendance' => 'hadir', 'guest_count' => 4, 'message' => 'Barakallahu lakuma wa baraka alaikuma. Semoga menjadi keluarga sakinah, mawaddah, warahmah.', 'days_ago' => 6],
                ['guest_name' => 'Ratna Puspita', 'attendance' => 'hadir', 'guest_count' => 2, 'message' => 'Selamat menempuh hidup baru Rizky & Ayu! Bahagia selalu ya.', 'days_ago' => 5],
                ['guest_name' => 'Dimas Aditya', 'attendance' => 'ragu', 'guest_count' => 1, 'message' => 'Semoga bisa hadir, semoga lancar sampai hari H. Selamat ya!', 'days_ago' => 3],
                ['guest_name' => 'Keluarga Besar Widodo', 'attendance' => 'hadir', 'guest_count' => 6, 'message' => 'Turut berbahagia atas pernikahan kalian. Semoga menjadi keluarga yang penuh berkah.', 'days_ago' => 2],
                ['guest_name' => 'Nadia Safitri', 'attendance' => 'tidak_hadir', 'guest_count' => 1, 'message' => 'Maaf tidak bisa hadir karena berhalangan. Doa terbaik untuk kalian berdua!', 'days_ago' => 1],
            ],
            'palette' => [[13, 46, 34], [198, 163, 83]],
        ]);

        $this->seedCouple([
            'user' => ['name' => 'Bagus Prasetyo Nugroho', 'email' => 'bagus.wulan@example.com'],
            'invitation' => [
                'slug' => 'bagus-wulan',
                'groom_name' => 'Bagus Prasetyo Nugroho',
                'groom_nickname' => 'Bagus',
                'groom_parents' => 'Bapak H. Joko Purnomo & Ibu Hj. Siti Aminah',
                'bride_name' => 'Wulan Ratna Sari',
                'bride_nickname' => 'Wulan',
                'bride_parents' => 'Bapak H. Agus Salim & Ibu Hj. Kartika Dewi',
                'opening_text' => "Assalamu'alaikum Warahmatullahi Wabarakatuh. Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan memberikan doa restu.",
                'akad_date' => '2026-11-08',
                'akad_time' => '09:00',
                'akad_location' => 'Masjid Agung Surakarta',
                'akad_address' => 'Jl. Masjid Agung, Surakarta',
                'akad_map_url' => 'https://maps.google.com/?q=Masjid+Agung+Surakarta',
                'resepsi_date' => '2026-11-08',
                'resepsi_time' => '12:00',
                'resepsi_location' => 'Ndalem Wuryaningratan',
                'resepsi_address' => 'Jl. Baron, Surakarta',
                'resepsi_map_url' => 'https://maps.google.com/?q=Ndalem+Wuryaningratan+Surakarta',
                'is_published' => true,
            ],
            'love_story' => [
                ['item_date' => '2020-08-20', 'title' => 'Awal Perkenalan', 'story' => 'Bagus dan Wulan berkenalan lewat teman kuliah. Obrolan ringan berlanjut menjadi kedekatan yang tulus.'],
                ['item_date' => '2023-12-03', 'title' => 'Lamaran', 'story' => 'Keluarga besar Bagus datang melamar Wulan di Surakarta, disambut hangat oleh keluarga besar Wulan.'],
                ['item_date' => '2026-11-08', 'title' => 'Akad & Resepsi', 'story' => 'Hari yang telah lama dinantikan, kami mengikat janji suci pernikahan dengan adat Jawa dan syariat Islam.'],
            ],
            'bank_accounts' => [
                ['type' => 'bank', 'bank_name' => 'Mandiri', 'account_number' => '9876543210', 'account_holder' => 'Bagus Prasetyo Nugroho'],
                ['type' => 'ewallet', 'bank_name' => 'OVO', 'account_number' => '082198765432', 'account_holder' => 'Wulan Ratna Sari'],
            ],
            'rsvp' => [
                ['guest_name' => 'Ibu Kartika & Bapak Agus', 'attendance' => 'hadir', 'guest_count' => 2, 'message' => 'Selamat menempuh hidup baru, Nak Bagus & Wulan. Semoga sakinah mawaddah warahmah.', 'days_ago' => 7],
                ['guest_name' => 'Fajar Ramadhan', 'attendance' => 'hadir', 'guest_count' => 3, 'message' => 'Barakallah! Semoga menjadi keluarga yang harmonis dan berkah dunia akhirat.', 'days_ago' => 4],
                ['guest_name' => 'Intan Permatasari', 'attendance' => 'ragu', 'guest_count' => 1, 'message' => 'InsyaAllah diusahakan hadir. Selamat ya Wulan, bahagia terus!', 'days_ago' => 2],
                ['guest_name' => 'Keluarga Nugroho', 'attendance' => 'hadir', 'guest_count' => 5, 'message' => 'Semoga acaranya lancar dan berkah. Kami turut berbahagia.', 'days_ago' => 1],
            ],
            'palette' => [[26, 61, 45], [122, 35, 49]],
        ]);
    }

    private function seedCouple(array $data): void
    {
        $user = User::create([
            'name' => $data['user']['name'],
            'email' => $data['user']['email'],
            'password' => Hash::make('password123'),
        ]);

        $invitation = $user->invitations()->create($data['invitation']);

        $invitation->update([
            'cover_photo_path' => $this->storePlaceholder('covers', 1600, 900, $data['palette']),
        ]);

        foreach (range(1, 5) as $i) {
            $invitation->galleryPhotos()->create([
                'photo_path' => $this->storePlaceholder('gallery', 900, 900, $this->shiftPalette($data['palette'], $i)),
                'caption' => null,
                'order_index' => $i - 1,
            ]);
        }

        foreach ($data['love_story'] as $index => $item) {
            $invitation->loveStoryItems()->create([...$item, 'order_index' => $index]);
        }

        foreach ($data['bank_accounts'] as $index => $account) {
            $invitation->bankAccounts()->create([...$account, 'order_index' => $index]);
        }

        foreach ($data['rsvp'] as $entry) {
            $daysAgo = $entry['days_ago'];
            unset($entry['days_ago']);
            $invitation->rsvpEntries()->create($entry + [
                'created_at' => now()->subDays($daysAgo),
                'updated_at' => now()->subDays($daysAgo),
            ]);
        }
    }

    private function shiftPalette(array $palette, int $seed): array
    {
        [$from, $to] = $palette;
        $shift = fn ($c) => array_map(fn ($v) => max(0, min(255, $v + (($seed % 3) - 1) * 12)), $c);

        return [$shift($from), $shift($to)];
    }

    private function storePlaceholder(string $folder, int $width, int $height, array $palette): string
    {
        [$top, $bottom] = $palette;

        $im = imagecreatetruecolor($width, $height);
        for ($y = 0; $y < $height; $y++) {
            $ratio = $y / $height;
            $r = (int) ($top[0] + ($bottom[0] - $top[0]) * $ratio);
            $g = (int) ($top[1] + ($bottom[1] - $top[1]) * $ratio);
            $b = (int) ($top[2] + ($bottom[2] - $top[2]) * $ratio);
            $color = imagecolorallocate($im, $r, $g, $b);
            imageline($im, 0, $y, $width, $y, $color);
        }

        ob_start();
        imagejpeg($im, null, 85);
        $binary = ob_get_clean();
        imagedestroy($im);

        $path = $folder.'/'.Str::uuid().'.jpg';
        Storage::disk('public')->put($path, $binary);

        return $path;
    }
}
