<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LandingContentResource;
use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LandingContentController extends Controller
{
    public function update(Request $request)
    {
        $data = $request->validate([
            'site_name' => ['sometimes', 'nullable', 'string', 'max:100'],
            'hero_eyebrow' => ['sometimes', 'string', 'max:100'],
            'hero_title' => ['sometimes', 'string', 'max:255'],
            'hero_subtitle' => ['sometimes', 'string'],
            'cta_primary_label' => ['sometimes', 'string', 'max:100'],
            'cta_secondary_label' => ['sometimes', 'string', 'max:100'],
            'features' => ['sometimes', 'array'],
            'features.*.icon' => ['required_with:features', 'string'],
            'features.*.title' => ['required_with:features', 'string', 'max:100'],
            'features.*.description' => ['required_with:features', 'string'],
        ]);

        $content = LandingContent::current();
        $content->update($data);

        return new LandingContentResource($content);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,svg', 'max:4096'],
        ]);

        $content = LandingContent::current();

        if ($content->logo_path && Storage::disk('public')->exists($content->logo_path)) {
            Storage::disk('public')->delete($content->logo_path);
        }

        $path = $request->file('logo')->store('brand', 'public');
        $content->update(['logo_path' => $path]);

        return new LandingContentResource($content);
    }

    public function deleteLogo()
    {
        $content = LandingContent::current();

        if ($content->logo_path && Storage::disk('public')->exists($content->logo_path)) {
            Storage::disk('public')->delete($content->logo_path);
        }

        $content->update(['logo_path' => null]);

        return new LandingContentResource($content);
    }

    public function uploadFavicon(Request $request)
    {
        $request->validate([
            'favicon' => ['required', 'file', 'mimes:ico,png,jpg,jpeg,webp,svg', 'max:2048'],
        ]);

        $content = LandingContent::current();

        if ($content->favicon_path && Storage::disk('public')->exists($content->favicon_path)) {
            Storage::disk('public')->delete($content->favicon_path);
        }

        $path = $request->file('favicon')->store('brand', 'public');
        $content->update(['favicon_path' => $path]);

        return new LandingContentResource($content);
    }

    public function deleteFavicon()
    {
        $content = LandingContent::current();

        if ($content->favicon_path && Storage::disk('public')->exists($content->favicon_path)) {
            Storage::disk('public')->delete($content->favicon_path);
        }

        $content->update(['favicon_path' => null]);

        return new LandingContentResource($content);
    }
}
