<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class InvitationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'template_id' => $this->template_id,

            'groom_name' => $this->groom_name,
            'groom_nickname' => $this->groom_nickname,
            'groom_parents' => $this->groom_parents,

            'bride_name' => $this->bride_name,
            'bride_nickname' => $this->bride_nickname,
            'bride_parents' => $this->bride_parents,

            'cover_photo_url' => $this->cover_photo_path ? asset('storage/' . $this->cover_photo_path) : null,
            'hero_image_url' => $this->hero_photo_path ? asset('storage/' . $this->hero_photo_path) : null,
            'bride_photo_url' => $this->bride_photo_path ? asset('storage/' . $this->bride_photo_path) : null,
            'groom_photo_url' => $this->groom_photo_path ? asset('storage/' . $this->groom_photo_path) : null,

            'opening_text' => $this->opening_text,
            'custom_texts' => $this->custom_texts ?? (object) [],
            'photo_settings' => $this->photo_settings ?? (object) [],

            'akad_date' => $this->akad_date?->format('Y-m-d'),
            'akad_time' => $this->akad_time,
            'akad_location' => $this->akad_location,
            'akad_address' => $this->akad_address,
            'akad_map_url' => $this->akad_map_url,

            'resepsi_date' => $this->resepsi_date?->format('Y-m-d'),
            'resepsi_time' => $this->resepsi_time,
            'resepsi_location' => $this->resepsi_location,
            'resepsi_address' => $this->resepsi_address,
            'resepsi_map_url' => $this->resepsi_map_url,

            'music_url' => $this->music_path ? asset('storage/' . $this->music_path) : null,
            'is_published' => $this->is_published,
            'views_count' => $this->views_count,

            'love_story_items' => LoveStoryItemResource::collection($this->whenLoaded('loveStoryItems')),
            'gallery_photos' => GalleryPhotoResource::collection($this->whenLoaded('galleryPhotos')),
            'bank_accounts' => BankAccountResource::collection($this->whenLoaded('bankAccounts')),

            'owner' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ]),

            'template' => $this->whenLoaded('template', fn () => $this->template ? [
                'id' => $this->template->id,
                'slug' => $this->template->slug,
                'name' => $this->template->name,
            ] : null),

            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
