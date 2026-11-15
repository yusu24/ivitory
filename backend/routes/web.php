<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    $spaPath = public_path('spa.html');
    if (file_exists($spaPath)) {
        return response(file_get_contents($spaPath), 200)
            ->header('Content-Type', 'text/html; charset=UTF-8');
    }

    return view('welcome');
})->where('any', '^(?!api|sanctum|storage|up).*$');
