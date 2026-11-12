<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryPhotoResource;
use App\Models\GalleryPhoto;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class GalleryPhotoController extends Controller
{
    public function index(Invitation $invitation)
    {
        $this->authorize('view', $invitation);

        return GalleryPhotoResource::collection($invitation->galleryPhotos);
    }

    public function store(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $request->validate([
            'photo' => ['required', 'image', 'mimes:jpeg,png,webp', 'max:2048'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        $file = $request->file('photo');
        $path = 'gallery/'.Str::uuid().'.'.$file->getClientOriginalExtension();

        $manager = ImageManager::gd();
        $encoded = $manager->read($file->getRealPath())->scaleDown(width: 1200)->encode();
        Storage::disk('public')->put($path, (string) $encoded);

        $photo = $invitation->galleryPhotos()->create([
            'photo_path' => $path,
            'caption' => $request->input('caption'),
            'order_index' => $invitation->galleryPhotos()->count(),
        ]);

        return new GalleryPhotoResource($photo);
    }

    public function destroy(GalleryPhoto $galleryPhoto)
    {
        $this->authorize('update', $galleryPhoto->invitation);

        Storage::disk('public')->delete($galleryPhoto->photo_path);
        $galleryPhoto->delete();

        return response()->json(['message' => 'Photo deleted']);
    }

    public function reorder(Request $request, Invitation $invitation)
    {
        $this->authorize('update', $invitation);

        $data = $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['integer', 'exists:gallery_photos,id'],
        ]);

        foreach ($data['order'] as $index => $id) {
            GalleryPhoto::where('id', $id)
                ->where('invitation_id', $invitation->id)
                ->update(['order_index' => $index]);
        }

        return GalleryPhotoResource::collection($invitation->galleryPhotos()->get());
    }
}
