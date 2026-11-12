<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LandingContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'site_name' => $this->site_name ?: 'Invitory',
            'logo_url' => $this->logo_path ? asset('storage/' . $this->logo_path) : null,
            'favicon_url' => $this->favicon_path ? asset('storage/' . $this->favicon_path) : null,
            'hero_eyebrow' => $this->hero_eyebrow,
            'hero_title' => $this->hero_title,
            'hero_subtitle' => $this->hero_subtitle,
            'cta_primary_label' => $this->cta_primary_label,
            'cta_secondary_label' => $this->cta_secondary_label,
            'features' => $this->features ?? [],
        ];
    }
}
