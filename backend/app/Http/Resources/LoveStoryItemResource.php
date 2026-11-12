<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoveStoryItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item_date' => $this->item_date?->format('Y-m-d'),
            'title' => $this->title,
            'story' => $this->story,
            'order_index' => $this->order_index,
        ];
    }
}
