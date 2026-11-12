<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoveStoryItemResource;
use App\Models\Invitation;
use App\Models\LoveStoryItem;
use Illuminate\Http\Request;

class LoveStoryController extends Controller
{
    public function index(Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        return LoveStoryItemResource::collection($invitation->loveStoryItems);
    }

    public function store(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'item_date' => ['nullable', 'date'],
            'title' => ['required', 'string', 'max:150'],
            'story' => ['required', 'string'],
            'order_index' => ['sometimes', 'integer', 'min:0'],
        ]);

        $item = $invitation->loveStoryItems()->create($data);

        return new LoveStoryItemResource($item);
    }

    public function update(Request $request, LoveStoryItem $loveStoryItem)
    {
        $this->authorize('update', $loveStoryItem->invitation);

        $data = $request->validate([
            'item_date' => ['nullable', 'date'],
            'title' => ['required', 'string', 'max:150'],
            'story' => ['required', 'string'],
            'order_index' => ['sometimes', 'integer', 'min:0'],
        ]);

        $loveStoryItem->update($data);

        return new LoveStoryItemResource($loveStoryItem);
    }

    public function destroy(LoveStoryItem $loveStoryItem)
    {
        $this->authorize('update', $loveStoryItem->invitation);

        $loveStoryItem->delete();

        return response()->json(['message' => 'Love story item deleted']);
    }

    public function reorder(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:love_story_items,id'],
        ]);

        foreach ($data['order'] as $index => $id) {
            LoveStoryItem::where('id', $id)
                ->where('invitation_id', $invitation->id)
                ->update(['order_index' => $index]);
        }

        return LoveStoryItemResource::collection($invitation->loveStoryItems()->get());
    }
}
