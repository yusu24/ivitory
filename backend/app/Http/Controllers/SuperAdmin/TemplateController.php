<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TemplateResource;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class TemplateController extends Controller
{
    public function index()
    {
        Template::ensureBuiltInTemplates();

        $templates = Template::orderBy('sort_order')->orderBy('id')->get();

        return TemplateResource::collection($templates);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);

        $template = Template::create($data);

        if ($request->hasFile('thumbnail')) {
            $template->update(['thumbnail_path' => $this->storeThumbnail($request)]);
        }

        return new TemplateResource($template);
    }

    public function update(Request $request, Template $template)
    {
        $data = $this->validateData($request, $template);

        $template->update($data);

        if ($request->hasFile('thumbnail')) {
            if ($template->thumbnail_path) {
                Storage::disk('public')->delete($template->thumbnail_path);
            }
            $template->update(['thumbnail_path' => $this->storeThumbnail($request)]);
        }

        return new TemplateResource($template);
    }

    public function destroy(Template $template)
    {
        if ($template->thumbnail_path) {
            Storage::disk('public')->delete($template->thumbnail_path);
        }

        $template->delete();

        return response()->json(['message' => 'Template deleted']);
    }

    private function validateData(Request $request, ?Template $template = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'slug' => [
                'required', 'string', 'max:100',
                'regex:/^[a-z0-9]+(-[a-z0-9]+)*$/',
                $template ? 'unique:templates,slug,'.$template->id : 'unique:templates,slug',
            ],
            'price' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
            'show_on_landing' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ]);
    }

    private function storeThumbnail(Request $request): string
    {
        $file = $request->file('thumbnail');
        $path = 'template-thumbnails/'.Str::uuid().'.jpg';

        $manager = ImageManager::gd();
        $encoded = $manager->read($file->getRealPath())->scaleDown(width: 800)->encode();
        Storage::disk('public')->put($path, (string) $encoded);

        return $path;
    }
}
