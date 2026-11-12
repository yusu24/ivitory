<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\RsvpEntryResource;
use App\Models\Invitation;
use Illuminate\Http\Request;

class RsvpController extends Controller
{
    public function index(Invitation $invitation)
    {
        abort_unless($invitation->is_published, 404);

        $entries = $invitation->rsvpEntries()->paginate(10);

        return RsvpEntryResource::collection($entries);
    }

    public function store(Request $request, Invitation $invitation)
    {
        abort_unless($invitation->is_published, 404);

        $data = $request->validate([
            'guest_name' => ['required', 'string', 'max:150'],
            'attendance' => ['required', 'in:hadir,tidak_hadir,ragu'],
            'guest_count' => ['sometimes', 'integer', 'min:1', 'max:10'],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $entry = $invitation->rsvpEntries()->create($data);

        return new RsvpEntryResource($entry);
    }
}
