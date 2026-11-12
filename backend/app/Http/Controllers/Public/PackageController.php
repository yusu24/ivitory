<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;

class PackageController extends Controller
{
    public function index()
    {
        Package::ensureDefaults();
        $packages = Package::where('is_active', true)->orderBy('sort_order')->get();

        return PackageResource::collection($packages);
    }
}
