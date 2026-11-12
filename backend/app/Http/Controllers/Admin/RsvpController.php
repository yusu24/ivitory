<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RsvpEntryResource;
use App\Models\Invitation;
use App\Models\RsvpEntry;
use Illuminate\Http\Request;

class RsvpController extends Controller
{
    public function index(Request $request, Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        $query = $invitation->rsvpEntries();

        if ($attendance = $request->query('attendance')) {
            $query->where('attendance', $attendance);
        }

        return RsvpEntryResource::collection($query->paginate(20));
    }

    public function destroy(RsvpEntry $rsvpEntry)
    {
        $this->authorize('update', $rsvpEntry->invitation);

        $rsvpEntry->delete();

        return response()->json(['message' => 'RSVP entry deleted']);
    }
}
