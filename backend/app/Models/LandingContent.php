<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingContent extends Model
{
    protected $fillable = [
        'site_name',
        'logo_path',
        'favicon_path',
        'hero_eyebrow',
        'hero_title',
        'hero_subtitle',
        'cta_primary_label',
        'cta_secondary_label',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    public static function current(): self
    {
        return static::first() ?? static::create([
            'site_name' => 'Invitory',
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
}
