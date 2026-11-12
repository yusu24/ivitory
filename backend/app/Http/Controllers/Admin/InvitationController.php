<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class InvitationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $invitations = $user->isAdmin()
            ? Invitation::with(['user', 'template'])->latest()->get()
            : $user->invitations()->with('template')->latest()->get();

        return InvitationResource::collection($invitations);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Invitation::class);

        $data = $this->validateData($request);

        $invitation = $request->user()->invitations()->create($data);
        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    public function show(Request $request, Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    public function update(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $this->validateData($request, $invitation);

        // Preserve existing template_id if not explicitly sent or empty
        if (empty($data['template_id'])) {
            unset($data['template_id']);
        }

        // Merge custom_texts & photo_settings if provided
        if (isset($data['custom_texts']) && is_array($data['custom_texts'])) {
            $data['custom_texts'] = array_merge($invitation->custom_texts ?? [], $data['custom_texts']);
        }
        if (isset($data['photo_settings']) && is_array($data['photo_settings'])) {
            $data['photo_settings'] = array_merge($invitation->photo_settings ?? [], $data['photo_settings']);
        }

        $invitation->update($data);
        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    public function destroy(Request $request, Invitation $invitation)
    {
        $this->authorize('delete', $invitation);

        foreach (['cover_photo_path', 'hero_photo_path', 'bride_photo_path', 'groom_photo_path', 'music_path'] as $col) {
            if ($invitation->{$col}) {
                Storage::disk('public')->delete($invitation->{$col});
            }
        }

        $invitation->delete();

        return response()->json(['message' => 'Invitation deleted']);
    }

    public function uploadCoverPhoto(Request $request, Invitation $invitation)
    {
        return $this->uploadSlotPhoto($request, $invitation, 'cover');
    }

    public function uploadSlotPhoto(Request $request, Invitation $invitation, string $slot)
    {
        $this->authorize('update', $invitation);

        $slotMap = [
            'cover' => 'cover_photo_path',
            'hero' => 'hero_photo_path',
            'bride' => 'bride_photo_path',
            'groom' => 'groom_photo_path',
        ];

        abort_unless(isset($slotMap[$slot]), 422, 'Slot foto tidak valid.');

        $fileInputKey = $request->hasFile('photo') ? 'photo' : 'cover_photo';
        $request->validate([
            $fileInputKey => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:6144'],
        ]);

        $column = $slotMap[$slot];
        if ($invitation->{$column}) {
            Storage::disk('public')->delete($invitation->{$column});
        }

        $file = $request->file($fileInputKey);
        $path = 'invitations/'.$slot.'_'.Str::uuid().'.'.$file->getClientOriginalExtension();

        try {
            $manager = ImageManager::gd();
            $encoded = $manager->read($file->getRealPath())->scaleDown(width: 1600)->encode();
            Storage::disk('public')->put($path, (string) $encoded);
        } catch (\Throwable) {
            Storage::disk('public')->putFileAs('', $file, $path);
        }

        $invitation->update([$column => $path]);
        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    public function deleteSlotPhoto(Request $request, Invitation $invitation, string $slot)
    {
        $this->authorize('update', $invitation);

        $slotMap = [
            'cover' => 'cover_photo_path',
            'hero' => 'hero_photo_path',
            'bride' => 'bride_photo_path',
            'groom' => 'groom_photo_path',
        ];

        abort_unless(isset($slotMap[$slot]), 422, 'Slot foto tidak valid.');

        $column = $slotMap[$slot];
        if ($invitation->{$column}) {
            Storage::disk('public')->delete($invitation->{$column});
            $invitation->update([$column => null]);
        }

        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    public function uploadMusic(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $request->validate([
            'music' => ['required', 'mimes:mp3,wav,ogg', 'max:10240'],
        ]);

        if ($invitation->music_path) {
            Storage::disk('public')->delete($invitation->music_path);
        }

        $file = $request->file('music');
        $path = 'music/'.Str::uuid().'.'.$file->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('', $file, $path);

        $invitation->update(['music_path' => $path]);
        $invitation->load(['loveStoryItems', 'galleryPhotos', 'bankAccounts', 'user', 'template']);

        return new InvitationResource($invitation);
    }

    private function validateData(Request $request, ?Invitation $invitation = null): array
    {
        $req = $invitation ? 'sometimes' : 'required';

        return $request->validate([
            'slug' => [
                $req, 'string', 'min:3', 'max:100',
                'regex:/^[a-z0-9]+(-[a-z0-9]+)*$/',
                $invitation
                    ? 'unique:invitations,slug,'.$invitation->id
                    : 'unique:invitations,slug',
            ],
            'template_id' => ['nullable', 'exists:templates,id'],
            'groom_name' => [$req, 'string', 'max:150'],
            'groom_nickname' => ['nullable', 'string', 'max:50'],
            'groom_parents' => ['nullable', 'string'],

            'bride_name' => [$req, 'string', 'max:150'],
            'bride_nickname' => ['nullable', 'string', 'max:50'],
            'bride_parents' => ['nullable', 'string'],

            'opening_text' => ['nullable', 'string'],
            'custom_texts' => ['nullable', 'array'],
            'photo_settings' => ['nullable', 'array'],

            'akad_date' => [$req, 'date'],
            'akad_time' => [$req, 'date_format:H:i'],
            'akad_location' => [$req, 'string', 'max:255'],
            'akad_address' => ['nullable', 'string'],
            'akad_map_url' => ['nullable', 'string', 'max:2048'],

            'resepsi_date' => ['nullable', 'date'],
            'resepsi_time' => ['nullable', 'date_format:H:i'],
            'resepsi_location' => ['nullable', 'string', 'max:255'],
            'resepsi_address' => ['nullable', 'string'],
            'resepsi_map_url' => ['nullable', 'string', 'max:2048'],

            'is_published' => ['sometimes', 'boolean'],
        ]);
    }
}
