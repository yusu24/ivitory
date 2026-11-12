<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentWebhookController;
use App\Http\Controllers\Public\LandingContentController;
use App\Http\Controllers\Public\PackageController as PublicPackageController;
use App\Http\Controllers\Public\TemplateController as PublicTemplateController;
use App\Http\Controllers\SuperAdmin\LandingContentController as SuperAdminLandingContentController;
use App\Http\Controllers\SuperAdmin\OrderController as SuperAdminOrderController;
use App\Http\Controllers\SuperAdmin\PackageController as SuperAdminPackageController;
use App\Http\Controllers\SuperAdmin\TemplateController as SuperAdminTemplateController;
use App\Http\Controllers\SuperAdmin\UserController as SuperAdminUserController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/packages', [PublicPackageController::class, 'index']);
Route::get('/templates', [PublicTemplateController::class, 'index']);
Route::get('/landing-content', [LandingContentController::class, 'show']);
Route::post('/webhooks/midtrans', [PaymentWebhookController::class, 'handle']);

// Customer
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});

// Superadmin
Route::middleware(['auth:sanctum', 'admin'])->prefix('superadmin')->group(function () {
    Route::apiResource('packages', SuperAdminPackageController::class)->except(['show']);
    Route::get('orders', [SuperAdminOrderController::class, 'index']);
    Route::patch('orders/{order}/status', [SuperAdminOrderController::class, 'updateStatus']);
    Route::put('landing-content', [SuperAdminLandingContentController::class, 'update']);
    Route::post('landing-content/logo', [SuperAdminLandingContentController::class, 'uploadLogo']);
    Route::delete('landing-content/logo', [SuperAdminLandingContentController::class, 'deleteLogo']);
    Route::post('landing-content/favicon', [SuperAdminLandingContentController::class, 'uploadFavicon']);
    Route::delete('landing-content/favicon', [SuperAdminLandingContentController::class, 'deleteFavicon']);

    Route::get('templates', [SuperAdminTemplateController::class, 'index']);
    Route::post('templates', [SuperAdminTemplateController::class, 'store']);
    Route::post('templates/{template}', [SuperAdminTemplateController::class, 'update']);
    Route::delete('templates/{template}', [SuperAdminTemplateController::class, 'destroy']);

    Route::get('users', [SuperAdminUserController::class, 'index']);
    Route::post('users', [SuperAdminUserController::class, 'store']);
    Route::patch('users/{user}', [SuperAdminUserController::class, 'update']);
    Route::patch('users/{user}/role', [SuperAdminUserController::class, 'updateRole']);
    Route::delete('users/{user}', [SuperAdminUserController::class, 'destroy']);
});
