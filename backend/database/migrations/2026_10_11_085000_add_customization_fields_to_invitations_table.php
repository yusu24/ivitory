<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->string('hero_photo_path')->nullable()->after('cover_photo_path');
            $table->string('bride_photo_path')->nullable()->after('hero_photo_path');
            $table->string('groom_photo_path')->nullable()->after('bride_photo_path');
            $table->json('custom_texts')->nullable()->after('opening_text');
            $table->json('photo_settings')->nullable()->after('custom_texts');
        });
    }

    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn([
                'hero_photo_path',
                'bride_photo_path',
                'groom_photo_path',
                'custom_texts',
                'photo_settings',
            ]);
        });
    }
};
