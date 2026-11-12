<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('slug', 100)->unique();

            $table->string('groom_name', 150);
            $table->string('groom_nickname', 50)->nullable();
            $table->text('groom_parents')->nullable();

            $table->string('bride_name', 150);
            $table->string('bride_nickname', 50)->nullable();
            $table->text('bride_parents')->nullable();

            $table->string('cover_photo_path')->nullable();
            $table->text('opening_text')->nullable();

            $table->date('akad_date');
            $table->time('akad_time');
            $table->string('akad_location');
            $table->text('akad_address')->nullable();
            $table->text('akad_map_url')->nullable();

            $table->date('resepsi_date')->nullable();
            $table->time('resepsi_time')->nullable();
            $table->string('resepsi_location')->nullable();
            $table->text('resepsi_address')->nullable();
            $table->text('resepsi_map_url')->nullable();

            $table->string('music_path')->nullable();
            $table->boolean('is_published')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
