<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\TemplateResource;
use App\Models\Template;

class TemplateController extends Controller
{
    public function index()
    {
        Template::ensureBuiltInTemplates();

        $templates = Template::where('is_active', true)
            ->where('show_on_landing', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return TemplateResource::collection($templates);
    }
}
