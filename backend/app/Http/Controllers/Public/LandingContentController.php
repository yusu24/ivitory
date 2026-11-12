<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\LandingContentResource;
use App\Models\LandingContent;

class LandingContentController extends Controller
{
    public function show()
    {
        return new LandingContentResource(LandingContent::current());
    }
}
