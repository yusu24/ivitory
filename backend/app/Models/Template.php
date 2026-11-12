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

        if (static::where('slug', 'floral-3d')->doesntExist()) {
            static::create([
                'name' => 'Rosé Jardin 3D',
                'slug' => 'floral-3d',
                'price' => 0,
                'description' => 'Tema romantis berbunga 3D interaktif berbasis WebGL Three.js dengan cincin pernikahan emas 3D, kelopak mawar 3D melayang, dan kartu perspektif 3D.',
                'is_active' => true,
                'show_on_landing' => true,
                'sort_order' => 0,
            ]);
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
