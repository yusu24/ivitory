<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'duration_days',
        'description',
        'features',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
    ];

    public static function ensureDefaults(): void
    {
        if (static::count() > 0) {
            return;
        }

        $defaults = [
            [
                'name' => 'Paket Gratis',
                'slug' => 'paket-gratis',
                'price' => 0,
                'duration_days' => 3,
                'description' => 'Sempurna untuk mencoba dan membuat undangan acara sederhana.',
                'features' => [
                    'Masa aktif 3 hari',
                    'Maksimal 50 nama tamu undangan',
                    '1 Pilihan Lagu Musik Latar',
                    'Galeri Foto (hingga 4 foto)',
                    'Informasi Acara, Navigasi Google Maps & Kalender',
                    'Fitur Buku Tamu, Doa & Konfirmasi RSVP',
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Paket Gold',
                'slug' => 'paket-gold',
                'price' => 79000,
                'duration_days' => 365,
                'description' => 'Fitur terlengkap untuk pernikahan & acara besar tanpa batas tamu.',
                'features' => [
                    'Masa aktif 1 Tahun (365 Hari)',
                    'Tamu TANPA BATAS (Unlimited Nama Tamu & RSVP)',
                    'Kustom Musik Background Bebas',
                    'Galeri Foto (hingga 10 foto)',
                    'Informasi Acara, Navigasi Google Maps & Kalender',
                    'Fitur Buku Tamu, Doa & Konfirmasi RSVP',
                    'Amplop Digital & Rekening / QRIS Transfer',
                    'Broadcast & Sebar Otomatis Format WhatsApp',
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Paket Platinum Custom',
                'slug' => 'paket-platinum-custom',
                'price' => 139000,
                'duration_days' => null,
                'description' => 'Pengalaman premium dengan masa aktif selamanya & fitur cetak fisik.',
                'features' => [
                    'Masa Aktif Selamanya (Lifetime)',
                    'Tamu TANPA BATAS (Unlimited Nama Tamu & RSVP)',
                    'Kustom Musik Background Bebas',
                    'Galeri Foto & Video Prewedding Tanpa Batas',
                    'Informasi Acara, Navigasi Google Maps & Kalender',
                    'Fitur Buku Tamu, Doa & Konfirmasi RSVP',
                    'Amplop Digital & Rekening / QRIS Transfer',
                    'Broadcast & Sebar Otomatis Format WhatsApp',
                    'Export Data RSVP & Buku Tamu ke Excel / CSV',
                    'Fitur Undangan Cetak Fisik (Siap Print A5 / PDF)',
                    'Prioritas Dukungan VIP CS WhatsApp',
                ],
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($defaults as $pkg) {
            static::create($pkg);
        }
    }
}
