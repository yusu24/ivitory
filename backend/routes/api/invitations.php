<?php

use App\Http\Controllers\Admin\BankAccountController;
use App\Http\Controllers\Admin\GalleryPhotoController;
use App\Http\Controllers\Admin\GuestController;
use App\Http\Controllers\Admin\InvitationController as AdminInvitationController;
use App\Http\Controllers\Admin\LoveStoryController;
use App\Http\Controllers\Admin\RsvpController as AdminRsvpController;
use App\Http\Controllers\Public\InvitationController as PublicInvitationController;
use App\Http\Controllers\Public\RsvpController as PublicRsvpController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/invitations/{invitation:slug}', [PublicInvitationController::class, 'show']);
Route::get('/invitations/{invitation:slug}/rsvp', [PublicRsvpController::class, 'index']);
Route::post('/invitations/{invitation:slug}/rsvp', [PublicRsvpController::class, 'store'])
    ->middleware('throttle:5,1');

// Admin
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('invitations', [AdminInvitationController::class, 'index']);
    Route::post('invitations', [AdminInvitationController::class, 'store']);
    Route::get('invitations/{invitation}', [AdminInvitationController::class, 'show']);
    Route::put('invitations/{invitation}', [AdminInvitationController::class, 'update']);
    Route::delete('invitations/{invitation}', [AdminInvitationController::class, 'destroy']);
    Route::post('invitations/{invitation}/cover-photo', [AdminInvitationController::class, 'uploadCoverPhoto']);
    Route::post('invitations/{invitation}/photo/{slot}', [AdminInvitationController::class, 'uploadSlotPhoto']);
    Route::delete('invitations/{invitation}/photo/{slot}', [AdminInvitationController::class, 'deleteSlotPhoto']);
    Route::post('invitations/{invitation}/music', [AdminInvitationController::class, 'uploadMusic']);

    Route::get('invitations/{invitation}/love-story', [LoveStoryController::class, 'index']);
    Route::post('invitations/{invitation}/love-story', [LoveStoryController::class, 'store']);
    Route::post('invitations/{invitation}/love-story/reorder', [LoveStoryController::class, 'reorder']);
    Route::put('love-story/{loveStoryItem}', [LoveStoryController::class, 'update']);
    Route::delete('love-story/{loveStoryItem}', [LoveStoryController::class, 'destroy']);

    Route::get('invitations/{invitation}/gallery', [GalleryPhotoController::class, 'index']);
    Route::post('invitations/{invitation}/gallery', [GalleryPhotoController::class, 'store']);
    Route::post('invitations/{invitation}/gallery/reorder', [GalleryPhotoController::class, 'reorder']);
    Route::delete('gallery/{galleryPhoto}', [GalleryPhotoController::class, 'destroy']);

    Route::get('invitations/{invitation}/bank-accounts', [BankAccountController::class, 'index']);
    Route::post('invitations/{invitation}/bank-accounts', [BankAccountController::class, 'store']);
    Route::post('invitations/{invitation}/bank-accounts/reorder', [BankAccountController::class, 'reorder']);
    Route::put('bank-accounts/{bankAccount}', [BankAccountController::class, 'update']);
    Route::delete('bank-accounts/{bankAccount}', [BankAccountController::class, 'destroy']);

    Route::get('invitations/{invitation}/rsvp', [AdminRsvpController::class, 'index']);
    Route::delete('rsvp/{rsvpEntry}', [AdminRsvpController::class, 'destroy']);

    Route::get('invitations/{invitation}/guests', [GuestController::class, 'index']);
    Route::post('invitations/{invitation}/guests', [GuestController::class, 'store']);
    Route::post('invitations/{invitation}/guests/bulk', [GuestController::class, 'bulkStore']);
    Route::post('guests/{guest}/send-whatsapp', [GuestController::class, 'sendWhatsapp']);
    Route::put('guests/{guest}', [GuestController::class, 'update']);
    Route::delete('guests/{guest}', [GuestController::class, 'destroy']);
});
