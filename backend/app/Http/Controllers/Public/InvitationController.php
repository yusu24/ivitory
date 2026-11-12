<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;

class InvitationController extends Controller
{
    public function show(Invitation $invitation)
    {
        abort_unless($invitation->isLive(), 404);

        $invitation->increment('views_count');
        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'template']);

        return new InvitationResource($invitation);
    }
}
