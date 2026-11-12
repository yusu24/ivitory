<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invitation extends Model
{
    /** @use HasFactory<\Database\Factories\InvitationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'template_id',
        'groom_name',
        'groom_nickname',
        'groom_parents',
        'bride_name',
        'bride_nickname',
        'bride_parents',
        'cover_photo_path',
        'hero_photo_path',
        'bride_photo_path',
        'groom_photo_path',
        'opening_text',
        'custom_texts',
        'photo_settings',
        'akad_date',
        'akad_time',
        'akad_location',
        'akad_address',
        'akad_map_url',
        'resepsi_date',
        'resepsi_time',
        'resepsi_location',
        'resepsi_address',
        'resepsi_map_url',
        'music_path',
        'is_published',
    ];

    protected $attributes = [
        'is_published' => false,
    ];

    protected $casts = [
        'akad_date' => 'date',
        'resepsi_date' => 'date',
        'is_published' => 'boolean',
        'expires_at' => 'datetime',
        'custom_texts' => 'array',
        'photo_settings' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function isLive(): bool
    {
        return $this->is_published && ($this->expires_at === null || $this->expires_at->isFuture());
    }

    public function loveStoryItems(): HasMany
    {
        return $this->hasMany(LoveStoryItem::class)->orderBy('order_index');
    }

    public function galleryPhotos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class)->orderBy('order_index');
    }

    public function bankAccounts(): HasMany
    {
        return $this->hasMany(BankAccount::class)->orderBy('order_index');
    }

    public function rsvpEntries(): HasMany
    {
        return $this->hasMany(RsvpEntry::class)->latest();
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class)->latest();
    }
}
