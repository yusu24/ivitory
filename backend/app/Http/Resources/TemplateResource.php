<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TemplateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'thumbnail_url' => $this->resolveThumbnailUrl(),
            'description' => $this->description,
            'is_active' => $this->is_active,
            'show_on_landing' => $this->show_on_landing,
            'sort_order' => $this->sort_order,
        ];
    }

    protected function resolveThumbnailUrl(): ?string
    {
        if (! $this->thumbnail_path) {
            return null;
        }

        if (str_starts_with($this->thumbnail_path, 'http://') || str_starts_with($this->thumbnail_path, 'https://')) {
            return $this->thumbnail_path;
        }

        if (str_starts_with($this->thumbnail_path, '/')) {
            return $this->thumbnail_path;
        }

        return asset('storage/' . $this->thumbnail_path);
    }
}
