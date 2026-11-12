<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'package_id',
        'template_id',
        'invitation_id',
        'midtrans_order_id',
        'status',
        'amount',
        'snap_token',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    public function activate(): void
    {
        $this->update(['status' => 'paid', 'paid_at' => $this->paid_at ?? now()]);

        if ($this->invitation) {
            $this->invitation->forceFill([
                'package_id' => $this->package_id,
                'template_id' => $this->template_id,
                'order_id' => $this->id,
                'is_published' => true,
                'expires_at' => $this->package?->duration_days
                    ? now()->addDays($this->package->duration_days)
                    : null,
            ])->save();
        }
    }
}
