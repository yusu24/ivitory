<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoveStoryItem extends Model
{
    protected $fillable = [
        'invitation_id',
        'item_date',
        'title',
        'story',
        'order_index',
    ];

    protected $casts = [
        'item_date' => 'date',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
