<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'thumbnail_path',
        'description',
        'is_active',
        'show_on_landing',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'show_on_landing' => 'boolean',
    ];

    /**
     * Ensure the 6 universal built-in templates are registered in the database
     * and remove legacy/regional Adat templates so the catalog stays universal.
     */
    public static function ensureBuiltInTemplates(): void
    {
        // Remove Adat templates if present, safely reassigning any linked invitations/orders first
        $adatSlugs = ['adat-minang', 'adat-sunda', 'adat-batak', 'jawa-elegan'];
        $adatIds = static::whereIn('slug', $adatSlugs)->pluck('id');

        if ($adatIds->isNotEmpty()) {
            $fallbackTemplate = static::whereNotIn('slug', $adatSlugs)->orderBy('id')->first();
            if ($fallbackTemplate) {
                \App\Models\Invitation::whereIn('template_id', $adatIds)
                    ->update(['template_id' => $fallbackTemplate->id]);
                \App\Models\Order::whereIn('template_id', $adatIds)
                    ->update(['template_id' => $fallbackTemplate->id]);
            }
            static::whereIn('id', $adatIds)->delete();
        }

        $builtInTemplates = [
            [
                'slug' => 'floral-3d',
                'name' => 'Rosé Jardin 3D',
                'price' => 0,
                'thumbnail_path' => null,
                'description' => 'Tema romantis berbunga 3D interaktif berbasis WebGL Three.js dengan cincin pernikahan emas 3D, kelopak mawar 3D melayang, dan kartu perspektif 3D.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'monochrome-lineart',
                'name' => 'Atelier Line-Art',
                'price' => 0,
                'thumbnail_path' => '/templates/minimal-monochrome/thumbnail.jpg',
                'description' => 'Desain monokrom bergaya editorial dengan ilustrasi sketsa garis romantis, ornamen botani halus, serta versi cetak fisik siap pakai.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'boho-terracotta',
                'name' => 'Terra Botanica',
                'price' => 0,
                'thumbnail_path' => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                'description' => 'Nuansa boho hangat berpadu palet terracotta lembut, lengkungan arsitektural, dan tipografi kaligrafi yang romantis.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'dewanakl-ulems',
                'name' => 'Lumina Glass',
                'price' => 0,
                'thumbnail_path' => '/templates/ulems/banner.webp',
                'description' => 'Tata letak modern interaktif dengan fitur mode terang/gelap, gelombang dinamis, dan aksen tipografi anggun.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 3,
            ],
            [
                'slug' => 'elegant-brown',
                'name' => 'Royal Mocha',
                'price' => 0,
                'thumbnail_path' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                'description' => 'Sentuhan klasik berkelas dalam palet cokelat moka dan krem gading, dilengkapi fitur auto-scroll dan partikel hangat.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 4,
            ],
            [
                'slug' => 'classic',
                'name' => 'Ivory Garden',
                'price' => 0,
                'thumbnail_path' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
                'description' => 'Keanggunan warna gading dan hijau zamrud dengan bingkai kaca transparan serta ornamen emas klasik.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($builtInTemplates as $tmpl) {
            static::firstOrCreate(
                ['slug' => $tmpl['slug']],
                $tmpl
            );
        }

        // Ensure all 6 universal templates are active when Adat templates are removed
        if ($adatIds->isNotEmpty()) {
            static::query()->update([
                'is_active' => true,
                'show_on_landing' => true,
            ]);
        }
    }
}
